import React, { useContext, useState, useEffect } from 'react';
import Input from '../../../UI/Input/Input';
import styles from './LoginForm.module.scss';
import Button from '../../../UI/Button/Button';
import firebaseApp from '../../../firease/firebase';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import { useForm } from 'react-hook-form';
import { useSpring, animated } from 'react-spring';
import AbsoluteWrapper from '../../../hoc/AbsoluteWrapper.';

const LoginForm = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async ({ email, password }) => {
    try {
      setIsLoading(true);
      await firebaseApp.auth().signInWithEmailAndPassword(email, password);
      setIsLoading(false);
      history.push('/');
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const { currentUser } = useContext(AuthContext);
  useEffect(
    (currentUser) => {
      if (currentUser) {
        return <Redirect to='/' />;
      }
    },
    [currentUser]
  );

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 900);
  }

  const fader = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 }
  });

  return (
    <AbsoluteWrapper>
      <animated.div style={fader}>
        <div className={styles.LoginForm}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <h3>Prisijungti</h3>
            <Input
              name='email'
              type='email'
              placeholder='El. pašto adresas'
              small='Įveskite savo el. pašto adresą'
              refForForm={register({
                required: true,
                pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
              })}
              errors={errors.email}
            >
              {errors.email?.type === 'required' &&
                'Laukas turi būti užpildytas'}
              {errors.email?.type === 'pattern' &&
                'Patikrinkite el.pašto adresą'}
            </Input>
            <Input
              name='password'
              type='password'
              placeholder='Slaptažodis'
              small='Įveskite savo slaptažodį'
              refForForm={register({ required: true, maxLength: 20 })}
              errors={errors.password}
            >
              {errors.password?.type === 'required' &&
                'Laukas turi būti užpildytas'}
              {errors.password?.type === 'maxLength' &&
                'Maksimalus symbolių skaičius yra 20'}
            </Input>
            <div className={styles.buttons}>
              <Button
                className='btn btn-success'
                type='onSubmit'
                disabled={isLoading}
              >
                {isLoading && (
                  <span
                    className='spinner-grow spinner-grow-sm'
                    role='status'
                    aria-hidden='true'
                  ></span>
                )}
                {isLoading ? 'Kraunasi...' : 'Prisijungti'}
              </Button>

              <NavLink to='/signup'>
                <button
                  type='button'
                  className='btn btn-primary'
                  style={{ margin: '4px 5px 4px' }}
                >
                  Registruotis
                </button>
              </NavLink>
            </div>
            {error && (
              <div
                style={{
                  margin: '5px 5px 5px',
                  width: '97%',
                  opacity: '0.7'
                }}
              >
                <div className='alert alert-dismissible alert-danger'>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='alert'
                    onClick={() => setError(null)}
                  >
                    &times;
                  </button>
                  <strong>Kažkas atsitiko!</strong> Neteisingai įvedėte el.
                  pašto adresą arba slaptažodį...
                </div>
              </div>
            )}
          </form>
        </div>
      </animated.div>
    </AbsoluteWrapper>
  );
};

export default withRouter(LoginForm);
