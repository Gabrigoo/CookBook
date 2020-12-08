import React from 'react';
import './Ingredient.css'

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
        <div className="ingredient">
            <div>-</div>
            <input
                className="text-right"
                name="amount"
                value={content.amount}
                onChange={onInputChange}
            />
            <input
                name="unit"
                value={content.unit}
                onChange={onInputChange}
            />
            <input
                name="description"
                value={content.description}
                onChange={onInputChange}
            />
            <button 
                className="delete-button"
                onClick={() => deleteIngredient(index)}
            >
                <i className={`minus circle icon`} />
            </button>
        </div>
    )
}

export default Ingredient;
