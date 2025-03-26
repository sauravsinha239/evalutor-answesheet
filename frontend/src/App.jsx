
// import React, { useState } from 'react';
// import axios from 'axios';
// import FileUpload from './components/FileUpload';
// import MarkAssignment from './components/MarkAssignment';
// import MarksDisplay from './components/MarksDisplay';
// import PdfViewer from "./components/PdfViewer";
// import './App.css'

// function App() {
//   const [pdfUrl, setPdfUrl] = useState("");
//   const [marksData, setMarksData] = useState([]);

//   const handleFileUpload = (url) => {
//     setPdfUrl(url);
//   };

//   const handleMarkSubmit = async (newMark) => {
//     try {
//       console.log("Submitting Marks:", newMark);

//       // Send data to the backend API
//       await axios.post('http://localhost:3001/api/marks', newMark);

//       alert("Marks submitted successfully!");
//       setMarksData((prevMarks) => [...prevMarks, newMark]);
//     } catch (error) {
//       console.error("Error submitting marks:", error);
//       alert("Failed to submit marks");
//     }
//   };

//   return (
//     <div className='app-container'>
//       <h1 id='app-title'>Answer Sheet Validation System</h1>

//       <div className="setions">

//         <div className="pdf-loader">
//           <FileUpload onUpload={handleFileUpload} />
//           <PdfViewer pdfUrl={pdfUrl} />
//         </div>

//         <div className="marks">
//           <MarkAssignment onMarkSubmit={handleMarkSubmit} />
//           <MarksDisplay marksData={marksData} />
//         </div>
//       </div>


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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [marksData, setMarksData] = useState([]);

  const handleFileUpload = (url) => {
    setPdfUrl(url);
    toast.success("📄 PDF uploaded successfully!");
  };

  const handleMarkSubmit = async (newMark) => {
    try {
      console.log("Submitting Marks:", newMark);

      // Send data to the backend API
      await axios.post('http://localhost:3001/api/marks', newMark);

      toast.success("✅ Marks submitted successfully!");
      setMarksData((prevMarks) => [...prevMarks, newMark]);
    } catch (error) {
      console.error("Error submitting marks:", error);
      toast.error("❌ Failed to submit marks. Please try again.");
    }
  };

  return (
    <div className='app-container'>
      <h1 id='app-title'>Answer Sheet Validation System</h1>

      <div className="setions">

        <div className="pdf-loader">
          <FileUpload onUpload={handleFileUpload} />
          <PdfViewer pdfUrl={pdfUrl} />
        </div>

        <div className="marks">
          <MarkAssignment onMarkSubmit={handleMarkSubmit} />
          <MarksDisplay marksData={marksData} />
        </div>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;

