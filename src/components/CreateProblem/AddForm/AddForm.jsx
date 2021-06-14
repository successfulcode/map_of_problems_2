import React, { useState } from 'react';
import styles from './AddForm.module.scss';
import Button from '../../../UI/Button/Button';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import Input from '../../../UI/Input/Input';
import Textarea from '../../../UI/Textarea/Textarea';
import UploadImage from './UploadImage';
import ShowImages from './ShowImages/ShowImages';

const AddForm = ({ problemsTypes, addProblem }) => {
  const { watch, register, setValue, handleSubmit, errors } = useForm();
  const [abort, setAbort] = useState(false);
  const onSubmit = (data) => addProblem(data);

  const redirectItem = () => {
    if (abort) {
      return <Redirect to='/' />;
    }
  };

  const images = watch('image');

  return (
    <>
      {redirectItem()}
      <div className={styles.AddForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label hmlfor='typeOfProblem1'>Problemos rūšys</label>
            <select
              className='form-control'
              id='typeOfProblem1'
              name='type'
              ref={register}
            >
              {problemsTypes.map(({ id, name }) => (
                <option key={id} disabled={id === 'init'}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label='Adresas'
            type='text'
            errors={errors.adress}
            placeholder='Pvz. Jaunystės g. 1'
            name='adress'
            refForForm={register({ required: true, maxLength: 3 })}
            small='Įveskite tikslu problemos adresą.'
          >
            {errors.adress?.type === 'required' &&
              'Laukas turi būti užpildytas'}
            {errors.adress?.type === 'maxLength' &&
              'Maksimalus symbolių skaičius yra 3'}
          </Input>

          <Textarea
            label='Problemos aprašymas'
            type='description'
            errors={errors.description}
            placeholder='Pvz. Nedega šviestuvas šalia tako.'
            name='description'
            refForForm={register({ required: true, maxLength: 3 })}
            small='Įveskite tikslu problemos aprašymą.'
          >
            {errors.description?.type === 'required' &&
              'Laukas turi būti užpildytas'}
            {errors.description?.type === 'maxLength' &&
              `Maksimalus symbolių skaičius yra 3`}
          </Textarea>

          <UploadImage
            setValue={setValue}
            register={register}
            images={images}
          />

          <div className={styles.buttonsItems}>
            <Button className='btn btn-outline-success' type='submit'>
              Patvirtinti
            </Button>
            <Button
              className='btn btn-outline-danger'
              type='button'
              onClick={() => setAbort(true)}
            >
              Atšaukti
            </Button>
          </div>
          <div>
            <ShowImages setValue={setValue} images={images} />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddForm;
