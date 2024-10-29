<script lang="ts">
	import { formatDate } from '$lib/utils'

	let { data } = $props()
	console.log(data)
</script>

<svelte:head>
	<title>Posts in {data.category}</title>
</svelte:head>

<section>
	<h1>Posts in {data.category}</h1>

	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href="/{post.slug}" class="title">
					{post.title}
				</a>
				<p class="date">{formatDate(post.date)}</p>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.posts {
		display: grid;
		gap: var(--size-7);
	}

	.post {
		max-inline-size: var(--size-content-3);
	}

	.title {
		font-family: var(--font-serif);
		font-size: var(--font-size-fluid-2);
		color: var(--brand);
	}

	.date {
		font-family: var(--font-sans);
		font-size: var(--font-size-1);
		font-style: italic;
	}

	.description {
		margin-block-start: var(--size-3);
	}
</style>
