<script>
	import MainNav from './MainNav.svelte';
	import { siteAuthor } from '$lib/config';
</script>

<footer>
	<MainNav />

	<nav class="footer-social">
		<ul>
			<li>
				<img src="/images/icons/rss.svg" alt="RSS icon" aria-hidden="true" />
				<a href="/api/rss.xml" data-sveltekit-reload>RSS</a>
			</li>
			<li>
				<img src="/images/icons/github.svg" alt="GitHub icon" aria-hidden="true" />
				<a href="https://github.com/narottam-medhora">GitHub</a>
			</li>
			<li>
				<img src="/images/icons/twitter.svg" alt="Twitter icon" aria-hidden="true" />
				<a href="https://twitter.com/narottammedhora">Twitter</a>
			</li>
			<li>
				<img src="/images/icons/linkedin.svg" alt="LinkedIn icon" aria-hidden="true" />
				<a href="https://www.linkedin.com/in/narottam-medhora/">LinkedIn</a>
			</li>
		</ul>
	</nav>

	<div class="footer-text">
		<p>&copy;{new Date().getFullYear()} {siteAuthor}</p>
		<p>Made with SvelteKit, hosted on Vercel</p>
	</div>
</footer>
