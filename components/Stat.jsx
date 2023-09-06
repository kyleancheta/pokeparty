import React from "react"
import styles from "./Stat.module.css"

export default function Stat({ mainStat, label, stat, className }) {

    function colorizeStat(num) {
        if (num >= 200) {
            return "var(--ice)"
        }
        else if (num >= 150) {
            return "var(--dragon)"
        }
        else if (num >= 120) {
            return "var(--bug)"
        }
        else if (num >= 90) {
            return "var(--grass)"
        }
        else if (num >= 60) {
            return "var(--electric)"
        }
        else {
            return "var(--fire)"
        }
    }

    const barStyles = {
        minWidth: `6%`,
        width: `${stat/170*100}%`,
        maxWidth: `96%`,
        backgroundColor: colorizeStat(stat)
    }
    
    if (mainStat) {
        return (
            <section className={styles.main2}>
                <span>{label}</span>
                <div className={styles.statbar} style={barStyles}>
                    <p>{stat}</p>
                </div>
            </section>
        )
    } else {
        return (
            <section className={styles.main}>
                <span>{label}</span>
                <p>{stat}</p>
            </section>
        )
    }
}