Builder.Core.App = Builder.Core.Base.extend({
    version: "2.3.1",
    m_version: "A",
    build: "",
    defaults: {},
    tyrano: {
        project_name: "",
        current_edit_scenario: "",
        config: {},
        scenario: {},
        component: {},
        tyrano_lang: {},
        keyconfig: {}
    },
    define: {},
    parser: {},
    io: {},
    view: {},
    component: {},
    param: {},
    window: {},
    tree: {},
    exe_path: "",
    os: "",
    lang: "",
    local: {},
    array_files: [],
    tmp: {
        map_label: {},
        modified_scenario: !1,
        selected_context_scenario: "",
        select_component_in_reopen: "",
        select_component_in_line: "",
        preview_from_line: 0,
        preview_scenario: "",
        reload_code: !0,
        debug_ipc_event: !1,
        current_nav: "component",
        array_tab_scene: []
    },
    initialize: function () {
        this.build = global_build,
            this.lang = global_lang,
            this.parser = new Builder.Core.Parser(this),
            this.io = new Builder.Core.Io(this),
            this.view = new Builder.Core.View(this),
            this.def = new Builder.Core.Define(this),
            this.component = new Builder.Core.Component(this),
            this.param = new Builder.Core.Param(this),
            this.gui = new Builder.Core.Gui(this),
            this.window = new Builder.Core.Window(this),
            this.config = new Builder.Core.Config(this),
            this.setting = new Builder.Core.Setting(this),
            this.plugin = new Builder.Core.Plugin(this),
            this.live2d = new Builder.Core.Live2d(this),
            this.$ = $;
        let getPatch = require("electron").remote.app.getAppPath();
        if ("darwin" === process.platform) if (this.os = "mac", -1 !== getPatch.indexOf("var/folders")) {
            if (getPatch = process.env.HOME + "/TyranoBuilder/TyranoBuilder.app", !this.io.exists(getPatch)) return void $.alert("【macOS Alert】<br />tyranobuilder.appの実行場所は正しいですか？<br />" + e + "に配置したものを実行してください。", (function () {
                location.href = "https://b.tyrano.jp/help/builder"
            }));
            let t = getPatch.indexOf("/TyranoBuilder.app");
            getPatch = getPatch.substr(0, t)
        } else getPatch = -1 !== getPatch.indexOf(".asar") ? $.replaceAll(getPatch, "/TyranoBuilder.app/Contents/Resources/app.asar", "") : $.replaceAll(getPatch, "/TyranoBuilder.app/Contents/Resources/app", ""); else "win32" == process.platform && (this.os = "win", getPatch = -1 !== getPatch.indexOf(".asar") ? $.replaceAll(getPatch, "\\resources\\app.asar", "") : $.replaceAll(getPatch, "\\resources\\app", ""));
        this.exe_path = getPatch + "/", this.dir_path = __dirname + "/", this.exePath = getPatch + "/", this.dirPath = __dirname + "/"
    },
    setCommon: function () {
        this.gui.setMenuBar(!1), this.gui.setKeyEvent();
        var e = function (e) {
            return e.preventDefault(), e.stopPropagation(), !1
        };
        $("body").on("dragenter dragover drop", e);
    },
    setScenario: function (e, t) {
        var a = this.tyrano.scenario;
        this.tyrano.current_edit_scenario = e, a[e] = t, this.tyrano.scenario = a, app.tmp.modified_scenario = !1
    },
    selectComponentByLabel: function (e, t) {
        if ("" == e && (e = this.tyrano.current_edit_scenario), this.tyrano.current_edit_scenario == e) {
            app.tmp.select_component_in_reopen = "";
            var a = app.tyrano.component;
            "" == t && a[0].j_component.trigger("click");
            for (var o = 0; o < a.length; o++) {
                var n = a[o];
                if ("label" == n.data.name && "*" + n.data.pm.label_name == t) {
                    var i = $("#main-component"), p = (t = n.j_component, parseInt(t.offset().top) - 120);
                    return p += i.get(0).scrollTop, void i.stop().animate({scrollTop: p}, {
                        duration: 120,
                        complete: function () {
                            t.trigger("click")
                        }
                    })
                }
            }
            $.alert($.s("Место перехода не существует."))
        } else if (app.tmp.select_component_in_reopen = t, app.component.checkModified()) {
            var r = e;
            app.loadScenario(r)
        } else $.confirm($.s("Текущий сценарий редактируется. Если не сохранить его, то содержимое будет потеряно, продолжить?"), (function () {
            var t = e;
            app.loadScenario(t)
        }), (function () {


            return !1
        }))
    },
    selectComponentByLine: function (e, t) {
        if (this.tyrano.current_edit_scenario != e) if (app.tmp.select_component_in_line = t, app.component.checkModified()) {
            var a = e;
            app.loadScenario(a)
        } else $.confirm($.s("Сцена в настоящее время редактируется. Изменения будут потеряны, если другая сцена будет открыта без сохранения. Продолжить?"), (function () {
            var t = e;
            app.loadScenario(t)
        }), (function () {
            return !1
        })); else {
            app.tmp.select_component_in_line = "";
            for (var o = app.tyrano.component, n = o.length - 1; n >= 0; n--) {
                var i = o[n];
                if (i.data.line <= t) {
                    var p = $("#main-component"), r = i.j_component, s = parseInt(r.offset().top) - 120;
                    return s += p.get(0).scrollTop, void p.stop().animate({scrollTop: s}, {
                        duration: 120,
                        complete: function () {
                            r.trigger("click")
                        }
                    })
                }
            }
        }
    },
    showEditProject: function () {
        const path = require('path');
        var e = app.io.getFiles(app.getProjectPath() + "data/scenario/");
        e = _.select(e, (function (e) {
            return !_.any(["first.ks", "make.ks", "_preview.ks", "config.ks"], (function (t) {
                return t === e.item
            }))
        })), this.array_files = e, this.plugin.loadPlugins();
        var t = app.config.loadProjectConfig();
        t.version !== app.version ? $.confirm($.s("Этот проект был сделан в <br> предыдущей версии VN Effector. <BR> Сделать резервную копию проекта и конвертировать под последнюю версию?"), (function () {
            var e = app.getProjectPath(), a = app.exe_path + "myproject/" + app.tyrano.project_name + "_backup";
            app.io.copy(e, a),
                app.io.copy(app.dir_path + "system/tyrano/tyrano", e + "tyrano/"),
                app.io.copy(app.dir_path + "system/tyrano/index.html", e + "index.html")

            const destinationFilePath = path.join(e, 'data', 'scenario', 'system', 'plugin.ks');
            if (!fs.existsSync(destinationFilePath)) {
                app.io.copy(app.dir_path + "system/tyrano/data/scenario/system/plugin.ks", e + "data/scenario/system/plugin.ks")
            }
            app.io.exists(a + "/tyrano/images/system") && app.io.copy(a + "/tyrano/images/system", e + "tyrano/images/system"),
            app.io.exists(a + "/tyrano/html") && app.io.copy(a + "/tyrano/html", e + "tyrano/html");
            var o = app.config.loadTyranoConfig(app.getProjectPath() + "data/system/Config.tjs"),
                n = app.config.loadTyranoConfig(app.dir_path + "system/tyrano/data/system/Config.tjs");
            _.defaults(o, n), o.version = "4.00";
            var i = app.getProjectPath() + "/data/system/Config.tjs";
            app.config.writeTyranoConfig(i, o), t.version = app.version, app.config.saveProjectConfig();
            for (var p = ["data/scenario/system/tyrano.ks", "data/scenario/system/builder.ks"], r = 0; r < p.length; r++) {
                var s = p[r];
                app.io.copy(app.dir_path + "system/tyrano/" + s, e + s)
            }

            let getPatch = require("electron").remote.app.getAppPath();

            const destinationRoot = app.getProjectPath();
            const sourceRoot = path.join(getPatch, 'system', 'tyrano', 'data');

            const foldersToCopy = ['achievement', 'lang', 'image/particles', 'others/effects', 'inventory', 'bgimage/imageMap', 'system'];

            for (const folderName of foldersToCopy) {
                const sourceFolder = path.join(sourceRoot, folderName);
                const destinationFolder = path.join(destinationRoot, 'data', folderName);

                if (!fs.existsSync(destinationFolder)) {
                    fs.copySync(sourceFolder, destinationFolder);
                }
            }

            app.io.copy(app.dir_path + "system/tyrano/" + s, e + s, $.alert($.s("Преобразование проекта завершено"), (function () {
                location.reload();
            })))
        }), (function () {
            app.view.show("EditProject", {
                array_files: e,
                edit_project: app.tyrano.project_name,
                edit_scenario: app.tyrano.current_edit_scenario
            })
        })) : app.view.show("EditProject", {
            array_files: e,
            edit_project: app.tyrano.project_name,
            edit_scenario: app.tyrano.current_edit_scenario
        })
    },
    showDevTools: function () {
    },
    clearCache: function () {
    },
    saveEditProject: function () {
        app.component.saveTyranoScriptCode(), app.component.saveCharaDefineCode()
    },
    previewGame: function () {
        let gameUrl = app.getGameUrl();

        app.tmp.preview_from_line = 0;
        app.tmp.preview_scenario = "";
        app.tmp.reload_code = true;

        this.saveEditProject();

        app.saveFirstScenario({
            jump_storage: getSelectedValue(),
            live2d: app.config.project_config.plugin.live2d
        });

        if (app.component.checkModified()) {
            app.showPreviewWindow(gameUrl);
        } else {
            Swal.fire({
                title: $.s("Внимание!"),
                text: $.s("Несохраненные изменения не будут показаны. Сохранить и продолжить предпросмотр?"),
                icon: 'warning',
                showCancelButton: true,
                color: "var(--vne-text-color)",
                background: "var(--vne-right-panel-color)",
                confirmButtonText: $.s("Сохранить"),
                cancelButtonText: $.s("Отмена")
            }).then((result) => {
                if (result.isConfirmed) {
                    app.component.saveTyranoScriptCode();
                    app.component.saveCharaDefineCode();
                    app.showPreviewWindow(gameUrl);
                }
            });

        }

    },
    showPreviewWindow: function (e, t = !1) {
        var a = app.tyrano.config.scWidth, o = app.tyrano.config.scHeight;
        if (n = app.gui.getModal("preview")) try {
            n.focus(), n.window.location.reload()
        } catch (i) {
            n = app.gui.openWindow("file://" + e, {
                title: $.s("Предпросмотр"),
                width: parseInt(a),
                height: parseInt(o),
                toolbar: !1,
                debug: t
            }), app.gui.addModal("preview", n)
        } else {
            var n = app.gui.openWindow("file://" + e, {
                title: $.s("Предпросмотр"),
                width: parseInt(a),
                height: parseInt(o),
                toolbar: !1,
                debug: t
            });
            app.gui.addModal("preview", n)
        }
        return n
    },
    showPreviewWindowIframe: function (e, t) {
        var a = parseInt(app.tyrano.config.scWidth), o = parseInt(app.tyrano.config.scHeight),
            n = app.gui.getModal("camera_preview");
        if (n) try {
            n.close()
        } catch (e) {
        }
        app.window.show("PreviewGame", {
            title: $.s("Просмотр камеры"),
            game_url: e,
            width: a,
            height: o,
            padding: "no_padding"
        }, t)
    },
    startDebug: function () {
        $(".modal.DebugManage").get(0) || app.window.show("DebugManage", {title: $.s("Дебаг"), width: 640, height: 500});
        var e = app.getGameUrl();
        this.showPreviewWindow(e, !0)
    },
    debugGamefromFirst: function () {
        app.tmp.preview_from_line = 0, app.tmp.preview_scenario = "", app.tmp.reload_code = !0, this.saveEditProject(), app.saveFirstScenario({
            jump_storage: "title_screen.ks",
            live2d: app.config.project_config.plugin.live2d
        }), this.startDebug()
    },
    debugGameFromScenario: function (e) {
        app.tmp.preview_scenario = this.tyrano.current_edit_scenario, app.tmp.reload_code = !0, this.saveEditProject(), app.saveFirstScenario({
            jump_storage: "_preview.ks",
            live2d: app.config.project_config.plugin.live2d
        }), app.component.saveTyranoScriptCodeForPreview(e), app.component.saveCharaDefineCode(), this.startDebug()
    },
    previewGameFromScenario: function (e, t = !1, a) {
        var o = app.getGameUrl();
        app.tyrano.config.scWidth, app.tyrano.config.scHeight;
        app.tmp.preview_scenario = this.tyrano.current_edit_scenario, app.tmp.reload_code = !0, this.saveEditProject(), app.saveFirstScenario({
            jump_storage: "_preview.ks",
            live2d: app.config.project_config.plugin.live2d
        }), app.component.saveTyranoScriptCodeForPreview(e), app.component.saveCharaDefineCode();
        o = app.getGameUrl();
        if (1 != t) return app.showPreviewWindow(o);
        app.showPreviewWindowIframe(o, a)
    },

    saveFirstScenario: function (e) {
        var t = this.getProjectPath(), a = app.config.ks("first.ks", e), o = t + "/data/scenario/first.ks";
        app.io.writeFile(o, a)
    },
    createActiveComponentIcons: function (e) {
        var t = app.config.project_config.component_manage, a = _component_manage, o = e.type, n = $("<div></div>");
        for (key in a) {
            let i = a[key], p = $('<div class="cpn-group group-' + i.id + '"></div>'), r = "";
            r += '<div class="cpn-header" data-group="' + i.id + '" style="height: 32px;">', r += '    <div class="cpn-title ' + i.id + ' checkbox form-check form-switch ">', 2 == o && (r += '<input type="checkbox" class="check_group checkbox form-check-input" data-group="' + i.id + '" style="margin-bottom:3px; margin-right:5px" />'), r += "        " + $.s(i.name), r += "    </div>", r += '    <div class="cpn-header-nav">', 1 == o && (r += '        <span class="tb-i-chevron-down" style="padding-top: 2px" title=' + $.s("Развернуть") + "></span>"), r += "    </div>", r += "</div>";
            let s = $(r), c = $('<div class="cpn-body"></div>'), d = i.components, l = !1, g = !1;
            for (tag in d) {
                var m = "";
                let e = "insert";
                d[tag].fav && (e = "fav"), 2 == o ? (m += '<div item-tag="' + tag + '" item-type="' + e + '" class="cpn-item help component_btn pro_' + d[tag].pro + ' checkbox form-check form-switch" style="cursor:pointer" data-help="' + $.s(d[tag].help) + '">', void 0 === t[i.id] && (t[i.id] = {}), void 0 === t[i.id][tag] ? m += '<input class="check_item checkbox form-check-input vne_theme-check-item" data-tag="' + tag + '" type="checkbox" style="margin: 0 2px 0 7px !important;display: none;" class="checkbox form-check-input" />' : (m += '<input class="check_item checkbox form-check-input vne_theme-check-item" data-tag="' + tag + '" type="checkbox" style="margin: 0 2px 0 7px !important;display: none;" checked="checked" class="checkbox form-check-input"/>', l = !0), 1 == d[tag].pro && "standard" == global_build && (m += '<div style="position:absolute;margin-right:0px;border:solid 1px gray;font-size:10px;background-color:black;color:white;margin-left:80px;padding:1px">Только PRO</div>')) : m += '<div item-tag="' + tag + '" item-type="' + e + '" class="cpn-item help component_btn" style="cursor:move" data-help="' + $.s(d[tag].help) + '">', m += '<span class="tb-i-' + d[tag].icon + '" title="' + $.s(d[tag].name) + '"></span>', m += '<span class="text">' + $.s(d[tag].name) + "</span>", m += "</div>", void 0 === t[i.id] && (t[i.id] = {}), 1 == o && void 0 !== t[i.id][tag] ? (c.append($(m)), g = !0) : 2 == o && c.append($(m))
            }
            1 == l && s.find("input[type='checkbox']").prop("checked", !0), p.append(s), p.append(c), (1 == o && 1 == g || 2 == o) && n.append(p)
        }
        n.find(".group-live2d").hide();
        var f = app.config.project_config.plugin;
        for (key in f) 1 == f[key] && app.component.checkPlugin(key, f[key], n);
        return n
    },
    getComponentManageFromName: function (e) {
        var t = _component_manage;
        for (const o in t) {
            var a = t[o].components;
            for (const t in a) if (e == t) return a[t]
        }
    },
    refleshComponentIcons: function (e) {
        var t = _component_manage, a = e.find(".cpn-component-block");
        if (a.empty(), void 0 === app.config.project_config.component_manage) {
            app.config.project_config.component_manage = {};
            t = _component_manage;
            for (i in t) {
                var o = t[i].components;
                for (tag in app.config.project_config.component_manage[i] = {}, o) 1 == o[tag].default && ("1" == o[tag].pro && "steam" != global_build || (app.config.project_config.component_manage[i][tag] = "true"))
            }
        }
        var n = app.config.user_config.nav_component_opend;
        for (var i in a.append(app.createActiveComponentIcons({type: 1})), n) a.find(".group-" + i).addClass("active"), a.find(".group-" + i).find(".tb-i-chevron-down").addClass("tb-i-chevron-up").removeClass("tb-i-chevron-down").attr("title", $.s("Свернуть"));
        a.find(".component_btn").draggable({
            connectToSortable: "#main-component",
            helper: "clone",
            revert: "invalid",
            cursor: "move",
            zIndex: 9999,
            scroll: !1,
            appendTo: "body",
            start: function (e, t) {
            },
            stop: function (e, t) {
            }
        }), a.find(".component_btn").dblclick((function () {
            $(this).attr("item-type");

            if ($(this).attr("item-type") === "fav") {
                alertNoBtn("К сожалению, этот компонент нельзя вставить двойным щелчком мыши.", "", 3000, "bottom-right", "", "")
                return;
            }

            var e = $(this).attr("item-tag"), t = (app.tyrano.component, app.component.last_select_cid),
                a = app.component.getComponentByCid(t);
            if (a) {
                var o = a.index;
                o++;
                var n = $(this).clone(!0), i = $("<div></div>");
                i.append(n), i.css({
                    position: "absolute",
                    left: $(this).offset().left,
                    top: $(this).offset().top,
                    "z-index": 99999999
                }), $("body").append(i), i.animate({
                    left: a.j_component.offset().left,
                    top: a.j_component.offset().top,
                    opacity: 70
                }, {
                    duration: 500, easing: "easeOutCirc", complete: function () {
                        app.component.insertComponent(e, o, a.j_component, !0), i.remove()
                    }
                })
            } else alertNoBtn("Выберите позицию для вставки компонента", "", 3000, "bottom-right", "", "")
        })), this.view.current_view_obj.setComponentSetting()
    },
    showSetting: function () {
        app.window.show("GameSetting", {
            title: $.s("Настройки игры"),
            width: 900,
            height: 600,
            config: app.tyrano.config,

        })
    },
    showSettingMessageWindow: function () {
        app.window.show("MessageWindowSetting", {
            title: $.s("Настройка окна сообщений"),
            width: 600,
            height: 400,
            config: app.tyrano.config
        })
    },
    resize: function () {
    },
    setName: function (e) {
        this.set("name", e)
    },
    getProjectPath: function () {
        return this.exe_path + "myproject/" + this.tyrano.project_name + "/"
    },
    getDataPath: function () {
        return this.getProjectPath() + "data/"
    },
    getGameUrl: function () {
        return this.getProjectPath() + "index.html"
    },
    loadProject: function (project_name) {
        $.showLoading(), app.tyrano.project_name = project_name, app.parser.loadConfig(project_name, (function () {
            var file_name = "scene1.ks", scenario_path = app.getProjectPath() + "data/scenario/" + file_name,
                lang_path = app.getProjectPath() + "tyrano/lang.js", lang_js = app.io.readFile(lang_path);
            eval(lang_js), app.tyrano.tyrano_lang = tyrano_lang;
            var keyconfig_path = app.getProjectPath() + "data/system/KeyConfig.js";
            $.getScript(keyconfig_path, (function () {
                app.tyrano.keyconfig = __tyrano_key_config
            })), app.parser.loadScenario(scenario_path, (function (e) {
                e.file_name = file_name, app.setScenario(file_name, e), app.parser.loadAllLabels(), app.showEditProject(), $.hideLoading()
            }))
        }))
    },
    loadScenario: function (e) {
        var t = app.getProjectPath() + "data/scenario/" + e,
            a = app.io.getFiles(app.getProjectPath() + "data/scenario/");
        a = _.select(a, (function (e) {
            return !_.any(["first.ks", "make.ks", "_preview.ks", "config.ks"], (function (t) {
                return t === e.item
            }))
        })), app.array_files = a, app.parser.loadScenario(t, (function (t) {
            t.file_name = e, app.setScenario(e, t), app.parser.loadAllLabels(), app.tyrano.current_edit_scenario = e, app.view.current_view_obj.changeScenario(e)
        }))
    },
    test: function () {
    }
});
var  app = {};
$(window).load((function () {
    (app = new Builder.Core.App).setCommon();
    var e = app.io.getDirectories(app.exe_path + "myproject");
    app.config.loadUserConfig(), app.view.show("ListProject", {projects: e}), window.getApp = function () {
        return app
    }, $(window).bind("resize", (function () {
        app.resize()
    }))
}));