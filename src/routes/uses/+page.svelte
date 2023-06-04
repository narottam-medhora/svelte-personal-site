<script>
	import { siteTitle, siteDescription } from '$lib/config';
	import Placeholder from '$lib/components/Placeholder.svelte';
</script>

<svelte:head>
	<title>{siteTitle} | Uses</title>
	<meta data-key="description" name="description" content={siteDescription} />
</svelte:head>

<h1>Uses</h1>
<Placeholder />
