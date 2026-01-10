import React from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import PainPoints from "../components/PainPoints";
import Features from "../components/Features";
import SecurityBanner from "../components/SecurityBanner";
import FinalCTA from "../components/FinalCTA";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 overflow-x-hidden">
      <Navigation />
      <Hero />
      <PainPoints />
      <Features />
      <SecurityBanner />
      <FinalCTA />
    </div>
  );
};

export default LandingPage;
