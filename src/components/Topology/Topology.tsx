import useSaveCoords from '@hooks/useSaveCoords'
import type { Edge, Node, NodeChange } from '@xyflow/react'
import { Background, ReactFlow, applyNodeChanges } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useCallback, useEffect, useState } from 'react'
import { edgeTypes, nodeTypes, type TopologyProps } from './types'

function Topology({ nodesProps, edgesProps }: TopologyProps) {
	const { saveCoords } = useSaveCoords()
	const [nodes, setNodes] = useState<Node[]>([])
	const [edges, setEdges] = useState<Edge[]>([])

	useEffect(() => {
		setNodes(nodesProps)
		setEdges(edgesProps)
	}, [nodesProps, edgesProps])

	//обработчик перемещения нод
	const onNodesChange = useCallback((changes: NodeChange[]) => {
		setNodes(nodesSnapshot => {
			if (!nodesSnapshot) return nodes
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
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				fitView
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
			>
				<Background />
			</ReactFlow>
		</>
	)
}

export default Topology
