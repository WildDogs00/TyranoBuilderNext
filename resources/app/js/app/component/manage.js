var _component_manage = {
    fav: {id: "fav", name: "Избранное", components: {}},
    scenario: {
        id: "scenario",
        name: "История",
        components: {
            tb_start_text: {pro: 0, default: !0, name: "Текст", help: "Текст, который используется для подачи сюжета.", icon: "fa-sharp fa-solid fa-text-size"},
            cm: {
                pro: 0,
                default: !0,
                name: "Обновление сцены",
                help: "Обновление страницы используется для переключения между сценами и для очистки некоторых элементов сцены.",
                icon: "fa-sharp fa-solid fa-rotate-right"
            },
            glink: {pro: 0, default: !0, name: "Кнопка развилки", help: "Кнопка развилки. Нужна для более простого создания разветвления сюжета.", icon: "fa-sharp fa-solid fa-arrows-split-up-and-left"},
            label: {pro: 0, default: !0, name: "Метка", help: "Метка используется для разделения сцены на зоны к которым можно перейти с помощью прыжка или кнопки развилки.", icon: "fa-sharp fa-solid fa-location-pin"},
            jump: {pro: 0, default: !0, name: "Переход", help: "Переход используется для прыжка к выбранной метке. Метка может быть как в текущем файле сценария, так и в другом.", icon: "fa-sharp fa-solid fa-arrow-up-from-square"},
            s: {pro: 0, default: !0, name: "Стоп", help: "Полностью останавливает игру.", icon: "fa-sharp fa-solid fa-circle-stop"},
            call: {
                pro: 0,
                default: !1,
                name: "Вызов",
                help: "Вызов используется также, как и Переход, за одним только исключением. К точке использования Вызова можно вернуться, используя Возвращение.",
                icon: "fa-sharp fa-solid fa-arrow-right"
            },
            return: {
                pro: 0,
                default: !1,
                name: "Возвращение",
                help: "Используется чтобы вернуться к расположению Вызова.",
                icon: "fa-sharp fa-solid fa-arrow-left"
            }
        }
    },
    effect: {
        id: "effect",
        name: "Управление текстом",
        components: {
            tb_show_message_window: {
                pro: 0,
                default: !0,
                name: "Показать текстовое поле",
                help: "Показывает текстовое окно. Используется над Текстом.",
                icon: "fa-sharp fa-solid fa-message"
            },
            tb_hide_message_window: {
                pro: 0,
                default: !0,
                name: "Скрыть текстовое поле",
                help: "Скрывает текстовое поле. Нужно, например, чтобы показать красоты нарисованного изображения.",
                icon: "fa-sharp fa-solid fa-message-slash"
            },
            hidemessage: {
                pro: 0,
                default: !0,
                name: "Скрыть окно сообщения",
                help: "Скрывает окно сообщения до того момента пока не произойдет клик мыши по экрану.",
                icon: "fa-sharp fa-solid fa-message-xmark"
            },
            delay: {pro: 0, default: !0, name: "Скорость текста", help: "Настраивает скорость с которым будет появляться текст.", icon: "fa-sharp fa-solid fa-gauge-low"},
            font: {
                pro: 0,
                default: !0,
                name: "Изменение шрифта",
                help: "Изменяет шрифт текста. Можно, например изменить шрифт в каком-то отрезке игры.",
                icon: "fa-sharp fa-solid fa-text-height"
            },
            resetfont: {pro: 0, default: !0, name: "Сбросить шрифт", help: "Сбрасывает шрифт на тот, что установлен по умолчанию.", icon: "fa-sharp fa-solid fa-text-slash"},
            tb_fuki_start: {
                pro: 0,
                default: !1,
                name: "Показать речевое облачко",
                help: "Переключает стандартное текстовое поле в форму речевого облачка.",
                icon: "fa-sharp fa-solid fa-thought-bubble"
            },
            tb_fuki_stop: {
                pro: 0,
                default: !1,
                name: "Скрыть речевое облачко",
                help: "Возвращает стандартное текстовое поле.",
                icon: "fa-sharp fa-regular fa-thought-bubble"
            },
        }
    },

    image: {
        id: "image",
        name: "Изображения",
        components: {
            bg: {
                pro: 0,
                default: !0,
                name: "Изображение фона",
                help: "Изменяет фоновое изображение. Используется для смены фона.",
                icon: "fa-sharp fa-regular fa-photo-film"
            },
            tb_image_show: {
                pro: 0,
                default: !0,
                name: "Показать картинку",
                help: "Размещает любое изображение и в любом положении на экране.",
                icon: "fa-sharp fa-solid fa-image"
            },
            imageShowN: {
                pro: 0,
                default: !0,
                name: "Показать картинку (N)",
                help: "Размещает любое изображение и в любом положении на экране.",
                icon: "fa-sharp fa-solid fa-image"
            },
            tb_image_hide: {pro: 0, default: !0, name: "Скрыть картинку", help: "Удаление отображаемого на экране изображения.", icon: "fa-sharp fa-solid fa-image-slash"},
            imageHideN: {pro: 0, default: !0, name: "Скрыть картинку (N)", help: "Удаление отображаемого на экране изображения.", icon: "fa-sharp fa-solid fa-image-slash"},
            clickable: {pro: 0, default: !0, name: "Зона нажатия", help: "Используется для определения на изображении активной зоны. По нажатию на которую можно произвести переход к нужной метке.", icon: "fa-sharp fa-solid fa-grid-horizontal"},
            button: {pro: 0, default: !0, name: "Графическая кнопка", help: "Кнопка в качестве фона которая использует изображение.", icon: "fa-sharp fa-solid fa-hexagon-image"},
            buttonHover: {pro: 0, default: !0, name: "Ховер кнопка", help: "Кнопка в качестве фона которая использует изображение, также тут присутствует эффект при наведении.", icon: "fa-sharp fa-solid fa-images"},
            animFrame: {
                pro: 0,
                default: !0,
                name: "Покадровая анимация",
                help: "Считывает файлы в указанной папке, и один за другим показывает, тем самым создавая эффект анимации. Важно! название изоброжений должно начинаться на anim_.",
                icon: "fa-sharp fa-solid fa-gif"
            },
            animFrameClose: {
                pro: 0,
                default: !0,
                name: "Скрыть покадровую анимацию",
                help: "Скрывает ранее вызванную анимацию.",
                icon: "fa-sharp fa-regular fa-gif"
            },
            keyframe: {
                pro: 0,
                default: !0,
                name: "Создать анимацию",
                help: "Открывает создание анимации из ключевых кадров.",
                icon: "fa-sharp fa-solid fa-grid-2"
            },
            frame: {
                pro: 0,
                default: !0,
                name: "Настройка кадра",
                help: "Настройка анимации ключевого кадра. С помощь этого компонента создается один ключевой кадр с определенным действием.",
                icon: "fa-sharp fa-solid fa-key"
            },
            endkeyframe: {
                pro: 0,
                default: !0,
                name: "Закрыть анимацию",
                help: "Обязательный компонент, нужен чтобы закрыть открытое создание анимации.",
                icon: "fa-sharp fa-solid fa-lock-keyhole"
            },
            kanim: {
                pro: 0,
                default: !0,
                name: "Запустить анимацию",
                help: "Запускает анимацию, созданную с помощью ключевых кадров.",
                icon: "fa-sharp fa-solid fa-clapperboard-play"
            }
        }
    },

    character: {
        id: "character",
        name: "Персонажи",
        components: {
            chara_show: {pro: 0, default: !0, name: "Персонаж", help: "Используется для вызова персонажа на сцену.", icon: "fa-sharp fa-solid fa-person"},
            chara_hide: {pro: 0, default: !0, name: "Убрать со сцены", help: "Убирает выбранного персонажа со сцены.", icon: "fa-sharp fa-solid fa-person-circle-minus"},
            chara_mod: {pro: 0, default: !0, name: "Состояние", help: "Используется чтобы сменить выражение лица или позу персонажа.", icon: "fa-sharp fa-solid fa-person-walking-arrow-loop-left"},
            chara_move: {pro: 0, default: !0, name: "Анимация персонажа", help: "Используется чтобы изменить положение персонажа на экране. ", icon: "fa-sharp fa-solid fa-person-skating"},
            chara_hide_all: {pro: 0, default: !0, name: "Убрать всех персонажей", help: "Убирает всех персонажей со сцены.", icon: "fa-sharp fa-solid fa-person-circle-xmark"},
            tb_chara_shake: {
                pro: 1,
                default: !1,
                name: "Встряска персонажа",
                help: "Применяет эффект тряски к персонажу.",
                icon: "fa-sharp fa-solid fa-person-rays"
            },
            face_char: {
                pro: 1,
                default: !1,
                name: "FaceChar",
                help: "Позволяет добавить изображение перед текстбоксом.",
                icon: "fa-sharp fa-solid fa-image"
            },
            face_char_delete: {
                pro: 1,
                default: !1,
                name: "Удалить FaceChar",
                help: "Удаляет изображение. Примичание: \"Удалить FaceChar\" автоматически задействует функцию \"Разрыв страницы\".",
                icon: "fa-sharp fa-solid fa-image-slash"
            }
        }
    },

    text: {
        id: "text",
        name: "Эффекты",
        components: {
            wait: {pro: 0, default: !0, name: "Ожидание", help: "Ожидание игнорирует действия игрока в течении указанного времени.", icon: "fa-sharp fa-solid fa-circle-pause"},
            quake: {pro: 0, default: !0, name: "Тряска экрана", help: "Встряхивает весь экран.", icon: "fa-sharp fa-solid fa-waveform"},
            tb_ptext_show: {pro: 0, default: !0, name: "Создать текст", help: "Создание текста размещает текст внутри игры.", icon: "fa-sharp fa-solid fa-input-text"},
            tb_ptext_hide: {
                pro: 0,
                default: !0,
                name: "Удалить текст",
                help: "Удаляет созданный вами текст из игры.",
                icon: "fa-sharp fa-solid fa-input-text"
            },
            l: {pro: 0, default: !0, name: "Пауза", help: "Пауза заставляет игру приостановиться и ожидать нажатия игрока.", icon: "fa-sharp fa-regular fa-pause"},
            textHint: {
                pro: 0,
                default: !0,
                name: "Текстовая подсказка",
                help: "Необходима для замены слова или комбинации нескольких слов и отображения подсказки. Поместите эту функцию над текстом, в котором вы хотите отобразить подсказку.",
                icon: "fa-sharp fa-solid fa-thought-bubble"
            },
            textHintSettings: {
                pro: 0,
                default: !0,
                name: "Настройки текстовой подсказки",
                help: "Глобальные настройки для текстовой подсказки.",
                icon: "fa-sharp fa-solid fa-square-sliders-vertical"
            },
            title: {
                pro: 0,
                default: !1,
                name: "Название сцены",
                help: "Можно для каждой сцены задать свое название, или например, в зависимости от значения переменной.",
                icon: "fa-sharp fa-solid fa-heading"
            }
        }
    },

    media: {
        id: "media",
        name: "Медиа",
        components: {
            playbgm: {
                pro: 0,
                default: !0,
                name: "Включить музыку",
                help: "Воспроизводит фоновую музыку.",
                icon: "fa-sharp fa-solid fa-volume"
            },
            stopbgm: {pro: 0, default: !0, name: "Выключить музыку", help: "Прерывает воспроизведение фоновой музыки.", icon: "fa-sharp fa-solid fa-volume-xmark"},
            playse: {
                pro: 0,
                default: !0,
                name: "Включить звуковой эффект",
                help: "Воспроизводит звук. Отличие музыки от звука только в одном, продолжительности. Также у звуков можно выбрать канал воспроизведения.",
                icon: "fa-sharp fa-solid fa-music-note"
            },
            stopse: {pro: 0, default: !0, name: "Выключить звуковой эффект", help: "Прерывает воспроизведение звукового эффекта.", icon: "fa-sharp fa-solid fa-music-note-slash"},
            wbgm: {pro: 0, default: !1, name: "Ждать окончания музыки", help: "Приостанавливает игру и ожидает пока музыка не будет полностью проиграна.", icon: "fa-sharp fa-solid fa-circle-pause"},
            wse: {pro: 0, default: !1, name: "Ждать окончания звукового эффекта", help: "Приостанавливает игру и ожидает пока звуковой эффект не будет полностью проиграна.", icon: "fa-sharp fa-solid fa-circle-pause"},
            voconfig: {
                pro: 0,
                default: !1,
                name: "Настройка озвучки текста",
                help: "Регистрирует озвученный текст для определенного персонажа.",
                icon: "fa-sharp fa-solid fa-microphone"
            },
            vostart: {
                pro: 0,
                default: !1,
                name: "Запуск озвучки",
                help: "Запускает зарегистрированную озвучку. Воспроизведет, когда обнаружит имя персонажа заданное через «#Имя».",
                icon: "fa-sharp fa-solid fa-microphone-lines"
            },
            vostop: {
                pro: 0,
                default: !1,
                name: "Остановить озвучку",
                help: "Останавливает озвучку. После этой функции, имя заданное через «#Имя» больше не будет подхватывать озвучку.",
                icon: "fa-sharp fa-solid fa-microphone-slash"
            },
            movie: {pro: 0, default: !0, name: "Видео", help: "Воспроизводит видео.", icon: "fa-sharp fa-solid fa-film"}
        }
    },

    screen_effect: {
        id: "screen_effect",
        name: "Эффекты экрана",
        components: {
            mask: {
                pro: 0,
                default: !0,
                name: "Скрыть экран",
                help: "Скрывает экран. Пока экран скрыт, можно на сцене что-то создать чтобы игрок не увидел момент создания.",
                icon: "fa-sharp fa-solid fa-desktop"
            },
            mask_off: {pro: 0, default: !0, name: "Показать экран", help: "Прекращает скрывать экран.", icon: "fa-sharp fa-regular fa-desktop"},
            layermode: {
                pro: 0,
                default: !0,
                name: "Смешивание изображения",
                help: "Позволяет смешивать изображение с экраном игры. Проще говоря, эта функция нужна для возможности выбрать метод наложения изображения на экран.",
                icon: "fa-sharp fa-solid fa-layer-group"
            },
            layermode_movie: {
                pro: 0,
                default: !0,
                name: "Смешать видео",
                help: "Позволяет смешивать видео с экраном игры. Проще говоря, эта функция нужна для возможности выбрать метод наложения видео на экран.",
                icon: "fa-sharp fa-solid fa-bring-forward"
            },
            free_layermode: {
                pro: 0,
                default: !0,
                name: "Отменить смешение",
                help: "Прекращает смешивание.",
                icon: "fa-sharp fa-regular fa-layer-group"
            }
        }
    },

    live2d: {
        id: "live2d",
        name: "Live2D",
        components: {
            live2d_new: {
                pro: 0,
                default: !0,
                name: "Подключить Live2D модель",
                help: "Подключает Live2D модель. В этот момент она все еще не будет видна на экране.",
                icon: "fa-sharp fa-regular fa-person"
            },
            live2d_show: {pro: 0, default: !0, name: "Показать Live2D", help: "Показывает подключенную модель Live2D.", icon: "fa-sharp fa-solid fa-person-sign"},
            live2d_motion: {pro: 0, default: !0, name: "Анимация Live2D модели", help: "Выбор анимации Live2D модели.", icon: "fa-sharp fa-solid fa-person-dolly-empty"},
            live2d_hide: {pro: 0, default: !0, name: "Скрыть Live2D модель", help: "Скрывает выбранную Live2D модель.", icon: "fa-sharp fa-regular fa-person-sign"},
            live2d_mod: {pro: 0, default: !0, name: "Позиция Live2D модели", help: "Положение модели на экране.", icon: "fa-sharp fa-solid fa-person-walking-arrow-right"},
            live2d_expression: {
                pro: 0,
                default: !0,
                name: "Изменить выражение Live2D",
                help: "Изменяет выражение Live2D модели.",
                icon: "fa-sharp fa-solid fa-person-military-to-person"
            },
            // live2d_fadein: {
            //     pro: 0,
            //     default: !0,
            //     name: "Появление",
            //     help: "Эффект появления Live2D модели.",
            //     icon: "fa-sharp fa-solid fa-people-simple"
            // },
            // live2d_fadeout: {
            //     pro: 0,
            //     default: !0,
            //     name: "Затухание",
            //     help: "Эффект исчезновения Live2D модели.",
            //     icon: "fa-sharp fa-regular fa-people-simple"
            // },
            live2d_delete_all: {
                pro: 0,
                default: !0,
                name: "Удалить все Live2D модели",
                help: "Удаляет всех Live2D моделей со сцены.",
                icon: "fa-sharp fa-solid fa-person-through-window"
            }
        }
    },



    bgmovie: {
        id: "bgmovie",
        name: "Видео фон",
        components: {
            bgmovie: {
                pro: 1,
                default: !0,
                name: "Воспроизвести",
                help: "Воспроизводит видео в качестве фона.",
                icon: "fa-sharp fa-solid fa-play"
            },
            stop_bgmovie: {
                pro: 1,
                default: !0,
                name: "Остановить",
                help: "Останавливает видео, воспроизведенное в качестве фона.",
                icon: "fa-sharp fa-solid fa-play-pause"
            },
            wait_bgmovie: {
                pro: 1,
                default: !0,
                name: "Ждать окончания",
                help: "Дожидается окончания воспроизведения видео, прежде чем продолжить.",
                icon: "fa-sharp fa-solid fa-watch"
            },
        }
    },
    camera: {
        id: "camera",
        name: "3D Камера",
        components: {
            camera: {pro: 1, default: !0, name: "Камера", help: "Управление 3D камерой.", icon: "fa-sharp fa-solid fa-camera-movie"},
            reset_camera: {
                pro: 1,
                default: !0,
                name: "Сброс настроек камеры",
                help: "Сбрасывает все настройки камеры и возвращает ее в исходное положение.",
                icon: "fa-sharp fa-regular fa-camera-movie"
            },
            wait_camera: {
                pro: 1,
                default: !0,
                name: "Ждать окончания",
                help: "Ждать окончания работы 3D камеры, прежде чем продолжить.",
                icon: "fa-sharp fa-solid fa-watch-smart"
            }
        }
    },

    // 3D Функции
    d3Environment: {
        id: "d3Environment",
        name: "3D Окружение",
        components: {
            "3d_init": {
                pro: 0,
                default: 0,
                name : "Инициализация 3D",
                help: "Требуется для функций, связанных с 3D. Этот тег инициализирует 3D-объекты в игре.",
                icon: "fa-sharp fa-solid fa-cube",
            },
            "3d_model_new": {
                pro: 0,
                default: 0,
                name : "Создать 3D объект",
                help: "Подготавливает 3D-объект для отображения на сцене.",
                icon: "fa-sharp fa-solid fa-alien-8bit",
            },
            "3d_sprite_new": {
                pro: 0,
                default: 0,
                name : "3D объект (спрайт)",
                help: "Определяет 3D объект как спрайт. Разница между этим и 3D изображением заключается в том, что спрайтовый объект всегда направлен в камеру.",
                icon: "fa-sharp fa-solid fa-face-viewfinder",
            },
            "3d_show": {
                pro: 0,
                default: 0,
                name : "Показать 3D объект",
                help: "Отобразить 3D объект на экране.",
                icon: "fa-sharp fa-solid fa-face-viewfinder",
            },
            "3d_motion": {
                pro: 0,
                default: 0,
                name : "3D Анимация",
                help: "С помощью этой функции можно изменить анимацию 3D объекта.",
                icon: "fa-sharp fa-solid fa-snake",
            },
            "3d_hide": {
                pro: 0,
                default: 0,
                name : "Скрыть 3D объект",
                help: "Скрывает 3D объект. Чтобы показать его снова используйте \"Показать 3D объект\".",
                icon: "fa-sharp fa-solid fa-eye-slash",
            },
            "3d_hide_all": {
                pro: 0,
                default: 0,
                name : "Скрыть все 3D объекты",
                help: "Скрывает все 3D объекты. Чтобы показать их снова используйте \"Показать 3D объект\".",
                icon: "fa-sharp fa-solid fa-eye-low-vision",
            },
            "3d_delete": {
                pro: 0,
                default: 0,
                name : "Удалить 3D объект",
                help: "Удаляет 3D объект. Для повторного отображения, объект нужно будет создать заново.",
                icon: "fa-sharp fa-solid fa-square-minus",
            },
            "3d_delete_all": {
                pro: 0,
                default: 0,
                name : "Удалить 3D объекты",
                help: "Удаляет 3D объекты. Для повторного отображения, объекты нужно будет создать заново.",
                icon: "fa-sharp fa-solid fa-square-minus",
            },
            "3d_event": {
                pro: 0,
                default: 0,
                name : "Определение события",
                help: "Используется для запуска события при щелчке по объекту в 3D сцене. Событие не сработает, если после этого не будет функции \"Стоп\".",
                icon: "fa-sharp fa-solid fa-calendar-pen",
            },
            "3d_event_delete": {
                pro: 0,
                default: 0,
                name : "Удалить событие",
                help: "Удаляет созданное вами событие.",
                icon: "fa-sharp fa-solid fa-calendar-circle-minus",
            },
            "3d_event_start": {
                pro: 0,
                default: 0,
                name : "Запустить событие",
                help: "Запускает 3D событие. После выполнения события все события отключаются, поэтому вам необходимо разместить эту функцию, если вы хотите возобновить событие.",
                icon: "fa-sharp fa-solid fa-calendar-check",
            },
            "3d_event_stop": {
                pro: 0,
                default: 0,
                name : "Остановить событие",
                help: "Временно останавливает 3D событие. Само событие не исчезает. Вы можете возобновить работу в любое время с помощью \"Запустить событие\".",
                icon: "fa-sharp fa-solid fa-calendar-day",
            },
            "3d_image_new": {
                pro: 0,
                default: 0,
                name : "3D объект (изображение)",
                help: "Определите 3D объект изображения.",
                icon: "fa-sharp fa-solid fa-image",
            },
            "3d_canvas_show": {
                pro: 0,
                default: 0,
                name : "Отобразить 3D сцену",
                help: "Делает 3D сцену видимой.",
                icon: "fa-sharp fa-solid fa-border-inner",
            },
            "3d_canvas_hide": {
                pro: 0,
                default: 0,
                name : "Скрыть 3D сцену",
                help: "Скрывает 3D сцену.",
                icon: "fa-sharp fa-solid fa-border-center-h",
            },
            "3d_close": {
                pro: 0,
                default: 0,
                name : "Удалить 3D сцены",
                help: "Удаляет все 3D сцены.",
                icon: "fa-sharp fa-solid fa-border-center-h",
            },
            "3d_anim": {
                pro: 0,
                default: 0,
                name : "Анимация 3D объекта",
                help: "С помощью этой функции можно анимировать 3D объект, который находится на сцене.",
                icon: "fa-sharp fa-solid fa-bezier-curve",
            },
            "3d_anim_stop": {
                pro: 0,
                default: 0,
                name : "Остановить анимацию 3D объекта",
                help: "Останавливает анимацию объекта.",
                icon: "fa-sharp fa-solid fa-stop",
            },
            "3d_scene": {
                pro: 0,
                default: 0,
                name : "Настройка 3D сцены",
                help: "Вы можете задать настройки, которые влияют на всю 3D-сцену.",
                icon: "fa-sharp fa-solid fa-sliders-up",
            },
            "3d_camera": {
                pro: 0,
                default: 0,
                name : "3D камера",
                help: "Настройка камеры сцены.",
                icon: "fa-sharp fa-solid fa-camera-cctv",
            },
            "3d_gyro": {
                pro: 0,
                default: 0,
                name : "Гироскоп",
                help: "Вы можете управлять камерой с помощью гироскопа (наклона смартфона). На компьютере вы можете воспроизвести гироскоп по положению мыши.",
                icon: "fa-sharp fa-solid fa-group-arrows-rotate",
            },
            "3d_gyro_stop": {
                pro: 0,
                default: 0,
                name : "Отключить гироскоп",
                help: "Отключить гироскоп. Чтобы вернуть положение камеры в исходное положение, сразу после этой функции поместите \"3D камера\".",
                icon: "fa-sharp fa-solid fa-group-arrows-rotate",
            },
            "3d_debug_camera": {
                pro: 0,
                default: 0,
                name : "Отладка 3D камеры",
                help: "Вы можете настроить координаты камеры для 3D сцены, перетаскивая курсор мыши.",
                icon: "fa-sharp fa-solid fa-bug",
            },
            "3d_debug": {
                pro: 0,
                default: 0,
                name : "Отладка объекта",
                help: "Вы можете настраивать объекты в 3D сцене, перетаскивая их с помощью мыши.",
                icon: "fa-sharp fa-solid fa-bug",
            },
        }
    },
    // Чат
    chatStory: {
        id: "chatStory",
        name: "Чат (Устарел)",
        components: {
            "chat_config": {
                pro: 0,
                default: false,
                name : "Настройка чата",
                help: "Настройка основной части чата.",
                icon: "fa-sharp fa-solid fa-comment-smile",
            },
            "chat_sh": {
                pro: 0,
                default: false,
                name : "Скрыть чат",
                help: "Используйте, чтобы скрыть или показать чат.",
                icon: "fa-sharp fa-solid fa-comment-slash",
            },
            "chat_clear": {
                pro: 0,
                default: false,
                name : "Очистка чата",
                help: "Очистка чата полностью удаляет сообщения чата. Важно! После очистки чата необходимо снова сделать настройки чата.",
                icon: "fa-sharp fa-solid fa-comment-xmark",
            },
            "chat_scroll": {
                pro: 0,
                default: false,
                name : "Прокрутка чата",
                help: "Прокрутка сообщений вверх или вниз.",
                icon: "fa-sharp fa-solid fa-comment-arrow-up",
            },
            "chat_talk": {
                pro: 0,
                default: false,
                name : "Сообщение чата",
                help: "Отображает на экране облако с текстом.",
                icon: "fa-sharp fa-solid fa-comment-lines",
            },
            "p": {
                pro: 0,
                default: false,
                name : "Ожидание клика",
                help: "Ждет, пока игрок кликнет, и только после этого диалог продолжается.",
                icon: "fa-sharp fa-solid fa-comment-exclamation",
            },
            "tb_hide": {
                pro: 0,
                default: false,
                name : "Скрыть текстовый блок",
                help: "Скрывает или показывает стандартное окно сообщений.",
                icon: "fa-sharp fa-solid fa-browser",
            },
        }
    },

    // Next chat
    nextChat: {
        id: "nextChat",
        name: "Чат",
        components: {
            nextChatConfig: {
                pro: 0,
                default: true,
                name : "Настройка чата",
                help: "Настройка основной части чата.",
                icon: "fa-sharp fa-solid fa-comment-smile",
            },
            nextChatMessage: {
                pro: 0,
                default: true,
                name : "Сообщение чата",
                help: "Отображает на экране облако с текстом.",
                icon: "fa-sharp fa-solid fa-comment-lines",
            },
            nextChatButton: {
                pro: 0,
                default: true,
                name : "Кнопка в чате",
                help: "Добавляем кнопку с переходом к метке внутрь чата.",
                icon: "fa-sharp fa-solid fa-square-check",
            },
            "p": {
                pro: 0,
                default: true,
                name : "Ожидание клика",
                help: "Ждет, пока игрок кликнет, и только после этого диалог продолжается.",
                icon: "fa-sharp fa-solid fa-comment-exclamation",
            },
            nextChatHide: {
                pro: 0,
                default: true,
                name : "Скрыть чат",
                help: "Используйте, чтобы скрыть или показать чат.",
                icon: "fa-sharp fa-thin fa-comment",
            },
            nextChatClearMessage: {
                pro: 0,
                default: true,
                name : "Очистка чата",
                help: "Очищает ранее добавленные сообщения и кнопки.",
                icon: "fa-sharp fa-solid fa-eraser",
            },
        }
    },

    eval: {
        id: "eval",
        name: "Системное",
        components: {
            tb_eval: {pro: 0, default: !0, name: "Настройка переменной", help: "Взаимодействует с переменной. Например, можно сменить значение выбранной переменной.", icon: "fa-sharp fa-solid fa-square-root-variable"},
            varSetting: {pro: 0, default: !0, name: "Настройка переменной (N)", help: "Компонент взаимодействия с переменными. Это новый компонент для более корректной работы с переменными.", icon: "fa-sharp fa-solid fa-greater-than-equal"},
            edit: {pro: 0, default: !0, name: "Поле ввода", help: "Показывает поле ввода текста. Можно использовать для того, чтобы пользователь задал имя героя, или, например создания кодового замка.", icon: "fa-sharp fa-solid fa-input-text"},
            commit: {
                pro: 0,
                default: !0,
                name: "Зафиксировать ввод",
                help: "Сохраняет значение, введенное в поле ввода.",
                icon: "fa-sharp fa-solid fa-download"
            },
            save_img: {
                pro: 0,
                default: !1,
                name: "Захват миниатюры",
                help: "Нужно чтобы указать свое изображение в качестве эскиза для сохранения.",
                icon: "fa-sharp fa-solid fa-camera-viewfinder"
            },
            tb_keyconfig: {
                pro: 0,
                default: !1,
                name: "Конфигурация клавиш",
                help: "Включает или отключает сочетания клавиш клавиатуры или нажатия мыши и совершения жестов.",
                icon: "fa-sharp fa-solid fa-keyboard"
            },
            tb_cg: {pro: 0, default: !1, name: "Разблокировать изображение", help: "Разблокирует изображение чтобы его можно было посмотреть в галереи.", icon: "fa-sharp fa-solid fa-unlock"},
            tb_replay_start: {
                pro: 0,
                default: !1,
                name: "Запустить воспоминание",
                help: "Определяет отрезок, с которого начинается воспоминание. После чего его можно будет посмотреть.",
                icon: "fa-sharp fa-solid fa-square-heart"
            },
            tb_replay: {
                pro: 0,
                default: !1,
                name: "Закончить воспоминание",
                help: "Определяет конец воспоминания.",
                icon: "fa-sharp fa-regular fa-square-heart"
            },
            systemButton: {
                pro: 0,
                default: !0,
                name: "Системная кнопка",
                help: "Компонент предназначен для открытия системных меню.",
                icon: "fa-sharp fa-solid fa-tablet-button"
            },
            if: {
                pro: 0,
                default: !0,
                name: "Начало условия",
                help: "Используется, чтобы создать ветвление.",
                icon: "fa-sharp fa-solid fa-bracket-curly"
            },
            elsif: {
                pro: 0,
                default: !0,
                name: "Дополнительное условие",
                help: "Используется, чтобы создать дополнительное условие.",
                icon: "fa-sharp fa-solid fa-code-merge"
            },
            else: {
                pro: 0,
                default: !0,
                name: "Иначе",
                help: "Сработает если ни одно условие не выполнилось.",
                icon: "fa-sharp fa-solid fa-code-pull-request"
            },
            endif: {
                pro: 0,
                default: !0,
                name: "Конец условия",
                help: "Требуется, чтобы закрыть ветвление.",
                icon: "fa-sharp fa-solid fa-bracket-curly-right"
            },
            clearvar: {
                pro: 0,
                default: !1,
                name: "Очистка переменных",
                help: "Очищает все переменные в игре.",
                icon: "fa-sharp fa-solid fa-trash-list"
            },
            clearsysvar: {
                pro: 0,
                default: !1,
                name: "Очистка системных переменных",
                help: "Очищает все системные переменные в игре.",
                icon: "fa-sharp fa-solid fa-trash-list"
            },
            macro: {
                pro: 0,
                default: !1,
                name: "Объявление макроса",
                help: "Макросы нужны чтобы создать заранее заготовленное действие и вызвать его позднее.",
                icon: "fa-sharp fa-solid fa-bars"
            },
            endmacro: {
                pro: 0,
                default: !1,
                name: "Закрытие макроса",
                help: "Закрывает макрос. Обязательная функция, если вы используете Объявление макроса.",
                icon: "fa-sharp fa-regular fa-bars"
            },
            erasemacro: {
                pro: 0,
                default: !1,
                name: "Удаление макроса",
                help: "Удаляет заранее созданный макрос.",
                icon: "fa-sharp fa-solid fa-bars-filter"
            },
            web: {
                pro: 0,
                default: !1,
                name: "Открытие сайта",
                help: "Позволяет прямо из игры открыть сайт.",
                icon: "fa-sharp fa-solid fa-ethernet"
            },
            close: {
                pro: 0,
                default: !1,
                name: "Закрыть игру",
                help: "Полностью закрывает игру.",
                icon: "fa-sharp fa-solid fa-xmark"
            },
            html: {
                pro: 0,
                default: !1,
                name: "Отображение HTML",
                help: "Отображает HTML код на сцене.",
                icon: "fa-sharp fa-solid fa-file-code"
            },
            endhtml: {
                pro: 0,
                default: !1,
                name: "Закрытие HTML",
                help: "Обязательный тег, который должен идти после «Отображение HTML».",
                icon: "fa-sharp fa-solid fa-file-code"
            },
            setFullScreenEnter: {
                pro: 0,
                default: true,
                name: "На весь экран",
                help: "Развернуть игру на весь экран.",
                icon: "fa-sharp fa-regular fa-expand"
            },
        }
    },
    uiElements: {
        id: "uiElements",
        name: "Динамический интерфейс",
        components: {
            uiVariable: {
                pro: 0,
                default: true,
                name: "Обновление переменной",
                help: "Этот элемент интерфейса игры используется для динамического обновления отображаемой переменной.",
                icon: "fa-sharp fa-solid fa-binary-circle-check"
            },
            uiCloseAndOpen: {
                pro: 0,
                default: true,
                name: "Скрыть",
                help: "Требуется чтобы скрыть или отобразить элемент Динамического интерфейса.",
                icon: "fa-sharp fa-solid fa-binary-slash"
            },
            actionTime: {
                pro: 0,
                default: true,
                name: "Переход по таймеру",
                help: "Если никакая кнопка не была нажата, то сработает этот компонент и совершит переход к выбранной метке.",
                icon: "fa-sharp fa-solid fa-timer"
            },
            actionProgress: {
                pro: 0,
                default: true,
                name: "Прогресс бар",
                help: "В зависимости от значения переменной, прогресс бар будет заполняться.",
                icon: "fa-sharp fa-solid fa-bars-progress"
            },
            actionProgressHide: {
                pro: 0,
                default: true,
                name: "Скрыть прогресс бар",
                help: "Скрывает или отображает прогресс бар.",
                icon: "fa-sharp fa-solid fa-bars-progress"
            },
            timeSetting: {
                pro: 0,
                default: true,
                name: "Инициализация времени",
                help: "Позволяет настроить время, скорость времени и другие параметры. Разместите данный компонент вначале вашей сцены.",
                icon: "fa-sharp fa-light fa-hourglass-start"
            },
            timeStart: {
                pro: 0,
                default: true,
                name: "Запуск времени",
                help: "Запускает отсчет реалтайм времени.",
                icon: "fa-sharp fa-solid fa-hourglass-start"
            },
            timeEdit: {
                pro: 0,
                default: true,
                name: "Редактор времени",
                help: "Компонент, который нужен чтобы контролировать время вручную.",
                icon: "fa-sharp fa-regular fa-hourglass-start"
            },
            imageMap: {
                pro: 0,
                default: true,
                name: "Image Map",
                help: "Создает интерактивную карту на изображении, используя заданные координаты.",
                icon: "fa-sharp fa-solid fa-send-back"
            },
        }
    },
    shaders: {
        id: "shaders",
        name: "Эффекты",
        components: {
            overlayEffects: {
                pro: 0,
                default: true,
                name: "Эффекты перекрытия",
                help: "Эффект состоит из картинки или видео, что накладывается на экран поверх всех элементов.",
                icon: `fa-sharp fa-solid fa-diagram-venn`
            },
            overlayEffectsHide: {
                pro: 0,
                default: true,
                name: "Скрыть эффект перекрытия",
                help: "Скрывает вызванный эффект перекрытия.",
                icon: "fa-sharp fa-thin fa-diagram-venn"
            },
            particlesEffectsImg: {
                pro: 0,
                default: true,
                name: "Частицы (I)",
                help: "Эффект частиц из изображения.",
                icon: "fa-sharp fa-solid fa-sprinkler-ceiling"
            },
            particlesEffectsImgHide: {
                pro: 0,
                default: true,
                name: "Скрыть частицы (I)",
                help: "Скрывает частицы, которые используют изображение.",
                icon: "fa-sharp fa-thin fa-sprinkler-ceiling"
            },
            particlesEffects: {
                pro: 0,
                default: true,
                name: "Частицы",
                help: "Эффекты частиц без использования изображений.",
                icon: "fa-sharp fa-solid fa-sprinkler-ceiling"
            },
            particlesEffectsHide: {
                pro: 0,
                default: true,
                name: "Скрыть частицы",
                help: "Скрывает частицы.",
                icon: "fa-sharp fa-thin fa-sprinkler-ceiling"
            },
        }
    },

    inventorySystemUI: {
        id: "inventorySystemUI",
        name: "Инвентарь",
        components: {
            inventorySystem: {
                pro: 0,
                default: true,
                name: "Инициализация инвентаря",
                help: "Подключение и настройка инвентаря.",
                icon: "fa-sharp fa-solid fa-shelves"
            },
            inventorySystemTriggerZone: {
                pro: 0,
                default: true,
                name: "Взаимодействие",
                help: "Область, с которой взаимодействует предмет из инвентаря.",
                icon: "fa-sharp fa-light fa-arrow-right-to-bracket"
            },
            inventorySystemAddItem: {
                pro: 0,
                default: true,
                name: "Добавить предмет",
                help: "Добавляет предмет в инвентарь.",
                icon: "fa-sharp fa-regular fa-cart-plus"
            },
            inventorySystemSetAmount: {
                pro: 0,
                default: true,
                name: "Количество",
                help: "Определяет количество конкретного предмета в инвентаре.",
                icon: "fa-sharp fa-solid fa-arrow-up-wide-short"
            },
        }
    },

    script: {
        id: "script",
        name: "Программирование",
        components: {
            iscript: {
                pro: 0,
                default: !0,
                name: "JavaScript",
                help: "Функция является необязательной. Все можно сделать через визуальный редактор. Но если вам хочется сделать что-то специфическое, то используйте для этого JavaScript.",
                icon: "script"
            },
            tb_start_tyrano_code: {
                pro: 0,
                default: !0,
                name: "TyrannoScript",
                help: "Теги TyranoScript можно записывать как есть.",
                icon: "t-script"
            }
        }
    },
    plugin: {id: "plugin", name: "Плагины", components: {}}
};