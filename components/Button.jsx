import React from "react"
import classnames from "classnames"
import btnStyles from "./Button.module.css"

export default function Button({children, className, ...props}) {
    const allClasses = classnames(className, btnStyles)
    return (
        <button className={allClasses} {...props}>
            {children}
        </button> 
    )
}