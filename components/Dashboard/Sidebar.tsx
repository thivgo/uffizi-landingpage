// @ts-nocheck
import React from 'react';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Shirt, PieChart, Sun, Moon } from 'lucide-react';
import { Role } from '../../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  userRole: Role;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onLogout, userRole, isDarkMode, toggleTheme }) => {
  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard, allowed: [Role.ADMIN, Role.MANAGER, Role.SALES, Role.PRODUCTION] },
    { id: 'orders', label: 'Pedidos', icon: ShoppingBag, allowed: [Role.ADMIN, Role.MANAGER, Role.SALES, Role.PRODUCTION] },
    { id: 'financial', label: 'Financeiro', icon: PieChart, allowed: [Role.ADMIN, Role.MANAGER] },
    { id: 'employees', label: 'Funcionários', icon: Users, allowed: [Role.ADMIN] },
    { id: 'settings', label: 'Configurações', icon: Settings, allowed: [Role.ADMIN] },
  ];

  return (
    <div className="w-64 bg-brand-dark text-gray-400 flex flex-col h-screen fixed left-0 top-0 border-r border-gray-800 z-50">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
        <div className="bg-brand-red p-1.5 rounded-lg">
          <Shirt className="w-5 h-5 text-white" />
        </div>
        <span className="text-white font-bold text-xl tracking-tight">UFFIZI ADM</span>
      </div>

      <div className="flex-1 py-6 px-4 space-y-2">
        <p className="px-4 text-xs font-bold uppercase tracking-wider text-gray-600 mb-4">Menu Principal</p>
        {menuItems.map((item) => {
          if (!item.allowed.includes(userRole)) return null;
          
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-brand-red text-white shadow-lg shadow-red-900/20' 
                  : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="px-4 py-2">
         <button 
           onClick={toggleTheme}
           className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 hover:text-white transition-colors text-gray-400 mb-2"
         >
           {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
           <span className="font-medium text-sm">{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
         </button>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-900/20 hover:text-red-400 transition-colors text-gray-400"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Sair do Sistema</span>
        </button>
      </div>
    </div>
  );
};