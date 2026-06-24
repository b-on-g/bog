namespace $ {

	/** Single item in registry */
	export class $bog_forge_item extends $giper_baza_entity.with({
		Title: $giper_baza_atom_text,
	}) {}

	/** Data registry in home land */
	export class $bog_forge_registry extends $giper_baza_entity.with({
		Items: $giper_baza_list_link.to( () => $bog_forge_item ),
	}) {}

	/** Data store */
	export class $bog_forge_store extends $mol_object {

		glob() {
			return this.$.$giper_baza_glob
		}

		home_land() {
			return this.glob().home().land()
		}

		registry() {
			return this.home_land().Data( $bog_forge_registry ) as $bog_forge_registry
		}

	}

}
