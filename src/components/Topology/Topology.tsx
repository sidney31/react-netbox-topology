import useSaveCoords from '@hooks/useSaveCoords'
import { useEffect, useRef, type HTMLAttributes } from 'react'
import { Network, type Data } from 'vis-network'

interface Props extends HTMLAttributes<HTMLDivElement> {
	data: Data
}

function Topology({ children, style, ...props }: Props) {
	const { saveCoords } = useSaveCoords()
	const topologyRef = useRef(null)

	useEffect(() => {
		if (!topologyRef.current) return

		const options = {
			physics: {
				enabled: true,
				barnesHut: {
					gravitationalConstant: -2500,
					springConstant: 0,
					damping: 1,
				},
			},
			interaction: {
				hover: true,
				hoverConnectedEdges: true,
				zoomSpeed: 0.5,
			},
			nodes: {
				borderWidth: 5,
				borderWidthSelected: 5,
				shape: 'dot',
				size: 40,

				color: {
					border: '#D2E5FF',
					background: 'white',
					highlight: {
						border: '#D2E5FF',
						background: 'white',
					},
				},
				font: {
					align: 'left',
					color: 'white',
					multi: 'html',
				},
			},
			edges: {
				color: { color: 'orange', highlight: 'orange', hover: 'orange' },
				width: 2,
				hoverWidth: 2,
				selectionWidth: 2,
				dashes: true,
				smooth: {
					enabled: true,
					type: 'continuous',
					roundness: 0.5,
				},
			},
		}

		const network = new Network(topologyRef.current, props.data, options)
		const handleDragEnd = (params: { nodes: number[] }) => {
			if (!params.nodes[0]) return
			const nodeId = params.nodes[0]
			const position = network.getPosition(nodeId)
			return saveCoords({
				group: 'default',
				node_id: nodeId.toString(),
				x: position.x.toString(),
				y: position.y.toString(),
			})
		}
		network.fit({ animation: true })
		network.on('dragEnd', handleDragEnd)
	}, [topologyRef])

	return <div className='topo' style={style} {...props} ref={topologyRef}></div>
}

export default Topology
