import React from 'react';
import styles from './ShowImages.module.scss';

const ShowImages = ({ images, setValue }) => {
  const deleteItem = (img) => {
    const newImages = images.filter((item) => item.img !== img);
    setValue('image', newImages);
  };
  console.log('ShowImages', images);
  return (
    <div className={styles.ShowImages}>
      {images &&
        images.map(({ img, url }) => (
          <div key={img}>
            <img src={url} />
            <span
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => deleteItem(img)}
            >
              DELETE
            </span>
          </div>
        ))}
    </div>
  );
};

export default ShowImages;
