namespace $.$$ {

	export class $bog_ui_app extends $.$bog_ui_app {

		@ $mol_mem
		size_watcher() {
			const node = this.dom_node()
			const observer = new ResizeObserver( entries => {
				const width = entries[0]?.contentRect.width ?? 0
				if( width <= 0 ) return
				if( width < 500 ) {
					this.sidebar_mode( 'hidden' )
				} else if( width < 900 ) {
					this.sidebar_mode( 'rail' )
				} else {
					this.sidebar_mode( 'dock' )
				}
			} )
			observer.observe( node )
			return { destructor: () => observer.disconnect() }
		}

		sub() {
			this.size_watcher()
			return [
				...this.pages(),
				this.Command(),
			]
		}

		@ $mol_action
		global_keydown( event?: KeyboardEvent ) {
			if( !event ) return null
			if( event.key !== 'k' && event.key !== 'K' ) return null
			if( !event.metaKey && !event.ctrlKey ) return null

			event.preventDefault()
			this.command_showed( !this.command_showed() )

			return null
		}

		@ $mol_mem
		component( next?: string ) {
			return $mol_state_arg.value( 'component', next ) ?? ''
		}

		@ $mol_mem
		overview_active() {
			return this.component() === ''
		}

		@ $mol_mem
		badge_active() {
			return this.component() === 'badge'
		}

		@ $mol_mem
		empty_active() {
			return this.component() === 'empty'
		}

		@ $mol_mem
		skeleton_active() {
			return this.component() === 'skeleton'
		}

		@ $mol_mem
		breadcrumb_active() {
			return this.component() === 'breadcrumb'
		}

		@ $mol_mem
		sidebar_active() {
			return this.component() === 'sidebar'
		}

		@ $mol_mem
		sheet_active() {
			return this.component() === 'sheet'
		}

		@ $mol_mem
		toast_active() {
			return this.component() === 'toast'
		}

		@ $mol_mem
		command_active() {
			return this.component() === 'command'
		}

		@ $mol_mem
		table_active() {
			return this.component() === 'table'
		}

		@ $mol_action
		nav_overview( next?: any ) {
			if( next !== undefined ) this.component( '' )
			return null
		}

		@ $mol_action
		nav_badge( next?: any ) {
			if( next !== undefined ) this.component( 'badge' )
			return null
		}

		@ $mol_action
		nav_empty( next?: any ) {
			if( next !== undefined ) this.component( 'empty' )
			return null
		}

		@ $mol_action
		nav_skeleton( next?: any ) {
			if( next !== undefined ) this.component( 'skeleton' )
			return null
		}

		@ $mol_action
		nav_breadcrumb( next?: any ) {
			if( next !== undefined ) this.component( 'breadcrumb' )
			return null
		}

		@ $mol_action
		nav_sidebar( next?: any ) {
			if( next !== undefined ) this.component( 'sidebar' )
			return null
		}

		@ $mol_action
		nav_sheet( next?: any ) {
			if( next !== undefined ) this.component( 'sheet' )
			return null
		}

		@ $mol_action
		nav_toast( next?: any ) {
			if( next !== undefined ) this.component( 'toast' )
			return null
		}

		@ $mol_action
		nav_command( next?: any ) {
			if( next !== undefined ) this.component( 'command' )
			return null
		}

		@ $mol_action
		nav_table( next?: any ) {
			if( next !== undefined ) this.component( 'table' )
			return null
		}

		@ $mol_action
		nav_divider( next?: any ) {
			if( next !== undefined ) this.component( 'divider' )
			return null
		}

		@ $mol_mem
		page_title() {
			const titles: Record<string, string> = {
				badge: 'Badge',
				empty: 'Empty State',
				skeleton: 'Skeleton',
				breadcrumb: 'Breadcrumb',
				sidebar: 'Sidebar',
				sheet: 'Sheet',
				toast: 'Toast',
				command: 'Command Palette',
				table: 'Data Table',
				divider: 'Divider',
			}
			return titles[ this.component() ] ?? 'Components Overview'
		}

		@ $mol_mem
		page_text() {
			const comp = this.component()
			if( !comp ) return 'Select a component from the sidebar'
			return `Demo for ${ this.page_title() } component`
		}

		@ $mol_mem
		pages() {
			const comp = this.component()
			let content: any
			switch( comp ) {
				case 'badge': content = this.Badge_page(); break
				case 'empty': content = this.Empty_page(); break
				case 'skeleton': content = this.Skeleton_page(); break
				case 'breadcrumb': content = this.Breadcrumb_page(); break
				case 'sidebar': content = this.Sidebar_page(); break
				case 'sheet': content = this.Sheet_page(); break
				case 'toast': content = this.Toast_page(); break
				case 'command': content = this.Command_page(); break
				case 'table': content = this.Table_page(); break
				case 'divider': content = this.Divider_page(); break
				default: content = this.Overview_page()
			}
			return [
				this.Nav(),
				content,
			]
		}

	}

}
