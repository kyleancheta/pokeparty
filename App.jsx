import React from "react"
import Nav from "./components/Nav"
import Card from "./components/Card"
import Footer from "./components/Footer"
import InfoModal from "./components/InfoModal"

export default function App() {
    const [infoVisible, setInfoVisible] = React.useState(false)
    const [pokemonParty, setPokemonParty] = React.useState([])
    const initialPokemon = [778, 248, 637, 768, 330, 169]
    
    function toggleInfo() {
        return setInfoVisible(prev => !prev)
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
        // let pokeUrlOne = `https://pokeapi.co/api/v2/pokemon/778/`
        // getPokemon(pokeUrlOne)
        // let pokeUrlTwo = `https://pokeapi.co/api/v2/pokemon/248/`
        // getPokemon(pokeUrlTwo)
        // let pokeUrlThree = `https://pokeapi.co/api/v2/pokemon/637/`
        // getPokemon(pokeUrlThree)
        // let pokeUrlFour = `https://pokeapi.co/api/v2/pokemon/768/`
        // getPokemon(pokeUrlFour)
        // let pokeUrlFive = `https://pokeapi.co/api/v2/pokemon/330/`
        // getPokemon(pokeUrlFive)
        // let pokeUrlSix = `https://pokeapi.co/api/v2/pokemon/169/`
        // getPokemon(pokeUrlSix)
        for (let i = 0; i < 6; i++) {
            let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${initialPokemon[i]}/`
            getPokemon(pokeUrl)
        }
    }, [])
    
    //console.log(pokemonParty)

    const pokemonPartyCards = pokemonParty.map(poke => {
        // console.log(poke)
        return <Card
                    key={poke.id}
                    name={poke.species.name}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                    typeOne={poke.types[0].type.name}
                    typeTwo={poke.types[1].type.name}
                />
    })

    //console.log(pokemonPartyCards)

    return (
        <section className="main">
            {infoVisible && <InfoModal toggleInfo={toggleInfo}/>}
            <Nav toggleInfo={toggleInfo}/>
            <section className="cards">
                {pokemonPartyCards}
                {/* <Card
                    name="Mimikyu"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/778.png"
                    typeOne="ghost"
                    typeTwo="fairy"
                />
                <Card
                    name="Tyranitar"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/248.png"
                    typeOne="rock"
                    typeTwo="dark"
                />
                <Card
                    name="Volcarona"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/637.png"
                    typeOne="fire"
                    typeTwo="bug"
                />
                <Card
                    name="Golisopod"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/768.png"
                    typeOne="bug"
                    typeTwo="water"
                />
                <Card
                    name="Flygon"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/330.png"
                    typeOne="ground"
                    typeTwo="dragon"
                />
                <Card
                    name="Crobat"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/169.png"
                    typeOne="poison"
                    typeTwo="flying"
                /> */}
            </section>
            <Footer/>
        </section>
    )
}