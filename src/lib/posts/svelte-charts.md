---
title: 'Building charts with Svelte'
date: '2023-08-26'
updated: '2023-08-29'
categories:
  - 'd3'
  - 'svelte'
coverImage: '/images/data-visualisations-svelte.svg'
coverWidth: 16
coverHeight: 9
excerpt: Recreating DataWrapper's climate vulnerability index.
---

<script>
  import Scatterplot from '$lib/components/charts/Scatterplot/Scatterplot.svelte'
  import Callout from '$lib/components/Callout.svelte'
</script>

# Building data visualisations with Svelte

The first iteration of this site used some pretty simplistic JavaScript and HTML to render some pretty cool visualisations (in my opinion). In the two and a half years since, Svelte and SvelteKit framework have exploded in popularity and is widely used by several news organisations to create interactive elements for their projects.

To get my hands on the keyboard, I wanted to experiment with a couple of visualisations. I decided to recreate the fascinating [scatterplot](https://blog.datawrapper.de/climate-risk-readiness-responsibility/) created by David Wendler at Datawrapper, showcasing the vulnerability of countries to climate change using data from the University of Notre Dame.

## Building the chart with vanilla JavaScript and D3

During my initial foray into the world of D3, I had a relatively basic grasp of JavaScript and the concept of selections, joins, and method chaining seemed alien to me.

The code below describes a scatter plot, but that’s hard to understand if you have no prior knowledge of D3’s concepts of selections and data joining.

<!-- prettier-ignore -->
```js
svg
	.append('g')
	.attr('transform', `translate(${margin.left}, ${margin.top})`)
	.selectAll('.chart-marks')
	.data(filteredData)
	.join('g')
	.attr('class', 'chart-marks')
	.attr(
		'transform',
		(d) => `translate(${xScale(+d.vulnerability_index)}, ${yScale(+d.readiness_index)})`
	)
	.append('rect')
	.attr('width', (d) => squareScale(+d.co2_per_capita))
	.attr('height', (d) => squareScale(+d.co2_per_capita))
	.attr('r', 10)
	.attr('fill', (d) => d.color);
```

For a few months, the experience was extremely frustrating. Understanding D3’s unique syntax, while navigating outdated examples on bl.ocks.org (🪦) and Stack Overflow, was one of the steepest learning curves I’ve ever encountered.

## Building the chart declaratively

Early last year, I stumbled across Amelia Wattenberger’s excellent [post](https://wattenberger.com/blog/react-and-d3) about writing D3 **declaratively**. Having our code describe _what_ we want our visualisation to look like, instead of _how_ the visualisation should be constructed, marked a meaningful shift in my mental model.

Here’s that same code from the previous example, written in Svelte.

If we ignore some Svelte-specific syntax, such as the `{each}` block and declaration of the width and height attributes on the SVG element, the code is much simpler to read.

```js
<svg {width} {height}>
		<g transform="translate({margin.left}, {margin.top})">
		{#each filteredData as country}
			<g transform="translate({xScale(country.vulnerability_index)}, {yScale(
				country.readiness_index
			)})"
			>
				<rect
				width={squareScale(country.co2_per_capita)
				height={squareScale(country.co2_per_capita)}
				fill={country.color}
				/>
			</g>
	{/each}
	</g>
</svg>
```

Adding responsiveness and additional functionality such as tooltips isn’t much more complicated either, thanks to the power of Svelte’s reactive declarations and statements.

Here’s the end product of that process:

<Scatterplot />
