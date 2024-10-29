<script>
	// Import D3 libraries
	import { pointer } from 'd3-selection'
	import { scaleLinear, scaleOrdinal } from 'd3-scale'
	import { min, max } from 'd3-array'
	import { area, stack, stackOffsetSilhouette, stackOrderInsideOut, curveBumpX } from 'd3-shape'

	// Import data
	import data from '$lib/assets/data/winter_olympics.json'

	// Get an array of the keys
	const keys = Object.keys(data[0]).filter((d) => d !== 'Year')

	const TOP_10_COUNTRIES = [
		'Norway',
		'United States',
		'Germany',
		'Austria',
		'Soviet Union',
		'Canada',
		'Finland',
		'Sweden',
		'Switzerland',
		'Russia'
	]

	const COLORS = [
		'#5F4690',
		'#1D6996',
		'#38A6A5',
		'#0F8554',
		'#73AF48',
		'#EDAD08',
		'#E17C05',
		'#CC503E',
		'#94346E',
		'#6F4070',
		'#994E95',
		'#666666'
	]

	const X_NUDGE = 10

	// Chart settings
	let width = $state(968)
	let height = 500
	let margin = { top: 20, right: 20, bottom: 20, left: 20 }

	let boundedWidth = $derived(width - margin.right - margin.left)
	let boundedHeight = height - margin.top - margin.bottom

	// Define the scales
	let xScale = $derived(scaleLinear()
		.domain([min(data, (d) => d.Year), max(data, (d) => d.Year)])
		.range([0, boundedWidth]))

	let ticks = $derived(xScale.ticks(4))

	const yScale = scaleLinear().domain([-150, 150]).range([0, boundedHeight])

	const COLORScale = scaleOrdinal().domain(TOP_10_COUNTRIES).range(COLORS).unknown('#666666')

	// Define the layout function
	const stackLayout = stack().offset(stackOffsetSilhouette).order(stackOrderInsideOut).keys(keys)

	// The area generator function must be reactive as it's dependent on the xScale
	let stackArea = $derived(area()
		.x((d) => xScale(d.data.Year))
		.y0((d) => yScale(d[0]))
		.y1((d) => yScale(d[1]))
		.curve(curveBumpX))

	// Create the stacked data
	const stackedData = stackLayout(data)

	// Create a variable to store hovered data
	let hovered = $state(),
		position = $state([])

	function handleMouseOver(e, country) {
		hovered = country
		position = pointer(e)
	}

	// Sanity check
	// $: console.log({ hovered, position });
</script>

<div class="chart-legend--container">
	{#each TOP_10_COUNTRIES as country}
		<div class="chart-legend">
			<span class="chart-legend--key" style={`background-color: ${COLORScale(country)}`}></span>
			<p class="chart-legend--text">{country}</p>
		</div>
	{/each}
</div>
<div
	class="post-chart--full-width"
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
				{#each stackedData as country, i}
					<path
						d={stackArea(country)}
						fill={COLORScale(country.key)}
						stroke="#f9f9f9"
						stroke-width="1"
						onmouseover={(event) => handleMouseOver(event, country)}
						onfocus={(event) => handleMouseOver(event, country)}
						role="tooltip"
						opacity={hovered ? (hovered === country ? 1 : 0.3) : 1}
						stroke-opacity={hovered ? (hovered === country ? 1 : 0.1) : 1}
					/>
				{/each}
			</g>
			<g class="chart-x-axis" transform="translate(0, {boundedHeight + margin.bottom / 2})">
				{#each ticks as tick}
					<g class="chart-x-axis--tick" transform="translate({xScale(tick)}, 0)">
						<text>{tick}</text>
					</g>
				{/each}
			</g>
		</g>
	</svg>
	{#if hovered}
		<div class="chart-tooltip" style="left: {position[0] + X_NUDGE}px; top: {position[1]}px;">
			<p>{hovered.key}</p>
		</div>
	{/if}
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
		fill: var(--primary-1-dark);

		font-family: var(--font-chart-label);
		font-size: 0.8rem;
	}

	.chart-tooltip {
		position: absolute;

		background-color: var(--primary-1-dark);
		color: var(--brand-dark);
		box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 8px;
		border-radius: 3px;

		font-family: var(--font-chart-label);
		font-size: 1rem;
		padding-inline: 1rem;

		pointer-events: none;
	}

	path {
		transition:
			stroke-opacity 300ms ease,
			opacity 300ms ease;
	}
</style>
