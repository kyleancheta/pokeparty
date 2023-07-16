import React from "react"
import pokeStyles from "./PokemonInfo.module.css"
import Button from "./Button"
import Stat from "./Stat"
import { MdClose, MdArrowBack, MdArrowForward } from "react-icons/md";

function PokemonInfo({pokemon, activeIndex, close, prev, next, ...props}) {
    const activePokemon = pokemon[activeIndex]
    const pokeHeight = activePokemon.height / 10
    const pokeWeight = activePokemon.weight / 10
    
    let typeOne = activePokemon.types[0].type.name
    let typeTwo = null
    if (activePokemon.types.length > 1) {
        typeTwo = activePokemon.types[1].type.name
    }

    const pokeStats = {
        "hp": activePokemon.stats[0].base_stat,
        "attack": activePokemon.stats[1].base_stat,
        "defense": activePokemon.stats[2].base_stat,
        "spAttack": activePokemon.stats[3].base_stat,
        "spDefense": activePokemon.stats[4].base_stat,
        "speed": activePokemon.stats[5].base_stat
    }
    const bst = activePokemon.stats[0].base_stat + activePokemon.stats[1].base_stat + activePokemon.stats[2].base_stat + activePokemon.stats[3].base_stat + activePokemon.stats[4].base_stat + activePokemon.stats[5].base_stat

    console.log(activePokemon)
    return (
        <div className={pokeStyles.bg} onClick={close}>
            <section className={pokeStyles.main}>
                <section className={pokeStyles.actions}>
                    <Button onClick={prev}>
                        <MdArrowBack className={pokeStyles.icon}/>
                    </Button>
                    <p>{activeIndex+1} / 6</p>
                    <Button onClick={next}>
                        <MdArrowForward className={pokeStyles.icon}/>
                    </Button>
                    <Button onClick={close}>
                        <MdClose className={pokeStyles.icon}/>
                    </Button>
                </section>
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
                <hr className={pokeStyles.line}/>
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
                <br/><br/>
                
            </section>
        </div>
    )
}

export default PokemonInfo