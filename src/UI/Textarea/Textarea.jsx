import React from 'react';

const Textarea = ({
  errors,
  label,
  type,
  placeholder,
  name,
  refForForm,
  small,
  children
}) => {
  return (
    <div className={errors ? 'form-group has-danger' : 'form-group'}>
      <label hmlfor={name}>{label}</label>
      <textarea
        type={type}
        className={errors ? 'form-control is-invalid' : 'form-control'}
        id={name}
        placeholder={placeholder}
        name={name}
        ref={refForForm}
      />
      <div className='invalid-feedback'>{children}</div>
      <small id={`${name} ${'Help'} `} className='form-text text-muted'>
        {small}
      </small>
    </div>
  );
};

export default Textarea;
