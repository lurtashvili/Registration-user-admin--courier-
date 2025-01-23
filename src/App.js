import React, { useState } from 'react';
import DynamicForm from './DynamicForm';

const roles = {
  Admin: [
    { name: 'firstName', label: 'First Name', type: 'text', optional: false },
    { name: 'lastName', label: 'Last Name', type: 'text', optional: true },
    { name: 'pid', label: 'PID', type: 'text', optional: false },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', optional: false },
    { name: 'email', label: 'Email', type: 'email', optional: false },
    { name: 'password', label: 'Password', type: 'password', optional: false },
    { name: 'profileImage', label: 'Profile Image', type: 'file', optional: true },
  ],
  User: [
    { name: 'firstName', label: 'First Name', type: 'text', optional: false },
    { name: 'lastName', label: 'Last Name', type: 'text', optional: true },
    { name: 'pid', label: 'PID', type: 'text', optional: false },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', optional: false },
    { name: 'email', label: 'Email', type: 'email', optional: false },
    { name: 'password', label: 'Password', type: 'password', optional: false },
    { name: 'profileImage', label: 'Profile Image', type: 'file', optional: true },
    { name: 'address.lng', label: 'Longitude', type: 'number', optional: true },
    { name: 'address.lat', label: 'Latitude', type: 'number', optional: true },
  ],
  Courier: [
    { name: 'firstName', label: 'First Name', type: 'text', optional: false },
    { name: 'lastName', label: 'Last Name', type: 'text', optional: true },
    { name: 'pid', label: 'PID', type: 'text', optional: false },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', optional: false },
    { name: 'email', label: 'Email', type: 'email', optional: false },
    { name: 'password', label: 'Password', type: 'password', optional: false },
    { name: 'profileImage', label: 'Profile Image', type: 'file', optional: true },
    { name: 'vehicle', label: 'Vehicle Type', type: 'text', optional: false },
    ...['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      .map((day) => [
        { name: `workingDays.${day}.startHours`, label: `${day} Start Hours`, type: 'time', optional: true },
        { name: `workingDays.${day}.endHours`, label: `${day} End Hours`, type: 'time', optional: true },
      ])
      .flat(),
  ],
};

function App() {
  const [role, setRole] = useState('Admin');
  const [registrations, setRegistrations] = useState({
    Admin: [],
    User: [],
    Courier: [],
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleRegistration = (data) => {
    if (editIndex !== null) {
      setRegistrations((prev) => ({
        ...prev,
        [role]: prev[role].map((item, index) => (index === editIndex ? data : item)),
      }));
      setEditIndex(null);
    } else {
      setRegistrations((prev) => ({
        ...prev,
        [role]: [...prev[role], data],
      }));
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleRemove = (index) => {
    setRegistrations((prev) => ({
      ...prev,
      [role]: prev[role].filter((_, i) => i !== index),
    }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Registration Form</h1>
      <label>
        Select Role:
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ margin: '10px' }}>
          {Object.keys(roles).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>

      <DynamicForm
        role={role}
        fields={roles[role]}
        onSubmit={handleRegistration}
        initialValues={editIndex !== null ? registrations[role][editIndex] : null}
      />

      <div style={{ marginTop: '30px' }}>
        <h2>{role} Registrations</h2>
        {registrations[role].length > 0 ? (
  <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
    {registrations[role].map((reg, index) => (
      <div
        key={index}
        style={{
          marginBottom: '10px',
          padding: '10px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {Object.entries(reg).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> 
              {key === 'profileImage' && value ? (
                <img
                  src={URL.createObjectURL(value)}
                  alt="Profile"
                  style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                />
              ) : (
                typeof value === 'object' ? JSON.stringify(value) : value
              )}
            </p>
          ))}
        </div>
        <div>
          <button
            onClick={() => handleEdit(index)}
            style={{ marginRight: '10px', padding: '5px 10px' }}
          >
            Edit
          </button>
          <button
            onClick={() => handleRemove(index)}
            style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white' }}
          >
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>No registrations found for {role}.</p>
)}
      </div>
    </div>
  );
  
}


export default App;
