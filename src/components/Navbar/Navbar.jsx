import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import MeniuItem from './MeniuItem/MeniuItem';
import HamburgerMeniu from './HamburgerMeniu/HamburgerMeniu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsactive] = useState('main');

  return (
    <div className={styles.Navbar}>
      <MeniuItem
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        isActive={isActive}
        setIsactive={setIsactive}
      />
      {isOpen && (
        <HamburgerMeniu
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          isActive={isActive}
          setIsactive={setIsactive}
        />
      )}
    </div>
  );
};

export default Navbar;
