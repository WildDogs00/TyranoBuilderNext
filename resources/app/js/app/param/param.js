Builder.Param.Text = Builder.Param.Base.extend({
    defaults: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = e.get("component").data.pm[t] || 0, n = $("<div class='vne_theme-param'></div>"),
            o = $("<input type='text' value='" + a + "' class='form-control' />");
        if (o.attr("name", t), e.get("component").data.pm[t]) {
            var p = a = $.replaceAll(e.get("component").data.pm[t], "&nbsp;", " ");
            o.val(p)
        } else o.val(e.get("param").default_val);
        return o.change((function () {
            var a = $(this).val();
            e.valid(!0);
            var n = e.get("component").data.pm[t];
            "function" == typeof e.get("param").onChange ? e.get("param").onChange(a, e.get("component"), n) : app.component.changeParam(e.get("component"), t, $.replaceAll(a, " ", "&nbsp;")), app.component.refleshComponent(e.get("component"))
        })), n.append(o), n.append("<input class='vne-ep-accept-text-btn' type='button' value='" + $.s("Принять") + "'></input>"), n
    }, initialize: function (e) {
    }
}), Builder.Param.Num = Builder.Param.Base.extend({
    defaults: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = e.get("component").data.pm[t] || 0,
            n = $("<div><input class='input-mini form-control' type='text' value='" + a + "' /></div>");
        n.find("input").attr("name", t);
        var o = {min: 0, step: 10};
        return "object" == typeof e.get("param").spinner && (o = e.get("param").spinner), o.change = function (a, o) {
            var p = n.find("input").val();
            e.valid(!0), app.component.changeParam(e.get("component"), t, p)
        }, n.find("input").spinner(o), e.get("component").data.pm[t] ? n.val(e.get("component").data.pm[t]) : n.val(e.get("param").default_val), n
    }, initialize: function (e) {
    }
}), Builder.Param.Color = Builder.Param.Base.extend({
    defaults: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = e.get("component").data.pm[t].replace("0x", "#"),
            n = $("<div><input type='text' class='vne-ep-hue-color' data-control='hue' value='" + a + "' /></div>");
        return n.attr("name", t), n.find("input").minicolors({
            change: function (a, n) {
                e.get("component").data.pm[t] = a.replace("#", "0x")
            }
        }), e.get("component").data.pm[t] ? n.val(a) : n.val(e.get("param").default_val), n
    }, initialize: function (e) {
    }
}), Builder.Param.Select = Builder.Param.Base.extend({
    defaults: {}, initialize: function (e) {
    }, createHtml: function () {
        var e = $("<select class='vne-ep-select'>"), t = this;
        t.get("param").size && e.attr("size", t.get("param").size);
        var a = "function" == typeof t.get("param").select_list ? t.get("param").select_list(t) : t.get("param").select_list;
        for (key in a) e.append($("<option class='vne_theme-ep-select-option'>").html(a[key].name).val(a[key].val));
        var n = this.get("param_name");
        t.get("component").data.pm && (t.get("component").data.pm[n] ? e.val(t.get("component").data.pm[n]) : e.val($.f(t.get("param").default_val)));
        var o = $.f(t.get("param").className);
        return o && e.addClass(o), e.change((function () {
            var e = $(this).val();
            app.component.changeParam(t.get("component"), n, e), app.component.refleshComponent(t.get("component")), "function" == typeof t.get("param").onChange && t.get("param").onChange(e)
        })), e
    }, setEvents: function () {
    }
}), Builder.Param.Check = Builder.Param.Base.extend({
    defaults: {}, initialize: function (e) {
    }, createHtml: function () {
        var e = this, t = e.get("param").text,
            a = $("<div class='form-check form-switch vne_theme-param'><input style='float:left' class='checkbox form-check-input' id='flexSwitchCheckChecked' type='checkbox' />&nbsp;&nbsp;" + t + "</div>"),
            n = this.get("param_name");
        return null == e.get("component").data.pm[n] ? a.find(".checkbox").attr("checked", e.get("param").default_val) : a.find(".checkbox").attr("checked", e.get("component").data.pm[n]), a.find(".checkbox").change((function () {
            if ("function" == typeof e.get("param").onChange) e.get("param").onChange(t, e.get("component"), a.find(".checkbox")); else {
                var t = $(this).prop("checked");
                app.component.changeParam(e.get("component"), n, t)
            }
        })), a
    }, setEvents: function () {
    }
}), Builder.Param.Label = Builder.Param.Base.extend({
    defaults: {title: ""}, initialize: function (e) {
    }, setEvents: function () {
    }
}), Builder.Param.BoundSelect = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = e.get("component").data.pm[t],
            n = e.get("component").config.default_view.base_img_url, o = (app.getProjectPath(), $("<div class='vne_theme-param'></div>")),
            p = $("<input type='button' class='vne-set-area-btn' value='" + $.s("Установить") + "' />");
        e = this;
        return p.click((function () {
            var t, a, n = app.tyrano.config.scWidth, o = app.tyrano.config.scHeight, p = {
                    x: e.get("component").data.pm.x,
                    y: e.get("component").data.pm.y,
                    width: e.get("component").data.pm.width,
                    height: e.get("component").data.pm.height
                }, i = "", c = !1, l = e.get("component").cid, d = app.component.getComponentByCid(l).index,
                m = app.component.makePreviewMapping(d);
            t = m.map_chara, a = m.map_img, map_button = m.map_button;
            var r = m.array_glink;
            if ("image" == e.get("param").bound_type) {
                var s = "storage";
                if ("button" == e.get("component").data.name) {
                    if (null == e.get("component").data.pm.graphic) return alertNoBtn("Внимание", "Нет выбранного изображения", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
                    s = "graphic"
                } else if (null == e.get("component").data.pm.storage) return alertNoBtn("Внимание", "Нет выбранного изображения", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;

                if ("buttonHover" == e.get("component").data.name) {
                    if (null == e.get("component").data.pm.graphic) return alertNoBtn("Внимание", "Нет выбранного изображения", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
                    s = "graphic"
                } else if (null == e.get("component").data.pm.storage) return alertNoBtn("Внимание", "Нет выбранного изображения", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;

                i = app.getProjectPath() + e.get("component").config.default_view.base_img_url + e.get("component").data.pm[s]
            } else if ("chara" == e.get("param").bound_type) {
                s = "storage";
                if (null == e.get("component").data.pm.name) return alertNoBtn("Внимание", "Никакой персонаж не выбран", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
                var g = e.get("component").data.pm.name;
                i = t[g] ? app.getProjectPath() + "data/fgimage/" + t[g].storage : app.getProjectPath() + "data/fgimage/" + app.component.getCharaDefaultStorage(g), null != e.get("component").data.pm.storage && (i = app.getProjectPath() + "data/fgimage/" + e.get("component").data.pm.storage), p.x = e.get("component").data.pm.left, p.y = e.get("component").data.pm.top, c = e.get("component").data.pm.reflect
            } else "glink" == e.get("param").bound_type || ("textbox" == e.get("param").bound_type || "ptext" == e.get("param").bound_type) && (p.x = e.get("component").data.pm.left, p.y = e.get("component").data.pm.top);
            var u = app.getProjectPath() + "data/bgimage/" + m.bg;
            app.window.show("SelectBound", {
                title: $.s("Положение изображения на экране"),
                width: n,
                height: o,
                bound: p,
                background_url: u,
                bound_type: e.get("param").bound_type,
                reflect: c,
                bound_image_storage: i,
                padding: "none",
                pm: e.get("component").data.pm,
                map_chara: t,
                map_img: a,
                map_button: map_button,
                array_glink: r
            }, (function (t, a) {
                if ("chara" == e.get("param").bound_type || "textbox" == e.get("param").bound_type) {
                    var n = ["left", "top", "width", "height", "reflect"], o = [t.x, t.y, t.width, t.height, t.reflect];
                    app.component.changeParam(e.get("component"), n, o)
                } else if ("ptext" == e.get("param").bound_type) ; else {
                    n = ["x", "y", "width", "height", "_clickable_img"], o = [t.x, t.y, t.width, t.height, a];
                    app.component.changeParam(e.get("component"), n, o)
                }
                app.component.refleshComponent(e.get("component"))
            }))
        })), o.append(p), this.j_view = o, o
    }, setEvents: function () {
    }
}), Builder.Param.BoundSelectPlugin = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = (e.get("component").data.pm[t], $("<div class='vne_theme-param'></div>")),
            n = $("<input type='button' class='vne-set-area-btn' value='" + $.s("Установить") + "' />");
        e = this;
        return n.click((function () {
            var t, a, n = app.tyrano.config.scWidth, o = app.tyrano.config.scHeight, p = {
                    x: e.get("component").data.pm.x,
                    y: e.get("component").data.pm.y,
                    width: e.get("component").data.pm.width,
                    height: e.get("component").data.pm.height
                }, i = e.get("component").cid, c = app.component.getComponentByCid(i).index,
                l = app.component.makePreviewMapping(c);
            t = l.map_chara, a = l.map_img, map_button = l.map_button;
            var d = l.array_glink, m = "";
            "function" == typeof e.get("component").config.param._bound_select.drag_obj && (m = e.get("component").config.param._bound_select.drag_obj(e.get("component").data.pm));
            var r = app.getProjectPath() + "data/bgimage/" + l.bg;
            app.window.show("SelectBound", {
                title: $.s("Положение изображения на экране"),
                width: n,
                height: o,
                bound: p,
                background_url: r,
                bound_type: "plugin",
                reflect: !1,
                bound_image_obj: m,
                padding: "none",
                pm: e.get("component").data.pm,
                map_chara: t,
                map_img: a,
                map_button: map_button,
                array_glink: d
            }, (function (t, a) {
                var n = [t.x, t.y, t.x, t.y, t.width, t.height];
                app.component.changeParam(e.get("component"), ["x", "y", "left", "top", "width", "height"], n), app.component.refleshComponent(e.get("component"))
            }))
        })), a.append(n), this.j_view = a, a
    }, setEvents: function () {
    }
}), Builder.Param.BoundSelectFont = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = (e.get("component").data.pm[t], $("<div class='vne_theme-param'></div>")),
            n = $("<input type='button' class='vne-set-area-btn' value='" + $.s("Установить") + "' />");
        e = this;
        return n.click((function () {
            var t, a = app.tyrano.config.scWidth, n = app.tyrano.config.scHeight,
                o = {x: e.get("component").data.pm.x, y: e.get("component").data.pm.y}, p = e.get("component").cid,
                i = app.component.getComponentByCid(p).index, c = app.component.makePreviewMapping(i);
            t = c.map_chara;
            var l = c.array_glink, d = app.getProjectPath() + "data/bgimage/" + c.bg;
            app.window.show("SelectBoundFont", {
                title: $.s("Положение на экране"),
                width: a,
                height: n,
                bound: o,
                background_url: d,
                bound_type: e.get("param").bound_type,
                reflect: !1,
                bound_image_storage: "",
                padding: "none",
                pm: e.get("component").data.pm,
                map_chara: t,
                array_glink: l
            }, (function (t, a) {
                if ("ptext" == e.get("param").bound_type) {
                    var n = ["x", "y", "face", "color", "size", "text", "edge", "shadow"],
                        o = [t.x, t.y, t.face, t.color, t.size, t.text, t.edge, t.shadow];
                    1 == t.anim ? (n = n.concat(["anim", "fadeout", "wait", "in_effect", "out_effect"]), o = o.concat([t.anim, t.fadeout, t.wait, t.in_effect, t.out_effect])) : e.get("component").data.pm.anim = "false", app.component.changeParam(e.get("component"), n, o)
                }
                app.component.refleshComponent(e.get("component"))
            }))
        })), a.append(n), this.j_view = a, a
    }, setEvents: function () {
    }
}), Builder.Param.BoundSelectGlink = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = e.get("component").data.pm[t],
            n = e.get("component").config.default_view.base_img_url, o = (app.getProjectPath(), $("<div class='vne_theme-param'></div>")),
            p = $("<input type='button' class='vne-set-area-btn' value='" + $.s("Установить") + "' />");
        e = this;
        return p.click((function () {
            var t, a, n = app.tyrano.config.scWidth, o = app.tyrano.config.scHeight, p = {
                    x: e.get("component").data.pm.x,
                    y: e.get("component").data.pm.y,
                    width: e.get("component").data.pm.width,
                    height: e.get("component").data.pm.height,
                    size: e.get("component").data.pm.size
                }, i = e.get("component").cid, c = app.component.getComponentByCid(i).index,
                l = app.component.makePreviewMapping(c);
            t = l.map_chara, a = l.map_img, map_button = l.map_button;
            var d = l.array_glink, m = app.getProjectPath() + "data/bgimage/" + l.bg;
            app.window.show("SelectBoundGlink", {
                title: $.s("Положение кнопки на экране"),
                width: n,
                height: o,
                bound: p,
                background_url: m,
                bound_type: e.get("param").bound_type,
                reflect: !1,
                bound_image_storage: "",
                padding: "none",
                pm: e.get("component").data.pm,
                map_chara: t,
                map_img: a,
                map_button: map_button,
                array_glink: d
            }, (function (t, a) {
                var n = [t.x, t.y, t.width, t.height, t.color, t.text, a];
                app.component.changeParam(e.get("component"), ["x", "y", "width", "height", "color", "text", "_clickable_img"], n), app.component.refleshComponent(e.get("component"))
            }))
        })), o.append(p), this.j_view = o, o
    }, setEvents: function () {
    }
}), Builder.Param.BoundSelectAnim = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = (e.get("component").data.pm[t], $("<div class='vne_theme-param'></div>")),
            n = $("<input type='button' class='vne-set-area-btn' value='" + $.s("Настройки анимации") + "' />");
        e = this;
        return n.click((function () {
            var t, a, n = app.tyrano.config.scWidth, o = app.tyrano.config.scHeight,
                p = {x: e.get("component").data.pm.x, y: e.get("component").data.pm.y};
            if ("chara_move" == e.get("param").bound_type && null == e.get("component").data.pm.name) return alertNoBtn("Внимание", "Никакой персонаж не выбран", "2000", "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
            var i = e.get("component").cid, c = app.component.getComponentByCid(i).index,
                l = app.component.makePreviewMapping(c);
            t = l.map_chara, a = l.map_img;
            var d = app.getProjectPath() + "data/bgimage/" + l.bg;
            app.window.show("SelectBoundAnim", {
                title: $.s("Положение на экране"),
                width: n,
                height: o,
                bound: p,
                background_url: d,
                bound_type: e.get("param").bound_type,
                reflect: !1,
                padding: "none",
                pm: e.get("component").data.pm,
                map_chara: t,
                map_img: a
            }, (function (t, a) {
                if ("chara_move" == e.get("param").bound_type) {
                    var n = [t.left, t.top, t.width, t.height, t.name];
                    app.component.changeParam(e.get("component"), ["left", "top", "width", "height", "name"], n)
                }
                app.component.refleshComponent(e.get("component"))
            }))
        })), a.append(n), this.j_view = a, a
    }, setEvents: function () {
    }
}), Builder.Param.Live2dBound = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = (e.get("component").data.pm[t], $("<div class='vne_theme-param'></div>")),
            n = $("<input type='button' class='vne-set-area-btn' value='" + $.s("Установить") + "' />");
        e = this;
        return n.click((function () {
            var t = app.tyrano.config.scWidth, a = app.tyrano.config.scHeight,
                n = (e.get("component").data.pm.x, e.get("component").data.pm.y, e.get("component").data.pm.scale, e.get("component").data.pm._clickable_img, e.get("component").cid),
                o = app.component.getComponentByCid(n).index, p = app.component.makePreviewMapping(o), i = p.map_live2d,
                c = e.get("component").data.pm.name;
            if (c) {
                app.live2d.select_window_data.selected_model = c, app.live2d.select_window_data.x = e.get("component").data.pm.x, app.live2d.select_window_data.y = e.get("component").data.pm.y, app.live2d.select_window_data.scale = e.get("component").data.pm.scale, app.live2d.select_window_data.call_back = function (t) {
                    e.get("component").data.pm.x = t.x, e.get("component").data.pm.y = t.y, e.get("component").data.pm.scale = t.scale, app.component.refleshComponent(e.get("component"))
                };
                var l = app.getProjectPath() + "data/bgimage/" + p.bg;
                "" == p.bg && (l = ""), app.live2d.select_window_data.background_url = l, app.live2d.select_window_data.map_live2d = i;
                app.window.show("Live2DBound", {
                    width: parseInt(t),
                    height: parseInt(a),
                    padding: !0,
                    game_url: "./live2d_bound.html",
                    title: $.s("Позиция модели на экране")
                })
            } else alertNoBtn("Внимание", "Пожалуйста, выберите модель Live2D", "2000", "center", "info", "var(--vne-info-alert-color)")
        })), a.append(n), this.j_view = a, a
    }, setEvents: function () {
    }
}), Builder.Param.CameraPreview = Builder.Param.Base.extend({
    defaults: { type: "" },
    initialize: function (e) {
        this.gui = null;
    },
    j_view: {},
    createHtml: function () {
        var e = this;
        var t = this.get("param_name");
        var a = $("<div class='vne_theme-param'></div>");
        var n = $("<input type='button' class='vne-set-area-btn' value='" + $.s("Просмотр камеры") + "' />");

        n.click(function () {
            var t = e.get("component").cid;
            var a = app.component.getComponentByCid(t);
            var n = a.index;

            app.previewGameFromScenario(n, true, function (t) {
                app.gui.addModal("camera_preview", t);
                let o = t.j_window.find("iframe").get(0).contentWindow;

                if ("reset_camera" != a.data.name) {
                    var p = e.get("component").data.pm;
                    var i = p.zoom || "1.0";
                    var c = p.x || "0";
                    var l = p.y || "0";
                    var d = p.rotate || "0";
                    var m = p.layer || "layer_camera";
                    var r = p.ease_type || "ease";
                    var s = p.time || "1000";

                    var params = {
                        duration: parseInt(s, 10),
                        posX: parseInt(c, 10),
                        posY: parseInt(l, 10),
                        zoom: parseFloat(i),
                        rotate: parseInt(d, 10),
                        layer: m,
                        easeType: r
                    };

                    if (e.gui) {
                        e.gui.__controllers.forEach(controller => {
                            controller.updateDisplay();
                        });
                    } else {
                        e.gui = new dat.GUI({ autoPlace: false });
                        e.gui.domElement.classList.add('vne_theme-param-gui');

                        function addKeydownHandler(controller, step) {
                            var input = controller.domElement.querySelector('input[type="text"]');
                            if (input) {
                                input.addEventListener('keydown', function (event) {
                                    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                                        event.stopPropagation();
                                        event.preventDefault();
                                        var increment = (event.key === 'ArrowUp') ? step : -step;
                                        controller.setValue(controller.getValue() + increment);
                                    }
                                });
                            }
                        }

                        function updateCameraParams() {
                            a.data.pm.x = params.posX;
                            a.data.pm.y = params.posY;
                            a.data.pm.zoom = params.zoom;
                            a.data.pm.rotate = params.rotate;
                            a.data.pm.layer = params.layer;
                            a.data.pm.ease_type = params.easeType;
                            a.data.pm.time = params.duration;

                            app.component.saveTyranoScriptCodeForPreview(n);
                            app.component.saveCharaDefineCode();
                            o.location.reload();
                            app.component.refleshComponent(e.get("component"));
                        }

                        var durationController = e.gui.add(params, 'duration', 0, 10000).step(100).name($.s("Продолжительность")).onFinishChange(updateCameraParams);
                        addKeydownHandler(durationController, 100);

                        var posXController = e.gui.add(params, 'posX', -1000, 1000).step(10).name($.s("Позиция по X")).onFinishChange(updateCameraParams);
                        addKeydownHandler(posXController, 10);

                        var posYController = e.gui.add(params, 'posY', -1000, 1000).step(10).name($.s("Позиция по Y")).onFinishChange(updateCameraParams);
                        addKeydownHandler(posYController, 10);

                        var zoomController = e.gui.add(params, 'zoom', 0.1, 10).step(0.1).name($.s("Приближение")).onFinishChange(updateCameraParams);
                        addKeydownHandler(zoomController, 0.1);

                        var rotateController = e.gui.add(params, 'rotate', 0, 360).step(10).name($.s("Угол")).onFinishChange(updateCameraParams);
                        addKeydownHandler(rotateController, 10);

                        e.gui.add(params, 'layer', {
                            'Захват всего (Фон, персонажи)': 'layer_camera',
                            'Фоны': 'base',
                            'Персонажи': '0'
                        }).name($.s("Цель")).onFinishChange(updateCameraParams);

                        e.gui.add(params, 'easeType', {
                            'Ease': 'ease',
                            'Linear': 'linear',
                            'Ease in': 'ease-in',
                            'Ease out': 'ease-out',
                            'Ease in-out': 'ease-in-out'
                        }).name($.s("Эффект")).onFinishChange(updateCameraParams);

                        const folder = e.gui.addFolder($.s("Действия"));
                        folder.add({
                            close: function () {
                                t.close();
                            }
                        }, 'close').name($.s("Закрыть"));

                        t.j_window.append(e.gui.domElement);

                        $(e.gui.domElement).css({
                            minWidth: "285px",
                            position: 'absolute',
                            top: '50px',
                            left: '50px',
                            borderRadius: '8px',
                            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.5)'
                        });

                        $(e.gui.domElement).draggable({
                            handle: ".title",
                            containment: "body"
                        });
                    }
                }
            });
        });
        a.append(n);
        this.j_view = a;
        return a;
    },
    setCameraPanel: function () { },
    setEvents: function () { }
}), Builder.Param.PreviewButton = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = (e.get("component").data.pm[t], $("<div class='vne_theme-param'></div>")),
            n = $("<input type='button' class='vne-set-area-btn' value='" + $.s("Предпросмотр") + "' />");
        return n.click((function () {
            var t = e.get("component").cid, a = app.component.getComponentByCid(t), n = a.index,
                o = app.previewGameFromScenario(n);
            "reset_camera" != a.data.name && o.on("loaded", (function () {
            }))
        })), a.append(n), this.j_view = a, a
    }, setCameraPanel: function () {
    }, setEvents: function () {
    }
}), Builder.Param.Live2dSelect = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = (e.get("component").data.pm[t], $("<div class='vne_theme-param'></div>")),
            n = $("<select class='select_motion vne-set-area-btn' ></select>"), o = e.get("component").data.pm.name, p = [];
        for (key in "undefined" != o && (p = app.live2d.getMotion(o)), n.append('<option value="">---</option>'), p) {
            p[key];
            n.append('<option value="' + key + '">' + key + "</option>")
        }
        n.val(e.get("component").data.pm.mtn);
        var i = $("<select style='width:160px' class='select_no vne-set-area-btn' ></select>"), c = [];
        n.on("change", (function (t) {
            var a = n.val();
            if ("" != a) {
                i.empty(), c = p[a];
                for (var o = 0; o < c.length; o++) {
                    var l = c[o];
                    i.append('<option value="' + o + '">' + l.File + "</option>")
                }
                e.get("component").data.pm.mtn = a
            }
        })), i.on("change", (function (t) {
            var a = i.val();
            e.get("component").data.pm.no = a
        }));
        var l = $("<input type='button' class='vne-set-area-btn' value='" + $.s("Выбор анимации") + "' />");
        e = this;
        return l.click((function () {
            if (o) {
                app.live2d.select_window_data = e.get("param"), app.live2d.select_window_data.selected_model = o, app.live2d.select_window_data.selected_motion = n.val(), app.live2d.select_window_data.selected_motion_no = i.val(), app.live2d.select_window_data.call_back = function (t, a) {
                    e.get("component").data.pm.mtn = t, e.get("component").data.pm.no = a, n.val(t), n.trigger("change"), i.val(a)
                };
                app.window.show("Live2D", {
                    width: 800,
                    height: 600,
                    padding: !0,
                    game_url: "./live2d.html",
                    title: $.s("Выбор анимации")
                })
            } else alertNoBtn("Внимание", "Пожалуйста, выберите модель Live2D", "2000", "center", "info", "var(--vne-info-alert-color)")
        })), setTimeout((function () {
            n.trigger("change"), i.val(e.get("component").data.pm.no)
        }), 10), a.append(n), a.append(i), a.append(l), this.j_view = a, a
    }, setEvents: function () {
    }
}), Builder.Param.Live2dSelectExpression = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = (e.get("component").data.pm[t], $("<div class='vne_theme-param'></div>")),
            n = $("<select class='select_expression vne-set-area-btn' ></select>"), o = e.get("component").data.pm.name, p = [];
        for (key in "undefined" != o && (p = app.live2d.getExpression(o)), n.append('<option value="">---</option>'), p) {
            var i = p[key];
            n.append('<option value="' + i.Name + '">' + i.Name + "</option>")
        }
        n.val(e.get("component").data.pm.expression), n.on("change", (function (t) {
            var a = $('.select_expression').val();
            e.get("component").data.pm.expression = a
        }));
        var c = $("<input type='button' class='vne-set-area-btn' value='" + $.s("Открыть инструмент выбора выражения") + "' />");
        e = this;
        return c.click((function () {
            if (o) {
                app.live2d.select_window_data = e.get("param"), app.live2d.select_window_data.selected_model = o, app.live2d.select_window_data.selected_expression = n.val(), app.live2d.select_window_data.call_back = function (t) {
                    e.get("component").data.pm.expression = t, n.val(t)
                };
                app.window.show("Live2D", {
                    width: 800,
                    height: 600,
                    padding: !0,
                    game_url: "./live2d.html",
                    title: $.s("Выбор выражения")
                })
            } else alertNoBtn("Внимание", "Пожалуйста, выберите модель Live2D", "2000", "center", "info", "var(--vne-info-alert-color)")
        })), a.append(n), a.append(c), this.j_view = a, a
    }, setEvents: function () {
    }
}), Builder.Param.ImageSelect = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = e.get("component").data.pm[t],
            n = e.get("component").config.default_view.base_img_url;
        e.get("component").config.param[t].base_img_url && (n = e.get("component").config.param[t].base_img_url);
        var o = app.getProjectPath() + n + a, p = $("<div class='vne_theme-param'></div>"),
            i = $("<img style='border-radius: 6px; max-width:200px;max-height:126px;min-height:126px;' src='" + o + "' />");
        "" != a && null != a || i.attr("src", "_new/assets/img/no_image.jpg");
        var c = $.f(e.get("param").folder_select), l = $.f(e.get("param").window_title);
        l || (l = $.s("Выбрать"));
        var d = $("<input type='button' style='display: none' value='" + $.s("Выбрать") + "' />"),
            m = $("<div class='btn-default-close-img' style='margin-left:60px;margin-top:20px' href='javascript:void(0)' > " + $.s("Отмена") + "</div>");
        e = this;
        return d.click((function () {
            var t = "function" == typeof e.get("param").file_path ? e.get("param").file_path(e.get("component")) : e.get("param").file_path,
                a = e.get("param_name"), o = e.get("component").data.pm[a], p = "";
            if (o && -1 != o.indexOf("/")) {
                var i = o.split("/");
                p = i[i.length - 2], o = i[i.length - 1]
            }
            app.window.show("SelectFile", {
                title: l,
                width: 800,
                height: 600,
                file_path: t,
                base_url: n,
                folder: p,
                folder_select: c,
                selected_file: o
            }, (function (t) {
                app.component.changeParam(e.get("component"), a, t);
                var o = app.getProjectPath() + n + t;
                if (e.get("component").config.param._clickable_img) {
                    var p = $("<img />");
                    p.attr("src", o).load((function () {
                        e.get("component").data.pm.width = p.get(0).width, e.get("component").data.pm.height = p.get(0).height, app.component.refleshComponent(e.get("component")), e.get("component").j_component.find(".widget-main").find("img").attr("src", o)
                    }))
                } else e.j_view.find("img").attr("src", o), e.get("component").config.param[a].line_preview && "off" == e.get("component").config.param[a].line_preview || (e.get("component").j_component.find(".cpn-block").find("img").attr("src", o), e.get("component").j_component.find(".cpn-desc").html(t))
            }))
        })), m.click((function () {
            var t = e.get("param_name");
            app.component.changeParam(e.get("component"), t, ""), e.get("component").data.pm.storage = "", app.component.refleshComponent(e.get("component"))
        })), i.css("cursor", "pointer"), i.click((function () {
            d.trigger("click")
        })), p.append(i), p.append($("<div></div>").append(d).append(m)), this.j_view = p, p
    }, setEvents: function () {
    }
}), Builder.Param.SoundSelect = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = e.get("component").data.pm[t],
            n = e.get("component").config.default_view.base_sound_url,
            o = app.getProjectPath() + e.get("component").config.default_view.base_sound_url + a, p = $("<div></div>"),
            i = $("<audio style='width:240px' src='" + o + "' controls>"),
            c = $("<input type='button' class='vne-set-area-btn' value='" + $.s("Выбрать") + "' />");
        e = this;
        return c.click((function () {
            var a = "function" == typeof e.get("param").file_path ? e.get("param").file_path(e.get("component")) : e.get("param").file_path,
                o = e.get("component").data.pm[t], p = "";
            if (o && -1 != o.indexOf("/")) {
                var i = o.split("/");
                p = i[i.length - 2], o = i[i.length - 1]
            }
            app.window.show("SelectFile", {
                title: $.s("Выбор аудио"),
                width: 800,
                height: 600,
                file_path: a,
                base_url: n,
                folder: p,
                selected_file: o
            }, (function (t) {
                var a = e.get("param_name");
                app.component.changeParam(e.get("component"), a, t);
                var n = app.getProjectPath() + e.get("component").config.default_view.base_sound_url + t;
                e.checkVital(n), e.j_view.find("audio").attr("src", n), e.get("component").j_component.find(".cpn-block").find("audio").attr("src", n), e.get("component").j_component.find(".cpn-desc").html(t)
            }))
        })), p.append(i), p.append(c), this.j_view = p, p
    }, setEvents: function () {
    }
}), Builder.Param.MovieSelect = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = e.get("component").data.pm[t],
            n = e.get("component").config.default_view.base_movie_url,
            o = app.getProjectPath() + e.get("component").config.default_view.base_movie_url + a, p = $("<div class='vne_theme-param'></div>"),
            i = $("<video style='width:200px' src='" + o + "' controls><p>Video playback requires a browser that supports the video tag.</p></video>"),
            c = $("<input type='button' class='vne-set-area-btn' value='" + $.s("Выбрать") + "' />");
        e = this;
        return c.click((function () {
            var a = "function" == typeof e.get("param").file_path ? e.get("param").file_path(e.get("component")) : e.get("param").file_path,
                o = e.get("component").data.pm[t], p = "";
            if (o && -1 != o.indexOf("/")) {
                var i = o.split("/");
                p = i[i.length - 2], o = i[i.length - 1]
            }
            app.window.show("SelectFile", {
                title: $.s("Выбор видео"),
                width: 800,
                height: 600,
                file_path: a,
                base_url: n,
                folder: p,
                selected_file: o
            }, (function (t) {
                var a = e.get("param_name");
                app.component.changeParam(e.get("component"), a, t);
                var n = app.getProjectPath() + e.get("component").config.default_view.base_movie_url + t;
                e.checkVital(n), e.j_view.find("video").attr("src", n), e.get("component").j_component.find(".cpn-block").find("video").attr("src", n)
            }))
        })), p.append(i), p.append(c), this.j_view = p, p
    }, setEvents: function () {
    }
}), Builder.Param.Eval = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = (this.get("param_name"), e.get("component").data.pm.exp, $("<div class='vne_theme-param'></div>"));
        e = this;
        html = '           <div>                    <label class="vne-control-label">' + $.s("Переменная") + '</label>                  <div><input class="text_target_var var_auto_complete" type="text" /></div>                  <label class="vne-control-label">' + $.s("Операция") + '</label>                  <div><select class="select_cmd"></select></div>                                    <label class="vne-control-label">' + $.s("Тип значения") + '</label>                  <div><select class="select_op"></select></div>                                    <div>                    <div class="op op_t"><input class="text_op_t" type="text" value="" /></div>                    <div class="op op_h" style="display:none"><input class="text_op_h var_auto_complete" type="text" value="" /></div>                    <div class="op op_r" style="display:none"><input style="width:60px" class="text_op_r_from input-mini form-control" type="text" value="0" />〜<input style="width:60px" class="text_op_r_to input-mini form-control" type="text" value="10" /></div>                  </div>                                    <div style="margin-top:20px">                  <input type="button" class="button_apply vne-set-area-btn" value="' + $.s("Применить") + '" />                  </div>           </div> ';
        var a = (t = $(html)).find(".select_cmd");
        a.append($("<option>").html($.s("Присвоить значение")).val("=")), a.append($("<option>").html($.s("Добавить")).val("+=")), a.append($("<option>").html($.s("Вычесть")).val("-=")), a.append($("<option>").html($.s("Умножить на")).val("*=")), a.append($("<option>").html($.s("Разделить на")).val("/=")), a.append($("<option>").html($.s("Остаток")).val("%="));
        var n = t.find(".select_op");
        n.append($("<option>").html($.s("Значение")).val("t")), n.append($("<option>").html($.s("Переменная")).val("h")), n.append($("<option>").html($.s("Случайное")).val("r"));
        var o = {step: 1};
        t.find(".text_op_r_from").spinner(o), t.find(".text_op_r_to").spinner(o);
        var p = _.keys(app.config.project_config.map_var);
        t.find(".var_auto_complete").autocomplete({
            source: p,
            delay: 50
        }), t.find(".var_auto_complete").focusin((function (e) {
            app.gui.keyevent_buff = !0
        })).focusout((function (e) {
            app.gui.keyevent_buff = !1
        })), n.change((function () {
            var e = $(this).val();
            t.find(".op").hide(), t.find(".op_" + e).show()
        }));
        var i = "", c = "", l = "", d = "", m = "";
        if (t.find(".button_apply").click((function () {
            var o = $.trim(t.find(".text_target_var").val()), p = app.config.project_config.map_var;
            if (p[o]) {
                var r = p[o].kind;
                i = o, m_kind = r;
                var s = a.val();
                c = s;
                var g = r + "." + o + s, u = n.val();
                l = u;
                var v = "";
                switch (u) {
                    case"t":
                        var f = t.find(".text_op_t").val();
                        $.isNum(f) || (f = "'" + f + "'"), d = t.find(".text_op_t").val(), v = f;
                        break;
                    case"h":
                        var _ = t.find(".text_op_h").val();
                        if (!p[_]) return void $.alert($.s("Переменная「") + _ + $.s("」не установлена."));
                        d = _, v = p[_].kind + "." + _;
                        break;
                    case"r":
                        var h = t.find(".text_op_r_from").val(), y = t.find(".text_op_r_to").val();
                        if (d = h, m = y, !$.isNum(h) || !$.isNum(y)) return void alertNoBtn("Внимание", "Невозможно установить случайное число. Значение для диапазона задано неверно", "2000", "bottom-right", "info", "var(--vne-info-alert-color)");
                        v = "Math.floor(Math.random()*(" + y + "-" + h + "+1)+" + h + ")"
                }
                var x = [g + v, i, c, l, d, m];
                app.component.changeParam(e.get("component"), ["exp", "name", "cmd", "op", "val", "val_2"], x), app.component.refleshComponent(e.get("component"))
            } else $.alert($.s("Переменная「") + o + $.s("」не установлена."))
        })), "" != e.get("component").data.pm.exp) {
            var r = e.get("component").data.pm;
            r.exp, i = r.name, c = r.cmd, l = r.op || "t", d = r.val, m = r.val_2, t.find(".text_target_var").val(i), t.find(".select_cmd").val(c), t.find(".select_op").val(l), t.find(".op").hide(), t.find(".op_" + l).show(), "r" == l ? (t.find(".text_op_r_from").val(d), t.find(".text_op_r_to").val(m)) : "t" == l ? t.find(".text_op_t").val(d) : "h" == l && t.find(".text_op_h").val(d)
        }
        return this.j_view = t, t
    }, setEvents: function () {
    }
}), Builder.Param.Cond = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = (this.get("param_name"), e.get("component").data.pm.cond, $("<div class='vne_theme-param'></div>"));
        e = this;
        html = '           <div>                    <div class="checkbox form-check form-switch"><input type="checkbox" id="check_cond" class="checkbox form-check-input">' + $.s("Перейти, если условие истинно") + '</div>                  <div style="margin-left:10px;display:none" class="area_cond">                      <label class="vne-control-label">' + $.s("A") + '</label>                      <div><input class="text_var_1 var_auto_complete" type="text" /></div>                      <label class="vne-control-label">' + $.s("B") + '</label>                      <div><select class="select_cmd"></select>                        <input style="display:" class="op text_op_t" type="text" value="" />                        <input style="display:none" class="op text_op_h var_auto_complete" type="text" value="" />                                            </div>                                            <label class="vne-control-label">' + $.s("Состояние") + '</label>                      <div><select class="select_op"></select></div>                                            <div style="margin-top:20px">                      <input type="button" class="button_apply vne-set-area-btn" value="' + $.s("Применить") + '" />                      </div>                  </div>           </div> ';
        var a = (t = $(html)).find("#check_cond");
        a.change((function () {
            $(this).prop("checked") ? t.find(".area_cond").show() : (t.find(".area_cond").hide(), e.get("component").data.pm.cond = "")
        }));
        var n = t.find(".select_cmd");
        n.append($("<option>").html($.s("Значение")).val("t")), n.append($("<option>").html($.s("Переменная")).val("h"));
        var o = t.find(".select_op");
        o.append($("<option>").html($.s("A = B")).val("==")), o.append($("<option>").html($.s("A > B")).val(">")), o.append($("<option>").html($.s("A < B")).val("<")), o.append($("<option>").html($.s("A != B")).val("!="));
        var p = _.keys(app.config.project_config.map_var);
        t.find(".var_auto_complete").autocomplete({
            source: p,
            delay: 50
        }), t.find(".var_auto_complete").focusin((function (e) {
            app.gui.keyevent_buff = !0
        })).focusout((function (e) {
            app.gui.keyevent_buff = !1
        })), n.change((function () {
            var e = $(this).val();
            t.find(".op").hide(), t.find(".text_op_" + e).show()
        })), t.find(".button_apply").click((function () {
            var a = $.trim(t.find(".text_var_1").val()), p = app.config.project_config.map_var, i = n.val(), c = a,
                l = o.val(), d = "";
            if (p[c]) {
                switch (c = p[c].kind + "." + c, i) {
                    case"t":
                        var m = t.find(".text_op_t").val();
                        $.isNum(m) && "" != m || (m = "'" + m + "'"), d = m;
                        break;
                    case"h":
                        var r = t.find(".text_op_h").val();
                        if (!p[r]) return void $.alert($.s("Переменная「") + r + $.s("」не установлена"));
                        d = p[r].kind + "." + r
                }
                var s = c + l + d;
                app.component.changeParam(e.get("component"), "cond", s), app.component.refleshComponent(e.get("component"))
            } else $.alert($.s("Переменная「") + c + $.s("」не установлена"))
        }));
        var i = e.get("component").data.pm.cond;
        if (null != i && "" != i) {
            a.prop("checked", !0), t.find(".area_cond").show();
            for (var c = ["==", ">", "<", "!="], l = void 0, d = 0; d < c.length; d++) if (-1 != i.indexOf(c[d])) {
                var m = (l = i.split(c[d]))[0], r = c[d], s = $.replaceAll(l[1], "'", "");
                m = (m = m.replace("sf.", "")).replace("f.", ""), t.find(".text_var_1").val(m), o.val(r), t.find(".op").hide(), -1 != s.indexOf("f.") ? (n.val("h"), s = (s = s.replace("sf.", "")).replace("f.", ""), t.find(".text_op_h").show(), t.find(".text_op_h").val(s)) : (n.val("t"), t.find(".text_op_t").show(), t.find(".text_op_t").val(s))
            }
        }
        return this.j_view = t, t
    }, setEvents: function () {
    }
}), Builder.Param.Variable = Builder.Param.Base.extend({
    defaults: {type: ""}, initialize: function (e) {
    }, j_view: {}, createHtml: function () {
        var e = this, t = this.get("param_name"), a = (e.get("component").data.pm[t], $("<div class='vne_theme-param'></div>"));
        e = this;
        html = '            <div>                   <input class="text_variable var_auto_complete" type="text" value="" />            </div>            ';
        var n = (a = $(html)).find(".text_variable"), o = _.keys(app.config.project_config.map_var);
        a.find(".var_auto_complete").autocomplete({
            source: o, delay: 50, select: function (e, t) {
                n.val(t.item.value), n.trigger("change")
            }
        }), a.find(".var_auto_complete").focusin((function (e) {
            app.gui.keyevent_buff = !0
        })).focusout((function (e) {
            app.gui.keyevent_buff = !1
        })), n.change((function () {
            var a = $.trim($(this).val()), n = app.config.project_config.map_var;
            n[a] ? (a = n[a].kind + "." + a, app.component.changeParam(e.get("component"), t, a)) : $.alert($.s("Переменная「") + a + $.s("」не установлена"))
        }));
        var p = e.get("component").data.pm[t];
        return p && (p = (p = p.replace("sf.", "")).replace("f.", ""), n.val(p)), this.j_view = a, a
    }, setEvents: function () {
    }
}), Builder.Param.General = Builder.Param.Base.extend({
    defaults: {}, initialize: function (e) {
    }, setEvents: function () {
        this.j_component.click((function () {
        }))
    }
});