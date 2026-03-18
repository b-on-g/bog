namespace $.$$ {
	declare function qrcode(
		typeNumber: number,
		errorCorrectionLevel: string,
	): {
		addData(data: string): void
		make(): void
		getModuleCount(): number
		isDark(row: number, col: number): boolean
	}

	let grad_counter = 0

	export class $bog_qr extends $.$bog_qr {

		@$mol_mem
		gradient_id() {
			return 'qr-grad-' + ( ++grad_counter )
		}

		@$mol_mem
		gradient_fill() {
			return `url(#${ this.gradient_id() })`
		}

		@$mol_mem
		grad_x1() {
			const a = this.gradient_angle() * Math.PI / 180
			return String(0.5 - Math.cos(a) * 0.5)
		}

		@$mol_mem
		grad_y1() {
			const a = this.gradient_angle() * Math.PI / 180
			return String(0.5 - Math.sin(a) * 0.5)
		}

		@$mol_mem
		grad_x2() {
			const a = this.gradient_angle() * Math.PI / 180
			return String(0.5 + Math.cos(a) * 0.5)
		}

		@$mol_mem
		grad_y2() {
			const a = this.gradient_angle() * Math.PI / 180
			return String(0.5 + Math.sin(a) * 0.5)
		}

		@$mol_mem
		gradient_stop_list() {
			const colors = this.gradient_stops()
			return colors.map((_, i) => this.Stop(i))
		}

		stop_offset(index: number) {
			const colors = this.gradient_stops()
			if (colors.length <= 1) return '0%'
			return Math.round(index / (colors.length - 1) * 100) + '%'
		}

		stop_color(index: number) {
			return this.gradient_stops()[index]
		}

		@$mol_mem
		qr_lib() {
			return $mol_import.script('https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js')
		}

		@$mol_mem
		qr_matrix() {
			this.qr_lib()
			const data = this.uri()
			if (!data) return null

			const qr = qrcode(0, this.error_correction())
			qr.addData(data)
			qr.make()

			const count = qr.getModuleCount()
			const matrix: boolean[][] = []
			for (let r = 0; r < count; r++) {
				matrix[r] = []
				for (let c = 0; c < count; c++) {
					matrix[r][c] = qr.isDark(r, c)
				}
			}
			return matrix
		}

		@$mol_mem
		qr_view_box() {
			const matrix = this.qr_matrix()
			if (!matrix) return '0 0 1 1'
			const total = matrix.length + this.quiet_zone() * 2
			return `0 0 ${total} ${total}`
		}

		@$mol_mem
		qr_paths() {
			const matrix = this.qr_matrix()
			if (!matrix) return { modules: '', rings: '', centers: '' }

			const count = matrix.length
			const quiet = this.quiet_zone()
			const r = this.module_radius()

			const dark = (row: number, col: number) =>
				row >= 0 && row < count && col >= 0 && col < count && matrix[row][col]

			const isFinder = (row: number, col: number) =>
				(row < 7 && col < 7) || (row < 7 && col >= count - 7) || (row >= count - 7 && col < 7)

			const hasCenter = this.center().length > 0
			const centerRadius = hasCenter ? count * 0.15 : 0
			const centerMid = count / 2
			const isCenter = (row: number, col: number) => {
				if (!hasCenter) return false
				const dx = col + 0.5 - centerMid
				const dy = row + 0.5 - centerMid
				return dx * dx + dy * dy < centerRadius * centerRadius
			}

			let modules = ''
			for (let row = 0; row < count; row++) {
				for (let col = 0; col < count; col++) {
					if (!matrix[row][col]) continue
					if (isFinder(row, col)) continue
					if (isCenter(row, col)) continue

					const x = col + quiet
					const y = row + quiet

					const top = dark(row - 1, col)
					const bottom = dark(row + 1, col)
					const left = dark(row, col - 1)
					const right = dark(row, col + 1)

					const alone = !top && !bottom && !left && !right

					if (alone) {
						const cx = x + 0.5
						const cy = y + 0.5
						const cr = 0.5
						modules += `M${cx - cr},${cy}A${cr},${cr},0,1,1,${cx + cr},${cy}A${cr},${cr},0,1,1,${cx - cr},${cy}Z`
					} else {
						const tl = !top && !left ? r : 0
						const tr = !top && !right ? r : 0
						const br = !bottom && !right ? r : 0
						const bl = !bottom && !left ? r : 0
						modules += this.rect_path(x, y, 1, 1, tl, tr, br, bl)
					}
				}
			}

			const fr = this.finder_radius()
			const finders = [
				[quiet, quiet],
				[count - 7 + quiet, quiet],
				[quiet, count - 7 + quiet],
			]

			let rings = ''
			let centers = ''
			for (const [fx, fy] of finders) {
				rings += this.rect_path(fx, fy, 7, 7, fr, fr, fr, fr)
				rings += this.rect_path(fx + 1, fy + 1, 5, 5, fr * 0.7, fr * 0.7, fr * 0.7, fr * 0.7)
				centers += this.rect_path(fx + 2, fy + 2, 3, 3, fr * 0.5, fr * 0.5, fr * 0.5, fr * 0.5)
			}

			return { modules, rings, centers }
		}

		@$mol_mem
		center_area() {
			const matrix = this.qr_matrix()
			if (!matrix || this.center().length === 0) return { x: 0, y: 0, size: 0 }
			const count = matrix.length
			const quiet = this.quiet_zone()
			const centerSize = count * 0.3
			const total = count + quiet * 2
			return {
				x: (total - centerSize) / 2,
				y: (total - centerSize) / 2,
				size: centerSize,
			}
		}

		center_x() {
			return String(this.center_area().x)
		}

		center_y() {
			return String(this.center_area().y)
		}

		center_size() {
			return String(this.center_area().size)
		}

		modules_d() {
			return this.qr_paths().modules
		}

		rings_d() {
			return this.qr_paths().rings
		}

		centers_d() {
			return this.qr_paths().centers
		}

		rect_path(x: number, y: number, w: number, h: number, tl: number, tr: number, br: number, bl: number) {
			return [
				`M${x + tl},${y}`,
				`H${x + w - tr}`,
				tr ? `A${tr},${tr},0,0,1,${x + w},${y + tr}` : '',
				`V${y + h - br}`,
				br ? `A${br},${br},0,0,1,${x + w - br},${y + h}` : '',
				`H${x + bl}`,
				bl ? `A${bl},${bl},0,0,1,${x},${y + h - bl}` : '',
				`V${y + tl}`,
				tl ? `A${tl},${tl},0,0,1,${x + tl},${y}` : '',
				'Z',
			]
				.filter(Boolean)
				.join('')
		}
	}
}
