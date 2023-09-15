import React from "react"
import styles from "./DropdownList.module.css"
import list from "../pokemonlist.json"

export default function DropdownList() {
    return (
        <div className={styles.main}>
            <ul>
                {
                    list.map((pokemon, index) => (
                        <li key={index}>{pokemon}</li>
                    ))
                }
            </ul>
        </div>
    )
}

{
    /* <input
        index={index}
        type="text"
        placeholder={`Pokemon ${index + 1}`}
        onChange={(e) => handleChange(e, index)}
        name={`pokemon_${index}`}
        value={formData[index].name}
    /> */
}