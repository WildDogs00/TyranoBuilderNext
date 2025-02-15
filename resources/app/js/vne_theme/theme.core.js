const {ipcRenderer} = require('electron');
const util = require("util");
const fsW = require("fs");
const pathF = require("path");
const request = require('request');

const themeButton = document.getElementById("change_color_btn");
const root = document.documentElement;
const variables_dark = {
    '--vne-body-color': '#231f2e',
    '--vne-logo-hover-color': '#c9c9c9',
    '--vne-right-panel-color': '#2e2a3f',
    '--vne-control-label-color': '#4d4862',
    '--vne-param-group-color': '#2e2a3f',
    '--vne-btn-create-project-color': '#7961f2',
    '--vne-btn-create-project-hover-color': 'rgba(121, 97, 242, 0.5)',
    '--vne-btn-color': '#524f60',
    '--vne-btn-color-hover': '#3e3277',
    '--vne-text-color': '#dedede',
    '--vne-project-item-color': '#2e2a3f',
    '--vne-project-item-hover-color': 'rgba(82, 61, 88, 0.5)',
    '--vne_theme_separator': '#2e2a3f',
    '--vne-don-shadow-color': '#2e2a3f',
    '--vne-shadow-bottom-color': '#231f2e',
    '--vne-form-name-project-color': '#524f60',
    '--vne-input-field-color': '#524f60',
    '--vne-header-block_color': '#524f60',
    '--vne-text-color-alt': '#dedede',
    '--vne-form-check-input_bg_color': '#dedede',
    '--vne-ep-nav-icon-hover-color': '#7961f2',
    '--vne-tooltip-label-color': '#4d4862',
    '--vne_bg_icon_func': '#231f2e',
    '--vne-mode-switch': '#2e2a3f',
    '--vne-mode-switch-text': '#dedede',
    '--vne-mode-checked': '#2e2a3f',

};
const variables_light = {
    '--vne-body-color': '#e6e6e6',
    '--vne-right-panel-color': '#dcdae5',
    '--vne-control-label-color': '#dcdae5',
    '--vne-param-group-color': '#dcdae5',
    '--vne-btn-create-project-color': '#e2a200',
    '--vne-btn-create-project-hover-color': 'rgba(226,162,0,0.62)',
    '--vne-btn-color': '#cebad0',
    '--vne-btn-color-hover': 'rgba(226,162,0,0.62)',
    '--vne-text-color': '#262730',
    '--vne-project-item-color': '#dcdae5',
    '--vne-project-item-hover-color': '#ebdfe3',
    '--vne_theme_separator': '#dcdae5',
    '--vne-don-shadow-color': '#dcdae5',
    '--vne-shadow-bottom-color': '#dcdae5',
    '--vne-form-name-project-color': '#dcdae5',
    '--vne-input-field-color': '#dcdae5',
    '--vne-header-block_color': '#dcdae5',
    '--vne-text-color-alt': '#dedede',
    '--vne-form-check-input_bg_color': '#dedede',
    '--vne-ep-nav-icon-hover-color': 'rgba(226,162,0,0.62)',
    '--vne-tooltip-label-color': '#333333',
    '--vne_bg_icon_func': '#dcdae5',
    '--vne-mode-switch': '#dcdae5',
    '--vne-mode-switch-text': '#262730',
    '--vne-mode-checked': '#e2a200',

};
const btn = document.querySelector(".btn-d-n");


function varManage() {
    app.window.show("VarManage", {
        title: $.s("Менеджер переменных"),
        width: 900,
        height: 800,
    })
}

function pluginManage() {
    app.window.show("PluginManage", {
        title: $.s("Плагины"),
        width: 640,
        height: 500,
    });
}

function componentSetting() {
    app.window.show("ComponentSetting", {
        title: $.s("Добавить Live2D"),
        width: 640,
        height: 500,
    });
}

function fukiManage() {
    app.window.show("FukiManage", {
        title: $.s("Настройки речевого облачка"),
        width: 640,
        height: 500,
    });
}

function fontManage() {
    app.window.show("FontManage", {
        title: $.s("Пользовательские шрифты"),
        width: 640,
        height: 500,
    });
}
function achievementEditor() {
    app.window.show("AchievementEditor", {
        title: $.s("Редактор достижений"),
        width: 1000,
        height: 800,
    });
}
function langSystemEditor() {
    app.window.show("LanguageSystemEditor", {
        title: $.s("Редактор перевода"),
        width: 1000,
        height: 800,
    });
}
function mapGameEditor() {
    app.window.show("MapGameEditor", {
        title: $.s("Редактор карты игры"),
        width: 1000,
        height: 800,
    });
}
function inventoryGameEditor() {
    app.window.show("inventoryGameEditor", {
        title: $.s("Редактор инвентаря"),
        width: 1000,
        height: 800,
    });
}

function ImageMapEditor() {
    app.window.show("ImageMapEditor", {
        title: $.s("Редактор Image Map"),
        width: 1000,
        height: 800,
    });
}

function ImageMapEditorCoords() {
    var o = app.tyrano.config.scWidth,
        i = app.tyrano.config.scHeight;
    app.window.show(
        "ImageMapEditorCoords",
        {
            title: $.s("Получение координат"),
            width: o,
            height: i,
            padding: "none",
        },
        function (e) {
        }
    );

}

function uiMaker() {
    var o = app.tyrano.config.scWidth,
        i = app.tyrano.config.scHeight;
    app.window.show(
        "UIMaker",
        {
            title: $.s("Пользовательский интерфейс"),
            width: o,
            height: i,
            padding: "none",
        },
        function (e) {
        }
    );

}

function war() {
    Swal.fire({
        title: $.s("Уведомление"),
        text: $.s("Чтобы изменения вступили в силу, перезагрузите приложение!"),
        color: "var(--vne-text-color)",
        background: "var(--vne-right-panel-color)",
        confirmButtonText: $.s("Да"),
        cancelButtonText: $.s("Нет"),
        reverseButtons: false,
        buttonsStyling: true,
        showCancelButton: true,
        width: '440px'
    }).then((result) => {
        if (result.isConfirmed) {
            location.href = "./tyrano.html";
        }
    })
}

if (!themeButton) {

} else {
    themeButton.addEventListener("change", () => {
        if (themeButton.checked) {
            Object.entries(variables_light).forEach(([variable, value]) => root.style.setProperty(variable, value));
            localStorage.setItem('theme', 'light')
        } else {
            Object.entries(variables_dark).forEach(([variable, value]) => root.style.setProperty(variable, value));
            localStorage.setItem('theme', 'dark')
        }
    })
    if (localStorage.getItem('theme') === 'dark') {
        Object.entries(variables_dark).forEach(([variable, value]) => root.style.setProperty(variable, value));
        btn.removeAttribute("checked")
    } else {
        Object.entries(variables_light).forEach(([variable, value]) => root.style.setProperty(variable, value));
        btn.setAttribute("checked", "checked")
    }
}

const cfs = document.getElementById("typeFuncShow");
const cfs2 = document.getElementById("typeFuncShow2");


function selectionProjects() {
    app.component.saveTyranoScriptCode()
    app.component.saveCharaDefineCode()
    location.href = "./tyrano.html";
}

function changeFunctionStyle() {
    if (cfs.checked) {
        $('.cpn-item').css({
            width: "307px"
        })
        $(':root').get(0).style.setProperty("--vne-item_after_left", "307px")
        localStorage.setItem('toggleRP', 'true')
    } else if (cfs2.checked) {
        $('.cpn-item').css({
            width: "151px"
        })
        $(':root').get(0).style.setProperty("--vne-item_after_left", "0px")
        localStorage.setItem('toggleRP', 'false')
    }
}

if (!cfs) {
} else {
    if (localStorage.getItem('toggleRP') === 'true') {
        $('.cpn-item').css({
            "width": "307px"
        })
        $(':root').get(0).style.setProperty("--vne-item_after_left", "307px")
        cfs.setAttribute("checked", "checked")
    } else {
        $('.cpn-item').css({
            "width": "151px"
        })
        $(':root').get(0).style.setProperty("--vne-item_after_left", "0px")
        cfs2.setAttribute("checked", "checked")
    }
}


$(document).ready(function () {
    $('#settingsSoftware').click(function () {
        $('.vne-settings-software').css('display', 'inline-block');
    })
    $('#closeButton').click(function () {
        $('.vne-settings-software').css('display', 'none');
    });

    $('.vne_resize').change(function () {
        const selectedValue = $(this).val();
        if (selectedValue === "1") {
            war()
            localStorage.setItem('rsW', '1280')
            localStorage.setItem('selectedValue', selectedValue);
        } else if (selectedValue === "2") {
            war()
            localStorage.setItem('rsW', '1700')
            localStorage.setItem('selectedValue', selectedValue);
        }
    });
});


const l2d = document.querySelector(".button_function_live2d img");
!l2d ? "" : (localStorage.getItem('theme') === 'dark' ? l2d.setAttribute('src', "_new/images/live2d.png") : l2d.setAttribute('src', "_new/images/live2d-l.png"))


if (localStorage.getItem('rsW') === '1280') {
    $('.vne_resize').val("1");
    ipcRenderer.send("resizeWindow1280")
} else {
    $('.vne_resize').val("2");
    ipcRenderer.send("resizeWindow1700")
}

const dgEl = document.getElementById("vne-settings-software-window")

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

dgEl ? dragElement(dgEl) : ""

const helpShow = document.querySelector('.area_help_show');

function addHoverFunctionality(title) {
    title.addEventListener('mouseover', function () {
        helpShow.style.display = 'block';
    });

    title.addEventListener('mouseout', function () {
        helpShow.style.display = 'none';
    });
}


const existingTitles = document.querySelectorAll('.help');
existingTitles.forEach(addHoverFunctionality);

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes) {
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeType === Node.ELEMENT_NODE && node.matches('.help')) {
                    addHoverFunctionality(node);
                }
            });
        }
    });
});

observer.observe(document.body, {childList: true, subtree: true});


let intervalId;
const select = document.getElementById("vne_auto_save");

function saveGameTime() {
    app.component.saveTyranoScriptCode()
    app.component.saveCharaDefineCode()
    alertNoBtn("Внимание",
        "Проект был успешно сохранен!",
        3000,
        "bottom-right",
        "success",
        "--vne-success-alert-color")
}

function startInterval() {
    const interval = select.value * 60 * 1000;
    if (interval > 0) {
        intervalId = setInterval(saveGameTime, interval);
        localStorage.setItem("vne_auto_save_interval", select.value);
    } else {
        stopInterval();
        localStorage.removeItem("vne_auto_save_interval");
    }
}

function stopInterval() {
    clearInterval(intervalId);
    localStorage.removeItem("vne_auto_save_interval");
}

if (!select) {
} else {
    const savedInterval = localStorage.getItem("vne_auto_save_interval");
    if (savedInterval) {
        select.value = savedInterval;
        startInterval();
    }

    document.getElementById("vne_auto_save").addEventListener("change", () => {
        if (intervalId) {
            stopInterval();
        }
        startInterval();
    });
}

$('.textAreaBtnF, .textAreaBtnSF, .textAreaBtnMark, .textAreaBtnImg, .textAreaBtnMacros, .textAreaBtnLink, .textAreaBtnP, .textAreaBtnVo, .textAreaBtnFormatText, .textAreaBtnAnimationText').each(function () {
    if (!$(this).data('click-bound')) {
        $(this).data('click-bound', true);
        $(this).click(function () {
            const parent = $(this).parent();
            const textarea = parent.find('textarea');
            const prefix = $(this).hasClass('textAreaBtnSF') ? 'sf.' : 'f.';
            const action = $(this).data('action');

            if (textarea.length) {
                const cid = parent.closest('.tb-main-cpn').attr('cid');
                const targetTextarea = $('div[cid="' + cid + '"] textarea');

                if (action === "textAreaBtnF" || action === "textAreaBtnSF") {
                    if (targetTextarea.length) {
                        Swal.fire({
                            title: $.s('Введите название переменной'),
                            input: 'text',
                            inputPlaceholder: $.s('Название переменной'),
                            showCancelButton: true,
                            color: "var(--vne-text-color)",
                            background: "var(--vne-right-panel-color)",
                            confirmButtonText: $.s('Вставить'),
                            cancelButtonText: $.s('Отмена'),
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                            inputValidator: (value) => {
                                if (!value) {
                                    return $.s('Название переменной является обязательным');
                                }
                            }
                        }).then(function (result) {
                            if (!!result.value) {
                                const currentText = targetTextarea.val();
                                const cursorPos = targetTextarea.prop('selectionStart');
                                const newText = "[emb exp='" + prefix + result.value + "']";
                                const updatedText = currentText.substring(0, cursorPos) + newText + currentText.substring(cursorPos);
                                targetTextarea.val(updatedText);
                                targetTextarea.trigger('input');
                                targetTextarea.trigger('change');
                            }
                        });
                    }
                } else if (action === "textAreaBtnMark") {
                    if (targetTextarea.length) {
                        Swal.fire({
                            footer: $.s('1. Цвет фона, 2. Цвет текста, 3. Размер фона'),
                            html: `
                           <div style="display: flex !important;">
                                <input id="color" class="form-control" style="margin-right: 2px !important;" type="color">
                                <input id="fontColor" class="form-control" style="margin-right: 2px !important;" type="color">
                                <input id="size" class="form-control" style="margin-right: 2px !important;">
                            </div>
                        `,
                            showCancelButton: true,
                            color: "var(--vne-text-color)",
                            background: "var(--vne-right-panel-color)",
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                            preConfirm: () => {
                                const color = document.getElementById('color').value;
                                const fontColor = document.getElementById('fontColor').value;
                                const size = document.getElementById('size').value;
                                return {
                                    color: `0x${color.substring(1)}`,
                                    fontColor: `0x${fontColor.substring(1)}`,
                                    size
                                };
                            },
                            confirmButtonText: $.s('Вставить'),
                            cancelButtonText: $.s('Отмена')
                        }).then(function (result) {
                            if (!!result.value) {
                                const currentText = targetTextarea.val();
                                const selectionStart = targetTextarea[0].selectionStart;
                                const selectionEnd = targetTextarea[0].selectionEnd;

                                const selectedText = currentText.substring(selectionStart, selectionEnd);
                                const newText = `[mark color="${result.value.color}" font_color="${result.value.fontColor}" size="${result.value.size}"]${selectedText}[endmark]`;

                                const updatedText = currentText.substring(0, selectionStart) + newText + currentText.substring(selectionEnd);

                                targetTextarea.val(updatedText);
                                targetTextarea.trigger('input');
                                targetTextarea.trigger('change');
                            }
                        });
                    }

                } else if (action === "textAreaBtnImg") {
                    if (targetTextarea.length) {
                        Swal.fire({
                            title: $.s('Выберите картинку'),
                            html: `
                                <input id="image" type="file" accept="image/*">
                            `,
                            footerFontSize: "22px",
                            footer: $.s('Изображение должно находится в папке «data/image» вашего проекта!'),
                            showCancelButton: true,
                            color: "var(--vne-text-color)",
                            background: "var(--vne-right-panel-color)",
                            confirmButtonText: $.s('Вставить'),
                            cancelButtonText: $.s('Отмена'),
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                const imageInput = document.getElementById('image');
                                const file = imageInput.files[0];

                                if (file) {
                                    const fileName = file.name;
                                    const currentText = targetTextarea.val();
                                    const cursorPos = targetTextarea.prop('selectionStart');
                                    const newText = `[graph storage="${fileName}"]`;
                                    const updatedText = currentText.substring(0, cursorPos) + newText + currentText.substring(cursorPos);

                                    targetTextarea.val(updatedText);
                                    targetTextarea.trigger('input');
                                    targetTextarea.trigger('change');
                                }
                            }
                        });
                    }
                } else if (action === "textAreaBtnMacros") {
                    if (targetTextarea.length) {
                        Swal.fire({
                            title: $.s('Введите название макроса'),
                            input: 'text',
                            inputPlaceholder: $.s('Название макроса'),
                            showCancelButton: true,
                            color: "var(--vne-text-color)",
                            background: "var(--vne-right-panel-color)",
                            confirmButtonText: $.s('Вставить'),
                            cancelButtonText: $.s('Отмена'),
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                            inputValidator: (value) => {
                                if (!value) {
                                    return $.s('Название переменной является обязательным');
                                }
                            }
                        }).then(function (result) {
                            if (!!result.value) {
                                const currentText = targetTextarea.val();
                                const cursorPos = targetTextarea.prop('selectionStart');
                                const newText = `[${result.value}]`;
                                const updatedText = currentText.substring(0, cursorPos) + newText + currentText.substring(cursorPos);
                                targetTextarea.val(updatedText);
                                targetTextarea.trigger('input');
                                targetTextarea.trigger('change');
                            }
                        });
                    }
                } else if (action === "textAreaBtnLink") {
                    if (targetTextarea.length) {
                        Swal.fire({
                            footer: $.s('1 Сценарий, 2 Метка.'),
                            html: `
                           <div style="display: flex !important;">
                                <input id="storage" class="form-control" style="margin-right: 2px !important;">
                                <input id="target" class="form-control" style="margin-right: 2px !important;">
                            </div>
                        `,
                            showCancelButton: true,
                            color: "var(--vne-text-color)",
                            background: "var(--vne-right-panel-color)",
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                            preConfirm: () => {
                                const storage = document.getElementById('storage').value;
                                const target = document.getElementById('target').value;
                                return {
                                    storage,
                                    target
                                };
                            },
                            confirmButtonText: $.s('Вставить'),
                            cancelButtonText: $.s('Отмена')
                        }).then(function (result) {
                            if (!!result.value) {
                                const currentText = targetTextarea.val();
                                const selectionStart = targetTextarea[0].selectionStart;
                                const selectionEnd = targetTextarea[0].selectionEnd;

                                const selectedText = currentText.substring(selectionStart, selectionEnd);
                                const newText = `[link storage="${result.value.storage + '.ks'}" target="*${result.value.target}]${selectedText}[endlink]`;

                                const updatedText = currentText.substring(0, selectionStart) + newText + currentText.substring(selectionEnd);

                                targetTextarea.val(updatedText);
                                targetTextarea.trigger('input');
                                targetTextarea.trigger('change');
                            }
                        });
                    }

                } else if (action === "textAreaBtnP") {
                    if (targetTextarea.length) {
                        Swal.fire({
                            title: $.s('Выберите тег'),
                            input: 'select',
                            inputOptions: {
                                '[l]': $.s('[l] Ожидание щелчка'),
                                '[p]': $.s('[p] Ожидание щелчка и Очистка текстового поля'),
                                '[r]': $.s('[r] Перевод строки'),
                                '[er]': $.s('[er] Удаление текста')
                            },
                            showCancelButton: true,
                            confirmButtonText: $.s('Вставить'),
                            cancelButtonText: $.s('Отмена'),
                            color: "var(--vne-text-color)",
                            background: "var(--vne-right-panel-color)",
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                        }).then((result) => {
                            if (result.isConfirmed && result.value) {
                                const chosenTag = result.value;
                                const currentText = targetTextarea.val();
                                const cursorPos = targetTextarea.prop('selectionStart');
                                const updatedText = currentText.substring(0, cursorPos) + chosenTag + currentText.substring(cursorPos);
                                targetTextarea.val(updatedText);
                                targetTextarea.trigger('input');
                                targetTextarea.trigger('change');
                            }
                        });
                    }
                } else if (action === "textAreaBtnVo") {
                    if (targetTextarea.length) {
                        Swal.fire({
                            title: $.s('Введите название файла'),
                            input: 'text',
                            inputPlaceholder: $.s('Например: filename.ogg или subfolder/filename.ogg'),
                            footer: $.s('Аудио файл должен располагаться по пути data/sound/voiced.'),
                            showCancelButton: true,
                            confirmButtonText: $.s('Вставить'),
                            cancelButtonText: $.s('Отмена'),
                            color: "var(--vne-text-color)",
                            background: "var(--vne-right-panel-color)",
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                        }).then((result) => {
                            if (result.isConfirmed && result.value) {
                                const chosenFileName = result.value.trim();
                                if (chosenFileName) {
                                    const tagToInsert = `[charVoice url="voiced/${chosenFileName}"]`;

                                    const currentText = targetTextarea.val();
                                    const cursorPos = targetTextarea.prop('selectionStart');
                                    const updatedText = currentText.substring(0, cursorPos) + tagToInsert + currentText.substring(cursorPos);

                                    targetTextarea.val(updatedText);
                                    targetTextarea.trigger('input');
                                    targetTextarea.trigger('change');
                                }
                            }
                        });

                    }
                } else if (action === "textAreaBtnFormatText") {
                    if (targetTextarea.length) {
                        Swal.fire({
                            title: $.s('Выберите тег'),
                            input: 'select',
                            inputOptions: {
                                '{bold}': $.s('Жирный текст'),
                                'color': $.s('Цвет'),
                                'small': $.s('Мелкий шрифт'),
                                'abbr': $.s('Аббревиатура'),
                                'i': $.s('Курсив'),
                            },
                            showCancelButton: true,
                            confirmButtonText: $.s('Вставить'),
                            cancelButtonText: $.s('Отмена'),
                            color: "var(--vne-text-color)",
                            background: "var(--vne-right-panel-color)",
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                        }).then((result) => {
                            if (result.isConfirmed && result.value) {
                                if (result.value === 'color') {
                                    let colorPicker;
                                    Swal.fire({
                                        title: $.s('Выберите цвет'),
                                        html: '<div id="color-picker" style="width: 300px !important; height: 300px !important;"></div>',
                                        confirmButtonText: $.s('Выбрать'),
                                        showCancelButton: true,
                                        cancelButtonText: $.s('Отмена'),
                                        color: "var(--vne-text-color)",
                                        background: "var(--vne-right-panel-color)",
                                        showClass: {
                                            popup: 'animate__animated animate__fadeInDown'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__fadeOutUp'
                                        },
                                        didOpen: () => {
                                            colorPicker = Pickr.create({
                                                el: '#color-picker',
                                                theme: 'classic',
                                                swatches: [
                                                    'rgba(244, 67, 54, 1)',
                                                    'rgba(233, 30, 99, 0.95)',
                                                    'rgba(156, 39, 176, 0.9)',
                                                    'rgba(103, 58, 183, 0.85)',
                                                    'rgba(63, 81, 181, 0.8)',
                                                    'rgba(33, 150, 243, 0.75)',
                                                    'rgba(3, 169, 244, 0.7)',
                                                    'rgba(0, 188, 212, 0.7)',
                                                    'rgba(0, 150, 136, 0.75)',
                                                    'rgba(76, 175, 80, 0.8)',
                                                    'rgba(139, 195, 74, 0.85)',
                                                    'rgba(205, 220, 57, 0.9)',
                                                    'rgba(255, 235, 59, 0.95)',
                                                    'rgba(255, 193, 7, 1)'
                                                ],
                                                default: '#000000',
                                                components: {
                                                    preview: true,
                                                    opacity: true,
                                                    hue: true,
                                                    interaction: {
                                                        hex: true,
                                                        rgba: true,
                                                        input: true,
                                                        save: true
                                                    }
                                                }
                                            });
                                        }
                                    }).then((result) => {
                                        if (result.isConfirmed && result.value) {
                                            const color = colorPicker ? colorPicker.getColor().toHEXA().toString() : '';
                                            insertFormattedText('color', color);
                                        }
                                    });
                                    // Добавляем обработчик события для кнопки "Сохранить"
                                    document.addEventListener('click', function(event) {
                                        if (event.target.matches('.pcr-save')) {
                                            colorPicker.hide(); // Закрываем окно выбора цвета при нажатии на кнопку "Сохранить"
                                        }
                                    });
                                } else if (result.value === 'abbr') {
                                    Swal.fire({
                                        title: $.s('Введите текст подсказки'),
                                        input: 'textarea',
                                        confirmButtonText: $.s('Вставить'),
                                        showCancelButton: true,
                                        cancelButtonText: $.s('Отмена'),
                                        color: "var(--vne-text-color)",
                                        background: "var(--vne-right-panel-color)",
                                        showClass: {
                                            popup: 'animate__animated animate__fadeInDown'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__fadeOutUp'
                                        },
                                    }).then((result) => {
                                        if (result.isConfirmed && result.value) {
                                            const abbr_text = result.value;
                                            insertFormattedText('abbr', '', abbr_text);
                                        }
                                    });
                                } else {
                                    insertFormattedText(result.value);
                                }
                            }
                        });

                        function insertFormattedText(tag, color, abbr_text = '') {
                            const selectedText = targetTextarea.val().substring(targetTextarea.prop('selectionStart'), targetTextarea.prop('selectionEnd'));
                            let formattedText = '';
                            if (tag === '{bold}') {
                                formattedText = `{bold}${selectedText}{/bold}`;
                            } else if (tag === 'color') {
                                formattedText = `{color=${color}}${selectedText}{/color}`;
                            } else if (tag === 'small') {
                                formattedText = `{small}${selectedText}{/small}`;
                            } else if (tag === 'abbr') {
                                formattedText = `{abbr="${abbr_text}"}${selectedText}{/abbr}`;
                            } else if (tag === 'i') {
                                formattedText = `{i}${selectedText}{/i}`;
                            }
                            const currentText = targetTextarea.val();
                            const cursorPosStart = targetTextarea.prop('selectionStart');
                            const cursorPosEnd = targetTextarea.prop('selectionEnd');
                            const updatedText = currentText.substring(0, cursorPosStart) + formattedText + currentText.substring(cursorPosEnd);
                            targetTextarea.val(updatedText);
                            targetTextarea.trigger('input').trigger('change');
                        }

                    }
                } else if (action === "textAreaBtnAnimationText") {
                    if (targetTextarea.length) {
                        Swal.fire({
                            title: $.s('Выберите тег'),
                            input: 'select',
                            inputOptions: {
                                'shiningAnim': $.s('Блеск'),
                                'gradient': $.s('Градиент'),
                                'jump': $.s('Прыжки'),
                                'pulse': $.s('Пульс'),
                                'headShake': $.s('Head Shake'),
                                'flip': $.s('Flip'),
                                'jackInTheBox': $.s('Jack In The Box'),
                                'zoomIn': $.s('Zoom In'),
                                'tada': $.s('Tada'),
                            },
                            showCancelButton: true,
                            confirmButtonText: $.s('Вставить'),
                            cancelButtonText: $.s('Отмена'),
                            color: "var(--vne-text-color)",
                            background: "var(--vne-right-panel-color)",
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                        }).then((result) => {
                            insertFormattedText(result.value);
                        });

                        function insertFormattedText(tag = '') {
                            const selectedText = targetTextarea.val().substring(targetTextarea.prop('selectionStart'), targetTextarea.prop('selectionEnd'));
                            let formattedText = '';
                            if (tag === 'shiningAnim') {
                                formattedText = `{shiningAnim}${selectedText}{/shiningAnim}`;
                            } else if (tag === 'gradient') {
                                formattedText = `{gradient}${selectedText}{/gradient}`;
                            } else if (tag === 'jump') {
                                formattedText = `{jump}${selectedText}{/jump}`;
                            } else if (tag === 'pulse') {
                                formattedText = `{pulse}${selectedText}{/pulse}`;
                            } else if (tag === 'headShake') {
                                formattedText = `{headShake}${selectedText}{/headShake}`;
                            } else if (tag === 'flip') {
                                formattedText = `{flip}${selectedText}{/flip}`;
                            } else if (tag === 'jackInTheBox') {
                                formattedText = `{jackInTheBox}${selectedText}{/jackInTheBox}`;
                            } else if (tag === 'zoomIn') {
                                formattedText = `{zoomIn}${selectedText}{/zoomIn}`;
                            } else if (tag === 'headShake') {
                                formattedText = `{tada}${selectedText}{/tada}`;
                            }
                            const currentText = targetTextarea.val();
                            const cursorPosStart = targetTextarea.prop('selectionStart');
                            const cursorPosEnd = targetTextarea.prop('selectionEnd');
                            const updatedText = currentText.substring(0, cursorPosStart) + formattedText + currentText.substring(cursorPosEnd);
                            targetTextarea.val(updatedText);
                            targetTextarea.trigger('input').trigger('change');
                        }

                    }
                } else {
                    console.log('Textarea not found with cid=' + cid);
                }
            } else {
                console.log('Textarea not found');
            }
        });
    }
});


const readFileAsync = util.promisify(fsW.readFile);
const writeFileAsync = util.promisify(fsW.writeFile);

async function changeGlobalLangInFile(newLang) {
    try {
        const filepath = pathF.resolve(__dirname, './tyrano.html');
        const data = await readFileAsync(filepath, 'utf8');
        const updatedContent = data.replace(/var\s+global_lang\s*=\s*["'][^"']*["']/g, `var global_lang = "${newLang}"`);
        await writeFileAsync(filepath, updatedContent, 'utf8');
        console.log('Global language updated in the file');
    } catch (err) {
        console.error('Error processing the file:', err);
    }
}

function modifyAlertifyFile(language) {
    const filePath = pathF.join(__dirname, '/js/libs/alertify.min.js');
    console.log(filePath)
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;
        let modifiedData;
        if (language === 'english') {
            modifiedData = data.replace(/ok: "Принять",\s*cancel: "Отмена"/, 'ok: "Accept", cancel: "Cancel"');
        } else if (language === 'Russian') {
            modifiedData = data.replace(/ok: "Accept",\s*cancel: "Cancel"/, 'ok: "Принять", cancel: "Отмена"');
        }
        if (modifiedData) {
            fs.writeFile(filePath, modifiedData, 'utf-8', (err) => {
                if (err) throw err;
                console.log('File has been modified based on language selection.');
            });
        }
    });
}



const selectLangInterfaces = document.querySelector('#select_lang_interfaces')
if (selectLangInterfaces) {
    let global_lang = localStorage.getItem('selectedLang') || 'ru';
    selectLangInterfaces.value = global_lang;

    selectLangInterfaces.addEventListener('change', async (event) => {
        global_lang = event.target.value;
        localStorage.setItem('selectedLang', global_lang);
        await changeGlobalLangInFile(global_lang);
        let selectedLang = selectLangInterfaces.value;
        if (selectedLang === 'en') {
            modifyAlertifyFile('english');
        } else if (selectedLang === 'ru') {
            modifyAlertifyFile('Russian');
        } else if (selectedLang === 'ja') {
            modifyAlertifyFile('Japanese');
        } else if (selectedLang === 'ko') {
            modifyAlertifyFile('Korean');
        } else if (selectedLang === 'af') {
            modifyAlertifyFile('Afrikaans');
        } else if (selectedLang === 'ar') {
            modifyAlertifyFile('Arabic');
        } else if (selectedLang === 'be') {
            modifyAlertifyFile('Belarusian');
        } else if (selectedLang === 'de') {
            modifyAlertifyFile('German');
        } else if (selectedLang === 'es') {
            modifyAlertifyFile('Spanish');
        } else if (selectedLang === 'fr') {
            modifyAlertifyFile('French');
        } else if (selectedLang === 'it') {
            modifyAlertifyFile('Italian');
        } else if (selectedLang === 'tr') {
            modifyAlertifyFile('Turkish');
        } else if (selectedLang === 'zh-CN') {
            modifyAlertifyFile('Chinese (Simplified)');
        }
        location.reload();
    });
}


function replaceFileLang() {
    const sceneFilePath = app.getProjectPath() + 'data/scenario/scene1.ks';
    const titleScreenFilePath = app.getProjectPath() + 'data/scenario/title_screen.ks';
    const langJsFilePath = app.getProjectPath() + 'tyrano/lang.js';
    const language = global_lang;

    fs.readFile(sceneFilePath, 'utf-8', (err, data) => {
        if (err) throw err;
        let modifiedSceneData;
        if (language === 'en') {
            modifiedSceneData = data.replace(/Привет\.\[p\]\nЭто новый игровой проект\.\[p\]/, 'Hello.[p]\nIt\'s a new game project.[p]');
        } else if (language === 'ru') {
            modifiedSceneData = data.replace('Hello.[p]\nIt\'s a new game project.[p]', 'Привет.[p] \n Это новый игровой проект.[p]');
        }
        if (modifiedSceneData) {
            fs.writeFile(sceneFilePath, modifiedSceneData, 'utf-8', (err) => {
                if (err) throw err;
                console.log('scene1.ks has been modified based on language selection.');
            });
        }
    });
    fs.readFile(titleScreenFilePath, 'utf-8', (err, data) => {
        if (err) throw err;
        let modifiedSceneData = data;  // Инициализация переменной
        if (language === 'en') {
            modifiedSceneData = modifiedSceneData.replace(/\[glink color="black" text="Новая Игра" x=75 y=370 size=20 target="\*start"\]/, '[glink color="black" text="New&nbsp;Game" x=75 y=370 size=20 target="*start"]');
            modifiedSceneData = modifiedSceneData.replace(/\[glink color="black" text="Загрузить Игру" x=75 y=470 size=20 target="\*load"\]/, '[glink color="black" text="Loading&nbsp;Game" x=75 y=470 size=20 target="*load"]');
        } else if (language === 'ru') {
            modifiedSceneData = modifiedSceneData.replace(/\[glink color="black" text="New&nbsp;Game" x=75 y=370 size=20 target="\*start"\]/, '[glink color="black" text="Новая&nbsp;Игра" x=75 y=370 size=20 target="*start"]');
            modifiedSceneData = modifiedSceneData.replace(/\[glink color="black" text="Loading&nbsp;Game" x=75 y=470 size=20 target="\*load"\]/, '[glink color="black" text="Загрузить&nbsp;Игру" x=75 y=470 size=20 target="*load"]');
        }
        if (modifiedSceneData !== data) {
            fs.writeFile(titleScreenFilePath, modifiedSceneData, 'utf-8', (err) => {
                if (err) throw err;
                console.log('title_screen.ks has been modified based on language selection.');
            });
        }
    });
    fs.readFile(langJsFilePath, 'utf-8', (err, data) => {
        if (err) throw err;

        const langData = eval(data);

        const languageReplacements = {
            en: {
                "go_title": "Back to the home screen?",
                "exit_game": "Close the window and quit the game?",
                "not_saved": "Empty save slot",
                "tag": "Tag name",
                "not_exists": "Couldn't find",
                "error": "An error has occurred. Check the script code",
                "label": "Label",
                "label_double": "Has more than one occurrence in the scene file",
                "error_occurred": "An error has occurred. Check the script code",
                "save_file_violation_1": "Storage data has been detected. Only download data from a reliable source!",
                "save_file_violation_2": "Load a save and start the game?",
                "save_file_violation_3": "The startup has been interrupted. Please delete the saved data and restart.",
                "reload": "Reboot",
                "cancel": "Cancel",
                "Ok": "Confirm",
                "save":"Save",
                "title_setting": "Game settings",
                "settings_vc": "Music volume:",
                "settingsSe": "Volume of sounds:",
                "settings_Vo": "Voice volume:",
                "migration": "Confirmation of migration",
                "go_to_migration": "Do you want to migrate variables from the previous episode to the current episode?",
                "migration_confirm": "The migration was successful.",
                "used_button": "Use",
                "migration_finished": "After <b></b> ms the application will close, then start it again.",
            },
            ru: {
                "go_title":"Вернуться на начальный экран?",
                "exit_game":"Закрыть окно и выйти из игры?",
                "not_saved":"Пустой слот сохранения",
                "tag":"Название тега",
                "not_exists":"Не удалось найти",
                "error":"Произошла ошибка.",
                "label":"Ярлык",
                "label_double":"Имеет более одного вхождения в файл сцены",
                "error_occurred":"Произошла ошибка. Проверьте код сценария",
                "save_file_violation_1":"Данные сохранения обнаружены. Загружайте данные только из надежного источника!",
                "save_file_violation_2":"Загрузить сохранение и начать игру?",
                "save_file_violation_3":"Запуск прерван. Пожалуйста, удалите сохраненные данные и перезапустите.",
                "reload":"Перезагрузка",
                "cancel":"Отмена",
                "Ok":"Подтвердить",
                "save": "Сохранить",
                "title_setting": "Настройки игры",
                "settings_vc": "Громкость музыки:",
                "settingsSe": "Громкость звуков:",
                "settings_Vo": "Громкость голоса:",
                "migration": "Подтверждение миграции",
                "go_to_migration": "Вы хотите выполнить миграцию переменных из предыдущего эпизода в текущий?",
                "migration_confirm": "Миграция выполнена успешно.",
                "used_button": "Использовать",
                "migration_finished": "Через <b></b> мс приложенеи закроется, после этого запустите его снова.",
            }
        };

        if (langData.word) {
            for (const key in langData.word) {
                if (languageReplacements[language] && languageReplacements[language][key]) {
                    langData.word[key] = languageReplacements[language][key];
                }
            }
        }

        const modifiedData = `window.tyrano_lang = ${JSON.stringify(langData, null, 4)};\n`;

        if (modifiedData !== data) {
            fs.writeFile(langJsFilePath, modifiedData, 'utf-8', (err) => {
                if (err) throw err;
                console.log('Lang.js has been modified based on language selection.');
            });
        }
    });

    location.reload();
}


async function checkAndUpdateApp() {
    const updateInfoUrl = 'https://vne.idglab.pro/update_file/tbn/updateInfo.json';

    request(updateInfoUrl, async (error, response, body) => {
        if (error) {
            console.error($.s('Ошибка при проверке обновления:'), error);
            return;
        }

        const versionData = JSON.parse(fsW.readFileSync('./version.json', 'utf-8'));
        const localVersion = versionData.version;

        const updateInfo = JSON.parse(body);

        if (localVersion !== updateInfo.version) {
            const downloadUrl = updateInfo.download_url;
            const archivePath = './app_update.zip';

            if (!fsW.existsSync(archivePath) || fsW.statSync(archivePath).size === 0) {
                const downloadRequest = request(downloadUrl);
                const fileStream = fsW.createWriteStream(archivePath);

                const downloadSwal = Swal.fire({
                    title: $.s('Загрузка обновления'),
                    html: '<div class="progress"><div class="progress-bar"></div></div>',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    color: "var(--vne-text-color)",
                    background: "var(--vne-right-panel-color)"
                });

                downloadRequest.on('response', (response) => {
                    const totalBytes = parseInt(response.headers['content-length'], 10);
                    let receivedBytes = 0;

                    response.on('data', (chunk) => {
                        receivedBytes += chunk.length;
                        const progressPercentage = Math.round((receivedBytes / totalBytes) * 100);
                        updateProgressBar(progressPercentage);
                    });
                });

                downloadRequest.pipe(fileStream);

                fileStream.on('finish', async () => {
                    Swal.close();
                    await askForUpdate(archivePath, updateInfo);
                });
            } else {
                await askForUpdate(archivePath, updateInfo);
            }
        } else {}
    });


    async function askForUpdate(archivePath, updateInfo) {
        const result = await Swal.fire({
            title: $.s('Обновление'),
            text: $.s('Обновление доступно. Закрыть приложение для установки?'),
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: $.s('Да'),
            cancelButtonText: $.s('Нет'),
            color: "var(--vne-text-color)",
            background: "var(--vne-right-panel-color)"
        });

        if (result.isConfirmed) {
            ipcRenderer.send('update-confirmed', { archivePath, updateInfo: updateInfo });
        }
    }

    function updateProgressBar(progressPercentage) {
        const progressBar = document.querySelector('.swal2-container .progress-bar');
        if (progressBar) {
            progressBar.style.width = progressPercentage + '%';
        }
    }
}
window.addEventListener('DOMContentLoaded', () => {
    checkAndUpdateApp();
    setInterval(checkAndUpdateApp, 30 * 60 * 1000);
});

const updateProjectFilesEng = document.getElementById("updateProjectFilesEng")
$(function () {
    if (updateProjectFilesEng) {
        if (global_lang === 'ru') {
            updateProjectFilesEng.style.display = 'none';
        } else {
            updateProjectFilesEng.style.display = 'block';
        }
    }
})

$(function () {
    const sceneList = document.getElementById('vne_list_scene');
    if (sceneList !== "") {
        function getSelectedValue() {
            return sceneList.value;
        }
        window.getSelectedValue = getSelectedValue;
    }
})

function createMapLabel() {
    const path = require('path');
    function scanFilesForText(directory, excludedFiles, searchText) {
        // Получение списка файлов в директории
        fs.readdir(directory, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }

            // Фильтрация списка файлов для исключения нежелательных файлов и поддиректорий
            const targetFiles = files.filter(file => {
                return !excludedFiles.includes(file) && fs.lstatSync(path.join(directory, file)).isFile();
            });

            // Инициализация объекта для хранения результатов
            const result = {};

            // Обработка каждого файла
            targetFiles.forEach(file => {
                const filePath = path.join(directory, file);
                const content = fs.readFileSync(filePath, 'utf8');
                const lines = content.split('\n');
                const matchedLines = lines.filter(line => line.startsWith(searchText));
                if (matchedLines.length > 0) {
                    result[file] = matchedLines;
                }
            });


            // Преобразование исходного объекта result в новый формат
            const newResult = {};
            Object.keys(result).forEach(fileKey => {
                newResult[fileKey] = {
                    title: "Заголовок для " + fileKey,  // Здесь вы можете указать свой заголовок
                    labels: result[fileKey].map(labelKey => {
                        return {
                            label: labelKey,
                            title: "Название для " + labelKey,  // Здесь вы можете указать свой заголовок
                            display: true  // Или установите другое значение в зависимости от вашей логики
                        };
                    })
                };
            });

            // Сохранение нового объекта в файл
            const outputFilePath = app.getProjectPath() + "/data/system/labelListMap.json";

            let existingData = {};

            // Проверка наличия файла
            if (fs.existsSync(outputFilePath)) {
                // Чтение существующего файла
                const existingContent = fs.readFileSync(outputFilePath, 'utf8');
                try {
                    // Парсинг существующего содержимого файла в объект
                    existingData = JSON.parse(existingContent);
                } catch (error) {
                    console.error('Error parsing existing file:', error);
                }
            }

            // Объединение существующих данных с новыми данными
            const updatedData = {...existingData, ...newResult};

            // Запись обновленных данных обратно в файл
            Swal.fire({
                title: $.s('Подождите...'),
                text: $.s('Выполняется сохранение данных'),
                color: "var(--vne-text-color)",
                background: "var(--vne-right-panel-color)",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                    // Запускаем операцию записи в файл
                    fs.writeFileSync(outputFilePath, JSON.stringify(updatedData, null, 2), 'utf8');
                    setTimeout(() => {
                        Swal.fire({
                            title: $.s('Готово'),
                            text: $.s('Сохранение завершено'),
                            icon: 'success',
                            color: "var(--vne-text-color)",
                            background: "var(--vne-right-panel-color)",
                            timer: 1500,
                            timerProgressBar: true,
                            showConfirmButton: false
                        });
                    }, 3000);
                },
            });

        })
    }

    const directory = app.getProjectPath() + 'data/scenario/';
    const excludedFiles = [
        '_preview.ks',
        'first.ks',
        'make.ks',
        'config.ks',
        'title_screen.ks'
    ];
    const searchText = '*';

    Swal.fire({
        title: $.s('ВНИМАНИЕ!'),
        text: $.s('Создавайте карту игры уже под конец разработки, когда вы будете точно уверены что в игре больше не появится Меток.'),
        icon: 'warning',
        showCancelButton: true,
        color: "var(--vne-text-color)",
        background: "var(--vne-right-panel-color)",
        confirmButtonText: $.s('Да'),
        cancelButtonText: $.s('Отмена')
    }).then((result) => {
        if (result.isConfirmed) {
            scanFilesForText(directory, excludedFiles, searchText);
        }
    });
}

function gridBg() {
    function createBackgroundGrid(gridSize = 20) {
        function generateGridBackground(width, height, span) {
            console.warn("Work")
            const cnv = document.createElement("canvas");
            cnv.width = width;
            cnv.height = height;
            const ctx = cnv.getContext("2d");
            ctx.strokeStyle = "#eee";
            const w = cnv.width - 1;
            const h = cnv.height - 1;

            for (let x = -0.5; x < w; x += span) {
                ctx.strokeRect(x, 0, 0.1, h);
            }
            for (let y = -0.5; y < h; y += span) {
                ctx.strokeRect(0, y, w, 0.1);
            }

            return cnv.toDataURL();
        }
        const containerWidth = app.tyrano.config.scWidth;
        const containerHeight = app.tyrano.config.scHeight;

        $('.pixel').css("background-image", "url('" + generateGridBackground(containerWidth, containerHeight, gridSize) + "')");
        $('#bound_select, .bound_select, .fullscreen, .chara_name_area, .message_outer, .save, .load, .title, .menu, .window, .skip, .backlog, .quicksave, .quickload, .auto, .config').each(function() {
            var $this = $(this);
            var initLeft = Math.round($this.position().left / gridSize) * gridSize;
            var initTop = Math.round($this.position().top / gridSize) * gridSize;

            $this.draggable({
                grid: [gridSize, gridSize]
            });

            $this.css({
                left: initLeft,
                top: initTop
            });
        });

        var gridDropdown = document.createElement('select');
        gridDropdown.title = "Grid size";
        gridDropdown.style.position = 'absolute';
        gridDropdown.style.bottom = '10px';
        gridDropdown.style.right = '10px';
        gridDropdown.style.zIndex = '1000000';

        var gridSizes = [5, 10, 20, 50, 100];
        gridSizes.forEach(size => {
            var option = document.createElement('option');
            option.value = size;
            option.textContent = size + 'px';
            if (size === gridSize) {
                option.selected = true;
            }
            gridDropdown.appendChild(option);
        });

        gridDropdown.addEventListener('change', function () {
            var newGridSize = parseInt(this.value, 10);
            createBackgroundGrid(newGridSize); // вызываем функцию для смены сетки
        });

        document.getElementById('bound_area').appendChild(gridDropdown);
    }

    let savedGridSize = parseInt(localStorage.getItem('gridSize'), 10) || 10;
    createBackgroundGrid(savedGridSize);

    function changeGridSize(newSize) {
        localStorage.setItem('gridSize', newSize);
        createBackgroundGrid(newSize);
    }

    let gridDropdown = document.createElement('select');
    gridDropdown.classList.add('vne-md-content');
    if (global_lang === "ru") {
        gridDropdown.title = "Размер сетки";
    } else if (global_lang === "en") {
        gridDropdown.title = "Grid size";
    }

    gridDropdown.style.position = 'absolute';
    gridDropdown.style.border = 'none';
    gridDropdown.style.bottom = '0';
    gridDropdown.style.right = '0';
    gridDropdown.style.zIndex = '1000000';
    const gridSizes = [5, 10, 20, 50, 100];

    gridSizes.forEach(size => {
        let option = document.createElement('option');
        option.value = size;
        option.textContent = size + 'px';

        if (size === savedGridSize) {
            option.selected = true;
        }
        gridDropdown.appendChild(option);
    });

    gridDropdown.addEventListener('change', function () {
        changeGridSize(parseInt(this.value, 10));
    });

    document.getElementById('bound_area').appendChild(gridDropdown);
}

function adaptiveUI() {
    function findElementPeriodically(selector, callback) {
        const observer = new MutationObserver((mutations, obs) => {
            const element = document.querySelector(selector);
            if (element) {
                callback(element);
                // obs.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
        });
    }

    findElementPeriodically(`[data-uiID="${$.s("Изображение перекрытия")}"]`, (element) => {
        const blendType = document.querySelector(`[data-uiid="${$.s("Тип смешивания")}"]`)
        const op = document.querySelector(`[data-uiid="${$.s("Прозрачность перекрытия")}"]`);
        const ziNdex = document.querySelector(`[data-uiid="${$.s("Высота перекрытия")}"]`);

        if (element) {
            const img = element.querySelector("img");
            if (img && img.src.includes("_new/assets/img/no_image.jpg")) {
                blendType.style.display = "none";
                op.style.display = "none"
                ziNdex.style.display = "none"
            } else {
                blendType.style.display = "block";
                op.style.display = "block"
                ziNdex.style.display = "block"
            }
        }

        const input = document.querySelector('.form-check .checkbox');
        const colorLeft = document.querySelector(`[data-uiid="${$.s("Цвет фона сообщения слева")}"]`);
        const colorRight = document.querySelector(`[data-uiid="${$.s("Цвет фона сообщения справа")}"]`);
        const colorCenter = document.querySelector(`[data-uiid="${$.s("Цвет фона сообщения по центру")}"]`);
        const bgLeft = document.querySelector(`[data-uiid="${$.s("Изображение фона сообщения слева")}"]`);
        const bgRight = document.querySelector(`[data-uiid="${$.s("Изображение фона сообщения справа")}"]`);
        const bgCenter = document.querySelector(`[data-uiid="${$.s("Изображение фона сообщения по центру")}"]`);

        if (input.checked === true) {
            colorLeft.style.display = "none";
            colorRight.style.display = "none"
            colorCenter.style.display = "none"
            bgLeft.style.display = "block";
            bgRight.style.display = "block"
            bgCenter.style.display = "block"
        } else {
            colorLeft.style.display = "block";
            colorRight.style.display = "block"
            colorCenter.style.display = "block"
            bgLeft.style.display = "none";
            bgRight.style.display = "none"
            bgCenter.style.display = "none"
        }

        element.style.display = "block"
    });


    findElementPeriodically(`[data-uiID="${$.s("Видео в чате")}"]`, (element) => {
        const controlButton = document.querySelector(`[data-uiid="${$.s("Элементы управления виде")}"]`)
        const loopVideo = document.querySelector(`[data-uiid="${$.s("Зациклить видео")}"]`);
        const pos = document.querySelector(`[data-uiid="${$.s("Позиция")}"]`);
        const videoEl = document.querySelector(`[data-uiid="${$.s("Видео в чате")}"]`);
        const audioEl = document.querySelector(`[data-uiid="${$.s("Выбор музыки")}"]`);
        const img = document.querySelector(`[data-uiid="${$.s("Изображение в чате")}"]`);

        if (pos) {
            const select = pos.querySelector('.vne-ep-select');
            if (select) {
                const selectedValue = select.value;
                if (selectedValue === 'center') {
                    controlButton.style.display = "none";
                    loopVideo.style.display = "none"
                    videoEl.style.display = "none";
                    img.style.display = "none"
                    audioEl.style.display = "none"
                } else {
                    controlButton.style.display = "block";
                    loopVideo.style.display = "block"
                    videoEl.style.display = "block";
                    img.style.display = "block"
                    audioEl.style.display = "block"

                    if (element) {
                        const video = element.querySelector("video");
                        if (video && video.src.includes("/data/video/undefined")) {
                            controlButton.style.display = "none";
                            loopVideo.style.display = "none"
                        } else {
                            controlButton.style.display = "block";
                            loopVideo.style.display = "block"
                        }
                    }
                }
            }
        }
    });

    findElementPeriodically(`[data-uiID="${$.s("Тип кнопки")}"]`, (element) => {
        const chatButtonBG = document.querySelector(`[data-uiid="${$.s("Фон кнопки чата")}"]`)
        const chatButtonBG2 = document.querySelector(`[data-uiid="${$.s("Ховер кнопки чата")}"]`)
        const styleButton = document.querySelector(`[data-uiid="${$.s("Дизайн кнопки")}"]`)
        const chatText = document.querySelector(`[data-uiid="${$.s("Текст кнопки")}"]`)

        if (element) {
            const select = element.querySelector('.vne-ep-select');
            if (select) {
                const selectedValue = select.value;
                if (selectedValue === 'default') {
                    chatButtonBG.style.display = "none";
                    chatButtonBG2.style.display = "none";
                } else {
                    chatButtonBG.style.display = "block";
                    chatButtonBG2.style.display = "block";
                    styleButton.style.display = "none";
                    chatText.style.display = "none";
                }
            }
        }
    });

    findElementPeriodically(`[name="actionTimeTitle"]`, (element) => {
        const fontSize = document.querySelector(`[data-uiid="${$.s("Размер шрифта")}"]`)
        const editFont = document.querySelector(`[data-uiid="${$.s("Изменить шрифт")}"]`)
        const fontColor = document.querySelector(`[data-uiid="${$.s("Цвет текста")}"]`)
        const textY = document.querySelector(`[data-uiid="${$.s("Положение текста по Y")}"]`)
        const textX = document.querySelector(`[data-uiid="${$.s("Положение текста по X")}"]`)
        if (element && element.value === "") {
            fontSize.style.display = "none";
            editFont.style.display = "none";
            fontColor.style.display = "none";
            textY.style.display = "none";
            textX.style.display = "none";
        } else {
            fontSize.style.display = "block";
            editFont.style.display = "block";
            fontColor.style.display = "block";
            textY.style.display = "block";
            textX.style.display = "block";
        }
    });

    findElementPeriodically(`[name="actionProgressTitle"]`, (element) => {
        const fontSize = document.querySelector(`[data-uiid="${$.s("Размер шрифта")}"]`)
        const editFont = document.querySelector(`[data-uiid="${$.s("Изменить шрифт")}"]`)
        const fontColor = document.querySelector(`[data-uiid="${$.s("Цвет текста")}"]`)
        const textY = document.querySelector(`[data-uiid="${$.s("Положение текста по Y")}"]`)
        const textX = document.querySelector(`[data-uiid="${$.s("Положение текста по X")}"]`)
        if (element && element.value === "") {
            fontSize.style.display = "none";
            editFont.style.display = "none";
            fontColor.style.display = "none";
            textY.style.display = "none";
            textX.style.display = "none";
        } else {
            fontSize.style.display = "block";
            editFont.style.display = "block";
            fontColor.style.display = "block";
            textY.style.display = "block";
            textX.style.display = "block";
        }
    });

    findElementPeriodically(`[data-uiID="${$.s("Тип эффекта")}"]`, (element) => {
        const imageTextured = document.querySelector(`[data-uiid="${$.s("Текстура изображения")}"]`)
        const videoTextured = document.querySelector(`[data-uiid="${$.s("Видео текстура")}"]`)
        const videoLoop = document.querySelector(`[data-uiid="${$.s("Повтор видео")}"]`)

        if (element) {
            const select = element.querySelector('.vne-ep-select');
            if (select) {
                const selectedValue = select.value;
                if (selectedValue === 'img') {
                    imageTextured.style.display = "block";
                    videoTextured.style.display = "none";
                    videoLoop.style.display = "none";
                } else {
                    imageTextured.style.display = "none";
                    videoTextured.style.display = "block";
                    videoLoop.style.display = "block";
                }
            }
        }
    });

    findElementPeriodically(`[data-uiID="${$.s("Тип объекта")}"]`, (element) => {
        const o1 = document.querySelector(`[data-uiid="${$.s("Горизонтальное положение (Х)")}"]`)
        const o2 = document.querySelector(`[data-uiid="${$.s("Вертикальное положение (Y)")}"]`)
        const o3 = document.querySelector(`[data-uiid="${$.s("Ширина")}"]`)
        const o4 = document.querySelector(`[data-uiid="${$.s("Высота")}"]`)

        if (element) {
            o1.style.display = "none"
            o2.style.display = "none"
            o3.style.display = "none"
            o4.style.display = "none"
        }
    });

    findElementPeriodically(`[data-name-component="${$.s("Начало условия")}"]`, (startElement) => {
        const endElement = document.querySelector(`[data-name-component="${$.s("Конец условия")}"]`);

        if (startElement && endElement) {
            let currentElement = startElement.nextElementSibling;
            while (currentElement && currentElement !== endElement) {
                currentElement.style.backgroundColor = "#4c2d807a";
                currentElement.style.setProperty('margin', '4px 5px 0px 28px', 'important');
                currentElement = currentElement.nextElementSibling;
            }
        }
    });

    findElementPeriodically(`[data-name-component="${$.s("Создать анимацию")}"]`, (startElement) => {
        const endElement = document.querySelector(`[data-name-component="${$.s("Закрыть анимацию")}"]`);

        if (startElement && endElement) {
            let currentElement = startElement.nextElementSibling;
            while (currentElement && currentElement !== endElement) {
                currentElement.style.backgroundColor = "#47824194";
                currentElement.style.setProperty('margin', '4px 5px 0px 28px', 'important');
                currentElement = currentElement.nextElementSibling;
            }
        }
    });

    findElementPeriodically(`[data-name-component="${$.s("Объявление макроса")}"]`, (startElement) => {
        const endElement = document.querySelector(`[data-name-component="${$.s("Закрытие макроса")}"]`);

        if (startElement && endElement) {
            let currentElement = startElement.nextElementSibling;
            while (currentElement && currentElement !== endElement) {
                currentElement.style.backgroundColor = "#622da175";
                currentElement.style.setProperty('margin', '4px 5px 0px 28px', 'important');
                currentElement = currentElement.nextElementSibling;
            }
        }
    });

    findElementPeriodically(`[data-name-component="${$.s("Отображение HTML")}"]`, (startElement) => {
        const endElement = document.querySelector(`[data-name-component="${$.s("Закрытие HTML")}"]`);

        if (startElement && endElement) {
            let currentElement = startElement.nextElementSibling;
            while (currentElement && currentElement !== endElement) {
                currentElement.style.backgroundColor = "#622da175";
                currentElement.style.setProperty('margin', '4px 5px 0px 28px', 'important');
                currentElement = currentElement.nextElementSibling;
            }
        }
    });

    findElementPeriodically(`[data-uiID="${$.s("Текст сообщения")}"]`, (element) => {
        if (!element.querySelector('.info-icon')) {
            const infoIcon = document.createElement('span');
            infoIcon.innerHTML = '&#63;';
            infoIcon.style.cssText = 'cursor: pointer; background-color: #6c4aa49e; border-radius: 10%; padding: 5px !important; margin-left: 5px; top: -85px;right: -205px; position: relative;';
            infoIcon.className = 'info-icon';

            infoIcon.onclick = function() {
                Swal.fire({
                    title: $.s('<strong>Подсказка по тегам чата</strong>'),
                    html: $.s(`<p>Теги, которые разрешено использовать в чате: <br><br>
                            1. <span class="copy-text" data-text="{f.var}">{f.var}</span> - выводит значение переменной, также работает и с sf. <br><br>
                            2. <span class="copy-text" data-text="{time}">{time}</span> - выводит реальное время. <br><br>
                            3. <span class="copy-text" data-text="{osname}">{osname}</span> - выводит название операционной системы. <br><br>
                            4. <span class="copy-text" data-text="{username}">{username}</span> - выводит имя пользователя <br><br>
                            5. <span class="copy-text" data-text="{year}">{year}</span> - выводит год. <br><br>
                            6. <span class="copy-text" data-text="{img=name.png,s=20}">{img=name.png,s=20}</span> - вставляет картинку в чат, s отвечает за размер картинки.</p>`),
                    showCloseButton: false,
                    focusConfirm: false,
                    didRender: () => {
                        document.querySelectorAll('.copy-text').forEach(element => {
                            element.style.cssText = 'cursor: pointer; background-color: #bb3e50; border-radius: 5%; padding: 5px !important; color:"#000000";';
                            element.onclick = () => {
                                navigator.clipboard.writeText(element.getAttribute('data-text')).then(() => {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: $.s('Скопировано'),
                                        showConfirmButton: false,
                                        timer: 1000,
                                        color: "var(--vne-text-color)",
                                        background: "var(--vne-right-panel-color)",
                                        timerProgressBar: true,
                                    });
                                }).catch(err => {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: $.s('Ошибка при копировании'),
                                        showConfirmButton: false,
                                        timer: 1000,
                                        color: "var(--vne-text-color)",
                                        background: "var(--vne-right-panel-color)",
                                        timerProgressBar: true,
                                    });
                                });
                            };
                        });
                    },
                    color: "var(--vne-text-color)",
                    background: "var(--vne-right-panel-color)"
                });
            };
            element.appendChild(infoIcon);
        }
    });

    findElementPeriodically(`[data-uiID="${$.s("Настройки для")}"]`, (element) => {
        const bgSmall = document.querySelector(`[data-uiid="${$.s("Фон S")}"]`)
        const cellSmall = document.querySelector(`[data-uiid="${$.s("Ячейка S")}"]`)
        const cellBig = document.querySelector(`[data-uiid="${$.s("Ячейка B")}"]`)
        const bgBig = document.querySelector(`[data-uiid="${$.s("Фон B")}"]`)
        const close = document.querySelector(`[data-uiid="${$.s("Кнопка закрытия B")}"]`)
        const cellCount = document.querySelector(`[data-uiid="${$.s("Количество ячеек")}"]`)
        const columnCount = document.querySelector(`[data-uiid="${$.s("Количество колонок")}"]`)


        if (element) {
            const select = element.querySelector('.vne-ep-select').value;
            if (select === 'small') {
                bgSmall.style.display = "block"
                cellSmall.style.display = "block"
                close.style.display = "none"
                bgBig.style.display = "none";
                cellBig.style.display = "none";
                cellCount.style.display = "none";
                columnCount.style.display = "none";
            } else {
                bgSmall.style.display = "none";
                cellSmall.style.display = "none";
                bgBig.style.display = "block"
                cellBig.style.display = "block"
                close.style.display = "block"
                cellCount.style.display = "block"
                columnCount.style.display = "block"
            }
        }
    });
}
adaptiveUI();

$(document).ready(function() {
    let savedSettings = localStorage.getItem('windowSettingGameExport');
    let listSize = $('#vne_list_size_screen');
    let resolutionSettings = $('#fullScreenEnter');

    if (savedSettings) {
        savedSettings = JSON.parse(savedSettings);
        listSize.val(savedSettings.selectedOption).trigger('change');
        if (savedSettings.displayMode !== undefined) {
            let mode = savedSettings.displayMode ? 'fullScreenEnter' : 'false';
            resolutionSettings.val(mode);
        }
    }

    listSize.change(function() {
        const selectedOption = $(this).val();
        let scWidth, scHeight;
        switch (selectedOption) {
            case '1':
                scHeight = 720;
                scWidth = 1280;
                break;
            case '2':
                scHeight = 1080;
                scWidth = 1920;
                break;
            case '3':
                break;
            default:
                return;
        }

        savedSettings = localStorage.getItem('windowSettingGameExport');
        if (savedSettings) {
            savedSettings = JSON.parse(savedSettings);
        } else {
            savedSettings = {};
        }

        savedSettings.selectedOption = selectedOption;
        savedSettings.scWidth = scWidth;
        savedSettings.scHeight = scHeight;

        localStorage.setItem('windowSettingGameExport', JSON.stringify(savedSettings));
    }).trigger('change');

    resolutionSettings.change(function() {
        const selectedOption = $(this).val();
        let fullScreen = (selectedOption === 'fullScreenEnter');

        savedSettings = localStorage.getItem('windowSettingGameExport');
        if (savedSettings) {
            savedSettings = JSON.parse(savedSettings);
        } else {
            savedSettings = {};
        }

        savedSettings.displayMode = fullScreen;

        localStorage.setItem('windowSettingGameExport', JSON.stringify(savedSettings));
    });
});

function scanImageTranslate() {
    const fs = require('fs');
    const path = require('path');

    function scanDirectory(directory, fileList = []) {
        const files = fs.readdirSync(directory);
        files.forEach((file) => {
            const filePath = path.join(directory, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                scanDirectory(filePath, fileList);
            } else if (stats.isFile()) {

                if (['.png',
                    '.jpg',
                    '.jpeg',
                    '.gif',
                    '.bmp',
                    '.tiff',
                    '.webp',
                    '.svg',
                    '.apng',
                    '.heic',
                    '.ico'
                ].includes(path.extname(file).toLowerCase())) {
                    fileList.push(file);
                }
            }
        });
        return fileList;
    }

    function generateImageList(directory, outputFile) {
        const imageList = scanDirectory(directory);
        const jsonContent = JSON.stringify(imageList, null, 2);

        fs.writeFileSync(outputFile, jsonContent, 'utf8');
        console.log(`The list of images is saved in ${outputFile}`);
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: $.s("Изображения извлечены!"),
            color: "var(--vne-text-color)",
            background: "var(--vne-right-panel-color)",
            showConfirmButton: false,
            timer: 3000,
            toast: true
        });
    }

    const directoryPath = app.getProjectPath() + './data/lang/img';
    const outputFilePath = app.getProjectPath() + './data/lang/img/images.json';

    generateImageList(directoryPath, outputFilePath);

}