import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      [theme.breakpoints.down('sm')]: {
        width: '100%',  
      },
      [theme.breakpoints.up('sm')]: {
        width: 450,  
      },
      maxHeight: 560,
      overflowY: 'auto',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Recipe = ({ recipe }) => {

    // Material-UI modal configuration
    const [ modalStyle ] = useState(getModalStyle);
    const [ open, setOpen ] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    // Extract values from context
    const { info, saveIdRecipe, saveRecipe } = useContext(ModalContext);

    // Show and format ingredients
    const showIngredients = info => {
        let ingredients = [];

        for(let i = 1; i < 16; i++){
            if(info[`strIngredient${i}`]) {
                ingredients.push(
                    <li
                        key={
                            info[`strIngredient${i}`] +
                            info[`strMeasure${i}`]
                        }
                    > 
                        { info[`strIngredient${i}`] } -{' '} 
                        { info[`strMeasure${i}`] } 
                    </li>
                )
            }
        }
        return ingredients;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h4 className="card-header bg-card text-center">{recipe.strDrink}</h4>
                <img className="card-img-top" src={recipe.strDrinkThumb} alt={`${recipe.strDrink}`} />

                <div className="card-body">
                    <button 
                        type="button"
                        className="btn-recipe"
                        onClick={() => {
                            saveIdRecipe(recipe.idDrink);
                            handleOpen();
                        }}
                    >
                        <img src="assets/img/view.png" alt="View Logo" />
                        &nbsp;View Recipe
                    </button>

                    <Modal
                        open={open}
                        onClose={() => {
                            saveIdRecipe(null);
                            saveRecipe({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>
                                <img src="assets/img/drink.png" alt="Drink Logo" /> {info.strDrink}
                            </h2>
                            <hr />
                            <h3 className="mt-2">Instruction</h3>
                            <p>{info.strInstructions}</p>
                            <img className="img-fluid" src={info.strDrinkThumb} alt="Instruction" />
                            <h3 className="mt-3">
                                <img src="assets/img/ingredient.png" alt="Ingredient Logo" /> Ingredients and measures
                            </h3>
                            <hr />
                            <ul>
                                { showIngredients(info) }
                            </ul>
                        </div>
                    </Modal>
                </div>

            </div>
        </div>
     );
}
 
export default Recipe;
