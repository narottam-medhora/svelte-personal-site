<script>
	import * as config from '$lib/config.js'
	import { formatDate } from '$lib/utils'
	import { get } from 'svelte/store'
	import { theme } from '$lib/theme'

	let { data } = $props()
	const userTheme = get(theme)
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
				{#if userTheme === 'light'}
					<img src={post.coverImageLight} alt={post.title} />
				{:else}
					<img src={post.coverImageDark} alt={post.title} />
				{/if}
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
		margin-inline: auto;
		max-inline-size: var(--size-content-3);
		position: relative;
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
		margin-block-start: 10px;
	}

	.description {
		margin-block-start: var(--size-3);
		font-size: var(--font-size-2);
	}
</style>
