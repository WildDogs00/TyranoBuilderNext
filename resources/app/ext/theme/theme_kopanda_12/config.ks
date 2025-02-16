; 2019.05.12 ko10panda edit
;=========================================
; コンフィグ画面
;=========================================

	[layopt layer="message0" visible="false"]
	[clearfix]
	[stop_keyconfig]
	[free_layermode time="100" wait="true"]
	[reset_camera time="100" wait="true"]
	[hidemenubutton]

	[iscript]

	/* 全レイヤ解放 */
	$(".layer_camera").empty();

	/* BGM、SEミュートチェックの変数（初回起動時のみ定義） */
	if( typeof sf.bgm_mute === 'undefined') sf.bgm_mute = sf.se_mute = -1; // ミュート中なら1,そうでなければ-1

	/* 設定値を取得 */
	TG.config.autoRecordLabel = "true"; // ラベル通過記録を取る
	tf.current_bgm_vol    = parseInt(TG.config.defaultBgmVolume);
	tf.current_se_vol     = parseInt(TG.config.defaultSeVolume);
	tf.current_ch_speed   = parseInt(TG.config.chSpeed);
	tf.current_auto_speed = parseInt(TG.config.autoSpeed);
	tf.text_skip ="ON";
	if(TG.config.unReadTextSkip != "true"){
		tf.text_skip ="OFF";
	}

	/* bgmopt,seoptで端数を設定しているとリストの番号が取得できないので近似値に置き換え */
	tf.current_bgm_vol = replaceCurrentValue(tf.current_bgm_vol, [0,10,20,30,40,50,60,70,80,90,100]); // BGM
	tf.current_se_vol  = replaceCurrentValue(tf.current_se_vol, [0,10,20,30,40,50,60,70,80,90,100]);　// SE

	/* 画像類のパス */
	tf.img_path     = '../others/plugin/theme_kopanda_12/image/config/';
	tf.btn_path_off = tf.img_path + 'c_btn.gif';

	/* リスト番号を取得するだけの変数 */
	tf.list_num_bgm;	// BGM volume
	tf.list_num_se;		// SE volume
	tf.list_num_ch;		// ChSpeed
	tf.list_num_auto;	// AutoChWait

	/* BGM、SEリスト　値、画像ファイル名 の順 */
	tf.vol_list  = [
		[  0, 'vol_0.png'],
		[ 10, 'vol_1.png'],
		[ 20, 'vol_2.png'],
		[ 30, 'vol_3.png'],
		[ 40, 'vol_4.png'],
		[ 50, 'vol_5.png'],
		[ 60, 'vol_6.png'],
		[ 70, 'vol_7.png'],
		[ 80, 'vol_8.png'],
		[ 90, 'vol_9.png'],
		[100, 'vol_10.png']
	];

	/* ChSpeed */
	tf.ch_list   = [
		[100, 'speed_1.png'],
		[ 80, 'speed_2.png'],
		[ 50, 'speed_3.png'],
		[ 30, 'speed_4.png'],
		[ 20, 'speed_5.png'],
		[ 10, 'speed_6.png'],
		[  1, 'speed_7.png']
	];

	/* AutoChWait */
	tf.auto_list = [
		[5000, 'speed_1.png'],
		[4000, 'speed_2.png'],
		[3000, 'speed_3.png'],
		[2000, 'speed_4.png'],
		[1300, 'speed_5.png'],
		[ 800, 'speed_6.png'],
		[ 500, 'speed_7.png']
	];

	/* リスト番号の取得 BGM */
	switch( tf.current_bgm_vol ){
		
		case tf.vol_list[0][0] : tf.list_num_bgm =  0; break;
		case tf.vol_list[1][0] : tf.list_num_bgm =  1; break;
		case tf.vol_list[2][0] : tf.list_num_bgm =  2; break;
		case tf.vol_list[3][0] : tf.list_num_bgm =  3; break;
		case tf.vol_list[4][0] : tf.list_num_bgm =  4; break;
		case tf.vol_list[5][0] : tf.list_num_bgm =  5; break;
		case tf.vol_list[6][0] : tf.list_num_bgm =  6; break;
		case tf.vol_list[7][0] : tf.list_num_bgm =  7; break;
		case tf.vol_list[8][0] : tf.list_num_bgm =  8; break;
		case tf.vol_list[9][0] : tf.list_num_bgm =  9; break;
		case tf.vol_list[10][0]: tf.list_num_bgm = 10; break;

		default: tf.current_bgm_vol = 50; tf.list_num_bgm = 5; break;
	};

	if( sf.bgm_mute == 1 ) tf.list_num_bgm = sf.list_num_bgm; // ミュート中はリスト番号を置き換える


	/* リスト番号の取得 SE */
	switch( tf.current_se_vol ){

		case tf.vol_list[0][0] : tf.list_num_se =  0; break;
		case tf.vol_list[1][0] : tf.list_num_se =  1; break;
		case tf.vol_list[2][0] : tf.list_num_se =  2; break;
		case tf.vol_list[3][0] : tf.list_num_se =  3; break;
		case tf.vol_list[4][0] : tf.list_num_se =  4; break;
		case tf.vol_list[5][0] : tf.list_num_se =  5; break;
		case tf.vol_list[6][0] : tf.list_num_se =  6; break;
		case tf.vol_list[7][0] : tf.list_num_se =  7; break;
		case tf.vol_list[8][0] : tf.list_num_se =  8; break;
		case tf.vol_list[9][0] : tf.list_num_se =  9; break;
		case tf.vol_list[10][0]: tf.list_num_se = 10; break;

		default: tf.current_se_vol = 50; tf.list_num_se = 5; break;
	};

	if(sf.se_mute == 1) tf.list_num_se = sf.list_num_se; // ミュート中はリスト番号を置き換える


	/* リスト番号の取得　テキスト表示速度 */
	switch( tf.current_ch_speed ){

		case tf.ch_list[0][0]: tf.list_num_ch = 0; break;
		case tf.ch_list[1][0]: tf.list_num_ch = 1; break;
		case tf.ch_list[2][0]: tf.list_num_ch = 2; break;
		case tf.ch_list[3][0]: tf.list_num_ch = 3; break;
		case tf.ch_list[4][0]: tf.list_num_ch = 4; break;
		case tf.ch_list[5][0]: tf.list_num_ch = 5; break;
		case tf.ch_list[6][0]: tf.list_num_ch = 6; break;

		default: tf.current_ch_speed = 30; tf.list_num_ch = 3; break;
	};


	/* リスト番号の取得　オート時のウェイト */
	switch( tf.current_auto_speed ){

		case tf.auto_list[0][0]: tf.list_num_auto = 0; break;
		case tf.auto_list[1][0]: tf.list_num_auto = 1; break;
		case tf.auto_list[2][0]: tf.list_num_auto = 2; break;
		case tf.auto_list[3][0]: tf.list_num_auto = 3; break;
		case tf.auto_list[4][0]: tf.list_num_auto = 4; break;
		case tf.auto_list[5][0]: tf.list_num_auto = 5; break;
		case tf.auto_list[6][0]: tf.list_num_auto = 6; break;

		default: tf.current_auto_speed = 1300; tf.list_num_auto = 4; break;
	};

	[endscript]

	[cm]

;	背景読み込み
	[bg storage="&tf.img_path + 'bg_config.png'" time="100"]

;	戻るボタン配置
	[button fix="true" target="*exit" graphic="&tf.img_path + 'back.png'" enterimg="&tf.img_path + 'back2.png'" x="200" y="845"]

	[jump target="*config_page"]

;------------------------------------------------------------------------------------------------------
*config_page
[clearstack]

;------------------------------------------------------------------------------------------------------
; 画面サイズの切り替え
;------------------------------------------------------------------------------------------------------
;	ウィンドウ <-> フルスクリーン
	[button name="screen" fix="true" target="*screen" graphic="&tf.btn_path_off" enterimg="&tf.img_path + 'screen2.png'" width="300" height="48" x="220" y="170"]

;------------------------------------------------------------------------------------------------------
; BGM音量
;------------------------------------------------------------------------------------------------------
; 下げる
	[button name="bgmvol" fix="true" target="*vol_bgm_down" graphic="&tf.btn_path_off" enterimg="&tf.img_path + 'voldown.png'" width="48" height="48" x="220" y="318"]
; 上げる
	[button name="bgmvol" fix="true" target="*vol_bgm_up" graphic="&tf.btn_path_off" enterimg="&tf.img_path + 'volup.png'" width="48" height="48" x="375" y="318"]
;	ミュート
	[button name="bgmvol" fix="true" target="*vol_bgm_mute" graphic="&tf.btn_path_off" width="96" height="48" x="450" y="318"]

;------------------------------------------------------------------------------------------------------
; 効果音音量
;------------------------------------------------------------------------------------------------------
; 下げる
	[button name="sevol" fix="true" target="*vol_se_down" graphic="&tf.btn_path_off" width="48" height="48" x="220" y="408"]
; 上げる
	[button name="sevol" fix="true" target="*vol_se_up" graphic="&tf.btn_path_off" width="48" height="48" x="375" y="408"]
;	ミュート
	[button name="sevol" fix="true" target="*vol_se_mute" graphic="&tf.btn_path_off" width="96" height="48" x="450" y="408"]

;------------------------------------------------------------------------------------------------------
; テキストの表示速度
;------------------------------------------------------------------------------------------------------
; 下げる（低速）
	[button name="ch" fix="true" target="*ch_speed_down" graphic="&tf.btn_path_off" width="48" height="48" x="220" y="560"]
; 上げる（高速）
	[button name="ch" fix="true" target="*ch_speed_up" graphic="&tf.btn_path_off" width="48" height="48" x="375" y="560"]

;------------------------------------------------------------------------------------------------------
; オート時の待ち時間
;------------------------------------------------------------------------------------------------------
; 下げる（低速）
	[button name="auto" fix="true" target="*auto_speed_down" graphic="&tf.btn_path_off" width="48" height="48" x="220" y="650"]
; 上げる（高速）
	[button name="auto" fix="true" target="*auto_speed_up" graphic="&tf.btn_path_off" width="48" height="48" x="375" y="650"]

;------------------------------------------------------------------------------------------------------
; 未読スキップの切り替え
;------------------------------------------------------------------------------------------------------
;	ON <-> OFF
	[button name="unread_on" fix="true" target="*skip_on" graphic="&tf.btn_path_off" width="96" height="56" x="450" y="552"]

;------------------------------------------------------------------------------------------------------
; 画像の読み込み
;------------------------------------------------------------------------------------------------------
	[layopt layer="0" visible="true"]

	[call target="*load_bgm_img"]
	[call target="*load_se_img"]
	[call target="*load_ch_img"]
	[call target="*load_auto_img"]
	[call target="*load_skip_img"]

;	テストメッセージスタート
	[test_message_start]

	[s]

;--------------------------------------------------------------------------------
; コンフィグ終了
;--------------------------------------------------------------------------------
*exit
	[cm]

	[iscript]

		sf.list_num_bgm = tf.list_num_bgm; // BGMのリスト番号を保存
		sf.list_num_se  = tf.list_num_se;	 // SEのリスト番号を保存

	[endscript]

	[layopt layer="message1" visible="false"]
	[clearfix]
	[start_keyconfig]
	[clearstack]

	[awakegame]

;================================================================================

; クリック時の処理

;================================================================================
;--------------------------------------------------------------------------------
; 画面サイズ切り替え
;--------------------------------------------------------------------------------
*screen
[screen_full]
[return]

;--------------------------------------------------------------------------------
; BGM音量変更
;--------------------------------------------------------------------------------
*vol_bgm_mute

	[eval exp="sf.bgm_mute *= -1"]
	[call target="*vol_bgm_update"]

[return]

*vol_bgm_up

	[iscript]
		if( tf.list_num_bgm < tf.vol_list.length - 1 ) tf.list_num_bgm += 1;
	[endscript]
	[call target="*vol_bgm_update"]

[return]

*vol_bgm_down

	[iscript]
		if( tf.list_num_bgm > 0 ) tf.list_num_bgm -= 1;
	[endscript]
	[call target="*vol_bgm_update"]

[return]


*vol_bgm_update

	[iscript]
		if( sf.bgm_mute == 1 ){
			tf.current_bgm_vol = 0;
		} else {
			tf.current_bgm_vol = tf.vol_list[tf.list_num_bgm][0];
		}
	[endscript]

	[free layer="0" name="bgmvol" time="0" wait="true"]
	[call target="*load_bgm_img"]
	[bgmopt volume="&tf.current_bgm_vol"]

[return]

;--------------------------------------------------------------------------------
; 効果音音量変更
;--------------------------------------------------------------------------------
*vol_se_mute

	[eval exp="sf.se_mute *= -1"]
	[call target="*vol_se_update"]

[return]

*vol_se_up

	[iscript]
		if( tf.list_num_se < tf.vol_list.length - 1 ) tf.list_num_se += 1;
	[endscript]
	[call target="*vol_se_update"]

[return]

*vol_se_down
	[iscript]
		if( tf.list_num_se > 0 ) tf.list_num_se -= 1;
	[endscript]
	[call target="*vol_se_update"]

[return]

*vol_se_update

	[iscript]
		if( sf.se_mute == 1 ){
			tf.current_se_vol = 0;
		} else {
			tf.current_se_vol = tf.vol_list[tf.list_num_se][0];
		}
	[endscript]

; テスト用
;	[playse storage="se.ogg"]

	[free layer="0" name="sevol" time="0" wait="true"]
	[call target="*load_se_img"]
	[seopt volume="&tf.current_se_vol"]

[return]

;---------------------------------------------------------------------------------
; テキストの表示速度変更
;--------------------------------------------------------------------------------
*ch_speed_down

	[iscript]
		if( tf.list_num_ch > 0 ) tf.list_num_ch -= 1;
	[endscript]
	[call target="*ch_speed_update"]

[return]

*ch_speed_up

	[iscript]
		if( tf.list_num_ch < tf.ch_list.length - 1 ) tf.list_num_ch += 1;
	[endscript]
	[call target="*ch_speed_update"]

[return]

*ch_speed_update

	[eval exp="tf.current_ch_speed = tf.ch_list[tf.list_num_ch][0]"]
	[free layer="0" name="ch" time="0" wait="true"]
	[call target="*load_ch_img"]
	[configdelay speed="&tf.current_ch_speed"]

	[test_message_reset]

[return]

;--------------------------------------------------------------------------------
; オート時の待ち時間変更
;--------------------------------------------------------------------------------
*auto_speed_down

	[iscript]
		if( tf.list_num_auto > 0 ) tf.list_num_auto -= 1;
	[endscript]
	[call target="*auto_speed_update"]

[return]

*auto_speed_up

	[iscript]
		if( tf.list_num_auto < tf.auto_list.length - 1 ) tf.list_num_auto += 1;
	[endscript]
	[call target="*auto_speed_update"]

[return]


*auto_speed_update
	[eval exp="tf.current_auto_speed = tf.auto_list[tf.list_num_auto][0]"]
	[free layer="0" name="auto" time="0" wait="true"]
	[call target="*load_auto_img"]
	[autoconfig speed="&tf.current_auto_speed"]

[return]

;--------------------------------------------------------------------------------
; 未読スキップ切り替え
;--------------------------------------------------------------------------------
*skip_on

	[if exp="tf.text_skip == 'ON'"]

		[free layer="0" name="skip" time="0" wait="true"]
		[eval exp="tf.text_skip = 'OFF'"]
		[config_record_label skip="false"]

	[else]

		[image name="skip" layer="0" storage="&tf.img_path + 'skip_on.png'" x="450" y="552"]
		[eval exp="tf.text_skip = 'ON'"]
		[config_record_label skip="true"]

	[endif]

[return]

;================================================================================

; 画像読み込み

;================================================================================
*load_bgm_img

	[if exp="sf.bgm_mute == 1"]

		[image layer="0" name="bgmmute" storage="&tf.img_path + 'mute_on.png'" x="450" y="317"]
		[image layer="0" name="bgmvol" storage="&tf.img_path + tf.vol_list[tf.list_num_bgm][1]" x="274" y="323"]
		[iscript]
		$(".bgmvol").css("opacity", .5); // 不透明度
		[endscript]

	[else]

		[free layer="0" name="bgmmute" time="0" wait="false"]
		[image layer="0" name="bgmvol" storage="&tf.img_path + tf.vol_list[tf.list_num_bgm][1]" x="274" y="323"]

	[endif]

[return]

*load_se_img

	[if exp="sf.se_mute == 1"]

		[image layer="0" name="semute" storage="&tf.img_path + 'mute_on.png'" x="450" y="408"]
		[image layer="0" name="sevol"  storage="&tf.img_path + tf.vol_list[tf.list_num_se][1]" x="274" y="413"]
		[iscript]
		$(".sevol").css("opacity", .5);
		[endscript]

	[else]

		[free layer="0" name="semute" time="0" wait="false"]
		[image layer="0" name="sevol" storage="&tf.img_path + tf.vol_list[tf.list_num_se][1]" x="274" y="413"]

	[endif]

[return]

*load_ch_img
	[image layer="0" name="ch" storage="&tf.img_path + tf.ch_list[tf.list_num_ch][1]" x="274" y="564"]

[return]


*load_auto_img
	[image layer="0" name="auto" storage="&tf.img_path + tf.auto_list[tf.list_num_auto][1]" x="274" y="655"]

[return]


*load_skip_img
	[if exp="tf.text_skip == 'ON'"]
		[image layer="0" name="skip" storage="&tf.img_path + 'skip_on.png'"  x="450" y="552"]
	[endif]

[return]
