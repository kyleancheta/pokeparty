import React, { useState, useEffect } from "react"
import Nav from "./components/Nav"
import Card from "./components/Card"
import Footer from "./components/Footer"
import InfoModal from "./components/InfoModal"
import PokemonInfo from "./components/PokemonInfo"
import CustomizeModal from "./components/CustomizeModal"

export default function App() {
    const initialPokemon = [778, 248, 637, 768, 330, 9]
    const emptyPokemonSet = [
        {
            name: "",
            displayName: "",
            order: 1,
            id: 778,
            sprite: "",
            types: [],
            data: null
        },
        {
            name: "",
            displayName: "",
            order: 2,
            id: 248,
            sprite: "",
            types: [],
            data: null
        },
        {
            name: "",
            displayName: "",
            order: 3,
            id: 637,
            sprite: "",
            types: [],
            data: null
        },
        {
            name: "",
            displayName: "",
            order: 4,
            id: 768,
            sprite: "",
            types: [],
            data: null
        },
        {
            name: "",
            displayName: "",
            order: 5,
            id: 330,
            sprite: "",
            types: [],
            data: null
        },
        {
            name: "",
            displayName: "",
            order: 6,
            id: 169,
            sprite: "",
            types: [],
            data: null
        }
    ]
    const [pokemonParty, setPokemonParty] = useState(emptyPokemonSet)

    const [theme, setTheme] = useState(
        () => JSON.parse(localStorage.getItem("pokemonparty-theme")) || "dragon"
    )
    const [darkMode, setDarkMode] = useState(
        () => JSON.parse(localStorage.getItem("pokemonparty-darkmode")) || false
    )
    const [currentPokemonList, setCurrentPokemonList] = useState(
        () => JSON.parse(localStorage.getItem("pokemonparty-list")) || initialPokemon
    )
    const [infoVisible, setInfoVisible] = useState(false)
    const [customizeVisible, setCustomizeVisible] = useState(false)
    const [showThemeSelector, setThemeSelector] = useState(false)
    const [displayParty, setDisplayParty] = useState(false)
    
    const [activeIndex, setActiveIndex] = useState(null)

    function toggleInfo() {
        return setInfoVisible(prev => !prev)
    }

    function toggleCustom() {
        return setCustomizeVisible(prev => !prev)
    }

    function toggleThemeSelector() {
        return setThemeSelector(prev => !prev)
    }

    function changeTheme(newTheme) {
        localStorage.setItem("pokemonparty-theme", JSON.stringify(newTheme))
        setTheme(newTheme)
    }

    useEffect(() => {
        if (darkMode) {
            changeTheme("electric")
        } else {
            changeTheme("dragon")
        }
    }, [darkMode])

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
            // setPokemonParty(prev => {
            //     const newArray = [...prev]
            //     newArray[i] = data
            //     return newArray
            // })        
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

    // Initial getting of the Pokemon party
    React.useEffect(() => {
        async function getPokemon(url, index) {
            const res = await fetch(url)
            const data2 = await res.json()
            // console.log(data2)
            setPokemonParty(previousParty => {
                const updatedParty = [...previousParty]
                const updatedPokemon = {...previousParty[index]} 
                updatedPokemon.data = data2
                updatedPokemon.name = data2.species.name
                updatedPokemon.displayName = data2.species.name
                updatedPokemon.id = data2.id
                // updatedPokemon.types = data2.types
                if (data2.types.length === 2) {
                    updatedPokemon.types = [data2.types[0].type.name, data2.types[1].type.name]
                } else {
                    updatedPokemon.types = [data2.types[0].type.name]
                }
                updatedPokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data2.id}.png`
                // console.log(updatedPokemon)
                updatedParty[index] = updatedPokemon
                console.log(updatedParty)
                return updatedParty
            })
            // setPokemonParty(function(prev) {
            //     console.log(prev)
            //     const newArr = [...prev]
            //     if (newArr.length < 6) {
            //         newArr.push(data)
            //         return newArr
            //     } else {
            //         return prev
            //     }
            // })
        }

        for (let i = 0; i < 6; i++) {
            let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${currentPokemonList[i]}/`
            getPokemon(pokeUrl, i)
        }
        changeTheme(theme)
        
        console.log(pokemonParty)
    }, [])

    React.useEffect(() => {     
        setCurrentPokemonList(prev => {
            const updatedList = [...prev]
            for (let i = 0; i < 6; i++) {
                updatedList[i] = pokemonParty[i].id
            }
            return updatedList
        })
        localStorage.setItem("pokemonparty-list", JSON.stringify(currentPokemonList))     
    }, [pokemonParty])
    
    const pokemonPartyCards = pokemonParty.map((poke, index) => {
        // console.log(poke)
        return <Card
                    key={index}
                    name={poke.name}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                    types={poke.types}
                    onClick={() => {
                        setActiveIndex(index)
                        setDisplayParty(true)
                    }}
                />
    })

    return (
        <section className={`main ${darkMode ? 'darkmode' : ""} theme-${theme}`} >
            {infoVisible && <InfoModal toggleInfo={toggleInfo}/>}
            {customizeVisible && <CustomizeModal toggleCustom={toggleCustom} pokemon={pokemonParty} customizeParty={customizeParty}/>}
            {displayParty && <PokemonInfo   
                                pokemon={pokemonParty} 
                                activeIndex={activeIndex} 
                                close={closePokeInfo} 
                                prevPoke={prevPokemon} 
                                nextPoke={nextPokemon}
                             />
            }
            <Nav
                toggleInfo={toggleInfo}
                customizeVisible={customizeVisible} 
                toggleCustom={toggleCustom} 
                randomParty={randomParty} 
                randomizeParty={randomizeParty}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                showTheme={showThemeSelector}
                toggleThemeSelector={toggleThemeSelector}
                changeTheme={changeTheme}
            />
            <section className="cards">
                {!displayParty && pokemonPartyCards || window.innerWidth > 576 && pokemonPartyCards }
            </section>
            <Footer/>
        </section>
    )
}