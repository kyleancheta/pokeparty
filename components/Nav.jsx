import React from "react"
import Button from "./Button"
import navStyles from "./Nav.module.css"
import pokeball from "../img/pokeball.png"
import { MdInfoOutline, MdSync, MdShuffle, MdTune } from "react-icons/md";

export default function Nav({randomizeParty, toggleInfo, toggleCustom, ...props}) {
    return (
        <nav className={navStyles.navigation}>
            
            <section className={navStyles.logo}>
                <img className={navStyles.pokeball} src={pokeball}/>
                <h3 className="site-title">pokeparty.fun</h3>
            </section>

            <section className={navStyles.actions}>
                <Button onClick={toggleCustom} tooltip="Customize party" tooltipPosition="left">
                    <MdTune className={navStyles.icon}/>
                </Button>
                <Button onClick={randomizeParty} tooltip="Randomize party" tooltipPosition="left">
                    <MdShuffle className={navStyles.icon}/>
                </Button>
                <hr/>
                <Button onClick={toggleInfo} tooltip="What is this?" tooltipPosition="left">
                    <MdInfoOutline className={navStyles.icon}/>
                </Button>
            </section>
            
        </nav>
    )
}