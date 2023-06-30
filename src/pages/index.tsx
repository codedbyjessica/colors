import React, {useState} from "react"
import type { HeadFC, PageProps } from "gatsby"
import "twin.macro"
import { hexToRgb } from "../utils/converter"

const IndexPage: React.FC<PageProps> = () => {

	const [color, setColor] = useState("#B2E4DB")
	const [colorHex, setColorHex] = useState("")
	const [colorRGB, setColorRBG] = useState("")

	const onInputChange = (e: any) => {
		const color = e.target.value
		setColor(color)
		if (color.includes("#")) {
			setColorHex(color)
			const rgb = `rgb(${hexToRgb(color)?.r || ""}, ${hexToRgb(color)?.g || ""}, ${hexToRgb(color)?.b || ""})`
			setColorRBG(rgb)
		} 
	}
	return (
		<main style={{background: color}} tw="h-screen w-screen flex justify-center items-center">
			<div>
				<input type="text" onChange={e => onInputChange(e)} />
				<p>{colorHex}</p>
				<p>{colorRGB} </p>
			</div>
		</main>
	)
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
