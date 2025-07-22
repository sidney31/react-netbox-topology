import type { NodeProps } from '@xyflow/react'
import { Handle, Position } from '@xyflow/react'
import React from 'react'
import { Tooltip } from 'react-tooltip'

const HANDLE_STYLES: React.CSSProperties = {
	background: '#00000000',
	position: 'absolute',
	top: '50%',
}

export function CustomNode(props: NodeProps) {
	return (
		<div className='flex flex-col items-center ' data-nodeid={props.id}>
			<div
				data-tooltip-id={`node_tooltip${props.id}`}
				className='rounded-full h-[70px] w-[70px] border-[5px] border-solid border-[#9cc8f8] bg-white'
			></div>
			<p className='text-white text-bold'>{props.data.label}</p>
			<Handle
				type='source'
				position={Position.Top}
				id='a'
				style={HANDLE_STYLES}
				isConnectable={false}
			/>
			<Handle
				type='source'
				position={Position.Top}
				id='b'
				style={HANDLE_STYLES}
				isConnectable={false}
			/>
			<Handle
				type='source'
				position={Position.Top}
				id='c'
				style={HANDLE_STYLES}
				isConnectable={false}
			/>
			<Handle
				type='source'
				position={Position.Top}
				id='d'
				style={HANDLE_STYLES}
				isConnectable={false}
			/>
			<Handle
				type='source'
				position={Position.Top}
				id='e'
				style={HANDLE_STYLES}
				isConnectable={false}
			/>
			<Handle
				type='target'
				position={Position.Top}
				style={HANDLE_STYLES}
				isConnectable={false}
			/>
			<Tooltip
				id={`node_tooltip${props.id}`}
				place='bottom'
				html={props.data.title}
			/>
		</div>
	)
}
