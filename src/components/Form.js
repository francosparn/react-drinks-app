import React, { useContext, useState } from 'react';
import { CategoriesContext } from '../context/CategoriesContext';
import { RecipesContext } from '../context/RecipesContext';
import Error from './Error';

const Form = () => {

    // Define the state
    const [ search, saveSearch ] = useState({
        name: '',
        category: ''    
    });

    const [ error, saveError ] = useState(false);

    const { name, category } = search;

    const { categories } = useContext(CategoriesContext);
    const { searchRecipes, saveConsult } = useContext(RecipesContext);

    // When we press the submit button of the form
    const handleSubmit = e => {

        // Validation
        if(name.trim() === '' || category.length < 1){
            saveError(true);
            return;
        }
        saveError(false);

    }

    // Read the content
    const getRecipeData = e => {
        saveSearch({
            ...search,
            [ e.target.name ] : e.target.value
        })
    }

    return ( 
        <form
            className="col-12"
            onSubmit={e => {
                e.preventDefault();
                searchRecipes(search)
                saveConsult(true)
                handleSubmit();
            }}
        >
            <fieldset className="text-center">
                <legend className="mb-3">Search drinks by category or ingredient</legend>
                { error ? <Error message="All fields on this form are required" /> : null }
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Search by ingredient"
                            onChange={getRecipeData}
                        />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="category"
                            onChange={getRecipeData}
                        >
                            <option value="0">Select category</option>
                            {categories.map(category => (
                                <option 
                                    key={category.strCategory}
                                    value={category.strCategory}
                                >{category.strCategory}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-md-4">
                    <input
                        type="submit"
                        className="form-control button"
                        value="Search"
                    />
                </div>

            </div>
        </form>
     );
}
 
export default Form;