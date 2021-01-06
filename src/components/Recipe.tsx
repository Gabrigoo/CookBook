import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Input, Typography, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
    changeTitle: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    deleteRecipe: (index :number) => void,
}

const Recipe: React.FC<RecipeProps> = ({ 
    currentRecipe, recipes, changeIngredients, changeInstructions, deleteRecipe,
    deleteIngredient, deleteInstruction, addIngredients, addInstructions, changeTitle
}) => {

    const useStyles = makeStyles((theme) => ({
        container: {
            width: '50vw',
            margin: '20px',
            padding: '20px',
        },
        title: {
            fontSize: '35px',
            marginBottom: '30px',
        },
        centered: {
            margin: 'auto',
        },
        deleteButton: {
            margin: '15px auto',
        }
    }));

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Grid container direction="column" spacing={4}>
                <Input
                    className={classes.title}
                    inputProps={{ 'aria-label': 'recipe title' }}
                    onChange={(event) => changeTitle(event)}
                    name="recipe-name"
                    value={recipes[currentRecipe].name}
                    autoComplete="off"
                    placeholder={`Névtelen recept`}
                />
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant="h4">Hozzávalók:</Typography>
                    </Grid>
                    {recipes[currentRecipe].ingredients.map((item, index) => {
                        return <Ingredient
                            key={'ing' + index}
                            content={item}
                            index={index}
                            changeIngredients={changeIngredients}
                            deleteIngredient={deleteIngredient}
                        />
                    })}
                    <IconButton
                        aria-label="add"
                        onClick={addIngredients}
                        color="primary"
                        className={classes.centered}
                    >
                        <AddCircleIcon />
                    </IconButton>
                </Grid>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant="h4">Instrukciók:</Typography>
                    </Grid>
                    {recipes[currentRecipe].instructions.map((item, index) => {
                        return <Instruction
                            key={'inst' + index}
                            content={item}
                            index={index}
                            changeInstructions={changeInstructions}
                            deleteInstruction={deleteInstruction}
                        />
                    })}
                    <IconButton
                        aria-label="add"
                        onClick={addInstructions}
                        color="primary"
                        className={classes.centered}
                    >
                        <AddCircleIcon />
                    </IconButton>
                </Grid>
                <Button
                    onClick={() => deleteRecipe(currentRecipe)}
                    id="delete-recipe"
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    className={classes.deleteButton}
                >
                    Recept törlése
                </Button>
            </Grid>
        </div>
    )
}

export default Recipe;
