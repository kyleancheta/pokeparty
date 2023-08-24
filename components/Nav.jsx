import React, { useEffect } from "react"
import Button from "./Button"
import DarkModeButton from "./DarkModeButton"
import navStyles from "./Nav.module.css"
import pokeball from "../img/pokeball.png"
import { MdInfoOutline, MdShuffle, MdTune } from "react-icons/md";

export default function Nav({randomizeParty, toggleInfo, toggleCustom, darkMode, toggleDarkMode, ...props}) {
    function handleKeyDown({keyCode}) {
        // console.log('A key was pressed', event)
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
            default:
                break;
        }
    }
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        // console.log("Event listener added")
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            // console.log("Event listener removed")
        }
    }, [])

    return (
        <nav className={navStyles.navigation}>
            
            <section className={navStyles.logo}>
                <img className={navStyles.pokeball} src={pokeball}/>
                <h3 className="site-title">pokeparty.fun</h3>
            </section>

            <section className={navStyles.actions}>
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