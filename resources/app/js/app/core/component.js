Builder.Core.Component = Builder.Core.Base.extend({
    defaults: {},
    map_component: {},
    j_root: {},
    last_select_cid: "",
    selected_component: [],
    search_result: [],
    current_search_index: -1,
    array_history: [],
    buf_array_history: [],
    history_index: 0,
    initialize: function (e) {
        this.c = e, this.map_component = _map_component
    },
    showEditComponent: function () {
        this.array_history = [], this.buf_array_history = [], this.history_index = 0;
        var e = app.tyrano.component, a = $("#main-component");
        a.empty();
        for (var t = 0; t < e.length; t++) a.append(e[t].j_component);
        var n = this;
        $("#main-component").sortable({
            items: ".component-box",
            zIndex: 9999,
            axis: "y",
            scroll: !0,
            distance: 15,
            opacity: .8,
            cursor: "row-resize",
            start: function (e, a) {
                a.item.startPos = a.item.index(), $(a.item).css("width", $("#main-component").width()), $(a.item).trigger("click")
            },
            stop: function (e, a) {
                var t = $(a.item).attr("item-type"), r = $(a.item).attr("item-tag");
                if ("sort" == t) app.tyrano.component = $.array_replace(app.tyrano.component, a.item.startPos, a.item.index()), n.addHistory({
                    type: "sort",
                    cid: $(a.item).attr("cid"),
                    startPos: a.item.startPos,
                    endPos: a.item.index()
                }); else if ("insert" == t) {
                    var o = app.config.getParamPin(r);
                    o && (o = {pm: o}), n.insertComponent(r, a.item.index(), $(a.item), !0, o), $(a.item).remove()
                } else if ("fav" == t) {
                    let e = app.config.project_config.map_fav[r], t = a.item.index();
                    0 == t && (t = 1);
                    let n = app.tyrano.component[t - 1].cid;
                    app.view.current_view_obj.pasteComponent({
                        array_component: e,
                        last_select_cid: n
                    }), $(a.item).remove()
                }
            }
        }), this.j_root = a
    },
    convertScenario: function (e, a) {
        for (var t = [], n = e[a].array_s, r = 0; r < n.length; r++) {
            var o = n[r], i = o.name;
            if ("text" == i) {
                for (var p = [], m = r; m < n.length; m++) {
                    if ("text" == (d = (s = n[m]).name)) p.push(s.val); else {
                        if ("p" != d && "lr" != d) {
                            r = m - 1;
                            break
                        }
                        r = m
                    }
                }
                t.push(this.create("text", {array_text: p}))
            } else if ("iscript" == i || "endscript" == i) {
                for (p = [], m = r; m < n.length; m++) {
                    if ("endscript" == (d = (s = n[m]).name)) {
                        r = m;
                        break
                    }
                    "iscript" != d && p.push(s.val)
                }
                t.push(this.create("iscript", {array_text: p}))
            } else if ("tb_start_tyrano_code" == i || "_tb_end_tyrano_code" == i) {
                for (p = [], m = r; m < n.length; m++) {
                    if ("_tb_end_tyrano_code" == (d = (s = n[m]).name)) {
                        r = m;
                        break
                    }
                    "tb_start_tyrano_code" != d && p.push(s.val)
                }
                t.push(this.create("tb_start_tyrano_code", {array_text: p}))
            } else if ("tb_start_text" == i || "_tb_end_text" == i) {
                var c = o.pm.mode;
                for (p = [], m = r; m < n.length; m++) {
                    var s, d = (s = n[m]).name;
                    s.pm;
                    if ("_tb_end_text" == d) {
                        r = m;
                        break
                    }

                    "tb_start_text" != d && ("1" == c ? s.val = $.rtrim(s.val, "[p]") : "2" == c ? s.val = $.rtrim(s.val, "[l][r]") : "3" == c && (s.val = $.rtrim(s.val, "[r]")), p.push(s.val))
                }
                o.array_text = p, t.push(this.create("tb_start_text", o))
            } else t.push(this.create(i, o))
        }
        return t = _.select(t, (function (e) {
            return "_tb" != e.data.tag_name.substr(0, 3)
        }))
    },
    insertComponent: function (e, a, t, n, r) {
        var o = app.component.map_component[e].param, i = {};
        for (var p in o) o[p].default_val && (i[p] = $.f(o[p].default_val));
        var m = {};
        if (t.attr("item-nav")) {
            var c = t.attr("param-key"), s = t.attr("param-val"), d = t.attr("param-chara");
            i[c] = s, "" != d && (i.name = d)
        }
        return r && r.pm && (i = r.pm), "text" == e || "iscript" == e || "tb_start_tyrano_code" == e || "tb_start_text" == e ? r ? (void 0 === r.array_text && (r.array_text = [""]), m = app.component.create(e, {
            array_text: r.array_text,
            pm: i
        })) : m = app.component.create(e, {array_text: [""], pm: i}) : m = app.component.create(e, {
            name: e,
            pm: i,
            val: ""
        }), app.tyrano.component.splice(a, 0, m), "main-component" == t.attr("id") ? t.append(m.j_component) : 0 != a ? t.after(m.j_component) : t.before(m.j_component), 1 == n && this.addHistory({
            type: "insert",
            cid: m.cid,
            insert_index: a,
            tag_name: e,
            data: m.data
        }), m.j_component.trigger("click"), m.j_component.find(".component_slide").trigger("click"), m
    },
    getComponentByCid: function (e) {
        for (var a = app.tyrano.component, t = 0; t < a.length; t++) if (a[t].cid == e) return a[t].index = t, a[t]
    },
    checkPlugin: function (e, a, t) {
        1 == (a = 1 == a) ? (t.find(".group-" + e).show(), setTimeout((function () {
            $(".tb-header-nav").find(".group-" + e).show()
        }), 1e3)) : t.find(".group-" + e).hide()
    },
    removeComponentByCid: function (e) {
        for (var a = app.tyrano.component, t = 0; t < a.length; t++) if (a[t].cid == e) {
            app.tyrano.component.splice(t, 1);
            break
        }
    },
    replaceComponentByCid: function (e, a) {
        for (var t = app.tyrano.component, n = 0; n < t.length; n++) if (t[n].cid == e) {
            t[n] = a;
            break
        }
    },
    create: function (e, a) {
        a || (a = {}), a.tag_name = e;
        var t = "";
        t = this.map_component[e] ? this.map_component[e].component_type : "General";
        var n = new Builder.Component[t](a);
        n.data = a;
        var r = this.map_component[e];
        r || (r = this.map_component.general), n.config = r || {};
        var o = {};
        if (o.component = n, o.app = app, "General" == t) o.name = $.cutstr(n.data.origin, 45), o.icon = "circle", o.origin = n.data.origin; else {
            for (var i in o.name = "function" == typeof r.name ? r.name(n) : r.name, o.header = "function" == typeof r.header ? r.header(n) : r.header, n.defaults) r.param_view[i] && (o[i] = n.data.pm[r.param_view[i]]);
            _.extend(o, r.default_view)
        }
        o._s = function (e) {
            return $.s(e)
        };
        var p = app.io.readFile(app.dir_path + "template/component/" + t + ".tmpl.html"), m = $.templates(p).render(o);
        return n.j_component = $(m), n.j_component.attr("cid", n.cid), n.j_component.attr("data-name-component", o.name), this.setCommonEvents(n), n.setEvents && n.setEvents(), n
    },
    selectComponent: function (e, a) {
        var t = a.shiftKey, n = a.metaKey;
        if (n || (n = a.ctrlKey), n || t) if (t) {
            for (m = 0; m < this.selected_component.length; m++) this.selected_component[m].j_component.removeClass("header-color-orange"), this.selected_component[m].j_component.removeClass("active");
            this.selected_component.push(e);
            var r = {};
            for (m = 0; m < this.selected_component.length; m++) r[this.selected_component[m].cid] = "on";
            var o = app.tyrano.component, i = (e.cid, -1), p = -1;
            for (m = 0; m < o.length; m++) r[o[m].cid] && (-1 == i ? i = m : p = m);
            for (m = i; m <= p; m++) o[m].j_component.addClass("header-color-orange"), o[m].j_component.addClass("active"), this.selected_component.push(o[m])
        } else n && this.selected_component.push(e); else {
            for (var m = 0; m < this.selected_component.length; m++) this.selected_component[m].j_component.removeClass("header-color-orange"), this.selected_component[m].j_component.removeClass("active");
            this.selected_component = [e]
        }
        e.j_component.addClass("header-color-orange"), e.j_component.addClass("active"), app.param.create(e), app.param.showParamView(e), this.last_select_cid = e.cid
    },
    refleshComponent: function (e) {
        var a = this.create(e.data.tag_name, e.data);
        a.cid = e.cid, a.j_component.attr("cid", e.cid), this.replaceComponentByCid(e.cid, a), e.j_component.hasClass("open") && (a.j_component.addClass("open"), a.j_component.find(".tb-i-chevron-down").removeClass("tb-i-chevron-down").addClass("tb-i-chevron-up")), e.j_component.after(a.j_component), e.j_component.remove(), a.j_component.trigger("click")
    },
    setCommonEvents: function (e) {
        var a = e.j_component, t = this;
        a.click((function (a) {
            t.selectComponent(e, a)
        })), a.bind("contextmenu", (function (e) {
            var a = $(this);
            $(".header-color-orange").length <= 1 && a.trigger("click");
            var n = !1;
            if (1 == t.selected_component.length) {
                var r = t.selected_component[0].data.name;
                "jump" != r && "glink" != r && "clickable" != r && "button" != r && "call" != r || (n = !0)
            }
            t.showContextMenu(e.clientX, e.clientY, n)
        })), a.find(".component_slide").click((function () {
            var e = $(this).parents(".component-box").find(".component_slide");
            e.hasClass("tb-i-chevron-down") ? (e.closest(".tb-main-cpn").addClass("open"), e.addClass("tb-i-chevron-up").removeClass("tb-i-chevron-down").attr("title", $.s("Свернуть")), e.addClass("tb-i-chevron-up").removeClass("tb-i-chevron-down").attr("title", $.s("Свернуть"))) : (e.closest(".tb-main-cpn").removeClass("open"), e.addClass("tb-i-chevron-down").removeClass("tb-i-chevron-up").attr("title", $.s("Развернуть")), e.addClass("tb-i-chevron-down").removeClass("tb-i-chevron-up").attr("title", $.s("Развернуть")))
        })), a.find(".cpn-header-block").dblclick((function () {
            $(this).find(".component_slide").trigger("click")
        })), a.find(".component_remove").click((function () {
            var a = t.getComponentByCid(e.cid).index;
            t.addHistory({
                type: "remove",
                cid: e.cid,
                remove_index: a,
                tag: e.data.tag_name,
                data: e.data
            }), t.removeComponentWithObject(e)
        }))
    },
    removeComponentWithObject: function (e) {
        var a = e.cid;
        this.removeComponentByCid(a), e.j_component.hide("fast", (function () {
            e.j_component.remove(), $(".param-box").find(".prm-body").empty(), $(".param-box").find(".prm-header").find("#param-icon").removeClass(), $(".param-box").find(".prm-header").find(".param-name").empty()
        }))
    },
    search: function (e) {
        var a = e.split(":"), t = $.trim(a[0]), n = $.trim(a[1]), r = [], o = app.tyrano.component;
        if (this.current_search_index = -1, this.search_result = [], $(".main-content").find(".component-header").removeClass("header-color-blue"), "text" == t || "tb_start_text" == t) {
            $(".search_text").prop("disabled", !1);
            for (var i = 0; i < o.length; i++) if (o[i].data.tag_name == t) {
                var p = o[i].data.array_text.join();
                "" != n ? p && -1 != p.indexOf(n) && r.push(o[i]) : p && r.push(o[i])
            }
        } else {
            $(".search_text").val(""), $(".search_text").prop("disabled", !0);
            for (i = 0; i < o.length; i++) if (o[i].data.tag_name == t) {
                p = "";
                "" != n ? p && -1 != p.indexOf(n) && r.push(o[i]) : r.push(o[i])
            }
        }
        this.search_result = r, $("#main-component").find(".tb-main-cpn").css("-webkit-filter", "brightness(0.3)");
        for (i = 0; i < r.length; i++) {
            r[i].j_component.css("-webkit-filter", "brightness(1)")
        }
    },
    changeParam: function (e, a, t) {
        var n = [], r = [], o = [];
        if ("object" != typeof a) n.push(a), r.push(t), o.push(e.data.pm[a]); else {
            n = a, r = t;
            for (var i = 0; i < n.length; i++) o.push(e.data.pm[n[i]])
        }
        this.addHistory({type: "param", cid: e.cid, key: n, val: r, old_val: o});
        for (i = 0; i < n.length; i++) e.data.pm[n[i]] = r[i]
    },
    addHistory: function (e) {
        this.array_history.push(e), this.buf_array_history = []
    },
    backHistory: function (e) {
        var a;
        if ("back" == e) {
            if (this.array_history.length <= 0) return console.log("no history"), !1;
            a = this.array_history.pop(), this.buf_array_history.push(a)
        } else {
            if (this.buf_array_history.length <= 0) return console.log("no history"), !1;
            a = this.buf_array_history.pop(), this.array_history.push(a)
        }
        if ("param" === a.type) {
            for (var t = this.getComponentByCid(a.cid), n = 0; n < a.key.length; n++) t.data.pm[a.key[n]] = "back" == e ? a.old_val[n] : a.val[n];
            t.j_component.trigger("click"), this.refleshComponent(t)
        } else if ("array_text" === a.type) {
            (t = this.getComponentByCid(a.cid)).data.array_text = "back" == e ? a.old_array_text : a.array_text, t.j_component.trigger("click"), this.refleshComponent(t)
        } else if ("insert" === a.type) {
            t = this.getComponentByCid(a.cid);
            if ("back" == e) this.removeComponentWithObject(t); else {
                var r = a.insert_index, o = a.tag_name;
                null == (d = 0 == (r = a.insert_index) ? app.tyrano.component[0] : app.tyrano.component[r - 1]) && ((d = {}).j_component = $("#main-component")), m = a.data ? app.component.insertComponent(o, r, d.j_component, !1, a.data) : app.component.insertComponent(o, r, d.j_component, !1), this.updateHistoryCid(a.cid, m.cid)
            }
        } else if ("remove" === a.type) if ("back" == e) {
            var i = a.remove_index, p = (o = a.tag, a.data);
            null == d && ((d = {}).j_component = $("#main-component")), d = 0 == i ? app.tyrano.component[0] : app.tyrano.component[i - 1];
            var m = app.component.insertComponent(o, i, d.j_component, !1, p);
            this.updateHistoryCid(a.cid, m.cid)
        } else {
            t = this.getComponentByCid(a.cid);
            this.removeComponentWithObject(t)
        } else if ("sort" === a.type) if ("back" == e) {
            var c = a.cid;
            t = this.getComponentByCid(a.cid);
            a.startPos <= a.endPos ? t.j_component.insertBefore(app.tyrano.component[a.startPos].j_component) : t.j_component.insertAfter(app.tyrano.component[a.startPos].j_component), app.tyrano.component = $.array_replace(app.tyrano.component, a.endPos, a.startPos)
        } else {
            c = a.cid, t = this.getComponentByCid(a.cid);
            a.endPos <= a.startPos ? t.j_component.insertBefore(app.tyrano.component[a.endPos].j_component) : t.j_component.insertAfter(app.tyrano.component[a.endPos].j_component), app.tyrano.component = $.array_replace(app.tyrano.component, a.startPos, a.endPos)
        } else if ("multi_remove" === a.type) if ("back" == e) {
            i = a.remove_index;
            var s = a.array_data;
            console.log("===================ww"), console.log(s);
            for (n = 0; n < s.length; n++) {
                o = s[n].tag, p = s[n].data, i = s[n].remove_index, c = s[n].cid;
                null == (d = 0 == i ? app.tyrano.component[0] : app.tyrano.component[i - 1]) && ((d = {}).j_component = $("#main-component"));
                m = app.component.insertComponent(o, i, d.j_component, !1, p);
                this.updateHistoryCid(c, m.cid)
            }
        } else for (s = a.array_data, n = 0; n < s.length; n++) {
            c = s[n].cid, t = this.getComponentByCid(c);
            this.removeComponentWithObject(t)
        } else if ("multi_insert" === a.type) if ("back" == e) for (s = a.array_data, n = 0; n < s.length; n++) {
            c = s[n].cid, t = this.getComponentByCid(c);
            this.removeComponentWithObject(t)
        } else for (r = a.insert_index, s = a.array_data, n = 0; n < s.length; n++) {
            var d;
            o = s[n].tag, p = s[n].data, c = s[n].cid;
            null == (d = 0 == r ? app.tyrano.component[0] : app.tyrano.component[r - 1]) && ((d = {}).j_component = $("#main-component"));
            m = app.component.insertComponent(o, r, d.j_component, !1, p);
            this.updateHistoryCid(c, m.cid)
        }
    },
    updateHistoryCid: function (e, a) {
        for (var t = 0; t < this.array_history.length; t++) if (this.array_history[t].cid == e && (this.array_history[t].cid = a), "multi_remove" == this.array_history[t].type || "multi_insert" == this.array_history[t].type) for (var n = this.array_history[t].array_data, r = 0; r < n.length; r++) n[r].cid == e && (this.array_history[t].array_data[r].cid = a);
        for (t = 0; t < this.buf_array_history.length; t++) if (this.buf_array_history[t].cid == e && (this.buf_array_history[t].cid = a), "multi_remove" == this.buf_array_history[t].type || "multi_insert" == this.buf_array_history[t].type) for (n = this.buf_array_history[t].array_data, r = 0; r < n.length; r++) n[r].cid == e && (this.buf_array_history[t].array_data[r].cid = a)
    },
    search_move: function (e) {
        "next" == e ? (this.current_search_index++, this.current_search_index >= this.search_result.length && (this.current_search_index = 0)) : (this.current_search_index--, this.current_search_index < 0 && (this.current_search_index = this.search_result.length));
        var a = $("#main-component");
        if (!this.search_result[this.current_search_index]) return !1;
        var t = this.search_result[this.current_search_index].j_component, n = parseInt(t.offset().top) - 120;
        n += a.get(0).scrollTop, a.stop().animate({scrollTop: n}, {
            duration: 120, complete: function () {
                t.trigger("click")
            }
        })
    },
    component_move: function (e, a) {
        var t = app.tyrano.component;
        0 == this.selected_component.length && (this.selected_component = [t[0]]);
        var n = this.selected_component[this.selected_component.length - 1].cid, r = this.getComponentByCid(n), o = 0;
        o = "next" == e ? r.index + 1 : r.index - 1;
        var i = $("#main-component");
        if (!t[o]) return "function" == typeof a && a(), !1;
        var p = t[o].j_component, m = parseInt(p.offset().top) - 120;
        m += i.get(0).scrollTop, i.stop().animate({scrollTop: m}, {
            duration: 120, complete: function () {
                p.trigger("click"), "function" == typeof a && a()
            }
        })
    },
    saveTyranoScriptCode: function () {
        var e = "", a = "", t = {map_preload: {}};
        e += "[_tb_system_call storage=system/_" + app.tyrano.current_edit_scenario + "]\n\n";
        for (var n = app.tyrano.component, r = 0; r < n.length; r++) {
            var o = n[r];
            e += this.createTyranoScriptCode(o, t) + "\n", a += this.createTyranoScriptSystemCode(o, t)
        }
        a += "[return]";
        var i = app.getProjectPath() + "data/scenario/" + app.tyrano.current_edit_scenario,
            p = app.getProjectPath() + "data/scenario/system/_" + app.tyrano.current_edit_scenario;
        app.io.writeFile(i, e), app.io.writeFile(p, a)
    },
    saveTyranoScriptCodeForPreview: function (e) {
        e || (e = 0);
        var a = "", t = "", n = {map_preload: {}};
        "yes" == app.config.project_config.check_menu && (t += "[hidemenubutton] \n"), a += "[_tb_system_call storage=system/_preview.ks ]\n\n", parseFloat(app.version) >= 1.7 && (a += "[mask time=10]\n"), 0 != e && (a += this.makePreviewStatusCode(e)), parseFloat(app.version) >= 1.7 && (a += "[mask_off time=10]\n"), app.tmp.preview_from_line = 0;
        let r = a.split("\n").length;
        0 == e ? app.tmp.preview_from_line -= r - 3 : (app.tmp.preview_from_line = app.tyrano.component[e].data.line, app.tmp.preview_from_line -= r - 1);
        for (var o = app.tyrano.component, i = e; i < o.length; i++) {
            var p = o[i];
            a += this.createTyranoScriptCode(p, n) + "\n", t += this.createTyranoScriptSystemCode(p, n)
        }
        t += "[return] ";
        var m = app.getProjectPath() + "data/scenario/_preview.ks",
            c = app.getProjectPath() + "data/scenario/system/_preview.ks";
        app.io.writeFile(m, a), app.io.writeFile(c, t)
    },
    makePreviewMapping: function (e) {
        for (var a = app.tyrano.component, t = {
            bg: "",
            map_chara: {},
            map_img: {},
            map_live2d: {},
            map_camera: {}
        }, n = {}, r = {}, o = {}, i = {}, p = {}, m = [], c = 0; c < e; c++) {
            var s = a[c];
            switch (s.data.tag_name) {
                case"bg":
                    t.bg = s.data.pm.storage;
                    break;
                case"chara_show":
                    if ("" == s.data.pm.name) break;
                    null == n[s.data.pm.name] ? (n[s.data.pm.name] = {}, n[s.data.pm.name].storage = this.getCharaDefaultStorage(s.data.pm.name)) : n[s.data.pm.name].storage = s.data.pm.storage, n[s.data.pm.name].top = s.data.pm.top, n[s.data.pm.name].left = s.data.pm.left, n[s.data.pm.name].width = s.data.pm.width, n[s.data.pm.name].height = s.data.pm.height, n[s.data.pm.name].reflect = s.data.pm.reflect, n[s.data.pm.name].top || (n[s.data.pm.name].top = 0), n[s.data.pm.name].left || (n[s.data.pm.name].left = 0), n[s.data.pm.name].reflect || (n[s.data.pm.name].reflect = !1);
                    break;
                case"chara_move":
                    if ("" == s.data.pm.name) break;
                    if (null == n[s.data.pm.name]) break;
                    n[s.data.pm.name].top = s.data.pm.top, n[s.data.pm.name].left = s.data.pm.left, n[s.data.pm.name].width = s.data.pm.width, n[s.data.pm.name].height = s.data.pm.height, n[s.data.pm.name].top || (n[s.data.pm.name].top = 0), n[s.data.pm.name].left || (n[s.data.pm.name].left = 0);
                    break;
                case"chara_hide":
                    if ("" == s.data.pm.name) break;
                    delete n[s.data.pm.name];
                    break;
                case"chara_hide_all":
                    n = {};
                    break;
                case"chara_mod":
                    if ("" == s.data.pm.name) break;
                    if ("" == s.data.pm.storage) break;
                    n[s.data.pm.name] || (n[s.data.pm.name] = {}), n[s.data.pm.name].storage = s.data.pm.storage;
                    break;
                case"tb_image_show":
                    var d = "img_" + c;
                    s.data.pm.name = d, null == r[s.data.pm.name] && (r[s.data.pm.name] = {}), r[s.data.pm.name].y = s.data.pm.y, r[s.data.pm.name].x = s.data.pm.x, r[s.data.pm.name].width = s.data.pm.width, r[s.data.pm.name].height = s.data.pm.height, r[s.data.pm.name].y || (r[s.data.pm.name].y = 0), r[s.data.pm.name].x || (r[s.data.pm.name].x = 0), r[d].storage = s.data.pm.storage;
                    break;
                case"imageShowN":
                    var d = "img_" + c;
                    s.data.pm.name = d, null == r[s.data.pm.name] && (r[s.data.pm.name] = {}), r[s.data.pm.name].y = s.data.pm.y, r[s.data.pm.name].x = s.data.pm.x, r[s.data.pm.name].width = s.data.pm.width, r[s.data.pm.name].height = s.data.pm.height, r[s.data.pm.name].y || (r[s.data.pm.name].y = 0), r[s.data.pm.name].x || (r[s.data.pm.name].x = 0), r[d].storage = s.data.pm.storage;
                    break;
                case"buttonHover":
                    d = "img_" + c;
                    s.data.pm.name = d, null == o[s.data.pm.name] && (o[s.data.pm.name] = {}), o[s.data.pm.name].y = s.data.pm.y, o[s.data.pm.name].x = s.data.pm.x, o[s.data.pm.name].width = s.data.pm.width, o[s.data.pm.name].height = s.data.pm.height, o[s.data.pm.name].y || (o[s.data.pm.name].y = 0), o[s.data.pm.name].x || (o[s.data.pm.name].x = 0), o[d].storage = s.data.pm.graphic;
                    break;
                case"tb_image_hide":
                    r = {};
                    break;
                case"button":
                    d = "img_" + c;
                    s.data.pm.name = d, null == o[s.data.pm.name] && (o[s.data.pm.name] = {}), o[s.data.pm.name].y = s.data.pm.y, o[s.data.pm.name].x = s.data.pm.x, o[s.data.pm.name].width = s.data.pm.width, o[s.data.pm.name].height = s.data.pm.height, o[s.data.pm.name].y || (o[s.data.pm.name].y = 0), o[s.data.pm.name].x || (o[s.data.pm.name].x = 0), o[d].storage = s.data.pm.graphic;
                    break;
                case"cm":
                    o = {};
                    break;
                case"chara_hide":
                    if ("" == s.data.pm.name) break;
                    delete n[s.data.pm.name];
                    break;
                case"chara_hide_all":
                    n = {};
                    break;
                case"glink":
                    m.push(s.data.pm);
                    break;
                case"imageMap":
                    m.push(s.data.pm);
                    break;
                case"inventorySystem":
                    m.push(s.data.pm);
                    break;
                case"systemButton":
                    m.push(s.data.pm);
                    break;
                case"s":
                    m = [], o = {};
                    break;
                case"camera":
                    i[_ = s.data.pm.layer] && (i[_] = s.data.pm);
                    break;
                case"reset_camera":
                    var _;
                    if (i[_ = s.data.pm.layer]) {
                        i[_] = {x: "*0px", y: "*0px", scale: "1", rotate: "0deg", time: "10"}
                    }
                    break;
                case"live2d_show":
                    if ("" == s.data.pm.name) break;
                    null == p[s.data.pm.name] && (p[s.data.pm.name] = {}), p[s.data.pm.name].x = s.data.pm.x || 0, p[s.data.pm.name].y = s.data.pm.y || 0, p[s.data.pm.name].scale = s.data.pm.scale || 1;
                    break;
                case"live2d_hide":
                    if ("" == s.data.pm.name) break;
                    delete p[s.data.pm.name];
                    break;
                case"live2d_mod":
                    if ("" == s.data.pm.name) break;
                    p[s.data.pm.name].x = s.data.pm.x, p[s.data.pm.name].y = s.data.pm.y, p[s.data.pm.name].scale = s.data.pm.scale, p[s.data.pm.name].x || (p[s.data.pm.name].x = 0), p[s.data.pm.name].y || (p[s.data.pm.name].y = 0)
            }
        }
        return t.map_chara = n, t.map_img = r, t.map_button = o, t.map_live2d = p, t.array_glink = m, t.map_camera = i, t
    },
    makePreviewStatusCode: function (e) {
        for (var a = app.tyrano.component, t = {map_preload: {}}, n = "", r = {
            map_chara: {},
            map_chara_face: {},
            map_chara_move: {},
            map_img: {},
            map_live2d_new: {},
            map_live2d: {},
            map_live2d_pos: {},
            map_live2d_expression: {},
            code_current_bg: "",
            is_message_show: !0,
            code_current_bgm: "",
            bgmovie: "",
            map_camera: {}
        }, o = 0; o < e; o++) {
            var i = a[o];
            switch (i.data.tag_name) {
                case"tb_show_message_window":
                    r.is_message_show = !0;
                    break;
                case"tb_hide_message_window":
                    r.is_message_hide = !1;
                    break;
                case"bg":
                    (c = $.extend(!0, {}, i)).data.pm.time = 10, r.code_current_bg = this.createTyranoScriptCode(c, t) + "\n";
                    break;
                case"playbgm":
                    r.code_current_bgm = this.createTyranoScriptCode(i, t) + "\n";
                    break;
                case"chara_show":
                    if ("" == i.data.pm.name) break;
                    (c = $.extend(!0, {}, i)).data.pm.time = 10, r.map_chara[i.data.pm.name] = this.createTyranoScriptCode(c, t) + "\n";
                    break;
                case"chara_move":
                    if ("" == i.data.pm.name) break;
                    (c = $.extend(!0, {}, i)).data.pm.time = 10, c.data.pm.wait = !1, r.map_chara_move[i.data.pm.name] = this.createTyranoScriptCode(c, t) + "\n";
                    break;
                case"chara_hide":
                    if ("" == i.data.pm.name) break;
                    delete r.map_chara[i.data.pm.name];
                    break;
                case"chara_hide_all":
                    r.map_chara = {};
                    break;
                case"chara_mod":
                    if ("" == i.data.pm.name) break;
                    (c = $.extend(!0, {}, i)).data.pm.time = 10, r.map_chara_face[i.data.pm.name] = this.createTyranoScriptCode(c, t) + "\n";
                    break;
                case"tb_image_show":
                    var p = "img_" + o;
                    i.data.pm.name = p, (c = $.extend(!0, {}, i)).data.pm.time = 10, r.map_img[i.data.pm.name] = this.createTyranoScriptCode(c, t) + "\n";
                    break;
                case"tb_image_hide":
                    r.map_img = {};
                    break;
                case"bgmovie":
                    r.bgmovie = this.createTyranoScriptCode(i, t) + "\n";
                    break;
                case"stop_bgmovie":
                case"wait_bgmovie":
                    r.bgmovie = "";
                    break;
                case"camera":
                    (c = $.extend(!0, {}, i)).data.pm.time = 10;
                    var m = c.data.pm.layer;
                    r.map_camera[m] = this.createTyranoScriptCode(c, t) + "\n";
                    break;
                case"reset_camera":
                    (c = $.extend(!0, {}, i)).data.pm = {x: "*0px", y: "*0px", scale: "1", rotate: "0deg", time: "10"};
                    m = c.data.pm.layer;
                    r.map_camera[m] = this.createTyranoScriptCode(c, t) + "\n";
                    break;
                case"live2d_new":
                    if ("" == i.data.pm.model_id) break;
                    null == r.map_live2d_new[i.data.pm.model_id] && (r.map_live2d_new[i.data.pm.model_id] = {});
                    var c = $.extend(!0, {}, i);
                    r.map_live2d_new[i.data.pm.model_id] = this.createTyranoScriptCode(c, t) + "\n";
                    break;
                case"live2d_show":
                    if ("" == i.data.pm.name) break;
                    null == r.map_live2d[i.data.pm.name] && (r.map_live2d[i.data.pm.name] = {}), (c = $.extend(!0, {}, i)).data.pm.time = 10, r.map_live2d[i.data.pm.name] = this.createTyranoScriptCode(c, t) + "\n";
                    break;
                case"live2d_hide":
                    if ("" == i.data.pm.name) break;
                    delete r.map_live2d[i.data.pm.name];
                    break;
                case"live2d_mod":
                    if ("" == i.data.pm.name) break;
                    null == r.map_live2d_pos[i.data.pm.name] && (r.map_live2d_pos[i.data.pm.name] = {});
                    c = $.extend(!0, {}, i);
                    r.map_live2d_pos[i.data.pm.name] = this.createTyranoScriptCode(c, t) + "\n";
                    break;
                case"live2d_expression":
                    if ("" == i.data.pm.name) break;
                    null == r.map_live2d_expression[i.data.pm.name] && (r.map_live2d_expression[i.data.pm.name] = {});
                    c = $.extend(!0, {}, i);
                    r.map_live2d_expression[i.data.pm.name] = this.createTyranoScriptCode(c, t) + "\n"
            }
            "function" == typeof i.config.preview_tag && i.config.preview_tag(r, i)
        }
        for (key in n += r.code_current_bg, n += r.code_current_bgm, n += r.bgmovie, r.is_message_show && (n += "[tb_show_message_window] \n"), r.map_chara_face) n += r.map_chara_face[key];
        for (key in r.map_chara) n += r.map_chara[key];
        for (key in r.map_chara_move) n += r.map_chara_move[key];
        for (key in r.map_img) n += r.map_img[key];
        for (key in r.map_live2d_new) n += r.map_live2d_new[key];
        for (key in r.map_live2d) n += r.map_live2d[key];
        for (key in r.map_live2d_pos) n += r.map_live2d_pos[key];
        for (key in r.map_live2d_expression) n += r.map_live2d_expression[key];
        for (key in r.map_camera) n += r.map_camera[key];
        return n
    },
    saveCharaDefineCode: function () {
        var e = app.getProjectPath() + "data/scenario/system/chara_define.ks", a = app.config.project_config.map_chara,
            t = app.config.project_config.map_fuki, n = $.s(";=========Информация о предустановленном персонаже \n");
        for (key in a) {
            var r = app.config.getCharaPath(key), o = app.io.getItems(r);
            n += ";" + key + "\n";
            for (var i = key, p = 0; p < o.length; p++) {
                var m, c = o[p], s = "chara/" + a[key] + "/" + c.item;
                if (n += $.tag("chara_new", {
                    name: i,
                    jname: i,
                    storage: s
                }) + "\n", t[i]) (m = t[i]).name = i, "false" == m.select_fix_width && delete m.fix_width, n += $.tag("fuki_chara", m) + "\n";
                break
            }
        }
        t.others && ((m = t.others).name = "others", n += $.tag("fuki_chara", m) + "\n");
        var d = $.s(";=========Часть объявления переменной \n");
        d += "[iscript] \n";
        var _ = app.config.project_config.map_var;
        for (key in _) {
            var h = _[key];
            "sf" != h.kind && ($.isNum(h.val) && "" != h.val ? d += h.kind + "['" + key + "']=" + h.val + "; \n" : d += h.kind + "['" + key + "']='" + h.val + "'; \n")
        }
        n += "\n" + (d += "[endscript] \n"), app.io.writeFile(e, n)
    },
    getCharaDefaultStorage: function (e) {
        var a = "", t = app.config.project_config.map_chara;
        for (key in t) if (e == key) for (var n = app.config.getCharaPath(key), r = app.io.getItems(n), o = (e = key, 0); o < r.length; o++) {
            var i = r[o];
            a = "chara/" + t[key] + "/" + i.item;
            break
        }
        return a
    },
    checkModified: function () {
        if ("EditProject" != app.view.current_view_id) return !0;
        if ("" == app.tyrano.current_edit_scenario) return !0;
        var e = {map_preload: {}}, a = "";
        a += "[_tb_system_call storage=system/_" + app.tyrano.current_edit_scenario + "]\n\n";
        for (var t = app.tyrano.component, n = 0; n < t.length; n++) {
            var r = t[n];
            a += app.component.createTyranoScriptCode(r, e) + "\n"
        }
        var o = app.getProjectPath() + "data/scenario/" + app.tyrano.current_edit_scenario;
        return a == app.io.readFile(o)
    },
    createTyranoScriptCode: function (e) {
        var a = "", t = e.data.tag_name;
        if ("function" == typeof e.getTyranoScriptCode) a += e.getTyranoScriptCode() + "\n"; else {
            var n = e.data.pm;
            a = $.tag(t, n)
        }
        return a
    },
    createTyranoScriptSystemCode: function (e, a) {
        var t = "";
        e.data.tag_name;
        return "function" == typeof e.config.write_system_code && "" != (t = e.config.write_system_code.call(e, a)) && (t += "\n"), t
    },
    showContextMenu: function (e, a, t) {
        $(window).height() - a < 100 && (a -= 100);
        var n = $("#component_context_menu");
        n.css("left", e), n.css("top", a), t ? n.find(".jump_context_button").show() : n.find(".jump_context_button").hide(), n.show()
    }
});