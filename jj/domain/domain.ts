namespace $ {

	/** Comment to a post. Lives in the open land of the blog. */
	export class $bog_jj_domain_comment extends $giper_baza_dict.with({
		Text: $giper_baza_atom_text,
		Parent: $giper_baza_atom_text,
		Author: $giper_baza_atom_text,
		Created: $giper_baza_atom_time,
	}) {}

	export class $bog_jj_domain_comment_list extends $giper_baza_list_link.to( ()=> $bog_jj_domain_comment ) {}

	/** Open land of the blog: anyone may post, everyone may read. */
	export class $bog_jj_domain_public extends $giper_baza_dict.with({
		Comments: $giper_baza_dict_to( $bog_jj_domain_comment_list ),
		Likes: $giper_baza_dict_to( $giper_baza_list_str ),
	}) {}

	export class $bog_jj_domain_post extends $giper_baza_dict.with({
		Title: $giper_baza_atom_text,
		Body: $giper_baza_atom_link.to( ()=> $giper_baza_rich ),
		Cover: $giper_baza_list_link.to( ()=> $giper_baza_file ),
		Tags: $giper_baza_list_str,
		Created: $giper_baza_atom_time,
		Published: $giper_baza_atom_bool,
	}) {}

	/** Blog is the author land and the author profile at once. */
	export class $bog_jj_domain_blog extends $giper_baza_dict.with({
		Title: $giper_baza_atom_text,
		About: $giper_baza_atom_text,
		Avatar: $giper_baza_list_link.to( ()=> $giper_baza_file ),
		Cover: $giper_baza_list_link.to( ()=> $giper_baza_file ),
		Socials: $giper_baza_list_str,
		Posts: $giper_baza_list_link.to( ()=> $bog_jj_domain_post ),
		Public: $giper_baza_atom_link.to( ()=> $bog_jj_domain_public ),
		Created: $giper_baza_atom_time,
	}) {}

	/** Reader land: own blogs and subscriptions. */
	export class $bog_jj_domain_home extends $giper_baza_dict.with({
		Blogs: $giper_baza_list_link.to( ()=> $bog_jj_domain_blog ),
		Subs: $giper_baza_list_str,
	}) {}

	export type $bog_jj_domain_tree = {
		roots: readonly string[]
		children: ReadonlyMap< string, readonly string[] >
		depth: ReadonlyMap< string, number >
	}

	/** Splits flat comments into a tree by parent links. Orphans and cycles become roots. */
	export function $bog_jj_domain_tree( items: readonly { link: string, parent: string }[] ): $bog_jj_domain_tree {

		const known = new Set( items.map( item => item.link ) )
		const children = new Map< string, string[] >()
		const roots = [] as string[]

		for( const item of items ) {
			const parent = item.parent && known.has( item.parent ) ? item.parent : ''
			if( !parent ) {
				roots.push( item.link )
				continue
			}
			const list = children.get( parent ) ?? []
			list.push( item.link )
			children.set( parent, list )
		}

		const depth = new Map< string, number >()
		const walked = new Set< string >()

		const walk = ( link: string, level: number )=> {
			if( walked.has( link ) ) return
			walked.add( link )
			depth.set( link, level )
			for( const child of children.get( link ) ?? [] ) walk( child, level + 1 )
		}

		for( const root of roots ) walk( root, 0 )

		return { roots, children, depth }
	}

	/** Plain text of rich HTML for previews. */
	export function $bog_jj_domain_excerpt( html: string, length = 240 ) {
		const text = html
			.replace( /<br\s*\/?>/gi, ' ' )
			.replace( /<\/(?:p|div|section|article|li|ul|ol|h[1-6]|blockquote|pre|tr|td|th)>/gi, ' ' )
			.replace( /<[^>]*>/g, '' )
			.replace( /&nbsp;/g, ' ' )
			.replace( /&lt;/g, '<' )
			.replace( /&gt;/g, '>' )
			.replace( /&quot;/g, '"' )
			.replace( /&#39;/g, "'" )
			.replace( /&amp;/g, '&' )
			.replace( /\s+/g, ' ' )
			.trim()
		return text.length > length ? text.slice( 0, length ).trimEnd() + '…' : text
	}

	/** Last uploaded image link of the field. */
	export function $bog_jj_domain_image( list: $giper_baza_list_link | null ) {
		return list?.items().at( -1 )?.str ?? ''
	}

	/** Parse user input into a link, or null. */
	export function $bog_jj_domain_link( text: string ) {
		const str = text.trim()
		if( !str ) return null
		return $giper_baza_link.check( str ) ?? $giper_baza_link.check( `___${ str }` )
	}

	export function $bog_jj_domain_date( moment: $mol_time_moment | null ) {
		return moment ? moment.toString( 'D Mon YYYY' ) : ''
	}

	export function $bog_jj_domain_uri( this: $, params: Record< string, string | null > ) {
		return this.$mol_state_arg.link( params )
	}

}
