import React from "react"
import classnames from "classnames"
import btnStyles from "./Button.module.css"

export default function Button({primary, danger, solid, disabled, children, className, toolTip, tooltipPosition, ...props}) {
    const allClasses = classnames(className, btnStyles)

    if (disabled) {
        return (
            <button style={{opacity: 0.50, cursor: "not-allowed"}} className={allClasses} data-text={toolTip} data-position={tooltipPosition} {...props}>
                {children}
            </button> 
        )
    }
    else if (primary) {
        const primaryClasses = classnames(className, btnStyles.primary)
        return (
            <button className={primaryClasses} data-text={toolTip} data-position={tooltipPosition} {...props}>
                {children}
            </button> 
        )
    }
    else if (danger) {
        const dangerClasses = classnames(className, btnStyles.danger)
        return (
            <button className={dangerClasses} data-text={toolTip} data-position={tooltipPosition} {...props}>
                {children}
            </button> 
        )
    }
    else if (solid) {
        const classes = classnames(className, btnStyles.solid)
        return (
            <button className={classes} {...props}>
                {children}
            </button> 
        )
    }
    else {
        return (
            <button className={allClasses} data-text={toolTip} data-position={tooltipPosition} {...props}>
                {children}
            </button> 
        )
    }
}

// if (disabled) {
//     return (
//         <button style={{opacity: 0.50, cursor: "not-allowed"}} className={allClasses} {...props} hover-tooltip={tooltip} tooltip-position={tooltipPosition}>
//             {children}
//         </button> 
//     )
// }
// else if (primary) {
//     // console.log("primary pog")
//     const primaryClasses = classnames(className, btnStyles, "primary")
//     return (
//         <button className={primaryClasses} {...props}>
//             {children}
//         </button> 
//     )
// }
// else {
//     return (
//         <button className={allClasses} {...props} hover-tooltip={tooltip} tooltip-position={tooltipPosition}>
//             {children}
//         </button> 
//     )
// }