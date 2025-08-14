import React, {useState} from 'react';
import PasswordModal from "../../components/Password/PasswordModal";
import File from "../../components/Data/File/File";
import PPTModal from "../../components/Data/File/PPTModal";
import './DataPage.css';
import Guideline from "../../components/Data/Guideline/Guideline";
import Attendance from "../../components/Data/Attendance/Attendance";

const DataPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [previewPDF, setPreviewPDF] = useState(null);
    const [currentTab, setCurrentTab] = useState('file');

    const handlePasswordSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <div className="data-page">
            {!isAuthenticated && <PasswordModal
                onSuccess={handlePasswordSuccess}
                titleKr="이 탭은 글로벌 버디 한국인 부원들만 볼 수 있습니다."
                titleEn="This tab is only available for Global Buddy Korean members."
                correctPassword="globalbuddy25"
            />
            }
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
