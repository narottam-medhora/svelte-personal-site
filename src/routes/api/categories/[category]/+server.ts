import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types'

async function getPostsByCategory(category: string) {
	let posts: Post[] = []
	const paths = import.meta.glob('/src/posts/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>
			const post = { ...metadata, slug } satisfies Post

			if (post.published && post.categories.includes(category)) {
				posts.push(post)
			}

			post.published && posts.push(post)
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	return posts
}

export async function GET({ params }) {
	const { category } = params
	const posts = await getPostsByCategory(category)

	// Return 404 if no posts for the category exist
	if (posts.length === 0) {
		return new Response('No posts found for this category', { status: 404 })
	}

	return json(posts)
}
