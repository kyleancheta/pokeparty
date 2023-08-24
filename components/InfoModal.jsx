import React, { useEffect } from "react"
import styles from "./InfoModal.module.css"

function InfoModal({ toggleInfo }) {

    function handleKeyDown(event) {
        console.log('A key was pressed', event)
        if (event.keyCode === 27) {
            toggleInfo()
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        console.log("Event listener added")
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            console.log("Event listener removed")
        }
    }, [])

    return (
        <div className={styles.bg}>
            <div className={styles.main}>
                <details>
                    <summary>What is this site?</summary>
                        This is just a site I built for fun, to practice my React skills.             
                </details>
                <hr className={styles.divider}/>

                <details>
                    <summary>Does this site do anything?</summary>
                        Not really, just displays a party of six Pokemon, of your choosing or randomized. 🤠
                </details>
                <hr className={styles.divider}/>

                <details>
                    <summary>What do you have planned?</summary>
                    <ul>
                        <li>A theme color picker woooo</li>
                        <li>Keypad controls yeehaw</li>
                        <li>A dropdown list of Pokemon as you type the name</li>
                        <li>And some other shit you probably don't care about</li>
                    </ul>
                </details>
                <hr className={styles.divider}/>
                <button className={styles.btn} onClick={toggleInfo}>Close</button>
            </div>
        </div>
    )
}

export default InfoModal