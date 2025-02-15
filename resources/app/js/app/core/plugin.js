Builder.Plugin = {}, Builder.Core.Plugin = Builder.Core.Base.extend({
    map_plugin: {}, map_preview_tag: {}, defaults: {}, initialize: function (n) {
        this.c = n
    }, createTB: function () {
        var n = {};
        n.$ = $, n.getProjectPath = function () {
            return app.exe_path + "myproject/" + app.tyrano.project_name + "/"
        }, n.io = app.io, n.component = app.component, n._pm_type = _pm_type, this.TB = n
    }, loadPlugins: function () {
        this.createTB();
        var n = app.getProjectPath() + "data/others/plugin";
        this.plugin_path = n, app.io.exists(n) || app.io.mkdir(n);
        var e = app.io.getDirectories(n);
        this.map_plugin = {};
        for (var i = "", t = 0, a = 0; a < e.length; a++) {
            var p = e[a].item;
            if (app.io.exists(n + "/" + p + "/" + global_lang + ".json") && (lang_plugin = app.io.loadJson(n + "/" + p + "/" + global_lang + ".json"), _.defaults(local[global_lang], lang_plugin)), app.io.exists(n + "/" + p + "/" + p + ".builder.js")) {
                if (t++, "steam" != global_build && t >= 3) return !1;
                var o = new (require(n + "/" + p + "/" + p + ".builder.js"))(this.TB);
                if (o.test, this.map_plugin[p] = o, "function" == typeof o.getPluginTag ? i += o.getPluginTag() : i += '[plugin name="' + p + '"]\n', i += "\n", "function" == typeof o.defineComponents) {
                    var l = o.defineComponents();
                    for (key in l) this.addComponent(key, l[key])
                }
            }
        }
        var r = app.getDataPath() + "scenario/system/plugin_third.ks";
        app.io.writeFile(r, i)
    }, addComponent: function (n, e) {
        _component_manage.plugin.components[n] = e.info, _map_component[n] = e.component
    }, getPlugin: function (n) {
        return this.map_plugin[n]
    }
});