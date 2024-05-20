export type Categories = 'sveltekit' | 'svelte';

export type Post = {
    title: string,
    date: string,
    description: string,
    categories: Categories[],
    slug: string,
    published: boolean
};