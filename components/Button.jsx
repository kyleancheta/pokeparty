import React from "react"
import classnames from "classnames"
import btnStyles from "./Button.module.css"

export default function Button({primary, danger, disabled, children, className, tooltip, tooltipPosition, ...props}) {
    const allClasses = classnames(className, btnStyles)

    if (disabled) {
        return (
            <button style={{opacity: 0.50, cursor: "not-allowed"}} className={allClasses} {...props}>
                {children}
            </button> 
        )
    }
    else if (primary) {
        // console.log("primary pog")
        const primaryClasses = classnames(className, btnStyles, "primary")
        return (
            <button className={primaryClasses} {...props}>
                {children}
            </button> 
        )
    }
    else if (danger) {
        // console.log("primary pog")
        const dangerClasses = classnames(className, btnStyles, btnStyles.danger)
        return (
            <button className={dangerClasses} {...props}>
                {children}
            </button> 
        )
    }
    else {
        return (
            <button className={allClasses} {...props}>
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