// import React, { useState } from 'react';
// import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
// import { zoomPlugin } from '@react-pdf-viewer/zoom';
// import * as pdfjs from 'pdfjs-dist';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/zoom/lib/styles/index.css';
// import './PdfViewer.css';

// // Correct worker source
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// const PdfViewer = ({ pdfUrl }) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const zoomPluginInstance = zoomPlugin();
//     const { zoomTo } = zoomPluginInstance;

//     const onDocumentLoadSuccess = (pdf) => {
//         console.log('PDF Loaded:', pdf);
//         setTotalPages(pdf.numPages);
//     };

//     const onDocumentLoadError = (error) => {
//         console.error('Error loading PDF:', error);
//     };

//     // ✅ Page Navigation
//     const handlePrevious = () => {
//         if (currentPage > 1) {
//             setCurrentPage((prevPage) => prevPage - 1);
//             zoomPluginInstance.jumpToPage(currentPage - 2); // Zero-based index
//         }
//     };

//     const handleNext = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage((prevPage) => prevPage + 1);
//             zoomPluginInstance.jumpToPage(currentPage); // Zero-based index
//         }
//     };

//     // ✅ Zoom Controls
//     const handleZoomIn = () => {
//         const currentScale = zoomPluginInstance.getCurrentScale?.();
//         if (currentScale !== undefined) {
//             const newScale = Math.min(currentScale + 0.1, 3.0); // Max Zoom: 300%
//             zoomTo(newScale);
//         }
//     };

//     const handleZoomOut = () => {
//         const currentScale = zoomPluginInstance.getCurrentScale?.();
//         if (currentScale !== undefined) {
//             const newScale = Math.max(currentScale - 0.1, 0.5); // Min Zoom: 50%
//             zoomTo(newScale);
//         }
//     };

//     const handleFitToWidth = () => {
//         zoomTo(SpecialZoomLevel.PageWidth);
//     };

//     const handleFitToPage = () => {
//         zoomTo(SpecialZoomLevel.PageFit);
//     };

//     if (!pdfUrl) {
//         return <div>Please upload a PDF to view it here.</div>;
//     }

//     return (
//         <div className="pdf-container">
//             {/* PDF Viewer Section */}
//             <div id="pdf">
//                 <div className="pdf-toolbar">
//                     <button className="pdf-button" onClick={handlePrevious} disabled={currentPage === 1}>
//                         Previous
//                     </button>
//                     <span className="pdf-page-info">Page {currentPage} of {totalPages}</span>
//                     <button className="pdf-button" onClick={handleNext} disabled={currentPage === totalPages}>
//                         Next
//                     </button>
//                     <button className="pdf-button" onClick={handleZoomOut}>-</button>
//                     <button className="pdf-button" onClick={handleZoomIn}>+</button>
//                     <button className="pdf-button" onClick={handleFitToWidth}>Fit to Width</button>
//                     <button className="pdf-button" onClick={handleFitToPage}>Fit to Page</button>
//                 </div>

//                 {/* PDF Viewer */}
//                 <Worker workerUrl={pdfjs.GlobalWorkerOptions.workerSrc}>
//                     <Viewer
//                         fileUrl={pdfUrl}
//                         onDocumentLoadSuccess={onDocumentLoadSuccess}
//                         onDocumentLoadError={onDocumentLoadError}
//                         plugins={[zoomPluginInstance]}
//                         initialPage={currentPage - 1}
//                     />
//                 </Worker>
//             </div>
//         </div>
//     );
// };

// export default PdfViewer;
import React, { useState, useRef, useEffect } from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import * as pdfjs from 'pdfjs-dist';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import './PdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const getPdfTotalPages = async (pdfUrl) => {
    try {
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        return pdf.numPages;
    } catch (error) {
        console.error('Error loading PDF:', error);
        return 0;
    }
};

const PdfViewer = ({ pdfUrl }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentScale, setCurrentScale] = useState(1.0);
    const viewerRef = useRef(null);
    const zoomPluginInstance = zoomPlugin();
    const { zoomTo } = zoomPluginInstance;
    const [key, setKey] = useState(0); // Add a key state

    useEffect(() => {
        if (pdfUrl) {
            getPdfTotalPages(pdfUrl).then((numPages) => {
                setTotalPages(numPages);
                setCurrentPage(1);
            });
        }
    }, [pdfUrl]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1); // Corrected
            setKey((prevKey) => prevKey - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1); // Corrected
            setKey((prevKey) => prevKey + 1);
        }
    };

    const handleZoomIn = () => {
        const newScale = Math.min(currentScale + 0.1, 3.0);
        setCurrentScale(newScale);
        zoomTo(newScale);
    };

    const handleZoomOut = () => {
        const newScale = Math.max(currentScale - 0.1, 0.5);
        setCurrentScale(newScale);
        zoomTo(newScale);
    };

    const handleFitToWidth = () => {
        zoomTo(SpecialZoomLevel.PageWidth);
    };

    const handleFitToPage = () => {
        zoomTo(SpecialZoomLevel.PageFit);
    };

    if (!pdfUrl) {
        return <div>Error: Please upload a valid PDF to view it here.</div>;
    }

    return (
        <div className="pdf-container">
            <div id="pdf">
                <div className="pdf-toolbar">
                    <button className="pdf-button" onClick={handlePrevious} disabled={currentPage <= 1}>Previous</button>
                    <span className="pdf-page-info">Page {currentPage} of {totalPages}</span>
                    <button className="pdf-button" onClick={handleNext} disabled={currentPage >= totalPages}>Next</button>
                    <button className="pdf-button" onClick={handleZoomOut}>-</button>
                    <span className="pdf-zoom-level">{Math.round(currentScale * 100)}%</span>
                    <button className="pdf-button" onClick={handleZoomIn}>+</button>
                    <button className="pdf-button" onClick={handleFitToWidth}>Fit to Width</button>
                    <button className="pdf-button" onClick={handleFitToPage}>Fit to Page</button>
                </div>

                <Worker workerUrl={pdfjs.GlobalWorkerOptions.workerSrc}>
                    <Viewer
                        key={key}
                        fileUrl={pdfUrl}
                        ref={viewerRef}
                        plugins={[zoomPluginInstance]}
                        defaultScale={SpecialZoomLevel.PageFit}
                        initialPage={currentPage}
                    />
                </Worker>
            </div>
        </div>
    );
};

export default PdfViewer;