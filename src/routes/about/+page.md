<script>
	import Placeholder from '$lib/components/Placeholder.svelte';
	import {siteTitle, siteDescription} from '$lib/config';
</script>

<svelte:head>

<title>{siteTitle} | About</title>
<meta data-key="description" name="description" content={siteDescription} />
</svelte:head>

# About

<Placeholder />
