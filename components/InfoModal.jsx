import React from "react"
import modalStyles from "./InfoModal.module.css"

function InfoModal(props) {
    return (
        <div className={modalStyles.bg}>
            <div className={modalStyles.main}>
                <h1>What is this site?</h1>
                <p>
                    This is just a site I built for fun, to practice my React skills. It's far from any interactivity for now, but I'm working on it!
                    Refer to this info box to check what I'm workin' on next!
                </p>
                <hr className={modalStyles.divider}/>
                <p><strong>Next:</strong> Displaying more Pokemon data!</p>
                <button className={modalStyles.btn} onClick={props.toggleInfo}>Close</button>
            </div>
        </div>
    )
}

export default InfoModal