;--------------------------------------------------------------------------------
; ティラノスクリプト テーマプラグイン theme_kopanda_11
; 作者:こ・ぱんだ
; https://kopacurve.blog.fc2.com/

; てんぷらたべたい（http://tempura9357.blog.fc2.com/）様より
;「テストメッセージ出力プラグイン」をお借りしています
;--------------------------------------------------------------------------------

	[iscript]

	// 初期化
	mp.font_color    = mp.font_color    || "0xF1F1F1"; // テキストのフォントカラー
	mp.name_color    = mp.name_color    || "0xF1F1F1"; // 名前のフォントカラー
	mp.frame_opacity = mp.frame_opacity || "255";      // メッセージウィンドウの不透明度

	// 既読テキストのフォントカラーを設定
	// 設定は《未読テキストと同じ色》にしていますので必要に応じて編集してください
	mp.font_color2   = mp.font_color2   || "0xF1F1F1";

	// Config.tjsで既読テキストのフォントカラーを「default」にしている場合はmp.font_color2は反映されません
	if(TG.config.alreadyReadTextColor != "default"){
		TG.config.alreadyReadTextColor = mp.font_color2;
	}

	[endscript]

;	名前部分のメッセージレイヤ削除
	[free name="chara_name_area" layer="message0"]

;	メッセージウィンドウの設定
	[position layer="message0" width="1280" height="180" top="510" left="0"]
	[position layer="message0" frame="../others/plugin/theme_kopanda_11/image/frame_message.png" margint="50" marginl="160" marginr="190" opacity="&mp.frame_opacity" page="fore"]

;	名前枠の設定（名前は中央に表示されます）
	[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size="24" x="40" y="523" width="300" align="center"]
	[chara_config ptext="chara_name_area"]

;	デフォルトのフォントカラー指定
	[font color="&mp.font_color"]
	[deffont color="&mp.font_color"]

;=================================================================================

; 機能ボタンを表示するマクロ

;=================================================================================

; 機能ボタンを表示したいシーンで[add_theme_button]と記述してください（消去は[clreafix]タグ）

[macro  name="add_theme_button"]

;	歯車ボタン（メニューボタン）非表示
	[hidemenubutton]

;	クイックセーブボタン
	[button name="role_button" role="quicksave" graphic="../others/plugin/theme_kopanda_11/image/button/qsave.png" enterimg="../others/plugin/theme_kopanda_11/image/button/qsave2.png" x="160" y="682"]

;	クイックロードボタン
	[button name="role_button" role="quickload" graphic="../others/plugin/theme_kopanda_11/image/button/qload.png" enterimg="../others/plugin/theme_kopanda_11/image/button/qload2.png" x="260" y="682"]

;	セーブボタン
	[button name="role_button" role="save" graphic="../others/plugin/theme_kopanda_11/image/button/save.png" enterimg="../others/plugin/theme_kopanda_11/image/button/save2.png" x="360" y="682"]

;	ロードボタン
	[button name="role_button" role="load" graphic="../others/plugin/theme_kopanda_11/image/button/load.png" enterimg="../others/plugin/theme_kopanda_11/image/button/load2.png" x="460" y="682"]

;	スキップボタン
	[button name="role_button" role="skip" graphic="../others/plugin/theme_kopanda_11/image/button/skip.png" enterimg="../others/plugin/theme_kopanda_11/image/button/skip2.png" x="560" y="682"]

;	オートボタン
	[button name="role_button" role="auto" graphic="../others/plugin/theme_kopanda_11/image/button/auto.png" enterimg="../others/plugin/theme_kopanda_11/image/button/auto2.png" x="660" y="682"]

;	バックログボタン
	[button name="role_button" role="backlog" graphic="../others/plugin/theme_kopanda_11/image/button/log.png" enterimg="../others/plugin/theme_kopanda_11/image/button/log2.png" x="760" y="682"]

;	フルスクリーン切替ボタン
	[button name="role_button" role="fullscreen" graphic="../others/plugin/theme_kopanda_11/image/button/screen.png" enterimg="../others/plugin/theme_kopanda_11/image/button/screen2.png" x="860" y="682"]

;	コンフィグボタン（※sleepgame を使用して config.ks を呼び出しています）
	[button name="role_button" role="sleepgame" graphic="../others/plugin/theme_kopanda_11/image/button/sleep.png" enterimg="../others/plugin/theme_kopanda_11/image/button/sleep2.png" storage="../others/plugin/theme_kopanda_11/config.ks" x="960" y="682"]

;	メニュー呼び出しボタン（※ロールボタンを使うなら不要）
	[button name="role_button" role="menu" graphic="../others/plugin/theme_kopanda_11/image/button/menu.png" enterimg="../others/plugin/theme_kopanda_11/image/button/menu2.png" x="1060" y="682"]

;	タイトルに戻るボタン
	[button name="role_button" role="title" graphic="../others/plugin/theme_kopanda_11/image/button/title.png" enterimg="../others/plugin/theme_kopanda_11/image/button/title2.png" x="1160" y="682"]

;	メッセージウィンドウ非表示ボタン
	[button name="role_button" role="window" graphic="../others/plugin/theme_kopanda_11/image/button/close.png" enterimg="../others/plugin/theme_kopanda_11/image/button/close2.png" x="1195" y="540"]

[endmacro]

;=================================================================================

;　システムで利用するHTML,CSSの設定

;=================================================================================

;	セーブ画面
	[sysview type="save" storage="./data/others/plugin/theme_kopanda_11/html/save.html"]

;	ロード画面
	[sysview type="load" storage="./data/others/plugin/theme_kopanda_11/html/load.html"]

;	バックログ画面
	[sysview type="backlog" storage="./data/others/plugin/theme_kopanda_11/html/backlog.html"]

;	メニュー画面
	[sysview type="menu" storage="./data/others/plugin/theme_kopanda_11/html/menu.html"]

;	CSS
	[loadcss file="./data/others/plugin/theme_kopanda_11/ts11.css"]

;=================================================================================

;　テストメッセージ出力プラグインの読み込み

;=================================================================================
[loadjs storage="plugin/theme_kopanda_11/testMessagePlus/gMessageTester.js"]
[loadcss file="./data/others/plugin/theme_kopanda_11/testMessagePlus/style.css"]
[macro name="test_message_start"]
	[eval exp="gMessageTester.create()"]
[endmacro]
[macro name="test_message_end"]
	[eval exp="gMessageTester.destroy()"]
[endmacro]
[macro name="test_message_reset"]
	[eval exp="gMessageTester.currentTextNumber=0;gMessageTester.next(true)"]
[endmacro]

;もどる
[return]
