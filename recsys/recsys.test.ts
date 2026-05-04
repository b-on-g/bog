namespace $ {

	function vec( ...nums: number[] ) {
		return new Float32Array( nums )
	}

	let ns_seq = 0
	function ns( prefix: string ) {
		return `${ prefix }_${ Date.now() }_${ ++ns_seq }`
	}

	$mol_test( {

		'empty pool returns empty result'( $ ) {
			const out = $.$bog_recsys.recommend( [] )
			$mol_assert_equal( out.length, 0 )
		},

		'single-item pool always returns that item'( $ ) {
			$.$bog_recsys.namespace( ns( 'single' ) )
			$.$bog_recsys.epsilon( 0 )
			const only = { id: 'only', embedding: vec( 1, 0 ) }
			const out = $.$bog_recsys.recommend( [ only ], { limit: 5 } )
			$mol_assert_equal( out.length, 1 )
			$mol_assert_equal( out[ 0 ].id, 'only' )
		},

		'excludes ids in exclude set'( $ ) {
			$.$bog_recsys.namespace( ns( 'exclude' ) )
			$.$bog_recsys.epsilon( 0 )

			const pool = [
				{ id: 'a', embedding: vec( 1, 0 ) },
				{ id: 'b', embedding: vec( 1, 0 ) },
				{ id: 'c', embedding: vec( 1, 0 ) },
			]

			const out = $.$bog_recsys.recommend( pool, {
				exclude: [ 'a', 'b' ],
				limit: 5,
			} )

			$mol_assert_equal( out.length, 1 )
			$mol_assert_equal( out[ 0 ].id, 'c' )
		},

		'exclude as Set works'( $ ) {
			$.$bog_recsys.namespace( ns( 'exclude_set' ) )
			$.$bog_recsys.epsilon( 0 )
			const out = $.$bog_recsys.recommend(
				[ { id: 'a' }, { id: 'b' } ],
				{ exclude: new Set( [ 'a' ] ), limit: 5 },
			)
			$mol_assert_equal( out.length, 1 )
			$mol_assert_equal( out[ 0 ].id, 'b' )
		},

		'parallel embeddings rank above orthogonal'( $ ) {
			$.$bog_recsys.namespace( ns( 'cosine' ) )
			$.$bog_recsys.epsilon( 0 )

			const seed = { id: 'seed', embedding: vec( 1, 0, 0 ) }
			const parallel = { id: 'par', embedding: vec( 2, 0, 0 ) }
			const orthogonal = { id: 'ort', embedding: vec( 0, 1, 0 ) }

			const out = $.$bog_recsys.recommend( [ orthogonal, parallel ], {
				seed,
				limit: 2,
			} )

			$mol_assert_equal( out[ 0 ].id, 'par' )
			$mol_assert_equal( out[ 1 ].id, 'ort' )
		},

		'no seed: ranking falls back to tag rewards'( $ ) {
			$.$bog_recsys.namespace( ns( 'no_seed' ) )
			$.$bog_recsys.epsilon( 0 )

			$.$bog_recsys.feedback( { id: 'x', tags: [ 'jazz' ] }, 'like' )

			const out = $.$bog_recsys.recommend( [
				{ id: 'm', tags: [ 'metal' ] },
				{ id: 'j', tags: [ 'jazz' ] },
			], { limit: 2 } )

			$mol_assert_equal( out[ 0 ].id, 'j' )
		},

		'play raises tag reward, skip lowers it'( $ ) {
			$.$bog_recsys.namespace( ns( 'play_skip' ) )

			$.$bog_recsys.feedback( { id: 'a', tags: [ 'pop' ] }, 'play' )
			const after_play = $.$bog_recsys.rewards().pop ?? 0
			$mol_assert_equal( after_play > 0, true )

			$.$bog_recsys.feedback( { id: 'a', tags: [ 'pop' ] }, 'skip' )
			const after_skip = $.$bog_recsys.rewards().pop ?? 0
			$mol_assert_equal( after_skip < after_play, true )
		},

		'dislike pushes reward more negative than a single skip'( $ ) {
			$.$bog_recsys.namespace( ns( 'dislike_vs_skip' ) )
			$.$bog_recsys.feedback( { id: 'a', tags: [ 'punk' ] }, 'skip' )
			const skipped = $.$bog_recsys.rewards().punk ?? 0

			$.$bog_recsys.namespace( ns( 'dislike_vs_skip2' ) )
			$.$bog_recsys.feedback( { id: 'a', tags: [ 'punk' ] }, 'dislike' )
			const disliked = $.$bog_recsys.rewards().punk ?? 0

			$mol_assert_equal( disliked < skipped, true )
		},

		'decay attenuates old reward when new feedback arrives'( $ ) {
			$.$bog_recsys.namespace( ns( 'decay' ) )
			$.$bog_recsys.decay( 0.5 )

			$.$bog_recsys.feedback( { id: 'a', tags: [ 'rock' ] }, 'like' )  // 0 * 0.5 + 1 = 1
			const r1 = $.$bog_recsys.rewards().rock
			$mol_assert_equal( r1, 1 )

			$.$bog_recsys.feedback( { id: 'a', tags: [ 'rock' ] }, 'like' )  // 1 * 0.5 + 1 = 1.5
			const r2 = $.$bog_recsys.rewards().rock
			$mol_assert_equal( r2, 1.5 )

			// reset decay back to default for other tests
			$.$bog_recsys.decay( 0.92 )
		},

		'namespaces are isolated'( $ ) {
			const a = ns( 'iso_a' )
			const b = ns( 'iso_b' )

			$.$bog_recsys.namespace( a )
			$.$bog_recsys.feedback( { id: 'x', tags: [ 'jazz' ] }, 'like' )

			$.$bog_recsys.namespace( b )
			const rewards_b = $.$bog_recsys.rewards()
			$mol_assert_equal( Object.keys( rewards_b ).length, 0 )

			$.$bog_recsys.namespace( a )
			const rewards_a = $.$bog_recsys.rewards()
			$mol_assert_equal( ( rewards_a.jazz ?? 0 ) > 0, true )
		},

		'limit returns up to N distinct items'( $ ) {
			$.$bog_recsys.namespace( ns( 'limit' ) )
			$.$bog_recsys.epsilon( 0 )

			const seed = { id: 'seed', embedding: vec( 1, 0 ) }
			const pool = [
				{ id: 'a', embedding: vec( 1, 0 ) },
				{ id: 'b', embedding: vec( 0.9, 0.1 ) },
				{ id: 'c', embedding: vec( 0.5, 0.5 ) },
				{ id: 'd', embedding: vec( 0, 1 ) },
			]
			const out = $.$bog_recsys.recommend( pool, { seed, limit: 3 } )
			$mol_assert_equal( out.length, 3 )
			$mol_assert_equal( new Set( out.map( i => i.id ) ).size, 3 )
		},

		'feedback raises tag reward and shifts ranking'( $ ) {
			$.$bog_recsys.namespace( ns( 'feedback_shift' ) )
			$.$bog_recsys.epsilon( 0 )

			const liked = { id: 'liked', tags: [ 'jazz' ] }
			const other = { id: 'other', tags: [ 'metal' ] }

			$.$bog_recsys.feedback( liked, 'like' )
			$mol_assert_equal( $.$bog_recsys.rewards().jazz > 0, true )

			const out = $.$bog_recsys.recommend( [ other, liked ], { limit: 2 } )
			$mol_assert_equal( out[ 0 ].id, 'liked' )
		},

		'reset clears persisted state'( $ ) {
			$.$bog_recsys.namespace( ns( 'reset' ) )
			$.$bog_recsys.epsilon( 0 )

			$.$bog_recsys.feedback( { id: 'x', tags: [ 'pop' ] }, 'like' )
			$mol_assert_equal( $.$bog_recsys.rewards().pop > 0, true )

			$.$bog_recsys.reset()
			$mol_assert_equal( Object.keys( $.$bog_recsys.rewards() ).length, 0 )
		},

	} )

}
