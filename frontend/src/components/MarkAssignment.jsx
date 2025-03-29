
import React, { useState } from 'react';
import './MarkAssignment.css';

const MarkAssignment = ({ onMarkSubmit }) => {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [currentPart, setCurrentPart] = useState('A');
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
    const [partAQuestions, setPartAQuestions] = useState(5);
    const [partBQuestions, setPartBQuestions] = useState(5);
    const [marksData, setMarksData] = useState({});

    const getMaxMarks = () => (currentPart === 'A' ? 5 : 10);

    const handleQuestionClick = (num) => {
        setQuestionNumber(num);
        setCurrentPart(num <= partAQuestions ? 'A' : 'B');
    };

    const handleMarkClick = (mark) => {
        if (typeof onMarkSubmit === 'function') {
            onMarkSubmit({ questionNumber, marks: mark, part: currentPart });
            setAnsweredQuestions((prev) => new Set(prev).add(questionNumber));
            setMarksData((prev) => ({ ...prev, [questionNumber]: mark }));
        } else {
            console.error('Error: onMarkSubmit is not a function');
        }
    };

    const handleReset = (num) => {
        setAnsweredQuestions((prev) => {
            const updatedSet = new Set(prev);
            updatedSet.delete(num);
            return updatedSet;
        });
        setMarksData((prev) => {
            const updatedData = { ...prev };
            delete updatedData[num];
            return updatedData;
        });
        alert(`Marks for Question ${num} have been reset.`);
    };

    const totalQuestions = partAQuestions + partBQuestions;

    return (
        <div className="mark-assignment-container">
            <h2>Mark Assignment Panel</h2>
            <div className="settings">
                <label>
                    Part A Questions (Max Marks 5):
                    <input
                        type="number"
                        value={partAQuestions}
                        onChange={(e) => setPartAQuestions(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <label>
                    Part B Questions (Max Marks 10):
                    <input
                        type="number"
                        value={partBQuestions}
                        onChange={(e) => setPartBQuestions(Number(e.target.value))}
                        min="1"
                    />
                </label>
            </div>
            <p>Part: {currentPart}</p>
            <div className="question-buttons">
                {[...Array(totalQuestions).keys()].map((num) => (
                    <button
                        key={num + 1}
                        onClick={() => handleQuestionClick(num + 1)}
                        disabled={answeredQuestions.has(num + 1)}
                    >
                        Question {num + 1} {answeredQuestions.has(num + 1) ? `(Marked: ${marksData[num + 1]})` : ''}
                    </button>
                ))}
            </div>
            <div className="mark-buttons">
                {[...Array(getMaxMarks() + 1).keys()].map((mark) => (
                    <button key={mark} onClick={() => handleMarkClick(mark)}>
                        {mark}
                    </button>
                ))}
            </div>
            <div className="reset-section">
                <label>
                    Select Question to Reset:
                    <select id="reset-question" onChange={(e) => handleReset(Number(e.target.value))}>
                        <option value="">--Select--</option>
                        {[...answeredQuestions].map((num) => (
                            <option key={num} value={num}>Question {num}</option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
};

export default MarkAssignment;

