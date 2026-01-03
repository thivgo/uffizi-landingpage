// @ts-nocheck
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { User, Role, Order, Permission, ROLE_PERMISSIONS } from '../../types';
import { MOCK_ORDERS, MONTHLY_DATA } from '../../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, DollarSign, Package, TrendingUp, Search, Filter, Plus, Trash2, Shield, Sun, Moon, Lock, Check, X, ArrowUp, ArrowDown, UserCircle, Save, Camera, Pencil } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
  users: User[];
  onAddUser: (user: Omit<User, 'id'>) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  rolePermissions: Record<string, Permission>;
  roleOrder: string[];
  onUpdatePermission: (role: string, permissionKey: keyof Permission, value: boolean) => void;
  onAddRole: (name: string) => void;
  onDeleteRole: (role: string) => void;
  onMoveRole: (role: string, direction: 'up' | 'down') => void;
  onUpdateAvatar: (url: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  user, 
  onLogout,
  users,
  onAddUser,
  onEditUser,
  onDeleteUser,
  isDarkMode,
  toggleTheme,
  rolePermissions,
  roleOrder,
  onUpdatePermission,
  onAddRole,
  onDeleteRole,
  onMoveRole,
  onUpdateAvatar
}) => {
  const [currentView, setCurrentView] = useState('overview');
  
  // Employee Form State
  const [newUser, setNewUser] = useState({ name: '', username: '', password: '', role: Role.PRODUCTION as string });
  
  // Edit User State
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // New Role Form State
  const [newRoleName, setNewRoleName] = useState('');

  // Profile Avatar State
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || '');

  // Use dynamic permissions if available, otherwise fallback (safety check)
  const currentPermissions = rolePermissions[user.role] || ROLE_PERMISSIONS[Role.PRODUCTION];

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if(newUser.name && newUser.username && newUser.password) {
       onAddUser({
         name: newUser.name,
         username: newUser.username,
         role: newUser.role as Role,
         avatar: `https://picsum.photos/seed/${newUser.username}/200`
       });
       // Reset form
       setNewUser({ name: '', username: '', password: '', role: roleOrder[0] || Role.PRODUCTION });
    }
  };

  const handleSaveEditedUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      onEditUser(editingUser);
      setEditingUser(null);
    }
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if(newRoleName.trim()) {
      onAddRole(newRoleName.toUpperCase());
      setNewRoleName('');
    }
  };

  const handleSaveAvatar = () => {
    if(avatarUrl.trim()) {
      onUpdateAvatar(avatarUrl);
    }
  };

  // Mock Data for Profile Charts
  const PERFORMANCE_DATA = [
    { name: 'Concluído', value: 85, color: '#22c55e' }, // green
    { name: 'Pendente', value: 15, color: '#e5e7eb' },  // gray
  ];

  const WEEKLY_ACTIVITY = [
    { day: 'Seg', tasks: 12 },
    { day: 'Ter', tasks: 19 },
    { day: 'Qua', tasks: 15 },
    { day: 'Qui', tasks: 22 },
    { day: 'Sex', tasks: 18 },
  ];

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
              {currentPermissions.canEditOrders && <Button><Plus className="w-4 h-4 mr-2" /> Novo Pedido</Button>}
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

      case 'permissions':
        if (user.role !== Role.ADMIN) return <div className="p-10 text-center text-gray-500">Acesso negado.</div>;

        const permissionLabels = {
          canManageUsers: 'Gerenciar Usuários',
          canEditOrders: 'Editar Pedidos',
          canViewFinancials: 'Ver Financeiro',
          canEditProduction: 'Gerir Produção'
        };

        const roles = roleOrder;

        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Matriz de Permissões</h2>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Controle de Acesso por Cargo</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-100 dark:border-zinc-700">
                      <th className="pb-4 pr-4 text-gray-500 dark:text-gray-400 font-medium w-1/4">Cargo / Função</th>
                      {Object.values(permissionLabels).map(label => (
                        <th key={label} className="pb-4 px-4 text-center text-gray-500 dark:text-gray-400 font-medium">{label}</th>
                      ))}
                      <th className="pb-4 px-4 text-center text-gray-500 dark:text-gray-400 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((roleKey, index) => (
                      <tr key={roleKey} className="border-b border-gray-50 dark:border-zinc-700/50 hover:bg-gray-50 dark:hover:bg-zinc-700/30 transition-colors">
                        <td className="py-4 pr-4">
                          <span className="font-bold text-gray-800 dark:text-white px-3 py-1 bg-gray-100 dark:bg-zinc-700 rounded-lg text-sm">
                            {roleKey}
                          </span>
                        </td>
                        {Object.keys(permissionLabels).map((permKey) => {
                          const isAllowed = rolePermissions[roleKey]?.[permKey as keyof Permission] || false;
                          return (
                            <td key={permKey} className="py-4 px-4 text-center">
                              <button 
                                onClick={() => onUpdatePermission(roleKey, permKey as keyof Permission, !isAllowed)}
                                className={`w-10 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red ${
                                  isAllowed ? 'bg-brand-red' : 'bg-gray-300 dark:bg-zinc-600'
                                }`}
                              >
                                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform transform shadow-sm ${
                                  isAllowed ? 'translate-x-4' : 'translate-x-0'
                                }`}></span>
                              </button>
                            </td>
                          );
                        })}
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                             <button 
                               onClick={() => onMoveRole(roleKey, 'up')}
                               disabled={index === 0}
                               className="p-1.5 text-gray-400 hover:text-brand-red hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                               title="Mover para cima"
                             >
                               <ArrowUp size={16} />
                             </button>
                             <button 
                               onClick={() => onMoveRole(roleKey, 'down')}
                               disabled={index === roles.length - 1}
                               className="p-1.5 text-gray-400 hover:text-brand-red hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                               title="Mover para baixo"
                             >
                               <ArrowDown size={16} />
                             </button>
                             <div className="w-px h-4 bg-gray-200 dark:bg-zinc-700 mx-1"></div>
                             <button 
                               onClick={() => onDeleteRole(roleKey)}
                               disabled={roleKey === Role.ADMIN}
                               className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                               title="Excluir cargo"
                             >
                               <Trash2 size={16} />
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Create New Role */}
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors">
               <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                 <Shield className="w-5 h-5 text-brand-red" /> Criar Novo Cargo
               </h3>
               <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Adicione um novo cargo ao sistema. As permissões começam desabilitadas por padrão.</p>
               
               <form onSubmit={handleCreateRole} className="flex gap-4 items-end max-w-lg">
                  <Input 
                    placeholder="Nome do Cargo (ex: SUPERVISOR)" 
                    value={newRoleName}
                    onChange={(e) => setNewRoleName((e.target as HTMLInputElement).value)}
                    required
                  />
                  <Button type="submit">Adicionar Cargo</Button>
               </form>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Meu Perfil</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors flex flex-col items-center">
                 <div className="relative group">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-32 h-32 rounded-full object-cover ring-4 ring-gray-100 dark:ring-zinc-700 mb-4" 
                    />
                 </div>
                 
                 <h3 className="text-xl font-bold text-gray-800 dark:text-white">{user.name}</h3>
                 <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
                 <span className="mt-2 px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-bold rounded-full uppercase">
                   {user.role}
                 </span>
                 
                 <div className="w-full mt-8">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alterar Foto (URL)</label>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         value={avatarUrl}
                         onChange={(e) => setAvatarUrl(e.target.value)}
                         className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-zinc-900 dark:text-white outline-none focus:border-brand-red"
                         placeholder="https://..."
                       />
                       <Button size="sm" onClick={handleSaveAvatar}>
                         <Save className="w-4 h-4" />
                       </Button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">Cole o link de uma imagem para atualizar seu avatar.</p>
                 </div>
              </div>

              {/* Stats Card */}
              <div className="lg:col-span-2 space-y-6">
                 {/* Efficiency Gauge */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors flex flex-col items-center justify-center">
                       <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Aproveitamento Pessoal</h4>
                       <div className="h-48 w-full flex items-center justify-center relative">
                          <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                                <Pie
                                  data={PERFORMANCE_DATA}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  startAngle={180}
                                  endAngle={0}
                                  paddingAngle={5}
                                  dataKey="value"
                                >
                                  {PERFORMANCE_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                  ))}
                                </Pie>
                             </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 text-center">
                             <span className="text-3xl font-bold text-gray-800 dark:text-white">85%</span>
                             <p className="text-xs text-gray-500">Eficiência</p>
                          </div>
                       </div>
                       <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-[-20px]">Você está acima da média da equipe!</p>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors">
                       <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Atividade Semanal</h4>
                       <div className="h-48 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={WEEKLY_ACTIVITY}>
                             <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280'}} />
                             <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{
                                  borderRadius: '8px', 
                                  border: 'none', 
                                  backgroundColor: isDarkMode ? '#1f2937' : '#fff',
                                  color: isDarkMode ? '#fff' : '#000',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                             />
                             <Bar dataKey="tasks" fill="#C02626" radius={[4, 4, 4, 4]} barSize={30} />
                           </BarChart>
                         </ResponsiveContainer>
                       </div>
                    </div>
                 </div>

                 {/* Goals List */}
                 <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Metas do Mês</h4>
                    <div className="space-y-4">
                       {[
                         { title: 'Finalizar treinamento de segurança', progress: 100, color: 'bg-green-500' },
                         { title: 'Atingir cota de produção semanal', progress: 75, color: 'bg-brand-red' },
                         { title: 'Revisar relatórios pendentes', progress: 40, color: 'bg-yellow-500' }
                       ].map((goal, idx) => (
                         <div key={idx}>
                            <div className="flex justify-between text-sm mb-1">
                               <span className="text-gray-700 dark:text-gray-300 font-medium">{goal.title}</span>
                               <span className="text-gray-500 dark:text-gray-400">{goal.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-zinc-700 rounded-full h-2">
                               <div className={`h-2 rounded-full ${goal.color}`} style={{ width: `${goal.progress}%` }}></div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        );

      case 'employees':
        if (!currentPermissions.canManageUsers) return <div className="p-10 text-center text-gray-500">Acesso negado.</div>;
        
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cargo</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: (e.target as HTMLSelectElement).value})}
                    >
                      {/* Use roleOrder to populate the dropdown in the desired order */}
                      {roleOrder.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <Button type="submit">Criar Conta</Button>
               </form>
             </div>

             {/* Users List */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((u) => {
                  const userPerms = rolePermissions[u.role] || { canManageUsers: false, canEditOrders: false, canViewFinancials: false, canEditProduction: false };
                  const activePermCount = Object.values(userPerms).filter(Boolean).length;

                  return (
                  <div key={u.id} className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 flex flex-col items-center text-center relative group transition-colors">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                         onClick={() => setEditingUser(u)}
                         className="text-gray-300 hover:text-blue-500 transition-colors"
                         title="Editar Usuário"
                       >
                         <Pencil className="w-4 h-4" />
                       </button>
                      {u.username !== 'admin' && (
                        <button 
                          onClick={() => onDeleteUser(u.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                          title="Excluir Usuário"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <img src={u.avatar} alt={u.name} className="w-20 h-20 rounded-full object-cover mb-4 ring-4 ring-gray-50 dark:ring-zinc-700" />
                    <h4 className="font-bold text-gray-800 dark:text-white">{u.name}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">@{u.username}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                      ${u.role === Role.ADMIN ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        u.role === Role.MANAGER ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                        u.role === Role.SALES ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                        u.role === Role.PRODUCTION ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' : 
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' 
                      }
                    `}>
                      {u.role}
                    </span>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-700 w-full">
                       <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                         <Shield className="w-3 h-3" />
                         <span>{activePermCount} Permissões Ativas</span>
                       </div>
                    </div>
                  </div>
                )})}
             </div>

             {/* Edit User Modal Overlay */}
             {editingUser && (
               <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                 <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl max-w-md w-full animate-fadeIn border border-gray-100 dark:border-zinc-700">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">Editar Funcionário</h3>
                      <button onClick={() => setEditingUser(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                      </button>
                    </div>
                    
                    <form onSubmit={handleSaveEditedUser} className="space-y-4">
                      <Input 
                        label="Nome Completo"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                        required
                      />
                      <Input 
                        label="Usuário (Login)"
                        value={editingUser.username}
                        onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                        required
                        disabled={editingUser.username === 'admin'} // Protect admin username
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cargo</label>
                        <select 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                          value={editingUser.role}
                          onChange={(e) => setEditingUser({...editingUser, role: e.target.value as Role})}
                          disabled={editingUser.username === 'admin'} // Protect admin role
                        >
                          {roleOrder.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <Button type="button" variant="ghost" fullWidth onClick={() => setEditingUser(null)}>Cancelar</Button>
                        <Button type="submit" fullWidth>Salvar Alterações</Button>
                      </div>
                    </form>
                 </div>
               </div>
             )}
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