import React from "react"
import Button from "./Button"
import DarkModeButton from "./DarkModeButton"
import ThemeSelector from "./ThemeSelector"
import navStyles from "./Nav.module.css"
import pokeball from "../img/pokeball.png"
import { MdInfoOutline, MdShuffle, MdTune, MdColorLens } from "react-icons/md";

export default function Nav({randomizeParty, toggleInfo, showCustomizeModal, toggleCustom, darkMode, toggleDarkMode, showTheme, toggleThemeSelector, changeTheme, ...props}) {
    
    return (
        <nav className={navStyles.navigation}>
            {showTheme && <ThemeSelector changeTheme={changeTheme} darkMode={darkMode} toggleThemeSelector={toggleThemeSelector} />}
            
            <section className={navStyles.logo}>
                <img className={navStyles.pokeball} src={pokeball}/>
                <h3 className="site-title">pokeparty.fun</h3>
            </section>

            <section className={navStyles.actions}>
                <Button primary onClick={toggleThemeSelector} toolTip="Select theme [T]">
                    <MdColorLens className={navStyles.icon}/>
                </Button>
                <Button primary onClick={toggleCustom} toolTip="Customize party [C]">
                    <MdTune className={navStyles.icon}/>
                </Button>
                <Button primary onClick={randomizeParty} toolTip="Randomize party [R]">
                    <MdShuffle className={navStyles.icon}/>
                </Button>
                <DarkModeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} toolTip="Toggle dark mode [D]"/>
                <hr/>
                <Button primary onClick={toggleInfo} toolTip="What is this? [I]" tooltipPosition="left">
                    <MdInfoOutline className={navStyles.icon}/>
                </Button>
            </section>
            
        </nav>
    )
}