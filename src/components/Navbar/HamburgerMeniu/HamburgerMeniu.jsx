import React from 'react';
import styles from './HamburgerMeniu.module.scss';
import { links } from '../Links/Links';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const HamburgerMeniu = ({ isOpen, setIsOpen, setIsactive }) => {
  const fader = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 }
  });
  return (
    <animated.div style={fader}>
      <div className={styles.HamburgerMeniu} onClick={() => setIsOpen(!isOpen)}>
        {links.map(({ id, name, path }) => (
          <span
            key={id}
            onClick={() => {
              setIsOpen(!isOpen);
              setIsactive(id);
            }}
            className={styles.spanItem}
          >
            <NavLink to={path} className={styles.navlink}>
              {name}
            </NavLink>
          </span>
        ))}
      </div>
    </animated.div>
  );
};

export default HamburgerMeniu;
