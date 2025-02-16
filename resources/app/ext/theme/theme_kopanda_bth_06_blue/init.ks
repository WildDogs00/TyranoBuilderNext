; ティラノスクリプト テーマプラグイン theme_kopanda_bth_06_blue
; 作者:こ・ぱんだ
; https://kopacurve.blog.fc2.com/


[iscript]

mp.font_color    = mp.font_color    || "0x222222";
mp.name_color    = mp.name_color    || "0x222222";
mp.frame_opacity = mp.frame_opacity || "255";
mp.font_color2   = mp.font_color2   || "0x222222";
mp.glyph         = mp.glyph         || "off";

// Config.tjsで既読テキストのフォントカラーを「default」にしている場合はmp.font_color2は反映されません
if(TG.config.alreadyReadTextColor != "default"){
  TG.config.alreadyReadTextColor = mp.font_color2;
}

[endscript]

; 名前部分のメッセージレイヤ削除
[free name="chara_name_area" layer="message0"]

; メッセージウィンドウの設定
[position layer="message0" width="1280" height="248" top="472" left="0"]
[position layer="message0" frame="../others/plugin/theme_kopanda_bth_06_blue/image/frame_message.png" margint="60" marginl="160" marginr="180" marginb="50" opacity="&mp.frame_opacity" page="fore"]

; 名前枠の設定
[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size="26" bold="bold" x="90" y="480" width="520"]
[chara_config ptext="chara_name_area"]

; デフォルトのフォントカラー指定
[font color="&mp.font_color"]
[deffont color="&mp.font_color"]

; クリック待ちグリフの設定（on設定時のみ有効）
[if exp="mp.glyph == 'on'"]
[glyph line="../../../data/others/plugin/theme_kopanda_bth_06_blue/image/system/pagebreak.png"]
[endif]

;===============================================================================

; 機能ボタンを表示するマクロ

;===============================================================================
;機能ボタンを表示したいシーンで[add_theme_button]と記述してください（消去は[clearfix]タグ）
[macro  name="add_theme_button"]

; 歯車ボタン（メニューボタン）非表示
[hidemenubutton]

; Q.Save
[button name="role_button" role="quicksave" graphic="../others/plugin/theme_kopanda_bth_06_blue/image/button/qsave.png" enterimg="../others/plugin/theme_kopanda_bth_06_blue/image/button/qsave2.png" x="97" y="690"]

; Q.Load
[button name="role_button" role="quickload" graphic="../others/plugin/theme_kopanda_bth_06_blue/image/button/qload.png" enterimg="../others/plugin/theme_kopanda_bth_06_blue/image/button/qload2.png" x="197" y="690"]

; Save
[button name="role_button" role="save" graphic="../others/plugin/theme_kopanda_bth_06_blue/image/button/save.png" enterimg="../others/plugin/theme_kopanda_bth_06_blue/image/button/save2.png" x="297" y="690"]

; Load
[button name="role_button" role="load" graphic="../others/plugin/theme_kopanda_bth_06_blue/image/button/load.png" enterimg="../others/plugin/theme_kopanda_bth_06_blue/image/button/load2.png" x="397" y="690"]

; Auto
[button name="role_button" role="auto" graphic="../others/plugin/theme_kopanda_bth_06_blue/image/button/auto.png" enterimg="../others/plugin/theme_kopanda_bth_06_blue/image/button/auto2.png" x="497" y="690"]

; Skip
[button name="role_button" role="skip" graphic="../others/plugin/theme_kopanda_bth_06_blue/image/button/skip.png" enterimg="../others/plugin/theme_kopanda_bth_06_blue/image/button/skip2.png" x="597" y="690"]

; Backlog
[button name="role_button" role="backlog" graphic="../others/plugin/theme_kopanda_bth_06_blue/image/button/log.png" enterimg="../others/plugin/theme_kopanda_bth_06_blue/image/button/log2.png" x="697" y="690"]

; Screen
[button name="role_button" role="fullscreen" graphic="../others/plugin/theme_kopanda_bth_06_blue/image/button/screen.png" enterimg="../others/plugin/theme_kopanda_bth_06_blue/image/button/screen2.png" x="797" y="690"]

; Config（※sleepgame を使用して config.ks を呼び出しています）
[button name="role_button" role="sleepgame" graphic="../others/plugin/theme_kopanda_bth_06_blue/image/button/sleep.png" enterimg="../others/plugin/theme_kopanda_bth_06_blue/image/button/sleep2.png" storage="../others/plugin/theme_kopanda_bth_06_blue/config.ks" x="897" y="690"]

; Menu（※ロールボタンを使うなら不要）
[button name="role_button" role="menu" graphic="../others/plugin/theme_kopanda_bth_06_blue/image/button/menu.png" enterimg="../others/plugin/theme_kopanda_bth_06_blue/image/button/menu2.png" x="997" y="690"]

; Title
[button name="role_button" role="title" graphic="../others/plugin/theme_kopanda_bth_06_blue/image/button/title.png" enterimg="../others/plugin/theme_kopanda_bth_06_blue/image/button/title2.png" x="1097" y="690"]

; Close
[button name="role_button" role="window" graphic="../others/plugin/theme_kopanda_bth_06_blue/image/button/close.png" enterimg="../others/plugin/theme_kopanda_bth_06_blue/image/button/close2.png" x="1195" y="535"]

[endmacro]

;===============================================================================

; HTML, CSS

;===============================================================================
; HTML-Save
[sysview type="save" storage="./data/others/plugin/theme_kopanda_bth_06_blue/html/save.html" ]

; HTMLL-Load
[sysview type="load" storage="./data/others/plugin/theme_kopanda_bth_06_blue/html/load.html" ]

; HTML-Backlog
[sysview type="backlog" storage="./data/others/plugin/theme_kopanda_bth_06_blue/html/backlog.html" ]

; HTML-Menu
[sysview type="menu" storage="./data/others/plugin/theme_kopanda_bth_06_blue/html/menu.html" ]

; CSS
[loadcss file="./data/others/plugin/theme_kopanda_bth_06_blue/bth06.css"]

[loadjs storage="plugin/theme_kopanda_bth_06_blue/setting.js"]

;===============================================================================

; TestMessagePlugin

;===============================================================================
[loadjs storage="plugin/theme_kopanda_bth_06_blue/testMessagePlus/gMessageTester.js"]
[loadcss file="./data/others/plugin/theme_kopanda_bth_06_blue/testMessagePlus/style.css"]

[macro name="test_message_start"]
[eval exp="gMessageTester.create()"]
[endmacro]

[macro name="test_message_end"]
[eval exp="gMessageTester.destroy()"]
[endmacro]

[macro name="test_message_reset"]
[eval exp="gMessageTester.currentTextNumber=0;gMessageTester.next(true)"]
[endmacro]


[return]
