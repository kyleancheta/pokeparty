import React from "react"
// import DropdownList from "./DropdownList"
import styles from "./InputDropdown.module.css"
import list from "../pokemonlist.json"
import greyPokeball from "../img/bg-pokeball.png"


export default function InputDropdown({isActive, index, formData, setFormData, setChangesMade, ...props}) {

    const formIndex = index
    console.log(formIndex)
    // let initialEntry = formData[index].name
    
    function handleChange(event, i) {
        setChangesMade(true)
        setFormData(prevForm => {
            const newForm = [...prevForm]
            newForm[i].name = event.target.value
            newForm[i].sprite = greyPokeball
            return newForm
        })
    }

    function handleDropdownClick(nameFromList, i) {
        console.log("functioned reached")
        console.log(i)
        setFormData(prevForm => {
            const newForm = [...prevForm]
            // console.log(newForm)
            newForm[i].name = nameFromList
            newForm[i].sprite = greyPokeball
            return newForm
        })
    }
    function testingShit() {
        console.log("AHHHHHHHH")
    }
    
    const fullPokemonList = list.map(
        (pokemon, i) => (
            <li key={i} onClick={() => handleDropdownClick(pokemon, index)}>{pokemon}</li>
        )
    )

    return (
        <>
            <input
                value={formData[index].name}
                onChange={(e) => handleChange(e, index)}
                {...props}
            />
            <div className={styles.dropdown}>
                <ul>
                    {fullPokemonList}
                </ul>
            </div>
        </>
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