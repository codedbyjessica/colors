import React, {useState} from "react"
import type { HeadFC, PageProps } from "gatsby"
import "twin.macro"
import { hexToRgb, rgbToHex } from "../utils/converter"

const IndexPage: React.FC<PageProps> = () => {

	const [colorHex, setColorHex] = useState("")
	const [rgbR, setRgbR] = useState("")
	const [rgbG, setRgbG] = useState("")
	const [rgbB, setRgbB] = useState("")

	const onHexchange = (e: any) => {
		let color = e.target.value.length > 6 ? e.target.value.slice(0, 6) : e.target.value
		const lastIndex = color.length - 1
		color = color.charAt(lastIndex).match(/[0-9A-Fa-f]/g) ? color : color.substring(0, lastIndex);; 
		setColorHex(color)
		setRgbR(String(hexToRgb(color).r))
		setRgbG(String(hexToRgb(color).g))
		setRgbB(String(hexToRgb(color).b))
	}

	const onRgbChange = (e: any) => {
		let value = e.target.value.length > 3 ? e.target.value.slice(0, 3) : e.target.value
		value = value > 255 ? 255 : value
		value = (value === "00" || value === "000") ? 0 : value

		const id = e.target.id;
		let hex = ""
		if (id === "rgbR") {
			setRgbR(String(value))
			hex = rgbToHex(Number(value), Number(rgbG), Number(rgbB))
		} else if (id=== "rgbG") {
			setRgbG(String(value))
			hex = rgbToHex(Number(rgbR), Number(value), Number(rgbB))
		} else if (id === "rgbB") {
			setRgbB(String(value))
			hex = rgbToHex(Number(rgbR), Number(rgbG), Number(value))
		}
		setColorHex(hex.replace("#", ""))
	}

	return (
		<main style={{background: "#" + colorHex}} tw="h-screen w-screen flex justify-center items-center">
			<div>
				<form>
					<div>
						#<input type="text" value={colorHex} onChange={onHexchange} tw="uppercase" />
						<br />
						rgb(
							<input type="number" value={rgbR} id="rgbR" onChange={onRgbChange}/>,
							<input type="number" value={rgbG} id="rgbG" onChange={onRgbChange}/>,
							<input type="number" value={rgbB} id="rgbB" onChange={onRgbChange}/>
						)
					</div>
					<div>

					</div>
				</form>
			</div>
		</main>
	)
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
