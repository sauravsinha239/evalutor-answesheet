import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ onUpload }) => {
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            const fileUrl = URL.createObjectURL(file);
            onUpload(fileUrl);
            setMessage('✅ PDF Uploaded Successfully!');
            console.log('PDF Uploaded:', fileUrl);
        } else {
            setMessage('❌ Please upload a valid PDF file.');
        }
    };

    return (
        <div className="file-upload-container">
            <h3>Upload Answer Sheet</h3>
            <label htmlFor="file-upload" className="file-upload-label">Choose PDF File</label>
            <input id="file-upload" type="file" accept="application/pdf" onChange={handleFileChange} />
            {message && <p className={message.includes('✅') ? 'success-message' : 'error-message'}>{message}</p>}
        </div>
    );
};

export default FileUpload;
