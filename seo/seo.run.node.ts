namespace $ {

	setTimeout( ()=> {
		const server = new $bog_seo()
		const dump_dir = process.env.BOG_SEO_DUMP_DIR
		if( dump_dir ) {
			$mol_wire_async( server ).dump_to( dump_dir )
			return
		}
		server.http()
		if( server.warmup_enabled() ) {
			$mol_wire_async( server ).crawl_all()
		}
	} )

}
