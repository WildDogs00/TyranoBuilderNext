var _pm_type = {
        target: {
            type: "Select", className: "select_param_target", select_list: function (e) {
                let a = [], t = e.get("component").data.pm.storage;
                t || (t = app.tyrano.current_edit_scenario);
                const n = app.tmp.map_label[t];
                a.push({name: "---", val: ""});
                for (let i = 0; i < n.length; i++) a.push({name: n[i], val: n[i]});
                return a
            }, name: $.s("Цель")
        }, storage: {
            type: "Select", select_list: function (e) {
                let a = [], t = $.keys(app.tmp.map_label);
                t = _.select(t, (function (e) {
                    return !_.any(["first.ks", "make.ks", "_preview.ks", "config.ks"], (function (a) {
                        return a === e
                    }))
                })), a.push({name: "---", val: ""});
                for (let n = 0; n < t.length; n++) a.push({name: t[n], val: t[n]});
                return a
            }, default_val: "", name: $.s("Расположение(Сцена)"), onChange: function (e) {
                for (let a = $(".param-content").find(".select_param_target"), t = [], n = app.tmp.map_label[e], i = 0; i < n.length; i++) t.push({
                    name: n[i],
                    val: n[i]
                });
                a.empty();
                for (i = 0; i < t.length; i++) a.append($("<option>").html(t[i].name).val(t[i].val))
            }, default_val: function () {
                return app.tyrano.current_edit_scenario
            }
        }
    }, _font_face_list = function (e) {
        const a = $.s("array_font"), t = [];
        t.push({name: "---", val: ""});
        var n = app.config.project_config.map_font;
        for (let key in n) t.push({name: key, val: key});
        for (let i = 0; i < a.length; i++) t.push({name: a[i].name, val: a[i].val});
        return t
    }, _select_list_live2d_model = function (e) {
    const a = app.live2d.models, t = [];
    for (let key in t.push({name: "-", val: ""}), a) t.push({name: key, val: key});
    return t
    }, _selectListShowAnimation = function(e) {
            m = [
                {name: "Bounce", val: "animate__bounce"},
                {name: "Head Shake", val: "animate__headShake"},
                {name: "Jack In The Box", val: "animate__jackInTheBox"},
                {name: "Fade In Up", val: "animate__fadeInUp"},
                {name: "Fade In Left", val: "animate__fadeInLeft"},
                {name: "Fade In Right", val: "animate__fadeInRight"},
                {name: "Slide In Up", val: "animate__slideInUp"},
                {name: "Slide In Left", val: "animate__slideInLeft"},
                {name: "Slide In Right", val: "animate__slideInRight"},
                {name: "Bounce In Up", val: "animate__bounceInUp"},
                {name: "Bounce In Left", val: "animate__bounceInLeft"},
                {name: "Bounce In Right", val: "animate__bounceInRight"},
                {name: "Slide In Up", val: "animate__slideInUp"},
                {name: "Slide In Left", val: "animate__slideInLeft"},
                {name: "Slide In Right", val: "animate__slideInRight"}
            ]
        return m;
    }, _selectListDeliteAnimation = function(e) {
        m = [
            {name: "Fade Out", val: "animate__fadeOut"},
            {name: "Fade Out Down", val: "animate__fadeOutDown"},
            {name: "Fade Out Left", val: "animate__fadeOutLeft"},
            {name: "Fade Out Right", val: "animate__fadeOutRight"},
            {name: "Zoom Out", val: "animate__zoomOut"},
            {name: "Slide Out Down", val: "animate__slideOutDown"},
            {name: "Slide Out Left", val: "animate__slideOutLeft"},
            {name: "Slide Out Right", val: "animate__slideOutRight"},
        ]
        return m;
    }, _select_list_bg_effects = [
        {name: $.s("FadeIn"), val: "fadeIn"}, {
        name: $.s("fadeInDown"),
        val: "fadeInDown"
    }, {name: $.s("fadeInLeft"), val: "fadeInLeft"}, {
        name: $.s("fadeInRight"),
        val: "fadeInRight"
    }, {name: $.s("fadeInUp"), val: "fadeInUp"}, {name: $.s("rotateInLeft"), val: "rotateInDownLeft"}, {
        name: $.s("rotateInRight"),
        val: "rotateInUpRight"
    }, {name: $.s("zoomIn"), val: "zoomIn"}, {name: $.s("slideInDown"), val: "slideInDown"}, {
        name: $.s("slideInLeft"),
        val: "slideInLeft"
    }, {name: $.s("slideInRight"), val: "slideInRight"}, {name: $.s("slideInUp"), val: "slideInUp"}, {
        name: $.s("bounceIn"),
        val: "bounceIn"
    }, {name: $.s("rolling"), val: "rollIn"}, {name: $.s("vanish"), val: "vanishIn"}, {name: $.s("puff"), val: "puffIn"}],
    _layermode_list = [{name: $.s("Умножение"), val: "multiply"}, {
        name: $.s("Экран"),
        val: "screen"
    }, {name: $.s("Наложение"), val: "overlay"}, {
        name: $.s("Затенение"),
        val: "darken"
    }, {name: $.s("Осветление"), val: "lighten"}, {
        name: $.s("Осветление основы"),
        val: "color-dodge"
    }, {name: $.s("Затемнение основы"), val: "color-burn"}, {
        name: $.s("Жесткий свет"),
        val: "hard-light"
    }, {name: $.s("Мягкий свет"), val: "soft-light"}, {
        name: $.s("Разница"),
        val: "difference"
    }, {name: $.s("Исключение"), val: "exclusion"}, {
        name: $.s("Оттенок"),
        val: "hue"
    }, {name: $.s("Насыщенность"), val: "saturation"}, {
        name: $.s("Цвет"),
        val: "color"
    }, {name: $.s("Свечение"), val: "luminosity"}], _ease_effect_list = [{name: "default", val: "linear"}, {
        name: "easeInQuad",
        val: "easeInQuad"
    }, {name: "easeOutQuad", val: "easeOutQuad"}, {name: "easeInOutQuad", val: "easeInOutQuad"}, {
        name: "easeInCubic",
        val: "easeInCubic"
    }, {name: "easeOutCubic", val: "easeOutCubic"}, {name: "easeInOutCubic", val: "easeInOutCubic"}, {
        name: "easeInQuart",
        val: "easeInQuart"
    }, {name: "easeOutQuart", val: "easeOutQuart"}, {name: "easeInOutQuart", val: "easeInOutQuart"}, {
        name: "easeInQuint",
        val: "easeInQuint"
    }, {name: "easeOutQuint", val: "easeOutQuint"}, {name: "easeInOutQuint", val: "easeInOutQuint"}, {
        name: "easeInExpo",
        val: "easeInExpo"
    }, {name: "easeOutExpo", val: "easeOutExpo"}, {name: "easeInCirc", val: "easeInCirc"}, {
        name: "easeOutCirc",
        val: "easeOutCirc"
    }, {name: "easeInOutCirc", val: "easeInOutCirc"}, {name: "easeInElastic", val: "easeInElastic"}, {
        name: "easeInBounce",
        val: "easeInBounce"
    }, {name: "easeOutBounce", val: "easeOutBounce"}, {name: "easeInOutBounce", val: "easeInOutBounce"}],
    _map_spinner = {time: {min: 0, step: 500}}, _map_component = {
        bg: {
            name: $.s("Изображение фона"),
            component_type: "Image",
            default_view: {base_img_url: "data/bgimage/", icon: "fa-sharp fa-regular fa-photo-film", category: "image"},
            param_view: {image_url: "storage", time: "time", method: "method", cross: "cross"},
            write_system_code: function (e) {
                this.data.name;
                const a = "./data/bgimage/" + this.data.pm.storage;
                return e.map_preload[a] ? "" : (e.map_preload[a] = "1", $.tag("preload", {storage: a}))
            },
            param: {
                storage: {
                    type: "ImageSelect",
                    file_path: "bgimage/",
                    name: $.s("Фон"),
                    help: $.s("Выбранное изображение будет использоваться в качестве фона."),
                    vital: !0,
                    default_val: "",
                    validate: {required: !0}
                },
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    help: $.s("С помощью этой функции можно задать время смены фона."),
                    spinner: _map_spinner.time,
                    default_val: 1e3,
                    validate: {number: !0}
                },
                method: {
                    type: "Select",
                    select_list: _select_list_bg_effects,
                    help: $.s("Предлагается список из нескольких переходов для смены фона. Выберете нужный вам эффект."),
                    default_val: "crossfade",
                    name: $.s("Эффект (при переходе)")
                },
                cross: {
                    type: "Check",
                    text: $.s("Применить эффект к исходному фону"),
                    default_val: !1,
                    name: $.s("Эффекты")
                }
            }
        },
        tb_image_show: {
            name: function (e) {
                return $.s("Показать картинку")
            },
            header: function (e) {
                return e.data.pm.storage
            },
            component_type: "Image",
            default_view: {base_img_url: "data/fgimage/", icon: "fa-sharp fa-solid fa-image", category: "image"},
            param_view: {
                image_url: "storage",
                time: "time",
                _clickable_img: "_clickable_img",
                width: "width",
                height: "height",
                x: "x",
                y: "y"
            },
            write_system_code: function (e) {
                this.data.name;
                var a = "./data/fgimage/" + this.data.pm.storage;
                return e.map_preload[a] ? "" : (e.map_preload[a] = "1", $.tag("preload", {storage: a}))
            },
            param: {
                storage: {
                    type: "ImageSelect",
                    file_path: "fgimage/default/",
                    name: $.s("Графическая кнопка"),
                    help: $.s("Кнопка, в качестве фона которой выступает установленная вами картинка."),
                    vital: !0,
                    default_val: "",
                    validate: {required: !0}
                },
                _clickable_img: {
                    type: "BoundSelect",
                    bound_type: "image",
                    file_path: "bgimage/",
                    name: $.s("Позиционирование"),
                    help: $.s("Установить положение кнопки на экране через графический интерфейс."),
                    vital: !1,
                    default_val: ""
                },
                x: {
                    type: "Num",
                    name: $.s("Горизонтальное положение (Х)"),
                    unit: $.s("px"),
                    help: $.s("Положение элемента на экране по X координате."),
                    validate: {number: !0}
                },
                y: {
                    type: "Num",
                    name: $.s("Вертикальное положение (Y)"),
                    unit: $.s("px"),
                    help: $.s("Положение элемента на экране по Y координате."),
                    validate: {number: !0}
                },
                width: {
                    type: "Num",
                    name: $.s("Ширина"),
                    unit: $.s("px"),
                    help: $.s("Ширина элемента."),
                    validate: {number: !0}
                },
                height: {
                    type: "Num",
                    name: $.s("Высота"),
                    unit: $.s("px"),
                    help: $.s("Высота элемента."),
                    validate: {number: !0}
                },
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    help: $.s("Определяет то, как долго элемент будет отображаться."),
                    spinner: _map_spinner.time,
                    default_val: 1e3,
                    validate: {number: !0},
                    spinner: {min: 1, step: 500}
                }
            }
        },
        imageShowN: {
            name: function (e) {
                return $.s("Показать картинку (N)")
            },
            header: function (e) {
                return e.data.pm.storage
            },
            component_type: "Image",
            default_view: {base_img_url: "data/fgimage/", icon: "fa-sharp fa-solid fa-image", category: "image"},
            param_view: {
                image_url: "storage",
                time: "time",
                _clickable_img: "_clickable_img",
                width: "width",
                height: "height",
                x: "x",
                y: "y"
            },
            write_system_code: function (e) {
                this.data.name;
                var a = "./data/fgimage/" + this.data.pm.storage;
                return e.map_preload[a] ? "" : (e.map_preload[a] = "1", $.tag("preload", {storage: a}))
            },
            param: {
                storage: {
                    type: "ImageSelect",
                    file_path: "fgimage/default/",
                    name: $.s("Графическая кнопка"),
                    help: $.s("Кнопка, в качестве фона которой выступает установленная вами картинка."),
                    vital: !0,
                    default_val: "",
                    validate: {required: !0}
                },
                _clickable_img: {
                    type: "BoundSelect",
                    bound_type: "image",
                    file_path: "bgimage/",
                    name: $.s("Позиционирование"),
                    help: $.s("Установить положение кнопки на экране через графический интерфейс."),
                    vital: !1,
                    default_val: ""
                },
                idImage: {
                    type: "Text",
                    name: $.s("ID"),
                    help: $.s("ID картинки, нужен для того, чтобы скрывать только определенную картинку."),
                    default_val: ""
                },
                zIndex: {
                    type: "Num",
                    name: $.s("Z-Index"),
                    help: $.s("Определяет то, насколько выше или ниже картинка будет относительно других элементов."),
                    spinner: {min: 1, step: 100},
                    default_val: "1"
                },
                selectAnimationList: {
                    type: "Select",
                    name: $.s("Анимация"),
                    help: $.s("Анимация поялвения изображения."),
                    select_list: [{
                        name: $.s("Bounce"),
                        val: "animate__bounce"
                    },
                        {
                            name: $.s("Fade In"),
                            val: "animate__fadeIn"
                        },
                        {
                            name: $.s("Flash"),
                            val: "animate__flash"
                        },
                        {
                            name: $.s("Pulse"),
                            val: "animate__pulse"
                        },
                        {
                            name: $.s("Rubber Band"),
                            val: "animate__rubberBand"
                        },
                        {
                            name: $.s("Shake X"),
                            val: "animate__shakeX"
                        },
                        {
                            name: $.s("Shake Y"),
                            val: "animate__shakeY"
                        },
                        {
                            name: $.s("Swing"),
                            val: "animate__swing"
                        },
                        {
                            name: $.s("Tada"),
                            val: "animate__tada"
                        },
                        {
                            name: $.s("Jello"),
                            val: "animate__jello"
                        },
                        {
                            name: $.s("Heart Beat"),
                            val: "animate__heartBeat"
                        },
                        {
                            name: $.s("Back In Down"),
                            val: "animate__backInDown"
                        },
                        {
                            name: $.s("Back In Left"),
                            val: "animate__backInLeft"
                        },
                        {
                            name: $.s("Back In Right"),
                            val: "animate__backInRight"
                        },
                        {
                            name: $.s("Back In Up"),
                            val: "animate__backInUp"
                        },
                        {
                            name: $.s("Fade In Up"),
                            val: "animate__fadeInUp"
                        },
                        {
                            name: $.s("Fade In Down"),
                            val: "animate__fadeInDown"
                        },
                        {
                            name: $.s("Flip"),
                            val: "animate__flip"
                        },
                        {
                            name: $.s("Flip In X"),
                            val: "animate__flipInX"
                        },
                        {
                            name: $.s("Flip In Y"),
                            val: "animate__flipInY"
                        },
                        {
                            name: $.s("Light Speed In Right"),
                            val: "animate__lightSpeedInRight"
                        },
                        {
                            name: $.s("Light Speed In Left"),
                            val: "animate__lightSpeedInLeft"
                        },
                        {
                            name: $.s("Jack In The Box"),
                            val: "animate__jackInTheBox"
                        },
                        {
                            name: $.s("Zoom In"),
                            val: "animate__zoomIn"
                        },
                        {
                            name: $.s("Slide In Down"),
                            val: "animate__slideInDown"
                        },
                        {
                            name: $.s("Slide In Up"),
                            val: "animate__slideInUp"
                        },
                        {
                            name: $.s("Нет"),
                            val: "no"
                        }
                    ],
                    default_val: "animate__fadeIn"
                },
                repeatingAnimationList: {
                    type: "Select",
                    name: $.s("Повторение"),
                    help: $.s("Определяет сколько раз будет повторяться анимация."),
                    select_list: [
                        {
                            name: $.s("Один повтор"),
                            val: "animate__repeat-1"
                        },
                        {
                            name: $.s("Два повтора"),
                            val: "animate__repeat-2"
                        },
                        {
                            name: $.s("Три повтора"),
                            val: "animate__repeat-3"
                        },
                        {
                            name: $.s("Бесконечно"),
                            val: "animate__infinite"
                        }
                    ],
                    default_val: "animate__repeat-1"
                },
                x: {
                    type: "Num",
                    name: $.s("Горизонтальное положение (Х)"),
                    unit: $.s("px"),
                    help: $.s("Положение элемента на экране по X координате."),
                    validate: {number: !0}
                },
                y: {
                    type: "Num",
                    name: $.s("Вертикальное положение (Y)"),
                    unit: $.s("px"),
                    help: $.s("Положение элемента на экране по Y координате."),
                    validate: {number: !0}
                },
                width: {
                    type: "Num",
                    name: $.s("Ширина"),
                    unit: $.s("px"),
                    help: $.s("Ширина элемента."),
                    validate: {number: !0}
                },
                height: {
                    type: "Num",
                    name: $.s("Высота"),
                    unit: $.s("px"),
                    help: $.s("Высота элемента."),
                    validate: {number: !0}
                },
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("s"),
                    help: $.s("Продолжительность анимации в секундах. Чем дольше продолжительность анимации, тем медленнее воспроизводится анимация."),
                    default_val: 1,
                    validate: {number: !0},
                    spinner: {min: 1, step: 500}
                }
            }
        },
        tb_image_hide: {
            name: function (e) {
                return $.s("Скрыть картинку")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-image-slash", category: "image"},
            param_view: {time: "time"},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    help: $.s("Указывает, сколько времени требуется для исчезновения."),
                    spinner: _map_spinner.time,
                    default_val: 1e3,
                    validate: {number: !0}
                },
            }
        },
        imageHideN: {
            name: function (e) {
                return $.s("Скрыть картинку (N)")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-image-slash", category: "image"},
            param_view: {time: "time"},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    help: $.s("Указывает, сколько времени требуется для исчезновения."),
                    spinner: _map_spinner.time,
                    default_val: 1000,
                    validate: {number: !0}
                },
                idImage: {
                    type: "Text",
                    name: $.s("ID"),
                    help: $.s("ID картинки, нужен для того, чтобы скрывать только определенную картинку. Оставьте 0 чтобы скрыть все картинки, или укажите ID изображения чтобы скрыть определенную картинку."),
                    default_val: "0"
                },
                selectAnimationList: {
                    type: "Select",
                    name: $.s("Анимация"),
                    help: $.s("Анимация исчезновения изображения."),
                    select_list: [
                        {
                            name: $.s("Fade Out"),
                            val: "animate__fadeOut"
                        },
                        {
                            name: $.s("Back Out Up"),
                            val: "animate__backOutUp"
                        },
                        {
                            name: $.s("Bounce Out"),
                            val: "animate__bounceOut"
                        },
                        {
                            name: $.s("Flip Out X"),
                            val: "animate__flipOutX"
                        },
                        {
                            name: $.s("Flip Out Y"),
                            val: "animate__flipOutY"
                        },
                        {
                            name: $.s("Rotate Out"),
                            val: "animate__rotateOut"
                        },
                        {
                            name: $.s("Zoom Out"),
                            val: "animate__zoomOut"
                        },
                        {
                            name: $.s("Slide Out Down"),
                            val: "animate__slideOutDown"
                        }
                    ],
                    default_val: "animate__fadeOut"
                },
            }
        },
        edit: {
            name: function (e) {
                return $.s("Поле ввода")
            },
            header: function (e) {
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-input-text", icon_color: "#D2691E", category: "eval"},
            param_view: {
                _clickable_img: "_clickable_img",
                name: "name",
                width: "width",
                height: "height",
                left: "left",
                top: "top"
            },
            param: {
                name: {
                    type: "Variable",
                    name: $.s("Переменная"),
                    help: $.s("Выберете переменную, в которую сохраниться значение.")
                },
                _clickable_img: {
                    type: "BoundSelect",
                    bound_type: "textbox",
                    file_path: "bgimage/",
                    name: $.s("Положение изображения"),
                    help: $.s("Используйте для визуального позиционирования и изменения размера элемента на экране."),
                    vital: !1,
                    default_val: ""
                },
                left: {
                    type: "Num",
                    name: $.s("Горизонтальное положение (Х)"),
                    default_val: 100,
                    unit: $.s("px"),
                    help: $.s("Положение элемента на экране по X координате."),
                    validate: {number: !0}
                },
                top: {
                    type: "Num",
                    name: $.s("Вертикальное положение (Y)"),
                    default_val: 100,
                    unit: $.s("px"),
                    help: $.s("Положение элемента на экране по Y координате."),
                    validate: {number: !0}
                },
                width: {
                    type: "Num",
                    name: $.s("Ширина"),
                    default_val: 200,
                    unit: $.s("px"),
                    help: $.s("Ширина элемента."),
                    validate: {number: !0}
                },
                height: {
                    type: "Num",
                    name: $.s("Высота"),
                    default_val: 40,
                    unit: $.s("px"),
                    help: $.s("Высота элемента."),
                    validate: {number: !0}
                },
                size: {
                    type: "Num",
                    name: $.s("Размер шрифта"),
                    default_val: 20,
                    unit: $.s("px"),
                    spinner: {min: 1, step: 1},
                    help: $.s("Устанавливает размер шрифта."),
                    validate: {number: !0}
                },
                maxchars: {
                    type: "Num",
                    name: $.s("Максимальное количество символов"),
                    default_val: 200,
                    spinner: {min: 1, step: 1},
                    help: $.s("Ограничивает количество символов, которое можно ввести."),
                    validate: {number: !0}
                }
            }
        },
        tb_start_text: {
            name: $.s("Текст"),
            component_type: "TextCode",
            default_view: {icon: "fa-sharp fa-solid fa-text-size"},
            param_view: {mode: "mode"},
            param: {
                mode: {
                    type: "Select",
                    name: $.s("Поведение"),
                    help: $.s("Настройка поведения текста в игре."),
                    select_list: [{
                        name: $.s("Дождаться нажатия и скрыть текст [p]"),
                        val: "1"
                    }, {name: $.s("Дождаться нажатия и продолжить текст на строке ниже [l][r]"), val: "2"}, {
                        name: $.s("Автоматически перевести текст на новую строку [r]"),
                        val: "3"
                    }, {name: $.s("Ничего не делать"), val: "4"}],
                    default_val: "1"
                }
            }
        },
        text: {name: $.s("Текст(old)"), component_type: "Text", default_view: {icon: "text"}, param_view: {}, param: {}},
        cm: {
            name: $.s("Обновление сцены"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-rotate-right", slide_button: !1, category: "scenario"},
            param_view: {},
            param: {}
        },
        hidemessage: {
            name: $.s("Скрыть окно сообщения"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-message-xmark", slide_button: !1, category: "effect"},
            param_view: {},
            param: {}
        },
        stopbgm: {
            name: $.s("Выключить музыку"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-volume-xmark", category: "media"},
            param_view: {fadeout: !1, time: "time"},
            param: {
                fadeout: {
                    type: "Check",
                    text: $.s("Затухание"),
                    default_val: !1,
                    name: $.s("Эффект")
                },
                time: {
                    type: "Num",
                    name: $.s("Продолжительность «Затухания»"),
                    unit: $.s("мл"),
                    validate: {number: !0},
                    spinner: {min: 0, max: 99999, step: 100},
                    default_val: 1e3
                }
            }
        },
        stopse: {
            name: $.s("Выключить звуковой эффект"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-music-note-slash", category: "media"},
            param_view: {fadeout: !1, time: "time"},
            param: {
                fadeout: {
                    type: "Check",
                    text: $.s("Затухание"),
                    default_val: !1,
                    name: $.s("Эффект")},
                time: {
                    type: "Num",
                    name: $.s("Продолжительность «Затухания»"),
                    unit: $.s("мл"),
                    validate: {number: !0},
                    spinner: {min: 0, max: 99999, step: 100},
                    default_val: 1e3
                },
                buf: {
                    type: "Select",
                    name: $.s("Канал"),
                    help: $.s("Канал, на котором должен быть остановлен звуковой эффект."),
                    select_list: [{name: "0", val: "0"}, {name: "1", val: "1"}, {name: "2", val: "2"}, {
                        name: "3",
                        val: "3"
                    }, {name: "4", val: "4"}, {name: "5", val: "5"}],
                    default_val: "0"
                }
            }
        },
        quake: {
            name: $.s("Тряска экрана"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-waveform", slide_button: !1, category: "text"},
            param_view: {},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    default_val: 300,
                    validate: {required: !0, number: !0}
                },
                count: {
                    type: "Num",
                    name: $.s("Частота"),
                    spinner: {min: 0, step: 1},
                    default_val: "3",
                    validate: {required: !0, number: !0}
                },
                hmax: {
                    type: "Num",
                    name: $.s("По оси X"),
                    default_val: "10",
                    validate: {number: !0}},
                vmax: {
                    type: "Num",
                    name: $.s("По оси Y"),
                    validate: {number: !0}},
                wait: {
                    type: "Check",
                    text: $.s("Дождаться окончания тряски?"),
                    default_val: !0}
            }
        },
        mask: {
            name: $.s("Скрыть экран"),
            component_type: "Simple",
            default_view: {
                base_img_url: "data/image/",
                icon: "fa-sharp fa-solid fa-desktop",
                icon_color: "#483D8B",
                category: "screen_effect"
            },
            param_view: {image_url: "storage", time: "time", method: "method", cross: "cross"},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    help: $.s("Продолжительность эффекта смешивания."),
                    spinner: _map_spinner.time,
                    default_val: 1e3,
                    validate: {number: !0}
                },
                effect: {
                    type: "Select",
                    select_list: _select_list_bg_effects,
                    help: $.s("Выбор эффекта."),
                    default_val: "fadeIn",
                    name: $.s("Эффект (при переходе)")
                },
                color: {
                    type: "Color",
                    name: $.s("Цвет"),
                    default_val: "0x000000",
                    validate: {required: !0}},
                graphic: {
                    type: "ImageSelect",
                    file_path: "image/",
                    name: $.s("Изображение"),
                    help: $.s("Изображение, за которым будет скрыт экран."),
                    vital: !1,
                    default_val: ""
                }
            }
        },
        mask_off: {
            name: $.s("Показать экран"),
            component_type: "Simple",
            default_view: {
                icon: "fa-sharp fa-regular fa-desktop",
                icon_color: "#483D8B",
                category: "screen_effect"},
            param_view: {},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    help: $.s("Время, за которое экран будет снова показан."),
                    spinner: _map_spinner.time,
                    default_val: 1e3,
                    validate: {number: !0}
                }, effect: {
                    type: "Select", select_list: function () {
                        for (var e = [], a = 0; a < _select_list_bg_effects.length; a++) e[a] = {
                            name: _select_list_bg_effects[a].name,
                            val: _select_list_bg_effects[a].val.replace("In", "Out")
                        };
                        return e
                    }, help: $.s("Выбор эффекта."), default_val: "fadeOut", name: $.s("Эффект (при переходе)")
                }
            }
        },
        layermode: {
            name: $.s("Смешивание изображения"),
            component_type: "Image",
            default_view: {
                base_img_url: "data/image/",
                icon: "fa-sharp fa-solid fa-layer-group",
                icon_color: "#483D8B",
                category: "screen_effect"
            },
            param_view: {image_url: "graphic"},
            param: {
                graphic: {
                    type: "ImageSelect",
                    file_path: "image/",
                    name: $.s("Смешиваемое изображение"),
                    vital: !0,
                    default_val: "",
                    validate: {required: !0}
                },
                mode: {
                    type: "Select",
                    name: $.s("Режим"),
                    help: $.s("Выбор режима смешивания."),
                    select_list: _layermode_list,
                    default_val: "multiply"
                },
                _preview: {
                    type: "PreviewButton",
                    bound_type: "camera",
                    name: $.s("Предпросмотр"),
                    vital: !1,
                    default_val: ""
                },
                color: {
                    type: "Color",
                    name: $.s("Цвет смешивания"),
                    default_val: "0xffffff",
                    validate: {required: !0}},
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    help: $.s("Определяет то, как долго элемент будет отображаться."),
                    spinner: _map_spinner.time,
                    default_val: 1e3,
                    validate: {number: !0},
                    spinner: {min: 1, step: 500}
                },
                wait: {
                    type: "Check",
                    text: $.s("Дождаться завершения смешивания?"),
                    default_val: !0},
                name: {
                    type: "Text",
                    name: $.s("ID"),
                    help: $.s("Если указать ID, то можно отменить смешивание по определенному ID."),
                    default_val: ""
                }
            }
        },
        layermode_movie: {
            component_type: "Movie",
            name: $.s("Смешать видео"),
            default_view: {
                base_movie_url: "data/video/",
                category: "screen_effect",
                icon: "fa-sharp fa-solid fa-bring-forward",
                icon_color: "#483D8B"
            },
            param_view: {movie_url: "video"},
            param: {
                video: {
                    type: "MovieSelect",
                    file_path: "video/",
                    name: $.s("Видео"),
                    vital: !0,
                    default_val: "",
                    validate: {required: !0}
                },
                mode: {
                    type: "Select",
                    name: $.s("Режим"),
                    help: $.s("Выбор режима смешивания."),
                    select_list: _layermode_list,
                    default_val: "multiply"
                },
                _preview: {
                    type: "PreviewButton",
                    bound_type: "camera",
                    name: $.s("Предпросмотр"),
                    vital: !1,
                    default_val: ""
                },
                speed: {
                    type: "Num",
                    name: $.s("Скорость воспроизведения"),
                    unit: $.s("%"),
                    validate: {number: !0},
                    spinner: {min: 0, max: 100, step: .1},
                    default_val: 1
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
                    text: $.s("Повторять?"),
                    default_val: "true",
                    name: ""},
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    help: $.s("Определяет то, как долго элемент будет отображаться."),
                    spinner: _map_spinner.time,
                    default_val: 1e3,
                    validate: {number: !0},
                    spinner: {min: 1, step: 500}
                },
                wait: {type: "Check", text: $.s("Дождаться завершения смешивания?"), default_val: !0},
                name: {
                    type: "Text",
                    name: $.s("ID"),
                    help: $.s("Если указать ID, то можно отменить смешивание по определенному ID."),
                    default_val: ""
                }
            }
        },
        free_layermode: {
            name: $.s("Отменить смешение"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-regular fa-layer-group", icon_color: "#483D8B", category: "screen_effect"},
            param_view: {},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    help: $.s("Смешивание будет отменено в течении указанного времени."),
                    spinner: _map_spinner.time,
                    default_val: 1e3,
                    validate: {number: !0}
                },
                wait: {type: "Check", text: $.s("Дождаться завершения?"), default_val: !0},
                name: {
                    type: "Text",
                    name: $.s("ID для отмены"),
                    help: $.s("Укажите ID смешивания, которое хотите скрыть."),
                    default_val: ""
                }
            }
        },
        movie: {
            name: $.s("Видео"),
            component_type: "Movie",
            default_view: {base_movie_url: "data/video/", category: "media", icon: "fa-sharp fa-solid fa-film"},
            param_view: {movie_url: "storage", volume: "volume", skip: "skip"},
            param: {
                storage: {
                    type: "MovieSelect",
                    file_path: "video/",
                    name: $.s("Видео"),
                    vital: !0,
                    default_val: "",
                    validate: {required: !0}
                },
                volume: {
                    type: "Num",
                    name: $.s("Громкость"),
                    unit: $.s("%"),
                    validate: {number: !0},
                    spinner: {min: 0, max: 100, step: 10},
                    default_val: 100
                },
                skip: {
                    type: "Check",
                    text: $.s("Пропускаемое"),
                    default_val: !1,
                    help: $.s("Если переключатель активирован, то это позволит пропустить видео нажав на него."),
                    name: ""
                },
                control_buttons: {
                    type: "Check",
                    text: $.s("Кнопки управления"),
                    default_val: !1,
                    help: $.s("Активирует показ кнопок управления на видео плеере."),
                    name: ""
                },
            }
        },
        tb_show_message_window: {
            name: $.s("Показать текстовое поле"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-message", category: "effect"},
            param_view: {},
            param: {}
        },
        tb_hide_message_window: {
            name: $.s("Скрыть текстовое поле"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-message-slash", category: "effect"},
            param_view: {},
            param: {}
        },
        s: {
            name: $.s("Стоп"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-circle-stop", icon_color: "red", category: "scenario"},
            param_view: {},
            param: {}
        },
        wait: {
            name: $.s("Ожидание"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-circle-pause", category: "text"},
            param_view: {time: "time"},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    default_val: 3e3,
                    validate: {required: !0, number: !0}
                }
            }
        },
        delay: {
            name: $.s("Скорость текста"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-gauge-low", category: "effect"},
            param_view: {speed: "speed"},
            param: {
                speed: {
                    type: "Num",
                    name: $.s("Скорость"),
                    default_val: 30,
                    unit: $.s("мл"),
                    help: $.s("Изменяет скорость отображения текста. 10 - быстро, 30 - нормально и 50 - медленно."),
                    validate: {required: !0, number: !0},
                    spinner: {min: 0, max: 99999, step: 1}
                }
            }
        },
        font: {
            name: $.s("Изменение шрифта"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-text-height", category: "effect"},
            param_view: {},
            param: {
                size: {
                    type: "Num",
                    name: $.s("Размер"),
                    default_val: 14,
                    unit: $.s("px"),
                    spinner: {min: 6, max: 200, step: 1},
                    validate: {number: !0}
                },
                color: {
                    type: "Color",
                    name: $.s("Цвет"),
                    default_val: "0x000000",
                    validate: {
                        required: true
                    }
                },
                face: {
                    type: "Select",
                    name: $.s("Выбор шрифта"), help: "", select_list: _font_face_list},
                bold: {
                    type: "Check",
                    text: $.s("Жирный текст"), default_val: !1, name: ""},
                italic: {
                    type: "Check",
                    text: $.s("Курсивный текст"), default_val: !1, name: ""}
            }
        },
        resetfont: {
            name: $.s("Сбросить шрифт"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-text-slash", category: "effect"},
            param_view: {},
            param: {}
        },
        tb_fuki_start: {
            name: $.s("Показать речевое облачко"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-thought-bubble", category: "effect"},
            param_view: {},
            param: {}
        },
        tb_fuki_stop: {
            name: $.s("Скрыть речевое облачко"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-regular fa-thought-bubble", category: "effect"},
            param_view: {},
            param: {}
        },
        playbgm: {
            name: $.s("Включить музыку"),
            header: function (e) {
                return e.data.pm.storage
            },
            component_type: "Sound",
            default_view: {base_sound_url: "data/bgm/", icon: "fa-sharp fa-solid fa-volume"},
            param_view: {
                sound_url: "storage",
                volume: "volume",
                fadein: !1,
                time: "time",
                loop: "loop",
                click: "click",
                html5: "html5"
            },
            param: {
                storage: {
                    type: "SoundSelect", file_path: "bgm/",
                    name: $.s("Выбор музыки"), vital: !0, default_val: ""},
                volume: {
                    type: "Num",
                    name: $.s("Громкость"),
                    unit: $.s("%"),
                    validate: {number: !0},
                    spinner: {min: 0, max: 100, step: 10},
                    default_val: 100
                },
                fadein: {
                    type: "Check",
                    text: $.s("Эффект появления музыки."),
                    default_val: !1,
                    name: $.s("Эффект")},
                time: {
                    type: "Num",
                    name: $.s("Продолжительность появления"),
                    unit: $.s("мл"),
                    validate: {number: !0},
                    spinner: {min: 0, max: 99999, step: 100},
                    default_val: 1e3
                },
                loop: {type: "Check", text: $.s("Повторять?"), default_val: "true", name: ""},
                html5: {
                    type: "Check",
                    text: $.s("HTML5 Аудио"),
                    help: $.s("Для воспроизведения используется HTML5Audio. Задержка при воспроизведении уменьшается, но регулировка громкости и другие функции не работают на некоторых смартфонах."),
                    default_val: !1,
                    name: ""
                }
            }
        },
        playse: {
            name: $.s("Включить звуковой эффект"),
            component_type: "Sound",
            default_view: {base_sound_url: "data/sound/", icon: "fa-sharp fa-solid fa-music-note"},
            param_view: {
                sound_url: "storage",
                loop: "loop",
                volume: "100",
                fadein: !1,
                time: "1000",
                clear: "click",
                click: "click"
            },
            param: {
                storage: {
                    type: "SoundSelect",
                    file_path: "sound/",
                    name: $.s("Выбор звукового эффекта"), vital: !0, default_val: ""},
                volume: {
                    type: "Num",
                    name: $.s("Громкость"),
                    unit: $.s("%"),
                    validate: {number: !0},
                    spinner: {min: 0, max: 100, step: 10},
                    default_val: 100
                },
                fadein: {
                    type: "Check",
                    text: $.s("Эффект появления"),
                    default_val: !1,
                    name: $.s("Эффект")},
                time: {
                    type: "Num",
                    name: $.s("Продолжительность появления"),
                    unit: $.s("мл"),
                    validate: {number: !0},
                    spinner: {min: 0, max: 99999, step: 100},
                    default_val: 1e3
                },
                buf: {
                    type: "Select",
                    name: $.s("Канал"),
                    help: $.s("Выберите канал, на котором проигрывать звуковой эффект."),
                    select_list: [{name: "0", val: "0"}, {name: "1", val: "1"}, {name: "2", val: "2"}, {
                        name: "3",
                        val: "3"
                    }, {name: "4", val: "4"}, {name: "5", val: "5"}],
                    default_val: "0"
                },
                loop: {
                    type: "Check",
                    text: $.s("Повторять?"),
                    name: $.s("Эффект")},
                clear: {
                    type: "Check",
                    text: $.s("Заглушить другие звуковые эффекты?")},
                html5: {
                    type: "Check",
                    text: $.s("HTML5 Аудио"),
                    help: $.s("Для воспроизведения используется HTML5Audio. Задержка при воспроизведении уменьшается, но регулировка громкости и другие факторы игнорируются на некоторых смартфонах."),
                    default_val: !1,
                    name: ""
                }
            }
        },
        wbgm: {
            name: $.s("Ждать окончания музыки"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-circle-pause", category: "media"},
            param_view: {},
            param: {}
        },
        wse: {
            name: $.s("Ждать окончания звукового эффекта"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-circle-pause", category: "media"},
            param_view: {},
            param: {}
        },
        chara_show: {
            name: function (e) {
                return $.s("Персонаж")
            },
            header: function (e) {
                return e.data.pm.name
            },
            component_type: "Simple",
            default_view: {
                base_img_url: "data/fgimage/",
                icon: "fa-sharp fa-solid fa-person", icon_color: "red", category: "character"},
            custom_image_url: function (e) {
            },
            param_view: {
                image_url: "storage",
                time: "time", wait: "wait", left: "left", top: "top"},
            param: {
                name: {
                    type: "Select", help: $.s("Выберите персонажа, который должен появится."), select_list: function (e) {
                        var a = app.config.project_config.map_chara, t = [];
                        t.push({name: "-", val: ""});
                        var n = 0;
                        for (key in a) if (n++, t.push({name: key, val: key}), "trial" == global_build && n >= 3) break;
                        return t
                    }, default_val: function () {
                    }, name: $.s("Список персонажей")
                },
                storage: {
                    type: "ImageSelect",
                    file_path: function (e) {
                        return "fgimage/chara/" + app.config.project_config.map_chara[e.data.pm.name] + "/"
                    },
                    folder_select: "none",
                    window_title: $.s("Выбор персонажа"),
                    name: $.s("Изображение"),
                    vital: !0,
                    default_val: ""
                },
                _clickable_img: {
                    type: "BoundSelect",
                    bound_type: "chara",
                    file_path: "bgimage/",
                    name: $.s("Позиционирование"),
                    help: $.s("Используйте для визуального позиционирования и изменения размера элемента на экране."),
                    vital: !1,
                    default_val: ""
                },
                left: {
                    type: "Num",
                    name: $.s("Горизонтальное положение (Х)"),
                    unit: $.s("px"),
                    help: $.s("Вы можете указать положение персонажа. Если не указано, положение определяется автоматически."),
                    validate: {number: !0}
                },
                top: {
                    type: "Num",
                    name: $.s("Вертикальное положение (Y)"),
                    unit: $.s("px"),
                    help: $.s("Вы можете указать положение персонажа. Если не указано, положение определяется автоматически."),
                    validate: {number: !0}
                },
                width: {
                    type: "Num",
                    name: $.s("Ширина"),
                    unit: $.s("px"),
                    validate: {number: !0}
                },
                height: {
                    type: "Num",
                    name: $.s("Высота"),
                    unit: $.s("px"),
                    validate: {number: !0}
                },
                reflect: {
                    type: "Check",
                    name: $.s("Ориентация"),
                    text: $.s("Отразить изображение?"),
                    default_val: !1,
                    onChange: function (e, a, t) {
                        if ("standard" == global_build) return $.alertProOnly(), t.prop("checked", !1), !1;
                        app.component.changeParam(a, "reflect", t.prop("checked"))
                    }
                },
                time: {type: "Num", name: $.s("Продолжительность"), unit: $.s("мл"), validate: {number: !0}, default_val: 1e3},
                wait: {type: "Check", text: $.s("Дождаться окончания, прежде чем продолжить?"), default_val: !0}
            }
        },
        chara_hide: {
            name: function (e) {
                return $.s("Убрать со сцены")
            },
            header: function (e) {
                return e.data.pm.name
            },
            component_type: "Simple",
            default_view: {base_img_url: "data/fgimage/", icon: "fa-sharp fa-solid fa-person-circle-minus", category: "character"},
            param_view: {name: "name", time: "time"},
            param: {
                name: {
                    type: "Select", select_list: function (e) {
                        var a = app.config.project_config.map_chara, t = [];
                        for (key in a) t.push({name: key, val: key});
                        return t
                    }, default_val: function () {
                        var e = app.config.project_config.map_chara;
                        for (key in e) return key
                    }, name: $.s("Список персонажей")
                },
                time: {type: "Num", name: $.s("Продолжительность"), unit: $.s("мл"), validate: {number: !0}, default_val: 1e3},
                wait: {type: "Check", text: $.s("Дождаться окончания, прежде чем продолжить?"), default_val: !0},
                pos_mode: {type: "Check", text: $.s("Корректировка положения после выхода?"), default_val: !0}
            }
        },
        chara_hide_all: {
            name: function (e) {
                return $.s("Убрать всех персонажей")
            },
            header: function (e) {
                return e.data.pm.name
            },
            component_type: "Simple",
            default_view: {
                base_img_url: "data/fgimage/", icon: "fa-sharp fa-solid fa-person-circle-xmark", category: "character"},
            param_view: {name: "name", time: "time"},
            param: {
                time: {type: "Num", name: $.s("Продолжительность"), unit: $.s("мл"), validate: {number: !0}, default_val: 1e3},
                wait: {type: "Check", text: $.s("Дождаться окончания, прежде чем продолжить?"), default_val: !0}
            }
        },
        chara_mod: {
            name: $.s("Состояние"),
            component_type: "Image",
            default_view: {base_img_url: "data/fgimage/", icon: "fa-sharp fa-solid fa-person-walking-arrow-loop-left", category: "character"},
            param_view: {name: "name", image_url: "storage"},
            write_system_code: function (e) {
                this.data.name;
                var a = "./data/fgimage/" + this.data.pm.storage;
                return console.log(a), e.map_preload[a] ? "" : (e.map_preload[a] = "1", $.tag("preload", {storage: a}))
            },
            param: {
                name: {
                    type: "Select", select_list: function (e) {
                        var a = app.config.project_config.map_chara, t = [];
                        for (key in a) t.push({name: key, val: key});
                        return t
                    }, default_val: function () {
                        var e = app.config.project_config.map_chara;
                        for (key in e) return key
                    }, name: $.s("Список персонажей")
                },
                storage: {
                    type: "ImageSelect",
                    file_path: function (e) {
                        return "fgimage/chara/" + app.config.project_config.map_chara[e.data.pm.name] + "/"
                    },
                    folder_select: "none",
                    window_title: $.s("Выбор персонажа"),
                    name: $.s("Изображение"),
                    vital: !0,
                    default_val: ""
                },
                time: {type: "Num", name: $.s("Продолжительность"), unit: $.s("мл"), validate: {number: !0}, default_val: 600},
                cross: {type: "Check", text: $.s("Затухание оригинального выражения?"), default_val: !0}
            }
        },
        chara_move: {
            name: $.s("Анимация персонажа"),
            component_type: "Simple",
            default_view: {base_img_url: "data/fgimage/", icon: "fa-sharp fa-solid fa-person-skating", category: "character"},
            param_view: {name: "name", image_url: "storage"},
            param: {
                name: {
                    type: "Select", select_list: function (e) {
                        var a = app.config.project_config.map_chara, t = [];
                        for (key in a) t.push({name: key, val: key});
                        return t
                    }, default_val: function () {
                        var e = app.config.project_config.map_chara;
                        for (key in e) return key
                    }, name: $.s("Список персонажей")
                },
                _clickable_img: {
                    type: "BoundSelectAnim",
                    bound_type: "chara_move",
                    file_path: "bgimage/",
                    name: $.s("Предпросмотр анимации"),
                    help: $.s("Анимацию персонажа можно настроить при предпросмотре."),
                    vital: !1,
                    default_val: ""
                },
                anim: {
                    type: "Select",
                    select_list: [{name: $.s("Нет"), val: "false"}, {name: $.s("Да"), val: "true"}],
                    default_val: "false",
                    name: $.s("Эффект движения")
                },
                left: {
                    type: "Num",
                    name: $.s("Горизонтальное положение (Х)"),
                    unit: $.s("px"),
                    help: $.s("Вы можете указать положение персонажа. Если не указано, положение определяется автоматически."),
                    validate: {number: !0}
                },
                top: {
                    type: "Num",
                    name: $.s("Вертикальное положение (Y)"),
                    unit: $.s("px"),
                    help: $.s("Вы можете указать положение персонажа. Если не указано, положение определяется автоматически."),
                    validate: {number: !0}
                },
                width: {type: "Num", name: $.s("Ширина"), unit: $.s("px"), validate: {number: !0}},
                height: {type: "Num", name: $.s("Высота"), unit: $.s("px"), validate: {number: !0}},
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    default_val: 300,
                    validate: {required: !0, number: !0}
                },
                effect: {
                    type: "Select",
                    select_list: _ease_effect_list,
                    help: $.s("Выбрать эффект, который будет применен к анимации."),
                    default_val: "linear",
                    name: $.s("Эффект (при переходе)")
                },
                wait: {type: "Check", text: $.s("Дождаться завершения движения?"), default_val: !0}
            }
        },
        face_char: {
            name: $.s("Добавить FaceChar"),
            component_type: "Simple",
            default_view: {base_img_url: "data/fgimage/", icon: "fa-sharp fa-solid fa-image", category: "character"},
            param_view: {},
            param: {
                "face_char_select": {
                    type: "Select", help: $.s("Выберите персонажа, который должен отобразиться."), select_list: function (e) {
                        var a = app.config.project_config.map_chara, t = [];
                        t.push({name: "-", val: ""});
                        var n = 0;
                        for (key in a) if (n++, t.push({name: key, val: key}), "trial" == global_build && n >= 3) break;
                        return t
                    }, default_val: function () {
                    }, name: $.s("Персонаж")
                },
                "face_char_url": {
                    type: "ImageSelect",
                    file_path: function (e) {
                        return "fgimage/chara/" + app.config.project_config.map_chara[e.data.pm.face_char_select] + "/"
                    },
                    folder_select: "none",
                    window_title: $.s("Выбор выражения персонажа"),
                    name: $.s("Изображение"),
                    vital: !0,
                    default_val: ""
                },
                "face_char_location": {
                    type: "Select",
                    name: $.s("Наложение"),
                    help: $.s("Определяет то, где будет изображение. За или перед текстовым полем."),
                    vital: true,
                    select_list : [
                        {
                            name: $.s("За текстовым полем"),
                            val: "false"
                        },
                        {
                            name: $.s("Перед текстовым полем"),
                            val: "true"
                        },
                    ],
                    default_val : "true",
                },
                "face_char_position": {
                    type: "Select",
                    name: $.s("Позиция"),
                    help: $.s("Определяет позицию изображения. Слева или справа."),
                    vital: true,
                    select_list : [
                        {
                            name: $.s("Слева"),
                            val: "left"
                        },
                        {
                            name: $.s("Справа"),
                            val: "right"
                        },
                    ],
                    default_val : "left",
                },
                "face_char_position_left" : {
                    type: "Num",
                    name: $.s("Сдвиг"),
                    help: $.s("Позволяет сдвинуть изрображение вправо или влево."),
                    vital: true,
                    unit: $.s("px"),
                    default_val : "0",
                    spinner: {
                        step: 10
                    },
                },
                "face_char_position_bottom" : {
                    type: "Num",
                    name: $.s("Сдвиг вниз"),
                    help: $.s("Позволяет сдвинуть картинку вниз или вверх."),
                    vital: true,
                    unit: $.s("px"),
                    default_val : "0",
                    spinner: {
                        step: 10
                    },
                },
                "face_char_zoom" : {
                    type: "Num",
                    name: $.s("Масштаб"),
                    help: $.s("Позволяет увеличить или уменьшить изображение."),
                    vital : true,
                    default_val : "1",
                    spinner: {
                        step: 0.1
                    },
                },
                "face_char_text_left" : {
                    type: "Num",
                    name: $.s("Положение текста"),
                    help: $.s("Позволяет сдвинуть текст влево или вправо."),
                    vital: true,
                    unit: $.s("px"),
                    default_val : "220",
                    spinner: {
                        step: 10
                    },
                },
                "face_char_text_width" : {
                    type: "Num",
                    name: $.s("Ширина текста"),
                    help: $.s("Позволяет настроить ширину текста."),
                    vital: true,
                    unit: $.s("px"),
                    default_val : "985",
                    spinner: {
                        step: 10
                    },
                },
                faceCharPosNameTop: {
                    type: "Num",
                    name: $.s("Позиция имени по Y"),
                    help: $.s("Позволяет сдвинуть имя вверх или вниз."),
                    vital: true,
                    unit: $.s("px"),
                    default_val : "513",
                    spinner: {
                        step: 10
                    },
                },
                faceCharPosNameLeft: {
                    type: "Num",
                    name: $.s("Позиция имени по X"),
                    help: $.s("Позволяет сдвинуть имя влево или вправо."),
                    vital: true,
                    unit: $.s("px"),
                    default_val : "100",
                    spinner: {
                        step: 10
                    },
                },
            }
        },
        face_char_delete: {
            name: $.s("Удалить FaceChar"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-image-slash", category: "character"},
            param_view: {},
            param: {}
        },
        tb_ptext_show: {
            name: $.s("Создать текст"),
            header: function (e) {
                return $.replaceAll(e.data.pm.text, "&nbsp;", " ")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-input-text", icon_color: "#1E90FF", category: "text"},
            param_view: {
                time: "time",
                text: "text",
                _clickable_img: "_clickable_img",
                size: "size",
                color: "color",
                x: "x",
                y: "y",
                anim: "amin"
            },
            param: {
                text: {type: "Text", name: $.s("Текст"), validate: {required: !0}},
                _clickable_img: {
                    type: "BoundSelectFont",
                    bound_type: "ptext",
                    name: $.s("Создать текст"),
                    help: $.s("Используйте для визуального позиционирования и изменения размера элемента на экране."),
                    vital: !1,
                    default_val: ""
                },
                name: {
                    type: "Text",
                    name: $.s("Название"),
                    help: $.s("Уникальное название элемента. Нужно чтобы анимация могла понять, что использовать. Если одно название будет у нескольких элементов, то анимация будет применена ко всем."),
                    validate: {
                        required: !0
                    }
                },
                face: {type: "Select", name: $.s("Изменение шрифта"), help: "", select_list: _font_face_list},
                x: {
                    type: "Num",
                    name: $.s("Горизонтальное положение (Х)"),
                    default_val: 200,
                    unit: $.s("px"),
                    help: $.s("Положение элемента на экране по X координате."),
                    validate: {number: !0}
                },
                y: {
                    type: "Num",
                    name: $.s("Вертикальное положение (Y)"),
                    default_val: 300,
                    unit: $.s("px"),
                    help: $.s("Положение элемента на экране по Y координате."),
                    validate: {number: !0}
                },
                size: {
                    type: "Num",
                    name: $.s("Размер"),
                    default_val: 30,
                    unit: $.s("px"),
                    spinner: {min: 6, max: 200, step: 1},
                    validate: {number: !0}
                },
                color: {
                    type: "Color",
                    name: $.s("Цвет"), default_val: "0xffffff", validate: {required: !0}},
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    help: $.s("Определяет то, как долго элемент будет отображаться."),
                    spinner: _map_spinner.time,
                    default_val: 1e3,
                    validate: {number: !0},
                    spinner: {min: 1, step: 500}
                }
            }
        },
        tb_ptext_hide: {
            name: function (e) {
                return $.s("Удалить текст")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-input-text", icon_color: "#1E90FF", category: "text"},
            param_view: {time: "time"},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    help: $.s("Указывает, сколько времени требуется для исчезновения."),
                    spinner: _map_spinner.time,
                    default_val: 1e3,
                    validate: {number: !0}
                }
            }
        },
        l: {
            name: $.s("Пауза"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-regular fa-pause", icon_color: "#1E90FF", category: "text"},
            param_view: {},
            param: {}
        },
        anim: {
            name: $.s("Анимация"),
            component_type: "Simple",
            default_view: {icon: "s-icon-pacman", icon_color: "#1E90FF", slide_button: !1, category: "text"},
            param_view: {},
            param: {
                name: {type: "Variable", name: $.s("アニメ対象ID"), help: $.s("どの素材をアニメーションさせるか")},
                _clickable_img: {
                    type: "BoundSelectAnim",
                    bound_type: "anim",
                    file_path: "bgimage/",
                    name: $.s("Настройки анимации"),
                    help: $.s("プレビューしながらアニメーションを設定することができます"),
                    vital: !1,
                    default_val: ""
                },
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    default_val: 300,
                    validate: {required: !0, number: !0}
                },
                effect: {
                    type: "Select",
                    select_list: _ease_effect_list,
                    help: $.s("Выбрать эффект, который будет применен к анимации."),
                    default_val: "default",
                    name: $.s("Эффект (при переходе)")
                }
            }
        },
        wa: {
            name: $.s("Ожидание анимации"),
            component_type: "Simple",
            default_view: {icon: "s-icon-stopwatch", icon_color: "#1E90FF", category: "text"},
            param_view: {},
            param: {}
        },
        glink: {
            name: function (e) {
                return $.s("Кнопка развилки")
            },
            header: function (e) {
                return $.replaceAll(e.data.pm.text, "&nbsp;", " ")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-arrows-split-up-and-left", category: "scenario"},
            param_view: {color: "color", storage: "storage", target: "target", left: "left", top: "top"},
            param: {
                color: {
                    type: "Text",
                    help: $.s("Дизайн кнопки развилки."),
                    validate: {required: !0, alphabet: !0},
                    default_val: "black",
                    name: $.s("Цвет")
                },
                _clickable_img: {
                    type: "BoundSelectGlink",
                    bound_type: "glink",
                    name: $.s("Позиционирование"),
                    help: $.s("Позиционирование на экране и настройка кнопки развилки."),
                    vital: !1,
                    default_val: ""
                },
                storage: _pm_type.storage,
                target: _pm_type.target,
                "glink_sm" : {
                    type : "Check",
                    name: $.s("Обновление сцены"),
                    text : $.s("Использовать обновление сцены?"),
                    help: $.s("Обновление страницы удаляет форму ввода со страницы, в результате чего она перестает работать (Поле ввода). Если вам необходимо использовать форму ввода, не активируйте эту функцию."),
                    default_val : false
                },
                size: {type: "Num", name: $.s("Размер"), unit: $.s("px"), default_val: 20, validate: {number: !0}},
                text: {
                    type: "Text", name: $.s("Текст"), validate: {required: !0}, onChange: function (e, a) {
                        app.component.changeParam(a, "text", $.replaceAll(e, " ", "&nbsp;"))
                    }
                },
                x: {type: "Num", name: $.s("Горизонтальное положение (Х)"), unit: $.s("px"), validate: {number: !0}},
                y: {type: "Num", name: $.s("Вертикальное положение (Y)"), unit: $.s("px"), validate: {number: !0}},
                width: {type: "Num", name: $.s("Ширина"), unit: $.s("px"), validate: {number: !0}},
                height: {type: "Num", name: $.s("Высота"), unit: $.s("px"), validate: {number: !0}}
            }
        },
        jump: {
            name: function (e) {
                return $.s("Переход")
            },
            header: function (e) {
                return e.data.pm.storage || (e.data.pm.storage = ""), e.data.pm.target || (e.data.pm.target = ""), e.data.pm.storage + " " + e.data.pm.target
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-arrow-up-from-square", category: "scenario"},
            param_view: {storage: "storage", target: "target"},
            param: {
                storage: _pm_type.storage,
                target: _pm_type.target,
                cond: {
                    type: "Cond",
                    name: $.s("Условие перехода"),
                    help: $.s("Если вы хотите прикрепить условие к переходу, задайте здесь нужное условное для выполнения. Переход срабатывает только в том случае, если условие истинно.")
                }
            }
        },
        button: {
            name: function (e) {
                return e.data.pm.storage || (e.data.pm.storage = ""), e.data.pm.target || (e.data.pm.target = ""), $.s("Графическая кнопка")
            },
            header: function (e) {
                return e.data.pm.storage + " " + e.data.pm.target
            },
            component_type: "Simple",
            default_view: {base_img_url: "data/image/", icon: "fa-sharp fa-solid fa-hexagon-image", category: "image"},
            param_view: {
                graphic: "graphic",
                storage: "storage",
                target: "target",
                _clickable_img: "_clickable_img",
                x: "x",
                y: "y",
                width: "width",
                height: "height"
            },
            param: {
                graphic: {type: "ImageSelect", file_path: "image/", name: $.s("Выбор изображения"), vital: !0, default_val: ""},
                storage: _pm_type.storage,
                target: _pm_type.target,
                _clickable_img: {
                    type: "BoundSelect",
                    bound_type: "image",
                    name: $.s("Положение изображения"),
                    help: $.s("Используйте для визуального позиционирования и изменения размера элемента на экране."),
                    vital: !1,
                    default_val: ""
                },
                x: {type: "Num", name: $.s("Горизонтальное положение (Х)"), unit: $.s("px"), validate: {number: !0}},
                y: {type: "Num", name: $.s("Вертикальное положение (Y)"), unit: $.s("px"), validate: {number: !0}},
                width: {type: "Num", name: $.s("Ширина"), unit: $.s("px"), validate: {number: !0}},
                height: {type: "Num", name: $.s("Высота"), unit: $.s("px"), validate: {number: !0}}
            }
        },
        buttonHover: {
            name: function (e) {
                return e.data.pm.storage || (e.data.pm.storage = ""), e.data.pm.target || (e.data.pm.target = ""), $.s("Ховер кнопка")
            },
            header: function (e) {
                return e.data.pm.storage + " " + e.data.pm.target
            },
            component_type: "Simple",
            default_view: {base_img_url: "data/image/",
                base_sound_url: "data/sound/",
                icon: "fa-sharp fa-solid fa-images",
                category: "image"},
            param_view: {
                graphic: "graphic",
                storage: "storage",
                target: "target",
                _clickable_img: "_clickable_img",
                x: "x",
                y: "y",
                width: "width",
                height: "height"
            },
            param: {
                graphic: {type: "ImageSelect", file_path: "image/", name: $.s("Изображение 1"), vital: !0, default_val: ""},
                graphicH: {type: "ImageSelect", file_path: "image/", name: $.s("Изображение 2"), vital: !0, default_val: ""},
                _clickable_img: {
                    type: "BoundSelect",
                    bound_type: "image",
                    file_path: "image/",
                    name: $.s("Позиционирование"),
                    help: $.s("Установить положение кнопки на экране через графический интерфейс."),
                    vital: !1,
                    default_val: ""
                },
                storageSe: {
                    type: "SoundSelect",
                    file_path: "sound/",
                    name: $.s("Выбор звукового эффекта"), vital: !0, default_val: ""},
                soundVolume: {
                    type : "Num",
                    name : $.s("Громкость звука"),
                    help: $.s("Определяет, насколько сильным будет звук."),
                    spinner: {
                        min: 0,
                        max: 1,
                        step: 0.1
                    },
                    default_val : "0.5"
                },
                storage: _pm_type.storage,
                target: _pm_type.target,
                x: {type: "Num", name: $.s("Горизонтальное положение (Х)"), unit: $.s("px"), validate: {number: !0}},
                y: {type: "Num", name: $.s("Вертикальное положение (Y)"), unit: $.s("px"), validate: {number: !0}},
                width: {type: "Num", name: $.s("Ширина"), unit: $.s("px"), validate: {number: !0}},
                height: {type: "Num", name: $.s("Высота"), unit: $.s("px"), validate: {number: !0}}
            }
        },
        systemButton: {
            name: function (e) {
                return e.data.pm.storage || (e.data.pm.storage = ""), e.data.pm.target || (e.data.pm.target = ""), $.s("Системная кнопка")
            },
            header: function (e) {
                return e.data.pm.storage + " " + e.data.pm.target
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-tablet-button", category: "eval"},
            param_view: {
                x: "x",
                y: "y",
                width: "width",
                height: "height"
            },
            param: {
                type: {
                    type: "Select",
                    name: $.s("Функциональность"),
                    help: $.s("Определяет, что будет делать кнопка по ее нажатию."),
                    select_list : [
                        {
                            name : $.s("Меню"),
                            val : "1"
                        },
                        {
                            name : $.s("Сохранения"),
                            val : "2"
                        },
                        {
                            name : $.s("Загрузки"),
                            val : "3"
                        },
                        {
                            name : $.s("Настройки"),
                            val : "4"
                        },
                    ],
                    default_val : "1",
                },
                color: {
                    type: "Text",
                    help: $.s("Дизайн кнопки развилки."),
                    validate: {required: !0, alphabet: !0},
                    default_val: "btn_01_black",
                    name: $.s("Цвет")
                },
                _clickable_img: {
                    type: "BoundSelectGlink",
                    bound_type: "glink",
                    name: $.s("Позиционирование"),
                    vital: !1,
                    default_val: ""
                },
                bindings: {
                    type: "Select",
                    name: $.s("Привязка"),
                    help: $.s("Место привязки кнопок."),
                    select_list : [
                        {
                            name : $.s("Текстовое поле"),
                            val : "1"
                        },
                        {
                            name : $.s("Экран"),
                            val : "2"
                        }
                    ],
                    default_val : "2",
                },
                size: {type: "Num", name: $.s("Размер"), unit: $.s("px"), default_val: 20, validate: {number: !0}},
                text: {
                    type: "Text", name: $.s("Текст"), validate: {required: !0}, onChange: function (e, a) {
                        app.component.changeParam(a, "text", $.replaceAll(e, " ", "&nbsp;"))
                    }
                },
                x: {type: "Num", name: $.s("Горизонтальное положение (Х)"), unit: $.s("px"), validate: {number: !0}},
                y: {type: "Num", name: $.s("Вертикальное положение (Y)"), unit: $.s("px"), validate: {number: !0}},
                width: {type: "Num", name: $.s("Ширина"), unit: $.s("px"), validate: {number: !0}},
                height: {type: "Num", name: $.s("Высота"), unit: $.s("px"), validate: {number: !0}}
            },

        },
        iscript: {name: "JavaScript", component_type: "Iscript", default_view: {icon: "t-script"}, param_view: {}, param: {}},
        tb_start_tyrano_code: {
            name: $.s("Script"),
            component_type: "TyranoCode",
            default_view: {icon: "t-script"},
            param_view: {},
            param: {}
        },
        label: {
            name: function (e) {
                return e.data.pm.label_name
            },
            component_type: "Label",
            default_view: {icon: "fa-sharp fa-solid fa-location-pin"},
            param_view: {title: "label_name"},
            param: {
                label_name: {
                    type: "Text",
                    name: $.s("Имя метки"),
                    validate: {required: !0, alphabet: !0},
                    onChange: function (e, a, t) {
                        e = $.replaceAll(e, " ", "_"), app.component.changeParam(a, "label_name", e);
                        for (var n = app.tmp.map_label[app.tyrano.current_edit_scenario], i = "*" + t, l = 0; l < n.length; l++) if ("*" + e === n[l]) return alertNoBtn("Внимание!", `Метка уже существует. Переименуйте метку!`, 3000, "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
                        n.push("*" + e), n = _.select(n, (function (e) {
                            return !_.any([i], (function (a) {
                                return e === a
                            }))
                        })), app.tmp.map_label[app.tyrano.current_edit_scenario] = n
                    }
                }
            }
        },
        general: {name: $.s("Общие"), component_type: "General", default_view: {icon: "script"}, param_view: {}, param: {}},
        live2d_new: {
            name: function (e) {
                return $.s("Подключить Live2D модель")
            },
            header: function (e) {
                return e.data.pm.model_id
            },
            component_type: "Simple",
            default_view: {base_img_url: "", icon: "fa-sharp fa-regular fa-person", icon_color: "#1E90FF", category: "live2d"},
            param_view: {},
            param: {
                model_id: {
                    type: "Select",
                    help: $.s("Выберите модель Live2D для подключения."),
                    select_list: _select_list_live2d_model,
                    default_val: function () {
                    },
                    name: $.s("Модель")
                },
                lip: {type: "Check", text: $.s("Включить синхронизацию губ?"), default_val: !1},
                breath: {
                    type: "Check",
                    text: $.s("Использовать анимацию дыхания?"),
                    help: $.s("Использовать анимацию дыхания в состоянии покоя?"),
                    default_val: !0
                },
                idle_: {
                    type: "Check",
                    text: $.s("Использовать анимацию бездействия?"),
                    help: $.s("Если функция включена, то к модели по умолчанию будет применена анимация бездействия. При наличии нескольких анимаций они будут автоматически переключаться между собой."),
                    default_val: !0
                },
                lip_time: {
                    type: "Num",
                    help: $.s("Вы можете установить скорость движения губ. Если установить низкое значение, рот будет двигаться быстро."),
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    validate: {number: !0},
                    default_val: 100
                },
                jname: {
                    type: "Text",
                    name: $.s("Имя персонажа"),
                    help: $.s("Модель будет двигать губами, только если имя, указанное здесь, совпадает с #именем, введённым в текстовое поле."),
                    default_val: ""
                }
            }
        },
        live2d_show: {
            name: function (e) {
                return $.s("Показать Live2D")
            },
            header: function (e) {
                return e.data.pm.name
            },
            component_type: "Simple",
            default_view: {base_img_url: "", icon: "fa-sharp fa-solid fa-person-sign", icon_color: "#1E90FF", category: "live2d"},
            param_view: {name: "storage", time: "time", left: "left", top: "top", scale: "scale"},
            param: {
                name: {
                    type: "Select",
                    help: $.s("Выберите персонажа, который должен появится."),
                    select_list: _select_list_live2d_model,
                    default_val: function () {
                    },
                    name: $.s("Модель")
                },
                showAnimation: {
                    type: "Select",
                    name: $.s("Анимация появления"),
                    select_list: _selectListShowAnimation,
                    default_val : "animate__fadeInUp"
                },
                time: {
                    type: "Num",
                    name: $.s("Время появления"),
                    unit: $.s("sec"),
                    default_val: "2",
                    validate: {number: !0},
                    spinner: {min: 0, max: 15, step: 1}
                },
                _clickable_img: {
                    type: "Live2dBound",
                    bound_type: "live2d",
                    name: $.s("Позиционирование"),
                    help: $.s("Используйте для визуального позиционирования и изменения размера элемента на экране."),
                    vital: !1,
                    default_val: ""
                },
                x: {
                    type: "Num",
                    name: $.s("Позиция по X"),
                    unit: $.s(""),
                    help: $.s("Вы можете указать положение персонажа. Если не указано, положение определяется автоматически."),
                    default_val: "0",
                    validate: {number: !0},
                    spinner: {min: -100, max: 100, step: .1}
                },
                y: {
                    type: "Num",
                    name: $.s("Позиция по Y"),
                    unit: $.s(""),
                    help: $.s("Вы можете указать положение персонажа. Если не указано, положение определяется автоматически."),
                    default_val: "0",
                    validate: {number: !0},
                    spinner: {min: -100, max: 100, step: .1}
                },
                scale: {
                    type: "Num",
                    name: $.s("Увеличение"),
                    help: $.s("Настройка масштаба модели."),
                    validate: {number: !0},
                    spinner: {min: 0, step: .1},
                    default_val: 1
                }
            }
        },
        live2d_hide: {
            name: function (e) {
                return $.s("Скрыть Live2D модель")
            },
            header: function (e) {
                return e.data.pm.name
            },
            component_type: "Simple",
            default_view: {base_img_url: "", icon: "fa-sharp fa-regular fa-person-sign", icon_color: "#1E90FF", category: "live2d"},
            custom_image_url: function (e) {
            },
            param_view: {name: "name", time: "time"},
            param: {
                name: {
                    name: $.s("Модель"),
                    type: "Select",
                    help: $.s("Выберите, какую модель Live2D удалить."),
                    select_list: _select_list_live2d_model,
                    default_val: function () {
                    },
                },
                deleteAnimation: {
                    name: $.s("Анимация удаления"),
                    type: "Select",
                    select_list: _selectListDeliteAnimation,
                    default_val: "animate__fadeOut"
                },
                time: {
                    type: "Num",
                    name: $.s("Время появления"),
                    unit: $.s("sec"),
                    default_val: "2",
                    validate: {number: !0},
                    spinner: {min: 0, max: 15, step: 1}
                },
            }
        },
        live2d_mod: {
            name: function (e) {
                return $.s("Позиция Live2D модели")
            },
            header: function (e) {
                return e.data.pm.name
            },
            component_type: "Simple",
            default_view: {base_img_url: "", icon: "fa-sharp fa-solid fa-person-walking-arrow-right", icon_color: "#1E90FF", category: "live2d"},
            param_view: {name: "name", left: "left", top: "top", time: "time"},
            param: {
                name: {
                    type: "Select",
                    help: $.s("Выберите персонажа, которого надо анимировать."),
                    select_list: _select_list_live2d_model,
                    default_val: function () {
                    },
                    name: $.s("Модель")
                },
                _clickable_img: {
                    type: "Live2dBound",
                    bound_type: "live2d",
                    name: $.s("Позиционирование"),
                    help: $.s("Используйте для визуального позиционирования и изменения размера элемента на экране."),
                    vital: !1,
                    default_val: ""
                },
                x: {
                    type: "Num",
                    name: $.s("Позиция по X"),
                    unit: $.s(""),
                    help: $.s("Вы можете указать положение персонажа. Если не указано, положение определяется автоматически."),
                    default_val: "0",
                    validate: {number: !0},
                    spinner: {min: -100, max: 100, step: .1}
                },
                y: {
                    type: "Num",
                    name: $.s("Позиция по Y"),
                    unit: $.s(""),
                    help: $.s("Вы можете указать положение персонажа. Если не указано, положение определяется автоматически."),
                    default_val: "0",
                    validate: {number: !0},
                    spinner: {min: -100, max: 100, step: .1}
                },
                scale: {
                    type: "Num",
                    name: $.s("Увеличение"),
                    help: $.s("Настройка масштаба модели."),
                    validate: {number: !0},
                    spinner: {min: 0, step: .1},
                    default_val: 1
                }
            }
        },
        live2d_motion: {
            name: function (e) {
                return $.s("Анимация Live2D модели")
            },
            header: function (e) {
                return e.data.pm.name
            },
            component_type: "Simple",
            default_view: {base_img_url: "", icon: "fa-sharp fa-solid fa-person-dolly-empty", icon_color: "#1E90FF", category: "live2d"},
            custom_image_url: function (e) {
            },
            param_view: {name: "name", time: "time", left: "left", top: "top"},
            param: {
                name: {
                    type: "Select", help: $.s("Выберите модель, для которой хотите применить движение."), select_list: function (e) {
                        var a = app.live2d.models, t = [];
                        for (key in t.push({name: "-", val: ""}), a) t.push({name: key, val: key});
                        return t
                    }, default_val: function () {
                    }, name: $.s("Модель")
                },
                filenm: {
                    type: "Live2dSelect",
                    target: "motion",
                    name: $.s("Выбор анимации модели"),
                    vital: !1,
                    default_val: ""
                }
            }
        },
        live2d_expression: {
            name: function (e) {
                return $.s("Изменить выражение")
            },
            header: function (e) {
                return e.data.pm.name
            },
            component_type: "Simple",
            default_view: {base_img_url: "", icon: "fa-sharp fa-solid fa-person-military-to-person", icon_color: "#1E90FF", category: "live2d"},
            custom_image_url: function (e) {
            },
            param_view: {},
            param: {
                name: {
                    type: "Select", help: $.s("Выберите какое выражение модели установить."), select_list: function (e) {
                        var a = app.live2d.models, t = [];
                        for (key in t.push({name: "-", val: ""}), a) t.push({name: key, val: key});
                        return t
                    }, default_val: function () {
                    }, name: $.s("Модель")
                },
                expression: {
                    type: "Live2dSelectExpression",
                    target: "expression",
                    name: $.s("Выбор выражения"),
                    help: $.s("Предварительный просмотр выражения."),
                    vital: !1,
                    default_val: ""
                }
            }
        },
        live2d_fadein: {
            name: function (e) {
                return $.s("Появление")
            },
            component_type: "Simple",
            default_view: {base_img_url: "", icon: "fa-sharp fa-solid fa-people-simple", icon_color: "#1E90FF", category: "live2d"},
            param_view: {time: "time"},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    spinner: _map_spinner.time,
                    default_val: 1e3,
                    validate: {number: !0}
                }, wait: {type: "Check", text: $.s("Дождаться завершения?"), default_val: !0}
            }
        },
        live2d_fadeout: {
            name: function (e) {
                return $.s("Затухание")
            },
            component_type: "Simple",
            default_view: {base_img_url: "", icon: "fa-sharp fa-regular fa-people-simple", icon_color: "#1E90FF", category: "live2d"},
            param_view: {time: "time"},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Продолжительность"),
                    unit: $.s("мл"),
                    spinner: _map_spinner.time,
                    default_val: 1e3,
                    validate: {number: !0}
                }, wait: {type: "Check", text: $.s("Дождаться завершения?"), default_val: !0}
            }
        },
        live2d_delete_all: {
            name: function (e) {
                return $.s("Удалить все Live2D модели")
            },
            component_type: "Simple",
            default_view: {base_img_url: "", icon: "fa-sharp fa-solid fa-person-through-window", icon_color: "#1E90FF", category: "live2d"},
            param_view: {},
            param: {
                deleteAnimation: {
                    name: $.s("Анимация удаления"),
                    type: "Select",
                    select_list: _selectListDeliteAnimation,
                    default_val: "animate__fadeOut"
                },
                time: {
                    type: "Num",
                    name: $.s("Время появления"),
                    unit: $.s("sec"),
                    default_val: "2",
                    validate: {number: !0},
                    spinner: {min: 0, max: 15, step: 1}
                },
            }
        },

        tb_eval: {
            name: function (e) {
                return $.s("Настройка переменной")
            },
            header: function (e) {
                return e.data.pm.exp
            },
            component_type: "Simple",
            default_view: {base_img_url: "", icon: "fa-sharp fa-solid fa-square-root-variable", icon_color: "#D2691E", category: "eval"},
            param_view: {exp: "exp"},
            param: {
                exp: {
                    type: "Eval", help: $.s("Устанавливает данные определенной переменной."), select_list: function (e) {
                        return []
                    }, default_val: function () {
                    }, name: $.s("")
                }
            }
        },
        varSetting: {
            name: function (e) {return $.s("Настройка переменной (N)")},
            header: function (e) {},
            component_type: "Simple",
            default_view: {base_img_url: "", icon: "fa-sharp fa-solid fa-greater-than-equal", icon_color: "#D2691E", category: "eval"},
            param_view: {exp: "exp"},
            param: {
                varName: {type: "Variable", name: $.s("Переменная"), help: $.s("Выберете переменную, в которую сохраниться значение.")},
                valueNum: {
                    type: "Text",
                    name: $.s("Значение"),
                    help: $.s("Принимает значение в вице цифры. ВНИМАНИЕ! Разрешены любые операции."),
                    default_val: ""
                },
                valueText: {
                    type: "Text",
                    name: $.s("Текст"),
                    help: $.s("Принимает значение в вице текста. ВНИМАНИЕ! При использовании поля текста, по умолчанию доступно только присвоение, нет смысла выбирать в «Операция» что-то."),
                    default_val: ""
                },
                arithmeticOperations: {
                    type: "Select",
                    name: $.s("Операция"),
                    help: $.s("Математические операции."),
                    select_list : [
                        {
                            name : $.s("Присвоить значение"),
                            val : "="
                        },
                        {
                            name : $.s("Добавить"),
                            val : "+"
                        },
                        {
                            name : $.s("Вычесть"),
                            val : "-"
                        },
                        {
                            name : $.s("Умножить на"),
                            val : "*"
                        },
                        {
                            name : $.s("Разделить на"),
                            val : "/"
                        },
                        {
                            name : $.s("Остаток"),
                            val : "%"
                        }
                    ],
                    default_val : "",
                },
                valueRandom: {
                    type: "Text",
                    name: $.s("Случайное значение"),
                    help: $.s("ВНИМАНИЕ! При использовании поля \"Случайное значение\", по умолчанию доступно только присвоение, нет смысла выбирать в «Операция» что-то."),
                    default_val: "0-0"
                },
            }
        },
        commit: {
            name: $.s("Зафиксировать ввод"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-download", slide_button: !1, icon_color: "#D2691E", category: "eval"},
            param_view: {},
            param: {}
        },
        save_img: {
            name: $.s("Захват миниатюры"),
            component_type: "Simple",
            default_view: {base_img_url: "data/bgimage/", icon: "fa-sharp fa-solid fa-camera-viewfinder", icon_color: "#f69696", category: "eval"},
            param_view: {image_url: "storage"},
            param: {
                storage: {
                    type: "ImageSelect",
                    file_path: "bgimage/",
                    name: $.s("Миниатюра сохранения"),
                    help: $.s("Использовать пользовательскую миниатюру как изображение сохранения. По умолчанию будет использоваться захват экрана."),
                    vital: !1,
                    default_val: ""
                }
            }
        },
        tb_keyconfig: {
            name: $.s("Конфигурация клавиш"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-keyboard", icon_color: "#f69696", category: "eval"},
            param_view: {image_url: "storage"},
            param: {
                flag: {
                    type: "Select",
                    name: $.s("Конфигурация клавиш"),
                    help: $.s("Пользовательское сочетание клавиш."),
                    select_list: [{name: $.s("Нет"), val: "0"}, {name: $.s("Да"), val: "1"}],
                    default_val: "1"
                }
            }
        },
        tb_cg: {
            name: $.s("Разблокировать изображение"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-unlock", icon_color: "#f69696", category: "eval"},
            param_view: {image_url: "storage"},
            param: {
                id: {
                    type: "Select",
                    name: $.s("Выбор изображения"),
                    help: $.s("Выберите изображение, который будет открыт при прохождении."),
                    select_list: function () {
                        var e = [], a = app.config.project_config.map_cg.map_image;
                        for (key in e.push({name: "---", val: ""}), a) e.push({name: key, val: key});
                        return e
                    },
                    default_val: ""
                }
            }
        },
        tb_replay_start: {
            name: $.s("Запустить воспоминание"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-square-heart", icon_color: "#f69696", category: "eval"},
            param_view: {image_url: "storage"},
            param: {}
        },
        tb_replay: {
            name: $.s("Закончить воспоминание"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-regular fa-square-heart", icon_color: "#f69696", category: "eval"},
            param_view: {image_url: "storage"},
            param: {
                id: {
                    type: "Select",
                    name: $.s("Выбор воспоминания"),
                    help: $.s("Выберите воспоминание, который будет открыт при прохождении."),
                    select_list: function () {
                        var e = [], a = app.config.project_config.map_replay.map_jump;
                        for (key in e.push({name: "---", val: ""}), a) e.push({name: key, val: key});
                        return e
                    },
                    default_val: ""
                }
            }
        },
        if: {
            name: $.s("Начало условия"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-bracket-curly", icon_color: "#f69696", category: "eval"},
            param_view: {},
            param: {
                "exp" : {
                    type : "Text",
                    name : $.s("Состояние"),
                    help : $.s("Пример: A === B, A !== B, A > B, A >= B, A < B, A <= B"),
                    vital : true,
                    default_val : "f."
                }
            }
        },
        elsif: {
            name: $.s("Дополнительное условие"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-code-merge", icon_color: "#f69696", category: "eval"},
            param_view: {},
            param: {
                "exp" : {
                    type : "Text",
                    name : $.s("Состояние"),
                    help : $.s("Пример: A === B, A !== B, A > B, A >= B, A < B, A <= B"),
                    vital : true,
                    default_val : "f."
                }
            }
        },
        else: {
            name: $.s("Иначе"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-code-pull-request", icon_color: "#f69696", category: "eval"},
            param_view: {},
            param: {}
        },
        endif: {
            name: $.s("Конец условия"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-bracket-curly-right", icon_color: "#f69696", category: "eval"},
            param_view: {},
            param: {}
        },
        clickable: {
            name: function (e) {
                return $.s("Зона нажатия")
            },
            header: function (e) {
                return e.data.pm.storage || (e.data.pm.storage = ""), e.data.pm.target || (e.data.pm.target = ""), e.data.pm.storage + " " + e.data.pm.target
            },
            component_type: "Simple",
            default_view: {base_img_url: "data/fgimage", icon: "fa-sharp fa-solid fa-grid-horizontal", category: "image"},
            param_view: {image_url: "storage", width: "width", height: "height", x: "x", y: "y", _clickable_img: ""},
            param: {
                storage: _pm_type.storage,
                target: _pm_type.target,
                _clickable_img: {
                    type: "BoundSelect",
                    bound_type: "clickable",
                    file_path: "bgimage/",
                    name: $.s("Положение изображения"),
                    vital: !1,
                    default_val: ""
                },
                x: {
                    type: "Num",
                    name: $.s("Горизонтальное положение (Х)"),
                    unit: $.s("px"),
                    validate: {number: !0},
                    default_val: "100"
                },
                y: {
                    type: "Num",
                    name: $.s("Вертикальное положение (Y)"),
                    unit: "px",
                    validate: {number: !0},
                    default_val: "100"
                },
                width: {
                    type: "Num",
                    name: $.s("Ширина"),
                    unit: $.s("px"),
                    validate: {number: !0},
                    default_val: "100"
                },
                height: {
                    type: "Num",
                    name: $.s("Высота"),
                    unit: $.s("px"),
                    validate: {number: !0},
                    default_val: "100"
                }
            }
        },
        title: {
            name: function (e) {
                return $.s("Название сцены")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-heading", category: "eval"},
            param_view: {},
            param: {
                name: {
                    type : "Text",
                    name : $.s("Название"),
                    help: $.s("Задаём название текущей сцене."),
                    validate : {
                        required : true,
                    }
                },
            }
        },
        clearvar: {
            name: function (e) {
                return $.s("Очистка переменных")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-trash-list", category: "eval"},
            param_view: {},
            param: {

            }
        },
        clearsysvar: {
            name: function (e) {
                return $.s("Очистка системных переменных")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-trash-list", category: "eval"},
            param_view: {},
            param: {

            }
        },
        macro: {
            name: function (e) {
                return $.s("Объявление макроса")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-bars", category: "eval"},
            param_view: {},
            param: {
                name: {
                    type : "Text",
                    name : $.s("Название"),
                    help: $.s("Задаём название макроса."),
                    validate : {
                        required : true,
                    }
                },
            }
        },
        endmacro: {
            name: function (e) {
                return $.s("Закрытие макроса")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-regular fa-bars", category: "eval"},
            param_view: {},
            param: {

            }
        },
        erasemacro: {
            name: function (e) {
                return $.s("Удаление макроса")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-bars-filter", category: "eval"},
            param_view: {},
            param: {
                name: {
                    type : "Text",
                    name : $.s("Название"),
                    help: $.s("Указываем название макроса."),
                    validate : {
                        required : true,
                    }
                },
            }
        },
        web: {
            name: function (e) {
                return $.s("Открытие сайта")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-ethernet", category: "eval"},
            param_view: {},
            param: {
                url: {
                    type : "Text",
                    name : $.s("Ссылка на сайт"),
                    help: $.s("Указываем ссылку на сайт который нужно открыть."),
                    validate : {
                        required : true,
                    }
                },
            }
        },
        close: {
            name: function (e) {
                return $.s("Закрыть игру")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-xmark", category: "eval"},
            param_view: {},
            param: {
                ask: {
                    type: "Check",
                    text: $.s("Подтвердить закрытие?"),
                    help: $.s("Выводит на экран всплывающее окно с подтверждение закрытия игры."),
                    default_val: !0}
            }
        },
        keyframe: {
            name: function (e) {
                return $.s("Создать анимацию")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-grid-2", category: "image"},
            param_view: {},
            param: {
                name: {
                    type : "Text",
                    name : $.s("Название"),
                    help: $.s("Название анимации."),
                    validate : {
                        required : true,
                    }
                },
            }
        },
        frame: {
            name: function (e) {
                return $.s("Настройка кадра")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-key", category: "image"},
            param_view: {},
            param: {
                p: {
                    type : "Text",
                    name: $.s("Время анимации"),
                    help: $.s("Устанавливает процентное соотношение. Например, для анимации, которая длится 5 секунд, необходимо установить для каждого ключевого кадра 20%. Устанавливается значение от 0 до 100%. Если не установить значение 0%, то ключевой кадр с 0% будет пропущен."),
                    default_val: "0%",
                    validate : {
                        required : true,
                    }
                },
                x: {
                    type: "Num",
                    name: $.s("Перемещение по X"),
                    help: $.s("Задает перемещение по оси X."),
                    default_val: 0,
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    }
                },
                y: {
                    type: "Num",
                    name: $.s("Перемещение по Y"),
                    help: $.s("Задает перемещение по оси Y."),
                    default_val: 0,
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    }
                },
                z: {
                    type: "Num",
                    name: $.s("Перемещение по Z"),
                    help: $.s("Задает перемещение по оси Z."),
                    default_val: 0,
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    }
                },
                rotateX: {
                    type: "Text",
                    name: $.s("Вращение по X"),
                    help: $.s("Задает вращение по оси X."),
                    default_val: "0deg",
                    validate : {
                        required : false,
                    }
                },
                rotateY: {
                    type: "Text",
                    name: $.s("Вращение по Y"),
                    help: $.s("Задает вращение по оси Y."),
                    default_val: "0deg",
                    validate : {
                        required : false,
                    }
                },
                rotateZ: {
                    type: "Text",
                    name: $.s("Вращение по Z"),
                    help: $.s("Задает вращение по оси Z."),
                    default_val: "0deg",
                    validate : {
                        required : false,
                    }
                },
                scaleX: {
                    type: "Num",
                    name: $.s("Увеличение по X"),
                    help: $.s("Увеличение или уменьшение по горизонтали."),
                    default_val: 1,
                    spinner: {
                        min: 0,
                        max: 100,
                        step: 0.1
                    }
                },
                scaleY: {
                    type: "Num",
                    name: $.s("Увеличение по Y"),
                    help: $.s("Увеличение или уменьшение по вертикали."),
                    default_val: 1,
                    spinner: {
                        min: 0,
                        max: 100,
                        step: 0.1
                    }
                },
                scaleZ: {
                    type: "Num",
                    name: $.s("Увеличение по Z"),
                    help: $.s("Увеличение или уменьшение в третьем измерении."),
                    default_val: 1,
                    spinner: {
                        min: 0,
                        max: 100,
                        step: 0.1
                    }
                },
                skewX: {
                    type: "Text",
                    name: $.s("Наклон по X"),
                    help: $.s("Наклон по оси X."),
                    default_val: "0deg",
                    validate : {
                        required : false,
                    }
                },
                skewY: {
                    type: "Text",
                    name: $.s("Наклон по Y"),
                    help: $.s("Наклон по оси Y."),
                    default_val: "0deg",
                    validate : {
                        required : false,
                    }
                },
                opacity: {
                    type: "Num",
                    name: $.s("Прозрачность"),
                    help: $.s("Установив значение 0-1, можно задать непрозрачность каждого элемента. Таким образом можно заставить элемент исчезнуть. При значении 0 он полностью прозрачен."),
                    default_val: 1,
                    spinner: {
                        min: 0,
                        max: 1,
                        step: 0.1
                    }
                },
            }
        },
        endkeyframe: {
            name: function (e) {
                return $.s("Закрыть анимацию")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-lock-keyhole", category: "image"},
            param_view: {},
            param: {}
        },
        kanim: {
            name: function (e) {
                return $.s("Запустить анимацию")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-clapperboard-play", category: "image"},
            param_view: {},
            param: {
                name: {
                    type : "Text",
                    name: $.s("Название"),
                    help: $.s("Название текста или изображения, которое будет анимироваться."),
                    validate : {
                        required : false,
                    }
                },
                layer: {
                    type : "Text",
                    name: $.s("Слой"),
                    help: $.s("Если не задать название, а задать номер слоя, то будет анимироваться все что находится в слое."),
                    validate : {
                        required : false,
                    }
                },
                keyframe: {
                    type : "Text",
                    name: $.s("Название анимации"),
                    help: $.s("Название той анимации, которая должна быть применена к объекту."),
                    validate : {
                        required : true,
                    }
                },
                time: {
                    type: "Num",
                    name: $.s("Продолжительность анимации"),
                    help: $.s("Время анимации в миллисекундах."),
                    default_val: 500,
                    unit: "ms",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    }
                },
                easing: {
                    type: "Select",
                    name: $.s("Режим анимации"),
                    help: $.s("То с каким эффектом анимация будет воспроизведена."),
                    select_list : [
                        {
                            name : $.s("Плавно в начале и в конце"),
                            val : "ease"
                        },
                        {
                            name : $.s("Linear"),
                            val : "linear"
                        },
                        {
                            name : $.s("Медленное воспроизведение в начале"),
                            val : "ease-in"
                        },
                        {
                            name : $.s("Медленно воспроизведение в конце"),
                            val : "ease-out"
                        },
                        {
                            name : $.s("Медленное воспроизведение в начале и конце"),
                            val : "ease-in-out"
                        }
                    ],
                    default_val : "ease",
                },
                direction: {
                    type: "Select",
                    name: $.s("Направление"),
                    help: $.s("Анимация может чередоваться между обратным и нормальным ходом. По умолчанию \"normal\", а \"alternate\" задает чередование анимации между нормальным и обратным ходом."),
                    select_list : [
                        {
                            name : $.s("Обычное"),
                            val : "normal"
                        },
                        {
                            name : $.s("Альтернативное"),
                            val : "alternate"
                        }
                    ],
                    default_val : "normal",
                },
                mode: {
                    type: "Select",
                    name: $.s("Состояние"),
                    help: $.s("Установить состояние до и после воспроизведения. По умолчанию установлено значение \"вперед\", и после воспроизведения сохраняется прежняя конфигурация. Если установить значение \"none\", то конфигурация не будет сохраняться."),
                    select_list : [
                        {
                            name : $.s("Вперед"),
                            val : "forwards"
                        },
                        {
                            name : $.s("Нет"),
                            val : "none"
                        }
                    ],
                    default_val : "forwards",
                },
            }
        },

        voconfig: {
            name: function (e) {
                return $.s("Настройка озвучки текста")
            },
            component_type: "Sound",
            default_view: {base_sound_url: "data/sound/", icon: "fa-sharp fa-solid fa-microphone", category: "media"},
            param_view: {},
            param: {
                sebuf: {
                    type : "Text",
                    name : $.s("Буфер воспроизведения"),
                    default_val: 2,
                    validate : {
                        required : true,
                    }
                },
                name: {
                    type : "Text",
                    name : $.s("Имя персонажа"),
                    help: $.s("Введите имя персонажа, для которого записана озвучка."),
                    validate : {
                        required : true,
                    }
                },
                vostorage: {
                    type: "SoundSelect",
                    file_path: "sound/voiced/",
                    name: $.s("Выбор музыки"),
                    vital: !0,
                    default_val: ""
                },
                number: {
                    type: "Num",
                    name: $.s("Номер"),
                    default_val: 0,
                    spinner: {
                        min: 0,
                        max: 1000,
                        step: 1
                    },

                    validate: {
                        number: true
                    }
                },
            }
        },
        vostart: {
            name: function (e) {
                return $.s("Запустить озвучку")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-microphone-lines", category: "media"},
            param_view: {},
            param: {

            }
        },
        vostop: {
            name: function (e) {
                return $.s("Остановить озвучку")
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-microphone-slash", category: "media"},
            param_view: {},
            param: {}
        },


        // 3D Функции
        "3d_init": {
            name: $.s("Инициализация 3D"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-cube", icon_color: "#343c99", category: "d3Environment"},
            param_view: {},
            param: {
                layer: {
                    type: "Num",
                    name: $.s("Слой"),
                    help: $.s("Вы можете указать слой, на котором будет размещена 3D-модель."),
                    default_val: 0,
                    spinner: {
                        min: 0,
                        max: 10,
                        step: 1
                    },

                    validate: {
                        number: true
                    }
                },
                camera: {
                    type: "Select",
                    name: $.s("Камера"),
                    help: $.s("Вы можете указать режим камеры: Перспектива, Ортографический."),
                    select_list : [
                        {
                            name : $.s("Перспектива"),
                            val : "Perspective"
                        },
                        {
                            name : $.s("Ортографический"),
                            val : "Orthographic"
                        },
                    ],
                    default_val : "Perspective",
                },

                near: {
                    type: "Num",
                    name: $.s("Ближние объекты"),
                    help: $.s("Вы можете установить расстояние для рисования объектов, расположенных близко к камере."),
                    default_val: 1,
                    spinner: {
                        min: 0,
                        max: 100,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },

                far: {
                    type: "Num",
                    name: $.s("Дальние объекты"),
                    help: $.s("Вы можете установить расстояние для отображения объектов, удаленных от камеры. Если значение слишком велико, объекты будут отображаться на большом расстоянии, что затруднит обработку."),
                    default_val: 5000,
                    spinner: {
                        min: 0,
                        max: 50000,
                        step: 100
                    },
                    validate: {
                        number: true
                    }
                }
            }
        },
        "3d_model_new": {
            name: $.s("Создать 3D объект"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-alien-8bit", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                name: {
                    type : "Text",
                    name : $.s("Название"),
                    help: $.s("Имя 3D-объекта. Используется для управления скрытием или отображением."),
                    validate : {
                        required : true,
                    }
                },
                storage: {
                    type : "Text",
                    name : $.s("Путь"),
                    help: $.s("Используется для указания пути к файлу 3D объекта. Поддерживаемые форматы: gltf, obj. Файл должен находиться по адресу: data/others/3d/model/"),
                    default_val: "",
                    vital: true,
                    validate : {
                        required : true,
                    }
                },
                pos: {
                    type: "Text",
                    name: $.s("Позиция"),
                    help: $.s("Положение 3D объекта на экране. Устанавливается путем указания трех координат XYZ."),
                    default_val: "0,0,0",
                    validate: {
                        number: true
                    }
                },
                rot: {
                    type: "Text",
                    name: $.s("Вращение"),
                    help: $.s("Вращение 3D-объекта на экране. Устанавливается путем указания трех координат XYZ."),
                    default_val: "0,0,0",
                    validate: {
                        number: true
                    }
                },
                scale: {
                    type: "Num",
                    name: $.s("Масштаб"),
                    help: $.s("Изменяет размер 3D объекта."),
                    default_val: 100,
                    spinner: {
                        min: -50000,
                        max: 50000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                tonemap : {
                    type : "Check",
                    text : $.s("Использовать Tone-map?"),
                    help: $.s("Задает, применяется ли отображение тона к этому объекту или нет (отображение тона должно быть включено для сцены). Значение по умолчанию равно true."),
                    default_val : true,
                    name : $.s("Tone-map")
                },
                motion: {
                    type: "Text",
                    name: $.s("Движение"),
                    help: $.s("Задает имя движения, если в файле есть движение. Если не указано, первый файл движения будет применен автоматически."),
                    default_val: "",
                    validate: {
                        number: true
                    }
                },
                folder: {
                    type: "Text",
                    name: $.s("Папка"),
                    help: $.s("Вы можете изменить папку для размещения файлов. Например, `fgimage` Если вы укажете `data/fgimage'."),
                    default_val: "",
                    validate: {
                        number: true
                    }
                }
            }
        },
        "3d_sprite_new": {
            name: $.s("3D объект (спрайт)"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-face-viewfinder", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                name: {
                    type : "Text",
                    name : $.s("Название"),
                    help: $.s("Имя 3D-объекта. Используется для управления скрытием или отображением."),
                    validate : {
                        required : true,
                    }
                },
                storage: {
                    type : "Text",
                    name : $.s("Путь"),
                    help: $.s("Указывает файл изображения для отображения. Пожалуйста, поместите файл в папку `others/3d/sprite/'."),
                    default_val: "",
                    vital: true,
                    validate : {
                        required : true,
                    }
                },
                pos: {
                    type: "Text",
                    name: $.s("Позиция"),
                    help: $.s("Положение 3D объекта на экране. Устанавливается путем указания трех координат XYZ."),
                    default_val: "0,0,0",
                    validate: {
                        number: true
                    }
                },
                rot: {
                    type: "Text",
                    name: $.s("Вращение"),
                    help: $.s("Вращение 3D-объекта на экране. Устанавливается путем указания трех координат XYZ."),
                    default_val: "0,0,0",
                    validate: {
                        number: true
                    }
                },
                scale: {
                    type: "Num",
                    name: $.s("Масштаб"),
                    help: $.s("Изменяет размер 3D объекта."),
                    default_val: 100,
                    spinner: {
                        min: 0,
                        max: 50000,
                        step: 100
                    },
                    validate: {
                        number: true
                    }
                },
                tonemap : {
                    type : "Check",
                    text : $.s("Использовать Tone-map?"),
                    help: $.s("Задает, применяется ли отображение тона к этому объекту или нет. Значение по умолчанию равно false."),
                    default_val : false,
                    name : $.s("Tone-map")
                },
                folder: {
                    type: "Text",
                    name: $.s("Папка"),
                    help: $.s("Вы можете изменить папку для размещения файлов. Например, `fgimage` Если вы укажете `data/fgimage'"),
                    default_val: "",
                    validate: {
                        number: true
                    }
                }
            }
        },
        "3d_show": {
            name: $.s("Показать 3D объект"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-eye", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название"),
                    help: $.s("Укажите имя объекта, который вы хотите отобразить."),
                    vital: true,
                    validate : {
                        required : true,
                    }
                },
                time: {
                    type: "Num",
                    name: $.s("Время"),
                    help: $.s("Задает время отображения."),
                    unit: $.s("ms"),
                    default_val: 500,
                    spinner: {
                        min: 0,
                        max: 500000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                wait : {
                    type : "Check",
                    text : $.s("Дождаться завершения отображения?"),
                    default_val : true,
                    name : $.s("Ожидание")
                },
                pos: {
                    type: "Text",
                    name: $.s("Позиция"),
                    help: $.s("Положение 3D объекта на экране. Устанавливается путем указания трех координат XYZ."),
                    default_val: "0,0,0",
                    validate: {
                        number: true
                    }
                },
                rot: {
                    type: "Text",
                    name: $.s("Вращение"),
                    help: $.s("Вращение 3D объекта на экране. Устанавливается путем указания трех координат XYZ."),
                    default_val: "0,0,0",
                    validate: {
                        number: true
                    }
                },
                scale: {
                    type: "Num",
                    name: $.s("Масштаб"),
                    help: $.s("Изменяет размер 3D объекта."),
                    default_val: 1,
                    spinner: {
                        min: -50000,
                        max: 50000,
                        step: 0.1
                    },
                    validate: {
                        number: true
                    }
                }
            }
        },
        "3d_motion": {
            name: $.s("3D Анимация"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-snake", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название"),
                    help: $.s("Задаете название 3D объекта."),
                    vital: true,
                    validate : {
                        required : true,
                    }
                },
                motion: {
                    type: "Text",
                    name: $.s("Название анимации"),
                    help: $.s("Задаете название анимации."),
                    vital: true,
                    validate : {
                        required : true,
                    }
                }
            }
        },
        "3d_hide": {
            name: $.s("Скрыть 3D объект"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-eye-slash", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название"),
                    help: $.s("Указывает имя объекта, который нужно скрыть."),
                    vital: true,
                    validate : {
                        required : true,
                    }
                },
                time: {
                    type: "Num",
                    name: $.s("Время"),
                    help: $.s("Время скрытия."),
                    unit: $.s("ms"),
                    default_val: 500,
                    spinner: {
                        min: 0,
                        max: 500000,
                        step: 100
                    },
                    validate: {
                        number: true
                    }
                },
                wait : {
                    type: "Check",
                    text: $.s("Дождаться завершения?"),
                    default_val: true,
                    name: $.s("Ожидание")
                }
            }
        },
        "3d_hide_all": {
            name: $.s("Скрыть все 3D объекты"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-eye-low-vision", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Время"),
                    help: $.s("Время скрытия."),
                    unit: $.s("ms"),
                    default_val: 500,
                    spinner: {
                        min: 0,
                        max: 500000,
                        step: 100
                    },
                    validate: {
                        number: true
                    }
                },
                wait: {
                    type: "Check",
                    text: $.s("Дождаться завершения?"),
                    default_val : true,
                    name: $.s("Ожидание")
                }
            }
        },
        "3d_delete": {
            name: $.s("Удалить 3D объект"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-square-minus", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название"),
                    help: $.s("Укажите название 3D объекта, который вы хотите удалить."),
                    vital: true,
                    validate: {
                        required : true,
                    }
                }
            }
        },
        "3d_delete_all": {
            name: $.s("Удалить 3D объекты"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-square-minus", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {}
        },
        "3d_event": {
            name: $.s("Определение события"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-calendar-pen", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название"),
                    help: $.s("Задает имя 3D объекта, который при клике по нему запускает событие."),
                    vital: true,
                    validate : {
                        required : true,
                    }
                },
                storage: _pm_type.storage,
                target: _pm_type.target
            }
        },
        "3d_event_delete": {
            name: $.s("Удалить событие"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-calendar-circle-minus", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название"),
                    help: $.s("Укажите имя 3D объекта, из которого нужно удалить событие."),
                    vital: true,
                    validate : {
                        required : true,
                    }
                }
            }
        },
        "3d_event_start": {
            name: $.s("Запустить событие"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-calendar-check", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {}
        },
        "3d_event_stop": {
            name: $.s("Остановить событие"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-calendar-day", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {}
        },
        "3d_image_new": {
            name: $.s("3D объект (изображение)"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-image", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название"),
                    help: $.s("Имя 3D объекта. Используется для управления скрытием или отображением."),
                    validate : {
                        required : true,
                    }
                },
                texture: {
                    type: "Text",
                    name: $.s("Текстура"),
                    help: $.s("Указывает файл изображения для отображения. Поместите файл в папку \"others/3d/texture\"."),
                    default_val: "",
                    vital: true,
                    validate : {
                        required : true,
                    }
                },
                width: {
                    type: "Num",
                    name: $.s("Ширина"),
                    help: $.s("Задает ширину 3D объекта."),
                    default_val: 1,
                    spinner: {
                        min: 0,
                        max: 50000,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },
                height: {
                    type: "Num",
                    name: $.s("Высота"),
                    help: $.s("Задает высоту 3D объекта. Если не задать, то сохранится соотношение сторон изображения."),
                    default_val: "",
                    spinner: {
                        min: 0,
                        max: 50000,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },
                pos: {
                    type: "Text",
                    name: $.s("Позиция"),
                    help: $.s("Положение 3D объекта на экране. Устанавливается путем указания трех координат XYZ."),
                    default_val: "0,0,0",
                    validate: {
                        number: true
                    }
                },
                rot: {
                    type: "Text",
                    name: $.s("Вращение"),
                    help: $.s("Вращение 3D объекта на экране. Устанавливается путем указания трех координат XYZ."),
                    default_val: "0,0,0",
                    validate: {
                        number: true
                    }
                },
                scale: {
                    type: "Num",
                    name: $.s("Масштаб"),
                    help: $.s("Изменяет размер 3D объекта."),
                    default_val: 1,
                    spinner: {
                        min: 0,
                        max: 50000,
                        step: 100
                    },
                    validate: {
                        number: true
                    }
                },
                tonemap: {
                    type: "Check",
                    text: $.s("Использовать Tone-map?"),
                    help: $.s("Задает, применяется ли отображение тона к этому объекту или нет. По умолчанию отключено."),
                    default_val : false,
                    name: $.s("Tone-map")
                },
                doubleside : {
                    type: "Check",
                    text: $.s("Отображать текстуру с обеих сторон?"),
                    default_val : false,
                    name: $.s("Отображение текстуры")
                }
            }
        },
        "3d_canvas_show": {
            name: $.s("Отобразить 3D сцену"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-border-inner", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Время"),
                    help: $.s("Вы можете указать время отображения."),
                    unit: $.s("ms"),
                    default_val: 1000,
                    spinner: {
                        min: 0,
                        max: 500000,
                        step: 100
                    },
                    validate: {
                        number: true
                    }
                }
            }
        },
        "3d_canvas_hide": {
            name: $.s("Скрыть 3D сцену"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-border-center-h", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {}
        },
        "3d_close": {
            name: $.s("Удалить 3D сцены"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-border-center-h", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {}
        },
        "3d_anim": {
            name: $.s("Анимация 3D объекта"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-bezier-curve", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название"),
                    help: $.s("Указывайте название объекта для его анимации. Если надо анимировать камеру, то напишите `camera`."),
                    validate : {
                        required : true,
                    }
                },
                pos: {
                    type: "Text",
                    name: $.s("Позиция"),
                    help: $.s("Положение 3D объекта на экране. Устанавливается путем указания трех координат XYZ."),
                    default_val: "0,0,0",
                    validate: {
                        number: true
                    }
                },
                rot: {
                    type: "Text",
                    name: $.s("Вращение"),
                    help: $.s("Вращение 3D объекта на экране. Устанавливается путем указания трех координат XYZ."),
                    default_val: "0,0,0",
                    validate: {
                        number: true
                    }
                },
                scale: {
                    type: "Num",
                    name: $.s("Масштаб"),
                    help: $.s("Изменяет размер 3D объекта."),
                    default_val: 100,
                    spinner: {
                        min: 0,
                        max: 50000,
                        step: 100
                    },
                    validate: {
                        number: true
                    }
                },
                time: {
                    type: "Num",
                    name: $.s("Время"),
                    help: $.s("Задает время в миллисекундах, которое занимает анимация."),
                    unit: $.s("ms"),
                    default_val: 1000,
                    spinner: {
                        min: 0,
                        max: 500000,
                        step: 100
                    },
                    validate: {
                        number: true
                    }
                },
                wait: {
                    type: "Check",
                    text: $.s("Дождаться завершения анимации?"),
                    default_val : true,
                    name: $.s("Ожидание")
                },
                lookat: {
                    type: "Text",
                    name: $.s("Направление"),
                    help: $.s("Используется только тогда, когда в поле название указано `camera`. С помощью этого вы можете направить камеру в определенное направление указав название объекта или координаты."),
                    default_val: "",
                    validate: {
                        number: true
                    }
                },
                effect: {
                    type: "Select",
                    name: $.s("Эффект"),
                    help: $.s("Эффект при анимации."),
                    select_list: _select_list_bg_effects,
                    default_val: "linear",
                    validate: {
                        number: true
                    }
                }
            }
        },
        "3d_anim_stop": {
            name: $.s("Остановить анимацию 3D объекта"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-stop", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название"),
                    help: $.s("Укажите название объекта, чтобы оставить его анимацию."),
                    validate : {
                        required : true,
                    }
                },
                finish : {
                    type: "Check",
                    text: $.s("Переместить 3D объект?"),
                    help: $.s("Если функция включена, то объект продолжит перемещение в указанные координаты."),
                    default_val : true,
                    name: $.s("Завершить")
                }
            }
        },
        "3d_scene": {
            name: $.s("Настройка 3D сцены"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-sliders-up", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                tonemap: {
                    type: "Select",
                    name: $.s("Режим Tone-map"),
                    help: $.s("Задает отображение тонов для сцены."),
                    select_list : [
                        {
                            name : $.s("No"),
                            val : "No"
                        },
                        {
                            name : $.s("Linear"),
                            val : "Linear"
                        },
                        {
                            name : $.s("Reinhard"),
                            val : "Reinhard"
                        },
                        {
                            name : $.s("Uncharted2"),
                            val : "Uncharted2"
                        },
                        {
                            name : $.s("Cineon"),
                            val : "Cineon"
                        },
                        {
                            name : $.s("ACES Filmic"),
                            val : "ACES Filmic"
                        },
                    ],
                    default_val : "No",
                },
                tonemap_value: {
                    type: "Num",
                    name: $.s("Значение Tone-map"),
                    help: $.s("Задает интенсивность отображения тонов."),
                    default_val: 0.8,
                    spinner: {
                        min: 0,
                        max: 100,
                        step: 0.1
                    },
                    validate: {
                        number: true
                    }
                },
                light_amb: {
                    type: "Num",
                    name: $.s("Освещение"),
                    help: $.s("Определяет интенсивность окружающего освещения.Значение по умолчанию равно 1. Если оно равно 0,5, оно становится темнее, а если равно 2, то становится довольно ярким."),
                    default_val: 1,
                    spinner: {
                        min: 0,
                        max: 100,
                        step: 0.1
                    },
                    validate: {
                        number: true
                    }
                }
            }
        },
        "3d_camera": {
            name: $.s("3D камера"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-camera-cctv", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                pos: {
                    type: "Text",
                    name: $.s("Позиция"),
                    help: $.s("Задает положение камеры на сцене."),
                    default_val: "0,0,0",
                    validate: {
                        number: true
                    }
                },
                rot: {
                    type: "Text",
                    name: $.s("Поворот"),
                    help: $.s("Задает поворот камеры на сцене."),
                    default_val: "0,0,0",
                    validate: {
                        number: true
                    }
                },
                lookat: {
                    type: "Text",
                    name: $.s("Направление"),
                    help: $.s("Указав имя 3D-объекта на сцене, вы можете направить камеру на этот объект.Кроме того, вы можете навести камеру на координаты xyz."),
                    default_val: "",
                    validate: {
                        number: true
                    }
                }
            }
        },
        "3d_gyro": {
            name: $.s("Гироскоп"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-group-arrows-rotate", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                max_x: {
                    type: "Num",
                    name: $.s("Наклон по X"),
                    help: $.s("Задает верхний предел наклона в направлении оси X в виде угла."),
                    default_val: 30,
                    spinner: {
                        min: 0,
                        max: 1000,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },
                max_y: {
                    type: "Num",
                    name: $.s("Наклон по Y"),
                    help: $.s("Задает верхний предел наклона в направлении оси Y в виде угла."),
                    default_val: 30,
                    spinner: {
                        min: 0,
                        max: 1000,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },
                mode: {
                    type: "Select",
                    name: $.s("Режим"),
                    help: $.s("Устанавливает режим гироскопа на ‘положение’ или ‘вращение’. Выбранный режим определяет, влияет ли на камеру вращение или изменение положения относительно наклона. Значение по умолчанию - вращение."),
                    select_list : [
                        {
                            name : $.s("Вращение"),
                            val : "rotation"
                        },
                        {
                            name : $.s("Позиция"),
                            val : "position"
                        },
                    ],
                    default_val : "rotation",
                }
            }
        },
        "3d_gyro_stop": {
            name: $.s("Отключить гироскоп"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-group-arrows-rotate", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {}
        },
        "3d_debug_camera": {
            name: $.s("Отладка 3D камеры"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-bug", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                button_text: {
                    type: "Text",
                    name: $.s("Текст кнопки"),
                    help: $.s("Вы можете свободно задать текст кнопки завершения отладки камеры."),
                    default_val: "Закрыть отладку камеры",
                    validate: {
                        number: true
                    }
                },
                menu : {
                    type: "Check",
                    text: $.s("Отображать меню?"),
                    help: $.s("Следует ли отображать меню отладки. Если функция выключена, то будет только кнопка выхода."),
                    default_val : true,
                    name: $.s("Меню")
                }
            }
        },
        "3d_debug": {
            name: $.s("Отладка объекта"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-bug", icon_color: "#f69696", category: "d3Environment"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название"),
                    help: $.s("Укажите название объекта для отладки"),
                    validate: {
                        required: true,
                    }
                },
                button_text: {
                    type: "Text",
                    name: $.s("Текст кнопки"),
                    help: $.s("Вы можете свободно задать текст кнопки завершения отладки."),
                    default_val: "Закрыть отладку",
                    validate: {
                        number: true
                    }
                },
                menu: {
                    type: "Check",
                    text: $.s("Отображать меню?"),
                    help: $.s("Следует ли отображать меню отладки. Если функция выключена, то будет только кнопка выхода."),
                    default_val : true,
                    name: $.s("Меню")
                },
                overlap: {
                    type: "Check",
                    text: $.s("Отображать на переднем плане?"),
                    help: $.s("Если функция включена, то 3D объект будет отображаться на переднем плане."),
                    default_val : false,
                    name: $.s("Перекрытие")
                },
                reset: {
                    type: "Check",
                    text: $.s("Сбросить положение объекта после закрытия отладки?"),
                    default_val : false,
                    name: $.s("Сброс")
                }
            }
        },

        // Чат
        "chat_config": {
            name: $.s("Настройка чата"),
            component_type: "Simple",
            default_view: {
                icon: "fa-sharp fa-solid fa-comment-smile",
                icon_color: "#343c99",
                category: "chatStory",
                base_sound_url: "data/sound/",
                base_img_url: "data/bgimage/",
            },
            param_view: {},
            param: {
                under_height: {
                    type: "Num",
                    name: $.s("Внутренняя высота"),
                    vital: true,
                    unit: "px",
                    default_val: 500,
                    spinner: {
                        min: 0,
                        max: 2000,
                        step: 5
                    },
                    validate: {
                        number: true
                    }
                },

                chat_width: {
                    type: "Num",
                    name: $.s("Ширина чата"),
                    vital: true,
                    unit: "px",
                    default_val: 500,
                    spinner: {
                        min: 0,
                        max: 2000,
                        step: 5
                    },

                    validate: {
                        number: true
                    }
                },

                chat_height: {
                    type: "Num",
                    name: $.s("Высота чата"),
                    vital: true,
                    unit: "px",
                    default_val: 500,
                    spinner: {
                        min: 0,
                        max: 500,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },

                "anim_time": {
                    type: "Num",
                    name: $.s("Время прокрутки чата"),
                    vital: true,
                    unit: "ms",
                    default_val: 300,
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                _bound_select: {
                    type: "BoundSelectPlugin",
                    bound_type: "plugin",
                    name: $.s("Положение изображения"),
                    help: $.s("Используйте для визуального позиционирования и изменения размера элемента на экране."),
                    vital: false,
                    default_val: "",

                    drag_obj: function (pm) {

                        var html = '<div class=""></div>';

                        var j_obj = $(html);

                        j_obj.css({
                            height: pm.chat_height,
                            width: pm.chat_width,
                            resize: "none",
                            border: "1px solid #c27e48",
                            backgroundColor: $.convertColor(pm.bgcolor)
                        })

                        return j_obj
                    },
                },

                chat_fullScreen: {
                    type: "Check",
                    text: $.s("На весь экран?"),
                    help: $.s("Если вам нужен полноэкранный чат, то перед включением верните чат к нулевым значениям положения с помощью \"Инструмента позиционирования\"."),
                    default_val: false,
                    name: $.s("Размер чата"),
                },

                backlog: {
                    type: "Check",
                    text: $.s("Сохранить историю чата?"),
                    default_val: false,
                    name: $.s("История"),
                },

                face_width: {
                    type: "Num",
                    name: $.s("Размер аватара"),
                    vital: true,
                    default_val: 100,
                    spinner: {
                        min: 0,
                        max: 500,
                        step: 10
                    },

                    validate: {
                        number: true
                    }
                },
                chat_opacity: {
                    type: "Num",
                    name: $.s("Прозрачность фона"),
                    vital: true,
                    default_val: 1,
                    spinner: {
                        min: 0,
                        max: 1,
                        step: 0.1
                    },

                    validate: {
                        number: true
                    }
                },
                bgcolor: {
                    type: "Color",
                    name: $.s("Цвет фона"),
                    default_val: "0x000000",
                    validate: {
                        required: true
                    }
                },
                name_font_color: {
                    type: "Color",
                    name: $.s("Цвет имени"),
                    default_val: "0xeaeaea",
                    validate: {
                        required: false
                    }
                },

                left_bgcolor: {
                    type: "Color",
                    name: $.s("Слева"),
                    help: $.s("Цвет фона левого диалогового облака."),
                    default_val: "0xe3e3e3",
                    validate: {
                        required: false
                    }
                },
                right_bgcolor: {
                    type: "Color",
                    name: $.s("Справа"),
                    help: $.s("Цвет фона правого диалогового облака."),
                    default_val: "0xc45858",
                    validate: {
                        required: false
                    }
                },
                center_bgcolor: {
                    type: "Color",
                    name: $.s("Center"),
                    help: $.s("Цвет фона центрального диалогового облака."),
                    default_val: "0x454f83",
                    validate: {
                        required: false
                    }
                },

                name_font_size: {
                    type: "Num",
                    name: $.s("Размер шрифта имени"),
                    unit: "px",
                    default_val: "20",
                    validate: {
                        required: true
                    }
                },
                chat_bg_image: {
                    type: "ImageSelect",
                    file_path: "bgimage/",
                    name: $.s("Изображение фона"),
                    help: $.s("Будет использовано выбранное фоновое изображение."),
                    vital: true,
                    default_val: "",
                    line_preview: "on",
                    validate: {
                        required: true
                    }
                },

                se: {
                    type: "SoundSelect",
                    file_path: "sound/",
                    name: $.s("Звук сообщения"),
                    help: $.s("Звук, который воспроизводится при появлении сообщения. Используйте короткий звук!"),
                    vital: !0,
                    default_val: ""
                },
            }
        },
        "chat_sh": {
            name: $.s("Скрыть чат"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-comment-slash", icon_color: "#f69696", category: "chatStory"},
            param_view: {},
            param: {
                chat_hide_show: {
                    type: "Select",
                    name: $.s("Отображение"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Скрыть"),
                            val : "hide"
                        },
                        {
                            name : $.s("Показать"),
                            val : "show"
                        },
                    ],
                    default_val : "hide",
                }
            }
        },
        "chat_clear": {
            name: $.s("Очистка чата"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-comment-xmark", icon_color: "#f69696", category: "chatStory"},
            param_view: {},
            param: {
                time: {
                    type: "Num",
                    name: $.s("Время очистки"),
                    help: $.s("Влияет на то, как долго чат будет исчезать."),
                    vital: true,
                    unit: "ms",
                    default_val: 300,
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                }
            }
        },
        "chat_scroll": {
            name: $.s("Прокрутка чата"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-comment-arrow-up", icon_color: "#f69696", category: "chatStory"},
            param_view: {},
            param: {
                direction: {
                    type: "Select",
                    name: $.s("Направление"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Вверх"),
                            val : "up"
                        },
                        {
                            name : $.s("Вниз"),
                            val : "down"
                        },
                    ],
                    default_val : "up",
                },

                effect: {
                    type: "Select",
                    select_list: _ease_effect_list,
                    help: $.s("Выбрать эффект, который будет применен к анимации."),
                    default_val: "linear",
                    name: $.s("Эффект (при переходе)")
                },
                time: {
                    type: "Num",
                    name: $.s("Время прокрутки"),
                    help: $.s("Время, в течение которого чат будет прокручиваться вверх или вниз."),
                    vital: true,
                    unit: "ms",
                    default_val: 300,
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },

                top: {
                    type: "Num",
                    name: $.s("Сила прокрутки"),
                    help: $.s("Определяет, насколько сильно будет прокручиваться чат."),
                    vital: true,
                    default_val: 10,
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                }
            }
        },
        "chat_talk": {
            name: $.s("Сообщение чата"),
            component_type: "Simple",
            default_view: {
                icon: "fa-sharp fa-solid fa-comment-lines",
                icon_color: "#f69696",
                category: "chatStory",
                base_img_url : "data/fgimage/",
                base_movie_url: "data/video/",
            },
            param_view: {},
            param: {
                message_p_t: {
                    type: "Select",
                    name: $.s("Тип прелоадера сообщений"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Спиннер"),
                            val : "spinner"
                        },
                        {
                            name : $.s("Появляющиеся точки"),
                            val : "dots"
                        },
                        {
                            name : $.s("Радиальная анимация"),
                            val : "radial"
                        },
                        {
                            name : $.s("Спиральная анимация"),
                            val : "spiral"
                        },
                    ],
                    default_val : "spinner",
                },
                pos: {
                    type: "Select",
                    name: $.s("Позиция"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Слева"),
                            val : "left"
                        },
                        {
                            name : $.s("Справа"),
                            val : "right"
                        },
                        {
                            name : $.s("Середина"),
                            val : "center"
                        },
                    ],
                    default_val : "center",
                },

                name: {
                    type: "Variable",
                    name: $.s("Имя персонажа"),
                    help: $.s("Имя говорящего персонажа."),
                },

                text: {
                    type: "Text",
                    name: $.s("Текст сообщения"),
                    validate : {
                        required : true,
                    },

                },

                delay: {
                    type: "Num",
                    name: $.s("Время написания"),
                    help: $.s("Устанавливает время ожидания перед выводом сообщения."),
                    vital: true,
                    unit: "ms",
                    default_val: 0,
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },

                    validate: {
                        number: true
                    }
                },

                face: {
                    type : "ImageSelect",
                    file_path : "fgimage/",
                    name : $.s("Аватар"),
                    help : $.s("Изображение персонажа в чате."),
                    vital : true,
                    default_val : "",
                    line_preview: "on",
                    validate : {
                        required : true
                    }
                },

                reflect : {
                    type : "Check",
                    name: $.s("Отражение"),
                    text : $.s("Отразить Аватар?"),
                    default_val : false
                },

                graphic: {
                    type : "ImageSelect",
                    file_path : "fgimage/",
                    name : $.s("Изображение"),
                    help : $.s("Изображение, которое игрок отправляет в чат."),
                    vital : true,
                    default_val : "",
                    line_preview: "on",
                    validate : {
                        required : true
                    }
                },

                graphic_width: {
                    type: "Num",
                    name: $.s("Размер изображения"),
                    vital: true,
                    default_val: 250,
                    spinner: {
                        min: 0,
                        max: 500,
                        step: 10
                    },

                    validate: {
                        number: true
                    }
                },

                video: {
                    type : "MovieSelect",
                    file_path: "video/",
                    name : $.s("Видео"),
                    vital : true,
                    default_val : "",
                    validate : {
                        required : true
                    }
                },

                color: {
                    type: "Color",
                    name: $.s("Цвет текста"),
                    default_val: "0x000000",
                    validate: {
                        required: false
                    }
                }
            }
        },
        "p": {
            name: $.s("Ожидание клика"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-comment-exclamation", icon_color: "#f69696", category: "nextChat"},
            param_view: {},
            header: function (e) {
                return $.replaceAll(e.data.pm.text, "&nbsp;", " ")
            },
            param: {}
        },
        "tb_hide": {
            name: $.s("Скрыть текстовый блок"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-browser", icon_color: "#f69696", category: "chatStory"},
            param_view: {},
            header: function (e) {
                return $.replaceAll(e.data.pm.text, "&nbsp;", " ")
            },
            param: {
                tb_hide_show: {
                    type: "Select",
                    name: $.s("Отображение"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Скрыть"),
                            val : "hide"
                        },
                        {
                            name : $.s("Показать"),
                            val : "show"
                        },
                    ],
                    default_val : "hide",
                }
            }
        },

        // Элементы интерфейса
        "uiVariable": {
            name: $.s("Обновление переменной"),
            component_type: "Simple",
            default_view: {
                icon: "fa-sharp fa-solid fa-binary-circle-check",
                icon_color: "#343c99",
                category: "uiElements"
            },
            param_view: {},
            param: {
                uiNameVar: {type: "Variable", name: $.s("Переменная"), help: $.s("Выберете переменную, в которую сохраниться значение.")},

                uiName: {
                    type: "Text",
                    name: $.s("Отображаемое название"),
                    help: $.s("Название, которое игроки будут видеть в игре."),
                    vital: true,
                    default_val: ""
                },

                uiNameDiv: {
                    type: "Text",
                    name: $.s("Название элемента"),
                    help: $.s("Название элемента необходимо для того, чтобы отличать один \"Элемент\" от другого. Обязательно называйте разные элементы по-разному!"),
                    vital: true,
                    default_val: "_var"
                },
                _bound_select: {

                    type: "BoundSelectPlugin",
                    bound_type: "plugin",
                    name: $.s("Положение изображения"),
                    help: $.s("Используйте для визуального позиционирования и изменения размера элемента на экране."),
                    vital: false,
                    default_val: "",

                    drag_obj: function (pm) {
                        const html = '<div class="' + pm.uiNameDiv + '"> ' + pm.uiName + ' : ' + pm.uiNameVar + ' </div>';
                        const j_obj = $(html);
                        j_obj.css({
                            background: $.convertColor(pm.color),
                            position: "absolute",
                            width: pm.width,
                            height: pm.height,
                            userSelect: "none",
                            paddingTop: pm.paddingTop + "px",
                            paddingBottom: pm.paddingBottom + "px",
                            paddingLeft: pm.paddingLeft + "px",
                            paddingRight: pm.paddingRight + "px",
                            borderRadius: pm.borderRadius + "px",
                            opacity: pm.opacity,
                            color: $.convertColor(pm.fontColor),
                            fontSize: pm.fontSize + "px",
                            fontFamily: pm.face,
                        });

                        return j_obj


                    },
                },
                color: {
                    type: "Color",
                    name: $.s("Цвет фона"),
                    default_val: "0x000000",
                    validate: {
                        required: true
                    }
                },
                disableBG: {
                    type: "Check",
                    text: $.s("Отключить фон?"),
                    help: $.s("Фон не всегда нужен, поэтому если вам нужен только текст, включите эту опцию."),
                    default_val: !1,
                },
                fontColor: {
                    type: "Color",
                    name: $.s("Цвет шрифта"),
                    default_val: "0xffffff",
                    validate: {
                        required: true
                    }
                },
                fontSize: {
                    type: "Num",
                    name: $.s("Размер шрифта"),
                    unit: $.s("px"),
                    default_val: "22",
                    spinner: {
                        min: 0,
                        max: 100,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },
                face: {
                    type: "Select",
                    name: $.s("Изменение шрифта"),
                    select_list: _font_face_list
                },
                paddingTop: {
                    type: "Num",
                    name: $.s("Отступ сверху"),
                    unit: $.s("px"),
                    help: $.s("Внутренний отступ сверху. Позволяет отодвинуть текст от верхней границы блока."),
                    spinner: {
                        min: 0,
                        max: 50,
                        step: 0.5
                    },
                    validate: {
                        number: true
                    }
                },
                paddingBottom: {
                    type: "Num",
                    name: $.s("Отступ снизу"),
                    unit: $.s("px"),
                    help: $.s("Внутренний отступ снизу. Позволяет отодвинуть текст от нижней границы блока."),
                    spinner: {
                        min: 0,
                        max: 50,
                        step: 0.5
                    },
                    validate: {
                        number: true
                    }
                },
                paddingLeft: {
                    type: "Num",
                    name: $.s("Отступ слева"),
                    unit: $.s("px"),
                    help: $.s("Внутренний отступ слева. Позволяет сделать отступ текста от левой границы блока."),
                    spinner: {
                        min: 0,
                        max: 50,
                        step: 0.5
                    },
                    validate: {
                        number: true
                    }
                },
                paddingRight: {
                    type: "Num",
                    name: $.s("Отступ справа"),
                    unit: $.s("px"),
                    help: $.s("Внутренний отступ справа. Позволяет сделать отступ текста от правой границы блока."),
                    spinner: {
                        min: 0,
                        max: 50,
                        step: 0.5
                    },
                    validate: {
                        number: true
                    }
                },
                borderRadius: {
                    type: "Num",
                    name: $.s("Скругление углов"),
                    unit: $.s("px"),
                    help: $.s("Позволяет скруглить углы"),
                    spinner: {
                        min: 0,
                        max: 50,
                        step: 0.5
                    },
                    validate: {
                        number: true
                    }
                },

                opacity: {
                    type: "Num",
                    name: $.s("Прозрачность"),
                    spinner: {
                        min: 0,
                        max: 1,
                        step: 0.1
                    },
                    validate: {
                        number: true
                    }
                },

                width: {
                    type: "Num",
                    name: $.s("Ширина"),
                    unit: $.s("px"),
                    help: $.s("Ширина блока. Для более точной настройки."),
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },
                height: {
                    type: "Num",
                    name: $.s("Высота"),
                    unit: $.s("px"),
                    help: $.s("Высота блока. Для более точной настройки."),
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                }
            }
        },
        "uiCloseAndOpen": {
            name: $.s("Скрыть [ДИ]"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-regular fa-object-intersect", icon_color: "#f69696", category: "uiElements"},
            param_view: {},
            param: {
                uiVarCloseAndOpen: {
                    type: "Select",
                    name: $.s("Отображение"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Скрыть"),
                            val : "close"
                        },
                        {
                            name : $.s("Показать"),
                            val : "open"
                        },
                    ],
                    default_val : "close",
                },

                uiVarCloseAndOpenName: {
                    type: "Text",
                    name: $.s("Название элемента"),
                    help: $.s("Задайте здесь название элемента, который вы хотите скрыть или показать."),
                    vital: true,
                },
                uiAllCloseAndOpen: {
                    type: "Check",
                    text: $.s("Скрыть весь Динамический интерфейс?"),
                    help: $.s("Скрывает все элементы динамического интерфейса."),
                    default_val: !1,
                }
            }
        },
        // Action Timer
        actionTime: {
            name: $.s("Переход по таймеру"),
            header: function (e) {
                const RES = Number(e.data.pm.actionTimeSec) / 1000;
                return RES + " " + $.s("Секунд(ы)");
            },
            component_type: "Simple",
            default_view: {base_img_url: "data/fgimage/", icon: "fa-sharp fa-solid fa-timer", icon_color: "#f69696", category: "uiElements"},
            param_view: {},
            param: {
                actionTimeSec: {
                    type: "Num",
                    name: $.s("Время до перехода"),
                    unit: $.s("px"),
                    default_val: "3000",
                    spinner: {
                        min: 0,
                        max: 100000,
                        step: 100
                    },
                    validate: {
                        number: true
                    }
                },
                actionTimeTitle: {
                    type: "Text",
                    name: $.s("Название таймера"),
                    vital: true,
                    default_val: ""
                },
                storage: _pm_type.storage,
                target: _pm_type.target,
                _bound_select: {

                    type: "BoundSelectPlugin",
                    bound_type: "plugin",
                    name: $.s("Положение изображения"),
                    help: $.s("Используйте для визуального позиционирования и изменения размера элемента на экране."),
                    vital: false,
                    default_val: "",

                    drag_obj: function (pm) {
                        let baseDirPath = app.getProjectPath() + 'data/fgimage/' + pm.graphic;

                        const html = `<div><img src="${baseDirPath}"></div>`;
                        const j_obj = $(html)
                        j_obj.css({
                            backgroundImage: baseDirPath,
                            backgroundColor: "rgba(0,0,0,0.35)",
                            position: "absolute",
                            width: pm.width,
                            height: pm.height,
                            userSelect: "none",
                            fontSize: "20px",
                        });

                        return j_obj


                    },
                },
                height: {
                    type: "Num",
                    name: $.s("Высота таймера"),
                    unit: $.s("px"),
                    default_val: "60",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                width: {
                    type: "Num",
                    name: $.s("Ширина таймера"),
                    unit: $.s("px"),
                    default_val: "200",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                actionTimeFontSize: {
                    type: "Num",
                    name: $.s("Размер шрифта"),
                    unit: $.s("px"),
                    default_val: "22",
                    spinner: {
                        min: 0,
                        max: 100,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },
                actionTimeFontFace: {
                    type: "Select",
                    name: $.s("Изменить шрифт"),
                    select_list: _font_face_list
                },
                attopTitlePos: {
                    type: "Num",
                    name: $.s("Положение текста по Y"),
                    unit: $.s("px"),
                    default_val: "0",
                    spinner: {
                        min: -1000,
                        max: 1000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                atleftTitlePos: {
                    type: "Num",
                    name: $.s("Положение текста по X"),
                    unit: $.s("px"),
                    default_val: "0",
                    spinner: {
                        min: -1000,
                        max: 1000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                fontColorTitle: {
                    type: "Color",
                    name: $.s("Цвет текста"),
                    default_val: "0x454f83",
                    validate: {
                        required: false
                    }
                },
                graphic: {
                    type : "ImageSelect",
                    file_path : "fgimage/",
                    name : $.s("Внешняя рамка"),
                    help : $.s("Изображение что используется для обрамления."),
                    vital : true,
                    default_val : "",
                    line_preview: "on",
                    validate : {
                        required : true
                    }
                },
                graphic2: {
                    type : "ImageSelect",
                    file_path : "fgimage/",
                    name : $.s("Заполнение"),
                    help : $.s("Изображение что используется для заполнения рамки."),
                    vital : true,
                    default_val : "",
                    line_preview: "on",
                    validate : {
                        required : true
                    }
                },
                height2: {
                    type: "Num",
                    name: $.s("Высота внутренняя"),
                    unit: $.s("px"),
                    default_val: "60",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                width2: {
                    type: "Num",
                    name: $.s("Ширина внутренняя"),
                    unit: $.s("px"),
                    default_val: "200",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                attopPos: {
                    type: "Num",
                    name: $.s("Положение внутреннего элемента по Y"),
                    unit: $.s("px"),
                    default_val: "0",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                atleftPos: {
                    type: "Num",
                    name: $.s("Положение внутреннего элемента по X"),
                    unit: $.s("px"),
                    default_val: "0",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                actionTimeAnimation: {
                    type: "Select",
                    name: $.s("Анимация появления таймера"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Bounce"),
                            val : "animate__bounce"
                        },
                        {
                            name : $.s("Flash"),
                            val : "animate__flash"
                        },
                        {
                            name : $.s("Pulse"),
                            val : "animate__pulse"
                        },
                        {
                            name : $.s("Head Shake"),
                            val : "animate__headShake"
                        },
                        {
                            name : $.s("Back In Up"),
                            val : "animate__backInUp"
                        },
                        {
                            name : $.s("Back In Left"),
                            val : "animate__backInLeft"
                        },
                        {
                            name : $.s("Back In Right"),
                            val : "animate__backInRight"
                        },
                        {
                            name : $.s("Fade In Up"),
                            val : "animate__fadeInUp"
                        },
                        {
                            name : $.s("Fade In"),
                            val : "animate__fadeIn"
                        },
                        {
                            name : $.s("Jack In The Box"),
                            val : "animate__jackInTheBox"
                        },
                        {
                            name : $.s("Zoom In"),
                            val : "animate__zoomIn"
                        },
                        {
                            name : $.s("Slide In Up"),
                            val : "animate__slideInUp"
                        },
                    ],
                    default_val : "animate__fadeIn",
                },
            }
        },

        // Action Progress
        actionProgress: {
            name: $.s("Прогресс бар"),
            component_type: "Simple",
            default_view: {base_img_url: "data/fgimage/", icon: "fa-sharp fa-solid fa-bars-progress", icon_color: "#f69696", category: "uiElements"},
            param_view: {},
            param: {
                actionProgressVar: {
                    type: "Variable",
                    name: $.s("Переменная"),
                    help: $.s("Выберете переменную, в которую сохраниться значение.")
                },
                actionProgressTitle: {
                    type: "Text",
                    name: $.s("Название прогресс бара"),
                    vital: true,
                    default_val: ""
                },
                height: {
                    type: "Num",
                    name: $.s("Высота прогресс бара"),
                    unit: $.s("px"),
                    default_val: "60",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                width: {
                    type: "Num",
                    name: $.s("Ширина прогресс бара"),
                    unit: $.s("px"),
                    default_val: "200",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                actionProgressFontSize: {
                    type: "Num",
                    name: $.s("Размер шрифта"),
                    unit: $.s("px"),
                    default_val: "22",
                    spinner: {
                        min: 0,
                        max: 100,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },
                actionProgressFontFace: {
                    type: "Select",
                    name: $.s("Изменить шрифт"),
                    select_list: _font_face_list
                },
                attopTitlePos: {
                    type: "Num",
                    name: $.s("Положение текста по Y"),
                    unit: $.s("px"),
                    default_val: "0",
                    spinner: {
                        min: -1000,
                        max: 1000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                atleftTitlePos: {
                    type: "Num",
                    name: $.s("Положение текста по X"),
                    unit: $.s("px"),
                    default_val: "0",
                    spinner: {
                        min: -1000,
                        max: 1000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                fontColorTitle: {
                    type: "Color",
                    name: $.s("Цвет текста"),
                    default_val: "0x454f83",
                    validate: {
                        required: false
                    }
                },
                graphic: {
                    type : "ImageSelect",
                    file_path : "fgimage/",
                    name : $.s("Внешняя рамка"),
                    help : $.s("Изображение что используется для обрамления."),
                    vital : true,
                    default_val : "",
                    line_preview: "on",
                    validate : {
                        required : true
                    }
                },
                graphic2: {
                    type : "ImageSelect",
                    file_path : "fgimage/",
                    name : $.s("Заполнение"),
                    help : $.s("Изображение что используется для заполнения рамки."),
                    vital : true,
                    default_val : "",
                    line_preview: "on",
                    validate : {
                        required : true
                    }
                },
                _bound_select: {
                    type: "BoundSelectPlugin",
                    bound_type: "plugin",
                    name: $.s("Положение изображения"),
                    help: $.s("Используйте для визуального позиционирования и изменения размера элемента на экране."),
                    vital: false,
                    default_val: "",

                    drag_obj: function (pm) {
                        let baseDirPath = app.getProjectPath() + 'data/fgimage/' + pm.graphic;

                        const html = `<div><img src="${baseDirPath}"></div>`;
                        const j_obj = $(html)
                        j_obj.css({
                            backgroundImage: baseDirPath,
                            backgroundColor: "rgba(0,0,0,0.35)",
                            position: "absolute",
                            width: pm.width,
                            height: pm.height,
                            userSelect: "none",
                            fontSize: "20px",
                        });

                        return j_obj


                    },
                },
                height2: {
                    type: "Num",
                    name: $.s("Высота внутренняя"),
                    unit: $.s("px"),
                    default_val: "60",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                width2: {
                    type: "Num",
                    name: $.s("Ширина внутренняя"),
                    unit: $.s("px"),
                    default_val: "200",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                attopPos: {
                    type: "Num",
                    name: $.s("Положение внутреннего элемента по Y"),
                    unit: $.s("px"),
                    default_val: "0",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 10
                    },
                    validate: {
                        number: true
                    }
                },
                // atleftPos: {
                //     type: "Num",
                //     name: $.s("Положение внутреннего элемента по X"),
                //     unit: $.s("px"),
                //     default_val: "0",
                //     spinner: {
                //         min: 0,
                //         max: 10000,
                //         step: 10
                //     },
                //     validate: {
                //         number: true
                //     }
                // },
                innerZIndex: {
                    type: "Num",
                    name: $.s("Z-Index Внутренний"),
                    default_val: "0",
                    spinner: {
                        min: -50,
                        max: 10000,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },
                actionProgressAnimation: {
                    type: "Select",
                    name: $.s("Анимация появления прогресс бара"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Bounce"),
                            val : "animate__bounce"
                        },
                        {
                            name : $.s("Flash"),
                            val : "animate__flash"
                        },
                        {
                            name : $.s("Pulse"),
                            val : "animate__pulse"
                        },
                        {
                            name : $.s("Head Shake"),
                            val : "animate__headShake"
                        },
                        {
                            name : $.s("Back In Up"),
                            val : "animate__backInUp"
                        },
                        {
                            name : $.s("Back In Left"),
                            val : "animate__backInLeft"
                        },
                        {
                            name : $.s("Back In Right"),
                            val : "animate__backInRight"
                        },
                        {
                            name : $.s("Fade In Up"),
                            val : "animate__fadeInUp"
                        },
                        {
                            name : $.s("Fade In"),
                            val : "animate__fadeIn"
                        },
                        {
                            name : $.s("Jack In The Box"),
                            val : "animate__jackInTheBox"
                        },
                        {
                            name : $.s("Zoom In"),
                            val : "animate__zoomIn"
                        },
                        {
                            name : $.s("Slide In Up"),
                            val : "animate__slideInUp"
                        },
                    ],
                    default_val : "animate__fadeIn",
                },
            }
        },
        actionProgressHide: {
            name: function (e) {
                const hide = $.s("Скрыть прогресс бар")
                const show = $.s("Показать прогресс бар")
                if (e.data.pm.progressBarHide === "hide") {
                    return hide;
                } else {
                    return show;
                }
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-light fa-bars-progress", icon_color: "#f69696", category: "uiElements"},
            param_view: {},
            param: {
                progressBarHide: {
                    type: "Select",
                    name: $.s("Отображение"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Скрыть"),
                            val : "hide"
                        },
                        {
                            name : $.s("Показать"),
                            val : "show"
                        },
                    ],
                    default_val : "hide",
                }
            }
        },
        // Текстовая подсказка
        "textHint": {
            name: $.s("Текстовая подсказка"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-thought-bubble", icon_color: "#f69696", category: "text"},
            param_view: {},
            param: {
                "what_to_replace": {
                    type: "Text",
                    name: $.s("Что заменить"),
                    help: $.s("Здесь мы пишем слово или сочетание слов, которое необходимо заменить. Если нужно заменить одно слово, то вставьте специальный символ в конец или начало слова. Пример: Тест*. Если нужно заменить несколько слов, то объедините их. Пример: текстсообщения."),
                    vital: true,
                    default_val: ""
                },
                "on_what_replace": {
                    type: "Text",
                    name: $.s("На что заменить"),
                    help: $.s("Здесь мы пишем слово или сочетание слов так, как они должны выглядеть в игре. Пример: Тест."),
                    vital: true,
                    default_val: ""
                },
                "hint_text": {
                    type: "Text",
                    name: $.s("Текст подсказки"),
                    help: $.s("Текст подсказки, которая будет показана при наведении курсора мыши."),
                    vital: true,
                    default_val: ""
                },
                "hint_direction": {
                    type: "Select",
                    name: $.s("Направление"),
                    help: $.s("Направление определяет, с какой стороны будет отображаться всплывающая подсказка."),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Верх"),
                            val : "up"
                        },
                        {
                            name : $.s("Низ"),
                            val : "down"
                        },
                        {
                            name : $.s("Слева"),
                            val : "left"
                        },
                        {
                            name : $.s("Справа"),
                            val : "right"
                        },
                    ],
                    default_val : "up",
                }
            }
        },
        "textHintSettings": {
            name: $.s("Настройки текстовой подсказки"),
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-square-sliders-vertical", icon_color: "#f69696", category: "text"},
            param_view: {},
            param: {
                "text_color_hover": {
                    type: "Color",
                    name: $.s("Цвет текста при наведении"),
                    help:$.s("Цвет текста, который будет применен к заменяемому слову при наведении на него курсора мыши."),
                    default_val: "0x000000",
                    validate: {
                        required: true
                    }
                },
                "balloon_bg_color": {
                    type: "Color",
                    name: $.s("Цвет фона"),
                    help:$.s("Цвет фона всплывающей подсказки."),
                    default_val: "0x000000",
                    validate: {
                        required: true
                    }
                },
                "balloon_text_color": {
                    type: "Color",
                    name: $.s("Цвет шрифта"),
                    help:$.s("Цвет шрифта во всплывающей подсказке."),
                    default_val: "0xffffff",
                    validate: {
                        required: true
                    }
                },
                "balloon_border_radius": {
                    type: "Num",
                    name: $.s("Скругление углов"),
                    help:$.s("Закругление углов всплывающей подсказки."),
                    unit: $.s("px"),
                    default_val: "3",
                    spinner: {
                        min: 0,
                        max: 50,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },
                "balloon_padding": {
                    type: "Num",
                    name: $.s("Внутренний отступ"),
                    help:$.s("Отступ текста от внутренних границ всплывающей подсказки."),
                    unit: $.s("px"),
                    default_val: "5",
                    spinner: {
                        min: 0,
                        max: 50,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },
                "balloon_font_size": {
                    type: "Num",
                    name: $.s("Размер шрифта"),
                    help:$.s("Размер шрифта во всплывающей подсказке."),
                    unit: $.s("px"),
                    default_val: "12",
                    spinner: {
                        min: 0,
                        max: 100,
                        step: 1
                    },
                    validate: {
                        number: true
                    }
                },
                "balloon_font": {
                    type: "Select",
                    name: $.s("Стиль шрифта"),
                    help: $.s("Стиль шрифта во всплывающей подсказке."),
                    select_list: _font_face_list},
                "text_transition": {
                    type: "Num",
                    name: $.s("Переход текста"),
                    help: $.s("Время, необходимое для изменения цвета текста."),
                    unit: $.s("s"),
                    default_val: "0.5",
                    spinner: {
                        min: 0,
                        max: 10,
                        step: 0.1
                    },
                    validate: {
                        number: true
                    }
                },
                "bold_text" : {
                    type : "Check",
                    name: $.s("Жирный текст"),
                    text : $.s("Жирный текст?"),
                    default_val : false
                },
                "italic_text" : {
                    type : "Check",
                    name: $.s("Курсивный текст"),
                    text : $.s("Курсивный текст?"),
                    default_val : false
                }
            }
        },
        // Покадровая анимация
        "animFrame": {
            name: $.s("Покадровая анимация"),
            component_type: "Simple",
            default_view: {
                icon: "fa-sharp fa-solid fa-gif",
                category: "image",
                base_img_url : "data/fgimage/animationFrame/"
            },
            param_view: {},
            param: {
                animFrame_id: {
                    type : "Num",
                    name : $.s("ID Анимации"),
                    help: $.s("Необходим для того, чтобы отличать одну анимацию от другой."),
                    spinner: {
                        min: 0,
                        max: 1000,
                        step: 1
                    },
                    default_val : ""
                },
                animFrame_url: {
                    type: "Text",
                    name: $.s("Путь до изображений"),
                    help: $.s("Напишите название созданной папки с изображениями."),
                    vital: true,
                    validate : {
                        required : true,
                    }
                },
                animFrame_interval: {
                    type : "Num",
                    name : $.s("Скорость смены кадров"),
                    help: $.s("Скорость смены кадров в миллисекундах."),
                    spinner: {
                        min: 0,
                        max: 100000,
                        step: 100
                    },
                    default_val : "1000"
                },
                animFrame_loop: {
                    type : "Check",
                    name: $.s("Повтор анимации"),
                    text : $.s("Зациклить анимацию?"),
                    default_val : true
                },
                animFrame_size: {
                    type : "Check",
                    name: $.s("Размер"),
                    text : $.s("На весь экран?"),
                    help: $.s("Если включено отображение на весь экран, то анимация привязывается к фону. Если отключено, то привязывается к интерфейсу. Это нужно чтобы добавить анимацию, например, которая состоит из небольших по размеру изображений. А также для их расположения на экране."),
                    default_val : true
                },
                _bound_select: {
                    type: "BoundSelectPlugin",
                    bound_type: "plugin",
                    name: $.s("Положение"),
                    help: $.s("Используйте для визуального позиционирования элемента на экране. Размер должен быть установлен в положение выключено."),
                    vital: false,
                    default_val: "",

                    drag_obj: function (pm) {
                        const path = require('path');
                        let baseDirPath = app.getProjectPath() + 'data/bgimage/animationFrame/' + pm.animFrame_url;
                        let animFileName = fs.readdirSync(baseDirPath).find(file => file.startsWith('anim_1.'));

                        let dirPath = path.join(baseDirPath, animFileName);
                        const html = `<div><img src="${dirPath}"></div>`;
                        const j_obj = $(html);
                        return j_obj;
                    }
                },
                animFrame_fadeIn: {
                    type : "Num",
                    name : $.s("Время появления"),
                    help: $.s("Время за которое анимация появится. В миллисекундах. Работает только с анимацией на весь экран!"),
                    spinner: {
                        min: 0,
                        max: 100000,
                        step: 100
                    },
                    default_val : "1000"
                },
            }
        },
        "animFrameClose": {
            name: $.s("Скрыть покадровую анимацию"),
            component_type: "Simple",
            default_view: {
                icon: "fa-sharp fa-regular fa-gif",
                category: "image",
            },
            param_view: {},
            param: {
                animFrameClose_id: {
                    type : "Num",
                    name : $.s("ID Анимации"),
                    spinner: {
                        min: 0,
                        max: 1000,
                        step: 1
                    },
                    default_val : ""
                },
                animFrameClose_fadeOut: {
                    type : "Num",
                    name : $.s("Время исчезновения"),
                    help: $.s("Время за которое анимация исчезнет. В миллисекундах. Работает только с анимацией на весь экран!"),
                    spinner: {
                        min: 0,
                        max: 100000,
                        step: 100
                    },
                    default_val : "1000"
                },
            }
        },

        "overlayEffects": {
            name: $.s("Эффекты перекрытия"),
            component_type: "Simple",
            default_view: {
                base_img_url: "data/",
                base_movie_url: "data/",
                icon: "fa-sharp fa-solid fa-diagram-venn",
                category: "shaders",
            },
            param_view: {},
            param: {
                typeEffect: {
                    type: "Select",
                    name: $.s("Тип эффекта"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Картинка"),
                            val : "img"
                        },
                        {
                            name : $.s("Видео"),
                            val : "video"
                        }
                    ],
                    default_val : "img",
                },
                animEffects: {
                    type: "Check",
                    name: $.s("Эффект анимации"),
                    text: $.s("Применить эффект?"),
                    help: $.s("Картинка или видео будет появляться с эффектом анимации."),
                    default_val : true,
                },
                animEffectsSpeed: {
                    type : "Num",
                    name : $.s("Скорость появления"),
                    help: $.s("Скорость, за которую картинка полностью появится на экране."),
                    spinner: {
                        min: 0.001,
                        max: 0.01,
                        step: 0.001
                    },
                    default_val : "0.001"
                },
                typeMixings: {
                    type: "Select",
                    name: $.s("Тип смешивания"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Screen"),
                            val : "screen"
                        },
                        {
                            name : $.s("Color"),
                            val : "color"
                        },
                        {
                            name : $.s("Color burn"),
                            val : "color-burn"
                        },
                        {
                            name : $.s("Color dodge"),
                            val : "color-dodge"
                        },
                        {
                            name : $.s("Darken"),
                            val : "darken"
                        },
                        {
                            name : $.s("Difference"),
                            val : "difference"
                        },
                        {
                            name : $.s("Exclusion"),
                            val : "exclusion"
                        },
                        {
                            name : $.s("Hard light"),
                            val : "hard-light"
                        },
                        {
                            name : $.s("Hue"),
                            val : "hue"
                        },
                        {
                            name : $.s("Inherit"),
                            val : "inherit"
                        },
                        {
                            name : $.s("Lighten"),
                            val : "lighten"
                        },
                        {
                            name : $.s("Luminosity"),
                            val : "luminosity"
                        },
                        {
                            name : $.s("Multiply"),
                            val : "multiply"
                        },
                        {
                            name : $.s("Normal"),
                            val : "normal"
                        },
                        {
                            name : $.s("Overlay"),
                            val : "overlay"
                        },
                        {
                            name : $.s("Saturation"),
                            val : "saturation"
                        },
                        {
                            name : $.s("Soft light"),
                            val : "soft-light"
                        }
                    ],
                    default_val : "screen",
                },
                imgTexture: {
                    type : "ImageSelect",
                    file_path : "others/effects/",
                    name : $.s("Текстура изображения"),
                    default_val : "",
                    line_preview: "on",
                    validate : {
                        required : true
                    }
                },
                videoTexture: {
                    type : "MovieSelect",
                    file_path : "others/effects/",
                    name : $.s("Видео текстура"),
                    default_val : "",
                    line_preview: "on",
                    validate : {
                        required : true
                    }
                },
                loopVideo: {
                    type: "Check",
                    name: $.s("Повтор видео"),
                    text: $.s("Зациклить видео эффект?"),
                    default_val : true,
                },
            }
        },

        overlayEffectsHide: {
            name: $.s("Скрыть эффект перекрытия"),
            component_type: "Simple",
            default_view: {
                icon: "fa-sharp fa-thin fa-diagram-venn",
                category: "shaders",
            },
            param_view: {},
            param: {}
        },

        particlesEffectsImg: {
            name: $.s("Частицы (I)"),
            component_type: "Simple",
            default_view: {
                base_img_url: "data/",
                icon: "fa-sharp fa-solid fa-sprinkler-ceiling",
                category: "shaders",
            },
            param_view: {},
            param: {
                imgTexture: {
                    type : "ImageSelect",
                    file_path : "image/particles/",
                    name : $.s("Текстура изображения"),
                    vital : true,
                    default_val : "",
                    line_preview: "on",
                    validate : {
                        required : true
                    }
                },
                valueParticles: {
                    type : "Num",
                    name : $.s("Количество частиц"),
                    spinner: {
                        min: 1,
                        max: 500,
                        step: 10
                    },
                    default_val : 40
                },
                downSpeed: {
                    type : "Num",
                    name : $.s("Скорость падения частиц"),
                    spinner: {
                        min: 1,
                        max: 10,
                        step: 1
                    },
                    default_val : 2
                },
                imgSize: {
                    type : "Num",
                    name : $.s("Размер картинки"),
                    spinner: {
                        min: 1,
                        max: 200,
                        step: 10
                    },
                    default_val : 20
                },
                direction: {
                    type: "Select",
                    name: $.s("Направление падения"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Вверх"),
                            val : "top"
                        },
                        {
                            name : $.s("Вниз"),
                            val : "bottom"
                        },
                        {
                            name : $.s("Влево"),
                            val : "left"
                        },
                        {
                            name : $.s("Вправо"),
                            val : "right"
                        }
                    ],
                    default_val : "bottom",
                },
            }
        },

        particlesEffectsImgHide: {
            name: $.s("Скрыть частицы (I)"),
            component_type: "Simple",
            default_view: {
                icon: "fa-sharp fa-thin fa-sprinkler-ceiling",
                category: "shaders",
            },
            param_view: {},
            param: {}
        },

        particlesEffects: {
            name: $.s("Частицы"),
            component_type: "Simple",
            default_view: {
                base_img_url: "data/",
                icon: "fa-sharp fa-solid fa-sprinkler-ceiling",
                category: "shaders",
            },
            param_view: {},
            param: {
                particlesType: {
                    type: "Select",
                    name: $.s("Имитация"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Снег"),
                            val : "snowConfig"
                        },
                        {
                            name : $.s("Пыль"),
                            val : "dustConfig"
                        }
                    ],
                    default_val : "dustConfig",
                },
                valueParticles: {
                    type : "Num",
                    name : $.s("Количество частиц"),
                    spinner: {
                        min: 1,
                        max: 500,
                        step: 10
                    },
                    default_val : 300
                },
                downSpeed: {
                    type : "Num",
                    name : $.s("Скорость падения частиц"),
                    spinner: {
                        min: 1,
                        max: 10,
                        step: 1
                    },
                    default_val : 2
                },
                particlesSize: {
                    type : "Num",
                    name : $.s("Размер частиц"),
                    spinner: {
                        min: 1,
                        max: 200,
                        step: 5
                    },
                    default_val : 5
                },
                direction: {
                    type: "Select",
                    name: $.s("Направление падения"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Вверх"),
                            val : "top"
                        },
                        {
                            name : $.s("Вниз"),
                            val : "bottom"
                        },
                        {
                            name : $.s("Влево"),
                            val : "left"
                        },
                        {
                            name : $.s("Вправо"),
                            val : "right"
                        }
                    ],
                    default_val : "bottom",
                },
            }
        },

        particlesEffectsHide: {
            name: $.s("Скрыть частицы"),
            component_type: "Simple",
            default_view: {
                icon: "fa-sharp fa-thin fa-sprinkler-ceiling",
                category: "shaders",
            },
            param_view: {},
            param: {}
        },

        // Next Chat
        nextChatConfig: {
            name: $.s("Чат"),
            component_type: "Simple",
            default_view: {base_img_url: "data/image/", base_sound_url: "data/sound/", icon: "fa-sharp fa-solid fa-comment-smile", category: "nextChat"},
            param_view: {image_url: "nextChat_BG", time: "time", method: "method"},
            param: {
                nextChatWidth: {
                    type: "Text",
                    name: $.s("Ширина области чата"),
                    unit: "px",
                    default_val: "400"
                },
                nextChatHeight: {
                    type: "Text",
                    name: $.s("Высота области чата"),
                    unit: "px",
                    default_val: "600"
                },
                nextChatInnerWidth: {
                    type: "Text",
                    name: $.s("Внутренняя ширина чата"),
                    unit: "px",
                    default_val: "400"
                },
                nextChatInnerHeight: {
                    type: "Text",
                    name: $.s("Внутренняя высота чата"),
                    unit: "px",
                    default_val: "600"
                },
                nextChatInnerPosTop: {
                    type : "Num",
                    name : $.s("Позиция внутренней области по Y"),
                    help: $.s("Определяет, позицию внутреннего элемента чата по Y координате."),
                    spinner: {
                        min: -10000,
                        max: 10000,
                        step: 10
                    },
                    default_val : 0
                },
                nextChatInnerPosLeft: {
                    type : "Num",
                    name : $.s("Позиция внутренней области по X"),
                    help: $.s("Определяет, позицию внутреннего элемента чата по X координате."),
                    spinner: {
                        min: -10000,
                        max: 10000,
                        step: 10
                    },
                    default_val : 0
                },
                nextChat_BG: {
                    type: "ImageSelect",
                    file_path: "image/",
                    name: $.s("Изображение фона"),
                    help: $.s("Будет использовано выбранное фоновое изображение."),
                    vital: true,
                    default_val: "",
                    line_preview: "on",
                    validate: {
                        required: false
                    }
                },
                _bound_select: {
                    type: "BoundSelectPlugin",
                    bound_type: "image",
                    name: $.s("Положение изображения"),
                    help: $.s("Используйте для визуального позиционирования и изменения размера элемента на экране."),
                    vital: false,
                    default_val: "",

                    drag_obj: function (pm) {

                        var html = '<div class=""></div>';

                        const patch = app.getProjectPath();

                        var j_obj = $(html);

                        j_obj.css({
                            height: pm.nextChatHeight,
                            width: pm.nextChatWidth,
                            resize: "none",
                            border: "1px solid #c27e48",
                            backgroundImage: 'url(' + patch + 'data/image/' + pm.nextChat_BG + ')'
                        })

                        return j_obj
                    },
                },
                nextChat_BG2: {
                    type: "ImageSelect",
                    file_path: "image/",
                    name: $.s("Изображение перекрытия"),
                    help: $.s("Будет использовано выбранное фоновое изображение."),
                    vital: true,
                    default_val: "",
                    line_preview: "on",
                    validate: {
                        required: false
                    }
                },
                nextChatBG2Blend: {
                    type: "Select",
                    name: $.s("Тип смешивания"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Нормальное"),
                            val : "normal"
                        },
                        {
                            name : $.s("Умножение"),
                            val : "multiply"
                        },
                        {
                            name : $.s("Экран"),
                            val : "screen"
                        },
                        {
                            name : $.s("Оверлей"),
                            val : "overlay"
                        },
                        {
                            name : $.s("Светлее"),
                            val : "lighten"
                        },
                        {
                            name : $.s("Разница"),
                            val : "difference"
                        },
                        {
                            name : $.s("Исключение"),
                            val : "exclusion"
                        },
                        {
                            name : $.s("Цветовой тон"),
                            val : "hue"
                        },
                        {
                            name : $.s("Насыщенность"),
                            val : "saturation"
                        },
                        {
                            name : $.s("Цвет"),
                            val : "color"
                        },
                        {
                            name : $.s("Яркость"),
                            val : "luminosity"
                        },

                    ],
                    default_val : "normal",
                },
                nextChatBG2Opacity: {
                    type : "Num",
                    name : $.s("Прозрачность перекрытия"),
                    help: $.s("Определяет, насколько прозрачным будет изображение перекрытия"),
                    spinner: {
                        min: 0,
                        max: 1,
                        step: 0.1
                    },
                    default_val : "1"
                },
                nextChatZIndex: {
                    type : "Num",
                    name : $.s("Высота перекрытия"),
                    help: $.s("Определяет, насколько выше изображение перекрытия будет поверх фона и элементов чата."),
                    spinner: {
                        min: -100,
                        max: 100,
                        step: 5
                    },
                    default_val : "2"
                },
                nextChatPrelImage: {
                    type: "Select",
                    name: $.s("Тип прелоадера сообщений"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Спиннер"),
                            val : "spinner"
                        },
                        {
                            name : $.s("Появляющиеся точки"),
                            val : "dots"
                        },
                        {
                            name : $.s("Радиальная анимация"),
                            val : "radial"
                        },
                        {
                            name : $.s("Спиральная анимация"),
                            val : "spiral"
                        },
                    ],
                    default_val : "spinner",
                },
                nextChatNameColor: {
                    type: "Color",
                    name: $.s("Цвет имени"),
                    default_val: "0x000000",
                    validate: {
                        required: false
                    }
                },
                nextChatTextColor: {
                    type: "Color",
                    name: $.s("Цвет текста"),
                    default_val: "0x000000",
                    validate: {
                        required: false
                    }
                },
                nextChatNameSize: {
                    type: "Num",
                    name: $.s("Размер шрифта имени"),
                    unit: "px",
                    default_val: "20",
                    validate: {
                        required: true
                    }
                },
                nextChatTextSize: {
                    type: "Num",
                    name: $.s("Размер шрифта текста"),
                    unit: "px",
                    default_val: "20",
                    validate: {
                        required: true
                    }
                },
                nextChatFontName: {
                    type: "Select",
                    name: $.s("Выбор шрифта имени"), help: "", select_list: _font_face_list},
                nextChatFontText: {
                    type: "Select",
                    name: $.s("Выбор шрифта текста"), help: "", select_list: _font_face_list},
                nextChatBGType: {
                    type: "Check",
                    name: $.s("Тип фона сообщений"),
                    text: $.s("Тип фона сообщений"),
                    help: $.s("Фон может быть либо картинкой, либо цветом. По умолчанию стоит цветом."),
                    default_val: false,
                },
                nextChatLeftColor: {
                    type: "Color",
                    name: $.s("Цвет фона сообщения слева"),
                    default_val: "0xFFFFFF",
                    validate: {
                        required: false
                    }
                },
                nextChatBGLeft: {
                    type: "ImageSelect",
                    file_path: "image/",
                    name: $.s("Изображение фона сообщения слева"),
                    help: $.s("Будет использовано выбранное фоновое изображение."),
                    vital: true,
                    default_val: "",
                    line_preview: "on",
                    validate: {
                        required: false
                    }
                },
                nextChatRightColor: {
                    type: "Color",
                    name: $.s("Цвет фона сообщения справа"),
                    default_val: "0xCCCCCC",
                    validate: {
                        required: false
                    }
                },
                nextChatBGRight: {
                    type: "ImageSelect",
                    file_path: "image/",
                    name: $.s("Изображение фона сообщения справа"),
                    help: $.s("Будет использовано выбранное фоновое изображение."),
                    vital: true,
                    default_val: "",
                    line_preview: "on",
                    validate: {
                        required: false
                    }
                },
                nextChatCenterColor: {
                    type: "Color",
                    name: $.s("Цвет фона сообщения по центру"),
                    default_val: "0x25619A",
                    validate: {
                        required: false
                    }
                },
                nextChatBGCenter: {
                    type: "ImageSelect",
                    file_path: "image/",
                    name: $.s("Изображение фона сообщения по центру"),
                    help: $.s("Будет использовано выбранное фоновое изображение."),
                    vital: true,
                    default_val: "",
                    line_preview: "on",
                    validate: {
                        required: false
                    }
                },
                nextChatPlaySe: {
                    type: "SoundSelect",
                    file_path: "sound/",
                    name: $.s("Звуковой эффект появления сообщения"), vital: !0, default_val: ""},
                nextChatGlobalWaitMessage: {
                    type: "Num",
                    name: $.s("Общее время появления сообщений"),
                    help: $.s("Время за которое появляется сообщение если отключено Ожидание клика."),
                    unit: "ms",
                    default_val: "500",
                    validate: {
                        required: true
                    }
                },
                chatAvatarSize: {
                    type: "Num",
                    name: $.s("Размер аватара"),
                    unit: "px",
                    default_val: "50",
                    spinner: {
                        min: 10,
                        max: 150,
                        step: 10
                    },
                },
                zIndexChat: {
                    type: "Num",
                    name: $.s("Порядок положения чата"),
                    help: $.s("Определяет высоту чата относительно других элементов на сцене."),
                    default_val: "10000",
                    spinner: {
                        min: 10,
                        max: 20000,
                        step: 100
                    },
                },
            },
        },
        nextChatMessage: {
            name: function (e) {
                if (e.data.pm.nextChatWaitClick === true) {
                    return $.s("Сообщение чата") + " " + '◆';
                }
                return $.s("Сообщение чата")
            },
            header: function (e) {
                const text = e.data.pm.nextChatText;
                if (text === undefined) {
                    return " "
                } else {
                    return text.replace(/&nbsp;/g, " ")
                }
            },
            component_type: "Simple",
            default_view: {base_img_url: "data/", base_movie_url: "data/video/", base_sound_url: "data/", icon: "fa-sharp fa-solid fa-comment-lines", category: "nextChat"},
            param_view: {image_url: "nextChat_BG", time: "time", method: "method"},
            param: {
                nextChatNameChar: {
                    type: "Select",
                    help: $.s("Выберите персонажа, имя которого будет отображаться с сообщением."),
                    select_list: function (e) {
                        var a = app.config.project_config.map_chara, t = [];
                        t.push({name: "-", val: ""});
                        var n = 0;
                        for (key in a) if (n++, t.push({name: key, val: key}), "trial" == global_build && n >= 3) break;
                        return t
                    },
                    default_val: function () {},
                    name: $.s("Список персонажей")
                },
                nextChatNameCharImg: {
                    type: "ImageSelect",
                    file_path: function (e) {
                        return "fgimage/chara/" + app.config.project_config.map_chara[e.data.pm.nextChatNameChar] + "/"
                    },
                    folder_select: "none",
                    window_title: $.s("Выбор персонажа"),
                    name: $.s("Изображение"),
                    vital: !0,
                    default_val: ""
                },
                nextChatText: {
                    type: "Text",
                    name: $.s("Текст сообщения"),
                    unit: "px",
                    default_val: ""
                },
                nextChatAudio: {
                    type: "SoundSelect", file_path: "/bgm/",
                    name: $.s("Выбор музыки"), vital: !0, default_val: ""},
                nextChatVideo: {
                    type : "MovieSelect",
                    file_path: "video/",
                    name : $.s("Видео в чате"),
                    help : $.s("Видео, которое игрок отправляет в чат."),
                    vital : true,
                    default_val : "",
                    validate : {
                        required : true
                    }
                },
                nextChatVideoControl: {
                    type : "Check",
                    name: $.s("Элементы управления виде"),
                    text : $.s("Включить элементы управления у видео?"),
                    help: $.s("Если активировать данное условие, то у видео будет полоска управления и кнопки."),
                    default_val : false
                },
                nextChatVideoRepeat: {
                    type : "Check",
                    name: $.s("Зациклить видео"),
                    text : $.s("Зациклить видео?"),
                    help: $.s("Если активировать данное условие, то видео будет повторяться бесконечно."),
                    default_val : false
                },
                nextChatGraphic: {
                    type : "ImageSelect",
                    file_path : "fgimage/",
                    name : $.s("Изображение в чате"),
                    help : $.s("Изображение, которое игрок отправляет в чат."),
                    vital : true,
                    default_val : "",
                    line_preview: "on",
                    validate : {
                        required : true
                    }
                },
                nextChatPos: {
                    type: "Select",
                    name: $.s("Позиция"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Слева"),
                            val : "left"
                        },
                        {
                            name : $.s("Справа"),
                            val : "right"
                        },
                        {
                            name : $.s("Середина"),
                            val : "center"
                        },
                    ],
                    default_val : "center",
                },
                nextChatWait: {
                    type : "Num",
                    name : $.s("Время появления сообщения"),
                    help: $.s("Определяет, насколько быстро сообщение появится в чате."),
                    unit: "ms",
                    spinner: {
                        min: 0,
                        max: 10000,
                        step: 100
                    },
                    default_val : "0"
                },
                nextChatWaitClick: {
                    type : "Check",
                    name: $.s("Ожидание клика"),
                    text : $.s("Ждать клика прежде чем продолжить?"),
                    help: $.s("Если активировать данное условие, то игра будет ждать клика от игрока прежде чем продолжить."),
                    default_val : false
                },
            }
        },
        nextChatHide: {
            name: function (e) {
                const hide = $.s("Скрыть чат")
                const show = $.s("Показать чат")
                if (e.data.pm.chat_hide_show === "hide") {
                    return hide;
                } else {
                    return show;
                }
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-thin fa-comment", icon_color: "#f69696", category: "nextChat"},
            param_view: {},
            param: {
                chat_hide_show: {
                    type: "Select",
                    name: $.s("Отображение"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Скрыть"),
                            val : "hide"
                        },
                        {
                            name : $.s("Показать"),
                            val : "show"
                        },
                    ],
                    default_val : "hide",
                }
            }
        },
        nextChatButton: {
            name: function (e) {
                return $.s("Кнопка в чате");
            },
            component_type: "Simple",
            default_view: {base_img_url: "data/", icon: "fa-sharp fa-solid fa-square-check", icon_color: "#f69696", category: "nextChat"},
            param_view: {},
            param: {
                nextChatButtonType: {
                    type: "Select",
                    name: $.s("Тип кнопки"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Стандартная"),
                            val : "default"
                        },
                        {
                            name : $.s("Изображение"),
                            val : "image"
                        },
                    ],
                    default_val : "default",
                },
                nextChatButtonDefaultStyle: {
                    type: "Select",
                    name: $.s("Дизайн кнопки"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Королевский синий"),
                            val : "royalBlueButton"
                        },
                        {
                            name : $.s("Кнопка с эффектом свечения"),
                            val : "glowOnHoverButton"
                        },
                        {
                            name : $.s("Тонкая"),
                            val : "btn-three"
                        },
                        {
                            name : $.s("Кнопка с кольцевым индикатором"),
                            val : "button_anim"
                        },
                    ],
                    default_val : "royalBlueButton",
                },
                nextChatButtonText: {
                    type: "Text",
                    name: $.s("Текст кнопки"),
                    unit: "px",
                    default_val: ""
                },
                graphic: {type: "ImageSelect", file_path: "image/", name: $.s("Фон кнопки чата"), vital: !0, default_val: ""},
                graphicH: {type: "ImageSelect", file_path: "image/", name: $.s("Ховер кнопки чата"), vital: !0, default_val: ""},
                storage: _pm_type.storage,
                target: _pm_type.target,
                widthButton: {type: "Num", name: $.s("Ширина"), unit: $.s("px"), validate: {number: !0}},
                heightButton: {type: "Num", name: $.s("Высота"), unit: $.s("px"), validate: {number: !0}},
                nextChatButtonBorderRadius: {
                    type : "Num",
                    name : $.s("Скругление углов кнопки"),
                    unit: "px",
                    spinner: {
                        min: 0,
                        max: 100,
                        step: 1
                    },
                    default_val : "5"
                },
                nextChatButtonAnimation: {
                    type: "Select",
                    name: $.s("Анимация появления кнопки"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("Bounce"),
                            val : "animate__bounce"
                        },
                        {
                            name : $.s("Flash"),
                            val : "animate__flash"
                        },
                        {
                            name : $.s("Pulse"),
                            val : "animate__pulse"
                        },
                        {
                            name : $.s("Head Shake"),
                            val : "animate__headShake"
                        },
                        {
                            name : $.s("Back In Up"),
                            val : "animate__backInUp"
                        },
                        {
                            name : $.s("Back In Left"),
                            val : "animate__backInLeft"
                        },
                        {
                            name : $.s("Back In Right"),
                            val : "animate__backInRight"
                        },
                        {
                            name : $.s("Fade In Up"),
                            val : "animate__fadeInUp"
                        },
                        {
                            name : $.s("Fade In"),
                            val : "animate__fadeIn"
                        },
                        {
                            name : $.s("Jack In The Box"),
                            val : "animate__jackInTheBox"
                        },
                        {
                            name : $.s("Zoom In"),
                            val : "animate__zoomIn"
                        },
                        {
                            name : $.s("Slide In Up"),
                            val : "animate__slideInUp"
                        },
                    ],
                    default_val : "animate__fadeIn",
                },
                nextChatButtonDisable: {
                    type : "Check",
                    name: $.s("Отключить кнопку"),
                    text : $.s("Отключить кнопку после нажатия?"),
                    help: $.s("После нажатия не дает снова нажать на кнопку."),
                    default_val : false
                },

                nextChatButtonHide: {
                    type : "Check",
                    name: $.s("Скрыть кнопку"),
                    text : $.s("Скрыть кнопку после нажатия?"),
                    default_val : false
                },
                nextChatButtonHideAll: {
                    type : "Check",
                    name: $.s("Скрыть все кнопки"),
                    text : $.s("Скрыть все кнопки после нажатия?"),
                    default_val : false
                },
            }
        },
        nextChatClearMessage: {
            name: function (e) {
                return $.s("Очистка чата");
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-eraser", icon_color: "#f69696", category: "nextChat"},
            param_view: {},
            param: {}
        },

        timeSetting: {
            name: function (e) {
                return $.s("Инициализация времени");
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-light fa-hourglass-start", icon_color: "#f69696", category: "uiElements"},
            param_view: {},
            param: {
                time: {
                    type: "Text",
                    name: $.s("Время отсчета"),
                    help: "Укажите время, которое будет стартовым для вашей игры. Например: 06:00",
                    default_val: "06:00"
                },
                timeSpeed: {
                    type : "Num",
                    name : $.s("Секунды в фейковой минуте"),
                    help: "Чем меньше значение, тем быстрее будет идти время. По умолчанию фейковая минута пройдет за пять секунд.",
                    spinner: {
                        min: 0,
                        max: 60,
                        step: 1
                    },
                    default_val : "5"
                },
                year: {
                    type: "Text",
                    name: $.s("Год отсчета"),
                    help: "Укажите год, который будет стартовый, и с него начнется отсчет.",
                    default_val: "2024"
                },
                month: {
                    type : "Num",
                    name : $.s("Месяц отсчета"),
                    help: "Укажите месяц, который будет стартовым, и с него начнется отсчет.",
                    spinner: {
                        min: 0,
                        max: 12,
                        step: 1
                    },
                    default_val : "0"
                },
                day: {
                    type : "Num",
                    name : $.s("День отсчета"),
                    help: "Укажите день месяца, который будет стартовым, и с него начнется отсчет. (Во всех игровых месяцах 30 дней)",
                    spinner: {
                        min: 0,
                        max: 6,
                        step: 1
                    },
                    default_val : "0"
                },
                realTime: {
                    type : "Check",
                    name: $.s("Реалтайм время"),
                    text : $.s("Включить реалтайм время?"),
                    help: $.s('Это означает что время будет идти само, а не по каким-то событиями (например переход между локациями).'),
                    default_val : false
                },
            }
        },
        timeStart: {
            name: function (e) {
                return $.s("Запуск времени");
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-hourglass-start", icon_color: "#f69696", category: "uiElements"},
            param_view: {},
            param: {}
        },
        timeEdit: {
            name: function (e) {
                return $.s("Редактор времени");
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-hourglass-start", icon_color: "#f69696", category: "uiElements"},
            param_view: {},
            param: {
                hour: {
                    type: "Num",
                    name: $.s("Час"),
                    help: "Часы, тут укажите сколько прибавить к текущему времени.",
                    spinner: {
                        min: 0,
                        max: 23,
                        step: 1
                    },
                    default_val : "0"
                },
                minutes: {
                    type: "Num",
                    name: $.s("Минуты"),
                    help: "Минуты, тут укажите сколько прибавить к текущему времени.",
                    spinner: {
                        min: 0,
                        max: 59,
                        step: 1
                    },
                    default_val : "0"
                },

            }
        },

        html: {
            name: function (e) {
                return $.s("Отображение HTML");
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-file-code", icon_color: "#f69696", category: "eval"},
            param_view: {},
            param: {
                top: {
                    type: "Num",
                    name: $.s("Вверх"),
                    help: "Часы, тут укажите сколько прибавить к текущему времени.",
                    spinner: {
                        min: -1000,
                        max: 10000,
                        step: 100
                    },
                    default_val : 0
                },
                left: {
                    type: "Num",
                    name: $.s("Влево"),
                    help: "Часы, тут укажите сколько прибавить к текущему времени.",
                    spinner: {
                        min: -1000,
                        max: 10000,
                        step: 100
                    },
                    default_val : 0
                },
            }
        },
        endhtml: {
            name: function (e) {
                return $.s("Закрытие HTML");
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-solid fa-file-code", icon_color: "#f69696", category: "eval"},
            param_view: {},
            param: {}
        },
        setFullScreenEnter: {
            name: function (e) {
                return $.s("На весь экран");
            },
            component_type: "Simple",
            default_view: {icon: "fa-sharp fa-regular fa-expand", icon_color: "#f69696", category: "eval"},
            param_view: {},
            param: {}
        },
        inventorySystem: {
            name: function (e) {
                return $.s("Инициализация инвентаря");
            },
            component_type: "Simple",
            default_view: {base_img_url: "data/", icon: "fa-sharp fa-solid fa-shelves", icon_color: "#f69696", category: "inventorySystemUI"},
            param_view: {},
            param: {
                direction: {
                    type: "Select",
                    name: $.s("Направление"),
                    vital: true,
                    select_list : [
                        {
                            name : $.s("row"),
                            val : "row"
                        },
                        {
                            name : $.s("column"),
                            val : "column"
                        },
                    ],
                    default_val : "row",
                },
                _bound_select: {
                    type: "BoundSelectPlugin",
                    bound_type: "plugin",
                    name: $.s("Положение"),
                    help: $.s("Используйте для визуального позиционирования элемента на экране. Размер должен быть установлен в положение выключено."),
                    vital: false,
                    default_val: "",

                    drag_obj: function (pm) {
                        const html = `<div style="width: 333px; height: 70px;background: rgba(10,83,190,0.63); display: flex; flex-direction: ${pm.direction}">Inventory</div>`;
                        return $(html);
                    }
                },
                settingElement: {
                    type: "Select",
                    name: $.s("Настройки для"),
                    vital: true,
                    select_list: [
                        {
                            name: $.s("Малого инвентаря"),
                            val: "small"
                        },
                        {
                            name: $.s("Большого инвентаря"),
                            val: "big"
                        },
                    ],
                    default_val: "",
                },
                graphicBGSmall: {type: "ImageSelect", file_path: "inventory/", name: $.s("Фон S"), vital: !0, default_val: ""},
                graphicCellSmall: {type: "ImageSelect", file_path: "inventory/", name: $.s("Ячейка S"), vital: !0, default_val: ""},
                graphicBGBig: {type: "ImageSelect", file_path: "inventory/", name: $.s("Фон B"), vital: !0, default_val: ""},
                graphicCellBig: {type: "ImageSelect", file_path: "inventory/", name: $.s("Ячейка B"), vital: !0, default_val: ""},
                graphicCloseCellBig: {type: "ImageSelect", file_path: "inventory/", name: $.s("Кнопка закрытия B"), vital: !0, default_val: ""},
                cellCount: {
                    type: "Num",
                    name: $.s("Количество ячеек"),
                    help: $.s("Количество ячеек в большом инвентаре."),
                    spinner: {
                        min: 1,
                        max: 50,
                        step: 5
                    },
                    default_val : 20
                },
                columnCount: {
                    type: "Num",
                    name: $.s("Количество колонок"),
                    help: $.s("Количество колонок в большом инвентаре."),
                    spinner: {
                        min: 1,
                        max: 12,
                        step: 1
                    },
                    default_val : 6
                },
            }
        },
        inventorySystemTriggerZone: {
            name: function (e) {
                return $.s("Взаимодействие")
            },
            header: function (e) {
                return e.data.pm.storage || (e.data.pm.storage = ""), e.data.pm.target || (e.data.pm.target = ""), e.data.pm.storage + " " + e.data.pm.target
            },
            component_type: "Simple",
            default_view: {base_img_url: "data/fgimage", icon: "fa-sharp fa-light fa-arrow-right-to-bracket", category: "inventorySystemUI"},
            param_view: {image_url: "storage", width: "width", height: "height", x: "x", y: "y", _clickable_img: ""},
            param: {
                storage: _pm_type.storage,
                target: _pm_type.target,
                _clickable_img: {
                    type: "BoundSelect",
                    bound_type: "clickable",
                    file_path: "bgimage/",
                    name: $.s("Положение области"),
                    vital: !1,
                    default_val: ""
                },
                type: {
                    type: "Text",
                    name: $.s("Тип объекта"),
                    help: $.s("Тип объекта определяет, с каким типом предмета взаимодействует область. Этот тип должен совпадать с типом предмета. Например: Ключ = Ключ."),
                },
                targetItem: {
                    type: "Text",
                    name: $.s("Предмет взаимодействия"),
                    help: $.s("Определяет объект, с которым будет взаимодействовать данный предмет."),
                },
                x: {
                    type: "Num",
                    name: $.s("Горизонтальное положение (Х)"),
                    unit: $.s("px"),
                    validate: {number: !0},
                    default_val: "100"
                },
                y: {
                    type: "Num",
                    name: $.s("Вертикальное положение (Y)"),
                    unit: "px",
                    validate: {number: !0},
                    default_val: "100"
                },
                width: {
                    type: "Num",
                    name: $.s("Ширина"),
                    unit: $.s("px"),
                    validate: {number: !0},
                    default_val: "100"
                },
                height: {
                    type: "Num",
                    name: $.s("Высота"),
                    unit: $.s("px"),
                    validate: {number: !0},
                    default_val: "100"
                }
            }
        },
        inventorySystemAddItem: {
            name: function (e) {
                return $.s("Добавить предмет")
            },
            component_type: "Simple",
            default_view: {base_img_url: "data/fgimage", icon: "fa-sharp fa-regular fa-cart-plus", category: "inventorySystemUI"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название предмета"),
                    help: $.s("Укажите название предмета который должен быть добавлен в инвентарь."),
                },
            }
        },
        inventorySystemSetAmount: {
            name: function (e) {
                return $.s("Количество")
            },
            component_type: "Simple",
            default_view: {base_img_url: "data/fgimage", icon: "fa-sharp fa-solid fa-arrow-up-wide-short", category: "inventorySystemUI"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название предмета"),
                    help: $.s("Укажите, количество какого предмета необходимо увеличить."),
                },
                value: {
                    type: "Num",
                    name: $.s("Количество"),
                    validate: {number: !0},
                    default_val: "1"
                }
            }
        },


        imageMap: {
            name: function (e) {
                return $.s("ImageMap")
            },
            component_type: "Simple",
            default_view: {base_img_url: "data/", icon: "fa-sharp fa-solid fa-send-back", category: "uiElements"},
            param_view: {},
            param: {
                name: {
                    type: "Text",
                    name: $.s("Название карты"),
                    help: $.s("Название карты должно совпадать с названием карты в редакторе."),
                },
                image: {
                    type : "ImageSelect",
                    file_path : "bgimage/imageMap/",
                    name : $.s("Изображение фона карты"),
                    vital : true,
                    default_val : "",
                    line_preview: "on",
                    validate : {
                        required : true
                    }
                },
                imageHover: {
                    type : "ImageSelect",
                    file_path : "bgimage/imageMap/",
                    name : $.s("Изображение перекрытия карты"),
                    vital : true,
                    default_val : "",
                    line_preview: "on",
                    validate : {
                        required : true
                    }
                },
            }
        },
    };

_map_component.call = {
    name: $.s("Вызов"),
    header: function (e) {
        return e.data.pm.storage || (e.data.pm.storage = ""), e.data.pm.target || (e.data.pm.target = ""), e.data.pm.storage + " " + e.data.pm.target
    },
    component_type: "Simple",
    default_view: {icon: "fa-sharp fa-solid fa-arrow-right", icon_color: "#f69696", category: "scenario"},
    param_view: {storage: "storage", target: "target"},
    param: {
        storage: _pm_type.storage,
        target: _pm_type.target,
        cond: {
            type: "Cond",
            name: $.s("Условие перехода"),
            help: $.s("Если вы хотите прикрепить условие к переходу, задайте здесь нужное условное для выполнения. Переход срабатывает только в том случае, если условие истинно.")
        }
    }
}, _map_component.return = {
    name: $.s("Возвращение"),
    component_type: "Simple",
    default_view: {icon: "fa-sharp fa-solid fa-arrow-left", icon_color: "#f69696", category: "scenario"},
    param_view: {},
    param: {}
}, _map_component.fadeinbgm = _map_component.playbgm;