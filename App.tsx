// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { DashboardLayout } from './components/Dashboard/DashboardLayout';
import { LoginModal } from './components/LoginModal';
import { ViewState, User, Role } from './types';
import { INITIAL_USERS } from './constants';

function App() {
  const [view, setView] = useState<ViewState>('LANDING');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // App Data State (Simulating Database)
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  // Theme Handler
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Auth Handler
  const handleLogin = (username: string, password: string): boolean => {
    // Special check for hardcoded admin requirement from prompt
    if (username === 'admin' && password === 'admin') {
      const adminUser = users.find(u => u.username === 'admin');
      if (adminUser) {
        setCurrentUser(adminUser);
        setView('DASHBOARD');
        setIsLoginOpen(false);
        return true;
      }
    }

    const foundUser = users.find(u => u.username === username);
    
    if (foundUser && password === '12345') { 
        setCurrentUser(foundUser);
        setView('DASHBOARD');
        setIsLoginOpen(false);
        return true;
    }

    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('LANDING');
  };

  const handleAddUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setUsers([...users, newUser]);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="antialiased text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {view === 'LANDING' && (
        <LandingPage 
          onLoginClick={() => setIsLoginOpen(true)} 
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      )}

      {view === 'DASHBOARD' && currentUser && (
        <DashboardLayout 
          user={currentUser} 
          onLogout={handleLogout}
          users={users}
          onAddUser={handleAddUser}
          onDeleteUser={handleDeleteUser}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      )}

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}

export default App;