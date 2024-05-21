import { dev } from "$app/environment";

export const title = 'My Blog';
export const description = 'This is my blog';
export const url = dev ? 'http://localhost:5173' : 'https://www.narottam.dev';
export const author = "Narottam Medhora";
export const navItems = [
    { title: 'About', url: '/about' },
    {title: 'RSS', url: '/rss.xml'}
]