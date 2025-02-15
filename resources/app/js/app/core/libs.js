!function (e) {
    e.loginCheck = function (n) {
        0 == e("#is_login").val() && (location.href = "/users/login")
    }, e.getBaseURL = function () {
        var e = location.pathname, n = e.lastIndexOf("/");
        return e.substring(0, n + 1)
    }, e.escapeHTML = function (n, t) {
        n = n || "";
        var r = e("<div/>").text(n).html();
        return t && "" === r && (r = t), r
    }, e.h = function (n, t) {
        return e.escapeHTML(n, t)
    }, e.br = function (e) {
        return e = (e = e.replace(/\r\n/g, "<br />")).replace(/(\n|\r)/g, "<br />")
    }, e.f = function (e, n) {
        return "function" == typeof e ? e(n) : e
    }, e.getNowDate = function () {
        var e = new Date;
        return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()
    }, e.getNowTime = function () {
        var e = new Date;
        return e.getHours() + "：" + e.getMinutes() + "：" + e.getSeconds()
    }, e.getNowDateStr = function () {
        var e = new Date;
        return "" + e.getFullYear() + (e.getMonth() + 1) + e.getDate() + "_" + e.getHours() + e.getMinutes() + e.getSeconds()
    }, e.getExt = function (e) {
        return e.split(".").pop()
    }, e.getPathToName = function (e, n) {
        return n ? e.match(".+/(.+?)([?#;].*)?$")[1] : e.match(".+/(.+?).[a-z]+([?#;].*)?$")[1]
    }, e.def = function (e, n) {
        return void 0 === e ? n : e
    }, e.id = function (n) {
        return e("#" + n)
    }, e.cl = function (n) {
        if (n instanceof Array) {
            for (var t = "", r = 0; r < n.length; r++) "" !== n[r] && (t = "." + n[r]);
            return e(t)
        }
        return e("." + n)
    }, e.tag = function (e, n) {
        var t = "";
        for (key in n) t += " " + key + '="' + n[key] + '" ';
        return "[" + e + " " + t + " ]"
    }, e.convertSecToString = function (e) {
        if (0 == e) return "-";
        var n = Math.floor(e / 86400), t = Math.floor(e % 86400 / 3600), r = Math.floor(e % 86400 % 3600 / 60),
            o = Math.floor(e % 86400 % 3600 % 60), i = "";
        return 0 !== n && (i += n + "день"), 0 !== t && (i += t + "Продолжительность"), 0 !== r && (i += r + "分"), 0 !== o && (i += o + "秒"), i
    }, e.secToMinute = function (e) {
        if (0 === e) return "-";
        var n = Math.floor(e / 60), t = "";
        return 0 !== n && (t += n + "分"), t += Math.floor(e % 60) + "秒"
    }, e.trim = function (e) {
        return e ? e.replace(/^\s+|\s+$/g, "") : ""
    }, e.rmspace = function (e) {
        return e = (e = (e = e.replace(/ /g, "")).replace(/　/g, "")).replace(/\r\n?/g, "")
    }, e.replaceAll = function (e, n, t) {
        return "string" != typeof e ? e : e.split(n).join(t)
    }, e.checkSymbol = function (e) {
        return !!new RegExp(/[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]/g).test(e)
    }, e.cutstr = function (e, n) {
        return e ? (e.length > n && (e = e.substring(0, n) + "..."), e) : null
    }, e.setExt = function (e, n) {
        return 1 == e.split(".").length && (e = e + "." + n), e
    }, e.array_replace = function (e, n, t) {
        var r = e[n];
        return e.splice(n, 1), e.splice(t, 0, r), e
    }, e.cloneObject = function (n) {
        return e.extend(!0, {}, n)
    }, e.layer = function (e) {
        return e ? "layer-" + e : ""
    }, e.convertOpacity = function (e) {
        return e / 255
    }, e.convertStorage = function (e) {
    }, e.convertColor = function (e) {
        return e ? -1 != e.indexOf("0x") ? e.replace("0x", "#") : e : ""
    }, e.convertBold = function (e) {
        return "true" == e ? "bold" : ""
    }, e.send = function (n, t, r) {
        e.ajax({
            type: "POST", url: n, data: t, dataType: "json", complete: function () {
                e.hideLoading()
            }, success: function (n, t) {
                e.hideLoading(), r && r(n)
            }
        })
    }, e.loadText = function (n, t) {
        var r = jQuery.get(n + "?" + Math.floor(1e6 * Math.random()), null, (function (e) {
            var n = "";
            n = r && r.responseText ? r.responseText : e, t(n)
        }));
        "error" === r.statusText && e.alert(e.s("Файл не найден"))
    }, e.getCookie = function (e) {
        var n = document.cookie + ";", t = n.indexOf(e, 0);
        if (-1 != t) {
            var r = (n = n.substring(t, n.length)).indexOf("=", 0) + 1, o = n.indexOf(";", r);
            return n.substring(r, o)
        }
        return null
    }, e.bool = function (e) {
        return 1 == e || "true" == e
    }, e.isNull = function (e) {
        return void 0 === e || null == e ? "" : e
    }, e.checkNull = function (e) {
        return !!e
    }, e.rtrim = function (e, n) {
        var t = e.lastIndexOf(n);
        return -1 == t ? e : e.substring(0, t)
    }, e.isNum = function (e) {
        return !e.match(/[^0-9]+/)
    }, e.dstop = function () {
    }, e.userenv = function () {
        var e = navigator.userAgent;
        return e.indexOf("iPhone") > -1 || e.indexOf("iPad") > -1 ? "iphone" : e.indexOf("Android") > -1 ? "andoroid" : "pc"
    }, e.getBrowser = function () {
        var e = window.navigator.userAgent.toLowerCase();
        return e.indexOf("msie") > -1 ? "msie" : e.indexOf("firefox") > -1 ? "firefox" : e.indexOf("opera") > -1 ? "opera" : e.indexOf("chrome") > -1 ? "chrome" : e.indexOf("safari") > -1 ? "safari" : "unknown"
    }, e.swfName = function (e) {
        return -1 != navigator.appName.indexOf("Microsoft") ? window[e] : document[e]
    }, e.setStyle = function (e, n, t) {
        for (var r = {}, o = 0; o < t.length; o++) {
            var i = t[o];
            console.log(i + ":" + n[i]), void 0 !== n[i] && (void 0 !== tyrano.define.convert_pm[i] ? n[i] == tyrano.define.convert_pm[i][0] && (r[i] = tyrano.define.convert_pm[i][1]) : (n[i] += "", n[i].match(/^[0-9]+$/) ? r[i] = parseInt(n[i]) : r[i] = n[i]))
        }
        e.css(r)
    }, e.addCssFile = function (e) {
        let n = document;
        var t = n.getElementsByTagName("head")[0], r = n.createElement("link");
        r.setAttribute("rel", "stylesheet"), r.setAttribute("type", "text/css"), r.setAttribute("href", e), t.appendChild(r)
    }, e.convertNumber = function (e) {
        for (key in e) "" == e[key] ? e[key] = "" : 0 == isNaN(e[key]) && (e[key] = parseInt(e[key]));
        return e
    }, e.minifyObject = function (e) {
        for (key in e) null != e[key] && "" != e[key] || delete e[key];
        return e
    }, e.keys = function (e) {
        var n = [];
        for (key in e) n.push(key);
        return n
    }, e.countObj = function (e) {
        var n = 0;
        for (key in e) n++;
        return n
    }, e.showLoading = function () {
        e("#modalbox_load").show(), e("#overlay_load").show()
    }, e.hideLoading = function () {
        e("#modalbox_load").hide(), e("#overlay_load").hide()
    }, e.setName = function (n, t) {
        if ("" != (t = e.trim(t))) for (var r = t.split(","), o = 0; o < r.length; o++) n.addClass(r[o])
    }, e.s = function (e) {
        if (global_lang && local[global_lang]) {
            var n = local[global_lang][e];
            return n || e
        }
        return e
    }, e.lang_html = function (n) {
        n.each((function () {
            var n = e(this), t = n.attr("data-lang");
            if ("span" == t) {
                var r = e.s(n.html());
                n.html(r)
            } else if ("val" == t) {
                r = e.s(n.val());
                n.val(r)
            }
        }))
    }, e.alert = function (e, n) {
        alertify.alert(e, (function () {
            "function" == typeof n && n()
        }))
    }, e.prompt = function (e, n) {
        alertify.prompt(e, (function (e, t) {
            "function" == typeof n && n(e, t)
        }))
    }, e.inform = function (e, n) {
        alertify.log(e, n)
    }, e.confirm = function (e, n, t) {
        alertify.confirm(e, (function (e) {
            e ? n() : t()
        }))
    }, e.alertProOnly = function (n) {
        n || (n = ""), e.confirm(n, (function () {
            app.gui.shell("url", "")
        }), (function () {
        }))
    }, e.sleep = function (e) {
        for (var n = (new Date).getTime(), t = (new Date).getTime(); t < n + 1e3 * e;) t = (new Date).getTime()
    }, e.error_message = function (n) {
        e.alert(n)
    }, e.setCookie = function (e, n) {
        document.cookie = e + "=" + escape(n) + ";expires=Fri, 31-Dec-2030 23:59:59;path=/;"
    }
}(jQuery), jQuery.fn.outerHTML = function (e) {
    if (e) return this.before(e), this.remove(), this;
    var n = jQuery("<p>"), t = this.eq(0);
    return n.append(t.clone()), n.html()
}, jQuery.fn.exists = function () {
    return Boolean(this.length > 0)
};
var valid_methods = {
    required: {
        exp: function (e) {
            return !("" === $.trim(e))
        }, message: $.s("Обязательно")
    }, alphabet: {
        exp: function (e) {
            return /^[a-zA-Z0-9_]+$/.test(e)
        }, message: $.s("Используйте только символы a~z(а-я), 0~9")
    }, number: {
        exp: function (e) {
            return !isNaN(e)
        }, message: $.s("Введите число")
    }
};
jQuery.fn.valid = function (e) {
    var n = this.val(), t = "";
    for (rule in e) if (!valid_methods[rule].exp(n)) {
        t += valid_methods[rule].message;
        break
    }
    return "" == t || (this.next(".error").remove(), this.after("<div class='error'>" + t + "</div>"), !1)
};