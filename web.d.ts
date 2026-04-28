declare namespace $ {

	export class $mol_scroll extends $mol_view {
		tabindex( ): number
		event_scroll( next?: any ): any
		scroll_top( next?: number ): number
		scroll_left( next?: number ): number
		attr( ): ({ 
			'tabindex': ReturnType< $mol_scroll['tabindex'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			scroll( next?: ReturnType< $mol_scroll['event_scroll'] > ): ReturnType< $mol_scroll['event_scroll'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=scroll.view.tree.d.ts.map
declare namespace $ {

	type $mol_book2_sub__1 = $mol_type_enforce<
		ReturnType< $mol_book2['pages'] >[number]
		,
		$mol_view
	>
	type $mol_book2_sub__2 = $mol_type_enforce<
		ReturnType< $mol_book2['placeholders'] >[number]
		,
		$mol_view
	>
	type $mol_view__title_mol_book2_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['title'] >
	>
	export class $mol_book2 extends $mol_scroll {
		pages_deep( ): readonly($mol_view)[]
		pages( ): ReturnType< $mol_book2['pages_deep'] >
		Placeholder( ): $mol_view
		placeholders( ): readonly($mol_view)[]
		menu_title( ): string
		sub( ): readonly($mol_view)[]
		minimal_width( ): number
		Gap( id: any): $mol_view
	}
	
}

//# sourceMappingURL=book2.view.tree.d.ts.map
declare namespace $ {

	export class $mol_theme_auto extends $mol_plugin {
		dark( ): string
		theme( ): ReturnType< $mol_theme_auto['dark'] >
		light( ): string
		attr( ): ({ 
			'mol_theme': ReturnType< $mol_theme_auto['theme'] >,
		}) 
	}
	
}

//# sourceMappingURL=auto.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg extends $mol_view {
		dom_name( ): string
		dom_name_space( ): string
		font_size( ): number
		font_family( ): string
		style_size( ): Record<string, any>
	}
	
}

//# sourceMappingURL=svg.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_root extends $mol_svg {
		view_box( ): string
		aspect( ): string
		dom_name( ): string
		attr( ): ({ 
			'viewBox': ReturnType< $mol_svg_root['view_box'] >,
			'preserveAspectRatio': ReturnType< $mol_svg_root['aspect'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=root.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_path extends $mol_svg {
		geometry( ): string
		dom_name( ): string
		attr( ): ({ 
			'd': ReturnType< $mol_svg_path['geometry'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=path.view.tree.d.ts.map
declare namespace $ {

	type $mol_svg_path__geometry_mol_icon_1 = $mol_type_enforce<
		ReturnType< $mol_icon['path'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	export class $mol_icon extends $mol_svg_root {
		path( ): string
		Path( ): $mol_svg_path
		view_box( ): string
		minimal_width( ): number
		minimal_height( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_view_grid extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=grid.view.tree.d.ts.map
declare namespace $ {

	export class $mol_speck extends $mol_view {
		value( ): any
		theme( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=speck.view.tree.d.ts.map
declare namespace $ {

	type $mol_speck__value_mol_button_1 = $mol_type_enforce<
		ReturnType< $mol_button['error'] >
		,
		ReturnType< $mol_speck['value'] >
	>
	export class $mol_button extends $mol_view {
		event_activate( next?: any ): any
		activate( next?: ReturnType< $mol_button['event_activate'] > ): ReturnType< $mol_button['event_activate'] >
		clicks( next?: any ): any
		event_key_press( next?: any ): any
		key_press( next?: ReturnType< $mol_button['event_key_press'] > ): ReturnType< $mol_button['event_key_press'] >
		disabled( ): boolean
		tab_index( ): number
		hint( ): string
		hint_safe( ): ReturnType< $mol_button['hint'] >
		error( ): string
		enabled( ): boolean
		click( next?: any ): any
		event_click( next?: any ): any
		status( next?: readonly(any)[] ): readonly(any)[]
		event( ): ({ 
			click( next?: ReturnType< $mol_button['activate'] > ): ReturnType< $mol_button['activate'] >,
			dblclick( next?: ReturnType< $mol_button['clicks'] > ): ReturnType< $mol_button['clicks'] >,
			keydown( next?: ReturnType< $mol_button['key_press'] > ): ReturnType< $mol_button['key_press'] >,
		})  & ReturnType< $mol_view['event'] >
		attr( ): ({ 
			'disabled': ReturnType< $mol_button['disabled'] >,
			'role': string,
			'tabindex': ReturnType< $mol_button['tab_index'] >,
			'title': ReturnType< $mol_button['hint_safe'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view_content)[]
		Speck( ): $mol_speck
	}
	
}

//# sourceMappingURL=button.view.tree.d.ts.map
declare namespace $ {

	export class $mol_button_typed extends $mol_button {
		minimal_height( ): number
		minimal_width( ): number
	}
	
}

//# sourceMappingURL=typed.view.tree.d.ts.map
declare namespace $ {

	export class $mol_button_minor extends $mol_button_typed {
	}
	
}

//# sourceMappingURL=minor.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_sidebar_item_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_sidebar_item extends $mol_button_minor {
		Label( ): $mol_view
		Icon( ): $mol_icon
		label( ): string
		active( ): boolean
		collapsed( next?: boolean ): boolean
		sub( ): readonly(any)[]
		attr( ): ({ 
			'bog_ui_sidebar_item_active': ReturnType< $bog_ui_sidebar_item['active'] >,
			'bog_ui_sidebar_item_collapsed': ReturnType< $bog_ui_sidebar_item['collapsed'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
	}
	
}

//# sourceMappingURL=item.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_tag extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=tag.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_file extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=file.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_rectangle extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=rectangle.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_navigation extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=navigation.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_dock_left extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=left.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_card extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=card.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_bell extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=bell.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_console extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=console.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_table extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=table.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_minus extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=minus.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__style_mol_list_1 = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_before'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__style_mol_list_2 = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_after'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	export class $mol_list extends $mol_view {
		gap_before( ): number
		Gap_before( ): $mol_view
		Empty( ): $mol_view
		gap_after( ): number
		Gap_after( ): $mol_view
		rows( ): readonly($mol_view)[]
		render_visible_only( ): boolean
		render_over( ): number
		sub( ): ReturnType< $mol_list['rows'] >
		item_height_min( id: any): number
		item_width_min( id: any): number
		view_window_shift( next?: number ): number
		view_window( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_menu extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=menu.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_sidebar_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows_bog_ui_sidebar_2 = $mol_type_enforce<
		ReturnType< $bog_ui_sidebar['items_with_collapsed'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_view__sub_bog_ui_sidebar_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_ui_sidebar_4 = $mol_type_enforce<
		ReturnType< $bog_ui_sidebar['toggle'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_sidebar_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $bog_ui_sidebar extends $mol_view {
		Header( ): $mol_view
		items_with_collapsed( ): readonly(any)[]
		Items( ): $mol_list
		Footer( ): $mol_view
		toggle( next?: any ): any
		Toggle_icon( ): $mol_icon_menu
		Toggle( ): $mol_button_minor
		mode( next?: string ): string
		items( ): readonly(any)[]
		sub( ): readonly(any)[]
		attr( ): ({ 
			'bog_ui_sidebar_mode': ReturnType< $bog_ui_sidebar['mode'] >,
		}) 
	}
	
}

//# sourceMappingURL=sidebar.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_mol_check_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_check extends $mol_button_minor {
		checked( next?: boolean ): boolean
		aria_checked( ): string
		aria_role( ): string
		Icon( ): any
		title( ): string
		Title( ): $mol_view
		label( ): readonly(any)[]
		attr( ): ({ 
			'mol_check_checked': ReturnType< $mol_check['checked'] >,
			'aria-checked': ReturnType< $mol_check['aria_checked'] >,
			'role': ReturnType< $mol_check['aria_role'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		sub( ): readonly($mol_view_content)[]
	}
	
}

//# sourceMappingURL=check.view.tree.d.ts.map
declare namespace $ {

	export class $mol_check_icon extends $mol_check {
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_brightness_4 extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=4.view.tree.d.ts.map
declare namespace $ {

	export class $mol_lights_toggle extends $mol_check_icon {
		Lights_icon( ): $mol_icon_brightness_4
		lights( next?: boolean ): boolean
		Icon( ): ReturnType< $mol_lights_toggle['Lights_icon'] >
		hint( ): string
		checked( next?: ReturnType< $mol_lights_toggle['lights'] > ): ReturnType< $mol_lights_toggle['lights'] >
	}
	
}

//# sourceMappingURL=toggle.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__dom_name_mol_page_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_page_2 = $mol_type_enforce<
		ReturnType< $mol_page['title_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_page_3 = $mol_type_enforce<
		ReturnType< $mol_page['tools'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height_mol_page_4 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__dom_name_mol_page_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_page_6 = $mol_type_enforce<
		ReturnType< $mol_page['head'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type __mol_page_7 = $mol_type_enforce<
		Parameters< $mol_page['body_scroll_top'] >[0]
		,
		Parameters< ReturnType< $mol_page['Body'] >['scroll_top'] >[0]
	>
	type $mol_view__sub_mol_page_8 = $mol_type_enforce<
		ReturnType< $mol_page['body'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_scroll__sub_mol_page_9 = $mol_type_enforce<
		ReturnType< $mol_page['body_content'] >
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_view__dom_name_mol_page_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_page_11 = $mol_type_enforce<
		ReturnType< $mol_page['foot'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_page extends $mol_view {
		tabindex( ): number
		Logo( ): any
		title_content( ): readonly(any)[]
		Title( ): $mol_view
		tools( ): readonly($mol_view_content)[]
		Tools( ): $mol_view
		head( ): readonly(any)[]
		Head( ): $mol_view
		body_scroll_top( next?: ReturnType< ReturnType< $mol_page['Body'] >['scroll_top'] > ): ReturnType< ReturnType< $mol_page['Body'] >['scroll_top'] >
		body( ): readonly($mol_view)[]
		Body_content( ): $mol_view
		body_content( ): readonly(any)[]
		Body( ): $mol_scroll
		foot( ): readonly($mol_view)[]
		Foot( ): $mol_view
		dom_name( ): string
		attr( ): ({ 
			'tabIndex': ReturnType< $mol_page['tabindex'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=page.view.tree.d.ts.map
declare namespace $ {

	export class $mol_hotkey extends $mol_plugin {
		keydown( next?: any ): any
		event( ): ({ 
			keydown( next?: ReturnType< $mol_hotkey['keydown'] > ): ReturnType< $mol_hotkey['keydown'] >,
		})  & ReturnType< $mol_plugin['event'] >
		key( ): Record<string, any>
		mod_ctrl( ): boolean
		mod_alt( ): boolean
		mod_shift( ): boolean
	}
	
}

//# sourceMappingURL=hotkey.view.tree.d.ts.map
declare namespace $ {

	type $mol_hotkey__mod_ctrl_mol_string_1 = $mol_type_enforce<
		ReturnType< $mol_string['submit_with_ctrl'] >
		,
		ReturnType< $mol_hotkey['mod_ctrl'] >
	>
	type $mol_hotkey__key_mol_string_2 = $mol_type_enforce<
		({ 
			enter( next?: ReturnType< $mol_string['submit'] > ): ReturnType< $mol_string['submit'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	export class $mol_string extends $mol_view {
		selection_watcher( ): any
		error_report( ): any
		disabled( ): boolean
		value( next?: string ): string
		value_changed( next?: ReturnType< $mol_string['value'] > ): ReturnType< $mol_string['value'] >
		hint( ): string
		hint_visible( ): ReturnType< $mol_string['hint'] >
		spellcheck( ): boolean
		autocomplete_native( ): string
		selection_end( ): number
		selection_start( ): number
		keyboard( ): string
		enter( ): string
		length_max( ): number
		type( next?: string ): string
		event_change( next?: any ): any
		submit_with_ctrl( ): boolean
		submit( next?: any ): any
		Submit( ): $mol_hotkey
		dom_name( ): string
		enabled( ): boolean
		minimal_height( ): number
		autocomplete( ): boolean
		selection( next?: readonly(number)[] ): readonly(number)[]
		auto( ): readonly(any)[]
		field( ): ({ 
			'disabled': ReturnType< $mol_string['disabled'] >,
			'value': ReturnType< $mol_string['value_changed'] >,
			'placeholder': ReturnType< $mol_string['hint_visible'] >,
			'spellcheck': ReturnType< $mol_string['spellcheck'] >,
			'autocomplete': ReturnType< $mol_string['autocomplete_native'] >,
			'selectionEnd': ReturnType< $mol_string['selection_end'] >,
			'selectionStart': ReturnType< $mol_string['selection_start'] >,
			'inputMode': ReturnType< $mol_string['keyboard'] >,
			'enterkeyhint': ReturnType< $mol_string['enter'] >,
		})  & ReturnType< $mol_view['field'] >
		attr( ): ({ 
			'maxlength': ReturnType< $mol_string['length_max'] >,
			'type': ReturnType< $mol_string['type'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			input( next?: ReturnType< $mol_string['event_change'] > ): ReturnType< $mol_string['event_change'] >,
		})  & ReturnType< $mol_view['event'] >
		plugins( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=string.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__event_bog_ui_command_1 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_ui_command['backdrop_click'] > ): ReturnType< $bog_ui_command['backdrop_click'] >,
		}) 
		,
		ReturnType< $mol_view['event'] >
	>
	type $mol_string__hint_bog_ui_command_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_bog_ui_command_3 = $mol_type_enforce<
		ReturnType< $bog_ui_command['query'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_list__rows_bog_ui_command_4 = $mol_type_enforce<
		ReturnType< $bog_ui_command['result_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_view__event_bog_ui_command_5 = $mol_type_enforce<
		({ 
			keydown( next?: ReturnType< $bog_ui_command['key_down'] > ): ReturnType< $bog_ui_command['key_down'] >,
		}) 
		,
		ReturnType< $mol_view['event'] >
	>
	type $mol_view__sub_bog_ui_command_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_command extends $mol_view {
		backdrop_click( next?: any ): any
		Backdrop( ): $mol_view
		key_down( next?: any ): any
		Search( ): $mol_string
		result_rows( ): readonly(any)[]
		Results( ): $mol_list
		Dialog( ): $mol_view
		showed( next?: boolean ): boolean
		query( next?: string ): string
		commands( ): readonly(any)[]
		filtered( ): readonly(any)[]
		selected( next?: number ): number
		sub( ): readonly(any)[]
		attr( ): ({ 
			'bog_ui_command_showed': ReturnType< $bog_ui_command['showed'] >,
		}) 
	}
	
	type $mol_view__sub_bog_ui_command_group_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_command_group extends $mol_view {
		Title( ): $mol_view
		title( ): string
		sub( ): readonly(any)[]
	}
	
	type $mol_view__sub_bog_ui_command_item_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_command_item_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_command_item extends $mol_button_minor {
		execute( next?: any ): any
		Label( ): $mol_view
		Shortcut( ): $mol_view
		label( ): string
		shortcut( ): string
		active( ): boolean
		click( next?: ReturnType< $bog_ui_command_item['execute'] > ): ReturnType< $bog_ui_command_item['execute'] >
		sub( ): readonly(any)[]
		attr( ): ({ 
			'bog_ui_command_item_active': ReturnType< $bog_ui_command_item['active'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
	}
	
}

//# sourceMappingURL=command.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_badge_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_badge extends $mol_view {
		Label( ): $mol_view
		label( ): string
		type( ): string
		sub( ): readonly(any)[]
		attr( ): ({ 
			'bog_ui_badge_type': ReturnType< $bog_ui_badge['type'] >,
		}) 
	}
	
}

//# sourceMappingURL=badge.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_app_badge_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_badge_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_badge__label_bog_ui_app_badge_3 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['label'] >
	>
	type $bog_ui_badge__type_bog_ui_app_badge_4 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['type'] >
	>
	type $bog_ui_badge__label_bog_ui_app_badge_5 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['label'] >
	>
	type $bog_ui_badge__type_bog_ui_app_badge_6 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['type'] >
	>
	type $bog_ui_badge__label_bog_ui_app_badge_7 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['label'] >
	>
	type $bog_ui_badge__type_bog_ui_app_badge_8 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['type'] >
	>
	type $bog_ui_badge__label_bog_ui_app_badge_9 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['label'] >
	>
	type $bog_ui_badge__type_bog_ui_app_badge_10 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['type'] >
	>
	type $bog_ui_badge__label_bog_ui_app_badge_11 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['label'] >
	>
	type $bog_ui_badge__type_bog_ui_app_badge_12 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['type'] >
	>
	type $mol_view__sub_bog_ui_app_badge_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_app_badge extends $mol_page {
		description( ): string
		Description( ): $mol_view
		variants_title( ): string
		Variants_title( ): $mol_view
		Default_badge( ): $bog_ui_badge
		Success_badge( ): $bog_ui_badge
		Warning_badge( ): $bog_ui_badge
		Error_badge( ): $bog_ui_badge
		Info_badge( ): $bog_ui_badge
		Variants( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=badge.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_magnify extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=magnify.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_empty_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_empty_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_empty extends $mol_view {
		Icon( ): $mol_icon_magnify
		title( ): string
		Title( ): $mol_view
		message( ): string
		Message( ): $mol_view
		Action( ): any
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=empty.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_folder extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=folder.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_plus extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=plus.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_plus_circle extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=circle.view.tree.d.ts.map
declare namespace $ {

	export class $mol_button_major extends $mol_button_minor {
		theme( ): string
	}
	
}

//# sourceMappingURL=major.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_app_empty_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_empty_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_empty_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_empty__Icon_bog_ui_app_empty_4 = $mol_type_enforce<
		ReturnType< $bog_ui_app_empty['Custom_icon_icon'] >
		,
		ReturnType< $bog_ui_empty['Icon'] >
	>
	type $bog_ui_empty__title_bog_ui_app_empty_5 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_empty['title'] >
	>
	type $bog_ui_empty__message_bog_ui_app_empty_6 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_empty['message'] >
	>
	type $mol_view__sub_bog_ui_app_empty_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_major__sub_bog_ui_app_empty_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $bog_ui_empty__Icon_bog_ui_app_empty_9 = $mol_type_enforce<
		ReturnType< $bog_ui_app_empty['Action_icon'] >
		,
		ReturnType< $bog_ui_empty['Icon'] >
	>
	type $bog_ui_empty__title_bog_ui_app_empty_10 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_empty['title'] >
	>
	type $bog_ui_empty__message_bog_ui_app_empty_11 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_empty['message'] >
	>
	type $bog_ui_empty__Action_bog_ui_app_empty_12 = $mol_type_enforce<
		ReturnType< $bog_ui_app_empty['Action_button'] >
		,
		ReturnType< $bog_ui_empty['Action'] >
	>
	export class $bog_ui_app_empty extends $mol_page {
		description( ): string
		Description( ): $mol_view
		section_default_title( ): string
		Section_default( ): $mol_view
		Default( ): $bog_ui_empty
		section_custom_title( ): string
		Section_custom( ): $mol_view
		Custom_icon_icon( ): $mol_icon_folder
		Custom_icon( ): $bog_ui_empty
		section_action_title( ): string
		Section_action( ): $mol_view
		Action_icon( ): $mol_icon_plus_circle
		action_label( ): string
		Action_button( ): $mol_button_major
		With_action( ): $bog_ui_empty
		title( ): string
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=empty.view.tree.d.ts.map
declare namespace $ {

	export class $bog_ui_skeleton extends $mol_view {
	}
	
}

//# sourceMappingURL=skeleton.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_app_skeleton_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_skeleton_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_skeleton_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_skeleton_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_skeleton_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_skeleton_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_app_skeleton extends $mol_page {
		description( ): string
		Description( ): $mol_view
		section_single_title( ): string
		Section_single( ): $mol_view
		Single( ): $bog_ui_skeleton
		section_card_title( ): string
		Section_card( ): $mol_view
		Card_avatar( ): $bog_ui_skeleton
		Card_title( ): $bog_ui_skeleton
		Card_line1( ): $bog_ui_skeleton
		Card_line2( ): $bog_ui_skeleton
		Card_short( ): $bog_ui_skeleton
		Card( ): $mol_view
		section_sizes_title( ): string
		Section_sizes( ): $mol_view
		Size_small( ): $bog_ui_skeleton
		Size_medium( ): $bog_ui_skeleton
		Size_large( ): $bog_ui_skeleton
		Sizes( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=skeleton.view.tree.d.ts.map
declare namespace $ {

	export class $mol_link extends $mol_view {
		uri_toggle( ): string
		hint( ): string
		hint_safe( ): ReturnType< $mol_link['hint'] >
		target( ): string
		file_name( ): string
		current( ): boolean
		relation( ): string
		event_click( next?: any ): any
		click( next?: ReturnType< $mol_link['event_click'] > ): ReturnType< $mol_link['event_click'] >
		uri( ): string
		dom_name( ): string
		uri_off( ): string
		uri_native( ): any
		external( ): boolean
		attr( ): ({ 
			'href': ReturnType< $mol_link['uri_toggle'] >,
			'title': ReturnType< $mol_link['hint_safe'] >,
			'target': ReturnType< $mol_link['target'] >,
			'download': ReturnType< $mol_link['file_name'] >,
			'mol_link_current': ReturnType< $mol_link['current'] >,
			'rel': ReturnType< $mol_link['relation'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view_content)[]
		arg( ): Record<string, any>
		event( ): ({ 
			click( next?: ReturnType< $mol_link['click'] > ): ReturnType< $mol_link['click'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=link.view.tree.d.ts.map
declare namespace $ {

	type $mol_link__title_bog_ui_breadcrumb_1 = $mol_type_enforce<
		ReturnType< $bog_ui_breadcrumb['crumb_title'] >
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__uri_bog_ui_breadcrumb_2 = $mol_type_enforce<
		ReturnType< $bog_ui_breadcrumb['crumb_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_view__sub_bog_ui_breadcrumb_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_breadcrumb_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_breadcrumb extends $mol_view {
		last_title( ): string
		items( ): readonly(any)[]
		crumbs( ): readonly(any)[]
		crumb_title( id: any): string
		crumb_uri( id: any): string
		Crumb( id: any): $mol_link
		Sep( id: any): $mol_view
		Last( ): $mol_view
		sub( ): ReturnType< $bog_ui_breadcrumb['items'] >
	}
	
}

//# sourceMappingURL=breadcrumb.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_app_breadcrumb_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_breadcrumb_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_breadcrumb__crumbs_bog_ui_app_breadcrumb_3 = $mol_type_enforce<
		ReturnType< $bog_ui_app_breadcrumb['short_crumbs'] >
		,
		ReturnType< $bog_ui_breadcrumb['crumbs'] >
	>
	type $mol_view__sub_bog_ui_app_breadcrumb_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_breadcrumb__crumbs_bog_ui_app_breadcrumb_5 = $mol_type_enforce<
		ReturnType< $bog_ui_app_breadcrumb['long_crumbs'] >
		,
		ReturnType< $bog_ui_breadcrumb['crumbs'] >
	>
	export class $bog_ui_app_breadcrumb extends $mol_page {
		description( ): string
		Description( ): $mol_view
		short_title( ): string
		Short_title( ): $mol_view
		short_crumbs( ): readonly(any)[]
		Short( ): $bog_ui_breadcrumb
		long_title( ): string
		Long_title( ): $mol_view
		long_crumbs( ): readonly(any)[]
		Long( ): $bog_ui_breadcrumb
		title( ): string
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=breadcrumb.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_home extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=home.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_account extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=account.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_cog extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=cog.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_app_sidebar_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sidebar_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_ui_app_sidebar_3 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sidebar['set_dock'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_app_sidebar_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_bog_ui_app_sidebar_5 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sidebar['set_rail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_app_sidebar_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_bog_ui_app_sidebar_7 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sidebar['set_hidden'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_app_sidebar_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sidebar_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sidebar_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_sidebar_11 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sidebar['Preview_icon_home'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_sidebar_12 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_sidebar_13 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sidebar['Preview_icon_users'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_sidebar_14 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_sidebar_15 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sidebar['Preview_icon_settings'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_sidebar_16 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar__mode_bog_ui_app_sidebar_17 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sidebar['preview_mode'] >
		,
		ReturnType< $bog_ui_sidebar['mode'] >
	>
	type $bog_ui_sidebar__items_bog_ui_app_sidebar_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_ui_sidebar['items'] >
	>
	type $mol_view__sub_bog_ui_app_sidebar_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sidebar_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_app_sidebar extends $mol_page {
		description( ): string
		Description( ): $mol_view
		mode_title( ): string
		Mode_title( ): $mol_view
		set_dock( next?: any ): any
		dock_label( ): string
		Dock_button( ): $mol_button_minor
		set_rail( next?: any ): any
		rail_label( ): string
		Rail_button( ): $mol_button_minor
		set_hidden( next?: any ): any
		hidden_label( ): string
		Hidden_button( ): $mol_button_minor
		Mode_buttons( ): $mol_view
		current_mode_text( ): string
		Current_mode( ): $mol_view
		preview_mode( next?: string ): string
		Preview_icon_home( ): $mol_icon_home
		Preview_item_home( ): $bog_ui_sidebar_item
		Preview_icon_users( ): $mol_icon_account
		Preview_item_users( ): $bog_ui_sidebar_item
		Preview_icon_settings( ): $mol_icon_cog
		Preview_item_settings( ): $bog_ui_sidebar_item
		Preview_sidebar( ): $bog_ui_sidebar
		preview_content_text( ): string
		Preview_content( ): $mol_view
		Preview( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=sidebar.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__event_bog_ui_sheet_1 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_ui_sheet['backdrop_click'] > ): ReturnType< $bog_ui_sheet['backdrop_click'] >,
		}) 
		,
		ReturnType< $mol_view['event'] >
	>
	type $mol_list__rows_bog_ui_sheet_2 = $mol_type_enforce<
		ReturnType< $bog_ui_sheet['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_view__sub_bog_ui_sheet_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_sheet extends $mol_view {
		backdrop_click( next?: any ): any
		Backdrop( ): $mol_view
		Content( ): $mol_list
		Panel( ): $mol_view
		showed( next?: boolean ): boolean
		side( ): string
		content( ): readonly(any)[]
		sub( ): readonly(any)[]
		attr( ): ({ 
			'bog_ui_sheet_showed': ReturnType< $bog_ui_sheet['showed'] >,
			'bog_ui_sheet_side': ReturnType< $bog_ui_sheet['side'] >,
		}) 
	}
	
}

//# sourceMappingURL=sheet.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_app_sheet_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_ui_app_sheet_3 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sheet['open_top'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_app_sheet_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_bog_ui_app_sheet_5 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sheet['open_right'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_app_sheet_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_bog_ui_app_sheet_7 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sheet['open_bottom'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_app_sheet_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_bog_ui_app_sheet_9 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sheet['open_left'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_app_sheet_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_sheet__showed_bog_ui_app_sheet_15 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sheet['top_showed'] >
		,
		ReturnType< $bog_ui_sheet['showed'] >
	>
	type $bog_ui_sheet__side_bog_ui_app_sheet_16 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sheet['side'] >
	>
	type $bog_ui_sheet__content_bog_ui_app_sheet_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_ui_sheet['content'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_string__hint_bog_ui_app_sheet_21 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_bog_ui_app_sheet_22 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sheet['right_name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_bog_ui_app_sheet_23 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_bog_ui_app_sheet_24 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sheet['right_email'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_sheet__showed_bog_ui_app_sheet_26 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sheet['right_showed'] >
		,
		ReturnType< $bog_ui_sheet['showed'] >
	>
	type $bog_ui_sheet__side_bog_ui_app_sheet_27 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sheet['side'] >
	>
	type $bog_ui_sheet__content_bog_ui_app_sheet_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_ui_sheet['content'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_sheet__showed_bog_ui_app_sheet_32 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sheet['bottom_showed'] >
		,
		ReturnType< $bog_ui_sheet['showed'] >
	>
	type $bog_ui_sheet__side_bog_ui_app_sheet_33 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sheet['side'] >
	>
	type $bog_ui_sheet__content_bog_ui_app_sheet_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_ui_sheet['content'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_35 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_36 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_sheet_37 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_sheet__showed_bog_ui_app_sheet_38 = $mol_type_enforce<
		ReturnType< $bog_ui_app_sheet['left_showed'] >
		,
		ReturnType< $bog_ui_sheet['showed'] >
	>
	type $bog_ui_sheet__side_bog_ui_app_sheet_39 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sheet['side'] >
	>
	type $bog_ui_sheet__content_bog_ui_app_sheet_40 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_ui_sheet['content'] >
	>
	export class $bog_ui_app_sheet extends $mol_page {
		description( ): string
		Description( ): $mol_view
		buttons_title( ): string
		Buttons_title( ): $mol_view
		open_top( next?: any ): any
		top_label( ): string
		Top_button( ): $mol_button_minor
		open_right( next?: any ): any
		right_label( ): string
		Right_button( ): $mol_button_minor
		open_bottom( next?: any ): any
		bottom_label( ): string
		Bottom_button( ): $mol_button_minor
		open_left( next?: any ): any
		left_label( ): string
		Left_button( ): $mol_button_minor
		Buttons( ): $mol_view
		top_showed( next?: boolean ): boolean
		top_heading( ): string
		Top_heading( ): $mol_view
		top_text( ): string
		Top_text( ): $mol_view
		Top_content( ): $mol_view
		Sheet_top( ): $bog_ui_sheet
		right_showed( next?: boolean ): boolean
		right_heading( ): string
		Right_heading( ): $mol_view
		right_text( ): string
		Right_text( ): $mol_view
		right_form_title( ): string
		Right_form_title( ): $mol_view
		right_name( next?: string ): string
		Right_name( ): $mol_string
		right_email( next?: string ): string
		Right_email( ): $mol_string
		Right_content( ): $mol_view
		Sheet_right( ): $bog_ui_sheet
		bottom_showed( next?: boolean ): boolean
		bottom_heading( ): string
		Bottom_heading( ): $mol_view
		bottom_text( ): string
		Bottom_text( ): $mol_view
		Bottom_content( ): $mol_view
		Sheet_bottom( ): $bog_ui_sheet
		left_showed( next?: boolean ): boolean
		left_heading( ): string
		Left_heading( ): $mol_view
		left_text( ): string
		Left_text( ): $mol_view
		Left_content( ): $mol_view
		Sheet_left( ): $bog_ui_sheet
		title( ): string
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=sheet.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_information extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=information.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_close extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=close.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_check extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=check.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_check_circle extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=circle.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_alert extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=alert.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_alert_circle extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=circle.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_toast_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_ui_toast_2 = $mol_type_enforce<
		ReturnType< $bog_ui_toast['close'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_toast_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $bog_ui_toast extends $mol_view {
		Icon( ): $mol_icon_information
		Body( ): $mol_view
		Close_icon( ): $mol_icon_close
		Close( ): $mol_button_minor
		message( ): string
		type( ): string
		closeable( ): boolean
		close( next?: any ): any
		sub( ): readonly(any)[]
		attr( ): ({ 
			'bog_ui_toast_type': ReturnType< $bog_ui_toast['type'] >,
			'bog_ui_toast_closeable': ReturnType< $bog_ui_toast['closeable'] >,
		}) 
	}
	
}

//# sourceMappingURL=toast.view.tree.d.ts.map
declare namespace $ {

	type $bog_ui_toast__message_bog_ui_toast_manager_1 = $mol_type_enforce<
		ReturnType< $bog_ui_toast_manager['toast_message'] >
		,
		ReturnType< $bog_ui_toast['message'] >
	>
	type $bog_ui_toast__type_bog_ui_toast_manager_2 = $mol_type_enforce<
		ReturnType< $bog_ui_toast_manager['toast_type'] >
		,
		ReturnType< $bog_ui_toast['type'] >
	>
	type $bog_ui_toast__close_bog_ui_toast_manager_3 = $mol_type_enforce<
		ReturnType< $bog_ui_toast_manager['toast_close'] >
		,
		ReturnType< $bog_ui_toast['close'] >
	>
	export class $bog_ui_toast_manager extends $mol_view {
		toast_message( id: any): string
		toast_type( id: any): string
		toast_close( id: any, next?: any ): any
		toast_views( ): readonly(any)[]
		toast_data( ): readonly(any)[]
		Toast( id: any): $bog_ui_toast
		sub( ): ReturnType< $bog_ui_toast_manager['toast_views'] >
	}
	
}

//# sourceMappingURL=manager.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_app_toast_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_toast_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_ui_app_toast_3 = $mol_type_enforce<
		ReturnType< $bog_ui_app_toast['add_info'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_app_toast_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_bog_ui_app_toast_5 = $mol_type_enforce<
		ReturnType< $bog_ui_app_toast['add_success'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_app_toast_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_bog_ui_app_toast_7 = $mol_type_enforce<
		ReturnType< $bog_ui_app_toast['add_warning'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_app_toast_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_bog_ui_app_toast_9 = $mol_type_enforce<
		ReturnType< $bog_ui_app_toast['add_error'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_app_toast_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_ui_app_toast_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_app_toast extends $mol_page {
		description( ): string
		Description( ): $mol_view
		buttons_title( ): string
		Buttons_title( ): $mol_view
		add_info( next?: any ): any
		info_label( ): string
		Info_button( ): $mol_button_minor
		add_success( next?: any ): any
		success_label( ): string
		Success_button( ): $mol_button_minor
		add_warning( next?: any ): any
		warning_label( ): string
		Warning_button( ): $mol_button_minor
		add_error( next?: any ): any
		error_label( ): string
		Error_button( ): $mol_button_minor
		Buttons( ): $mol_view
		Manager( ): $bog_ui_toast_manager
		title( ): string
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=toast.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_app_command_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_command_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_ui_app_command_3 = $mol_type_enforce<
		ReturnType< $bog_ui_app_command['open_palette'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_app_command_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_ui_app_command_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_command_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_command_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_command_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_command_group__title_bog_ui_app_command_9 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_group['title'] >
	>
	type $bog_ui_command_item__label_bog_ui_app_command_10 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['label'] >
	>
	type $bog_ui_command_item__shortcut_bog_ui_app_command_11 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['shortcut'] >
	>
	type $bog_ui_command_item__label_bog_ui_app_command_12 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['label'] >
	>
	type $bog_ui_command_item__shortcut_bog_ui_app_command_13 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['shortcut'] >
	>
	type $bog_ui_command_item__label_bog_ui_app_command_14 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['label'] >
	>
	type $bog_ui_command_item__shortcut_bog_ui_app_command_15 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['shortcut'] >
	>
	type $bog_ui_command_item__label_bog_ui_app_command_16 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['label'] >
	>
	type $bog_ui_command_group__title_bog_ui_app_command_17 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_group['title'] >
	>
	type $bog_ui_command_item__label_bog_ui_app_command_18 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['label'] >
	>
	type $bog_ui_command_item__shortcut_bog_ui_app_command_19 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['shortcut'] >
	>
	type $bog_ui_command_item__label_bog_ui_app_command_20 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['label'] >
	>
	type $bog_ui_command_item__shortcut_bog_ui_app_command_21 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['shortcut'] >
	>
	type $bog_ui_command_item__label_bog_ui_app_command_22 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['label'] >
	>
	type $bog_ui_command_item__shortcut_bog_ui_app_command_23 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['shortcut'] >
	>
	type $bog_ui_command_group__title_bog_ui_app_command_24 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_group['title'] >
	>
	type $bog_ui_command_item__label_bog_ui_app_command_25 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['label'] >
	>
	type $bog_ui_command_item__shortcut_bog_ui_app_command_26 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['shortcut'] >
	>
	type $bog_ui_command_item__label_bog_ui_app_command_27 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['label'] >
	>
	type $bog_ui_command_item__label_bog_ui_app_command_28 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_command_item['label'] >
	>
	type $bog_ui_command__showed_bog_ui_app_command_29 = $mol_type_enforce<
		ReturnType< $bog_ui_app_command['palette_showed'] >
		,
		ReturnType< $bog_ui_command['showed'] >
	>
	type $bog_ui_command__commands_bog_ui_app_command_30 = $mol_type_enforce<
		ReturnType< $bog_ui_app_command['demo_commands'] >
		,
		ReturnType< $bog_ui_command['commands'] >
	>
	export class $bog_ui_app_command extends $mol_page {
		description( ): string
		Description( ): $mol_view
		open_title( ): string
		Open_title( ): $mol_view
		open_palette( next?: any ): any
		open_label( ): string
		Open_button( ): $mol_button_minor
		shortcut_hint( ): string
		Shortcut_hint( ): $mol_view
		Open_row( ): $mol_view
		groups_title( ): string
		Groups_title( ): $mol_view
		groups_desc( ): string
		Groups_desc( ): $mol_view
		palette_showed( next?: boolean ): boolean
		Nav_group( ): $bog_ui_command_group
		Nav_home( ): $bog_ui_command_item
		Nav_dashboard( ): $bog_ui_command_item
		Nav_settings( ): $bog_ui_command_item
		Nav_profile( ): $bog_ui_command_item
		Actions_group( ): $bog_ui_command_group
		Actions_new( ): $bog_ui_command_item
		Actions_save( ): $bog_ui_command_item
		Actions_export( ): $bog_ui_command_item
		Settings_group( ): $bog_ui_command_group
		Settings_theme( ): $bog_ui_command_item
		Settings_lang( ): $bog_ui_command_item
		Settings_notifications( ): $bog_ui_command_item
		demo_commands( ): readonly(any)[]
		Palette( ): $bog_ui_command
		title( ): string
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=command.view.tree.d.ts.map
declare namespace $ {

	export class $mol_paragraph extends $mol_view {
		line_height( ): number
		letter_width( ): number
		width_limit( ): number
		row_width( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=paragraph.view.tree.d.ts.map
declare namespace $ {

	type $mol_paragraph__sub_mol_dimmer_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub_mol_dimmer_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	export class $mol_dimmer extends $mol_paragraph {
		parts( ): readonly($mol_view_content)[]
		string( id: any): string
		haystack( ): string
		needle( ): string
		sub( ): ReturnType< $mol_dimmer['parts'] >
		Low( id: any): $mol_paragraph
		High( id: any): $mol_paragraph
	}
	
}

//# sourceMappingURL=dimmer.view.tree.d.ts.map
declare namespace $ {

	export class $mol_float extends $mol_view {
		style( ): ({ 
			'minHeight': string,
		})  & ReturnType< $mol_view['style'] >
	}
	
}

//# sourceMappingURL=float.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=chevron.view.tree.d.ts.map
declare namespace $ {

	export class $mol_check_expand extends $mol_check {
		level_style( ): string
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		Icon( ): $mol_icon_chevron
		level( ): number
		style( ): ({ 
			'paddingLeft': ReturnType< $mol_check_expand['level_style'] >,
		})  & ReturnType< $mol_check['style'] >
		checked( next?: ReturnType< $mol_check_expand['expanded'] > ): ReturnType< $mol_check_expand['expanded'] >
		enabled( ): ReturnType< $mol_check_expand['expandable'] >
	}
	
}

//# sourceMappingURL=expand.view.tree.d.ts.map
declare namespace $ {

	type $mol_grid_table__sub_mol_grid_1 = $mol_type_enforce<
		ReturnType< $mol_grid['rows'] >
		,
		ReturnType< $mol_grid_table['sub'] >
	>
	type $mol_dimmer__needle_mol_grid_2 = $mol_type_enforce<
		ReturnType< $mol_grid['needle'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_grid_3 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_value'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_grid_row__cells_mol_grid_4 = $mol_type_enforce<
		ReturnType< $mol_grid['head_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_grid_row__minimal_height_mol_grid_5 = $mol_type_enforce<
		ReturnType< $mol_grid['row_height'] >
		,
		ReturnType< $mol_grid_row['minimal_height'] >
	>
	type $mol_grid_row__minimal_width_mol_grid_6 = $mol_type_enforce<
		ReturnType< $mol_grid['minimal_width'] >
		,
		ReturnType< $mol_grid_row['minimal_width'] >
	>
	type $mol_grid_row__cells_mol_grid_7 = $mol_type_enforce<
		ReturnType< $mol_grid['cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_grid_cell__sub_mol_grid_8 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content_text'] >
		,
		ReturnType< $mol_grid_cell['sub'] >
	>
	type $mol_grid_number__sub_mol_grid_9 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content_number'] >
		,
		ReturnType< $mol_grid_number['sub'] >
	>
	type $mol_float__dom_name_mol_grid_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_float['dom_name'] >
	>
	type $mol_float__sub_mol_grid_11 = $mol_type_enforce<
		ReturnType< $mol_grid['col_head_content'] >
		,
		ReturnType< $mol_float['sub'] >
	>
	type $mol_check_expand__level_mol_grid_12 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_level'] >
		,
		ReturnType< $mol_check_expand['level'] >
	>
	type $mol_check_expand__label_mol_grid_13 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content'] >
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_check_expand__expanded_mol_grid_14 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_expanded'] >
		,
		ReturnType< $mol_check_expand['expanded'] >
	>
	export class $mol_grid extends $mol_view {
		rows( ): readonly($mol_view)[]
		Table( ): $mol_grid_table
		head_cells( ): readonly($mol_view)[]
		cells( id: any): readonly($mol_view)[]
		cell_content( id: any): readonly($mol_view_content)[]
		cell_content_text( id: any): ReturnType< $mol_grid['cell_content'] >
		cell_content_number( id: any): ReturnType< $mol_grid['cell_content'] >
		col_head_content( id: any): readonly($mol_view_content)[]
		cell_level( id: any): number
		cell_expanded( id: any, next?: boolean ): boolean
		needle( ): string
		cell_value( id: any): string
		Cell_dimmer( id: any): $mol_dimmer
		row_height( ): number
		row_ids( ): readonly(string[])[]
		row_id( id: any): any
		col_ids( ): readonly(any)[]
		records( ): Record<string, any>
		record( id: any): any
		hierarchy( ): any
		hierarchy_col( ): string
		minimal_width( ): number
		sub( ): readonly(any)[]
		Head( ): $mol_grid_row
		Row( id: any): $mol_grid_row
		Cell( id: any): $mol_view
		cell( id: any): any
		Cell_text( id: any): $mol_grid_cell
		Cell_number( id: any): $mol_grid_number
		Col_head( id: any): $mol_float
		Cell_branch( id: any): $mol_check_expand
		Cell_content( id: any): readonly(any)[]
	}
	
	export class $mol_grid_table extends $mol_list {
	}
	
	export class $mol_grid_row extends $mol_view {
		cells( ): readonly($mol_view)[]
		sub( ): ReturnType< $mol_grid_row['cells'] >
	}
	
	export class $mol_grid_cell extends $mol_view {
		minimal_height( ): number
	}
	
	export class $mol_grid_number extends $mol_grid_cell {
	}
	
}

//# sourceMappingURL=grid.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_tick extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=tick.view.tree.d.ts.map
declare namespace $ {

	export class $mol_check_box extends $mol_check {
		Icon( ): $mol_icon_tick
	}
	
}

//# sourceMappingURL=box.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__value_bog_ui_table_1 = $mol_type_enforce<
		ReturnType< $bog_ui_table['cell_value'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_grid_row__minimal_height_bog_ui_table_2 = $mol_type_enforce<
		ReturnType< $bog_ui_table['row_height'] >
		,
		ReturnType< $mol_grid_row['minimal_height'] >
	>
	type $mol_grid_row__minimal_width_bog_ui_table_3 = $mol_type_enforce<
		ReturnType< $bog_ui_table['minimal_width'] >
		,
		ReturnType< $mol_grid_row['minimal_width'] >
	>
	type $mol_grid_row__cells_bog_ui_table_4 = $mol_type_enforce<
		ReturnType< $bog_ui_table['cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_grid_row__attr_bog_ui_table_5 = $mol_type_enforce<
		({ 
			'bog_ui_table_row_even': ReturnType< $bog_ui_table['row_even'] >,
			'bog_ui_table_row_selected': ReturnType< $bog_ui_table['row_selected'] >,
		})  & ReturnType< $mol_grid_row['attr'] >
		,
		ReturnType< $mol_grid_row['attr'] >
	>
	type $mol_button_minor__click_bog_ui_table_6 = $mol_type_enforce<
		ReturnType< $bog_ui_table['col_head_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_ui_table_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_check_box__checked_bog_ui_table_8 = $mol_type_enforce<
		ReturnType< $bog_ui_table['all_selected'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__checked_bog_ui_table_9 = $mol_type_enforce<
		ReturnType< $bog_ui_table['row_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_grid_cell__sub_bog_ui_table_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_grid_cell['sub'] >
	>
	export class $bog_ui_table extends $mol_grid {
		cells( id: any): readonly($mol_view)[]
		row_even( id: any): boolean
		row_selected( id: any): boolean
		col_head_click( id: any, next?: any ): any
		head_button_content( id: any): readonly(any)[]
		all_selected( next?: boolean ): boolean
		row_checked( id: any, next?: boolean ): boolean
		cell_value( id: any, next?: string ): string
		Cell_string( id: any): $mol_string
		columns( ): readonly(any)[]
		data( ): readonly(any)[]
		sort_column( next?: string ): string
		sort_dir( next?: string ): string
		selectable( ): boolean
		selected( next?: readonly(any)[] ): readonly(any)[]
		Row( id: any): $mol_grid_row
		Head_button( id: any): $mol_button_minor
		Select_all( ): $mol_check_box
		Select_row( id: any): $mol_check_box
		Cell_input( id: any): $mol_grid_cell
	}
	
}

//# sourceMappingURL=table.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_app_table_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_table_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_table__columns_bog_ui_app_table_3 = $mol_type_enforce<
		ReturnType< $bog_ui_app_table['columns'] >
		,
		ReturnType< $bog_ui_table['columns'] >
	>
	type $bog_ui_table__data_bog_ui_app_table_4 = $mol_type_enforce<
		ReturnType< $bog_ui_app_table['data'] >
		,
		ReturnType< $bog_ui_table['data'] >
	>
	type $bog_ui_table__selectable_bog_ui_app_table_5 = $mol_type_enforce<
		boolean
		,
		ReturnType< $bog_ui_table['selectable'] >
	>
	type $bog_ui_table__selected_bog_ui_app_table_6 = $mol_type_enforce<
		ReturnType< $bog_ui_app_table['selected'] >
		,
		ReturnType< $bog_ui_table['selected'] >
	>
	type $bog_ui_table__sort_column_bog_ui_app_table_7 = $mol_type_enforce<
		ReturnType< $bog_ui_app_table['sort_column'] >
		,
		ReturnType< $bog_ui_table['sort_column'] >
	>
	type $bog_ui_table__sort_dir_bog_ui_app_table_8 = $mol_type_enforce<
		ReturnType< $bog_ui_app_table['sort_dir'] >
		,
		ReturnType< $bog_ui_table['sort_dir'] >
	>
	export class $bog_ui_app_table extends $mol_page {
		description( ): string
		Description( ): $mol_view
		selected_text( ): string
		Selected_info( ): $mol_view
		columns( ): readonly(any)[]
		data( ): readonly(any)[]
		selected( next?: readonly(any)[] ): readonly(any)[]
		sort_column( next?: string ): string
		sort_dir( next?: string ): string
		Table( ): $bog_ui_table
		title( ): string
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=table.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_app_overview_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_badge__label_bog_ui_app_overview_2 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['label'] >
	>
	type $bog_ui_badge__type_bog_ui_app_overview_3 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['type'] >
	>
	type $bog_ui_badge__label_bog_ui_app_overview_4 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['label'] >
	>
	type $bog_ui_badge__type_bog_ui_app_overview_5 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['type'] >
	>
	type $bog_ui_badge__label_bog_ui_app_overview_6 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['label'] >
	>
	type $bog_ui_badge__type_bog_ui_app_overview_7 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_badge['type'] >
	>
	type $mol_view__sub_bog_ui_app_overview_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_app_overview_card__card_id_bog_ui_app_overview_9 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_id'] >
	>
	type $bog_ui_app_overview_card__card_title_bog_ui_app_overview_10 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_title'] >
	>
	type $bog_ui_app_overview_card__card_description_bog_ui_app_overview_11 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_description'] >
	>
	type $bog_ui_app_overview_card__click_bog_ui_app_overview_12 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['go_badge'] >
		,
		ReturnType< $bog_ui_app_overview_card['click'] >
	>
	type $bog_ui_app_overview_card__Preview_bog_ui_app_overview_13 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['Badge_preview'] >
		,
		ReturnType< $bog_ui_app_overview_card['Preview'] >
	>
	type $mol_view__sub_bog_ui_app_overview_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_app_overview_card__card_id_bog_ui_app_overview_16 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_id'] >
	>
	type $bog_ui_app_overview_card__card_title_bog_ui_app_overview_17 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_title'] >
	>
	type $bog_ui_app_overview_card__card_description_bog_ui_app_overview_18 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_description'] >
	>
	type $bog_ui_app_overview_card__click_bog_ui_app_overview_19 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['go_empty'] >
		,
		ReturnType< $bog_ui_app_overview_card['click'] >
	>
	type $bog_ui_app_overview_card__Preview_bog_ui_app_overview_20 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['Empty_preview'] >
		,
		ReturnType< $bog_ui_app_overview_card['Preview'] >
	>
	type $mol_view__sub_bog_ui_app_overview_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_app_overview_card__card_id_bog_ui_app_overview_22 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_id'] >
	>
	type $bog_ui_app_overview_card__card_title_bog_ui_app_overview_23 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_title'] >
	>
	type $bog_ui_app_overview_card__card_description_bog_ui_app_overview_24 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_description'] >
	>
	type $bog_ui_app_overview_card__click_bog_ui_app_overview_25 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['go_skeleton'] >
		,
		ReturnType< $bog_ui_app_overview_card['click'] >
	>
	type $bog_ui_app_overview_card__Preview_bog_ui_app_overview_26 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['Skeleton_preview'] >
		,
		ReturnType< $bog_ui_app_overview_card['Preview'] >
	>
	type $mol_view__sub_bog_ui_app_overview_27 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_32 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_app_overview_card__card_id_bog_ui_app_overview_33 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_id'] >
	>
	type $bog_ui_app_overview_card__card_title_bog_ui_app_overview_34 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_title'] >
	>
	type $bog_ui_app_overview_card__card_description_bog_ui_app_overview_35 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_description'] >
	>
	type $bog_ui_app_overview_card__click_bog_ui_app_overview_36 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['go_breadcrumb'] >
		,
		ReturnType< $bog_ui_app_overview_card['click'] >
	>
	type $bog_ui_app_overview_card__Preview_bog_ui_app_overview_37 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['Breadcrumb_preview'] >
		,
		ReturnType< $bog_ui_app_overview_card['Preview'] >
	>
	type $mol_view__sub_bog_ui_app_overview_38 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_39 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_40 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_app_overview_card__card_id_bog_ui_app_overview_41 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_id'] >
	>
	type $bog_ui_app_overview_card__card_title_bog_ui_app_overview_42 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_title'] >
	>
	type $bog_ui_app_overview_card__card_description_bog_ui_app_overview_43 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_description'] >
	>
	type $bog_ui_app_overview_card__click_bog_ui_app_overview_44 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['go_sidebar'] >
		,
		ReturnType< $bog_ui_app_overview_card['click'] >
	>
	type $bog_ui_app_overview_card__Preview_bog_ui_app_overview_45 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['Sidebar_preview'] >
		,
		ReturnType< $bog_ui_app_overview_card['Preview'] >
	>
	type $mol_view__sub_bog_ui_app_overview_46 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_47 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_48 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_app_overview_card__card_id_bog_ui_app_overview_49 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_id'] >
	>
	type $bog_ui_app_overview_card__card_title_bog_ui_app_overview_50 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_title'] >
	>
	type $bog_ui_app_overview_card__card_description_bog_ui_app_overview_51 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_description'] >
	>
	type $bog_ui_app_overview_card__click_bog_ui_app_overview_52 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['go_sheet'] >
		,
		ReturnType< $bog_ui_app_overview_card['click'] >
	>
	type $bog_ui_app_overview_card__Preview_bog_ui_app_overview_53 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['Sheet_preview'] >
		,
		ReturnType< $bog_ui_app_overview_card['Preview'] >
	>
	type $mol_view__sub_bog_ui_app_overview_54 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_55 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_56 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_app_overview_card__card_id_bog_ui_app_overview_57 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_id'] >
	>
	type $bog_ui_app_overview_card__card_title_bog_ui_app_overview_58 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_title'] >
	>
	type $bog_ui_app_overview_card__card_description_bog_ui_app_overview_59 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_description'] >
	>
	type $bog_ui_app_overview_card__click_bog_ui_app_overview_60 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['go_toast'] >
		,
		ReturnType< $bog_ui_app_overview_card['click'] >
	>
	type $bog_ui_app_overview_card__Preview_bog_ui_app_overview_61 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['Toast_preview'] >
		,
		ReturnType< $bog_ui_app_overview_card['Preview'] >
	>
	type $mol_view__sub_bog_ui_app_overview_62 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_63 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_app_overview_card__card_id_bog_ui_app_overview_64 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_id'] >
	>
	type $bog_ui_app_overview_card__card_title_bog_ui_app_overview_65 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_title'] >
	>
	type $bog_ui_app_overview_card__card_description_bog_ui_app_overview_66 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_description'] >
	>
	type $bog_ui_app_overview_card__click_bog_ui_app_overview_67 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['go_command'] >
		,
		ReturnType< $bog_ui_app_overview_card['click'] >
	>
	type $bog_ui_app_overview_card__Preview_bog_ui_app_overview_68 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['Command_preview'] >
		,
		ReturnType< $bog_ui_app_overview_card['Preview'] >
	>
	type $mol_view__sub_bog_ui_app_overview_69 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_70 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_71 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_72 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $bog_ui_app_overview_card__card_id_bog_ui_app_overview_73 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_id'] >
	>
	type $bog_ui_app_overview_card__card_title_bog_ui_app_overview_74 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_title'] >
	>
	type $bog_ui_app_overview_card__card_description_bog_ui_app_overview_75 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_app_overview_card['card_description'] >
	>
	type $bog_ui_app_overview_card__click_bog_ui_app_overview_76 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['go_table'] >
		,
		ReturnType< $bog_ui_app_overview_card['click'] >
	>
	type $bog_ui_app_overview_card__Preview_bog_ui_app_overview_77 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['Table_preview'] >
		,
		ReturnType< $bog_ui_app_overview_card['Preview'] >
	>
	type $mol_view__sub_bog_ui_app_overview_78 = $mol_type_enforce<
		ReturnType< $bog_ui_app_overview['cards'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_app_overview extends $mol_page {
		description( ): string
		Description( ): $mol_view
		go_badge( next?: any ): any
		Badge_s( ): $bog_ui_badge
		Badge_e( ): $bog_ui_badge
		Badge_i( ): $bog_ui_badge
		Badge_preview( ): $mol_view
		Card_badge( ): $bog_ui_app_overview_card
		go_empty( next?: any ): any
		Empty_icon( ): $mol_icon_magnify
		Empty_text( ): $mol_view
		Empty_preview( ): $mol_view
		Card_empty( ): $bog_ui_app_overview_card
		go_skeleton( next?: any ): any
		Skel_1( ): $bog_ui_skeleton
		Skel_2( ): $bog_ui_skeleton
		Skel_3( ): $bog_ui_skeleton
		Skeleton_preview( ): $mol_view
		Card_skeleton( ): $bog_ui_app_overview_card
		go_breadcrumb( next?: any ): any
		Bc_home( ): $mol_view
		Bc_sep( ): $mol_view
		Bc_cat( ): $mol_view
		Bc_sep2( ): $mol_view
		Bc_cur( ): $mol_view
		Breadcrumb_preview( ): $mol_view
		Card_breadcrumb( ): $bog_ui_app_overview_card
		go_sidebar( next?: any ): any
		Sb_i1( ): $mol_icon_home
		Sb_i2( ): $mol_icon_account
		Sb_i3( ): $mol_icon_cog
		Sb_bar( ): $mol_view
		Sb_content( ): $mol_view
		Sidebar_preview( ): $mol_view
		Card_sidebar( ): $bog_ui_app_overview_card
		go_sheet( next?: any ): any
		Sheet_panel( ): $mol_view
		Sheet_box( ): $mol_view
		Sheet_preview( ): $mol_view
		Card_sheet( ): $bog_ui_app_overview_card
		go_toast( next?: any ): any
		Toast_info_icon( ): $mol_icon_information
		Toast_info_mini( ): $mol_view
		Toast_ok_icon( ): $mol_icon_check_circle
		Toast_ok_mini( ): $mol_view
		Toast_preview( ): $mol_view
		Card_toast( ): $bog_ui_app_overview_card
		go_command( next?: any ): any
		Cmd_icon( ): $mol_icon_magnify
		Cmd_search( ): $mol_view
		Command_preview( ): $mol_view
		Card_command( ): $bog_ui_app_overview_card
		go_table( next?: any ): any
		Tbl_head( ): $mol_view
		Tbl_row1( ): $mol_view
		Tbl_row2( ): $mol_view
		Table_preview( ): $mol_view
		Card_table( ): $bog_ui_app_overview_card
		cards( ): readonly(any)[]
		Grid( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}
	
	type $mol_view__sub_bog_ui_app_overview_card_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_bog_ui_app_overview_card_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_app_overview_card extends $mol_button_minor {
		Title( ): $mol_view
		Card_desc( ): $mol_view
		card_id( ): string
		card_title( ): string
		card_description( ): string
		Preview( ): $mol_view
		attr( ): ({ 
			'bog_ui_app_overview_card': boolean,
		})  & ReturnType< $mol_button_minor['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=overview.view.tree.d.ts.map
declare namespace $ {

	export class $bog_ui_divider extends $mol_view {
	}
	
}

//# sourceMappingURL=divider.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_bog_ui_app_divider_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $bog_ui_app_divider extends $mol_page {
		description( ): string
		Description( ): $mol_view
		Divider( ): $bog_ui_divider
		title( ): string
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=divider.view.tree.d.ts.map
declare namespace $ {

	type $bog_ui_sidebar_item__Icon_bog_ui_app_1 = $mol_type_enforce<
		ReturnType< $bog_ui_app['Overview_icon'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_2 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__active_bog_ui_app_3 = $mol_type_enforce<
		ReturnType< $bog_ui_app['overview_active'] >
		,
		ReturnType< $bog_ui_sidebar_item['active'] >
	>
	type $bog_ui_sidebar_item__click_bog_ui_app_4 = $mol_type_enforce<
		ReturnType< $bog_ui_app['nav_overview'] >
		,
		ReturnType< $bog_ui_sidebar_item['click'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_5 = $mol_type_enforce<
		ReturnType< $bog_ui_app['Badge_icon'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_6 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__active_bog_ui_app_7 = $mol_type_enforce<
		ReturnType< $bog_ui_app['badge_active'] >
		,
		ReturnType< $bog_ui_sidebar_item['active'] >
	>
	type $bog_ui_sidebar_item__click_bog_ui_app_8 = $mol_type_enforce<
		ReturnType< $bog_ui_app['nav_badge'] >
		,
		ReturnType< $bog_ui_sidebar_item['click'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_9 = $mol_type_enforce<
		ReturnType< $bog_ui_app['Empty_icon'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_10 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__active_bog_ui_app_11 = $mol_type_enforce<
		ReturnType< $bog_ui_app['empty_active'] >
		,
		ReturnType< $bog_ui_sidebar_item['active'] >
	>
	type $bog_ui_sidebar_item__click_bog_ui_app_12 = $mol_type_enforce<
		ReturnType< $bog_ui_app['nav_empty'] >
		,
		ReturnType< $bog_ui_sidebar_item['click'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_13 = $mol_type_enforce<
		ReturnType< $bog_ui_app['Skeleton_icon'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_14 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__active_bog_ui_app_15 = $mol_type_enforce<
		ReturnType< $bog_ui_app['skeleton_active'] >
		,
		ReturnType< $bog_ui_sidebar_item['active'] >
	>
	type $bog_ui_sidebar_item__click_bog_ui_app_16 = $mol_type_enforce<
		ReturnType< $bog_ui_app['nav_skeleton'] >
		,
		ReturnType< $bog_ui_sidebar_item['click'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_17 = $mol_type_enforce<
		ReturnType< $bog_ui_app['Breadcrumb_icon'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_18 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__active_bog_ui_app_19 = $mol_type_enforce<
		ReturnType< $bog_ui_app['breadcrumb_active'] >
		,
		ReturnType< $bog_ui_sidebar_item['active'] >
	>
	type $bog_ui_sidebar_item__click_bog_ui_app_20 = $mol_type_enforce<
		ReturnType< $bog_ui_app['nav_breadcrumb'] >
		,
		ReturnType< $bog_ui_sidebar_item['click'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_21 = $mol_type_enforce<
		ReturnType< $bog_ui_app['Sidebar_icon'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_22 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__active_bog_ui_app_23 = $mol_type_enforce<
		ReturnType< $bog_ui_app['sidebar_active'] >
		,
		ReturnType< $bog_ui_sidebar_item['active'] >
	>
	type $bog_ui_sidebar_item__click_bog_ui_app_24 = $mol_type_enforce<
		ReturnType< $bog_ui_app['nav_sidebar'] >
		,
		ReturnType< $bog_ui_sidebar_item['click'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_25 = $mol_type_enforce<
		ReturnType< $bog_ui_app['Sheet_icon'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_26 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__active_bog_ui_app_27 = $mol_type_enforce<
		ReturnType< $bog_ui_app['sheet_active'] >
		,
		ReturnType< $bog_ui_sidebar_item['active'] >
	>
	type $bog_ui_sidebar_item__click_bog_ui_app_28 = $mol_type_enforce<
		ReturnType< $bog_ui_app['nav_sheet'] >
		,
		ReturnType< $bog_ui_sidebar_item['click'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_29 = $mol_type_enforce<
		ReturnType< $bog_ui_app['Toast_icon'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_30 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__active_bog_ui_app_31 = $mol_type_enforce<
		ReturnType< $bog_ui_app['toast_active'] >
		,
		ReturnType< $bog_ui_sidebar_item['active'] >
	>
	type $bog_ui_sidebar_item__click_bog_ui_app_32 = $mol_type_enforce<
		ReturnType< $bog_ui_app['nav_toast'] >
		,
		ReturnType< $bog_ui_sidebar_item['click'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_33 = $mol_type_enforce<
		ReturnType< $bog_ui_app['Command_icon'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_34 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__active_bog_ui_app_35 = $mol_type_enforce<
		ReturnType< $bog_ui_app['command_active'] >
		,
		ReturnType< $bog_ui_sidebar_item['active'] >
	>
	type $bog_ui_sidebar_item__click_bog_ui_app_36 = $mol_type_enforce<
		ReturnType< $bog_ui_app['nav_command'] >
		,
		ReturnType< $bog_ui_sidebar_item['click'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_37 = $mol_type_enforce<
		ReturnType< $bog_ui_app['Table_icon'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_38 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__active_bog_ui_app_39 = $mol_type_enforce<
		ReturnType< $bog_ui_app['table_active'] >
		,
		ReturnType< $bog_ui_sidebar_item['active'] >
	>
	type $bog_ui_sidebar_item__click_bog_ui_app_40 = $mol_type_enforce<
		ReturnType< $bog_ui_app['nav_table'] >
		,
		ReturnType< $bog_ui_sidebar_item['click'] >
	>
	type $bog_ui_sidebar_item__Icon_bog_ui_app_41 = $mol_type_enforce<
		ReturnType< $bog_ui_app['Divider_icon'] >
		,
		ReturnType< $bog_ui_sidebar_item['Icon'] >
	>
	type $bog_ui_sidebar_item__label_bog_ui_app_42 = $mol_type_enforce<
		string
		,
		ReturnType< $bog_ui_sidebar_item['label'] >
	>
	type $bog_ui_sidebar_item__active_bog_ui_app_43 = $mol_type_enforce<
		ReturnType< $bog_ui_app['divider_active'] >
		,
		ReturnType< $bog_ui_sidebar_item['active'] >
	>
	type $bog_ui_sidebar_item__click_bog_ui_app_44 = $mol_type_enforce<
		ReturnType< $bog_ui_app['nav_divider'] >
		,
		ReturnType< $bog_ui_sidebar_item['click'] >
	>
	type $bog_ui_sidebar__mode_bog_ui_app_45 = $mol_type_enforce<
		ReturnType< $bog_ui_app['sidebar_mode'] >
		,
		ReturnType< $bog_ui_sidebar['mode'] >
	>
	type $bog_ui_sidebar__items_bog_ui_app_46 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $bog_ui_sidebar['items'] >
	>
	type $mol_view__sub_bog_ui_app_47 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_page__title_bog_ui_app_48 = $mol_type_enforce<
		ReturnType< $bog_ui_app['page_title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_bog_ui_app_49 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_bog_ui_app_50 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $bog_ui_command__showed_bog_ui_app_51 = $mol_type_enforce<
		ReturnType< $bog_ui_app['command_showed'] >
		,
		ReturnType< $bog_ui_command['showed'] >
	>
	export class $bog_ui_app extends $mol_book2 {
		Theme( ): $mol_theme_auto
		global_keydown( next?: any ): any
		sidebar_mode( next?: string ): string
		Overview_icon( ): $mol_icon_view_grid
		overview_active( ): boolean
		nav_overview( next?: any ): any
		Overview_nav( ): $bog_ui_sidebar_item
		Badge_icon( ): $mol_icon_tag
		badge_active( ): boolean
		nav_badge( next?: any ): any
		Badge_nav( ): $bog_ui_sidebar_item
		Empty_icon( ): $mol_icon_file
		empty_active( ): boolean
		nav_empty( next?: any ): any
		Empty_nav( ): $bog_ui_sidebar_item
		Skeleton_icon( ): $mol_icon_rectangle
		skeleton_active( ): boolean
		nav_skeleton( next?: any ): any
		Skeleton_nav( ): $bog_ui_sidebar_item
		Breadcrumb_icon( ): $mol_icon_navigation
		breadcrumb_active( ): boolean
		nav_breadcrumb( next?: any ): any
		Breadcrumb_nav( ): $bog_ui_sidebar_item
		Sidebar_icon( ): $mol_icon_dock_left
		sidebar_active( ): boolean
		nav_sidebar( next?: any ): any
		Sidebar_nav( ): $bog_ui_sidebar_item
		Sheet_icon( ): $mol_icon_card
		sheet_active( ): boolean
		nav_sheet( next?: any ): any
		Sheet_nav( ): $bog_ui_sidebar_item
		Toast_icon( ): $mol_icon_bell
		toast_active( ): boolean
		nav_toast( next?: any ): any
		Toast_nav( ): $bog_ui_sidebar_item
		Command_icon( ): $mol_icon_console
		command_active( ): boolean
		nav_command( next?: any ): any
		Command_nav( ): $bog_ui_sidebar_item
		Table_icon( ): $mol_icon_table
		table_active( ): boolean
		nav_table( next?: any ): any
		Table_nav( ): $bog_ui_sidebar_item
		Divider_icon( ): $mol_icon_minus
		divider_active( ): boolean
		nav_divider( next?: any ): any
		Divider_nav( ): $bog_ui_sidebar_item
		Nav( ): $bog_ui_sidebar
		page_title( ): string
		Theme_toggle( ): $mol_lights_toggle
		page_text( ): string
		Page_body( ): $mol_view
		Content_page( ): $mol_page
		plugins( ): readonly(any)[]
		event( ): ({ 
			keydown( next?: ReturnType< $bog_ui_app['global_keydown'] > ): ReturnType< $bog_ui_app['global_keydown'] >,
		})  & ReturnType< $mol_book2['event'] >
		command_showed( next?: boolean ): boolean
		Command( ): $bog_ui_command
		Badge_page( ): $bog_ui_app_badge
		Empty_page( ): $bog_ui_app_empty
		Skeleton_page( ): $bog_ui_app_skeleton
		Breadcrumb_page( ): $bog_ui_app_breadcrumb
		Sidebar_page( ): $bog_ui_app_sidebar
		Sheet_page( ): $bog_ui_app_sheet
		Toast_page( ): $bog_ui_app_toast
		Command_page( ): $bog_ui_app_command
		Table_page( ): $bog_ui_app_table
		Overview_page( ): $bog_ui_app_overview
		Divider_page( ): $bog_ui_app_divider
		pages( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=app.view.tree.d.ts.map
export = $;
//# sourceMappingURL=web.d.ts.map
