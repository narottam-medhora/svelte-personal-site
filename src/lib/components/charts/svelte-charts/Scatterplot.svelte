<script>
	// Import D3 libraries
	import { scaleLinear } from 'd3-scale'
	import { extent } from 'd3-array'
	// Import components
	import Tooltip from './Tooltip.svelte'

	// Import data
	import data from '$lib/assets/data/emissions_data.json'

	// Filter the data
	let filteredData = data.filter((d) => d.vulnerability_index !== 'N/A')

	// Store the countries to highlight
	const HIGHLIGHTED_COUNTRIES = [
		'Norway',
		'Singapore',
		'U.S.',
		'Czech Republic',
		'Qatar',
		'Bahrain',
		'India',
		'Somalia',
		'Sudan',
		'Chad'
	]

	// Chart settings
	let width = 968
	let height = 600
	let margin = { top: 30, right: 30, bottom: 30, left: 30 }

	$: boundedWidth = width - margin.left - margin.right
	$: boundedHeight = height - margin.top - margin.bottom

	$: isMobile = boundedWidth < 480

	// Set the sizes of the square
	$: maxSquareSize = isMobile ? 20 : 40
	$: minSquareSize = isMobile ? 2 : 4

	// Define the scales
	$: xScale = scaleLinear()
		.domain(extent(filteredData, (d) => +d.vulnerability_index))
		.range([0, boundedWidth])

	$: yScale = scaleLinear()
		.domain(extent(filteredData, (d) => +d.readiness_index))
		.range([boundedHeight, 0])

	$: squareScale = scaleLinear()
		.domain(extent(filteredData, (d) => +d.co2_per_capita))
		.range([minSquareSize, maxSquareSize])

	// Define the font size for the chart labels
	$: chartFontSize = isMobile ? '0.8rem' : '1rem'

	// Store the data for the hovered node, initially set to null
	$: hoveredNode = null
</script>

<div class="post-chart--normal-width" bind:clientWidth={width}>
	<svg {width} {height}>
		<g transform="translate({margin.left}, {margin.top})">
			<!-- Y Axis Label -->
			<g>
				<line
					x1={0}
					x2={boundedWidth}
					y1={boundedHeight / 2}
					y2={boundedHeight / 2}
					stroke="white"
					stroke-dasharray="5 5"
				/>
				<text
					x={boundedWidth}
					y={boundedHeight / 2}
					fill="white"
					font-size={chartFontSize}
					text-anchor="end"
					dy={-6}>High Readiness &uarr;</text
				>
				<text
					x={boundedWidth}
					y={boundedHeight / 2}
					fill="white"
					font-size={chartFontSize}
					text-anchor="end"
					dominant-baseline="hanging"
					dy={6}
				>
					Low Readiness &darr;
				</text>
			</g>
			<!-- X Axis Label -->
			<g>
				<line
					x1={boundedWidth / 2}
					x2={boundedWidth / 2}
					y1={0}
					y2={boundedHeight}
					stroke="white"
					stroke-dasharray="5 5"
				/>
				<text
					x={boundedWidth / 2}
					y={boundedHeight}
					fill="white"
					font-size={chartFontSize}
					dx={6}
					dy={-6}
					text-anchor="start"
				>
					High Vulnerability &rarr;
				</text>
				<text
					x={boundedWidth / 2}
					y={boundedHeight}
					fill="white"
					font-size={chartFontSize}
					dx={-6}
					dy={-6}
					text-anchor="end"
				>
					&larr; Low Vulnerability
				</text>
			</g>
			<!-- Chart marks -->
			{#each filteredData as country}
				<g
					transform="translate({xScale(country.vulnerability_index)}, {yScale(
						country.readiness_index
					)})"
				>
					<rect
						width={squareScale(country.co2_per_capita)}
						height={squareScale(country.co2_per_capita)}
						fill={country.color}
						stroke={HIGHLIGHTED_COUNTRIES.includes(country.name) ? 'white' : ''}
						stroke-width="1"
						opacity={// Logic to handle the opacity of the squares
						!hoveredNode
							? HIGHLIGHTED_COUNTRIES.includes(country.name)
								? 0.9
								: 1
							: hoveredNode
								? country.category === hoveredNode.category
									? 0.7
									: 0.2
								: 0.8}
						on:mouseover={() => (hoveredNode = country)}
						on:focus={() => (hoveredNode = country)}
						on:mouseleave={() => (hoveredNode = null)}
						role="tooltip"
					/>
					<!-- Create labels for the countries in the highlighted countries array -->
				</g>
			{/each}
			{#each data as country}
				{#if HIGHLIGHTED_COUNTRIES.includes(country.name)}
					<g
						transform="translate({xScale(country.vulnerability_index)}, {yScale(
							country.readiness_index
						)})"
					>
						<text
							font-size={chartFontSize}
							x={squareScale(country.co2_per_capita) / 2}
							fill="white"
							text-anchor="middle"
							dy={-5}
						>
							{country.name}
						</text>
					</g>
				{/if}
			{/each}
		</g>
	</svg>
	<!-- Display the tooltip element if the hovered node exists-->
	{#if hoveredNode}
		<Tooltip
			{hoveredNode}
			xPos={xScale(hoveredNode.vulnerability_index)}
			yPos={yScale(hoveredNode.readiness_index)}
			{boundedWidth}
		/>
	{/if}
</div>

<style>
	/* Create an opacity transition for the rect elements */
	rect {
		transition: 230ms opacity ease;
	}
</style>
