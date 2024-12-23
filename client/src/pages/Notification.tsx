import { useGetUserNotificationsQuery, useMarkNotificationAsReadMutation, useDeleteNotificationMutation } from '../services/notificationApi'; // Adjust the path as necessary
import { jwtDecode } from 'jwt-decode';
import { INotification } from '../types/notification';

const Notification = () => {

  const token = localStorage.getItem('token');

  // Decode the token to get userId
  let userId;
  if (token) {
    const decodedToken:any = jwtDecode(token);
    userId = decodedToken.payload.userId; // Extract userId from the token
  }

  // Fetch notifications for the user
  const { data: notifications, error, isLoading, refetch } = useGetUserNotificationsQuery(userId);
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  console.log('Notifications: ', notifications);

  // Handle marking a notification as read
  const handleMarkAsRead = async (id:any) => {
    try {
      await markNotificationAsRead(id).unwrap();
      alert('Notification marked as read');
      refetch(); // Refetch the notifications
    } catch (error) {
      console.error('Failed to mark notification as read: ', error);
    }
  };

  // Handle deleting a notification
  const handleDeleteNotification = async (id:any) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this notification?');
    if (confirmDelete) {
      try {
        await deleteNotification(id).unwrap();
        alert('Notification deleted successfully');
        refetch(); // Refetch the notifications
      } catch (error) {
        console.error('Failed to delete notification: ', error);
      }
    }
  };

  // Handle loading and error states
  if (isLoading) return <div>Loading notifications...</div>;
  if (error) {
    console.log('Error fetching notifications: ', error);
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification: INotification) => (
            <div
              key={notification._id}
              className={`p-4 rounded-lg shadow-md border ${notification.isRead ? 'bg-gray-100' : 'bg-white'} transition duration-300`}
            >
              <p className="text-lg">{notification.message}</p>
              <p className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
              <div className="mt-2 flex space-x-2">
                {!notification.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(notification._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDeleteNotification(notification._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No notifications available.</div>
        )}
      </div>
    </div>
  );
};

export default Notification;