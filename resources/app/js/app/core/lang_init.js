var Builder = {View: {}, Model: {}, App: {}}, local = {};
$.replaceAll = function (a, e, p) {
    return "string" != typeof a ? a : a.split(e).join(p)
};
const _app = require("electron").remote.app;
let path = _app.getAppPath();
var fs = require("fs-extra");
if ("darwin" == process.platform) if (-1 != path.indexOf("var/folders")) {
    path = process.env.HOME + "/TyranoBuilder/TyranoBuilder.app", fs.existsSync(path) || (alert("[macOS Alert] Запущен ли vneffector.app в правильном месте?" + path + "и запустить тот, который размещен в"), location.href = "");
    let a = path.indexOf("/TyranoBuilder.app");
    path = path.substr(0, a), path += "/TyranoBuilder.app/Contents/Resources/app"
} else path = -1 != path.indexOf(".asar") ? $.replaceAll(path, "/TyranoBuilder.app/Contents/Resources/app.asar", "") : $.replaceAll(path, "/TyranoBuilder.app/Contents/Resources/app", ""); else "win32" == process.platform && (path = -1 != path.indexOf(".asar") ? $.replaceAll(path, "\\resources\\app.asar", "") : $.replaceAll(path, "\\resources\\app", ""));
var exe_path = path + "/";
fs.existsSync(exe_path + "lang/" + global_lang + ".json") ? local[global_lang] = JSON.parse(fs.readFileSync(exe_path + "lang/" + global_lang + ".json")) : local[global_lang] = JSON.parse(fs.readFileSync("./lang/" + global_lang + ".json"));