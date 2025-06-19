import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import MaintenancePage from './components/MaintenancePage';
import PortfolioPage from './components/PortfolioPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentSection, setCurrentSection] = useState('home');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage onSectionChange={setCurrentSection} />;
      case 'services':
        return <ServicesPage />;
      case 'maintenance':
        return <MaintenancePage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onSectionChange={setCurrentSection} />;
    }
  };

  return (
    <Layout currentSection={currentSection} onSectionChange={setCurrentSection}>
      {renderSection()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;