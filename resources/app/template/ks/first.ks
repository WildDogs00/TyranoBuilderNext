;[hidemenubutton]

[varSetting  valueRandom="0-0"  varName="sf.fakeTime"  valueNum="06:00"  arithmeticOperations="="  ]
[varSetting  valueRandom="0-0"  varName="sf.fakeDay"  valueNum="0"  arithmeticOperations="="  ]
[varSetting  valueRandom="0-0"  varName="sf.fakeMonth"  valueNum="0"  arithmeticOperations="="  ]
[varSetting  valueRandom="0-0"  varName="sf.fakeYear"  valueNum=""  arithmeticOperations="="  valueText="2024"  ]

[call storage="system/tyrano.ks"]
[call storage="system/builder.ks"]
[call storage="system/chara_define.ks"]

{{if live2d == true}}
[plugin name="live2d"]
{{/if}}

[layopt layer=2 visible=true]
[layopt layer="message0" visible=false]
[call storage="system/message_window.ks"]

[call storage="system/plugin.ks"]
[call storage="system/plugin_third.ks"]

;[title name="now loading"]

[jump storage="{{:jump_storage}}"]

;--------------------------

[s]




