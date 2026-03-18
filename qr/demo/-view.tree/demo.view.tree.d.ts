declare namespace $ {

	type $bog_qr__uri_bog_qr_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_qr['uri'] >
	>
	type $bog_qr__uri_bog_qr_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_qr['uri'] >
	>
	type $bog_qr__gradient_angle_bog_qr_demo_3 = $mol_type_enforce<
		number
		,
		ReturnType< $bog_qr['gradient_angle'] >
	>
	type $bog_qr__gradient_stops_bog_qr_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_qr['gradient_stops'] >
	>
	type $bog_qr__uri_bog_qr_demo_5 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_qr['uri'] >
	>
	type $bog_qr__error_correction_bog_qr_demo_6 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_qr['error_correction'] >
	>
	type $bog_qr__module_radius_bog_qr_demo_7 = $mol_type_enforce<
		number
		,
		ReturnType< $bog_qr['module_radius'] >
	>
	type $bog_qr__finder_radius_bog_qr_demo_8 = $mol_type_enforce<
		number
		,
		ReturnType< $bog_qr['finder_radius'] >
	>
	type $bog_qr__gradient_angle_bog_qr_demo_9 = $mol_type_enforce<
		number
		,
		ReturnType< $bog_qr['gradient_angle'] >
	>
	type $bog_qr__gradient_stops_bog_qr_demo_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_qr['gradient_stops'] >
	>
	type $bog_qr__center_bog_qr_demo_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_qr['center'] >
	>
	type $mol_view__sub_bog_qr_demo_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_string__hint_bog_qr_demo_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_bog_qr_demo_14 = $mol_type_enforce<
		ReturnType< $bog_qr_demo['custom_uri'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_switch__value_bog_qr_demo_15 = $mol_type_enforce<
		ReturnType< $bog_qr_demo['preset'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_bog_qr_demo_16 = $mol_type_enforce<
		({ 
			'default': string,
			'red_orange': string,
			'blue_purple': string,
			'green_teal': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_button_minor__click_bog_qr_demo_17 = $mol_type_enforce<
		ReturnType< $bog_qr_demo['icon_pick'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_qr_demo_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_bog_qr_demo_19 = $mol_type_enforce<
		ReturnType< $bog_qr_demo['icon_clear'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_qr_demo_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_qr_demo_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_qr__uri_bog_qr_demo_22 = $mol_type_enforce<
		ReturnType< $bog_qr_demo['custom_uri'] >
		,
		ReturnType< $bog_qr['uri'] >
	>
	type $bog_qr__gradient_angle_bog_qr_demo_23 = $mol_type_enforce<
		number
		,
		ReturnType< $bog_qr['gradient_angle'] >
	>
	type $bog_qr__error_correction_bog_qr_demo_24 = $mol_type_enforce<
		ReturnType< $bog_qr_demo['preview_ec'] >
		,
		ReturnType< $bog_qr['error_correction'] >
	>
	type $bog_qr__gradient_stops_bog_qr_demo_25 = $mol_type_enforce<
		ReturnType< $bog_qr_demo['preset_stops'] >
		,
		ReturnType< $bog_qr['gradient_stops'] >
	>
	type $bog_qr__center_bog_qr_demo_26 = $mol_type_enforce<
		ReturnType< $bog_qr_demo['preview_center'] >
		,
		ReturnType< $bog_qr['center'] >
	>
	type $mol_button_major__click_bog_qr_demo_27 = $mol_type_enforce<
		ReturnType< $bog_qr_demo['download'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__sub_bog_qr_demo_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_list__rows_bog_qr_demo_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $bog_qr_demo extends $mol_example_small {
		Simple( ): $bog_qr
		Gradient( ): $bog_qr
		Logo( ): $mol_icon
		With_logo( ): $bog_qr
		Interactive_title( ): $mol_view
		custom_uri( next?: string ): string
		Url_input( ): $mol_string
		preset( next?: string ): string
		Preset_switch( ): $mol_switch
		icon_pick( next?: any ): any
		Icon_upload( ): $mol_button_minor
		icon_clear( next?: any ): any
		Icon_clear( ): $mol_button_minor
		Icon_row( ): $mol_view
		preview_ec( ): string
		preset_stops( ): readonly(any)[]
		preview_center( ): readonly(any)[]
		Preview( ): $bog_qr
		download( next?: any ): any
		Download( ): $mol_button_major
		Interactive( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map