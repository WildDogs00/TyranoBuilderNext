; ティラノスクリプト 標準テーマ 1280x720px
; 作者:こ・ぱんだ
; https://kopacurve.blog.fc2.com/

[iscript]

//初期化
mp.font_color = mp.font_color || "0x66564C";
mp.name_color = mp.name_color || "0xfafafa"; 
mp.frame_opacity = mp.frame_opacity || "255"; 

[endscript]

;名前部分のメッセージレイヤ削除
[free name="chara_name_area" layer="message0"]

;メッセージウィンドウの設定
[position layer="message0" width="1280" height="210" top="510" left="0"]
[position layer="message0" frame="../others/plugin/theme_tyrano_default_1280/image/frame_message.png" margint="50" marginl="100" marginr="100" opacity="&mp.frame_opacity" page="fore"]

;名前枠の設定
[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size="28" bold="true" x="100" y="514"]
[chara_config ptext="chara_name_area"]

;デフォルトのフォントカラー指定
[font color="&mp.font_color"]
[deffont color="&mp.font_color"]

;===========================
; 機能ボタンを表示するマクロ
;===========================
;機能ボタンを表示したいシーンで[add_theme_button]と記述してください（消去は[clreafix]タグ）
[macro  name="add_theme_button"]

;歯車ボタン（メニューボタン）非表示
[hidemenubutton]

; ロールボタン配置

;クイックセーブボタン
[button name="role_button" role="quicksave" graphic="../others/plugin/theme_tyrano_default_1280/image/button/qsave.png" enterimg="../others/plugin/theme_tyrano_default_1280/image/button/qsave2.png" x="40" y="690"]

;クイックロードボタン
[button name="role_button" role="quickload" graphic="../others/plugin/theme_tyrano_default_1280/image/button/qload.png" enterimg="../others/plugin/theme_tyrano_default_1280/image/button/qload2.png" x="140" y="690"]

;セーブボタン
[button name="role_button" role="save" graphic="../others/plugin/theme_tyrano_default_1280/image/button/save.png" enterimg="../others/plugin/theme_tyrano_default_1280/image/button/save2.png" x="240" y="690"]

;ロードボタン
[button name="role_button" role="load" graphic="../others/plugin/theme_tyrano_default_1280/image/button/load.png" enterimg="../others/plugin/theme_tyrano_default_1280/image/button/load2.png" x="340" y="690"]

;オートボタン
[button name="role_button" role="auto" graphic="../others/plugin/theme_tyrano_default_1280/image/button/auto.png" enterimg="../others/plugin/theme_tyrano_default_1280/image/button/auto2.png" x="440" y="690"]

;スキップボタン
[button name="role_button" role="skip" graphic="../others/plugin/theme_tyrano_default_1280/image/button/skip.png" enterimg="../others/plugin/theme_tyrano_default_1280/image/button/skip2.png" x="540" y="690"]

;バックログボタン
[button name="role_button" role="backlog" graphic="../others/plugin/theme_tyrano_default_1280/image/button/log.png" enterimg="../others/plugin/theme_tyrano_default_1280/image/button/log2.png" x="640" y="690"]

;フルスクリーン切替ボタン
[button name="role_button" role="fullscreen" graphic="../others/plugin/theme_tyrano_default_1280/image/button/screen.png" enterimg="../others/plugin/theme_tyrano_default_1280/image/button/screen2.png" x="740" y="690"]

;コンフィグボタン（※sleepgame を使用して config.ks を呼び出しています）
[button name="role_button" role="sleepgame" graphic="../others/plugin/theme_tyrano_default_1280/image/button/sleep.png" enterimg="../others/plugin/theme_tyrano_default_1280/image/button/sleep2.png" storage="../others/plugin/theme_tyrano_default_1280/config.ks" x="840" y="690"]

;メニュー呼び出しボタン（※ロールボタンを使うなら不要）
[button name="role_button" role="menu" graphic="../others/plugin/theme_tyrano_default_1280/image/button/menu.png" enterimg="../others/plugin/theme_tyrano_default_1280/image/button/menu2.png" x="940" y="690"]

;メッセージウィンドウ非表示ボタン
[button name="role_button" role="window" graphic="../others/plugin/theme_tyrano_default_1280/image/button/close.png" enterimg="../others/plugin/theme_tyrano_default_1280/image/button/close2.png" x="1040" y="690"]

;タイトルに戻るボタン
[button name="role_button" role="title" graphic="../others/plugin/theme_tyrano_default_1280/image/button/title.png" enterimg="../others/plugin/theme_tyrano_default_1280/image/button/title2.png" x="1140" y="690"]

[endmacro]

;===========================
;システムで利用するHTML,CSSの設定
;===========================
;セーブ画面
[sysview type="save" storage="./data/others/plugin/theme_tyrano_default_1280/html/save.html" ]
;ロード画面
[sysview type="load" storage="./data/others/plugin/theme_tyrano_default_1280/html/load.html" ]
;バックログ画面
[sysview type="backlog" storage="./data/others/plugin/theme_tyrano_default_1280/html/backlog.html" ]
;メニュー画面
[sysview type="menu" storage="./data/others/plugin/theme_tyrano_default_1280/html/menu.html" ]
;CSS
[loadcss file="./data/others/plugin/theme_tyrano_default_1280/ts01_1280.css"]

[return]