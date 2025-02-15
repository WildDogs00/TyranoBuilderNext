var _live2d_tyrano = {
    "tm":{},
    "layer":"0"
};

TYRANO.kag.ftag.master_tag.live2d_new = {
    kag: TYRANO.kag,
    vital : ["model_id"],
    pm : {
        name:"",
        model_id:"",
        page:"fore",
        width:"",
        height:"",
        idle: "",
        x:"0",
        y:"0",
        scale:"1",
        visible:"false",
        lip:"false",
        lip_time:"100",
        lip_value:"0",
        jname:"none",
        breath:"false",
        next:"true"

    },
    start : function(pm) {
        var that = this;
        var canvas_id = "live2d_canvas_tyrano";

        if(pm.name==""){
            pm.name=pm.model_id;
        }

        if (pm.idle_ === "true") {
            pm.idle = "Idle"
        }

        if(!TYRANO.kag.stat.live2d_models){
            TYRANO.kag.stat.live2d_models={};
        }

        var layer = _live2d_tyrano.layer;

        if($("#live2d_canvas_tyrano").length===0){
            var j_canvas = $('<canvas id="'+canvas_id+'" data-name-el="'+pm.name+'" class="'+pm.name+' live2d_model live2d_canvas_tyrano"></canvas>');
            if(pm.width==""){
                pm.width = TYRANO.kag.config.scWidth;
            }

            if(pm.height==""){
                pm.height = TYRANO.kag.config.scHeight;
            }

            j_canvas.attr("width",pm.width);
            j_canvas.attr("height",pm.height);

            var target_layer = TYRANO.kag.layer.getLayer(layer,pm.page);
            target_layer.show();
            target_layer.append(j_canvas);
        }

        _live2d_tyrano.tm = tyranolive2dplugin.getTyranoManager();

        if(pm.lip=="true"){
            (function(pm){
                var lip_id = setInterval(function(){
                    if(TYRANO.kag.stat.is_adding_text){
                        var jname = $("." + TYRANO.kag.stat.chara_ptext).html();
                        if(jname==pm.jname){
                            var a = (Math.floor( Math.random() * 101 ))/100 ;
                            _live2d_tyrano.tm.setLipValue(pm.name,a);
                        }
                    }else{
                        _live2d_tyrano.tm.setLipValue(pm.name,0);
                    }
                },parseInt(pm.lip_time));
                pm.lip_id = lip_id;
            })(pm);

        }


        if (!TYRANO.kag.stat.live2d_models[pm.model_id]) {
            TYRANO.kag.stat.live2d_models[pm.model_id] = pm;

            pm.onFinishLoad = function() {
                if (pm.next == "true") {
                    TYRANO.kag.ftag.nextOrder();
                }
            };

            _live2d_tyrano.tm.addModel(pm);
        } else {
            TYRANO.kag.stat.live2d_models[pm.model_id] = pm;

            if (pm.next == "true") {
                TYRANO.kag.ftag.nextOrder();
            }
        }


    }

};

TYRANO.kag.ftag.master_tag.live2d_show = {
    kag: TYRANO.kag,
    vital : ["name"],
    pm:{
        name:"",
        next:"true",
        showAnimation:"",
        time:""
    },
    start : async function (pm) {
        const that = this;
        const name = pm.name;
        const canvas = $('#tyrano_base').find('.live2d_model');

        // Удаление предыдущих анимационных классов
        canvas.removeClass(function (index, className) {
            return (className.match(/(^|\s)animate__\S+/g) || []).join(' ');
        });

        canvas.css({
            position: "absolute",
            animationDuration: `${pm.time}s`,
        });
        canvas.addClass(`animate__animated ${pm.showAnimation}`);
        canvas.css('visibility', 'visible');

        _live2d_tyrano.tm = tyranolive2dplugin.getTyranoManager();
        pm.visible = "true";

        // Получаем сохраненные модели из localStorage
        const saveLive2dModels = JSON.parse(localStorage.getItem('saveLive2dModels')) || {};

        // Проверка, есть ли модель с таким именем в localStorage
        let modelData = saveLive2dModels[name] || {};

        // Проверка изменений в данных модели
        let dataChanged = false;

        // Проверка, соответствуют ли остальные данные указанным условиям
        if (pm.x == 0 && pm.y == 0 && pm.scale == 1) {
            // Обновляем только showAnimation и time
            if (pm.showAnimation !== modelData.showAnimation) {
                modelData.showAnimation = pm.showAnimation;
                dataChanged = true;
            }
            if (pm.time !== modelData.time) {
                modelData.time = pm.time;
                dataChanged = true;
            }
        } else {
            // Обновляем все данные
            for (let key in pm) {
                if (pm.hasOwnProperty(key) && pm[key] !== modelData[key]) {
                    modelData[key] = pm[key];
                    dataChanged = true;
                }
            }
        }

        // Устанавливаем видимость модели в true при показе
        modelData.visible = "true";

        // Обновляем или добавляем модель в tyrano
        TYRANO.kag.stat.live2d_models[name] = _live2d_tyrano.tm.updateModel(modelData);

        // Сохранение данных модели в localStorage, если данные изменились
        if (dataChanged) {
            saveLive2dModels[name] = modelData;
            localStorage.setItem('saveLive2dModels', JSON.stringify(saveLive2dModels));
        }

        if (pm.next === "true") {
            TYRANO.kag.ftag.nextOrder();
        }

    }

};

TYRANO.kag.ftag.master_tag.live2d_mod = {
    kag: TYRANO.kag,
    vital : ["name"],
    pm:{
        name:"",
        next:"true"
    },
    start : function(pm) {
        var that = this;
        _live2d_tyrano.tm = tyranolive2dplugin.getTyranoManager();
        var new_pm = _live2d_tyrano.tm.updateModel(pm);

        TYRANO.kag.stat.live2d_models[pm.name] = new_pm;
        console.warn(new_pm)
        if(pm.next=="true"){
            TYRANO.kag.ftag.nextOrder();
        }
    }
};

TYRANO.kag.ftag.master_tag.live2d_delete_all = {
    kag: TYRANO.kag,
    vital : [],
    pm:{
        next:"true",
        deleteAnimation: "",
        time: ""
    },
    start : function(pm) {
        var that = this;
        _live2d_tyrano.tm = tyranolive2dplugin.getTyranoManager();
        var models = TYRANO.kag.stat.live2d_models;

        for(key in models){
            var _pm = models[key];
            clearInterval(_pm.lip_id);
        }

        _live2d_tyrano.tm.deleteAllModel();
        TYRANO.kag.stat.live2d_models={};

        var canvas = $("#live2d_canvas_tyrano");
        canvas.css({
            animationDuration: `${pm.time}s`
        });
        canvas.addClass(`animate__animated ${pm.deleteAnimation}`);

        tyranolive2dplugin.releaseTyranoManager();

        if(pm.next=="true"){
            TYRANO.kag.ftag.nextOrder();
        }
    }
};

TYRANO.kag.ftag.master_tag.live2d_hide = {

    kag: TYRANO.kag,
    vital : ["name"],
    pm:{
        name:"",
        deleteAnimation: "",
        time: ""
    },
    start : function(pm) {
        var that = this;
        var name = pm.name;
        _live2d_tyrano.tm = tyranolive2dplugin.getTyranoManager();

        // Находим канвас и настраиваем его
        const canvas = $("#live2d_canvas_tyrano");

        // Удаление предыдущих анимационных классов
        canvas.removeClass(function (index, className) {
            return (className.match(/(^|\s)animate__\S+/g) || []).join(' ');
        });

        canvas.css({
            animationDuration: `${pm.time}s`
        });
        canvas.addClass(`animate__animated ${pm.deleteAnimation}`);

        // Обработчик конца анимации
        function handleAnimationEnd() {
            pm.visible = "false";
            canvas.css('visibility', 'hidden'); // Скрыть канвас
            canvas.off('animationend', handleAnimationEnd); // Удалить обработчик после выполнения
            TYRANO.kag.ftag.nextOrder();

            // Получаем сохраненные модели из localStorage
            const saveLive2dModels = JSON.parse(localStorage.getItem('saveLive2dModels')) || {};

            // Обновляем видимость модели в localStorage
            if (saveLive2dModels.hasOwnProperty(name)) {
                saveLive2dModels[name].visible = "false";
                localStorage.setItem('saveLive2dModels', JSON.stringify(saveLive2dModels));
            }
        }
        canvas.on('animationend', handleAnimationEnd);

        _live2d_tyrano.tm.updateModel(pm);
    }

};

TYRANO.kag.ftag.master_tag.live2d_motion = {
    kag: TYRANO.kag,
    vital : ["name","mtn"],
    pm:{
        name:"",
        mtn:"",
        no:"0",
        force:"true"
    },
    start : function(pm) {
        var that = this;
        var name = pm.name;
        _live2d_tyrano.tm = tyranolive2dplugin.getTyranoManager();

        _live2d_tyrano.tm.setMotion(pm.name,pm.mtn,parseInt(pm.no),pm.force);

        TYRANO.kag.ftag.nextOrder();


    }

};

TYRANO.kag.ftag.master_tag.live2d_expression = {
    kag: TYRANO.kag,
    vital : ["name","expression"],
    pm:{
        name:"",
        expression:"",
        next:"true"

    },
    start : function(pm) {
        var that = this;
        var name = pm.name;

        _live2d_tyrano.tm = tyranolive2dplugin.getTyranoManager();

        TYRANO.kag.stat.live2d_models[pm.name]["expression"] = pm.expression;

        _live2d_tyrano.tm.setExpression(pm.name,pm.expression);

        if(pm.next=="true"){
            TYRANO.kag.ftag.nextOrder();
        }
    }
};

TYRANO.kag.ftag.master_tag.live2d_restore = {

    kag: TYRANO.kag,
    vital : [],
    pm:{

    },

    start : function(pm) {

        //モデル
        const models = $.extend({}, TYRANO.kag.stat.live2d_models);

        if(Object.keys(models).length <=0){
            TYRANO.kag.ftag.nextOrder();
            return;
        }

        TYRANO.kag.stat.live2d_models = {};
        TYRANO.kag.ftag.startTag("live2d_delete_all",{next:"false"});

        for(let key in models){
            var pm = models[key];
            pm.next="false";
            TYRANO.kag.ftag.startTag("live2d_new",pm);
        }

        for(let key in models){
            var pm = models[key];
            (function(pm){
                if(pm.expression){
                    pm.next="false";
                    setTimeout(function(){
                        TYRANO.kag.ftag.startTag("live2d_expression",pm);
                    },500);
                }
            })(pm);
        }
        TYRANO.kag.ftag.nextOrder();
    }
};


TYRANO.kag.ftag.master_tag.live2d_fadein = {

    kag: TYRANO.kag,
    vital : [],
    pm:{
        time:"1000",
        wait:"true"
    },

    start : function(pm) {

        if(pm.time=="0"){
            pm.time="10";
        }

        var j_canvas = $("#live2d_canvas_tyrano");
        if(j_canvas.length==0){
            TYRANO.kag.ftag.nextOrder();
            return;
        }

        j_canvas.animate(
            {
                "opacity":1
            },
            parseInt(pm.time),
            function(){

                if(pm.wait=="true"){
                    TYRANO.kag.ftag.nextOrder();
                }
            }
        );

        if(pm.wait=="false"){
            TYRANO.kag.ftag.nextOrder();
        }

        TYRANO.kag.stat.live2d_canvas_visible = "on";

    }

};
TYRANO.kag.ftag.master_tag.live2d_fadeout = {

    kag: TYRANO.kag,
    vital : [],
    pm:{
        time:"1000",
        wait:"true"
    },

    start : function(pm) {

        if(pm.time=="0"){
            pm.time="10";
        }

        var j_canvas = $("#live2d_canvas_tyrano");
        if(j_canvas.length==0){
            TYRANO.kag.ftag.nextOrder();
            return;
        }

        j_canvas.animate(
            {
                "opacity":0
            },
            parseInt(pm.time),
            function(){

                if(pm.wait=="true"){
                    TYRANO.kag.ftag.nextOrder();
                }
            }
        );

        if(pm.wait=="false"){
            TYRANO.kag.ftag.nextOrder();
        }

        TYRANO.kag.stat.live2d_canvas_visible = "off";

    }

};





