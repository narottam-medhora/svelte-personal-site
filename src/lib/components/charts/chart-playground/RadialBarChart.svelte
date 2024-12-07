<script>
	import { arc } from 'd3-shape'
	import { scaleLinear } from 'd3-scale'

	const categories = ['A', 'B', 'C', 'D', 'E']
	const colors = ['#e3ba22', '#e6842a', '#137b80', '#8e6c8a', '#978f80']

	let data = categories.map((d, i) => {
		return {
			category: d,
			value: Math.random() * 100,
			color: colors[i]
		}
	})

	let width = $state(968)
	const height = 600

	let margin = { top: 20, right: 20, bottom: 20, left: 20 }
	let boundedWidth = $derived(width - margin.left - margin.right)
	let boundedHeight = $derived(height - margin.top - margin.bottom)

	let padding = 30
	let chartRadius = $derived(width / 2)
	let numberOfBars = data.length
	let barWidth = $derived(chartRadius / numberOfBars - padding)

	let dataWithRadius = $derived(
		data.map((d, i) => ({
			...d,
			radius: (chartRadius / numberOfBars) * i + padding
		}))
	)

	let angle = scaleLinear()
		.domain([0, 100])
		.range([0, 2 * Math.PI])

	function coordinates(value, radius) {
		const a = angle(value) + Math.PI * 2
		const x = Math.cos(a) * radius
		const y = Math.sin(a) * radius
		return {
			x: boundedWidth / 2 - x,
			y: boundedHeight / 2 - y
		}
	}

	// Define the arc generator
	let arcGenerator = arc()
		.innerRadius((d) => d.radius)
		.outerRadius((d) => d.radius - padding)
		.startAngle(0)
		.endAngle((d) => angle(d.value))

	let ticks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
</script>

<div bind:clientWidth={width}>
	<svg {width} {height}>
		<g transform={`translate(${margin.left}, ${margin.top})`}>
			{#each dataWithRadius as d}
				<g>
					<circle cx={boundedWidth / 2} cy={boundedHeight / 2} r={d.radius} fill="none" />
				</g>
				<g>
					<path
						fill={d.color}
						d={arcGenerator(d)}
						transform={`translate(${boundedWidth / 2}, ${boundedHeight / 2})`}
					/>
				</g>
			{/each}
			{#each ticks as tick}
				<line
					x1={boundedWidth / 2}
					y1={boundedHeight / 2}
					x2={coordinates(tick, dataWithRadius[dataWithRadius.length - 1].radius).x}
					y2={coordinates(tick, dataWithRadius[dataWithRadius.length - 1].radius).y}
					stroke="black"
					stroke-width={1}
				/>
			{/each}
		</g>
	</svg>
</div>

<style>
	svg {
		outline: 1px solid tomato;
	}

	circle {
		fill: none;
		stroke: var(--text-1);
	}
</style>
