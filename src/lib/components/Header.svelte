<script>
	import * as config from '$lib/config'

	import Toggle from './Toggle.svelte'
</script>

<nav>
	<!-- Site title -->
	<a href="/" class="title">{config.title}</a>

	<!-- Site navigation -->
	<ul class="nav-items">
		{#each config.navItems as navItem}
			<li>
				<a
					href={navItem.url}
					aria-label={navItem.title}
					alt={navItem.title}
					target={navItem.title === 'RSS' ? '_blank' : '_self'}>{navItem.title}</a
				>
			</li>
		{/each}
	</ul>

	<!-- Theme toggle -->
	<Toggle />
</nav>

<style>
	nav {
		padding-block: var(--size-7);
	}

	nav > .title {
		font-size: var(--font-size-3);
		font-weight: var(--font-weight-7);
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
