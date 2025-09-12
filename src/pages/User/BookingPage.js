import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSlots } from '../../store/slices/slotSlice';
import { createBooking, clearBookingSuccess } from '../../store/slices/bookingSlice';
import SlotCard from '../../components/Booking/SlotCard';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Toast from '../../components/UI/Toast';

const BookingPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { slots, availableSlots, loading: slotsLoading } = useSelector((state) => state.slots);
  const { creating: bookingLoading, bookingSuccess, error: bookingError } = useSelector((state) => state.bookings);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    vehicleNumber: '',
    startTime: '',
    endTime: '',
    duration: 1,
  });
  const [formErrors, setFormErrors] = useState({});
  const [filter, setFilter] = useState({
    slotType: 'ALL',
    floor: 'ALL',
    priceRange: 'ALL',
  });

  useEffect(() => {
    dispatch(fetchSlots());
  }, [dispatch]);

  // Clear success message when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearBookingSuccess());
    };
  }, [dispatch]);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setBookingForm(prev => ({
      ...prev,
      startTime: new Date().toISOString().slice(0, 16),
    }));
    setShowBookingModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }

    // Auto-calculate end time when duration changes
    if (name === 'duration' && bookingForm.startTime) {
      const startTime = new Date(bookingForm.startTime);
      const endTime = new Date(startTime.getTime() + parseInt(value) * 60 * 60 * 1000);
      setBookingForm(prev => ({
        ...prev,
        endTime: endTime.toISOString().slice(0, 16),
      }));
    }

    // Auto-calculate end time when start time changes
    if (name === 'startTime' && bookingForm.duration) {
      const startTime = new Date(value);
      const endTime = new Date(startTime.getTime() + parseInt(bookingForm.duration) * 60 * 60 * 1000);
      setBookingForm(prev => ({
        ...prev,
        endTime: endTime.toISOString().slice(0, 16),
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!bookingForm.vehicleNumber.trim()) {
      errors.vehicleNumber = 'Vehicle number is required';
    }

    if (!bookingForm.startTime) {
      errors.startTime = 'Start time is required';
    } else if (new Date(bookingForm.startTime) < new Date()) {
      errors.startTime = 'Start time cannot be in the past';
    }

    if (!bookingForm.endTime) {
      errors.endTime = 'End time is required';
    } else if (new Date(bookingForm.endTime) <= new Date(bookingForm.startTime)) {
      errors.endTime = 'End time must be after start time';
    }

    if (!bookingForm.duration || bookingForm.duration < 1) {
      errors.duration = 'Duration must be at least 1 hour';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitBooking = async () => {
    if (!validateForm()) return;

    const bookingData = {
      userId: user.id,
      slotId: selectedSlot.slotId,
      vehicleNumber: bookingForm.vehicleNumber,
      startTime: new Date(bookingForm.startTime).toISOString(),
      endTime: new Date(bookingForm.endTime).toISOString(),
      totalCost: selectedSlot.hourlyRate * bookingForm.duration,
      status: 'CONFIRMED',
    };

    try {
      await dispatch(createBooking(bookingData)).unwrap();
      setShowBookingModal(false);
      setSelectedSlot(null);
      setBookingForm({
        vehicleNumber: '',
        startTime: '',
        endTime: '',
        duration: 1,
      });
      // Success message will be shown via Redux state
    } catch (error) {
      // Error is handled by Redux
    }
  };

  const getFilteredSlots = () => {
    let filtered = availableSlots;

    if (filter.slotType !== 'ALL') {
      filtered = filtered.filter(slot => slot.slotType === filter.slotType);
    }

    if (filter.floor !== 'ALL') {
      filtered = filtered.filter(slot => slot.floor.toString() === filter.floor);
    }

    if (filter.priceRange !== 'ALL') {
      const [min, max] = filter.priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(slot => slot.hourlyRate >= min && slot.hourlyRate <= max);
      } else {
        filtered = filtered.filter(slot => slot.hourlyRate >= min);
      }
    }

    return filtered;
  };

  const filteredSlots = getFilteredSlots();

  const getSlotTypes = () => {
    const types = [...new Set(slots.map(slot => slot.slotType))];
    return types;
  };

  const getFloors = () => {
    const floors = [...new Set(slots.map(slot => slot.floor))];
    return floors.sort();
  };

  const calculateTotalCost = () => {
    if (!selectedSlot || !bookingForm.duration) return 0;
    return selectedSlot.hourlyRate * bookingForm.duration;
  };

  return (
    <>
      {/* Toast Notifications */}
      {bookingSuccess && (
        <Toast
          message="Booking confirmed successfully! Your parking slot has been reserved."
          type="success"
          onClose={() => dispatch(clearBookingSuccess())}
          duration={5000}
        />
      )}
      
      {bookingError && (
        <Toast
          message={bookingError}
          type="error"
          onClose={() => dispatch(clearBookingSuccess())}
          duration={5000}
        />
      )}

      <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Book a Parking Slot</h1>
          <p className="text-gray-600 mt-1">Select and book your preferred parking slot</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Slots</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slot Type</label>
            <select
              value={filter.slotType}
              onChange={(e) => setFilter(prev => ({ ...prev, slotType: e.target.value }))}
              className="input"
            >
              <option value="ALL">All Types</option>
              {getSlotTypes().map(type => (
                <option key={type} value={type}>{type.replace('_', ' ')}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
            <select
              value={filter.floor}
              onChange={(e) => setFilter(prev => ({ ...prev, floor: e.target.value }))}
              className="input"
            >
              <option value="ALL">All Floors</option>
              {getFloors().map(floor => (
                <option key={floor} value={floor}>Floor {floor}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <select
              value={filter.priceRange}
              onChange={(e) => setFilter(prev => ({ ...prev, priceRange: e.target.value }))}
              className="input"
            >
              <option value="ALL">All Prices</option>
              <option value="0-5">$0 - $5/hr</option>
              <option value="5-10">$5 - $10/hr</option>
              <option value="10-20">$10 - $20/hr</option>
              <option value="20">$20+/hr</option>
            </select>
          </div>
        </div>
      </div>

      {/* Available Slots Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Available Slots ({filteredSlots.length})
          </h2>
          {slotsLoading && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
          )}
        </div>

        {slotsLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSlots.map((slot) => (
              <SlotCard
                key={slot.slotId}
                slot={slot}
                onSelect={handleSlotSelect}
                onViewDetails={(slot) => console.log('View details:', slot)}
              />
            ))}
          </div>
        )}

        {!slotsLoading && filteredSlots.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No slots found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setSelectedSlot(null);
        }}
        title="Confirm Booking"
        size="lg"
      >
        {selectedSlot && (
          <div className="space-y-6">
            {/* Selected Slot Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Selected Slot</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{selectedSlot.slotNumber}</p>
                  <p className="text-sm text-gray-600">{selectedSlot.slotType.replace('_', ' ')}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">${selectedSlot.hourlyRate}/hr</p>
                  <p className="text-sm text-gray-600">{selectedSlot.location}</p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-4">
              <Input
                name="vehicleNumber"
                label="Vehicle Number"
                placeholder="Enter vehicle number"
                value={bookingForm.vehicleNumber}
                onChange={handleInputChange}
                error={formErrors.vehicleNumber}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="startTime"
                  label="Start Time"
                  type="datetime-local"
                  value={bookingForm.startTime}
                  onChange={handleInputChange}
                  error={formErrors.startTime}
                  required
                />

                <Input
                  name="endTime"
                  label="End Time"
                  type="datetime-local"
                  value={bookingForm.endTime}
                  onChange={handleInputChange}
                  error={formErrors.endTime}
                  required
                />
              </div>

              <Input
                name="duration"
                label="Duration (hours)"
                type="number"
                min="1"
                max="24"
                value={bookingForm.duration}
                onChange={handleInputChange}
                error={formErrors.duration}
                required
              />
            </div>

            {/* Cost Summary */}
            <div className="bg-primary-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Booking Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Slot:</span>
                  <span className="font-medium">{selectedSlot.slotNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{bookingForm.duration} hours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rate:</span>
                  <span className="font-medium">${selectedSlot.hourlyRate}/hour</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-primary-200 pt-2">
                  <span>Total Cost:</span>
                  <span>${calculateTotalCost().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowBookingModal(false)}
                disabled={bookingLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitBooking}
                loading={bookingLoading}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </Modal>
      </div>
    </>
  );
};

export default BookingPage;
