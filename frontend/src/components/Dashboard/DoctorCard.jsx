const DoctorCard = ({ doctor, setSelectedDoctor }) => {
    return (
      <div className="border p-4 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold">{doctor.fullName}</h4>
        <p>Specialization: {doctor.specialization}</p>
        <p>Experience: {doctor.experience} years</p>
        <button 
          onClick={() => setSelectedDoctor(doctor)} 
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Book Appointment
        </button>
      </div>
    );
  };
  
  export default DoctorCard;
  