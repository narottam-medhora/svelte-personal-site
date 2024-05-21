<script>
	export let data

	import * as config from '$lib/config'
	import { formatDate } from '$lib/utils'
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href={post.slug} class="title">
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

	.posts {
		max-inline-size: var(--size-content-3);
	}

	.post:not(:last-child) {
		border-block-end: 1px solid var(--border);
		padding-block-end: var(--size-7);
	}

	.title {
		font-family: var(--font-serif), serif;
		font-size: var(--font-size-fluid-2);
		color: var(--brand);
	}

	.date {
		font-family: var(--font-sans), sans-serif;
		font-size: var(--font-size-1);
		font-style: italic;
	}

	.description {
		margin-block-start: var(--size-3);
		font-size: var(--font-size-2);
	}
</style>
