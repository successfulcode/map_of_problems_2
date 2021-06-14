import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './../../Auth/AuthContextProvider/AuthContextProvider';
import styles from './AuthForNavbar.module.scss';
import firebaseApp from '../../../firease/firebase';
import { useSpring, animated } from 'react-spring';

const AuthForNavbar = () => {
  const { currentUser } = useContext(AuthContext);

  const [buttonSize, setButtonSize] = useState(false);
  const fader = useSpring({
    width: buttonSize ? 80 : 75,
    height: buttonSize ? 19.63 : 16.63,
    opacity: 1,
    from: { width: 75, height: 16.63, opacity: 0 },
    config: { duration: 300 }
  });

  if (buttonSize) {
    setTimeout(() => {
      setButtonSize(false);
    }, 600);
  }

  return (
    <div>
      {!!currentUser ? (
        <div className={styles.outItems}>
          {currentUser.displayName}
          <NavLink to='/'>
            <span
              className='badge badge-light'
              onClick={() => firebaseApp.auth().signOut()}
            >
              <i className='fas fa-sign-out-alt' />
              Atsijungti
            </span>
          </NavLink>
        </div>
      ) : (
        <div className={styles.inItems}>
          <NavLink to='/login'>
            <animated.span
              className='badge badge-light'
              style={fader}
              onClick={() => setButtonSize(!buttonSize)}
            >
              Prisijungti
              <i className='fas fa-sign-in-alt' />
            </animated.span>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default AuthForNavbar;
