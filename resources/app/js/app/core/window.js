Builder.Core.Window = Builder.Core.Base.extend({
    defaults: {view_list: {}, current_view_id: void 0, current_view_obj: {}, updateTime: new Date},
    initialize: function (i) {
        this.c = i
    },
    show: function (i, e, d) {
        e || (e = {}), e.title || (e.title = ""), e.padding || (e.padding = ""), d || (d = function () {
        }), $(".main-view").hide(), this.set("current_view_id", i);
        var t = '        \t   <div style="-webkit-user-select:none" class="widget-box modal modal-md no-drag">                <div class="modal-content">                  <div class="modal-header">                    <button type="button" class="button_window_close close" data-dismiss="modal"><span class="tb-i-time"></span></button>                    <button type="button" class="button_window_toggle close" data-dismiss="modal" style="margin-top:2px;margin-right:8px"><span class="icon-toggle fa fa-minus-square-o" /></button>                    <h4 class="modal-title">' + e.title + '</h4>                  </div>                  <div class="modal-body widget-body">                  </div>                </div>              </div>';
        let o = e.height;
        o && (o = parseInt(e.height) + 34);
        var s = $(t);
        s.css("width", e.width || 800), s.css("height", o || 600), s.css("left", "30%"), s.css("top", "20%"), s.css("margin-left", -e.width / 2 || 300), s.find(".widget-body").css("overflow", e.overflow || "hidden"), s.addClass(i), "" != e.padding && s.find(".modal-body").css("padding", 0), s.draggable({
            handle: ".modal-header",
            scroll: !1,
            stop: function (i, e) {
                let d = parseInt(e.position.top), b = parseInt(e.position.bottom), t = parseInt(e.position.left), o = parseInt($("body").css("height")),
                    n = parseInt($("body").css("width"));
                parseInt(s.css("width"));
                d < 0 && s.css("top", 80), d > o && s.css("top", o - 80), b < 0 && s.css("bottom", 80), d > o && s.css("bottom", o - 80), t < -880 && s.css("left", 80), d > o && s.css("left", o - 80);
            }
        }), $.loadText("./template/window/" + i + ".tmpl.html", (function (t) {
            var o = $.templates(t);
            e._s = function (i) {
                return $.s(i)
            };
            var n = o.render(e), a = new Builder.Window[i]($(n), e, d);
            s.find(".widget-body").append(a.j_view);
            var l = s;
            a.j_window = l, l.find(".button_window_close").click((function () {
                a.close()
            }));
            var c = !0, r = l.css("height");
            l.find(".button_window_toggle").on("click", (i => {
                1 == c ? (c = !1, l.find(".modal-header").find(".icon-toggle").removeClass("fa-minus-square-o"), l.find(".modal-header").find(".icon-toggle").addClass("fa-plus-square-o"), l.find(".modal-body").hide(), l.css("height", 36)) : (c = !0, l.find(".modal-header").find(".icon-toggle").removeClass("fa-plus-square-o"), l.find(".modal-header").find(".icon-toggle").addClass("fa-minus-square-o"), l.find(".modal-body").show(), l.css("height", r))
            })), l.find(".button_window_slide").click((function () {
                $(this).find("i").hasClass("icon-chevron-down") ? ($(this).find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up"), $(this).parents(".widget-box").find(".widget-body").show("fast")) : ($(this).find("i").removeClass("icon-chevron-up").addClass("icon-chevron-down"), $(this).parents(".widget-box").find(".widget-body").hide("fast"))
            })), $("body").append(l).show(), "PreviewGame" == i && "function" == typeof d && l.find("iframe").get(0) && l.find("iframe").on("load", (function () {
                d(a)
            }))
        }))
    },
    close: function (i) {
        $("body").find("." + i).find(".button_window_close").trigger("click")
    }
});