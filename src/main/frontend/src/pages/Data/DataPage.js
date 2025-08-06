import React, {useState} from 'react';
import PasswordModal from "../../components/Data/Password/PasswordModal";
import File from "../../components/Data/File/File";
import PPTModal from "../../components/Data/File/PPTModal";
import './DataPage.css';
import Guideline from "../../components/Data/Guideline/Guideline";
import Attendance from "../../components/Data/Attendance/Attendance";

const DataPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [previewPDF, setPreviewPDF] = useState(null);
    const [currentTab, setCurrentTab] = useState('file');

    const handleSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <div className="data-page">
            {!isAuthenticated && <PasswordModal onSuccess={handleSuccess}/>}
            {isAuthenticated && (
                <>
                    <div className="tab-menu">
                        {['guideline', 'file', 'attendance'].map((tab) => (
                            <button
                                key={tab}
                                className={currentTab === tab ? 'active' : ''}
                                onClick={() => setCurrentTab(tab)}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <div className="content">
                        {currentTab === 'file' && <File/>}
                        {currentTab === 'guideline' && <Guideline/>}
                        {currentTab === 'attendance' && <Attendance/>}
                        {previewPDF && (
                            <PPTModal filePath={previewPDF} onClose={() => setPreviewPDF(null)}/>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default DataPage;
