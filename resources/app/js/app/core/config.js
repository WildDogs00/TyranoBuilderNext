Builder.Core.Config = Builder.Core.Base.extend({
    defaults: {},
    project_config: {
        version: "0.1",
        map_chara: {},
        map_fuki: {},
        map_fav: {},
        plugin: {},
        map_font: {},
        map_var: {
            langTranslate: {
                "val": "",
                "kind": "sf"
            },
            realTime: {
                "val": "",
                "kind": "sf"
            },
            fakeTime: {
                "val": "",
                "kind": "sf"
            },
            fakeDay: {
                "val": "",
                "kind": "sf"
            },
            fakeDayNumber: {
                "val": "",
                "kind": "sf"
            },
            fakeTimeSpeed: {
                "val": "",
                "kind": "sf"
            },
            fakeMonth: {
                "val": "",
                "kind": "sf"
            },
            fakeYear: {
                "val": "",
                "kind": "sf"
            },
            achievementSystem: {
                "val": "",
                "kind": "sf"
            }
        },
        map_watch: {},
        map_param_pin: {},
        map_theme: {name: "", opacity: "", button: 0, message_color: "", chara_name_color: "", glink: "", jname: ""},
        map_cg: {map_page: {}, map_image: {}},
        map_replay: {map_page: {}, map_jump: {}},
        live2d_version: "3",
        preview_sync: !1
    },
    user_config: {
        nav_component_opend: {"group-scenario": 1},
        tab_mode: !0,
        show_help: !0,
        text_cmp_font_size: 12,
        text_cmp_height: 80,
        file_select_type: 1
    },
    initialize: function (a) {
        this.c = a
    },
    loadUserConfig: function () {
        var a = app.exe_path + "/user_config.json";
        app.io.exists(a) ? this.user_config = _.defaults(app.io.loadJson(a), this.user_conifig) : this.saveUserConfig()
    },
    saveUserConfig: function () {
        var a = app.exe_path + "/user_config.json";
        app.io.saveJson(a, this.user_config)
    },
    loadTyranoConfig: function (a) {
        var e = app.io.readFile(a);
        return app.parser.compileConfig(e)
    },
    writeTyranoLang: function (a) {
        var e = app.tyrano.tyrano_lang, o = "window.tyrano_lang=" + JSON.stringify(e);
        app.io.writeFile(a, o)
    },
    writeTyranoConfig: function (a, e) {
        var o = app.parser.config2text(e);
        app.io.writeFile(a, o)
    },
    mergeConfig: function (a, e) {
        return _.extend(a, e)
    },
    getCharaPath: function (a) {
        var e = app.config.project_config.map_chara[a];
        return app.getDataPath() + "fgimage/chara/" + e
    },
    ks: function (a, e) {
        var o = app.dir_path + "template/ks/" + a, n = app.io.readFile(o);
        return $.templates(n).render(e)
    },
    loadProjectConfig: function () {
        var a = app.getProjectPath() + "builder_config.json", e = _.extend(this.project_config, app.io.loadJson(a));
        return this.project_config = e, e
    },
    getProjectConfig: function (a) {
        return this.project_config[a]
    },
    setProjectConfig: function (a, e) {
        this.project_config[a] = e, this.saveProjectConfig()
    },
    saveProjectConfig: function () {
        var a = app.getProjectPath() + "builder_config.json";
        app.io.saveJson(a, this.project_config)
    },
    saveFontCss: function () {
        var a = app.config.project_config.map_font, e = "";
        for (key in a) {
            e += "                @font-face {                    font-family: '" + key + "';                    src: url('../../data/others/" + key + ".ttf') format('truetype'),                    url('../../data/others/" + key + ".woff') format('woff'),                    url('../../data/others/" + key + ".eot') format('eot')                    ;                    font-weight:normal;font-style:normal;                }                " + "\n"
        }
        app.io.writeFile(app.getProjectPath() + "/tyrano/css/font.css", e)
    },
    setParamPin: function (a, e) {
        this.project_config.map_param_pin[a] = $.extend(!0, {}, e)
    },
    getParamPin: function (a) {
        var e = null;
        return this.project_config.map_param_pin[a] && (e = $.extend(!0, {}, this.project_config.map_param_pin[a])), e
    },
    removeParamPin: function (a) {
        delete this.project_config.map_param_pin[a]
    },
    checkParamPin: function (a) {
        return !!this.project_config.map_param_pin[a]
    },
    createMessageWindowData: function (a, e, o) {
        var n, t, i, r, p, _, c, s, f, m, g, h = o.game_type, l = o.size_type, u = "0xFFFFFF";
        "adv" == h ? (n = a - 40, t = Math.floor(.33 * e), r = 20, p = 26, _ = 30, c = (i = Math.floor(.58 * e)) + 10, s = 45, f = 10, m = 20, g = 10) : (n = a - 40, t = e - 60, r = 20, p = 26, _ = 30, c = (i = 20) + 10, s = 10, f = 10, m = 20, g = 10);
        var d = !1;
        return "novel" == h && 3 == l && (d = !0), {
            msg_width: n,
            msg_height: t,
            msg_top: i,
            msg_left: r,
            margint: s,
            marginl: f,
            marginr: m,
            marginb: g,
            vertical: d,
            color: "0xFFFFFF",
            opacity: 180,
            window_color: "0x000000",
            radius: 0,
            chara_name_color: u,
            chara_name_size: p,
            chara_name_x: _,
            chara_name_y: c,
            chara_name_color: u,
            chara_name_bold: "bold",
            game_type: h,
            check_chara_mode: !0,
            text_chara_mod_time: 600,
            check_memory_chara_face: !1,
            check_chara_anim: !0,
            select_chara_anim_mode: "",
            icon_position_x: 0,
            icon_position_y: 0,
            icon_position_fix: !1,
            chara_name_bold: "bold",
            select_talk_focus: "none",
            text_pos_change_time: "600",
            select_chara_anim_mode: "easeInQuad",
            cg_noimage: "noimage.png",
            replay_noimage: "noimage.png",
            map_role: {}
        }
    }
});