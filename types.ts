export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'GERENTE',
  PRODUCTION = 'PRODUCAO',
  SALES = 'VENDAS'
}

export interface User {
  id: string;
  name: string;
  username: string;
  role: Role;
  avatar?: string;
}

export interface Order {
  id: string;
  client: string;
  status: 'Pendente' | 'Em Produção' | 'Enviado' | 'Entregue';
  amount: number;
  date: string;
  items: number;
}

export interface Permission {
  canManageUsers: boolean;
  canEditOrders: boolean;
  canViewFinancials: boolean;
  canEditProduction: boolean;
}

export const ROLE_PERMISSIONS: Record<Role, Permission> = {
  [Role.ADMIN]: { canManageUsers: true, canEditOrders: true, canViewFinancials: true, canEditProduction: true },
  [Role.MANAGER]: { canManageUsers: false, canEditOrders: true, canViewFinancials: true, canEditProduction: true },
  [Role.PRODUCTION]: { canManageUsers: false, canEditOrders: false, canViewFinancials: false, canEditProduction: true },
  [Role.SALES]: { canManageUsers: false, canEditOrders: true, canViewFinancials: false, canEditProduction: false },
};

export type ViewState = 'LANDING' | 'DASHBOARD';