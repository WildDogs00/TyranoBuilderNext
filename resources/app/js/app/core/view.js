Builder.Core.View = Builder.Core.Base.extend({
    defaults: {
        view_list: {},
        current_view_id: void 0,
        current_view_obj: {},
        updateTime: new Date
    }, initialize: function (e) {
        this.c = e
    }, show: function (e, t, i) {
        t || (t = {}), $(".main-view").hide(), this.set("current_view_id", e), this.current_view_id = e;
        var r = this;
        this.current_view_obj = new Builder.View[e];
        i = this.current_view_obj.get("template") || e;
        t._s = function (e) {
            return $.s(e)
        }, $.loadText("./template/view/" + i + ".tmpl.html", (function (e) {
            var i = $.templates(e).render(t);
            r.current_view_obj.j_view = $(i), r.current_view_obj.data = t, "function" == typeof r.current_view_obj.setEvents && r.current_view_obj.setEvents(), "function" == typeof r.current_view_obj.setValues && r.current_view_obj.setValues(), $("#main_view").html(""), $("#main_view").append(r.current_view_obj.j_view).show(), r.current_view_obj.completed && r.current_view_obj.completed()
        }))
    }
});