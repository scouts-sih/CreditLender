import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import BeneficiaryDetailView from './pages/beneficiary-detail-view';
import LandingPage from './pages/landing-page';
import AdminPartnerLogin from './pages/admin-partner-login';
import BorrowerPortal from './pages/borrower-portal';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/beneficiary-detail-view/:id" element={<BeneficiaryDetailView />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/admin-partner-login" element={<AdminPartnerLogin />} />
        <Route path="/borrower-portal" element={<BorrowerPortal />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
