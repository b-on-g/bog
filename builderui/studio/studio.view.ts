namespace $.$$ {
	export class $bog_builderui_studio extends $.$bog_builderui_studio {

		hue_deg() {
			return this.hue() + 'deg'
		}

		hue_spread_deg() {
			return this.hue_spread() + 'deg'
		}

		radius_px() {
			return this.radius() + 'px'
		}

		lights() {
			return this.dark() ? 'dark' : 'light'
		}

	}
}
