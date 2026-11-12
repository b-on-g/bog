namespace $ {

	$mol_test({

		'comment tree: parentless comments become roots in order'( $ ) {

			const tree = $bog_jj_domain_tree([
				{ link: 'a', parent: '' },
				{ link: 'b', parent: '' },
			])

			$mol_assert_like( tree.roots, [ 'a', 'b' ] )
			$mol_assert_equal( tree.depth.get( 'a' ), 0 )
			$mol_assert_equal( tree.depth.get( 'b' ), 0 )

		},

		'comment tree: replies nest under their parent'( $ ) {

			const tree = $bog_jj_domain_tree([
				{ link: 'a', parent: '' },
				{ link: 'b', parent: 'a' },
				{ link: 'c', parent: 'b' },
				{ link: 'd', parent: 'a' },
			])

			$mol_assert_like( tree.roots, [ 'a' ] )
			$mol_assert_like( tree.children.get( 'a' ), [ 'b', 'd' ] )
			$mol_assert_like( tree.children.get( 'b' ), [ 'c' ] )
			$mol_assert_equal( tree.depth.get( 'c' ), 2 )
			$mol_assert_equal( tree.depth.get( 'd' ), 1 )

		},

		'comment tree: a reply to an unknown comment becomes a root'( $ ) {

			const tree = $bog_jj_domain_tree([
				{ link: 'a', parent: 'ghost' },
			])

			$mol_assert_like( tree.roots, [ 'a' ] )
			$mol_assert_equal( tree.depth.get( 'a' ), 0 )

		},

		'comment tree: a cycle does not hang and leaves no depth behind'( $ ) {

			const tree = $bog_jj_domain_tree([
				{ link: 'a', parent: 'b' },
				{ link: 'b', parent: 'a' },
				{ link: 'c', parent: '' },
			])

			$mol_assert_like( tree.roots, [ 'c' ] )
			$mol_assert_equal( tree.depth.get( 'c' ), 0 )
			$mol_assert_equal( tree.depth.get( 'a' ), undefined )

		},

		'comment tree: empty input gives empty tree'( $ ) {

			const tree = $bog_jj_domain_tree( [] )

			$mol_assert_like( tree.roots, [] )
			$mol_assert_equal( tree.children.size, 0 )

		},

		'excerpt: strips tags, decodes entities and collapses spaces'( $ ) {

			const text = $bog_jj_domain_excerpt(
				'<p>Hello&nbsp;<b>world</b> &amp; &lt;friends&gt;</p>\n<p>again</p>'
			)

			$mol_assert_equal( text, 'Hello world & <friends> again' )

		},

		'excerpt: cuts long text and appends an ellipsis'( $ ) {

			const text = $bog_jj_domain_excerpt( '<p>' + 'a'.repeat( 300 ) + '</p>', 10 )

			$mol_assert_equal( text, 'aaaaaaaaaa…' )

		},

		'excerpt: short text stays untouched'( $ ) {

			$mol_assert_equal( $bog_jj_domain_excerpt( '<p>short</p>' ), 'short' )

		},

		'excerpt: inline spans do not split words'( $ ) {

			const text = $bog_jj_domain_excerpt(
				'<p><span>Привет</span><span> из </span><span>Базы</span><span>!</span></p>'
			)

			$mol_assert_equal( text, 'Привет из Базы!' )

		},

		'date: a moment becomes a human readable day'( $ ) {

			const moment = new $mol_time_moment( '2024-03-07T12:00:00Z' )

			$mol_assert_equal( $bog_jj_domain_date( moment ), moment.toString( 'D Mon YYYY' ) )

		},

		'date: no moment gives an empty string'( $ ) {

			$mol_assert_equal( $bog_jj_domain_date( null ), '' )

		},

	})

}
