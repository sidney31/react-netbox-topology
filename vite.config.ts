import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	optimizeDeps: {
		include: ['vis-network', 'vis-data'],
	},
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'@components': resolve(__dirname, './src/components'),
			'@utils': resolve(__dirname, './src/utils'),
			'@assets': resolve(__dirname, './src/assets'),
			'@types': resolve(__dirname, './src/types'),
			'@hooks': resolve(__dirname, './src/hooks'),
			'@pages': resolve(__dirname, './src/pages'),
			'@services': resolve(__dirname, './src/services'),
			'@providers': resolve(__dirname, './src/providers'),
		},
	},
})
