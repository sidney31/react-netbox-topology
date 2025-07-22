import useSaveCoords from '@hooks/useSaveCoords'
import type {
	Edge,
	Node,
	NodeChange,
	OnNodeDrag,
	OnNodesChange,
} from '@xyflow/react'
import { applyNodeChanges, Background, ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import React, { useCallback, useEffect, useState } from 'react'
import { edgeTypes, nodeTypes, type TopologyProps } from './types'

function Topology({ nodesProps, edgesProps }: TopologyProps) {
	const { saveCoords } = useSaveCoords()
	const [nodes, setNodes] = useState<Node[]>([])
	const [edges, setEdges] = useState<Edge[]>([])

	useEffect(() => {
		setNodes(nodesProps)
		setEdges(edgesProps)
	}, [nodesProps, edgesProps])

	const onNodesChange: OnNodesChange = useCallback(
		(changes: NodeChange<Node>[]) =>
			setNodes(nodesSnapshot => applyNodeChanges(changes, nodesSnapshot)),
		[]
	)

	const onNodeDragStop: OnNodeDrag = useCallback(
		(event: React.MouseEvent, node: Node) => {
			saveCoords({
				group: 'default',
				node_id: node.id,
				x: node.position.x,
				y: node.position.y,
			})
		},
		[]
	)

	return (
		<>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodeDragStop={onNodeDragStop}
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
