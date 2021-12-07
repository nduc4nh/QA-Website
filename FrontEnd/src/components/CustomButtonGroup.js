import { React, useState } from 'react'
import './css/ButtonGroup.css'
import CustomButton from './CustomButton'

const CustomButtonGroup = ({ options, chosen, allowTopBorder, allowBottomBorder, color, hoverColor, chosenColor, onChosen}) => {
    const n = options.length
    const [backgrounds, setBackGrounds] = useState(options.map((item) => { return hoverColor }))
    
    if (color == undefined) color = "white"
    if (hoverColor == undefined) hoverColor = "#dddddd"
    if (chosenColor == undefined) chosenColor = "#757575"
    if (allowBottomBorder == undefined) allowBottomBorder = false
    if (allowTopBorder == undefined) allowTopBorder = false

    const isChosen = (i) => {
        if (i == chosen) return <div className="chosen-indicator" style={{ background: chosenColor }}></div>
        return <></>
    }

    const changeBackground = (i, color) => {
        let tmp = [...backgrounds]
        tmp[i] = color
        console.log(tmp);
        setBackGrounds(tmp)
    }

    return (
        <div className='btn-group-container'>
            {options.map((option, i) => (
                i == 0 ?
                    <div style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        borderTopStyle: allowTopBorder?"solid":"",
                        borderTopColor: allowTopBorder?"#dddddd":"",
                        borderLeftStyle: allowTopBorder?"solid":"",
                        borderLeftColor: allowTopBorder?"#dddddd":"",
                        borderWidth: allowTopBorder?"2px":""
                    }}>
                        <CustomButton onClick={()=>(onChosen(option))}>
                            {option}
                        </CustomButton>
                        {isChosen(option)}
                    </div>
                    :
                    (
                        i == (n - 1) ?
                            <div style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                borderTopStyle: allowTopBorder?"solid":"",
                                borderTopColor: allowTopBorder?"#dddddd":"",
                                borderRightStyle: allowTopBorder?"solid":"",
                                borderRightColor: allowTopBorder?"#dddddd":"",
                                borderWidth: allowTopBorder?"2px":""

                            }}>
                                <CustomButton onClick={()=>(onChosen(option))}>
                                    {option}
                                </CustomButton>
                                {isChosen(option)}
                            </div>
                            :
                            <div style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                borderTopStyle: allowTopBorder?"solid":"",
                                borderTopColor: allowTopBorder?"#dddddd":"",
                                borderRightStyle: allowTopBorder?"solid":"",
                                borderRightColor: allowTopBorder?"#dddddd":"",
                                borderWidth: allowTopBorder?"2px":""
                            }}>
                                <CustomButton onClick={()=>(onChosen(option))}>
                                    {option}
                                </CustomButton>
                                {isChosen(option)}
                            </div>
                    )))}
        </div>
    )
}

export default CustomButtonGroup
