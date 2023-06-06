import {ReactNode} from "react"
import '../../styles/components/button/button.sass'

enum buttonType{
    BG1='big grey-1',
    MG1='medium grey-1',
    BN1='big negative-1',
    MN1='medium negative-1',
    BD='big disabled',
    MD='medium disabled',
    BB1='big brand-1',
    MB1='medium brand-1',
    BBO='big brand-opacity',
    MBO='medium brand-opacity',
    BL='big ligth',
    ML='medium ligth',
    BOL='big outline-light',
    MOL='medium outline-light',
    B45='big b45',
    M44='medium b45',
    BO2='big outline-2',
    MO2='medium outline-2',
    BOB1='big outline-brand-1',
    MOB1='medium outline-brand-1',
    BBT='big big-text',
    MBT='medium big-text',
    BBD='big brand-disbaled',
    MBD='medium brand-disabled',
}

type iTypes= 
"BG1" | 
"MG1" | 
"BN1" | 
"MN1"| 
"BD" | 
"MD" | 
"BB1" | 
"MB1" | 
"BBO" | 
"MBO" | 
"BL" | 
"ML"|
"BOL"| 
"MOL"| 
"B45"| 
"M44"| 
"BO2"| 
"MO2"| 
"BOB1"|
"MOB1"| 
"BBT"| 
"MBT"| 
"BBD"

interface iButton{
    children: ReactNode
    style?: iTypes
}

export const Button=({children,style}:iButton):React.JSX.Element=>{

    let className=null
    switch(style){
        case "BG1":
            className=buttonType.BG1
            break
        case "MG1":
            className=buttonType.MG1
            break
        case "BN1":
            className=buttonType.BN1
            break
        case "MN1":
            className=buttonType.MN1
            break
        case "BD":
            className=buttonType.BD
            break
        case "MD":
            className=buttonType.MD 
            break
        case "BB1": 
            className=buttonType.BB1
            break
        case "MB1":
            className=buttonType.MB1
            break
        case "BBO":
            className=buttonType.BBO
            break
        case "MBO":
            className=buttonType.MBO 
            break
        case "BL":
            className=buttonType.BL 
            break
        case "ML":
            className=buttonType.ML
            break
        case "BOL":
            className=buttonType.BOL
            break
        case "MOL":
            className=buttonType.MOL
            break
        case "B45":
            className=buttonType.B45
            break
        case "M44":
            className=buttonType.M44
            break
        case "BO2":
            className=buttonType.BO2
            break
        case "MO2":
            className=buttonType.MO2
            break
        case "BOB1":
            className=buttonType.BOB1
            break
        case "MOB1":
            className=buttonType.MOB1
            break 
        case "BBT":
            className=buttonType.BBT
            break
        case "MBT":
            className=buttonType.MBT
            break
        case "BBD":
            className=buttonType.BBD
            break
        default:
            className=buttonType.BB1
    }

    return(
        <button className={className}>
            {children}
        </button>
    )
}

export default Button