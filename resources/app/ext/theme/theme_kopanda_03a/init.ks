;-------------------------------------------------------------
; 2017/04/07 ko10panda edit
; ティラノスクリプト テーマプラグイン theme_kopanda_03a
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

;メッセージフレーム設定（名前欄） ※８文字程度が目安です。それ以上になるときは文字のサイズを落として調整してください
[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size=26 x=10 y=685 width="260" align="center"]
[chara_config ptext="chara_name_area"]

;メッセージフレーム設定（全体）
[position layer="message0" width="640" height="290" top="670" left="0"]
[position layer="message0" page="fore" frame="../others/plugin/theme_kopanda_03a/image/frame_message.png" margint="70" marginl="20" marginr="50" marginb="30" opacity="&mp.frame_opacity"]

[font color="&mp.font_color"]
[deffont color="&mp.font_color"]

;-----------------------------------
;▼ロールボタンを表示するマクロ
;-----------------------------------
[macro  name="add_theme_button"]

;メニューボタン非表示
[hidemenubutton]

;ロールボタンの配置

;q.save
[button name="role_button" role="qsave" width="48" height="61" graphic="../others/plugin/theme_kopanda_03a/image/button/qsave.png" enterimg="../others/plugin/theme_kopanda_03a/image/button/qsave2.png" x="21" y="895"]
;q.load
[button name="role_button" role="qload" width="48" height="61" graphic="../others/plugin/theme_kopanda_03a/image/button/qload.png" enterimg="../others/plugin/theme_kopanda_03a/image/button/qload2.png" x="71" y="895"]

;save
[button name="role_button" role="save" width="48" height="61" graphic="../others/plugin/theme_kopanda_03a/image/button/save.png" enterimg="../others/plugin/theme_kopanda_03a/image/button/save2.png" x="121" y=895]

;load
[button name="role_button" role="load" width="48" height="61" graphic="../others/plugin/theme_kopanda_03a/image/button/load.png" enterimg="../others/plugin/theme_kopanda_03a/image/button/load2.png" x="171" y=895]

;auto
[button name="role_button" role="auto" width="48" height="61" graphic="../others/plugin/theme_kopanda_03a/image/button/auto.png" enterimg="../others/plugin/theme_kopanda_03a/image/button/auto2.png" x="221" y=895]

;skip
[button name="role_button" role="skip" width="48" height="61" graphic="../others/plugin/theme_kopanda_03a/image/button/skip.png" enterimg="../others/plugin/theme_kopanda_03a/image/button/skip2.png" x="271" y=895]

;log
[button name="role_button" role="backlog" width="48" height="61" graphic="../others/plugin/theme_kopanda_03a/image/button/log.png" enterimg="../others/plugin/theme_kopanda_03a/image/button/log2.png" x="321" y=895]

;screen
[button name="role_button" role="fullscreen" width="48" height="61" graphic="../others/plugin/theme_kopanda_03a/image/button/screen.png" enterimg="../others/plugin/theme_kopanda_03a/image/button/screen2.png" x="371" y="895"]

;menu
[button name="role_button" role="menu" width="48" height="61" graphic="../others/plugin/theme_kopanda_03a/image/button/menu.png" enterimg="../others/plugin/theme_kopanda_03a/image/button/menu2.png" x="421" y="895"]

;config（※sleepgame を使用して config.ks を呼び出しています）
[button name="role_button" role="sleepgame" width="48" height="61" graphic="../others/plugin/theme_kopanda_03a/image/button/sleep.png" enterimg="../others/plugin/theme_kopanda_03a/image/button/sleep2.png" x="471" y="895" storage="../others/plugin/theme_kopanda_03a/config.ks"]

;close
[button name="role_button" role="window" width="48" height="61" graphic="../others/plugin/theme_kopanda_03a/image/button/close.png" enterimg="../others/plugin/theme_kopanda_03a/image/button/close2.png" x="521" y="895"]

;title
[button name="role_button" role="title" width="48" height="61" graphic="../others/plugin/theme_kopanda_03a/image/button/title.png" enterimg="../others/plugin/theme_kopanda_03a/image/button/title2.png" x="571" y="895"]

[endmacro]

;-------------------------------------
; ▼システムで利用するHTML,CSS
;-------------------------------------
;セーブ画面のHTMLファイル
[sysview type="save" storage="./data/others/plugin/theme_kopanda_03a/html/save.html" ]
;ロード画面のHTMLファイル
[sysview type="load" storage="./data/others/plugin/theme_kopanda_03a/html/load.html" ]
;バックログ画面のHTMLファイル
[sysview type="backlog" storage="./data/others/plugin/theme_kopanda_03a/html/backlog.html" ]
;メニュー画面のHTMLファイル
[sysview type="menu" storage="./data/others/plugin/theme_kopanda_03a/html/menu.html" ]
;スタイルシート呼び出し
[loadcss file="./data/others/plugin/theme_kopanda_03a/ts03a.css"]

;=================================================================================

;　テストメッセージ出力プラグインの読み込み

;=================================================================================
[loadjs storage="plugin/theme_kopanda_03a/testMessagePlus/gMessageTester.js"]
[loadcss file="./data/others/plugin/theme_kopanda_03a/testMessagePlus/style.css"]

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
