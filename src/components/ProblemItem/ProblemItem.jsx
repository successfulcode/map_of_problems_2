import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import { withRouter, Redirect } from 'react-router';
import styles from './ProblemItem.module.scss';
import ProblemCard from './ProblemCard/ProblemCard';

const ProblemItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [problemItem, setProblemItem] = useState(null);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://newmapofproblems.firebaseio.com/${props.match.params.problemId}.json`
      );
      const data = await response.data;
      setProblemItem(data);
      setIsLoading(false);
      console.log(data);
    } catch (e) {
      setError(
        'Kažkas atsitiko... Mes jau šaliname gedimus... Atsiprašome už nepatogumus!' ||
          e
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!props.match.params.problemId || error) {
    return <Redirect to='/list' />;
  }

  return (
    <div className={styles.ProblemItem}>
      {error ? (
        <div className='alert alert-warning' role='alert'>
          <div className={styles.text}>{error}</div>
          <div>
            <i className={`${'fas fa-tools'} ${styles.image}`} />
          </div>
        </div>
      ) : (
        <>{problemItem ? <ProblemCard problem={problemItem} /> : <Spinner />}</>
      )}
    </div>
  );
};

export default withRouter(ProblemItem);
