; ティラノスクリプト テーマプラグイン theme_kopanda_01 v112
; 作者:こ・ぱんだ
; http://kopacurve.blog33.fc2.com/
;

[iscript]

//初期化
mp.font_color = mp.font_color || "0xF1F1F1";
mp.name_color = mp.name_color || "0xFFCC00";
mp.frame_opacity = mp.frame_opacity || "200";

// 既読テキストのフォントカラーを設定
// 設定は《未読テキストと同じ色》にしていますので必要に応じて編集してください
mp.font_color2   = mp.font_color2   || "0xF1F1F1";

// Config.tjsで既読テキストのフォントカラーを「default」にしている場合はmp.font_color2は反映されません
if(TG.config.alreadyReadTextColor != "default"){
	TG.config.alreadyReadTextColor = mp.font_color2;
}

[endscript]

;	レイヤメッセージの削除
	[free name="chara_name_area" layer="message0"]

;	メッセージウィンドウの設定
	[position layer="message0" width="960" height="200" top="440" left="0"]
	[position layer="message0" page="fore" frame="../others/plugin/theme_kopanda_01/image/frame_message.png" margint="55" marginl="50" marginr="70" marginb="60" opacity="&mp.frame_opacity"]

;	名前枠の設定
	[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size="24" x="0" y="450" width="250" align="center"]
	[chara_config ptext="chara_name_area"]

	[font color="&mp.font_color"]
	[deffont color="&mp.font_color"]


; 機能ボタンの表示マクロ
[macro name="add_theme_button"]

;	歯車ボタンを非表示にする
	[hidemenubutton]

;	クイックセーブボタン
		[button name="role_button" role="quicksave" graphic="../others/plugin/theme_kopanda_01/image/button/qsave.gif" enterimg="../others/plugin/theme_kopanda_01/image/button/qsave2.gif" x=60 y=610]

;	クイックロードボタン
		[button name="role_button" role="quickload" graphic="../others/plugin/theme_kopanda_01/image/button/qload.gif" enterimg="../others/plugin/theme_kopanda_01/image/button/qload2.gif" x=130 y=610]

;	セーブボタン
		[button name="role_button" role="save" graphic="../others/plugin/theme_kopanda_01/image/button/save.gif" enterimg="../others/plugin/theme_kopanda_01/image/button/save2.gif" x=200 y=610]

;	ロードボタン
		[button name="role_button" role="load" graphic="../others/plugin/theme_kopanda_01/image/button/load.gif" enterimg="../others/plugin/theme_kopanda_01/image/button/load2.gif" x=270 y=610]

;	スキップボタン
		[button name="role_button" role="skip" graphic="../others/plugin/theme_kopanda_01/image/button/skip.gif" enterimg="../others/plugin/theme_kopanda_01/image/button/skip2.gif" x=340 y=610]

;	オートボタン
		[button name="role_button" role="auto" graphic="../others/plugin/theme_kopanda_01/image/button/auto.gif" enterimg="../others/plugin/theme_kopanda_01/image/button/auto2.gif" x=410 y=610]

;	バックログボタン
		[button name="role_button" role="backlog" graphic="../others/plugin/theme_kopanda_01/image/button/log.gif" enterimg="../others/plugin/theme_kopanda_01/image/button/log2.gif" x=480 y=610]

;	フルスクリーン切替ボタン
		[button name="role_button" role="fullscreen" graphic="../others/plugin/theme_kopanda_01/image/button/screen.gif" enterimg="../others/plugin/theme_kopanda_01/image/button/screen2.gif" x=550 y=610]

;	メニュー呼び出し（※ロールボタンを使うなら不要）
		[button name="role_button" role="menu" graphic="../others/plugin/theme_kopanda_01/image/button/menu.gif" enterimg="../others/plugin/theme_kopanda_01/image/button/menu2.gif" x=620 y=610]

;	コンフィグ（※sleepgame を使用して config.ks を呼び出しています）
		[button name="role_button" role="sleepgame" graphic="../others/plugin/theme_kopanda_01/image/button/sleep.gif" enterimg="../others/plugin/theme_kopanda_01/image/button/sleep2.gif" x=690 y=610 storage="../others/plugin/theme_kopanda_01/config.ks"]

;	メッセージウィンドウ非表示ボタン
		[button name="role_button" role="window" graphic="../others/plugin/theme_kopanda_01/image/button/close.gif" enterimg="../others/plugin/theme_kopanda_01/image/button/close2.gif" x=760 y=610]

;	タイトルに戻るボタン
		[button name="role_button" role="title" graphic="../others/plugin/theme_kopanda_01/image/button/title.gif" enterimg="../others/plugin/theme_kopanda_01/image/button/title2.gif" x=830 y=610]

[endmacro]

;==============================
; システムで利用するHTML,CSSの変更
;==============================
;	セーブ画面
	[sysview type="save" storage="./data/others/plugin/theme_kopanda_01/html/save.html"]

;	ロード画面
	[sysview type="load" storage="./data/others/plugin/theme_kopanda_01/html/load.html"]

;	バックログ画面
	[sysview type="backlog" storage="./data/others/plugin/theme_kopanda_01/html/backlog.html"]

;	メニュー画面
	[sysview type="menu" storage="./data/others/plugin/theme_kopanda_01/html/menu.html"]

;	CSS
	[loadcss file="./data/others/plugin/theme_kopanda_01/ts01.css"]


;=================================================================================

;　テストメッセージ出力プラグインの読み込み

;=================================================================================
	[loadjs storage="plugin/theme_kopanda_01/testMessagePlus/gMessageTester.js"]
	[loadcss file="./data/others/plugin/theme_kopanda_01/testMessagePlus/style.css"]

	[macro name="test_message_start"]
	[eval exp="gMessageTester.create()"]
	[endmacro]

	[macro name="test_message_end"]
	[eval exp="gMessageTester.destroy()"]
	[endmacro]

	[macro name="test_message_reset"]
	[eval exp="gMessageTester.currentTextNumber=0;gMessageTester.next(true)"]
	[endmacro]


;すべての読み込みが終わったらコール先に戻ります
[return]
