import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './ThanksPage.module.scss';
import { Redirect } from 'react-router-dom';

const ThanksPage = ({ text }) => {
  const [redirect, setRedirect] = useState(false);

  const [textItem, setTextItem] = useState('Dėkojame, kad užsiregistravote!');

  useEffect(() => {
    if (text) {
      setTextItem(text);
    }
    setTimeout(() => {
      setRedirect(true);
    }, 1300);
  }, []);

  const fader = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 }
  });

  if (redirect) {
    return <Redirect to='/' />;
  }

  return (
    <animated.div style={fader}>
      <div className={styles.ThanksPage}>
        <div>
          <h2>{textItem}</h2>
          {/* <h2>Dėkojame, kad užsiregistravote!</h2> */}
        </div>
      </div>
    </animated.div>
  );
};

export default ThanksPage;
