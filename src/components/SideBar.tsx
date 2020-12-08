import React, { ReactElement } from 'react';
import './SideBar.css';

interface ingredientProps {
    amount: string,
    unit: string,
    description: string
}

interface instructionProps {
    description: string
}

interface SideBarProps {
    user: string | null,
    recipes: {
        [key:string]: {
            name: string,
            ingredients: ingredientProps[],
            instructions: instructionProps[]
        }
    }
    addNewRecipe: () => void;
    setCurrent: (index: number) => void;
}

const SideBar: React.FC<SideBarProps> = ({ user, recipes, addNewRecipe, setCurrent }): ReactElement => {

    const recipeList = Object.keys(recipes).map((item, index) => {
        return (
            <li key={recipes[index].name + index}>
                <button onClick={() => setCurrent(index)}>{recipes[index].name}</button>
            </li>
        )
    })

    return (
        <div id="sidebar">
            <h2 id="userlabel">{user}</h2>
            <ul>
                {recipeList}
            </ul>
            <button onClick={addNewRecipe} id="add-new-recipe-button">+ Add new</button>
        </div>
    )
}

export default SideBar;