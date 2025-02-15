tyrano.plugin.kag.tag.chromaticAberration = {
    vital: [],
    pm: {
        distortionStrength: "",
        contourBrightness: ""

    },

    start: function (pm) {
        const divElement = document.querySelector('.layer.base_fore.layer_fore.layer_camera');
        const canvas = document.createElement('canvas');
        canvas.id = 'c';
        divElement.appendChild(canvas);
        const backgroundImageStyle = window.getComputedStyle(divElement).backgroundImage;
        const imageURL = backgroundImageStyle.match(/url\(["']?([^"']*)["']?\)/)[1];
        const image = new Image();
        image.src = imageURL;
        image.style.display = 'none';
        document.body.appendChild(image);

        const gl = canvas.getContext('webgl');
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, `
            attribute vec4 a_position;
            attribute vec2 a_texcoord;
            
            varying vec2 v_texcoord;
            
            void main() {
                gl_Position = a_position;
                v_texcoord = a_texcoord;
            }
        `);
        gl.compileShader(vertexShader);

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, `
            precision mediump float;
            uniform sampler2D u_image;
            uniform float u_distortion; 
            uniform float u_aberration;
            varying vec2 v_texcoord;
            
            vec2 barrelDistortion(vec2 coord, float amt) {
                vec2 cc = coord - 0.5;
                float dist = dot(cc, cc);
                return coord + cc * dist * amt;
            }
            
            void main() {
                vec4 colorR = texture2D(u_image, barrelDistortion(v_texcoord, u_distortion + u_aberration));
                vec4 colorG = texture2D(u_image, barrelDistortion(v_texcoord, u_distortion));
                vec4 colorB = texture2D(u_image, barrelDistortion(v_texcoord, u_distortion - u_aberration));
                gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0); 
            }
        `);
        gl.compileShader(fragmentShader);
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const positionAttribute = gl.getAttribLocation(program, "a_position");
        const texcoordAttribute = gl.getAttribLocation(program, "a_texcoord");
        const imageUniform = gl.getUniformLocation(program, "u_image");
        const distortionUniform = gl.getUniformLocation(program, "u_distortion");
        const aberrationUniform = gl.getUniformLocation(program, "u_aberration");
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
            -1, 1,
            1, 1,
            -1, -1,
            1, 1,
            1, -1,
        ]), gl.STATIC_DRAW);

        const texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,
        ]), gl.STATIC_DRAW);

        function render() {
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.enableVertexAttribArray(positionAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(texcoordAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
            gl.vertexAttribPointer(texcoordAttribute, 2, gl.FLOAT, false, 0, 0);
            gl.uniform1i(imageUniform, 0);
            gl.uniform1f(distortionUniform, pm.distortionStrength);
            gl.uniform1f(aberrationUniform, pm.contourBrightness);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }

        image.onload = function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        }
        TYRANO.kag.ftag.nextOrder();
    }
}

tyrano.plugin.kag.tag.noise = {
    vital: [],
    pm: {
        noiseDensity: "",
    },

    start: function (pm) {
        const divElement = document.querySelector('.layer.base_fore.layer_fore.layer_camera');
        const canvas = document.createElement('canvas');
        canvas.id = 'c';
        divElement.appendChild(canvas);
        const backgroundImageStyle = window.getComputedStyle(divElement).backgroundImage;
        const imageURL = RegExp(/url\(["']?([^"']*)["']?\)/).exec(backgroundImageStyle)[1];
        const image = new Image();
        image.src = imageURL;
        image.style.display = 'none';
        document.body.appendChild(image);

        const gl = canvas.getContext('webgl');
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        const vertexShaderSource = `
            attribute vec2 position;
            attribute vec2 texCoord;
            varying vec2 vTexCoord;
            
            void main() {
                vTexCoord = texCoord;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            uniform sampler2D image;
            uniform float time;
            varying vec2 vTexCoord;
            uniform float noiseDensity;
        
            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
            }
        
            void main() {
                vec4 color = texture2D(image, vTexCoord);
                if (color.a == 0.0) {
                    gl_FragColor = color;
                    return;
                }
                float noise = random(vTexCoord + time);
                vec3 shakenColor = color.rgb + noise * noiseDensity;
                gl_FragColor = vec4(shakenColor, color.a);
            }
        `;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        const positionAttribute = gl.getAttribLocation(program, "position");
        const texcoordAttribute = gl.getAttribLocation(program, "texCoord");
        const imageUniform = gl.getUniformLocation(program, "image");
        const timeUniform = gl.getUniformLocation(program, "time");
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
            -1, 1,
            1, 1,
            -1, -1,
            1, 1,
            1, -1,
        ]), gl.STATIC_DRAW);

        const texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,
        ]), gl.STATIC_DRAW);

        const noiseDensityUniform = gl.getUniformLocation(program, "noiseDensity");
        function render() {
            gl.uniform1f(noiseDensityUniform, pm.noiseDensity);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.enableVertexAttribArray(positionAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(texcoordAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
            gl.vertexAttribPointer(texcoordAttribute, 2, gl.FLOAT, false, 0, 0);
            gl.uniform1i(imageUniform, 0);
            gl.uniform1f(timeUniform, performance.now() / 1000.0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(render);
        }

        image.onload = function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        };





        TYRANO.kag.ftag.nextOrder();
    }
}

tyrano.plugin.kag.tag.noiseDistortion = {
    vital: [],
    pm: {
        noiseDensity: "",
    },

    start: function (pm) {
        const divElement = document.querySelector('.layer.base_fore.layer_fore.layer_camera');
        const canvas = document.createElement('canvas');
        canvas.id = 'c';
        divElement.appendChild(canvas);
        const backgroundImageStyle = window.getComputedStyle(divElement).backgroundImage;
        const imageURL = RegExp(/url\(["']?([^"']*)["']?\)/).exec(backgroundImageStyle)[1];
        const image = new Image();
        image.src = imageURL;
        image.style.display = 'none';
        document.body.appendChild(image);

        const gl = canvas.getContext('webgl');
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        const vertexShaderSource = `
            attribute vec2 position;
            attribute vec2 texCoord;
            varying vec2 vTexCoord;
            
            void main() {
                vTexCoord = texCoord;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fragmentShaderSource = `
    precision mediump float;
    uniform sampler2D image;
    uniform float time;
    uniform float direction;  // New uniform for the distortion direction
    varying vec2 vTexCoord;
    uniform float noiseDensity;
    
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float stripe(float t) {
        float stripePeriod = 1.0 / 20.0;  // Полосы появляются каждые 20 секунд
        float T = fract(t * stripePeriod);
        return smoothstep(0.0, 0.1, T) - smoothstep(0.1, 0.3, T);
    }
    
    void main() {
        vec4 color = texture2D(image, vTexCoord);
        if (color.a == 0.0) {
            gl_FragColor = color;
            return;
        }
        
        // Добавляем шум
        float noise = random(vTexCoord + vec2(time));
        vec3 shakenColor = color.rgb + noise * noiseDensity;
        
        // Создаем полосу
        float stripeIntensity = stripe(time - vTexCoord.y);
        
        // Искажаем изображение на полосе и на её границах
        vec3 distortedColor = texture2D(image, vTexCoord + vec2(stripeIntensity * 0.05 * direction, 0.0)).rgb + noise * noiseDensity;
        
        // Добавляем полупрозрачность к полосе и комбинируем итоговый цвет с шумом и полосой
        vec4 stripeColor = mix(vec4(shakenColor, color.a), vec4(distortedColor, color.a), stripeIntensity);
        gl_FragColor = mix(vec4(shakenColor, color.a), stripeColor, stripeIntensity);
    }
`;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        const positionAttribute = gl.getAttribLocation(program, "position");
        const texcoordAttribute = gl.getAttribLocation(program, "texCoord");
        const imageUniform = gl.getUniformLocation(program, "image");
        const timeUniform = gl.getUniformLocation(program, "time");
        const directionUniform = gl.getUniformLocation(program, "direction");
        const positionBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
            -1, 1,
            1, 1,
            -1, -1,
            1, 1,
            1, -1,
        ]), gl.STATIC_DRAW);

        const texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,
        ]), gl.STATIC_DRAW);

        const noiseDensityUniform = gl.getUniformLocation(program, "noiseDensity");
        let lastChange = 0;
        let direction = Math.random() > 0.5 ? 1.0 : -1.0;
        function render() {
            const now = performance.now();
            if ((now - lastChange) / 1000 > 20) {
                lastChange = now;
                direction = Math.random() > 0.5 ? 1.0 : -1.0;
            }

            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.enableVertexAttribArray(positionAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(texcoordAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
            gl.vertexAttribPointer(texcoordAttribute, 2, gl.FLOAT, false, 0, 0);
            gl.uniform1f(noiseDensityUniform, pm.noiseDensity);
            gl.uniform1i(imageUniform, 0);
            gl.uniform1f(timeUniform, now / 1000.0);
            gl.uniform1f(directionUniform, direction);  // Set the direction uniform
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(render);
        }

        image.onload = function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        };
        TYRANO.kag.ftag.nextOrder();
    }
}