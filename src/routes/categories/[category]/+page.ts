import type { Post } from '$lib/types'

export async function load({ fetch }) {
	const [categoriesRes, postsRes] = await Promise.all([
		fetch('/api/categories'),
		fetch('/api/posts')
	])

	const categories: string[] = await categoriesRes.json()
	const posts: Post[] = await postsRes.json()

	// Create a count of posts per category
	const counts = categories.reduce(
		(acc, category) => {
			acc[category] = posts.filter((post) => post.categories.includes(category)).length
			return acc
		},
		{} as Record<string, number>
	)

	return {
		categories,
		counts
	}
}
