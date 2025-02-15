Builder.Setting = {}, Builder.Setting.GameSettingCommon = Builder.Core.Base.extend({
    defaults: {view_id: "GameSetting"}, j_view: {}, map_config: {}, initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        for (var n in this.map_config = app.tyrano.config, this.map_config) this.j_view.find("[data-key='" + n + "']").val(this.map_config[n]);
        this.j_view.find(".color_text").each((function () {
            var e = $(this).attr("data-key");
            t.map_config[e] && $(this).val(t.map_config[e].replace("0x", "#"))
        })), this.j_view.find(".color_text").minicolors({
            change: function (e, i) {
                var a = $(this).attr("data-key");
                t.map_config[a] && (t.map_config[a] = e.replace("#", "0x"))
            }
        }), this.j_view.find(".spinner-1").spinner({
            min: 0, step: 1, change: function (e, i) {
                $(e.target).trigger("change")
            }
        }), this.j_view.find(".spinner-10").spinner({
            min: 0, step: 10, change: function (e, i) {
                $(e.target).trigger("change")
            }
        }), this.j_view.find(".input_setting").change((function () {
            var e = $(this), i = $.trim(e.val());
            if ("" == i) return $.alert($.s("Введите здесь")), !1;
            var a = e.attr("data-key");
            t.map_config[a] = i
        })), this.j_view.find(".navbar-nav").find("li").on("click", (function () {
            $(this).parents().find(".navbar-nav").find("li").removeClass("active"), $(this).addClass("active");
            var e = $(this).attr("data-nav");
            t.j_view.find(".tab-main").hide(), t.j_view.find("#" + e).show()
        })), this.j_view.find(".button_sbm").click((function () {
            var e = app.getDataPath() + "system/Config.tjs";
            app.config.writeTyranoConfig(e, t.map_config), alertNoBtn("Внимание", "Настройки были обновлены", 3000, "bottom-right", "success", "--vne-success-alert-color")
        })), this.j_view.find(".button_back").click((function () {
            t.close()
        }))
    }, show: function (e) {
    }
}), Builder.Setting.GameSettingMessageWindow = Builder.Core.Base.extend({
    defaults: {view_id: "GameSettingMessageWindow"}, j_view: {}, map_config: {}, initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        if (this.map_config = app.tyrano.config, this.j_view.find(".spinner-1").spinner({
            min: 0,
            step: 1,
            change: function (e, i) {
                $(e.target).trigger("change")
            }
        }), this.j_view.find(".spinner-10").spinner({
            min: 0, step: 10, change: function (e, i) {
                $(e.target).trigger("change")
            }
        }), this.j_view.find(".navbar-nav").find("li").on("click", (function () {
            $(this).parents().find(".navbar-nav").find("li").removeClass("active"), $(this).addClass("active");
            var e = $(this).attr("data-nav");
            t.j_view.find(".tab-main").hide(), t.j_view.find("#" + e).show()
        })), this.map_message_window = app.config.project_config.message_window, this.map_message_window.use_image) {
            this.j_view.find(".check_message_image").attr("checked", "checked"), this.j_view.find(".area_select_image").show();
            var n = app.getProjectPath() + "data/image/" + this.map_message_window.image_file;
            t.j_view.find(".selected_image").append('<img src="' + n + '" style="width:400px;" />'), t.selected_image_file = this.map_message_window.image_file
        }
        this.j_view.find(".msg_width").val(this.map_message_window.msg_width), this.j_view.find(".msg_height").val(this.map_message_window.msg_height), this.j_view.find(".msg_top").val(this.map_message_window.msg_top), this.j_view.find(".msg_left").val(this.map_message_window.msg_left), this.j_view.find(".margint").val(this.map_message_window.margint), this.j_view.find(".marginl").val(this.map_message_window.marginl), this.j_view.find(".marginr").val(this.map_message_window.marginr), this.j_view.find(".marginb").val(this.map_message_window.marginb), this.j_view.find(".chara_name_color").val($.convertColor(this.map_message_window.chara_name_color)), this.j_view.find(".flag_edge").val(this.map_message_window.flag_edge), this.j_view.find(".edge_color").val($.convertColor(this.map_message_window.edge_color)), this.j_view.find(".flag_shadow").val(this.map_message_window.flag_shadow), this.j_view.find(".shadow_color").val($.convertColor(this.map_message_window.shadow_color)), this.j_view.find(".color_text").minicolors({
            change: function (e, i) {
            }
        }), this.j_view.find(".chara_name_x").val(this.map_message_window.chara_name_x), this.j_view.find(".chara_name_y").val(this.map_message_window.chara_name_y), this.j_view.find(".chara_name_size").val(this.map_message_window.chara_name_size), this.j_view.find(".chara_name_color").val(this.map_message_window.chara_name_color), "bold" == this.map_message_window.chara_name_bold && this.j_view.find(".chara_name_bold").attr("checked", "checked"), this.j_view.find(".opacity").val(this.map_message_window.opacity), this.j_view.find(".radius").val(this.map_message_window.radius), this.j_view.find(".window_color").val(this.map_message_window.window_color.replace("0x", "#")), this.j_view.find(".window_color").minicolors({
            change: function (e, i) {
            }
        }), this.j_view.find(".button_image_select").click((function () {
            app.window.show("SelectFile", {
                title: $.s("Выберите изображение"),
                width: 640,
                height: 400,
                file_path: "image/",
                folder: "",
                folder_select: !1,
                base_url: "data/image/"
            }, (function (e) {
                var i = app.getProjectPath() + "data/image/" + e;
                app.tyrano.project_name;
                t.j_view.find(".selected_image").html(""), t.j_view.find(".selected_image").append('<img src="' + i + '" style="width:400px;" />'), t.selected_image_file = e
            }))
        })), this.j_view.find(".spinner").spinner({
            min: 0, step: 1, change: function (e, i) {
                $(e.target).trigger("change")
            }
        }), this.j_view.find(".check_message_image").change((function (e) {
            $(this).is(":checked") ? t.j_view.find(".area_select_image").show() : t.j_view.find(".area_select_image").hide()
        }));
        var o = app.getProjectPath() + "tyrano/images/system/", c = this.j_view.find(".wait_click_img");
        c.attr("src", o + "nextpage.gif"), this.j_view.find(".button_img_file").click((function () {
            var e = $('<input type="file" />');
            e.change((function (e) {
                var i = e.target.files[0], a = i.path;
                if (-1 == i.name.indexOf(".gif") && -1 == i.name.indexOf(".GIF")) return alertNoBtn("Внимание", "Пожалуйста, используйте .gif", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
                app.io.copy(a, o + "nextpage.gif"), app.clearCache();
                var t = Math.floor(1e6 * Math.random());
                c.attr("src", ""), c.attr("src", o + "nextpage.gif?" + t)
            })), e.trigger("click")
        })), this.j_view.find(".check_click_img_fix").change((function () {
            var e = $(this).is(":checked");
            t.map_message_window.icon_position_fix = e, e ? t.j_view.find(".icon_position_area").show() : t.j_view.find(".icon_position_area").hide()
        })), 1 == t.map_message_window.icon_position_fix ? t.j_view.find(".check_click_img_fix").attr("checked", "checked") : t.j_view.find(".icon_position_area").hide(), this.j_view.find(".icon_position_x").val(t.map_message_window.icon_position_x), this.j_view.find(".icon_position_y").val(t.map_message_window.icon_position_y), this.j_view.find(".button_sbm").click((function () {
            t.j_view.find(".check_message_image").is(":checked") && "" != t.selected_image_file ? (t.map_message_window.use_image = !0, t.map_message_window.image_file = t.selected_image_file) : (t.map_message_window.use_image = !1, t.map_message_window.image_file = ""), t.map_message_window.msg_width = t.j_view.find(".msg_width").val(), t.map_message_window.msg_height = t.j_view.find(".msg_height").val(), t.map_message_window.msg_top = t.j_view.find(".msg_top").val(), t.map_message_window.msg_left = t.j_view.find(".msg_left").val(), t.map_message_window.margint = t.j_view.find(".margint").val(), t.map_message_window.marginl = t.j_view.find(".marginl").val(), t.map_message_window.marginr = t.j_view.find(".marginr").val(), t.map_message_window.marginb = t.j_view.find(".marginb").val(), t.map_message_window.chara_name_color = t.j_view.find(".chara_name_color").val().replace("#", "0x"), t.map_message_window.chara_name_x = t.j_view.find(".chara_name_x").val(), t.map_message_window.chara_name_y = t.j_view.find(".chara_name_y").val(), t.map_message_window.chara_name_size = t.j_view.find(".chara_name_size").val(), t.map_message_window.flag_shadow = t.j_view.find(".flag_shadow").val(), "true" == t.j_view.find(".flag_edge").val() ? t.map_message_window.edge_color = t.j_view.find(".edge_color").val().replace("#", "0x") : t.map_message_window.edge_color = "undefined", t.map_message_window.flag_edge = t.j_view.find(".flag_edge").val(), "true" == t.j_view.find(".flag_shadow").val() ? t.map_message_window.shadow_color = t.j_view.find(".shadow_color").val().replace("#", "0x") : t.map_message_window.shadow_color = "undefined", t.j_view.find(".chara_name_bold").is(":checked") ? t.map_message_window.chara_name_bold = "bold" : t.map_message_window.chara_name_bold = "", t.map_message_window.window_color = t.j_view.find(".window_color").val().replace("#", "0x"), t.map_message_window.opacity = t.j_view.find(".opacity").val(), t.map_message_window.radius = t.j_view.find(".radius").val(), t.map_message_window.icon_position_x = t.j_view.find(".icon_position_x").val(), t.map_message_window.icon_position_y = t.j_view.find(".icon_position_y").val(), app.config.setProjectConfig("message_window", t.map_message_window);
            var e = app.config.ks("message_window.ks", t.map_message_window),
                i = app.getProjectPath() + "/data/scenario/system/message_window.ks";
            app.io.writeFile(i, e), alertNoBtn("Внимание", "Настройки обновлены", "2000", "bottom-right", "info", "var(--vne-info-alert-color)")
        }))
    }, show: function (e) {
    }
}), Builder.Setting.GameSettingRead = Builder.Core.Base.extend({
    defaults: {view_id: "GameSettingRead"}, j_view: {}, map_config: {}, initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        this.map_config = app.tyrano.config, this.map_config.autoRecordLabel && "true" == this.map_config.autoRecordLabel ? this.j_view.find(".check_enable_read").prop("checked", !0) : this.j_view.find(".check_enable_read").prop("checked", !1), this.map_config.unReadTextSkip && "true" == this.map_config.unReadTextSkip && ($(this).prop("checked") && t.j_view.find(".check_enable_read").prop("checked", !0), this.j_view.find(".check_skip_unread").prop("checked", !0)), this.j_view.find(".check_skip_unread").change((function () {
            $(this).prop("checked") && t.j_view.find(".check_enable_read").prop("checked", !0)
        })), this.j_view.find(".check_read_color").change((function () {
            $(this).prop("checked") ? (t.j_view.find(".area_read_color").show(), t.j_view.find(".check_enable_read").prop("checked", !0)) : t.j_view.find(".area_read_color").hide()
        })), this.map_config.alreadyReadTextColor && "default" != this.map_config.alreadyReadTextColor ? (this.j_view.find(".check_read_color").prop("checked", !0), this.j_view.find(".area_read_color").show(), this.j_view.find(".text_read_color").val($.convertColor(this.map_config.alreadyReadTextColor)), this.j_view.find(".text_read_color").minicolors({
            change: function (e, i) {
            }
        })) : this.j_view.find(".area_read_color").hide(), this.j_view.find(".button_sbm").click((function () {
            var e = t.j_view.find(".check_enable_read").prop("checked"),
                i = t.j_view.find(".check_skip_unread").prop("checked"), a = "default";
            t.j_view.find(".check_read_color").prop("checked") && (a = t.j_view.find(".text_read_color").val().replace("#", "0x")), t.map_config.autoRecordLabel = "" + e, t.map_config.unReadTextSkip = "" + i, t.map_config.alreadyReadTextColor = "" + a;
            var n = app.getDataPath() + "system/Config.tjs";
            app.config.writeTyranoConfig(n, t.map_config), alertNoBtn("Внимание", "Настройки обновлены", "2000", "bottom-right", "info", "var(--vne-info-alert-color)")
        }))
    }, show: function (e) {
    }
}), Builder.Setting.GameSettingAudio = Builder.Core.Base.extend({
    defaults: {view_id: "GameSettingAudio"},
    j_view: {},
    map_config: {},
    initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        this.map_config = app.tyrano.config, this.map_config.defaultBgmVolume && this.j_view.find(".text_bgm_vol").val(this.map_config.defaultBgmVolume), this.map_config.defaultSeVolume && this.j_view.find(".text_se_vol").val(this.map_config.defaultSeVolume), this.j_view.find(".button_sbm").click((function () {
            t.map_config.defaultBgmVolume = parseInt(t.j_view.find(".text_bgm_vol").val()), t.map_config.defaultSeVolume = parseInt(t.j_view.find(".text_se_vol").val());
            var e = app.getDataPath() + "system/Config.tjs";
            app.config.writeTyranoConfig(e, t.map_config), alertNoBtn("Внимание", "Настройки обновлены", "2000", "bottom-right", "info", "var(--vne-info-alert-color)")
        })), this.j_view.find(".spinner-10").spinner({
            min: 0, step: 10, max: 100, change: function (e, i) {
            }
        })
    },
    show: function (e) {
    }
}), Builder.Setting.GameSettingLive2D = Builder.Core.Base.extend({
    defaults: {view_id: "GameSettingLive2D"}, j_view: {}, map_config: {}, initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        this.map_config = app.tyrano.config, this.map_config = app.tyrano.config;
        var n = app.config.project_config;
        n.live2d_version && this.j_view.find("#live2d_version").val(n.live2d_version), this.j_view.find(".button_sbm").click((function () {
            var e = t.j_view.find("#live2d_version").val();
            app.io.mkdir(app.getDataPath() + "others/live2d"), app.io.copy(app.dir_path + "system/live2d/live2d_" + e + "/framework", app.getDataPath() + "others/live2d/framework"), app.io.copy(app.dir_path + "system/live2d/live2d_" + e + "/lib", app.getDataPath() + "others/live2d/lib"), app.io.copy(app.dir_path + "system/live2d/live2d_" + e + "/Live2Dtyrano.js", app.getDataPath() + "others/live2d/Live2Dtyrano.js"), app.io.copy(app.dir_path + "system/live2d/live2d_" + e + "/live2d.ks", app.getDataPath() + "scenario/system/live2d.ks"), app.io.copy(app.dir_path + "system/live2d/make.ks", app.getDataPath() + "scenario/make.ks"), app.io.copy(app.dir_path + "system/live2d/live2d_" + e + "/framework", app.dir_path + "system/live2d/live2d/framework"), app.io.copy(app.dir_path + "system/live2d/live2d_" + e + "/lib", app.dir_path + "system/live2d/live2d/lib"), app.io.copy(app.dir_path + "system/live2d/live2d_" + e + "/Live2Dtyrano.js", app.dir_path + "system/live2d/live2d/Live2Dtyrano.js"), app.config.project_config.live2d_version = e, app.config.saveProjectConfig(), alertNoBtn("Внимание", "Настройки обновлены. Перезапустите VN Effector для применения", "2000", "center", "info", "var(--vne-info-alert-color)")
        }))
    }, show: function (e) {
    }
}), Builder.Setting.GameSettingMenu = Builder.Core.Base.extend({
    defaults: {view_id: "GameSettingMenu"}, j_view: {}, map_config: {}, initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        this.map_config = app.tyrano.config, this.j_view.find(".navbar-nav").find("li").on("click", (function () {
            $(this).parents().find(".navbar-nav").find("li").removeClass("active"), $(this).addClass("active");
            var e = $(this).attr("data-nav");
            t.j_view.find(".tab-main").hide(), t.j_view.find("#" + e).show()
        }));
        var n = app.getProjectPath() + "tyrano/images/system/", o = app.tyrano.tyrano_lang.novel;
        this.j_view.find("img[data-novel='file_button_menu']").attr("src", n + o.file_button_menu), this.j_view.find(".select_file").css("cursor", "pointer"), this.j_view.find(".select_file").click((function () {
            var e = $(this), i = e.attr("data-novel"), a = $('<input type="file" />');
            a.change((function (a) {
                var t = a.target.files[0], c = t.path;
                app.io.rmdir(n + o[i]), app.io.copy(c, n + t.name), app.tyrano.tyrano_lang.novel[i] = t.name;
                var _ = Math.floor(1e6 * Math.random());
                e.attr("src", n + app.tyrano.tyrano_lang.novel[i] + "?" + _), app.config.writeTyranoLang(app.getProjectPath() + "tyrano/lang.js")
            })), a.trigger("click")
        })), this.j_view.find(".button_system_view").click((function () {
            var e = $(this).attr("data-novel"), i = ($('<input type="file" />'), parseInt(app.tyrano.config.scWidth)),
                a = parseInt(app.tyrano.config.scHeight), t = e, n = "menu";
            "1280" == app.tyrano.config.scWidth && "720" == app.tyrano.config.scWidth && (n = "menu1280"), app.window.show("SystemViewEdit", {
                title: $.s("Дизайн системных экранов"),
                width: i,
                height: a,
                html_name: t,
                view_size: n,
                padding: "none"
            }, (function (e, i) {
            }))
        })), this.j_view.find(".button_image_select").click((function () {
            app.window.show("SelectFile", {
                title: $.s("Выберите изображение"),
                width: 640,
                height: 400,
                file_path: "image/",
                folder: "",
                folder_select: !1,
                base_url: "data/image/"
            }, (function (e) {
                var i = app.getProjectPath() + "data/image/" + e;
                app.tyrano.project_name;
                t.j_view.find(".selected_image").html(""), t.j_view.find(".selected_image").append('<img src="' + i + '" style="width:400px;" />'), t.selected_image_file = e
            }))
        })), this.j_view.find(".spinner").spinner({
            min: 0, step: 1, change: function (e, i) {
                $(e.target).trigger("change")
            }
        }), this.j_view.find(".check_message_image").change((function (e) {
            $(this).is(":checked") ? t.j_view.find(".area_select_image").show() : t.j_view.find(".area_select_image").hide()
        })), this.map_config.configThumbnail && "true" == this.map_config.configThumbnail ? this.j_view.find(".check_save_capture").prop("checked", !0) : this.j_view.find(".check_save_capture").prop("checked", !1), null != this.map_config.configThumbnailQuality ? this.j_view.find(".select_thumb_quality").val(this.map_config.configThumbnailQuality) : this.j_view.find(".select_thumb_quality").val("middle"), null != this.map_config.configSaveOverwrite ? this.j_view.find(".select_save_overwrite").val(this.map_config.configSaveOverwrite) : this.j_view.find(".select_save_overwrite").val("false"), this.j_view.find(".text_num_saveslot").spinner({
            min: 0,
            step: 1,
            max: 100,
            change: function (e, i) {
            }
        }), this.j_view.find(".text_num_saveslot").on("change", (function () {
            $(this).val(parseInt($(this).val()))
        })), null != this.map_config.configSaveSlotNum ? this.j_view.find(".text_num_saveslot").val(this.map_config.configSaveSlotNum) : this.j_view.find(".text_num_saveslot").val(5), this.j_view.find(".button_sbm").click((function () {
            var e = t.j_view.find(".text_num_saveslot").val(), i = t.j_view.find(".check_save_capture").prop("checked"),
                a = t.j_view.find(".select_thumb_quality").val(), n = t.j_view.find(".select_save_overwrite").val();
            t.map_config.configSaveSlotNum = "" + e, t.map_config.configThumbnail = "" + i, t.map_config.configThumbnailQuality = "" + a, t.map_config.configSaveOverwrite = "" + n;
            var o = app.getDataPath() + "system/Config.tjs";
            app.config.writeTyranoConfig(o, t.map_config), alertNoBtn("Внимание", "Настройки обновлены", "2000", "bottom-right", "info", "var(--vne-info-alert-color)")
        })), this.j_view.find(".button_save_clear").click((function () {
            localStorage.clear(), $.alert($.s("savedata clear!"))
        }))
    }, show: function (e) {
    }
}), Builder.Setting.GameSettingKeyconfig = Builder.Core.Base.extend({
    defaults: {view_id: "GameSettingKeyconfig"},
    j_view: {},
    map_config: {},
    current_tab: "key",
    keyconfig: {},
    keymap: {},
    map_action: {
        "": $.s("Нет"),
        save: $.s("Экран сохранения"),
        load: $.s("Экран загрузки"),
        next: $.s("Прогресс в игре"),
        title: $.s("Вернуться в главное меню"),
        menu: $.s("Экран меню"),
        skip: $.s("Пропуск"),
        backlog: $.s("Экран истории"),
        fullscreen: $.s("Включить полноэкранный режи"),
        qsave: $.s("Быстрое сохранение"),
        qload: $.s("Быстрая загрузка"),
        hidemessage: $.s("Удалить сообщение"),
        auto: $.s("Автоматический режим")
    },
    j_select_key: null,
    j_select_action: null,
    initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        for (key in this.map_config = app.tyrano.config, this.j_view.find(".navbar-nav").find("li").on("click", (function () {
            $(this).parents().find(".navbar-nav").find("li").removeClass("active"), $(this).addClass("active");
            var e = $(this).attr("data-nav");
            t.current_tab = e, t.j_view.find(".tab-change").hide(), t.j_view.find(".area_" + e).show(), t.reflesh(), t.j_select_key.children().first().prop("selected", !0), t.j_select_key.trigger("change")
        })), t.j_view.find(".tab-change").hide(), t.j_view.find(".area_key").show(), this.keyconfig = $.extend(!0, {}, app.tyrano.keyconfig), this.j_select_action = this.j_view.find(".select_action"), this.map_action) this.j_select_action.append('<option value="' + key + '">' + this.map_action[key] + "</option>");
        this.j_select_action.on("change", (function () {
            var e = t.j_select_key.val(), i = $(this).val();
            "gesture" != t.current_tab ? t.keymap[e] = i : t.keymap[e].action = i
        })), this.j_select_key = this.j_view.find(".select_key"), this.j_select_key.on("change", (function () {
            var e = $(this).val(), i = "";
            i = "gesture" != t.current_tab ? t.keymap[e] : t.keymap[e].action, t.j_select_action.val(i), o = e
        })), setTimeout((function () {
            t.j_select_key.children().first().prop("selected", !0), t.j_select_key.trigger("change")
        }), 10);
        var n = this.j_view.find(".text_key"), o = "";
        n.on("keydown", (function (e) {
            $(this).val(" ")
        })), n.on("keyup", (function (e) {
            $(this).val("");
            var i = e.keyCode, a = t.getKeyName(i);
            "" == a && alertNoBtn("Внимание", "Клавиша не поддерживается", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), o = i, $(this).val(a)
        })), this.j_view.find(".button_add_key").on("click", (function () {
            if ("" == o) return alertNoBtn("Внимание", "Установите клавишу", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
            if (void 0 !== t.keymap[o]) return alertNoBtn("Внимание", "Эта клавиша уже назначена", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
            var e = t.getKeyName(o);
            t.keymap[o] = "", n.val(""), t.j_select_key.append('<option value="' + o + '">' + e + "</option>")
        })), this.j_view.find(".button_remove_key").on("click", (function () {
            if ("" == o) return $.alert($.s("Выбрать клавишу")), !1;
            delete t.keymap[o], t.j_select_key.children("option[value=" + o + "]").remove(), $.alert($.s("Удалено"))
        })), this.j_view.find(".button_sbm").on("click", (function () {
            var e = "var __tyrano_key_config = " + JSON.stringify(t.keyconfig, null, "\t"),
                i = app.getProjectPath() + "data/system/KeyConfig.js";
            app.io.writeFile(i, e), app.tyrano.keyconfig = t.keyconfig, alertNoBtn("Внимание", "Сохранено", "2000", "bottom-right", "info", "var(--vne-info-alert-color)")
        })), this.reflesh()
    },
    reflesh: function () {
        if (this.j_select_key.children().remove(), this.keymap = this.keyconfig[this.current_tab], "key" == this.current_tab) for (key in this.keymap) {
            var e = this.getKeyName(key);
            this.j_select_key.append('<option value="' + key + '">' + e + "</option>")
        } else if ("mouse" == this.current_tab) for (key in this.keymap) {
            e = key;
            this.j_select_key.append('<option value="' + key + '">' + e + "</option>")
        } else for (key in this.keymap) {
            e = key;
            this.j_select_key.append('<option value="' + key + '">' + e + "</option>")
        }
    },
    getKeyName: function (e) {
        var i = "";
        switch (e = "" + e) {
            case"32":
                i = "Space";
                break;
            case"13":
                i = "Enter";
                break;
            case"91":
                i = "Command_Mac";
                break;
            case"17":
                i = "Ctrl_Win";
                break;
            case"16":
                i = "Shift";
                break;
            case"9":
                i = "Tab";
                break;
            case"37":
                i = "LEFT";
                break;
            case"38":
                i = "UP";
                break;
            case"39":
                i = "RIGHT";
                break;
            case"40":
                i = "DOWN";
                break;
            case"8":
                i = "delete";
                break;
            case"27":
                i = "Esc"
        }
        return "" == i && (i = String.fromCharCode(e)), i.match(/[^A-Za-z0-9_]+/) && (i = ""), i
    },
    show: function (e) {
    }
}), Builder.Setting.GameSettingTheme = Builder.Core.Base.extend({
    defaults: {view_id: "GameSettingTheme"},
    j_view: {},
    map_config: {},
    current_tab: "key",
    show_only_match: !1,
    initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        this.map_config = app.tyrano.config, this.j_view.find(".navbar-nav").find("li").on("click", (function () {
            $(this).parents().find(".navbar-nav").find("li").removeClass("active"), $(this).addClass("active");
            var e = $(this).attr("data-nav");
            t.j_view.find(".tab-main").hide(), t.j_view.find("#" + e).show()
        })), t.j_view.find(".tab-change").hide(), t.j_view.find(".area_key").show();
        var n = this.j_view.find(".select_theme"), o = "ext/theme", c = app.io.getDirectories(app.dir_path + o), _ = {};
        for (var s in c) {
            var p = c[s].item, r = app.io.loadJson(app.dir_path + o + "/" + p + "/builder.json");
            _[p] = r, _[p].dlc = 0, _[p].path = "ext/theme/" + p + "/", n.append('<option value="' + p + '">' + _[p].name[global_lang] + "(" + _[p].width + "x" + _[p].height + ")</option>")
        }
        var d = "dlc/theme";
        if (app.io.exists(app.exe_path + d)) {
            var l = app.io.getDirectories(app.exe_path + d);
            for (var s in l) {
                p = l[s].item, r = app.io.loadJson(app.exe_path + d + "/" + p + "/theme_plugin/builder.json");
                _[p] = r, _[p].dlc = 1, _[p].path = "dlc/theme/" + p + "/theme_plugin/", n.append('<option value="' + p + '">' + _[p].name[global_lang] + "(" + _[p].width + "x" + _[p].height + ")</option>")
            }
        }
        n.val(app.config.project_config.map_theme.name);
        var h = this.j_view.find(".area_theme_preview");
        n.on("change", (function () {
            var e = n.val();
            if (h.empty(""), "" != e && _[e]) {
                var i = app.dir_path + _[e].path;
                1 == _[e].dlc && (i = app.exe_path + _[e].path), h.html("<img src='" + i + "/preview.png' width='300px' />"), "standard" == global_build && "1" == _[e].pro && h.append("<div style='color:red'>PRO版の特典テーマ</div>"), t.j_view.find(".message_color").minicolors("value", _[e].pm.font_color.replace("0x", "#")), t.j_view.find(".chara_name_color").minicolors("value", _[e].pm.name_color.replace("0x", "#")), _[e].width == app.tyrano.config.scWidth && _[e].height == app.tyrano.config.scHeight || $.alert($.s("Размер темы не соответствует размеру экрана и может отображаться неправильно")), t.j_view.find(".area_theme_info").hide(), "ja" == global_lang ? ("kopanda" == _[e].author ? (t.j_view.find(".link_theme_author").attr("data-url", $.s("https://kopacurve.blog.fc2.com/")), t.j_view.find(".link_theme_author").html($.s("空想曲線(クレジット表記必要。リンク先の規約をご確認ください)"))) : (t.j_view.find(".link_theme_author").attr("data-url", ""), t.j_view.find(".link_theme_author").html($.s("ティラノ公式（クレジット表記不要）"))), t.j_view.find(".area_theme_info").show()) : "kopanda" == _[e].author ? (t.j_view.find(".link_theme_author").attr("data-url", $.s("https://kopacurve.blog.fc2.com/")), t.j_view.find(".link_theme_author").html($.s("空想曲線(クレジット表記必要。リンク先の規約をご確認ください)"))) : (t.j_view.find(".link_theme_author").attr("data-url", ""), t.j_view.find(".link_theme_author").html($.s("Tyrano Official"))), t.j_view.find(".area_theme_special").hide(), _[e].special && 1 == _[e].special && t.j_view.find(".area_theme_special").show();
                let a = i + "/image/system/nextpage.gif";
                t.j_view.find(".theme_icon").attr("src", a)
            }
        })), this.j_view.find(".button_copy_icon").on("click", (e => {
            var i = n.val();
            if ("" != i) {
                var a = app.dir_path + _[i].path;
                1 == _[i].dlc && (a = app.exe_path + _[i].path), app.io.copy(a + "image/system/nextpage.gif", app.getProjectPath() + "tyrano/images/system/nextpage.gif"), $.alert($.s("Отражен"))
            } else $.alert($.s("Тема не выбрана"))
        })), this.j_view.find(".link_theme_author").on("click", (function (e) {
            var i = $(e.target).attr("data-url");
            app.gui.openWeb(i)
        })), this.j_view.find(".button_copy_special").on("click", (function (e) {
            let i = require("electron").remote.dialog.showOpenDialogSync(require("electron").remote.getCurrentWindow(), {
                properties: ["createDirectory", "openDirectory"],
                title: $.s("Укажите папку сохранения ресурса"),
                message: $.s("Укажите папку сохранения ресурса")
            });
            if (void 0 !== i) {
                var a = n.val();
                if ("" != a && _[a]) {
                    const e = app.exe_path + _[a].path + "/../edit_data",
                        t = i + "/" + _[a].name[global_lang] + "_assets";

                    function openExportedDir() {
                        app.gui.openDir(t);
                    }

                    function exportCompleted() {
                        Swal.fire({
                            title: $.s("Экспорт завершен"),
                            text: $.s("Экспорт игры завершен успешно. Хотите открыть папку?"),
                            icon: 'success',
                            showCancelButton: true,
                            color: "var(--vne-text-color)",
                            background: "var(--vne-right-panel-color)",
                            confirmButtonText: $.s("Да"),
                            cancelButtonText: $.s("Нет")
                        }).then((result) => {
                            if (result.isConfirmed) {
                                openExportedDir();
                            }
                        });
                    }

                    if (app.io.exists(t)) {
                        Swal.fire({
                            title: $.s("Внимание"),
                            text: $.s(`「${t}」 уже существует. Перезаписать?`),
                            icon: 'warning',
                            showCancelButton: true,
                            color: "var(--vne-text-color)",
                            background: "var(--vne-right-panel-color)",
                            confirmButtonText: $.s("Да, перезаписать"),
                            cancelButtonText: $.s("Нет")
                        }).then((result) => {
                            if (result.isConfirmed) {
                                app.io.copy(e, t);
                                exportCompleted();
                            }
                        });
                    } else {
                        app.io.copy(e, t);
                        exportCompleted();
                    }
                }
            }
        })), this.j_view.find("#checkThemeSearch").on("click", (function (e) {
            var i = $(e.target);
            t.show_only_match = i.prop("checked"), function () {
                for (var e in n.empty(), _) {
                    var i = !0;
                    1 == t.show_only_match && (_[e].width == app.tyrano.config.scWidth && _[e].height == app.tyrano.config.scHeight || (i = !1)), i && n.append('<option value="' + e + '">' + _[e].name[global_lang] + "(" + _[e].width + "x" + _[e].height + ")</option>")
                }
            }()
        })), this.j_view.find(".color_text").minicolors({
            change: function (i, a) {
                e.find(".color_text").val(i)
            }
        }), "" != app.config.project_config.map_theme.name && (t.j_view.find(".select_role_button").val(app.config.project_config.map_theme.button), t.j_view.find(".opacity").val(app.config.project_config.map_theme.opacity), t.j_view.find(".message_color").minicolors("value", app.config.project_config.map_theme.message_color.replace("0x", "#")), t.j_view.find(".chara_name_color").minicolors("value", app.config.project_config.map_theme.chara_name_color.replace("0x", "#"))), this.j_view.find(".opacity").spinner({
            min: 0,
            max: 255,
            step: 10,
            change: function (e, i) {
            }
        }), n.trigger("change"), this.j_view.find(".button_sbm").on("click", (function () {
            var e = n.val();
            if (_[e] && "1" == _[e].pro && "standard" == global_build) return $.alertProOnly(), !1;
            if (app.config.project_config.map_theme.name != e && ("" == app.config.project_config.map_theme.name || app.io.exists(app.getProjectPath() + "data/others/plugin/" + app.config.project_config.map_theme.name) && app.io.rmdir(app.getProjectPath() + "data/others/plugin/" + app.config.project_config.map_theme.name), "" != e)) {
                var i = app.dir_path + _[e].path;
                1 == _[e].dlc && (i = app.exe_path + _[e].path), app.io.copy(i, app.getProjectPath() + "data/others/plugin/" + e), t.j_view.find(".message_color").val(_[e].pm.font_color.replace("0x", "#")), t.j_view.find(".chara_name_color").val(_[e].pm.name_color.replace("0x", "#")), t.j_view.find(".opacity").val(_[e].pm.frame_opacity), app.config.project_config.map_theme.glink = _[e].glink, app.config.project_config.map_theme.jname = _[e].name[global_lang], app.config.project_config.map_theme.path = _[e].path;
                let a = i + _[e].glink + ".css";
                $.addCssFile(a)
            }
            app.config.project_config.map_theme.name = e;
            var a = t.j_view.find(".select_role_button").val(), o = t.j_view.find(".message_color").val(),
                c = t.j_view.find(".chara_name_color").val(), s = t.j_view.find(".opacity").val();
            app.config.project_config.map_theme.button = a, app.config.project_config.map_theme.message_color = o.replace("#", "0x"), app.config.project_config.map_theme.chara_name_color = c.replace("#", "0x"), app.config.project_config.map_theme.opacity = s, app.config.saveProjectConfig();
            var p = app.config.ks("plugin.ks", app.config.project_config.map_theme),
                r = app.getProjectPath() + "/data/scenario/system/plugin.ks";
            app.io.writeFile(r, p), alertNoBtn("Внимание", "Сохранено", "2000", "bottom-right", "info", "var(--vne-info-alert-color)")
        }))
    },
    show: function (e) {
    }
}), Builder.Setting.GameSettingChara = Builder.Core.Base.extend({
    defaults: {view_id: "GameSettingChara"}, j_view: {}, map_config: {}, initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        this.map_config = app.tyrano.config;
        var n = app.config.project_config.message_window;
        n.check_chara_mode && this.j_view.find(".check_chara_mode").attr("checked", "checked"), n.check_memory_chara_face && this.j_view.find(".check_memory_chara_face").attr("checked", "checked"), n.check_chara_anim && this.j_view.find(".check_chara_anim").attr("checked", "checked"), this.j_view.find(".text_chara_mod_time").val(n.text_chara_mod_time), n.select_chara_anim_mode ? this.j_view.find(".select_chara_anim_mode").val(n.select_chara_anim_mode) : this.j_view.find(".select_chara_anim_mode").val("easeInQuad"), this.j_view.find(".text_chara_mod_time").spinner({
            min: 0,
            step: 10,
            change: function (e, i) {
            }
        }), this.j_view.find(".text_pos_change_time").spinner({
            min: 0, step: 10, change: function (e, i) {
            }
        }), n.select_talk_focus && this.j_view.find(".select_talk_focus").val(n.select_talk_focus), n.text_pos_change_time ? this.j_view.find(".text_pos_change_time").val(n.text_pos_change_time) : this.j_view.find(".text_pos_change_time").val("600"), this.j_view.find(".navbar-nav").find("li").on("click", (function () {
            $(this).parents().find(".navbar-nav").find("li").removeClass("active"), $(this).addClass("active");
            var e = $(this).attr("data-nav");
            t.j_view.find(".tab-main").hide(), t.j_view.find("#" + e).show()
        })), this.j_view.find(".button_sbm").click((function () {
            n.check_chara_mode = t.j_view.find(".check_chara_mode").is(":checked"), n.text_chara_mod_time = t.j_view.find(".text_chara_mod_time").val(), n.check_memory_chara_face = t.j_view.find(".check_memory_chara_face").is(":checked"), n.check_chara_anim = t.j_view.find(".check_chara_anim").is(":checked"), n.select_chara_anim_mode = t.j_view.find(".select_chara_anim_mode").val(), n.select_talk_focus = t.j_view.find(".select_talk_focus").val(), n.text_pos_change_time = t.j_view.find(".text_pos_change_time").val();
            var e = app.config.ks("message_window.ks", n),
                i = app.getProjectPath() + "/data/scenario/system/message_window.ks";
            app.io.writeFile(i, e), app.config.setProjectConfig("message_window", n), alertNoBtn("Внимание", "Настройки обновлены", "2000", "bottom-right", "info", "var(--vne-info-alert-color)")
        }))
    }, show: function (e) {
    }
}), Builder.Setting.GameSettingCursor = Builder.Core.Base.extend({
    defaults: {view_id: "GameSettingCursor"},
    selected_cursor_file: "default",
    j_view: {},
    map_config: {},
    initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        this.map_config = app.tyrano.config;
        app.tyrano.tyrano_lang.novel;
        var n = this.map_config.cursorDefault, o = $('<img style="width:40px;" />');
        if ("default" == n) this.j_view.find("#area_cursor_file").hide(); else {
            this.j_view.find(".check_cursor").prop("checked", "checked"), this.j_view.find("#area_cursor_file").show();
            var c = app.getProjectPath() + "data/image/" + n;
            o.attr("src", c), this.j_view.find(".selected_image").html(o)
        }
        this.j_view.find(".button_image_select").click((function () {
            app.window.show("SelectFile", {
                title: $.s("Выберите изображение"),
                width: 640,
                height: 400,
                file_path: "image/",
                folder: "",
                folder_select: !1,
                base_url: "data/image/"
            }, (function (e) {
                var i = app.getProjectPath() + "data/image/" + e;
                t.j_view.find(".selected_image").html(""), t.j_view.find(".selected_image").append('<img src="' + i + '" style="width:40px;" />'), t.selected_cursor_file = e
            }))
        })), this.j_view.find(".check_cursor").change((function (e) {
            $(this).is(":checked") ? (t.j_view.find("#area_cursor_file").show(), t.j_view.find(".selected_image").empty()) : (t.j_view.find("#area_cursor_file").hide(), t.selected_cursor_file = "default")
        })), this.j_view.find(".button_sbm").click((function () {
            t.map_config.cursorDefault = t.selected_cursor_file;
            var e = app.getDataPath() + "system/Config.tjs";
            app.config.writeTyranoConfig(e, t.map_config), alertNoBtn("Внимание", "Настройки обновлены", "2000", "bottom-right", "info", "var(--vne-info-alert-color)")
        }))
    },
    show: function (e) {
    }
}), Builder.Window.ComponentManage = Builder.Window.Base.extend({
    defaults: {view_id: "ComponentManage"}, j_view: {}, map_config: {}, initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        this.map_config = app.tyrano.config;
        var n = this.j_view.find(".cpn-component-block");

        function o() {
            n.empty(), n.append(app.createActiveComponentIcons({type: 2})), n.find(".cpn-group").addClass("active"), n.find(".cpn-body").show(), n.find(".check_item").change((function (e) {
                $(this).prop("checked");
                var i = $(this).closest(".cpn-group").find(".check_group");
                if ($(this).closest(".cpn-item").hasClass("pro_1") && "standard" == global_build) return $(this).prop("checked", !1), i.prop("checked", !1), $.alertProOnly(), !1;
                i.prop("checked", !1), $(this).closest(".cpn-body").find(".check_item").each((function () {
                    $(this).prop("checked") && i.prop("checked", !0)
                }))
            })), n.find(".cpn-item").find("span").click((function (e) {
                var i = $(this).parent().find("input[type='checkbox']");
                1 == i.prop("checked") ? i.prop("checked", !1) : i.prop("checked", !0), i.trigger("change")
            })), n.find(".cpn-item").hover((function () {
                var e = $(this).attr("item-tag"), i = _component_manage,
                    a = $(this).closest(".cpn-group").find(".cpn-header").attr("data-group"), n = i[a].components,
                    o = "<div class='group-" + a + "'>";
                o += '     <div class="cpn-item help component_btn" >', o += '         <span class="tb-i-' + n[e].icon + '" title=""></span>', o += '         <span class="text">' + $.s(n[e].name) + "</span>", o += "     </div>", o += '     <br style="clear:both">', o += '     <div style="margin-left:30px">', o += '           <span class="text">' + $.s(n[e].help) + "</span>", o += "     </div>", o += " </div>", t.j_view.find(".component_help_area").html(o)
            }), (function () {
                t.j_view.find(".component_help_area").empty()
            })), n.find(".check_group").click((function (e) {
                var i = $(this).prop("checked"), a = $(this).attr("data-group");
                1 == i ? t.j_view.find(".group-" + a).find("input[type='checkbox']").each((function () {
                    $(this).closest(".cpn-item").hasClass("pro_1") && "standard" == global_build || $(this).prop("checked", !0)
                })) : t.j_view.find(".group-" + a).find("input[type='checkbox']").each((function () {
                    $(this).prop("checked", !1)
                }))
            }))
        }

        o(), this.j_view.find(".nav-item").on("click", (function () {
            $(this).parents().find(".nav-item").removeClass("active"), $(this).addClass("active");
            var e = $(this).attr("data-nav");
            t.j_view.find(".tab-main").hide(), t.j_view.find("#tab-" + e).show()
        }));
        let c = app.config.project_config.map_fav;
        const _ = this.j_view.find(".select_fav");
        let s = "";

        function p() {
            for (key in _.empty(), c) _.append('<option value="' + key + '">' + key + "</option>");
            "" != s && _.val(s)
        }

        p(), setTimeout((function () {
            _.trigger("change")
        }), 100), _.on("change", (e => {
            let i = _.val();
            this.j_view.find(".input_name").val(i)
        })), this.j_view.find(".btn_apply_fav").on("click", (e => {
            let i = _.val(), a = $.trim(this.j_view.find(".input_name").val());
            return "" == a ? (alertNoBtn("Внимание", "Имя избранного не может быть пустым", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1) : app.config.project_config.map_fav[a] ? (alertNoBtn("Внимание", "Уже существует", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1) : i ? (c[a] = c[i], delete c[i], s = a, app.config.project_config.map_fav = c, app.config.project_config.component_manage.fav[a] = app.config.project_config.component_manage.fav[i], delete app.config.project_config.component_manage.fav[i], app.config.saveProjectConfig(), app.view.current_view_obj.refleshFavIcons(), p(), o(), void app.refleshComponentIcons(app.view.current_view_obj.j_view)) : ($.alert($.s("Избранное не выбрано")), !1)
        })), this.j_view.find(".btn_delete_fav").on("click", (e => {
            let i = _.val();
            Swal.fire({
                title: $.s("Внимание"),
                text: $.s("Вы уверены, что хотите удалить выбранное избранное?"),
                icon: 'warning',
                showCancelButton: true,
                color: "var(--vne-text-color)",
                background: "var(--vne-right-panel-color)",
                confirmButtonText: $.s("Да"),
                cancelButtonText: $.s("Отмена")
            }).then((result) => {
                if (result.isConfirmed) {
                    delete app.config.project_config.map_fav[i];
                    delete app.config.project_config.component_manage.fav[i];
                    app.config.saveProjectConfig();
                    app.view.current_view_obj.refleshFavIcons();
                    p();
                    o();
                    app.refleshComponentIcons(app.view.current_view_obj.j_view);
                }
            });

        })), this.j_view.find(".btn_apply_component").click((function () {
            reloadAlertSettings("Перезагрузка проекта", "Нужно для того чтобы все изменения вступили в силу", 1500)
            var e = {};
            t.j_view.find(".cpn-group").each((function () {
                var i = $(this), a = i.find(".check_group").attr("data-group");
                e[a] = {}, i.find(".check_item").each((function () {
                    var i = $(this), t = i.attr("data-tag");
                    1 == i.prop("checked") && (e[a][t] = "true")
                }))
            })), app.config.project_config.component_manage = e, app.config.saveProjectConfig(), app.refleshComponentIcons(app.view.current_view_obj.j_view)
        }))
    }, show: function (e) {
    }
}), Builder.Setting.vnEffectorGameSettings = Builder.Core.Base.extend({
    defaults: {view_id: "vnEffectorGameSettings"}, j_view: {}, map_config: {}, initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        this.map_config = app.tyrano.config, void 0 !== app.config.user_config.tab_mode && this.j_view.find(".check_tab_mode").attr("checked", app.config.user_config.tab_mode), void 0 !== app.config.user_config.show_help && this.j_view.find(".check_show_help").attr("checked", app.config.user_config.show_help), void 0 !== app.config.user_config.component_open && this.j_view.find(".select_component_open").val(app.config.user_config.component_open), void 0 !== app.config.user_config.text_cmp_font_size && this.j_view.find(".text_cmp_font_size").val(app.config.user_config.text_cmp_font_size), void 0 !== app.config.user_config.text_cmp_height && this.j_view.find(".text_cmp_height").val(app.config.user_config.text_cmp_height), this.j_view.find(".spinner-1").spinner({
            min: 7,
            max: 200,
            step: 1,
            change: function (e, i) {
            }
        }), this.j_view.find(".spinner-10").spinner({
            min: 50, max: 2e3, step: 10, change: function (e, i) {
            }
        }), this.j_view.find(".navbar-nav").find("li").on("click", (function () {
            $(this).parents().find(".navbar-nav").find("li").removeClass("active"), $(this).addClass("active");
            var e = $(this).attr("data-nav");
            t.j_view.find(".tab-main").hide(), t.j_view.find("#" + e).show()
        })), this.j_view.find(".button_sbm").click((function () {
            var e = t.j_view.find(".check_tab_mode").is(":checked"),
                i = t.j_view.find(".check_show_help").is(":checked"), a = t.j_view.find(".select_component_open").val();
            app.config.user_config.tab_mode = e, app.config.user_config.show_help = i, app.config.user_config.text_cmp_font_size = t.j_view.find(".text_cmp_font_size").val(), app.config.user_config.text_cmp_height = t.j_view.find(".text_cmp_height").val(), app.config.user_config.text_cmp_height_save = t.j_view.find(".text_cmp_height_save").is(":checked"), i ? ($(".area_help_show").show(), $(".area_help_hide").hide()) : ($(".area_help_show").hide(), $(".area_help_hide").show()), app.config.user_config.component_open = a, app.view.current_view_obj.setComponentSetting(), app.config.saveUserConfig(), reloadAlertSettings("Внимание", "Проект будет перезагружен через 3 секунды!", 3000)
        }))
    }, show: function (e) {
    }
}), Builder.Setting.GameSettingCgmode = Builder.Core.Base.extend({
    defaults: {view_id: "GameSettingCgmode"}, j_view: {}, map_config: {}, initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        this.map_config = app.tyrano.config;
        var n = app.config.project_config.map_cg, o = n.map_page, c = n.map_image, _ = this.j_view.find(".text_page"),
            s = this.j_view.find(".select_page"), p = this.j_view.find(".button_add_page"), r = "";
        for (key in o) s.append('<option value="' + key + '">' + key + "</option>");
        this.j_view.find(".navbar-nav").find("li").on("click", (function () {
            $(this).parents().find(".navbar-nav").find("li").removeClass("active"), $(this).addClass("active");
            var e = $(this).attr("data-nav");
            t.j_view.find(".tab-main").hide(), t.j_view.find("#" + e).show()
        })), p.on("click", (function () {
            var e = $.trim(_.val());
            return "" == e ? (alertNoBtn("Внимание", "Пожалуйста, выберите название галереи", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1) : void 0 !== o[e] ? (alertNoBtn("Внимание", "Название уже зарегистрировано", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1) : (o[e] = 1, _.val(""), s.append('<option value="' + e + '">' + e + "</option>"), n.map_page = o, app.config.project_config.map_cg = n, void app.config.saveProjectConfig())
        })), this.j_view.find(".button_remove_page").on("click", (function () {
            var e = s.val();
            if (!e) return alertNoBtn("Внимание", "Пожалуйста, выберите галерею", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
            delete n.map_page[e], s.children("option[value=" + e + "]").remove(), $.alert($.s("Удалено"))
        })), this.j_view.find(".button_edit_page").on("click", (function () {
            var e = s.val();
            if (!e) return alertNoBtn("Внимание", "Пожалуйста, выберите галерею", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
            var i = app.tyrano.config.scWidth, a = app.tyrano.config.scHeight, t = e + ".ks";
            app.window.show("VisualMaker", {
                title: $.s("Визуальный редактор"),
                scenario_file: t,
                scenario_dir: "",
                width: i,
                height: a,
                padding: "none",
                component: ["cg", "bg", "image", "button"]
            }, (function (e) {
            }))
        })), this.j_view.find(".button_edit_scenario_copy").on("click", (function () {
            var e = s.val();
            if (!e) return alertNoBtn("Внимание", "Пожалуйста, выберите галерею", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
            var i = e + ".ks";
            app.tmp.selected_context_scenario = i, app.window.show("CopyScenario", {
                title: $.s("Дублировать файл"),
                width: 700,
                height: 240,
                load_scenario: "off"
            }, (function (e) {
                s.append('<option value="' + e + '">' + e + "</option>"), o[e] = 1, n.map_page = o, app.config.project_config.map_cg = n, app.config.saveProjectConfig(), app.view.current_view_obj.reloadScenario(), app.view.current_view_obj.refleshScenarioTree()
            }))
        }));
        var d = this.j_view.find(".text_cg"), l = this.j_view.find(".select_cg"),
            h = this.j_view.find(".select_cg_image"), f = this.j_view.find(".button_add_cg");
        for (key in c) l.append('<option value="' + key + '">' + key + "</option>");
        l.on("change", (function () {
            h.empty();
            for (var e = l.val(), i = n.map_image[e], a = 0; a < i.length; a++) {
                var t = i[a];
                h.append('<option value="' + t + '">' + t + "</option>")
            }
            h.val(h.find("option:first").val()), h.trigger("change")
        })), h.on("change", (function () {
            r = h.val(), t.j_view.find(".preview_cg_area").attr("src", app.getProjectPath() + "data/bgimage/" + r)
        })), f.on("click", (function () {
            var e = $.trim(d.val());
            return "" == e ? (alertNoBtn("Внимание", "Введите имя изображения", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1) : void 0 !== c[e] ? (alertNoBtn("Внимание", "Имя CG уже зарегистрировано.", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1) : (c[e] = [], d.val(""), l.append('<option value="' + e + '">' + e + "</option>"), n.map_image = c, void console.log(n))
        })), this.j_view.find(".button_remove_cg").on("click", (function () {
            var e = l.val();
            if ("" == $.isNull(e)) return $.alert($.s("Выберите изображение")), !1;
            delete n.map_image[e], l.children("option[value=" + e + "]").remove(), $.alert($.s("Удалено"))
        })), this.j_view.find(".button_add_cg_image").on("click", (function () {
            var e = l.val();
            if ("" == $.isNull(e)) return alertNoBtn("Внимание", "Выберите изображение", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
            app.window.show("SelectFile", {
                title: $.s("Выберите изображение"),
                width: 640,
                height: 400,
                file_path: "bgimage/",
                folder: "",
                folder_select: !1,
                base_url: "data/bgimage/"
            }, (function (i) {
                c[e].push(i);
                var a = app.getProjectPath() + "data/bgimage/" + i;
                l.trigger("change"), t.j_view.find(".preview_cg_area").attr("src", a)
            }))
        })), this.j_view.find(".button_remove_cg_image").on("click", (function () {
            var e = h.val();
            if ("" == $.isNull(e)) return alertNoBtn("Внимание", "Выберите изображение", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
            for (var i = l.val(), a = c[i], t = 0; t < a.length; t++) a[t] == e && a.splice(t, 1);
            h.children("option[value='" + e + "']").remove(), e = "", alertNoBtn("Внимание", "Удалено", "2000", "bottom-right", "info", "var(--vne-info-alert-color)")
        })), this.j_view.find(".button_move_cg_image").on("click", (function () {
            var e = $(this).attr("data-move"), i = l.val(), a = h.prop("selectedIndex"), t = a, n = c[i];
            if ("up" == e) {
                if (a <= 0) return !1;
                n.splice(a - 1, 2, n[a], n[a - 1]), t -= 1
            } else {
                if (a + 1 >= h.children().length) return !1;
                n.splice(a, 2, n[a + 1], n[a]), t += 1
            }
            c[i] = n, l.trigger("change"), h.prop("selectedIndex", t)
        }));
        var v = app.config.project_config.message_window, g = "";
        g = v.cg_noimage ? app.getProjectPath() + "data/image/" + v.cg_noimage : app.getProjectPath() + "data/image/noimage.png", t.j_view.find(".preview_noimage").attr("src", g), this.j_view.find(".button_noimage_file").on("click", (function () {
            var e = "image/";
            app.window.show("SelectFile", {
                title: $.s("Выберите изображение"),
                width: 640,
                height: 500,
                file_path: e,
                folder: "",
                folder_select: !0,
                base_url: "data/image/"
            }, (function (i) {
                var a = app.getProjectPath() + "data/" + e + i;
                t.j_view.find(".preview_noimage").attr("src", a), v.cg_noimage = i;
                var n = app.config.ks("message_window.ks", v),
                    o = app.getProjectPath() + "/data/scenario/system/message_window.ks";
                app.io.writeFile(o, n), app.config.setProjectConfig("message_window", v)
            }))
        })), this.j_view.find(".button_sbm").on("click", (function () {
            n.map_page = o, n.map_image = c, app.config.project_config.map_cg = n, app.config.saveProjectConfig();
            var e = app.getProjectPath() + "data/scenario/system/master_cg.ks", i = "";
            for (key in c) {
                var a = c[key];
                i += "*" + key + " \n", i += "[cm][clearfix] \n";
                for (var t = 0; t < a.length; t++) {
                    var _ = {
                        name: "cg_image",
                        layer: "1",
                        zindex: 10,
                        time: 100,
                        storage: a[t],
                        folder: "bgimage",
                        visible: "true",
                        width: app.tyrano.config.scWidth,
                        height: app.tyrano.config.scHeight
                    };
                    i += $.tag("image", _) + "\n", i += "[l] \n"
                }
                i += "[awakegame] \n"
            }
            app.io.writeFile(e, i), alertNoBtn("Внимание", "Сохранено", "2000", "bottom-right", "info", "var(--vne-info-alert-color)")
        }))
    }, refleshCgImageList: function () {
    }, show: function (e) {
    }
}), Builder.Setting.GameSettingReplaymode = Builder.Core.Base.extend({
    defaults: {view_id: "GameSettingReplaymode"}, j_view: {}, map_config: {}, initialize: function (e, i, a) {
        this.j_view = e, this.call_back = a, this.data = i;
        var t = this;
        this.map_config = app.tyrano.config;
        var n = app.config.project_config.map_replay, o = n.map_page, c = n.map_jump,
            s = this.j_view.find(".text_page"), p = this.j_view.find(".select_page"),
            r = this.j_view.find(".button_add_page"), d = "";
        for (key in o) p.append('<option value="' + key + '">' + key + "</option>");
        this.j_view.find(".navbar-nav").find("li").on("click", (function () {
            $(this).parents().find(".navbar-nav").find("li").removeClass("active"), $(this).addClass("active");
            var e = $(this).attr("data-nav");
            t.j_view.find(".tab-main").hide(), t.j_view.find("#" + e).show()
        })), r.on("click", (function () {
            var e = $.trim(s.val());
            return "" == e ? (alertNoBtn("Внимание", "Пожалуйста, выберите название галереи", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1) : void 0 !== o[e] ? (alertNoBtn("Внимание", "Название уже зарегистрировано", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1) : (o[e] = 1, s.val(""), p.append('<option value="' + e + '">' + e + "</option>"), n.map_page = o, app.config.project_config.map_replay = n, void app.config.saveProjectConfig())
        })), this.j_view.find(".button_remove_page").on("click", (function () {
            var e = p.val();
            if (!e) return $.alert($.s("Пожалуйста, выберите галерею")), !1;
            delete n.map_page[e], p.children("option[value=" + e + "]").remove(), alertNoBtn("Внимание", "Удалено", "2000", "bottom-right", "info", "var(--vne-info-alert-color)")
        })), this.j_view.find(".button_edit_page").on("click", (function () {
            var e = p.val();
            if (!e) return $.alert($.s("Пожалуйста, выберите галерею")), !1;
            var i = app.tyrano.config.scWidth, a = app.tyrano.config.scHeight, t = e + ".ks";
            app.window.show("VisualMaker", {
                title: $.s("Визуальный редактор"),
                scenario_file: t,
                scenario_dir: "",
                width: i,
                height: a,
                padding: "none",
                component: ["replay", "bg", "image", "button"]
            }, (function (e) {
            }))
        })), this.j_view.find(".button_edit_scenario_copy").on("click", (function () {
            var e = p.val();
            if (!e) return alertNoBtn("Внимание", "Пожалуйста, выберите галерею", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
            var i = e + ".ks";
            app.tmp.selected_context_scenario = i, app.window.show("CopyScenario", {
                title: $.s("Дублировать файл"),
                width: 700,
                height: 240,
                load_scenario: "off"
            }, (function (e) {
                p.append('<option value="' + e + '">' + e + "</option>"), o[e] = 1, n.map_page = o, app.config.project_config.map_replay = n, app.config.saveProjectConfig(), app.view.current_view_obj.reloadScenario(), app.view.current_view_obj.refleshScenarioTree()
            }))
        }));
        var l = this.j_view.find(".text_replay"), h = this.j_view.find(".select_replay"),
            f = this.j_view.find(".select_storage"), v = this.j_view.find(".select_label"),
            g = this.j_view.find(".button_add_replay"), m = $.keys(app.tmp.map_label);
        m = _.select(m, (function (e) {
            return !_.any(["first.ks", "make.ks", "_preview.ks", "config.ks"], (function (i) {
                return i === e
            }))
        }));
        for (var w = 0; w < m.length; w++) f.append("<option value='" + m[w] + "'>" + m[w] + "</option>");
        for (key in f.on("change", (function () {
            var e = f.val(), i = app.tmp.map_label[e];
            v.empty(), v.append("<option value=''>---</option>");
            for (var a = 0; a < i.length; a++) {
                var t = i[a];
                v.append("<option value='" + t + "'>" + t + "</option>")
            }
            c[d].storage = e
        })), v.on("change", (function () {
            var e = $(this).val();
            c[d].target = e
        })), c) h.append('<option value="' + key + '">' + key + "</option>");
        h.on("change", (function () {
            d = $(this).val();
            var e = n.map_jump[d];
            if ("" == e.storage) return f.val(""), void v.val("");
            f.val(e.storage), f.trigger("change"), v.val(e.target)
        })), g.on("click", (function () {
            var e = $.trim(l.val());
            return "" == e ? (alertNoBtn("Внимание", "Введите имя повтора", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1) : void 0 !== c[e] ? (alertNoBtn("Внимание", "Имя повтора уже зарегистрировано", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1) : (c[e] = {
                storage: "",
                target: ""
            }, h.append('<option value="' + e + '">' + e + "</option>"), n.map_jump = c, void l.val(""))
        })), this.j_view.find(".button_remove_replay").on("click", (function () {
            var e = h.val();
            if ("" == $.isNull(e)) return $.alert($.s("Выберите повтор")), !1;
            delete n.map_jump[e], h.children("option[value=" + e + "]").remove(), $.alert($.s("Удалено"))
        }));
        var u = app.config.project_config.message_window, j = "";
        j = u.replay_noimage ? app.getProjectPath() + "data/image/" + u.replay_noimage : app.getProjectPath() + "data/image/noimage.png", t.j_view.find(".preview_noimage").attr("src", j), this.j_view.find(".button_noimage_file").on("click", (function () {
            var e = "image/";
            app.window.show("SelectFile", {
                title: $.s("Выберите изображение"),
                width: 640,
                height: 500,
                file_path: e,
                folder: "",
                folder_select: !0,
                base_url: "data/image/"
            }, (function (i) {
                var a = app.getProjectPath() + "data/" + e + i;
                t.j_view.find(".preview_noimage").attr("src", a), u.replay_noimage = i;
                var n = app.config.ks("message_window.ks", u),
                    o = app.getProjectPath() + "/data/scenario/system/message_window.ks";
                app.io.writeFile(o, n), app.config.setProjectConfig("message_window", u)
            }))
        })), this.j_view.find(".button_sbm").on("click", (function () {
            n.map_page = o, n.map_jump = c, app.config.project_config.map_replay = n, app.config.saveProjectConfig(), alertNoBtn("Внимание", "Сохранено", "2000", "bottom-right", "info", "var(--vne-info-alert-color)")
        }))
    }, refleshCgImageList: function () {
    }, show: function (e) {
    }
});