namespace $.$$ {

	const presets: Record<string, string[]> = {
		default: [ 'var(--mol_theme_special)', 'var(--mol_theme_focus)' ],
		red_orange: [ '#ff6b6b', '#feca57' ],
		blue_purple: [ '#48dbfb', '#a855f7' ],
		green_teal: [ '#10b981', '#06b6d4' ],
	}

	export class $bog_qr_demo extends $.$bog_qr_demo {

		@$mol_mem
		preset_stops() {
			const key = this.preset()
			return presets[ key ] ?? presets[ 'default' ]
		}

		@$mol_mem
		icon_data( next?: string ) {
			return next ?? ''
		}

		@$mol_mem
		preview_center(): readonly $mol_view[] {
			const data = this.icon_data()
			if( !data ) return []
			return [ this.Icon_image() ]
		}

		@$mol_mem
		preview_ec() {
			return this.icon_data() ? 'H' : 'M'
		}

		@$mol_mem
		Icon_image() {
			const obj = new this.$.$mol_image()
			obj.uri = () => this.icon_data()
			return obj
		}

		icon_pick( next?: any ) {
			if( next === undefined ) return null
			const input = document.createElement( 'input' )
			input.type = 'file'
			input.accept = 'image/*'
			input.onchange = () => {
				const file = input.files?.[ 0 ]
				if( !file ) return
				const reader = new FileReader()
				reader.onload = () => {
					this.icon_data( reader.result as string )
				}
				reader.readAsDataURL( file )
			}
			input.click()
			return null
		}

		icon_clear( next?: any ) {
			if( next === undefined ) return null
			this.icon_data( '' )
			return null
		}

		download( next?: any ) {
			if( next === undefined ) return null

			const svg = this.Preview().dom_node() as SVGSVGElement
			const clone = svg.cloneNode( true ) as SVGSVGElement

			const foreign = clone.querySelector( 'foreignObject' )
			if( foreign ) foreign.remove()

			let source = new XMLSerializer().serializeToString( clone )

			if( !source.includes( 'xmlns=' ) ) {
				source = source.replace( '<svg', '<svg xmlns="http://www.w3.org/2000/svg"' )
			}

			const styles = getComputedStyle( svg )
			const special = styles.getPropertyValue( '--mol_theme_special' ).trim()
			const focus = styles.getPropertyValue( '--mol_theme_focus' ).trim()
			source = source.replace( /var\(--mol_theme_special\)/g, special || '#3a86ff' )
			source = source.replace( /var\(--mol_theme_focus\)/g, focus || '#8338ec' )

			const size = 1024
			const dataUrl = 'data:image/svg+xml;base64,' + btoa( unescape( encodeURIComponent( source ) ) )

			const iconSrc = this.icon_data()

			const img = new Image()
			img.onload = () => {
				const canvas = document.createElement( 'canvas' )
				canvas.width = size
				canvas.height = size
				const ctx = canvas.getContext( '2d' )!
				ctx.fillStyle = '#ffffff'
				ctx.fillRect( 0, 0, size, size )
				ctx.drawImage( img, 0, 0, size, size )

				if( iconSrc ) {
					const icon = new Image()
					icon.onload = () => {
						const iconSize = size * 0.22
						const x = ( size - iconSize ) / 2
						ctx.drawImage( icon, x, x, iconSize, iconSize )

						const a = document.createElement( 'a' )
						a.href = canvas.toDataURL( 'image/png' )
						a.download = 'qr-code.png'
						a.click()
					}
					icon.src = iconSrc
				} else {
					const a = document.createElement( 'a' )
					a.href = canvas.toDataURL( 'image/png' )
					a.download = 'qr-code.png'
					a.click()
				}
			}
			img.src = dataUrl

			return null
		}

	}

}
