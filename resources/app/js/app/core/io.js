Builder.Core.Io = Builder.Core.Base.extend({
    defaults: {name: "gegegge", age: 0, updateTime: new Date}, fs: {}, initialize: function (e) {
        this.c = e, this.fs = require("fs-extra")
    }, readFile: function (e) {
        return "" + this.fs.readFileSync(e)
    }, writeFile: function (e, i) {
        return this.fs.writeFileSync(e, i)
    }, writeFileAppend: function (e, i) {
        return this.fs.appendFileSync(e, i)
    }, saveJson: function (e, i, t) {
        var r = JSON.stringify(i);
        this.writeFile(e, r)
    }, loadJson: function (e) {
        return JSON.parse(this.readFile(e))
    }, mkdir: function (e) {
        require("mkdirp").sync(e, "0777")
    }, rmdir: function (e) {
        this.fs.removeSync(e)
    }, copy: function (e, i) {
        this.fs.copySync(e, i)
    }, writeZip: function (e, i, t) {
        console.log(i), require("zip-dir")(e, {saveTo: i}, (function (e, i) {
            console.log(e), t && t()
        }))
    }, exists: function (e) {
        return this.fs.existsSync(e)
    }, getDirectories: function (e) {
        var i = require("path"), t = [];
        return this.fs.readdirSync(e).forEach($.proxy((function (r) {
            this.fs.statSync(i.join(e, r)).isDirectory() && t.push({item: r, path: e + "/" + r})
        }), this)), t
    }, getFiles: function (e) {
        app.clearCache();
        var i = require("path"), t = [];
        return this.fs.readdirSync(e).forEach($.proxy((function (r) {
            this.fs.statSync(i.join(e, r)).isFile() && ".DS_Store" != r && t.push({item: r, path: e + "/" + r})
        }), this)), t
    }, getTree: function (e) {
        var i = {default_folder: []}, t = 0, r = 3;
        "trial" == global_build && -1 != e.indexOf("bgimage") && (r = 5);
        var n = this.getFiles(e);
        for (var s in n) {
            if ("trial" == global_build && t >= r) break;
            var a = n[s];
            i.default_folder.push(a), t++
        }
        var o = this.getDirectories(e);
        for (var s in o) {
            var u = o[s], c = u.item;
            i[c] = [];
            var f = app.io.getFiles(u.path);
            for (var l in f) {
                if ("trial" == global_build && t >= r) break;
                a = f[l];
                i[c].push(a), t++
            }
        }
        return i
    }, getItems: function (e) {
        app.clearCache();
        var i = require("path");
        "/" != e.slice(-1) && (e += "/");
        var t = [];
        try {
            this.fs.statSync(e)
        } catch (e) {
            return []
        }
        return this.fs.readdirSync(e).forEach($.proxy((function (r) {
            var n = this.fs.statSync(i.join(e, r));
            n.isDirectory() ? t.push({item: r, path: e + "/" + r, type: "directory"}) : n.isFile() && t.push({
                item: r,
                path: e + r,
                type: "file"
            })
        }), this)), t
    }, countDirItems: function (e) {
        array_items = this.getItems(e);
        for (var i = 0, t = 0; t < array_items.length; t++) "file" == array_items[t].type && "Thumbs.db" != array_items[t].item && ".DS_Store" != array_items[t].item && i++;
        return i
    }, getFileFromURL: function (e, i, t) {
        require("request")(e, {encoding: "binary"}, ((e, r, n) => {
            if (null != e) alert("Ошибка: не удалось получить Live2Dcore"); else {
                require("fs").writeFile(i, n, "binary", (e => {
                })), "function" == typeof t && setTimeout((function () {
                    t()
                }), 100)
            }
        }))
    }
});