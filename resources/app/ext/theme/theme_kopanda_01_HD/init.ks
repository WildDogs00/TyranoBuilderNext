; ティラノスクリプト テーマプラグイン theme_kopanda_01_HD
; 作者:こ・ぱんだ
; https://kopacurve.blog.fc2.com/


[iscript]

mp.font_color    = mp.font_color    || "0xDDDDDD";
mp.name_color    = mp.name_color    || "0xF1F1F1";
mp.frame_opacity = mp.frame_opacity || "255";
mp.font_color2   = mp.font_color2   || "0xDDDDDD";
mp.glyph         = mp.glyph         || "off";

if(TG.config.alreadyReadTextColor != "default"){
	TG.config.alreadyReadTextColor = mp.font_color2;
}

[endscript]

; レイヤメッセージの削除
[free name="chara_name_area" layer="message0"]

; メッセージウィンドウの設定
[position layer="message0" width="1280" height="210" top="510" left="0"]
[position layer="message0" page="fore" frame="../others/plugin/theme_kopanda_01_HD/image/frame_message.png" margint="60" marginl="80" marginr="80" marginb="70" opacity="&mp.frame_opacity"]

; 名前枠の設定
[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size="24" bold="bold" x="70" y="520" width="400"]
[chara_config ptext="chara_name_area"]

; デフォルトのフォントカラー
[font color="&mp.font_color"]
[deffont color="&mp.font_color"]

; クリック待ちグリフの設定
[if exp="mp.glyph == 'on'"]
[glyph line="../../../data/others/plugin/theme_kopanda_01_HD/image/system/nextpage.png"]
[endif]

; 機能ボタンの表示マクロ
[macro name="add_theme_button"]

; 歯車ボタンを非表示にする
[hidemenubutton]

; Q.Save
[button name="role_button" role="quicksave" graphic="../others/plugin/theme_kopanda_01_HD/image/button/qsave.png" enterimg="../others/plugin/theme_kopanda_01_HD/image/button/qsave2.png" x=182 y=688]

; Q.Load
[button name="role_button" role="quickload" graphic="../others/plugin/theme_kopanda_01_HD/image/button/qload.png" enterimg="../others/plugin/theme_kopanda_01_HD/image/button/qload2.png" x=278 y=688]

; Save
[button name="role_button" role="save" graphic="../others/plugin/theme_kopanda_01_HD/image/button/save.png" enterimg="../others/plugin/theme_kopanda_01_HD/image/button/save2.png" x=376 y=688]

; Load
[button name="role_button" role="load" graphic="../others/plugin/theme_kopanda_01_HD/image/button/load.png" enterimg="../others/plugin/theme_kopanda_01_HD/image/button/load2.png" x=452 y=688]

; Auto
[button name="role_button" role="auto" graphic="../others/plugin/theme_kopanda_01_HD/image/button/auto.png" enterimg="../others/plugin/theme_kopanda_01_HD/image/button/auto2.png" x=530 y=688]

; Skip
[button name="role_button" role="skip" graphic="../others/plugin/theme_kopanda_01_HD/image/button/skip.png" enterimg="../others/plugin/theme_kopanda_01_HD/image/button/skip2.png" x=606 y=688]

; Backlog
[button name="role_button" role="backlog" graphic="../others/plugin/theme_kopanda_01_HD/image/button/log.png" enterimg="../others/plugin/theme_kopanda_01_HD/image/button/log2.png" x=680 y=688]

; Screen
[button name="role_button" role="fullscreen" graphic="../others/plugin/theme_kopanda_01_HD/image/button/screen.png" enterimg="../others/plugin/theme_kopanda_01_HD/image/button/screen2.png" x=784 y=688]

; Menu
[button name="role_button" role="menu" graphic="../others/plugin/theme_kopanda_01_HD/image/button/menu.png" enterimg="../others/plugin/theme_kopanda_01_HD/image/button/menu2.png" x=880 y=688]

; Sleep
[button name="role_button" role="sleepgame" graphic="../others/plugin/theme_kopanda_01_HD/image/button/sleep.png" enterimg="../others/plugin/theme_kopanda_01_HD/image/button/sleep2.png" x=964 y=688 storage="../others/plugin/theme_kopanda_01_HD/config.ks"]

; Title
[button name="role_button" role="title" graphic="../others/plugin/theme_kopanda_01_HD/image/button/title.png" enterimg="../others/plugin/theme_kopanda_01_HD/image/button/title2.png" x=1054 y=688]

; Close
[button name="role_button" role="window" graphic="../others/plugin/theme_kopanda_01_HD/image/button/close.png" enterimg="../others/plugin/theme_kopanda_01_HD/image/button/close2.png" x=1246 y=560]


[endmacro]

;===============================================================================

; システムで利用するHTML,CSSの変更

;===============================================================================
; セーブ画面
[sysview type="save" storage="./data/others/plugin/theme_kopanda_01_HD/html/save.html"]

; ロード画面
[sysview type="load" storage="./data/others/plugin/theme_kopanda_01_HD/html/load.html"]

; バックログ画面
[sysview type="backlog" storage="./data/others/plugin/theme_kopanda_01_HD/html/backlog.html"]

; メニュー画面
[sysview type="menu" storage="./data/others/plugin/theme_kopanda_01_HD/html/menu.html"]

; CSS
[loadcss file="./data/others/plugin/theme_kopanda_01_HD/ts01.css"]


;===============================================================================

;　テストメッセージ出力プラグインの読み込み

;===============================================================================
[loadjs storage="plugin/theme_kopanda_01_HD/testMessagePlus/gMessageTester.js"]
[loadcss file="./data/others/plugin/theme_kopanda_01_HD/testMessagePlus/style.css"]

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
