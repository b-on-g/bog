	($.$bog_qr) = class $bog_qr extends ($.$mol_svg_root) {
		stop_offset(id){
			return "0%";
		}
		stop_color(id){
			return "";
		}
		qr_view_box(){
			return "0 0 1 1";
		}
		grad_x1(){
			return "0";
		}
		grad_y1(){
			return "0";
		}
		grad_x2(){
			return "1";
		}
		grad_y2(){
			return "1";
		}
		gradient_stop_list(){
			return [];
		}
		Gradient(){
			const obj = new this.$.$mol_svg();
			(obj.dom_name) = () => ("linearGradient");
			(obj.attr) = () => ({
				...(this.$.$mol_svg.prototype.attr.call(obj)), 
				"id": (this.gradient_id()), 
				"x1": (this.grad_x1()), 
				"y1": (this.grad_y1()), 
				"x2": (this.grad_x2()), 
				"y2": (this.grad_y2())
			});
			(obj.sub) = () => ((this.gradient_stop_list()));
			return obj;
		}
		Defs(){
			const obj = new this.$.$mol_svg();
			(obj.dom_name) = () => ("defs");
			(obj.sub) = () => ([(this.Gradient())]);
			return obj;
		}
		modules_d(){
			return "";
		}
		Modules(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.modules_d()));
			(obj.attr) = () => ({...(this.$.$mol_svg_path.prototype.attr.call(obj)), "fill": (this.gradient_fill())});
			return obj;
		}
		rings_d(){
			return "";
		}
		Rings(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.rings_d()));
			(obj.attr) = () => ({
				...(this.$.$mol_svg_path.prototype.attr.call(obj)), 
				"fill": (this.gradient_fill()), 
				"fill-rule": "evenodd"
			});
			return obj;
		}
		centers_d(){
			return "";
		}
		Centers(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.centers_d()));
			(obj.attr) = () => ({...(this.$.$mol_svg_path.prototype.attr.call(obj)), "fill": (this.gradient_fill())});
			return obj;
		}
		center_x(){
			return "0";
		}
		center_y(){
			return "0";
		}
		center_size(){
			return "0";
		}
		Center_body(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.center()));
			return obj;
		}
		Center_wrap(){
			const obj = new this.$.$mol_svg();
			(obj.dom_name) = () => ("foreignObject");
			(obj.attr) = () => ({
				...(this.$.$mol_svg.prototype.attr.call(obj)), 
				"x": (this.center_x()), 
				"y": (this.center_y()), 
				"width": (this.center_size()), 
				"height": (this.center_size())
			});
			(obj.sub) = () => ([(this.Center_body())]);
			return obj;
		}
		uri(){
			return "";
		}
		module_radius(){
			return 0.35;
		}
		finder_radius(){
			return 1.2;
		}
		gradient_angle(){
			return 45;
		}
		error_correction(){
			return "M";
		}
		quiet_zone(){
			return 2;
		}
		center(){
			return [];
		}
		gradient_id(){
			return "qr-grad";
		}
		gradient_fill(){
			return "url(#qr-grad)";
		}
		gradient_stops(){
			return ["var(--mol_theme_special)", "var(--mol_theme_focus)"];
		}
		Stop(id){
			const obj = new this.$.$mol_svg();
			(obj.dom_name) = () => ("stop");
			(obj.attr) = () => ({
				...(this.$.$mol_svg.prototype.attr.call(obj)), 
				"offset": (this.stop_offset(id)), 
				"stop-color": (this.stop_color(id))
			});
			return obj;
		}
		view_box(){
			return (this.qr_view_box());
		}
		sub(){
			return [
				(this.Defs()), 
				(this.Modules()), 
				(this.Rings()), 
				(this.Centers()), 
				(this.Center_wrap())
			];
		}
	};
	($mol_mem(($.$bog_qr.prototype), "Gradient"));
	($mol_mem(($.$bog_qr.prototype), "Defs"));
	($mol_mem(($.$bog_qr.prototype), "Modules"));
	($mol_mem(($.$bog_qr.prototype), "Rings"));
	($mol_mem(($.$bog_qr.prototype), "Centers"));
	($mol_mem(($.$bog_qr.prototype), "Center_body"));
	($mol_mem(($.$bog_qr.prototype), "Center_wrap"));
	($mol_mem_key(($.$bog_qr.prototype), "Stop"));

//# sourceMappingURL=qr.view.tree.js.map