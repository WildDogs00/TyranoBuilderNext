Builder.Core.Parser = Builder.Core.Base.extend({
    flag_script: !1,
    flag_tyrano_code: !1,
    flag_text_code: !1,
    defaults: {name: "gegegge", age: 0, updateTime: new Date},
    initialize: function (t) {
        this.c = t
    },
    config2text: function (t) {
        var e = $.s("//Включить полноэкранный режим　\n");
        for (var a in t) e += ";" + a + "=" + t[a] + "\n";
        return e
    },
    loadConfig: function (t, e) {
        var a = this;
        $.loadText(app.exe_path + "myproject/" + t + "/data/system/Config.tjs", (function (t) {
            var i = a.compileConfig(t);
            a.c.tyrano.config = i, e && e()
        }))
    },
    loadScenario: function (t, e) {
        var a = this;
        $.loadText(t, (function (t) {
            var i = a.parseScenario(t);
            e && e(i)
        }))
    },
    compileConfig: function (t) {
        for (var e = "", a = {}, i = t.split("\n"), r = 0; r < i.length; r++) try {
            var l = $.trim(i[r]);
            if ("" != l && ";" === l.substr(0, 1)) {
                var n = l.split("//");
                n.length > 1 && (l = $.trim(n[0])), l = $.replaceAll(l, ";", "");
                var s = (l = $.replaceAll(l, '"', "")).split("="), o = $.trim(s[0]), p = $.trim(s[1]);
                a[o] = p
            }
        } catch (t) {
            e += $.s("Ошибка: Config.tjs содержит ошибку / строка:") + r
        }
        return "" != e && $.alert(e), a
    },
    parseScenario: function (t) {
        for (var e = [], a = {}, i = t.split("\n"), r = !1, l = 0; l < i.length; l++) {
            var n = $.trim(i[l]), s = n.substr(0, 1);
            if (-1 != n.indexOf("endscript") && (this.flag_script = !1), -1 != n.indexOf("_tb_end_tyrano_code") && (this.flag_tyrano_code = !1), -1 != n.indexOf("_tb_end_text") && (this.flag_text_code = !1), !0 === r && "*/" === n) r = !1; else if ("/*" === n) r = !0; else if (0 != this.flag_tyrano_code || 0 != this.flag_text_code || 1 != r && ";" !== s) if (1 == this.flag_tyrano_code || 1 == this.flag_text_code) {
                var o = {line: l, name: "text", pm: {val: n}, val: n};
                e.push(o)
            } else if ("*" === s) {
                var p, f = n.substr(1, n.length).split("|"), _ = "";
                p = $.trim(f[0]), f.length > 1 && (_ = $.trim(f[1]));
                var c = {name: "label", pm: {line: l, index: e.length, label_name: p, val: _, origin: n}, val: _};
                e.push(c), a[c.pm.label_name] || (a[c.pm.label_name] = c.pm)
            } else if ("@" === s) {
                var g = n.substr(1, n.length), m = this.makeTag(g, l);
                e.push(m)
            } else {
                "_" === s && (n = n.substring(1, n.length));
                for (var h = n.split(""), d = "", u = (g = "", !1), v = 0, b = 0; b < h.length; b++) {
                    var x = h[b];
                    if (!0 === u) "]" === x && 0 == this.flag_script ? 0 == --v ? (u = !1, e.push(this.makeTag(g, l)), g = "") : g += x : "[" === x && 0 == this.flag_script ? (v++, g += x) : g += x; else if (!1 === u && "[" === x && 0 == this.flag_script) {
                        if (v++, "" != d) {
                            o = {line: l, name: "text", pm: {val: d}, val: d};
                            e.push(o), d = ""
                        }
                        u = !0
                    } else d += x
                }
                if ("" != d) {
                    o = {line: l, name: "text", pm: {val: d}, val: d, origin: n};
                    e.push(o)
                }
            } else ;
        }
        return {array_s: e, map_label: a}
    },
    makeTag: function (t, e) {
        for (var a = {
            line: e,
            name: "",
            pm: {},
            val: "",
            origin: t
        }, i = t.split(""), r = "", l = "", n = 0; n < i.length; n++) {
            var s = i[n];
            "" != r || '"' !== s && "'" !== s ? "" != r ? s === r ? r = "" : ("=" == s && (s = "#"), " " == s && (s = "&nbsp;"), l += s) : l += s : r = s
        }
        var o = (t = l).split(" ");
        a.name = $.trim(o[0]);
        for (var p = 1; p < o.length; p++) "" == o[p] ? (o.splice(p, 1), p--) : "=" === o[p] ? o[p - 1] && o[p + 1] && (o[p - 1] = o[p - 1] + "=" + o[p + 1], o.splice(p, 2), p--) : "=" === o[p].substr(0, 1) ? o[p - 1] && o[p] && (o[p - 1] = o[p - 1] + o[p], o.splice(p, 1)) : "=" === o[p].substr(o[p].length - 1, o[p].length) && o[p + 1] && o[p] && (o[p] = o[p] + o[p + 1], o.splice(p + 1, 1));
        for (var f = 1; f < o.length; f++) {
            var _ = $.trim(o[f]).split("="), c = $.trim(_[0]), g = $.trim(_[1]);
            "true" == g && (g = !0), "false" == g && (g = !1);
            a.pm[c] = $.replaceAll(g, "#", "=")
        }
        return "iscript" == a.name && (this.flag_script = !0), "endscript" == a.name && (this.flag_script = !1), "tb_start_tyrano_code" == a.name && (this.flag_tyrano_code = !0), "_tb_end_tyrano_code" == a.name && (this.flag_tyrano_code = !1), "tb_start_text" == a.name && (this.flag_text_code = !0), "_tb_end_text" == a.name && (this.flag_text_code = !1), a
    },
    loadAllLabels: function () {
        app.tmp.map_label = {};
        var t = app.io.getFiles(app.getProjectPath() + "data/scenario/");
        t = _.select(t, (function (t) {
            return !_.any(["make.ks"], (function (e) {
                return e === t.item
            }))
        }));
        for (var e = 0; e < t.length; e++) {
            for (var a = t[e].item, i = t[e].path, r = app.io.readFile(i).split("\n"), l = [], n = 0; n < r.length; n++) {
                var s = $.trim(r[n]);
                "*" == s.substr(0, 1) && l.push(s)
            }
            app.tmp.map_label[a] = l
        }
    }
});