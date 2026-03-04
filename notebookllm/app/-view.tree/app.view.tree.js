	($.$bog_notebookllm_app) = class $bog_notebookllm_app extends ($.$mol_book2) {
		Theme(){
			const obj = new this.$.$mol_theme_auto();
			return obj;
		}
		notebook_add(next){
			if(next !== undefined) return next;
			return null;
		}
		Notebook_add_icon(){
			const obj = new this.$.$mol_icon_plus();
			return obj;
		}
		Notebook_add(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_notebookllm_app_Notebook_add_hint")));
			(obj.click) = (next) => ((this.notebook_add(next)));
			(obj.sub) = () => ([(this.Notebook_add_icon())]);
			return obj;
		}
		notebook_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Notebook_icon(id){
			const obj = new this.$.$mol_icon_notebook_outline();
			return obj;
		}
		notebook_title(id){
			return "";
		}
		notebooks_filter(){
			return "";
		}
		Notebook_title(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.notebook_title(id)));
			(obj.needle) = () => ((this.notebooks_filter()));
			return obj;
		}
		notebook_delete(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Notebook_delete_icon(id){
			const obj = new this.$.$mol_icon_trash_can_outline();
			return obj;
		}
		Notebook_delete(id){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.notebook_delete(id, next)));
			(obj.sub) = () => ([(this.Notebook_delete_icon(id))]);
			return obj;
		}
		Notebook_row(id){
			const obj = new this.$.$mol_row();
			(obj.event) = () => ({...(this.$.$mol_row.prototype.event.call(obj)), "click": (next) => (this.notebook_select(id, next))});
			(obj.sub) = () => ([
				(this.Notebook_icon(id)), 
				(this.Notebook_title(id)), 
				(this.Notebook_delete(id))
			]);
			return obj;
		}
		notebook_rows(){
			return [(this.Notebook_row("0"))];
		}
		Notebook_list(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.notebook_rows()));
			return obj;
		}
		Notebooks_page(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_notebookllm_app_Notebooks_page_title")));
			(obj.tools) = () => ([(this.Notebook_add())]);
			(obj.body) = () => ([(this.Notebook_list())]);
			return obj;
		}
		dialog_title(next){
			if(next !== undefined) return next;
			return (this.$.$mol_locale.text("$bog_notebookllm_app_dialog_title"));
		}
		title(){
			return (this.dialog_title());
		}
		model_status_text(){
			return "Loading model...";
		}
		Model_status(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.model_status_text())]);
			return obj;
		}
		message_text(id){
			return "";
		}
		Message_text(id){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.message_text(id)));
			return obj;
		}
		Message(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Message_text(id))]);
			return obj;
		}
		messages(){
			return [(this.Message("0"))];
		}
		Messages(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.messages()));
			return obj;
		}
		doc_upload_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Doc_upload_icon(){
			const obj = new this.$.$mol_icon_file_upload_outline();
			return obj;
		}
		Doc_upload(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_notebookllm_app_Doc_upload_hint")));
			(obj.click) = (next) => ((this.doc_upload_click(next)));
			(obj.sub) = () => ([(this.Doc_upload_icon())]);
			return obj;
		}
		doc_count_text(){
			return "";
		}
		Doc_count(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.doc_count_text())]);
			return obj;
		}
		docs_bar_items(){
			return [(this.Doc_upload()), (this.Doc_count())];
		}
		Docs_bar(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ((this.docs_bar_items()));
			return obj;
		}
		prompt_text(next){
			if(next !== undefined) return next;
			return "";
		}
		prompt_submit(next){
			if(next !== undefined) return next;
			return null;
		}
		Prompt_text(){
			const obj = new this.$.$mol_textarea();
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_notebookllm_app_Prompt_text_hint")));
			(obj.value) = (next) => ((this.prompt_text(next)));
			(obj.submit) = (next) => ((this.prompt_submit(next)));
			return obj;
		}
		Prompt_submit_icon(){
			const obj = new this.$.$mol_icon_send();
			return obj;
		}
		Prompt_submit(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_notebookllm_app_Prompt_submit_hint")));
			(obj.click) = (next) => ((this.prompt_submit(next)));
			(obj.sub) = () => ([(this.Prompt_submit_icon())]);
			return obj;
		}
		Dialog(){
			const obj = new this.$.$mol_page();
			(obj.title_content) = () => (["📓", (this.title())]);
			(obj.body_content) = () => ([(this.Model_status()), (this.Messages())]);
			(obj.foot) = () => ([
				(this.Docs_bar()), 
				(this.Prompt_text()), 
				(this.Prompt_submit())
			]);
			return obj;
		}
		reset(next){
			if(next !== undefined) return next;
			return null;
		}
		Reset_icon(){
			const obj = new this.$.$mol_icon_trash_can_outline();
			return obj;
		}
		Reset(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$bog_notebookllm_app_Reset_hint")));
			(obj.click) = (next) => ((this.reset(next)));
			(obj.sub) = () => ([(this.Reset_icon())]);
			return obj;
		}
		Lights(){
			const obj = new this.$.$mol_lights_toggle();
			return obj;
		}
		sources_info(){
			return "";
		}
		Sources_info(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.sources_info()));
			return obj;
		}
		Doc_icon(id){
			const obj = new this.$.$mol_icon_file_document_outline();
			return obj;
		}
		doc_name(id){
			return "";
		}
		Doc_name(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.doc_name(id))]);
			return obj;
		}
		doc_remove(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Doc_remove_icon(id){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		Doc_remove(id){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.doc_remove(id, next)));
			(obj.sub) = () => ([(this.Doc_remove_icon(id))]);
			return obj;
		}
		Doc_row(id){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([
				(this.Doc_icon(id)), 
				(this.Doc_name(id)), 
				(this.Doc_remove(id))
			]);
			return obj;
		}
		doc_rows(){
			return [(this.Doc_row("0"))];
		}
		Doc_list(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.doc_rows()));
			return obj;
		}
		digest(next){
			if(next !== undefined) return next;
			return "";
		}
		Digest(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.digest()));
			return obj;
		}
		Sources_page(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.$.$mol_locale.text("$bog_notebookllm_app_Sources_page_title")));
			(obj.tools) = () => ([(this.Reset()), (this.Lights())]);
			(obj.body) = () => ([
				(this.Sources_info()), 
				(this.Doc_list()), 
				(this.Digest())
			]);
			return obj;
		}
		plugins(){
			return [(this.Theme())];
		}
		model_id(){
			return "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";
		}
		pages(){
			return [(this.Notebooks_page()), (this.Dialog())];
		}
		placeholders(){
			return [(this.Sources_page())];
		}
	};
	($mol_mem(($.$bog_notebookllm_app.prototype), "Theme"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "notebook_add"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Notebook_add_icon"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Notebook_add"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "notebook_select"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "Notebook_icon"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "Notebook_title"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "notebook_delete"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "Notebook_delete_icon"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "Notebook_delete"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "Notebook_row"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Notebook_list"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Notebooks_page"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "dialog_title"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Model_status"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "Message_text"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "Message"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Messages"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "doc_upload_click"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Doc_upload_icon"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Doc_upload"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Doc_count"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Docs_bar"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "prompt_text"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "prompt_submit"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Prompt_text"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Prompt_submit_icon"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Prompt_submit"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Dialog"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "reset"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Reset_icon"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Reset"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Lights"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Sources_info"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "Doc_icon"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "Doc_name"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "doc_remove"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "Doc_remove_icon"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "Doc_remove"));
	($mol_mem_key(($.$bog_notebookllm_app.prototype), "Doc_row"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Doc_list"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "digest"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Digest"));
	($mol_mem(($.$bog_notebookllm_app.prototype), "Sources_page"));

//# sourceMappingURL=app.view.tree.js.map