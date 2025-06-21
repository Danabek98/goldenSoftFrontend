import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <button className={`${styles.button} ${className}`} {...rest}>
      {children}
    </button>
  );
};

// Вот как это работает внутри компонента:
//     children → попадёт в children
//     className → попадёт в className
//     всё остальное (type, disabled, aria-busy, onClick) попадёт в ...rest
