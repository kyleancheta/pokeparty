import React, { useState, useEffect } from "react"
import style from "./ThemeSelector.module.css"
import Swatch from "./Swatch"

export default function ThemeSelector({ toggleThemeSelector, changeTheme, darkMode }) {
    const lightModeColors = [
        { value: "dragon", selected: true},
        { value: "fire", selected: false},
        { value: "ghost", selected: false},
        { value: "flying", selected: false},
        { value: "dark", selected: false},
        { value: "grass", selected: false},
        { value: "water", selected: false},
        { value: "ground", selected: false}
    ]
    const darkModeColors = [
        { value: "electric", selected: true},
        { value: "psychic", selected: false},
        { value: "ice", selected: false},
        { value: "normal", selected: false},
        { value: "poison", selected: false},
        { value: "bug", selected: false},
        { value: "fairy", selected: false},
        { value: "steel", selected: false}
    ]

    const [colors, setColors] = useState(lightModeColors)

    useEffect(() => {
        if (darkMode) {
            setColors(darkModeColors)
        } else {
            setColors(lightModeColors)
        }
    }, [darkMode])

    // useEffect(() => {
    //     const newIndex = colors.findIndex(color => color.selected)
    //     changeTheme(colors[newIndex].value)
    // }, [colors])

    function changeSelection(newIndex) {
        setColors(prev => {
            const temp = [...prev]
            temp.forEach(function(color, index) {
                if (index === newIndex) {
                    color.selected = true
                } else {
                    color.selected = false
                }
            })
            return temp
        })
        changeTheme(colors[newIndex].value)
    }

    return (
        <div className={style.bg}>
            <section className={style.main}>
                <h4 className={style.label}>Select theme</h4>
                <div className={style.picker}>
                    {
                        colors.map(
                            (color, index) => <Swatch key={index} color={color.value} selected={color.selected} onClick={() => changeSelection(index)}/>
                        )
                    }
                </div>
            </section>
        </div>
    )
}