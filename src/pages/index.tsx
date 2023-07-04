import React, {useState, useEffect} from "react"
import type { HeadFC, PageProps } from "gatsby"
import tw from "twin.macro"
import FormConverter from "../components/formConverter"
import { getContrastCheck } from "../utils/api"

const IndexPage: React.FC<PageProps> = () => {

	const [colorHex1, setColorHex1] = useState("000000")
	const [rgbR1, setRgbR1] = useState("0")
	const [rgbG1, setRgbG1] = useState("0")
	const [rgbB1, setRgbB1] = useState("0")

	const [colorHex2, setColorHex2] = useState("FFFFFF")
	const [rgbR2, setRgbR2] = useState("255")
	const [rgbG2, setRgbG2] = useState("255")
	const [rgbB2, setRgbB2] = useState("255")

	const [contrastData, setContrastData] = useState({ratio: '', AA: '', AALarge: '', AAA: '', AAALarge: ''})

    useEffect(() => {
		const success = (result: any) => {
			setContrastData(result)
		}
		const fail = (error: string) => {
			console.log('error', error)
		}

		if (colorHex1.length === 6 && colorHex2.length === 6) {
			getContrastCheck(colorHex1, colorHex2, success, fail)
		}
		
    }, [colorHex1, colorHex2])

	return (
		<main tw="h-screen font-poppins">
			<div tw="h-1/2">
				<FormConverter colorHex={colorHex1} rgbR={rgbR1} rgbG={rgbG1} rgbB={rgbB1} setColorHex={setColorHex1} setRgbR={setRgbR1} setRgbG={setRgbG1} setRgbB={setRgbB1} />
			</div>
			<div tw="relative">
				<div tw="absolute top-[-50px] left-[calc(50vw - 150px)] bg-white h-[100px] sm:w-[300px]">
					<div tw="p-4">
						<div tw="text-center mb-2">Contrast Ratio: {contrastData.ratio}</div>
						<div tw="flex justify-between mb-2">
							<div tw="w-full">AA: <span css={[contrastData.AA === "pass" ? tw`text-green-500` : tw`text-red-500`]}>{contrastData.AA}</span></div>
							<div tw="w-full">AA Large: <span css={[contrastData.AALarge === "pass" ? tw`text-green-500` : tw`text-red-500`]}>{contrastData.AALarge}</span></div>
						</div>
						<div tw="flex justify-between mb-2">
							<div tw="w-full">AAA:  <span css={[contrastData.AAA === "pass" ? tw`text-green-500` : tw`text-red-500`]}>{contrastData.AAA}</span></div>
							<div tw="w-full">AAA Large:  <span css={[contrastData.AAALarge === "pass" ? tw`text-green-500` : tw`text-red-500`]}>{contrastData.AAALarge}</span></div>
						</div>
					</div>
				</div>
			</div>
			<div tw="h-1/2">
				<FormConverter colorHex={colorHex2} rgbR={rgbR2} rgbG={rgbG2} rgbB={rgbB2} setColorHex={setColorHex2} setRgbR={setRgbR2} setRgbG={setRgbG2} setRgbB={setRgbB2} />
			</div>
		</main>
	)
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
