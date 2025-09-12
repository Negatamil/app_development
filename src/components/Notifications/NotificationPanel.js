import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead, deleteNotification } from '../../store/slices/notificationSlice';

const NotificationPanel = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);
  const [isOpen, setIsOpen] = useState(false);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleDelete = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'BOOKING_CONFIRMED':
        return '✅';
      case 'BOOKING_CANCELLED':
        return '❌';
      case 'PAYMENT_SUCCESS':
        return '💳';
      case 'PAYMENT_FAILED':
        return '⚠️';
      case 'SLOT_AVAILABLE':
        return '🅿️';
      case 'REMINDER':
        return '⏰';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'HIGH') return 'border-l-red-500 bg-red-50';
    if (priority === 'MEDIUM') return 'border-l-yellow-500 bg-yellow-50';
    
    switch (type) {
      case 'BOOKING_CONFIRMED':
      case 'PAYMENT_SUCCESS':
        return 'border-l-green-500 bg-green-50';
      case 'BOOKING_CANCELLED':
      case 'PAYMENT_FAILED':
        return 'border-l-red-500 bg-red-50';
      case 'SLOT_AVAILABLE':
      case 'REMINDER':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200"
      >
        <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 001.414.586H15" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-500 mt-1">{unreadCount} unread notifications</p>
            )}
          </div>

          <div className="divide-y divide-gray-200">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <svg className="h-12 w-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 001.414.586H15" />
                </svg>
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.slice(0, 10).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 ${getNotificationColor(notification.type, notification.priority)} ${
                    !notification.isRead ? 'font-medium' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(notification.createdDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Mark read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 10 && (
            <div className="p-3 border-t border-gray-200">
              <button className="w-full text-sm text-primary-600 hover:text-primary-800 font-medium">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
