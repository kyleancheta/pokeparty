import React from "react"
import Nav from "./components/Nav"
import Card from "./components/Card"
import Footer from "./components/Footer"
import InfoModal from "./components/InfoModal"
import PokemonInfo from "./components/PokemonInfo"
import CustomizeModal from "./components/CustomizeModal"

export default function App() {
    const initialPokemon = [778, 248, 637, 768, 330, 169]

    const [darkMode, setDarkMode] = React.useState(
        () => JSON.parse(localStorage.getItem("pokemonparty-darkmode")) || false
    )
    const [currentPokemonList, setCurrentPokemonList] = React.useState(
        () => JSON.parse(localStorage.getItem("pokemonpartylist")) || initialPokemon
    )
    const [pokemonParty, setPokemonParty] = React.useState([])
    const [infoVisible, setInfoVisible] = React.useState(false)
    const [customizeVisible, setCustomizeVisible] = React.useState(false)
    const [displayParty, setDisplayParty] = React.useState(false)
    
    const [activeIndex, setActiveIndex] = React.useState(null)

    function toggleInfo() {
        return setInfoVisible(prev => !prev)
    }

    function toggleCustom() {
        return setCustomizeVisible(prev => !prev)
    }

    function toggleDarkMode() {
        // localStorage.setItem("pokemonparty-darkmode", JSON.stringify(!darkMode))
        // return setDarkMode(prev => !prev)
        setDarkMode(prevSetting => {
            localStorage.setItem("pokemonparty-darkmode", JSON.stringify(!prevSetting))
            return !prevSetting
        })
    }

    function closePokeInfo() {
        return setDisplayParty(false)
    }

    function nextPokemon() {
        setActiveIndex(prev => (prev + 1) % 6)
    }

    function prevPokemon() {
        setActiveIndex(prev => ((prev - 1) % 6 + 6) % 6)
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
                console.log(prev)
                const newArr = [...prev]
                if (newArr.length < 6) {
                    newArr.push(data)
                    return newArr
                } else {
                    return prev
                }
            })
        }
        for (let i = 0; i < 6; i++) {
            let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${currentPokemonList[i]}/`
            getPokemon(pokeUrl)
        }
    }, [])

    React.useEffect(() => {
        if (pokemonParty.length == 6) {
            setCurrentPokemonList(prev => {
                const updatedList = [...prev]
                for (let i = 0; i < 6; i++) {
                    updatedList[i] = pokemonParty[i].id
                }
                return updatedList
            })
            localStorage.setItem("pokemonpartylist", JSON.stringify(currentPokemonList))
        }
    }, [pokemonParty])

    // React.useEffect(() => {
    //     async function getPokemon(url) {
    //         const res = await fetch(url)
    //         const data = await res.json()
    //         setPokemonParty(function(prev) {
    //             const newArr = [...prev]
    //             newArr.push(data)
    //             return newArr
    //         })
    //     }
    //     for (let i = 0; i < 6; i++) {
    //         let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${initialPokemon[i]}/`
    //         getPokemon(pokeUrl)
    //     }
    // }, [])
    
    const pokemonPartyCards = pokemonParty.map((poke, index) => {
        return <Card
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
        <section className={`main ${darkMode ? 'darkmode' : null}`}>
            {infoVisible && <InfoModal toggleInfo={toggleInfo}/>}
            {customizeVisible && <CustomizeModal toggleCustom={toggleCustom} pokemon={pokemonParty} customizeParty={customizeParty}/>}
            {displayParty && <PokemonInfo   pokemon={pokemonParty} 
                                            activeIndex={activeIndex} 
                                            close={closePokeInfo} 
                                            prevPoke={prevPokemon} 
                                            nextPoke={nextPokemon}/>
            }
            <Nav
                toggleInfo={toggleInfo} 
                toggleCustom={toggleCustom} 
                randomParty={randomParty} 
                randomizeParty={randomizeParty}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
            />
            <section className="cards">
                {!displayParty && pokemonPartyCards || window.innerWidth > 576 && pokemonPartyCards }
            </section>
            <Footer/>
        </section>
    )
}