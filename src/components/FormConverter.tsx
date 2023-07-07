import React, {useState} from "react"
import "twin.macro"
import { hexToRgb, rgbToHex } from "../utils/converter"
import { getContrastCheck } from "../utils/api"

const FormConverter = (props: any) => {

	const {colorHex, setColorHex, rgbR, setRgbR, rgbG, setRgbG, rgbB, setRgbB} = props
	const [textColor, setTextColor] = useState(colorHex === "000000" ? "white": "black")
    const [bgColor, setBgColor] = useState(colorHex || "")
    const [isCopied, setIsCopied] = useState("")

    const checkRatio = (color: string) => {
        const success = (result: any) => {
            if (result.AAA === "fail") {
                setTextColor("white")
            } else if (result.AAA === "pass") {
                setTextColor("black")
            }
        }
        const fail = (error: string) => {
            console.log('error', error)
        }
        getContrastCheck(color, "#000000", success, fail)
    }

	const onHexchange = (e: any) => {
		let color = e.target.value.length > 6 ? e.target.value.slice(0, 6) : e.target.value
		const lastIndex = color.length - 1
		color = color.charAt(lastIndex).match(/[0-9A-Fa-f]/g) ? color : color.substring(0, lastIndex);; 
		setColorHex(color)
        if (color.length === 6) {
            setRgbR(String(hexToRgb(color).r))
            setRgbG(String(hexToRgb(color).g))
            setRgbB(String(hexToRgb(color).b))
            checkRatio(color)
            setBgColor(color)
        }
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
        checkRatio(hex)
        setBgColor(hex)
	}

    const copyValue = (e:any, value: string) => {
        e.preventDefault()
        navigator.clipboard.writeText(value)
        setIsCopied(value)
        setTimeout(() => {
            setIsCopied("")
        }, 2000);
    }

    const inputStyle = {borderBottom: textColor === "black" ? "1px solid black" : "1px solid white", color: textColor === "black" ? "black" : "white"}

	return (
        <div className="container-background" style={{backgroundColor: "#" + bgColor, color: textColor}}>
            <div tw="h-full flex justify-center items-center px-10">
                <form>
                    <div>
                        #<input type="text" className="input-hex" value={colorHex} onChange={onHexchange} tw="uppercase" style={inputStyle} /> 
                        <button className="button-copy" onClick={e => copyValue(e, "#" + colorHex)}>{isCopied === "#" + colorHex ? "copied!" : "copy"}</button>
                        <br />
                        rgb(
                            <input type="number" className="input-rgb" value={rgbR} id="rgbR" onChange={onRgbChange} style={inputStyle} />,
                            <input type="number" className="input-rgb" value={rgbG} id="rgbG" onChange={onRgbChange} style={inputStyle} />,
                            <input type="number" className="input-rgb" value={rgbB} id="rgbB" onChange={onRgbChange} style={inputStyle} />
                        )
                        <button className="button-copy" onClick={e => copyValue(e, `rgb(${rgbR}, ${rgbG}, ${rgbB})`)}>{isCopied === `rgb(${rgbR}, ${rgbG}, ${rgbB})` ? "copied!" : "copy"}</button>
                    </div>
                </form>
            </div>
        </div>

	)
}

export default FormConverter