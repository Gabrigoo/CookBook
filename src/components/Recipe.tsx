import React from 'react';
import './Recipe.css';
import Ingredient from './Ingredient';
import Instruction from './Instruction';

interface IngredientProps {
    amount: string,
    unit: string,
    description: string
}

interface InstructionProps {
    description: string
}

interface RecipeInt {
    name: string,
    ingredients: IngredientProps[],
    instructions: InstructionProps[]
}

interface RecipeProps {
    currentRecipe: number,
    recipes: RecipeInt[],
    changeIngredients: (value: string, lype: any, index: number) => void,
    changeInstructions: (value: string, lype: any, index: number) => void,
    deleteIngredient: (index: number) => void,
    deleteInstruction: (index: number) => void,
    addIngredients: () => void,
    addInstructions: () => void,
    changeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void,
    deleteRecipe: (index :number) => void,
}

const Recipe: React.FC<RecipeProps> = ({ 
    currentRecipe, recipes, changeIngredients, changeInstructions, deleteRecipe,
    deleteIngredient, deleteInstruction, addIngredients, addInstructions, changeTitle
}) => {

    return (
        <div id="recipes-container">
            <input
                onChange={(event) => changeTitle(event)}
                name="name"
                id="recipe-title"
                value={recipes[currentRecipe].name}
                autoComplete="off"
                ></input>
            <h2>Hozzávalók:</h2>
            <div className="mapped-input">
                {recipes[currentRecipe].ingredients.map((item, index) => {
                    return <Ingredient 
                        key={'ing' + index} 
                        content={item} 
                        index={index}
                        changeIngredients={changeIngredients}
                        deleteIngredient={deleteIngredient}
                    ></Ingredient>
                })}
            </div>
            <button
                className="add-button"
                onClick={addIngredients}
            >
                <i className={`plus circle icon`} />
            </button>
            <h2>Instrukciók:</h2>
            <div className="mapped-input">
                {recipes[currentRecipe].instructions.map((item, index) => {
                    return <Instruction
                        key={'inst' + index}
                        content={item}
                        index={index}
                        changeInstructions={changeInstructions}
                        deleteInstruction={deleteInstruction}
                    ></Instruction>
                })}
            </div>
            <button
                className="add-button"
                onClick={addInstructions}
            >
                <i className={`plus circle icon`} />
            </button>
            <hr />
            <button
                onClick={() => deleteRecipe(currentRecipe)}
                id="delete-recipe"
            >
                Recept törlése
            </button>
        </div>
    )
}

export default Recipe;
