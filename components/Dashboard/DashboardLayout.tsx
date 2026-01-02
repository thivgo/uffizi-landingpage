// @ts-nocheck
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { User, Role, Order, Permission, ROLE_PERMISSIONS } from '../../types';
import { MOCK_ORDERS, MONTHLY_DATA } from '../../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, DollarSign, Package, TrendingUp, Search, Filter, Plus, Trash2, Shield, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
  users: User[];
  onAddUser: (user: Omit<User, 'id'>) => void;
  onDeleteUser: (id: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  user, 
  onLogout,
  users,
  onAddUser,
  onDeleteUser,
  isDarkMode,
  toggleTheme
}) => {
  const [currentView, setCurrentView] = useState('overview');
  
  // Employee Form State
  const [newUser, setNewUser] = useState({ name: '', username: '', password: '', role: Role.PRODUCTION });

  const permissions: Permission = ROLE_PERMISSIONS[user.role];

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if(newUser.name && newUser.username && newUser.password) {
       onAddUser({
         name: newUser.name,
         username: newUser.username,
         role: newUser.role,
         avatar: `https://picsum.photos/seed/${newUser.username}/200`
       });
       setNewUser({ name: '', username: '', password: '', role: Role.PRODUCTION });
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Visão Geral</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Vendas Totais', value: 'R$ 124.500', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
                { title: 'Pedidos Ativos', value: '45', icon: Package, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' },
                { title: 'Novos Clientes', value: '+12', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/20' },
                { title: 'Taxa de Entrega', value: '98.5%', icon: TrendingUp, color: 'text-brand-red', bg: 'bg-red-100 dark:bg-red-900/20' },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 flex items-center justify-between transition-colors">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-2 bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Desempenho de Vendas x Produção</h3>
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-zinc-700">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-gray-200' : 'bg-gray-900'}`}></span>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Vendas</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="w-2.5 h-2.5 rounded-full bg-brand-red"></span>
                         <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Produção</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MONTHLY_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#333' : '#eee'} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#9ca3af' : '#888', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#9ca3af' : '#888', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{
                            borderRadius: '8px', 
                            border: 'none', 
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            backgroundColor: isDarkMode ? '#1f2937' : '#fff',
                            color: isDarkMode ? '#fff' : '#000'
                          }}
                          cursor={{fill: isDarkMode ? '#27272a' : '#f9fafb'}}
                        />
                        <Bar dataKey="vendas" fill={isDarkMode ? '#e5e7eb' : '#1a1a1a'} radius={[4, 4, 0, 0]} barSize={20} name="Vendas" />
                        <Bar dataKey="producao" fill="#C02626" radius={[4, 4, 0, 0]} barSize={20} name="Produção" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
               </div>
               
               <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Últimas Atividades</h3>
                  <div className="space-y-6">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-2 h-2 rounded-full bg-brand-red mt-2 shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Pedido #409{i} atualizado</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Há {i * 15} minutos por Roberto Silva</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" fullWidth className="mt-6 text-sm dark:text-gray-300 dark:hover:text-brand-red">Ver todo o histórico</Button>
               </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Gerenciamento de Pedidos</h2>
              {permissions.canEditOrders && <Button><Plus className="w-4 h-4 mr-2" /> Novo Pedido</Button>}
            </div>

            <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors">
               <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Buscar pedido..." 
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:border-brand-red bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-400" 
                    />
                  </div>
                  <Button variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"><Filter className="w-4 h-4 mr-2" /> Filtros</Button>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-gray-100 dark:border-zinc-700 text-gray-500 dark:text-gray-400 text-sm">
                       <th className="py-4 px-4 font-medium">ID</th>
                       <th className="py-4 px-4 font-medium">Cliente</th>
                       <th className="py-4 px-4 font-medium">Data</th>
                       <th className="py-4 px-4 font-medium">Itens</th>
                       <th className="py-4 px-4 font-medium">Valor</th>
                       <th className="py-4 px-4 font-medium">Status</th>
                       <th className="py-4 px-4 font-medium text-right">Ações</th>
                     </tr>
                   </thead>
                   <tbody>
                     {MOCK_ORDERS.map((order) => (
                       <tr key={order.id} className="border-b border-gray-50 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors">
                         <td className="py-4 px-4 font-bold text-gray-800 dark:text-white">{order.id}</td>
                         <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{order.client}</td>
                         <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{new Date(order.date).toLocaleDateString()}</td>
                         <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{order.items} un.</td>
                         <td className="py-4 px-4 font-medium text-gray-800 dark:text-white">R$ {order.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                         <td className="py-4 px-4">
                           <span className={`px-3 py-1 rounded-full text-xs font-semibold
                             ${order.status === 'Entregue' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                               order.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                               order.status === 'Em Produção' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                             }`}>
                             {order.status}
                           </span>
                         </td>
                         <td className="py-4 px-4 text-right">
                           <button className="text-gray-400 hover:text-brand-red transition-colors font-medium text-sm">Detalhes</button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        );

      case 'employees':
        if (!permissions.canManageUsers) return <div className="p-10 text-center text-gray-500">Acesso negado.</div>;
        
        return (
          <div className="space-y-8 animate-fadeIn">
             <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Gestão de Equipe e Permissões</h2>
             </div>

             {/* Create User Form */}
             <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors">
               <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                 <Plus className="w-5 h-5 text-brand-red" /> Adicionar Novo Funcionário
               </h3>
               <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                  <Input 
                    placeholder="Nome Completo" 
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: (e.target as HTMLInputElement).value})}
                    required
                  />
                  <Input 
                    placeholder="Usuário (Login)" 
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: (e.target as HTMLInputElement).value})}
                    required
                  />
                  <Input 
                    placeholder="Senha" 
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: (e.target as HTMLInputElement).value})}
                    required
                  />
                  <div className="w-full">
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: (e.target as HTMLSelectElement).value as Role})}
                    >
                      <option value={Role.ADMIN}>Administrador</option>
                      <option value={Role.MANAGER}>Gerente</option>
                      <option value={Role.SALES}>Vendas</option>
                      <option value={Role.PRODUCTION}>Produção</option>
                    </select>
                  </div>
                  <Button type="submit">Criar Conta</Button>
               </form>
             </div>

             {/* Users List */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((u) => (
                  <div key={u.id} className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 flex flex-col items-center text-center relative group transition-colors">
                    {u.username !== 'admin' && (
                      <button 
                        onClick={() => onDeleteUser(u.id)}
                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    
                    <img src={u.avatar} alt={u.name} className="w-20 h-20 rounded-full object-cover mb-4 ring-4 ring-gray-50 dark:ring-zinc-700" />
                    <h4 className="font-bold text-gray-800 dark:text-white">{u.name}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">@{u.username}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                      ${u.role === Role.ADMIN ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        u.role === Role.MANAGER ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                        u.role === Role.SALES ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }
                    `}>
                      {u.role}
                    </span>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-700 w-full">
                       <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                         <Shield className="w-3 h-3" />
                         <span>{Object.values(ROLE_PERMISSIONS[u.role]).filter(Boolean).length} Permissões Ativas</span>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );

      default:
        return <div className="p-10 text-center text-gray-500">Em desenvolvimento...</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900 font-sans transition-colors duration-300">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onLogout={onLogout}
        userRole={user.role}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
           <div>
             <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Olá, {user.name}</h1>
             <p className="text-gray-500 dark:text-gray-400">Aqui está o resumo da sua fábrica hoje.</p>
           </div>
           
           <div className="flex items-center gap-4">
             <button 
               onClick={toggleTheme}
               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-500 dark:text-gray-400 transition-all mr-2"
               title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
             >
               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             
             <div className="text-right hidden md:block">
               <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{user.name}</p>
               <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{user.role}</p>
             </div>
             <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-zinc-700 shadow-md" />
           </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};