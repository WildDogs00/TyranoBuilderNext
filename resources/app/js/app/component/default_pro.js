_map_component.camera = {
    name: $.s("Камера"),
    component_type: "Simple",
    default_view: {icon: "s-icon-video-camera", icon_color: "#66CDAA", category: "camera"},
    param_view: {
        time: "time",
        x: "x",
        y: "y",
        zoom: "zoom",
        rotate: "rotate",
        wait: "wait",
        layer: "layer",
        ease_type: "ease_type"
    },
    param: {
        time: {
            type: "Num",
            name: $.s("Продолжительность"),
            unit: $.s("мл"),
            default_val: 1e3,
            validate: {required: !0, number: !0},
            spinner: {min: 0, max: 1e4, step: 100}
        },
        _clickable_img: {
            type: "CameraPreview",
            bound_type: "camera",
            name: $.s("Позиционирование камеры"),
            help: $.s("Предварительный просмотр камеры"),
            vital: !1,
            default_val: ""
        },
        x: {
            type: "Num",
            name: $.s("Позиция по X"),
            unit: $.s("px"),
            spinner: {min: -1e4, max: 1e4, step: 10},
            validate: {number: !0}
        },
        y: {
            type: "Num",
            name: $.s("Позиция по Y"),
            unit: $.s("px"),
            spinner: {min: -1e4, max: 1e4, step: 10},
            validate: {number: !0}
        },
        zoom: {
            type: "Num",
            name: $.s("Приближение"),
            validate: {number: !0},
            spinner: {min: -100, step: .1},
            default_val: 1
        },
        rotate: {
            type: "Num",
            name: $.s("Поворот"),
            help: $.s("Установить угол поворота камеры"),
            validate: {number: !0},
            spinner: {max: 2e3, min: -2e3, step: 10},
            default_val: 0
        },
        layer: {
            type: "Select",
            name: $.s("Цель"),
            help: $.s("Применить эффект камеры к определенному фону"),
            select_list: [{name: $.s("Захват всего (Фон, персонажи)"), val: "layer_camera"}, {
                name: $.s("Фоны"),
                val: "base"
            }, {name: $.s("Персонажи"), val: "0"}],
            default_val: ""
        },
        ease_type: {
            type: "Select",
            name: $.s("Эффект"),
            help: $.s("Выберите тип движения камеры"),
            select_list: [{name: $.s("Ease"), val: "ease"}, {name: $.s("Linear"), val: "linear"}, {
                name: $.s("Ease in"),
                val: "ease-in"
            }, {name: $.s("Ease out"), val: "ease-out"}, {name: $.s("Ease in-out"), val: "ease-in-out"}],
            default_val: ""
        },
        wait: {type: "Check", text: $.s("Дождаться движения камеры до конца, прежде чем продолжить?"), default_val: !0}
    }
}, _map_component.reset_camera = {
    name: $.s("Сброс настроек камеры"),
    component_type: "Simple",
    default_view: {icon: "fa-sharp fa-regular fa-camera-movie", icon_color: "#66CDAA", category: "camera"},
    param_view: {time: "time", wait: "wait", layer: "layer", ease_type: "ease_type"},
    param: {
        time: {
            type: "Num",
            name: $.s("Продолжительность"),
            unit: $.s("мл"),
            default_val: 1e3,
            validate: {required: !0, number: !0},
            spinner: {min: 0, max: 1e4, step: 100}
        },
        _clickable_img: {
            type: "CameraPreview",
            bound_type: "camera",
            name: $.s("Позиционирование камеры"),
            help: $.s("Предварительный просмотр камеры"),
            vital: !1,
            default_val: ""
        },
        layer: {
            type: "Select",
            name: $.s("Цель"),
            help: $.s("Применить эффект камеры к определенному фону"),
            select_list: [{name: $.s("Захват всего (Фон, персонажи)"), val: "layer_camera"}, {
                name: $.s("Фоны"),
                val: "base"
            }, {name: $.s("Персонажи"), val: "0"}],
            default_val: ""
        },
        ease_type: {
            type: "Select",
            name: $.s("Эффект"),
            help: $.s("Выберите тип движения камеры"),
            select_list: [{name: $.s("ease"), val: "ease"}, {name: $.s("linear"), val: "linear"}, {
                name: $.s("ease-in"),
                val: "ease-in"
            }, {name: $.s("ease-out"), val: "ease-out"}, {name: $.s("ease-in-out"), val: "ease-in-out"}],
            default_val: ""
        },
        wait: {type: "Check", text: $.s("Дождаться движения камеры до конца, прежде чем продолжить?"), default_val: !0}
    }
}, _map_component.wait_camera = {
    name: $.s("Ждать окончания"),
    component_type: "Simple",
    default_view: {icon: "fa-sharp fa-solid fa-watch-smart", icon_color: "#66CDAA", category: "camera"},
    param_view: {},
    param: {}
}, _map_component.bgmovie = {
    name: $.s("Видео фон"),
    component_type: "Movie",
    default_view: {base_movie_url: "data/video/", icon: "fa-sharp fa-solid fa-play", icon_color: "#ff8447", category: "bgmovie"},
    param_view: {movie_url: "storage", time: "time", volume: "volume", loop: "loop", transparentBackground: "transparentBackground"},
    param: {
        storage: {
            type: "MovieSelect",
            file_path: "video/",
            name: $.s("Видео"),
            vital: !0,
            default_val: "",
            validate: {required: !0}
        },
        time: {
            type: "Num",
            name: $.s("Продолжительность появления"),
            unit: $.s("мл"),
            default_val: 1e3,
            validate: {required: !0, number: !0},
            spinner: {min: 0, max: 1e4, step: 100}
        },
        volume: {
            type: "Num",
            name: $.s("Громкость"),
            unit: $.s("%"),
            validate: {number: !0},
            spinner: {min: 0, max: 100, step: 10},
            default_val: 100
        },
        loop: {
            type: "Check",
            text: $.s("Повторять"),
            default_val: !0,
            help: $.s("Включите чтобы зациклить воспроизведение"),
            name: ""
        },
        transparentBackground: {
            type: "Check",
            text: $.s("Сделать фон видео прозрачным?"),
            default_val: true,
            help: $.s("Работает только если у видео нет фона."),
            name: "",
        }
    }
}, _map_component.stop_bgmovie = {
    name: $.s("Остановить"),
    component_type: "Simple",
    default_view: {icon: "fa-sharp fa-solid fa-play-pause", icon_color: "#ff8447", category: "bgmovie"},
    param_view: {time: "time"},
    param: {
        time: {
            type: "Num",
            name: $.s("Продолжительность «Затухания»"),
            unit: $.s("мл"),
            validate: {number: !0},
            spinner: {min: 0, max: 1e4, step: 100},
            default_val: 1e3
        }
    }
}, _map_component.wait_bgmovie = {
    name: $.s("Ждать окончания"),
    component_type: "Simple",
    default_view: {icon: "fa-sharp fa-solid fa-watch", icon_color: "#ff8447", category: "bgmovie"},
    param_view: {time: "time"},
    param: {}
}, _map_component.tb_chara_shake = {
    name: $.s("Встряска персонажа"),
    component_type: "Simple",
    default_view: {icon: "fa-sharp fa-solid fa-person-rays", category: "character"},
    param_view: {time: "time"},
    param: {
        name: {
            type: "Select", help: $.s("Выберите персонажа, которого надо потрясти"), select_list: function (e) {
                var a = app.config.project_config.map_chara, t = [];
                t.push({name: "-", val: ""});
                for (key in a) t.push({name: key, val: key});
                return t
            }, default_val: function () {
            }, name: $.s("Персонажи")
        },
        direction: {
            type: "Select",
            name: $.s("Направление встряски"),
            help: $.s("Установите горизонтальный диапазон тряски"),
            select_list: [{name: $.s("Ширина"), val: "x"}, {name: $.s("Высота"), val: "y"}],
            default_val: "x"
        },
        count: {
            type: "Num",
            name: $.s("Частота"),
            help: $.s("Установите сколько раз нужно трясти"),
            unit: $.s("мл"),
            validate: {number: !0},
            spinner: {min: 0, max: 1e4, step: 1},
            default_val: 2
        },
        swing: {
            type: "Num",
            name: $.s("Диапазон тряски"),
            help: $.s("Установите диапазон тряски. Чем выше значение, тем больше будет трясти."),
            validate: {number: !0},
            spinner: {min: 0, max: 1e4, step: 10},
            default_val: 20
        },
        time: {
            type: "Num",
            name: $.s("Продолжительность"),
            help: $.s("Установите длительность тряски в миллисекундах. Чем выше значение, тем медленнее трясет."),
            unit: $.s("мл"),
            validate: {number: !0},
            spinner: {min: 0, max: 1e4, step: 100},
            default_val: 100
        }
    }
};