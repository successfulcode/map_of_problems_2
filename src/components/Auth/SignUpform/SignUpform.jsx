import React, { useContext, useState, useEffect } from 'react';
import Input from '../../../UI/Input/Input';
import styles from './SignUpform.module.scss';
import Button from '../../../UI/Button/Button';
import firebaseApp from '../../../firease/firebase';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import { useForm } from 'react-hook-form';
import { useSpring, animated } from 'react-spring';
import AbsoluteWrapper from '../../../hoc/AbsoluteWrapper.';

const SignUpform = ({ history }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password2Error, SetPassword2Error] = useState(false);

  const password1 = watch('password', 'value');
  const password2 = watch('password2', 'value');

  useEffect(() => {
    if (password1 !== password2) {
      SetPassword2Error(true);
    } else {
      SetPassword2Error(false);
    }
  });

  const handleLogin = async ({ email, password, name, surname }) => {
    const displayName = `${name} ${surname}`;
    try {
      setIsLoading(true);
      await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
      if (firebaseApp.auth().currentUser != null) {
        firebaseApp.auth().currentUser.updateProfile({
          displayName: displayName
        });
      }
      setIsLoading(false);
      history.push('/thnx');
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
    }, 4000);
  }

  const fader = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 900 }
  });

  return (
    <AbsoluteWrapper>
      <animated.div style={fader}>
        <div className={styles.SignUpform}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <h3>Regitracija</h3>
            <Input
              name='name'
              type='text'
              placeholder='Vardas'
              small='Įveskite savo vardą'
              refForForm={register({
                required: true,
                pattern: /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/
              })}
              errors={errors.name}
            >
              {errors.name?.type === 'required' &&
                'Laukas turi būti užpildytas'}
              {errors.name?.type === 'pattern' &&
                'Vardas rašomas iš didžiosios raidės, kitos raidės mažosios'}
            </Input>
            <Input
              name='surname'
              type='text'
              placeholder='Pavardė'
              small='Įveskite savo pavardę'
              refForForm={register({
                required: true,
                pattern: /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/
              })}
              errors={errors.surname}
            >
              {errors.surname?.type === 'required' &&
                'Laukas turi būti užpildytas'}
              {errors.surname?.type === 'pattern' &&
                'Pavardė rašoma iš didžiosios raidės, kitos raidės mažosios'}
            </Input>
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
              refForForm={register({
                required: true,
                maxLength: 20,
                minLength: 6
              })}
              errors={errors.password}
            >
              {errors.password?.type === 'required' &&
                'Laukas turi būti užpildytas'}
              {errors.password?.type === 'maxLength' &&
                'Maksimalus symbolių skaičius yra 20'}
              {errors.password?.type === 'minLength' &&
                'Minimalus symbolių skaičius turėtu būti 6'}
            </Input>
            <Input
              name='password2'
              type='password'
              placeholder='Pakartokite slaptažodį'
              small='Dar kartą įveskite savo slaptažodį'
              refForForm={register({
                required: true,
                maxLength: 20
              })}
              errors={password2Error || errors.password}
              className='form-control is-invalid'
            >
              {password2Error && 'Slaptažodžio laukai turi sutapti'}
              {errors.password?.type === 'maxLength' &&
                'Maksimalus symbolių skaičius yra 20'}
              {errors.password?.type === 'minLength' &&
                'Minimalus symbolių skaičius turėtu būti 6'}
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
                {isLoading ? 'Kraunasi...' : 'Patvirtinti'}
              </Button>

              <NavLink to='/login'>
                <button
                  type='button'
                  className='btn btn-primary'
                  style={{ margin: '4px 5px 4px' }}
                >
                  Atgal
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
                  <strong>Kažkas atsitiko!</strong> Toks vartuotojas jau yra,
                  patikrinkite įvestus duomenys...
                </div>
              </div>
            )}
          </form>
        </div>
      </animated.div>
    </AbsoluteWrapper>
  );
};

export default withRouter(SignUpform);
