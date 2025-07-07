import React, {useEffect, useState, useRef} from 'react';

import {HashRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";

import Main from './pages/Main/Main';
import Data from './pages/Data/Data';
import Team from './pages/Team/Team';
import Faq from './pages/Faq/Faq';
import Review from './pages/Review/Review';
import Layout from "./components/Layout";
import ReviewWrite from "./pages/Review/ReviewWrite";

function App() {
    return (
        <Router>
            <div className="background"></div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/data" element={<Data/>}/>
                    <Route path="/review" element={<Review/>}/>
                    <Route path="/team" element={<Team/>}/>
                    <Route path="/faq" element={<Faq/>}/>
                    <Route path="/review/write" element={<ReviewWrite />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
