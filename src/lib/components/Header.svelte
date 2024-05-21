<script type="ts">
	import * as config from '$lib/config'

	import Toggle from './Toggle.svelte'
</script>

<nav>
	<!-- Site title -->
	<a href="/">{config.title}</a>

	<!-- Site navigation -->
	<ul class="nav-items">
		<li>
			<a href="/about">About</a>
		</li>
		<li>
			<a href="/rss.xml" target="_blank">RSS</a>
		</li>
	</ul>

	<!-- Theme toggle -->
	<Toggle />
</nav>

<style>
	nav {
		padding-block: var(--size-7);
	}

	.nav-items {
		margin-inline: var(--size-7);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	@media (min-width: 768px) {
		nav {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.nav-items {
			display: flex;
			gap: var(--size-7);
			margin-block: 0;
		}
	}
</style>
