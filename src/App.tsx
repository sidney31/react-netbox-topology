import { useEffect, useRef, useState } from 'react'
import type { Data } from 'vis-network'
import SaveTopologyButton from './components/SaveTopologyButton/SaveTopologyButton'
import Topology from './components/Topology/Topology'
import useFetchTopoToJSON from './hooks/useFetchTopoToJSON'
import jsonParser from './utils/jsonParser'
//

function App() {
	const [data, setData] = useState<Data>()
	const topologyRef = useRef<HTMLDivElement>(null)
	const { json } = useFetchTopoToJSON()

	useEffect(() => {
		if (!json) return

		try {
			setData(jsonParser(json))
		} catch (error) {
			console.error('Parsing failed: ', error)
		}
	}, [json])

	if (!data) {
		return <></>
	}
	return (
		<>
			<div
				ref={topologyRef}
				style={{ height: '90svh', width: '100svw', border: '1px white solid' }}
			>
				<Topology
					data={data}
					style={{
						height: `100%`,
						width: `100%`,
					}}
				/>
			</div>

			<SaveTopologyButton
				topology={topologyRef}
				className='w-[150px] h-[40px] bg-[#1e2328] border-white border-[1px] rounded-md text-white'
			>
				Сохранить в png
			</SaveTopologyButton>
		</>
	)
}

export default App
