{{if name != ""}}

[plugin name="{{:name}}" font_color="{{:message_color}}" name_color="{{:chara_name_color}}" opacity="{{:opacity}}" ]

{{if button == "1"}}
[mask time=10]
[add_theme_button]
[tb_hide_message_window]
[mask_off time=10]
{{/if}}

{{/if}}
		
				