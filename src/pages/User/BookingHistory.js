import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../store/slices/bookingSlice';
import Button from '../../components/UI/Button';

const BookingHistory = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const getBookingStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSlotTypeIcon = (type) => {
    switch (type) {
      case 'VIP':
        return '👑';
      case 'HANDICAPPED':
        return '♿';
      case 'ELECTRIC_VEHICLE':
        return '🔌';
      default:
        return '🚗';
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleDateString();
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInHours = (end - start) / (1000 * 60 * 60);
    return Math.round(diffInHours * 10) / 10; // Round to 1 decimal place
  };

  const canCancel = (booking) => {
    const startTime = new Date(booking.startTime);
    const now = new Date();
    const hoursUntilStart = (startTime - now) / (1000 * 60 * 60);
    return booking.status === 'CONFIRMED' && hoursUntilStart > 2; // Can cancel if more than 2 hours before start
  };

  const handleCancelBooking = (bookingId) => {
    // Implement cancel booking logic
    console.log('Cancel booking:', bookingId);
  };

  const handleExtendBooking = (bookingId) => {
    // Implement extend booking logic
    console.log('Extend booking:', bookingId);
  };

  const handleCheckIn = (bookingId) => {
    // Implement check-in logic
    console.log('Check in:', bookingId);
  };

  const handleCheckOut = (bookingId) => {
    // Implement check-out logic
    console.log('Check out:', bookingId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking History</h1>
          <p className="text-gray-600 mt-1">View and manage your parking bookings</p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Bookings</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slot & Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time & Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
                      <p className="mt-1 text-sm text-gray-500">Get started by booking your first parking slot.</p>
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.bookingId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Booking #{booking.bookingId}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(booking.createdDate)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">
                            {getSlotTypeIcon(booking.parkingSlot?.slotType)}
                          </span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.parkingSlot?.slotNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.vehicleNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(booking.startTime)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {getDuration(booking.startTime, booking.endTime)} hours
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${booking.totalCost}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${booking.parkingSlot?.hourlyRate}/hr
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {booking.status === 'CONFIRMED' && (
                            <>
                              {canCancel(booking) && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCancelBooking(booking.bookingId)}
                                >
                                  Cancel
                                </Button>
                              )}
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleCheckIn(booking.bookingId)}
                              >
                                Check In
                              </Button>
                            </>
                          )}
                          
                          {booking.status === 'ACTIVE' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleExtendBooking(booking.bookingId)}
                              >
                                Extend
                              </Button>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleCheckOut(booking.bookingId)}
                              >
                                Check Out
                              </Button>
                            </>
                          )}
                          
                          {booking.status === 'COMPLETED' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => console.log('View receipt:', booking.bookingId)}
                            >
                              Receipt
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-semibold text-gray-900">{bookings.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {bookings.filter(b => b.status === 'COMPLETED').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-semibold text-gray-900">
                {bookings.filter(b => b.status === 'ACTIVE').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
