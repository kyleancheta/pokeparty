import React from "react"
import Button from "./Button"
import navStyles from "./Nav.module.css"
import { MdInfoOutline, MdSync, MdShuffle, MdTune } from "react-icons/md";

export default function Nav({randomizeParty, toggleInfo, ...props}) {
    return (
        <nav className={navStyles.navigation}>
            
            <section className={navStyles.logo}>
                <img className={navStyles.pokeball} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"/>
                <h3 className="site-title">pokeparty.fun</h3>
            </section>

            <section className={navStyles.actions} tooltipPosition="left">
                <Button disabled>
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