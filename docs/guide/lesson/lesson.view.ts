namespace $.$$ {

	export class $bog_docs_guide_lesson extends $.$bog_docs_guide_lesson {

		@$mol_mem
		override code( next?: string ) {
			const id = this.lesson_id()
			const key = 'bog_docs_code_' + id
			if ( next !== undefined ) {
				this.$.$mol_state_local.value( key, next )
				return next
			}
			const saved = this.$.$mol_state_local.value( key ) as string | null
			return saved ?? this.initial_code()
		}

		@$mol_mem
		check_status( next?: string ) {
			const id = this.lesson_id()
			if ( next !== undefined ) {
				if ( next === 'success' ) {
					this.$.$mol_state_local.value( 'bog_docs_done_' + id, true )
				}
				return next
			}
			const done = this.$.$mol_state_local.value( 'bog_docs_done_' + id )
			return done ? 'success' : ''
		}

		@$mol_mem
		override check_result_sub() {
			const status = this.check_status()
			if ( status === 'success' ) return [ this.Check_success() ]
			if ( status === 'error' ) return [ this.Check_error() ]
			return []
		}

		@$mol_action
		override check( next?: any ) {
			try {
				const code = this.code().trim()
				const solution = this.solution().trim()

				if ( !solution ) {
					this.check_status( 'error' )
					return null
				}

				const code_tree = this.$.$mol_tree2_from_string( code, 'user.view.tree' )
				const solution_tree = this.$.$mol_tree2_from_string( solution, 'solution.view.tree' )

				if ( this.trees_equal( code_tree, solution_tree ) ) {
					this.check_status( 'success' )
				} else {
					this.check_status( 'error' )
				}
			} catch ( error: any ) {
				if ( error instanceof Promise ) throw error
				this.check_status( 'error' )
			}
			return null
		}

		trees_equal( a: $mol_tree2, b: $mol_tree2 ): boolean {
			if ( a.type !== b.type ) return false
			if ( a.value !== b.value ) return false
			if ( a.kids.length !== b.kids.length ) return false
			for ( let i = 0; i < a.kids.length; i++ ) {
				if ( !this.trees_equal( a.kids[i], b.kids[i] ) ) return false
			}
			return true
		}

	}

}
