;-------------------------------------------------------------
; 2019.05.11 ko10panda edit
; ティラノスクリプト テーマプラグイン theme_kopanda_12
; 作者:こ・ぱんだ
; https://kopacurve.blog.fc2.com/

; てんぷらたべたい（http://tempura9357.blog.fc2.com/）様より
;「テストメッセージ出力プラグイン」をお借りしています
;-------------------------------------------------------------
[iscript]

/* 初期化 */
mp.font_color    = mp.font_color    || "0x432E36"; // テキストのフォントカラー
mp.name_color    = mp.name_color    || "0xD0BFAB"; // 名前欄のフォントカラー
mp.frame_opacity = mp.frame_opacity || "255";      // メッセージフレームの不透明度（0～255）

// 既読テキストのフォントカラー設定
mp.font_color2   = mp.font_color2   || "0x432E36";

// Config.tjsで既読テキストのフォントカラーを「default」にしていると mp.font_color2 の内容は反映されません
if(TG.config.alreadyReadTextColor != "default"){
  TG.config.alreadyReadTextColor = mp.font_color2;
}

[endscript]

;レイヤメッセージの削除
[free name="chara_name_area" layer="message0"]

;メッセージフレーム設定（名前欄）※センタリングしたくないときは align を削除
[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size=22 x=30 y=660 width="260" align="center"]
[chara_config ptext="chara_name_area"]

;メッセージフレーム設定（全体）
[position layer="message0" width="640" height="220" top="635" left="0"]
[position layer="message0" page="fore" frame="../others/plugin/theme_kopanda_12/image/frame_message.png" margint="60" marginl="35" marginr="30" marginb="30" opacity="&mp.frame_opacity"]

[font color="&mp.font_color" size="28"]
[deffont color="&mp.font_color"]

;-------------------------------------------------------------------------------
; ロールボタンを表示するマクロ
;-------------------------------------------------------------------------------
[macro  name="add_theme_button"]

; メニューボタンを非表示に
[hidemenubutton]
;q.save
[button name="role_button" role="qsave" graphic="../others/plugin/theme_kopanda_12/image/button/qsave.png" enterimg="../others/plugin/theme_kopanda_12/image/button/qsave2.png" x="25" y="863"]
;q.load
[button name="role_button" role="qload" graphic="../others/plugin/theme_kopanda_12/image/button/qload.png" enterimg="../others/plugin/theme_kopanda_12/image/button/qload2.png" x="125" y="863"]
;auto
[button name="role_button" role="auto" graphic="../others/plugin/theme_kopanda_12/image/button/auto.png" enterimg="../others/plugin/theme_kopanda_12/image/button/auto2.png" x="225" y="863"]
;skip
[button name="role_button" role="skip" graphic="../others/plugin/theme_kopanda_12/image/button/skip.png" enterimg="../others/plugin/theme_kopanda_12/image/button/skip2.png" x="325" y="863"]
;log
[button name="role_button" role="backlog" graphic="../others/plugin/theme_kopanda_12/image/button/log.png" enterimg="../others/plugin/theme_kopanda_12/image/button/log2.png" x="425" y="863"]
;menu
[button name="role_button" role="menu" graphic="../others/plugin/theme_kopanda_12/image/button/menu.png" enterimg="../others/plugin/theme_kopanda_12/image/button/menu2.png" x="525" y="863"]
;close
[button name="role_button" role="window" graphic="../others/plugin/theme_kopanda_12/image/button/close.png" enterimg="../others/plugin/theme_kopanda_12/image/button/close2.png" x="580" y="640"]

[endmacro]

;-------------------------------------
; ▼システムで利用するHTML,CSS
;-------------------------------------
[sysview type="save" storage="./data/others/plugin/theme_kopanda_12/html/save.html" ]
[sysview type="load" storage="./data/others/plugin/theme_kopanda_12/html/load.html" ]
[sysview type="backlog" storage="./data/others/plugin/theme_kopanda_12/html/backlog.html" ]
[sysview type="menu" storage="./data/others/plugin/theme_kopanda_12/html/menu.html" ]
[loadcss file="./data/others/plugin/theme_kopanda_12/ts12.css"]
[loadjs storage="plugin/theme_kopanda_12/setting.js"]

;=================================================================================

;　テストメッセージ出力プラグインの読み込み

;=================================================================================
[loadjs storage="plugin/theme_kopanda_12/testMessagePlus/gMessageTester.js"]
[loadcss file="./data/others/plugin/theme_kopanda_12/testMessagePlus/style.css"]

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
