import { useEffect, useState } from "react";
import axios from "axios";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

import Main from './pages/Main/Main';
import Data from './pages/Data/Data';
import Team from './pages/Team/Team';
import Faq from './pages/Faq/Faq';

function App() {
    return (
        <Router>
            <nav>
                <button><Link to="/">Main</Link></button>
                <button><Link to="/data">Data</Link></button>
                <button><Link to="/team">Team</Link></button>
                <button><Link to="/faq">Faq</Link></button>
            </nav>

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/data" element={<Data />} />
                <Route path="/team" element={<Team />} />
                <Route path="/faq" element={<Faq />} />
            </Routes>
        </Router>
    );
}

export default App;
