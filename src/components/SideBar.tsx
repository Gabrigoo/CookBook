import React, { ReactElement } from 'react';
import { saveData } from '../axios-instance';
import './SideBar.css';

interface IngredientProps {
    amount: string,
    unit: string,
    description: string
}

interface InstructionProps {
    description: string
}

interface SideBarProps {
    user: string | null,
    recipes: RecipeInt[],
    addNewRecipe: () => void;
    setCurrent: (index: number) => void;
}

interface RecipeInt {
    name: string,
    ingredients: IngredientProps[],
    instructions: InstructionProps[]
}

const SideBar: React.FC<SideBarProps> = ({ user, recipes, addNewRecipe, setCurrent }): ReactElement => {

    const recipeList = Object.keys(recipes).map((item, index) => {
        return (
            <li key={recipes[index].name + index}>
                <button 
                    className="recipe-button" 
                    onClick={() => setCurrent(parseInt(item))}
                >{recipes[index].name}</button>
            </li>
        )
    })

    return (
        <div id="sidebar">
            <h2 id="userlabel">{user}</h2>
            <ul>
                {recipeList}
            </ul>
            <button onClick={addNewRecipe} id="add-new-recipe-button">+ Új recept</button>
            <button onClick={() => saveData(recipes)} id="save-button">
                <i className={`big save icon`} />
            </button>
        </div>
    )
}

export default SideBar;