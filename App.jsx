import React from "react"
import Nav from "./components/Nav"
import Card from "./components/Card"
import Footer from "./components/Footer"
import InfoModal from "./components/InfoModal"
import PokemonInfo from "./components/PokemonInfo"
import CustomizeModal from "./components/CustomizeModal"

export default function App() {
    const [infoVisible, setInfoVisible] = React.useState(false)
    const [customizeVisible, setCustomizeVisible] = React.useState(false)
    const [pokemonParty, setPokemonParty] = React.useState([])
    const [displayParty, setDisplayParty] = React.useState(false)
    const [activeIndex, setActiveIndex] = React.useState(null)
    const initialPokemon = [778, 248, 637, 768, 330, 169]

    function toggleInfo() {
        return setInfoVisible(prev => !prev)
    }

    function toggleCustom() {
        return setCustomizeVisible(prev => !prev)
    }

    function closePokeInfo() {
        return setDisplayParty(false)
    }

    function nextPokemon() {
        if (activeIndex + 1 > 5) {
            return setActiveIndex(0)
        } else {
            return setActiveIndex(prev => prev+1)
        }
        //return setActiveIndex(prev => prev + 1)
    }

    function prevPokemon() {
        if (activeIndex - 1 < 0) {
            return setActiveIndex(5)
        } else {
            return setActiveIndex(prev => prev-1)
        }
        //return setActiveIndex(prev => prev - 1)
    }

    function randomParty() {
        const newParty = []
        for (let i = 0; i < 6; i++) {
            newParty.push(Math.ceil(Math.random()*1010))
        }
        return newParty
    }

    async function randomizeParty() {
        const randy = randomParty()
        for (let i = 0; i < randy.length; i++) {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randy[i]}/`)
            const data = await res.json()         
            setPokemonParty(prev => {
                const newArray = [...prev]
                newArray[i] = data
                return newArray
            })        
        }
    }

    async function customizeParty(newParty) {
        for (let i = 0; i < newParty.length; i++) {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${newParty[i]}/`)
            const data = await res.json()         
            setPokemonParty(prev => {
                const newArray = [...prev]
                newArray[i] = data
                return newArray
            })        
        }
    }

    React.useEffect(() => {
        async function getPokemon(url) {
            const res = await fetch(url)
            const data = await res.json()
            setPokemonParty(function(prev) {
                const newArr = [...prev]
                newArr.push(data)
                return newArr
            })
        }
        for (let i = 0; i < 6; i++) {
            let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${initialPokemon[i]}/`
            getPokemon(pokeUrl)
        }
    }, [])
    
    const pokemonPartyCards = pokemonParty.map((poke, index) => {
        return <Card
                    //index={index}
                    key={index}
                    name={poke.species.name}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                    types={poke.types}
                    onClick={() => {
                        setActiveIndex(index)
                        setDisplayParty(true)
                    }}
                />
    })

    return (
        <section className="main">
            {infoVisible && <InfoModal toggleInfo={toggleInfo}/>}
            {customizeVisible && <CustomizeModal toggleCustom={toggleCustom} pokemon={pokemonParty} customizeParty={customizeParty}/>}
            {displayParty && <PokemonInfo   pokemon={pokemonParty} 
                                            activeIndex={activeIndex} 
                                            close={closePokeInfo} 
                                            prevPoke={prevPokemon} 
                                            nextPoke={nextPokemon}/>
            }
            <Nav toggleInfo={toggleInfo} toggleCustom={toggleCustom} randomParty={randomParty} randomizeParty={randomizeParty}/>
            <section className="cards">
                {!displayParty && pokemonPartyCards || window.innerWidth > 576 && pokemonPartyCards }
            </section>
            <Footer/>
        </section>
    )
}