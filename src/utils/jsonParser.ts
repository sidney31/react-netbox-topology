import type { Edge, Node } from '@xyflow/react'
import type { TopologyData } from '../types/topology'

export default function jsonParser(
	json: TopologyData | null
): [Node[], Edge[]] {
	if (!json) throw new Error('json is null')

	const nodes: Node[] = []
	const edges: Edge[] = []

	for (let i = 0; i < json.nodes.length; i++) {
		const currentNode = json.nodes[i]
		nodes.push({
			id: currentNode.id.toString(),
			data: { label: currentNode.name, title: currentNode.title },
			position: { x: currentNode.x, y: currentNode.y },
			type: 'custom',
			// style: {
			// 	borderRadius: '100%',
			// 	width: '100px',
			// 	height: '100px',
			// 	alignText: 'center',
			// 	alignContent: 'center',
			// 	fontSize: '25px',
			// 	fontWeight: 900,
			// 	border: '5px solid #9cc8f8',
			// },
		})
	}

	for (let i = 0; i < json.edges.length; i++) {
		const currentEdge = json.edges[i]
		const newEdge = {
			id: currentEdge.id.toString(),
			source: currentEdge.from.toString(),
			target: currentEdge.to.toString(),
			animated: true,
			type: 'custom',
		}
		edges.push(newEdge)
	}

	return [nodes, edges]
}
