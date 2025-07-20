import axios from 'axios'
import useAuth from './useAuth'

export function useApiClient() {
	const { token } = useAuth()

	const instance = axios.create({
		// FIXME:
		baseURL: 'http://localhost:5173/',
	})
	instance.interceptors.request.use(config => {
		if (token) config.headers.Authorization = `Token ${token}`
		return config
	})

	return instance
}
