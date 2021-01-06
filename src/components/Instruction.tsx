import React from 'react';

import { IconButton, TextField, Grid } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

interface instructionProps {
    content: {
        description: string
    }
    index: number,
    changeInstructions: (value: string, type: any, index: number) => void,
    deleteInstruction: (index: number) => void
}

const Instruction: React.FC<instructionProps> = ({ content, index, changeInstructions, deleteInstruction }) => {

    const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        changeInstructions(event.target.value, event.target.name, index);
    }

    return (
        <Grid container item direction="row" justify="flex-start" alignItems="center" spacing={1}>
            <Grid item xs={11}>
                <TextField
                    name="description"
                    value={content.description}
                    onChange={onInputChange}
                    variant="filled"
                    fullWidth
                    multiline
                />
            </Grid>
            <Grid item xs={1}>
                {index ?
                <IconButton
                    aria-label="delete"
                    onClick={() => deleteInstruction(index)}
                    color="secondary"
                >
                    <DeleteIcon />
                </IconButton>
                : null}
            </Grid>
        </Grid>
    )
}

export default Instruction;
