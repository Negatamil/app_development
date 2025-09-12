# Parking Pro - Frontend

A modern React.js frontend for the Parking Slot Booking System with TailwindCSS, Redux Toolkit, and comprehensive role-based access control.

## Features

### 🚗 Core Functionality
- **User Authentication**: Secure login/registration with JWT tokens
- **Slot Booking**: Real-time slot availability and booking management
- **Payment Processing**: Integrated payment system with multiple payment methods
- **Booking History**: Complete booking management and history tracking
- **User Profiles**: Comprehensive user profile management

### 👥 Role-Based Access
- **Regular Users**: Book slots, manage bookings, make payments
- **Administrators**: Full system management, user management, analytics
- **Facility Managers**: Manage facilities, view analytics, slot management
- **Security Personnel**: Monitor bookings, validate access

### 📱 Modern UI/UX
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Real-time Updates**: Live slot availability and notifications
- **Interactive Components**: Modern modals, forms, and data tables
- **Accessibility**: WCAG compliant components and navigation

## Tech Stack

- **Frontend Framework**: React 18 with Hooks
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router v6 with protected routes
- **Styling**: TailwindCSS with custom design system
- **HTTP Client**: Axios with interceptors
- **Real-time**: Socket.io client for live updates
- **Charts**: Recharts for analytics visualization
- **Testing**: Jest with React Testing Library

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Booking/        # Booking-specific components
│   ├── Layout/         # Layout components (Navbar, Sidebar)
│   ├── Notifications/  # Notification system
│   └── UI/             # Generic UI components
├── pages/              # Page components
│   ├── Admin/          # Admin-specific pages
│   ├── Auth/           # Login/Register pages
│   ├── Manager/        # Manager-specific pages
│   ├── Security/       # Security-specific pages
│   └── User/           # User-specific pages
├── services/           # API services and utilities
│   └── api/           # API client configurations
├── store/              # Redux store and slices
│   └── slices/        # Redux state slices
└── utils/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd parking-booking-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your backend API URL:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

   The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build/` directory.

## API Integration

The frontend is designed to work with the Spring Boot backend. Key API endpoints include:

- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **Bookings**: `/api/bookings/*`
- **Slots**: `/api/slots/*`
- **Payments**: `/api/payments/*`
- **Users**: `/api/users/*`
- **Notifications**: `/api/notifications/*`

## Authentication & Authorization

### JWT Token Management
- Tokens are stored in localStorage
- Automatic token refresh handling
- Role-based route protection
- API request authentication headers

### User Roles
- **USER**: Basic booking and payment functionality
- **ADMIN**: Full system administration access
- **MANAGER**: Facility management and analytics
- **SECURITY**: Booking validation and access control

## Key Features

### Booking System
- Real-time slot availability
- Advanced filtering and search
- Booking confirmation and management
- Automatic cost calculation
- Extension and cancellation support

### Payment Integration
- Multiple payment methods (Credit Card, Digital Wallet, Cash)
- Secure payment processing
- Payment history and receipts
- Refund management

### Analytics & Reporting
- Real-time dashboard metrics
- Booking statistics and trends
- Revenue tracking
- Slot utilization analytics

### Notifications
- Real-time notification system
- Email and SMS notifications
- Booking reminders
- Payment confirmations

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

### Code Style

The project follows modern React best practices:
- Functional components with hooks
- Custom hooks for reusable logic
- TypeScript-style prop validation
- Consistent file naming conventions

### State Management

Redux Toolkit is used for global state management with the following slices:
- **authSlice**: Authentication state and user data
- **bookingSlice**: Booking management and history
- **slotSlice**: Parking slot data and availability
- **notificationSlice**: Notification system

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

## Roadmap

- [ ] Real-time WebSocket integration
- [ ] Advanced analytics with charts
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced reporting features
- [ ] Integration with external payment gateways
- [ ] QR code generation for bookings
- [ ] Email templates and notifications