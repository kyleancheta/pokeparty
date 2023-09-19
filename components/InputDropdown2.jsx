import React, { useState, useRef, useEffect } from "react"
import styles from "./InputDropdown.module.css"
import greyPokeball from "../img/bg-pokeball.png"

export default function InputDropdown2({ name, id, selectedVal, options, formData, setFormData}) {

    const initialValue = name

    function handleChange(value) {
        // setChangesMade(true)
        setFormData(prevForm => {
            const newForm = [...prevForm]
            newForm[id].name = value
            newForm[id].sprite = greyPokeball
            return newForm
        })
    }

    // State to manage the user's input query , query: It stores the user's input query for filtering the options.
    const [query, setQuery] = useState(initialValue) // Initialize query as an empty string
    
    // State to manage whether the dropdown is open or closed
    const [isOpen, setIsOpen] = useState(false)
    
    // ============ Function to toggle the dropdown's open/closed state based on user interaction
    
    // Add an event listener to the document to handle clicks outside the dropdown
    useEffect(() => {
        document.addEventListener("click", toggle)    //click type of event and toggle function 
        // Remove the event listener when the component unmounts
        return () => document.removeEventListener("click", toggle)
    }, [])
    
    // Reference to the input element for event handling
    const inputRef = useRef(null)
    
    function toggle(e) {
        // console.log("toggled")
        // setIsOpen(e && e.target === inputRef.current)
        setIsOpen(prev => !prev) //e.target is html element , inputref current is value in the input if both not match then close options byisOpen  
    }

    // ============ Function to select an option from the dropdown
    const selectOption = (item) => {
        setQuery(item) // Reset query when an option is selected
    
        // Call the handleChange function to update the selected value
        handleChange(item)
    
        // Close the dropdown
        setIsOpen(false)
    }

    // ============ Function to determine what value to display in the input field
    const getDisplayValue = () => {
        // If the user has typed something, display the query
        if (query !== null) return query

        // If there's a selected value, display it
        if (selectedVal) return selectedVal

        // Otherwise, display an empty string
        return ""
    }

    // ============ filter function  - takes two args option and query
    const filter = (options, currentQuery) => {
        if (currentQuery === "") return [] // Don't show results if query is empty
        return options.filter(
            // Check if the lowercase name of an option contains the lowercase query
            (option) =>
                option.toLowerCase().indexOf(currentQuery.toLowerCase()) > -1   //index of -1 means it is not in the the opton name
        )
    }

    return (
        //three divs dropdown > contol for arrow > selected-value for input
        <div className="dropdown">
            <div className="control">
                <div className="selected-value">
                <input
                    placeholder="fuck i hate this"
                    ref={inputRef}  // This connects the input element to inputRef
                    value={getDisplayValue()}
                
                    // When the user types, update the query and reset the selected value
                    //onChange is a event handler the arrow function takes event object as argument  and accesse the value
                    //and updates query state
                    onChange={(e) => {
                        setQuery(e.target.value)
                        handleChange(e.target.value)
                        //Simultaneously, handleChange(null) is called, which invokes the handleChange function passed as a prop to the SearchableDropdown
                        // component. This sets the selected value to null.Setting the selected value to null indicates that there is no selected option
                        // in the dropdown until the user selects one from the filtered results.  add a  console.log(e.target.value); and check logs
                    }}
                    // When the input is clicked, toggle the dropdown's state
                    onClick={toggle}
                />
            </div>
           
          </div>
    
        {
            isOpen &&

            <div className={`options ${isOpen ? "open" : ""}`}>
                {/* filter by query and map over that array give single option and its index and return name in div */}
                {filter(options, query).map((option, index) => {
                    return (
                    <div
                        // When an option is clicked, select it
                        onClick={() => selectOption(option, id)}                                   //oncick
                        className={`option ${option[name] === selectedVal ? "selected" : ""}`} //conditional classname
                        key={`${id}-${index}`}                                                 //kei is id-index
                    >
                        {option[name]}                                                    {/*name show */}
                    </div>
                    )
                })}
            </div>
        }
        </div>
      )
}




// return (
//     <>
//         <input
//             value={formData[index].name}
//             onChange={(e) => handleChange(e, index)}
//             {...props}
//         />
//         <div className={styles.dropdown}>
//             <ul>
//                 {fullPokemonList}
//             </ul>
//         </div>
//     </>
// )

{
    /* <input
        index={index}
        type="text"
        placeholder={`Pokemon ${index + 1}`}
        onChange={(e) => handleChange(e, index)}
        name={`pokemon_${index}`}
        value={formData[index].name}
    /> */
}