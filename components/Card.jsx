import React from "react"
import cardStyles from "./Card.module.css"

export default function Card({name, image, types, ...props}) {

    let typeOne = types[0].type.name
    let typeTwo = null
    if (types.length > 1) {
        typeTwo = types[1].type.name
    }
    
    return (
        <div className={cardStyles.card}>
            <div className={cardStyles.container}>
                <img src={image} className={cardStyles.artwork}/>
            </div>
            <h2 className={cardStyles.name}>{name}</h2>
            <section className={cardStyles.types}>
                <div className={`${cardStyles.pill} ${typeOne}`}><p>{typeOne}</p></div>
                {typeTwo && <div className={`${cardStyles.pill} ${typeTwo}`}><p>{typeTwo}</p></div>}
            </section>
        </div>
    )
}