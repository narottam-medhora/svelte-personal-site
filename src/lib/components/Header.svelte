<script type="ts">
	import * as config from '$lib/config'
</script>

<nav>
	<!-- Site title -->
	<a href="/">{config.title}</a>

	<!-- Site navigation -->
	<ul class="nav-items">
		{#each config.navItems as page}
			<li>
				<a href={page.url}>{page.title}</a>
			</li>
		{/each}
	</ul>

	<!-- Theme toggle -->
	<button>Toggle</button>
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
		}

		.nav-items {
			display: flex;
			gap: var(--size-7);
			margin-block: 0;
		}
	}
</style>
