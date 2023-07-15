import React from "react"
import Button from "./Button"
import navStyles from "./Nav.module.css"
import { MdInfoOutline, MdSync } from "react-icons/md";

export default function Nav({randomizeParty, toggleInfo, ...props}) {
    return (
        <nav className={navStyles.navigation}>
            <Button onClick={randomizeParty}>
                <MdSync className={navStyles.icon}/>
            </Button>
            
            <section class={navStyles.logo}>
                <img className={navStyles.pokeball} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"/>
                <h3 className="site-title">pokeparty.fun</h3>
            </section>
            <Button onClick={toggleInfo}>
                <MdInfoOutline className={navStyles.icon}/>
            </Button>
            
        </nav>
    )
}