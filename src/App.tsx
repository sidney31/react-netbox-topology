import Topology from '@components/Topology/Topology'
import useFetchTopoToJSON from '@hooks/useFetchTopoToJSON'
import jsonParser from '@utils/jsonParser'
import type { Edge, Node } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useEffect, useRef, useState } from 'react'
import SaveTopologyButton from './components/SaveTopologyButton/SaveTopologyButton'
//

function App() {
	const [nodes, setNodes] = useState<Node[]>([])
	const [edges, setEdges] = useState<Edge[]>([])
	const topologyRef = useRef<HTMLDivElement>(null)
	const { json } = useFetchTopoToJSON()

	useEffect(() => {
		if (!json) return

		try {
			const [parsedNodes, parsedEdges] = jsonParser(json)
			setNodes(parsedNodes)
			setEdges(parsedEdges)
		} catch (error) {
			console.error('Parsing failed: ', error)
		}
	}, [json])

	return (
		<>
			<div ref={topologyRef} className='w-[100svw] h-[80svh] bg-stone-900'>
				<Topology nodesProps={nodes} edgesProps={edges} />
			</div>

			<SaveTopologyButton
				topology={topologyRef.current}
				className='w-[150px] h-[40px] bg-[#1e2328] border-white border-[1px] rounded-md text-white'
			>
				Сохранить в png
			</SaveTopologyButton>
		</>
	)
}

export default App
