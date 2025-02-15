; ティラノスクリプト テーマプラグイン theme_kopanda_02
; 作者:こ・ぱんだ
; https://kopacurve.blog.fc2.com/
;

[iscript]

//初期化
mp.font_color    = mp.font_color    || "0x333333";
mp.name_color    = mp.name_color    || "0x008ABD";
mp.frame_opacity = mp.frame_opacity || "220";

// 既読テキストのフォントカラーを設定
// 設定は《未読テキストと同じ色》にしていますので必要に応じて編集してください
mp.font_color2   = mp.font_color2   || "0x333333";

// Config.tjsで既読テキストのフォントカラーを「default」にしている場合はmp.font_color2は反映されません
if(TG.config.alreadyReadTextColor != "default"){
  TG.config.alreadyReadTextColor = mp.font_color2;
}

[endscript]

;レイヤメッセージの削除
[free name="chara_name_area" layer="message0"]

;メッセージウィンドウの設定
[position layer=message0 width=960 height=200 top=440 left=0]
[position layer=message0 page=fore frame="../others/plugin/theme_kopanda_02/image/frame_message.png" margint="55" marginl="50" marginr="70" marginb="60" opacity=&mp.frame_opacity ]

;名前枠の設定
[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size=24 x=40 y=445]
[chara_config ptext="chara_name_area"]

[font color="&mp.font_color"]
[deffont color="&mp.font_color"]

;===========================
;▼機能ボタンを表示するマクロ
;===========================
;機能ボタンを表示したいシーンで[add_theme_button]と記述してください（消去は[clreafix]タグ）
[macro  name="add_theme_button"]

;歯車ボタン（メニューボタン）非表示
[hidemenubutton]

;ロールボタン配置　※ビルダー使用時はボタンのサイズが引き伸ばされるためスクリプトを直接修正する必要があります

;クイックセーブボタン
[button name="role_button" role="quicksave" graphic="../others/plugin/theme_kopanda_02/image/button/qsave.png" enterimg="../others/plugin/theme_kopanda_02/image/button/qsave2.png" x=60 y=610]

;クイックロードボタン
[button name="role_button" role="quickload" graphic="../others/plugin/theme_kopanda_02/image/button/qload.png" enterimg="../others/plugin/theme_kopanda_02/image/button/qload2.png" x=130 y=610]

;セーブボタン
[button name="role_button" role="save" graphic="../others/plugin/theme_kopanda_02/image/button/save.png" enterimg="../others/plugin/theme_kopanda_02/image/button/save2.png" x=200 y=610]

;ロードボタン
[button name="role_button" role="load" graphic="../others/plugin/theme_kopanda_02/image/button/load.png" enterimg="../others/plugin/theme_kopanda_02/image/button/load2.png" x=270 y=610]

;スキップボタン
[button name="role_button" role="skip" graphic="../others/plugin/theme_kopanda_02/image/button/skip.png" enterimg="../others/plugin/theme_kopanda_02/image/button/skip2.png" x=340 y=610]

;オートボタン
[button name="role_button" role="auto" graphic="../others/plugin/theme_kopanda_02/image/button/auto.png" enterimg="../others/plugin/theme_kopanda_02/image/button/auto2.png" x=410 y=610]

;バックログボタン
[button name="role_button" role="backlog" graphic="../others/plugin/theme_kopanda_02/image/button/log.png" enterimg="../others/plugin/theme_kopanda_02/image/button/log2.png" x=480 y=610]

;フルスクリーン切替ボタン
[button name="role_button" role="fullscreen" graphic="../others/plugin/theme_kopanda_02/image/button/screen.png" enterimg="../others/plugin/theme_kopanda_02/image/button/screen2.png" x=550 y=610]

;メニュー呼び出しボタン（※ロールボタンを使うなら不要）
[button name="role_button" role="menu" graphic="../others/plugin/theme_kopanda_02/image/button/menu.png" enterimg="../others/plugin/theme_kopanda_02/image/button/menu2.png" x=620 y=610]

;コンフィグボタン（※sleepgame を使用して config.ks を呼び出しています）
[button name="role_button" role="sleepgame" graphic="../others/plugin/theme_kopanda_02/image/button/sleep.png" enterimg="../others/plugin/theme_kopanda_02/image/button/sleep2.png" x=690 y=610 storage="../others/plugin/theme_kopanda_02/config.ks"]

;メッセージウィンドウ非表示ボタン
[button name="role_button" role="window" graphic="../others/plugin/theme_kopanda_02/image/button/close.png" enterimg="../others/plugin/theme_kopanda_02/image/button/close2.png" x=760 y=610]

;タイトルに戻るボタン
[button name="role_button" role="title" graphic="../others/plugin/theme_kopanda_02/image/button/title.png" enterimg="../others/plugin/theme_kopanda_02/image/button/title2.png" x=830 y=610]

[endmacro]

;===========================
;システムで利用するHTML,CSSの設定
;===========================
;セーブ画面
[sysview type="save" storage="./data/others/plugin/theme_kopanda_02/html/save.html" ]
;ロード画面
[sysview type="load" storage="./data/others/plugin/theme_kopanda_02/html/load.html" ]
;バックログ画面
[sysview type="backlog" storage="./data/others/plugin/theme_kopanda_02/html/backlog.html" ]
;メニュー画面
[sysview type="menu" storage="./data/others/plugin/theme_kopanda_02/html/menu.html" ]
;CSS
[loadcss file="./data/others/plugin/theme_kopanda_02/ts02.css"]

;=================================================================================

;　テストメッセージ出力プラグインの読み込み

;=================================================================================
[loadjs storage="plugin/theme_kopanda_02/testMessagePlus/gMessageTester.js"]
[loadcss file="./data/others/plugin/theme_kopanda_02/testMessagePlus/style.css"]

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
