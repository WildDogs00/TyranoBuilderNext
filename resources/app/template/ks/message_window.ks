

		[position width={{:msg_width}} height={{:msg_height}} top={{:msg_top}} left={{:msg_left}} ]
		
		
		{{if use_image == true}}
			[position page=fore frame="{{:image_file}}" margint={{:margint}} marginl={{:marginl}} marginr={{:marginr}} marginb={{:marginb}} vertical={{:vertical}} ]
		{{else}}
			[position page=fore margint={{:margint}} marginl={{:marginl}} marginr={{:marginr}} marginb={{:marginb}} vertical={{:vertical}} opacity="{{:opacity}}" radius="{{:radius}}" color="{{:window_color}}" ]
		{{/if}}
		
		[ptext name="chara_name_area" layer="message0" color={{:chara_name_color}} size={{:chara_name_size}} x={{:chara_name_x}} y={{:chara_name_y}} bold="{{:chara_name_bold}}" edge="{{:edge_color}}" shadow="{{:shadow_color}}"]


		[chara_config ptext="chara_name_area" pos_mode={{:check_chara_mode}} time="{{:text_chara_mod_time}}" memory="{{:check_memory_chara_face}}" anim="{{:check_chara_anim}}" effect="{{:select_chara_anim_mode}}" pos_change_time="{{:text_pos_change_time}}" ]
		

		[chara_config  talk_focus="{{:select_talk_focus}}" ]
		

		[glyph fix="{{:icon_position_fix}}" left="{{:icon_position_x}}" top="{{:icon_position_y}}" ]
		
		{{props map_role}}
        
            {{if prop.role== "config"}}
            [button role="sleepgame" graphic="{{:prop.graphic}}" x="{{:prop.x}}" y="{{:prop.y}}" width="{{:prop.width}}" height="{{:prop.height}}" visible="false" storage="config.ks"]
            {{else}}
            [button role="{{:prop.role}}" graphic="{{:prop.graphic}}" x="{{:prop.x}}" y="{{:prop.y}}" width="{{:prop.width}}" height="{{:prop.height}}" visible="false" ]
            {{/if}}
        
        {{/props}}
		

		[eval exp="sf._tb_cg_noimage='{{:cg_noimage}}'" ]
		[eval exp="sf._tb_replay_noimage='{{:replay_noimage}}'" ]
		

		;[position layer="message1" left=160 top=500 width=1000 height=200 radius=15 page=fore visible=true color="white" opacity=255 border_size="3" border_color="black" ]
		;[position layer="message1" page=fore margint="15" marginl="20" marginr="20" marginb="20"]
		
		[position layer="message1" width={{:msg_width}} height={{:msg_height}} top={{:msg_top}} left={{:msg_left}} ]
		[position layer="message1" page=fore margint=5 marginl=10 marginr=10 marginb=10 vertical={{:vertical}} opacity="{{:opacity}}" radius="{{:radius}}" color="{{:window_color}}" ]
		
		