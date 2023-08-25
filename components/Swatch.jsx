import React from "react"
import styles from "./Swatch.module.css"
import colorss from "../colors.css?inline"

export default function Swatch({color, selected, ...props}) {

    if (selected) {
        return (
            <div className={`${styles.main} ${color}-bg`}>
                <span className={styles.selected}></span>
            </div>
        )
    }
    else {
        return (
            <div className={`${styles.main} ${color}-bg`} {...props}>
                <div className={styles.dot}></div>
            </div>
        )
    }
}