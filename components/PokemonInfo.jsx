import React, { useEffect } from "react"
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

    function handleKeyDown({keyCode}) {
        // console.log('A key was pressed', event)
        switch (keyCode) {
            case 27:
                close()
                break;
            case 37:
                prevPoke()
                break;
            case 39:
                nextPoke()
                break;
            case 67:
                toggleCenterPeak()
                break;
            case 80:
                prevPoke()
                break;
            case 78:
                nextPoke()
                break;
            default:
                break;
        }
    }
    
    useEffect(() => {
        window.removeEventListener('keydown', handleKeyDown)
        window.addEventListener('keydown', handleKeyDown)
        // console.log("Event listener added")
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            // console.log("Event listener removed")
        }
    }, [])

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
                    <Button onClick={toggleCenterPeak} className={pokeStyles.desktopDisplayOnly} toolTip="Change peak [C]">
                        {
                            centerPeak 
                            ?   <MdKeyboardTab className={pokeStyles.icon}/>
                            :   <MdWidthNormal className={pokeStyles.icon}/>
                        }
                    </Button>
                    <section className={pokeStyles.navActions}>    
                        <Button onClick={prevPoke} toolTip="Previous Pokemon [P]">
                            <MdArrowBack className={pokeStyles.icon}/>
                        </Button>
                        <p>{activeIndex+1} / 6</p>
                        <Button onClick={nextPoke} toolTip="Next Pokemon [N]">
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
                    {/* <section>
                        <span>9th Gen</span>
                    </section> */}
                    <section className={pokeStyles.types}>
                        <h4>Type{typeTwo ? "s" : ""}</h4>
                        <section className={pokeStyles.group}>
                            <div className={`${pokeStyles.pill} ${typeOne}-bg`}><p>{typeOne}</p></div>
                            {typeTwo && <div className={`${pokeStyles.pill} ${typeTwo}-bg`}><p>{typeTwo}</p></div>}
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
                    {/* <section className={pokeStyles.info}>
                        <Stat label="Height" stat={`${pokeHeight}m`}/>
                        <Stat label="Weight" stat={`${pokeWeight}kg`}/>
                    </section>
                    <hr className={pokeStyles.line}/> */}
                    <section className={pokeStyles.stats}>
                        <Stat mainStat label="HP" stat={pokeStats.hp}/>
                        <Stat mainStat label="Attack" stat={pokeStats.attack}/>
                        <Stat mainStat label="Defense" stat={pokeStats.defense}/>
                        <Stat mainStat label="Special Attack" stat={pokeStats.spAttack}/>
                        <Stat mainStat label="Special Defense" stat={pokeStats.spDefense}/>
                        <Stat mainStat label="Speed" stat={pokeStats.speed}/>
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