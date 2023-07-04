<script>
	import Placeholder from '$lib/components/Placeholder.svelte';
	import { siteTitle, siteDescription } from '$lib/config';
</script>

<svelte:head>
	<title>{siteTitle} | About</title>
	<meta data-key="description" name="description" content={siteDescription} />
</svelte:head>

<article class="article-container">
	<h1>About</h1>
	<Placeholder />
</article>
