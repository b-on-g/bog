namespace $ {

	export type $bog_recsys_item = {
		readonly id: string
		readonly embedding?: Float32Array | readonly number[]
		readonly tags?: readonly string[]
	}

	export type $bog_recsys_feedback = 'play' | 'skip' | 'like' | 'dislike'

	const reward_of: Record< $bog_recsys_feedback, number > = {
		play: 0.5,
		skip: -0.5,
		like: 1,
		dislike: -1,
	}

	export class $bog_recsys extends $mol_object2 {

		@ $mol_mem
		static namespace( next?: string ) {
			return next ?? 'default'
		}

		@ $mol_mem
		static epsilon( next?: number ) {
			return next ?? 0.15
		}

		@ $mol_mem
		static decay( next?: number ) {
			return next ?? 0.92
		}

		protected static storage_key() {
			return `bog_recsys_${ this.namespace() }_rewards`
		}

		@ $mol_mem
		static rewards( next?: Record< string, number > ): Record< string, number > {
			const stored = this.$.$mol_state_local.value( this.storage_key(), next ?? undefined ) as Record< string, number > | null
			return stored ?? {}
		}

		static recommend(
			pool: readonly $bog_recsys_item[],
			opts?: {
				seed?: $bog_recsys_item | null,
				exclude?: ReadonlySet< string > | readonly string[],
				limit?: number,
			},
		): $bog_recsys_item[] {

			const exclude_set = opts?.exclude
				? ( opts.exclude instanceof Set
					? opts.exclude
					: new Set< string >( opts.exclude as readonly string[] ) )
				: null

			const filtered = exclude_set
				? pool.filter( item => !exclude_set.has( item.id ) )
				: pool.slice()

			if( filtered.length === 0 ) return []

			const limit = Math.max( 1, opts?.limit ?? 1 )
			const seed = opts?.seed ?? null
			const rewards = this.rewards()
			const eps = this.epsilon()
			const rand = this.$.Math.random

			const explore = rand() < eps
			if( explore ) {
				const out: $bog_recsys_item[] = []
				const remaining = filtered.slice()
				while( out.length < limit && remaining.length > 0 ) {
					const idx = Math.floor( rand() * remaining.length )
					out.push( remaining.splice( idx, 1 )[ 0 ] )
				}
				return out
			}

			const scored = filtered.map( item => ( {
				item,
				score: 0.6 * cosine( seed?.embedding, item.embedding )
					+ 0.3 * tag_reward( item.tags, rewards )
					+ 0.1 * rand(),
			} ) )

			scored.sort( ( a, b ) => b.score - a.score )
			return scored.slice( 0, limit ).map( s => s.item )
		}

		@ $mol_action
		static feedback( item: $bog_recsys_item, signal: $bog_recsys_feedback ): void {
			const tags = item.tags
			if( !tags || tags.length === 0 ) return

			const r = reward_of[ signal ]
			const decay = this.decay()

			try {
				const current = { ... this.rewards() }
				for( const tag of tags ) {
					const prev = current[ tag ] ?? 0
					current[ tag ] = prev * decay + r
				}
				this.$.$mol_state_local.value( this.storage_key(), current )
				this.rewards( current )
			} catch( error: any ) {
				console.warn( error )
			}
		}

		@ $mol_action
		static reset(): void {
			try {
				this.$.$mol_state_local.value( this.storage_key(), null )
				this.rewards( {} )
			} catch( error: any ) {
				console.warn( error )
			}
		}

	}

	function cosine(
		a?: Float32Array | readonly number[],
		b?: Float32Array | readonly number[],
	): number {
		if( !a || !b ) return 0
		const len = Math.min( a.length, b.length )
		if( len === 0 ) return 0
		let dot = 0, na = 0, nb = 0
		for( let i = 0; i < len; ++i ) {
			const x = a[ i ], y = b[ i ]
			dot += x * y
			na += x * x
			nb += y * y
		}
		if( na === 0 || nb === 0 ) return 0
		return dot / Math.sqrt( na * nb )
	}

	function tag_reward(
		tags: readonly string[] | undefined,
		rewards: Record< string, number >,
	): number {
		if( !tags || tags.length === 0 ) return 0
		let sum = 0, n = 0
		for( const tag of tags ) {
			const r = rewards[ tag ]
			if( typeof r === 'number' ) { sum += r; ++n }
		}
		return n === 0 ? 0 : sum / n
	}

}
