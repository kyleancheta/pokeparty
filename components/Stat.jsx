import React from "react"
import styles from "./Stat.module.css"

export default function Stat({center, label, stat, className}) {
    
    return (
        <section className={styles.main}>
            <span>{label}</span>
            <p>{stat}</p>
        </section>
    )
}