import React from "react"
import navStyles from "./Nav.module.css"
import { MdInfoOutline } from "react-icons/md";

export default function Nav(props) {
    return (
        <nav className={navStyles.navigation}>
            <img className={navStyles.pokeball} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"/>
            <h3 className="site-title">pokeparty.fun</h3>
            <button className={navStyles.infoBtn} onClick={props.toggleInfo}>
                <MdInfoOutline className={navStyles.icon}/>
            </button>
        </nav>
    )
}