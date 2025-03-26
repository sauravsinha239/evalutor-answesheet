import React, { useState } from 'react';
import './MarkAssignment.css';

const MarkAssignment = ({ onMarkSubmit }) => {
    const [questionNumber, setQuestionNumber] = useState(1);

    const handleMarkClick = (mark) => {
        if (typeof onMarkSubmit === 'function') {
            onMarkSubmit({ questionNumber, marks: mark });
            setQuestionNumber((prev) => prev + 1); // Auto-increment question number
        } else {
            console.error('Error: onMarkSubmit is not a function');
        }
    };

    return (
        <div className="mark-assignment-container">
            <h2>Mark Assignment Panel</h2>
            <p>Question Number: {questionNumber}</p>
            <div className="mark-buttons">
                {[...Array(11).keys()].map((mark) => (
                    <button key={mark} onClick={() => handleMarkClick(mark)}>
                        {mark}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MarkAssignment;
