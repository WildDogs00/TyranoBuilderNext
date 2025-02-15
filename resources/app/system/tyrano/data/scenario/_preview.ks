[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[mask_off time=10]
[hidemenubutton]

[tb_clear_images]

[tb_keyconfig  flag="0"  ]
[tb_hide_message_window  ]
[playbgm  volume="50"  time="1000"  loop="true"  storage="Sakura_Girl_-_Peach.mp3"  fadein="true"  ]
[bg  storage="title.jpg"  ]
[tb_image_show  time="1000"  storage="default/logo_vne_game.png"  width="447"  height="352"  x="382"  y="23"  _clickable_img=""  name="img_6"  ]
*title

[buttonHover  soundVolume="0.5"  storage="title_screen.ks"  target="*start"  graphic="button/start_game.png"  width="240"  height="137"  graphicH="button/start_game_h.png"  x="478"  y="349"  _clickable_img=""  ]
[buttonHover  soundVolume="0.5"  storage="title_screen.ks"  target="*load"  graphic="button/load.png"  width="245"  height="127"  graphicH="button/load_h.png"  x="481"  y="436"  _clickable_img=""  ]
[s  ]
*start

[showmenubutton]

[cm  ]
[tb_keyconfig  flag="1"  ]
[jump  storage="scene1.ks"  target=""  ]
[s  ]
*load

[cm  ]
[showload]

[jump  target="*title"  storage=""  ]
[s  ]
