;--------------------------------------------------------------------------------
; ティラノスクリプト テーマプラグイン theme_kopanda_14
; 作者:こ・ぱんだ
; https://kopacurve.blog.fc2.com/
;--------------------------------------------------------------------------------

[iscript]

/*
 * mp.font_color	未読テキストのフォントカラー
 * mp.font_color2	既読テキストのフォントカラー（Config.tjsで無効にしている場合は反映されません）
 * mp.name_color	名前のフォントカラー
 * mp.frame_opacity	メッセージウィンドウの不透明度
*/

mp.font_color    = mp.font_color    || "0xE5DFD9";
mp.name_color    = mp.name_color    || "0xf9e1af";
mp.frame_opacity = mp.frame_opacity || "255";
mp.font_color2   = mp.font_color2   || "0xE5DFD9";

if(TG.config.alreadyReadTextColor != "default") {
	TG.config.alreadyReadTextColor = mp.font_color2;
}

[endscript]

; 名前部分のメッセージレイヤ削除
[free name="chara_name_area" layer="message0"]

; メッセージウィンドウの設定
[position layer="message0" width="1280" height="210" top="515" left="0"]
[position layer="message0" frame="../others/plugin/theme_kopanda_14/image/frame_message.png" margint="55" marginl="160" marginr="150" opacity="&mp.frame_opacity" page="fore"]

; 名前枠の設定
[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size="26" x="20" y="520" width="480" align="center"]
[chara_config ptext="chara_name_area"]

; デフォルトのフォントカラー指定
[font color="&mp.font_color"]
[deffont color="&mp.font_color"]

;=================================================================================

; 機能ボタンを表示するマクロ

;=================================================================================

; 機能ボタンを表示したいシーンで[add_theme_button]と記述してください（消去は[clreafix]タグ）
[macro  name="add_theme_button"]

; 歯車ボタン（メニューボタン）非表示
	[hidemenubutton]

;	クイックセーブボタン
	[button name="role_button" role="quicksave" graphic="../others/plugin/theme_kopanda_14/image/button/qsave.png" enterimg="../others/plugin/theme_kopanda_14/image/button/qsave2.png" x="840" y="510"]

;	クイックロードボタン
	[button name="role_button" role="quickload" graphic="../others/plugin/theme_kopanda_14/image/button/qload.png" enterimg="../others/plugin/theme_kopanda_14/image/button/qload2.png" x="904" y="510"]

;	オートボタン
	[button name="role_button" role="auto" graphic="../others/plugin/theme_kopanda_14/image/button/auto.png" enterimg="../others/plugin/theme_kopanda_14/image/button/auto2.png" x="968" y="510"]

;	スキップボタン
	[button name="role_button" role="skip" graphic="../others/plugin/theme_kopanda_14/image/button/skip.png" enterimg="../others/plugin/theme_kopanda_14/image/button/skip2.png" x="1032" y="510"]

;	バックログボタン
	[button name="role_button" role="backlog" graphic="../others/plugin/theme_kopanda_14/image/button/log.png" enterimg="../others/plugin/theme_kopanda_14/image/button/log2.png" x="1096" y="510"]

;	メニュー呼び出しボタン
	[button name="role_button" role="menu" graphic="../others/plugin/theme_kopanda_14/image/button/menu.png" enterimg="../others/plugin/theme_kopanda_14/image/button/menu2.png" x="1160" y="510"]

;	メッセージウィンドウ非表示ボタン
	[button name="role_button" role="window" graphic="../others/plugin/theme_kopanda_14/image/button/close.png" enterimg="../others/plugin/theme_kopanda_14/image/button/close2.png" x="1250" y="560"]

[endmacro]

;=================================================================================

;　システムで利用するHTML,CSSの設定

;=================================================================================

; セーブ画面
[sysview type="save" storage="./data/others/plugin/theme_kopanda_14/html/save.html"]

; ロード画面
[sysview type="load" storage="./data/others/plugin/theme_kopanda_14/html/load.html"]

; バックログ画面
[sysview type="backlog" storage="./data/others/plugin/theme_kopanda_14/html/backlog.html"]

; メニュー画面
[sysview type="menu" storage="./data/others/plugin/theme_kopanda_14/html/menu.html"]

; CSS
[loadcss file="./data/others/plugin/theme_kopanda_14/ts14.css"]

; メニュー画面からコンフィグを呼び出すための設定ファイル
[loadjs storage="plugin/theme_kopanda_14/setting.js"]

;=================================================================================

;　テストメッセージ出力プラグインの読み込み

;=================================================================================
[loadjs storage="plugin/theme_kopanda_14/testMessagePlus/gMessageTester.js"]
[loadcss file="./data/others/plugin/theme_kopanda_14/testMessagePlus/style.css"]

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
