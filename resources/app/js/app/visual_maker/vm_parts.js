var _vm_parts = {
    image: {
        tag: "tb_image_show",
        name: $.s("Изображение"),
        drag: !0,
        resize: !0,
        image_path: "fgimage",
        image_dir: "default/",
        image_param: "storage",
        param: ["size", "image"],
        default_pm: {storage: "none", name: "_tb_system", time: 1, width: 300, height: 200, x: 100, y: 100},
        init: function (a, e) {
            var t = $("<img>");
            if (t.css({
                width: "100%",
                height: "100%"
            }), "none" == e.storage) t.attr("src", "./_new/assets/img/no_image.jpg"); else {
                var i = app.getProjectPath() + "data/fgimage/" + e.storage;
                t.attr("src", i)
            }
            a.css({width: e.width, height: e.height, left: e.x, top: e.y, "z-index": 1}), a.append(t)
        }
    },
    cg_image_button: {
        tag: "tb_cg_image_button",
        name: $.s("Миниатюра галереи"),
        drag: !0,
        resize: !0,
        image_path: "image",
        image_dir: "",
        image_param: "graphic",
        param: ["size", "image", "cg"],
        default_pm: {
            graphic: "none",
            storage: "system/master_cg.ks",
            target: "",
            role: "sleepgame",
            no_graphic: "&sf._tb_cg_noimage",
            time: 1,
            width: 300,
            height: 200,
            x: 100,
            y: 100
        },
        init: function (a, e) {
            var t = $("<img>");
            if (t.css({
                width: "100%",
                height: "100%"
            }), "none" == e.graphic) t.attr("src", "./_new/assets/img/no_image.jpg"); else {
                var i = app.getProjectPath() + "data/image/" + e.graphic;
                t.attr("src", i)
            }
            a.css({width: e.width, height: e.height, left: e.x, top: e.y, "z-index": 1}), a.append(t)
        }
    },
    replay_image_button: {
        tag: "tb_replay_image_button",
        name: $.s("Миниатюра повторов"),
        drag: !0,
        resize: !0,
        image_path: "image",
        image_dir: "",
        image_param: "graphic",
        param: ["size", "image", "replay"],
        default_pm: {
            graphic: "none",
            storage: "",
            target: "",
            role: "sleepgame",
            no_graphic: "&sf._tb_replay_noimage",
            time: 1,
            width: 300,
            height: 200,
            x: 100,
            y: 100
        },
        init: function (a, e) {
            var t = $("<img>");
            if (t.css({
                width: "100%",
                height: "100%"
            }), "none" == e.graphic) t.attr("src", "./_new/assets/img/no_image.jpg"); else {
                var i = app.getProjectPath() + "data/image/" + e.graphic;
                t.attr("src", i)
            }
            a.css({width: e.width, height: e.height, left: e.x, top: e.y, "z-index": 1}), a.append(t)
        }
    },
    bg: {
        tag: "bg",
        name: $.s("Изображение фона"),
        param: ["image"],
        drag: !1,
        resize: !1,
        image_path: "bgimage",
        image_dir: "",
        image_param: "storage",
        single: !0,
        default_pm: {time: 1, storage: "bg_base.png"},
        init: function (a, e) {
            var t = $("<img>");
            t.css({width: "100%", height: "100%"});
            var i = app.getProjectPath() + "data/bgimage/" + e.storage;
            t.attr("src", i), a.css({width: "100%", height: "100%", "z-index": 0}), a.append(t)
        }
    },
    button: {
        tag: "button",
        name: $.s("Переход"),
        drag: !0,
        resize: !0,
        image_path: "image",
        image_dir: "",
        image_param: "graphic",
        param: ["size", "image", "jump"],
        default_pm: {graphic: "none", storage: "", target: "", time: 1, width: 300, height: 200, x: 100, y: 100},
        init: function (a, e) {
            var t = $("<img>");
            if (t.css({
                width: "100%",
                height: "100%"
            }), "none" == e.graphic) t.attr("src", "./_new/assets/img/no_image.jpg"); else {
                var i = app.getProjectPath() + "data/image/" + e.graphic;
                t.attr("src", i)
            }
            a.css({width: e.width, height: e.height, left: e.x, top: e.y, "z-index": 1}), a.append(t)
        }
    }
};