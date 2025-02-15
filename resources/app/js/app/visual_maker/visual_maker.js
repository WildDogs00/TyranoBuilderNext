Builder.Window.VisualMaker = Builder.Window.Base.extend({
    defaults: {view_id: "VisualMaker"},
    j_view: {},
    map_parts: {},
    parts_id_index: 0,
    j_area_parts: {},
    j_area_param: {},
    scenario_file: "",
    scenario_dir: "",
    selected_parts_id: "",
    selected_parts_type: "",
    initialize: function (a, e, t) {
        var i = this;
        this.j_view = a, this.scenario_file = e.scenario_file, this.scenario_dir = e.scenario_dir;
        var r = _vm_parts;
        this.map_parts = {};
        var s = parseInt(app.tyrano.config.scWidth), p = parseInt(app.tyrano.config.scHeight);
        this.j_view.find("#bound_area").css("min-width", s), this.j_view.find("#bound_area").css("min-height", p), this.j_param_x = this.j_view.find(".param_x"), this.j_param_y = this.j_view.find(".param_y"), this.j_param_width = this.j_view.find(".param_width"), this.j_param_height = this.j_view.find(".param_height"), this.j_param_cg = this.j_view.find(".select_cg"), this.j_param_replay = this.j_view.find(".select_replay"), this.j_param_jump_storage = this.j_view.find(".select_jump_storage"), this.j_param_jump_target = this.j_view.find(".select_jump_target"), this.j_param_name = this.j_view.find(".param_name"), this.j_param_img = this.j_view.find(".select_img");
        var n = i.j_view.find(".select_parts");
        for (key in r) n.append("<option value='" + key + "'>" + $.s(r[key].name) + "</option>");
        this.j_view.find(".button_add_parts").click((function () {
            var a = i.j_view.find(".select_parts").val();
            void 0 !== r[a].single && i.j_view.find("[data-parts-type='bg']").length ? alertNoBtn("Внимание", "Этот элемент можно разместить только один раз", "2000", "bottom-right", "info", "var(--vne-info-alert-color)") : i.makeParts(a)
        })), this.j_view.find(".button_preview").click((function () {
            var a = i.makeTyranoCode(), e = app.getProjectPath() + "data/scenario/_preview.ks",
                t = app.getProjectPath() + "data/scenario/system/_preview.ks";
            app.io.writeFile(e, a), app.io.writeFile(t, "[return]");
            var r = app.getGameUrl(), s = app.tyrano.config.scWidth, p = app.tyrano.config.scHeight;
            app.saveFirstScenario({jump_storage: "_preview.ks", live2d: app.config.project_config.plugin.live2d});
            r = app.getGameUrl();
            app.gui.getModal("preview") && app.gui.closeModal("preview");
            var _ = app.gui.openWindow("file://" + r, {
                title: $.s("Предпросмотр"),
                width: parseInt(s),
                height: parseInt(p),
                toolbar: !1
            });
            app.gui.addModal("preview", _)
        }));
        var d = this.j_view.find(".area_param"), o = this.j_view.find(".area_parts");
        this.j_area_param = d, this.j_area_parts = o, this.j_view.find(".input_position").on("change", (function () {
            var a = i.selected_parts_id, e = parseInt(i.j_view.find(".param_x").val()),
                t = parseInt(i.j_view.find(".param_y").val()), r = parseInt(i.j_view.find(".param_width").val()),
                s = parseInt(i.j_view.find(".param_height").val());
            a = i.selected_parts_id;
            i.map_parts[a].j_parts.css({
                left: e,
                top: t,
                width: r,
                height: s
            }), i.setPm("x", e), i.setPm("y", t), i.setPm("width", r), i.setPm("height", s)
        }));
        var v = this.j_view.find(".select_cg"), c = app.config.project_config.map_cg, l = (c.map_page, c.map_image);
        for (key in l) v.append('<option value="' + key + '">' + key + "</option>");
        v.on("change", (function () {
            var a = v.val();
            i.setPm("id", a)
        }));
        var m = this.j_view.find(".select_replay"), h = app.config.project_config.map_replay,
            f = (h.map_page, h.map_jump);
        for (key in f) m.append('<option value="' + key + '">' + key + "</option>");
        m.on("change", (function () {
            var a = m.val(), e = f[a];
            i.setPm("id", a), i.setPm("storage", e.storage), i.setPm("target", e.target)
        }));
        var g = this.j_param_jump_storage, j = this.j_param_jump_target;
        j.append("<option value=''>---</option>");
        var w = $.keys(app.tmp.map_label);
        w = _.select(w, (function (a) {
            return !_.any(["first.ks", "make.ks", "_preview.ks", "config.ks"], (function (e) {
                return e === a
            }))
        }));
        for (var u = 0; u < w.length; u++) g.append("<option value='" + w[u] + "'>" + w[u] + "</option>");
        g.on("change", (function () {
            var a = $(this).val(), e = app.tmp.map_label[a];
            j.empty(), j.append("<option value=''>---</option>");
            for (var t = 0; t < e.length; t++) {
                var r = e[t];
                j.append("<option value='" + r + "'>" + r + "</option>")
            }
            i.setPm("storage", a), i.setPm("target", "")
        })), j.on("change", (function () {
            var a = $(this).val();
            i.setPm("target", a)
        }));
        var y = this.j_view.find("#bound_panel");
        y.draggable({scroll: !1, containment: "#bound_area"});
        var b = s - 380;
        b < 0 && (b = 0), y.css({left: b, top: 20}), this.j_view.find(".navbar-nav").find("li").click((function () {
            var a = $(this).attr("data-nav");
            "param" == a && "" == i.selected_parts_id || (i.j_view.find("li").removeClass("active"), $(this).addClass("active"), i.j_view.find(".area").hide(), i.j_view.find(".area_" + a).show())
        })), this.j_param_img.click((function () {
            var a = r[i.selected_parts_type].image_path + "/" + r[i.selected_parts_type].image_dir;
            app.window.show("SelectFile", {
                title: $.s("Выбор изображения"),
                width: 640,
                height: 450,
                file_path: a,
                folder: "",
                folder_select: !1,
                base_url: "data/" + a
            }, (function (e) {
                var t = i.map_parts[i.selected_parts_id].j_parts, s = app.getProjectPath() + "data/" + a + "/" + e;
                t.find("img").attr("src", s);
                var p = i.map_parts[i.selected_parts_id].pm;
                p[r[i.selected_parts_type].image_param] = r[i.selected_parts_type].image_dir + e, i.map_parts[i.selected_parts_id].pm = p
            }))
        })), this.j_view.find(".button_delete").click((function () {
            var a = i.selected_parts_id;
            i.map_parts[a].j_parts.remove(), delete i.map_parts[a], i.j_view.find(".navbar-nav").find("li").removeClass("active"), i.j_view.find(".navbar-nav").find(".nav_parts").addClass("active"), i.j_view.find(".area").hide(), i.j_view.find(".area_parts").show()
        })), this.j_view.find(".button_copy").click((function () {
            var a = i.selected_parts_id, e = $.extend(!0, {}, i.map_parts[a].pm);
            i.makeParts(i.selected_parts_type, e)
        })), this.j_view.find("#button_save").click((function () {
            app.io.exists(app.getDataPath() + "scenario/" + i.scenario_dir) || app.io.mkdir(app.getDataPath() + "scenario/" + i.scenario_dir);
            var a = app.getDataPath() + "scenario/" + i.scenario_dir + i.scenario_file, e = i.makeTyranoCode();
            app.io.writeFile(a, e), app.view.current_view_obj.reloadScenario(), app.view.current_view_obj.refleshScenarioTree(), $.alert($.s("保存しました"))
        })), this.loadScenario(e, (function (a) {
            for (var e = 0; e < a.length; e++) void 0 !== a[e].pm._tb_parts_type && i.makeParts(a[e].pm._tb_parts_type, a[e].pm)
        }))
    },
    makeTyranoCode: function () {
        var a = "";
        for (key in a += "[tb_clear_images]", a += "[mask time=200]", this.map_parts) {
            var e = this.map_parts[key], t = e.parts_type, i = _vm_parts[t].tag, r = e.pm;
            a += $.tag(i, r) + "\n"
        }
        return a += "[mask_off time=200] \n", a += "[s] \n"
    },
    setPm: function (a, e) {
        var t = this.map_parts[this.selected_parts_id].pm;
        t[a] = e, this.map_parts[this.selected_parts_id].pm = t
    },
    loadScenario: function (a, e) {
        var t = app.getDataPath() + "scenario/" + this.scenario_dir + this.scenario_file;
        app.io.exists(t) ? app.parser.loadScenario(t, (function (a) {
            var t = a.array_s;
            e(t)
        })) : e([])
    },
    makeParts: function (a, e) {
        var t = this, i = _vm_parts, r = $("<div class='edit_parts'>");
        r.css({position: "absolute"});
        var s = {};
        if (i[a]) {
            (s = void 0 !== e ? $.convertNumber(e) : $.extend(!0, {}, i[a].default_pm))._tb_parts_type = a, i[a].init(r, s), 1 == i[a].drag && r.draggable({
                scroll: !1,
                containment: "#bound_area",
                distance: 10,
                drag: function (a) {
                    var e = $(a.target), i = parseInt(e.css("left")), r = parseInt(e.css("top"));
                    t.j_param_x.val(i), t.j_param_y.val(r), t.setPm("x", i), t.setPm("y", r)
                }
            }), 1 == i[a].resize && r.resizable({
                aspectRatio: !1, handles: "all", resize: function (a, e) {
                    var i = $(a.target), r = (i.attr("data-role"), parseInt(i.css("width"))),
                        s = parseInt(i.css("height"));
                    t.j_param_width.val(r), t.j_param_height.val(s), t.setPm("width", r), t.setPm("height", s)
                }
            }), this.j_view.find(".edit_parts").css({
                "-webkit-filter": "brightness(60%)",
                border: ""
            }), r.on("mousedown", (function () {
                var a = $(this), e = a.attr("data-id"), r = a.attr("data-parts-type");
                t.selected_parts_id = e, t.selected_parts_type = r, t.j_view.find(".edit_parts").css({
                    "-webkit-filter": "brightness(60%)",
                    border: ""
                }), a.css({
                    "-webkit-filter": "brightness(100%)",
                    border: "solid 1px gray"
                }), t.j_param_name.html($.s(i[r].name)), void 0 !== i[r].single ? t.j_view.find(".button_copy").hide() : t.j_view.find(".button_copy").show();
                var s = i[r].param;
                t.showParamArea(s);
                var p = parseInt(a.css("left")), _ = parseInt(a.css("top")), n = parseInt(a.css("width")),
                    d = parseInt(a.css("height"));
                t.j_param_x.val(p), t.j_param_y.val(_), t.j_param_width.val(n), t.j_param_height.val(d);
                var o = t.map_parts[t.selected_parts_id].pm;
                "cg_image_button" == t.selected_parts_type && t.j_param_cg.val(o.id), "replay_image_button" == t.selected_parts_type && t.j_param_replay.val(o.id), "button" == t.selected_parts_type && (t.j_param_jump_storage.val(o.storage), t.j_param_jump_target.val(o.target))
            }));
            var p = t.parts_id_index++;
            r.attr("data-id", p), r.attr("data-parts-type", a), t.map_parts[p] = {
                j_parts: r,
                pm: s,
                parts_type: a
            }, t.j_view.find("#bound_area").append(r), r.trigger("mousedown")
        }
    },
    showParamArea: function (a) {
        if (!this.j_view.find(".navbar-nav").find("nav_param").hasClass("active")) {
            this.j_view.find(".navbar-nav").find("li").removeClass("active"), this.j_view.find(".navbar-nav").find(".nav_param").addClass("active"), this.j_view.find(".area").hide(), this.j_view.find(".area_param").show(), this.j_view.find(".area_param").find(".param").hide();
            for (var e = 0; e < a.length; e++) {
                var t = a[e];
                this.j_view.find(".area_param").find(".param_" + t).show()
            }
            this.j_area_parts.hide(), this.j_area_param.show()
        }
    }
});