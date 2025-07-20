import { useEffect, useState } from 'react'
import type { TopologyData } from '../types/topology'
import { useApiClient } from './useApiClient'

type FetchTopoResult = {
	json: TopologyData | null
	// fetchData: () => Promise<TopologyData | null>
}

export default function useFetchTopoToJSON(): FetchTopoResult {
	const [json, setJson] = useState<TopologyData | null>(null)
	const URL =
		'http://10.200.0.205:8000/api/plugins/netbox_topology_views/json-export/?show_cables=True&show_logical_connections=True&show_single_cable_logical_conns=True'

	const api = useApiClient()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(URL)
				const data: TopologyData = await response.data
				setJson(data)
			} catch (error) {
				throw new Error(
					error instanceof Error ? error.message : 'unknown error'
				)
			}
		}

		fetchData()
	}, [])

	return {
		json,
	}
}
