import React from "react"
import Button from "./Button" 
import styles from "./DarkModeButton.module.css"
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function DarkModeButton({darkMode, toggleDarkMode, ...props}) {

    if (darkMode) {
        return (
            <Button primary onClick={toggleDarkMode} {...props}>
                <MdDarkMode className={styles.icon}/>
            </Button>
        )
    }
    else {
        return (
           <Button primary onClick={toggleDarkMode} {...props}>
                <MdLightMode className={styles.icon}/>
            </Button>
        )
    }
    
}
