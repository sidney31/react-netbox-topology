const TOKEN = '2483b1d070eb58f52c48c91687d981b04c564461'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(TOKEN)
	// FIXME: изменить на вытаскивание токена из локал сторейдж

	return (
		<AuthContext.Provider value={{ token, setToken }}>
			{children}
		</AuthContext.Provider>
	)
}
