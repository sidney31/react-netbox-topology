import { DataSet } from 'vis-data'
import { type Edge, type Node } from 'vis-network'
import 'vis-network/styles/vis-network.css'
import type { TopologyData } from '../types/topology'

export default function jsonParser(json: TopologyData | null): {
	nodes: DataSet<Node>
	edges: DataSet<Edge>
} {
	if (!json) throw new Error('json is null')

	const nodes = new DataSet<Node>()
	const edges = new DataSet<Edge>()

	const htmlTitle = (html: string) => {
		const container = document.createElement('div')
		container.innerHTML = html
		return container
	}

	json.nodes.forEach(node => {
		nodes.add({
			id: node.id,
			label: node.name,
			title: htmlTitle(node.title),
			x: node.x,
			y: node.y,
		})
	})

	json.edges.forEach(edge => {
		const newEdge = {
			id: edge.id,
			from: edge.from,
			to: edge.to,
			title: htmlTitle(edge.title),
		}
		edges.add(newEdge)
	})

	return { nodes, edges }
}
