// FaceChar - Размещение картинок перед текстбоксом.
tyrano.plugin.kag.tag.face_char = {
    vital: ["face_char_select"],
    pm: {
        face_char_select: "",
        face_char_url: "",
        face_char_location: "",
        face_char_position: "",
        face_char_position_left: "",
        face_char_position_bottom: "",
        face_char_zoom: "",
        face_char_text_left: "",
        face_char_text_width: "",
        face_char_id: ""
    },
    start: function (pm) {
        const faceCharContainer = document.querySelector(".face_char_container");
        if (faceCharContainer) {
            faceCharContainer.remove();
        }

        if (pm.face_char_url) {
            const faceCharHtml = `
            <div class="face_char_container">
                <img class="face_char_img layer_event_click" id="${pm.face_char_id}" style="object-fit: cover; border: none;" src="data/fgimage/${pm.face_char_url}">
            </div>
        `;
            $('.message0_fore').append(faceCharHtml);
        }

        requestAnimationFrame(() => {
            const messageInner = document.querySelector(".message_inner");
            if (messageInner) {
                $(messageInner).find("p").css({
                    position: "relative",
                    left: `${pm.face_char_text_left}px`,
                    width: `${pm.face_char_text_width}px`
                });

                $(".chara_name_area").css({
                    top: `${pm.faceCharPosNameTop}px`,
                    left: `${pm.faceCharPosNameLeft}px`
                });
            }
        });

        const newFaceCharContainer = document.querySelector(".face_char_container");
        if (newFaceCharContainer) {
            $(newFaceCharContainer).css({
                position: "absolute",
                zIndex: pm.face_char_location === "true" ? "100" : "0",
                [pm.face_char_position === "left" ? "left" : "right"]: `${pm.face_char_position_left}px`,
                bottom: `${pm.face_char_position_bottom}px`
            });

            if (pm.face_char_zoom) {
                $(newFaceCharContainer).find(".face_char_img").css({
                    transform: `scale(${pm.face_char_zoom})`
                });
            }
        }

        const observer = new MutationObserver(() => {
            const messageInner = document.querySelector(".message_inner");
            if (messageInner) {
                $(messageInner).find("p").css({
                    position: "relative",
                    left: `${pm.face_char_text_left}px`,
                    width: `${pm.face_char_text_width}px`
                });
                $(".chara_name_area").css({
                    top: `${pm.faceCharPosNameTop}px`,
                    left: `${pm.faceCharPosNameLeft}px`
                });
            }
        });

        const messageInner = document.querySelector(".message_inner");
        if (messageInner) {
            observer.observe(messageInner, { childList: true, subtree: true });
        }
        TYRANO.kag.ftag.nextOrder();
    }
};

tyrano.plugin.kag.tag.face_char_delete = {
    start: function () {
        $(".face_char_container").remove()

        TYRANO.kag.ftag.startTag("cm");
        TYRANO.kag.ftag.nextOrder();
        TYRANO.kag.layer.showEventLayer();
    }
};

// ChatStory - чат в отдельном окне
(function ($) {
    $.chatConfig = function () {
        if (typeof TYRANO.kag.stat.tchat == "undefined") {
            TYRANO.kag.stat.tchat = {
                "current_top": 0,
                "current_scroll": 0,
                "layer": "0",
                "face_width": "100",
                "margin_face": "20",
                "bgcolor": "",
                "left_bgcolor": "0xFFC0CB",
                "right_bgcolor": "0xFFFFFF",
                "center_bgcolor": "0xDCDCDC",
                "anim_time": "",
                "width": "",
                "height": "",
                "left": "0",
                "top": "0",
                "se": "",
                "backlog": "true",
                "overflow": "remove",
                "name_font_size": "16",
                "name_font_color": "0x000000",
                "edit_mode": "false",
                "zindex": ""
            };

            var under_height = parseInt(TYRANO.kag.config.scHeight) * 0.7;
            TYRANO.kag.stat.tchat["under_height"] = under_height;

            TYRANO.kag.stat.tchat.width = TYRANO.kag.config.scWidth;
            TYRANO.kag.stat.tchat.height = TYRANO.kag.config.scHeight;


        }

        return TYRANO.kag.stat.tchat;


    };

    $.extendObj = function (pm, target) {
        var tmp = target;

        for (key in target) {

            if (pm[key]) {
                if (pm[key] != "") {
                    target[key] = pm[key];
                }
            }
        }
        return target;
    };


    $.getAreaChat = function (target_layer) {
        var j_area_chat = $('.message0_fore').find(".area_tchat");

        if (!j_area_chat.length) {
            var chat_config = $.chatConfig();
            j_area_chat = $("<div class='area_tchat' id='area_tchat' defer></div>");
            j_area_chat.css({
                "position": "absolute",
                "overflow": "hidden",
                "left": parseInt(chat_config.left),
                "top": parseInt(chat_config.top),
                "width": parseInt(chat_config.width),
                "height": parseInt(chat_config.height),
            });
            $('.message0_fore').append(j_area_chat);
        }
        return j_area_chat;
    };


})(jQuery);


tyrano.plugin.kag.tag.chat_talk = {

    kag: TYRANO.kag,
    vital: [],

    pm: {
        "layer": "",
        "page": "fore",
        "name": "",
        "id": "",
        "face": "",
        "text": "",
        "pos": "left",
        "color": "",
        "bgcolor": "",
        "graphic": "",
        "video": "",
        "graphic_width": "",
        "graphic_height": "",
        "folder": "",
        "time": "300",
        "width": "",
        "bottom": "",
        "se": "",
        "delay": "",
        "reflect": "false",
        "update": "false",
        "insert_chat_id": "",
        "face_path_full": "false",
        "message_preloader_type": ""
    },

    start: function (pm) {
        var that = this;
        that.kag.layer.hideEventLayer();
        var chat_config = $.chatConfig();
        var storage_url = "";

        if (pm.face != "") {
            if ($.isHTTP(pm.face) || pm.face_path_full == "true") {
                storage_url = pm.face;
            } else {
                storage_url = "./data/fgimage/" + pm.face;
            }
        }

        var tmp = $('<img src="' + storage_url + '" />');
        var pos = pm.pos;
        var f_pos = "right";

        if (pos == "right") {
            f_pos = "left";
        }

        if (pos == "l") {
            pos = "left";
        } else if (pos == "r") {
            pos = "right";
        } else if (pos == "c") {
            pos = "center";
        }

        if (pm.bgcolor == "") {
            if (pos == "left") {
                pm.bgcolor = chat_config.left_bgcolor;
            } else if (pos == "right") {
                pm.bgcolor = chat_config.right_bgcolor;
            } else if (pos == "center") {
                pm.bgcolor = chat_config.center_bgcolor;
            }
        }
        const local_var = TYRANO.kag.stat;
        let name = local_var;
        pm.name.split(".").forEach(element => name = name[element]);
        var html = '\
            <div style="display:none;position:absolute" class="tchat">\
                 <figure class="t_chat_face tchat-img-' + pos + '">\
                    <img class="face_img" style="object-fit: cover;border: none" src="' + storage_url + '" alt="″>\
                    <figcaption class="tchat_name_text tchat-img-description">\
                    <div class="t_chat_name" style="justify-content:center;display:flex;text−align:center;width:' + chat_config.face_width + 'px"><p>' + name + '</p></div>\
                    </figcaption>\
                 </figure>\
                 <div class="t_chat_text tchat-text-' + f_pos + '">\
                   <div class="text_f-before tchat-text-' + f_pos + '-f-before"></div>\
                   <p class="tchat-text-inner" style="word-break: break-all;">\
                   </p>\
                   <div class="text_f-after tchat-text-' + f_pos + '-f-after"></div>\
                 </div>\
                </div>\
            ';

        var j_tchat = $(html);

        $.setName(j_tchat, "tyrano_story_" + pm.name);
        $.setName(j_tchat, pm.id);
        j_tchat.attr("chat-id", pm.id);

        if (chat_config.zindex != "") {
            j_tchat.css("z-index", parseInt(chat_config.zindex));
        }

        if (pos == "left") {
            j_tchat.css("left", 0);
        } else {
            j_tchat.css("right", 0);
        }

        if (pos === "left") {

            if (pm.face === "") {
                j_tchat.find(".face_img").css({
                    visibility: "hidden"
                });
                j_tchat.find(".t_chat_name").css({
                    position: "relative",
                    left: "6px"

                });
                j_tchat.find(".text_f-after").css({
                    position: "absolute",
                    top: "43px",
                    left: "9px",
                });
            }

            j_tchat.find(".text_f-after").css({
                position: "absolute",
                top: "8px",
                left: "-19px",
            });

            j_tchat.find(".t_chat_text").css({
                "margin-top": parseInt(chat_config.margin_top),
                "margin-left": parseInt(chat_config.face_width) + 20,
                "margin-right": 100
            });

            j_tchat.css("margin-left", 20);

            j_tchat.find(".tchat-text-right-f-after").css({
                "border-right": "10px solid " + $.convertColor(pm.bgcolor)
            });


        } else if (pos === "right") {
            if (pm.face === "") {
                j_tchat.find(".face_img").css({
                    visibility: "hidden"
                });
                j_tchat.find(".t_chat_name").css({
                    position: "relative",
                    right: "46px"

                });
                j_tchat.find(".text_f-after").css({
                    position: "absolute",
                    top: "43px",
                    right: "8px",
                    transform: "rotate(90deg)"
                });
            }

            j_tchat.find(".text_f-after").css({
                position: "absolute",
                top: "8px",
                right: "-19px",
            });

            j_tchat.find(".t_chat_text").css({
                "margin-top": parseInt(chat_config.margin_top),
                "margin-right": parseInt(chat_config.face_width) + 20,
                "margin-left": 100,
            });

            j_tchat.css("margin-right", 20);

            j_tchat.find(".tchat-text-left-f-after").css({
                "border-left": "10px solid " + $.convertColor(pm.bgcolor)
            });

        } else if (pos == "center") {
            j_tchat.find(".t_chat_face").remove();
            j_tchat.css("width", "100%");
            j_tchat.find(".t_chat_text").css({
                "margin-top": 25,
                "text-align": "center"
            });
        }

        if (pm.face === "") {
            j_tchat.find(".tchat-text-" + f_pos).css("margin-" + pos, 0);

        } else {
            if (pm.reflect == "true") {
                j_tchat.find(".face_img").addClass("reflect");
            }
            j_tchat.find(".t_chat_face").css({
                "width": parseInt(chat_config.face_width),
                "height": parseInt(chat_config.face_width),
            });
        }

        j_tchat.find(".tchat-text-" + f_pos).css({
            "background-color": $.convertColor(pm.bgcolor)
        });
        var j_tchat_text = j_tchat.find(".tchat-text-inner");
        j_tchat_text.html(pm.text);
        if (pm.color == "") {
            pm.color = that.kag.stat.font.color
        }
        var font_style = {
            "color": $.convertColor(pm.color),
            "font-weight": that.kag.stat.font.bold,
            "font-size": that.kag.stat.font.size + "px",
            "font-family": that.kag.stat.font.face,
            "font-style": that.kag.stat.font.italic,
        };
        j_tchat_text.css(font_style);

        $(function () {
            if (pm.width != "") {
                $(".t_chat_text").css("width", parseInt(pm.width));
            }
        })

        if (chat_config.backlog == "true") {
            var logstr = "";
            if (pm.text != "") {

                if (pm.name != "") {
                    logstr += "<b class='backlog_chara_name " + pm.name + "'>" + pm.name + "</b>：";
                }

                logstr += "<span class='backlog_text " + pm.name + "'>" + pm.text + "</span>";

                this.kag.pushBackLog(logstr, "add");

            }

        }

        j_tchat_name = j_tchat.find(".t_chat_name").css({
            "font-size": parseInt(chat_config.name_font_size),
            "color": $.convertColor(chat_config.name_font_color),
            "font-family": that.kag.stat.font.face,
        });

        if (pm.layer == "") {
            pm.layer = chat_config.layer;
        }

        var target_layer = that.kag.layer.getLayer(pm.layer, pm.page);
        var j_area_chat = $.getAreaChat($('.message0_fore'));

        $('.message0_fore').show();
        j_area_chat.show();

        if (chat_config.edit_mode == "false" && pm["update"] == "false") {
            j_area_chat.append(j_tchat);
        }

        if (pm.video != "") {

            var storage_url = "";
            storage_url = "./data/" + pm.video;

            var j_video = $("<video class='video_player' src='" + storage_url + "' loop controls></video>")

            $(function () {
                j_video.css({
                    borderRadius: "5px",
                    position: "relative",
                })

                if (pm.graphic_width != "") {
                    j_video.css("width", parseInt(pm.graphic_width));
                }

                if (pm.graphic_height != "") {
                    j_video.css("height", parseInt(pm.graphic_height));
                }

                j_tchat.find(".tchat-text-inner").after(j_video)
            })
        }

        if (pm.graphic != "") {
            img_load_flag = 1

            var foler = "";
            if (pm.folder != "") {
                folder = pm.folder;
            } else {
                folder = "fgimage";
            }

            var storage_url = "";
            if ($.isHTTP(pm.graphic)) {
                storage_url = pm.graphic;
            } else {
                storage_url = "./data/" + folder + "/" + pm.graphic;
            }


            $(function () {
                $('.minimized').click(function (event) {
                    $(this).attr('src');
                    $('body').append('<div id="overlay"></div><div id="magnify"><img id="fl_img" src="' + storage_url + '"><div id="close-popup"><i></i></div></div>');
                    $('#magnify').css({
                        left: ($(document).width() - $('#magnify').outerWidth()) / 2,
                        top: ($(window).height() - $('#magnify').outerHeight()) / 2,
                    });
                    $('#fl_img').css({
                        width: document.width,
                        height: document.height,
                    });
                    $('#overlay, #magnify').fadeIn('fast');
                });

                $('body').on('click', '#close-popup, #overlay', function (event) {
                    event.preventDefault();
                    $('#overlay, #magnify').fadeOut('fast', function () {
                        $('#close-popup, #magnify, #overlay').remove();
                    });
                });
            });

            var j_img = $("<img class='img_graphic minimized'/>");
            j_img.attr("src", storage_url).on("load", function () {

                j_img.css({
                    borderRadius: "5px",
                    position: "relative",
                })

                if (pm.graphic_width != "") {
                    j_img.css("width", parseInt(pm.graphic_width));
                }

                if (pm.graphic_height != "") {
                    j_img.css("height", parseInt(pm.graphic_height));
                }

                j_tchat.find(".tchat-text-inner").after(j_img);

                if (pm.bottom != "") {
                    j_img.after("<div style='height:" + parseInt(pm.bottom) + "px'></div>");
                }


                setTimeout(function () {
                    that.show(j_tchat, chat_config, pm);
                }, 1);
            })

        }

        if (pm.graphic == "") {

            if (pm.bottom != "") {
                j_tchat.find(".tchat-text-inner").after("<div style='height:" + parseInt(pm.bottom) + "px'></div>");
            }

            setTimeout(function () {
                that.show(j_tchat, chat_config, pm);
            }, 1);

        }


    },

    show: function (j_tchat, chat_config, pm) {
        var that = this;
        var target_layer = that.kag.layer.getLayer(chat_config.layer, "fore");
        var height = parseInt(j_tchat.css("height"));
        var new_top = that.kag.stat.tchat.current_top;

        if (chat_config.edit_mode == "false") {

            //もし、スクロールされた痕跡があるなら、元に戻す
            if (chat_config.current_scroll != 0) {

                $('.message0_fore').find(".tchat_talked").each(function () {

                    var top = parseInt($(this).css("top"));
                    top = top - chat_config.current_scroll;
                    $(this).css("top", top);

                });

                chat_config.current_scroll = 0;
            }


            if (chat_config.current_top > parseInt(chat_config.under_height)) {

                //はじめて切り替わる時用の調整
                var s = chat_config.current_top - parseInt(chat_config.under_height);

                chat_config.current_top = parseInt(chat_config.under_height) + 1;

                new_top = that.kag.stat.tchat.under_height - height;

                var num_target = $('.message0_fore').find(".tchat_talked").length;
                var cnt_target = 0;

                $('.message0_fore').find(".tchat_talked").each(function () {

                    var j_obj = $(this);
                    var tmp = parseInt(j_obj.css("top"));
                    var top = tmp - height - 40 - s;

                    if (chat_config.anim_time == "0" || chat_config.anim_time == "") {

                        j_obj.css("top", top);

                        if (chat_config.overflow == "remove") {
                            if (top + parseInt(j_obj.css("height")) < 0) {
                                j_obj.remove();
                            }
                        }

                        cnt_target++;
                        if (num_target == cnt_target) {
                            that.talk_in(j_tchat, new_top, pm);
                        }

                    } else {

                        j_obj.animate(
                            { "top": top },
                            parseInt(chat_config.anim_time),
                            function () {

                                if (top + parseInt(j_obj.css("height")) < 0) {
                                    j_obj.remove();
                                }

                                cnt_target++;
                                if (num_target == cnt_target) {
                                    that.talk_in(j_tchat, new_top, pm);
                                }
                            }
                        );
                    }

                });

            } else {
                that.kag.stat.tchat.current_top += height + 40;
                this.talk_in(j_tchat, new_top, pm);
            }

        } else {

            //開発モード
            that.kag.stat.tchat.current_top += height + 40;

            j_tchat.css("position", "relative");
            j_tchat.css("margin-top", "40px");

            j_tchat.attr("data-pm", JSON.stringify(pm));

            //同じIDのやつがあるなら、一旦削除
            var j_area_chat = $.getAreaChat($('.message0_fore'));


            if (pm.update == "true") {

                var j_old = j_area_chat.find("." + pm["id"]);

                //後ろに挿入
                j_old.after(j_tchat);

                //削除
                j_old.remove();

                j_tchat.trigger("click");


            } else {

                if (pm.insert_chat_id != "") {

                    //途中への挿入
                    var j_obj = j_area_chat.find("." + pm.insert_chat_id);

                    if (j_obj.length > 0) {
                        j_obj.after(j_tchat);
                    } else {
                        j_area_chat.append(j_tchat);
                    }

                    j_tchat.trigger("click");


                } else {

                    j_area_chat.append(j_tchat);

                }
            }

            j_tchat.show();

            that.kag.ftag.nextOrder();

        }


    },

    talk_in: function (j_tchat, new_top, pm) {

        var that = this;

        j_tchat.addClass("tchat_talked");
        j_tchat.css("top", new_top + 20);

        if (pm.delay != "") {

            j_tchat.find(".tchat-text-inner").hide();
            j_tchat.find(".img_graphic").hide();

            if (pm.message_p_t == "spinner") {
                var j_load_img = $("<div class=\"spinner\" >\n" +
                    "  <div class=\"blob top\"></div>\n" +
                    "  <div class=\"blob bottom\"></div>\n" +
                    "  <div class=\"blob left\"></div>\n" +
                    "  \n" +
                    "  <div class=\"blob move-blob\"></div>\n" +
                    "</div>");
            } else if (pm.message_p_t == "dots") {
                var j_load_img = $("<div class=\"dots_fade\" >\n" +
                    "  <span></span>" +
                    "  <span></span>" +
                    "  <span></span>" +
                    "</div>");
            } else if (pm.message_p_t == "radial") {
                var j_load_img = $("<div class=\"radial\" >\n" +
                    "  <span></span>" +
                    "  <span></span>" +
                    "  <span></span>" +
                    "</div>");
            } else if (pm.message_p_t == "spiral") {
                var j_load_img = $("<div class=\"spiral\" >\n" +
                    "  <div></div>" +
                    "  <div></div>" +
                    "  <div></div>" +
                    "</div>");
            }


            j_tchat.find(".tchat-text-inner").after(j_load_img);

            j_tchat.show();
            setTimeout(function () {

                that.playse(pm);

                j_load_img.remove();
                j_tchat.find(".img_graphic").show();
                j_tchat.find(".tchat-text-inner").fadeIn(parseInt(that.kag.cutTimeWithSkip(pm.time)), function () {

                    that.kag.layer.showEventLayer();
                    that.kag.ftag.nextOrder();
                });
            }, parseInt(that.kag.cutTimeWithSkip(pm.delay)));

        } else {

            j_tchat.fadeIn(parseInt(that.kag.cutTimeWithSkip(pm.time)), function () {
                that.kag.layer.showEventLayer();
                that.kag.ftag.nextOrder();
            });

            this.playse(pm);

        }

    },

    playse: function (pm) {

        const chat_config = $.chatConfig();
        let se_storage = "";
        console.log(se_storage)

        if (pm.se != "") {
            se_storage = pm.se;
            console.log(se_storage)
        } else if (chat_config.se != "" && chat_config.se != "none") {
            se_storage = chat_config.se;
        }

        if (se_storage != "") {
            this.kag.ftag.startTag("playse", {
                "storage": se_storage,
                "stop": true
            });
        }

    }


};


tyrano.plugin.kag.tag.chat_sh = {
    vital: ["chat_hide_show"],
    pm: {
        chat_hide_show: "",
    },
    start: function (pm) {
        if (pm.chat_hide_show === "hide") {
            $(".layer_fore").find(".area_tchat").css('display', 'none');
        } else {
            $(".layer_fore").find(".area_tchat").css('display', 'block');
        }
        TYRANO.kag.ftag.nextOrder();
    }
};

tyrano.plugin.kag.tag.tb_hide = {
    vital: ["tb_hide_show"],
    pm: {
        chat_hide_show: "",
    },
    start: function (pm) {
        if (pm.tb_hide_show === "hide") {
            $(".message_outer, .message_inner, .chara_name_area").css('display', 'none');
        } else {
            $(".message_outer, .message_inner, .chara_name_area").css('display', 'block');
        }
        TYRANO.kag.ftag.nextOrder();
    }
};


tyrano.plugin.kag.tag.chat_config = {

    kag: TYRANO.kag,
    vital: [],

    pm: {

        "layer": "",
        "face_width": "",//表情アイコンの横サイズ
        "margin_face": "",

        "bgcolor": "", //背景色を指定できます。

        "left_bgcolor": "",
        "right_bgcolor": "",
        "center_bgcolor": "",

        "name_font_size": "",
        "name_font_color": "",
        "margin_top": "",

        "under_height": "", //最後の所 Under
        "anim_time": "",
        "se": "", //デフォルトのSE

        "width": "",
        "height": "",
        "top": "",
        "left": "",

        "edit_mode": "",

        "backlog": "",
        "chat_bg_image": "",
        "chat_width": "",
        "chat_height": "",
        "chat_fullScreen": "",
        "chat_opacity": "",
        "chat_text_font": "",

    },

    start: function (pm) {

        const that = this;

        const chat_config = $.chatConfig();


        $(function () {
            $(".layer_fore").find(".area_tchat").css({
                position: "absolute",
                top: pm.y + "px",
                left: pm.x + "px",

            });

            if (pm.left_bgcolor !== "") {
                $(".layer_fore").find(".area_tchat").css({
                    color: $.convertColor(pm.left_bgcolor),
                });
            }
            if (pm.right_bgcolor !== "") {
                $(".layer_fore").find(".area_tchat").css({
                    color: $.convertColor(pm.right_bgcolor),
                });
            }
            if (pm.center_bgcolor !== "") {
                $(".layer_fore").find(".area_tchat").css({
                    backgroundColor: $.convertColor(pm.center_bgcolor),
                });
            }

            if (pm.bgcolor !== "") {
                const hexTorgba = (hex, alpha = 1) => {
                    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
                    return `rgba(${r},${g},${b},${alpha})`;
                };
                $(".layer_fore").find(".area_tchat").css({
                    backgroundColor: hexTorgba($.convertColor(pm.bgcolor), pm.chat_opacity),
                });
            }
            if (pm.chat_bg_image !== "") {
                $(".layer_fore").find(".area_tchat").css({
                    backgroundImage: 'url(' + 'data/bgimage/' + pm.chat_bg_image + ')',
                    opacity: pm.chat_opacity,
                    backgroundColor: ""
                });
            }
            if (pm.chat_width !== "") {
                $(".layer_fore").find(".area_tchat").css({
                    width: pm.chat_width + "px",
                });
            }
            if (pm.chat_height !== "") {
                $(".layer_fore").find(".area_tchat").css({
                    height: pm.chat_height + "px",
                });
            }
            if (pm.chat_fullScreen === "true") {
                $(".layer_fore").find(".area_tchat").css({
                    height: "100%",
                    width: "100%",
                });
            }

        });

        TYRANO.kag.stat.tchat = $.extendObj(pm, chat_config);

        that.kag.ftag.nextOrder();

    }

};

tyrano.plugin.kag.tag.chat_clear = {

    kag: TYRANO.kag,
    vital: [],

    pm: {
        time: "200"
    },

    start: function (pm) {

        var that = this;

        var chat_config = $.chatConfig();

        //コンフィグを適応する
        TYRANO.kag.stat.tchat = $.extendObj(pm, chat_config);
        var target_layer = that.kag.layer.getLayer(chat_config.layer, pm.page);

        var j_area_chat = $.getAreaChat($('.message0_fore'));

        j_area_chat.fadeOut(parseInt(pm.time), function () {

            $(this).remove();
            chat_config.current_top = 0;
            that.kag.ftag.nextOrder();
        });
    }

};

tyrano.plugin.kag.tag.chat_scroll = {
    kag: TYRANO.kag,
    vital: ["top"],
    pm: {
        time: "500",
        direction: "up",
        effect: "easeInQuad",
        top: ""
    },

    start: function (pm) {
        var that = this;
        var chat_config = $.chatConfig();
        var target_layer = that.kag.layer.getLayer(chat_config.layer, "fore");
        var j_area_chat = $.getAreaChat($('.message0_fore'));
        var num_target = $('.message0_fore').find(".tchat_talked").length;
        var cnt_target = 0;
        var top = "+=" + pm.top;
        if (pm.direction == "down") {
            top = "-=" + pm.top;
            chat_config.current_scroll -= parseInt(pm.top);
        } else {
            top = "+=" + pm.top;
            chat_config.current_scroll += parseInt(pm.top);
        }
        j_area_chat.find(".tchat_talked").each(function () {
            var j_obj = $(this);
            j_obj.animate(
                { "top": top },
                parseInt(pm.time),
                pm.effect,
                function () {
                    cnt_target++;
                    if (num_target === cnt_target) {
                        that.kag.ftag.nextOrder();
                    }

                }
            );

        });


    }

};

tyrano.plugin.kag.tag.translateSystem = {
    pm: {},
    start: function (pm) {
        const self = this;
        self.langTranslate = TYRANO.kag.variable.sf.langTranslate;

        if (self.langTranslate === "" || !self.langTranslate || self.langTranslate === "undefined" || self.langTranslate === "null") {
            self.kag.ftag.nextOrder();
            return;
        }

        $.when(
            self.loadJSON(`./data/lang/interface.json`).done(function (data) {
                self.translationsInterface = data;
            }),
            self.loadJSON(`./data/lang/${self.langTranslate}.json`).done(function (data) {
                self.translationMainText = data;
            }),
            self.loadAvailableImages()
        ).then(function () {
            self.traverse(document.body);

            const observerCallback = function (mutationsList, observer) {
                mutationsList.forEach(function (mutation) {
                    if (mutation.type === "childList" || mutation.type === "subtree" || mutation.type === "characterData") {
                        self.traverse(mutation.target);
                    }
                });
            };

            const observer = new MutationObserver(observerCallback);
            observer.observe(document.body, { childList: true, subtree: true, characterData: true });

            self.kag.ftag.nextOrder();
        });
    },

    loadJSON: function (url) {
        return $.getJSON(url);
    },

    loadAvailableImages: function () {
        const self = this;
        return this.loadJSON(`./data/lang/img/images.json`).done(function (data) {
            self.availableImages = data;
        });
    },

    translateTextNode: function (textNode) {
        const text = textNode.nodeValue.trim().replace(/\s+/g, " ");
        if (!text) return;

        let translation;
        if (this.translationMainText[text]) {
            translation = this.translationMainText[text];
        } else if (this.translationsInterface[text]) {
            translation = this.translationsInterface[text][this.langTranslate];
        }

        if (translation) {
            textNode.nodeValue = translation;
        }
    },

    translateAttributes: function (element) {
        const self = this;
        $.each(element.attributes, function (index, attribute) {
            const text = attribute.value.trim().replace(/\s+/g, " ");
            if (self.translationsInterface[text]) {
                attribute.value = self.translationsInterface[text][self.langTranslate];
            }
        });
    },

    translateImage: function (element) {
        const src = element.getAttribute('src');
        if (src.endsWith('.png') || src.startsWith('data:image/png') ||
            src.endsWith('.jpg') || src.startsWith('data:image/jpg')) {
            const filename = src.substring(src.lastIndexOf('/') + 1);
            const imgFilename = `${this.langTranslate}_${filename}`;
            const imgSrc = `data/lang/img/${this.langTranslate}/${imgFilename}`;

            if (this.availableImages.includes(imgFilename)) {
                element.setAttribute('src', imgSrc);
            }
        }
    },

    traverse: function (node) {
        const self = this;
        node.childNodes.forEach(function (childNode) {
            if (childNode.nodeType === Node.TEXT_NODE) {
                self.translateTextNode(childNode);
            } else if (childNode.nodeType === Node.ELEMENT_NODE) {
                if (childNode.matches && childNode.matches(".current_span")) {
                    self.traverse(childNode);
                } else if (childNode.tagName.toLowerCase() === 'img') {
                    self.translateImage(childNode);
                } else {
                    self.traverse(childNode);
                    self.translateAttributes(childNode);
                }
            }
        });
    }
};





tyrano.plugin.kag.tag.uiCloseAndOpen = {
    vital: [],
    pm: {
        uiVarCloseAndOpen: "" || "und",
        uiVarCloseAndOpenName: "",
        uiAllCloseAndOpen: ""
    },
    start: function (pm) {
        if (pm.uiVarCloseAndOpen === "close") {
            let elements = document.querySelectorAll("." + pm.uiVarCloseAndOpenName);
            elements.forEach(element => element.style.display = "none");
        } else {
            let elements = document.querySelectorAll("." + pm.uiVarCloseAndOpenName);
            elements.forEach(element => element.style.display = "block");
        }

        if (pm.uiAllCloseAndOpen === "true") {
            const elements = document.querySelectorAll(".dynamic-interface");
            elements.forEach((element) => {
                element.style.display = "none";
            });
        }


        TYRANO.kag.ftag.nextOrder();
    }
};


tyrano.plugin.kag.tag.uiVariable = {
    vital: ["uiNameVar"],
    pm: {
        uiTypeVar: "",
        uiNameVar: "",
        uiName: "",
        uiNameDiv: "",
        color: "",
        width: "",
        height: "",
        left: "",
        top: "",
        paddingTop: "",
        paddingBottom: "",
        paddingLeft: "",
        paddingRight: "",
        borderRadius: "",
        opacity: "",
        fontColor: "",
        fontSize: "",
        face: "",
        disableBG: ""
    },

    start: function (pm) {
        let uiNameVar;
        const uiNameVarParts = pm.uiNameVar.split(".");
        const variableName = uiNameVarParts[1];

        if (uiNameVarParts[0] === "sf") {
            uiNameVar = variableManipulation().getSFValueVar(variableName);
        } else if (uiNameVarParts[0] === "f") {
            uiNameVar = variableManipulation().getFValueVar(variableName);
        }

        let nameDiv = $("." + pm.uiNameDiv);
        if (nameDiv.length === 0) {
            // Если не существует, создаем новый элемент
            let vu_div = $('<div>', {
                class: 'dynamic-interface ' + pm.uiNameDiv,
            }).append($('<span>', {
                class: 'vu_text',
                text: pm.uiName + ' ' + uiNameVar,
            }));

            $('.message0_fore').append(vu_div);

            nameDiv = $("." + pm.uiNameDiv);

            if (pm.disableBG !== "true") {
                nameDiv.css("background", $.convertColor(pm.color));
            }
            nameDiv.css({
                position: "absolute",
                width: pm.width,
                height: pm.height,
                left: pm.left + "px",
                top: pm.top + "px",
                userSelect: "none",
                paddingTop: pm.paddingTop + "px",
                paddingBottom: pm.paddingBottom + "px",
                paddingLeft: pm.paddingLeft + "px",
                paddingRight: pm.paddingRight + "px",
                borderRadius: pm.borderRadius + "px",
                opacity: pm.opacity,
                color: $.convertColor(pm.fontColor),
                fontSize: pm.fontSize + "px",
                fontFamily: pm.face,
            });

            const observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    let newText = pm.uiName + ': ' + uiNameVar;
                    if (mutation.target.innerText !== newText) {
                        mutation.target.innerText = newText;
                    }
                });
            });

            observer.observe($("." + pm.uiNameDiv + " .vu_text")[0], { characterData: true, subtree: true });
        } else {
            $("." + pm.uiNameDiv + " .vu_text").text(pm.uiName + ' ' + uiNameVar);
        }

        setInterval(function () {
            let uiNameVarValue;
            const uiNameVarParts = pm.uiNameVar.split(".");
            const variableName = uiNameVarParts[1];

            if (uiNameVarParts[0] === "sf") {
                uiNameVarValue = variableManipulation().getSFValueVar(variableName);
            } else if (uiNameVarParts[0] === "f") {
                uiNameVarValue = variableManipulation().getFValueVar(variableName);
            }

            if (uiNameVarValue !== uiNameVar) {
                uiNameVar = uiNameVarValue;
                $("." + pm.uiNameDiv + " .vu_text").text(pm.uiName + ' ' + uiNameVar);
            }
        }, 100);

        TYRANO.kag.ftag.nextOrder();
    }
};


tyrano.plugin.kag.tag.textHint = {
    vital: ["hint_text"],
    pm: {
        what_to_replace: "",
        on_what_replace: "",
        hint_text: "",
        hint_direction: "",
    },
    start: function (pm) {
        let result;
        let textReplace;
        let textHintDiv;

        setInterval(function () {
            $(function () {
                const currentSpan = $(".current_span");

                if (currentSpan.text().indexOf(pm.what_to_replace) >= 0) {
                    textHintDiv = "<span class='text-hint' aria-label='" + pm.hint_text + "' data-balloon-pos='" + pm.hint_direction + "'>" + pm.on_what_replace + "</span>";
                    textReplace = currentSpan.text().replace(pm.what_to_replace, textHintDiv);
                    result = currentSpan.html(textReplace);
                    currentSpan.replaceWith(result);
                }
            })
        }, 5);
        TYRANO.kag.ftag.nextOrder();
    }
};

tyrano.plugin.kag.tag.textHintSettings = {
    vital: [],
    pm: {
        text_color_hover: "",
        text_transition: "",
        bold_text: "",
        italic_text: "",
        balloon_bg_color: "",
        balloon_text_color: "",
        balloon_border_radius: "",
        balloon_padding: "",
        balloon_font_size: "",
        balloon_font: ""
    },
    start: function (pm) {
        setInterval(function () {
            $(".text-hint").mouseover(function () {
                $(this).css({
                    color: $.convertColor(pm.text_color_hover),
                    transition: pm.text_transition + "s",
                    cursor: "default"
                })
            });
            $(".text-hint").mouseout(function () {
                $(this).css({
                    color: "#fff",
                    transition: pm.text_transition + "s"
                })
            });

            if (pm.bold_text === "true") {
                $('.text-hint').css({
                    fontWeight: "bold"
                })
            }
            if (pm.italic_text === "true") {
                $('.text-hint').css({
                    fontStyle: "italic"
                })
            }
            if (pm.balloon_bg_color !== "") {
                $(':root').css({
                    "--balloon-color": $.convertColor(pm.balloon_bg_color)
                })
            }
            if (pm.balloon_text_color !== "") {
                $(':root').css({
                    "--balloon-text-color": $.convertColor(pm.balloon_text_color)
                })
            }
            if (pm.balloon_border_radius !== "") {
                $(':root').css({
                    "--balloon-border-radius": pm.balloon_border_radius + "px"
                })
            }
            if (pm.balloon_padding !== "") {
                $(':root').css({
                    "--balloon-padding": pm.balloon_padding + "px"
                })
            }
            if (pm.balloon_font_size !== "") {
                $(':root').css({
                    "--balloon-font-size": pm.balloon_font_size + "px"
                })
            }
            if (pm.balloon_font !== "") {
                $(':root').css({
                    "--balloon-font": pm.balloon_font
                })
            }

        }, 5);

        TYRANO.kag.ftag.nextOrder();
    }
};

// Система достижений
tyrano.plugin.kag.tag.achievementSystem = {
    pm: {},
    start: function (pm) {
        let achievements;

        if (window.isRunningInWebView) {
            // Чтение данных на Android
            const data = window.AndroidInterface.readFileFromAssets("data/achievement/achievements.json");
            achievements = data ? JSON.parse(data) : [];
            console.log('Achievements:', achievements);
        } else if (window.process && window.process.type) {
            // Чтение данных в Electron
            const fs = require("fs");
            const path = require('path');
            const jsonPath = path.join(__dirname, '/data/achievement/achievements.json');
            achievements = JSON.parse(fs.readFileSync(jsonPath));
            console.log('Achievements:', achievements);
        } else {
            // Чтение данных в браузере
            fetch('/data/achievement/achievements.json')
                .then(response => response.json())
                .then(data => {
                    achievements = data;
                    console.log('Achievements:', achievements);
                });
        }

        let handler = {
            set: function (obj, prop, value) {
                if (prop === 'achievementSystem') {
                    let achVarChangedEvent = new Event('ach_var_changed');
                    achVarChangedEvent.detail = value;
                    document.dispatchEvent(achVarChangedEvent);
                }
                obj[prop] = value;
                return true;
            }
        };

        TYRANO.kag.stat.f = new Proxy(TYRANO.kag.stat.f, handler);


        let generalHandler = function (e) {
            let ach_var = e.detail;
            if (achievements && ach_var) {
                achievements.forEach(pm => {
                    if (e.detail == pm.ach_id) {
                        let storage_url = "./data/achievement/icon/" + pm.ach_img;
                        let html = `
                            <div class="achievement">
                                <div class="">
                                    <div class="ach_container">
                                        <img class="ach_img" style="object-fit: cover;border: none;box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px;" src="${storage_url}">
                                        <div class="ach_text_container">
                                            <p class="ach_name">${pm.ach_name}</p>
                                            <p class="ach_text">${pm.ach_text}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        let ach_json;
                        if (window.isRunningInWebView) {
                            // Чтение данных на Android
                            const data = window.AndroidInterface.readFileFromInternalStorage("achievementData.json");
                            ach_json = data ? JSON.parse(data) : [];

                        } else if (window.process && window.process.type) {
                            // Чтение данных в Electron
                            const fs = require('fs');
                            const path = require('path');
                            const ach_json_path = path.join(__dirname, '/data/achievement/data.json');
                            if (!fs.existsSync(ach_json_path)) {
                                fs.writeFileSync(ach_json_path, JSON.stringify([]));
                            }
                            ach_json = JSON.parse(fs.readFileSync(ach_json_path));
                        } else {
                            // Чтение данных в браузере
                            ach_json = JSON.parse(localStorage.getItem('ach_json') || '[]');
                        }

                        let ach_by_id = ach_json
                            .filter(entry => {
                                return entry.ach_id === pm.ach_id && entry.achieved === true;
                            })[0];
                        if (ach_var == pm.ach_id && (ach_by_id == null || ach_by_id.achieved !== true)) {
                            ach_json.push({
                                "ach_id": pm.ach_id,
                                "achieved": true
                            });
                            if (window.isRunningInWebView) {
                                // Сохранение данных на Android
                                const baseAssetPath = "file:///android_asset/";
                                const yourData = baseAssetPath + "data/achievement/data.json";
                                AndroidInterface.saveToFile("achievementData.json", yourData);

                            } else if (window.process && window.process.type) {
                                // Сохранение данных в Electron
                                const fs = require('fs');
                                const path = require('path');
                                const ach_json_path = path.join(__dirname, '/data/achievement/data.json');
                                fs.writeFileSync(ach_json_path, JSON.stringify(ach_json));
                            } else {
                                // Сохранение данных в браузере
                                localStorage.setItem('ach_json', JSON.stringify(ach_json));
                            }
                            $('.layer_camera').append(html);
                        }
                        $(".achievement").css({
                            background: $.convertColor(pm.ach_color),
                            position: "absolute",
                            borderRadius: pm.ach_border_radius + "px",
                            width: pm.ach_width + "px",
                            height: "auto",
                            wordWrap: "break-word",
                            overflowX: "hidden",
                            overflowY: "hidden",
                            right: "-1000px",
                            marginRight: "5px",
                            marginTop: "15px",
                            boxShadow: "rgba(17, 12, 46, 0.15) 0px 8px 15px 0px"

                        })
                        if (pm.highlight_text === "true") {
                            $(".ach_name").css({
                                fontFamily: pm.ach_font_name,
                            })
                            $(".ach_text").css({
                                fontFamily: pm.ach_font_text,
                            })
                            $(".ach_name, .ach_text").css({
                                background: $.convertColor(pm.ach_name_color),
                                padding: "2px 0 2px 5px",
                                borderRadius: "5px",
                                marginBottom: "2px",
                                boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                            })
                        } else {
                            $(".ach_name").css({
                                fontFamily: pm.ach_font_name,
                            })
                            $(".ach_text").css({
                                fontFamily: pm.ach_font_text,
                            })
                            $(".ach_name, .ach_text").css({
                                padding: "2px 0 2px 5px",
                                borderRadius: "5px",
                                marginBottom: "2px",
                            })
                        }
                        $(".ach_container").css({
                            color: $.convertColor(pm.ach_fonts_color),
                            padding: pm.ach_padding + "px",
                            minHeight: "50px",

                        })
                        $(".ach_text_container").css({
                            position: "relative",
                            width: pm.ach_text_width + "px",
                            height: "auto",
                            float: "right"
                        })
                        $(".ach_img").css({
                            position: "relative",
                            width: pm.image_width + "px",
                            height: pm.image_width + "px",
                            border: "none",
                            borderRadius: "50px",
                            objectFit: "cover"
                        })
                        $('.achievement').animate({
                            right: '10px',
                            transition: '0.5s',
                        })
                        setTimeout(function () {
                            $('.achievement').fadeOut(1000);
                        }, pm.display_time);
                    }
                });
            }
        };

        document.addEventListener('ach_var_changed', generalHandler);


        this.kag.ftag.nextOrder()
    }
};




tyrano.plugin.kag.tag.animFrame = {
    vital: ["animFrame_url"],
    pm: {
        animFrame_id: "",
        animFrame_url: "",
        animFrame_interval: "",
        animFrame_loop: "",
        animFrame_size: "",
        left: "",
        top: "",
        animFrame_fadeIn: ""
    },

    start: function (pm) {
        let isElectron = false;
        if (window && window.process && window.process.type) {
            isElectron = true;
        }
        class FrameAnimation {
            constructor(jsonFilePath, imageFolderPath, interval, loop) {
                this.jsonFilePath = jsonFilePath;
                this.imageFolderPath = imageFolderPath;
                this.interval = interval;
                this.loop = loop;
                this.imageFiles = [];
                this.currentFrame = 0;
                this.preloadedImages = new Map();
                this.init();
            }

            async init() {
                const showMessage = (message, isError = false) => {
                    if (isElectron) {
                        isError ? console.error(message) : console.log(message);
                    } else {
                        alert(message);
                    }
                }

                const fetchFiles = async (jsonFilePath) => {
                    let data;

                    try {
                        if (isElectron) {
                            const path = require('path');
                            const fs = require('fs');
                            let dirPath = path.join(__dirname, 'data/bgimage/animationFrame/', pm.animFrame_url);
                            data = await fs.promises.readdir(dirPath);
                        } else if (window.isRunningInWebView) {
                            if (window.AndroidInterface && typeof window.AndroidInterface.readFileFromAssets === "function") {
                                let fileContent = window.AndroidInterface.readFileFromAssets("data/bgimage/animationFrame/results.json");
                                if (fileContent) {
                                    data = JSON.parse(fileContent);
                                } else {
                                    throw new Error(`Failed to read file from assets: ${jsonFilePath}`);
                                }
                            } else {
                                throw new Error("AndroidInterface is not available");
                            }
                        } else {
                            let response = await fetch(jsonFilePath);
                            if (!response.ok) {
                                throw new Error(`Failed to fetch ${jsonFilePath}: ${response.statusText}`);
                            }
                            data = await response.json();
                        }
                    } catch (error) {
                        console.error(`Ошибка при чтении JSON файла: ${jsonFilePath}`, error);
                        return [];
                    }


                    if (typeof data !== 'object' || data === null) {
                        console.warn(`JSON файл ${jsonFilePath} не содержит объекта или списка`);
                        return [];
                    }

                    let filenames = [];
                    if (isElectron) {
                        filenames = data;
                    } else {
                        let targetFolder;
                        const findTargetFolder = (node) => {
                            if (node.type === 'folder' && node.name === pm.animFrame_url) {
                                targetFolder = node;
                                return;
                            }
                            if (node.type === 'folder') {
                                for (let child of node.children) {
                                    findTargetFolder(child);
                                }
                            }
                        }
                        findTargetFolder(data);

                        if (!targetFolder) {
                            console.warn(`Папка ${pm.animFrame_url} не найдена в JSON файле ${jsonFilePath}`);
                            return [];
                        }

                        const extractFilenames = (node) => {
                            if (node.type === 'file') {
                                filenames.push(node.name);
                            }
                        }
                        for (let child of targetFolder.children) {
                            extractFilenames(child);
                        }
                    }

                    return filenames;
                }


                try {
                    let files = await fetchFiles(this.jsonFilePath);

                    const animFilesRegex = /^anim_-?\d+/;
                    this.imageFiles = files
                        .filter((file) => animFilesRegex.test(file))
                        .sort((a, b) => parseInt(a.match(animFilesRegex)[1]) - parseInt(b.match(animFilesRegex)[1]));

                    if (this.imageFiles.length > 0) {
                        this.preloadImages().then(() => {
                            this.startAnimation();
                        });
                    } else {
                        showMessage("Не найдены файлы анимации");
                    }
                } catch (err) {
                    showMessage("Ошибка чтения директории: " + err, true);
                    return;
                }
            }

            async preloadImages() {
                const promises = this.imageFiles.map(async (imageFile) => {
                    const img = new Image();
                    if (isElectron) {
                        const path = require('path');
                        img.src = path.join(this.imageFolderPath, imageFile);
                    } else {
                        img.src = new URL(this.imageFolderPath + pm.animFrame_url + '/' + imageFile).href;
                    }

                    return new Promise((resolve, reject) => {
                        img.onload = () => {
                            this.preloadedImages.set(imageFile, img);
                            console.log(`Загружено изображение: ${imageFile} Путь: ${img.src}`);
                            resolve();
                        };
                        img.onerror = (err) => {
                            console.error(`Ошибка загрузки изображения: ${imageFile} Путь: ${img.src}`);
                            reject(err);
                        };
                    });
                });

                try {
                    await Promise.all(promises);
                } catch (err) {
                    console.error(err);
                }
            }

            startAnimation() {
                const container = document.createElement('div');
                const imageElement = document.createElement('img');
                let baseLayer = "";

                if (pm.animFrame_size === "true") {
                    imageElement.style.cssText = 'width: 100%; height: 100%;';
                    container.style.top = baseLayer.offsetTop + 'px';
                    container.style.left = baseLayer.offsetLeft + 'px';
                    baseLayer = document.querySelector('.layer.base_fore.layer_fore.layer_camera');
                    container.style.cssText = 'position: absolute; width: 100%; height: 100%; pointer-events: none;';
                } else {
                    baseLayer = document.querySelector('.message_outer');
                    container.style.cssText = `position: absolute; pointer-events: none; left: ${pm.left}px; top: ${pm.top}px; object-fit: contain;`;
                    console.log(pm.left);
                }

                container.classList.add('animationContainer');
                container.setAttribute('id', pm.animFrame_id);
                container.setAttribute('data-size', pm.animFrame_size);

                container.appendChild(imageElement);
                baseLayer.parentElement.insertBefore(container, baseLayer);

                let hasFadedOut = false;

                const fadeOutBaseLayer = () => {
                    const dataSize = container.getAttribute('data-size');

                    if (dataSize === "true" && !hasFadedOut) {
                        if (pm.animFrame_size === "true") {
                            const baseLayer = $(".layer.base_fore.layer_fore.layer_camera");
                            const fadeInDuration = parseInt(pm.animFrame_fadeIn);
                            if (baseLayer.length > 0) {
                                baseLayer.animate({
                                    opacity: 0
                                }, fadeInDuration);
                                hasFadedOut = true;
                            }
                        }
                    }
                }

                const displayFrame = () => {
                    let img = this.preloadedImages.get(this.imageFiles[this.currentFrame]);
                    if (!img) {
                        console.error(`Image ${this.imageFiles[this.currentFrame]} not found in preloaded images.`);
                        return;
                    }
                    imageElement.src = img.src;

                    if (this.currentFrame === 0) {
                        fadeOutBaseLayer();
                    }
                    this.currentFrame++;

                    if (this.currentFrame >= this.imageFiles.length) {
                        if (this.loop === "true") {
                            this.currentFrame = 0;
                        } else {
                            clearInterval(animationInterval);
                        }
                    }
                };

                const animationInterval = setInterval(displayFrame, this.interval);
                displayFrame();
            }
        }

        let jsonFilePath, imageFolderPath;

        if (window.isRunningInWebView) {
            // Пути для Android
            const baseAssetPath = "file:///android_asset/";
            jsonFilePath = window.AndroidInterface.readFileFromAssets("data/bgimage/animationFrame/results.json");
            imageFolderPath = baseAssetPath + "data/bgimage/animationFrame/";
        } else if (window.process && window.process.type) {
            // Пути для Electron
            const path = require('path');
            imageFolderPath = path.join(__dirname, 'data/bgimage/animationFrame/' + pm.animFrame_url);
        } else {
            // Пути для браузера
            let subdirs = window.location.pathname.split('/');
            subdirs = subdirs.slice(0, subdirs.length - 1);
            let subdirPath = subdirs.join('/');
            jsonFilePath = new URL(`${subdirPath}/data/bgimage/animationFrame/results.json`, window.location.href).href;
            imageFolderPath = new URL(`${subdirPath}/data/bgimage/animationFrame/`, window.location.href).href;
        }

        const interval = pm.animFrame_interval;
        const loop = pm.animFrame_loop;

        new FrameAnimation(jsonFilePath, imageFolderPath, interval, loop);

        TYRANO.kag.ftag.nextOrder();
    }
};

tyrano.plugin.kag.tag.animFrameClose = {
    vital: ["animFrameClose_id"],
    pm: {
        animFrameClose_id: "",
        animFrameClose_fadeOut: ""
    },

    start: function (pm) {
        const container = document.querySelector('.animationContainer');
        if (container) {
            const containerId = container.getAttribute('id');
            const dataSize = container.getAttribute('data-size');
            if (containerId === pm.animFrameClose_id) {
                const baseLayer = $(".layer.base_fore.layer_fore.layer_camera");
                const fadeOutDuration = parseInt(pm.animFrameClose_fadeOut);
                if (dataSize === "true") {
                    if (baseLayer.length > 0) {
                        baseLayer.animate({
                            opacity: 1
                        }, fadeOutDuration);
                    }
                }
                container.remove();
            }
        }

        TYRANO.kag.ftag.nextOrder();
    }
};

tyrano.plugin.kag.tag.buttonHover = {
    vital: [],
    pm: {
        storage: null,
        target: null,
        graphic: "",
        graphicH: "",
        folder: "image",
        visible: "true",
        x: "",
        y: "",
        width: "",
        height: "",
        role: "",
        fix: "false",
        storageSe: "",
        soundVolume: "",
    },

    start: function(pm) {
        if (pm.role) pm.fix = 'true';
        let target_layer = pm.fix === 'false' ? this.kag.layer.getFreeLayer().css('z-index', 999999) : this.kag.layer.getLayer('fix');
        let storage_url = pm.graphic.startsWith('http') ? pm.graphic : `./data/${pm.folder}/${pm.graphic}`;
        let storage_url_hover = `./data/${pm.folder}/${pm.graphicH}`;

        let hoverButton = $(`<div class='buttonHover' data-pm='${JSON.stringify(pm).replace(/"/g, "&quot;")}'></div>`);

        hoverButton.css({
            'position': 'absolute',
            'cursor': 'pointer',
            'z-index': 99999999,
            'display': pm.visible === 'true' ? 'block' : 'none',
            'left': pm.x ? pm.x + 'px' : this.kag.stat.locate.x + 'px',
            'top': pm.y ? pm.y + 'px' : this.kag.stat.locate.y + 'px',
            'width': pm.width ? pm.width + 'px' : '',
            'height': pm.height ? pm.height + 'px' : '',
            'backgroundImage': `url(${storage_url})`,
            'backgroundSize': 'cover',
            'transition': 'background-image 0.5s',
        }).hover(
            function () {
                $(this).css('backgroundImage', `url(${storage_url_hover})`);
            },
            function () {
                $(this).css('backgroundImage', `url(${storage_url})`);
            }
        );

        if (pm.face) {
            hoverButton.css('font-family', pm.face);
        }

        if ("" !== pm.graphic) {
            hoverButton.addClass("button_graphic");
        } else {
            hoverButton.addClass(pm.color);
        }

        target_layer.append(hoverButton);
        if (pm.fix === 'false') target_layer.show();

        this.kag.ftag.nextOrder();
    }
};

tyrano.plugin.kag.tag.imageShowN = {
    vital: [],
    pm: {
        storage: null,
        target: null,
        folder: "fgimage",
        visible: "true",
        x: "",
        y: "",
        width: "",
        height: "",
        role: "",
        fix: "false",
        idImage: "",
        zIndex: "",
        selectAnimationList: "",
        time: "",
        storage_url: "",
        repeatingAnimationList: ""
    },

    start: function (pm) {
        this.createImage(pm);
        TYRANO.kag.ftag.nextOrder();

    },
    createImage: function (pm) {
        if (pm.role) pm.fix = 'true';
        let target_layer = this.kag.layer.getLayer('base');
        let storage_url = pm.storage.startsWith('http') ? pm.storage : `./data/${pm.folder}/${pm.storage}`;

        const uniqueId = `unique_${pm.storage_url}_${pm.x}_${pm.y}`;
        var existingElement = $(`[data-unique-id='${uniqueId}']`);
        if (existingElement.length === 0) {
            let j_button = $('<div />', {
                'css': {
                    'position': 'absolute',
                    'z-index': pm.zIndex,
                    'display': pm.visible === 'true' ? 'block' : 'none',
                    'left': pm.x ? pm.x + 'px' : this.kag.stat.locate.x + 'px',
                    'top': pm.y ? pm.y + 'px' : this.kag.stat.locate.y + 'px',
                    'width': pm.width ? pm.width + 'px' : '',
                    'height': pm.height ? pm.height + 'px' : '',
                    'backgroundImage': `url(${storage_url})`,
                    'backgroundSize': 'cover',
                    '--animate-duration': `${pm.time}s`
                },
                'class': `animate__animated ${pm.selectAnimationList} ${pm.repeatingAnimationList} ${pm.fix !== 'false' ? 'fixlayer' : ''}`,
                'title': pm.hint || '',
                'alt': pm.hint || '',
                'data-id': pm.idImage,
                'data-storage_url': pm.storage,
                'data-unique-id': uniqueId
            });

            this.kag.event.addEventElement({ tag: 'button', j_target: j_button, pm: pm });
            target_layer.append(j_button);
            if (pm.fix === 'false') {
                target_layer.show();
            }
        } else {
            console.warn("Элемент с таким уникальным идентификатором уже существует.");
        }
    }
};

tyrano.plugin.kag.tag.imageHideN = {
    pm: {
        layer: "",
        page: "fore",
        time: "",
        wait: "true",
        idImage: "",
        selectAnimationList: ""
    },
    start: function (pm) {
        const baseElement = document.getElementById('tyrano_base');
        if (baseElement) {
            const imgs = baseElement.querySelectorAll('div[data-id]');
            const removePromises = [];

            for (let i = imgs.length - 1; i >= 0; i--) {
                const img = imgs[i];
                if (img) {
                    var dataIdValue = img.getAttribute('data-id');
                    if (dataIdValue === pm.idImage || pm.idImage === "0") {
                        removePromises.push(this.removeElementAfterAnimation(img, pm));
                    }
                }
            }
            Promise.all(removePromises).then(() => {
                TYRANO.kag.ftag.nextOrder();
            });
        } else {
            TYRANO.kag.ftag.nextOrder();
        }
    },
    removeElementAfterAnimation: function (img, pm) {
        return new Promise((resolve, reject) => {
            console.warn("Work");
            img.classList.add('animate__animated', pm.selectAnimationList);
            if (img.classList.contains('animate__repeat-1')) {
                img.addEventListener('animationend', function () {
                    img.remove();
                    resolve();
                }, { once: true });
            } else {
                $(img).fadeOut(500, function () {
                    $(img).remove();
                    resolve();
                });
            }
        });
    }
};

tyrano.plugin.kag.tag.systemButton = {
    pm: {
        type: "",
        color: "btn_01_black",
        font_color: "",
        storage: "config.ks",
        target: null,
        name: "",
        text: "",
        x: "auto",
        y: "",
        width: "",
        height: "",
        size: 30,
        graphic: "",
        glink_sm: "",
        enterimg: "",
        cm: "true",
        clickse: "",
        enterse: "",
        leavese: "",
        face: "",
        bindings: ""
    }, start: function (pm) {
        var target_layer = null;
        (target_layer = this.kag.layer.getFreeLayer()).css("z-index", 999999);
        var s_button = $("<div class='system_button'>" + pm.text + "</div>");

        s_button.css("position", "absolute");
        s_button.css("cursor", "pointer");
        s_button.css("z-index", 99999999);
        s_button.css("display", "flex");
        s_button.css("align-items", "center");
        s_button.css("justify-content", "center");
        s_button.css("font-size", pm.size + "px");
        "" != pm.font_color && s_button.css("color", $.convertColor(pm.font_color));
        "" != pm.height && s_button.css("height", pm.height + "px");
        "" != pm.width && s_button.css("width", pm.width + "px");
        if ("" != pm.graphic) {
            s_button.removeClass("glink_button").addClass("button_graphic");
            var img_url = "./data/image/" + pm.graphic;
            s_button.css("background-image", "url(" + img_url + ")");
            s_button.css("background-repeat", "no-repeat");
            s_button.css("background-position", "center center");
            s_button.css("background-size", "100% 100%")
        } else s_button.addClass(pm.color);
        "" != pm.face ? s_button.css("font-family", pm.face) : "" != this.kag.stat.font.face && s_button.css("font-family", this.kag.stat.font.face);
        if ("auto" == pm.x) {
            var sc_width = parseInt(this.kag.config.scWidth), center = Math.floor(parseInt(s_button.css("width")) / 2),
                first_left = Math.floor(sc_width / 2) - center;
            s_button.css("left", first_left + "px")
        } else "" == pm.x ? s_button.css("left", this.kag.stat.locate.x + "px") : s_button.css("left", pm.x + "px");
        "" == pm.y ? s_button.css("top", this.kag.stat.locate.y + "px") : s_button.css("top", pm.y + "px");
        $.setName(s_button, pm.name);
        this.kag.event.addEventElement({ tag: "glink", j_target: s_button, pm: pm });
        this.setEvent(s_button, pm);

        if (pm.bindings === "1") {
            $('.message0_fore').append(s_button)
            TYRANO.kag.ftag.nextOrder();
        } else {
            $('.tyrano_base').append(s_button)
            TYRANO.kag.ftag.nextOrder();
        }

        TYRANO.kag.ftag.nextOrder();
    }, setEvent: function (s_button, pm) {
        var that = TYRANO;

        !function () {
            pm.target, pm.storage;
            var _pm = pm
            s_button.click((function (e) {
                if (pm.type === "1") {
                    TYRANO.kag.menu.showMenu()
                } else if (pm.type === "2") {
                    TYRANO.kag.key_mouse.save()
                } else if (pm.type === "3") {
                    TYRANO.kag.key_mouse.load()
                } else if (pm.type === "4") {
                    // showSettings()
                    alert("In progress!")
                }

            }));
            s_button.hover((function () {
                if ("" != _pm.enterimg) {
                    var enterimg_url = "./data/image/" + _pm.enterimg;
                    s_button.css("background-image", "url(" + enterimg_url + ")")
                }
                "" != _pm.enterse && that.kag.ftag.startTag("playse", { storage: _pm.enterse, stop: !0 })
            }), (function () {
                if ("" != _pm.enterimg) {
                    var img_url = "./data/image/" + _pm.graphic;
                    s_button.css("background-image", "url(" + img_url + ")")
                }
                "" != _pm.leavese && that.kag.ftag.startTag("playse", { storage: _pm.leavese, stop: !0 })
            }))
        }()
    }
};

tyrano.plugin.kag.tag.varSetting = {
    pm: {
        varName: "",
        arithmeticOperations: "",
        valueNum: "",
        valueText: "",
        valueRandom: ""
    },
    start: function (pm) {
        let valueVariable;
        let varName = pm.varName;
        let varType = varName.split('.')[0];
        let parts = pm.valueRandom.split('-');
        let firstNumber = parseInt(parts[0], 10);
        let secondNumber = parseInt(parts[1], 10);



        function getRandomNumberBetween(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        if (varType === "f") {
            valueVariable = TYRANO.kag.stat;
            pm.varName.split(".").forEach(element => {
                if (valueVariable && valueVariable.hasOwnProperty(element)) {
                    valueVariable = valueVariable[element];
                }
            });

            if (pm.valueText !== "") {
                let res = pm.valueText.toString();
                eval('TYRANO.kag.stat.' + pm.varName + ' = res;');
                TYRANO.kag.ftag.nextOrder();
            } else if (pm.valueRandom !== "0-0") {
                let res = getRandomNumberBetween(firstNumber, secondNumber);
                eval('TYRANO.kag.stat.' + pm.varName + ' = res;');
                TYRANO.kag.ftag.nextOrder();
            } else {
                if (pm.arithmeticOperations === "+") {
                    let res = Number(valueVariable) + Number(pm.valueNum);
                    eval('TYRANO.kag.stat.' + pm.varName + ' = res;');
                    TYRANO.kag.ftag.nextOrder();
                } else if (pm.arithmeticOperations === "-") {
                    let res = Number(valueVariable) - Number(pm.valueNum);
                    eval('TYRANO.kag.stat.' + pm.varName + ' = res;');
                    TYRANO.kag.ftag.nextOrder();
                } else if (pm.arithmeticOperations === "*") {
                    let res = Number(valueVariable) * Number(pm.valueNum);
                    console.warn(res)
                    eval('TYRANO.kag.stat.' + pm.varName + ' = res;');
                    TYRANO.kag.ftag.nextOrder();
                } else if (pm.arithmeticOperations === "/") {
                    let res = Number(valueVariable) / Number(pm.valueNum);
                    eval('TYRANO.kag.stat.' + pm.varName + ' = res;');
                    TYRANO.kag.ftag.nextOrder();
                } else if (pm.arithmeticOperations === "=") {
                    let res = Number(pm.valueNum);
                    eval('TYRANO.kag.stat.' + pm.varName + ' = res;');
                    TYRANO.kag.ftag.nextOrder();
                } else if (pm.arithmeticOperations === "%") {
                    let res = Number(valueVariable) % Number(pm.valueNum);
                    eval('TYRANO.kag.stat.' + pm.varName + ' = res;');
                    TYRANO.kag.ftag.nextOrder();
                }
            }
        } else {
            valueVariable = TYRANO.kag.variable;
            pm.varName.split(".").forEach(element => {
                if (valueVariable && valueVariable.hasOwnProperty(element)) {
                    valueVariable = valueVariable[element];
                }
            });

            if (pm.valueText !== "") {
                let res = pm.valueText.toString();
                eval('TYRANO.kag.variable.' + pm.varName + ' = res;');
                TYRANO.kag.ftag.nextOrder();
            } else if (pm.valueRandom !== "0-0") {
                let res = getRandomNumberBetween(firstNumber, secondNumber);
                eval('TYRANO.kag.variable.' + pm.varName + ' = res;');
                TYRANO.kag.ftag.nextOrder();
            } else {
                if (pm.arithmeticOperations === "+") {
                    let res = Number(valueVariable) + Number(pm.valueNum);
                    eval('TYRANO.kag.variable.' + pm.varName + ' = res;');
                    TYRANO.kag.ftag.nextOrder();
                } else if (pm.arithmeticOperations === "-") {
                    let res = Number(valueVariable) - Number(pm.valueNum);
                    eval('TYRANO.kag.variable.' + pm.varName + ' = res;');
                    TYRANO.kag.ftag.nextOrder();
                } else if (pm.arithmeticOperations === "*") {
                    let res = Number(valueVariable) * Number(pm.valueNum);
                    eval('TYRANO.kag.variable.' + pm.varName + ' = res;');
                    TYRANO.kag.ftag.nextOrder();
                } else if (pm.arithmeticOperations === "/") {
                    let res = Number(valueVariable) / Number(pm.valueNum);
                    eval('TYRANO.kag.variable.' + pm.varName + ' = res;');
                    TYRANO.kag.ftag.nextOrder();
                } else if (pm.arithmeticOperations === "=") {
                    let res = Number(pm.valueNum);
                    eval('TYRANO.kag.variable.' + pm.varName + ' = res;');
                    TYRANO.kag.ftag.nextOrder();
                }
            }
        }

        TYRANO.kag.ftag.nextOrder();
    }
};



tyrano.plugin.kag.tag.charVoice = {
    pm: {
        url: "",
        volume: ""
    },
    start: function (pm) {
        let patch = "./data/sound/" + pm.url;
        charVoice.play(patch);
        this.initVolume();
        TYRANO.kag.ftag.nextOrder();
    },
    initVolume: function () {
        let nameVeVolumeGame = TYRANO.kag.kag.stat.title + "_vo";
        const savedVolume = localStorage.getItem(nameVeVolumeGame);
        let volume;
        if (savedVolume !== null) {
            volume = parseFloat(savedVolume) / 100;
        }
        charVoice.setVolume(volume);
    }
};


const charVoice = new charSetVoice();
function charSetVoice() {
    this.currentSound = null;

    this.play = function (url) {
        if (this.currentSound) {
            this.currentSound.stop();
        }

        this.currentSound = new Howl({
            src: [url],
            volume: 1.0,
            onloaderror: function (id, error) {
                console.error("Load error for sound file:", url, "Error:", error);
            },
            onplayerror: function (id, error) {
                console.error("Play error for sound file:", url, "Error:", error);
            }
        });

        this.currentSound.play();
    };

    this.setVolume = function (volume) {
        if (this.currentSound) {
            this.currentSound.volume(volume);
        }
    };

    this.getVolume = function () {
        return this.currentSound ? this.currentSound.volume() : 0;
    };
}


// Next Chat
tyrano.plugin.kag.tag.nextChatConfig = {
    pm: {
        nextChatWidth: "",
        nextChatHeight: "",
        nextChatInnerWidth: "",
        nextChatInnerHeight: "",
        nextChat_BG: "",
        nextChat_BG2: "",
        nextChatZIndex: "",
        nextChatPrelImage: "",
        nextChatPlaySe: "",
        nextChatInnerPosTop: "",
        nextChatInnerPosLeft: "",
        nextChatBG2Opacity: "",
        nextChatBG2Blend: "",
        nextChatGlobalWaitMessage: "",
        nextChatNameColor: "",
        nextChatTextColor: "",
        nextChatNameSize: "",
        nextChatTextSize: "",
        nextChatFontName: "",
        nextChatFontText: "",
        nextChatLeftColor: "",
        nextChatRightColor: "",
        nextChatCenterColor: "",
        nextChatBGType: "",
        nextChatBGLeft: "",
        nextChatBGRight: "",
        nextChatBGCenter: "",
        chatAvatarSize: "",
    },
    start: function (pm) {
        let layerEventClick = document.querySelector(".layer_event_click")
        window.globalSettingsNextChat = {
            nextChatNameColor: pm.nextChatNameColor,
            nextChatTextColor: pm.nextChatTextColor,
            nextChatNameSize: pm.nextChatNameSize,
            nextChatTextSize: pm.nextChatTextSize,
            nextChatFontName: pm.nextChatFontName,
            nextChatFontText: pm.nextChatFontText,
            nextChatLeftColor: pm.nextChatLeftColor,
            nextChatRightColor: pm.nextChatRightColor,
            nextChatCenterColor: pm.nextChatCenterColor,
            nextChatBGType: pm.nextChatBGType,
            nextChatBGLeft: pm.nextChatBGLeft,
            nextChatBGRight: pm.nextChatBGRight,
            nextChatBGCenter: pm.nextChatBGCenter,
            preloaderName: pm.nextChatPrelImage,
            nextChatPlaySe: this.nextChatPlaySe(pm),
            nextChatGlobalWaitMessage: pm.nextChatGlobalWaitMessage,
            chatAvatarSize: pm.chatAvatarSize,
            zIndexChat: pm.chatAvatarSize,
            layerEventClick: layerEventClick
        }
        this.createChatBox(pm);
        TYRANO.kag.ftag.nextOrder();
    },
    createChatBox: function (pm) {
        var baseElement = document.getElementById('tyrano_base');
        var nextChatContainer = document.createElement('div');
        var nextChat = document.createElement('div');
        var nextChatInner = document.createElement('div');
        var nextChatIMG = document.createElement('img');
        var nextChatButtonContainer = document.createElement('div');
        nextChatContainer.id = 'nextChatContainer';
        nextChatContainer.className = 'nextChatContainer';
        nextChat.id = 'nextChat';
        nextChat.className = 'nextChat';
        nextChatInner.id = 'nextChatInner';
        nextChatInner.className = 'nextChatInner';
        nextChatInner.classList.add('no-scrollbar');
        nextChatIMG.id = 'nextChatIMG';
        nextChatIMG.className = 'nextChatIMG';
        nextChatIMG.src = 'data/image/' + pm.nextChat_BG2;
        nextChatButtonContainer.id = 'nextChatButtonContainer';
        nextChatButtonContainer.className = 'nextChatButtonContainer';
        nextChatContainer.style.zIndex = pm.zIndexChat;
        nextChatContainer.style.width = pm.nextChatWidth + 'px';
        nextChatContainer.style.height = pm.nextChatHeight + 'px';
        nextChatContainer.style.left = pm.left + 'px';
        nextChatContainer.style.top = pm.top + 'px';
        nextChatContainer.style.position = 'absolute';
        nextChat.style.width = pm.nextChatWidth + 'px';
        nextChat.style.height = pm.nextChatHeight + 'px';
        nextChatInner.style.width = pm.nextChatInnerWidth + 'px';
        nextChatInner.style.height = pm.nextChatInnerHeight + 'px';
        nextChatInner.style.top = pm.nextChatInnerPosTop + 'px';
        nextChatInner.style.left = pm.nextChatInnerPosLeft + 'px';
        nextChatInner.style.backgroundColor = "rgba(255,255,255,0)"
        nextChatInner.style.position = 'relative';
        nextChatInner.style.display = 'grid';
        nextChatInner.style.gridTemplateColumns = '1fr';
        nextChatInner.style.gridAutoRows = 'min-content';
        nextChatInner.style.gap = '0';
        nextChatInner.style.gridAutoFlow = 'row';
        nextChatInner.style.overflowY = 'scroll';
        nextChatInner.style.scrollbarWidth = 'none';
        nextChatInner.style.padding = '10px 7px 0px 7px';
        nextChatInner.style.scroll = '10px 7px 0px 7px';
        nextChatInner.addEventListener('wheel', function (event) {
            event.stopPropagation();
        }, { passive: false });
        nextChatInner.addEventListener('touchmove', function (event) {
            event.stopPropagation();
        }, { passive: false });
        nextChatContainer.addEventListener('click', function (event) {
            if (event.target.tagName === 'IMG') {
                return;
            }
            nextChatContainer.style.zIndex = '5000';
            setTimeout(() => {
                var artificialClick = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                var elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);
                elementUnderCursor.dispatchEvent(artificialClick);
                nextChatContainer.style.zIndex = '10000';
            }, 10);
        });
        if (pm.nextChat_BG !== "") {
            nextChat.style.backgroundImage = 'url(' + 'data/image/' + pm.nextChat_BG + ')';
            nextChat.style.backgroundSize = 'cover';
            nextChat.style.backgroundRepeat = 'no-repeat';
        } else {
            nextChat.style.backgroundColor = "#2d2d2d"
        }
        if (pm.nextChat_BG2 !== "") {
            nextChatIMG.style.backgroundImage = 'url(' + 'data/image/' + pm.nextChat_BG2 + ')';
            nextChatIMG.style.backgroundSize = 'cover';
            nextChatIMG.style.backgroundRepeat = 'no-repeat';
            nextChatIMG.style.zIndex = pm.nextChatZIndex;
            nextChatIMG.style.mixBlendMode = pm.nextChatBG2Blend;
            nextChatIMG.style.opacity = pm.nextChatBG2Opacity;
            nextChatIMG.style.position = 'absolute';
            nextChatIMG.style.bottom = '0';
            nextChatIMG.style.pointerEvents = 'none';
        } else {
            nextChatIMG.style.display = "none"
        }
        baseElement.appendChild(nextChatContainer);
        nextChatContainer.appendChild(nextChat)
        nextChat.appendChild(nextChatInner);
        nextChat.appendChild(nextChatIMG);
        nextChatInner.appendChild(nextChatButtonContainer);

    },
    nextChatPlaySe: function (pm) {
        let sound = new Howl({
            src: "data/sound/" + [pm.nextChatPlaySe],
            loop: false,
            html5: true,
            volume: 1.0,
        });
        return {
            nextChatPlaySound: function () {
                sound.play();
            },
            nextChatStopSound: function () {
                sound.stop();
            }
        };
    },
};

tyrano.plugin.kag.tag.nextChatMessage = {
    pm: {
        nextChatText: "",
        nextChatPos: "",
        nextChatWait: "",
        nextChatNameChar: "",
        nextChatNameCharImg: "",
        nextChatWaitClick: "",
        nextChatVideo: "",
        nextChatAudio: "",
        nextChatGraphic: ""
    },
    start: function (pm) {
        const nextChatInner = document.getElementById('nextChatInner');
        const createChatDone = this.createChatMessage(pm, nextChatInner);

        if (createChatDone.flag === true && createChatDone.wait === "true") {
            this.kag.ftag.startTag('p', {})
        } else {
            this.kag.ftag.startTag("wait", { time: window.globalSettingsNextChat.nextChatGlobalWaitMessage })
            this.kag.ftag.nextOrder();
        }

    },
    tagReplacesName: function (pm, chatMessageName) {
        if (pm.nextChatNameChar !== "") {
            chatMessageName.innerText = pm.nextChatNameChar.replace(/&nbsp;/g, " ");
        }
        pm.nextChatText = pm.nextChatText.replace(/\{\*(.*?)\}/, function (match, content) {
            let variableMatch = /^(f|sf)\.(.+)/.exec(content);
            if (variableMatch) {
                let type = variableMatch[1];
                let path = variableMatch[2];
                let variables = tyrano.plugin.kag.rider.getVariables();
                let value;

                if (type === 'f') {
                    value = variables['f'][path];
                } else if (type === 'sf') {
                    value = variables['sf'][path];
                }
                chatMessageName.innerText = value !== undefined ? value : match;
                return '';
            } else {
                let finalName = pm.nextChatNameChar === "" ? content : pm.nextChatNameChar;
                finalName = finalName.replace(/&nbsp;/g, " ");
                chatMessageName.innerText = finalName;
                return '';
            }
        });
    },
    createChatMessage: function (pm, nextChatInner) {
        let chatMessage = document.createElement('p');
        let chatMessageImage = document.createElement('img');
        let chatMessageVideo = document.createElement('video');
        let chatMessageAudio = document.createElement('audio');
        let chatMessageName = document.createElement('span');
        let chatMessageAvatar = document.createElement('div');
        chatMessage.id = 'chatMessage';
        chatMessage.className = 'chatMessage';
        chatMessageName.id = 'chatMessageName';
        chatMessageName.className = 'chatMessageName';
        chatMessageAvatar.id = 'chatMessage';
        chatMessageAvatar.className = 'chatMessage';
        chatMessageVideo.id = 'chatMessageVideo';
        chatMessageVideo.className = 'chatMessageVideo';
        chatMessageAudio.id = 'chatMessageAudio';
        chatMessageAudio.className = 'chatMessageAudio';
        chatMessageAvatar.id = 'chatMessage';
        chatMessageAvatar.className = 'chatMessage';
        chatMessage.style.padding = '5px';
        chatMessage.style.borderRadius = '12px';
        chatMessage.style.gridColumn = '1';
        chatMessageName.style.fontFamily = window.globalSettingsNextChat.nextChatFontName;
        chatMessageName.style.fontSize = window.globalSettingsNextChat.nextChatNameSize + "px";
        chatMessageName.style.color = $.convertColor(window.globalSettingsNextChat.nextChatNameColor);
        chatMessage.style.fontFamily = window.globalSettingsNextChat.nextChatFontText;
        chatMessage.style.fontSize = window.globalSettingsNextChat.nextChatTextSize + "px";
        chatMessage.style.color = $.convertColor(window.globalSettingsNextChat.nextChatTextColor);
        switch (pm.nextChatPos) {
            case "left":
                chatMessage.style.justifySelf = 'start';
                if (window.globalSettingsNextChat.nextChatBGType === "true") {
                    chatMessage.style.backgroundImage = 'url(' + "data/image/" + window.globalSettingsNextChat.nextChatBGLeft + ')';
                    chatMessage.style.backgroundRepeat = 'none';
                    chatMessage.style.backgroundSize = 'cover';
                } else {
                    chatMessage.style.backgroundColor = $.convertColor(window.globalSettingsNextChat.nextChatLeftColor);
                }
                chatMessage.style.maxWidth = "60%"
                if (pm.nextChatNameCharImg !== "") {
                    chatMessage.style.display = 'grid';
                    chatMessage.style.gridTemplateColumns = 'auto 1fr';
                    chatMessage.style.gridTemplateRows = 'auto auto';
                    chatMessage.style.alignItems = 'start';
                    chatMessage.style.gap = '5px';
                    chatMessageAvatar.style.width = `${window.globalSettingsNextChat.chatAvatarSize}px`;
                    chatMessageAvatar.style.height = `${window.globalSettingsNextChat.chatAvatarSize}px`;
                    chatMessageAvatar.style.gridRow = '1 / span 2';
                    chatMessageAvatar.style.alignSelf = 'start';
                    chatMessageAvatar.style.borderRadius = '50%';
                    chatMessageAvatar.style.backgroundImage = 'url(' + "data/" + pm.nextChatNameCharImg + ')';
                    chatMessageAvatar.style.backgroundRepeat = 'none';
                    chatMessageAvatar.style.backgroundSize = 'cover';
                    this.tagReplacesName(pm, chatMessageName)
                    chatMessageName.style.gridRow = '1';
                    chatMessageName.style.gridColumn = '2';
                    chatMessageName.style.fontWeight = '600';
                } else {
                    chatMessage.style.display = 'grid';
                    chatMessage.style.gridTemplateColumns = '1fr';
                    chatMessage.style.gridTemplateRows = 'auto auto auto';
                    chatMessage.style.alignItems = 'start';
                    chatMessage.style.gap = '0px';
                    this.tagReplacesName(pm, chatMessageName)
                    chatMessageName.style.gridRow = '1';
                    chatMessageName.style.gridColumn = '1';
                    chatMessageName.style.fontWeight = '600';
                }
                break;
            case "center":
                chatMessage.style.justifySelf = 'center';
                if (window.globalSettingsNextChat.nextChatBGType === "true") {
                    chatMessage.style.backgroundImage = 'url(' + "data/image/" + window.globalSettingsNextChat.nextChatBGCenter + ')';
                    chatMessage.style.backgroundRepeat = 'none';
                    chatMessage.style.backgroundSize = 'cover';
                } else {
                    chatMessage.style.backgroundColor = $.convertColor(window.globalSettingsNextChat.nextChatCenterColor);
                }
                chatMessage.style.maxWidth = "80%"
                break;
            case "right":
                chatMessage.style.justifySelf = 'end';
                if (window.globalSettingsNextChat.nextChatBGType === "true") {
                    chatMessage.style.backgroundImage = 'url(' + "data/image/" + window.globalSettingsNextChat.nextChatBGRight + ')';
                    chatMessage.style.backgroundRepeat = 'none';
                    chatMessage.style.backgroundSize = 'cover';
                } else {
                    chatMessage.style.backgroundColor = $.convertColor(window.globalSettingsNextChat.nextChatRightColor);
                }
                chatMessage.style.maxWidth = "60%"
                chatMessageName.innerText = pm.nextChatNameChar;
                if (pm.nextChatNameCharImg !== "") {
                    chatMessage.style.display = 'grid';
                    chatMessage.style.gridTemplateColumns = '1fr auto';
                    chatMessage.style.gridTemplateRows = 'auto auto';
                    chatMessage.style.alignItems = 'start';
                    chatMessage.style.gap = '5px';
                    chatMessage.style.justifyContent = 'end';
                    chatMessageAvatar.style.width = `${window.globalSettingsNextChat.chatAvatarSize}px`;
                    chatMessageAvatar.style.height = `${window.globalSettingsNextChat.chatAvatarSize}px`;
                    chatMessageAvatar.style.gridRow = '1 / span 2';
                    chatMessageAvatar.style.gridColumn = '2';
                    chatMessageAvatar.style.alignSelf = 'start';
                    chatMessageAvatar.style.borderRadius = '50%';
                    chatMessageAvatar.style.backgroundImage = 'url(' + "data/" + pm.nextChatNameCharImg + ')';
                    chatMessageAvatar.style.backgroundRepeat = 'none';
                    chatMessageAvatar.style.backgroundSize = 'cover';
                    chatMessageAvatar.style.border = 'none';
                    this.tagReplacesName(pm, chatMessageName)
                    chatMessageName.style.gridRow = '1';
                    chatMessageName.style.gridColumn = '1';
                    chatMessageName.style.justifySelf = 'end';
                    chatMessageName.style.fontWeight = '600';

                } else {
                    chatMessage.style.display = 'grid';
                    chatMessage.style.gridTemplateColumns = '1fr';
                    chatMessage.style.gridTemplateRows = 'auto auto auto';
                    chatMessage.style.alignItems = 'start';
                    chatMessage.style.gap = '0px';
                    chatMessage.style.justifyContent = 'end';
                    this.tagReplacesName(pm, chatMessageName)
                    chatMessageName.style.gridRow = '1';
                    chatMessageName.style.gridColumn = '1';
                    chatMessageName.style.fontWeight = '600';
                    chatMessageName.style.justifySelf = 'end';
                }
                break;
        }
        let preloaderImage;
        function createPreloader(typePreloader) {
            let preloaderHTML;
            if (typePreloader === "spinner") {
                preloaderHTML = '<div class="spinner" style="position: relative"><div class="blob top"></div><div class="blob bottom"></div><div class="blob left"></div><div class="blob move-blob"></div></div>';
            } else if (typePreloader === "dots") {
                preloaderHTML = '<div class="dots_fade" style="position: relative"><span></span><span></span><span></span></div>';
            } else if (typePreloader === "radial") {
                preloaderHTML = '<div class="radial" style="position: relative"><span></span><span></span><span></span></div>';
            } else if (typePreloader === "spiral") {
                preloaderHTML = '<div class="spiral" style="position: relative"><div></div><div></div><div></div></div>';
            }
            return preloaderHTML;
        }
        function setupVideoVisibilityObserver(videoElement) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        videoElement.play();
                    } else {
                        videoElement.pause();
                    }
                });
            }, {
                threshold: 0.5
            });
            observer.observe(videoElement);
        }

        function displayMessage() {
            if (preloaderImage) {
                preloaderImage.remove();
            }
            function processText(text) {
                text = text.replace(/\{(f|sf)\.([^\}]+)\}/g, function (match, type, path) {
                    let variables = tyrano.plugin.kag.rider.getVariables();
                    let value;
                    if (type === 'f') {
                        value = variables['f'][path];
                    } else if (type === 'sf') {
                        value = variables['sf'][path];
                    }
                    return value !== undefined ? value : match;
                });
                text = text.replace(/\{img=(.+?),s=(\d+)\}/g, function (match, filename, size) {
                    return `<img src="data/image/${filename}" style="width: ${size}px; height: ${size}px;">`;
                });
                text = text.replace(/\{time\}/g, function () {
                    return systemInfo().getTimeActual();
                });
                text = text.replace(/\{osname\}/g, function () {
                    return systemInfo().getWinName();
                });
                text = text.replace(/\{username\}/g, function () {
                    return systemInfo().getNameUser();
                });
                text = text.replace(/\{year\}/g, function () {
                    return systemInfo().getDataYear();
                });
                return text;
            }
            let processedText = processText(pm.nextChatText);
            processedText = processedText.replace(/&nbsp;/g, " ");

            let p = document.createElement("p");
            p.className = "chatText";
            p.innerHTML = processedText;

            while (chatMessage.firstChild && chatMessage.firstChild !== chatMessageName && chatMessage.firstChild !== chatMessageAvatar) {
                chatMessage.removeChild(chatMessage.firstChild);
            }

            chatMessage.appendChild(p);

            if (pm.nextChatVideo !== "") {
                chatMessage.appendChild(chatMessageVideo);
                if (pm.nextChatPos === "left" || pm.nextChatPos === "right") {
                    chatMessageVideo.setAttribute("src", "data/video/" + pm.nextChatVideo);
                    if (pm.nextChatVideoControl === "true") chatMessageVideo.setAttribute("controls", "");
                    if (pm.nextChatVideoRepeat === "true") chatMessageVideo.setAttribute("loop", "");
                    chatMessageVideo.setAttribute("autoplay", "");
                    chatMessageVideo.setAttribute("playsinline", "");
                    chatMessageVideo.setAttribute("preload", "auto");
                    chatMessageVideo.style.gridColumn = '1/3';
                    chatMessageVideo.style.gridRow = '3';
                    chatMessageVideo.style.width = "100%";
                    setupVideoVisibilityObserver(chatMessageVideo);
                }
            }
            if (pm.nextChatAudio !== "") {
                chatMessage.appendChild(chatMessageAudio);
                if (pm.nextChatPos === "left" || pm.nextChatPos === "right") {
                    chatMessageAudio.setAttribute("src", "data/" + pm.nextChatAudio);
                    chatMessageAudio.setAttribute("controls", "none");
                    chatMessageAudio.style.gridColumn = '1/3';
                    chatMessageAudio.style.gridRow = '3';
                    chatMessageAudio.style.width = "100%";
                    chatMessageAudio.style.minWidth = "140px";
                }
            }
            if (pm.nextChatGraphic !== "") {
                chatMessage.appendChild(chatMessageImage);
                if (pm.nextChatPos === "left" || pm.nextChatPos === "right") {
                    chatMessageImage.setAttribute("src", "data/" + pm.nextChatGraphic);
                    function toggleFullScreenImage(image) {
                        if (image.classList.contains('fullscreen')) {
                            image.classList.remove('fullscreen');
                            image.style.position = '';
                            image.style.height = '';
                            image.style.width = '';
                            image.style.top = '';
                            image.style.left = '';
                            image.style.zIndex = '';
                            image.style.gridColumn = '1/3';
                            image.style.gridRow = '3';
                            image.style.width = "100%";
                        } else {
                            image.classList.add('fullscreen');
                            image.style.position = 'fixed';
                            image.style.height = '100%';
                            image.style.width = '100%';
                            image.style.top = '0';
                            image.style.left = '0';
                            image.style.zIndex = '1000';
                            image.style.objectFit = 'contain';

                        }
                    }
                    chatMessageImage.style.gridColumn = '1/3';
                    chatMessageImage.style.gridRow = '3';
                    chatMessageImage.style.width = "100%";
                    chatMessageImage.addEventListener('click', () => {
                        toggleFullScreenImage(chatMessageImage);
                    });
                }
            }
            window.globalSettingsNextChat.nextChatPlaySe.nextChatPlaySound();
            let logstr = "<b class='backlog_chara_name " + pm.nextChatNameChar + "'>" + pm.nextChatNameChar + "</b>: " + pm.nextChatText.replace(/&nbsp;/g, " ");
            TYRANO.kag.pushBackLog(logstr, "add");
            TYRANO.kag.layer.showEventLayer();
        }
        function scrollChat() {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    entry.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
            resizeObserver.observe(chatMessage);
        }
        if (pm.nextChatWait > 0) {
            chatMessage.innerHTML = createPreloader(window.globalSettingsNextChat.preloaderName);
            TYRANO.kag.layer.hideEventLayer();
            setTimeout(displayMessage, pm.nextChatWait);
            scrollChat();
        } else {
            displayMessage();
            scrollChat();
        }
        nextChatInner.appendChild(chatMessage);
        chatMessage.appendChild(chatMessageName);
        chatMessage.appendChild(chatMessageAvatar);
        return chatMessageObj = {
            flag: true,
            wait: pm.nextChatWaitClick,
            time: pm.nextChatWait
        };
    }
};

tyrano.plugin.kag.tag.nextChatButton = {
    pm: {
        nextChatButtonText: "",
        nextChatButtonType: "",
        nextChatButtonDefaultStyle: "",
        nextChatButtonBorderRadius: "",
        nextChatButtonAnimation: "",
        nextChatButtonHide: "",
        nextChatButtonHideAll: "",
        nextChatButtonDisable: "",
        graphic: "",
        graphicH: "",
        storage: "",
        target: "",
        widthButton: ""
    },
    start: function (pm) {
        let nextChatInner = document.getElementById('nextChatInner');
        const nextChatButtonContainer = document.getElementById('nextChatButtonContainer');
        let chatButton = document.createElement('button');
        this.nextChatButton(pm, nextChatButtonContainer, chatButton, nextChatInner);
        TYRANO.kag.ftag.nextOrder();
    },
    nextChatButton: function (pm, nextChatButtonContainer, chatButton, nextChatInner) {
        function createButtonContainer(button) {
            const buttonContainer = document.createElement('div');
            buttonContainer.className = "buttonContainer"

            buttonContainer.appendChild(button);
            if (pm.nextChatButtonType === "default") {
                buttonContainer.className = `nextChatButtonContainer animated ${pm.nextChatButtonAnimation}`;
                chatButton.style.width = pm.widthButton + "px";
                chatButton.style.height = pm.heightButton + "px";
                chatButton.classList.add(`${pm.nextChatButtonDefaultStyle}`)
                chatButton.style.marginBottom = "14px";
            } else {
                const originalBackgroundImage = 'data/' + pm.graphic;
                const hoverBackgroundImage = 'data/' + pm.graphicH;
                chatButton.style.backgroundSize = 'cover';
                chatButton.style.backgroundRepeat = 'no-repeat';
                chatButton.style.width = pm.widthButton + "px";
                chatButton.style.height = pm.heightButton + "px";
                chatButton.style.marginBottom = "14px";
                buttonContainer.className = `nextChatButtonContainerImg animated ${pm.nextChatButtonAnimation}`
                chatButton.className = `nextChatButtonContainerImg`
                chatButton.style.backgroundImage = 'url(' + originalBackgroundImage + ')';
                chatButton.addEventListener('mouseenter', function () {
                    chatButton.style.backgroundImage = 'url(' + hoverBackgroundImage + ')';
                });
                chatButton.addEventListener('mouseleave', function () {
                    chatButton.style.backgroundImage = 'url(' + originalBackgroundImage + ')';
                });
            }
            chatButton.style.borderRadius = pm.nextChatButtonBorderRadius + "px";
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    entry.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
            resizeObserver.observe(chatButton);
            return buttonContainer;
        }
        if (!chatButton.dataset.inserted) {
            const newButtonContainer = createButtonContainer(chatButton);
            const existingElementsCount = nextChatInner.childElementCount;
            if (existingElementsCount > 0) {
                const lastElement = nextChatInner.lastElementChild;
                nextChatInner.insertBefore(newButtonContainer, lastElement.nextSibling);
            } else {
                nextChatInner.appendChild(newButtonContainer);
            }
            chatButton.dataset.inserted = "true";
        }
        chatButton.innerText = pm.nextChatButtonText.replace(/&nbsp;/g, " ");

        chatButton.addEventListener('mouseover', function () {
            TYRANO.kag.layer.hideEventLayer();
        });
        chatButton.addEventListener('mouseout', function () {
            TYRANO.kag.layer.showEventLayer();
        });
        chatButton.addEventListener('click', () => {
            if (TYRANO.kag.actionTimeObj && typeof TYRANO.kag.actionTimeObj.actionTimeInterrupt === 'function') {
                TYRANO.kag.actionTimeObj.actionTimeInterrupt();
                TYRANO.kag.actionTimeObj.actionTimeClear();
            }
            TYRANO.kag.ftag.startTag("call", { storage: pm.storage, target: pm.target, auto_next: "stop" })
            if (pm.nextChatButtonDisable === "true") {
                chatButton.disabled = true;
            }
            if (pm.nextChatButtonHide === "true") {
                chatButton.remove();
            }
            if (pm.nextChatButtonHideAll === "true") {
                const buttonContainers = document.querySelectorAll('.nextChatButtonContainer');
                buttonContainers.forEach(container => {
                    container.remove();
                });

            }
        });
    }
};


tyrano.plugin.kag.tag.nextChatHide = {
    vital: ["chat_hide_show"],
    pm: {
        chat_hide_show: "",
    },
    start: function (pm) {
        if (pm.chat_hide_show === "hide") {
            $(".tyrano_base").find(".nextChatContainer").css('display', 'none');
        } else {
            $(".tyrano_base").find(".nextChatContainer").css('display', 'block');
        }
        TYRANO.kag.ftag.nextOrder();
    }
};

tyrano.plugin.kag.tag.nextChatClearMessage = {
    pm: {},
    start: function (pm) {
        const nextChatInner = document.getElementById('nextChatInner');
        if (nextChatInner) {
            while (nextChatInner.firstChild) {
                nextChatInner.removeChild(nextChatInner.firstChild);
            }
        }
        TYRANO.kag.ftag.nextOrder();
    }
};


tyrano.plugin.kag.tag.actionTime = {
    pm: {
        storage: "",
        target: "",
        actionTimeSec: "",
        actionTimeAnimation: "",
        actionTimeStyle: "",
        actionTimeTitle: "",
        actionTimeFontSize: "",
        actionTimeFontFace: "",
        actionTimeTitlePos: "",
        attopPos: "",
        atleftPos: ""
    },
    start: function (pm) {
        const mainContainer = document.getElementById('tyrano_base');
        this.action(pm, mainContainer);
        TYRANO.kag.ftag.nextOrder();
    },
    action: function (pm, mainContainer) {
        const tContainer = document.querySelector(".timeContainer");
        if (tContainer) {
            tContainer.remove();
        }

        const timeContainer = document.createElement('div');
        const timeTitle = document.createElement('div');
        const timeProgress = document.createElement('div');
        const timeProgressFill = document.createElement('div');
        const timeTime = document.createElement('div');

        timeContainer.id = "timeContainer"
        timeContainer.className = `timeContainer animated ${pm.actionTimeAnimation}`

        timeTitle.id = "timeTitle"
        timeTitle.className = `timeTitle`

        timeProgress.id = "timeProgress"
        timeProgress.className = "timeProgress"
        timeProgressFill.id = "timeProgressFill"
        timeProgressFill.className = "timeProgressFill"

        timeTime.id = "timeTime"
        timeTime.className = "timeTime"

        timeContainer.style.position = "relative"
        timeContainer.style.display = "flex"
        timeContainer.style.justifyContent = "center"
        timeContainer.style.flexDirection = "column"
        timeContainer.style.top = pm.top + "px"
        timeContainer.style.left = pm.left + "px"
        timeContainer.style.alignItems = pm.actionTimeTitlePos
        timeContainer.style.width = pm.width + "px"
        timeContainer.style.height = pm.height + "px"
        timeContainer.style.zIndex = "100000"
        timeContainer.style.pointerEvents = 'none';

        timeProgress.style.width = pm.width + "px"
        timeProgress.style.height = pm.height + "px"
        timeProgress.style.backgroundImage = 'url(' + "data/fgimage/" + pm.graphic + ')';
        timeProgress.style.backgroundSize = 'cover';
        timeProgress.style.backgroundRepeat = 'no-repeat';
        timeProgress.style.backgroundPosition = 'center';

        timeProgressFill.style.width = pm.width2 + "px"
        timeProgressFill.style.height = pm.height2 + "px"
        timeProgressFill.style.backgroundImage = 'url(' + "data/fgimage/" + pm.graphic2 + ')';
        timeProgressFill.style.backgroundSize = 'container';
        timeProgressFill.style.backgroundRepeat = 'no-repeat';
        timeProgressFill.style.backgroundPosition = 'left center';
        timeProgressFill.style.top = pm.attopPos + "px";
        timeProgressFill.style.left = pm.atleftPos + "px";

        timeTitle.style.fontSize = pm.actionTimeFontSize + "px"
        timeTitle.style.fontFamily = pm.actionTimeFontFace
        timeTitle.style.position = "absolute"
        timeTitle.style.top = pm.attopTitlePos + "px"
        timeTitle.style.left = pm.atleftTitlePos + "px"
        timeTitle.style.color = $.convertColor(pm.fontColorTitle)
        timeTitle.style.zIndex = "2"



        mainContainer.appendChild(timeContainer);
        timeContainer.appendChild(timeTitle);
        timeContainer.appendChild(timeProgress);
        timeProgress.appendChild(timeProgressFill);
        timeContainer.appendChild(timeTime);

        const intervalId = this.updateProgressBar(pm, timeTitle);
        const timerId = setTimeout(() => {
            clearInterval(intervalId);
            clearInterval(timerId);
            TYRANO.kag.ftag.startTag("call", { storage: pm.storage, target: pm.target, auto_next: "stop" })
            timeContainer.remove();
        }, pm.actionTimeSec);

        TYRANO.kag.actionTimeObj = {
            actionTimeInterrupt: function () {
                clearTimeout(timerId);
            },
            actionTimeClear: function () {
                const actionTimeContainer = document.getElementById('timeContainer');
                console.warn(actionTimeContainer)
                actionTimeContainer.remove();
            }
        }
    },
    updateProgressBar: function (pm, timeTitle) {
        const progressBarFill = document.getElementById('timeProgressFill');
        const duration = pm.actionTimeSec;
        let progress = 100;
        const updateInterval = 100;

        const intervalId = setInterval(() => {
            progress -= 100 * (updateInterval / duration);
            if (progress < 0) {
                progress = 0;
                clearInterval(intervalId);
            }
            progressBarFill.style.width = progress + '%';

            if (pm.actionTimeTitle !== "") {
                const secondsLeft = Math.round((progress / 100) * (duration / 1000));
                timeTitle.innerText = pm.actionTimeTitle.replace(/&nbsp;/g, " ") + " " + secondsLeft + "s";
            }
        }, updateInterval);

        return intervalId;
    }

};

tyrano.plugin.kag.tag.actionProgress = {
    pm: {
        actionProgressVar: "",
        actionProgressAnimation: "",
        actionProgressTitle: "",
        actionProgressFontSize: "",
        actionProgressFontFace: "",
        actionProgressTitlePos: "",
        fontColorTitle: "",
        attopPos: "",
        atleftPos: ""
    },
    start: function (pm) {
        const mainContainer = document.querySelector('.message0_fore');
        if (!document.getElementById('actionProgressContainer')) {
            this.action(pm, mainContainer);
        }
        TYRANO.kag.ftag.nextOrder();
    },
    action: function (pm, mainContainer) {
        if (document.getElementById('actionProgressContainer')) return;

        const actionProgressContainer = document.createElement('div');
        const actionProgressTitle = document.createElement('div');
        const actionProgressProgress = document.createElement('div');
        const actionProgressProgressFill = document.createElement('div');

        actionProgressContainer.id = "actionProgressContainer";
        actionProgressContainer.className = `actionProgressContainer animated ${pm.actionProgressAnimation}`;
        actionProgressContainer.setAttribute('data-var', pm.actionProgressVar);

        actionProgressTitle.id = "actionProgressTitle";
        actionProgressTitle.className = `actionProgressTitle`;

        actionProgressProgress.id = "actionProgressProgress";
        actionProgressProgress.className = "actionProgressProgress";
        actionProgressProgressFill.id = "actionProgressProgressFill";
        actionProgressProgressFill.className = "actionProgressProgressFill";

        Object.assign(actionProgressContainer.style, {
            position: "relative",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            top: pm.top + "px",
            left: pm.left + "px",
            width: pm.width + "px",
            height: pm.height + "px",
            zIndex: "100000",
            pointerEvents: "none"
        });

        Object.assign(actionProgressProgress.style, {
            width: pm.width + "px",
            height: pm.height + "px",
            backgroundImage: `url(data/fgimage/${pm.graphic})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        });

        Object.assign(actionProgressProgressFill.style, {
            width: "0%",
            maxWidth: "100%",
            height: pm.height2 + "px",
            backgroundImage: `url(data/fgimage/${pm.graphic2})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            top: pm.attopPos + "px",
            left: pm.atleftPos + "px",
            position: "absolute",
            zIndex: pm.innerZIndex
        });

        Object.assign(actionProgressTitle.style, {
            fontSize: pm.actionProgressFontSize + "px",
            fontFamily: pm.actionProgressFontFace,
            position: "absolute",
            top: pm.attopTitlePos + "px",
            left: pm.atleftTitlePos + "px",
            color: $.convertColor(pm.fontColorTitle),
            zIndex: "2"
        });

        actionProgressTitle.innerText = pm.actionProgressTitle;

        mainContainer.appendChild(actionProgressContainer);
        actionProgressContainer.appendChild(actionProgressTitle);
        actionProgressContainer.appendChild(actionProgressProgress);
        actionProgressContainer.appendChild(actionProgressProgressFill);

        this.animateProgress(pm);
    },
    updateProgressBar: function (pm) {
        const progressBarFill = document.getElementById('actionProgressProgressFill');
        let variables = tyrano.plugin.kag.rider.getVariables();
        let progressValue;
        if (pm.actionProgressVar.startsWith('f.')) {
            const progressVarName = pm.actionProgressVar.substring(2);
            progressValue = variables.f[progressVarName];
        } else if (pm.actionProgressVar.startsWith('sf.')) {
            const progressVarName = pm.actionProgressVar.substring(3);
            progressValue = variables.sf[progressVarName];
        }

        progressBarFill.style.width = progressValue + '%';

        return progressValue;
    },
    animateProgress: function (pm) {
        const intervalId = setInterval(() => {
            const progressValue = this.updateProgressBar(pm);

            if (progressValue >= 100) {
                clearInterval(intervalId);
            }
        }, 100);

        return intervalId;
    },
};

tyrano.plugin.kag.tag.actionProgressHide = {
    vital: ["progressBarHide"],
    pm: {
        progressBarHide: "",
    },
    start: function (pm) {
        if (pm.progressBarHide === "hide") {
            $(".tyrano_base").find(".actionProgressContainer").css('display', 'none');
        } else {
            $(".tyrano_base").find(".actionProgressContainer").css('display', 'block');
        }
        TYRANO.kag.ftag.nextOrder();
    }
};


tyrano.plugin.kag.tag.findbcSaveData = {
    pm: {
    },
    start: function (pm) {
        if (typeof process !== 'undefined' && process.versions && process.versions.node) {
            this.findbcSaveData();
        } else {
            console.warn("Error, function not work in browser")
        }
        TYRANO.kag.ftag.nextOrder();
    },
    updateCharaDefine: function (charaDefineContent, bcSaveData) {
        var pattern = /\[iscript\][\s\S]*?\[endscript\]/;
        var scriptContent = charaDefineContent.match(pattern);
        if (scriptContent && scriptContent[0]) {
            var updatedScriptContent = scriptContent[0];
            for (var key in bcSaveData) {
                if (bcSaveData.hasOwnProperty(key)) {
                    var replacePattern = new RegExp("f\\['" + key + "'\\]=.*?;", "g");
                    if (updatedScriptContent.match(replacePattern)) {
                        updatedScriptContent = updatedScriptContent.replace(replacePattern, "f['" + key + "']=" + JSON.stringify(bcSaveData[key]) + ";");
                    } else {
                        updatedScriptContent = updatedScriptContent.replace('[endscript]', "f['" + key + "']=" + JSON.stringify(bcSaveData[key]) + ";\n[endscript]");
                    }
                }
            }
            return charaDefineContent.replace(pattern, updatedScriptContent);
        } else {
            alert("The [iscript] - [endscript] section was not found.");
            return charaDefineContent;
        }
    },
    updateCharaDefineWithConfirmation: function (charaDefineContent, bcSaveData, bcSaveDataPath, charaDefinePath, isAsar) {
        var fs = require("fs");
        var path = require("path");
        var out_path = $.getExePath();
        var pathToAsar = path.join(out_path, 'resources', 'app.asar');
        var extractedPath = path.join(out_path, 'resources', 'temp');
        Swal.fire({
            title: $.lang("migration"),
            text: $.lang("go_to_migration"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: $.lang("Ok"),
            cancelButtonText: $.lang("cancel"),
            reverseButtons: true,
            showClass: {
                popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
            },
            hideClass: {
                popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
            },
        }).then((result) => {
            if (result.isConfirmed) {
                var updatedContent = this.updateCharaDefine(charaDefineContent, bcSaveData);
                fs.writeFileSync(charaDefinePath, updatedContent);
                Swal.fire({
                    title: $.lang("migration_confirm"),
                    html: $.lang("migration_finished"),
                    icon: 'success',
                    timer: 5000,
                    showConfirmButton: false,
                    showClass: {
                        popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
                    },
                    hideClass: {
                        popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
                    },
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    fs.renameSync(bcSaveDataPath, bcSaveDataPath.replace('.json', '.Pass.json'));
                    fs.writeFileSync(charaDefinePath, updatedContent);
                    function deleteFolderRecursive(directoryPath) {
                        if (fs.existsSync(directoryPath)) {
                            fs.readdirSync(directoryPath).forEach((file) => {
                                const curPath = path.join(directoryPath, file);
                                if (fs.lstatSync(curPath).isDirectory()) {
                                    deleteFolderRecursive(curPath);
                                } else {
                                    fs.unlinkSync(curPath);
                                }
                            });
                            fs.rmdirSync(directoryPath);
                        }
                    }

                    if (isAsar) {
                        var asar = require("asar");
                        (async () => {
                            try {
                                console.log("Repackaging the app.asar archive");
                                await asar.createPackage(extractedPath, pathToAsar);
                                console.log("The archive has been successfully repacked");
                                deleteFolderRecursive(extractedPath);
                                TYRANO.kag.ftag.startTag("close", { ask: false });
                            } catch (error) {
                                console.error("Error when repacking an archive or deleting a temporary folder:", error);
                            }
                        })();
                    } else {
                        TYRANO.kag.ftag.startTag("close", { ask: false });
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                fs.renameSync(bcSaveDataPath, bcSaveDataPath.replace('.json', '.Pass.json'));
            }
        });
    },
    findbcSaveData: function () {
        var fs = require("fs");
        var path = require("path");

        var out_path = $.getExePath();
        var bcSaveDataPath = path.join(out_path, 'bcSaveData.json');
        var pathToAsar = path.join(out_path, 'resources', 'app.asar');
        var pathToFileInAsar = 'data/scenario/system/chara_define.ks';
        var extractedPath = path.join(out_path, 'resources', 'temp');
        var charaDefinePath = path.join(extractedPath, pathToFileInAsar);

        if (fs.existsSync(bcSaveDataPath)) {
            console.log("Файл 'bcSaveData.json' найден в папке " + out_path);
            var bcSaveData = JSON.parse(fs.readFileSync(bcSaveDataPath, 'utf8'));

            if (fs.existsSync(pathToAsar)) {
                var asar = require("asar");
                console.log("The app.asar archive was found");
                if (!fs.existsSync(extractedPath)) {
                    console.log("Creating a temporary folder");
                    fs.mkdirSync(extractedPath);
                }
                (async () => {
                    try {
                        console.log("Extracting a file from an archive");
                        await asar.extractAll(pathToAsar, extractedPath);
                        var charaDefinePath = path.join(extractedPath, pathToFileInAsar);

                        if (fs.existsSync(charaDefinePath)) {
                            var charaDefineContent = fs.readFileSync(charaDefinePath, 'utf8');
                            this.updateCharaDefineWithConfirmation(charaDefineContent, bcSaveData, bcSaveDataPath, charaDefinePath, true);
                        } else {
                            console.error("The chara_define.ks file was not found in the path: ", charaDefinePath);
                        }
                    } catch (error) {
                        console.error("Error when extracting a file from the archive:", error);
                    }
                })();
                asar.createPackage(extractedPath, pathToAsar);
            } else if (fs.existsSync(path.join(out_path, 'resources', 'app'))) {
                charaDefinePath = path.join(out_path, 'resources', 'app', pathToFileInAsar);
                if (fs.existsSync(charaDefinePath)) {
                    var charaDefineContent = fs.readFileSync(charaDefinePath, 'utf8');
                    this.updateCharaDefineWithConfirmation(charaDefineContent, bcSaveData, bcSaveDataPath, charaDefinePath, false);
                } else {
                    console.error("File chara_define.ks was not found on the path: ", charaDefinePath);
                }
            } else {
                console.log("The app.asar archive was not found");
            }
        } else {
            console.log("File 'bcSaveData.json' not found in folder " + out_path);
        }
    }
};


tyrano.plugin.kag.tag.timeSetting = {
    pm: {
        time: "",
        year: "",
        month: "",
        day: "",
        timeSpeed: "",
        realTime: ""
    },
    start: function (pm) {
        window.timeSettingObg = {
            time: pm.time,
            year: pm.year,
            month: pm.month,
            day: pm.day,
            timeSpeed: pm.timeSpeed,
            realTime: pm.realTime
        }
        variableManipulation().setSFValueVar("fakeTime", pm.time)
        variableManipulation().setSFValueVar("fakeMonth", parseInt(pm.month))
        variableManipulation().setSFValueVar("fakeDay", parseInt(pm.day))
        variableManipulation().setSFValueVar("fakeYear", pm.year)
        variableManipulation().setSFValueVar("fakeDayNumber", 0)

        setTimeout(function() {
            window.langCode = variableManipulation().getSFValueVar("langTranslate");
            setLanguageArrays(window.langCode);
        }, 100);

        const internal = forInternalUse();
        TYRANO.kag.dayTimerId = setTimeout(internal.getFakeDayOfWeek, 100);
        TYRANO.kag.monthTimerId = setTimeout(internal.getFakeMonth, 100);
        TYRANO.kag.ftag.nextOrder();
    }
};

tyrano.plugin.kag.tag.timeStart = {
    pm: {},
    start: function (pm) {
        if (window.timeSettingObg.realTime === "true") {
            const internal = forInternalUse();
            TYRANO.kag.timeTimerId = setTimeout(internal.updateFakeTime, 100);
            TYRANO.kag.dayTimerId = setTimeout(internal.getFakeDayOfWeek, 100);
            TYRANO.kag.monthTimerId = setTimeout(internal.getFakeMonth, 100);
            TYRANO.kag.yearTimerId = setTimeout(internal.getFakeYear, 100);
        }
        TYRANO.kag.ftag.nextOrder();
    }
};

tyrano.plugin.kag.tag.timeEdit = {
    pm: {
        hour: "",
        minutes: "",
    },
    start: function (pm) {
        window.timeEditObg = {
            hour: pm.hour,
            minutes: pm.minutes,
        }
        const internal = forInternalUse();
        TYRANO.kag.timeTimerId = setTimeout(internal.updateFakeTime, 100);

        TYRANO.kag.ftag.nextOrder();
    }
};



window.fakeDaysOfWeek = [];
window.months = [];
function setLanguageArrays(langCode) {
    if (langCode === "en") {
        window.fakeDaysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        window.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    } else if (langCode === "ru") {
        window.months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        window.fakeDaysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    } else if (langCode === "zh") {
        window.months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        window.fakeDaysOfWeek = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
    } else if (langCode === "ja") {
        window.months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
        window.fakeDaysOfWeek = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"];
    } else {
        window.fakeDaysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        window.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
}

$.getJSON('./tyrano/gameSettings.json', function (data) {
    window.gameSettingsJson = data;
});
$(document).ready(function () {
    $(document).on('DOMNodeInserted', '.role_button, .message_outer, .message_inner, .chara_name_area', function () {
        $(this).addClass(` ${window.gameSettingsJson.settings.textBoxAnimation}`);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const base = document.getElementById('tyrano_base');
    const mapContainer = document.createElement('div');
    mapContainer.id = 'mapContainer';
    base.appendChild(mapContainer);

    fetch("./data/system/labelListMap.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Файл не найден');
            }
            return response.json();
        })
        .then(data => buildMap(data))
        .catch(error => {
            console.warn("Предупреждение: ", error.message);
        });

    function buildMap(data) {
        Object.keys(data).forEach((key) => {
            if (key.endsWith('.ks')) {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'section';
                sectionDiv.innerHTML = `<h2 >${data[key].title}</h2>`;

                sectionDiv.addEventListener('wheel', function (event) {
                    event.stopPropagation(); // Предотвращение всплытия события
                }, { passive: false });

                mapContainer.appendChild(sectionDiv);

                data[key].labels.forEach((label) => {
                    if (label.display) {
                        const pointDiv = document.createElement('div');
                        pointDiv.className = 'point';
                        pointDiv.textContent = label.title;

                        pointDiv.onclick = ((ks, labelTitle) => {
                            return () => {
                                TYRANO.kag.ftag.startTag("call", { storage: ks, target: labelTitle, auto_next: "stop" });
                            };
                        })(key, label.label);

                        sectionDiv.appendChild(pointDiv);
                    }
                });

            }
        });
    }

    const style = document.createElement('style');
    style.textContent = `
                #mapContainer { 
                    display: none; 
                    position: fixed;
                    background-color: #efebe7; /* Базовый цвет бумаги */
                      background-image: 
                        radial-gradient(circle at 20% 20%, rgba(255,255,255,.2) 0%, rgba(255,255,255,0) 50%),
                        radial-gradient(circle at 80% 80%, rgba(0,0,0,.2) 0%, rgba(0,0,0,0) 50%),
                        url('tyrano/images/paper.jpg');
                      background-blend-mode: multiply;
                    top: 0;
                    right: 0;
                    width: 19%;
                    height: 97%;
                    margin: 7px;
                    border-radius: 5px;
                    padding: 5px;
                    z-index: 1000000;
                    overflow-y: auto;
                }
                .section h2 { 
                    font-size: 22px;
                 }
                 .section h2 { 
                    background: #3b374c;
                    color: #dedede;
                    padding: 3px;
                    border-radius: 5px;
                 }
                .point { 
                    background: antiquewhite;
                    display: flex;
                    justify-content: center;
                    border-radius: 5px;
                    font-size: 18px;
                    margin: 7px;
                    transition: all .5s;
                 }
                 .point:hover { 
                    background: #3b374c;
                    color: #dedede;
                    cursor: pointer;
                    transition: all .5s;
                 }
                /* Дополнительные стили */
              `;
    document.head.appendChild(style);

    document.addEventListener('keydown', function (event) {
        if (event.code === 'KeyM') {
            const isHidden = mapContainer.classList.contains('animate__fadeOutRight');
            const isShowing = mapContainer.classList.contains('animate__fadeInRight');

            if (isHidden || (!isHidden && !isShowing)) {
                mapContainer.classList.remove('animate__fadeOutRight', 'animate__hidden');
                mapContainer.classList.add('animate__fadeInRight', 'animate__animated');
                mapContainer.style.display = 'block';
            } else {
                mapContainer.classList.remove('animate__fadeInRight');
                mapContainer.classList.add('animate__fadeOutRight');

                mapContainer.addEventListener('animationend', () => {
                    if (mapContainer.classList.contains('animate__fadeOutRight')) {
                        mapContainer.style.display = 'none';
                        mapContainer.classList.add('animate__hidden');
                    }
                }, { once: true });
            }
        }
    })
});

function systemInfo() {
    let osInfo;
    if (typeof require !== 'undefined') {
        osInfo = require('os');
    }

    function getOperatingSystem() {
        if (typeof navigator !== 'undefined') {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;

            if (/windows phone/i.test(userAgent)) return "Windows Phone";
            if (/android/i.test(userAgent)) return "Android";
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
            if (/win/i.test(userAgent)) return "Windows";
            return "unknown";
        } else if (osInfo) {
            const type = osInfo.type();
            if (type === "Windows_NT") return "Windows";
            if (type === "Darwin") return "macOS";
            if (type === "Linux") return "Linux";
            return type;
        }
        return "unknown";
    }

    function getNameUser() {
        if (osInfo) {
            return osInfo.userInfo().username;
        }
        return "";
    }

    function getTimeActual() {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');

        return hours + ":" + minutes;
    }

    function getDataYear() {
        return new Date().getFullYear();
    }

    return {
        getNameUser: getNameUser,
        getTimeActual: getTimeActual,
        getDataYear: getDataYear,
        getWinName: getOperatingSystem
    };
}


function variableManipulation() {
    function getSFValueVar(name) {
        return tyrano.plugin.kag.rider.getVariables().sf[name];
    }

    function getFValueVar(name) {
        return tyrano.plugin.kag.rider.getVariables().f[name];
    }

    function setSFValueVar(name, val) {
        tyrano.plugin.kag.rider.getVariables().sf[name] = val;
    }

    function setFValueVar(name, val) {
        tyrano.plugin.kag.rider.getVariables().f[name] = val;
    }

    return {
        getSFValueVar: getSFValueVar,
        getFValueVar: getFValueVar,
        setSFValueVar: setSFValueVar,
        setFValueVar: setFValueVar,
    };

}

function forInternalUse() {
    function updateTime() {
        variableManipulation().setSFValueVar("realTime", systemInfo().getTimeActual());
    }
    let fakeYear;
    let fakeMonth;
    let fakeTime;
    let fakeTimeSpeed;
    let fakeDay;

    if (window.timeSettingObg.realTime === "true") {
        fakeYear = window.timeSettingObg.year;
        fakeMonth = Number(window.timeSettingObg.month);
        fakeTime =  window.timeSettingObg.time;
        fakeTimeSpeed =  Number(window.timeSettingObg.timeSpeed);
        fakeDay =  Number(window.timeSettingObg.day);
    } else {
        fakeYear = window.timeSettingObg.year;
        fakeMonth = Number(window.timeSettingObg.month);
        fakeTime = window.timeSettingObg.time;
        fakeTimeSpeed =  Number(window.timeSettingObg.timeSpeed);
        fakeDay =  Number(window.timeSettingObg.day);
    }

    let fakeDaysTotal = window.getFakeSaveDayNum || Number(window.timeSettingObg.day);
    let months = window.months;
    let fakeDaysOfWeek = window.fakeDaysOfWeek;

    let [fakeHours, fakeMinutes] = fakeTime.split(":").map(Number);
    function updateFakeTime() {
        if (window.timeSettingObg.realTime === "true") {
            fakeMinutes++;
        } else {
            if (window.timeEditObg.hour !== "0") {
                fakeHours += parseInt(window.timeEditObg.hour);
            }

            if (window.timeEditObg.minutes !== "0") {
                fakeMinutes += parseInt(window.timeEditObg.minutes);
            }

            window.timeSettingObg.time = fakeHours.toString().padStart(2, '0') + ":" + fakeMinutes.toString().padStart(2, '0');
        }

        if (fakeMinutes >= 60) {
            fakeHours++;
            fakeMinutes = 0;
        }

        if (fakeHours >= 24) {
            fakeHours = 0;
            fakeDay++;
            fakeDaysTotal++;
            getFakeDayOfWeek();
        }

        if (fakeDaysTotal >= 31) {
            fakeDaysTotal = 1;
            fakeDay = 1;
            fakeMonth++;
            if (fakeMonth > 11) {
                fakeMonth = 0
            }
            getFakeMonth();
            console.warn(fakeMonth)

            if (fakeMonth === 0) {
                fakeMonth = 0;
                fakeYear++;
                getFakeYear();
            }
        }

        const displayHours = fakeHours < 10 ? `0${fakeHours}` : fakeHours;
        const displayMinutes = fakeMinutes < 10 ? `0${fakeMinutes}` : fakeMinutes;
        if (!isNaN(displayHours) && !isNaN(displayMinutes)) {
            variableManipulation().setSFValueVar("fakeTime", `${displayHours}:${displayMinutes}`)
        }
        clearInterval(TYRANO.kag.timeTimerId);
        if (window.timeSettingObg.realTime === "true") {
            window.fakeTimeTimerId = setTimeout(updateFakeTime, fakeTimeSpeed * 1000);
        }
        variableManipulation().setSFValueVar("fakeDayNumber", fakeDaysTotal)
    }

    function getRealDayOfWeek() {
        let daysOfWeek = [];
        if (window.langCode === "en") {
            daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        } else if (window.langCode === "ru") {
            daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
        } else if (window.langCode === "zh") {
            daysOfWeek = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
        } else if (window.langCode === "ja") {
            daysOfWeek = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"];
        } else {
            daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        }
        const today = new Date();
        const dayOfWeekIndex = today.getDay();
        let res = daysOfWeek[dayOfWeekIndex]
        variableManipulation().setSFValueVar("realDay", `${res}`)
        return daysOfWeek[dayOfWeekIndex];
    }

    function getFakeDayOfWeek() {
        const fakeDayOfWeekIndex = fakeDay % 7;
        let res = fakeDaysOfWeek[fakeDayOfWeekIndex]
        variableManipulation().setSFValueVar("fakeDay", `${res}`)
        clearInterval(TYRANO.kag.dayTimerId);
        return fakeDaysOfWeek[fakeDayOfWeekIndex];
    }


    function getFakeMonth() {
        let res = months[fakeMonth]
        variableManipulation().setSFValueVar("fakeMonth", `${res}`)
        clearInterval(TYRANO.kag.monthTimerId);
        return months[fakeMonth];
    }

    function getFakeYear() {
        variableManipulation().setSFValueVar("fakeYear", `${fakeYear}`)
        clearInterval(TYRANO.kag.yearTimerId);
        return fakeYear;
    }


    return {
        updateTime: updateTime,
        updateFakeTime: updateFakeTime,
        getRealDayOfWeek: getRealDayOfWeek,
        getFakeDayOfWeek: getFakeDayOfWeek,
        getFakeMonth: getFakeMonth,
        getFakeYear: getFakeYear,
    };
}

tyrano.plugin.kag.tag.setFullScreenEnter = {
    pm: {},
    start: function (pm) {
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('fullScreen');

        TYRANO.kag.ftag.nextOrder();
    }
};

tyrano.plugin.kag.tag.inventorySystem = {
    pm: {
        top: "",
        left: "",
        direction: ""
    },
    start: function (pm) {
        localStorage.setItem("inventorySystemData", JSON.stringify(pm));
        const baseElement = document.querySelector('.message0_fore');
        if (!$('.inventory-container').length) {
            this.createBox6Cell(pm, baseElement);
        }
        TYRANO.kag.ftag.nextOrder();
    },
    createBox6Cell: function (pm, baseElement) {
        this.createInventoryContainer(pm, baseElement, 6, 'inventory-container', 'inventory-cell-main', false, pm.direction);
        this.createDynamicInventoryButton(pm, baseElement);
    },
    createDynamicInventoryButton: function (pm, baseElement) {
        const button = $('<span class="dynamic-inventory-button animate__animated animate__fadeIn"></span>');

        button.css({
            backgroundImage: 'url(./data/inventory/icon.png)',
            zIndex: 10000001
        });

        $(baseElement).append(button);

        button.on('click', () => {
            if (!$('.dynamic-inventory-container').length) {
                this.createBoxXCell(pm, baseElement, pm.cellCount);
            } else {
                $('.dynamic-inventory-container').show();
            }
        });
    },
    createBoxXCell: function (pm, baseElement, cellCount) {
        this.createInventoryContainer(pm, baseElement, cellCount, 'dynamic-inventory-container', 'inventory-cell-dynamic', true, 'row', pm.columnCount);
        $('.dynamic-inventory-container').draggable({containment: "#tyrano_base", scroll: false });
    },
    createInventoryContainer: function (pm, baseElement, cellCount, containerClass, cellClass, addCloseButton, direction, maxColumns, preventDuplicates) {
        const inventoryContainer = $(`<div class="${containerClass} animate__animated animate__fadeIn ui-draggable"></div>`);

        let gridStyles = {};
        if (direction === 'row') {
            gridStyles = {
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(cellCount, maxColumns || cellCount)}, 1fr)`,
            };
        } else if (direction === 'column') {
            gridStyles = {
                display: 'grid',
                gridTemplateRows: `repeat(${Math.min(cellCount, maxColumns || cellCount)}, 1fr)`,
            };
        }

        inventoryContainer.css({
            ...gridStyles,
            top: (parseInt(pm.top) + (containerClass === 'dynamic-inventory-container' ? 100 : 0)) + 'px',
            left: (parseInt(pm.left) + (containerClass === 'dynamic-inventory-container' ? 300 : 0)) + 'px',
            zIndex: 10000000,
            paddingBottom: '10px',
            maxHeight: cellCount > 20 ? '400px' : 'none',
            backgroundImage: (containerClass === 'dynamic-inventory-container' ? `url("./data/${pm.graphicBGBig}")` : `url("./data/${pm.graphicBGSmall}")`),
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'

        });

        if (addCloseButton) {
            const closeButton = $('<span class="close-inventory-button"></span>');
            closeButton.css({
                position: 'absolute',
                zIndex: 10000001,
                backgroundImage: `url("./data/${pm.graphicCloseCellBig}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            });

            inventoryContainer.append(closeButton);

            closeButton.on('click', () => {
                inventoryContainer.hide();
            });
        }

        inventoryContainer.on('wheel', function (event) {
            event.preventDefault();
            event.stopPropagation();

            const delta = event.originalEvent.deltaY;
            inventoryContainer.scrollTop(inventoryContainer.scrollTop() + delta);
        });

        $(baseElement).append(inventoryContainer);

        for (let i = 0; i < cellCount; i++) {
            $(`<div class="${cellClass}" data-id-cell="${i}"></div>`).appendTo(inventoryContainer);
        }

        $(".inventory-cell-main, .inventory-cell-dynamic").css({
            backgroundImage: (containerClass === 'dynamic-inventory-container' ? `url("./data/${pm.graphicCellBig}")` : `url("./data/${pm.graphicCellSmall}")`),
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
        })

        this.loadData((data) => {
            if (preventDuplicates) {
                const existingItems = new Set($(baseElement).find('.inventory-item').map((_, item) => $(item).data('item-name')).get());
                data = data.filter(item => !existingItems.has(item.name));
            }
            this.initInventory(`.${cellClass}`, data);
        });
    },
    findFirstEmptyCell: function (cellSelector) {
        let cells = $(cellSelector);
        for (let i = 0; i < cells.length; i++) {
            let cell = $(cells[i]);
            if (cell.children('.inventory-item').length === 0) {
                return cell;
            }
        }
        return null;
    },
    updateEmptyCells: function (cellSelector) {
        let cells = $(cellSelector);
        cells.each(function (index) {
            let cell = $(this);
            if (cell.children('.inventory-item').length === 0) {
                let nextFilledCell = cells.slice(index + 1).find('.inventory-item:first').parent();
                if (nextFilledCell.length) {
                    nextFilledCell.children('.inventory-item:first').appendTo(cell);
                }
            }
        });
    },
    monitorInventoryChanges: function () {
        let inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
        let changes = false;

        inventoryData.forEach(item => {
            if (item.received && $(`.inventory-item[data-item-name="${item.name}"]`).length === 0 && item.amount !== 0) {
                let emptyCell = this.findFirstEmptyCell('.inventory-cell-main');
                if (emptyCell) {
                    this.initInventory([item], '.inventory-cell-main');
                    item.received = item.amount > 0;
                    changes = true;
                }
            }
        });

        if (changes) {
            localStorage.setItem('inventoryData', JSON.stringify(inventoryData));
        }

        this.updateEmptyCells('.inventory-cell-main');
    },
    checkAmount: function (currentItem, cellSelector) {
        let inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
        let changes = false;

        inventoryData.forEach((item, index) => {
            if (item.amount === 0) {
                $(`.inventory-item[data-item-name="${currentItem.name}"]`).remove();
                item.amount = 0;
                item.received = false;
                changes = true;
            }
        });

        if (changes) {
            localStorage.setItem('inventoryData', JSON.stringify(inventoryData));
        }

        this.updateEmptyCells(cellSelector);
    },
    initInventory: function (cellSelector, data) {
        if (!data) return;

        let popupHtml = $(`
            <div class="popup-inventory" style="display: none; position: absolute; background: var(--color-pop); padding: 7px; max-width: 570px; border-radius: 5px; user-select: none; z-index: 10000002;">
                <img src="" alt="Иконка" style="width: 50px; height: 50px; pointer-events: none">
                <div style="display: flex; flex-direction: column; justify-content: center;">
                    <strong>Название:</strong> <span class="item-name"></span><br>
                    <strong>Описание:</strong> <span class="item-description"></span><br>
                    <strong>Количество:</strong> <span class="item-amount"></span><br>
                    <button class="use-button" style="display: none;">${$.lang("used_button")}</button>
                </div>
            </div>`);
        popupHtml.appendTo('body');

        let hidePopupTimeout;

        popupHtml.mouseenter(function () {
            clearTimeout(hidePopupTimeout);
        }).mouseleave(function () {
            hidePopupTimeout = setTimeout(() => {
                popupHtml.hide();
            }, 200);
        });

        popupHtml.on('click', '.use-button', (event) => {
            let itemName = popupHtml.find('.item-name').text();
            let inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
            let currentItem = inventoryData.find(i => i.name === itemName);

            if (currentItem.adverselyAffectCheck === true) {
                if (currentItem.usageCount >= 5) {
                    eval(`TYRANO.kag.stat.f.` + currentItem.varItem + '-=' + currentItem.negativeVal);
                    currentItem.usageCount = 0;
                }
            }

            if (currentItem.amount > 0) {
                currentItem.amount -= 1;
                currentItem.usageCount += 1;

                localStorage.setItem('inventoryData', JSON.stringify(inventoryData));

                popupHtml.find('.item-amount').text(currentItem.amount);

                eval(`TYRANO.kag.stat.f.` + currentItem.varItem + currentItem.operationVar + currentItem.positiveVal);

                this.updateInventory(currentItem);

                if (currentItem.amount <= 0) {
                    popupHtml.hide();
                    currentItem.received = false;

                    $(`.inventory-item[data-item-name="${currentItem.name}"]`).remove();

                    localStorage.setItem('inventoryData', JSON.stringify(inventoryData));

                    this.updateEmptyCells('.inventory-cell-main');
                    this.initInventory('.inventory-cell-main', inventoryData);
                    this.updateEmptyCells('.inventory-cell-dynamic');
                }

                event.stopPropagation();
            }
        });

        data.forEach((item, index) => {
            if (!item.received) return;

            if ($(`.inventory-item[data-item-name="${item.name}"]`).length > 0) {
                return;
            }

            let emptyCell = this.findFirstEmptyCell(cellSelector);
            if (!emptyCell) {
                this.updateEmptyCells(cellSelector);
                emptyCell = this.findFirstEmptyCell(cellSelector);
                if (!emptyCell) return;
            }
            const itemElement = $(`<div class="inventory-item" data-item-type="${item.type}" data-target="${item.targetObject}" data-item-name="${item.name}"></div>`);
            $('<img>').attr({
                src: 'data/inventory/icon/' + item.icon,
                style: 'width: 100%; height: auto;'
            }).appendTo(itemElement);
            itemElement.appendTo(emptyCell);

            itemElement.mouseleave(function () {
                hidePopupTimeout = setTimeout(() => {
                    popupHtml.hide();
                }, 200);
            }).mouseenter(function () {
                clearTimeout(hidePopupTimeout);
            });

            itemElement.on('click', (event) => {
                if (itemElement.hasClass('dragging')) return;

                let currentItem = JSON.parse(localStorage.getItem('inventoryData')).find(i => i.name === item.name);
                popupHtml.find('img').attr('src', 'data/inventory/icon/' + item.icon);
                popupHtml.find('.item-name').text(item.name);
                popupHtml.find('.item-description').text(item.description);
                popupHtml.find('.item-amount').text(currentItem.amount);

                if (item.usedCheck) {
                    popupHtml.find('.use-button').show();
                } else {
                    popupHtml.find('.use-button').hide();
                }

                popupHtml.css({
                    display: 'flex',
                    left: event.pageX + 20,
                    top: event.pageY - 40,
                });

                event.stopPropagation();
            });


            if (item.pivotal) {
                if (item.amount > 1) {
                    item.amount = 1;
                    localStorage.setItem('inventoryData', JSON.stringify(data));
                }
            }
        });

        $(document).on('click', function () {
            popupHtml.hide();
        });
        const dynamicContainer = $('.dynamic-inventory-container')
        $('.inventory-item').draggable({
            containment: 'body',
            revert: 'invalid',
            start: function (event, ui) {
                ui.helper.addClass('dragging');
            },
            stop: function (event, ui) {
                ui.helper.removeClass('dragging');
            }
        });


        $(() => {
            $(".inventory-item").draggable({
                revert: "invalid"
            });

            $(".target-zone").droppable({
                accept: (draggable) => {
                    return $(draggable).data("item-type") === targetZone.type &&
                        $(draggable).data("target") === targetZone.targetItem;
                },
                drop: (event, ui) => {
                    let inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
                    let draggableName = $(ui.draggable).data('item-name');
                    let currentItem = inventoryData.find(i => i.name === draggableName);

                    if (currentItem && currentItem.amount >= 0) {
                        currentItem.received = false;
                        currentItem.amount = 0;

                        localStorage.setItem('inventoryData', JSON.stringify(inventoryData));

                        $(ui.draggable).remove();
                        TYRANO.kag.ftag.startTag("call", {
                            storage: targetZone.storage,
                            target: targetZone.target,
                            auto_next: "stop"
                        });

                        this.updateInventory(currentItem);
                    }
                    this.updateEmptyCells('.inventory-cell-main');
                    this.initInventory('.inventory-cell-main', inventoryData);

                    this.updateEmptyCells('.inventory-cell-dynamic');
                    event.stopPropagation();
                },
                over: (event, ui) => {
                    if ($(ui.draggable).data("item-type") === targetZone.type &&
                        $(ui.draggable).data("target") === targetZone.targetItem) {
                        $(ui.draggable).css({
                            opacity: "0.5",
                            transform: "scale(1.5)"
                        });
                    }
                },
                out: (event, ui) => {
                    $(ui.draggable).css({
                        opacity: "1",
                        transform: "scale(1)"
                    });
                }
            });
        });
    },
    loadData: function (callback) {
        if (localStorage.getItem('inventoryData')) {
            callback(JSON.parse(localStorage.getItem('inventoryData')));
        } else {
            fetch('./data/inventory/data.json')
                .then(response => response.json())
                .then(data => {
                    data.forEach(item => {
                        item.usageCount = 0;
                    });
                    localStorage.setItem('inventoryData', JSON.stringify(data));
                    callback(data);
                })
                .catch(error => console.error('Error loading inventory data:', error));
        }
    },
    updateInventory: function (currentItem) {
        const allInventories = ['.inventory-cell-main', '.inventory-cell-dynamic'];
        allInventories.forEach(selector => {
            const itemElement = $(`.inventory-item[data-item-name="${currentItem.name}"]`, selector);
            if (itemElement.length) {
                if (currentItem.amount > 0) {
                    itemElement.find('.item-amount').text(currentItem.amount);
                } else {
                    itemElement.remove();
                }
            }
        });
        $('.popup-inventory[data-name="' + currentItem.name + '"]').find('.item-amount').text(currentItem.amount);
    }
};


tyrano.plugin.kag.tag.inventorySystemTriggerZone = {
    pm: {
        width: "0",
        height: "0",
        x: "",
        y: "",
        opacity: "140",
        storage: null,
        target: null,
        type: "",
        targetItem: "",
        name: ""
    },
    start: function (pm) {

        window.targetZone = {
            target: pm.target,
            storage: pm.storage,
            type: pm.type,
            targetItem: pm.targetItem
        }

        const baseElement = document.getElementById('tyrano_base');


        const targetZone = $(`<div class="target-zone" data-object-type="${pm.type}" data-id="${pm.targetItem}"/>`);
        targetZone.css("z-index", 9999999);
        targetZone.css("position", "absolute");
        targetZone.css("top", this.kag.stat.locate.y + "px");
        targetZone.css("left", this.kag.stat.locate.x + "px");
        targetZone.css("width", pm.width + "px");
        targetZone.css("height", pm.height + "px");
        targetZone.css("opacity", $.convertOpacity(pm.opacity));
        "" !== pm.x && targetZone.css("left", parseInt(pm.x));
        "" !== pm.y && targetZone.css("top", parseInt(pm.y));

        $(baseElement).append(targetZone);

        this.kag.ftag.nextOrder()
    },
    setEvent: function (j_button, pm) {

    }
};

tyrano.plugin.kag.tag.inventorySystemAddItem = {
    pm: {
        name: ""
    },
    start: function (pm) {
        async function getInventoryData() {
            while (true) {
                let data = JSON.parse(localStorage.getItem('inventoryData'));
                if (data !== null) {
                    return data;
                }
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        (async function() {
            try {
                let inventoryData = await getInventoryData();

                const itemName = pm.name.replace(/&nbsp;/g, ' ');

                let item = inventoryData.find(item => item.name === itemName && item.received === false);
                if (item) {
                    item.received = true;
                    item.amount = 1;
                    localStorage.setItem('inventoryData', JSON.stringify(inventoryData));
                    window.monitorInvChange;
                }
            } catch (error) {
                console.error('Error while processing inventory data:', error);
            }
        })();


        this.kag.ftag.nextOrder()
    }
};

tyrano.plugin.kag.tag.inventorySystemSetAmount = {
    pm: {
        name: "",
        value: ""
    },
    start: function (pm) {
        let inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
        let currentItem = inventoryData.find(i => i.name === i.name);
        console.warn(currentItem)
        for (let i = 0; i < inventoryData.length; i++) {
            if (currentItem.name === pm.name.replace(/&nbsp;/g, ' ')) {
                console.warn(currentItem.amount + " " + currentItem.name);
                currentItem.amount += Number(pm.value);

                localStorage.setItem('inventoryData', JSON.stringify(inventoryData));
                $('.popup-inventory[data-name="' + currentItem.name + '"]').find('.item-amount').text(currentItem.amount);
                break;
            }
        }
        this.kag.ftag.nextOrder()
    }
};

tyrano.plugin.kag.tag.imageMap = {
    pm: {
        name: "",
        image: "",
        imageHover: ""
    },
    start: async function (pm) {
        localStorage.setItem("imageMapData", JSON.stringify(pm));
        const baseContainer = $("#root_layer_game");
        const existingCanvas = baseContainer.find("canvas.game-map-container");

        if (existingCanvas.length) {
            existingCanvas.remove();
        }

        const canvas = $(`<canvas data-name='${pm.name}' class='game-map-container animate__animated animate__fadeIn'></canvas>`)
            .attr("width", TYRANO.kag.config.scWidth)
            .attr("height", TYRANO.kag.config.scHeight)
            .css({
                position: 'absolute',
                zIndex: 15
            });

        baseContainer.append(canvas);

        const canvasElement = canvas[0];
        const ctx = canvasElement.getContext('2d');

        const closedLockImage = new Image();
        const openLockImage = new Image();
        closedLockImage.src = `./data/${pm.image}`;
        openLockImage.src = `./data/${pm.imageHover}`;
        let interactiveAreas = [];
        const jsonUrl = './data/system/imageMap.json';

        function buildInteractiveAreas(jsonData, mapName) {
            const areas = [];

            if (jsonData.hasOwnProperty(mapName)) {
                const map = jsonData[mapName];

                for (const targetName in map) {
                    if (map.hasOwnProperty(targetName)) {
                        const target = map[targetName];
                        const coords = target.coords.split(',').map(Number);
                        const x1 = coords[0];
                        const y1 = coords[1];
                        const x2 = coords[2];
                        const y2 = coords[3];
                        const x3 = coords[4];
                        const y3 = coords[5];
                        const x4 = coords[6];
                        const y4 = coords[7];
                        const width = Math.abs(x2 - x1);
                        const height = Math.abs(y3 - y2);

                        areas.push({
                            x1: x1,
                            y1: y1,
                            x2: x2,
                            y2: y2,
                            x3: x3,
                            y3: y3,
                            x4: x4,
                            y4: y4,
                            width: width,
                            height: height,
                            name: target.name || targetName,
                            jump: target.jump,
                            storage: target.storage
                        });
                    }
                }
            } else {
                console.warn(`Map named ${mapName} is not found in JSON data.`);
            }

            return areas;
        }

        async function fetchInteractiveAreas(url, mapName) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                interactiveAreas = buildInteractiveAreas(data, mapName);
                console.log(interactiveAreas);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }

        function handleAreaClick(name, jump, storage) {
            TYRANO.kag.ftag.startTag("call", { storage: storage, target: jump, auto_next: "stop" });
            $(".game-map-container").remove();
        }

        function renderMap() {
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            ctx.drawImage(closedLockImage, 0, 0, canvasElement.width, canvasElement.height);

            canvas.on('mousemove', function (event) {
                const rect = canvasElement.getBoundingClientRect();
                const scaleX = canvasElement.width / rect.width;
                const scaleY = canvasElement.height / rect.height;
                const x = (event.clientX - rect.left) * scaleX;
                const y = (event.clientY - rect.top) * scaleY;

                ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                ctx.drawImage(closedLockImage, 0, 0, canvasElement.width, canvasElement.height);

                interactiveAreas.forEach(area => {
                    const isInArea = isPointInPolygon(x, y, [
                        { x: area.x1, y: area.y1 },
                        { x: area.x2, y: area.y2 },
                        { x: area.x3, y: area.y3 },
                        { x: area.x4, y: area.y4 }
                    ]);
                    if (isInArea) {
                        ctx.drawImage(openLockImage, area.x1, area.y1, area.width, area.height, area.x1, area.y1, area.width, area.height);
                    }
                });
            });

            canvas.on('click', function (event) {
                const rect = canvasElement.getBoundingClientRect();
                const scaleX = canvasElement.width / rect.width;
                const scaleY = canvasElement.height / rect.height;
                const x = (event.clientX - rect.left) * scaleX;
                const y = (event.clientY - rect.top) * scaleY;

                interactiveAreas.forEach(area => {
                    const isInArea = isPointInPolygon(x, y, [
                        { x: area.x1, y: area.y1 },
                        { x: area.x2, y: area.y2 },
                        { x: area.x3, y: area.y3 },
                        { x: area.x4, y: area.y4 }
                    ]);
                    if (isInArea) {
                        handleAreaClick(area.name, area.jump, area.storage);
                    }
                });
            });
        }

        function isPointInPolygon(x, y, polygon) {
            let isInside = false;
            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                const xi = polygon[i].x, yi = polygon[i].y;
                const xj = polygon[j].x, yj = polygon[j].y;
                const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) isInside = !isInside;
            }
            return isInside;
        }

        await fetchInteractiveAreas(jsonUrl, pm.name);

        if (interactiveAreas.length > 0) {
            if (closedLockImage.complete) {
                ctx.drawImage(closedLockImage, 0, 0, canvasElement.width, canvasElement.height);
                renderMap();
            } else {
                closedLockImage.onload = () => {
                    ctx.drawImage(closedLockImage, 0, 0, canvasElement.width, canvasElement.height);
                    renderMap();
                };
            }

            if (!openLockImage.complete) {
                openLockImage.onload = () => {
                    renderMap();
                };
            } else {
                renderMap();
            }
        } else {
            console.warn(`There are no interactive areas for the map: ${pm.name}`);
        }

        this.kag.ftag.nextOrder();
    }
};

$(function() {
    window.getLoadGameStatus = function() {
        const inventory = $('.inventory-container');
        const inventoryD = $('.dynamic-inventory-container');
        const popup = $('.popup-inventory');
        const storedData = localStorage.getItem("inventorySystemData");
        const invData = JSON.parse(storedData);

        if (window.loadGameStatus === true) {
            window.loadGameStatus = false;

            if (inventory.length > 0) {
                inventory.remove();
                inventoryD.remove();
                popup.remove();

                TYRANO.kag.ftag.startTag("inventorySystem", {
                    direction: invData.direction,
                    left: invData.left,
                    graphicBGSmall: invData.graphicBGSmall,
                    graphicCellSmall: invData.graphicCellSmall,
                    graphicBGBig: invData.graphicBGBig,
                    graphicCellBig: invData.graphicCellBig,
                    graphicCloseCellBig: invData.graphicCloseCellBig,
                    cellCount: invData.cellCount,
                    columnCount: invData.columnCount,
                    top: invData.top
                });
            }
        }

        const gmcData = localStorage.getItem("imageMapData");
        const imageMapData = JSON.parse(gmcData);
        if (window.loadGameStatus === true) {
            window.loadGameStatus = false;

            if (gmcData.length > 0) {
                gmcData.remove();

                TYRANO.kag.ftag.startTag("imageMap", {
                    name: imageMapData.name,
                    image: imageMapData.image,
                    imageHover: imageMapData.imageHover
                });
            }
        }
    };
});

function fullScreenModeSet() {
    const fs = require('fs');
    const path = require('path');

    let filePath = path.join(__dirname, 'package.json');
    let fileContent = fs.readFileSync(filePath, 'utf8');
    let settingParse = JSON.parse(fileContent);

    if (settingParse.window && settingParse.window.displayFullScreenMode === true) {
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('fullScreen');
    }
}
$(document).ready(function () {
    fullScreenModeSet();
});

if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    const fs = require('fs');
    const path = require('path');

    const logFilePath = path.join($.getExePath(), 'app.log');

    const asciiArt = `
 ██▒   █▓ ███▄    █ ▓█████     ██▓     ▒█████    ▄████
▓██░   █▒ ██ ▀█   █ ▓█   ▀    ▓██▒    ▒██▒  ██▒ ██▒ ▀█▒
 ▓██  █▒░▓██  ▀█ ██▒▒███      ▒██░    ▒██░  ██▒▒██░▄▄▄░
  ▒██ █░░▓██▒  ▐▌██▒▒▓█  ▄    ▒██░    ▒██   ██░░▓█  ██▓
   ▒▀█░  ▒██░   ▓██░░▒████▒   ░██████▒░ ████▓▒░░▒▓███▀▒
   ░ ▐░  ░ ▒░   ▒ ▒ ░░ ▒░ ░   ░ ▒░▓  ░░ ▒░▒░▒░  ░▒   ▒
   ░ ░░  ░ ░░   ░ ▒░ ░ ░  ░   ░ ░ ▒  ░  ░ ▒ ▒░   ░   ░
     ░░     ░   ░ ░    ░        ░ ░   ░ ░ ░ ▒  ░ ░   ░
      ░           ░    ░  ░       ░  ░    ░ ░        ░
     ░
`;

    function getStackTrace() {
        const obj = {};
        Error.captureStackTrace(obj, getStackTrace);
        return obj.stack;
    }

    function writeToLog(message) {
        if (!fs.existsSync(logFilePath)) {
            fs.appendFileSync(logFilePath, asciiArt + '\n');
        }
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} - ${message}\n`;
        fs.appendFileSync(logFilePath, logMessage);
    }

    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    console.error = (...args) => {
        const stackInfo = getStackTrace() || '';
        writeToLog('ERROR: ' + args.join(' ') + '\n' + stackInfo);
        originalConsoleError.apply(console, args);
    };

    console.warn = (...args) => {
        writeToLog('WARN: ' + args.join(' '));
        originalConsoleWarn.apply(console, args);
    };

    process.on('uncaughtException', (error) => {
        writeToLog(`Исключение: ${error.stack || error.message}`);
    });

    writeToLog('Запуск приложения.');
} else {
    console.warn("Error, function not work in browser")
}