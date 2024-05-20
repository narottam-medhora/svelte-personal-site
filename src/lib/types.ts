export type Categories = 'sveltekit' | 'svelte';

export type Post = {
    title: string,
    date: string,
    categories: Categories[],
    slug: string,
    published: boolean
};