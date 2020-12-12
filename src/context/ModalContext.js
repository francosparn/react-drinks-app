import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create the context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    // State of provider
    const [ idrecipe, saveIdRecipe ] = useState(null);
    const [ info, saveRecipe ] = useState({});

    // Once we have a recipe, call the API
    useEffect( () => {
        const getRecipe = async () => {
            if(!idrecipe) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idrecipe}`;
            
            const result = await axios.get(url);

            saveRecipe(result.data.drinks[0]);
        }
        getRecipe();
    }, [idrecipe]);

    return ( 
        <ModalContext.Provider
            value={{
                info,
                saveIdRecipe,
                saveRecipe
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;