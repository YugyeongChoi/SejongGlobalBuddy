import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Main from './pages/Main/Main';
import Data from './pages/Data/Data';
import Team from './pages/Team/Team';
import Faq from './pages/Faq/Faq';
import Review from './pages/Review/Review';
import ReviewWrite from './pages/Review/ReviewWrite';
import Layout from './components/Layout';
import ReviewDetail from "./pages/Review/Detail/ReviewDetail";

const AppRoutes = () => {
    const location = useLocation();
    const isWritePage = location.pathname === '/review/write';

    return (
        <>
            <div className="background"></div>

            {isWritePage ? (
                <Routes>
                    <Route path="/review/write" element={<ReviewWrite />} />
                </Routes>
            ) : (
                <Layout>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/data" element={<Data />} />
                        <Route path="/review" element={<Review />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/faq" element={<Faq />} />
                        <Route path="/review/:id" element={<ReviewDetail />} />
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
