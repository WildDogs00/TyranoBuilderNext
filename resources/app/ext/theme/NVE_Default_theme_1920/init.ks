[iscript]
mp.font_color = mp.font_color || "0xfafafa";
mp.name_color = mp.name_color || "0xfafafa"; 
mp.frame_opacity = mp.frame_opacity || "255";
[endscript]

[free name="chara_name_area" layer="message0"]


[position layer="message0" width="1920" height="230" top="845" left="0"]
[position layer="message0" frame="../others/plugin/NVE_Default_theme_1920/image/frame_message.png" margint="50" marginl="100" marginr="100" opacity="&mp.frame_opacity" page="fore"]


[ptext name="chara_name_area" layer="message0" color="&mp.name_color" size="28" bold="true" x="54" y="868"]
[chara_config ptext="chara_name_area"]


[font color="&mp.font_color"]
[deffont color="&mp.font_color"]

[macro  name="add_theme_button"]

[hidemenubutton]


[button name="role_button" role="quicksave" graphic="../others/plugin/NVE_Default_theme_1920/image/button/qsave.png" enterimg="../others/plugin/NVE_Default_theme_1920/image/button/qsave2.png" x="380" y="1040"]


[button name="role_button" role="quickload" graphic="../others/plugin/NVE_Default_theme_1920/image/button/qload.png" enterimg="../others/plugin/NVE_Default_theme_1920/image/button/qload2.png" x="480" y="1040"]


[button name="role_button" role="save" graphic="../others/plugin/NVE_Default_theme_1920/image/button/save.png" enterimg="../others/plugin/NVE_Default_theme_1920/image/button/save2.png" x="580" y="1040"]


[button name="role_button" role="load" graphic="../others/plugin/NVE_Default_theme_1920/image/button/load.png" enterimg="../others/plugin/NVE_Default_theme_1920/image/button/load2.png" x="680" y="1040"]


[button name="role_button" role="auto" graphic="../others/plugin/NVE_Default_theme_1920/image/button/auto.png" enterimg="../others/plugin/NVE_Default_theme_1920/image/button/auto2.png" x="780" y="1040"]


[button name="role_button" role="skip" graphic="../others/plugin/NVE_Default_theme_1920/image/button/skip.png" enterimg="../others/plugin/NVE_Default_theme_1920/image/button/skip2.png" x="880" y="1040"]


[button name="role_button" role="backlog" graphic="../others/plugin/NVE_Default_theme_1920/image/button/log.png" enterimg="../others/plugin/NVE_Default_theme_1920/image/button/log2.png" x="980" y="1040"]


[button name="role_button" role="fullscreen" graphic="../others/plugin/NVE_Default_theme_1920/image/button/screen.png" enterimg="../others/plugin/NVE_Default_theme_1920/image/button/screen2.png" x="1080" y="1040"]


[button name="role_button" role="sleepgame" graphic="../others/plugin/NVE_Default_theme_1920/image/button/sleep.png" enterimg="../others/plugin/NVE_Default_theme_1920/image/button/sleep2.png" storage="../others/plugin/NVE_Default_theme_1920/config.ks" x="1180" y="1040"]


[button name="role_button" role="menu" graphic="../others/plugin/NVE_Default_theme_1920/image/button/menu.png" enterimg="../others/plugin/NVE_Default_theme_1920/image/button/menu2.png" x="1280" y="1040"]


[button name="role_button" role="window" graphic="../others/plugin/NVE_Default_theme_1920/image/button/close.png" enterimg="../others/plugin/NVE_Default_theme_1920/image/button/close2.png" x="1380" y="1040"]


[button name="role_button" role="title" graphic="../others/plugin/NVE_Default_theme_1920/image/button/title.png" enterimg="../others/plugin/NVE_Default_theme_1920/image/button/title2.png" x="1480" y="1040"]

[endmacro]

[sysview type="save" storage="./data/others/plugin/NVE_Default_theme_1920/html/save.html" ]
[sysview type="load" storage="./data/others/plugin/NVE_Default_theme_1920/html/load.html" ]
[sysview type="backlog" storage="./data/others/plugin/NVE_Default_theme_1920/html/backlog.html" ]
[sysview type="menu" storage="./data/others/plugin/NVE_Default_theme_1920/html/menu.html" ]
[loadcss file="./data/others/plugin/NVE_Default_theme_1920/ts01_1920.css"]

[return]