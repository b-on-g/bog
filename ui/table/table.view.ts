namespace $.$$ {

	export class $bog_ui_table extends $.$bog_ui_table {

		@ $mol_mem
		col_ids() {
			const columns = this.columns()
			if( !columns.length ) return [] as readonly string[]
			const ids = columns.map( ( col: any ) => String( col.id ) )
			if( this.selectable() ) return [ '__select' , ...ids ]
			return ids
		}

		col_head_content( colId: string ) {
			if( colId === '__select' ) return [ this.Select_all() ]
			return [ this.Head_button( colId ) ]
		}

		cells( id: string[] ) {
			const base = super.cells( id )
			if( !this.selectable() ) return base
			return [ this.Select_row( id[0] ) , ...base.slice( 1 ) ]
		}

		@ $mol_mem_key
		row_checked( rowId: string , next?: boolean ) {
			if( next !== undefined ) {
				const sel = this.selected() as string[]
				if( next ) {
					if( sel.indexOf( rowId ) < 0 ) this.selected( [ ...sel , rowId ] )
				} else {
					this.selected( sel.filter( id => id !== rowId ) )
				}
			}
			return ( this.selected() as string[] ).indexOf( rowId ) >= 0
		}

		@ $mol_mem
		all_selected( next?: boolean ) {
			if( next !== undefined ) {
				if( next ) {
					this.selected( this.row_ids().map( id => id[0] ) )
				} else {
					this.selected( [] )
				}
			}
			const sel = this.selected() as string[]
			const rows = this.row_ids()
			return rows.length > 0 && sel.length >= rows.length
		}

		row_selected( rowId: string[] ) {
			return ( this.selected() as string[] ).indexOf( rowId[0] ) >= 0
		}

		head_button_content( colId: string ) {
			const col = this.columns().find( ( c: any ) => c.id === colId ) as any
			const title = col?.title ?? colId

			if( this.sort_column() !== colId ) return [ title ]

			const arrow = this.sort_dir() === 'asc' ? ' ▲' : ' ▼'
			return [ title + arrow ]
		}

		col_head_click( colId: string , next?: any ) {
			if( next === undefined ) return null

			const col = this.columns().find( ( c: any ) => c.id === colId ) as any
			if( col?.sortable === false ) return null

			if( this.sort_column() === colId ) {
				this.sort_dir( this.sort_dir() === 'asc' ? 'desc' : 'asc' )
			} else {
				this.sort_column( colId )
				this.sort_dir( 'asc' )
			}

			return null
		}

		@ $mol_mem
		records(): any {
			const data = this.data()
			const result: Record< string , any > = {}
			for( let i = 0 ; i < data.length ; i++ ) {
				result[ String( i ) ] = data[ i ]
			}
			return result
		}

		@ $mol_mem
		row_ids(): readonly string[][] {
			const data = this.data()
			const indices = data.map( ( _ : any , i : number ) => [ String( i ) ] )

			const sortCol = this.sort_column()
			if( !sortCol ) return indices

			const dir = this.sort_dir() === 'desc' ? -1 : 1

			indices.sort( ( a , b ) => {
				const va = ( data[ Number( a[0] ) ] as any )?.[ sortCol ] ?? ''
				const vb = ( data[ Number( b[0] ) ] as any )?.[ sortCol ] ?? ''

				if( typeof va === 'number' && typeof vb === 'number' ) {
					return ( va - vb ) * dir
				}

				return String( va ).localeCompare( String( vb ) ) * dir
			} )

			return indices
		}

		@ $mol_mem
		row_index_map() {
			const map: Record< string , number > = {}
			this.row_ids().forEach( ( id , i ) => {
				map[ id[0] ] = i
			} )
			return map
		}

		row_even( row_id: string[] ) {
			return ( this.row_index_map()[ row_id[0] ] ?? 0 ) % 2 === 0
		}

	}

}
