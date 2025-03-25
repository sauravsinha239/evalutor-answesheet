import React from 'react';

const FileUpload = ({ onUpload }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            const fileUrl = URL.createObjectURL(file);
            onUpload(fileUrl);
            console.log('PDF Uploaded:', fileUrl);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    return (
        <div>
            <h3>Upload PDF</h3>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>
    );
};

export default FileUpload;
