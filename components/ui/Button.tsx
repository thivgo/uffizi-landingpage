// @ts-nocheck
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    // Reverted to bg-brand-red
    primary: "bg-brand-red text-white hover:bg-red-700 hover:shadow-lg shadow-md focus:ring-red-500",
    secondary: "bg-brand-dark text-white hover:bg-gray-800 focus:ring-gray-500",
    outline: "border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white hover:border-transparent focus:ring-red-500",
    ghost: "bg-transparent text-gray-600 hover:text-brand-red hover:bg-red-50"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};