;-------------------------------------------------------------
; ティラノスクリプト テーマプラグイン theme_kopanda_03b
; 作者:こ・ぱんだ
; https://kopacurve.blog.fc2.com/
;-------------------------------------------------------------

[iscript]

/* 初期化 */
mp.font_color    = mp.font_color    || "0x383C5F"; // テキストのフォントカラー
mp.name_color    = mp.name_color    || "0xF5F5F5"; // 名前欄のフォントカラー
mp.frame_opacity = mp.frame_opacity || "255"; // メッセージフレームの不透明度（0～255）

// 既読テキストのフォントカラーを設定
// 設定は《未読テキストと同じ色》にしていますので必要に応じて編集してください
mp.font_color2   = mp.font_color2   || "0xF1F1F1";

// Config.tjsで既読テキストのフォントカラーを「default」にしている場合はmp.font_color2は反映されません
if(TG.config.alreadyReadTextColor != "default"){
  TG.config.alreadyReadTextColor = mp.font_color2;
}
[endscript]

;レイヤメッセージの削除
[free name="chara_name_area" layer="message0"]

;メッセージフレーム設定（名前欄）
[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size=28 x=10 y=410 width="300" align="center"]
[chara_config ptext="chara_name_area"]

;メッセージフレーム設定（全体）
[position layer="message0" width="960" height="240" top="400" left="0"]
[position layer="message0" page="fore" frame="../others/plugin/theme_kopanda_03b/image/frame_message.png" margint="70" marginl="40" marginr="50" marginb="30" opacity="&mp.frame_opacity"]

[font color="&mp.font_color"]
[deffont color="&mp.font_color"]

;-----------------------------------
;▼ロールボタンを表示するマクロ
;-----------------------------------
[macro name="add_theme_button"]

;メニューボタン非表示
[hidemenubutton]

;q.save
[button name="role_button" role="qsave" width="38" height="48" graphic="../others/plugin/theme_kopanda_03b/image/button/qsave.png" enterimg="../others/plugin/theme_kopanda_03b/image/button/qsave2.png" x=470 y=400]

;q.load
[button name="role_button" role="qload" width="38" height="48" graphic="../others/plugin/theme_kopanda_03b/image/button/qload.png" enterimg="../others/plugin/theme_kopanda_03b/image/button/qload2.png" x=510 y=400]

;save
[button name="role_button" role="save" width="38" height="48" graphic="../others/plugin/theme_kopanda_03b/image/button/save.png" enterimg="../others/plugin/theme_kopanda_03b/image/button/save2.png" x=550 y=400]

;load
[button name="role_button" role="load" width="38" height="48" graphic="../others/plugin/theme_kopanda_03b/image/button/load.png" enterimg="../others/plugin/theme_kopanda_03b/image/button/load2.png" x=590 y=400]

;auto
[button name="role_button" role="auto" width="38" height="48" graphic="../others/plugin/theme_kopanda_03b/image/button/auto.png" enterimg="../others/plugin/theme_kopanda_03b/image/button/auto2.png" x=630 y=400]

;skip
[button name="role_button" role="skip" width="38" height="48" graphic="../others/plugin/theme_kopanda_03b/image/button/skip.png" enterimg="../others/plugin/theme_kopanda_03b/image/button/skip2.png" x=670 y=400]

;log
[button name="role_button" role="backlog" width="38" height="48" graphic="../others/plugin/theme_kopanda_03b/image/button/log.png" enterimg="../others/plugin/theme_kopanda_03b/image/button/log2.png" x=710 y=400]

;screen
[button name="role_button" role="fullscreen" width="38" height="48" graphic="../others/plugin/theme_kopanda_03b/image/button/screen.png" enterimg="../others/plugin/theme_kopanda_03b/image/button/screen2.png" x=750 y=400]

;menu
[button name="role_button" role="menu" width="38" height="48" graphic="../others/plugin/theme_kopanda_03b/image/button/menu.png" enterimg="../others/plugin/theme_kopanda_03b/image/button/menu2.png" x=790 y=400]

;config（※sleepgame を使用して config.ks を呼び出しています）
[button name="role_button" role="sleepgame" width="38" height="48" graphic="../others/plugin/theme_kopanda_03b/image/button/sleep.png" enterimg="../others/plugin/theme_kopanda_03b/image/button/sleep2.png" x=830 y=400 storage="../others/plugin/theme_kopanda_03b/config.ks"]

;close
[button name="role_button" role="window" width="38" height="48" graphic="../others/plugin/theme_kopanda_03b/image/button/close.png" enterimg="../others/plugin/theme_kopanda_03b/image/button/close2.png" x=870 y=400]

;title
[button name="role_button" role="title" width="38" height="48" graphic="../others/plugin/theme_kopanda_03b/image/button/title.png" enterimg="../others/plugin/theme_kopanda_03b/image/button/title2.png" x=910 y=400]

[endmacro]

;-------------------------------------
; ▼システムで利用するHTML,CSS
;-------------------------------------
;セーブ画面のHTMLファイル
[sysview type="save" storage="./data/others/plugin/theme_kopanda_03b/html/save.html" ]
;ロード画面のHTMLファイル
[sysview type="load" storage="./data/others/plugin/theme_kopanda_03b/html/load.html" ]
;バックログ画面のHTMLファイル
[sysview type="backlog" storage="./data/others/plugin/theme_kopanda_03b/html/backlog.html" ]
;メニュー画面のHTMLファイル
[sysview type="menu" storage="./data/others/plugin/theme_kopanda_03b/html/menu.html" ]
;スタイルシート呼び出し
[loadcss file="./data/others/plugin/theme_kopanda_03b/ts03b.css"]

;=================================================================================

;　テストメッセージ出力プラグインの読み込み

;=================================================================================
[loadjs storage="plugin/theme_kopanda_03b/testMessagePlus/gMessageTester.js"]
[loadcss file="./data/others/plugin/theme_kopanda_03b/testMessagePlus/style.css"]

[macro name="test_message_start"]
[eval exp="gMessageTester.create()"]
[endmacro]

[macro name="test_message_end"]
[eval exp="gMessageTester.destroy()"]
[endmacro]

[macro name="test_message_reset"]
[eval exp="gMessageTester.currentTextNumber=0;gMessageTester.next(true)"]
[endmacro]


;コール先に戻ります
[return]
