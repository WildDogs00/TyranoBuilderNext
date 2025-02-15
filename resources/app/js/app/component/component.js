Builder.Component = {}, Builder.Component.Text = Builder.Core.Base.extend({
    defaults: {array_text: []}, initialize: function (t) {
        this.set("array_text", t.array_text)
    }, getTitle: function () {
        return $.cutstr(this.get("array_text")[0], 15)
    }, getText: function () {
        return this.get("array_text").join("\n")
    },
    setEvents: function () {
        var textArea = this.j_component.find("textarea"), e = this;
        textArea.change((function () {
            var t = $(this).val().split("\n");
            app.component.addHistory({
                type: "array_text",
                cid: e.cid,
                array_text: t,
                old_array_text: e.data.array_text
            }), e.set("array_text", t), e.data.array_text = e.get("array_text"), e.j_component.find(".cpn-desc").html($.cutstr(t[0], 15) || "")
        })), textArea.on("keydown", (function (t) {
            var e = t.keyCode;
            38 != e && 40 != e || t.stopPropagation()
        })), void 0 !== app.config.user_config.text_cmp_font_size && textArea.css("font-size", app.config.user_config.text_cmp_font_size + "px"), void 0 !== app.config.user_config.text_cmp_height && (textArea.css("height", app.config.user_config.text_cmp_height + "px"), textArea.css("min-height", "80px"))
    },
    getTyranoScriptCode: function () {
        for (var t = "", e = this.get("array_text"), n = 0; n < e.length; n++) "#" == e[n].substr(0, 1) || "" == $.trim(e[n]) ? t += e[n] + "\n" : "novel" === app.config.project_config.game_type ? t += e[n] + "[lr]\n" : t += e[n] + "[p]\n";
        return t
    }, reflesh: function () {
    }
}), Builder.Component.Iscript = Builder.Core.Base.extend({
    defaults: {array_text: []}, initialize: function (t) {
        this.set("array_text", t.array_text)
    }, getTitle: function () {
        return this.get("array_text")[0]
    }, getText: function () {
        return this.get("array_text").join("\n")
    }, setEvents: function () {
        var j_text_area = this.j_component.find("textarea"), that = this;
        j_text_area.change((function () {
            var t = $(this).val().split("\n");
            that.set("array_text", t), app.component.addHistory({
                type: "array_text",
                cid: that.cid,
                array_text: t,
                old_array_text: that.data.array_text
            }), that.data.array_text = that.get("array_text")
        })), this.j_component.find(".button_eval").click((function () {
            for (var array_text = that.get("array_text"), code = "", i = 0; i < array_text.length; i++) code += array_text[i] + "\n";
            try {
                eval(code)
            } catch (t) {
                alert(t)
            }
        })), j_text_area.on("keydown", (function (t) {
            var e = t.keyCode;
            38 != e && 40 != e || t.stopPropagation()
        })), void 0 !== app.config.user_config.text_cmp_font_size && j_text_area.css("font-size", app.config.user_config.text_cmp_font_size + "px"), void 0 !== app.config.user_config.text_cmp_height && j_text_area.css("height", app.config.user_config.text_cmp_height + "px")
    }, getTyranoScriptCode: function () {
        var t = "", e = this.get("array_text");
        t += "[iscript]\n";
        for (var n = 0; n < e.length; n++) t += e[n] + "\n";
        return t += "[endscript]"
    }
}), Builder.Component.TyranoCode = Builder.Core.Base.extend({
    defaults: {array_text: []}, initialize: function (t) {
        this.set("array_text", t.array_text)
    }, getTitle: function () {
        return this.get("array_text")[0]
    }, getText: function () {
        return this.get("array_text").join("\n")
    }, setEvents: function () {
        var t = this.j_component.find("textarea"), e = this;
        t.change((function () {
            var t = $(this).val().split("\n");
            app.component.addHistory({
                type: "array_text",
                cid: e.cid,
                array_text: t,
                old_array_text: e.data.array_text
            }), e.set("array_text", t), e.data.array_text = t
        })), t.on("keydown", (function (t) {
            var e = t.keyCode;
            38 != e && 40 != e || t.stopPropagation()
        })), void 0 !== app.config.user_config.text_cmp_font_size && t.css("font-size", app.config.user_config.text_cmp_font_size + "px"), void 0 !== app.config.user_config.text_cmp_height && t.css("height", app.config.user_config.text_cmp_height + "px")
    }, getTyranoScriptCode: function () {
        var t = "", e = this.get("array_text");
        t += "[tb_start_tyrano_code]\n";
        for (var n = 0; n < e.length; n++) t += e[n] + "\n";
        return t += "[_tb_end_tyrano_code]"
    }
}), Builder.Component.TextCode = Builder.Core.Base.extend({
    defaults: {array_text: []}, initialize: function (t) {
        this.set("array_text", t.array_text)
    }, getTitle: function () {
        return this.get("array_text")[0]
    }, getText: function () {
        return this.get("array_text").join("\n")
    }, setEvents: function () {
        var t = this.j_component.find("textarea"), e = this;
        t.change((function () {
            var t = $(this).val().split("\n");
            app.component.addHistory({
                type: "array_text",
                cid: e.cid,
                array_text: t,
                old_array_text: e.data.array_text
            }), e.set("array_text", t), e.data.array_text = t
        })), t.on("keydown", (function (t) {
            var e = t.keyCode;
            38 != e && 40 != e || t.stopPropagation()
        })), void 0 !== app.config.user_config.text_cmp_font_size && t.attr("style", "font-size:" + app.config.user_config.text_cmp_font_size + "px !important"), void 0 !== app.config.user_config.text_cmp_height && t.css("height", app.config.user_config.text_cmp_height + "px")
    },
    getTyranoScriptCode: function () {
        var t = "", e = this.get("array_text"), n = "1";
        void 0 !== this.data.pm.mode && (n = this.data.pm.mode);
        var i = "";
        switch (n) {
            case"1":
                i = "[p]";
                break;
            case"2":
                i = "[l][r]";
                break;
            case"3":
                i = "[r]"
        }
        t += "[tb_start_text mode=" + this.data.pm.mode + " ]\n";
        // for (var a = 0; a < e.length; a++) e[a].length > 0 && "#" != e[a].substring(0, 1) ? t += e[a] + i + "\n" : t += e[a] + "\n";
        for (var a = 0; a < e.length; a++) {
            if (e[a].length > 0 && "#" !== e[a].substring(0, 1)) {
                var singleBracketRegex = /(^|\s)\[[a-zA-Z0-9_\-]+\](\s|$)/;
                var multiBracketRegex = /\[.*\].*\[.*\]/;
                var patternsToAvoid = ["\\[p\\]$", "\\[l\\]$", "\\[r\\]$", "\\[er\\]$", "\\[cm\\]$", "\\[ct\\]$"];
                var avoidAppendingPattern = new RegExp(patternsToAvoid.join("|"));

                if (singleBracketRegex.test(e[a]) && !multiBracketRegex.test(e[a])) {
                    t += e[a] + "\n";
                } else if (avoidAppendingPattern.test(e[a])) {
                    t += e[a] + "\n";
                } else {
                    t += e[a] + i + "\n";
                }
            } else {
                t += e[a] + "\n";
            }
        }







        return t += "[_tb_end_text]"
    }
}), Builder.Component.Image = Builder.Core.Base.extend({
    defaults: {image_url: "", img_url_base: ""},
    initialize: function (t) {
    },
    setEvents: function () {
        this.j_component.click((function () {
        }))
    }
}), Builder.Component.Sound = Builder.Core.Base.extend({
    defaults: {base_sound_url: "", sound_url: ""},
    initialize: function (t) {
    },
    setEvents: function () {
        this.j_component.click((function () {
        }))
    }
}), Builder.Component.Movie = Builder.Core.Base.extend({
    defaults: {base_movie_url: "", movie_url: ""},
    initialize: function (t) {
    },
    setEvents: function () {
        this.j_component.click((function () {
        }))
    }
}), Builder.Component.Label = Builder.Core.Base.extend({
    defaults: {title: ""}, initialize: function (t) {
    }, setEvents: function () {
    }, getTyranoScriptCode: function () {
        return "*" + this.data.pm.label_name
    }
}), Builder.Component.Simple = Builder.Core.Base.extend({
    defaults: {title: ""}, initialize: function (t) {
    }, setEvents: function () {
    }
}), Builder.Component.General = Builder.Core.Base.extend({
    defaults: {}, initialize: function (t) {
    }, setEvents: function () {
        var t = this.j_component.find("input"), e = this;
        t.change((function () {
            e.data.origin = $(this).val(), app.component.refleshComponent(e)
        }))
    }, getTyranoScriptCode: function () {
        return "#" != this.data.origin.substr(0, 1) ? "[" + this.data.origin + "]" : this.data.origin
    }
});