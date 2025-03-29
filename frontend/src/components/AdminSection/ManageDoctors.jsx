import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/admin/doctors');
        if (response.data && response.data.doctors) {
          setDoctors(response.data.doctors);
        } else {
          setDoctors([]);
        }
      } catch (err) {
        setError('Failed to fetch doctors. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const endpoint = `/api/admin/${action}-doctor/${id}`;
      await axios.put(endpoint);
      alert(`Doctor ${action}d successfully`);
      setDoctors((prevDoctors) => prevDoctors.filter((doc) => doc._id !== id));
    } catch (err) {
      alert(`Failed to ${action} doctor. Please try again.`);
    }
  };

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>{error}</p>;
  if (!doctors || doctors.length === 0) return <p>No doctors available</p>;

  return (
    <div>
      <h2>Manage Doctors</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.fullName}</td>
              <td>{doctor.email}</td>
              <td>
                <button onClick={() => handleAction(doctor._id, 'verify')}>Verify</button>
                <button onClick={() => handleAction(doctor._id, 'approve')}>Approve</button>
                <button onClick={() => handleAction(doctor._id, 'delete')}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDoctors;
