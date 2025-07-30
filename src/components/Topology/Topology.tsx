import { useEffect, useRef, type HTMLAttributes } from 'react'
import { Network, type Data } from 'vis-network'
import useSaveCoords from '../../hooks/useSaveCoords'

interface Props extends HTMLAttributes<HTMLDivElement> {
	data: Data
}

function Topology({ children, style, ...props }: Props) {
	const { saveCoords } = useSaveCoords()
	const topologyRef = useRef(null)
	const networkRef = useRef<Network>(null)

	const options = {
		physics: {
			enabled: true,
			barnesHut: {
				gravitationalConstant: -2500,
				springConstant: 0,
				damping: 1,
				avoidOverlap: 1,
			},
		},
		interaction: {
			hover: true,
			hoverConnectedEdges: true,
			zoomSpeed: 0.5,
		},
		nodes: {
			fixed: {
				x: false,
				y: false,
			},
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

	useEffect(() => {
		if (!topologyRef.current) return

		const handleDragEnd = (params: { nodes: number[] }) => {
			if (!params.nodes[0] || !networkRef.current) return
			const nodeId = params.nodes[0]
			const position = networkRef.current.getPosition(nodeId)
			return saveCoords({
				group: 'default',
				node_id: nodeId.toString(),
				x: position.x.toString(),
				y: position.y.toString(),
			})
		}

		networkRef.current = new Network(topologyRef.current, props.data, options)
		networkRef.current.on('dragEnd', handleDragEnd)
		setTimeout(() => {
			console.log('done')
			networkRef.current?.fit({ animation: true })
		}, 100)
	}, [topologyRef])

	return (
		<>
			<div className='topo' style={style} {...props} ref={topologyRef}></div>
		</>
	)
}

export default Topology
