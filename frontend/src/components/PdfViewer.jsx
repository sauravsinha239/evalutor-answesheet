import React, { useState, useRef, useEffect } from "react";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import * as pdfjs from "pdfjs-dist";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "./PdfViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const getPdfTotalPages = async (pdfUrl) => {
    try {
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        return pdf.numPages;
    } catch (error) {
        console.error("Error loading PDF:", error);
        return 0;
    }
};

const PdfViewer = ({ pdfUrl }) => {

    const [annotations, setAnnotations] = useState([]);
    const [inputPosition, setInputPosition] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentScale, setCurrentScale] = useState(1.0);
    const viewerRef = useRef(null);
    const zoomPluginInstance = zoomPlugin();
    const { zoomTo } = zoomPluginInstance;
    const [key, setKey] = useState(0);




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
            setCurrentPage((prevPage) => prevPage - 1);
            setKey((prevKey) => prevKey - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
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





    const handlePdfDoubleClick = (event) => {
        const pdfContainer = document.querySelector('.rpv-core__viewer');

        if (!pdfContainer) {
            console.error("PDF container not found!");
            return;
        }

        const boundingRect = pdfContainer.getBoundingClientRect();
        const x = event.clientX - boundingRect.left;
        const y = event.clientY - boundingRect.top;

        setInputPosition({ x, y });
        setInputValue('');

        console.log("Double-Clicked Position: ", x, y);
    };



    const handleInputBlur = () => {
        if (inputValue.trim() !== '') {
            setAnnotations([...annotations, { x: inputPosition.x, y: inputPosition.y, text: inputValue }]);
        }
        setInputPosition(null);
    };

    if (!pdfUrl) {
        return <div>Error: Please upload a valid PDF to view it here.</div>;
    }

    return (
        <div className="pdf-container">
            <div id="pdf">
                <div className="pdf-toolbar">
                    <button
                        className="pdf-button"
                        onClick={handlePrevious}
                        disabled={currentPage <= 1}
                    >
                        Previous
                    </button>
                    <span className="pdf-page-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="pdf-button"
                        onClick={handleNext}
                        disabled={currentPage >= totalPages}
                    >
                        Next
                    </button>
                    <button className="pdf-button" onClick={handleZoomOut}>
                        -
                    </button>
                    <span className="pdf-zoom-level">
                        {Math.round(currentScale * 100)}%
                    </span>
                    <button className="pdf-button" onClick={handleZoomIn}>
                        +
                    </button>
                    <button className="pdf-button" onClick={handleFitToWidth}>
                        Fit to Width
                    </button>
                    <button className="pdf-button" onClick={handleFitToPage}>Fit to Page</button>
                </div>


                <div className="pdf-viewer" onDoubleClick={handlePdfDoubleClick} style={{ position: 'relative' }}>
                    <Worker workerUrl={pdfjs.GlobalWorkerOptions.workerSrc}>
                        <Viewer
                            key={key}
                            fileUrl={pdfUrl}
                            ref={viewerRef}
                            plugins={[zoomPluginInstance]}
                            defaultScale={SpecialZoomLevel.PageFit}
                            initialPage={currentPage - 1}
                        />
                    </Worker>


                    {annotations.map((annotation, index) => (
                        <div
                            key={index}
                            className="annotation"
                            style={{
                                position: 'absolute',
                                left: annotation.x,
                                top: annotation.y,
                                background: 'green',
                                padding: '2px',
                                fontSize: '25px'
                            }}
                        >
                            {annotation.text}
                        </div>
                    ))}


                    {inputPosition && (
                        <input
                            type="text"
                            className="annotation-input"
                            style={{
                                position: 'absolute',
                                left: inputPosition.x,
                                top: inputPosition.y,
                                fontSize: '25px',
                                background: 'yellow'
                            }}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onBlur={handleInputBlur}
                            autoFocus
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PdfViewer;