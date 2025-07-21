import type { Edge, Node } from '@xyflow/react'
import { CustomEdge } from '../CustomEdge/CustomEdge'
import { CustomNode } from '../CustomNode/CustomNode'

export type TopologyProps = {
	nodesProps: Node[]
	edgesProps: Edge[]
}

export const nodeTypes = {
	custom: CustomNode,
}

export const edgeTypes = {
	custom: CustomEdge,
}
