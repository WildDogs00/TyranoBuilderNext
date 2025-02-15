; 2018/02/04 @ko10panda edit

;===============================================================================

; コンフィグ モード　画面作成

;===============================================================================

	[layopt layer="message0" visible="false"]
	[clearfix]
	[stop_keyconfig]
	[free_layermode time="0" wait="true"]
	[reset_camera time="0" wait="true"]

	[iscript]
	$(".layer_camera").empty();
	[endscript]

	[hidemenubutton]

;	フキダシのキーフレームアニメ定義
	[keyframe name="show_balloon"]
	[frame p="  0%" scale="0"]
	[frame p=" 80%" scale="1.1"]
	[frame p="100%" scale="1"]
	[endkeyframe]

;	ボタン用のマクロ
	[macro name="config_button"]
	[button name="%name" fix="true" target="%target" graphic="&tf.btn_path_off" width="&tf.btn_width" height="&tf.btn_height" x="%x" y="%y" exp="%exp"]
	[endmacro]

	[iscript]

	// ラベル通過記録を有効に（config.tjsで設定されていないときの保険）
	TG.config.autoRecordLabel = "true";

	tf.current_bgm_vol = parseInt(TG.config.defaultBgmVolume);
	tf.current_se_vol = parseInt(TG.config.defaultSeVolume);
	tf.current_ch_speed = parseInt(TG.config.chSpeed);
	tf.current_auto_speed = parseInt(TG.config.autoSpeed);
	tf.text_skip ="ON";
	if(TG.config.unReadTextSkip != "true"){
		tf.text_skip ="OFF";
	}

	// 画像類のパス
	tf.img_path = '../others/plugin/theme_kopanda_06/image/config/';
	tf.btn_path_off = tf.img_path + 'c_btn.gif';

	tf.btn_width  = 80; // 幅
	tf.btn_height = 30; // 高さ

	// ボタンを表示する座標（tf.config_y_ch[0]とtf.config_y_auto[0]は未使用）
	tf.config_x       = [825,　310, 355, 400, 445, 490, 535, 580, 625, 670, 715]; // X座標（共通）
	tf.config_y_bgm   = [140,　140, 120, 140, 120, 140, 120, 140, 120, 140, 120]; // BGMのY座標
	tf.config_y_se    = [220,　220, 200, 220, 200, 220, 200, 220, 200, 220, 200]; // SEのY座標
	tf.config_y_ch    = [300,　300, 280, 300, 280, 300, 280, 300, 280, 300, 280]; // テキスト速度のY座標
	tf.config_y_auto  = [380,　380, 360, 380, 360, 380, 360, 380, 360, 380, 360]; // オート速度のY座標

	// 上記の配列変数の添字を格納しておく変数。選択した音量や速度に対応。
	tf.config_num_bgm;  // BGM
	tf.config_num_se;   // SE
	tf.config_num_ch;   // テキスト速度
	tf.config_num_auto; // オート速度

	// フキダシに表示する文字列を格納しておく変数
	tf.config_info_bgm;  // BGM
	tf.config_info_se;   // SE
	tf.config_info_ch;   // テキスト速度
	tf.config_info_auto; // オート速度

	// 既読スキップの画像ファイル名を格納しておく変数
	tf.img_unread_skip;

	// BGMの音量チェック
	switch(tf.current_bgm_vol){
		case   0: tf.config_num_bgm =  0; break;
		case  10: tf.config_num_bgm =  1; break;
		case  20: tf.config_num_bgm =  2; break;
		case  30: tf.config_num_bgm =  3; break;
		case  40: tf.config_num_bgm =  4; break;
		case  50: tf.config_num_bgm =  5; break;
		case  60: tf.config_num_bgm =  6; break;
		case  70: tf.config_num_bgm =  7; break;
		case  80: tf.config_num_bgm =  8; break;
		case  90: tf.config_num_bgm =  9; break;
		case 100: tf.config_num_bgm = 10; break;

		default: break;
	};


	// SEの音量チェック
	switch(tf.current_se_vol){
		case   0: tf.config_num_se = 　0; break;
		case  10: tf.config_num_se =  1; break;
		case  20: tf.config_num_se =  2; break;
		case  30: tf.config_num_se =  3; break;
		case  40: tf.config_num_se =  4; break;
		case  50: tf.config_num_se =  5; break;
		case  60: tf.config_num_se =  6; break;
		case  70: tf.config_num_se =  7; break;
		case  80: tf.config_num_se =  8; break;
		case  90: tf.config_num_se =  9; break;
		case 100: tf.config_num_se = 10; break;

		default: break;
	};


	// テキスト速度のチェック
	switch(tf.current_ch_speed){
		case 100: tf.config_num_ch =  0; break;
		case  80: tf.config_num_ch =  1; break;
		case  50: tf.config_num_ch =  2; break;
		case  40: tf.config_num_ch =  3; break;
		case  30: tf.config_num_ch =  4; break;
		case  25: tf.config_num_ch =  5; break;
		case  20: tf.config_num_ch =  6; break;
		case  11: tf.config_num_ch =  7; break;
		case   8: tf.config_num_ch =  8; break;
		case   5: tf.config_num_ch =  9; break;

		default: break;
	};


	// オート時のテキスト速度のチェック
	switch(tf.current_auto_speed){
		case 5000: tf.config_num_auto =  0; break;
		case 4500: tf.config_num_auto =  1; break;
		case 4000: tf.config_num_auto =  2; break;
		case 3500: tf.config_num_auto =  3; break;
		case 3000: tf.config_num_auto =  4; break;
		case 2500: tf.config_num_auto =  5; break;
		case 2000: tf.config_num_auto =  6; break;
		case 1300: tf.config_num_auto =  7; break;
		case  800: tf.config_num_auto =  8; break;
		case  500: tf.config_num_auto =  9; break;

		default: break;
	};

	// ミュート用のBGM、SE音量管理
	if( typeof f.prev_vol_list === 'undefined'){
		f.prev_vol_list = [tf.current_bgm_vol, tf.config_num_bgm, tf.current_se_vol, tf.config_num_se];
	}

	[endscript]

	[cm]

;	画像の読み込みに時間がかかるのでマスクで隠してます
	[mask time="300" graphic="mask.png" folder="./others/plugin/theme_kopanda_06/image/config" effect="zoomIn"]

;	コンフィグ用の背景を読み込み
	[image layer="base" storage="&tf.img_path + 'bg_config.png'" top="0" left="0"]

;	画面右上の「Back」ボタン
	[button fix="true" graphic="&tf.img_path + 'back.png'" enterimg="&tf.img_path + 'back2.png'" target="*backtitle" x="860" y="20"]

	[jump target="*config_page"]

;===============================================================================

; メイン画面

;===============================================================================
*config_page
[clearstack]
;------------------------------------------------------------------------------------------------------
; BGM音量
;------------------------------------------------------------------------------------------------------

	[config_button name="bgmvol,bgmvol_10"  target="*vol_bgm_change" x="&tf.config_x[1]"  y="&tf.config_y_bgm[1]"  exp="tf.current_bgm_vol =  10; tf.config_num_bgm =  1"]
	[config_button name="bgmvol,bgmvol_20"  target="*vol_bgm_change" x="&tf.config_x[2]"  y="&tf.config_y_bgm[2]"  exp="tf.current_bgm_vol =  20; tf.config_num_bgm =  2"]
	[config_button name="bgmvol,bgmvol_30"  target="*vol_bgm_change" x="&tf.config_x[3]"  y="&tf.config_y_bgm[3]"  exp="tf.current_bgm_vol =  30; tf.config_num_bgm =  3"]
	[config_button name="bgmvol,bgmvol_40"  target="*vol_bgm_change" x="&tf.config_x[4]"  y="&tf.config_y_bgm[4]"  exp="tf.current_bgm_vol =  40; tf.config_num_bgm =  4"]
	[config_button name="bgmvol,bgmvol_50"  target="*vol_bgm_change" x="&tf.config_x[5]"  y="&tf.config_y_bgm[5]"  exp="tf.current_bgm_vol =  50; tf.config_num_bgm =  5"]
	[config_button name="bgmvol,bgmvol_60"  target="*vol_bgm_change" x="&tf.config_x[6]"  y="&tf.config_y_bgm[6]"  exp="tf.current_bgm_vol =  60; tf.config_num_bgm =  6"]
	[config_button name="bgmvol,bgmvol_70"  target="*vol_bgm_change" x="&tf.config_x[7]"  y="&tf.config_y_bgm[7]"  exp="tf.current_bgm_vol =  70; tf.config_num_bgm =  7"]
	[config_button name="bgmvol,bgmvol_80"  target="*vol_bgm_change" x="&tf.config_x[8]"  y="&tf.config_y_bgm[8]"  exp="tf.current_bgm_vol =  80; tf.config_num_bgm =  8"]
	[config_button name="bgmvol,bgmvol_90"  target="*vol_bgm_change" x="&tf.config_x[9]"  y="&tf.config_y_bgm[9]"  exp="tf.current_bgm_vol =  90; tf.config_num_bgm =  9"]
	[config_button name="bgmvol,bgmvol_100" target="*vol_bgm_change" x="&tf.config_x[10]" y="&tf.config_y_bgm[10]" exp="tf.current_bgm_vol = 100; tf.config_num_bgm = 10"]

;	BGMミュート
	[config_button name="bgmvol,bgmvol_0" target="*vol_bgm_mute" x="&tf.config_x[0]" y="&tf.config_y_bgm[0]"]

;------------------------------------------------------------------------------------------------------
; SE音量
;------------------------------------------------------------------------------------------------------

	[config_button name="sevol,sevol_10"  target="*vol_se_change" x="&tf.config_x[1]"  y="&tf.config_y_se[1]"  exp="tf.current_se_vol =  10; tf.config_num_se =  1"]
	[config_button name="sevol,sevol_20"  target="*vol_se_change" x="&tf.config_x[2]"  y="&tf.config_y_se[2]"  exp="tf.current_se_vol =  20; tf.config_num_se =  2"]
	[config_button name="sevol,sevol_30"  target="*vol_se_change" x="&tf.config_x[3]"  y="&tf.config_y_se[3]"  exp="tf.current_se_vol =  30; tf.config_num_se =  3"]
	[config_button name="sevol,sevol_40"  target="*vol_se_change" x="&tf.config_x[4]"  y="&tf.config_y_se[4]"  exp="tf.current_se_vol =  40; tf.config_num_se =  4"]
	[config_button name="sevol,sevol_50"  target="*vol_se_change" x="&tf.config_x[5]"  y="&tf.config_y_se[5]"  exp="tf.current_se_vol =  50; tf.config_num_se =  5"]
	[config_button name="sevol,sevol_60"  target="*vol_se_change" x="&tf.config_x[6]"  y="&tf.config_y_se[6]"  exp="tf.current_se_vol =  60; tf.config_num_se =  6"]
	[config_button name="sevol,sevol_70"  target="*vol_se_change" x="&tf.config_x[7]"  y="&tf.config_y_se[7]"  exp="tf.current_se_vol =  70; tf.config_num_se =  7"]
	[config_button name="sevol,sevol_80"  target="*vol_se_change" x="&tf.config_x[8]"  y="&tf.config_y_se[8]"  exp="tf.current_se_vol =  80; tf.config_num_se =  8"]
	[config_button name="sevol,sevol_0"   target="*vol_se_change" x="&tf.config_x[9]"  y="&tf.config_y_se[9]"  exp="tf.current_se_vol =  90; tf.config_num_se =  9"]
	[config_button name="sevol,sevol_100" target="*vol_se_change" x="&tf.config_x[10]" y="&tf.config_y_se[10]" exp="tf.current_se_vol = 100; tf.config_num_se = 10"]

;	SEミュート
	[config_button name="sevol,sevol_0" target="*vol_se_mute" x="&tf.config_x[0]" y="&tf.config_y_se[0]"]

;------------------------------------------------------------------------------------------------------
; テキスト速度
;------------------------------------------------------------------------------------------------------

	[config_button name="ch,ch_100" target="*ch_speed_change" x="&tf.config_x[1]"  y="&tf.config_y_ch[1]"  exp="tf.set_ch_speed = 100; tf.config_num_ch = 0"]
	[config_button name="ch,ch_80"  target="*ch_speed_change" x="&tf.config_x[2]"  y="&tf.config_y_ch[2]"  exp="tf.set_ch_speed =  80; tf.config_num_ch = 1"]
	[config_button name="ch,ch_50"  target="*ch_speed_change" x="&tf.config_x[3]"  y="&tf.config_y_ch[3]"  exp="tf.set_ch_speed =  50; tf.config_num_ch = 2"]
	[config_button name="ch,ch_40"  target="*ch_speed_change" x="&tf.config_x[4]"  y="&tf.config_y_ch[4]"  exp="tf.set_ch_speed =  40; tf.config_num_ch = 3"]
	[config_button name="ch,ch_30"  target="*ch_speed_change" x="&tf.config_x[5]"  y="&tf.config_y_ch[5]"  exp="tf.set_ch_speed =  30; tf.config_num_ch = 4"]
	[config_button name="ch,ch_25"  target="*ch_speed_change" x="&tf.config_x[6]"  y="&tf.config_y_ch[6]"  exp="tf.set_ch_speed =  25; tf.config_num_ch = 5"]
	[config_button name="ch,ch_20"  target="*ch_speed_change" x="&tf.config_x[7]"  y="&tf.config_y_ch[7]"  exp="tf.set_ch_speed =  20; tf.config_num_ch = 6"]
	[config_button name="ch,ch_11"  target="*ch_speed_change" x="&tf.config_x[8]"  y="&tf.config_y_ch[8]"  exp="tf.set_ch_speed =  11; tf.config_num_ch = 7"]
	[config_button name="ch,ch_8"   target="*ch_speed_change" x="&tf.config_x[9]"  y="&tf.config_y_ch[9]"  exp="tf.set_ch_speed =   8; tf.config_num_ch = 8"]
	[config_button name="ch,ch_5"   target="*ch_speed_change" x="&tf.config_x[10]" y="&tf.config_y_ch[10]" exp="tf.set_ch_speed =   5; tf.config_num_ch = 9"]

;------------------------------------------------------------------------------------------------------
; オート速度
;------------------------------------------------------------------------------------------------------

	[config_button name="auto,auto_5000" target="*auto_speed_change" x="&tf.config_x[1]"  y="&tf.config_y_auto[1]"  exp="tf.set_auto_speed = 5000; tf.config_num_auto = 0"]
	[config_button name="auto,auto_4500" target="*auto_speed_change" x="&tf.config_x[2]"  y="&tf.config_y_auto[2]"  exp="tf.set_auto_speed = 4500; tf.config_num_auto = 1"]
	[config_button name="auto,auto_4000" target="*auto_speed_change" x="&tf.config_x[3]"  y="&tf.config_y_auto[3]"  exp="tf.set_auto_speed = 4000; tf.config_num_auto = 2"]
	[config_button name="auto,auto_3500" target="*auto_speed_change" x="&tf.config_x[4]"  y="&tf.config_y_auto[4]"  exp="tf.set_auto_speed = 3500; tf.config_num_auto = 3"]
	[config_button name="auto,auto_3000" target="*auto_speed_change" x="&tf.config_x[5]"  y="&tf.config_y_auto[5]"  exp="tf.set_auto_speed = 3000; tf.config_num_auto = 4"]
	[config_button name="auto,auto_2500" target="*auto_speed_change" x="&tf.config_x[6]"  y="&tf.config_y_auto[6]"  exp="tf.set_auto_speed = 2500; tf.config_num_auto = 5"]
	[config_button name="auto,auto_2000" target="*auto_speed_change" x="&tf.config_x[7]"  y="&tf.config_y_auto[7]"  exp="tf.set_auto_speed = 2000; tf.config_num_auto = 6"]
	[config_button name="auto,auto_1300" target="*auto_speed_change" x="&tf.config_x[8]"  y="&tf.config_y_auto[8]"  exp="tf.set_auto_speed = 1300; tf.config_num_auto = 7"]
	[config_button name="auto,auto_800"  target="*auto_speed_change" x="&tf.config_x[9]"  y="&tf.config_y_auto[9]"  exp="tf.set_auto_speed =  800; tf.config_num_auto = 8"]
	[config_button name="auto,auto_500"  target="*auto_speed_change" x="&tf.config_x[10]" y="&tf.config_y_auto[10]" exp="tf.set_auto_speed =  500; tf.config_num_auto = 9"]

;------------------------------------------------------------------------------------------------------
; 未読スキップ
;------------------------------------------------------------------------------------------------------
;	未読スキップ-OFF
	[button name="unread_skip" fix="true" target="*skip_off" graphic="&tf.btn_path_off" width="190" height="50" x="330" y="455"]

;	未読スキップ-ON
	[button name="unread_skip" fix="true" target="*skip_on"  graphic="&tf.btn_path_off" width="190" height="50" x="540" y="455"]


;------------------------------------------------------------------------------------------------------
; コンフィグ起動時の画面更新
;------------------------------------------------------------------------------------------------------

	[call target="*load_img"]

	[call target="*icon_bgm"]
	[call target="*icon_se"]
	[call target="*icon_ch"]
	[call target="*icon_auto"]
	[call target="*icon_skip"]

;	マスク解除
	[mask_off time="300"]

	[call target="*info_bgm"]
	[call target="*info_se"]
	[call target="*info_ch"]
	[call target="*info_auto"]

	[test_message_start]

[s]

;--------------------------------------------------------------------------------

; コンフィグモードの終了

;--------------------------------------------------------------------------------
*backtitle
[cm]

	[layopt layer="message1" visible="false"]
	[iscript]
	$(".layer_camera").empty();
	[endscript]
	[clearfix]
	[start_keyconfig]
	[clearstack]
	[awakegame]

;================================================================================

; ボタンクリック時の処理

;================================================================================
;--------------------------------------------------------------------------------
; BGM音量更新
;--------------------------------------------------------------------------------
*vol_bgm_mute

[iscript]
	// ミュート
	if( tf.current_bgm_vol != 0 ){
		f.prev_vol_list[0] = tf.current_bgm_vol;
		f.prev_vol_list[1] = tf.config_num_bgm;
		tf.current_bgm_vol = 0;
		tf.config_num_bgm  = 0;

	// 解除
	} else {
		tf.current_bgm_vol = f.prev_vol_list[0];
		tf.config_num_bgm  = f.prev_vol_list[1];
	}
[endscript]

*vol_bgm_change

	[free layer="0" name="bgmvol" time="0" wait="true"]
	[call target="*icon_bgm"]
	[call target="*info_bgm"]
	[bgmopt volume="&tf.current_bgm_vol"]

[return]

;--------------------------------------------------------------------------------
; SE音量更新
;--------------------------------------------------------------------------------
*vol_se_mute

[iscript]
	// ミュート
	if( tf.current_se_vol != 0 ){
		f.prev_vol_list[2] = tf.current_se_vol;
		f.prev_vol_list[3] = tf.config_num_se;
		tf.current_se_vol = 0;
		tf.config_num_se  = 0;

	// 解除
	} else {
		tf.current_se_vol = f.prev_vol_list[2];
		tf.config_num_se  = f.prev_vol_list[3];
	}
[endscript]

*vol_se_change

	[free layer="0" name="sevol" time="0" wait="true"]
	[call target="*icon_se"]
	[call target="*info_se"]
	[seopt volume="&tf.current_se_vol"]

[return]

;---------------------------------------------------------------------------------
; テキスト速度更新
;--------------------------------------------------------------------------------
*ch_speed_change

	[iscript]
	tf.current_ch_speed = tf.set_ch_speed;
	[endscript]

	[free layer="0" name="ch" time="0" wait="true"]
	[call target="*icon_ch"]
	[call target="*info_ch"]
	[configdelay speed="&tf.set_ch_speed"]

	[test_message_reset]

[return]

;--------------------------------------------------------------------------------
; オート速度更新
;--------------------------------------------------------------------------------
*auto_speed_change

	[iscript]
	tf.current_auto_speed = tf.set_auto_speed;
	[endscript]

	[free layer="0" name="auto" time="0" wait="true"]
	[call target="*icon_auto"]
	[call target="*info_auto"]
	[autoconfig speed="&tf.set_auto_speed"]

[return]

;--------------------------------------------------------------------------------
; スキップ処理-OFF
;--------------------------------------------------------------------------------
*skip_off

	[iscript]
	tf.text_skip = "OFF";
	[endscript]

	[free layer="0" name="unread_skip" time="0" wait="true"]
	[call target="*icon_skip"]
	[config_record_label skip="false"]
	[wait time="300"]

[return]

;--------------------------------------------------------------------------------
; スキップ処理-ON
;--------------------------------------------------------------------------------
*skip_on

	[iscript]
	tf.text_skip = "ON";
	[endscript]

	[free layer="0" name="unread_skip" time="0" wait="true"]
	[call target="*icon_skip"]
	[config_record_label skip="true"]
	[wait time="300"]

[return]

;================================================================================

; サブルーチン

;================================================================================
;--------------------------------------------------------------------------------

; BGM更新

;--------------------------------------------------------------------------------
*icon_bgm

	[iscript]

	// 設定した音量によって色付き画像の表示・非表示を切替える

	$( ".bgm_img_0").css( "visibility", tf.config_num_bgm == 0 ? 'visible' : 'hidden' );
	$( ".bgm_img_1").css( "visibility", tf.config_num_bgm >  0 ? 'visible' : 'hidden' );
	$( ".bgm_img_2").css( "visibility", tf.config_num_bgm >  1 ? 'visible' : 'hidden' );
	$( ".bgm_img_3").css( "visibility", tf.config_num_bgm >  2 ? 'visible' : 'hidden' );
	$( ".bgm_img_4").css( "visibility", tf.config_num_bgm >  3 ? 'visible' : 'hidden' );
	$( ".bgm_img_5").css( "visibility", tf.config_num_bgm >  4 ? 'visible' : 'hidden' );
	$( ".bgm_img_6").css( "visibility", tf.config_num_bgm >  5 ? 'visible' : 'hidden' );
	$( ".bgm_img_7").css( "visibility", tf.config_num_bgm >  6 ? 'visible' : 'hidden' );
	$( ".bgm_img_8").css( "visibility", tf.config_num_bgm >  7 ? 'visible' : 'hidden' );
	$( ".bgm_img_9").css( "visibility", tf.config_num_bgm >  8 ? 'visible' : 'hidden' );
	$(".bgm_img_10").css( "visibility", tf.config_num_bgm >  9 ? 'visible' : 'hidden' );

	[endscript]

[return]


*info_bgm
	[iscript]

	// フキダシに表示する文字列
	tf.config_info_bgm = tf.current_bgm_vol + '%';

	// 音量が0のときは「消音」と表示
	if(tf.current_bgm_vol == 0){
		tf.config_info_bgm = 'Mute';
	}

	[endscript]

;	BGMの情報を表示
	[image layer="0" name="bgmvol" storage="&tf.img_path + 'balloon.png'" x="&tf.config_x[tf.config_num_bgm]" y="&tf.config_y_bgm[tf.config_num_bgm] - 20" time="0" wait="true"]
	[ptext layer="0" name="bgmvol" width="80" align="center" x="&tf.config_x[tf.config_num_bgm]" y="&tf.config_y_bgm[tf.config_num_bgm] - 15" size="12" bold="bold" color="0xC11970" text="&tf.config_info_bgm"]
	[kanim layer="0" name="bgmvol" keyframe="show_balloon" easing="linear" count="1" time="200"]

[return]


;--------------------------------------------------------------------------------

; SE更新

;--------------------------------------------------------------------------------
*icon_se

	[iscript]

	$(".se_img_0").css( "visibility", tf.config_num_se == 0 ? 'visible' : 'hidden');
	$(".se_img_1").css( "visibility", tf.config_num_se >  0 ? 'visible' : 'hidden');
	$(".se_img_2").css( "visibility", tf.config_num_se >  1 ? 'visible' : 'hidden');
	$(".se_img_3").css( "visibility", tf.config_num_se >  2 ? 'visible' : 'hidden');
	$(".se_img_4").css( "visibility", tf.config_num_se >  3 ? 'visible' : 'hidden');
	$(".se_img_5").css( "visibility", tf.config_num_se >  4 ? 'visible' : 'hidden');
	$(".se_img_6").css( "visibility", tf.config_num_se >  5 ? 'visible' : 'hidden');
	$(".se_img_7").css( "visibility", tf.config_num_se >  6 ? 'visible' : 'hidden');
	$(".se_img_8").css( "visibility", tf.config_num_se >  7 ? 'visible' : 'hidden');
	$(".se_img_9").css( "visibility", tf.config_num_se >  8 ? 'visible' : 'hidden');
	$(".se_img_10").css("visibility", tf.config_num_se >  9 ? 'visible' : 'hidden');

	[endscript]

[return]


*info_se

	[iscript]

	tf.config_info_se = tf.current_se_vol + '%';

	if(tf.current_se_vol == 0){
		tf.config_info_se = 'Mute';
	}

	[endscript]

;	SE音量の情報を表示
	[image layer="0" name="sevol" storage="&tf.img_path + 'balloon.png'" x="&tf.config_x[tf.config_num_se]" y="&tf.config_y_se[tf.config_num_se] - 20" time="0" wait="true"]
	[ptext layer="0" name="sevol" width="80" align="center" x="&tf.config_x[tf.config_num_se]" y="&tf.config_y_se[tf.config_num_se] - 15" size="12" bold="bold" color="0xDC6000" text="&tf.config_info_se"]
	[kanim layer="0" name="sevol" keyframe="show_balloon" easing="linear" count="1" time="200"]

[return]

;--------------------------------------------------------------------------------

; テキスト速度更新

;--------------------------------------------------------------------------------
*icon_ch

	[iscript]

	$(".ch_img_1").css( "visibility", tf.config_num_ch >= 0 ? 'visible' : 'hidden');
	$(".ch_img_2").css( "visibility", tf.config_num_ch >  0 ? 'visible' : 'hidden');
	$(".ch_img_3").css( "visibility", tf.config_num_ch >  1 ? 'visible' : 'hidden');
	$(".ch_img_4").css( "visibility", tf.config_num_ch >  2 ? 'visible' : 'hidden');
	$(".ch_img_5").css( "visibility", tf.config_num_ch >  3 ? 'visible' : 'hidden');
	$(".ch_img_6").css( "visibility", tf.config_num_ch >  4 ? 'visible' : 'hidden');
	$(".ch_img_7").css( "visibility", tf.config_num_ch >  5 ? 'visible' : 'hidden');
	$(".ch_img_8").css( "visibility", tf.config_num_ch >  6 ? 'visible' : 'hidden');
	$(".ch_img_9").css( "visibility", tf.config_num_ch >  7 ? 'visible' : 'hidden');
	$(".ch_img_10").css("visibility", tf.config_num_ch >  8 ? 'visible' : 'hidden');

	[endscript]

[return]


*info_ch

	[iscript]

	tf.config_info_ch = tf.current_ch_speed + 'ms';

	[endscript]

;	テキスト速度の情報を表示
	[image layer="0" name="ch" storage="&tf.img_path + 'balloon.png'" x="&tf.config_x[tf.config_num_ch + 1]" y="&tf.config_y_ch[tf.config_num_ch + 1] - 20" time="0" wait="true"]
	[ptext layer="0" name="ch" width="80" align="center" x="&tf.config_x[tf.config_num_ch + 1]" y="&tf.config_y_ch[tf.config_num_ch + 1] - 15" size="12" bold="bold" color="0x326C11" text="&tf.config_info_ch"]
	[kanim layer="0" name="ch" keyframe="show_balloon" easing="linear" count="1" time="200"]

[return]

;--------------------------------------------------------------------------------

; オート速度更新

;--------------------------------------------------------------------------------
*icon_auto

	[iscript]

	$(".auto_img_1").css( "visibility", tf.config_num_auto >= 0 ? 'visible' : 'hidden');
	$(".auto_img_2").css( "visibility", tf.config_num_auto >  0 ? 'visible' : 'hidden');
	$(".auto_img_3").css( "visibility", tf.config_num_auto >  1 ? 'visible' : 'hidden');
	$(".auto_img_4").css( "visibility", tf.config_num_auto >  2 ? 'visible' : 'hidden');
	$(".auto_img_5").css( "visibility", tf.config_num_auto >  3 ? 'visible' : 'hidden');
	$(".auto_img_6").css( "visibility", tf.config_num_auto >  4 ? 'visible' : 'hidden');
	$(".auto_img_7").css( "visibility", tf.config_num_auto >  5 ? 'visible' : 'hidden');
	$(".auto_img_8").css( "visibility", tf.config_num_auto >  6 ? 'visible' : 'hidden');
	$(".auto_img_9").css( "visibility", tf.config_num_auto >  7 ? 'visible' : 'hidden');
	$(".auto_img_10").css("visibility", tf.config_num_auto >  8 ? 'visible' : 'hidden');

	[endscript]

[return]


*info_auto

	[iscript]

	tf.config_info_auto = tf.current_auto_speed + 'ms';

	[endscript]

;	オート速度の情報を表示
	[image layer="0" name="auto" storage="&tf.img_path + 'balloon.png'" x="&tf.config_x[tf.config_num_auto + 1]" y="&tf.config_y_auto[tf.config_num_auto + 1] - 20" time="0" wait="true"]
	[ptext layer="0" name="auto" width="80" align="center" x="&tf.config_x[tf.config_num_auto + 1]" y="&tf.config_y_auto[tf.config_num_auto + 1] - 15" size="12" bold="bold" color="0x2F6D9C" text="&tf.config_info_auto"]
	[kanim layer="0" name="auto" keyframe="show_balloon" easing="linear" count="1" time="200"]

[return]

;--------------------------------------------------------------------------------

; 未読スキップ更新

;--------------------------------------------------------------------------------
*icon_skip

	[iscript]
	tf.img_unread_skip = tf.text_skip == "OFF" ? 'skip_off.png' : 'skip_on.png';
	[endscript]

	[image layer="0" storage="&tf.img_path + tf.img_unread_skip" x="310" y="455" time="0"]

[return]


;================================================================================

; 画像の読み込み（コンフィグ画面の起動時のみコール）

;================================================================================
*load_img

	[layopt layer="0" visible="true"]

;	BGM
	[image layer="0" name="bgm_img_0"  storage="&tf.img_path + 'bgm_mute.png'" x="&tf.config_x[0]"  y="&tf.config_y_bgm[0]"]
	[image layer="0" name="bgm_img_1"  storage="&tf.img_path + 'bgm_min.png'"  x="&tf.config_x[1]"  y="&tf.config_y_bgm[1]"]
	[image layer="0" name="bgm_img_2"  storage="&tf.img_path + 'bgm2.png'"     x="&tf.config_x[2]"  y="&tf.config_y_bgm[2]"]
	[image layer="0" name="bgm_img_3"  storage="&tf.img_path + 'bgm1.png'"     x="&tf.config_x[3]"  y="&tf.config_y_bgm[3]"]
	[image layer="0" name="bgm_img_4"  storage="&tf.img_path + 'bgm2.png'"     x="&tf.config_x[4]"  y="&tf.config_y_bgm[4]"]
	[image layer="0" name="bgm_img_5"  storage="&tf.img_path + 'bgm1.png'"     x="&tf.config_x[5]"  y="&tf.config_y_bgm[5]"]
	[image layer="0" name="bgm_img_6"  storage="&tf.img_path + 'bgm2.png'"     x="&tf.config_x[6]"  y="&tf.config_y_bgm[6]"]
	[image layer="0" name="bgm_img_7"  storage="&tf.img_path + 'bgm1.png'"     x="&tf.config_x[7]"  y="&tf.config_y_bgm[7]"]
	[image layer="0" name="bgm_img_8"  storage="&tf.img_path + 'bgm2.png'"     x="&tf.config_x[8]"  y="&tf.config_y_bgm[8]"]
	[image layer="0" name="bgm_img_9"  storage="&tf.img_path + 'bgm1.png'"     x="&tf.config_x[9]"  y="&tf.config_y_bgm[9]"]
	[image layer="0" name="bgm_img_10" storage="&tf.img_path + 'bgm_max.png'"  x="&tf.config_x[10]" y="&tf.config_y_bgm[10]"]

;	SE
	[image layer="0" name="se_img_0"  storage="&tf.img_path + 'se_mute.png'" x="&tf.config_x[0]"  y="&tf.config_y_se[0]"]
	[image layer="0" name="se_img_1"  storage="&tf.img_path + 'se_min.png'"  x="&tf.config_x[1]"  y="&tf.config_y_se[1]"]
	[image layer="0" name="se_img_2"  storage="&tf.img_path + 'se2.png'"     x="&tf.config_x[2]"  y="&tf.config_y_se[2]"]
	[image layer="0" name="se_img_3"  storage="&tf.img_path + 'se1.png'"     x="&tf.config_x[3]"  y="&tf.config_y_se[3]"]
	[image layer="0" name="se_img_4"  storage="&tf.img_path + 'se2.png'"     x="&tf.config_x[4]"  y="&tf.config_y_se[4]"]
	[image layer="0" name="se_img_5"  storage="&tf.img_path + 'se1.png'"     x="&tf.config_x[5]"  y="&tf.config_y_se[5]"]
	[image layer="0" name="se_img_6"  storage="&tf.img_path + 'se2.png'"     x="&tf.config_x[6]"  y="&tf.config_y_se[6]"]
	[image layer="0" name="se_img_7"  storage="&tf.img_path + 'se1.png'"     x="&tf.config_x[7]"  y="&tf.config_y_se[7]"]
	[image layer="0" name="se_img_8"  storage="&tf.img_path + 'se2.png'"     x="&tf.config_x[8]"  y="&tf.config_y_se[8]"]
	[image layer="0" name="se_img_9"  storage="&tf.img_path + 'se1.png'"     x="&tf.config_x[9]"  y="&tf.config_y_se[9]"]
	[image layer="0" name="se_img_10" storage="&tf.img_path + 'se_max.png'"  x="&tf.config_x[10]" y="&tf.config_y_se[10]"]

;	テキスト速度
	[image layer="0" name="ch_img_1"  storage="&tf.img_path + 'ch_min.png'" x="&tf.config_x[1]"  y="&tf.config_y_ch[1]"]
	[image layer="0" name="ch_img_2"  storage="&tf.img_path + 'ch2.png'"    x="&tf.config_x[2]"  y="&tf.config_y_ch[2]"]
	[image layer="0" name="ch_img_3"  storage="&tf.img_path + 'ch1.png'"    x="&tf.config_x[3]"  y="&tf.config_y_ch[3]"]
	[image layer="0" name="ch_img_4"  storage="&tf.img_path + 'ch2.png'"    x="&tf.config_x[4]"  y="&tf.config_y_ch[4]"]
	[image layer="0" name="ch_img_5"  storage="&tf.img_path + 'ch1.png'"    x="&tf.config_x[5]"  y="&tf.config_y_ch[5]"]
	[image layer="0" name="ch_img_6"  storage="&tf.img_path + 'ch2.png'"    x="&tf.config_x[6]"  y="&tf.config_y_ch[6]"]
	[image layer="0" name="ch_img_7"  storage="&tf.img_path + 'ch1.png'"    x="&tf.config_x[7]"  y="&tf.config_y_ch[7]"]
	[image layer="0" name="ch_img_8"  storage="&tf.img_path + 'ch2.png'"    x="&tf.config_x[8]"  y="&tf.config_y_ch[8]"]
	[image layer="0" name="ch_img_9"  storage="&tf.img_path + 'ch1.png'"    x="&tf.config_x[9]"  y="&tf.config_y_ch[9]"]
	[image layer="0" name="ch_img_10" storage="&tf.img_path + 'ch_max.png'" x="&tf.config_x[10]" y="&tf.config_y_ch[10]"]

;	オート速度
	[image layer="0" name="auto_img_1"  storage="&tf.img_path + 'au_min.png'" x="&tf.config_x[1]"  y="&tf.config_y_auto[1]"]
	[image layer="0" name="auto_img_2"  storage="&tf.img_path + 'au2.png'"    x="&tf.config_x[2]"  y="&tf.config_y_auto[2]"]
	[image layer="0" name="auto_img_3"  storage="&tf.img_path + 'au1.png'"    x="&tf.config_x[3]"  y="&tf.config_y_auto[3]"]
	[image layer="0" name="auto_img_4"  storage="&tf.img_path + 'au2.png'"    x="&tf.config_x[4]"  y="&tf.config_y_auto[4]"]
	[image layer="0" name="auto_img_5"  storage="&tf.img_path + 'au1.png'"    x="&tf.config_x[5]"  y="&tf.config_y_auto[5]"]
	[image layer="0" name="auto_img_6"  storage="&tf.img_path + 'au2.png'"    x="&tf.config_x[6]"  y="&tf.config_y_auto[6]"]
	[image layer="0" name="auto_img_7"  storage="&tf.img_path + 'au1.png'"    x="&tf.config_x[7]"  y="&tf.config_y_auto[7]"]
	[image layer="0" name="auto_img_8"  storage="&tf.img_path + 'au2.png'"    x="&tf.config_x[8]"  y="&tf.config_y_auto[8]"]
	[image layer="0" name="auto_img_9"  storage="&tf.img_path + 'au1.png'"    x="&tf.config_x[9]"  y="&tf.config_y_auto[9]"]
	[image layer="0" name="auto_img_10" storage="&tf.img_path + 'au_max.png'" x="&tf.config_x[10]" y="&tf.config_y_auto[10]"]

[return]
