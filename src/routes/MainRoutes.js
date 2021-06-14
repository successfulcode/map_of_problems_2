import React, { useContext } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { __RouterContext } from 'react-router';
import {
  CreateProblem,
  ListOfProblems,
  MineProblems,
  ThanksPage,
  MapsItems,
  ThanksForCreatePage,
  ProblemItem,
} from '../components';
import LoginForm from '../components/Auth/LoginForm/LoginForm';
import SignUpform from '../components/Auth/SignUpform/SignUpform';
import Auth from '../components/Auth/Auth';
import { useTransition, animated } from 'react-spring';

const MainRoutes = () => {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: 'translate(100%, 0)' },
    enter: { opacity: 1, transform: 'translate(0%, 0)' },
    leave: { opacity: 0, transform: 'translate(-50%, 0)' },
  });

  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route path='/list' exact render={() => <ListOfProblems />} />
            <Route path='/create' exact render={() => <CreateProblem />} />
            <Route path='/mine' render={() => <MineProblems />} />
            <Route path='/login' exact render={() => <LoginForm />} />
            <Route path='/signup' exact render={() => <SignUpform />} />
            <Route path='/thnx' exact render={() => <ThanksPage />} />
            <Route
              path='/thnxForCreate'
              exact
              render={() => <ThanksForCreatePage />}
            />
            <Route path='/auth' exact render={() => <LoginForm />} />
            <Route path='/maps' exact render={() => <MapsItems />} />
            <Route path='/problem/:problemId' render={() => <ProblemItem />} />
            <Route path='/' exact render={() => <CreateProblem />} />
          </Switch>
        </animated.div>
      ))}
    </>
  );
};

export default withRouter(MainRoutes);
