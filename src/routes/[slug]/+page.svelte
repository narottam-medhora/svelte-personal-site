<script>
	export let data

	import { formatDate } from '$lib/utils'
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.metadata.title} />
</svelte:head>

<article>
	<hgroup>
		<h1>{data.metadata.title}</h1>
		<p>Published on {formatDate(data.metadata.date)}</p>
	</hgroup>

	<ul class="tags">
		{#each data.metadata.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</ul>

	<div class="markdown">
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
	}

	h1 {
		font-family: var(--font-serif);
		color: var(--brand);
	}

	h1 + p {
		margin-block-start: var(--size-2);
		color: var(--text-2);
	}

	.tags {
		display: flex;
		gap: var(--size-3);
		margin-block-start: var(--size-7);
	}

	.tags > * {
		padding: var(--size-2) var(--size-3);
		border-radius: var(--radius-round);
	}
</style>
