	($.$bog_qr_demo) = class $bog_qr_demo extends ($.$mol_example_small) {
		Simple(){
			const obj = new this.$.$bog_qr();
			(obj.uri) = () => ("https://b-on-g.github.io/bog/");
			return obj;
		}
		Gradient(){
			const obj = new this.$.$bog_qr();
			(obj.uri) = () => ("https://b-on-g.github.io/bog/");
			(obj.gradient_angle) = () => (135);
			(obj.gradient_stops) = () => ([
				"#ff6b6b", 
				"#feca57", 
				"#48dbfb"
			]);
			return obj;
		}
		Logo(){
			const obj = new this.$.$mol_icon();
			return obj;
		}
		With_logo(){
			const obj = new this.$.$bog_qr();
			(obj.uri) = () => ("https://b-on-g.github.io/bog/");
			(obj.error_correction) = () => ("H");
			(obj.module_radius) = () => (0.45);
			(obj.finder_radius) = () => (1.7);
			(obj.gradient_angle) = () => (185);
			(obj.gradient_stops) = () => (["var(--mol_theme_special)", "var(--mol_theme_focus)"]);
			(obj.center) = () => ([(this.Logo())]);
			return obj;
		}
		Interactive_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["Interactive QR Generator"]);
			return obj;
		}
		custom_uri(next){
			if(next !== undefined) return next;
			return "https://mol.hyoo.ru";
		}
		Url_input(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("Enter URL");
			(obj.value) = (next) => ((this.custom_uri(next)));
			return obj;
		}
		preset(next){
			if(next !== undefined) return next;
			return "default";
		}
		Preset_switch(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this.preset(next)));
			(obj.options) = () => ({
				"default": "Default", 
				"red_orange": "Red-Orange", 
				"blue_purple": "Blue-Purple", 
				"green_teal": "Green-Teal"
			});
			return obj;
		}
		icon_pick(next){
			if(next !== undefined) return next;
			return null;
		}
		Icon_upload(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.icon_pick(next)));
			(obj.sub) = () => (["Upload Icon"]);
			return obj;
		}
		icon_clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Icon_clear(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.icon_clear(next)));
			(obj.sub) = () => (["Clear"]);
			return obj;
		}
		Icon_row(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Icon_upload()), (this.Icon_clear())]);
			return obj;
		}
		preview_ec(){
			return "M";
		}
		preset_stops(){
			return ["var(--mol_theme_special)", "var(--mol_theme_focus)"];
		}
		preview_center(){
			return [];
		}
		Preview(){
			const obj = new this.$.$bog_qr();
			(obj.uri) = () => ((this.custom_uri()));
			(obj.gradient_angle) = () => (135);
			(obj.error_correction) = () => ((this.preview_ec()));
			(obj.gradient_stops) = () => ((this.preset_stops()));
			(obj.center) = () => ((this.preview_center()));
			return obj;
		}
		download(next){
			if(next !== undefined) return next;
			return null;
		}
		Download(){
			const obj = new this.$.$mol_button_major();
			(obj.click) = (next) => ((this.download(next)));
			(obj.sub) = () => (["Download PNG"]);
			return obj;
		}
		Interactive(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this.Interactive_title()), 
				(this.Url_input()), 
				(this.Preset_switch()), 
				(this.Icon_row()), 
				(this.Preview()), 
				(this.Download())
			]);
			return obj;
		}
		title(){
			return "QR Code";
		}
		sub(){
			return [
				(this.Simple()), 
				(this.Gradient()), 
				(this.With_logo()), 
				(this.Interactive())
			];
		}
		tags(){
			return ["qr", "svg"];
		}
		aspects(){
			return ["UI\\QR"];
		}
	};
	($mol_mem(($.$bog_qr_demo.prototype), "Simple"));
	($mol_mem(($.$bog_qr_demo.prototype), "Gradient"));
	($mol_mem(($.$bog_qr_demo.prototype), "Logo"));
	($mol_mem(($.$bog_qr_demo.prototype), "With_logo"));
	($mol_mem(($.$bog_qr_demo.prototype), "Interactive_title"));
	($mol_mem(($.$bog_qr_demo.prototype), "custom_uri"));
	($mol_mem(($.$bog_qr_demo.prototype), "Url_input"));
	($mol_mem(($.$bog_qr_demo.prototype), "preset"));
	($mol_mem(($.$bog_qr_demo.prototype), "Preset_switch"));
	($mol_mem(($.$bog_qr_demo.prototype), "icon_pick"));
	($mol_mem(($.$bog_qr_demo.prototype), "Icon_upload"));
	($mol_mem(($.$bog_qr_demo.prototype), "icon_clear"));
	($mol_mem(($.$bog_qr_demo.prototype), "Icon_clear"));
	($mol_mem(($.$bog_qr_demo.prototype), "Icon_row"));
	($mol_mem(($.$bog_qr_demo.prototype), "Preview"));
	($mol_mem(($.$bog_qr_demo.prototype), "download"));
	($mol_mem(($.$bog_qr_demo.prototype), "Download"));
	($mol_mem(($.$bog_qr_demo.prototype), "Interactive"));

//# sourceMappingURL=demo.view.tree.js.map