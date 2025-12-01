"use client";

import React from 'react';
import styles from './button.module.css'; 

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm';
  children: React.ReactNode;
}

export const Button = ({
  children,
  className,
  variant = 'default', 
  size = 'default',
  ...props 
}: ButtonProps) => {

  const variantClass = styles[variant] || '';
  const sizeClass = styles[size] || '';

  return (
    <button
      className={`
        ${styles.buttonBase} 
        ${variantClass} 
        ${sizeClass} 
        ${className || ''} 
      `}
      {...props} 
    >
      {children}
    </button>
  );
};