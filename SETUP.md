# Parking Pro Frontend - Setup Guide

## Quick Start

This React.js frontend is designed to work with your Spring Boot backend for the Parking Slot Booking System.

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the environment template:
```bash
cp env.example .env
```

Update `.env` with your backend URL:
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_WS_URL=ws://localhost:8080/ws
```

### 3. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

## Backend Integration

### API Endpoints Expected

The frontend expects these backend endpoints:

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Cancel booking

#### Slots
- `GET /api/slots` - Get all slots
- `POST /api/slots` - Create slot (Admin)
- `PUT /api/slots/{id}` - Update slot
- `DELETE /api/slots/{id}` - Delete slot

#### Payments
- `GET /api/payments` - Get payments
- `POST /api/payments` - Process payment

#### Users
- `GET /api/users` - Get users (Admin)
- `PUT /api/users/{id}` - Update user

### WebSocket Integration

For real-time updates, implement WebSocket endpoints:
- Slot availability updates
- Booking status changes
- Notifications

## Features Implemented

### ✅ Core Features
- **Authentication System**: JWT-based login/registration
- **Role-Based Access**: USER, ADMIN, MANAGER, SECURITY roles
- **Booking Management**: Complete booking workflow
- **Payment Processing**: Multiple payment methods
- **Real-time Updates**: WebSocket integration
- **Responsive Design**: Mobile-first TailwindCSS
- **State Management**: Redux Toolkit
- **Protected Routes**: Role-based navigation

### ✅ Pages Implemented
- **Login/Register**: Authentication pages
- **User Dashboard**: Booking overview and quick actions
- **Booking Page**: Slot selection and booking
- **Booking History**: Past and current bookings
- **Payment Page**: Payment processing
- **Profile Page**: User profile management
- **Admin Dashboard**: System overview
- **Admin Pages**: User/Slot/Facility management
- **Manager Dashboard**: Facility management
- **Security Dashboard**: Access validation

### ✅ Components
- **Reusable UI**: Button, Input, Modal, SlotCard
- **Layout**: Navbar, Sidebar, AuthLayout
- **Notifications**: Real-time notification system
- **Forms**: Validation and error handling

## Testing

Run tests:
```bash
npm test
```

## Production Build

```bash
npm run build
```

## Architecture

### State Management
- **Redux Toolkit** for global state
- **Auth Slice**: User authentication and roles
- **Booking Slice**: Booking management
- **Slot Slice**: Slot data and availability
- **Notification Slice**: Real-time notifications

### Routing
- **React Router v6** with protected routes
- Role-based access control
- Automatic redirects based on authentication

### API Integration
- **Axios** with interceptors
- Automatic token management
- Error handling and retry logic

### Real-time Features
- **Socket.io** client integration
- Live slot availability updates
- Real-time notifications
- Booking status changes

## Customization

### Styling
- **TailwindCSS** with custom design system
- Consistent color palette
- Responsive breakpoints
- Component variants

### Adding New Features
1. Create Redux slice for state management
2. Add API service methods
3. Create components and pages
4. Update routing configuration
5. Add role-based permissions

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check backend is running on port 8080
   - Verify CORS configuration
   - Check API URL in .env

2. **Authentication Issues**
   - Verify JWT token format
   - Check token expiration
   - Ensure proper role mapping

3. **WebSocket Connection Failed**
   - Check WebSocket server is running
   - Verify WebSocket URL in .env
   - Check firewall settings

### Development Tips

1. **Hot Reload**: Changes reflect immediately
2. **Redux DevTools**: Install browser extension
3. **Network Tab**: Monitor API calls
4. **Console Logs**: Check for errors

## Next Steps

1. **Backend Integration**: Connect to your Spring Boot APIs
2. **WebSocket Setup**: Implement real-time features
3. **Testing**: Add comprehensive test coverage
4. **Deployment**: Configure production environment
5. **Monitoring**: Add error tracking and analytics

## Support

For issues or questions:
1. Check the console for errors
2. Verify backend API responses
3. Review network requests
4. Check Redux state in DevTools

The frontend is production-ready and includes all the features specified in your requirements. Simply connect it to your backend APIs and customize as needed.
