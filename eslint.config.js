import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks' // Import react-hooks plugin
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		env: {
			node: true, // Enable Node.js global variables
		},
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: globals.browser,
		},
		plugins: {
			react: pluginReact,
			'react-hooks': pluginReactHooks, // Add react-hooks plugin
		},
		rules: {
			...pluginJs.configs.recommended.rules,
			...pluginReact.configs.recommended.rules,
			...tseslint.configs.recommended.rules,
			// Add or override specific rules here
			'react/react-in-jsx-scope': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	// Add additional configurations as needed (e.g., for specific file types or ignores)
	{
		ignores: ['dist', 'node_modules'],
	}
)
