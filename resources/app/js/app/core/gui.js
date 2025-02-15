Builder.Core.Gui = Builder.Core.Base.extend({
  defaults: {},
  win: {},
  gui: {},
  menu: {},
  isCloseWindow: !1,
  previewWindow: void 0,
  icon_path: "./_new/assets/img/menuitem/",
  map_modal: {},
  initialize: function (e) {
    (this.c = e),
      (this.electron_shell = require("electron").shell),
      (this.dialog = require("electron").remote.dialog),
      (this.path = require("path")),
      this.setCloseEvent(),
      this.setIpc();
  },
  keyevent_buff: !1,
  setMenuBar: function (e) {
    var t = this;
    const o = require("electron").remote.Menu,
      i = [
        {
          label: $.s("TyranoBuilder"),
          submenu: [
            {
              label: $.s("Список проектов"),
              click(e, t) {
                app.component.checkModified()
                  ? (app.gui.closeModal(),
                    $(window).off("beforeunload"),
                    t && t.reload())
                  : app.gui.dialog
                      .showMessageBox({
                        message: $.s(
                          "Не сохранённые изменения будут потеряны. Все равно выйти?"
                        ),
                        buttons: [$.s("Да"), $.s("Нет")],
                      })
                      .then((e) => {
                        0 === e.response
                          ? (app.gui.closeModal(),
                            $(window).off("beforeunload"),
                            t && t.reload())
                          : 1 === e.response &&
                            console.log("Cancel button clicked.");
                      });
              },
            },
            { label: $.s("Закрыть TyranoBuilder"), role: "close" },
          ],
        },
        {
          label: $.s("Настройка"),
          submenu: [
            {
              label: $.s("Перезагрузить"),
              accelerator: "CmdOrCtrl+R",
              click(e, t) {
                t && t.reload();
              },
            },
            { type: "separator" },
            { label: $.s("Назад"), role: "undo" },
            { label: $.s("Вперед"), role: "redo" },
            { type: "separator" },
            { label: $.s("Вырезать"), role: "cut" },
            { label: $.s("Копировать"), role: "copy" },
            { label: $.s("Вставить"), role: "paste" },
            { type: "separator" },
            { label: $.s("Выбрать все"), role: "selectall" },
          ],
        },
        {
          id: "menu_project",
          label: $.s("Проект"),
          submenu: [
            {
              label: $.s("Новая сцена"),
              click(e, t) {
                $("#button_new_scenario").trigger("click");
              },
            },
            {
              label: $.s("Сохранить проект"),
              click(e, t) {
                $(".button_function_save").trigger("click");
              },
            },
            {
              label: $.s("Предпросмотр"),
              click(e, t) {
                $(".button_function_preview").trigger("click");
              },
            },
            {
              label: $.s("Отладка"),
              click(e, t) {
                app.debugGamefromFirst();
              },
            },
            {
              label: $.s("Экспорт игры"),
              click(e, t) {
                $(".button_function_export").trigger("click");
              },
            },
            { type: "separator" },
            {
              label: $.s("Менеджер персонажей"),
              click(e, t) {
                $(".button_function_chara_manage").trigger("click");
              },
            },
            {
              label: $.s("Пользовательский интерфейс"),
              click(e, t) {
                var o = app.tyrano.config.scWidth,
                  i = app.tyrano.config.scHeight;
                app.window.show(
                  "UIMaker",
                  {
                    title: $.s("Пользовательский интерфейс"),
                    width: o,
                    height: i,
                    padding: "none",
                  },
                  function (e) {}
                );
              },
            },
            {
              label: $.s("Настройки"),
              click(e, t) {
                app.window.show("SettingsSoftware", {
                  title: $.s("Настройки"),
                  width: 640,
                  height: 500,
                });
              },
            },
            {
              label: $.s("Переменные"),
              click(e, t) {
                app.window.show("VarManage", {
                  title: $.s("Менеджер переменных"),
                  width: 640,
                  height: 800,
                });
              },
            },
            {
              label: $.s("Настройки речевого облачка"),
              click(e, t) {
                app.window.show("FukiManage", {
                  title: $.s("Настройки речевого облачка"),
                  width: 640,
                  height: 500,
                });
              },
            },
            {
              label: $.s("Добавить Live2D"),
              click(e, t) {
                app.window.show("ComponentSetting", {
                  title: $.s("Добавить Live2D"),
                  width: 640,
                  height: 500,
                });
              },
            },
            {
              label: $.s("Настройка инструментов"),
              click(e, t) {
                $(".button_function_component_manage").trigger("click");
              },
            },
            {
              label: $.s("Плагины"),
              click(e, t) {
                app.window.show("PluginManage", {
                  title: $.s("Плагины"),
                  width: 640,
                  height: 500,
                });
              },
            },
            {
              label: $.s("Диспетчер отладки"),
              click(e, t) {
                app.window.show("DebugManage", {
                  title: $.s("Диспетчер отладки"),
                  width: 640,
                  height: 500,
                });
              },
            },
            {
              label: $.s("Настройки игры"),
              click(e, t) {
                $(".button_function_setting").trigger("click");
              },
            },
          ],
        },
        {
          label: $.s("Помощь"),
          submenu: [
            {
              label: $.s("Официальный сайт"),
              click: (e, o) => {
                t.shell("url", $.s("bbs_url"));
              },
            },
            {
              label: $.s("О проекте"),
              click: (e, t) => {
                var o = "";
                (o +=
                    "TyranoBuilder " +
                    app.version +
                    "." +
                    app.m_version +
                    " " +
                    app.build +
                    " " +
                    app.lang +
                    " <br />"),
                    (o += "© 2014 - STRIKEWORKS ShikemokuMK<br />"),
                    (o += "http://b.tyrano.jp<br />"),
                    $.alert(o);
              },
            },
          ],
        },
      ];
    0 == e && i.splice(2, 1);
    let n = o.buildFromTemplate(i);
    o.setApplicationMenu(n);
  },
  setCloseEvent: function () {
    $(window).on("beforeunload", (e) => {
      if (!this.isCloseWindow) {
        app.gui.closeModal();
        try {
          return (
            app.config.saveUserConfig(),
            app.component.checkModified()
              ? void 0
              : (setTimeout(() => {
                  this.dialog
                    .showMessageBox({
                      message: $.s(
                        "Не сохранённые изменения будут потеряны. Все равно выйти?"
                      ),
                      buttons: [$.s("Да"), $.s("Нет")],
                    })
                    .then((e) => {
                      0 === e.response
                        ? (console.log("Default button clicked."),
                          (this.isCloseWindow = !0),
                          window.close())
                        : 1 === e.response &&
                          console.log("Cancel button clicked.");
                    });
                }),
                !1)
          );
        } catch (e) {
          return;
        }
      }
    });
  },
  enableMenuProject: function (e) {
    this.setMenuBar(e);
  },
  shell: function (e, t) {
    switch (e) {
      case "url":
        this.openWeb(t);
        break;
      case "item":
      case "dir":
        "win" == app.os && (t = $.replaceAll(t, "/", "\\")), this.openDir(t);
    }
  },
  openDir: function (e) {
    this.electron_shell.openItem(e);
  },
  openWeb: function (e) {
    this.electron_shell.openExternal(e);
  },
  addModal: function (e, t) {
    this.map_modal[e] = t;
  },
  getModal: function (e) {
    return this.map_modal[e] ? this.map_modal[e] : null;
  },
  openWindow: function (e, t) {
    let o = this.getPreviewWindow();
    return (
      o.loadURL(e, {
        userAgent: navigator.userAgent + " VNE Electron",
      }),
      t.debug && o.webContents.openDevTools(),
      o.focus(),
      o
    );
  },
  getPreviewWindow: function () {
    if (void 0 !== this.previewWindow) return this.previewWindow;
    require("electron").app;

    let screenWidth;
    let screenHeight;

    // Получаем реальные размеры экрана пользователя
    const actualScreenWidth = window.screen.width;
    const actualScreenHeight = window.screen.height;

    // Проверяем, меньше ли размеры конфига, чем размеры экрана
    if (actualScreenWidth >= app.tyrano.config.scWidth || actualScreenHeight >= app.tyrano.config.scHeight) {
      if (actualScreenWidth >= 2560 || actualScreenHeight >= 1440) {
        // screenWidth = 1920;
        // screenHeight = 1080;
        screenWidth = parseInt(app.tyrano.config.scWidth);
        screenHeight = parseInt(app.tyrano.config.scHeight);
      } else if(actualScreenWidth <= 1920 || actualScreenHeight <= 1080) {
        // screenWidth = 1280;
        // screenHeight = 720;
        screenWidth = parseInt(app.tyrano.config.scWidth);
        screenHeight = parseInt(app.tyrano.config.scHeight);
      }
    } else {
      screenWidth = parseInt(app.tyrano.config.scWidth);
      screenHeight = parseInt(app.tyrano.config.scHeight);
    }

    const e = require("electron").remote.BrowserWindow,
      t = screenWidth,
      o = screenHeight;

    return (
      (this.previewWindow = new e({
        width: screenWidth,
        height: screenHeight,
        useContentSize: !0,
        webPreferences: { contextIsolation: !1, nodeIntegration: !0 },
      })),
      this.previewWindow.removeMenu(),
      this.previewWindow.on("closed", () => {
        this.previewWindow = void 0;
      }),
      this.previewWindow
    );
  },
  closeModal: function () {
    for (key in this.map_modal)
      try {
        this.map_modal[key].close();
      } catch (e) {}
    this.map_modal = {};
  },
  setKeyEvent: function () {
    var e = this;
    $("body").keydown(function (t) {
      var o = t.shiftKey,
        i = t.metaKey,
        n = t.ctrlKey;
      switch (
        ("EditProject" != app.view.get("current_view_id") &&
          ((i = null), (o = null), (n = null)),
        t.keyCode)
      ) {
        case 83:
          (i || n) &&
            (app.component.saveTyranoScriptCode(),
            app.component.saveCharaDefineCode(),
            $.inform($.s("Сохранено"), "success"));
          break;
        case 80:
          (i || n) && app.previewGame();
          break;
        case 70:
          (i || n) && $(".tb-i-search").trigger("click");
          break;
        case 90:
          (i || n) &&
            (o
              ? app.component.backHistory("revert")
              : app.component.backHistory("back"),
            t.preventDefault());
          break;
        case 38:
          if ((t.preventDefault(), t.stopPropagation(), 1 == e.keyevent_buff))
            return;
          (e.keyevent_buff = !0),
            app.component.component_move("back", function () {
              e.keyevent_buff = !1;
            });
          break;
        case 40:
          if ((t.preventDefault(), t.stopPropagation(), 1 == e.keyevent_buff))
            return;
          (e.keyevent_buff = !0),
            app.component.component_move("next", function () {
              e.keyevent_buff = !1;
            });
      }
    });
  },

  
  setIpc() {
    require("electron").remote.ipcMain.on("live2d-load-complete", (e, t) => {
      app.gui.sendMessage("live2d_manage", "init_live2d", { aaaaaa: "bbb" });
    });
  },
  sendMessage(e, t, o, i = !1) {
    let n = this.getModal(e);
    return (
      !!n &&
      (void 0 !== n
        ? (n.webContents.send(t, JSON.stringify(o)), 1 == i && n.focus(), !0)
        : void $.inform("error!", "error"))
    );
  },
});