import { toPng } from 'html-to-image'
import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	topology: HTMLDivElement | null
}

export default function SaveTopologyButton({
	children,
	style,
	...props
}: Props) {
	const takeCapture = () => {
		if (!props.topology) return
		toPng(props.topology)
			.then(dataUrl => {
				downloadImage(dataUrl)
			})
			.catch(err => {
				console.error('Error during image generation:', err)
			})
	}

	function downloadImage(dataUrl: string) {
		const a = document.createElement('a')

		a.setAttribute('download', 'topology.png')
		a.setAttribute('href', dataUrl)
		a.click()
	}

	return (
		<button {...props} onClick={takeCapture}>
			{children}
		</button>
	)
}
