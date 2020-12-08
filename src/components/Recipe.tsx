import React, { useState } from 'react';
import './Recipe.css';
import Ingredient from './Ingredient';
import Instruction from './Instruction';

interface ingredientProps {
    amount: string,
    unit: string,
    description: string
}

interface instructionProps {
    description: string
}

interface RecipeProps {
    currentRecipe: number,
    recipes: {
        [key:string]: {
            name: string,
            ingredients: ingredientProps[],
            instructions: instructionProps[]
        }
    }
    changeIngredients: (value: string, lype: any, index: number) => void,
    changeInstructions: (value: string, lype: any, index: number) => void,
    deleteIngredient: (index: number) => void,
    deleteInstruction: (index: number) => void,
    addIngredients: () => void,
    addInstructions: () => void,
}

const Recipe: React.FC<RecipeProps> = ({ 
    currentRecipe, recipes, changeIngredients, changeInstructions, 
    deleteIngredient, deleteInstruction, addIngredients, addInstructions
}) => {

    const emptyIngredient = {
        amount: '',
        unit: '',
        description: ''
    }
    const emptyInstruction = {
        description: ''
    }

    return (
        <div id="recipes-container">
            <h2>{recipes[currentRecipe].name}</h2>
            <h3>Ingredients:</h3>
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
            <h3>Instructions:</h3>
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
        </div>
    )
}

export default Recipe;
