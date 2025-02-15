Builder.Core.Param = Builder.Core.Base.extend({
    defaults: {array_param: []}, map_param: {}, j_root: {}, initialize: function (a) {
        this.c = a
    }, flag_pin: !1, create: function (a) {
        var n = a.data.tag_name, p = {};
        app.component.map_component[n] && (p = app.component.map_component[n].param), this.flag_pin = app.config.checkParamPin(n);
        var r = [];
        for (var i in p) {
            var e = p[i].type, o = new Builder.Param[e]({param_name: i, param: p[i], component: a});
            r.push(o)
        }
        this.set("array_param", r)
    }, showParamView: function (a) {
        var n = this;
        $(".prm-body").show(), $(".prm-header").show();
        var p = this.get("array_param"), r = $(".param-box"), i = r.find(".prm-body");
        i.hide(), i.empty(), this.flag_pin ? r.find(".button_param_pin").css("color", "#FF6347") : r.find(".button_param_pin").css("color", ""), r.find(".button_param_pin").off("click"), r.find(".button_param_pin").on("click", (function () {
            var p = a.data.tag_name;
            0 == n.flag_pin ? $.confirm($.s("Изменить параметры \"") + $.f(a.config.name) + $.s("\" по умолчанию?"), (function () {
                n.flag_pin = !0, app.config.setParamPin(p, a.data.pm), app.config.saveProjectConfig(), r.find(".button_param_pin").css("color", "#FF6347"), $.alert($.s("Установлено"))
            }), (function () {
                return !1
            })) : $.confirm($.s("「") + $.f(a.config.name) + $.s("」Деактивирует настройку параметров"), (function () {
                n.flag_pin = !1, app.config.removeParamPin(p), r.find(".button_param_pin").css("color", ""), app.config.saveProjectConfig(), $.alert($.s("Выключено"))
            }), (function () {
                return !1
            }))
        })), r.find(".param-name").html($.f(a.config.name, a)), r.find("#param-icon").removeClass(), r.find("#param-icon").addClass("tb-i-" + a.config.default_view.icon);
        for (var e = 0; e < p.length; e++) {
            var o = p[e], t = $('<div class="form-group param-group"></div>'),
                m = $('<label class="vne-control-label"></label>'), f = $("<div class='vne_theme-param'></div>");
            o.get("param").help && (t.attr("data-help", o.get("param").help), t.addClass("help")), t.addClass("test_a"), t.attr("data-uiID",o.get("param").name), m.append(o.get("param").name);
            var c = o.createHtml();
            o.j_param = c, f.append(c), o.get("param").unit && f.find(".ui-spinner").after("<span style='margin-left:5px'>" + o.get("param").unit + "</span>"), t.append(m), t.append(f), i.append(t)
        }
        i.show();
        for (e = 0; e < p.length; e++) p[e].valid()
    }
});