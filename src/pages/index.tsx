import React, {useState} from "react"
import type { HeadFC, PageProps } from "gatsby"
import "twin.macro"
import FormConverter from "../components/FormConverter"
import ContrastInfo from "../components/ContrastInfo"

const IndexPage: React.FC<PageProps> = () => {

	const [colorHex1, setColorHex1] = useState("000000")
	const [rgbR1, setRgbR1] = useState("0")
	const [rgbG1, setRgbG1] = useState("0")
	const [rgbB1, setRgbB1] = useState("0")

	const [colorHex2, setColorHex2] = useState("FFFFFF")
	const [rgbR2, setRgbR2] = useState("255")
	const [rgbG2, setRgbG2] = useState("255")
	const [rgbB2, setRgbB2] = useState("255")

	return (
		<main tw="h-screen font-poppins">
			<div tw="h-1/2 min-h-[300px]">
				<FormConverter colorHex={colorHex1} rgbR={rgbR1} rgbG={rgbG1} rgbB={rgbB1} setColorHex={setColorHex1} setRgbR={setRgbR1} setRgbG={setRgbG1} setRgbB={setRgbB1} />
			</div>
			<div tw="relative">
				<div tw="absolute top-[-55px] left-[calc(50vw - 170px)] bg-white h-[110px] w-[340px] rounded">
					<ContrastInfo colorHex1={colorHex1} colorHex2={colorHex2} />
				</div>
			</div>
			<div tw="h-1/2 min-h-[150px]">
				<FormConverter colorHex={colorHex2} rgbR={rgbR2} rgbG={rgbG2} rgbB={rgbB2} setColorHex={setColorHex2} setRgbR={setRgbR2} setRgbG={setRgbG2} setRgbB={setRgbB2} />
			</div>
			<div tw="sm:(absolute bottom-4 right-4) bg-[rgba(255,255,255,0.4)] text-xs p-3 rounded">
				a quick place for me <br tw="hidden sm:block" />to check my colours
				<p><a href="http://codedbyjessica.com/" target="_blank">codedbyjessica.com </a></p>
			</div>
		</main>
	)
}

export default IndexPage

export const Head: HeadFC = () => <title>Colours</title>
