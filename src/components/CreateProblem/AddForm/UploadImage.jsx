import React, { useState, useEffect } from 'react';
import firebaseApp from '../../../firease/firebase';

const UploadImage = ({ setValue, register, images }) => {
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const storage = firebaseApp.storage();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  useEffect(() => {
    register({ name: 'image' });
    if (image) {
      handleUpload();
    }

    return setImage(null);
  }, [image]);

  useEffect(() => {
    setValue('image', imgUrl);
  }, [imgUrl]);

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            const newUrl = { img: `img${imgUrl.length + 1}`, url };
            setImgUrl([...images, newUrl]);
            setValue('image', [...images, newUrl]);
            setImage(null);
            setProgress(0);
          });
      }
    );
  };
  console.log('imgUrl', imgUrl);
  return (
    <div className='form-group'>
      <div className='progress'>
        <div
          className='progress-bar progress-bar-striped progress-bar-animated'
          role='progressbar'
          aria-valuenow={progress}
          aria-valuemin='0'
          aria-valuemax='100'
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <label hmlfor='exampleInputFile'>Pridėti nuotraukas</label>
      <input
        type='file'
        className='form-control-file'
        id='exampleInputFile'
        name='picture'
        onChange={handleChange}
      />
      <small id='fileHelp' className='form-text text-muted'>
        Pridėkite nuotrauka, kurioje aiškaiai matosi problemos vieta ir pobūdis.
      </small>
    </div>
  );
};

export default UploadImage;
