import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js },
		extends: ['js/recommended'],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		languageOptions: { globals: globals.browser },
	},
	{
		files: ['**/*.{ts,tsx}'],
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json', // путь к вашему tsconfig.json
				},
			},
		},
	},

	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
])
