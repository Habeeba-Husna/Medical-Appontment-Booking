const NotificationList = ({ notifications }) => {
    return (
      <section className="mt-5">
        <h3 className="text-xl font-semibold">Notifications</h3>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((note) => (
              <li key={note.id} className="border p-3 mt-2 rounded-lg">
                {note.message}
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications at the moment.</p>
        )}
      </section>
    );
  };
  
  export default NotificationList;
  