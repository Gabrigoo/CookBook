import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, List, ListItem, ListItemText, ListItemIcon,
    Typography, Grid } from '@material-ui/core';

import { Save } from '@material-ui/icons';

import { saveData } from '../axios-instance';
import { handleSignOut } from '../firebase';
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

    const useStyles = makeStyles((theme) => ({
        listText: {
            fontSize: '1.8em',
        },
        listItem: {
            margin: '0px',
            padding: '0px 15px',
        },
        centered: {
            margin: '0px auto',
        },
        saveButton: {
            color: 'green',
            width: '50px',
            height: '50px',
        }
    }));

    const classes = useStyles();

    const recipeList = Object.keys(recipes).map((item, index) => {
        return (
            <ListItem
                key={recipes[index].name + index} 
                onClick={() => setCurrent(parseInt(item))}
                button
                className={classes.listItem}
            >
                <ListItemText classes={{ primary: classes.listText }}
                    primary={`- ${recipes[index].name ? recipes[index].name : "Névtelen recept"}`}
                />
            </ListItem>
        )
    })

    return (
        <div id="sidebar">
            <Grid container direction="row" justify="space-around" alignItems="center" spacing={4}>
                <Grid item xs={"auto"}>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h4">{user}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        onClick={handleSignOut}
                        variant="contained"
                        color="secondary"
                    >
                        Kijelentkezés
                    </Button>
                </Grid>
            </Grid>
            <List component="nav" aria-label="main recipes">
                {recipeList}
            </List>
            <Button 
                onClick={addNewRecipe} 
                variant="outlined"
                color="primary"
                size="large"
                className={classes.centered}
            >
                + Új recept
            </Button>
            <IconButton
                aria-label="save"
                onClick={() => saveData(recipes)}
                color="primary"
                className={classes.centered}
            >
                <Save className={classes.saveButton}/>
            </IconButton>
        </div>
    )
}

export default SideBar;