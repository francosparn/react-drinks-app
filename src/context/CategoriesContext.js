import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Context
export const CategoriesContext = createContext();

// Provider (where are the functions and states)
const CategoriesProvider = (props) => {

    // Create the context state
    const [ categories, saveCategories ] = useState([]);

    // Execute API call
    useEffect( () => {
        const getCategories = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
            
            const categories = await axios.get(url);

            saveCategories(categories.data.drinks);
        }
        getCategories();
    }, []);

    return (
        <CategoriesContext.Provider
            value={{
                categories
            }}
        >
            {props.children}
        </CategoriesContext.Provider>
    )
}

export default CategoriesProvider;