; ティラノスクリプト テーマプラグイン theme_kopanda_04_HD
; 作者:こ・ぱんだ
; https://kopacurve.blog.fc2.com/


[iscript]

mp.font_color    = mp.font_color    || "0x6C5353";
mp.name_color    = mp.name_color    || "0xF1F1F1";
mp.frame_opacity = mp.frame_opacity || "255";
mp.font_color2   = mp.font_color2   || "0x6C5353";
mp.glyph         = mp.glyph         || "off";

if(TG.config.alreadyReadTextColor != "default"){
	TG.config.alreadyReadTextColor = mp.font_color2;
}

[endscript]

; レイヤメッセージの削除
[free name="chara_name_area" layer="message0"]

; メッセージウィンドウの設定
[position layer="message0" width="1160" height="240" top="470" left="60"]
[position layer="message0" page="fore" frame="../others/plugin/theme_kopanda_04_HD/image/frame_message.png" margint="68" marginl="150" marginr="140" marginb="70" opacity="&mp.frame_opacity"]

; 名前枠の設定
[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size="28" x="80" y="478" width="460" align="center"]
[chara_config ptext="chara_name_area"]

; デフォルトのフォントカラー
[font color="&mp.font_color"]
[deffont color="&mp.font_color"]

; クリック待ちグリフの設定
[if exp="mp.glyph == 'on'"]
[glyph line="../../../data/others/plugin/theme_kopanda_04_HD/image/system/nextpage.png"]
[endif]

; 機能ボタンの表示マクロ
[macro name="add_theme_button"]

; 歯車ボタンを非表示にする
[hidemenubutton]

[iscript]

	// システムボタンの配置座標
	tf.sysbtn_x = [196, 294, 396, 468, 546, 616, 682, 786, 876, 964, 1038];
	tf.sysbtn_y = 671;

[endscript]

; Q.Save
[button name="role_button" role="quicksave" graphic="../others/plugin/theme_kopanda_04_HD/image/button/qsave.png" enterimg="../others/plugin/theme_kopanda_04_HD/image/button/qsave2.png" x="&tf.sysbtn_x[0]" y="&tf.sysbtn_y"]

; Q.Load
[button name="role_button" role="quickload" graphic="../others/plugin/theme_kopanda_04_HD/image/button/qload.png" enterimg="../others/plugin/theme_kopanda_04_HD/image/button/qload2.png" x="&tf.sysbtn_x[1]" y="&tf.sysbtn_y"]

; Save
[button name="role_button" role="save" graphic="../others/plugin/theme_kopanda_04_HD/image/button/save.png" enterimg="../others/plugin/theme_kopanda_04_HD/image/button/save2.png" x="&tf.sysbtn_x[2]" y="&tf.sysbtn_y"]

; Load
[button name="role_button" role="load" graphic="../others/plugin/theme_kopanda_04_HD/image/button/load.png" enterimg="../others/plugin/theme_kopanda_04_HD/image/button/load2.png" x="&tf.sysbtn_x[3]" y="&tf.sysbtn_y"]

; Auto
[button name="role_button" role="auto" graphic="../others/plugin/theme_kopanda_04_HD/image/button/auto.png" enterimg="../others/plugin/theme_kopanda_04_HD/image/button/auto2.png" x="&tf.sysbtn_x[4]" y="&tf.sysbtn_y"]

; Skip
[button name="role_button" role="skip" graphic="../others/plugin/theme_kopanda_04_HD/image/button/skip.png" enterimg="../others/plugin/theme_kopanda_04_HD/image/button/skip2.png" x="&tf.sysbtn_x[5]" y="&tf.sysbtn_y"]

; Backlog
[button name="role_button" role="backlog" graphic="../others/plugin/theme_kopanda_04_HD/image/button/log.png" enterimg="../others/plugin/theme_kopanda_04_HD/image/button/log2.png" x="&tf.sysbtn_x[6]" y="&tf.sysbtn_y"]

; Screen
[button name="role_button" role="fullscreen" graphic="../others/plugin/theme_kopanda_04_HD/image/button/screen.png" enterimg="../others/plugin/theme_kopanda_04_HD/image/button/screen2.png" x="&tf.sysbtn_x[7]" y="&tf.sysbtn_y"]

; Sleep
[button name="role_button" role="sleepgame" graphic="../others/plugin/theme_kopanda_04_HD/image/button/sleep.png" enterimg="../others/plugin/theme_kopanda_04_HD/image/button/sleep2.png" x="&tf.sysbtn_x[8]" y="&tf.sysbtn_y" storage="../others/plugin/theme_kopanda_04_HD/config.ks"]

; Menu
[button name="role_button" role="menu" graphic="../others/plugin/theme_kopanda_04_HD/image/button/menu.png" enterimg="../others/plugin/theme_kopanda_04_HD/image/button/menu2.png" x="&tf.sysbtn_x[9]" y="&tf.sysbtn_y"]

; Title
[button name="role_button" role="title" graphic="../others/plugin/theme_kopanda_04_HD/image/button/title.png" enterimg="../others/plugin/theme_kopanda_04_HD/image/button/title2.png" x="&tf.sysbtn_x[10]" y="&tf.sysbtn_y"]

; Close
[button name="role_button" role="window" graphic="../others/plugin/theme_kopanda_04_HD/image/button/close.png" enterimg="../others/plugin/theme_kopanda_04_HD/image/button/close2.png" x="1180" y="514"]

[endmacro]

;===============================================================================

; システムで利用するHTML,CSSの変更

;===============================================================================
; セーブ画面
[sysview type="save" storage="./data/others/plugin/theme_kopanda_04_HD/html/save.html"]

; ロード画面
[sysview type="load" storage="./data/others/plugin/theme_kopanda_04_HD/html/load.html"]

; バックログ画面
[sysview type="backlog" storage="./data/others/plugin/theme_kopanda_04_HD/html/backlog.html"]

; メニュー画面
[sysview type="menu" storage="./data/others/plugin/theme_kopanda_04_HD/html/menu.html"]

; CSS
[loadcss file="./data/others/plugin/theme_kopanda_04_HD/ts04.css"]


;===============================================================================

;　テストメッセージ出力プラグインの読み込み

;===============================================================================
[loadjs storage="plugin/theme_kopanda_04_HD/testMessagePlus/gMessageTester.js"]
[loadcss file="./data/others/plugin/theme_kopanda_04_HD/testMessagePlus/style.css"]

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
