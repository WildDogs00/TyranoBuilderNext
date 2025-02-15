; 2022/08/08 @ko10panda edit
;--------------------------------------------------------------------
;=========================================
; コンフィグ モード　画面作成
;=========================================

	[layopt layer="message0" visible="false"]
	[clearfix]
	[stop_keyconfig]
	[free_layermode time="100" wait="true"]
	[reset_camera time="100" wait="true"]

	[iscript]
		$(".layer_camera").empty();
		$("#bgmovie").remove();
	[endscript]

	[hidemenubutton]

	[iscript]

	TG.config.autoRecordLabel = "true"; // ラベル通過記録を有効に

	tf.current_bgm_vol    = parseInt(TG.config.defaultBgmVolume);
	tf.current_se_vol     = parseInt(TG.config.defaultSeVolume);
	tf.current_ch_speed   = parseInt(TG.config.chSpeed);
	tf.current_auto_speed = parseInt(TG.config.autoSpeed);

	tf.text_skip ="ON";

	if(TG.config.unReadTextSkip != "true"){
		tf.text_skip ="OFF";
	}

	[endscript]

	[iscript]

	// 画像のパス
	tf.img_path      = '../others/plugin/theme_kopanda_07_HD/image/config/';

	tf.img_set_off   = tf.img_path + 'c_btn.png';

	tf.img_set_bgm   = tf.img_path + 'set_01.png';
	tf.img_set_se    = tf.img_path + 'set_02.png';
	tf.img_set_ch    = tf.img_path + 'set_01.png';
	tf.img_set_auto  = tf.img_path + 'set_02.png';

	tf.img_skip_on   = tf.img_path + 'skip_on.png';
	tf.img_skip_off  = tf.img_path + 'skip_off.png';

	tf.img_mute_bgm  = tf.img_path + 'mute_bgm.png';
	tf.img_mute_se   = tf.img_path + 'mute_se.png';

	// チェック画像の座標
	tf.config_x = [1104, 356, 424, 492, 560, 628, 696, 764, 832, 900, 968];
	tf.config_y = [204, 284, 364, 444];

	tf.skip_x = [356, 552]; // off, on
	tf.skip_y = 520;

	// チェック画像の幅と高さ
	tf.img_set_width  = 56
	tf.img_set_height = 56;

	// ミュート画像の幅と高さ
	tf.img_mute_width  = 40;
	tf.img_mute_height = 40;

	// スキップ画像の幅と高さ
	tf.img_skip_width  = 164;
	tf.img_skip_height =  56;

	// 配列の要素番号取得用
	tf.config_num_bgm;
	tf.config_num_se;
	tf.config_num_ch;
	tf.config_num_auto;

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

	switch(tf.current_se_vol){
		case   0: tf.config_num_se =  0; break;
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

;	コンフィグ用の背景
	[bg storage="../others/plugin/theme_kopanda_07_HD/image/config/config_bg.png" time="100"]

;	Backボタン
	[button fix="true" graphic="&tf.img_path + 'button_back.png'" enterimg="&tf.img_path + 'button_back2.png'" target="*backtitle" x="1100" y="20"]

	[jump target="*config_page"]

;------------------------------------------------------------------------------------------------------
*config_page
[clearstack]
;------------------------------------------------------------------------------------------------------
; BGM音量
;------------------------------------------------------------------------------------------------------
	[button name="bgmvol,bgmvol_10"  fix="true" target="*vol_bgm_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[1]"  y="&tf.config_y[0]" exp="tf.config_num_bgm =  1; tf.current_bgm_vol =  10"]
	[button name="bgmvol,bgmvol_20"  fix="true" target="*vol_bgm_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[2]"  y="&tf.config_y[0]" exp="tf.config_num_bgm =  2; tf.current_bgm_vol =  20"]
	[button name="bgmvol,bgmvol_30"  fix="true" target="*vol_bgm_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[3]"  y="&tf.config_y[0]" exp="tf.config_num_bgm =  3; tf.current_bgm_vol =  30"]
	[button name="bgmvol,bgmvol_40"  fix="true" target="*vol_bgm_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[4]"  y="&tf.config_y[0]" exp="tf.config_num_bgm =  4; tf.current_bgm_vol =  40"]
	[button name="bgmvol,bgmvol_50"  fix="true" target="*vol_bgm_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[5]"  y="&tf.config_y[0]" exp="tf.config_num_bgm =  5; tf.current_bgm_vol =  50"]
	[button name="bgmvol,bgmvol_60"  fix="true" target="*vol_bgm_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[6]"  y="&tf.config_y[0]" exp="tf.config_num_bgm =  6; tf.current_bgm_vol =  60"]
	[button name="bgmvol,bgmvol_70"  fix="true" target="*vol_bgm_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[7]"  y="&tf.config_y[0]" exp="tf.config_num_bgm =  7; tf.current_bgm_vol =  70"]
	[button name="bgmvol,bgmvol_80"  fix="true" target="*vol_bgm_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[8]"  y="&tf.config_y[0]" exp="tf.config_num_bgm =  8; tf.current_bgm_vol =  80"]
	[button name="bgmvol,bgmvol_90"  fix="true" target="*vol_bgm_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[9]"  y="&tf.config_y[0]" exp="tf.config_num_bgm =  9; tf.current_bgm_vol =  90"]
	[button name="bgmvol,bgmvol_100" fix="true" target="*vol_bgm_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[10]" y="&tf.config_y[0]" exp="tf.config_num_bgm = 10; tf.current_bgm_vol = 100"]

;	ミュート
	[button name="bgmvol,bgmvol_0"   fix="true" target="*vol_bgm_mute" graphic="&tf.img_set_off" width="&tf.img_mute_width" height="&tf.img_mute_height" x="&tf.config_x[0]" y="212"]

;------------------------------------------------------------------------------------------------------
; SE音量
;------------------------------------------------------------------------------------------------------
	[button name="sevol,sevol_10"  fix="true" target="*vol_se_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[1]"  y="&tf.config_y[1]" exp="tf.config_num_se =  1; tf.current_se_vol =  10"]
	[button name="sevol,sevol_20"  fix="true" target="*vol_se_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[2]"  y="&tf.config_y[1]" exp="tf.config_num_se =  2; tf.current_se_vol =  20"]
	[button name="sevol,sevol_30"  fix="true" target="*vol_se_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[3]"  y="&tf.config_y[1]" exp="tf.config_num_se =  3; tf.current_se_vol =  30"]
	[button name="sevol,sevol_40"  fix="true" target="*vol_se_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[4]"  y="&tf.config_y[1]" exp="tf.config_num_se =  4; tf.current_se_vol =  40"]
	[button name="sevol,sevol_50"  fix="true" target="*vol_se_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[5]"  y="&tf.config_y[1]" exp="tf.config_num_se =  5; tf.current_se_vol =  50"]
	[button name="sevol,sevol_60"  fix="true" target="*vol_se_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[6]"  y="&tf.config_y[1]" exp="tf.config_num_se =  6; tf.current_se_vol =  60"]
	[button name="sevol,sevol_70"  fix="true" target="*vol_se_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[7]"  y="&tf.config_y[1]" exp="tf.config_num_se =  7; tf.current_se_vol =  70"]
	[button name="sevol,sevol_80"  fix="true" target="*vol_se_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[8]"  y="&tf.config_y[1]" exp="tf.config_num_se =  8; tf.current_se_vol =  80"]
	[button name="sevol,sevol_90"  fix="true" target="*vol_se_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[9]"  y="&tf.config_y[1]" exp="tf.config_num_se =  9; tf.current_se_vol =  90"]
	[button name="sevol,sevol_100" fix="true" target="*vol_se_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[10]" y="&tf.config_y[1]" exp="tf.config_num_se = 10; tf.current_se_vol = 100"]

;	SEミュート
	[button name="sevol,sevol_0"   fix="true" target="*vol_se_mute" graphic="&tf.img_set_off" width="&tf.img_mute_width" height="&tf.img_mute_height" x="&tf.config_x[0]" y="292"]

;------------------------------------------------------------------------------------------------------
; テキスト速度
;------------------------------------------------------------------------------------------------------
	[button name="ch,ch_100" fix="true" target="*ch_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[1]"  y="&tf.config_y[2]" exp="tf.set_ch_speed =100; tf.config_num_ch = 0"]
	[button name="ch,ch_80"  fix="true" target="*ch_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[2]"  y="&tf.config_y[2]" exp="tf.set_ch_speed = 80; tf.config_num_ch = 1"]
	[button name="ch,ch_50"  fix="true" target="*ch_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[3]"  y="&tf.config_y[2]" exp="tf.set_ch_speed = 50; tf.config_num_ch = 2"]
	[button name="ch,ch_40"  fix="true" target="*ch_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[4]"  y="&tf.config_y[2]" exp="tf.set_ch_speed = 40; tf.config_num_ch = 3"]
	[button name="ch,ch_30"  fix="true" target="*ch_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[5]"  y="&tf.config_y[2]" exp="tf.set_ch_speed = 30; tf.config_num_ch = 4"]
	[button name="ch,ch_25"  fix="true" target="*ch_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[6]"  y="&tf.config_y[2]" exp="tf.set_ch_speed = 25; tf.config_num_ch = 5"]
	[button name="ch,ch_20"  fix="true" target="*ch_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[7]"  y="&tf.config_y[2]" exp="tf.set_ch_speed = 20; tf.config_num_ch = 6"]
	[button name="ch,ch_11"  fix="true" target="*ch_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[8]"  y="&tf.config_y[2]" exp="tf.set_ch_speed = 11; tf.config_num_ch = 7"]
	[button name="ch,ch_8"   fix="true" target="*ch_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[9]"  y="&tf.config_y[2]" exp="tf.set_ch_speed =  8; tf.config_num_ch = 8"]
	[button name="ch,ch_5"   fix="true" target="*ch_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[10]" y="&tf.config_y[2]" exp="tf.set_ch_speed =  5; tf.config_num_ch = 9"]

;------------------------------------------------------------------------------------------------------
; オート速度
;------------------------------------------------------------------------------------------------------
	[button name="auto,auto_5000" fix="true" target="*auto_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[1]"  y="&tf.config_y[3]" exp="tf.set_auto_speed = 5000; tf.config_num_auto = 0"]
	[button name="auto,auto_4500" fix="true" target="*auto_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[2]"  y="&tf.config_y[3]" exp="tf.set_auto_speed = 4500; tf.config_num_auto = 1"]
	[button name="auto,auto_4000" fix="true" target="*auto_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[3]"  y="&tf.config_y[3]" exp="tf.set_auto_speed = 4000; tf.config_num_auto = 2"]
	[button name="auto,auto_3500" fix="true" target="*auto_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[4]"  y="&tf.config_y[3]" exp="tf.set_auto_speed = 3500; tf.config_num_auto = 3"]
	[button name="auto,auto_3000" fix="true" target="*auto_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[5]"  y="&tf.config_y[3]" exp="tf.set_auto_speed = 3000; tf.config_num_auto = 4"]
	[button name="auto,auto_2500" fix="true" target="*auto_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[6]"  y="&tf.config_y[3]" exp="tf.set_auto_speed = 2500; tf.config_num_auto = 5"]
	[button name="auto,auto_2000" fix="true" target="*auto_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[7]"  y="&tf.config_y[3]" exp="tf.set_auto_speed = 2000; tf.config_num_auto = 6"]
	[button name="auto,auto_1300" fix="true" target="*auto_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[8]"  y="&tf.config_y[3]" exp="tf.set_auto_speed = 1300; tf.config_num_auto = 7"]
	[button name="auto,auto_800"  fix="true" target="*auto_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[9]"  y="&tf.config_y[3]" exp="tf.set_auto_speed =  800; tf.config_num_auto = 8"]
	[button name="auto,auto_500"  fix="true" target="*auto_speed_change" graphic="&tf.img_set_off" width="&tf.img_set_width" height="&tf.img_set_height" x="&tf.config_x[10]" y="&tf.config_y[3]" exp="tf.set_auto_speed =  500; tf.config_num_auto = 9"]

;------------------------------------------------------------------------------------------------------
; 未読スキップ
;------------------------------------------------------------------------------------------------------
;	未読スキップ-OFF
	[button name="unread_off" fix="true" target="*skip_off" graphic="&tf.img_set_off" width="&tf.img_skip_width" height="&tf.img_skip_height" x="&tf.skip_x[0]" y="&tf.skip_y"]

;	未読スキップ-ON
	[button name="unread_on"  fix="true" target="*skip_on"  graphic="&tf.img_set_off" width="&tf.img_skip_width" height="&tf.img_skip_height" x="&tf.skip_x[1]" y="&tf.skip_y"]

;------------------------------------------------------------------------------------------------------
; コンフィグ起動時の画面更新
;------------------------------------------------------------------------------------------------------
[layopt layer="0" visible="true"]

[call target="*load_bgm_img"]
[call target="*load_se_img"]
[call target="*load_ch_img"]
[call target="*load_auto_img"]
[call target="*load_skip_img"]

[test_message_start]

[s]

;--------------------------------------------------------------------------------
; コンフィグを抜ける
;--------------------------------------------------------------------------------
*backtitle

	[cm]
	[layopt layer="message1" visible="false"]
	[clearfix]
	[start_keyconfig]
	[clearstack]
	[awakegame]

;================================================================================

; ボタンクリック時の処理

;================================================================================

;--------------------------------------------------------------------------------
; BGM音量
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
	[call target="*load_bgm_img"]
	[bgmopt volume="&tf.current_bgm_vol"]

[return]

;--------------------------------------------------------------------------------
; SE音量
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
	[call target="*load_se_img"]
	[seopt volume="&tf.current_se_vol"]

[return]

;---------------------------------------------------------------------------------
; テキスト速度
;--------------------------------------------------------------------------------
*ch_speed_change

	[iscript]

	tf.current_ch_speed = tf.set_ch_speed;

	[endscript]

	[free layer="0" name="ch" time="0" wait="true"]
	[call target="*load_ch_img"]
	[configdelay speed="&tf.set_ch_speed"]

	[test_message_reset]

[return]

;--------------------------------------------------------------------------------
; オート速度
;--------------------------------------------------------------------------------
*auto_speed_change

	[iscript]

	tf.current_auto_speed = tf.set_auto_speed;

	[endscript]

	[free layer="0" name="auto" time="0" wait="true"]
	[call target="*load_auto_img"]
	[autoconfig speed="&tf.set_auto_speed"]

[return]

;--------------------------------------------------------------------------------
; スキップ処理-OFF
;--------------------------------------------------------------------------------
*skip_off

	[iscript]
		tf.text_skip = "OFF";
	[endscript]

	[free layer="0" name="skip" time="0" wait="true"]
	[call target="*load_skip_img"]
	[config_record_label skip="false"]

[return]

;--------------------------------------------------------------------------------
; スキップ処理-ON
;--------------------------------------------------------------------------------
*skip_on

	[iscript]
		tf.text_skip = "ON";
	[endscript]

	[free layer="0" name="skip" time="0" wait="true"]
	[call target="*load_skip_img"]
	[config_record_label skip="true"]

[return]

;================================================================================

; 画像の読み込み

;================================================================================

*load_bgm_img
	[if exp="tf.config_num_bgm == 0"]
	[image layer="0" name="bgmvol" storage="&tf.img_mute_bgm" x="&tf.config_x[0]" y="212"]
	[else]
	[image layer="0" name="bgmvol" storage="&tf.img_set_bgm" x="&tf.config_x[tf.config_num_bgm]" y="&tf.config_y[0]"]
	[endif]
	[return]

*load_se_img
	[if exp="tf.config_num_se == 0"]
	[image layer="0" name="sevol" storage="&tf.img_mute_se" x="&tf.config_x[0]" y="292"]
	[else]
	[image layer="0" name="sevol"  storage="&tf.img_set_se" x="&tf.config_x[tf.config_num_se]" y="&tf.config_y[1]"]
	[endif]
	[return]

*load_ch_img
	[image layer="0" name="ch" storage="&tf.img_set_ch" x="&tf.config_x[tf.config_num_ch + 1]" y="&tf.config_y[2]"]
	[return]

*load_auto_img
	[image layer="0" name="auto"  storage="&tf.img_set_auto" x="&tf.config_x[tf.config_num_auto + 1]" y="&tf.config_y[3]"]
	[return]

*load_skip_img
	[if exp="tf.text_skip == 'ON'"]
	[image layer="0" name="skip" storage="&tf.img_skip_on"  x="&tf.skip_x[1]" y="&tf.skip_y"]
	[else]
	[image layer="0" name="skip" storage="&tf.img_skip_off" x="&tf.skip_x[0]" y="&tf.skip_y"]
	[endif]
	[return]
