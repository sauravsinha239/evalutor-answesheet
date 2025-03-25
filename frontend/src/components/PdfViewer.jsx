import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import * as pdfjs from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js';
import '@react-pdf-viewer/core/lib/styles/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const PdfViewer = ({ pdfUrl }) => {
    if (!pdfUrl) {
        return <div>Please upload a PDF to view it here.</div>;
    }

    return (
        <Worker workerUrl={pdfWorker}>
            <div style={{ height: '100%', width: '100%' }}>
                <Viewer fileUrl={pdfUrl} />
            </div>
        </Worker>
    );
};

export default PdfViewer;
