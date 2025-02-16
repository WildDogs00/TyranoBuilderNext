;=========================================
; 回想モード　画面作成
;=========================================
*start
@layopt layer=message0 visible=false
@clearfix
[hidemenubutton]
[cm]


[bg storage="../others/plugin/theme_tyrano_02/image/cgmode/bg_recollection.jpg" time=100]
[layopt layer=1 visible=true]


[iscript]
    
    tf.page = 0;
    tf.selected_replay_obj = ""; //選択されたリプレイを一時的に保管
    
[endscript]



*replaypage
[cm]
[button graphic="../others/plugin/theme_tyrano_02/image/system/menu_button_close.png" enterimg="../others/plugin/theme_tyrano_02/image/system/menu_button_close2.png"  target="*backtitle" x=820 y=20 ]

[iscript]
	tf.target_page = "page_"+tf.page;
[endscript]

*replayview

*cgview
@jump target=&tf.target_page

*page_0
[replay_image_button name="replay1" graphic="cat.jpg" no_graphic="../others/plugin/theme_tyrano_02/image/cgmode/noimage.png" x=60 y=130 width=160 height=140 folder="bgimage" ]
[replay_image_button name="replay2" graphic="toile.jpg" no_graphic="../others/plugin/theme_tyrano_02/image/cgmode/noimage.png" x=260 y=130 width=160 height=140 folder="bgimage" ]


@jump target ="*common"


*common

[s]

*backtitle
[cm]
[freeimage layer=1]
@jump storage=title.ks

*nextpage
[emb exp="tf.page++;"]
@jump target="*replaypage"


*backpage
[emb exp="tf.page--;"]
@jump target="*replaypage"

*clickcg
[cm]

[iscript]
    tf.flag_replay = true;
[endscript]


@jump storage=&tf.selected_replay_obj.storage target=&tf.selected_replay_obj.target
[s]

*no_image

@jump  target=*replaypage


