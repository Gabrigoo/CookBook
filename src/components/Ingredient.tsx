import React from 'react';

import { IconButton, TextField, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface ingredientProps {
    content: {
        amount: string,
        unit: string,
        description: string
    }
    index: number,
    changeIngredients: (value: string, type: any, index: number) => void,
    deleteIngredient: (index: number) => void
}

const Ingredient: React.FC<ingredientProps> = ({ content, index, changeIngredients, deleteIngredient }) => {

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeIngredients(event.target.value, event.target.name, index);
    }

    return (
        <Grid container item direction="row" justify="flex-start" alignItems="center" spacing={1}>
            <Grid item xs={1}>
                <TextField
                    label="Meny."
                    InputLabelProps={{ required: false }}
                    size="small"
                    name="amount"
                    value={content.amount}
                    onChange={onInputChange}
                    autoComplete="off"
                    required
                    fullWidth
                    variant="filled" 
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    label="Mért."
                    InputLabelProps={{ required: false }}
                    size="small"
                    name="unit"
                    value={content.unit}
                    onChange={onInputChange}
                    autoComplete="off"
                    type="text"
                    required
                    fullWidth
                    variant="filled" 
                />
            </Grid>
            <Grid item xs={8}>
                <TextField
                    label="Leírás"
                    InputLabelProps={{ required: false }}
                    size="small"
                    name="description"
                    value={content.description}
                    onChange={onInputChange}
                    autoComplete="off"
                    type="text"
                    required
                    fullWidth
                    variant="filled" 
                />
            </Grid>
            <Grid item xs={1}>
                {index ?
                    <IconButton
                        aria-label="delete"
                        onClick={() => deleteIngredient(index)}
                        color="secondary"
                    >
                        <DeleteIcon />
                    </IconButton>
                : null}
            </Grid>
        </Grid>
    )
}

export default Ingredient;
