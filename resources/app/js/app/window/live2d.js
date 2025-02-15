var live2d;
Live2dWindow = {}, Live2dWindow = Builder.Core.Base.extend({
    defaults: {}, selected_motion: "", live2d_model: {}, param: {}, init: function () {
        var e = this, a = app.live2d.models, t = $(".select_model");
        app.live2d.loadModel(), this.param = app.live2d.select_window_data;
        var n = this.param.target, o = app.live2d.selected_live2d_model_for_window, l = 0;
        for (var i in a) t.append('<option value="' + i + '">' + i + "</option>"), l++;
        o && t.val(o);
        var d = $(".select_motion"), r = $(".select_motion_no"), s = $(".select_expression"), c = !1, v = 0, p = 0,
            _ = 0, m = 0;
        $("#live2d_canvas_tyrano").on("mousedown", (function (e) {
            c = !0;
            var a = e.target.getBoundingClientRect(), t = e.clientX - a.left, n = e.clientY - a.top,
                o = tyranolive2dplugin.getTyranoManager().convertCanvasPos(t, n);
            v = o.x - _, p = o.y - m
        })), $("#live2d_canvas_tyrano").on("mouseup", (function (e) {
            c = !1
        })), $("#live2d_canvas_tyrano").on("mousemove", (function (e) {
            if (c) {
                var a = e.target.getBoundingClientRect(), t = e.clientX - a.left, n = e.clientY - a.top,
                    l = tyranolive2dplugin.getTyranoManager().convertCanvasPos(t, n), i = l.x - v, d = l.y - p;
                _ = i, m = d, tyranolive2dplugin.getTyranoManager().updateModel({x: i, y: d, name: o})
            }
        }));
        var u = 2;
        $("#live2d_canvas_tyrano").on("mousewheel", (function (e) {
            e.preventDefault(), (e.originalEvent.deltaY ? -e.originalEvent.deltaY : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -e.originalEvent.detail) < 0 ? u -= .2 : u += .2, tyranolive2dplugin.getTyranoManager().updateModel({
                scale: u,
                name: o
            })
        }));
        var g = $('<input class="button_input_file" type="file" />');
        g.change((function () {
            var e = this.files[0];
            if (null != e) {
                var a = e.name;
                if ("trial" == global_build && l >= 3) return $.alert($.s("В демо-версии можно добавить только 3 Lie2D модели")), !1;
                if (-1 != a.indexOf("model.json")) return void alertNoBtn("Внимание", "Выберите файл model3.json. Версии до Cubism3.0 не поддерживаются", "2000", "bottom-right", "info", "var(--vne-info-alert-color)");
                if (-1 == a.indexOf("model3.json")) return void alertNoBtn("Внимание", "Выберите файл model3.json. Cubism3.0", "2000", "bottom-right", "info", "var(--vne-info-alert-color)");
                var t = $.replaceAll(a, ".model3.json", ""), n = app.getDataPath() + "others/plugin/live2d/model/" + t,
                    o = $.replaceAll(e.path, a, "");
                if (app.io.exists(n)) {
                    if (!$.confirm($.s("「") + a + $.s("\" уже существует. Перезаписать?"))) return;
                    app.io.copy(o, n)
                } else app.io.copy(o, n);
                $.alert(t + " " + $.s("Дополнительно"), (function () {
                    location.reload()
                }))
            }
        })), $(".button_add_model").click((function () {
            g.trigger("click")
        }));
        $(".select_model").change((function () {
            var e = tyranolive2dplugin.getTyranoManager();
            e.deleteAllModel(), c = !1, v = 0, p = 0, _ = 0, m = 0, u = 2, d.empty(), r.empty();
            var a = $(".select_model").children(":selected").val(), t = app.live2d.getMotion(a);
            for (i in o = a, t) d.append('<option value="' + i + '">' + i + "</option>");
            app.live2d.models[o];
            var n = app.getDataPath() + "others/plugin/live2d/model/";
            e.setResourcesPath(n);
            var l = {
                name: o,
                model_id: o,
                idle: "Idle",
                x: "0",
                y: "0",
                scale: "2",
                visible: "true",
                lip: "false",
                lip_time: "100",
                lip_value: "0"
            }, g = app.live2d.getExpression(o);
            for (i in s.empty(), g) {
                var h = g[i];
                s.append('<option value="' + h.Name + '">' + h.Name + "</option>")
            }
            e.addModel(l), d.trigger("change")
        }));
        $("#model_preview_area");
        if (e.selected_motion = "", d.on("change", (function (a) {
            var t = d.children(":selected").val();
            if (e.selected_motion = t, void 0 !== e.selected_motion) {
                tyranolive2dplugin.getTyranoManager().setMotion(o, e.selected_motion, 0, "true")
            }
            r.empty();
            var n = app.live2d.getMotion(o);
            if (e.selected_motion) for (var l = n[e.selected_motion], i = 0; i < l.length; i++) {
                var s = l[i].File;
                r.append('<option value="' + i + '">' + s + "</option>")
            }
        })), r.on("change", (function () {
            var a = r.children(":selected").val();
            tyranolive2dplugin.getTyranoManager().setMotion(o, e.selected_motion, a, "true")
        })), s.on("change", (function (e) {
            var a = $(this).val();
            tyranolive2dplugin.getTyranoManager().setExpression(o, a)
        })), $(".radio_live2d_kind").on("change", (function (e) {
            "motion" == $(this).val() ? ($(".area_select_expression").hide(), $(".area_select_motion").show()) : ($(".area_select_expression").show(), $(".area_select_motion").hide())
        })), "motion" == n) {
            $(".button_chara_sbm").show(), $(".button_chara_sbm").click((function () {
                var a = $(".select_motion").children(":selected").val(),
                    t = $(".select_motion_no").children(":selected").val();
                e.param.call_back(a, t), app.window.close("Live2D")
            }));
            var h = e.param.selected_model, f = e.param.selected_motion;
            e.selected_motion = f, $(".select_model").val(h), $(".select_model").attr("disabled", "disabled"), $(".radio_live2d_kind").attr("disabled", "disabled"), $(".button_add_model").hide(), $(".select_model").trigger("change")
        } else if ("expression" == n) {
            $(".button_chara_sbm").val($.s("Определение выражения")), $(".button_chara_sbm").show(), $(".button_chara_sbm").click((function () {
                var a = $(".select_expression").children(":selected").val();
                e.param.call_back(a), app.window.close("Live2D")
            }));
            h = e.param.selected_model;
            var y = e.param.selected_expression;
            $("input[name=radio_live2d]:eq(1)").prop("checked", !0), $(".radio_live2d_kind").trigger("change"), $(".select_model").val(h), $(".select_expression").val(y), $(".radio_live2d_kind").val("expression"), $(".select_model").attr("disabled", "disabled"), $(".radio_live2d_kind").attr("disabled", "disabled"), $(".button_add_model").hide(), $(".select_model").trigger("change")
        } else $(".button_chara_remove").show(), $(".button_chara_remove").click((function () {
            const e = $(".select_model").children(":selected").val();
            $.confirm($.s("Модель Live 2D будет удалена. Продолжить?"), (function () {
                app.live2d.removeModel(e), location.reload()
            }))
        })), $(".select_model").trigger("change")
    }, transLang: function () {
        var e = $(".lang");
        $.lang_html(e)
    }, close: function () {
    }
}), $(window).load((function () {
    (live2d = new Live2dWindow).transLang(), setTimeout((function () {
        live2d.transLang()
    }), 500), live2d.init()
}));