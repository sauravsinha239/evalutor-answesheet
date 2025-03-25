// import React, { useState } from 'react';
// import FileUpload from './components/FileUpload';
// import MarkAssignment from './components/MarkAssignment';
// import MarksDisplay from './components/MarksDisplay';
// import PdfViewer from './components/PdfViewer';

// function App() {
//   const [pdfUrl, setPdfUrl] = useState("");

//   const handleFileUpload = (url) => {
//     setPdfUrl(url);
//   };

//   return (
//     <div>
//       <h1>Answer Sheet Validation System</h1>
//       <FileUpload onUpload={handleFileUpload} />
//       <PdfViewer pdfUrl={pdfUrl} />
//       <MarkAssignment />
//       <MarksDisplay />
//     </div>
//   );
// }

// export default App;
// import React, { useState } from 'react';
// import FileUpload from './components/FileUpload';
// import MarkAssignment from './components/MarkAssignment';
// import MarksDisplay from './components/MarksDisplay';
// import PdfViewer from "./components/PdfViewer";

// function App() {
//   const [pdfUrl, setPdfUrl] = useState("");
//   const [marksData, setMarksData] = useState([]);

//   const handleFileUpload = (url) => {
//     setPdfUrl(url);
//   };

//   const handleMarkSubmit = (newMark) => {
//     console.log("Submitted Marks:", newMark);
//     setMarksData((prevMarks) => [...prevMarks, newMark]);
//   };

//   return (
//     <div>
//       <h1>Answer Sheet Validation System</h1>
//       <FileUpload onUpload={handleFileUpload} />
//       <PdfViewer pdfUrl={pdfUrl} />
//       {/* ✅ Pass the function as a prop */}
//       <MarkAssignment onMarkSubmit={handleMarkSubmit} />
//       <MarksDisplay marksData={marksData} />
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import MarkAssignment from './components/MarkAssignment';
import MarksDisplay from './components/MarksDisplay';
import PdfViewer from "./components/PdfViewer";

function App() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [marksData, setMarksData] = useState([]);

  const handleFileUpload = (url) => {
    setPdfUrl(url);
  };

  const handleMarkSubmit = async (newMark) => {
    try {
      console.log("Submitting Marks:", newMark);

      // Send data to the backend API
      await axios.post('http://localhost:3001/api/marks', newMark);

      alert("Marks submitted successfully!");
      setMarksData((prevMarks) => [...prevMarks, newMark]);
    } catch (error) {
      console.error("Error submitting marks:", error);
      alert("Failed to submit marks");
    }
  };

  return (
    <div>
      <h1>Answer Sheet Validation System</h1>
      <FileUpload onUpload={handleFileUpload} />
      <PdfViewer pdfUrl={pdfUrl} />
      <MarkAssignment onMarkSubmit={handleMarkSubmit} />
      <MarksDisplay marksData={marksData} />
    </div>
  );
}

export default App;

