import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './Data.css';

const BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PPTModal = ({ filePath, onClose }) => {
    const fullUrl = `${BASE_URL}/${encodeURIComponent(filePath)}`;

    return (
        <div className="pdf-modal-overlay" onClick={onClose}>
            <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
                <Document file={fullUrl}>
                    <Page pageNumber={1} />
                </Document>
            </div>
        </div>
    );
};

export default PPTModal;
