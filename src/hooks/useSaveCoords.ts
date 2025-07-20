import { useCallback } from 'react'
import { useApiClient } from './useApiClient'

type SaveCoordsParams = {
	group: string
	node_id: string
	x: number
	y: number
}

export default function useSaveCoords() {
	const api = useApiClient()
	const URL =
		'http://10.200.0.205:8000/api/plugins/netbox_topology_views/save-coords/save_coords/'
	const params = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	const saveCoords = useCallback(async (coordsData: SaveCoordsParams) => {
		const data = JSON.stringify(coordsData)
		api
			.patch(URL, data, params)
			.then(response => response.data)
			.catch(error => {
				throw new Error(`Error savind coords: ${error}`)
			})
	}, [])

	return {
		saveCoords,
	}
}
