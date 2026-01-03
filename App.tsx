// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { DashboardLayout } from './components/Dashboard/DashboardLayout';
import { LoginModal } from './components/LoginModal';
import { ViewState, User, Role, ROLE_PERMISSIONS, Permission } from './types';
import { INITIAL_USERS } from './constants';

function App() {
  const [view, setView] = useState<ViewState>('LANDING');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // App Data State (Simulating Database)
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  
  // Permissions State
  const [rolePermissions, setRolePermissions] = useState<Record<string, Permission>>(ROLE_PERMISSIONS);
  // Order State to handle sorting
  const [roleOrder, setRoleOrder] = useState<string[]>(Object.keys(ROLE_PERMISSIONS));

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

  const handleEditUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? { ...u, ...updatedUser } : u));
    
    // If the user is editing themselves, update the current session to reflect changes immediately
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(prev => ({ ...prev!, ...updatedUser }));
    }
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  // User Profile Handler
  const handleUpdateAvatar = (newUrl: string) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, avatar: newUrl };
    
    // Update current session
    setCurrentUser(updatedUser);
    
    // Update "Database"
    setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  // Permission & Role Handlers
  const handleUpdatePermission = (role: string, permissionKey: keyof Permission, value: boolean) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permissionKey]: value
      }
    }));
  };

  const handleAddRole = (newRoleName: string) => {
    if (rolePermissions[newRoleName]) return; // Prevent duplicates
    
    // Add to permissions object
    setRolePermissions(prev => ({
      ...prev,
      [newRoleName]: {
        canManageUsers: false,
        canEditOrders: false,
        canViewFinancials: false,
        canEditProduction: false
      }
    }));
    // Add to order array
    setRoleOrder(prev => [...prev, newRoleName]);
  };

  const handleDeleteRole = (roleToDelete: string) => {
    // Prevent deleting the main ADMIN role to avoid lockout
    if (roleToDelete === Role.ADMIN) {
      alert("O cargo de Administrador não pode ser excluído.");
      return;
    }

    // 1. Remove from permissions
    const newPermissions = { ...rolePermissions };
    delete newPermissions[roleToDelete];
    setRolePermissions(newPermissions);

    // 2. Remove from order
    setRoleOrder(prev => prev.filter(r => r !== roleToDelete));
  };

  const handleMoveRole = (role: string, direction: 'up' | 'down') => {
    const index = roleOrder.indexOf(role);
    if (index < 0) return;
    
    // Boundary checks
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === roleOrder.length - 1) return;

    const newOrder = [...roleOrder];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap elements
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    
    setRoleOrder(newOrder);
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
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          rolePermissions={rolePermissions}
          roleOrder={roleOrder}
          onUpdatePermission={handleUpdatePermission}
          onAddRole={handleAddRole}
          onDeleteRole={handleDeleteRole}
          onMoveRole={handleMoveRole}
          onUpdateAvatar={handleUpdateAvatar}
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