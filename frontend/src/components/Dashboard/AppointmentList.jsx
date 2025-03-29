const AppointmentList = ({ appointments }) => {
    return (
      <section className="mt-5">
        <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
        {appointments.length > 0 ? (
          <ul>
            {appointments.map((appt) => (
              <li key={appt.id} className="border p-3 mt-2 rounded-lg">
                Appointment with Dr. {appt.doctorName} on {appt.date} at {appt.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </section>
    );
  };
  
  export default AppointmentList;
  