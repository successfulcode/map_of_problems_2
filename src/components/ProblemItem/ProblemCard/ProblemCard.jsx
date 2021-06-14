import React, { useState, useEffect } from 'react';
import styles from './ProblemCard.module.scss';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ProblemCard = ({ problem: { description, type, adress, image } }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (image.length) {
      const items = image.map((item) => {
        if (item.url) {
          const urlItem = { original: item.url, thumbnail: item.url }; //It is ImageGallery library structure
          return urlItem;
        }
      });
      setImages([...items]);
    }
  }, []);

  console.log('image', images);
  return (
    <div className={`${'card border-light mb-3'} ${styles.ProblemCard}`}>
      <div className='card-header'>{type}</div>
      <div className='card-body'>
        <h4 className='card-title'>{adress}</h4>
        <p className='card-text'>{description}</p>
        <div className={styles.carousel}>
          {images && <ImageGallery items={images} />}
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
