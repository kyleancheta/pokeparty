import React, { useState, useEffect } from "react"
import Nav from "./components/Nav"
import Card from "./components/Card"
import Footer from "./components/Footer"
import InfoModal from "./components/InfoModal"
import PokemonInfo from "./components/PokemonInfo"
import CustomizeModal from "./components/CustomizeModal"

export default function App() {
    const initialPokemon = [778, 248, 637, 768, 330, 169]

    const [theme, setTheme] = useState(
        () => JSON.parse(localStorage.getItem("pokemonparty-theme")) || "dragon"
    )
    const [darkMode, setDarkMode] = useState(
        () => JSON.parse(localStorage.getItem("pokemonparty-darkmode")) || false
    )
    const [currentPokemonList, setCurrentPokemonList] = useState(
        () => JSON.parse(localStorage.getItem("pokemonparty-list")) || initialPokemon
    )
    const [pokemonParty, setPokemonParty] = useState([])
    const [showInfoModal, setShowInfoModal] = useState(false)
    const [customizeVisible, setCustomizeVisible] = useState(false)
    const [showThemeSelector, setThemeSelector] = useState(false)
    const [displayParty, setDisplayParty] = useState(false)
    
    const [activeIndex, setActiveIndex] = useState(null)

    function toggleInfo() {
        return setShowInfoModal(prev => !prev)
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

    // useEffect(() => {console.log(theme)}, [theme])

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
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randy[i]}/`)
                const data = await res.json()         
                setPokemonParty(prev => {
                    const newArray = [...prev]
                    newArray[i] = data
                    return newArray
                })        
            } catch(error) {
                console.log(randy[i] + " isn't a Pokemon, it seems.")
            }
        }
    }

    async function customizeParty(newParty) {

        for (let i = 0; i < newParty.length; i++) {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${newParty[i]}/`)
                const data = await res.json()         
                setPokemonParty(prev => {
                    const newArray = [...prev]
                    newArray[i] = data
                    return newArray
                })        
            } catch(error) {
                console.log(newParty[i] + " wasn't found")
            }
        }
    
    }

    React.useEffect(() => {
        async function getPokemon(url) {
            try {
                const res = await fetch(url)
                const data = await res.json()
                setPokemonParty(function(prev) {
                    const newArr = [...prev]
                    if (newArr.length < 6) {
                        newArr.push(data)
                        return newArr
                    } else {
                        return prev
                    }
                })
            } catch(error) {
                console.error("Error:", error)
            }
        }
        for (let i = 0; i < 6; i++) {
            let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${currentPokemonList[i]}/`
            getPokemon(pokeUrl)
        }
        
        changeTheme(theme)

        
    }, [])
    
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        // console.log("Event listener added")
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            // console.log("Event listener removed")
        }
    }, [customizeVisible])

    React.useEffect(() => {
        if (pokemonParty.length == 6) {
            setCurrentPokemonList(prev => {
                const updatedList = [...prev]
                for (let i = 0; i < 6; i++) {
                    updatedList[i] = pokemonParty[i].id
                }
                return updatedList
            })
            localStorage.setItem("pokemonparty-list", JSON.stringify(currentPokemonList))
        }
    }, [pokemonParty])

    function handleKeyDown({keyCode}) {
        // console.log('A key was pressed', event)
        // console.log("keycode: " + keyCode + " customize visible: " + customizeVisible)
        // const nope = false
        if (!customizeVisible) {
            console.log("nav event listener fired")
            switch (keyCode) {
                // 'c'
                case 67:
                    toggleCustom()
                    break;
                // 'd'
                case 68:
                    toggleDarkMode()
                    break;
                // 'i'
                case 73:
                    toggleInfo()
                    break;
                // 'r'
                case 82:
                    randomizeParty()
                    break;
                // 't'
                case 84:
                    toggleThemeSelector()
                    break;
                default:
                    break;
            }
        }
    }

    // React.useEffect(() => {
    //     if ( toggleCustom || toggleInfo || toggleThemeSelector) {
    //         window.removeEventListener('keydown', handleKeyDown)
    //         console.log("Event listener removed")
    //     } else {
    //         window.addEventListener('keydown', handleKeyDown)
    //         console.log("Event listener added")
    //     }
        
    // }, [toggleCustom, toggleInfo, randomizeParty, toggleThemeSelector])
    
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
        <section className={`main ${darkMode ? 'darkmode' : ""} theme-${theme}`} >
            {showInfoModal && <InfoModal toggleInfo={toggleInfo}/>}
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