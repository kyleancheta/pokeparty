import React from "react"

export default function Card(props) {
    return (
        <div className="card">
            <div className="container-images">
                <img src={props.image} className="pokemon-artwork-main"/>
            </div>
            <h2 className="pokemon-name">{props.name}</h2>
            <section className="pokemon-types">
                <div className={`pill-type ${props.typeOne}`}>{props.typeOne}</div>
                {props.typeTwo && <div className={`pill-type ${props.typeTwo}`}>{props.typeTwo}</div>}
            </section>
        </div>
    )
}