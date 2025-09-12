import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import webSocketService from '../services/websocket';
import { useDispatch } from 'react-redux';
import { updateSlotAvailability } from '../store/slices/slotSlice';
import { addNotification } from '../store/slices/notificationSlice';

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const isConnectedRef = useRef(false);

  const connect = useCallback(() => {
    if (token && !isConnectedRef.current) {
      webSocketService.connect(token);
      isConnectedRef.current = true;
    }
  }, [token]);

  const disconnect = useCallback(() => {
    if (isConnectedRef.current) {
      webSocketService.disconnect();
      isConnectedRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Connect when token is available
    if (token) {
      connect();
    } else {
      disconnect();
    }

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [token, connect, disconnect]);

  // Handle connection status
  useEffect(() => {
    const handleConnectionStatus = (data) => {
      console.log('WebSocket connection status:', data);
    };

    const handleConnectionError = (error) => {
      console.error('WebSocket connection error:', error);
    };

    webSocketService.on('connection-status', handleConnectionStatus);
    webSocketService.on('connection-error', handleConnectionError);

    return () => {
      webSocketService.off('connection-status', handleConnectionStatus);
      webSocketService.off('connection-error', handleConnectionError);
    };
  }, []);

  // Handle slot updates
  useEffect(() => {
    const handleSlotUpdate = (data) => {
      console.log('Received slot update:', data);
      if (data.slotId && data.isAvailable !== undefined) {
        dispatch(updateSlotAvailability({
          slotId: data.slotId,
          isAvailable: data.isAvailable
        }));
      }
    };

    webSocketService.on('slot-update', handleSlotUpdate);

    return () => {
      webSocketService.off('slot-update', handleSlotUpdate);
    };
  }, [dispatch]);

  // Handle notifications
  useEffect(() => {
    const handleNotification = (notification) => {
      console.log('Received notification:', notification);
      dispatch(addNotification(notification));
    };

    webSocketService.on('notification', handleNotification);

    return () => {
      webSocketService.off('notification', handleNotification);
    };
  }, [dispatch]);

  return {
    isConnected: isConnectedRef.current,
    connect,
    disconnect,
    emit: webSocketService.emitToServer.bind(webSocketService),
    on: webSocketService.on.bind(webSocketService),
    off: webSocketService.off.bind(webSocketService),
    subscribeToSlotUpdates: webSocketService.subscribeToSlotUpdates.bind(webSocketService),
    unsubscribeFromSlotUpdates: webSocketService.unsubscribeFromSlotUpdates.bind(webSocketService),
    subscribeToUserUpdates: webSocketService.subscribeToUserUpdates.bind(webSocketService),
    unsubscribeFromUserUpdates: webSocketService.unsubscribeFromUserUpdates.bind(webSocketService),
  };
};

export default useWebSocket;
