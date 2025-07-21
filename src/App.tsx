import Topology from '@components/Topology/Topology'
import useFetchTopoToJSON from '@hooks/useFetchTopoToJSON'
import { jsonParser } from '@utils/jsonParser'
import type { Edge, Node } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useEffect, useState } from 'react'

function App() {
	const [nodes, setNodes] = useState<Node[]>([])
	const [edges, setEdges] = useState<Edge[]>([])
	const { json } = useFetchTopoToJSON()

	useEffect(() => {
		//парсинг нод и эджей из json
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
		<div className='w-[100svw] h-[100svh]'>
			<Topology nodesProps={nodes} edgesProps={edges} />
		</div>
	)
}

export default App
