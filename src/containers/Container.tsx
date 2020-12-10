import React, { ReactElement, useState } from 'react';
import Recipe from '../components/Recipe';
import SideBar from '../components/SideBar';

interface IngredientProps {
    amount: string,
    unit: string,
    description: string
}

interface InstructionProps {
    description: string
}

interface ContainerProps {
    user: string | null,
    recipes: RecipeInt[]
}

interface RecipeInt {
    name: string,
    ingredients: IngredientProps[],
    instructions: InstructionProps[]
}


const Container: React.FC<ContainerProps> = (props): ReactElement => {

    const [recipes, setRecipes] = useState<RecipeInt[]>(props.recipes);
    const [currentRecipe, setCurrentRecipe] = useState(0);

    console.log(currentRecipe)
    console.log(recipes[currentRecipe])

    const addNewRecipe = () => {
        const newRecipes = [...recipes];
        newRecipes.push({
            name: "Új recept",
            ingredients: [{
                amount: "",
                unit: "",
                description: ""
            }],
            instructions: [{
                description: ""
            }]
        })
        setRecipes(newRecipes);
    }

    const deleteRecipe = (index: number) => {
        const newRecipes = [...recipes];
        newRecipes.splice(index, 1);
        if (index > 0) {
            setCurrentRecipe(index - 1);
        }
        setRecipes(newRecipes);
    }

    const changeIngredients = (value: string, type: keyof IngredientProps, index: number) => {
        const newObject = recipes[currentRecipe].ingredients[index];
        newObject[type] = value;
        const newRecipes = [...recipes];
        newRecipes[currentRecipe].ingredients.splice(index, 1, newObject);
        setRecipes(newRecipes);
    }

    const changeInstructions = (value: string, type: keyof InstructionProps, index: number) => {
        const newObject = recipes[currentRecipe].instructions[index];
        newObject[type] = value;
        const newRecipes = [...recipes];
        newRecipes[currentRecipe].instructions.splice(index, 1, newObject);
        setRecipes(newRecipes);
    }

    const deleteIngredient = (index: number) => {
        const newRecipes = [...recipes];
        newRecipes[currentRecipe].ingredients.splice(index, 1);
        setRecipes(newRecipes);
    }

    const deleteInstruction = (index: number) => {
        const newRecipes = [...recipes];
        newRecipes[currentRecipe].instructions.splice(index, 1);
        setRecipes(newRecipes);
    }

    const addIngredients = () => {
        const newRecipes = [...recipes];
        newRecipes[currentRecipe].ingredients.push({
            amount: "",
            unit: "",
            description: ""
        });
        setRecipes(newRecipes);
    }

    const addInstructions = () => {
        const newRecipes = [...recipes];
        newRecipes[currentRecipe].instructions.push({
            description: ""
        });
        setRecipes(newRecipes);
    }

    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRecipes = [...recipes];
        newRecipes[currentRecipe].name = event.target.value;
        setRecipes(newRecipes);
    }

    return (
        <div>
            <Recipe
                recipes={recipes}
                currentRecipe={currentRecipe}
                changeIngredients={changeIngredients}
                changeInstructions={changeInstructions}
                changeTitle={changeTitle}
                deleteIngredient={deleteIngredient}
                deleteInstruction={deleteInstruction}
                addIngredients={addIngredients}
                addInstructions={addInstructions}
                deleteRecipe={deleteRecipe}
            />
            <SideBar 
                user={props.user} 
                recipes={recipes}
                addNewRecipe={addNewRecipe} 
                setCurrent={setCurrentRecipe}
            />
        </div>
    )
}

export default Container;