import React from "react"
import Button from "./Button"
import Message from "./Message"
import styles from "./CustomizeModal.module.css"
import pokeball from "../img/pokeball.png"
import greyPokeball from "../img/bg-pokeball.png"
import { MdClose } from "react-icons/md";


function CustomizeModal({toggleCustom, pokemon, customizeParty, ...props}) {
    const [formData, setFormData] = React.useState(
        {firstPoke: pokemon[0].species.name, 
        secondPoke: pokemon[1].species.name, 
        thirdPoke: pokemon[2].species.name,
        fourthPoke: pokemon[3].species.name, 
        fifthPoke: pokemon[4].species.name, 
        sixthPoke: pokemon[5].species.name}
    )

    const [partySprites, setPartySprites] = React.useState([
        pokemon[0].sprites.front_default,
        pokemon[1].sprites.front_default,
        pokemon[2].sprites.front_default,
        pokemon[3].sprites.front_default,
        pokemon[4].sprites.front_default,
        pokemon[5].sprites.front_default,
    ])

    function clearForm() {
        setFormData({firstPoke: "", 
            secondPoke: "", 
            thirdPoke: "",
            fourthPoke: "", 
            fifthPoke: "", 
            sixthPoke: ""
        })
        setPartySprites([greyPokeball, greyPokeball, greyPokeball, greyPokeball, greyPokeball, greyPokeball])
    }
    
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
        const changedIndex = parseInt(event.target.attributes[0].nodeValue) - 1
        if (partySprites[changedIndex] === partySprites[changedIndex]) {
            const newSprites = [...partySprites]
            newSprites[changedIndex] = greyPokeball
            setPartySprites(newSprites)
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        const newParty = []
        for (const poke in formData) {
            console.log(`${poke}: ${formData[poke]}`)
            newParty.push(formData[poke])
        }
        console.log(newParty)
        toggleCustom()
        customizeParty(newParty)
    }

    return (
        <div className={styles.bg}>
            <div className={styles.main}>
                <div className={styles.heading}>
                    <h1>Customize Pokemon</h1>
                    <Button onClick={toggleCustom}>
                        <MdClose className={styles.icon}/>
                    </Button>
                </div>

                <div className={styles.formActions}>
                    <Button onClick={clearForm} style={{fontWeight: "700"}}>Reset</Button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputRow}>
                        <span>1</span>         
                        <input
                            index={1}
                            type="text"
                            placeholder="First Pokemon"
                            onChange={handleChange}
                            name="firstPoke"
                            value={formData.firstPoke}
                        />
                        <img src={partySprites[0]} className={styles.sprite}/>
                    </div>
                    <div className={styles.inputRow}>
                        <span>2</span>          
                        <input
                            index={2}
                            type="text"
                            placeholder="Second Pokemon"
                            onChange={handleChange}
                            name="secondPoke"
                            value={formData.secondPoke}
                        />
                        <img src={partySprites[1]} className={styles.sprite}/>
                    </div>
                    <div className={styles.inputRow}>
                        <span>3</span>          
                        <input
                            index={3}
                            type="text"
                            placeholder="Third Pokemon"
                            onChange={handleChange}
                            name="thirdPoke"
                            value={formData.thirdPoke}
                        />
                        <img src={partySprites[2]} className={styles.sprite}/>
                    </div>
                    <div className={styles.inputRow}>         
                        <span>4</span> 
                        <input
                            index="4"
                            type="text"
                            placeholder="Fourth Pokemon"
                            onChange={handleChange}
                            name="fourthPoke"
                            value={formData.fourthPoke}
                        />
                        <img src={partySprites[3]} className={styles.sprite}/>
                    </div>
                    <div className={styles.inputRow}>         
                        <span>5</span> 
                        <input
                            index="5"
                            type="text"
                            placeholder="Fifth Pokemon"
                            onChange={handleChange}
                            name="fifthPoke"
                            value={formData.fifthPoke}
                        />
                        <img src={partySprites[4]} className={styles.sprite}/>
                    </div>
                    <div className={styles.inputRow}>         
                        <span>6</span> 
                        <input
                            index="6"
                            type="text"
                            placeholder="Sixth Pokemon"
                            onChange={handleChange}
                            name="sixthPoke"
                            value={formData.sixthPoke}
                        />
                        <img src={partySprites[5]} className={styles.sprite}/>
                    </div>
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