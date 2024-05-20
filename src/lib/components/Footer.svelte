<script>
	import * as config from '$lib/config'
</script>

<footer>
	<p>{config.author} &copy; {new Date().getFullYear()}</p>
</footer>

<style>
	footer {
		padding-block: var(--size-7);
		border-block-start: 1px solid var(--border);
	}

	p {
		color: var(--text-2);
	}
</style>
