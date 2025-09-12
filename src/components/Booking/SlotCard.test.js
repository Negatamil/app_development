import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SlotCard from './SlotCard';

// Mock slot data
const mockSlot = {
  slotId: 1,
  slotNumber: 'A-01',
  slotType: 'REGULAR',
  hourlyRate: 5.00,
  isAvailable: true,
  location: 'Ground Floor',
  floor: 1,
  section: 'A',
  features: 'Near elevator',
};

describe('SlotCard Component', () => {
  test('renders slot information correctly', () => {
    render(
      <SlotCard 
        slot={mockSlot}
        onSelect={jest.fn()}
        onViewDetails={jest.fn()}
      />
    );

    expect(screen.getByText('A-01')).toBeInTheDocument();
    expect(screen.getByText('Ground Floor')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('$5/hr')).toBeInTheDocument();
    expect(screen.getByText('Regular')).toBeInTheDocument();
  });

  test('shows occupied status when slot is not available', () => {
    const occupiedSlot = { ...mockSlot, isAvailable: false };
    
    render(
      <SlotCard 
        slot={occupiedSlot}
        onSelect={jest.fn()}
        onViewDetails={jest.fn()}
      />
    );

    expect(screen.getByText('Occupied')).toBeInTheDocument();
    expect(screen.getByText('Unavailable')).toBeInTheDocument();
  });

  test('calls onSelect when select button is clicked', () => {
    const mockOnSelect = jest.fn();
    
    render(
      <SlotCard 
        slot={mockSlot}
        onSelect={mockOnSelect}
        onViewDetails={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('Select'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockSlot);
  });

  test('calls onViewDetails when details button is clicked', () => {
    const mockOnViewDetails = jest.fn();
    
    render(
      <SlotCard 
        slot={mockSlot}
        onSelect={jest.fn()}
        onViewDetails={mockOnViewDetails}
      />
    );

    fireEvent.click(screen.getByText('Details'));
    expect(mockOnViewDetails).toHaveBeenCalledWith(mockSlot);
  });

  test('shows correct slot type icon and styling', () => {
    const vipSlot = { ...mockSlot, slotType: 'VIP' };
    
    render(
      <SlotCard 
        slot={vipSlot}
        onSelect={jest.fn()}
        onViewDetails={jest.fn()}
      />
    );

    expect(screen.getByText('👑')).toBeInTheDocument();
    expect(screen.getByText('VIP')).toBeInTheDocument();
  });

  test('disables select button when slot is occupied', () => {
    const occupiedSlot = { ...mockSlot, isAvailable: false };
    
    render(
      <SlotCard 
        slot={occupiedSlot}
        onSelect={jest.fn()}
        onViewDetails={jest.fn()}
      />
    );

    const selectButton = screen.getByText('Unavailable');
    expect(selectButton).toBeDisabled();
  });

  test('shows selected state when isSelected is true', () => {
    render(
      <SlotCard 
        slot={mockSlot}
        isSelected={true}
        onSelect={jest.fn()}
        onViewDetails={jest.fn()}
      />
    );

    expect(screen.getByText('Selected')).toBeInTheDocument();
  });
});
