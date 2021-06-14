import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MeniuItem.module.scss';
import { links } from '../Links/Links';
import AuthForNavbar from '../AuthForNavbar/AuthForNavbar';
import { useSpring, animated } from 'react-spring';

const MeniuItem = ({ setIsOpen, isOpen, isActive, setIsactive }) => {
  const meniuLinksItems = links.map(({ id, name, path }) => (
    <li
      className={`${'nav-item'} ${isActive === id && 'active'}`}
      onClick={() => setIsactive(id)}
      key={id}
    >
      <NavLink
        to={path}
        className='nav-link'
        activeClassName='nav-link--active'
      >
        {name}
      </NavLink>
    </li>
  ));

  const fader = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 }
  });

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarColor03'
          aria-controls='navbarColor03'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          {isOpen ? (
            <animated.div style={fader}>
              <span className={styles.closeSpan}>X</span>
            </animated.div>
          ) : (
            <animated.div style={fader}>
              <span className='navbar-toggler-icon'></span>
            </animated.div>
          )}
        </button>

        <div className='collapse navbar-collapse' id='navbarColor03'>
          <ul className='navbar-nav mr-auto'>{meniuLinksItems}</ul>
        </div>
        <div>
          <AuthForNavbar />
        </div>
      </div>
    </nav>
  );
};

export default MeniuItem;
