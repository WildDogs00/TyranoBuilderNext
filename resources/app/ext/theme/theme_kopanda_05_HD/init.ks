; ティラノスクリプト テーマプラグイン theme_kopanda_05_HD
; 作者:こ・ぱんだ
; https://kopacurve.blog.fc2.com/


[iscript]

mp.font_color    = mp.font_color    || "0x5A3421";
mp.name_color    = mp.name_color    || "0xb0415b";
mp.frame_opacity = mp.frame_opacity || "255";
mp.font_color2   = mp.font_color2   || "0x5A3421";
mp.glyph         = mp.glyph         || "off";

if(TG.config.alreadyReadTextColor != "default"){
	TG.config.alreadyReadTextColor = mp.font_color2;
}

[endscript]

; レイヤメッセージの削除
[free name="chara_name_area" layer="message0"]

; メッセージウィンドウの設定
[position layer="message0" width="1280" height="220" top="500" left="0"]
[position layer="message0" page="fore" frame="../others/plugin/theme_kopanda_05_HD/image/frame_message.png" margint="70" marginl="160" marginr="140" marginb="70" opacity="&mp.frame_opacity"]

; 名前枠の設定
[ptext name="chara_name_area" layer="message0" color="&mp.name_color" bold="bold" size="28" x="92" y="508" width="372" align="center"]
[chara_config ptext="chara_name_area"]

; デフォルトのフォントカラー
[font color="&mp.font_color"]
[deffont color="&mp.font_color"]

; クリック待ちグリフの設定
[if exp="mp.glyph == 'on'"]
[glyph line="../../../data/others/plugin/theme_kopanda_05_HD/image/system/nextpage.png"]
[endif]

; 機能ボタンの表示マクロ
[macro name="add_theme_button"]

; 歯車ボタンを非表示にする
[hidemenubutton]

[iscript]

	// システムボタンの配置座標
	tf.sysbtn_x = [ 72, 176, 280, 384, 488, 592, 696, 800, 904, 1008, 1112];
	tf.sysbtn_y = 688;

[endscript]

; Q.Save
[button name="role_button" role="quicksave" width="96" height="28" graphic="../others/plugin/theme_kopanda_05_HD/image/button/qsave.svg" enterimg="../others/plugin/theme_kopanda_05_HD/image/button/qsave2.svg" x="&tf.sysbtn_x[0]" y="&tf.sysbtn_y"]

; Q.Load
[button name="role_button" role="quickload" width="96" height="28" graphic="../others/plugin/theme_kopanda_05_HD/image/button/qload.svg" enterimg="../others/plugin/theme_kopanda_05_HD/image/button/qload2.svg" x="&tf.sysbtn_x[1]" y="&tf.sysbtn_y"]

; Save
[button name="role_button" role="save" width="96" height="28" graphic="../others/plugin/theme_kopanda_05_HD/image/button/save.svg" enterimg="../others/plugin/theme_kopanda_05_HD/image/button/save2.svg" x="&tf.sysbtn_x[2]" y="&tf.sysbtn_y"]

; Load
[button name="role_button" role="load" width="96" height="28" graphic="../others/plugin/theme_kopanda_05_HD/image/button/load.svg" enterimg="../others/plugin/theme_kopanda_05_HD/image/button/load2.svg" x="&tf.sysbtn_x[3]" y="&tf.sysbtn_y"]

; Auto
[button name="role_button" role="auto" width="96" height="28" graphic="../others/plugin/theme_kopanda_05_HD/image/button/auto.svg" enterimg="../others/plugin/theme_kopanda_05_HD/image/button/auto2.svg" x="&tf.sysbtn_x[4]" y="&tf.sysbtn_y"]

; Skip
[button name="role_button" role="skip" width="96" height="28" graphic="../others/plugin/theme_kopanda_05_HD/image/button/skip.svg" enterimg="../others/plugin/theme_kopanda_05_HD/image/button/skip2.svg" x="&tf.sysbtn_x[5]" y="&tf.sysbtn_y"]

; Backlog
[button name="role_button" role="backlog" width="96" height="28" graphic="../others/plugin/theme_kopanda_05_HD/image/button/log.svg" enterimg="../others/plugin/theme_kopanda_05_HD/image/button/log2.svg" x="&tf.sysbtn_x[6]" y="&tf.sysbtn_y"]

; Screen
[button name="role_button" role="fullscreen" width="96" height="28" graphic="../others/plugin/theme_kopanda_05_HD/image/button/screen.svg" enterimg="../others/plugin/theme_kopanda_05_HD/image/button/screen2.svg" x="&tf.sysbtn_x[7]" y="&tf.sysbtn_y"]

; Sleep
[button name="role_button" role="sleepgame" width="96" height="28" graphic="../others/plugin/theme_kopanda_05_HD/image/button/sleep.svg" enterimg="../others/plugin/theme_kopanda_05_HD/image/button/sleep2.svg" x="&tf.sysbtn_x[8]" y="&tf.sysbtn_y" storage="../others/plugin/theme_kopanda_05_HD/config.ks"]

; Menu
[button name="role_button" role="menu" width="96" height="28" graphic="../others/plugin/theme_kopanda_05_HD/image/button/menu.svg" enterimg="../others/plugin/theme_kopanda_05_HD/image/button/menu2.svg" x="&tf.sysbtn_x[9]" y="&tf.sysbtn_y"]

; Title
[button name="role_button" role="title" width="96" height="28" graphic="../others/plugin/theme_kopanda_05_HD/image/button/title.svg" enterimg="../others/plugin/theme_kopanda_05_HD/image/button/title2.svg" x="&tf.sysbtn_x[10]" y="&tf.sysbtn_y"]

; Close
[button name="role_button" role="window" width="28" height="28" graphic="../others/plugin/theme_kopanda_05_HD/image/button/close.svg" enterimg="../others/plugin/theme_kopanda_05_HD/image/button/close2.svg" x="1236" y="556"]

[endmacro]

;===============================================================================

; システムで利用するHTML,CSSの変更

;===============================================================================
; セーブ画面
[sysview type="save" storage="./data/others/plugin/theme_kopanda_05_HD/html/save.html"]

; ロード画面
[sysview type="load" storage="./data/others/plugin/theme_kopanda_05_HD/html/load.html"]

; バックログ画面
[sysview type="backlog" storage="./data/others/plugin/theme_kopanda_05_HD/html/backlog.html"]

; メニュー画面
[sysview type="menu" storage="./data/others/plugin/theme_kopanda_05_HD/html/menu.html"]

; CSS
[loadcss file="./data/others/plugin/theme_kopanda_05_HD/ts05.css"]


;===============================================================================

;　テストメッセージ出力プラグインの読み込み

;===============================================================================
[loadjs storage="plugin/theme_kopanda_05_HD/testMessagePlus/gMessageTester.js"]
[loadcss file="./data/others/plugin/theme_kopanda_05_HD/testMessagePlus/style.css"]

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
