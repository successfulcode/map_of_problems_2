import React, { useState } from 'react';
import styles from './Auth.module.scss';
import { useSpring, animated } from 'react-spring';

const Auth = () => {
  const [state, toggle] = useState(true);
  const fader = useSpring({
    width: state ? 100 : 120,
    height: state ? 100 : 120,
    from: { width: 100, height: 100 },
    config: { duration: 1000 }
  });
  return (
    <animated.button style={fader} onClick={() => toggle(!state)}>
      sss
    </animated.button>
  );
};

export default Auth;
