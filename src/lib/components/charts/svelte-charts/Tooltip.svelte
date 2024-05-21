<script>
	import { fly } from 'svelte/transition'

	export let xPos
	export let yPos
	export let hoveredNode
	export let boundedWidth

	const X_NUDGE = 70
	const Y_NUDGE = 40

	let tooltipWidth = 0

	$: tooltipXPos = xPos + X_NUDGE > boundedWidth ? xPos - tooltipWidth / 1.25 : xPos + X_NUDGE
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
		padding: 0.5em;

		border: 2px solid var(--primary-1-dark);
		border-radius: 0.25em;

		background-color: var(--brand-dark);
		pointer-events: none;

		transition:
			top 300ms ease,
			left 300ms ease;
	}

	.chart-tooltip--header {
		margin: 0;
	}

	.chart-tooltip--information {
		padding-inline-start: 0.5em;
	}

	.chart-tooltip--information > p {
		margin-block: 0;
		font-size: 0.8rem;
	}
</style>
