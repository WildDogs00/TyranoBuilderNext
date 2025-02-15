var live2d_bound;
Live2dBoundWindow = {}, Live2dBoundWindow = Builder.Core.Base.extend({
    defaults: {},
    selected_motion: "",
    live2d_model: {},
    param: {},
    Live2Dglno: 0,
    j_x: {},
    j_y: {},
    j_scale: {},
    init: function () {
        $("#live2d_canvas_tyrano").attr("width", app.tyrano.config.scWidth + "px"), $("#live2d_canvas_tyrano").attr("height", app.tyrano.config.scHeight + "px");
        var e = this;
        app.live2d.models, $(".select_model");
        this.param = app.live2d.select_window_data;
        var a = this.param.selected_model, n = ($("#bound_select"), app.live2d.models[a], this.param.scale),
            l = this.param.background_url;
        "" != l && $("#bound_background_img").attr("src", l);
        $("#button_bound");
        this.j_x = $(".bound_x"), this.j_y = $(".bound_y"), this.j_scale = $(".bound_scale"), this.j_x.val(this.param.x), this.j_y.val(this.param.y), this.j_scale.val(n), this.j_x.on("change", (function (e) {
            var n = $(this).val();
            current_x = n, tyranolive2dplugin.getTyranoManager().updateModel({x: current_x, name: a})
        })), this.j_y.on("change", (function (e) {
            var n = $(this).val();
            current_y = n, tyranolive2dplugin.getTyranoManager().updateModel({y: current_y, name: a})
        })), this.j_scale.on("change", (function (e) {
            var n = $(this).val();
            current_scale = n, tyranolive2dplugin.getTyranoManager().updateModel({scale: current_scale, name: a})
        })), $("#bound_panel").draggable({
            scroll: !1, drag: function (e, a) {
            }
        }), $("#button_bound").click((function () {
            var a = {x: e.j_x.val(), y: e.j_y.val(), scale: e.j_scale.val()};
            e.param.call_back(a), app.window.close("Live2DBound")
        })), this.setLive2D(this.param);
        var t = $(".lang");
        $.lang_html(t)
    },
    setLive2D: function (e) {
        var a = this, n = e.selected_model, l = tyranolive2dplugin.getTyranoManager();
        l.deleteAllModel();
        app.live2d.models[n];
        var t = app.getDataPath() + "others/plugin/live2d/model/";
        l.setResourcesPath(t);
        var o = e.map_live2d;
        for (key in o) {
            var i = o[key];
            if (key == n) 0 == e.x && 0 == e.y && 1 == e.scale && (e.x = i.x, e.y = i.y, e.scale = i.scale); else {
                var r = {
                    name: key,
                    model_id: key,
                    idle: "Idle",
                    x: i.x,
                    y: i.y,
                    scale: i.scale,
                    visible: "true",
                    lip: "false",
                    lip_time: "100",
                    lip_value: "0"
                };
                l.addModel(r)
            }
        }
        var d = {
            name: n,
            model_id: n,
            idle: "Idle",
            x: e.x,
            y: e.y,
            scale: e.scale,
            visible: "true",
            lip: "false",
            lip_time: "100",
            lip_value: "0"
        };
        l.addModel(d);
        var s = !1, v = 0, c = 0, u = parseFloat(e.x), _ = parseFloat(e.y), p = parseFloat(e.scale);
        $("#live2d_canvas_tyrano").on("mousedown", (function (e) {
            s = !0;
            var a = e.target.getBoundingClientRect(), n = e.clientX - a.left, l = e.clientY - a.top,
                t = tyranolive2dplugin.getTyranoManager().convertCanvasPos(n, l);
            v = t.x - u, c = t.y - _
        })), $("#live2d_canvas_tyrano").on("mouseup", (function (e) {
            s = !1
        })), $("#live2d_canvas_tyrano").on("mousemove", (function (e) {
            if (s) {
                var l = e.target.getBoundingClientRect(), t = e.clientX - l.left, o = e.clientY - l.top,
                    i = tyranolive2dplugin.getTyranoManager().convertCanvasPos(t, o), r = i.x - v, d = i.y - c;
                u = Math.floor(r * Math.pow(10, 2)) / Math.pow(10, 2), _ = Math.floor(d * Math.pow(10, 2)) / Math.pow(10, 2), tyranolive2dplugin.getTyranoManager().updateModel({
                    x: u,
                    y: _,
                    name: n
                }), a.j_x.val(u), a.j_y.val(_)
            }
        })), $("#live2d_canvas_tyrano").on("mousewheel", (function (e) {
            e.preventDefault(), (e.originalEvent.deltaY ? -e.originalEvent.deltaY : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -e.originalEvent.detail) < 0 ? p -= .1 : p += .1, a.j_scale.val(Math.floor(p * Math.pow(10, 2)) / Math.pow(10, 2)), tyranolive2dplugin.getTyranoManager().updateModel({
                scale: p,
                name: n
            })
        }))
    },
    close: function () {
    }
}), $(window).load((function () {
    (live2d_bound = new Live2dBoundWindow).init()
}));