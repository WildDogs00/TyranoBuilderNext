function alertFunc(title, text, icon, colorIcon) {
    return Swal.fire({
        title: $.s(title),
        text: $.s(text),
        color: "var(--vne-text-color)",
        background: "var(--vne-right-panel-color)",
        iconColor: colorIcon,
        icon: icon,
        confirmButtonText: $.s("Да"),
        cancelButtonText: $.s("Нет"),
        showCancelButton: true,
        width: '440px'
    })
}
const alertNoBtn = (title, text, timer, pos, icon, iconColor) => {
    const Toast = Swal.mixin({
        toast: true,
        position: pos,
        width: "400px",
        color: "var(--vne-text-color)",
        background: "var(--vne-right-panel-color)",
        iconColor: iconColor,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        title: $.s(title),
        html: $.s(text),
    })
};
const reloadAlertSettings = (title, text, timer) => {
    let timerInterval
    Swal.fire({
        title: $.s('Применить настройки?'),
        text: $.s("Применение настроек требует перезагрузку приложения. Перезагрузить?"),
        icon: 'warning',
        width: "400px",
        color: "var(--vne-text-color)",
        background: "var(--vne-right-panel-color)",
        iconColor: "var(--vne-warning-alert-color)",
        showCancelButton: true,
        confirmButtonColor: 'rgba(64,131,47,0.7)',
        cancelButtonColor: 'rgba(221,51,51,0.54)',
        confirmButtonText: $.s('Да'),
        cancelButtonText: $.s('Отмена')
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: $.s(title),
                text: $.s(text),
                timer: timer,
                position: 'center',
                width: "400px",
                color: "var(--vne-text-color)",
                background: "var(--vne-right-panel-color)",
                iconColor: "var(--vne-warning-alert-color)",
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    app.component.saveTyranoScriptCode(), app.component.saveCharaDefineCode()
                    location.href = "./tyrano.html";
                }
            })
        }
    })
}

const timerAlert = (title, text, timer, icon, iconColor) => {
    let timerInterval
    return Swal.fire({
        title: $.s(title),
        text: $.s(text),
        timer: timer,
        position: 'center',
        width: "400px",
        icon: icon,
        color: "var(--vne-text-color)",
        background: "var(--vne-right-panel-color)",
        iconColor: iconColor,
        showConfirmButton: false,
        timerProgressBar: true,
        willClose: () => {
            clearInterval(timerInterval)
        }
    })
}

(Builder.View = {}),
  (Builder.View.MakeProject = Builder.Core.Base.extend({
    defaults: {
      template: "MakeProject/MakeProject",
      view_type: "screen"
    },
    j_view: {},
    data: {},
    map_size: {
      1: { width: 1280, height: 720, vertical: !1 },
      2: { width: 1920, height: 1080, vertical: !1 },
      3: { width: 2560, height: 1440, vertical: !1 },
      4: { width: 1080, height: 1920, vertical: !0 },
    },
    array_copy_components: [],
    initialize: function () {
      app.tmp.obj_project = {}
        app.tmp.obj_project = {
          name: "",
          game_type: "adv",
          size_type: "",
          width: "",
          height: "",
        }
    },
    setEvents: function () {
      const screenCreateProject = this;
      this.j_view.find(".button_back").click(function () {
        location.href = "./tyrano.html";
      })
        this.j_view.find(".button_next").click(
          $.proxy(function () {
              let mapSize = this.map_size, getSelectValue = this.j_view.find('select[name=select_size_game]').val();
              app.tmp.obj_project.size_type = getSelectValue;
            let projectName = this.j_view.find(".text_project_name").val();
            projectName = $.replaceAll(projectName, " ", "_")
            this.j_view.find(".text_project_name").val(projectName);
            const projectPath = app.exe_path + "/myproject/" + projectName;
            if (!$(".text_project_name").val()) {
                alertNoBtn("Внимание", "Пожалуйста, дайте название вашему проекту!", 2000, "center", "info", "var(--vne-info-alert-color)")
            } else if (app.io.exists(projectPath) === true && projectName !== "") {
                alertNoBtn("Внимание", "Проект уже существует! Смените название.", 2000, "center", "info", "var(--vne-info-alert-color)")
            } else {
              app.tmp.obj_project.name = projectName

              if($('.adv_game').prop('checked')) {
                app.tmp.obj_project.game_type = "adv"
              } else if ($('.novel_game').prop('checked')) {
                app.tmp.obj_project.game_type = "novel"
              }

              if (getSelectValue === "1") {
                app.tmp.obj_project.width = mapSize[getSelectValue].width
                app.tmp.obj_project.height = mapSize[getSelectValue].height
              } else if (getSelectValue === "2") {
                app.tmp.obj_project.width = mapSize[getSelectValue].width
                app.tmp.obj_project.height = mapSize[getSelectValue].height
              } else if (getSelectValue === "3") {
                app.tmp.obj_project.width = mapSize[getSelectValue].width
                app.tmp.obj_project.height = mapSize[getSelectValue].height
              } else if (getSelectValue === "4") {
                app.tmp.obj_project.width = mapSize[getSelectValue].width
                app.tmp.obj_project.height = mapSize[getSelectValue].height
              }

              if ($("#horizontal").val() !== "" && $("#vertical").val() !== "") {
                  this.j_view.find('select[name=select_size_game]').value = 0;
                  app.tmp.obj_project.width = $("#horizontal").val()
                  app.tmp.obj_project.height = $("#vertical").val()
              }

              const t = this.j_view.find("#check_title").prop("checked"),
                  i = this.j_view.find("#check_menu").prop("checked");
              (app.tmp.obj_project.check_title = t ? "yes" : "no"),
                  (app.tmp.obj_project.check_menu = i ? "yes" : "no"),
                  this.createNewProject();

            }
          }, this)
        )
        this.j_view.find(".text_project_name").keypress(function (t) {
          if (13 === t.keyCode)
            return screenCreateProject.j_view.find(".button_next").trigger("click"), !1;
        });
    },
    setValues: function () {},
    createNewProject: function (e) {
      let n;
      const objProject = app.tmp.obj_project, projectName = ((e = objProject.name), app.exe_path + "/myproject/" + e);
      if (app.io.exists(projectName))
        return alertNoBtn("Внимание", "Проект уже существует! Смените название.", 2000, "center", "info", "var(--vne-info-alert-color)"), !1;
      if (
          (app.io.mkdir(projectName), this.copyTyranoToProject(projectName), 1280 === objProject.width && 720 === objProject.height)
      ) {
        n = app.dir_path + "ext/theme";
        app.io.copy(
            app.dir_path + "system/config_1280/config.ks",
            projectName + "/data/scenario/config.ks"
        ),
            app.io.copy(
                n + "/NVE_Default_theme_1280/image/config/",
                projectName + "/data/image/config/"
            );
      } else {
        n = app.dir_path + "ext/theme";
        app.io.copy(
            app.dir_path + "system/config_960/config.ks",
            projectName + "/data/scenario/config.ks"
        ),
            app.io.copy(
                n + "/NVE_Default_theme_1280/image/config/",
                projectName + "/data/image/config/"
            ),
            app.io.copy(
                app.dir_path + "system/config_960/html/",
                projectName + "/tyrano/html/"
            ),
            app.io.copy(
                app.dir_path + "system/config_960/tyrano.css",
                projectName + "/tyrano/tyrano.css"
            );
      }
      var a = app.config.loadTyranoConfig(
              app.exe_path + "/myproject/" + e + "/data/system/Config.tjs"
          ),
          o = {
            scWidth: objProject.width,
            scHeight: objProject.height,
            projectID: e,
            "System.title": e,
          };
      app.config.mergeConfig(a, o);
      var c = projectName + "/data/system/Config.tjs";
      app.config.writeTyranoConfig(c, a);
      var s = {
            size_type: app.tmp.obj_project.size_type,
            game_type: app.tmp.obj_project.game_type,
            no_title: app.tmp.obj_project.check_title,
            no_menu: app.tmp.obj_project.check_menu,
            project_name: e,
            _s: function (e) {
              return $.s(e);
            },
          },
          p = app.config.ks("first.ks", { jump_storage: "first.ks" }),
          r = projectName + "/data/scenario/first.ks";
      app.io.writeFile(r, p);
      var d = objProject.width,
          l = objProject.height,
          h = app.config.createMessageWindowData(d, l, {
            game_type: s.game_type,
            size_type: s.size_type,
          }),
          f = app.config.ks("message_window.ks", h),
          m = projectName + "/data/scenario/system/message_window.ks";
      app.io.writeFile(m, f),
          (app.tmp.obj_project.message_window = {
            use_image: !1,
            image_file: "",
          }),
          (app.tmp.obj_project.message_window = _.extend(
              app.tmp.obj_project.message_window,
              h
          ));
      var v = app.config.ks("title_screen.ks", s),
          u = projectName + "/data/scenario/title_screen.ks";
      app.io.writeFile(u, v),
          (app.tmp.obj_project.version = app.version),
          (app.tmp.obj_project.plugin = {}),
          app.io.saveJson(projectName + "/builder_config.json", app.tmp.obj_project),
          timerAlert(
              "Успех!",
              "Новый проект создан.",
              2000,
              "success",
              "var(--vne-success-alert-color)").then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                  app.loadProject(e);
              }
          })
    },
    copyTyranoToProject: function (e) {
      app.io.copy(app.dir_path + "system/tyrano", e);
    },
  })),


  (Builder.View.ListProject = Builder.Core.Base.extend({
    defaults: { template: "ListProject", view_type: "screen" },
    j_view: {},
    initialize: function () {
      app.gui.enableMenuProject(!1);
    },
    setEvents: function () {
        app.gui.closeModal(),
        this.j_view.find(".button_edit").click(function () {
            let projectName = $(this).attr("data-item");
          app.loadProject(projectName);
        }),
        this.j_view.find(".button_open_dir").click(function () {
            let projectName = $(this).attr("data-item");
          app.gui.shell("dir", app.exe_path + "myproject/" + projectName + "/data");
        }),
        this.j_view.find(".button_remove_dir").click(function () {
            let projectName = $(this).attr("data-item");
          alertFunc(
              $.s("Вы уверены, что хотите удалить проект?"),
              $.s("Удаление проекта приведет к полной потере данных."),
              "warning",
              "var(--vne-warning-alert-color)").then((result) => {
              if (result.isConfirmed) {
                  timerAlert("Успех!", "Проект удален", 500, "", "").then((result) => {
                      if (result.dismiss === Swal.DismissReason.timer) {
                          app.io.rmdir(app.exe_path + "myproject/" + projectName)
                          location.reload();
                      }
                  })
              }
          })
        }),
        this.j_view.find(".button_create_new_project").click(function () {
          app.view.show("MakeProject");
        })
    },
  })),
  (Builder.View.EditProject = Builder.Core.Base.extend({
    defaults: { template: "EditProject", view_type: "screen" },
    j_view: {},
    data: {},
    initialize: function () {
      app.gui.enableMenuProject(!0);
    },
    current_nav: "",
    selected_nav: "",
    selected_folder: "",
    select_mode: "tb_start_text",
    data_tree: null,
    open_component_action: "",
    is_searched: !1,
    previewThisComponent: function () {
      var e = 0;
      this.j_view.find(".header-color-orange").each(function () {
        var t = $(this).attr("cid"),
          i = app.component.getComponentByCid(t);
        e = i.index;
      }),
        app.previewGameFromScenario(e);
    },
    changeScenario: function (e) {
      var t = this;
      if (
        ($(".prm-body").hide(),
        $(".prm-header").hide(),
        this.refleshScenarioTree(),
        (this.data.edit_scenario = e),
        (app.tyrano.component = app.component.convertScenario(
          app.tyrano.scenario,
          this.data.edit_scenario
        )),
        this.setTab(),
        app.resize(),
        app.component.showEditComponent(),
        setTimeout(function () {
          "" != app.tmp.select_component_in_line
            ? app.selectComponentByLine(
                "",
                parseInt(app.tmp.select_component_in_line)
              )
            : "" != app.tmp.select_component_in_reopen &&
              ($.inform(
                app.tyrano.current_edit_scenario +
                  "　" +
                  app.tmp.select_component_in_reopen,
                ""
              ),
              app.selectComponentByLabel(
                "",
                app.tmp.select_component_in_reopen
              ));
        }, 1),
        "down" == t.open_component_action &&
          ((t.open_component_action = "up"),
          t.j_view
            .find("#button_open_component")
            .removeClass("tb-i-chevron-up")
            .addClass("tb-i-chevron-down"),
          t.j_view.find("#button_open_component").trigger("click")),
        "scenario" == t.current_nav)
      ) {
        var i = this.j_view.find(".text-search-scenario").val();
        t.refleshScenarioTree(i);
      }
      $(".tb-main-search-box").hasClass("active") && this.search();
    },
    setTab: function () {
      var e = this;
      if (
        (this.j_view.find(".tb-tab-scene-select").empty(),
        1 == app.config.user_config.tab_mode)
      ) {
        for (var t = 0; t < app.tmp.array_tab_scene.length; t++)
          this.addTabScene(app.tmp.array_tab_scene[t]);
        this.addTabScene(this.data.edit_scenario),
          -1 == $.inArray(this.data.edit_scenario, app.tmp.array_tab_scene) &&
            app.tmp.array_tab_scene.push(this.data.edit_scenario);
        var i = this.j_view.find(".tb-tab-scene-select");
        i.hide(),
          i.find(".header-title").removeClass("active"),
          i
            .find("[data-scene='" + this.data.edit_scenario + "']")
            .addClass("active"),
          i.find(".button_tab_remove").off("click"),
          i.find(".button_tab_remove").on("click", function (t) {
            t.stopPropagation();
            var i = $(this).parent().attr("data-scene");
            e.removeTabScene(i);
          }),
          i.find(".header-title").off("click"),
          i.find(".header-title").on("click", function () {
            var t = $(this).attr("data-scene");
            t != e.data.edit_scenario &&
              (app.component.checkModified()
                ? e.selectTabScene(t)
                : alertFunc(
                    "Внимание",
                      "Сцена в настоящее время редактируется. Изменения будут потеряны, если другая сцена будет открыта без сохранения. Продолжить?",
                      "warning",
                      "var(--vne-warning-alert-color)").then((result) => {
                      if (result.isConfirmed) {
                          e.selectTabScene(t);
                      }
                  }))
          }),
          $(window).off("resize.tab"),
          $(window).on("resize.tab", function (t) {
            var n = parseInt(i.css("width"));
            n -= 130;
            var a = 0;
            i.find(".header-title").each(function () {
              var t = $(this);
              (a += parseInt(t.css("width")) + 5) > n
                ? ($(this).hide(), e.j_view.find("#button_tab_extend").show())
                : ($(this).show(), e.j_view.find("#button_tab_extend").hide());
            });
          }),
          this.j_view.find("#button_tab_extend").off("click"),
          this.j_view.find("#button_tab_extend").on("click", function (t) {
            e.j_view.find("#tab_context_menu").find("#tab_menu").html(""),
              i.find(".header-title").each(function () {
                var t = $(this);
                if ("none" == t.css("display")) {
                  var n =
                    '<li class="ui-menu-item" role="presentation"><a href="#" data-scene="' +
                    t.attr("data-scene") +
                    '" class="ui-corner-all" tabindex="-1" role="menuitem">' +
                    t.attr("data-scene") +
                    "</a></li>";
                  e.j_view
                    .find("#tab_context_menu")
                    .find("#tab_menu")
                    .append(n);
                }
                e.j_view
                  .find("#tab_context_menu")
                  .find("#tab_menu")
                  .find("a")
                  .off("click"),
                  e.j_view
                    .find("#tab_context_menu")
                    .find("#tab_menu")
                    .find("a")
                    .on("click", function () {
                      var e = $(this).attr("data-scene");
                      (app.tmp.array_tab_scene = _.without(
                        app.tmp.array_tab_scene,
                        e
                      )),
                        app.tmp.array_tab_scene.unshift(e),
                        i.find("[data-scene='" + e + "']").trigger("click");
                    });
              }),
              e.j_view
                .find("#tab_context_menu")
                .css({ left: t.clientX, top: t.clientY }),
              setTimeout(function (t) {
                e.j_view.find("#tab_context_menu").show();
              }, 10);
          }),
          setTimeout(function () {
            i.show(), $(window).trigger("resize.tab");
          }, 10);
      } else
        this.j_view
          .find(".tb-tab-scene-select")
          .append(
            "<div class='header-title active' style='padding-left:14px;padding-right:14px'>" +
              e.data.edit_scenario +
              "</div>"
          );
    },
    debugThisComponent: function () {
      var e = 0;
      this.j_view.find(".header-color-orange").each(function () {
        var t = $(this).attr("cid"),
          i = app.component.getComponentByCid(t);
        e = i.index;
      }),
        app.debugGameFromScenario(e);
    },
    jumpTargetComponent: function () {
      var e = "",
        t = "";
      this.j_view.find(".header-color-orange").each(function () {
        var i = $(this).attr("cid"),
          n = app.component.getComponentByCid(i);
        (e = n.data.pm.storage), (t = n.data.pm.target);
      }),
        app.selectComponentByLabel(e, t);
    },
    copyComponent: function (e = !0) {
      var t = [];
      return (
        this.j_view.find(".header-color-orange").each(function () {
          var e = $(this).attr("cid"),
            i = { data: app.component.getComponentByCid(e).data };
          t.push($.extend(!0, {}, i));
        }),
        e && (app.component.array_copy_components = t),
        t
      );
    },
    pasteComponent: function (e) {
      var t,
        i,
        n = app.tyrano.component;
      if (e && e.array_component && e.last_select_cid)
        (t = e.array_component), (i = e.last_select_cid);
      else if (
        ((i = app.component.last_select_cid),
        0 == (t = app.component.array_copy_components).length)
      )
        return !1;
      for (var a = 0, o = {}, c = 0; c < n.length; c++) {
        if (n[c].cid == i) {
          (a = c), (o = n[c]);
          break;
        }
      }
      var s = [];
      for (c = 0; c < t.length; c++) s[c] = $.extend(!0, {}, t[c]);
      (s = s.reverse()), a++;
      var p = [];
      for (var r = 0; r < s.length; r++) {
        var d = $.extend(!0, {}, s[r]),
          _ = app.component.create(d.data.tag_name, d.data);
        "label" == _.data.tag_name && (_.data.pm.label_name = ""),
          app.tyrano.component.splice(a, 0, _),
          o.j_component.after(_.j_component),
          p.push({ cid: _.cid, tag: _.data.tag_name, data: _.data }),
          r + 1 == s.length &&
            (_.j_component.trigger("click"),
            _.j_component.find(".component_slide").trigger("click"));
      }
      app.component.addHistory({
        type: "multi_insert",
        insert_index: a,
        array_data: p,
      });
    },
    addFavComponent: function () {
      var e = this;
      const t = this.copyComponent(!1);
      $.s("Избранное"),
        parseInt(Object.keys(app.config.project_config.map_fav).length);
      $.prompt($.s("Задайте имя для избранного элемента"), (i, n) => {
        if (0 != i) {
          if ("" == (n = $.trim(n))) return alertNoBtn(
              "Внимание",
              "Название обязательно к заполнению!",
              3000, "bottom-right",
              "info",
              "var(--vne-info-alert-color)"), !1;
          if ($.checkSymbol(n))
            return alertNoBtn(
                "Внимание",
                "Недопустимые символы!",
                2000,
                "bottom-right",
                "warning",
                "var(--vne-warning-alert-color)"), !1;
          app.config.project_config.map_fav[n]
            ? alertFunc(
                "Внимание",
                  "Компонент уже в избранном. Перезаписать?",
                  "question",
                  "var(--vne-success-alert-color)").then((result) => {
                  if (result.isConfirmed) {
                      a();
                  }
              })
            : a();
        }
        function a() {
          const i = n;
          (app.config.project_config.map_fav[i] = t),
            (app.config.project_config.component_manage.fav[i] = "true"),
            app.config.saveProjectConfig(),
            e.refleshFavIcons(),
            app.refleshComponentIcons(e.j_view);
        }
      });
    },
    deleteComponent: function () {
      var e = [],
        t = [];
      this.j_view.find(".header-color-orange").each(function () {
        var i = $(this).attr("cid"),
          n = app.component.getComponentByCid(i);
        e.push({
          cid: i,
          tag: n.data.tag_name,
          remove_index: n.index,
          data: n.data,
        }),
          t.push(n);
      });
      for (var i = 0; i < t.length; i++)
        app.component.removeComponentWithObject(t[i]);
      app.component.addHistory({ type: "multi_remove", array_data: e });
    },
    addTabScene: function (e) {
      if (
        this.j_view
          .find(".tb-tab-scene-select")
          .find("[data-scene='" + e + "']")
          .get(0)
      );
      else {
        var t = $(
          '<div data-scene="' +
            e +
            '" style="cursor:pointer" class="header-title">&nbsp;' +
            e +
            '&nbsp;<span class="tb-i-s-icon-cancel-circle button_tab_remove" style="cursor:pointer;font-size:10.5px;" ></span>&nbsp;</div>'
        );
        this.j_view.find(".tb-tab-scene-select").append(t);
      }
    },
    selectTabScene: function (e) {
      var t = e;
      app.loadScenario(t);
    },
    removeTabScene: function (e) {
      var t = this;
      if (e != this.data.edit_scenario)
        this.j_view
          .find(".tb-tab-scene-select")
          .find("[data-scene='" + e + "']")
          .hide(200, function () {
            $(this).remove();
          }),
          (app.tmp.array_tab_scene = _.without(app.tmp.array_tab_scene, e));
      else {
        if (1 == app.tmp.array_tab_scene.length)
          return void alertNoBtn(
              "Внимание",
              "Как минимум одна вкладка должна быть открыта",
              3000,
              "bottom-right",
              "error",
              "var(--vne-error-alert-color)");
        if (app.component.checkModified()) {
          (app.tmp.array_tab_scene = _.without(app.tmp.array_tab_scene, e)),
            console.log(app.tmp.array_tab_scene);
          var i = app.tmp.array_tab_scene[0];
          this.selectTabScene(i);
        } else {
            alertFunc(
                "Внимание",
                "Сцена в настоящее время редактируется. Изменения будут потеряны, если вы закроете сцену без сохранения. Продолжить?",
                "warning",
                "var(--vne-warning-alert-color)").then((result) => {
                if (result.isConfirmed) {
                    app.tmp.array_tab_scene = _.without(app.tmp.array_tab_scene, e);
                    var i = app.tmp.array_tab_scene[0];
                    t.selectTabScene(i);
                }
            })
        }
      }
    },
    setComponentSetting: function () {
      var e = this;
      this.j_view
        .find(".cpn-block.component .cpn-header")
        .off("click.component_group"),
        this.j_view
          .find(".cpn-block.component .cpn-header")
          .off("mouseenter.component"),
        "mouseover" == app.config.user_config.component_open
          ? (this.j_view
              .find(".cpn-block.component .cpn-header")
              .each(function () {
                $(this)
                  .find(".tb-i-chevron-up")
                  .addClass("tb-i-chevron-down")
                  .removeClass("tb-i-chevron-up")
                  .attr("title", $.s("Развернуть")),
                  $(this).closest(".cpn-group").removeClass("active");
              }),
            this.j_view.find(".cpn-block.component .cpn-header").on({
              "mouseenter.component": function () {
                e.j_view
                  .find(".cpn-block.component .cpn-header")
                  .each(function () {
                    $(this)
                      .find(".tb-i-chevron-up")
                      .addClass("tb-i-chevron-down")
                      .removeClass("tb-i-chevron-up")
                      .attr("title", $.s("Развернуть")),
                      $(this).closest(".cpn-group").removeClass("active");
                  });
                $(this).attr("data-group");
                $(this)
                  .find($("[class^=tb-i-chevron-]"))
                  .hasClass("tb-i-chevron-down") &&
                  ($(this)
                    .find(".tb-i-chevron-down")
                    .addClass("tb-i-chevron-up")
                    .removeClass("tb-i-chevron-down")
                    .attr("title", $.s("Свернуть")),
                  $(this).closest(".cpn-group").addClass("active"));
              },
            }))
          : this.j_view
              .find(".cpn-block.component .cpn-header")
              .on("click.component_group", function () {
                var e = app.config.user_config.nav_component_opend,
                  t = $(this).attr("data-group");
                $(this)
                  .find($("[class^=tb-i-chevron-]"))
                  .hasClass("tb-i-chevron-down")
                  ? ($(this)
                      .find(".tb-i-chevron-down")
                      .addClass("tb-i-chevron-up")
                      .removeClass("tb-i-chevron-down")
                      .attr("title", $.s("Свернуть")),
                    $(this).closest(".cpn-group").addClass("active"),
                    (e[t] = 1))
                  : ($(this)
                      .find(".tb-i-chevron-up")
                      .addClass("tb-i-chevron-down")
                      .removeClass("tb-i-chevron-up")
                      .attr("title", $.s("Развернуть")),
                    $(this).closest(".cpn-group").removeClass("active"),
                    delete e[t]),
                  (app.config.user_config.nav_component_opend = e);
              });
    },
    setEvents: function () {
      var e = this;
      app.gui.setMenuBar(!0),
        this.refleshFavIcons(),
        app.refleshComponentIcons(this.j_view),
        app.config.project_config.plugin.live2d &&
          "1" == app.config.project_config.plugin.live2d &&
          app.live2d.initModel(),
        this.j_view.click(function () {
          $(".context_menu").hide();
        });
      let t = app.config.project_config.map_theme;
      if ("" != t.glink) {
        let e = app.dir_path + "ext/theme",
          i = e + "/" + t.name + "/" + t.glink + ".css";
        t.path && ((e = t.path), (i = e + t.glink + ".css")), $.addCssFile(i);
      }
      this.j_view
        .find("#component_context_menu")
        .find("a")
        .click(function () {
          switch ($(this).attr("data-method")) {
            case "copy":
              e.copyComponent();
              break;
            case "paste":
              e.pasteComponent();
              break;
            case "delete":
              e.deleteComponent();
              break;
            case "preview":
              e.previewThisComponent();
              break;
            case "debug":
              e.debugThisComponent();
              break;
            case "jump":
              e.jumpTargetComponent();
              break;
            case "add_fav":
              e.addFavComponent();
          }
        }),
        this.j_view
          .find("#scenario_context_menu")
          .find("a")
          .click(function () {
            switch ($(this).attr("data-method")) {
              case "copy":
                app.window.show(
                  "CopyScenario",
                  { title: $.s("Дублировать файл"), width: 700, height: 240 },
                  function (e) {}
                );
                break;
              case "rename":
                if (
                  "scene1.ks" == app.tmp.selected_context_scenario ||
                  "title_screen.ks" == app.tmp.selected_context_scenario
                )
                  return (
                      alertNoBtn(
                          "Внимание",
                          "Этот файл не может быть изменен.",
                          3000, "bottom-right",
                          "info",
                          "var(--vne-info-alert-color)")
                  );
                app.window.show(
                  "RenameScenario",
                  { title: $.s("Переименовать файл"), width: 700, height: 400 },
                  function (e) {}
                );
                break;
              case "delete":
                  alertFunc(
                      "Внимание",
                      "Сцена будет удалена. Продолжить?",
                      "question",
                      "var(--vne-success-alert-color)").then((result) => {
                      if (result.isConfirmed) {
                          if (app.array_files.length <= 1)
                              return (
                                  alertNoBtn(
                                      "Внимание",
                                      "Конечный файл не может быть удален!",
                                      3000,
                                      "bottom-right",
                                      "warning",
                                      "var(--vne-warning-alert-color)"), !1
                              );
                          if (
                              "scene1.ks" == app.tmp.selected_context_scenario ||
                              "title_screen.ks" == app.tmp.selected_context_scenario
                          )
                              return (
                                  alertNoBtn(
                                      "Внимание",
                                      "Сцена не может быть удалена!",
                                      3000,
                                      "bottom-right",
                                      "warning",
                                      "var(--vne-warning-alert-color)"), !1
                              );
                          var t =
                                  app.getDataPath() +
                                  "scenario/" +
                                  app.tmp.selected_context_scenario,
                              i =
                                  app.getDataPath() +
                                  "scenario/system/_" +
                                  app.tmp.selected_context_scenario;
                          app.io.rmdir(t), app.io.rmdir(i);
                          var n = e.reloadScenario();
                          app.loadScenario(n[0].item);
                      }
                  })
            }
          }),
        this.j_view
          .find(".filer-scenario")
          .on("dblclick", ".cpn-filer-item", function () {
            var e = $(this).attr("data-scenario");
            if (app.component.checkModified()) {
              var t = e;
              app.loadScenario(t);
            } else {
                Swal.fire({
                    title: $.s("Внимание"),
                    text: $.s("Сцена в настоящее время редактируется. Изменения будут потеряны, если другая сцена будет открыта без сохранения. Продолжить?"),
                    color: "var(--vne-text-color)",
                    background: "var(--vne-right-panel-color)",
                    iconColor: "var(--vne-warning-alert-color)",
                    icon: "warning",
                    confirmButtonText: $.s("Да"),
                    cancelButtonText: $.s("Нет"),
                    showCancelButton: true,
                    width: '440px'
                }).then((result) => {
                    if (result.isConfirmed) {
                        var t = e;
                        app.loadScenario(t);
                    }
                })
            }
          }),
        this.j_view
          .find(".filer-scenario")
          .on("contextmenu", ".cpn-filer-item", function (t) {
            var i = $(this).attr("data-scenario");
            $(this);
            e.showScenarioContextMenu(t.clientX, t.clientY, i);
          }),
        this.j_view.find("#button_new_scenario").click(function () {
          app.component.checkModified()
            ? app.window.show(
                "MakeScenario",
                {
                  title: $.s("Создать новую сцену"),
                  width: 700,
                  height: 240,
                },
                function (e) {}
              )
            : alertFunc(
                "Внимание",
                  "Не сохранённые изменения будут потеряны. Продолжить создание новой сцены?",
                  "warning",
                  "var(--vne-warning-alert-color)").then((result) => {
                  if (result.isConfirmed) {
                      app.window.show(
                          "MakeScenario",
                          {
                              title: $.s("Создать новую сцену"),
                              width: 700,
                              height: 240,
                          },
                          function (e) {}
                      )
                  }
              })
        }),
        this.j_view.on("mouseenter", ".help", function () {
          var e = $(this).attr("data-help");
          $(".area_help_text_inner").html(e);
        }),
        this.j_view.on("mouseleave", ".help", function () {
          $(".area_help_text_inner").empty();
        }),
        this.j_view.find(".button_help_close").click(function () {
          (app.config.user_config.show_help = !1),
            app.config.saveUserConfig(),
            $(".area_help_show").hide(),
            $(".area_help_hide").show();
        }),
        this.j_view.find(".button_help_open").click(function () {
          (app.config.user_config.show_help = !0),
            app.config.saveUserConfig(),
            $(".area_help_show").show(),
            $(".area_help_hide").hide();
        }),
        void 0 !== app.config.user_config.show_help &&
          0 == app.config.user_config.show_help &&
          (this.j_view.find(".area_help_show").hide(),
          this.j_view.find(".area_help_hide").show()),
        this.j_view.find(".button_function_preview").click(function () {
          app.previewGame();
        }),
        this.j_view.find(".tb-header-title").on("click", function () {
          var e = app.tyrano.project_name;
          app.gui.shell("dir", app.exe_path + "myproject/" + e + "/data");
        }),
        this.j_view
          .find(".button_function_component_manage")
          .click(function () {
            app.window.show("ComponentManage", {
              width: 640,
              height: 500,
              title: $.s("Настройка инструментов"),
            });
          }),
        this.j_view.find(".button_function_setting").click(function () {
          app.showSetting();
        }),
        this.j_view.find(".button_function_message_window").click(function () {
          app.showSettingMessageWindow();
        }),
        this.j_view.find(".button_function_save").click(function () {
          app.component.saveTyranoScriptCode(),
            app.component.saveCharaDefineCode(),
            alertNoBtn(
                "Внимание!",
                "Проект был успешно сохранен!",
                3000,
                "bottom-right",
                "success",
                "--vne-success-alert-color");
        }),
        this.j_view.find(".button_function_chara_manage").click(function () {
          app.window.show("CharaManage", {
            width: 800,
            height: 800,
            title: $.s("Менеджер персонажей"),
          });
        }),

        this.j_view.find(".button_function_devtools").click(function () {
          app.showDevTools();
        }),
        this.j_view.find(".button_function_export").click(function () {
          app.window.show("ExportGame", {
            width: 640,
            height: 700,
            title: $.s("Экспорт игры"),
          });
        }),
        this.j_view.find(".button_function_live2d").click(function () {
          app.live2d.select_window_data = { target: "setting" };
          var e = "./live2d.html";
          app.window.show("Live2D", {
            width: 800,
            height: 410,
            game_url: e,
            title: $.s("Настройки Live 2D модели"),
          });
        }),
        this.j_view.find("#button_open_component").click(function () {
          var t = e.open_component_action;
          $(this).hasClass("tb-i-chevron-down")
            ? ((t = "down"),
              $(this)
                .removeClass("tb-i-chevron-down")
                .addClass("tb-i-chevron-up"),
              $(this).parents(".component-box").find(".widget-body").show())
            : ((t = "up"),
              $(this)
                .removeClass("tb-i-chevron-up")
                .addClass("tb-i-chevron-down"),
              $(this).parents(".component-box").find(".widget-body").hide()),
            (e.open_component_action = t),
            e.j_view.find(".component_slide").each(function () {
              "down" === t
                ? $(this).hasClass("tb-i-chevron-down") &&
                  ($(this)
                    .removeClass("tb-i-chevron-down")
                    .addClass("tb-i-chevron-up"),
                  $(this).closest(".tb-main-cpn").addClass("open"))
                : $(this).hasClass("tb-i-chevron-up") &&
                  ($(this)
                    .removeClass("tb-i-chevron-up")
                    .addClass("tb-i-chevron-down"),
                  $(this).closest(".tb-main-cpn").removeClass("open"));
            });
        }),
        this.j_view.find("#button_select_file").click(function () {
          app.window.show("SelectFile", {
            width: 640,
            height: 400,
            type: "back",
            title: $.s("Выберите файл"),
          });
        }),
        this.j_view.find(".vne-menu-nav .nav-item").click(function () {
            const tabName = $(this).attr("data-tab");
            if (
            ((e.current_nav = tabName),
            (app.tmp.current_nav = tabName),
            !$(this).hasClass("active"))
          ) {
            e.j_view.find(".vne-menu-nav .nav-item.active").removeClass("active"), $(this).addClass("active");
                const i = $(this).data("nav");
                e.j_view.find(".vne-menu-body .cpn-block").removeClass("active"),
              e.j_view.find(".vne-menu-body .cpn-block." + i).addClass("active"),
              "component" === tabName ||
                ("file" === tabName
                  ? (e.j_view.find(".text-search-file").val(""),
                    "" === e.j_view.find(".filer-file").html() &&
                      e.refleshTree("bg"))
                  : "scenario" === tabName &&
                    (e.j_view.find(".text-search-scenario").val(""),
                    "" === e.j_view.find(".filer-scenario").html() &&
                      e.refleshScenarioTree()));
          }
        }),
        "scenario" === app.tmp.current_nav &&
          ((this.current_nav = app.tmp.current_nav),
          this.j_view.find(".vne-menu-nav .nav-item").trigger("click")),
        this.j_view.find(".select_mode").change(function () {
          (e.select_mode = e.j_view.find(".select_mode").val()),
            (e.is_searched = !1);
        }),
        this.j_view.find(".select_search_mode").on("change", function () {
          var t = $(this).val();
          (e.select_mode = t), e.search();
        }),
        this.j_view.find(".tb-main-search-box").droppable({
          accept: ".cpn-item",
          tolerance: "fit",
          drop: function (t, i) {
            var n = $(i.draggable).attr("item-tag");
            e.select_mode = n;
            var a = "";
            if ("label" === n) a = $.s("Метка");
            else {
              if (!app.component.map_component[n]) return;
              a = $.f(app.component.map_component[n].name);
            }
            var o = {},
              c = 0;
            e.j_view
              .find(".select_search_mode")
              .find("option")
              .each(function () {
                (o[$(this).val()] = "1"), c++;
              }),
              o[n]
                ? e.j_view.find(".select_search_mode").val(n)
                : (e.j_view
                    .find(".select_search_mode")
                    .prepend(
                      "<option value='" + n + "' selected>" + a + "</option>"
                    ),
                  c > 6 &&
                    e.j_view
                      .find(".select_search_mode")
                      .children("option:last-child")
                      .remove()),
              e.search();
          },
          over: function (e, t) {},
        }),
        this.j_view.find("#button_preview_scenario_from").click(function () {
          app.previewGameFromScenario(0);
        }),
        this.j_view.find("#button_debug_scenario_from").click(function () {
          app.debugGameFromScenario(0);
        }),
        this.j_view.find("#button_search_component").on("click", function () {
          $("#main-component")
            .find(".tb-main-cpn")
            .css("-webkit-filter", "brightness(1)"),
            $(".tb-main-search-box").hasClass("active") || e.search();
        }),
        this.j_view.find(".search_text").change(function () {
          e.is_searched = !1;
        }),
        this.j_view.find(".text-search-scenario").keyup(function () {
          var t = $(this).val();
          e.refleshScenarioTree(t);
        }),
        this.j_view.find(".text-search-file").keyup(function () {
          var t = $(this).val();
          e.refleshTree(e.selected_nav, t);
        }),
        this.j_view.find(".search_text").keydown(function (t) {
          13 == t.keyCode &&
            e.j_view.find(".button_search_next").trigger("click");
        }),
        this.j_view.find(".button_search_next").click(function () {
          0 == e.is_searched && (e.search(), (e.is_searched = !0)),
            app.component.search_move("next");
        }),
        this.j_view.find(".button_search_back").click(function () {
          app.component.search_move("back");
        }),
        this.j_view.find(".button_search_reset").click(function () {}),
        this.j_view
          .find(".cpn-nav")
          .find(".cpn-nav-item")
          .click(function () {
            e.j_view.find(".text-search-file").val("");
            var t,
              i = $(this).attr("data-nav");
            e.refleshTree(i),
              $(this).parents().find(".cpn-nav-item").removeClass("active"),
              $(this).addClass("active"),
              e.j_view.find(".nav-title").html($(this).attr("title")),
              "chara" == i
                ? (e.j_view.find(".button_add_file").hide(),
                  e.j_view.find(".button_tab_chara_manager").show())
                : (e.j_view.find(".button_add_file").show(),
                  e.j_view.find(".button_tab_chara_manager").hide()),
              (t =
                "se" == i || "bgm" == i
                  ? $(
                      "<audio style='width:300px!important; height:100px!important;' class='preview_area' controls></audio>"
                    )
                  : $("<img class='preview_area' >")),
              e.j_view.find(".cpn-preview-block-inner").empty(),
              e.j_view.find(".cpn-preview-block-inner").append(t);
          }),
        this.j_view.find(".button_tab_chara_manager").click(function () {
          $(".button_function_chara_manage").trigger("click");
        }),
        this.j_view.find(".button_add_file").click(function () {
          e.selected_folder || (e.selected_folder = ""),
            "default_folder" == e.selected_folder && (e.selected_folder = "");
          var t = {
            title: $.s("Менеджер изображений"),
            width: 640,
            height: 400,
            file_path: "",
            base_url: "",
            folder: e.selected_folder,
            folder_select: !0,
          };
          switch (e.selected_nav) {
            case "bg":
              (t.base_url = "data/bgimage/"), (t.file_path = "bgimage/");
              break;
            case "image":
              (t.base_url = "data/fgimage/"),
                (t.file_path = "fgimage/default/");
              break;
            case "chara":
              (t.title = $.s("Проверка выражения")),
                (t.base_url = "data/fbimage/"),
                (t.file_path = "fgimage/chara/");
              break;
            case "se":
              (t.base_url = "data/sound"), (t.file_path = "sound/");
              break;
            case "bgm":
              (t.base_url = "data/bgm/"), (t.file_path = "bgm/");
          }
          app.window.show("SelectFile", t, function (e) {
            console.log(e);
          });
        });
    },
    refleshFavIcons: function () {
      try {
        const e = app.config.project_config.map_fav;
        _component_manage.fav.components = {};
        for (const t in e) {
          const i = e[t][0].data.name,
            n = app.getComponentManageFromName(i).icon;
          _component_manage.fav.components[t] = {
            pro: 0,
            default: !0,
            help: "",
            icon: n,
            fav: 1,
            name: t,
          };
        }
      } catch (e) {
        app.config.project_config.map_fav = {};
      }
    },
    showScenarioContextMenu: function (e, t, i) {
      (app.tmp.selected_context_scenario = i),
        $(window).height() - t < 100 && (t -= 100);
      var n = $("#scenario_context_menu");
      n.css("left", e), n.css("top", t), n.show();
    },
    search: function () {
      var e = this.j_view.find(".search_text").val();
      -1 != e.indexOf(":") || (e = this.select_mode + ":" + $.trim(e)),
        app.component.search(e);
    },
    refleshSelectedTree: function () {
      "file" == this.current_nav && this.refleshTree(this.selected_nav);
    },
    refleshTree: function (e, t) {
      var i = this,
        n = app.getDataPath(),
        a = "",
        o = "";
      this.selected_nav = e;
      var c,
        s = "",
        p = "",
        r = "";
      switch (e) {
        case "bg":
          (a = "bgimage"), (o = "bg"), (r = "file-image");
          break;
        case "image":
          (a = "fgimage/default"),
            (p = "/default/"),
            (o = "tb_image_show"),
            (r = "file-image");
          break;
        case "chara":
          (a = "fgimage/chara"),
            (p = "chara/"),
            (o = "chara_mod"),
            (r = "file-image");
          break;
        case "se":
          (a = "sound"), (o = "playse"), (r = "file-sound");
          break;
        case "bgm":
          (a = "bgm"), (o = "playbgm"), (r = "file-sound");
      }
      (n += a),
        t
          ? (c = this.data_tree)
          : ((c = app.io.getTree(n)), (this.data_tree = c));
      var d = this.j_view.find(".filer-file");
      d.empty();
      var _ = app.config.project_config.map_chara,
        l = {},
        h = "";
      for (chara in _) l[_[chara]] = chara;
      for (key in c) {
        var f = c[key],
          m = null,
          v = "",
          u = $('<div class="cpn-filer-item-wrapper">');
        "chara" == e
          ? "default_folder" != (v = key) &&
            ((m = $(
              '<div class="cpn-filer-item" data-item-kind="folder" data-folder="' +
                v +
                '" data-item="' +
                key +
                '"><span class="tb-i-folder-open"></span> ' +
                l[key] +
                "</div>"
            )),
            (h = l[key]))
          : ((v = key),
            (m = $(
              '<div class="cpn-filer-item" data-item-kind="folder" data-folder="' +
                v +
                '" data-item="' +
                key +
                '" ><span class="tb-i-folder-open"></span> ' +
                key +
                "</div>"
            )));
        for (
          var w = $('<div class="cpn-filer-sub"></div>'), b = 0;
          b < f.length;
          b++
        ) {
          s = "";
          (s =
            "default_folder" == key
              ? p + "" + f[b].item
              : p + "" + key + "/" + f[b].item),
            t
              ? -1 != f[b].item.indexOf(t) &&
                w.append(
                  '<div class="cpn-filer-sub-item file" item-tag="' +
                    o +
                    '" data-folder="' +
                    v +
                    '" param-key="' +
                    'storage"  param-val="' +
                    s +
                    '" param-chara="' +
                    h +
                    '" item-type="insert" item-nav="' +
                    e +
                    '" data-item-kind="file" data-item="' +
                    f[b].item +
                    '" data-item-path="' +
                    f[b].path +
                    '" ><span class="tb-i-' +
                    r +
                    '"></span><span class="cpn-filer-text">' +
                    f[b].item +
                    "</span></div>"
                )
              : w.append(
                  '<div class="cpn-filer-sub-item file" item-tag="' +
                    o +
                    '" data-folder="' +
                    v +
                    '" param-key="' +
                    'storage"  param-val="' +
                    s +
                    '" param-chara="' +
                    h +
                    '" item-type="insert" item-nav="' +
                    e +
                    '" data-item-kind="file" data-item="' +
                    f[b].item +
                    '" data-item-path="' +
                    f[b].path +
                    '" ><span class="tb-i-' +
                    r +
                    '"></span><span class="cpn-filer-text">' +
                    f[b].item +
                    "</span></div>"
                );
        }
        m && (u.append(m), u.append(w), d.append(u));
      }
      d.find(".cpn-filer-sub-item").click(function (e) {
        var t = $(this).attr("data-item-kind"),
          n = $(this).attr("data-folder");
        if (((i.selected_folder = n), "folder" != t)) {
          var a = $(this).attr("data-item-path");
          return (
            $(this).parents().find(".cpn-filer-sub-item").removeClass("active"),
            $(this).addClass("active"),
            i.j_view.find(".preview_area").attr("src", a),
            !1
          );
        }
        var o = $(this).children("span");
        o.hasClass("tb-i-folder-open")
          ? (o.removeClass("tb-i-folder-open").addClass("tb-i-folder"),
            $(this).next(".cpn-filer-sub").slideUp(30))
          : (o.removeClass("tb-i-folder").addClass("tb-i-folder-open"),
            $(this).next(".cpn-filer-sub").slideDown(30));
      }),
        d
          .find(".file")
          .draggable({
            connectToSortable: "#main-component",
            distance: 10,
            helper: "clone",
            revert: "invalid",
            zIndex: 9999,
            scroll: !1,
            appendTo: "body",
            start: function (e, t) {},
            stop: function (e, t) {},
          });
    },
    reloadScenario: function () {
      var e = app.io.getFiles(app.getProjectPath() + "data/scenario/");
      return (
        (e = _.select(e, function (e) {
          return !_.any(
            ["first.ks", "make.ks", "_preview.ks", "config.ks"],
            function (t) {
              return t === e.item;
            }
          );
        })),
        (app.array_files = e),
        e
      );
    },
    refleshScenarioTree: function (e) {
      app.getDataPath();
      var t = this.j_view.find(".filer-scenario");
      t.empty();
      for (var i = app.array_files, n = 0; n < i.length; n++) {
        var a = $.replaceAll(i[n].item, ".ks", "");
        e
          ? -1 != a.indexOf(e) &&
            t.append(
              '<div class="cpn-filer-item-wrapper"><div class="cpn-filer-item" data-scenario="' +
                i[n].item +
                '"><span class="tb-i-file-text"></span><span class="cpn-filer-text">' +
                a +
                "</span></div></div>"
            )
          : t.append(
              '<div class="cpn-filer-item-wrapper"><div class="cpn-filer-item" data-scenario="' +
                i[n].item +
                '"><span class="tb-i-file-text"></span><span class="cpn-filer-text">' +
                a +
                "</span></div></div>"
            );
      }
    },
    completed: function () {
      this.changeScenario(this.data.edit_scenario);
    },
  }));
