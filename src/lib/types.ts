// Create a type Post that satisfies the requirements in the api/posts/+server.ts file.

export type Post = {
	title: string
	slug: string
	description: string
	date: string
	categories: string[]
	coverImage?: string
	coverWidth?: number
	coverHeight?: number
	published: boolean
}
