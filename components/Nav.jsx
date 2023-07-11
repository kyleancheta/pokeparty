import React from "react"
import navStyles from "./Nav.module.css"
import { MdInfoOutline, MdSync } from "react-icons/md";

export default function Nav({randomizeParty, ...props}) {
    return (
        <nav className={navStyles.navigation}>
            <button className={navStyles.randomizeBtn} onClick={randomizeParty}>
                <MdSync className={navStyles.icon}/>
            </button>
            <img className={navStyles.pokeball} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"/>
            <h3 className="site-title">pokeparty.fun</h3>
            <button className={navStyles.infoBtn} onClick={props.toggleInfo}>
                <MdInfoOutline className={navStyles.icon}/>
            </button>
        </nav>
    )
}