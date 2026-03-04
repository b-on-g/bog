declare namespace $ {

	type $mol_button_minor__hint_bog_notebookllm_app_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_notebookllm_app_2 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['notebook_add'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_notebookllm_app_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_dimmer__haystack_bog_notebookllm_app_4 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['notebook_title'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_bog_notebookllm_app_5 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['notebooks_filter'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_button_minor__click_bog_notebookllm_app_6 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['notebook_delete'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_notebookllm_app_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_row__event_bog_notebookllm_app_8 = $mol_type_enforce<
		({ 
			click( next?: ReturnType< $bog_notebookllm_app['notebook_select'] > ): ReturnType< $bog_notebookllm_app['notebook_select'] >,
		})  & ReturnType< $mol_row['event'] >
		,
		ReturnType< $mol_row['event'] >
	>
	type $mol_row__sub_bog_notebookllm_app_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows_bog_notebookllm_app_10 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['notebook_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_page__title_bog_notebookllm_app_11 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_bog_notebookllm_app_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_bog_notebookllm_app_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_view__sub_bog_notebookllm_app_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_text__text_bog_notebookllm_app_15 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['message_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_view__sub_bog_notebookllm_app_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows_bog_notebookllm_app_17 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['messages'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_button_minor__hint_bog_notebookllm_app_18 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_notebookllm_app_19 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['doc_upload_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_notebookllm_app_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_bog_notebookllm_app_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_row__sub_bog_notebookllm_app_22 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['docs_bar_items'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_textarea__hint_bog_notebookllm_app_23 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value_bog_notebookllm_app_24 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['prompt_text'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_textarea__submit_bog_notebookllm_app_25 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['prompt_submit'] >
		,
		ReturnType< $mol_textarea['submit'] >
	>
	type $mol_button_minor__hint_bog_notebookllm_app_26 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_notebookllm_app_27 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['prompt_submit'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_notebookllm_app_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_page__title_content_bog_notebookllm_app_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['title_content'] >
	>
	type $mol_page__body_content_bog_notebookllm_app_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body_content'] >
	>
	type $mol_page__foot_bog_notebookllm_app_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['foot'] >
	>
	type $mol_button_minor__hint_bog_notebookllm_app_32 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_bog_notebookllm_app_33 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['reset'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_notebookllm_app_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_text__text_bog_notebookllm_app_35 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['sources_info'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_view__sub_bog_notebookllm_app_36 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_bog_notebookllm_app_37 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['doc_remove'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_bog_notebookllm_app_38 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_row__sub_bog_notebookllm_app_39 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows_bog_notebookllm_app_40 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['doc_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_text__text_bog_notebookllm_app_41 = $mol_type_enforce<
		ReturnType< $bog_notebookllm_app['digest'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_page__title_bog_notebookllm_app_42 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_bog_notebookllm_app_43 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_bog_notebookllm_app_44 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	export class $bog_notebookllm_app extends $mol_book2 {
		Theme( ): $mol_theme_auto
		notebook_add( next?: any ): any
		Notebook_add_icon( ): $mol_icon_plus
		Notebook_add( ): $mol_button_minor
		notebook_select( id: any, next?: any ): any
		Notebook_icon( id: any): $mol_icon_notebook_outline
		notebook_title( id: any): string
		notebooks_filter( ): string
		Notebook_title( id: any): $mol_dimmer
		notebook_delete( id: any, next?: any ): any
		Notebook_delete_icon( id: any): $mol_icon_trash_can_outline
		Notebook_delete( id: any): $mol_button_minor
		Notebook_row( id: any): $mol_row
		notebook_rows( ): readonly(any)[]
		Notebook_list( ): $mol_list
		Notebooks_page( ): $mol_page
		dialog_title( next?: string ): string
		title( ): ReturnType< $bog_notebookllm_app['dialog_title'] >
		model_status_text( ): string
		Model_status( ): $mol_view
		message_text( id: any): string
		Message_text( id: any): $mol_text
		Message( id: any): $mol_view
		messages( ): readonly(any)[]
		Messages( ): $mol_list
		doc_upload_click( next?: any ): any
		Doc_upload_icon( ): $mol_icon_file_upload_outline
		Doc_upload( ): $mol_button_minor
		doc_count_text( ): string
		Doc_count( ): $mol_view
		docs_bar_items( ): readonly(any)[]
		Docs_bar( ): $mol_row
		prompt_text( next?: string ): string
		prompt_submit( next?: any ): any
		Prompt_text( ): $mol_textarea
		Prompt_submit_icon( ): $mol_icon_send
		Prompt_submit( ): $mol_button_minor
		Dialog( ): $mol_page
		reset( next?: any ): any
		Reset_icon( ): $mol_icon_trash_can_outline
		Reset( ): $mol_button_minor
		Lights( ): $mol_lights_toggle
		sources_info( ): string
		Sources_info( ): $mol_text
		Doc_icon( id: any): $mol_icon_file_document_outline
		doc_name( id: any): string
		Doc_name( id: any): $mol_view
		doc_remove( id: any, next?: any ): any
		Doc_remove_icon( id: any): $mol_icon_close
		Doc_remove( id: any): $mol_button_minor
		Doc_row( id: any): $mol_row
		doc_rows( ): readonly(any)[]
		Doc_list( ): $mol_list
		digest( next?: string ): string
		Digest( ): $mol_text
		Sources_page( ): $mol_page
		plugins( ): readonly(any)[]
		model_id( ): string
		pages( ): readonly(any)[]
		placeholders( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=app.view.tree.d.ts.map