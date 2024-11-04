<script>
	import { fly } from 'svelte/transition'

	let { xPos, yPos, hoveredNode, boundedWidth, boundedHeight } = $props()

	const X_NUDGE = 30
	const Y_NUDGE = 10
	let tooltipWidth = $state(400)
	let tooltipHeight = $state(300)

	let tooltipXPos = $derived(
		xPos + X_NUDGE > (boundedWidth * 2) / 3 ? xPos - tooltipWidth / 1.25 : xPos + X_NUDGE
	)

	let tooltipYPos = $derived(
		yPos + Y_NUDGE > (boundedHeight * 2) / 3 ? yPos - tooltipHeight / 1.75 : yPos + Y_NUDGE
	)
</script>

<div
	class="chart-tooltip"
	bind:clientWidth={tooltipWidth}
	style="top: {tooltipYPos}px; left: {tooltipXPos}px"
	transition:fly={{ y: 10 }}
>
	<h6 class="chart-tooltip--header">{hoveredNode.name}</h6>
	<hr class="chart-tooltip--divider" />
	<div
		class="chart-tooltip--information"
		style="border-inline-start: 0.25em {hoveredNode.color} solid"
	>
		<p>Vulnerability Index: {hoveredNode.vulnerability_index}</p>
		<p>Readiness Index: {hoveredNode.readiness_index}</p>
		<hr class="chart-tooltip--divider" />
		<p>CO<sub>2</sub> emissions per capita: {hoveredNode.co2_per_capita}</p>
	</div>
</div>

<style>
	.chart-tooltip {
		position: absolute;
		padding: var(--size-2);
		display: block;

		border: 1px solid var(--border);
		border-radius: var(--border-radius);

		background-color: var(--surface-1);
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

	.chart-tooltip--divider {
		border: none;
		margin-block: var(--size-2);
		border-block-start: 1px solid var(--border);
	}

	.chart-tooltip--information > p {
		margin-block: 0;
		font-size: var(--font-size-1);
	}
</style>
