import React, { useEffect, useState } from 'react';
import styles from './ListOfProblems.module.scss';
import ListOfProblemsItem from './ListOfProblemsItem/ListOfProblemsItem';
import axios from 'axios';
import _ from 'lodash';
import Spinner from '../../UI/Spinner/Spinner';

const ListOfProblems = () => {
  const [problems, setProblems] = useState(null);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://newmapofproblems.firebaseio.com/.json`
      );
      const data = await response.data;
      const problemsFromData = Object.entries(response.data).map(([id, item]) =>
        _.chain(item)
          .pick(['adress', 'description', 'type', 'image'])
          .merge({ id })
          .value()
      );
      const problemsFromDataAscending = _.reverse(problemsFromData);
      setProblems(problemsFromDataAscending);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.ListOfProblems}>
      {problems ? (
        problems.map(({ adress, description, type, id, image }) => (
          <ListOfProblemsItem
            adress={adress}
            description={description}
            type={type}
            key={id}
            image={image}
            id={id}
          />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ListOfProblems;
