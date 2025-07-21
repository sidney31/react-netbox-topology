import type { EdgeProps } from '@xyflow/react'
import { BaseEdge, getStraightPath } from '@xyflow/react'

export function CustomEdge(props: EdgeProps) {
	const [edgePath] = getStraightPath({
		sourceX: props.sourceX,
		sourceY: props.sourceY,
		targetX: props.targetX,
		targetY: props.targetY,
	})

	return (
		<>
			<BaseEdge id={props.id} path={edgePath} />
		</>
	)
}
