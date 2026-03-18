declare namespace $ {

	type $mol_svg__dom_name_bog_qr_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_svg['dom_name'] >
	>
	type $mol_svg__attr_bog_qr_2 = $mol_type_enforce<
		({ 
			'id': ReturnType< $bog_qr['gradient_id'] >,
			'x1': ReturnType< $bog_qr['grad_x1'] >,
			'y1': ReturnType< $bog_qr['grad_y1'] >,
			'x2': ReturnType< $bog_qr['grad_x2'] >,
			'y2': ReturnType< $bog_qr['grad_y2'] >,
		})  & ReturnType< $mol_svg['attr'] >
		,
		ReturnType< $mol_svg['attr'] >
	>
	type $mol_svg__sub_bog_qr_3 = $mol_type_enforce<
		ReturnType< $bog_qr['gradient_stop_list'] >
		,
		ReturnType< $mol_svg['sub'] >
	>
	type $mol_svg__dom_name_bog_qr_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_svg['dom_name'] >
	>
	type $mol_svg__sub_bog_qr_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_svg['sub'] >
	>
	type $mol_svg_path__geometry_bog_qr_6 = $mol_type_enforce<
		ReturnType< $bog_qr['modules_d'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	type $mol_svg_path__attr_bog_qr_7 = $mol_type_enforce<
		({ 
			'fill': ReturnType< $bog_qr['gradient_fill'] >,
		})  & ReturnType< $mol_svg_path['attr'] >
		,
		ReturnType< $mol_svg_path['attr'] >
	>
	type $mol_svg_path__geometry_bog_qr_8 = $mol_type_enforce<
		ReturnType< $bog_qr['rings_d'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	type $mol_svg_path__attr_bog_qr_9 = $mol_type_enforce<
		({ 
			'fill': ReturnType< $bog_qr['gradient_fill'] >,
			'fill-rule': string,
		})  & ReturnType< $mol_svg_path['attr'] >
		,
		ReturnType< $mol_svg_path['attr'] >
	>
	type $mol_svg_path__geometry_bog_qr_10 = $mol_type_enforce<
		ReturnType< $bog_qr['centers_d'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	type $mol_svg_path__attr_bog_qr_11 = $mol_type_enforce<
		({ 
			'fill': ReturnType< $bog_qr['gradient_fill'] >,
		})  & ReturnType< $mol_svg_path['attr'] >
		,
		ReturnType< $mol_svg_path['attr'] >
	>
	type $mol_view__sub_bog_qr_12 = $mol_type_enforce<
		ReturnType< $bog_qr['center'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_svg__dom_name_bog_qr_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_svg['dom_name'] >
	>
	type $mol_svg__attr_bog_qr_14 = $mol_type_enforce<
		({ 
			'x': ReturnType< $bog_qr['center_x'] >,
			'y': ReturnType< $bog_qr['center_y'] >,
			'width': ReturnType< $bog_qr['center_size'] >,
			'height': ReturnType< $bog_qr['center_size'] >,
		})  & ReturnType< $mol_svg['attr'] >
		,
		ReturnType< $mol_svg['attr'] >
	>
	type $mol_svg__sub_bog_qr_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_svg['sub'] >
	>
	type $mol_svg__dom_name_bog_qr_16 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_svg['dom_name'] >
	>
	type $mol_svg__attr_bog_qr_17 = $mol_type_enforce<
		({ 
			'offset': ReturnType< $bog_qr['stop_offset'] >,
			'stop-color': ReturnType< $bog_qr['stop_color'] >,
		})  & ReturnType< $mol_svg['attr'] >
		,
		ReturnType< $mol_svg['attr'] >
	>
	export class $bog_qr extends $mol_svg_root {
		stop_offset( id: any): string
		stop_color( id: any): string
		qr_view_box( ): string
		grad_x1( ): string
		grad_y1( ): string
		grad_x2( ): string
		grad_y2( ): string
		gradient_stop_list( ): readonly(any)[]
		Gradient( ): $mol_svg
		Defs( ): $mol_svg
		modules_d( ): string
		Modules( ): $mol_svg_path
		rings_d( ): string
		Rings( ): $mol_svg_path
		centers_d( ): string
		Centers( ): $mol_svg_path
		center_x( ): string
		center_y( ): string
		center_size( ): string
		Center_body( ): $mol_view
		Center_wrap( ): $mol_svg
		uri( ): string
		module_radius( ): number
		finder_radius( ): number
		gradient_angle( ): number
		error_correction( ): string
		quiet_zone( ): number
		center( ): readonly(any)[]
		gradient_id( ): string
		gradient_fill( ): string
		gradient_stops( ): readonly(any)[]
		Stop( id: any): $mol_svg
		view_box( ): ReturnType< $bog_qr['qr_view_box'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=qr.view.tree.d.ts.map