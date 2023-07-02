import React from "react"
import Nav from "./components/Nav"
import Card from "./components/Card"
import Footer from "./components/Footer"

export default function App() {
    return (
        <section className="main">
            <Nav/>
            <section className="cards">
                <Card
                    name="Mimikyu"
                    image="mimikyu.png"
                    typeOne="ghost"
                    typeTwo="fairy"
                />
                <Card
                    name="Tyranitar"
                    image="tyranitar.png"
                    typeOne="rock"
                    typeTwo="dark"
                />
                <Card
                    name="Volcarona"
                    image="volcarona.png"
                    typeOne="fire"
                    typeTwo="bug"
                />
                <Card
                    name="Golisopod"
                    image="golisopod.png"
                    typeOne="bug"
                    typeTwo="water"
                />
                <Card
                    name="Flygon"
                    image="flygon.png"
                    typeOne="ground"
                    typeTwo="dragon"
                />
                <Card
                    name="Crobat"
                    image="crobat.png"
                    typeOne="poison"
                    typeTwo="flying"
                />
            </section>
            <Footer/>
        </section>
    )
}