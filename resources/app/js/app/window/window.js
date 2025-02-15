(Builder.Window.PreviewGame = Builder.Window.Base.extend({
  defaults: { view_id: "MakeProject" },
  j_view: {},
  initialize: function (e, i) {
    this.j_view = e;
  },
  show: function () {},
})),
  (Builder.Window.Live2D = Builder.Window.Base.extend({
    defaults: { view_id: "Live2D" },
    j_view: {},
    initialize: function (e, i) {
      this.j_view = e;
    },
    show: function () {},
  })),
  (Builder.Window.Live2DBound = Builder.Window.Base.extend({
    defaults: { view_id: "Live2DBound" },
    j_view: {},
    initialize: function (e, i) {
      this.j_view = e;
    },
    show: function () {},
  })),
  (Builder.Window.MakeScenario = Builder.Window.Base.extend({
    defaults: { view_id: "MakeScenario" },
    j_view: {},
    initialize: function (e, i, t) {
      (this.j_view = e), (this.call_back = t), (this.data = i);
      var a = this;
      this.j_view.find(".button_next").click(function () {
        function e() {
          const nameScenario = $.rmspace(a.j_view.find(".text_scenario_name").val());
          if (
            (a.j_view.find(".error").remove(),
            !a.j_view
              .find(".text_scenario_name")
              .valid({ required: !0, alphabet: !0 }))
          )
            return !1;
          var i = app.getDataPath() + "scenario/" + nameScenario + ".ks";
          if (app.io.exists(i))
            return alertNoBtn($.s("Внимание!"), $.s("Сцена" + " \"" + nameScenario + "\" " + "уже существует!"), 3000, "bottom-right", "warning", "var(--vne-warning-alert-color)"), !1;
          app.io.writeFile(
            i,
            "[tb_start_text mode=1 ]\n" +
              $.s("Вы создали новый файл сценария.") +
              "\n[_tb_end_text]"
          ),
            (app.tmp.map_label[nameScenario + ".ks"] = []),
            a.close(),
            app.loadScenario(nameScenario + ".ks"),
            a.close(!0);
        }
        app.component.checkModified()
          ? e()
          : $.confirm(
              $.s(
                "Сцена в настоящее время редактируется. Изменения будут потеряны, если другая сцена будет открыта без сохранения. Продолжить?"
              ),
              function () {
                e();
              },
              function () {
                return a.close(!0), !1;
              }
            );
      }),
        this.j_view.find(".button_back").click(function () {
          a.close();
        });
    },
    show: function (e) {},
  })),
  (Builder.Window.CopyScenario = Builder.Window.Base.extend({
    defaults: { view_id: "CopyScenario" },
    j_view: {},
    old_scenario: "",
    initialize: function (e, i, t) {
      (this.j_view = e), (this.call_back = t), (this.data = i);
      var a = this;
      this.j_view.find(".button_next").click(function () {
        function e() {
          var e = $.rmspace(a.j_view.find(".text_scenario_name").val());
          if (
            (a.j_view.find(".error").remove(),
            !a.j_view
              .find(".text_scenario_name")
              .valid({ required: !0, alphabet: !0 }))
          )
            return !1;
          var n = app.getDataPath() + "scenario/" + e + ".ks",
            s = app.getDataPath() + "scenario/" + a.old_scenario;
          if (app.io.exists(n))
            return alertNoBtn($.s("Внимание!"), $.s("Сцена" + " \"" + nameScenario + "\" " + "уже существует!"), 3000, "bottom-right", "warning", "var(--vne-warning-alert-color)"), !1;
          app.io.copy(s, n),
            (app.tmp.map_label[e + ".ks"] = []),
            (void 0 !== i.load_scenario && "off" == i.load_scenario) ||
              app.loadScenario(e + ".ks"),
            "function" == typeof t && t(e),
            a.close(!0);
        }
        app.component.checkModified()
          ? e()
          : $.confirm(
              $.s(
                "Сцена в настоящее время редактируется. Изменения будут потеряны, если другая сцена будет открыта без сохранения. Продолжить?"
              ),
              function () {
                e();
              },
              function () {
                return a.close(!0), !1;
              }
            );
      }),
        this.j_view.find(".button_back").click(function () {
          a.close();
        }),
        (this.old_scenario = app.tmp.selected_context_scenario),
        this.j_view
          .find(".text_scenario_name")
          .val(
            "copy_of_" +
              $.replaceAll(app.tmp.selected_context_scenario, ".ks", "")
          );
    },
    show: function (e) {},
  })),
  (Builder.Window.RenameScenario = Builder.Window.Base.extend({
    defaults: { view_id: "RenameScenario" },
    j_view: {},
    old_scenario: "",
    initialize: function (e, i, t) {
      (this.j_view = e), (this.call_back = t), (this.data = i);
      var a = this;
      this.j_view.find(".button_next").click(function () {
        function e() {
          var e = $.rmspace(a.j_view.find(".text_scenario_name").val());
          if (
            (a.j_view.find(".error").remove(),
            !a.j_view
              .find(".text_scenario_name")
              .valid({ required: !0, alphabet: !0 }))
          )
            return !1;
          var i = app.getDataPath() + "scenario/" + e + ".ks",
            t = app.getDataPath() + "scenario/" + a.old_scenario;
          if (app.io.exists(i))
            return alertNoBtn($.s("Внимание!"), $.s("Сцена" + " \"" + nameScenario + "\" " + "уже существует!"), 3000, "bottom-right", "warning", "var(--vne-warning-alert-color)"), !1;
          app.io.copy(t, i), app.io.rmdir(t);
          var n = app.getDataPath() + "scenario/" + a.old_scenario,
            s = app.getDataPath() + "scenario/system/_" + a.old_scenario;
          app.io.rmdir(n), app.io.rmdir(s);
          var o = app.io.getFiles(app.getProjectPath() + "data/scenario/");
          (o = _.select(o, function (e) {
            return !_.any(
              ["first.ks", "make.ks", "_preview.ks", "config.ks"],
              function (i) {
                return i === e.item;
              }
            );
          })),
            (app.array_files = o),
            (app.tmp.map_label[t] = []),
            app.loadScenario(e + ".ks"),
            a.close();
        }
        app.component.checkModified()
          ? e()
          : $.confirm(
              $.s(
                "Сцена в настоящее время редактируется. Изменения будут потеряны, если другая сцена будет открыта без сохранения. Продолжить?"
              ),
              function () {
                e();
              },
              function () {
                return a.close(!0), !1;
              }
            );
      }),
        this.j_view.find(".button_back").click(function () {
          a.close();
        }),
        (this.old_scenario = app.tmp.selected_context_scenario),
        this.j_view
          .find(".text_scenario_name")
          .val($.replaceAll(app.tmp.selected_context_scenario, ".ks", ""));
    },
    show: function (e) {},
  })),
  (Builder.Window.ExportGame = Builder.Window.Base.extend({
      createJsonAnimationFile: function () {
          const fs = require('fs-extra');
          const path = require('path');
          // Путь к директории, которую нужно сканировать
          const dirPath = path.join(app.getProjectPath(), 'data/bgimage/animationFrame/');
          // Функция для сканирования папки и подпапок
          async function scanDirectory(dirPath) {
              let dirContents = {
                  name: path.basename(dirPath),
                  type: 'folder',
                  children: [],
              };

              const files = await fs.readdir(dirPath, { withFileTypes: true });

              const promises = files.map(async (dirent) => {
                  const absolutePath = path.join(dirPath, dirent.name);
                  if (dirent.isDirectory()) {
                      dirContents.children.push(await scanDirectory(absolutePath));
                  } else {
                      const fileExt = path.extname(dirent.name).toLowerCase();
                      if ([".png", ".jpg", ".jpeg", ".bmp", ".gif"].includes(fileExt)) {
                          dirContents.children.push({
                              name: dirent.name,
                              type: 'file',
                          });
                      }
                  }
              });

              await Promise.all(promises);

              return dirContents;
          }


          // Функция для записи результата сканирования в файл JSON
          async function writeJson(filePath, data) {
              const jsonString = JSON.stringify(data, null, 2);
              await fs.writeFile(filePath, jsonString);
          }

          // Запуск сканирования и записи результатов в файл
          scanDirectory(dirPath)
              .then((result) => writeJson(path.join(dirPath, 'results.json'), result))
              .catch((err) => console.error(err));
      },

      setEvent: function () {
          this.j_btnSubmitExport.on("click", (e) => {
              let i = {},
                  t = this.j_selectExportType.val(),
                  a = this.j_checkIcon.prop("checked"),
                  n = this.j_checkShrinkWindow.prop("checked"),
                  s = this.j_textExportDir.val(),
                  o = $("input[name=radioBit]:checked").val(),
                  r = this.j_checkAsar.prop("checked");
              app.tyrano.config.projectID;


              const exportDir = this.export_path;

              if (("mac" === t && "win" === app.os)) {
                  alertNoBtn("Внимание", "Этот файл предназначен для использования в Mac.", 3000, "center", "", "");
                  return false;
              }

              if ("win" === t && "mac" === app.os) {
                  alertNoBtn("Внимание", "Этот файл предназначен для использования в Windows.", 3000, "center", "", "");
                  return false;
              }

              const options = {
                  mode: t,
                  icon: a,
                  shrink: n,
                  export_dir: exportDir,
                  bit: o,
                  asar: r,
              };

              Swal.fire({
                  title: $.s("Подготовка к экспорту игры"),
                  allowOutsideClick: false,
                  color: "var(--vne-text-color)",
                  background: "var(--vne-right-panel-color)",
                  didOpen: () => {
                      Swal.showLoading();
                  }
              });

              setTimeout(() => {
                  this.exportGame(options);
              }, 100);



          }),
              this.j_selectExportType.on("change", (e) => {

                  this.selectedExportType = $(e.currentTarget).val();
                  this.checkIconFile();
                  const currentDateStr = $.getNowDateStr();
                  const exportFolderName = `${this.selectedExportType}_${currentDateStr}`;
                  const exportFolderPath = app.exe_path + "export/" + exportFolderName + "/";
                  this.export_path = exportFolderPath;
                  this.j_textExportDir.val(this.export_path);

              }),
              this.j_btnFileIcon.on("click", (e) => {
                  let i = this.selectedExportType,
                      t = this.mapIcon[i],
                      a = $('<input type="file" accept=".' + t + '"  />');
                  a.on("change", (e) => {
                      let i = e.target.files[0],
                          a = i.path,
                          n = (i.name, app.getProjectPath() + "/link." + t);
                      app.io.copy(a, n), this.checkIconFile();
                  }),
                      a.trigger("click");
              });
      },
      checkIconFile: function () {
          let e = this.j_selectExportType.val(),
              i = "";
          i = "link." + this.mapIcon[e];
          let t = app.getProjectPath();
          if (app.io.exists(t + "/" + i))
              return this.j_labelIcon.html($.s("Файл существует. Готово.")), !0;
          {
              let e = this.selectedExportType,
                  i = this.mapIcon[e];
              return (
                  this.j_labelIcon.html(
                      $.s("Не задано") +
                      " ." +
                      i +
                      " " +
                      $.s("Пожалуйста, выберите файл") +
                      " "
                  ),
                      !1
              );
          }
      },
      exportGame: async function (e, i) {
          const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

          const updateSwal = (progress, message) => {
              Swal.update({
                  title: $.s(message),
                  html: $.s(`Выполнено: `) + `${progress}%`,
                  showConfirmButton: false,
                  color: "var(--vne-text-color)",
                  background: "var(--vne-right-panel-color)",
              });
          };

          Swal.fire({
              title: $.s("Подготовка к экспорту игры"),
              allowOutsideClick: false,
              color: "var(--vne-text-color)",
              background: "var(--vne-right-panel-color)",
              didOpen: () => {
                  Swal.showLoading();
              }
          });


          app.saveFirstScenario({
              jump_storage: getSelectedValue(),
              live2d: app.config.project_config.plugin.live2d,
          });

          updateSwal(10, 'Сохранение первого сценария...');
          await sleep(1000);

          let t = app.getProjectPath(),
              a = app.exePath + "/tmp/export_project";
          app.io.exists(a) ? app.io.rmdir(a + "/") : app.io.mkdir(a);

          updateSwal(20, 'Создание временной директории...');
          await sleep(1000);

          let n = e.mode;
          app.io.copy(t + "/index.html", a + "/index.html"),
              app.io.copy(t + "/data", a + "/data"),
              app.io.copy(t + "/tyrano", a + "/tyrano"),
          ("mac" != n && "win" != n) ||
          (app.io.mkdir(a + "/node_modules"),
              app.io.copy(
                  app.exePath + "/node_modules/adm-zip",
                  a + "/node_modules/adm-zip"
              ),
              app.io.copy(
                  app.exePath + "/node_modules/fs-extra",
                  a + "/node_modules/fs-extra"
              ),
              app.io.copy(
                  app.exePath + "/node_modules/graceful-fs",
                  a + "/node_modules/graceful-fs"
              ),
              app.io.copy(
                  app.exePath + "/node_modules/jsonfile",
                  a + "/node_modules/jsonfile"
              ),
              app.io.copy(
                  app.exePath + "/node_modules/universalify",
                  a + "/node_modules/universalify"
              ),

          1 == e.asar &&
          app.io.copy(
              app.exePath + "/node_modules/asar_node_modules/",
              a + "/node_modules/"
          ));

          updateSwal(30, 'Копирование Node модулей...');
          await sleep(2000);

          require("child_process").exec;
          let s = "",
              o = !0,
              r = "";
          switch (n) {
              case "browser":
              case "android":
              case "ios":
                  this.createJsonAnimationFile();
                  (s = "browser"), (o = !1);
                  break;
              case "win":
                  (s = "win32"), (r = a + "/tyrano.ico");
                  break;
              case "mac":
                  (s = "darwin"), (r = a + "/tyrano.icns");
                  break;
              case "linux":
                  (s = "linux"), (r = a + "/tyrano.png");
          }

          updateSwal(40, 'Специфичные настройки для системы...');
          await sleep(1000);

          if (e.icon) {
              let e = this.mapIcon[n],
                  i = app.getProjectPath() + "/link." + e;
              app.io.exists(i) && (r = i);
          }

          updateSwal(45, 'Настройка иконки...');
          await sleep(1000);

          if (o) {
              app.io.copy(app.dirPath + "/system/pkg/system/main.js", a + "/main.js"),
                  app.io.copy(
                      app.dirPath + "/system/pkg/images/icon/tyrano.ico",
                      a + "/tyrano.ico"
                  ),
                  app.io.copy(
                      app.dirPath + "/system/pkg/images/icon/tyrano.icns",
                      a + "/tyrano.icns"
                  );

              updateSwal(50, 'Копирование иконки...');
              await sleep(1000);

              let i = app.io.loadJson(
                  app.dirPath + "/system/pkg/system/package.json"
              );

              updateSwal(55, 'Загрузка Json конфигурации...');
              await sleep(1000);

              let savedSettings = localStorage.getItem('windowSettingGameExport');
              savedSettings = JSON.parse(savedSettings);
              if (savedSettings.selectedOption === "3") {
                  i.window.width = app.tyrano.config.scWidth
                  i.window.height = app.tyrano.config.scHeight
                  if (e.shrink) {
                      i.window.resize = true;
                      i.window.min_width = 100;
                      i.window.min_height = 100;
                  } else {
                      i.window.resize = false;
                      i.window.min_width = parseInt(i.width);
                      i.window.min_height = parseInt(i.height);
                  }

              } else {
                  i.window.width = savedSettings.scWidth
                  i.window.height = savedSettings.scHeight
                  if (e.shrink) {
                      i.window.resize = true;
                      i.window.min_width = parseInt(i.width);
                      i.window.min_height = parseInt(i.height);
                  }
              }
              if (savedSettings.displayMode === "fullScreenEnter") {
                  i.window.resize = true;
                  i.window.displayFullScreenMode = savedSettings.displayMode;
              }


              if (e.asar === 1) {
                  i.dependencies.asar = "^3.0.2";
              }
              app.io.saveJson(a + "/package.json", i);
          }

          updateSwal(60, 'Настройка конфигурации...');
          await sleep(1000);

          let l = Object.create(app.tyrano.config);

          updateSwal(65, 'Создание конфигурации...');
          await sleep(2000);

          (l["debugMenu.visible"] = "false"),
              (l.configSave = "mac" == n || "win" == n ? "file" : "webstorage");

          updateSwal(70, 'Определение дебаг меню...');
          await sleep(1000);

          let d = a + "/data/system/Config.tjs";
          app.config.writeTyranoConfig(d, l),
          app.io.exists(a + "/builder_config.json") &&
          app.io.rmdir(a + "/builder_config.json");
          let c = app.tyrano.config.projectID,
              p = e.export_dir,
              _ = c;
          if (
              (e.exe_name && "" != e.exe_name && (_ = e.exe_name),
              "win" == n || "mac" == n || "linux" == n)
          ) {
              let o = e.bit;
              const l = require("electron-packager");
              let d = {
                  name: _,
                  dir: a,
                  out: p,
                  icon: r,
                  platform: s,
                  arch: o,
                  version: "7.1.2",
                  overwrite: !0,
                  asar: e.asar,
                  prune: !0,
                  appVersion: "1.0.1",
              };
              console.log(d),
                  (process.noAsar = !0),
                  (async function () {
                      const a = await l(d);
                      if (
                          (console.log("export:result:"),
                              console.log(a),
                              app.io.copy(
                                  app.dirPath + "/system/pkg/others/LICENSE",
                                  a[0] + "/LICENSE"
                              ),
                              app.io.fs
                                  .readdirSync(t)
                                  .filter(RegExp.prototype.test, /.*\.txt$/)
                                  .forEach((e) => {
                                      app.io.copy(t + "/" + e, a[0] + "/" + e);
                                  }),
                              console.log("======="),
                              console.log(a),
                              console.log(p),
                          -1 != p.indexOf("symlinks") && "mac" == n)
                      )
                          return ( alertNoBtn(
                                  "Внимание",
                                  "Ошибка. при экспорте версии для Mac в Windows запустите VN Effector от имени администратора.",
                                  3000,
                                  "bottom-right", "error", "var(--vne-error-alert-color)"),
                                  !1
                          );
                      if (e.zip) {
                          let e = p + "/" + _ + "_" + n;
                          app.io.rename(a[0], e),
                              app.io.writeZip(e + "/", e + ".zip", function () {
                                  "function" == typeof i && i(a[0]);
                              });
                      } else
                          0 === a.length
                              ? alertNoBtn(
                                  "Ошибка",
                                  "Выход не удался.",
                                  3000,
                                  "bottom-right",
                                  "error",
                                  "var(--vne-error-alert-color)")
                              : alertFunc(
                                  "Успех!",
                                  "Экспорт игры завершен успешно. Хотите открыть папку?",
                                  "success",
                                  "var(--vne-success-alert-color)").then((result) => {
                                  if (result.isConfirmed) {
                                      app.gui.openDir(p);
                                      return !1;
                                  }
                              })
                      $.hideLoading();
                  })();

              updateSwal(80, 'Финальная сборка игры...');
              await sleep(1000);

          } else if ("browser" == n || "ios" == n || "android" == n) {
              if (e.check_tap_start) {
                  var h = app.io.readFile(a + "/data/scenario/first.ks");
                  (h =
                      '[font color="0xFFFFFF"]Click to start[p][resetfont]. \n' + h),
                      app.io.writeFile(a + "/data/scenario/first.ks", h);
              }

              updateSwal(90, 'Финальное копирование файлов игры...');
              await sleep(2000);

              app.io.copy(a, p + "/" + _),

                  updateSwal(100, 'Сборка игры завершена успешно!');
                  await sleep(2000);

                  alertFunc("Успех!", "Экспорт игры завершен успешно. Хотите открыть папку?", "success", "var(--vne-success-alert-color)").then((result) => {
                      if (result.isConfirmed) {
                          app.gui.openDir(p);
                          return !1;
                      }
                  }),
                  $.hideLoading();
          }
      },
    initialize: function (e, i, t) {
      (this.j_view = e), (this.call_back = t), (this.data = i);
      (this.exportDir = ""),
          (this.mapIcon = {
            browser: "png",
            win: "ico",
            mac: "icns",
            linux: "png",
          }),
          (this.selectedExportType = "browser"),
          (this.export_path =
              app.exe_path + "export/browser_" + $.getNowDateStr() + "/"),
          this.j_view.find("[ts]").each((e, i) => {
            this["j_" + $(i).attr("ts")] = $(i);
          });
      require("electron").remote.app;
      this.j_textExportDir.val(this.export_path),
          this.j_selectExportType.trigger("change"),
          this.setEvent();
    },
    show: function (e) {},
  })),
  (Builder.Window.GameSetting = Builder.Window.Base.extend({
    defaults: { view_id: "GameSetting" },
    j_view: {},
    map_config: {},
    initialize: function (e, i, t) {
      (this.j_view = e), (this.call_back = t), (this.data = i);
      var a = this;
      (this.map_config = app.tyrano.config),
        this.j_view
          .find(".nav-setting")
          .find("li")
          .on("click", function () {
            $(this).parents().find("li").removeClass("active"),
              $(this).addClass("active");
            var e = $(this).attr("data-view-id"),
              n = $(this).attr("data-logic-id");
            $.loadText("./template/setting/" + e + ".tmpl.html", function (s) {
              var o = $.templates(s);
              if (
                ((i._s = function (e) {
                  return $.s(e);
                }),
                "text" == e)
              ) {
                for (
                  var r = $.s("array_font"), l = [], d = 0;
                  d < r.length;
                  d++
                )
                  l.push({ name: r[d].name, val: r[d].val });
                var c = app.config.project_config.map_font;
                for (key in c) l.push({ name: key, val: key });
                (i.array_font = l), (i.vertical = $.s("vertical"));
              }
              var p = o.render(i),
                _ = new Builder.Setting[n]($(p), i, t);
              a.j_view.find(".area_setting").empty(),
                a.j_view.find(".area_setting").append(_.j_view);
            });
          }),
        this.j_view.find(".nav-setting").find("li").first().trigger("click");
    },
    show: function (e) {},
  })),
  (Builder.Window.SelectBound = Builder.Window.Base.extend({
    defaults: { view_id: "SelectBound" },
    j_view: {},
    initialize: function (e, i, t) {
      var a = this;
      this.j_view = e;
      var n = this.j_view.find(".bound_x"),
        s = this.j_view.find(".bound_y"),
        o = this.j_view.find(".bound_width"),
        r = this.j_view.find(".bound_height"),
        l = "",
        d = this.j_view.find("#bound_select"),
        c = this.j_view.find("#button_bound"),
        p = this.j_view.find("#check_reflect");
      if ("plugin" == i.bound_type) {
        var _ = i.bound_image_obj;
        d.append(_);
      }
      null != i.reflect &&
        (1 == i.reflect
          ? (p.prop("checked", !0), d.addClass("reflect"))
          : (p.prop("checked", !1), d.removeClass("reflect"))),
        n.html(i.bound.x),
        s.html(i.bound.y),
        o.html(i.bound.width),
        r.html(i.bound.height),
        i.bound.width ||
          $("<img />")
            .attr("src", i.bound_image_storage)
            .load(function () {
              d.css("width", $(this).get(0).width),
                d.css("height", $(this).get(0).height);
            }),
        this.j_view.find("#bound_background_img").attr("src", i.background_url),
        this.j_view
          .find("#bound_area")
          .css({
            width: app.tyrano.config.scWidth,
            height: app.tyrano.config.scHeight,
          }),
        d.css("border", "solid 1px gray"),
        d.css("width", i.bound.width),
        d.css("height", i.bound.height),
        d.css("left", i.bound.x + "px"),
        d.css("top", i.bound.y + "px");
      var h = "";
      "chara" == i.bound_type &&
        (this.j_view.find("#area_check_reflect").show(), (h = "")),
        d.draggable({
          scroll: !1,
          containment: h,
          drag: function (e, i) {
            n.html(parseInt(i.position.left)), s.html(parseInt(i.position.top));
          },
        }),
        d.on("mousewheel", function (e) {
          e.preventDefault();
          var i = parseInt(d.css("width")),
            t = parseInt(d.css("height"));
          (e.originalEvent.deltaY
            ? -e.originalEvent.deltaY
            : e.originalEvent.wheelDelta
            ? e.originalEvent.wheelDelta
            : -e.originalEvent.detail) < 0
            ? ((i = Math.round(0.95 * i)), (t = Math.round(0.95 * t)))
            : ((i = Math.round(1.05 * i)), (t = Math.round(1.05 * t))),
            d.css("width", i),
            d.css("height", t),
            o.html(i),
            r.html(t);
        }),
        p.change(function () {
          1 == p.prop("checked")
            ? d.addClass("reflect")
            : d.removeClass("reflect");
        });
      var f = !0;
      if (
        (("clickable" != i.bound_type &&
          "glink" != i.bound_type &&
          "textbox" != i.bound_type) ||
          (f = !1),
        d.resizable({
          aspectRatio: f,
          handles: "all",
          resize: function (e, i) {
            var t = $(e.target);
            o.html(parseInt(t.css("width"))), r.html(parseInt(t.css("height")));
          },
        }),
        "chara" == i.bound_type ||
          "image" == i.bound_type ||
          "plugin" == i.bound_type)
      ) {
        var v = i.map_chara;
        for (key in v) {
          var u = v[key],
            m = $("<img />");
          m.attr("src", app.getProjectPath() + "data/fgimage/" + u.storage),
            m.css({
              left: parseInt(u.left),
              top: parseInt(u.top),
              width: parseInt(u.width),
              height: parseInt(u.height),
              opacity: 0.7,
            }),
            1 == u.reflect ? m.addClass("reflect") : m.removeClass("reflect"),
            m.css("position", "absolute"),
            e.find("#bound_area").append(m);
        }
        var g = i.map_img;
        for (key in g) {
          var w = g[key];
          (j = $("<img />")).attr(
            "src",
            app.getProjectPath() + "data/fgimage/" + w.storage
          ),
            j.css({
              left: parseInt(w.x),
              top: parseInt(w.y),
              width: parseInt(w.width),
              height: parseInt(w.height),
              opacity: 0.7,
            }),
            j.css("position", "absolute"),
            e.find("#bound_area").append(j);
        }
        var b = i.map_button;
        for (key in b) {
          var j;
          w = b[key];
          (j = $("<img />")).attr(
            "src",
            app.getProjectPath() + "data/image/" + w.storage
          ),
            j.css({
              left: parseInt(w.x),
              top: parseInt(w.y),
              width: parseInt(w.width),
              height: parseInt(w.height),
              opacity: 0.7,
            }),
            j.css("position", "absolute"),
            e.find("#bound_area").append(j);
        }
      } else if ("glink" == i.bound_type) {
        var k = i.pm,
          y = k.text,
          x = k.color,
          I = k.size;
        d.addClass(x),
          d.css({ "font-size": I + "px" }),
          d.find(".button_text").html(y),
          d.css("left") || d.css("top") || d.css({ left: 100, top: 100 });
        for (var P = i.array_glink, C = 0; C < P.length; C++) {
          var B = P[C];
          '<span class="button_text">Button</span>', "</div>";
          var O = $(
            '<div style="z-index:100;position: absolute;" class="button"><span class="button_text">Button</span></div>'
          );
          O.addClass(B.color),
            O.css({
              "font-size": parseInt(B.size),
              width: parseInt(B.width),
              height: parseInt(B.height),
              left: parseInt(B.x),
              top: parseInt(B.y),
              opacity: 0.7,
            }),
            O.find(".button_text").html(B.text),
            e.find("#bound_area").append(O);
        }
      } else
        "textbox" == i.bound_type &&
          (d.css("left") || d.css("top") || d.css({ left: 100, top: 100 }),
          d.css("width") ||
            d.css("height") ||
            d.css({ width: 200, height: 40 }));
      this.j_view
        .find("#bound_panel")
        .draggable({ scroll: !1, containment: "#bound_area" }),
        c.click(function () {
          var e = {
            x: n.html(),
            y: s.html(),
            width: o.html(),
            height: r.html(),
            reflect: p.prop("checked"),
          };
          t && t(e, l), a.close();
        }),
        this.j_view.find("#button_bound_background").click(function () {
          app.window.show(
            "SelectFile",
            {
              title: $.s("Выберите изображение"),
              width: 640,
              height: 400,
              file_path: "bgimage/",
              base_url: "data/bgimage/",
              folder: "",
            },
            function (e) {
              var i = app.getProjectPath() + "data/bgimage/" + e;
              a.j_view.find("#bound_background_img").attr("src", i), (l = e);
            }
          );
        });
    },
  })),
  (Builder.Window.SelectBoundFont = Builder.Window.Base.extend({
    defaults: { view_id: "SelectBoundFont" },
    j_view: {},
    initialize: function (e, i, t) {
      var a = this;
      this.j_view = e;
      var n = this.j_view.find(".bound_x"),
        s = this.j_view.find(".bound_y"),
        o = "",
        r = this.j_view.find("#bound_select"),
        l = this.j_view.find("#button_bound");
      n.html(i.bound.x),
        s.html(i.bound.y),
        this.j_view.find("#bound_background_img").attr("src", i.background_url),
        this.j_view
          .find("#bound_area")
          .css({
            width: app.tyrano.config.scWidth,
            height: app.tyrano.config.scHeight,
          }),
        r.css("border", "solid 1px gray"),
        r.css("left", i.bound.x + "px"),
        r.css("top", i.bound.y + "px");
      if (
        (r.draggable({
          scroll: !1,
          containment: "",
          drag: function (e, i) {
            n.html(i.position.left), s.html(i.position.top);
          },
        }),
        "ptext" == i.bound_type)
      ) {
        r.css("left") || r.css("top") || r.css({ left: 100, top: 100 });
        var d = i.pm,
          c = $.replaceAll(d.text, "&nbsp;", " "),
          p = d.color,
          h = d.size,
          f = d.x,
          v = d.y,
          u = d.face;
        "undefined" == u && (u = "");
        for (
          var m = this.j_view.find(".text_ptext"),
            g = this.j_view.find(".text_font_size"),
            w = this.j_view.find(".text_font_color"),
            b = this.j_view.find(".select_font"),
            j = _font_face_list(),
            k = 0;
          k < j.length;
          k++
        )
          b.append(
            '<option value="' + j[k].val + '">' + j[k].name + "</option>"
          );
        var y = app.config.project_config.map_font;
        for (key in y) {
          var x = app.tyrano.project_name,
            I = document.createElement("style"),
            P = require("path")
              .resolve(app.exe_path + "/myproject/" + x + "/data/others/")
              .replace(/\\/g, "/");
          I.appendChild(
            document.createTextNode(
              "                    @font-face {                        font-family: '" +
                key +
                "';                        src: url('" +
                P +
                "/" +
                key +
                ".ttf') format('truetype'),                        url('" +
                P +
                "/" +
                key +
                ".woff') format('woff'),                        url('" +
                P +
                "/" +
                key +
                ".eot') format('eot')                        ;                        font-weight:normal;font-style:normal;                    }                    "
            )
          ),
            document.head.appendChild(I);
        }
        var C = $("<div>" + c + "</div>");
        C.css({
          color: $.convertColor(p),
          "font-size": h + "px",
          left: f,
          top: v,
          "font-family": u,
        }),
          g.val(h),
          w.val($.convertColor(p)),
          b.val(u),
          m.val(c),
          w.minicolors({
            change: function (e, i) {
              C.css("color", $(this).val());
            },
          }),
          g.change(function () {
            C.css("font-size", g.val() + "px");
          }),
          b.change(function () {
            C.css("font-family", b.val());
          }),
          m.keyup(function (e) {
            C.html(m.val());
          }),
          this.j_view.find(".spinner-1").spinner({
            min: 0,
            step: 1,
            stop: function (e, i) {
              g.trigger("change");
            },
          }),
          r.append(C);
      }
      this.j_view
        .find("#bound_panel")
        .draggable({ scroll: !1, containment: "#bound_area" });
      var B = this.j_view.find(".area_font"),
        O = this.j_view.find(".area_anim");
      (this.j_area_font = B),
        (this.j_area_anim = O),
        this.j_view
          .find(".navbar-nav")
          .find("li")
          .click(function () {
            a.j_view.find("li").removeClass("active"),
              $(this).addClass("active");
            var e = $(this).attr("data-nav");
            a.j_view.find(".area").hide(), a.j_view.find(".area_" + e).show();
          }),
        "standard" == global_build &&
          this.j_view.find(".alert_pro_only").show(),
        this.j_view.find(".check_anim").change(function () {
          1 == $(this).prop("checked")
            ? a.j_view.find(".area_anim_effect").show()
            : a.j_view.find(".area_anim_effect").hide();
        });
      $.each(
        "flash bounce shake tada swing wobble pulse flip flipInX flipOutX flipInY flipOutY fadeIn fadeInUp fadeInDown fadeInLeft fadeInRight fadeInUpBig fadeInDownBig fadeInLeftBig fadeInRightBig fadeOut fadeOutUp fadeOutDown fadeOutLeft fadeOutRight fadeOutUpBig fadeOutDownBig fadeOutLeftBig fadeOutRightBig bounceIn bounceInDown bounceInUp bounceInLeft bounceInRight bounceOut bounceOutDown bounceOutUp bounceOutLeft bounceOutRight rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight rotateOut rotateOutDownLeft rotateOutDownRight rotateOutUpLeft rotateOutUpRight hinge rollIn rollOut".split(
          " "
        ),
        function (e, i) {
          var t = '<option value="' + i + '">' + i + "</option>";
          /Out/.test(i) || "hinge" === i
            ? a.j_view.find(".select_anim_effect_out").append(t)
            : a.j_view.find(".select_anim_effect_in").append(t);
        }
      );
      var z = {
        anim: "false",
        fadeout: "false",
        wait: "true",
        face: "undefined",
        in_effect: "fadeIn",
        out_effect: "fadeOut",
        shadow: "undefined",
        edge: "undefined",
      };
      _.extend(z, d),
        "undefined" != z.edge
          ? (this.j_view.find(".select_effect").val("1"),
            this.j_view.find(".text_effect_color").val($.convertColor(z.edge)))
          : "undefined" != z.shadow &&
            (this.j_view.find(".select_effect").val("2"),
            this.j_view
              .find(".text_effect_color")
              .val($.convertColor(z.shadow)));
      var F = "0";
      this.j_view.find(".select_effect").on("change", function () {
        F = a.j_view.find(".select_effect").val();
        var e = a.j_view.find(".text_effect_color").val();
        "1" == F
          ? ((style_str =
              "1px 1px 0 " +
              e +
              ", -1px 1px 0 " +
              e +
              ",1px -1px 0 " +
              e +
              ",-1px -1px 0 " +
              e),
            C.css("text-shadow", style_str))
          : "2" == F
          ? ((style_str = "2px 2px 2px " + e), C.css("text-shadow", style_str))
          : C.css("text-shadow", "");
      }),
        this.j_view.find(".text_effect_color").minicolors({
          change: function (e, i) {
            F = a.j_view.find(".select_effect").val();
            var t = $(this).val();
            "1" == F
              ? ((style_str =
                  "1px 1px 0 " +
                  t +
                  ", -1px 1px 0 " +
                  t +
                  ",1px -1px 0 " +
                  t +
                  ",-1px -1px 0 " +
                  t),
                C.css("text-shadow", style_str))
              : "2" == F &&
                ((style_str = "2px 2px 2px " + t),
                C.css("text-shadow", style_str));
          },
        }),
        setTimeout(function () {
          a.j_view.find(".select_effect").trigger("change");
        }, 10),
        this.j_view.find(".select_anim_effect_in").val(z.in_effect),
        this.j_view.find(".select_anim_effect_out").val(z.out_effect),
        this.j_view.find(".check_wait").prop("checked", $.bool(z.wait)),
        this.j_view.find(".check_fadeout").prop("checked", $.bool(z.fadeout)),
        this.j_view.find(".check_anim").prop("checked", $.bool(z.anim)),
        1 == $.bool(z.anim) && this.j_view.find(".area_anim_effect").show(),
        this.j_view.find(".select_anim_effect").change(function () {
          var e = $(this).attr("data-type");
          z[e + "_effect"] = $(this).val();
        }),
        this.j_view.find("#button_font_preview").click(function () {
          var e = a.getFormEffect();
          r.find("div").textillate({
            loop: !0,
            minDisplayTime: d.time,
            in: {
              effect: e.in_effect,
              callback: function () {
                $.bool(e.fedeout);
              },
            },
            out: { effect: e.out_effect, callback: function () {} },
          });
        }),
        l.click(function () {
          var e = g.val(),
            i = w.val().replace("#", "0x"),
            r = b.val(),
            l = $.replaceAll(m.val(), " ", "&nbsp;");
          "" == r && (r = "undefined");
          var d = {
              x: n.html(),
              y: s.html(),
              face: r,
              size: e,
              color: i,
              text: l,
            },
            c = a.j_view.find(".select_effect").val(),
            p = a.j_view.find(".text_effect_color").val().replace("#", "0x");
          switch (c) {
            case "0":
              (d.edge = "undefined"), (d.shadow = "undefined");
              break;
            case "1":
              (d.edge = p), (d.shadow = "undefined");
              break;
            case "2":
              (d.edge = "undefined"), (d.shadow = p);
          }
          if ("true" == "" + a.j_view.find(".check_anim").prop("checked")) {
            if ("standard" == global_build)
              return (
                $.alertProOnly(
                  "アニメーション設定はPro版のみ利用できます。Pro版を確認しますか？"
                ),
                !1
              );
            var h = a.getFormEffect();
            _.extend(d, h);
          }
          t && t(d, o), a.close();
        }),
        this.j_view.find("#button_bound_background").click(function () {
          app.window.show(
            "SelectFile",
            {
              title: $.s("Выберите изображение"),
              width: 640,
              height: 400,
              file_path: "bgimage/",
              base_url: "data/bgimage/",
              folder: "",
            },
            function (e) {
              var i = app.getProjectPath() + "data/bgimage/" + e;
              a.j_view.find("#bound_background_img").attr("src", i), (o = e);
            }
          );
        });
    },
    getFormEffect: function () {
      return {
        anim: this.j_view.find(".check_anim").prop("checked"),
        fadeout: this.j_view.find(".check_fadeout").prop("checked"),
        wait: this.j_view.find(".check_wait").prop("checked"),
        in_effect: this.j_view.find(".select_anim_effect_in").val(),
        out_effect: this.j_view.find(".select_anim_effect_out").val(),
      };
    },
  })),
  (Builder.Window.SelectBoundGlink = Builder.Window.Base.extend({
    defaults: { view_id: "SelectBoundGlink" },
    j_view: {},
    link_color: "",
    map_color: {
      original: [
        "black",
        "gray",
        "white",
        "orange",
        "red",
        "blue",
        "rosy",
        "green",
        "pink",
      ],
      btn_01: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_02: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_03: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_04: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_05: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_06: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_07: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_08: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_09: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_10: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_11: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_12: ["red", "yellow", "lime", "green", "blue", "purple", "black"],
      btn_13: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_14: ["red", "yellow", "lime", "green", "blue", "purple", "black"],
      btn_15: ["red", "yellow", "lime", "green", "blue", "purple", "black"],
      btn_16: ["red", "yellow", "lime", "green", "blue", "purple", "black"],
      btn_17: ["red", "yellow", "lime", "green", "blue", "purple", "black"],
      btn_18: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_19: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_20: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_21: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_22: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_23: ["green", "blue", "purple"],
      btn_24: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_25: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_26: [
        "red",
        "yellow",
        "lime",
        "green",
        "blue",
        "purple",
        "white",
        "black",
      ],
      btn_27: ["green", "blue", "purple"],
      btn_28: ["red", "yellow", "green", "blue", "purple", "black"],
      btn_29: ["red", "yellow", "lime", "green", "blue", "purple", "black"],
      btn_30: ["red", "yellow", "lime", "green", "blue", "purple", "black"],
      btn_31: ["red", "yellow", "lime", "green", "blue", "purple", "black"],
      btn_32: ["red", "yellow", "lime", "green", "blue", "purple", "black"],
      btn_33: ["red", "yellow", "lime", "green", "blue", "purple", "black"],
    },
    getStyleSheetValue: function (e, i) {
      return e && i ? window.getComputedStyle(e).getPropertyValue(i) : null;
    },
    updateColor: function () {
      let e = this.j_view.find(".select_glink_kind").val(),
        i = this.j_view.find(".select_glink_color").val();
      if (null == i) return;
      let t = this.j_view.find("#bound_select");
      t.removeClass(this.link_color);
      var a = "",
        n = !1;
      "original" == e
        ? ("ts" == i.substring(0, 2)
            ? t.css("box-sizing", "border-box")
            : t.css("box-sizing", "content-box"),
          (a = i))
        : (a = e + "_" + i),
        this.link_color != a &&
          ((n = !0),
          t.removeClass(this.link_color),
          t.css({ "box-sizing": "" })),
        (this.link_color = a),
        t.addClass(this.link_color),
        t.css("transition", "none"),
        n &&
          setTimeout(() => {
            var e = t.css("box-sizing");
            -1 == this.link_color.indexOf("btn_")
              ? "ts" == this.link_color.substring(0, 2)
                ? t.css("box-sizing", "border-box")
                : t.css("box-sizing", "content-box")
              : "border-box" == e || t.css("box-sizing", "border-box");
          }, 10);
    },
    initialize: function (e, i, t) {
      var a = this;
      this.j_view = e;
      var n = this.j_view.find(".bound_x"),
        s = this.j_view.find(".bound_y"),
        o = this.j_view.find(".bound_width"),
        r = this.j_view.find(".bound_height"),
        l = this.j_view.find(".bound_size"),
        d = this.j_view.find(".text_glink"),
        c = this.j_view.find(".select_glink_kind"),
        p = this.j_view.find(".select_glink_color"),
        _ = "",
        h = this.j_view.find("#bound_select"),
        f = this.j_view.find("#button_bound");
      for (let e in this.map_color)
        c.append('<option value="' + e + '">' + e + "</option>");
      c.on("change", (e) => {
        let i = p.val();
        p.empty();
        let t = c.val();
        for (let e in this.map_color[t])
          p.append(
            '<option value="' +
              this.map_color[t][e] +
              '">' +
              this.map_color[t][e] +
              "</option>"
          );
        "original" == t &&
          "" != app.config.project_config.map_theme.glink &&
          p.append(
            '<option value="' +
              app.config.project_config.map_theme.glink +
              '">' +
              $.s("Кнопка темы") +
              "</option>"
          ),
          p.val(i),
          this.updateColor();
      }),
        p.on("change", (e) => {
          this.updateColor();
        }),
        this.j_view.find(".event-change").on("change", function (e) {
          var i = $(e.target).attr("data-key"),
            t = $(e.target).val();
          h.css(i, parseInt(t));
        }),
        this.j_view.find(".text_glink").on("keyup", (e) => {
          let i = this.j_view.find(".text_glink").val();
          a.j_view.find(".button_text").html(i);
        }),
        n.val(i.bound.x || 100),
        s.val(i.bound.y || 100),
        o.val(i.bound.width),
        r.val(i.bound.height),
        l.val(i.bound.size),
        this.j_view.find("#bound_background_img").attr("src", i.background_url),
        this.j_view
          .find("#bound_area")
          .css({
            width: app.tyrano.config.scWidth,
            height: app.tyrano.config.scHeight,
          }),
        h.css("border", "solid 1px gray"),
        h.css("width", i.bound.width),
        h.css("height", i.bound.height),
        h.css("left", i.bound.x + "px"),
        h.css("top", i.bound.y + "px");
      h.draggable({
        scroll: !1,
        containment: "",
        drag: function (e, i) {
          n.val(parseInt(i.position.left)), s.val(parseInt(i.position.top));
        },
      }),
        h.on("mousewheel", function (e) {
          e.preventDefault();
          var i = parseInt(h.css("width")),
            t = parseInt(h.css("height"));
          (e.originalEvent.deltaY
            ? -e.originalEvent.deltaY
            : e.originalEvent.wheelDelta
            ? e.originalEvent.wheelDelta
            : -e.originalEvent.detail) < 0
            ? ((i = Math.round(0.95 * i)), (t = Math.round(0.95 * t)))
            : ((i = Math.round(1.05 * i)), (t = Math.round(1.05 * t))),
            h.css("width", i),
            h.css("height", t),
            o.val(i),
            r.val(t);
        });
      if (
        (!1,
        h.resizable({
          aspectRatio: false,
          handles: "all",
          resize: function (e, i) {
            var t = $(e.target);
            o.val(parseInt(t.css("width"))), r.val(parseInt(t.css("height")));
          },
        }),
        "glink" == i.bound_type)
      ) {
        var v = i.pm,
          u = v.text,
          m = v.color,
          g = v.size;
        if (((this.link_color = m), -1 != this.link_color.indexOf("btn_"))) {
          let e = this.link_color.split("_");
          c.val(e[0] + "_" + e[1]), c.trigger("change"), p.val(e[2]);
        } else
          c.val("original"),
            c.trigger("change"),
            p.val(m),
            (this.link_color = m);
        p.trigger("change"),
          h.css({ "font-size": g + "px" }),
          h.find(".button_text").html(u),
          this.j_view.find(".text_glink").val(u),
          h.css("left") || h.css("top") || h.css({ left: 100, top: 100 });
        for (var w = i.array_glink, b = 0; b < w.length; b++) {
          var j = w[b];
          '<span class="copy_button_text">Button</span>', "</div>";
          var k = $(
            '<div style="z-index:100;position: absolute;" class="glink_button"><span class="copy_button_text">Button</span></div>'
          );
          k.addClass(j.color),
            k.css({
              "font-size": parseInt(j.size),
              width: parseInt(j.width),
              height: parseInt(j.height),
              left: parseInt(j.x),
              top: parseInt(j.y),
              opacity: 0.7,
            }),
            k.addClass("data-link-" + b),
            k.find(".copy_button_text").html(j.text),
            e.find("#bound_area").append(k);
        }
        setTimeout(() => {
          for (var i = 0; i < w.length; i++) {
            var t = e.find("#bound_area").find(".data-link-" + i),
              a = t.css("box-sizing");
            -1 == w[i].color.indexOf("btn_")
              ? "ts" == w[i].color.substring(0, 2)
                ? h.css("box-sizing", "border-box")
                : t.css("box-sizing", "content-box")
              : "border-box" == a || t.css("box-sizing", "content-box");
          }
        }, 10);
      }
      var y = this.j_view.find("#bound_panel_outer");
      let x = parseInt(app.tyrano.config.scWidth) - 420;
      y.css("left", x),
        this.j_view
          .find("#bound_panel")
          .draggable({ scroll: !1, containment: "#bound_area" }),
        f.click(function () {
          var e = {
            x: n.val(),
            y: s.val(),
            width: o.val(),
            height: r.val(),
            color: a.link_color,
            text: d.val(),
            size: l.val(),
          };
          t && t(e, _), a.close();
        }),
        this.j_view.find("#button_bound_background").click(function () {
          app.window.show(
            "SelectFile",
            {
              title: $.s("Выберите изображение"),
              width: 640,
              height: 400,
              file_path: "bgimage/",
              base_url: "data/bgimage/",
              folder: "",
            },
            function (e) {
              var i = app.getProjectPath() + "data/bgimage/" + e;
              a.j_view.find("#bound_background_img").attr("src", i), (_ = e);
            }
          );
        }),
        this.j_view.find(".spinner-1").spinner({
          min: 0,
          step: 1,
          stop: function (e, i) {
            $(e.target).trigger("change");
          },
        });
    },
  })),
  (Builder.Window.SystemViewEdit = Builder.Window.Base.extend({
    defaults: { view_id: "SystemViewEdit" },
    j_view: {},
    rules: {
      save: {
        image: {
          img_bg_base: { name: $.s("Фоны"), src: "", display: "" },
          img_label: { name: $.s("Заголовок"), src: "", display: "", width: "" },
          menu_close: { name: $.s("Назад"), src: "", display: "", width: "" },
        },
        prop: {},
      },
      load: {
        image: {
          img_bg_base: { name: $.s("Фоны"), src: "", display: "" },
          img_label: { name: $.s("Заголовок"), src: "", display: "", width: "" },
          menu_close: { name: $.s("Назад"), src: "", display: "", width: "" },
        },
        prop: {},
      },
      menu: {
        image: {
          img_bg_base: { name: $.s("Фоны"), src: "", display: "" },
          img_label: { name: $.s("Заголовок"), src: "", display: "", width: "" },
          menu_close: { name: $.s("Назад"), src: "", display: "", width: "" },
          menu_save: { name: $.s("Сохранить"), src: "", display: "", width: "" },
          menu_load: { name: $.s("Загрузить"), src: "", display: "", width: "" },
          menu_window_close: {
            name: $.s("Закрыть окно"),
            src: "",
            display: "",
            width: "",
          },
          menu_skip: { name: $.s("Пропустить"), src: "", display: "", width: "" },
          menu_back_title: {
            name: $.s("Вернуться в главное меню"),
            src: "",
            display: "",
            width: "",
          },
        },
        prop: {},
      },
      backlog: {
        image: {
          img_bg_base: { name: $.s("Фоны"), src: "", display: "" },
          img_label: { name: $.s("Заголовок"), src: "", display: "", width: "" },
          menu_close: { name: $.s("Назад"), src: "", display: "", width: "" },
        },
        prop: {},
      },
    },
    initialize: function (e, i, t) {
      var a = this;
      (this.j_view = e),
        this.j_view
          .find("#bound_area")
          .css({ width: i.width, height: i.height });
      this.j_view.find("#bound_select"), this.j_view.find("#button_bound");
      var n = this.j_view.find("#bound_panel");
      n.draggable({ scroll: !1, containment: "#bound_area" });
      var s = app.tyrano.project_name,
        o = app.exe_path + "myproject/" + s,
        r = i.html_name + ".html",
        l = o + "/tyrano/html/" + r,
        d = app.io.readFile(l),
        c = $(d),
        p = n.find(".select_img"),
        h = this.rules[i.html_name].image;
      for (key in h) {
        (h[key].src = c.find("img." + key).attr("src")),
          (h[key].display = c.find("img." + key).css("display")),
          !(function (e, i) {
            e.on("load", function () {
              if ((e.css("display", h[i].display), "img_bg_base" != i)) {
                var t = parseInt(c.find("img." + i).css("width"));
                (h[i].width = 0 != t ? t : parseInt(e.get(0).naturalWidth)),
                  e.css("width", h[i].width + "px");
              }
            }),
              e.attr("src", o + "/" + h[i].src);
          })(this.j_view.find("img." + key), key),
          p.append(
            '<option value="' + key + '">' + $.s(h[key].name) + "</option>"
          );
      }
      var f = this.j_view.find(".text_sysview_img_size");
      f.spinner({
        min: 0,
        max: 5e3,
        step: 10,
        stop: function (e, i) {
          var t = parseInt(f.val()),
            a = p.val();
          (h[a].width = t), v.css("width", t);
        },
      });
      var v,
        u = this.j_view.find(".check_display");
      this.j_view
        .find("[data-kind=img_change]")
        .css("-webkit-filter", "brightness(60%)"),
        p.on("change", function () {
          a.j_view
            .find("[data-kind=img_change]")
            .css("-webkit-filter", "brightness(60%)");
          var e = $(this).val();
          (v = a.j_view.find("." + e)).css(
            "-webkit-filter",
            "brightness(100%)"
          ),
            "img_bg_base" != e
              ? a.j_view.find(".area_width").show()
              : a.j_view.find(".area_width").hide(),
            u.prop("checked", h[e].display),
            f.val(h[e].width);
        });
      var m = n.find("#button_file_img"),
        g = "tyrano/images/system/",
        w = app.getProjectPath() + g;
      this.j_view.find("[data-kind=img_change]").on("mousedown", function () {
        a.j_view
          .find("[data-kind=img_change]")
          .css("-webkit-filter", "brightness(60%)"),
          p.val($(this).get(0).className.split(" ")[0]),
          $(this).css("-webkit-filter", "brightness(100%)"),
          p.trigger("change");
      }),
        u.on("change", function () {
          var e = $(this).prop("checked"),
            i = p.val(),
            t = a.j_view.find("." + i);
          e
            ? (t.css("display", "none"), (h[i].display = "none"))
            : (t.css("display", ""), (h[i].display = ""));
        }),
        m.click(function () {
          var e = $('<input type="file" />');
          e.change(function (e) {
            var t = e.target.files[0],
              n = t.path,
              s = t.name,
              o = $.getExt(s);
            if (-1 == _.indexOf(["png", "PNG", "jpg", "JPG", "gif", "GIF", "apng", "APNG", "webp", "WEBP"], o))
              return (alertNoBtn(
                  "Внимание",
                      "Только png, jpg, gif, apng или webp файлы",
                      3000,
                      "bottom-right",
                      "info",
                      "var(--vne-info-alert-color)"), !1
              );
            var r = a.j_view.find("." + p.val()),
              l = r.attr("src"),
              d =
                $.getPathToName(l, !1) + "_" + i.html_name + "." + $.getExt(s),
              c = w + "_builder/";
            app.io.exists(c) || app.io.mkdir(c),
              app.io.copy(n, c + d),
              app.clearCache();
            var f = Math.floor(1e6 * Math.random());
            r.attr("src", c + d + "?" + f),
              (h[p.val()].src = "tyrano/images/system/_builder/" + d);
          }),
            e.trigger("click");
        }),
        n.find("#button_submit").on("click", function () {
          for (key in h)
            c.find("img." + key).attr("src", h[key].src),
              c.find("img." + key).css("display", h[key].display),
              c.find("img." + key).css("width", h[key].width);
          c.find("script").remove();
          var e = "<div>";
          (e += c.html()),
            ("save" != i.html_name && "load" != i.html_name) ||
              ((e += "<script>"),
              (e += "\tsetTimeout(function(){"),
              (e +=
                '\t\tvar save_list_height = parseInt($(".tyrano_base").outerHeight()) - parseInt($(".save_list").offset().top) ;'),
              (e += '\t\t$(".area_save_list").css("height",save_list_height);'),
              (e += "\t},30);"),
              (e += "</script>")),
            (e += "</div>"),
            app.io.writeFile(l, e), alertNoBtn(
                "Успех!",
              "Сохранено",
              3000,
              "bottom-right",
              "success",
              "var(--vne-success-alert-color)");
        }),
        this.j_view
          .find(".navbar-nav")
          .find("li")
          .click(function () {
            a.j_view.find("li").removeClass("active"),
              $(this).addClass("active");
            var e = $(this).attr("data-nav");
            a.j_view.find(".area").hide(), a.j_view.find(".area_" + e).show();
          }),
        setTimeout(function () {
          p.val("img_bg_base").change();
        }, 10);
    },
    getFormEffect: function () {
      return {
        anim: this.j_view.find(".check_anim").prop("checked"),
        fadeout: this.j_view.find(".check_fadeout").prop("checked"),
        wait: this.j_view.find(".check_wait").prop("checked"),
        in_effect: this.j_view.find(".select_anim_effect_in").val(),
        out_effect: this.j_view.find(".select_anim_effect_out").val(),
      };
    },
  })),
  (Builder.Window.SelectBoundAnim = Builder.Window.Base.extend({
    defaults: { view_id: "SelectBoundAnim" },
    j_view: {},
    selected_target: "",
    j_selected_target: null,
    map_anim: { left: "", top: "", width: "", height: "" },
    map_tmp_anim: null,
    initialize: function (e, i, t) {
      var a = this;
      this.j_view = e;
      var n = this.j_view.find(".select_anim"),
        s = this.j_view.find(".text_bound_x"),
        o = this.j_view.find(".text_bound_y"),
        r = this.j_view.find(".text_bound_width"),
        l = this.j_view.find(".text_bound_height"),
        d = this.j_view.find("#button_bound");
      this.j_view.find("#bound_background_img").attr("src", i.background_url),
        this.j_view
          .find("#bound_area")
          .css({
            width: app.tyrano.config.scWidth,
            height: app.tyrano.config.scHeight,
          });
      var c = i.map_chara;
      for (key in c) {
        var p = c[key];
        key == i.pm.name &&
          (i.pm.left || i.pm.left || i.width || i.height) &&
          _.extend(p, i.pm);
        var h = $(
            '<div class="target_anim" style="cursor:move;position:absolute;z-index:99" ></div>'
          ),
          f = $("<img style='position:relative;width:100%;height:100%;border: 1px solid #ff8000'/>");
        f.attr("src", app.getProjectPath() + "data/fgimage/" + p.storage),
          h.css({
            left: parseInt(p.left),
            top: parseInt(p.top),
            width: parseInt(p.width),
            height: parseInt(p.height),
          }),
          h.attr("data-name", key),
          1 == p.reflect ? f.addClass("reflect") : f.removeClass("reflect"),
          h.css("position", "absolute"),
          h.append(f),
          e.find("#bound_area").append(h),
          n.append('<option value="' + key + '">' + key + "</option>");
      }
      if ("anim" == i.bound_type) {
        var v = i.map_img;
        for (key in v) {
          var u = v[key],
            m = $("<img class='target_anim' />");
          m.attr("src", app.getProjectPath() + "data/fgimage/" + u.storage),
            m.css({
              left: parseInt(u.x),
              top: parseInt(u.y),
              width: parseInt(u.width),
              height: parseInt(u.height),
            }),
            m.css("position", "absolute"),
            e.find("#bound_area").append(m);
        }
      }
      this.j_view
        .find("#bound_panel")
        .draggable({ scroll: !1, containment: "#bound_area" });
      var g = this.j_view.find(".target_anim"),
        w = function (i) {
          e.find(".target_anim").removeClass("select_anim_target"),
            i.addClass("select_anim_target");
          var t = i.attr("data-name");
          a.selected_target != t &&
            (null != a.j_selected_target &&
              a.j_selected_target.css(a.map_tmp_anim),
            (a.map_anim.left = parseInt(i.css("left"))),
            (a.map_anim.top = parseInt(i.css("top"))),
            (a.map_anim.width = parseInt(i.css("width"))),
            (a.map_anim.height = parseInt(i.css("height"))),
            s.val(a.map_anim.left),
            o.val(a.map_anim.top),
            r.val(a.map_anim.width),
            l.val(a.map_anim.height),
            (a.map_tmp_anim = $.extend(!0, {}, a.map_anim)),
            (a.selected_target = t),
            (a.j_selected_target = i),
            n.val(t));
        };
      g.on("mousedown", function () {
        w($(this));
      }),
        n.on("change", function () {
          var e = $(this).val(),
            i = a.j_view.find("[data-name='" + e + "']");
          w(i);
        }),
        g.draggable({
          scroll: !1,
          drag: function (e) {
            var i = $(e.target),
              t = i.css("left"),
              n = i.css("top");
            (a.map_anim.left = parseInt(t)),
              (a.map_anim.top = parseInt(n)),
              s.val(a.map_anim.left),
              o.val(a.map_anim.top);
          },
        }),
        g.resizable({
          aspectRatio: !0,
          handles: "all",
          resize: function (e, i) {
            var t = $(e.target),
              n = t.css("width"),
              s = t.css("height");
            (a.map_anim.width = parseInt(n)),
              (a.map_anim.height = parseInt(s)),
              r.val(a.map_anim.width),
              l.val(a.map_anim.height);
          },
        }),
        this.j_view.find(".spinner-1").spinner({
          min: 0,
          step: 10,
          stop: function (e, i) {
            var t = $(this).val(),
              n = $(this).attr("data-id");
            a.j_selected_target.css(n, parseInt(t));
          },
        });
      var b = this.j_view.find(".area_font"),
        j = this.j_view.find(".area_anim");
      (this.j_area_font = b),
        (this.j_area_anim = j),
        this.j_view
          .find(".navbar-nav")
          .find("li")
          .click(function () {
            a.j_view.find("li").removeClass("active"),
              $(this).addClass("active");
            var e = $(this).attr("data-nav");
            a.j_view.find(".area").hide(), a.j_view.find(".area_" + e).show();
          });
      $.each(
        "flash bounce shake tada swing wobble pulse flip flipInX flipOutX flipInY flipOutY fadeIn fadeInUp fadeInDown fadeInLeft fadeInRight fadeInUpBig fadeInDownBig fadeInLeftBig fadeInRightBig fadeOut fadeOutUp fadeOutDown fadeOutLeft fadeOutRight fadeOutUpBig fadeOutDownBig fadeOutLeftBig fadeOutRightBig bounceIn bounceInDown bounceInUp bounceInLeft bounceInRight bounceOut bounceOutDown bounceOutUp bounceOutLeft bounceOutRight rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight rotateOut rotateOutDownLeft rotateOutDownRight rotateOutUpLeft rotateOutUpRight hinge rollIn rollOut".split(
          " "
        ),
        function (e, i) {
          var t = '<option value="' + i + '">' + i + "</option>";
          /Out/.test(i) || "hinge" === i
            ? a.j_view.find(".select_anim_effect_out").append(t)
            : a.j_view.find(".select_anim_effect_in").append(t);
        }
      );
      var k = i.pm;
      _.extend(
        {
          anim: "false",
          fadeout: "false",
          wait: "true",
          in_effect: "fadeIn",
          out_effect: "fadeOut",
        },
        k
      ),
        d.click(function () {
          var e = a.map_anim;
          (e.name = a.selected_target), t && t(e), a.close();
        }),
        this.j_view.find(".button_reset").click(function () {
          a.selected_target = "";
          var e = a.j_view.find("[data-name='" + n.val() + "']");
          w(e);
        }),
        setTimeout(function () {
          var e = i.pm.name;
          n.val(e);
          var t = a.j_view.find("[data-name='" + e + "']");
          w(t);
        }, 20);
    },
    getFormEffect: function () {
      return {
        anim: this.j_view.find(".check_anim").prop("checked"),
        fadeout: this.j_view.find(".check_fadeout").prop("checked"),
        wait: this.j_view.find(".check_wait").prop("checked"),
        in_effect: this.j_view.find(".select_anim_effect_in").val(),
        out_effect: this.j_view.find(".select_anim_effect_out").val(),
      };
    },
  })),
  (Builder.Window.UIMaker = Builder.Window.Base.extend({
    defaults: { view_id: "UIMaker" },
    j_view: {},
    map_w: {},
    j_area_parts: {},
    j_area_param: {},
    selected_role: "",
    initialize: function (e, i, t) {
      const a = this;
      this.j_view = e;
      const n = parseInt(app.tyrano.config.scWidth),
          s = parseInt(app.tyrano.config.scHeight);
      this.j_view.find("#bound_area").css("min-width", n),
        this.j_view.find("#bound_area").css("min-height", s);
      let o,
          r = app.config.project_config.message_window;
      for (key in ((this.map_w = r),
      a.map_w.map_role || (a.map_w.map_role = {}),
      (this.j_param_x = this.j_view.find(".param_x")),
      (this.j_param_y = this.j_view.find(".param_y")),
      (this.j_param_width = this.j_view.find(".param_width")),
      (this.j_param_height = this.j_view.find(".param_height")),
      (this.j_param_name = this.j_view.find(".param_name")),
      (this.j_param_img = this.j_view.find(".select_img")),
      r.map_role)) {
        var l = r.map_role[key];
        this.addRoleObject(l);
      }
      var d = {
        left: parseInt(r.msg_left),
        top: parseInt(r.msg_top),
        width: parseInt(r.msg_width),
        height: parseInt(r.msg_height),
      };
      if (
        (0 != r.use_image
          ? ((o = this.j_view.find(".message_outer_img")),
            this.j_view.find(".message_outer").hide())
          : ((o = this.j_view.find(".message_outer")).css(
              "background-color",
              $.convertColor(r.window_color)
            ),
            this.j_view.find(".message_outer_img").hide()),
        "false" == r.use_image)
      )
        o.css("opacity", $.convertOpacity(r.opacity)),
          o.css("background-image", ""),
          o.css("background-color", $.convertColor(r.window_color));
      else if ("" != r.use_image) {
        var c = app.getProjectPath() + "data/image/" + r.image_file;
        o.attr("src", c), o.css("opacity", 0.5);
      }
      "" != r.opacity && o.css("opacity", $.convertOpacity(r.opacity)),
        o.css(d);
      var p = this.j_view.find(".area_param"),
        _ = this.j_view.find(".area_parts");
      (this.j_area_param = p),
        (this.j_area_parts = _),
        this.j_view.find(".drag_message_outer").draggable({
          scroll: !1,
          containment: "#bound_area",
          drag: function (e) {
            var i = $(e.target),
              t = i.css("left"),
              n = i.css("top");
            (a.map_w.msg_left = parseInt(t)),
              (a.map_w.msg_top = parseInt(n)),
              a.showParamArea("message_window"),
              a.j_param_x.val(t),
              a.j_param_y.val(n);
          },
        }),
        this.j_view.find(".input_position").on("change", function () {
          var e = a.selected_role;
          if ("message_window" == e) {
            var i = a.j_view.find(".message_outer_img,.message_outer");
            (a.map_w.msg_left = parseInt(a.j_view.find(".param_x").val())),
              (a.map_w.msg_top = parseInt(a.j_view.find(".param_y").val())),
              i.css({ left: a.map_w.msg_left, top: a.map_w.msg_top });
          } else if ("chara_name" == e) {
            i = a.j_view.find(".chara_name_area");
            (a.map_w.chara_name_x = parseInt(a.j_view.find(".param_x").val())),
              (a.map_w.chara_name_y = parseInt(
                a.j_view.find(".param_y").val()
              )),
              i.css({ left: a.map_w.chara_name_x, top: a.map_w.chara_name_y });
          } else {
            if (!a.map_w.map_role[e]) return;
            (a.map_w.map_role[e].x = parseInt(a.j_view.find(".param_x").val())),
              (a.map_w.map_role[e].y = parseInt(
                a.j_view.find(".param_y").val()
              )),
              (a.map_w.map_role[e].width = parseInt(
                a.j_view.find(".param_width").val()
              )),
              (a.map_w.map_role[e].height = parseInt(
                a.j_view.find(".param_height").val()
              )),
              (i = a.j_view.find("[data-role='" + e + "']")).css({
                left: a.map_w.map_role[e].x,
                top: a.map_w.map_role[e].y,
                width: a.map_w.map_role[e].width,
                height: a.map_w.map_role[e].height,
              });
          }
        }),
        this.j_view.find(".drag_message_outer").click(function () {
          a.showParamArea("message_window"),
            a.j_param_x.val(a.map_w.msg_left),
            a.j_param_y.val(a.map_w.msg_top),
            a.j_param_width.val(a.map_w.msg_width),
            a.j_param_height.val(a.map_w.msg_height);
        });
      var h = this.j_view.find("#bound_panel");
      h.draggable({ scroll: !1, containment: "#bound_area" });
      var f = n - 380;
      f < 0 && (f = 0),
        h.css({ left: f, top: 20 }),
        this.j_view
          .find(".navbar-nav")
          .find("li")
          .click(function () {
            a.j_view.find("li").removeClass("active"),
              $(this).addClass("active");
            var e = $(this).attr("data-nav");
            a.j_view.find(".area").hide(), a.j_view.find(".area_" + e).show();
          });
      var v = this.j_view.find(".chara_name_area");
      v.css({
        color: $.convertColor(r.chara_name_color),
        "font-size": r.chara_name_size + "px",
        left: r.chara_name_x,
        top: r.chara_name_y,
        fontweight: r.chara_name_bold,
      }),
        this.j_param_img.click(function () {
          app.window.show(
            "SelectFile",
            {
              title: $.s("Выберите изображение"),
              width: 640,
              height: 400,
              file_path: "image/",
              folder: "",
              folder_select: !1,
              base_url: "data/image/",
            },
            function (e) {
              if ("message_window" == a.selected_role) {
                a.map_w.image_file = e;
                var i = app.getProjectPath() + "data/image/" + r.image_file,
                  t = $("<img />");
                t.attr("src", i).load(function () {
                  a.j_view.find(".message_outer").hide(),
                    (o = a.j_view.find(".message_outer_img")).show(),
                    (a.map_w.use_image = !0);
                  var e = parseInt(t.get(0).width),
                    n = parseInt(t.get(0).height);
                  (a.map_w.msg_width = e),
                    (a.map_w.msg_height = n),
                    o.css({ width: e, height: n }),
                    o.attr("src", i);
                });
              } else {
                a.map_w.map_role[a.selected_role].graphic = e;
                var n = app.getProjectPath() + "data/image/" + e;
                a.j_param_img.attr("src", n),
                  a.j_view
                    .find("." + a.selected_role)
                    .find("img")
                    .attr("src", n);
              }
            }
          );
        }),
        v.draggable({
          scroll: !1,
          containment: "#bound_area",
          drag: function (e) {
            var i = $(e.target),
              t = i.css("left"),
              n = i.css("top");
            (a.map_w.chara_name_x = parseInt(t)),
              (a.map_w.chara_name_y = parseInt(n)),
              a.showParamArea("chara_name"),
              a.j_param_name.html($.s("Имя персонажа")),
              a.j_param_x.val(t),
              a.j_param_y.val(n);
          },
        }),
        v.click(function () {
          a.showParamArea("chara_name"),
            a.j_param_name.html($.s("Имя персонажа")),
            a.j_param_x.val(a.map_w.chara_name_x),
            a.j_param_y.val(a.map_w.chara_name_y),
            a.j_param_width.val(""),
            a.j_param_height.val("");
        }),
        this.j_view.find(".button_add_parts").click(function () {
          var e = a.j_view.find(".select_parts").val();
          if (a.map_w.map_role[e])
            return alertNoBtn(
                "Внимание",
                "Объект уже существует",
                3000,
                "bottom-right",
                "success",
                "var(--vne-success-alert-color)"), !1;
          var i = { role: e, x: 200, y: 200, graphic: "button/" + e + ".png" },
            t = app.getProjectPath() + "data/image/" + i.graphic,
            n = $("<img />");
          n.attr("src", t).load(function () {
            (i.width = parseInt(n.get(0).width)),
              (i.height = parseInt(n.get(0).height)),
              (a.map_w.map_role[e] = i),
              a.addRoleObject(i);
          });
        }),
        this.j_view.find(".button_delete").click(function () {
          delete a.map_w.map_role[a.selected_role],
            a.j_view.find("." + a.selected_role).remove(),
            (a.selected_role = ""),
            a.j_view.find(".navbar-nav").find("li").removeClass("active"),
            a.j_view.find(".navbar-nav").find(".nav_parts").addClass("active"),
            a.j_view.find(".area").hide(),
            a.j_view.find(".area_parts").show(),
            a.j_param_img.attr("src", "");
        }),
        this.j_view.find("#button_save").click(function () {
          app.config.setProjectConfig("message_window", a.map_w);
          var e = app.config.ks("message_window.ks", a.map_w),
            i =
              app.getProjectPath() + "/data/scenario/system/message_window.ks";
          app.io.writeFile(i, e), alertNoBtn(
              "Успех",
              "Дизайн интерфейса сохранен",
              3000,
              "bottom-right",
              "success",
              "var(--vne-success-alert-color)");
        });
    },
    addRoleObject: function (e) {
      var i = this,
        t = app.getProjectPath() + "data/image/" + e.graphic,
        a = $(
          "<div class='" +
            e.role +
            "' data-role='" +
            e.role +
            "' ><img style='width:100%;height:100%' src='" +
            t +
            "' /></div>"
        );
      a.css({
        cursor: "move",
        position: "absolute",
        left: e.x,
        top: e.y,
        width: e.width,
        height: e.height,
        "z-index": 9999,
      }),
        a.draggable({
          scroll: !1,
          containment: "#bound_area",
          drag: function (e) {
            var t = $(e.target),
              a = t.css("left"),
              n = t.css("top"),
              s = t.attr("data-role");
            (i.map_w.map_role[s].x = parseInt(a)),
              (i.map_w.map_role[s].y = parseInt(n)),
              i.showParamArea(s),
              i.j_param_x.val(i.map_w.map_role[s].x),
              i.j_param_y.val(i.map_w.map_role[s].y);
          },
        }),
        a.resizable({
          aspectRatio: !1,
          handles: "all",
          resize: function (e, t) {
            var a = $(e.target),
              n = a.attr("data-role"),
              s = parseInt(a.css("width")),
              o = parseInt(a.css("height"));
            (i.map_w.map_role[n].width = parseInt(s)),
              (i.map_w.map_role[n].height = parseInt(o)),
              i.j_param_name.html(n),
              i.j_param_width.val(s),
              i.j_param_height.val(o),
              i.showParamArea(n);
          },
        }),
        a.click(function (e, t) {
          var a = $(this).attr("data-role");
          i.showParamArea(a);
          var n = i.map_w.map_role[a].x,
            s = i.map_w.map_role[a].y,
            o = i.map_w.map_role[a].width,
            r = i.map_w.map_role[a].height;
          i.j_param_x.val(n),
            i.j_param_y.val(s),
            i.j_param_width.val(o),
            i.j_param_height.val(r);
        }),
        this.j_view.find("#bound_area").before(a);
    },
    showParamArea: function (e) {
      if (
        !this.j_view.find(".navbar-nav").find("nav_param").hasClass("active")
      ) {
        if (
          (this.j_param_name.html(e),
          (this.selected_role = e),
          this.j_view.find(".navbar-nav").find("li").removeClass("active"),
          this.j_view.find(".navbar-nav").find(".nav_param").addClass("active"),
          this.j_view.find(".area").hide(),
          this.j_view.find(".area_param").show(),
          "message_window" == e)
        ) {
          if (1 == this.map_w.use_image) {
            var i =
              app.getProjectPath() + "data/image/" + this.map_w.image_file;
            this.j_param_img.attr("src", i);
          } else this.j_param_img.attr("src", "");
          this.j_view.find(".button_delete").hide(),
            this.j_view.find(".select_img").show();
        } else if ("chara_name" == e)
          this.j_view.find(".button_delete").hide(),
            this.j_view.find(".select_img").hide();
        else {
          this.j_view.find(".button_delete").show(),
            this.j_view.find(".select_img").show();
          i =
            app.getProjectPath() +
            "data/image/" +
            this.map_w.map_role[e].graphic;
          this.j_param_img.attr("src", i);
        }
        this.j_area_parts.hide(), this.j_area_param.show();
      }
    },
  })),
  (Builder.Window.SelectFile = Builder.Window.Base.extend({
    defaults: {},
    j_view: {},
    dir_path: "",
    data: {},
    selected_file_name: "",
    initialize: function (e, i, t) {
      (this.j_view = e), (this.call_back = t), (this.data = i);
      var a = this;
      this.j_view
        .find(".nav-tabs")
        .find("a")
        .click(function () {
          var e = $(this).attr("data-type");
          a.showFiles(e);
        }),
        "none" == i.folder_select
          ? this.j_view.find(".folder_select").hide()
          : (this.j_view.find(".txt-add-folder").click(function () {
              a.j_view.find(".area_add_folder_input").slideDown();
            }),
            this.j_view.find(".sbm_add_folder").click(function () {
              var e = $.trim(a.j_view.find(".text_add_folder").val());
              if ("" != (e = $.rmspace(e))) {
                var t = app.getDataPath() + i.file_path;
                if (app.io.exists(t + e)) {
                  alertNoBtn("Внимание", "Папка уже существует. Создание невозможно.", 3000, "bottom-right", "warning", "var(--vne-warning-alert-color)");
                } else {
                  app.io.mkdir(t + e);
                  a.j_view.find(".area_add_folder_input").slideUp();
                  a.reflesh_folder();
                }

              } else alertNoBtn("Внимание", "Введите имя папки", 3000, "bottom-right", "info", "var(--vne-info-alert-color)");
            })),
        this.j_view.find(".file_draggable").bind("drop", function (e) {
          for (
            var i = a.data.file_path,
              t = e.originalEvent.dataTransfer.files,
              n = 0;
            n < t.length;
            n++
          ) {
            var s = t[n],
              o = $.replaceAll(s.name, " ", "_");
            if ("bgm/" == i || "sound/" == i) {
              var r = $.getExt(o);
              if (
                -1 == _.indexOf(["ogg", "OGG", "m4a", "M4A", "mp3", "MP3"], r)
              )
                return (
                    alertNoBtn("Внимание", "Поддерживаются только ogg, m4a, mp3 форматы", 3000, "bottom-right", "info", "var(--vne-info-alert-color)"),
                  !1
                );
            } else if ("video/" == i) {
              r = $.getExt(o);
              if (
                -1 == _.indexOf(["webm", "WEBM", "ogv", "OGV", "mp4", "MP4", "MKV", "mkv"], r)
              )
                return (alertNoBtn("Внимание", "Поддерживаются только ogv, webm, mp4, mkv форматы", 3000, "bottom-right", "info", "var(--vne-info-alert-color)"),
                  !1
                );
            } else if (
              "image/" == i ||
              "bgimage/" == i ||
              "fgimage/default/" == i
            ) {
              r = $.getExt(o);
              if (
                -1 == _.indexOf(["png", "PNG", "jpg", "JPG", "gif", "GIF", "apng", "APNG", "webp", "WEBP"], r)
              )
                return (alertNoBtn("Внимание", "Поддерживаются только png, jpg, gif, apng, webp форматы", 3000, "bottom-right", "info", "var(--vne-info-alert-color)"),
                  !1
                );
            }
            if (app.io.exists(a.dir_path + o)) {
              if (
                confirm(
                  $.s("「") +
                    o +
                    $.s("」уже существует. Перезаписать?")
                )
              ) {
                if (!a.checkBuild()) return !1;
                app.io.copy(s.path, a.dir_path + o);
              }
            } else {
              if (!a.checkBuild()) return !1;
              app.io.copy(s.path, a.dir_path + o);
            }
          }
          a.j_view.find(".add-file-upload-block").removeClass("active"),
            a.showFiles(a.data),
            e.preventDefault();
        }),
        this.j_view.find(".file_draggable").bind("dragover", function (e) {
          a.j_view.find(".add-file-upload-block").addClass("active"),
            e.preventDefault();
        }),
        this.j_view.find(".file_draggable").bind("dragleave", function (e) {
          a.j_view.find(".add-file-upload-block").removeClass("active"),
            e.preventDefault();
        }),
        this.j_view.find(".button_file_samune").on("click", function () {
          (app.config.user_config.file_select_type = 1),
            app.config.saveUserConfig(),
            a.showFiles(a.data);
        }),
        this.j_view.find(".button_file_list").on("click", function () {
          (app.config.user_config.file_select_type = 2),
            app.config.saveUserConfig(),
            a.showFiles(a.data);
        }),
        this.j_view.find(".button_input_file").on("change", function () {
          var e = this.files[0];
          if (null != e) {
            var i = $.replaceAll(e.name, " ", "_"),
              t = a.data.file_path;
            if ("bgm/" == t || "sound/" == t) {
              var n = $.getExt(i);
              if (
                -1 == _.indexOf(["ogg", "OGG", "m4a", "M4A", "mp3", "MP3"], n)
              )
                return (alertNoBtn("Внимание", "Поддерживаются только ogg, m4a, mp3 форматы", 3000, "bottom-right", "info", "var(--vne-info-alert-color)"),
                  !1
                );
            } else if ("video/" == t) {
              n = $.getExt(i);
              if (
                -1 == _.indexOf(["webm", "WEBM", "ogv", "OGV", "mp4", "MP4", "webm", "WEBM", "MKV", "mkv"], n)
              )
                return (alertNoBtn("Внимание", "Поддерживаются только webm, ogv, mp4, mkv форматы", 3000, "bottom-right", "info", "var(--vne-info-alert-color)"),
                  !1
                );
            } else if (
              "image/" == t ||
              "bgimage/" == t ||
              "fgimage/default/" == t
            ) {
              n = $.getExt(i);
              if (
                -1 == _.indexOf(["png", "PNG", "jpg", "JPG", "gif", "GIF", "apng", "APNG", "webp", "WEBP"], n)
              )
                return (alertNoBtn("Внимание", "Поддерживаются только png, jpg, gif, apng, webp форматы", 3000, "bottom-right", "info", "var(--vne-info-alert-color)"),
                  !1
                );
            }
            if (app.io.exists(a.dir_path + i)) {
              if (
                confirm(
                  $.s("「") +
                    i +
                    $.s("」уже существует. Перезаписать?")
                )
              ) {
                if (!a.checkBuild()) return !1;
                app.io.copy(e.path, a.dir_path + i);
              }
            } else {
              if (!a.checkBuild()) return !1;
              app.io.copy(e.path, a.dir_path + i);
            }
            $(this).val(""), a.showFiles(a.data);
          }
        }),
        this.j_view.find(".button_file_select_search").click(function () {
          a.showFiles(a.data);
        }),
        this.j_view.find(".text_file_select_search").keypress(function (e) {
          13 === e.which && a.showFiles(a.data);
        }),
        this.j_view.find(".select-folder-add-file").on("change", function () {
          var e = $(this).val();
          (a.data.folder = e), a.showFiles(a.data);
        }),
        "trial" == global_build && this.j_view.find(".folder_select").hide(),
        a.showFiles(i);
    },
    checkBuild: function () {
      if ("standard" == global_build || "trial" == global_build) {
        var e = app.getDataPath() + this.data.file_path,
          i = app.io.countDirItems(e);
        if (-1 != e.indexOf("bgimage"))
          if ("standard" == global_build) {
            if (i >= 30)
              return (
                $.alert(
                  $.s(
                    "Стандартная версия ограничена 30 фоновыми изображениями, которые могут быть зарегистрированы."
                  )
                ),
                !1
              );
          } else if ("trial" == global_build && i >= 5)
            return (
              $.alert(
                $.s("В демо-версии можно добавить только 5 фоновых картинок")
              ),
              !1
            );
        if (-1 != e.indexOf("bgm") || -1 != e.indexOf("sound"))
          if ("standard" == global_build) {
            if (i >= 10)
              return (
                $.alert(
                  $.s(
                    "スタンダード版では登録できる音楽は10個までに制限されています"
                  )
                ),
                !1
              );
          } else if ("trial" == global_build && i >= 3)
            return (
              $.alert(
                $.s("体験版では登録できる音楽は3個までに制限されています")
              ),
              !1
            );
      }
      return !0;
    },
    showFiles: function (e) {
      var i = e.file_path,
        t = e.base_url,
        a = app.config.user_config.file_select_type,
        n = {},
        s = $.trim(this.j_view.find(".text_file_select_search").val());
      e.folder &&
        ("default" == e.folder || "none" == e.folder_select) &&
        (e.folder = ""),
        (this.data = e);
      var o = this,
        r = app.getDataPath() + i;
      (this.dir_path = r),
        this.reflesh_folder(),
        this.data.folder && (this.dir_path = this.dir_path + e.folder + "/");
      var l = app.io.getItems(this.dir_path),
        d = {};
      if (1 == a) {
        o.j_view.find(".button_file_samune").css("color", ""),
          o.j_view.find(".button_file_list").css("color", "gray"),
          (d = $("<ul class='list-unstyled list-add-file'></ul>"));
        this.j_view.find(".select-folder-add-file");
        for (var c = 0, p = 0; p < l.length; p++) {
          var _ = l[p],
            h = "";
          switch ((w = o.getDataKind(_))) {
            case "image":
              h = this.createImageHtml(_);
              break;
            case "sound":
              h = this.createSoundHtml(_);
              break;
            case "movie":
              h = this.createMovieHtml(_);
          }
          if ("" != h) {
            if ("trial" == global_build)
              if (-1 != r.indexOf("bgimage")) {
                if (c >= 5) break;
              } else if (c >= 3) break;
            c++,
              "" != s
                ? -1 != _.item.indexOf(s) && d.append($(h))
                : d.append($(h));
          }
        }
      } else {
        o.j_view.find(".button_file_samune").css("color", "gray"),
          o.j_view.find(".button_file_list").css("color", ""),
          (d = $("<div></div>"));
        var f = $('<div style="float:left;width:200px;height:260px"></div>'),
          v = $(
            '<select class="select_file_list_2" style="width:200px;" size=20 ></select>'
          ),
          u = $("<div class='preview_select' />");
        u.css({ float: "left", "max-width": 237, "max-height": 200 });
        var m = $(
            "<input class='button_select_file_name btn-default' style='width:80px;margin-right: 5px !important;' type='button' value='" +
              $.s("Принять") +
              "' />"
          ),
          g = $(
            "<input class='button_file_remove_list btn-default' style='width:80px' type='button' value='" +
              $.s("Удалить") +
              "' />"
          );
        m.on("click", function () {
          n.trigger("dblclick");
        }),
          f.append(v),
          f.append(m),
          f.append(g);
        for (c = 0, p = 0; p < l.length; p++) {
          _ = l[p];
          var w = o.getDataKind(_);
          if (".DS_Store" != _.item && "" != w) {
            if ("trial" == global_build)
              if (-1 != r.indexOf("bgimage")) {
                if (c >= 5) break;
              } else if (c >= 3) break;
            c++;
            var b =
              '<option class="select_file_name" data-kind="' +
              w +
              '" data-path="' +
              _.path +
              '" data-type="' +
              _.type +
              '" value="' +
              _.item +
              '" data-file="' +
              e.folder +
              "/" +
              _.item +
              '">' +
              _.item +
              "</option>";
            "" != s ? -1 != _.item.indexOf(s) && v.append(b) : v.append(b);
          }
        }
        d.append(f),
          d.append(u),
          v.val(e.selected_file),
          setTimeout(function () {
            v.find("option:selected").trigger("click");
          }, 10);
      }
      d.on("dblclick", ".select_file_name", function () {
        n.attr("data-type");
        var e = n.attr("data-file"),
          a = ("data/" + i).replace(t, "");
        "/" == e.substr(0, 1) && (e = e.substr(1, e.length)),
          "/" == a.substr(0, 1) && (a = a.substr(1, a.length)),
          o.call_back(a + e),
          o.close();
      }),
        d.on("click", ".select_file_name", function () {
          (n = $(this)).attr("data-type");
          var e = n.attr("data-file"),
            i = n.attr("data-kind"),
            t = n.attr("data-path");
          if (2 == app.config.user_config.file_select_type) {
            var a = "";
            (a =
              "sound" == i
                ? "<span>" + e + "</span><br /><audio src='" + t + "' controls>"
                : "movie" == i
                ? "<span>" +
                  e +
                  "</span><br /><video src='" +
                  t +
                  "' style='max-width:320px;max-height:200px' controls=''></video>"
                : "<img src='" + t + "' style='width:100%;' />"),
              d.find(".preview_select").empty(),
              d.find(".preview_select").append(a);
          }
          o.selected_file_name = e;
        }),
        d.on("click", ".button_file_remove", function () {
          var e = $(this).closest("li").attr("data-file"),
            i = $(this).closest("li").attr("data-path");
          if ("" == e) return !1;
          $.confirm(
            $.s("「") + e + $.s("」будет удалён. Продолжить?"),
            function () {
              app.io.rmdir(i), o.showFiles(o.data);
            },
            function () {
              return !1;
            }
          );
        }),
        d.on("click", ".button_file_remove_list", function () {
          var e = o.j_view.find(".select_file_list_2").find("option:selected"),
            i = e.attr("data-file"),
            t = e.attr("data-path");
          if (null == i) return !1;
          $.confirm(
            $.s("「") + i + $.s("」будет удалён. Продолжить?"),
            function () {
              app.io.rmdir(t), o.showFiles(o.data);
            },
            function () {
              return !1;
            }
          );
        }),
        this.j_view.find(".file_select_list_area").empty(),
        this.j_view.find(".file_select_list_area").append(d);
    },
    getDataKind: function (e) {
      var i = "";
      switch ($.getExt(e.path)) {
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
        case "PNG":
        case "apng":
        case "APNG":
        case "webp":
        case "WEBP":
        case "JPEG":
        case "GIF":
          i = "image";
          break;
        case "mp3":
        case "MP3":
        case "ogg":
        case "OGG":
        case "m4a":
        case "M4A":
          i = "sound";
          break;
        case "mp4":
        case "MP4":
        case "webm":
        case "WEBM":
        case "MKV":
        case "mkv":
        case "ogv":
        case "OGV":
          i = "movie";
      }
      return i;
    },
    reflesh_folder: function () {
      var e = this.j_view.find(".select-folder-add-file");
      e.empty();
      var i = app.io.getItems(this.dir_path);
      e.append('<option value="">' + $.s(" (Нет Папок) ") + "</option>");
      for (var t = 0; t < i.length; t++) {
        var a = i[t];
        "directory" == a.type &&
          e.append('<option value="' + a.item + '">' + a.item + "</option>");
      }
      e.val(this.data.folder), app.view.current_view_obj.refleshSelectedTree();
    },
    createImageHtml: function (e) {
      return (
        '           <li class="select_file_name" data-kind="image" data-path="' +
        e.path +
        '" data-type="' +
        e.type +
        '" data-file="' +
        this.data.folder +
        "/" +
        e.item +
        '" >                  <div class="img-box"><img src="' +
        e.path +
        '" alt="' +
        e.path +
        '"></div>                  <div class="img-cover">                    <span class="close tb-i-time button_file_remove" title="' +
        $.s("Удалить файл") +
        '"></span>                    <div class="text">' +
        e.item +
        "</div>                  </div>           </li>"
      );
    },
    createSoundHtml: function (e) {
      console.log(e);
      return (
        '<li class="select_file_name" data-kind="sound" data-path="' +
        e.path +
        '" data-type="' +
        e.type +
        '" data-file="' +
        this.data.folder +
        "/" +
        e.item +
        '">                  <div class="img-box"><audio src="' +
        e.path +
        '" controls></audio></div>                  <div class="img-cover">                    <span class="close tb-i-time button_file_remove" title="' +
        $.s("Удалить файл") +
        '"></span>                    <div class="text">' +
        e.item +
        "</div>                  </div>                </li>                "
      );
    },
    createMovieHtml: function (e) {
      return (
        '<li class="select_file_name" data-kind="movie" data-type="' +
        e.type +
        '" data-path="' +
        e.path +
        '" data-file="' +
        this.data.folder +
        "/" +
        e.item +
        '">                  <div class="img-box"><video src="' +
        e.path +
        '" controls=""></video></div>                  <div class="img-cover">                    <span class="close tb-i-time button_file_remove" title="' +
        $.s("Удалить файл") +
        '"></span>                    <div class="text">' +
        e.item +
        "</div>                  </div>                </li>                "
      );
    },
  })),
  (Builder.Window.SelectMaterial = Builder.Window.Base.extend({
    defaults: {},
    j_view: {},
    dir_path: "",
    data: {},
    selected_file_name: "",
    selected_category: "bg",
    current_page: 1,
    initialize: function (e, i, t) {
      (this.j_view = e), (this.call_back = t), (this.data = i);
      var a = this;
      this.j_view.find(".select-category").change(function () {
        (a.selected_category = $(this).val()), a.loadJson(1);
      }),
        this.loadJson(1);
    },
    loadJson: function (e) {
      var i = this,
        t = this.selected_category;
      $.ajax({
        type: "GET",
        url:
          "http://material.wcoco.jp/materials/download/page:" + e + "?c=" + t,
        dataType: "json",
        success: function (e) {
          e.length;
          i.showFiles(e);
        },
      });
    },
    showFiles: function (e) {
      for (
        var i = this,
          t = e.Material,
          a = $("<ul class='list-unstyled list-add-file'></ul>"),
          n = (this.j_view.find(".select-folder-add-file"), 0);
        n < t.length;
        n++
      ) {
        var s = t[n].Material,
          o = "";
        switch (this.selected_category) {
          case "bg":
            o = this.createImageHtml(s);
            break;
          case "chara":
          case "live2d":
            o = this.createCharaHtml(s);
            break;
          case "sound":
          case "bgm":
            o = this.createSoundHtml(s);
        }
        a.append($(o));
      }
      var r,
        l,
        d = e.Paging.Material,
        c = e.Paging.Material.page;
      ((i.current_page = c), 1 == d.nextPage)
        ? ((r = this.j_view.find("#page_next")).unbind("click"),
          r.removeClass("no-links"),
          r.click(function () {
            i.current_page++, i.loadJson(i.current_page);
          }))
        : (r = this.j_view.find("#page_next")).addClass("no-links");
      1 == d.prevPage
        ? ((l = this.j_view.find("#page_prev")).unbind("click"),
          l.removeClass("no-links"),
          l.click(function () {
            i.current_page--, i.loadJson(i.current_page);
          }))
        : (l = this.j_view.find("#page_prev")).addClass("no-links");
      a.find("li").hover(
        function () {
          $(this).find(".info-box").show();
        },
        function () {
          $(this).find(".info-box").hide();
        }
      ),
        a.find(".link_author").click(function () {
          var e = $(this).attr("data-author-url");
          app.gui.shell("url", e);
        }),
        a.find("li").dblclick(function () {
          var e = $(this).attr("data-path"),
            t = $(this).attr("data-file"),
            a = "http://material.wcoco.jp/download/" + e,
            n = "",
            s = null;
          if ("bg" == i.selected_category)
            (n = app.getDataPath() + "bgimage/" + t),
              (s = function (e, i) {
                i.append(
                  '<img style="position:absolute;left:55px;top:30px;width:60px" class="download_ok" src="_new/assets/img/download_ok.png" />'
                ),
                  i.find(".downloading").remove();
              });
          else if ("chara" == i.selected_category) {
            if (app.config.project_config.map_chara[t])
              return (alertNoBtn("Внимание", "Имя персонажа \"" + t + "\" уже существует.", 3000, "bottom-right", "warning", "var(--vne-warning-alert-color)"),
                !1
              );
            (n = app.getDataPath() + "fgimage/chara/" + t + ".zip"),
              (s = function (e, i) {
                var a = app.getDataPath() + "fgimage/chara/";
                new (require("adm-zip"))(n).extractAllTo(a, !0);
                setTimeout(function () {
                  i.append(
                    '<img style="position:absolute;left:55px;top:30px;width:60px" class="download_ok" src="_new/assets/img/download_ok.png" />'
                  ),
                    i.find(".downloading").remove();
                  var e = t,
                    n = 0,
                    s = app.config.project_config.map_chara;
                  for (key in s) n < s[key] && (n = s[key]);
                  (n += 1),
                    (s[e] = n),
                    app.config.setProjectConfig("map_chara", s);
                  var o = app.config.getCharaPath(e);
                  app.io.copy(a + t + "/", o + "/"),
                    app.io.rmdir(a + t),
                    app.io.rmdir(a + t + ".zip");
                }, 5e3);
              });
          } else {
            if ("live2d" != i.selected_category) return;
            if (app.config.project_config.map_chara[t])
              return (alertNoBtn("Внимание", "Имя персонажа \"" + t + "\" уже существует.", 3000, "bottom-right", "warning", "var(--vne-warning-alert-color)"),
                !1
              );
            (n = app.getDataPath() + "others/live2d/assets/" + t + ".zip"),
              (s = function (e, i) {
                var a = app.getDataPath() + "others/live2d/assets/";
                new (require("adm-zip"))(n).extractAllTo(a, !0);
                setTimeout(function () {
                  i.append(
                    '<img style="position:absolute;left:55px;top:30px;width:60px" class="download_ok" src="_new/assets/img/download_ok.png" />'
                  ),
                    i.find(".downloading").remove();
                  var e = t,
                    a = {
                      filepath: "data/others/live2d/assets/" + e + "/",
                      modeljson: e + ".model.json",
                    };
                  (app.live2d.models[e] = a),
                    app.live2d.loadModel(),
                    app.live2d.saveModel(),
                    app.io.rmdir(n);
                }, 5e3);
              });
          }
          var o = $(this);
          app.io.exists(n)
            ? alertFunc("Внимание", "\"" + t + "\" уже существует. Перезаписать?", "question", "var(--vne-question-alert-color)").then((result) => {
                if (result.isConfirmed) {
                  i.downloadFile(o, a, n, s);
                  return !1;
                }
              })
            : i.downloadFile(o, a, n, s);
        }),
        this.j_view.find(".file_select_list_area").empty(),
        this.j_view.find(".file_select_list_area").append(a);
    },
    downloadFile: function (e, i, t, a) {
      e.append(
        '<img style="position:absolute;left:55px;top:50px" class="downloading" src="_new/assets/img/downloading.gif" />'
      ),
        e.css("opacity", 0.5);
      var n = fs.createWriteStream(t);
      require("http")
        .get(i, function (i) {
          i.pipe(n),
            i.on("end", function () {
              setTimeout(function () {
                "function" == typeof a && a(t, e), n.close();
              }, 1e3);
            }),
            i.on("error", function () {
              n.close();
            });
        })
        .on("error", function (e) {
          alertNoBtn("Внимание", "Ошибка скачивания", 3000, "bottom-right", "error", "var(--vne-error-alert-color)")
        });
    },
    reflesh_folder: function () {
      this.j_view.find(".select-category");
      j_folder_select.empty();
      var e = app.io.getItems(this.dir_path);
      j_folder_select.append(
        '<option value="">' + $.s(" (Нет Папок) ") + "</option>"
      );
      for (var i = 0; i < e.length; i++) {
        var t = e[i];
        "directory" == t.type &&
          j_folder_select.append(
            '<option value="' + t.item + '">' + t.item + "</option>"
          );
      }
      j_folder_select.val(this.data.folder),
        app.view.current_view_obj.refleshSelectedTree();
    },
    createImageHtml: function (e) {
      return (
        '           <li data-kind="image" data-file="' +
        e.file +
        '" data-type="' +
        this.selected_category +
        '" data-path="' +
        this.selected_category +
        "/" +
        e.file +
        '" >                  <div class="info-box" style="display:none"><div style="position:absolute;bottom:0px;hegiht:30px;width:100%;padding:3px;background-color:black;color:gray">' +
        e.file +
        '<br /><a class="link_author" data-author-url="' +
        e.author_url +
        '" href="javascript:void(0)">' +
        e.author_name +
        '</a></div></div>                  <div class="img-box"><img src="http://material.wcoco.jp/download/' +
        this.selected_category +
        "/" +
        e.file +
        '" alt="' +
        e.file +
        '"></div>           </li>'
      );
    },
    createCharaHtml: function (e) {
      return (
        '            <li data-kind="image" data-file="' +
        e.file +
        '" data-type="' +
        this.selected_category +
        '" data-path="' +
        this.selected_category +
        "/" +
        e.file +
        "/" +
        e.file +
        '.zip" >                         <div class="info-box" style="display:none"><div style="position:absolute;bottom:0px;hegiht:30px;width:100%;padding:3px;background-color:black;color:gray">' +
        e.file +
        '<br /><a class="link_author" data-author-url="' +
        e.author_url +
        '" href="javascript:void(0)">' +
        e.author_name +
        '</a></div></div>                         <div class="img-box"><img src="http://material.wcoco.jp/download/' +
        this.selected_category +
        "/" +
        e.file +
        '/thumb.png" alt="' +
        e.file +
        '"></div>            </li>'
      );
    },
    createSoundHtml: function (e) {
      return (
        '<li data-kind="sound" data-path="' +
        e.path +
        '" data-type="' +
        e.type +
        '" data-file="' +
        this.data.folder +
        "/" +
        e.item +
        '">                  <div class="img-box"><audio src="' +
        e.path +
        '" controls></audio></div>                  <div class="img-cover">                    <span class="close tb-i-time button_file_remove" title="' +
        $.s("Удалить файл") +
        '"></span>                    <div class="text">' +
        e.item +
        "</div>                  </div>                </li>                "
      );
    },
  })),
  (Builder.Window.ComponentSetting = Builder.Window.Base.extend({
    defaults: { view_id: "ComponentSetting" },
    j_view: {},
    map_plugin: { live2d: { confirm_url: $.s("live2d_confirm_url") } },
    initialize: function (e, i) {
      this.j_view = e;
      var t = this,
        a = app.config.project_config.plugin;
      for (key in a)
        1 == a[key] &&
          this.j_view.find(".check_" + key).attr("checked", "checked");
      this.j_view.find(".check_plugin").change(function () {
        var e = $(this),
          i = e.attr("data-plugin"),
          a = t.map_plugin[i];
        a.confirm_url
          ? 1 == e.prop("checked")
            ? $.confirm(
                $.s(
                  "Эти компоненты требуют принятия лицензионного соглашения Live2D SDK."
                ) +
                  "<br /><br /><a target='_blank' href='" +
                  a.confirm_url +
                  "'>" +
                  $.s("Live2D SDK Лицензионное соглашение <BR>") +
                  "</a><br />" +
                  $.s("Принять?"),
                function () {
                  t.checkPlugin(i, e.prop("checked")),
                    "live2d" == i &&
                      app.io.getFileFromURL(
                        "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
                        app.dir_path +
                          "system/live2d_v4/live2d/driver/live2dcubismcore.min.js",
                        function () {
                          app.io.copy(
                            app.dir_path + "system/live2d_v4/live2d",
                            app.getDataPath() + "others/plugin/live2d"
                          ),
                            app.io.copy(
                              app.dir_path + "system/live2d_v4/make.ks",
                              app.getDataPath() + "scenario/make.ks"
                            ),
                            app.refleshComponentIcons(
                              app.view.current_view_obj.j_view
                            ),
                              alertNoBtn("Выполнено", "", 3000, "bottom-right", "success", "var(--vne-success-alert-color)")
                        }
                      );
                },
                function () {
                  e.prop("checked", "");
                }
              )
            : ("live2d" == i &&
                app.io.copy(
                  app.dir_path + "system/tyrano/data/scenario/make.ks",
                  app.getDataPath() + "scenario/make.ks"
                ),
              t.checkPlugin(i, e.prop("checked")),
              app.refleshComponentIcons(app.view.current_view_obj.j_view))
          : t.checkPlugin(i, e.prop("checked"));
      });
    },
    checkPlugin: function (e, i) {
      app.component.checkPlugin(e, i, $("body")),
        (app.config.project_config.plugin[e] = 1 == i ? 1 : 0),
        app.config.saveProjectConfig();
    },
    show: function () {},
  })),

  (Builder.Window.CharaManage = Builder.Window.Base.extend({
    defaults: { view_id: "CharaManage" },
    j_view: {},
    map_chara: {},
    chara_path: "",
    selected_chara_name: "",
    selected_img_name: "",
    selected_img_path: "",
    initialize: function (e, i) {
      this.j_view = e;
      var t = this;
      for (key in ((this.map_chara = app.config.project_config.map_chara),
      this.map_chara))
        this.j_view
          .find(".select_chara")
          .append('<option value="' + key + '">' + key + "</option>");
      this.j_view.find(".button_chara_add").click(function () {
        if ("standard" == global_build || "trial" == global_build) {
          var e = 0;
          for (var i in app.config.project_config.map_chara) e++;
          if ("standard" == global_build) {
            if (e >= 10)
              return (
                $.alert(
                  $.s(
                    "Стандартная верси ограничивает количество персонажей, которые можно создать, до 10."
                  )
                ),
                !1
              );
          } else if ("trial" == global_build && e >= 3)
            return (
              $.alert(
                $.s("В демо-версии можно добавить только 3 персонажа")
              ),
              !1
            );
        }
        var charName = $.trim($(".text_chara_add").val());
        return "" === (charName = $.rmspace(charName))
          ? (alertNoBtn($.s("Внимание!"), $.s("Введите имя персонажа!"), 3000, "bottom-right", "warning", "var(--vne-warning-alert-color)"), !1)
          : app.config.project_config.map_chara[charName]
          ? (alertNoBtn($.s("Внимание!"), $.s("Персонаж" + " \"" + charName + "\" " + "уже существует!"), 3000, "bottom-right", "warning", "var(--vne-warning-alert-color)"), !1)
          : (t.addChara(charName), void $(".text_chara_add").val(""));
      }),
        this.j_view.find(".button_chara_remove").click(function () {
          var e = t.j_view.find(".select_chara").children(":selected").val();
          if ("" === t.selected_chara_name) return !1;
          $.confirm(
            $.s("Персонаж「") +
              t.selected_chara_name +
              $.s("」будет удалён. Продолжить?"),
            function () {
              t.removeChara(e);
            },
            function () {
              return !1;
            }
          );
        }),
        this.j_view.find(".select_chara").change(function () {
          var e = t.j_view.find(".select_chara").children(":selected").val();
          t.showCharas(e);
        }),
        this.j_view.find(".file_draggable").bind("drop", function (e) {
          if ("" === t.selected_chara_name)
            return alertNoBtn("Внимание", "Персонаж не выбран", 3000, "bottom-right", "warning", "var(--vne-warning-alert-color)"), !1;
          var i = e.originalEvent.dataTransfer.files;
          t.copyChara(i),
            t.j_view.find(".file_draggable").css("border", ""),
            t.j_view.find(".add-file-upload-block").removeClass("active"),
            t.showCharas(t.selected_chara_name),
            e.preventDefault();
        }),
        this.j_view.find(".file_draggable").bind("dragover", function (e) {
          t.j_view.find(".file_draggable").css("border", "dashed 3px gray"),
            t.j_view.find(".add-file-upload-block").addClass("active"),
            e.preventDefault();
        }),
        this.j_view.find(".file_draggable").bind("dragleave", function (e) {
          t.j_view.find(".file_draggable").css("border", ""),
            t.j_view.find(".add-file-upload-block").removeClass("active"),
            e.preventDefault();
        }),
        this.j_view.find("#button_file_remove").click(function () {});
    },
    copyChara: function (e) {
      for (var i = this, t = 0; t < e.length; t++) {
        var a = e[t],
          n = $.replaceAll(a.name, " ", "_");
        if (app.io.exists(i.chara_path + n))
          confirm(
            $.s("「") +
              n +
              $.s("」уже существует. Перезаписать?")
          ) && app.io.copy(a.path, i.chara_path + n);
        else {
          var s = $.getExt(n);
          -1 != _.indexOf(["png", "PNG", "jpg", "JPG", "gif", "GIF", "apng", "APNG", "webp", "WEBP"], s) &&
            app.io.copy(a.path, i.chara_path + n);
        }
      }
    },
    addChara: function (e) {
      var i = 0;
      for (key in this.map_chara)
        i < this.map_chara[key] && (i = this.map_chara[key]);
      (i += 1),
        (this.map_chara[e] = i),
        app.config.setProjectConfig("map_chara", this.map_chara);
      var t = app.config.getCharaPath(e);
      app.io.mkdir(t),
        this.j_view
          .find(".select_chara")
          .append('<option value="' + e + '">' + e + "</option>");
    },
    removeChara: function (e) {
      if ("" == $.trim(e)) return !1;
      app.io.rmdir(app.config.getCharaPath(e)),
        delete this.map_chara[e],
        app.config.setProjectConfig("map_chara", this.map_chara),
        this.j_view
          .find(".select_chara")
          .children("option[value=" + e + "]")
          .remove(),
        this.j_view.find(".chara_image_area").empty();
    },
    createChara: function (e) {},
    showCharas: function (e) {
      var i = this;
      (this.selected_chara_name = e),
        (this.chara_path = app.config.getCharaPath(e) + "/");
      for (
        var t = app.io.getItems(this.chara_path),
          a = $(
            "<div><div class='file_name help-block'><span>" +
              $.s("\"") +
              e +
              $.s("\" изображения сохранены. Перетаскивайте ниже, чтобы добавить ещё.") +
              "｜</span></div><ul class='ace-thumbnails list-unstyled list-add-file'>  </ul></div>"
          ),
          n = $("<div><a href='#' id='sbm_delete_chara_img'></a></div>"),
          s = 0;
        s < t.length;
        s++
      ) {
        var o,
          r = t[s];
        $.getExt(r.path);
        (o = this.createImageHtml(r)), a.find("ul").append($(o));
      }
      var l = $(
        "<input class='btn-default' style='margin-top:10px' type='button' value='" +
          $.s("Выбрать") +
          "' />"
      );
      0 == t.length
        ? (a
            .find(".file_name")
            .html(
              "<div class='add-file-upload-block'>" +
                $.s("Персонаж \"") +
                e +
                $.s("\" не имеет никакого доступного состояния.") +
                "<br >" +
                $.s("Перетащите сюда файл изображения.") +
                "</div>"
            ),
          a.find(".add-file-upload-block").append(l))
        : a.find(".file_name").append(l),
        l.click(function () {
          var e = $('<input type="file" />');
          e.change(function (e) {
            var t = e.target.files;
            i.copyChara(t), i.showCharas(i.selected_chara_name);
          }),
            e.trigger("click");
        }),
        a.find(".close").click(function () {
          var e = $(this).closest("a").attr("data-file"),
            t = $(this).closest("a").attr("data-path");
          $.confirm(
            e + $.s("будет удалён. Продолжить?"),
            function () {
              app.io.rmdir(t), i.showCharas(i.selected_chara_name);
            },
            function () {
              return !1;
            }
          );
        }),
        this.j_view.find("#chara_selected_file_area").append(n),
        this.j_view.find(".chara_image_area").empty(),
        this.j_view.find(".chara_image_area").append(a),
        app.view.current_view_obj.refleshSelectedTree();
    },
    createImageHtml: function (e) {
      return (
        '<li>                    <a href="#" data-rel="colorbox" data-kind="image" data-path="' +
        e.path +
        '" data-type="' +
        e.type +
        '" data-file="' +
        e.item +
        '" class="window_select_image cboxElement img-box">                        <img alt="" src="' +
        e.path +
        '">                        <div class="img-cover">                            <span class="close tb-i-time" title="' +
        $.s("Показать картинку") +
        '"></span>                            <div class="text">' +
        e.item +
        "</div>                        </div>                    </a>                </li>"
      );
    },
    showContextMenu: function () {},
    show: function () {},
  })),
  (Builder.Window.FontManage = Builder.Window.Base.extend({
    defaults: { view_id: "FontManage" },
    j_view: {},
    map_font: {},
    selected_font_name: "",
    initialize: function (e, i) {
      this.j_view = e;
      var t = this;
      (this.map_font = app.config.project_config.map_font),
        this.j_view.find(".button_font_add").click(function () {
          var e = $('<input type="file" />');
          e.change(function (e) {
            var i = e.target.files[0],
              a = i.path,
              n = i.name;
            if (-1 != n.indexOf(".ttf") || -1 != n.indexOf(".TTF")) {
              filename = $.replaceAll(n, ".TTF", ".ttf");
              var s = $.replaceAll(filename, ".ttf", ""),
                o = app.getDataPath() + "others/" + s;
              app.io.copy(a, o + ".ttf");
              var r = a.replace(".ttf", ".eot");
              app.io.exists(r) && app.io.copy(r, o + ".eot");
              var l = a.replace(".ttf", ".woff");
              app.io.exists(l) && app.io.copy(l, o + ".woff"),
                (app.config.project_config.map_font[s] = "true"),
                  alertNoBtn("Успех", "Шрифт добавлен", 3000, "bottom-right", "success", "var(--vne-success-alert-color)"),
                app.config.saveProjectConfig(),
                app.config.saveFontCss(),
                app.clearCache(),
                t.loadFont();
            } else alertNoBtn($.s("Внимание"), $.s("Поддерживается только ttf формат шрифта"), 3000, "bottom-right", "info", "var(--vne-info-alert-color)");
          }),
            e.trigger("click");
        }),
        this.j_view.find(".button_font_remove").click(function () {
          var e = t.j_view.find(".select_font").children(":selected").val();
          if (void 0 === e) return !1;
          $.confirm(
            $.s("Шрифт「") + e + $.s("」будет удалён. Продолжить?"),
            function () {
              t.removeFont(e);
            },
            function () {
              return !1;
            }
          );
        }),
        this.j_view.find(".select_font").change(function () {
          var e = t.j_view.find(".select_chara").children(":selected").val();
          t.showFont(e);
        }),
        this.loadFont();
    },
    loadFont: function () {
      for (key in (this.j_view.find(".select_font").empty(),
      (this.map_font = app.config.project_config.map_font),
      this.map_font)) {
        this.j_view
          .find(".select_font")
          .append('<option value="' + key + '">' + key + "</option>");
        var e = app.tyrano.project_name,
          i = document.createElement("style"),
          t = require("path")
            .resolve(app.exe_path + "/myproject/" + e + "/data/others/")
            .replace(/\\/g, "/");
        i.appendChild(
          document.createTextNode(
            "                @font-face {                    font-family: '" +
              key +
              "';                    src: url('" +
              t +
              "/" +
              key +
              ".ttf') format('truetype'),                    url('" +
              t +
              "/" +
              key +
              ".woff') format('woff'),                    url('" +
              t +
              "/" +
              key +
              ".eot') format('eot')                    ;                    font-weight:normal;font-style:normal;                }                "
          )
        ),
          document.head.appendChild(i);
      }
    },
    removeFont: function (e) {
      if ("" == $.trim(e)) return !1;
      for (
        var i = $.trim(e),
          t = app.getDataPath() + "others/" + i,
          a = ["ttf", "eot", "woff"],
          n = 0;
        n < a.length;
        n++
      ) {
        var s = t + "." + a[n];
        app.io.exists(s) && app.io.rmdir(s);
      }
      delete this.map_font[e],
        app.config.setProjectConfig("map_font", this.map_font),
        this.j_view
          .find(".select_font")
          .children("option[value=" + e + "]")
          .remove(),
        this.j_view.find(".preview_font_area").empty(),
        app.clearCache(),
        this.loadFont();
    },
    showFont: function (e) {
      (this.selected_font_name = e),
        this.j_view.find("#preview_font_area").empty();
      var i = "";
      i =
        "ja" == global_lang
          ? "abcdefghijk<br />あいうえおかきくけこさしすせそ"
          : "abcdefghijkl<br />mnopqrstuvwxyz<br />ABCDEFGHIJKL<br/>АБВГДЕЁЖЗ<br> абвгдеёжз";
      var t = $("<div style='float:left;font-size:24px'>" + i + "</div>"),
        a = $("<div><a href='#' id='sbm_delete_chara_img'></a></div>");
      t.css("font-family", e),
        this.j_view.find("#preview_font_area").append(t),
        this.j_view.find("#chara_selected_file_area").append(a);
    },
    createImageHtml: function (e) {
      return (
        '<li>                    <a href="#" data-rel="colorbox" data-kind="image" data-path="' +
        e.path +
        '" data-type="' +
        e.type +
        '" data-file="' +
        e.item +
        '" class="window_select_image cboxElement img-box">                        <img alt="" src="' +
        e.path +
        '">                        <div class="img-cover">                            <span class="close tb-i-time" title="' +
        $.s("Показать картинку") +
        '"></span>                            <div class="text">' +
        e.item +
        "</div>                        </div>                    </a>                </li>"
      );
    },
    showContextMenu: function () {},
    show: function () {},
  })),
  (Builder.Window.VarManage = Builder.Window.Base.extend({
    defaults: { view_id: "VarManage" },
    j_view: {},
    selected_key: "",
    map_var: {},
    initialize: function (e, i) {
      this.j_view = e;
      var t = this;
      (this.map_var = app.config.project_config.map_var),
        t.showVarList(),
        this.j_view.find(".text_chara_add").keyup(function () {
          var e = $(this).val();
          t.showVarList(e);
        }),
        this.j_view.find(".button_chara_add").click(function () {

          const textInput = $.trim(t.j_view.find(".text_chara_add").val());

          if (textInput === "") {
            alertNoBtn(
                $.s("Внимание"),
                $.s("Введите имя переменной"),
                3000,
                "bottom-right",
                "info",
                "var(--vne-info-alert-color)"
            );
            return false;
          }

          const firstChar = textInput.charAt(0);
          if (/\d/.test(firstChar)) {
            alertNoBtn(
                $.s("Внимание!"),
                $.s("Переменная не должна начинаться с цифры!"),
                3000,
                "bottom-right",
                "info",
                "var(--vne-info-alert-color)"
            );
            return false;
          }

          const formattedInput = $.replaceAll(textInput, " ", "_");

          if (t.map_var[formattedInput]) {
            alertNoBtn(
                $.s("Внимание!"),
                $.s("Имя переменной \"${formattedInput}\" уже существует"),
                3000,
                "bottom-right",
                "warning",
                "var(--vne-warning-alert-color)"
            );
            return false;
          }

          t.map_var[formattedInput] = {
            val: "",
            kind: "f"
          };

          t.j_view.find(".text_chara_add").val("");
          t.showVarList();
          t.updateVar();
          t.j_view.find(".select_chara").val(formattedInput);
          t.j_view.find(".select_chara").children(":selected").trigger("change");

        }),
        this.j_view.find(".button_chara_remove").click(function () {
          var e = t.j_view.find(".select_chara").children(":selected").val();

            if (
                e === "langTranslate"
                || e === "achievementSystem"
                || e === "realTime"
                || e === "fakeTime"
                || e === "fakeDay"
                || e === "fakeMonth"
                || e === "fakeYear"
                || e === "realDay"
                || e === "fakeTimeSpeed"
            ) {
            return alertNoBtn(
                $.s("Внимание!"),
                $.s("Данная переменная зарезервирована, и удалить ее нельзя. Пожалуйста, не изменяйте ее в менеджере переменных."),
                5000, "bottom-right", "warning", "var(--vne-warning-alert-color)")
          }
          return (
            null != e &&
            "" !== t.selected_chara_name &&
            void alertFunc($.s("Внимание!"),
                $.s("Вы уверены, что хотите удалить переменную \"" + e + "\""), "question", "var(--vne-question-alert-color)").then((result) => {
              if (result.isConfirmed) {
                delete t.map_var[e],
                    t.j_view.find(".var_set_area").hide(),
                    t.updateVar(),
                    t.showVarList();
                return !1;
              }
            })
          );
        }),
        this.j_view.find(".select_chara").change(function () {
          var e = t.j_view.find(".select_chara").children(":selected").val();
          t.showVar(e);
        }),
        this.j_view.find(".var_val").change(function () {
          var e = $(this).val();
          (e = $.trim(e)), (t.map_var[t.selected_key].val = e), t.updateVar();
        }),
        this.j_view.find(".check_val").change(function () {
          $(this).prop("checked")
            ? ((t.map_var[t.selected_key].kind = "sf"),
              t.j_view.find(".var_val").val(""),
              t.j_view.find(".var_val").prop("disabled", !0))
            : ((t.map_var[t.selected_key].kind = "f"),
              t.j_view.find(".var_val").prop("disabled", !1)),
            t.updateVar();
        });
    },
    showVarList: function (e) {
      for (key in (this.j_view.find(".select_chara").empty(), this.map_var))
        e
          ? -1 != key.indexOf(e) &&
            this.j_view
              .find(".select_chara")
              .append('<option value="' + key + '">' + key + "</option>")
          : this.j_view
              .find(".select_chara")
              .append('<option value="' + key + '">' + key + "</option>");
    },
    showVar: function (e) {
      (this.selected_key = e),
        this.j_view.find(".block_init").hide(),
        this.j_view.find(".var_set_area").show(),
        this.j_view.find(".var_val").val(this.map_var[e].val),
        "sf" == this.map_var[e].kind
          ? this.j_view.find(".check_val").prop("checked", !0)
          : this.j_view.find(".check_val").prop("checked", !1);
    },
    updateVar: function () {
      app.config.setProjectConfig("map_var", this.map_var);
    },
    removeVar: function (e) {},
      show: function () {},
  })),
  (Builder.Window.PluginManage = Builder.Window.Base.extend({
    defaults: { view_id: "PluginManage" },
    j_view: {},
    map_config: {},
    initialize: function (e, i, t) {
      (this.j_view = e), (this.call_back = t), (this.data = i);
      var a = this;
      (this.map_config = app.tyrano.config), this.initPlugin();
      var n = this.j_view.find(".select_plugin");
      "standard" == global_build && this.j_view.find(".text_not_pro").show();
      var s = "dlc/plugin",
        o = {};
      let r = this.j_view.find(".select_plugin_dlc");
      if (app.io.exists(app.exe_path + s)) {
        var l = app.io.getDirectories(app.exe_path + s);
        for (var d in l) {
          var c = l[d].item,
            p = app.io.loadJson(app.exe_path + s + "/" + c + "/builder.json");
          (o[c] = p),
            r.append(
              '<option value="' +
                c +
                '">' +
                o[c].name[global_lang] +
                "</option>"
            );
        }
      }
      this.j_view.find(".button_plugin_lib_open").on("click", function () {
        var e = $.s("plugin_library_url");
        app.gui.shell("url", e);
      }),
        this.j_view.find(".check_plugin_dlc").on("click", (e) => {
          $(e.currentTarget).prop("checked")
            ? this.j_view.find(".area_select_plugin_dlc").show()
            : this.j_view.find(".area_select_plugin_dlc").hide();
        }),
        this.j_view
          .find(".navbar-nav")
          .find("li")
          .click(function () {
            a.j_view.find("li").removeClass("active"),
              $(this).addClass("active");
            var e = $(this).attr("data-nav");
            a.j_view.find(".area").hide(), a.j_view.find(".area_" + e).show();
          }),
        this.j_view.find(".button_plugin_add").on("click", function () {
          if ("steam" != global_build && n.children().length >= 2)
            return (
              $.alertProOnly(
                "スタンダード版はプラグインの上限が２つです。PRO版を確認しますか？"
              ),
              !1
            );
          if (0 == a.j_view.find(".check_plugin_dlc").prop("checked")) {
            var e = $('<input type="file" />');
            e.change(function (e) {
              var i = e.target.files[0],
                t = i.path,
                n = $.getExt(i.name),
                s = i.name.replace("." + n, "");
              if ("tbp" !== n)
                return (alertNoBtn($.s("Внимание!"),
                    $.s("Поддерживается только .tbp формат плагина"), 3000, "bottom-right", "error", "var(--vne-error-alert-color)"),
                  !1
                );
              a.addPlugin(t, s);
            }),
              e.trigger("click");
          } else {
            let e = r.val(),
              i = o[e].tbp,
              t = app.exe_path + s + "/" + e + "/" + i;
            a.addPlugin(t, e);
          }
        }),
        this.j_view.find(".button_plugin_remove").on("click", function () {
          var e = n.val();
          if ("" == $.isNull(e))
            return alertNoBtn($.s("Внимание!"), $.s("Выберите плагин"), 3000, "bottom-right", "info", "var(--vne-info-alert-color)"), !1;
          delete app.plugin.map_plugin[e],
            n.children("option[value=" + e + "]").remove();
          var i = app.plugin.plugin_path;
          "" !== e && app.io.rmdir(i + "/" + e),
            a.j_view.find(".plugin_title").html(""),
            a.j_view.find(".plugin_text").html(""),
            a.j_view.find(".plugin_img").attr("src", ""),
            a.j_view.find("#textarea_add_cmp").html(""),
            app.plugin.loadPlugins(),
              alertNoBtn($.s("Успех!"), $.s("Плагин удален"), 3000, "bottom-right", "success", "var(--vne-success-alert-color)")
        }),
        n.on("change", function (e) {
          a.j_view.find(".plugin_img").attr("src", "");
          var i = app.plugin.plugin_path,
            t = n.val();
          if (t) {
            var s = app.plugin.map_plugin[t];
            a.j_view.find(".plugin_title").html(s.name),
              a.j_view.find(".plugin_text").html(s.plugin_text),
              "no_image" == s.plugin_img
                ? a.j_view
                    .find(".plugin_img")
                    .attr("src", "_new/assets/img/no_image.jpg")
                : a.j_view
                    .find(".plugin_img")
                    .attr("src", i + "/" + t + "/" + s.plugin_img),
              a.j_view.find(".plugin_img").show();
            var o = s.defineComponents(),
              r = "",
              l = 0;
            for (d in o) {
              l++;
              var c = o[d];
              (r += l + ".「" + c.info.name + "」\n"),
                (r += c.info.help + "\n\n");
            }
            a.j_view.find("#textarea_add_cmp").html(r);
          }
        }),
        n.find("option:first").prop("selected", !0),
        n.trigger("change");
    },
    addPlugin: function (e, i) {
      var t = this,
        a = app.plugin.plugin_path,
        n = new (require("adm-zip"))(e);
      $.showLoading(), n.extractAllTo(a, !0);
      try {
        require(a + "/" + i + "/" + i + ".builder.js");
      } catch (e) {
        $.alert($.s("Плагин не удается загрузить"));
      }
      $.hideLoading(), app.plugin.loadPlugins(), t.initPlugin();
      var s = app.plugin.getPlugin(i);
      "function" == typeof s.triggerInstall && s.triggerInstall(),
          alertNoBtn($.s("Успех!"), $.s("Установка плагина \"" + s.name + "\" завершена"), 3000, "center", "success", "var(--vne-success-alert-color)"),
        t.j_view.find(".select_plugin").val(i),
        t.j_view.find(".select_plugin").trigger("change");
    },
    initPlugin: function () {
      var e = !1;
      "steam" == global_build && (e = !0);
      var i = app.plugin.map_plugin,
        t = this.j_view.find(".select_plugin");
      t.empty();
      var a = 0;
      for (key in i) {
        if (0 == e && a >= 2) {
          $.alertProOnly(
            "スタンダード版はプラグインの上限が２つです。PRO版を確認しますか？"
          );
          break;
        }
        i[key].name;
        t.append('<option value="' + key + '">' + i[key].name + "</option>"),
          a++;
      }
    },
    show: function (e) {},
  })),
  (Builder.Window.FukiManage = Builder.Window.Base.extend({
    defaults: { view_id: "FukiManage" },
    j_view: {},
    map_chara: {},
    map_fuki: {},
    map_config: {},
    select_chara_name: "",
    initialize: function (e, i, t) {
      (this.j_view = e), (this.call_back = t), (this.data = i);
      var a = this;
      (this.map_config = app.tyrano.config),
        (this.j_select_chara = this.j_view.find(".select_chara")),
        this.refleshChara(),
        (this.map_fuki = app.config.project_config.map_fuki),
        this.j_select_chara.on("change", (e) => {
          if ("" != this.select_chara_name) {
            let e = $.extend(
              this.map_fuki[this.select_chara_name],
              this.getDefaultFuki()
            );
            for (var i in e) {
              let e = this.j_view.find("[data-key='" + i + "']");
              e.hasClass("color_text")
                ? (this.map_fuki[this.select_chara_name][i] = e
                    .val()
                    .replace("#", "0x"))
                : (this.map_fuki[this.select_chara_name][i] = e.val());
            }
          }
          let t = this.j_select_chara.val();
          (this.select_chara_name = t),
            void 0 === this.map_fuki[t] &&
              (this.map_fuki[t] = this.getDefaultFuki());
          let a = this.map_fuki[t];
          for (var i in a) {
            let e = this.j_view.find("[data-key='" + i + "']");
            e.hasClass("color_text")
              ? e.minicolors("value", a[i].replace("0x", "#"))
              : e.val(a[i]);
          }

          this.map_fuki[t].bgImage = localStorage.getItem("bgImagePathFuki") || "";
          this.j_view.find(".select_fix_width").trigger("change");
        }),
        this.j_view
          .find(".navbar-nav")
          .find("li")
          .click(function () {
            a.j_view.find("li").removeClass("active"),
              $(this).addClass("active");
            var e = $(this).attr("data-nav");
            a.j_view.find(".area").hide(), a.j_view.find(".area_" + e).show();
          }),
        this.j_view.find(".button_function_chara_manage").on("click", (e) => {
          app.window.show("CharaManage", {
            width: 800,
            height: 800,
            title: $.s("Менеджер персонажей"),
          });
        }),
        this.j_view.find(".button_fuki_save").on("click", (e) => {
          this.j_select_chara.trigger("change"),
            app.config.setProjectConfig("map_fuki", this.map_fuki),
              alertNoBtn($.s("Сохранено"), "", 3000, "bottom-right", "success", "var(--vne-success-alert-color)");
        }),
        this.j_view.find(".spinner").each((e, i) => {
          let t = $(i),
            a = t.attr("sp-max"),
            n = t.attr("sp-min"),
            s = t.attr("sp-step");
          t.spinner({ min: n, max: a, step: s, change: function (e, i) {} });
        }),
        this.j_view.find(".color_text").minicolors({
          change: function (e, i) {
            var t = $(this).attr("data-key");
            a.map_fuki[t] && (a.map_fuki[t] = e.replace("#", "0x"));
          },
        }),
        this.j_view.find(".form-control").on("change", (e) => {
          var i = $(e.currentTarget);
          if ("" == $.trim(i.val()))
            return $.alert($.s("Введите здесь")), !1;
          i.attr("data-key");
        }),
        this.j_view.find(".button_chara_reflesh").on("click", (e) => {
          this.refleshChara();
        }),
        this.j_view.find(".select_fix_width").on("change", (e) => {
          "true" == this.j_view.find(".select_fix_width").val()
            ? (this.j_view.find("[data-key='max_width']").parent().hide(),
              this.j_view.find("[data-key='fix_width']").parent().show())
            : (this.j_view.find("[data-key='max_width']").parent().show(),
              this.j_view.find("[data-key='fix_width']").parent().hide());
        }),
        this.j_view.find(".button_function_copy").on("click", (e) => {
          $.confirm(
            $.s(
              "В результате эти настройки будут применены ко всем персонажам. Приступить?"
            ),
            () => {
              this.j_select_chara.trigger("change");
              let e = this.map_fuki[this.select_chara_name];
              for (let i in this.map_fuki)
                "others" != i && (this.map_fuki[i] = $.extend(!0, {}, e));
              alertNoBtn($.s("Скопировано"), "", 3000, "bottom-right", "success", "var(--vne-success-alert-color)");
            },
            () => {}
          );
        }),
        this.j_select_chara.find("option:first").prop("selected", !0),
        this.j_select_chara.trigger("change");
    },
    getDefaultFuki: function () {
      return {
        left: 200,
        top: 270,
        sippo: "top",
        sippo_left: 30,
        sippo_top: 40,
        sippo_width: 12,
        sippo_height: 20,
        select_fix_width: "false",
        max_width: 300,
        fix_width: 300,
        color: "0xFFFFFF",
        opacity: "255",
        border_size: "3",
        border_color: "0x000000",
        radius: 15,
        font_color: "0x000000",
        font_size: app.tyrano.config.defaultFontSize,
        bgImage: localStorage.getItem("bgImagePathFuki") || ""
      };
    },
    refleshChara: function () {
      var e = this.j_view.find(".select_chara");
      for (key in (e.empty(),
      (this.map_chara = app.config.project_config.map_chara),
      this.map_chara))
        e.append('<option value="' + key + '">' + key + "</option>");
      void 0 === this.map_chara.others &&
        e.append('<option value="others">' + $.s("Другое") + "</option>");
    },
    initPlugin: function () {
      var e = !1;
      "steam" == global_build && (e = !0);
      var i = app.plugin.map_plugin,
        t = this.j_view.find(".select_plugin");
      t.empty();
      var a = 0;
      for (key in i) {
        if (0 == e && a >= 2) {
          $.alertProOnly(
            "スタンダード版はプラグインの上限が２つです。PRO版を確認しますか？"
          );
          break;
        }
        i[key].name;
        t.append('<option value="' + key + '">' + i[key].name + "</option>"),
          a++;
      }
    },
    show: function (e) {},
  })),
  (Builder.Window.DebugManage = Builder.Window.Base.extend({
    defaults: { view_id: "DebugManage" },
    j_view: {},
    map_config: {},
    map_watch: {},
    initialize: function (e, i, t) {
      (this.j_view = e), (this.call_back = t), (this.data = i);
      var a = this;
      (this.map_watch = app.config.getProjectConfig("map_watch")),
        (this.j_datatable = this.j_view.find("[ts='datatable']")),
        (this.j_btnAddVariable = this.j_view.find("[ts='btnAddVariable']")),
        (this.j_textAddVariable = this.j_view.find("[ts='textAddVariable']")),
        (this.j_btnAddAllVariable = this.j_view.find(
          "[ts='btnAddAllVariable']"
        )),
        (this.j_textSearchVarName = this.j_view.find(
          "[ts='textSearchVarName']"
        )),
        (this.j_btnVarReload = this.j_view.find("[ts='btnVarReload']")),
        this.j_datatable
          .find("tbody")
          .sortable({ handle: '[ts-class="button_variable_move"]' }),
        (this.j_tableBody = this.j_datatable.find("tbody")),
        (this.map_config = app.tyrano.config);
      this.j_view.find(".select_plugin");
      if ("standard" == global_build)
        return (
          this.j_view.find(".text_not_pro").show(),
          this.j_view.find(".area_pro").hide(),
          void this.j_view.find(".btn_show_pro").on("click", (e) => {
            app.gui.shell(
              "url",
              ""
            );
          })
        );
      this.j_view
        .find(".navbar-nav")
        .find("li")
        .click(function () {
          a.j_view.find("li").removeClass("active"), $(this).addClass("active");
          var e = $(this).attr("data-nav");
          a.j_view.find(".area").hide(), a.j_view.find(".area_" + e).show();
        }),
        this.j_view
          .find(".check_preview_sync")
          .prop("checked", app.config.project_config.preview_sync),
        this.j_view.find(".check_preview_sync").on("click", (e) => {
          let i = $(e.currentTarget).prop("checked");
          app.config.setProjectConfig("preview_sync", i);
        }),
        this.j_btnAddVariable.on("click", (e) => {
          let i = $.trim(this.j_textAddVariable.val());
          if ("" != i) {
            if (void 0 !== this.map_watch[i])
              return alertNoBtn($.s("Внимание"), $.s("Переменная \"" + i + "\" уже существует"), 3000, "bottom-right", "warning", "var(--vne-warning-alert-color)"), !1;
            (this.map_watch[i] = ""),
              this.addTableVariable(i, ""),
              this.j_textAddVariable.val(""),
              app.gui.sendMessage("preview", "variable-add", {
                names: [{ name: i, val: "" }],
              });
          }
        }),
        this.j_textAddVariable.on("keypress", (e) => {
          13 === e.keyCode &&
            (e.preventDefault(), this.j_btnAddVariable.trigger("click"));
        }),
        this.j_btnAddAllVariable.on("click", (e) => {
          $.confirm(
            $.s("Отобразит все переменные в игре. Вы уверены?"),
            (e) => {
              app.gui.sendMessage("preview", "variable-add-all", {}) ||
                $.alert($.s("Игра не включена"));
            },
            (e) => {}
          );
        }),
        this.j_view.on("click", "a[ts-class='button_variable_remove']", (e) => {
          let i = $(e.currentTarget).closest("[ts-class='tr_name']"),
            t = i.attr("ts-data");
          delete this.map_watch[t],
            app.config.setProjectConfig("map_watch", this.map_watch),
            i.remove();
        }),
        this.j_textSearchVarName.keyup((e) => {
          var i = $(e.currentTarget).val();
          this.j_tableBody.find("tr").each((e, t) => {
            let a = $(t);
            -1 != a.attr("ts-data").indexOf(i) ? a.show() : a.hide();
          });
        }),
        this.j_btnVarReload.on("click", (e) => {
          app.gui.sendMessage("preview", "variable-add-all", {}) ||
            $.alert($.s("Игра не включена"));
        });
      let n = require("electron").remote.ipcMain;
      n.removeAllListeners(),
        n.on("changed-variable", (e, i) => {
          let t = JSON.parse(i).names;
          for (let e = 0; e < t.length; e++) {
            let i = t[e].name,
              a = t[e].val;
            "object" == typeof a && (a = JSON.stringify(a)),
              this.j_tableBody
                .find("tr[ts-data='" + i + "']")
                .find("[ts-class='variable_value']")
                .html($.h(a));
          }
        }),
        n.on("init-variable", (e, i) => {
          let t = [];
          for (let e in this.map_watch) t.push({ name: e, val: "" });
          app.gui.sendMessage("preview", "variable-add", { names: t });
        }),
        n.on("init-variable-all", (e, i) => {
          let t = JSON.parse(i),
            a = [];
          for (let e in t)
            for (let i in t[e]) {
              let t = e + "." + i;
              void 0 === this.map_watch[t] &&
                ((this.map_watch[t] = ""),
                this.addTableVariable(t, ""),
                a.push({ name: t, val: "" }));
            }
          app.gui.sendMessage("preview", "variable-add", { names: a }),
            app.config.setProjectConfig("map_watch", this.map_watch);
        }),
        (this.current_ks_file = ""),
        (this.wait_line = !1),
        (this.current_line = -1),
        (this.timer_id = null),
        (this.j_areaCode = this.j_view.find("[ts='areaCode']")),
        (this.j_labelScenarioFile = this.j_view.find(
          "[ts='labelScenarioFile']"
        )),
        n.on("replay-console", (e, i) => {
          let t = JSON.parse(i),
            a = t.line,
            n = t.ks_file;
          if (
            ("_preview.ks" == n
              ? (n = app.tmp.preview_scenario)
              : (app.tmp.preview_from_line = 0),
            1 == app.tmp.reload_code &&
              ((app.tmp.reload_code = !1),
              (this.current_ks_file = ""),
              app.config.project_config.preview_sync && app.loadScenario(n)),
            this.current_ks_file != n)
          ) {
            (this.wait_line = !1),
              clearTimeout(this.timer_id),
              (this.current_ks_file = n),
              this.j_labelScenarioFile.text(n),
              this.j_areaCode.empty();
            let e = app.getProjectPath() + "data/scenario/" + n,
              i = app.io.readFile(e);
            this.j_areaCode.removeClass("prettyprinted"),
              this.j_areaCode.html(i),
              PR.prettyPrint();
            let t = 1;
            this.j_areaCode
              .find(".linenums")
              .find("li")
              .each((e, i) => {
                $(i).addClass("LL" + t), t++;
              });
          }
          (this.current_line = a + 1),
            0 == this.wait_line &&
              ((this.wait_line = !0),
              (this.timer_id = setTimeout(() => {
                let e = this.current_line + app.tmp.preview_from_line;
                (this.wait_line = !1),
                  this.j_areaCode
                    .find(".linenums")
                    .find(".current_console_line")
                    .removeClass("current_console_line"),
                  this.j_areaCode
                    .find(".linenums")
                    .find(".LL" + e)
                    .addClass("current_console_line");
                let i = Math.floor(Number(this.j_areaCode.get(0).scrollTop)),
                  t =
                    Math.floor(
                      Number(
                        this.j_areaCode
                          .find(".linenums")
                          .find(".LL" + e)
                          .offset().top
                      )
                    ) +
                    i -
                    parseInt($(".modal.DebugManage").css("top")) -
                    200;
                this.j_areaCode
                  .stop()
                  .animate(
                    { scrollTop: t },
                    { duration: 120, complete: function () {} }
                  ),
                  app.config.project_config.preview_sync &&
                    app.selectComponentByLine(n, e);
              }, 300)));
        }),
        this.initVariable();
    },
    initVariable: function () {
      this.j_datatable.find("tbody").empty();
      for (let e in this.map_watch) this.addTableVariable(e, "");
    },
    addTableVariable: function (e, i) {
      if ("tf.system" == e) return;
      let t = $(
        '\t            <tr ts-class="tr_name" ts-data="' +
          e +
          '">\t                <td style="border:solid 1px gray;"><a href="javascript:void(0)" ts-class="button_variable_move"><i class="fa fa-arrows"></i></a></td>\t                <td style="border:solid 1px gray;" ts-class="variable_name" >' +
          e +
          '</td>\t                <td style="border:solid 1px gray;" ts-class="variable_value" ></td>\t                <td style="border:solid 1px gray;"><a href="javascript:void(0)" ts-class="button_variable_remove" ><i class="fa fa-remove"></i></a></td>\t            </tr>\t        '
      );
      this.j_tableBody.append(t);
    },
    show: function (e) {},
  }));
    (Builder.Window.AchievementEditor = Builder.Window.Base.extend({
        defaults: { view_id: "AchievementEditor" },
        j_view: {},
        map_config: {},
        map_watch: {},
        initialize: function (e, i, t) { (this.j_view = e) },
        show: function (e) {},
    }));

    (Builder.Window.LanguageSystemEditor = Builder.Window.Base.extend({
        defaults: { view_id: "LanguageSystemEditor" },
        j_view: {},
        map_config: {},
        map_watch: {},
        initialize: function (e, i, t) { (this.j_view = e) },
        show: function (e) {},
    }));

    (Builder.Window.MapGameEditor = Builder.Window.Base.extend({
        defaults: { view_id: "MapGameEditor" },
        j_view: {},
        map_config: {},
        map_watch: {},
        initialize: function (e, i, t) { (this.j_view = e) },
        show: function (e) {},
    }));

    (Builder.Window.inventoryGameEditor = Builder.Window.Base.extend({
        defaults: { view_id: "inventoryGameEditor" },
        j_view: {},
        map_config: {},
        map_watch: {},
        initialize: function (e, i, t) { (this.j_view = e) },
        show: function (e) {},
    }));

    (Builder.Window.ImageMapEditor = Builder.Window.Base.extend({
        defaults: { view_id: "ImageMapEditor" },
        j_view: {},
        map_config: {},
        map_watch: {},
        initialize: function (e, i, t) { (this.j_view = e) },
        show: function (e) {},
    }));
    (Builder.Window.ImageMapEditorCoords = Builder.Window.Base.extend({
        defaults: { view_id: "ImageMapEditorCoords" },
        j_view: {},
        map_config: {},
        map_watch: {},
        initialize: function (e, i, t) { (this.j_view = e) },
        show: function (e) {},
    }));