Builder.Core.Setting = Builder.Core.Base.extend({
    j_view: {},
    j_setting_view: {},
    defaults: {},
    initialize: function (t) {
        this.c = t
    },
    setView: function (t) {
        this.j_view = t
    },
    show: function (t, e, i, n) {
        $.loadText("./template/setting/" + t + ".tmpl.html", (function (t) {
            var a = $.templates(t);
            i._s = function (t) {
                return $.s(t)
            };
            var s = a.render(i), r = new Builder.Setting[e]($(s), i, n);
            that.j_setting_view.find(".area_setting").empty(), that.j_setting_view.find(".area_setting").append(r.j_view)
        }))
    }
});