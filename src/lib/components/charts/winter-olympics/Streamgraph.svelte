<script>
	// Import D3 libraries
	import { pointer } from 'd3-selection'
	import { scaleLinear, scaleOrdinal } from 'd3-scale'
	import { extent } from 'd3-array'
	import { area, stack, stackOffsetSilhouette, stackOrderInsideOut, curveBumpX } from 'd3-shape'

	// Import data
	import data from '$lib/assets/data/winter_olympics.json'

	// Get an array of the keys
	const continents = Object.keys(data[0])
		.filter((d) => d !== 'year')
		.sort((a, b) => a.localeCompare(b))

	const colours = ['#e3ba22', '#e6842a', '#137b80', '#8e6c8a', '#978f80']

	const X_NUDGE = 10

	// Chart settings
	let width = $state(968)
	let height = 500
	let margin = { top: 20, right: 20, bottom: 80, left: 20 }

	let boundedWidth = $derived(width - margin.right - margin.left)
	let boundedHeight = height - margin.top - margin.bottom

	// Define the scales
	let xScale = $derived(
		scaleLinear()
			.domain(extent(data, (d) => d.year))
			.range([0, boundedWidth])
	)

	const yScale = scaleLinear().domain([-150, 150]).range([0, boundedHeight])

	const colourScale = scaleOrdinal().domain(continents).range(colours).unknown('#666666')

	// Define the layout function
	const stackLayout = stack()
		.offset(stackOffsetSilhouette)
		.order(stackOrderInsideOut)
		.keys(continents)

	// The area generator function must be reactive as it's dependent on the xScale
	let stackArea = $derived(
		area()
			.x((d) => xScale(d.data.year))
			.y0((d) => yScale(d[0]))
			.y1((d) => yScale(d[1]))
			.curve(curveBumpX)
	)

	// Create the stacked data
	const stackedData = stackLayout(data)

	// Create a variable to store hovered data
	let hovered = $state(),
		position = $state([])
</script>

<div class="chart-legend--container">
	{#each continents as continent}
		<div class="chart-legend">
			<span class="chart-legend--key" style={`background-color: ${colourScale(continent)}`}></span>
			<p class="chart-legend--text">{continent}</p>
		</div>
	{/each}
</div>
<div
	class="post-chart--lg"
	bind:clientWidth={width}
	onmouseleave={() => {
		hovered = null
	}}
	role="tooltip"
	aria-label="Deselect hovered path"
>
	<svg class="chart-svg" {width} {height}>
		<g class="chart-group" transform="translate({margin.left}, {margin.top})">
			<g class="chart-paths">
				{#each stackedData as continent, i}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<path d={stackArea(continent)} fill={colourScale(continent.key)} stroke-width="1" />
				{/each}
			</g>
			<g class="chart-x-axis" transform="translate(0, {boundedHeight + margin.bottom / 2})">
				{#each xScale.ticks(10) as tick}
					<g class="chart-x-axis--tick" transform="translate({xScale(tick)}, 0)">
						<text>{tick}</text>
					</g>
				{/each}
			</g>
		</g>
	</svg>
</div>

<style style="scss">
	.chart-legend--container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	@media (min-width: 64rem) {
		.chart-legend--container {
			grid-template-columns: repeat(5, 1fr);
		}
	}

	.chart-legend {
		align-items: center;
		justify-content: space-between;
	}

	.chart-legend--key {
		display: inline-block;
		width: 100%;
		height: 0.5rem;
	}

	.chart-legend--text {
		margin-block: 0.2rem;
		font-size: 1rem;
		line-height: 1rem;
	}

	.chart-x-axis--tick > text {
		fill: var(--text-1);

		font-family: var(--font-chart-label);
		font-size: 0.8rem;
	}

	path {
		stroke: var(--border);
		transition:
			stroke-opacity 300ms ease,
			opacity 300ms ease;
	}
</style>
