namespace $ {

	function vec( ...nums: number[] ) {
		return new Float32Array( nums )
	}

	$mol_test( {

		'empty pool returns empty result'( $ ) {
			const out = $.$bog_recsys.recommend( [] )
			$mol_assert_equal( out.length, 0 )
		},

		'excludes ids in exclude set'( $ ) {
			$.$bog_recsys.namespace( 'test_exclude_' + Math.random() )
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

		'parallel embeddings rank above orthogonal'( $ ) {
			$.$bog_recsys.namespace( 'test_cosine_' + Math.random() )
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

		'feedback raises tag reward and shifts ranking'( $ ) {
			$.$bog_recsys.namespace( 'test_feedback_' + Math.random() )
			$.$bog_recsys.epsilon( 0 )

			const liked = { id: 'liked', tags: [ 'jazz' ] }
			const other = { id: 'other', tags: [ 'metal' ] }

			$.$bog_recsys.feedback( liked, 'like' )
			const r = $.$bog_recsys.rewards()
			$mol_assert_equal( r.jazz > 0, true )

			const out = $.$bog_recsys.recommend( [ other, liked ], { limit: 2 } )
			$mol_assert_equal( out[ 0 ].id, 'liked' )
		},

		'reset clears persisted state'( $ ) {
			$.$bog_recsys.namespace( 'test_reset_' + Math.random() )
			$.$bog_recsys.epsilon( 0 )

			$.$bog_recsys.feedback( { id: 'x', tags: [ 'pop' ] }, 'like' )
			$mol_assert_equal( $.$bog_recsys.rewards().pop > 0, true )

			$.$bog_recsys.reset()
			$mol_assert_equal( Object.keys( $.$bog_recsys.rewards() ).length, 0 )
		},

	} )

}
