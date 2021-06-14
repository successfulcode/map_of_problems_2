import React, { useEffect, useState } from 'react';
import styles from './ListOfProblemsItem.module.scss';
import no_image from '../../../assets/no_image.png';
import SmallSpinner from '../../../UI/SmallSpinner/SmallSpinner';
import { NavLink } from 'react-router-dom';

const ListOfProblemsItem = ({ type, description, image, id, adress }) => {
  const [loaded, setLoaded] = useState(false);
  const [loadedError, setLoadedError] = useState(false);

  let str1 = description || '';
  useEffect(() => {
    if (str1.length > 40) str1 = str1.substring(0, 40);
  }, [description]);

  const handleLoading = () => {
    setLoaded(true);
  };
  const handleLoadingError = () => {
    setLoadedError(true);
  };

  return (
    <div className={styles.ListOfProblemsItem}>
      <NavLink to={`/problem/${id}`}>
        <div className='card mb-3'>
          <h6
            className='card-header'
            style={{ textAlign: 'center', padding: '5px' }}
          >
            {type}
          </h6>
          <div className={`${'card-body'} ${styles.cardBody}`}>
            <span>{!loaded && <SmallSpinner />}</span>
            <img
              className={`${!loaded && styles.displayNone}`}
              src={image ? !loadedError && image[0].url : no_image}
              alt='Card image'
              onLoad={handleLoading}
              onError={handleLoadingError}
            />
          </div>
          <div className='card-body' style={{ padding: '0px' }}>
            <p className={`${'card-text'} ${styles.cardText}`}>{`${str1} ${
              str1.length > 40 && '...'
            }`}</p>
          </div>
          <div
            className='card-footer text-muted'
            style={{ textAlign: 'center', padding: '5px' }}
          >
            2 days ago
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default ListOfProblemsItem;
