import React from "react"
import styles from "./Message.module.css"
import { MdInfo } from "react-icons/md";


function Message({info, children, ...props}) {
    if (info) {
        return (
            <div className={`${styles.container} ${styles.info}`} {...props}>
                <MdInfo className={styles.icon}/>
                <p>
                    {children}
                </p>
            </div>
        )
    }
    else {
        return (
            <div className={styles.container} {...props}>
                <p>
                    {children}
                </p>
            </div>
        )
    }
}

export default Message