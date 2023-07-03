import React from "react"
import Nav from "./components/Nav"
import Card from "./components/Card"
import Footer from "./components/Footer"
import InfoModal from "./components/InfoModal"

export default function App() {
    const [infoVisible, setInfoVisible] = React.useState(false)
    
    function toggleInfo() {
        return setInfoVisible(prev => !prev)
    } 
    

    return (
        <section className="main">
            {infoVisible && <InfoModal toggleInfo={toggleInfo}/>}
            <Nav toggleInfo={toggleInfo}/>
            <section className="cards">
                <Card
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
                />
            </section>
            <Footer/>
        </section>
    )
}