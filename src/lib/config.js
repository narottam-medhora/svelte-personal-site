import { dev } from '$app/environment'

export const title = 'Narottam Medhora'
export const description =
	"Welcome to Narottam Medhora's personal website, a data visualization journalist based in London, UK. Here, you'll find a collection of visually engaging articles, reports, and presentations that explore complex data sets to uncover compelling stories. With a keen eye for detail and a passion for storytelling, this journalist uses innovative techniques to communicate data-driven insights to a wide audience."
export const url = dev ? 'http://localhost:5173' : 'https://www.narottam.dev'
export const author = 'Narottam Medhora'
export const navItems = [
	{ title: 'About', url: '/about' },
	{ title: 'Uses', url: '/uses' },
	{ title: 'RSS', url: '/rss.xml' }
]
