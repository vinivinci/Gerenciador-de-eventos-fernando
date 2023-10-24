import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewEvents from '../../pages/ViewEvents';
import CreateEditEventPage from '../../pages/CreateEditEventPage';
import EventDetailsPage from '../../pages/EventDetailsPage';
import AboutPage from '../../pages/AboutPage';
import HomePage from '../../pages/HomePage';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/show-events" element={<ViewEvents />} />
                <Route path="/create-event" element={<CreateEditEventPage />} />
                <Route path="/event-details" element={<EventDetailsPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
