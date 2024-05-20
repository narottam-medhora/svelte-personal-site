<script lang="ts">
	import 'open-props/style'
	import 'open-props/normalize'
	import 'open-props/buttons'

	// * IMPORT COMPONENTS
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'

	// * IMPORT GLOBAL STYLES
	import '../app.css'
</script>

<div class="layout">
	<Header />
	<main>
		<!-- Slot for other content -->
		<slot />
	</main>
	<Footer />
</div>

<style>
	.layout {
		height: 100%;
		max-inline-size: 1440px;
		margin-inline: auto;
		padding-inline: var(--size-7);

		display: grid;
		grid-template-rows: auto 1fr auto;
	}

	main {
		padding-block: var(--size-9);
	}

	@media (min-width: 1440px) {
		.layout {
			padding-inline: 0;
		}
	}
</style>
