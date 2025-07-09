import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import MainPage from '../pages/Main/MainPage';
import DataPage from '../pages/Data/DataPage';
import TeamPage from '../pages/Team/TeamPage';
import FaqPage from '../pages/Faq/FaqPage';
import ReviewPage from '../pages/Review/ReviewPage';
import WritePage from '../pages/Review/Write/WritePage';
import Layout from '../components/Layout/Layout';
import ReadPage from "../pages/Review/Read/ReadPage";
import EditPage from "../pages/Review/Edit/EditPage";

const AppRoutes = () => {
    const location = useLocation();
    const isWritePage = location.pathname === '/review/write';

    return (
        <>
            <div className="background"></div>

            {isWritePage ? (
                <Routes>
                    <Route path="/review/write" element={<WritePage />} />
                </Routes>
            ) : (
                <Layout>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/data" element={<DataPage />} />
                        <Route path="/review" element={<ReviewPage />} />
                        <Route path="/team" element={<TeamPage />} />
                        <Route path="/faq" element={<FaqPage />} />
                        <Route path="/review/:id" element={<ReadPage />} />
                        <Route path="/review/edit/:id" element={<EditPage />} />
                    </Routes>
                </Layout>
            )}
        </>
    );
};

function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;
