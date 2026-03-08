namespace $.$$ {

	export class $bog_ui_toast extends $.$bog_ui_toast {

		@ $mol_mem
		Icon() {
			switch( this.type() ) {
				case 'success': return new this.$.$mol_icon_check_circle()
				case 'warning': return new this.$.$mol_icon_alert()
				case 'error': return new this.$.$mol_icon_alert_circle()
				default: return new this.$.$mol_icon_information()
			}
		}

	}

}
