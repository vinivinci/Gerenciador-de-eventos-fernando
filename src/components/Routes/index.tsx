import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import CreateEditEventPage from '../../pages/CreateEditEventPage';
import EventDetailsPage from '../../pages/EventDetailsPage';
import AboutPage from '../../pages/AboutPage';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create-edit-event" element={<CreateEditEventPage />} />
                <Route path="/event-details" element={<EventDetailsPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
