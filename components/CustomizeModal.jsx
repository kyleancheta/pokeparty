import React, { useState, useRef } from "react"
import Button from "./Button"
import Message from "./Message"
import styles from "./CustomizeModal.module.css"
import pokeball from "../img/pokeball.png"
import greyPokeball from "../img/bg-pokeball.png"
import { MdClose, MdDragHandle } from "react-icons/md";


function CustomizeModal({toggleCustom, pokemon, customizeParty, ...props}) {
    const [changesMade, setChangesMade] = useState(false)
    const [formData, setFormData] = useState([
        { name: pokemon[0].species.name, sprite: pokemon[0].sprites.front_default },
        { name: pokemon[1].species.name, sprite: pokemon[1].sprites.front_default },
        { name: pokemon[2].species.name, sprite: pokemon[2].sprites.front_default },
        { name: pokemon[3].species.name, sprite: pokemon[3].sprites.front_default },
        { name: pokemon[4].species.name, sprite: pokemon[4].sprites.front_default },
        { name: pokemon[5].species.name, sprite: pokemon[5].sprites.front_default }
    ])

    function clearForm() {
        setFormData([
            { name: "", sprite: greyPokeball },
            { name: "", sprite: greyPokeball },
            { name: "", sprite: greyPokeball },
            { name: "", sprite: greyPokeball },
            { name: "", sprite: greyPokeball },
            { name: "", sprite: greyPokeball },
        ])
        setChangesMade(true)
    }
    
    function handleChange(event, index) {
        setFormData(prevForm => {
            const newForm = [...prevForm]
            newForm[index].name = event.target.value
            newForm[index].sprite = greyPokeball
            return newForm
        })
        setChangesMade(true)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const newParty = []
        for (let poke in formData) {
            newParty.push(formData[poke].name)
        }
        // console.log(newParty)
        toggleCustom()
        customizeParty(newParty)
    }

    function closeModal() {
        setChangesMade(false)
        toggleCustom()
    }

    const dragItem = useRef()
    const dragOverItem = useRef()
    
    const dragStart = (e, position) => {
        dragItem.current = position
        console.log(e.target.innerHTML)
    }

    const dragEnter = (e, position) => {
        dragOverItem.current = position
        console.log(e.target.innerHTML)
    }

    const drop = (e) => {
        const copyListItems = [...formData]
        const dragItemContent = copyListItems[dragItem.current]
        copyListItems.splice(dragItem.current, 1)
        copyListItems.splice(dragOverItem.current, 0, dragItemContent)
        dragItem.current = null
        dragOverItem.current = null
        setFormData(copyListItems)
        setChangesMade(true)
    }

    return (
        <div className={styles.bg}>
            <div className={styles.main}>
                <div className={styles.heading}>
                    <h1>Customize Pokemon</h1>
                    <Button onClick={closeModal}>
                        <MdClose className={`${styles.icon} ${changesMade ? styles.red : styles.black}`}/>
                    </Button>
                </div>

                <div className={styles.formActions}>
                    <Button onClick={clearForm} style={{fontWeight: "700"}}>Reset</Button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {
                        formData.map((pokemon, index) => (
                            <div    
                                className={styles.inputRow} 
                                key={index}
                                onDragStart={(e) => dragStart(e, index)}
                                onDragEnter={(e) => dragEnter(e, index)}
                                onDragEnd={drop}
                                draggable
                            >
                                <span>
                                    <MdDragHandle className={styles.icon}/>
                                </span>      
                                <input
                                    index={index}
                                    type="text"
                                    placeholder={`Pokemon ${index + 1}`}
                                    onChange={(e) => handleChange(e, index)}
                                    name={`pokemon_${index}`}
                                    value={formData[index].name}
                                />
                                <img src={formData[index].sprite} className={styles.sprite}/>
                            </div>
                        )
                        )
                    }
                    <Message info style={{maxWidth: "424"}}>
                        Make sure you spell the names correctly!
                    </Message>
                    <button className={styles.btn}>
                        <img src={pokeball} className={styles.icon}/>
                        Submit
                    </button>        
                </form>
                                
            </div>
        </div>
    )
}

export default CustomizeModal