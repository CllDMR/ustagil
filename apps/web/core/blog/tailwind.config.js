const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, 'components/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, 'layouts/**/*.{js,ts,jsx,tsx,mdx}'),
    ...createGlobPatternsForDependencies(join(__dirname, 'apps/web/core/blog')),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
