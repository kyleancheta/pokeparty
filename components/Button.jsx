import React from "react"
import classnames from "classnames"
import btnStyles from "./Button.module.css"

export default function Button({disabled, children, className, tooltip, tooltipPosition, ...props}) {
    const allClasses = classnames(className, btnStyles)

    if (disabled) {
        return (
            <button style={{opacity: 0.50, cursor: "not-allowed"}} className={allClasses} {...props} hover-tooltip={tooltip} tooltip-position={tooltipPosition}>
                {children}
            </button> 
        )
    }
    else {
        return (
            <button className={allClasses} {...props} hover-tooltip={tooltip} tooltip-position={tooltipPosition}>
                {children}
            </button> 
        )
    }
}