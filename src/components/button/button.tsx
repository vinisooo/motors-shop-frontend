"use client"

import {Children, MouseEventHandler, ReactNode} from "react"
import '../../styles/components/button/button.sass'

enum buttonSize{
    Big="big ",
    Medium="medium "
}

enum buttonWidth{
    w30="w30 ",
    w50="w50 ",
    w80="w80 "
}

enum buttonType{
    GREY1="grey-1",
    NEGATIVE1="negative-1",
    DISABLED="disabled",
    BRAND1="brand-1",
    BrandOpacity="brand-opacity",
    Light="light",
    OutlineLight="outline-light",
    B45="b45",
    Outline2="outline-2",
    OutlineBrand1="outline-brand-1",
    BigText="big-text",
    BrandDisabled="brand-disbaled",
    Alert="alert",
    Confirm="confirm"
}

type tSizeButton= "big" | "medium"


type tTypes= 
"grey-1" | 
"negative-1" | 
"disabled" | 
"brand-1" | 
"brand-opacity" | 
"ligth" |
"outline-light"|  
"b45"| 
"m44"| 
"outline-2"|
"outline-brand-1"| 
"big-text"| 
"brand-disabled"|
"alert"|
"cancel"|
"confirm"|
"sucess"

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode
    size?: tSizeButton
    Style?:  tTypes
    width?: number
}

const Button=({children,Style,size,width, ...props}:IButton):React.JSX.Element=>{

    let className= props.className ? props.className : ''

    switch(size){
        case "big":
            className= className + " " + buttonSize.Big
            break
        case "medium":
            className=className + " " + buttonSize.Medium
            break
        default:
            className=className + " " + buttonSize.Big
    }

    switch(width){
        case 30:
            className= `${className} ${buttonWidth.w30}`
            break
        case 50:
            className= `${className} ${buttonWidth.w50}`
            break
        case 80:
            className= `${className} ${buttonWidth.w80}`
            break
        default:
            className= className
    }

    switch(Style){
        case "grey-1":
            className= className + buttonType.GREY1
            break
        case "negative-1":
            className=className + buttonType.NEGATIVE1
            break
        case "disabled":
            className=className + buttonType.DISABLED
            break
        case "brand-1": 
            className=className + buttonType.BRAND1
            break
        case "brand-opacity":
            className=className + buttonType.BrandOpacity
            break
        case "ligth":
            className= className + buttonType.Light
            break
        case "outline-light":
            className=className + buttonType.OutlineLight
            break       
        case "b45":
            className=className + buttonType.B45
            break
        case "m44":
            className=className + buttonType.B45
            break
        case "outline-2":
            className=className + buttonType.Outline2
            break
        case "outline-brand-1":
            className=className + buttonType.OutlineBrand1
            break
        
        case "big-text":
            className=className + buttonType.BigText
            break
        case "brand-disabled":
            className=className + buttonType.BrandDisabled
            break
        case "alert":
        case "cancel":
            className=className + buttonType.Alert
            break
        case "confirm":
        case "sucess":
            className=className + buttonType.Confirm
            break
        default:
            className=className + buttonType.BRAND1
    }

    return(
        <button {...props} className={className}>
            {children}
        </button>

    )
}


import React from 'react'

export default Button
