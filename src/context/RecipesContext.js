import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Context
export const RecipesContext = createContext();

// Provider (where are the functions and states
const RecipesProvider = (props) => {

    const [ recipes, saveRecipes ] = useState([]);

    const [ search, searchRecipes ] = useState({
        name: '',
        category: ''
    });

    const [ consult, saveConsult ] = useState(false);

    const { name, category } = search;

    useEffect( () => {
        if( consult && name.length > 1 && category.length > 1){
            const getRecipes = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`;

                const result = await axios.get(url);

                saveRecipes(result.data.drinks);
            }
            getRecipes();
        }
    }, [search, name, category, consult]);

    return (
        <RecipesContext.Provider
            value={{
                recipes,
                searchRecipes,
                saveConsult
            }}
        >
            {props.children}
        </RecipesContext.Provider>
    );
}

export default RecipesProvider;
