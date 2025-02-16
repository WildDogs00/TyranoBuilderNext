;--------------------------------------------------------------------------------
; ティラノスクリプト テーマプラグイン theme_kopanda_16
; 作者:こ・ぱんだ
; https://kopacurve.blog.fc2.com/
;--------------------------------------------------------------------------------

[iscript]

mp.font_color    = mp.font_color    || "0x5C4949";
mp.name_color    = mp.name_color    || "0xA2CC66";
mp.frame_opacity = mp.frame_opacity || "255";
mp.font_color2   = mp.font_color2   || "0x5C4949";
mp.glyph         = mp.glyph         || "off";

if(TG.config.alreadyReadTextColor != "default") {
	TG.config.alreadyReadTextColor = mp.font_color2;
}

[endscript]

; 名前部分のメッセージレイヤ削除
[free name="chara_name_area" layer="message0"]

; メッセージウィンドウの設定
[position layer="message0" width="1160" height="193" top="522" left="60"]
[position layer="message0" frame="../others/plugin/theme_kopanda_16/image/frame_message.png" margint="55" marginl="140" marginr="140" opacity="&mp.frame_opacity" page="fore"]

; 名前枠の設定
[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size="26" x="165" y="525" width="360" align="center"]
[chara_config ptext="chara_name_area"]

; デフォルトのフォントカラー指定
[font color="&mp.font_color"]
[deffont color="&mp.font_color"]

; クリック待ちグリフの設定（on設定時のみ有効）
[if exp="mp.glyph == 'on'"]
[glyph line="../../../data/others/plugin/theme_kopanda_16/image/system/nextpage.png"]
[endif]

;=================================================================================

; 機能ボタンを表示するマクロ

;=================================================================================

; 機能ボタンを表示したいシーンで[add_theme_button]と記述してください（消去は[clearfix]タグ）
[macro name="add_theme_button"]

; 歯車ボタン（メニューボタン）非表示
[hidemenubutton]

; クイックセーブ
[button name="role_button" role="quicksave" graphic="../others/plugin/theme_kopanda_16/image/button/qsave.png" enterimg="../others/plugin/theme_kopanda_16/image/button/qsave2.png" x="780" y="518"]

; クイックロード
[button name="role_button" role="quickload" graphic="../others/plugin/theme_kopanda_16/image/button/qload.png" enterimg="../others/plugin/theme_kopanda_16/image/button/qload2.png" x="834" y="518"]

; オート
[button name="role_button" role="auto" graphic="../others/plugin/theme_kopanda_16/image/button/auto.png" enterimg="../others/plugin/theme_kopanda_16/image/button/auto2.png" x="888" y="518"]

; スキップ
[button name="role_button" role="skip" graphic="../others/plugin/theme_kopanda_16/image/button/skip.png" enterimg="../others/plugin/theme_kopanda_16/image/button/skip2.png" x="942" y="518"]

; バックログ
[button name="role_button" role="backlog" graphic="../others/plugin/theme_kopanda_16/image/button/log.png" enterimg="../others/plugin/theme_kopanda_16/image/button/log2.png" x="996" y="518"]

; メニュー
[button name="role_button" role="menu" graphic="../others/plugin/theme_kopanda_16/image/button/menu.png" enterimg="../others/plugin/theme_kopanda_16/image/button/menu2.png" x="1050" y="518"]

; 非表示
[button name="role_button" role="window" graphic="../others/plugin/theme_kopanda_16/image/button/close.png" enterimg="../others/plugin/theme_kopanda_16/image/button/close2.png" x="1104" y="518"]

[endmacro]


;=================================================================================

;　システムで利用するHTML,CSSの設定

;=================================================================================
; セーブ画面
[sysview type="save" storage="./data/others/plugin/theme_kopanda_16/html/save.html"]

; ロード画面
[sysview type="load" storage="./data/others/plugin/theme_kopanda_16/html/load.html"]

; バックログ画面
[sysview type="backlog" storage="./data/others/plugin/theme_kopanda_16/html/backlog.html"]

; メニュー画面
[sysview type="menu" storage="./data/others/plugin/theme_kopanda_16/html/menu.html"]

; CSS
[loadcss file="./data/others/plugin/theme_kopanda_16/ts16.css"]

; メニュー画面からコンフィグを呼び出すための設定ファイル
[loadjs storage="plugin/theme_kopanda_16/setting.js"]

;=================================================================================

;　テストメッセージ出力プラグインの読み込み

;=================================================================================
[loadjs storage="plugin/theme_kopanda_16/testMessagePlus/gMessageTester.js"]
[loadcss file="./data/others/plugin/theme_kopanda_16/testMessagePlus/style.css"]

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
