import React from 'react';
import { Helmet } from 'react-helmet';
import PublicHeader from '../../components/ui/PublicHeader';
import HeroSection from './components/HeroSection';
import FeatureCards from './components/FeatureCards';
import TestimonialsSection from './components/TestimonialsSection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>CreditLend Pro - AI-Powered Credit Scoring for Financial Inclusion</title>
        <meta 
          name="description" 
          content="Unlock credit access with AI-driven scoring through utility bills and mobile recharge data. Fast, transparent, and inclusive financial services for underserved communities." 
        />
        <meta name="keywords" content="credit scoring, AI lending, financial inclusion, digital loans, utility bills, mobile recharge, underserved communities" />
        <meta property="og:title" content="CreditLend Pro - AI-Powered Credit Scoring" />
        <meta property="og:description" content="Empowering underserved communities with AI-driven credit scoring and inclusive financial access." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/landing-page" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <PublicHeader />

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <HeroSection />

          {/* Feature Cards Section */}
          <FeatureCards />

          {/* Testimonials & Impact Section */}
          <TestimonialsSection />
        </main>

        {/* Footer */}
        <FooterSection />
      </div>
    </>
  );
};

export default LandingPage;