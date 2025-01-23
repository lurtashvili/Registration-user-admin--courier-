import React from 'react';

const FormField = ({ label, type, error, ...props }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '5px' }}>
      {label}
      <input type={type} {...props} style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }} />
    </label>
    {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
  </div>
);

export default FormField;
