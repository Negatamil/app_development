import { io } from 'socket.io-client';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
  }

  connect(token) {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8080';
    
    this.socket = io(wsUrl, {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.isConnected = true;
      this.emit('connection-status', { connected: true });
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      this.isConnected = false;
      this.emit('connection-status', { connected: false });
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.isConnected = false;
      this.emit('connection-error', error);
    });

    // Handle slot updates
    this.socket.on('slot-update', (data) => {
      console.log('Slot update received:', data);
      this.emit('slot-update', data);
    });

    // Handle booking updates
    this.socket.on('booking-update', (data) => {
      console.log('Booking update received:', data);
      this.emit('booking-update', data);
    });

    // Handle notifications
    this.socket.on('notification', (data) => {
      console.log('Notification received:', data);
      this.emit('notification', data);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Event emitter functionality
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  // Socket.io specific methods
  emitToServer(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket not connected, cannot emit event:', event);
    }
  }

  // Join room for specific updates
  joinRoom(roomName) {
    this.emitToServer('join-room', roomName);
  }

  leaveRoom(roomName) {
    this.emitToServer('leave-room', roomName);
  }

  // Specific methods for parking system
  subscribeToSlotUpdates(facilityId) {
    this.joinRoom(`facility-${facilityId}`);
  }

  unsubscribeFromSlotUpdates(facilityId) {
    this.leaveRoom(`facility-${facilityId}`);
  }

  subscribeToUserUpdates(userId) {
    this.joinRoom(`user-${userId}`);
  }

  unsubscribeFromUserUpdates(userId) {
    this.leaveRoom(`user-${userId}`);
  }

  // Request real-time data
  requestSlotUpdates(facilityId) {
    this.emitToServer('request-slot-updates', { facilityId });
  }

  requestBookingUpdates(userId) {
    this.emitToServer('request-booking-updates', { userId });
  }
}

// Create singleton instance
const webSocketService = new WebSocketService();

export default webSocketService;
