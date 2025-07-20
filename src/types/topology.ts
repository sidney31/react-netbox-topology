type Node = {
	id: number
	site: string
	site_id: number
	'color.border': string
	physics: boolean
	x: number
	y: number
	title: string
	name: string
	label: string
	shape: string
	href: string
	image: string
}

type Edge = {
	id: number
	from: number
	to: number
	color: string
	width?: number
	dashes?: number[]
	href: string
	title: string
}

export type TopologyData = {
	nodes: Node[]
	edges: Edge[]
	group: string
	options: Record<string, unknown>
}
