import React from "react"
import Button from "./Button"
import DarkModeButton from "./DarkModeButton"
import navStyles from "./Nav.module.css"
import pokeball from "../img/pokeball.png"
import { MdInfoOutline, MdSync, MdShuffle, MdTune } from "react-icons/md";

export default function Nav({randomizeParty, toggleInfo, toggleCustom, darkMode, toggleDarkMode, ...props}) {
    return (
        <nav className={navStyles.navigation}>
            
            <section className={navStyles.logo}>
                <img className={navStyles.pokeball} src={pokeball}/>
                <h3 className="site-title">pokeparty.fun</h3>
            </section>

            <section className={navStyles.actions}>
                <Button primary onClick={toggleCustom} toolTip="Customize party">
                    <MdTune className={navStyles.icon}/>
                </Button>
                <Button primary onClick={randomizeParty} toolTip="Randomize party">
                    <MdShuffle className={navStyles.icon}/>
                </Button>
                {/* <DarkModeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode}/> */}
                <hr/>
                <Button primary onClick={toggleInfo} toolTip="What is this?" tooltipPosition="left">
                    <MdInfoOutline className={navStyles.icon}/>
                </Button>
            </section>
            
        </nav>
    )
}