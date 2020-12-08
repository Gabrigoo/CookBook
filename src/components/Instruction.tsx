import React from 'react';
import './Instruction.css';

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
        <div className="instruction">
            <textarea
                className="instruction"
                name="description"
                value={content.description}
                onChange={onInputChange}
            />
            <button
                className="delete-button"
                onClick={() => deleteInstruction(index)}
            >
                <i className={`minus circle icon`} />
            </button>
        </div>
    )
}

export default Instruction;
