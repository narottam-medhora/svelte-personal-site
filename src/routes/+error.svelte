<script>
	import { page } from '$app/stores'
</script>

<div class="error">
	<h1>{$page.status}: {$page.error?.message}</h1>
</div>

<style>
	.error {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	h1 {
		font-family: var(--font-serif);
		font-size: var(--font-size-5);
		text-wrap: nowrap;
	}
</style>
