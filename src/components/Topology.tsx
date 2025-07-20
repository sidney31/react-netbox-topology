import useFetchTopoToJSON from '@hooks/useFetchTopoToJSON'
import useSaveCoords from '@hooks/useSaveCoords'
import { jsonParser } from '@utils/jsonParser'
import type { Edge, Node, NodeChange } from '@xyflow/react'
import { Background, ReactFlow, applyNodeChanges } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useCallback, useEffect, useState } from 'react'

function Topology() {
	const [nodes, setNodes] = useState<Node[]>()
	const [edges, setEdges] = useState<Edge[]>()
	const { json } = useFetchTopoToJSON()
	const { saveCoords } = useSaveCoords()

	useEffect(() => {
		//парсинг нод и эджей из json
		if (!json) return
		const parsedData = jsonParser(json)
		if (!parsedData) throw new Error('Parsed data is undefined')

		const [parsedNodes, parsedEdges] = parsedData
		console.log(parsedData)
		setNodes(parsedNodes)
		setEdges(parsedEdges)
	}, [json])

	//обработчик перемещения нод
	const onNodesChange = useCallback((changes: NodeChange[]) => {
		setNodes(nodesSnapshot => {
			if (!nodesSnapshot) return
			const changedNode = getChangedNode(nodesSnapshot)
			if (changedNode)
				saveCoords({
					group: 'default',
					node_id: changedNode.id,
					x: changedNode.position.x,
					y: changedNode.position.y,
				})

			return applyNodeChanges(changes, nodesSnapshot)
		})
	}, [])

	// определение перемещенной ноды
	const getChangedNode = (nodesSnapshot: Node[]) => {
		for (let i = 0; i < nodesSnapshot.length; i++)
			if (nodesSnapshot[i].selected || nodesSnapshot[i].dragging)
				return nodesSnapshot[i]
		return null
	}

	return (
		<>
			<div className='h-[100svh] w-[100svw] color-black'>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					fitView
				>
					<Background />
				</ReactFlow>
			</div>
		</>
	)
}

export default Topology
