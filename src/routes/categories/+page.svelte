<script lang="ts">
	let { data } = $props()
	console.log(data)
</script>

<svelte:head>
	<title>Categories</title>
</svelte:head>

<section>
	<h1>Categories</h1>

	<ul class="categories">
		{#each data.categories as category}
			<li>
				<a href="/category/{category}">
					{category}
					<span class="count">({data.counts[category]} posts)</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.categories {
		display: grid;
		gap: var(--size-3);
	}

	.count {
		color: var(--text-2);
		font-size: var(--font-size-1);
	}
</style>
