namespace $ {

	function store( $: $ ) {
		return $bog_jj_store.make({ $ })
	}

	$mol_test({

		async 'a blog made by the author is owned by the author'( $ ) {

			const journal = store( $ )

			const link = await $mol_wire_async( journal ).blog_create( 'Мой дневник' )

			$mol_assert_unique( link, '' )
			$mol_assert_equal( store( $ ).blog_title( link ), 'Мой дневник' )
			$mol_assert_equal( store( $ ).can_edit( link ), true )

		},

		async 'an own blog appears in own blogs'( $ ) {

			const journal = store( $ )
			const link = await $mol_wire_async( journal ).blog_create( 'Список' )

			const links = store( $ ).blogs().map( blog => blog.link().str )

			$mol_assert_equal( links.includes( link ), true )

		},

		async 'a draft post is invisible until published'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Черновики' )
			const post_link = await $mol_wire_async( store( $ ) ).post_add( blog_link )

			$mol_assert_equal( store( $ ).post_published( post_link ), false )
			$mol_assert_equal( store( $ ).published( blog_link ).length, 0 )
			$mol_assert_equal( store( $ ).blog_posts_count( blog_link ), 0 )

			await $mol_wire_async( store( $ ) ).post_publish( post_link, true )

			$mol_assert_equal( store( $ ).post_published( post_link ), true )
			$mol_assert_equal( store( $ ).published( blog_link ).length, 1 )
			$mol_assert_equal( store( $ ).blog_posts_count( blog_link ), 1 )

		},

		async 'a published post of an own blog reaches the feed'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Лента своя' )
			const post_link = await $mol_wire_async( store( $ ) ).post_add( blog_link )

			await $mol_wire_async( store( $ ) ).post_title( post_link, 'Первый' )
			await $mol_wire_async( store( $ ) ).post_publish( post_link, true )

			const post = store( $ ).feed().find( post => post.link().str === post_link )!

			$mol_assert_equal( post.Title()!.val(), 'Первый' )

		},

		async 'title and tags of a post are written and read back'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Теги' )
			const post_link = await $mol_wire_async( store( $ ) ).post_add( blog_link )

			await $mol_wire_async( store( $ ) ).post_title( post_link, 'Заголовок' )
			await $mol_wire_async( store( $ ) ).post_tags( post_link, [ 'моль', 'база' ] )

			$mol_assert_equal( store( $ ).post_title( post_link ), 'Заголовок' )
			$mol_assert_like( store( $ ).post_tags( post_link ), [ 'моль', 'база' ] )

		},

		async 'a dropped post leaves the blog'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Удаление' )
			const post_link = await $mol_wire_async( store( $ ) ).post_add( blog_link )

			await $mol_wire_async( store( $ ) ).post_drop( blog_link, post_link )

			$mol_assert_equal( store( $ ).posts( blog_link ).length, 0 )

		},

		async 'gallery of tags collects published posts only'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Облако тегов' )
			const draft = await $mol_wire_async( store( $ ) ).post_add( blog_link )
			const live = await $mol_wire_async( store( $ ) ).post_add( blog_link )

			await $mol_wire_async( store( $ ) ).post_tags( draft, [ 'черновик' ] )
			await $mol_wire_async( store( $ ) ).post_tags( live, [ 'живой' ] )
			await $mol_wire_async( store( $ ) ).post_publish( live, true )

			const tags = store( $ ).tags()

			$mol_assert_equal( tags.includes( 'живой' ), true )
			$mol_assert_equal( tags.includes( 'черновик' ), false )

		},

		async 'a comment is stored in the open land and read back'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Обсуждение' )
			const post_link = await $mol_wire_async( store( $ ) ).post_add( blog_link )

			await $mol_wire_async( store( $ ) ).post_publish( post_link, true )
			await $mol_wire_async( store( $ ) ).comment_add( post_link, '', 'Привет!' )

			const comments = store( $ ).comments( post_link )

			$mol_assert_equal( comments.length, 1 )
			$mol_assert_equal( store( $ ).comment_text( comments[ 0 ].link().str ), 'Привет!' )
			$mol_assert_equal( store( $ ).comment_author( comments[ 0 ].link().str ), store( $ ).my_lord() )

		},

		async 'a reply nests under its parent comment'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Ветка' )
			const post_link = await $mol_wire_async( store( $ ) ).post_add( blog_link )

			await $mol_wire_async( store( $ ) ).comment_add( post_link, '', 'Корень' )
			const root = store( $ ).comments( post_link )[ 0 ].link().str

			await $mol_wire_async( store( $ ) ).comment_add( post_link, root, 'Ответ' )

			const tree = store( $ ).comment_tree( post_link )

			$mol_assert_equal( tree.roots.length, 1 )
			$mol_assert_equal( tree.roots[ 0 ], root )
			$mol_assert_equal( tree.children.get( root )!.length, 1 )
			$mol_assert_equal( tree.depth.get( tree.children.get( root )![ 0 ] ), 1 )

		},

		async 'an empty comment is ignored'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Пусто' )
			const post_link = await $mol_wire_async( store( $ ) ).post_add( blog_link )

			await $mol_wire_async( store( $ ) ).comment_add( post_link, '', '   ' )

			$mol_assert_equal( store( $ ).comments( post_link ).length, 0 )

		},

		async 'a dropped comment leaves the post'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Скрыть' )
			const post_link = await $mol_wire_async( store( $ ) ).post_add( blog_link )

			await $mol_wire_async( store( $ ) ).comment_add( post_link, '', 'Удалить меня' )
			const comment_link = store( $ ).comments( post_link )[ 0 ].link().str

			await $mol_wire_async( store( $ ) ).comment_drop( post_link, comment_link )

			$mol_assert_equal( store( $ ).comments( post_link ).length, 0 )

		},

		async 'a like toggles on and off'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Лайки' )
			const post_link = await $mol_wire_async( store( $ ) ).post_add( blog_link )

			$mol_assert_equal( store( $ ).liked( post_link ), false )

			await $mol_wire_async( store( $ ) ).like_toggle( post_link )

			$mol_assert_equal( store( $ ).liked( post_link ), true )
			$mol_assert_equal( store( $ ).likes( post_link ).length, 1 )

			await $mol_wire_async( store( $ ) ).like_toggle( post_link )

			$mol_assert_equal( store( $ ).liked( post_link ), false )
			$mol_assert_equal( store( $ ).likes( post_link ).length, 0 )

		},

		async 'a subscription toggles and brings a foreign blog into the feed'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Подписка' )
			const post_link = await $mol_wire_async( store( $ ) ).post_add( blog_link )

			await $mol_wire_async( store( $ ) ).post_publish( post_link, true )

			$mol_assert_equal( store( $ ).subs( blog_link ), false )

			await $mol_wire_async( store( $ ) ).subscribe_toggle( blog_link )
			$mol_assert_equal( store( $ ).subs( blog_link ), true )

			await $mol_wire_async( store( $ ) ).subscribe_toggle( blog_link )
			$mol_assert_equal( store( $ ).subs( blog_link ), false )

		},

		async 'socials are stored one per line'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Ссылки' )

			await $mol_wire_async( store( $ ) ).blog_socials( blog_link, 'https://a.example, https://b.example' )

			$mol_assert_equal( store( $ ).blog_socials( blog_link ), 'https://a.example\nhttps://b.example' )

		},

		async 'a blog keeps a link to its own open land'( $ ) {

			const journal = store( $ )
			const blog_link = await $mol_wire_async( journal ).blog_create( 'Открытый' )

			const public_link = store( $ ).blog_public_link( blog_link )

			$mol_assert_unique( public_link, '' )
			$mol_assert_unique( public_link, blog_link )

		},

	})

}
