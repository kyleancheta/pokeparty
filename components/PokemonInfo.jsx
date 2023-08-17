import React, { cloneElement } from "react"
import pokeStyles from "./PokemonInfo.module.css"
import Button from "./Button"
import Stat from "./Stat"
import { MdClose, MdArrowBack, MdArrowForward, MdKeyboardTab, MdWidthNormal } from "react-icons/md";

function PokemonInfo({pokemon, activeIndex, close, prevPoke, nextPoke, ...props}) {
    const [centerPeak, setCenterPeak] = React.useState(false)

    const activePokemon = pokemon[activeIndex]
    const pokeHeight = activePokemon.height / 10
    const pokeWeight = activePokemon.weight / 10
    
    let typeOne = activePokemon.types[0].type.name
    let typeTwo = null
    if (activePokemon.types.length > 1) {
        typeTwo = activePokemon.types[1].type.name
    }

    function toggleCenterPeak() {
        setCenterPeak(state => !state)
    }

    // function handleKeyPress(event) {
    //     console.log("current poke: " + activeIndex)

    //     if (event.key === 'n' || event.keyCode === 39) {
    //         nextPoke()
    //     }
    //     else if (event.key === 'p' || event.keyCode === 37) {
    //         prevPoke()
    //     }
    //     else if (event.key === 'Escape') {
    //         close()
    //     }
    //     else {
    //         console.log("Not a valid control key")
    //     }
    // }

    // React.useEffect(() => {
    //     window.addEventListener("keyup", handleKeyPress)
    //     return () => {
    //         window.removeEventListener("keyup", handleKeyPress);
    //     }
    // }, [])

    const pokeStats = {
        "hp": activePokemon.stats[0].base_stat,
        "attack": activePokemon.stats[1].base_stat,
        "defense": activePokemon.stats[2].base_stat,
        "spAttack": activePokemon.stats[3].base_stat,
        "spDefense": activePokemon.stats[4].base_stat,
        "speed": activePokemon.stats[5].base_stat
    }
    const bst = activePokemon.stats[0].base_stat + activePokemon.stats[1].base_stat + activePokemon.stats[2].base_stat + activePokemon.stats[3].base_stat + activePokemon.stats[4].base_stat + activePokemon.stats[5].base_stat

    return (
        <div className={pokeStyles.bg}>
            <section className={ centerPeak ? pokeStyles.mainCenter : pokeStyles.main}>
                <section className={pokeStyles.actions}>
                    <Button onClick={toggleCenterPeak} className={pokeStyles.desktopDisplayOnly} toolTip="Change peak">
                        {
                            centerPeak 
                            ?   <MdKeyboardTab className={pokeStyles.icon}/>
                            :   <MdWidthNormal className={pokeStyles.icon}/>
                        }
                    </Button>
                    <section className={pokeStyles.navActions}>    
                        <Button onClick={prevPoke} toolTip="Previous Pokemon">
                            <MdArrowBack className={pokeStyles.icon}/>
                        </Button>
                        <p>{activeIndex+1} / 6</p>
                        <Button onClick={nextPoke} toolTip="Next Pokemon">
                            <MdArrowForward className={pokeStyles.icon}/>
                        </Button>
                    </section>
                    <Button onClick={close}>
                        <MdClose className={pokeStyles.icon}/>
                    </Button>
                </section>
               
                <section className={`${pokeStyles.section} ${pokeStyles.contentA}`}>
                    <section className={pokeStyles.image}>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${activePokemon.id}.png`} alt={activePokemon.name} />
                    </section>
                    <section className={pokeStyles.name}>
                        <h1>{activePokemon.species.name}</h1>
                        <h4>#{activePokemon.id}</h4>
                    </section>
                    <section className={pokeStyles.types}>
                        <h4>Types</h4>
                        <section className={pokeStyles.group}>
                            <div className={`${pokeStyles.pill} ${typeOne}`}><p>{typeOne}</p></div>
                            {typeTwo && <div className={`${pokeStyles.pill} ${typeTwo}`}><p>{typeTwo}</p></div>}
                        </section>
                    </section>
                    {
                        centerPeak 
                        ?   null
                        :   <hr className={pokeStyles.line}/>
                    }
                    {/* <hr className={pokeStyles.line}/> */}
                </section>
                <section className={`${pokeStyles.section} ${pokeStyles.contentB}`}>
                    <section className={pokeStyles.info}>
                        <Stat label="Height" stat={`${pokeHeight}m`}/>
                        <Stat label="Weight" stat={`${pokeWeight}kg`}/>
                    </section>
                    <hr className={pokeStyles.line}/>
                    <section className={pokeStyles.stats}>
                        <Stat label="HP" stat={pokeStats.hp}/>
                        <Stat label="Attack" stat={pokeStats.attack}/>
                        <Stat label="Defense" stat={pokeStats.defense}/>
                        <Stat label="Special Attack" stat={pokeStats.spAttack}/>
                        <Stat label="Special Defense" stat={pokeStats.spDefense}/>
                        <Stat label="Speed" stat={pokeStats.speed}/>
                    </section>
                    <section className={pokeStyles.bst}>
                        <Stat center label="Base Stat Total" stat={bst}/>
                    </section>
                </section>
                {/* <br/><br/> */}
                
            </section>
        </div>
    )
}

export default PokemonInfo