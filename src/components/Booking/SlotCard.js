import React from 'react';
import Button from '../UI/Button';

const SlotCard = ({
  slot,
  isSelected = false,
  onSelect,
  onViewDetails,
  showActions = true,
  className = '',
}) => {
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

  const getSlotTypeColor = (type) => {
    switch (type) {
      case 'VIP':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'HANDICAPPED':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'ELECTRIC_VEHICLE':
        return 'bg-green-100 border-green-300 text-green-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getAvailabilityStatus = (isAvailable) => {
    return isAvailable 
      ? { text: 'Available', color: 'text-green-600 bg-green-100' }
      : { text: 'Occupied', color: 'text-red-600 bg-red-100' };
  };

  const status = getAvailabilityStatus(slot.isAvailable);

  return (
    <div
      className={`
        card p-4 transition-all duration-200 cursor-pointer
        ${isSelected ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-md'}
        ${!slot.isAvailable ? 'opacity-75' : ''}
        ${className}
      `}
      onClick={() => slot.isAvailable && onSelect && onSelect(slot)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getSlotTypeIcon(slot.slotType)}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{slot.slotNumber}</h3>
            <p className="text-sm text-gray-500">{slot.location || `Floor ${slot.floor}`}</p>
          </div>
        </div>
        
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
          {status.text}
        </span>
      </div>

      {/* Slot Type Badge */}
      <div className="mb-3">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSlotTypeColor(slot.slotType)}`}>
          {slot.slotType.replace('_', ' ')}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Hourly Rate:</span>
          <span className="font-medium">${slot.hourlyRate}/hr</span>
        </div>
        
        {slot.section && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Section:</span>
            <span className="font-medium">{slot.section}</span>
          </div>
        )}
        
        {slot.features && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Features:</span>
            <span className="font-medium text-xs">{slot.features}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex space-x-2">
          {slot.isAvailable ? (
            <Button
              variant={isSelected ? 'secondary' : 'primary'}
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onSelect && onSelect(slot);
              }}
            >
              {isSelected ? 'Selected' : 'Select'}
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              disabled
            >
              Unavailable
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails && onViewDetails(slot);
            }}
          >
            Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default SlotCard;
