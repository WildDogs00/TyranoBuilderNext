[hidemenubutton]

[tb_clear_images]

[tb_keyconfig flag=0]
{{if no_title == "yes"}}

	{{if no_menu == "no"}}
		[showmenubutton]
	{{/if}}

	[cm]
	@jump storage="scene1.ks"
	[s]

{{else}}
	[varSetting  valueRandom="0-0"  varName="sf.langTranslate"  valueText="ru"  arithmeticOperations="="  ]
	[timeSetting  time="08:00"  timeSpeed="0.01"  year="2024"  month="11"  day="29"  realTime="true"  ]

	[tb_hide_message_window]
	[bg  storage="title.jpg"  ]
	[playbgm  volume="50"  time="10000"  loop="true"  fadein="true"  storage="Sakura_Girl_-_Peach.mp3"  ]

	{{if size_type == "1"}}
        [tb_image_show  time="1000"  storage="default/logo_vne_game.png"  width="347"  height="273"  x="465"  y="8"  _clickable_img=""  name="img_5"  ]
    {{else size_type == "2"}}
        [tb_image_show  time="1000"  storage="default/logo_vne_game.png"  width="446"  height="350"  x="710"  y="21"  _clickable_img=""  name="img_5"  ]
    {{else size_type == "3"}}
        [tb_image_show  time="1000"  storage="default/logo_vne_game.png"  width="347"  height="273"  x="757"  y="8"  _clickable_img=""  name="img_5"  ]
    {{else}}
        [tb_image_show  time="1000"  storage="default/logo_vne_game.png"  width="347"  height="273"  x="465"  y="8"  _clickable_img=""  name="img_5"  ]
    {{/if}}
	
	*title
	
	{{if size_type=="1"}}

    [buttonHover  soundVolume="0.5"  storage="title_screen.ks"  target="*start"  graphic="button/start_game.png"  width="197"  height="113"  graphicH="button/start_game_h.png"  x="533"  y="368"  _clickable_img="" storageSe="click_004.ogg" ]
    [wait  time="1000"  ]
    [buttonHover  soundVolume="0.5"  storage="title_screen.ks"  target="*load"  graphic="button/load_game.png"  width="197"  height="105"  graphicH="button/load_h.png"  x="533"  y="500"  _clickable_img="" storageSe="click_004.ogg" ]
	
	{{else size_type=="2"}}

    [buttonHover  soundVolume="0.5"  storage="title_screen.ks"  target="*start"  graphic="button/start_game.png"  width="230"  height="131"  graphicH="button/start_game_h.png"  x="817"  y="411"  _clickable_img=""  storageSe="click_004.ogg"  ]
    [wait  time="1000"  ]
    [buttonHover  soundVolume="0.5"  storage="title_screen.ks"  target="*load"  graphic="button/load_game.png"  width="250"  height="130"  graphicH="button/load_h.png"  x="810"  y="564"  _clickable_img=""  storageSe="click_004.ogg"  ]

	{{else size_type == "3"}}

    [buttonHover  soundVolume="0.5"  storage="title_screen.ks"  target="*start"  graphic="button/start_game.png"  width="230"  height="131"  graphicH="button/start_game_h.png"  x="817"  y="411"  _clickable_img=""  storageSe="click_004.ogg"  ]
    [wait  time="1000"  ]
    [buttonHover  soundVolume="0.5"  storage="title_screen.ks"  target="*load"  graphic="button/load_game.png"  width="250"  height="130"  graphicH="button/load_h.png"  x="810"  y="564"  _clickable_img=""  storageSe="click_004.ogg"  ]

    {{else}}
    [buttonHover  soundVolume="0.5"  storage="title_screen.ks"  target="*start"  graphic="button/start_game.png"  width="197"  height="113"  graphicH="button/start_game_h.png"  x="533"  y="368"  _clickable_img="" storageSe="click_004.ogg" ]
    [wait  time="1000"  ]
    [buttonHover  soundVolume="0.5"  storage="title_screen.ks"  target="*load"  graphic="button/load_game.png"  width="197"  height="105"  graphicH="button/load_h.png"  x="533"  y="500"  _clickable_img="" storageSe="click_004.ogg" ]
	
	{{/if}}
	
	[s]

	
	*start
	
	{{if no_menu == "no"}}
	[showmenubutton]
	{{/if}}
	
	[cm]
	[tb_keyconfig flag=1]

	@jump storage="scene1.ks"
	[s]

	*load
	
	[cm]
	[showload]
	[jump target=*title]
	
	[s]
	
{{/if}}
