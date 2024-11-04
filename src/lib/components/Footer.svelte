<script>
	import * as config from '$lib/config'

	import { Github, Linkedin, Rss, MessageSquareQuote } from 'lucide-svelte'
</script>

<footer>
	<p>&copy; {new Date().getFullYear()} {config.author}</p>
	<p>Made with SvelteKit, hosted on Vercel</p>

	<nav class="footer-social">
		<a href="/rss.xml" data-sveltekit-reload target="_blank" aria-label="RSS Feed"><Rss /></a>
		<a href="https://github.com/narottam-medhora" aria-label="GitHub profile"><Github /></a>
		<a href="https://bsky.app/profile/narottam.bsky.social" aria-label="Bluesky profile"
			><MessageSquareQuote /></a
		>
		<a href="https://www.linkedin.com/in/narottam-medhora/" aria-label="LinkedIn Profile"
			><Linkedin /></a
		>
	</nav>
</footer>

<style>
	footer {
		padding-block: var(--size-7);
		border-block-start: 1px solid var(--border);

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	p {
		color: var(--text-1);
		font-size: var(--font-size-1);
	}

	.footer-social {
		display: flex;
		flex-direction: row;
		gap: var(--size-3);
	}

	/* Removes the external link icons for links in the footer */
	a[href^='http'] {
		background: none;
		margin: 0;
		padding: 0;
	}
</style>
