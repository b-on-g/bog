namespace $ {

	export type $bog_jj_photo_list = {
		make( config: null ): $giper_baza_file
	}

	export class $bog_jj_photo extends $mol_object {

		@ $mol_mem_key
		source( file: File ): Blob {
			const detected = file.type.toLowerCase()
			const extension = file.name.split( '.' ).pop()?.toLowerCase()
			const type = detected.startsWith( 'image/' )
				? detected
				: extension === 'jpg' || extension === 'jpeg'
					? 'image/jpeg'
					: extension === 'png'
						? 'image/png'
						: extension === 'webp'
							? 'image/webp'
							: detected
			return new Blob( [ file ], { type } )
		}

		@ $mol_mem_key
		picture( file: File ) {
			return $mol_picture.fit( this.source( file ), 1600 )
		}

		@ $mol_action
		async save( files: readonly File[], list: $bog_jj_photo_list ) {
			const prepared = await Promise.all( files.map( async file => {
				const blob = this.picture( file ).format( 'image/webp', .82 ) as unknown as Blob | null
				if( !blob ) return null
				const buffer = new Uint8Array( await blob.arrayBuffer() )
				const extension = blob.type === 'image/webp' ? 'webp' : blob.type === 'image/jpeg' ? 'jpg' : 'png'
				return { file, blob, buffer, extension }
			} ) )

			return prepared.flatMap( item => {
				if( !item ) return []
				const photo = list.make( null )
				photo.buffer( item.buffer )
				photo.type( item.blob.type || 'image/png' )
				photo.name( `${ item.file.name.replace( /\.[^/.]+$/, '' ) }.${ item.extension }` )
				return [ photo ]
			} )
		}

		@ $mol_mem_key
		file( link: string ) {
			return this.$.$giper_baza_glob.Pawn( new this.$.$giper_baza_link( link ), $giper_baza_file )
		}

		@ $mol_mem_key
		blob( link: string ) {
			if( !link ) return null
			const file = this.file( link )
			if( !file.filled() ) return null
			return file.blob() as Blob
		}

		@ $mol_mem_key
		url( link: string ): string {
			const blob = this.blob( link )
			return blob ? this.$.$yuf_url_object.from_blob( blob ).toString() : ''
		}

	}

}
