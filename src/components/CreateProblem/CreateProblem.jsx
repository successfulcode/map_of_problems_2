import React, { useState } from 'react';
import styles from './CreateProblem.module.scss';
import AddForm from './AddForm/AddForm';
import { problemsTypes } from '../../initialValues/problemsTypes';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import AbsoluteWrapper from '../../hoc/AbsoluteWrapper.';
import { Redirect } from 'react-router-dom';
import CreateMap from '../MapsItems/CreateMap/CreateMap';

const CreateProblem = () => {
  const [error, setError] = useState('');
  const [redirectItem, setRedirectItem] = useState(false);

  const addProblem = async (data) => {
    try {
      await axios
        .post('https://newmapofproblems.firebaseio.com/.json', data)
        .then((response) => {
          if (response.status === 200) {
            setRedirectItem(true);
          } else {
            setError('Kažkas atsitiko...');
          }
        });
    } catch {
      setError('Kažkas atsitiko! Nepavyko užregistruoti problemos...');
    }
  };

  const redirectFromHere = () => {
    if (redirectItem) {
      return <Redirect to='/thnxForCreate' />;
    }
  };

  if (error) {
    setTimeout(() => {
      setError('');
    }, 4000);
  }

  const fader = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 }
  });

  return (
    <AbsoluteWrapper>
      <animated.div style={fader}>
        {redirectFromHere()}
        <div className={styles.CreateProblem}>
          <div className={styles.formDiv}>
            <div>
              {error && (
                <div className='alert alert-danger' role='alert'>
                  {error}
                </div>
              )}
              <h3>Registruoti problemą</h3>
            </div>
            <div>
              <AddForm problemsTypes={problemsTypes} addProblem={addProblem} />
              <CreateMap />
            </div>
          </div>
        </div>
      </animated.div>
    </AbsoluteWrapper>
  );
};

export default CreateProblem;
