import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormField from './FormField';

const DynamicForm = ({ role, fields, onSubmit, initialValues }) => {
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const schema = yup.object().shape(
    fields.reduce((acc, field) => {
      acc[field.name] = field.optional
        ? yup.string().nullable()
        : yup.string().required(`${field.label} is required`);
      return acc;
    }, {})
  );

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      profileImage: initialValues?.profileImage || [],
    },
  });

  const profileImage = watch('profileImage') || [];

  useEffect(() => {
    if (profileImage && profileImage.length > 0) {
      const file = profileImage[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImagePreview(reader.result);
        console.log('Profile Image Preview Set:', reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImagePreview(null);
    }
  }, [profileImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('profileImage', [file]);
    } else {
      setValue('profileImage', []);
    }
  };

  const submitForm = (data) => {
    const formattedData = {
      ...data,
      profileImage: profileImage.length > 0 ? profileImage[0] : null,
    };
    console.log('profileImage:', profileImage);
    console.log('formattedData:', formattedData);
    onSubmit(formattedData);
    reset({ profileImage: [] });
    setProfileImagePreview(null);
  };

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
      if (initialValues.profileImage) {
        setProfileImagePreview(initialValues.profileImage);
      }
    }
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(submitForm)} style={{ marginTop: '20px' }}>
      <h2>{role} Registration</h2>
      {fields.map((field) => (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          render={({ field: controllerField, fieldState }) => {
            if (field.type === 'file') {
              return (
                <>
                  <label>
                    {field.label}:
                    <input
                      type="file"
                      onChange={(e) => {
                        handleFileChange(e);
                        controllerField.onChange(e.target.files);
                      }}
                      accept="image/*"
                      style={{ marginTop: '5px' }}
                    />
                  </label>
                  {fieldState.error && <p style={{ color: 'red' }}>{fieldState.error.message}</p>}
                </>
              );
            }

            return (
              <FormField
                label={field.label}
                type={field.type}
                error={fieldState.error?.message}
                {...controllerField}
              />
            );
          }}
        />
      ))}
      {profileImagePreview && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <p>Profile Image Preview:</p>
          <img
            src={profileImagePreview}
            alt="Profile Preview"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #ddd',
            }}
          />
        </div>
      )}
      <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
        {initialValues ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};

export default DynamicForm;