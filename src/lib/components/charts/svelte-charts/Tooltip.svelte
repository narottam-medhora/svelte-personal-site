<script>
	import { fly } from 'svelte/transition'

	let {
		xPos,
		yPos,
		hoveredNode,
		boundedWidth
	} = $props();

	const X_NUDGE = 30
	const Y_NUDGE = 10

	let tooltipWidth = $state(0)

	let tooltipXPos = $derived(xPos + X_NUDGE > boundedWidth ? xPos - tooltipWidth / 1.25 : xPos + X_NUDGE)
</script>

<div
	class="chart-tooltip"
	bind:clientWidth={tooltipWidth}
	style="top: {yPos + Y_NUDGE}px; left: {tooltipXPos}px"
	transition:fly={{ y: 10 }}
>
	<h6 class="chart-tooltip--header">{hoveredNode.name}</h6>
	<hr />
	<div
		class="chart-tooltip--information"
		style="border-inline-start: 0.25em {hoveredNode.color} solid"
	>
		<p>Vulnerability Index: {hoveredNode.vulnerability_index}</p>
		<p>Readiness Index: {hoveredNode.readiness_index}</p>
		<hr />
		<p>CO<sub>2</sub> emissions per capita: {hoveredNode.co2_per_capita}</p>
	</div>
</div>

<style>
	.chart-tooltip {
		position: absolute;
		padding: var(--size-2);

		border: 2px solid var(--border-light);
		border-radius: var(--border-radius);

		background-color: var(--surface-1-dark);
		pointer-events: none;

		transition:
			top 300ms ease,
			left 300ms ease;
	}

	.chart-tooltip > * {
		margin-block: 0;
	}

	.chart-tooltip--header {
		font-family: var(--font-serif), serif;
		margin-block-end: var(--size-2);
	}

	.chart-tooltip--information {
		padding-inline-start: var(--size-2);
	}

	hr {
		margin-block: var(--size-1);
	}

	.chart-tooltip--information > p {
		margin-block: 0;
		font-size: var(--font-size-1);
	}
</style>
