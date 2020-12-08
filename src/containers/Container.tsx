import React, { ReactElement, useState } from 'react';
import Recipe from '../components/Recipe';
import SideBar from '../components/SideBar';

interface ingredientProps {
    amount: string,
    unit: string,
    description: string
}

interface instructionProps {
    description: string
}

interface ContainerProps {
    user: string | null,
    recipes: {
        [key:string]: {
            name: string,
            ingredients: ingredientProps[],
            instructions: instructionProps[]
        }
    }
}

const Container: React.FC<ContainerProps> = (props): ReactElement => {

    const [recipes, setRecipes] = useState(props.recipes);
    const [currentRecipe, setCurrentRecipe] = useState(0);

    const addNewRecipe = () => {
        const newObj = {
            ...recipes
        };
        newObj[Object.keys(recipes).length] = {
            name: "New recipe",
            ingredients: [],
            instructions: []
        }
        setRecipes(newObj);
    }

    const changeIngredients = (value: string, type: keyof ingredientProps, index: number) => {
        const newObject = recipes[currentRecipe].ingredients[index];
        newObject[type] = value;
        const newRecipes = {...recipes};
        newRecipes[currentRecipe].ingredients.splice(index, 1, newObject);
        setRecipes(newRecipes);
    }

    const changeInstructions = (value: string, type: keyof instructionProps, index: number) => {
        const newObject = recipes[currentRecipe].instructions[index];
        newObject[type] = value;
        const newRecipes = {...recipes};
        newRecipes[currentRecipe].instructions.splice(index, 1, newObject);
        setRecipes(newRecipes);
    }

    const deleteIngredient = (index: number) => {
        const newRecipes = {...recipes};
        newRecipes[currentRecipe].ingredients.splice(index, 1);
        setRecipes(newRecipes);
    }

    const deleteInstruction = (index: number) => {
        const newRecipes = {...recipes};
        newRecipes[currentRecipe].instructions.splice(index, 1);
        setRecipes(newRecipes);
    }

    const addIngredients = () => {
        const newRecipes = {...recipes};
        newRecipes[currentRecipe].ingredients.push({
            amount: "",
            unit: "",
            description: ""
        });
        setRecipes(newRecipes);
    }

    const addInstructions = () => {
        const newRecipes = {...recipes};
        newRecipes[currentRecipe].instructions.push({
            description: ""
        });
        setRecipes(newRecipes);
    }

    return (
        <div>
            <Recipe
                recipes={recipes}
                currentRecipe={currentRecipe}
                changeIngredients={changeIngredients}
                changeInstructions={changeInstructions}
                deleteIngredient={deleteIngredient}
                deleteInstruction={deleteInstruction}
                addIngredients={addIngredients}
                addInstructions={addInstructions}
            />
            <SideBar user={props.user} recipes={recipes} addNewRecipe={addNewRecipe} setCurrent={setCurrentRecipe}/>
        </div>
    )
}

export default Container;