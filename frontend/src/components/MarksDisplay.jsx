
// import React from 'react';
// import './MarksDisplay.css';

// const MarksDisplay = ({ marksData = [] }) => {
//     return (
//         <div className="panel">
//             <h2>Marks Display Panel</h2>
//             {marksData.length === 0 ? (
//                 <p>No marks assigned yet.</p>
//             ) : (
//                 <ul>
//                     {marksData.map((data, index) => (
//                         <li key={index}>
//                             <span>Question {data.questionNumber}</span>
//                             <span>{data.marks} Marks</span>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default MarksDisplay;

import React from 'react';
import './MarksDisplay.css';

const MarksDisplay = ({ marksData = [] }) => {
    // Calculate total marks
    const totalMarks = marksData.reduce((acc, data) => acc + data.marks, 0);

    return (
        <div className="panel">
            <h2>Marks Display Panel</h2>
            {marksData.length === 0 ? (
                <p>No marks assigned yet.</p>
            ) : (
                <>
                    <ul>
                        {marksData.map((data, index) => (
                            <li key={index}>
                                <span>Question {data.questionNumber}</span>
                                <span>{data.marks} Marks</span>
                            </li>
                        ))}
                    </ul>
                    <div className="total-marks">
                        <strong>Total Marks: {totalMarks}</strong>
                    </div>
                </>
            )}
        </div>
    );
};

export default MarksDisplay;
