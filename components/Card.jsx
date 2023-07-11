import React from "react"
import cardStyles from "./Card.module.css"

export default function Card(props) {
    return (
        <div className={cardStyles.card}>
            <div className={cardStyles.container}>
                <img src={props.image} className={cardStyles.artwork}/>
            </div>
            <h2 className={cardStyles.name}>{props.name}</h2>
            <section className={cardStyles.types}>
                <div className={`${cardStyles.pill} ${props.typeOne}`}>{props.typeOne}</div>
                {props.typeTwo && <div className={`${cardStyles.pill} ${props.typeTwo}`}>{props.typeTwo}</div>}
            </section>
        </div>
    )
}