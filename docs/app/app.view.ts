namespace $.$$ {
	export class $bog_docs_app extends $.$bog_docs_app {

		@$mol_mem
		override spread(next?: string) {
			return this.$.$mol_state_arg.value(this.param(), next) ?? 'landing'
		}

		override title() {
			const spread = this.spread()
			switch( spread ) {
				case 'guide': return this.Guide().title() + ' \u2014 $mol Framework'
				case 'play': return 'Playground \u2014 $mol Framework'
				default: return '$mol Framework \u2014 Reactive UI'
			}
		}

		@$mol_action
		override switch_en(next?: any) {
			this.$.$mol_locale.lang('en')
		}

		@$mol_action
		override switch_ru(next?: any) {
			this.$.$mol_locale.lang('ru')
		}

	}
}
