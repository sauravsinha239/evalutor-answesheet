import React from 'react';

const MarksDisplay = ({ marksData = [] }) => {
    return (
        <div className="panel">
            <h2>Marks Display Panel</h2>
            {marksData.length === 0 ? (
                <p>No marks assigned yet.</p>
            ) : (
                <ul>
                    {marksData.map((data, index) => (
                        <li key={index}>
                            Question {data.questionNumber}: {data.marks} Marks
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MarksDisplay;
