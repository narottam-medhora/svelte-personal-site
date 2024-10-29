import { json } from '@sveltejs/kit'

async function getAllCategories() {
	const paths = import.meta.glob('/src/posts/*.md', { eager: true })
	const categories = new Set<string>()

	for (const path in paths) {
		const file = paths[path]

		if (file && typeof file === 'object' && 'metadata' in file) {
			const metadata = file.metadata as { categories?: string[]; published: boolean }

			if (metadata.published && metadata.categories) {
				metadata.categories.forEach((category) => categories.add(category))
			}
		}
	}

	return Array.from(categories).sort()
}

export async function GET() {
	const categories = await getAllCategories()
	return json(categories)
}
