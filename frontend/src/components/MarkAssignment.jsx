import React, { useState } from 'react';

const MarkAssignment = ({ onMarkSubmit }) => {
    const [questionNumber, setQuestionNumber] = useState('');
    const [marks, setMarks] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!questionNumber || !marks) {
            alert('Please enter both question number and marks');
            return;
        }

        // ✅ Check if the function exists before calling
        if (typeof onMarkSubmit === 'function') {
            onMarkSubmit({ questionNumber, marks });
            setQuestionNumber('');
            setMarks('');
        } else {
            console.error('Error: onMarkSubmit is not a function');
        }
    };

    return (
        <div>
            <h2>Mark Assignment Panel</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Question Number:
                    <input
                        type="number"
                        value={questionNumber}
                        onChange={(e) => setQuestionNumber(e.target.value)}
                    />
                </label>
                <label>
                    Marks:
                    <input
                        type="number"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                    />
                </label>
                <button type="submit">Submit Marks</button>
            </form>
        </div>
    );
};

export default MarkAssignment;
