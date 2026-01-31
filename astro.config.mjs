import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";
import icon from "astro-icon";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
	site: "https://rifugiodelcuore.it",
	integrations: [
		// example auto import component into blog post mdx files
		AutoImport({
			imports: [
				// https://github.com/delucis/astro-auto-import
				"@components/Admonition/Admonition.astro",
			],
		}),
		mdx(),
		icon({
			include: {
				tabler: [
					"bulb",
					"alert-triangle",
					"flame",
					"info-circle",
					"arrow-narrow-left",
					"arrow-narrow-right",
					"menu-2",
					"x",
					"chevron-down",
					"category",
					"calendar-event",
				],
			},
		}),
		sitemap(),
		compress({
			HTML: true,
			JavaScript: true,
			CSS: false,
			Image: false,
			SVG: false,
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		build: {
			assetsInlineLimit: 0,
		},
		resolve: {
			alias: {
				'@components': path.resolve(__dirname, './src/components'),
				'@images': path.resolve(__dirname, './src/assets/images'),
				'@config': path.resolve(__dirname, './src/config')
			}
		}
	},
});