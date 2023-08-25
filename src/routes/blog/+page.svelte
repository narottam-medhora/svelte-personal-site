<script>
	import PostsList from '$lib/components/PostsList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { siteDescription } from '$lib/config';
	import Placeholder from '$lib/components/Placeholder.svelte';

	// TODO: Uncomment this when we go live
	export let data;
</script>

<svelte:head>
	<title>Blog</title>
	<meta data-key="description" name="description" content={siteDescription} />
</svelte:head>

<article class="article-container">
	<h1>Blog</h1>
	<!-- <Placeholder /> -->
</article>

<!-- TODO: Uncomment when we go live -->
<PostsList posts={data.posts} />

<Pagination currentPage={1} totalPosts={data.total} />
