import React from 'react';
import styles from './Button.module.scss';

const Button = ({ children, className, type, onClick, disabled }) => {
  return (
    <button
      className={`${className} ${styles.Button}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
