import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-tooltip/dist/react-tooltip.css'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './providers/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
	<AuthProvider>
		<StrictMode>
			<App />
		</StrictMode>
	</AuthProvider>
)
