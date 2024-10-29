import { error } from '@sveltejs/kit'
import type { Post } from '$lib/types'

export async function load({ fetch, params }) {
	const response = await fetch(`/api/categories/${params.category}`)

	if (!response.ok) {
		throw error(404, `No posts found in category "${params.category}"`)
	}

	const posts: Post[] = await response.json()

	return {
		category: params.category,
		posts
	}
}
