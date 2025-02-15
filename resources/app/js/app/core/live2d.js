Builder.Core.Live2d = Builder.Core.Base.extend({
    live2d_path: "",
    live2d_config_path: "",
    select_window_data: {},
    selected_live2d_model_for_window: "",
    models: {},
    defaults: {},
    initialize: function (e) {
        this.c = e, require("electron").remote.ipcMain.on("live2d", (function (e, i) {
            let t = JSON.parse(i);
            console.log(t), e.returnValue = JSON.stringify(t)
        }))
    },
    setView: function (e) {
        this.j_view = e
    },
    init: function () {
    },
    initModel: function () {
        this.loadModel()
    },
    loadModel: function () {
        this.live2d_path = app.getDataPath() + "others/plugin/live2d/model";
        var e = app.io.getDirectories(this.live2d_path);
        for (key in e) {
            var i = e[key].path, t = e[key].item, o = i + "/" + t + ".model3.json";
            app.io.exists(o) && (this.models[t] = {}, this.models[t].json = app.io.loadJson(o))
        }
    },
    getMotion: function (e) {
        return e ? app.live2d.models[e].json.FileReferences.Motions : []
    },
    getExpression: function (e) {
        return e && app.live2d.models[e].json.FileReferences.Expressions ? app.live2d.models[e].json.FileReferences.Expressions : []
    },
    removeModel: function (e) {
        var i = app.getDataPath() + "others/plugin/live2d/model/" + e;
        app.io.rmdir(i), delete this.models[e], app.live2d.selected_live2d_model_for_window = null
    },
    saveModel: function () {
        var e = "var LIVE2D_MODEL = []; \n", i = "";
        for (key in this.live2d_path = app.getDataPath() + "others/live2d/assets/", this.models) {
            var t = this.models[key];
            e += "var PRELOAD_GROUP = '';\n", e += "LIVE2D_MODEL['" + key + "'] = { \n", e += '"filepath":"' + t.filepath + '",\n', e += '"modeljson":"' + t.modeljson + '"\n', e += "}; \n", i += '[live2d_new name="' + key + '"]\n'
        }
        i += "[return] \n", this.live2d_config_path = app.getDataPath() + "others/live2d/Live2DModel.js", app.io.writeFile(this.live2d_config_path, e);
        var o = app.getDataPath() + "scenario/system/live2d_define.ks";
        app.io.writeFile(o, i)
    },
    show: function (e, i, t, o) {
    }
});