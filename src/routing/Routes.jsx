import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layout/Layout";

import MainCalendarPage from "../pages/MainCalendarPage";
import GroupVisitsPage from "../pages/GroupVisitsPage";
import EventsActivitiesPage from "../pages/EventsActivitiesPage";
import EducationPage from "../pages/EducationPage";
import EventProposalsPage from "../pages/EventProposalsPage";
import { LoginPage } from "../pages/LoginPage";

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<MainCalendarPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/groupVisits" element={<GroupVisitsPage />} />

          <Route path="/eventsActivities" element={<EventsActivitiesPage />} />

          <Route path="/education" element={<EducationPage />} />

          <Route path="/eventProposals" element={<EventProposalsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
