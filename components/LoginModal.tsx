// @ts-nocheck
import React, { useState } from 'react';
import { X, Shirt, Sun, Moon } from 'lucide-react';
import { Button } from './ui/Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (u: string, p: string) => boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, isDarkMode, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(email, password);
    if (!success) {
      setError('Credenciais inválidas. Tente admin/admin ou user/12345');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-brand-dark rounded-3xl shadow-2xl overflow-hidden animate-bounceIn" style={{ animationDuration: '0.3s' }}>
        <div className="absolute top-4 right-4 flex items-center gap-2">
           <button 
             onClick={toggleTheme}
             className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
             title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
           >
             {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
           </button>
           <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="bg-white p-3 rounded-2xl shadow-lg">
              <Shirt className="w-10 h-10 text-brand-red" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-white mb-8">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Usuário / Email</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none transition-all"
                placeholder="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none transition-all"
                placeholder="••••••••"
              />
              <div className="flex justify-end mt-2">
                <a href="#" className="text-xs text-gray-400 hover:text-white">Esqueceu sua senha?</a>
              </div>
            </div>

            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

            <Button fullWidth size="lg" className="py-4 rounded-xl font-bold shadow-lg shadow-red-900/30">
              Entrar
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-center text-gray-500 text-sm mb-4">Ou entre com...</p>
            <div className="flex gap-4 justify-center">
               <button className="bg-white text-gray-800 px-6 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors flex items-center gap-2">
                 <span className="text-blue-600 font-bold text-lg">G</span> Google
               </button>
               <button className="bg-white text-gray-800 px-6 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors flex items-center gap-2">
                 <span className="text-black font-bold text-lg"></span> Apple
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};