import { Order, Role, User } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Administrador',
    username: 'admin', // Password is 'admin' logic handled in App
    role: Role.ADMIN,
    avatar: 'https://picsum.photos/seed/admin/200'
  },
  {
    id: '2',
    name: 'Roberto Silva',
    username: 'roberto',
    role: Role.MANAGER,
    avatar: 'https://picsum.photos/seed/roberto/200'
  },
  {
    id: '3',
    name: 'Julia Costa',
    username: 'julia',
    role: Role.PRODUCTION,
    avatar: 'https://picsum.photos/seed/julia/200'
  }
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-001', client: 'Tech Solutions Inc', status: 'Em Produção', amount: 4500.00, date: '2023-10-25', items: 50 },
  { id: 'ORD-002', client: 'Padaria do João', status: 'Entregue', amount: 1200.50, date: '2023-10-20', items: 15 },
  { id: 'ORD-003', client: 'Escola Futuro', status: 'Pendente', amount: 15000.00, date: '2023-10-28', items: 200 },
  { id: 'ORD-004', client: 'Clínica Bem Estar', status: 'Enviado', amount: 3200.00, date: '2023-10-22', items: 40 },
  { id: 'ORD-005', client: 'Auto Mecânica Veloz', status: 'Em Produção', amount: 2100.00, date: '2023-10-26', items: 25 },
];

export const MONTHLY_DATA = [
  { name: 'Jan', vendas: 4000, producao: 2400 },
  { name: 'Fev', vendas: 3000, producao: 1398 },
  { name: 'Mar', vendas: 2000, producao: 9800 },
  { name: 'Abr', vendas: 2780, producao: 3908 },
  { name: 'Mai', vendas: 1890, producao: 4800 },
  { name: 'Jun', vendas: 2390, producao: 3800 },
  { name: 'Jul', vendas: 3490, producao: 4300 },
];
