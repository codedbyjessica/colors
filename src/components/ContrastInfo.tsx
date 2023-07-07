import React, {useState, useEffect} from "react"
import tw from "twin.macro"
import { getContrastCheck } from "../utils/api"

const ContrastInfo: React.FC<any> = ({colorHex1, colorHex2}) => {

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
        <div tw="p-4">
            <div tw="text-center mb-3">Contrast Ratio: {contrastData.ratio}</div>
            <div tw="flex justify-between mb-2">
                <div tw="w-full">AA: <span css={[contrastData.AA === "pass" ? tw`text-green-500` : tw`text-red-500`]}>{contrastData.AA}</span></div>
                <div tw="w-full">AA Large: <span css={[contrastData.AALarge === "pass" ? tw`text-green-500` : tw`text-red-500`]}>{contrastData.AALarge}</span></div>
            </div>
            <div tw="flex justify-between mb-2">
                <div tw="w-full">AAA:  <span css={[contrastData.AAA === "pass" ? tw`text-green-500` : tw`text-red-500`]}>{contrastData.AAA}</span></div>
                <div tw="w-full">AAA Large:  <span css={[contrastData.AAALarge === "pass" ? tw`text-green-500` : tw`text-red-500`]}>{contrastData.AAALarge}</span></div>
            </div>
        </div>
	)
}

export default ContrastInfo