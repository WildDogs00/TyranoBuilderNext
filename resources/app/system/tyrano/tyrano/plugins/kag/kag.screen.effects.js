tyrano.plugin.kag.tag.overlayEffects = {
    vital: [],
    pm: {
        typeEffect: "",
        typeMixings: "",
        imgTexture: "",
        animEffects: "",
        videoTexture: "",
        animEffectsSpeed : "",
        loopVideo: ""

    },

    start: function (pm) {
        const baseContainer = document.getElementById('tyrano_base');
        function fadeInElement(element) {
            let opacity = 0;
            const interval = 10;
            const speed = Number(pm.animEffectsSpeed);

            const fadeInAnimation = setInterval(() => {
                opacity += speed;
                element.style.opacity = opacity;

                if (opacity >= 1) clearInterval(fadeInAnimation);
            }, interval);
        }

        if (pm.typeEffect === "img") {
            const img = new Image();
            img.id = "overlayEffectsContainer"
            img.src = `data/${pm.imgTexture}`;
            img.style.cssText = `position: absolute; z-index: 1000000000; width: 100%; height: 100%; opacity: 0; mix-blend-mode: ${pm.typeMixings}; pointer-events: none;`;
            baseContainer.appendChild(img);
            pm.animEffects === "true" ? fadeInElement(img) : img.style.opacity = "1";

        } else {
            const video = document.createElement('video');
            video.src = `data/${pm.videoTexture}`;
            video.id = "overlayEffectsContainer"
            video.autoplay = true;
            pm.loopVideo === "true" ? video.loop = true : video.loop = false;
            video.muted = true;
            video.playsInline = true;
            video.style.cssText = `position: absolute; z-index: 1000000000; width: 100%; height: 100%; opacity: 0; mix-blend-mode: ${pm.typeMixings}; pointer-events: none;`;
            baseContainer.appendChild(video);
            pm.animEffects === "true" ? fadeInElement(video) : video.style.opacity = "1";
        }
        TYRANO.kag.ftag.nextOrder();
    }
}

tyrano.plugin.kag.tag.overlayEffectsHide = {
    vital: [],
    pm: {},

    start: function (pm) {
        const overlayEffectsContainer = document.getElementById('overlayEffectsContainer');

        if (overlayEffectsContainer) {
            function removeFadeOut( el, speed ) {
                const seconds = speed / 1000;
                el.style.transition = `opacity ${seconds}s ease`;

                el.style.opacity = 0;
                setTimeout(function() {
                    el.parentNode.removeChild(el);
                }, speed);
            }
            removeFadeOut(overlayEffectsContainer, 1000);
        }

        TYRANO.kag.ftag.nextOrder();
    }
}

tyrano.plugin.kag.tag.particlesEffectsImg = {
    vital: [],
    pm: {
        imgTexture: "",
        valueParticles: "",
        downSpeed: "",
        direction: "",
        imgSize: ""
    },

    start: function (pm) {
        const baseContainer = document.getElementById('tyrano_base');
        const particlesEffectsContainer = document.createElement('div');
        particlesEffectsContainer.id = "particlesEffectsContainerImg";
        particlesEffectsContainer.style.cssText = 'position: absolute; z-index: 1000000000; width: 100%; height: 100%; pointer-events: none;';
        baseContainer.appendChild(particlesEffectsContainer);

        this.particles(pm);

        TYRANO.kag.ftag.nextOrder();
    },
    particles: function (pm) {
        particlesJS(`particlesEffectsContainerImg`, {
            "particles": {
                "number": {
                    "value": pm.valueParticles,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "shape": {
                    "type": "image",
                    "image": {
                        "src": `data/${pm.imgTexture}`,
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.7,
                    "random": false,
                },
                "size": {
                    "value": pm.imgSize,
                    "random": true,
                },
                "line_linked": {
                    "enable": false,
                },
                "move": {
                    "enable": true,
                    "speed": pm.downSpeed,
                    "direction": pm.direction,
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false,
                    },
                    "onclick": {
                        "enable": false,
                    },
                    "resize": true
                }
            },
            "retina_detect": true
        });
    }
}

tyrano.plugin.kag.tag.particlesEffectsImgHide = {
    vital: [],
    pm: {},

    start: function (pm) {
        const particlesEffectsContainerImg = document.getElementById('particlesEffectsContainerImg');

        if (particlesEffectsContainerImg) {
            function removeFadeOut( el, speed ) {
                const seconds = speed / 1000;
                el.style.transition = `opacity ${seconds}s ease`;

                el.style.opacity = 0;
                setTimeout(function() {
                    el.parentNode.removeChild(el);
                }, speed);
            }
            removeFadeOut(particlesEffectsContainerImg, 1000);
        }

        TYRANO.kag.ftag.nextOrder();
    }
}

tyrano.plugin.kag.tag.particlesEffects = {
    vital: [],
    pm: {
        valueParticles: "",
        downSpeed: "",
        direction: "",
        particlesSize: "",
        particlesType: ""
    },

    start: function (pm) {
        const baseContainer = document.getElementById('tyrano_base');
        const particlesEffectsContainer = document.createElement('div');
        particlesEffectsContainer.id = "particlesEffectsContainer";
        particlesEffectsContainer.style.cssText = 'position: absolute; z-index: 1000000000; width: 100%; height: 100%; pointer-events: none;';
        baseContainer.appendChild(particlesEffectsContainer);

        this.particles(pm);

        TYRANO.kag.ftag.nextOrder();
    },
    particles: function (pm) {
        function setupParticlesEffect(effectConfig) {
            particlesJS("particlesEffectsContainer", effectConfig);
        }

        const snowConfig = {
            particles: {
                number: {
                    value: pm.valueParticles
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.9,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: pm.particlesSize,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    speed: pm.downSpeed,
                    direction: pm.direction,
                    out_mode: "out"
                }
            }
        };

        const dustConfig = {
            particles: {
                number: {
                    value: pm.valueParticles
                },
                color: {
                    value: "#f5e9d0"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.9,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: pm.particlesSize,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    speed: pm.downSpeed,
                    direction: "none",
                    random: true,
                    out_mode: "out"
                }
            }
        };

        if (pm.particlesType === "snowConfig") {
            setupParticlesEffect(snowConfig);
        } else {
            setupParticlesEffect(dustConfig);
        }
    }
}

tyrano.plugin.kag.tag.particlesEffectsHide = {
    vital: [],
    pm: {},

    start: function (pm) {
        const particlesEffectsContainer = document.getElementById('particlesEffectsContainer');

        if (particlesEffectsContainer) {
            function removeFadeOut( el, speed ) {
                const seconds = speed / 1000;
                el.style.transition = `opacity ${seconds}s ease`;

                el.style.opacity = 0;
                setTimeout(function() {
                    el.parentNode.removeChild(el);
                }, speed);
            }
            removeFadeOut(particlesEffectsContainer, 1000);
        }

        TYRANO.kag.ftag.nextOrder();
    }
}