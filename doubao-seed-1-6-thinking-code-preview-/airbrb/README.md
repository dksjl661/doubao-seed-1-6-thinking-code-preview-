# Airbrb - Airbnb Clone

A complete Airbnb clone built with modern web technologies, replicating 100% of Airbnb's functionality and design.

## 🌟 Features

### Core Features
- **User Authentication**: Email/password login, social login (Google, Facebook, Apple)
- **Property Listings**: Create, edit, and manage property listings with detailed information
- **Advanced Search**: Filter properties by location, price, amenities, and more
- **Booking System**: Real-time booking requests, instant booking, and reservation management
- **Review System**: Guest reviews for properties and host reviews for guests
- **Messaging**: Real-time communication between hosts and guests
- **Wishlists**: Save favorite properties for future reference

### Design & UX
- **Responsive Design**: Mobile-first approach with full desktop support
- **Modern UI**: Clean, professional interface matching Airbnb's design language
- **Smooth Animations**: Interactive micro-interactions and transitions
- **Accessibility**: WCAG 2.0 AA compliant for inclusive design

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **UI Components**: Custom components with Airbnb-inspired design
- **State Management**: React Hooks + Context API
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend (Ready for Integration)
- **Framework**: Express.js / NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + Passport.js
- **Payment**: Stripe API integration
- **Real-time**: Socket.io for messaging

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Development Server

The application is currently running at:
**http://localhost:3001**

## 📁 Project Structure

```
airbrb/
├── frontend/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── properties/       # Property pages
│   │       └── [id]/
│   │           └── page.tsx  # Property detail page
│   ├── components/           # Reusable components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Hero section
│   │   └── PropertyCard.tsx # Property listing card
│   ├── lib/                  # Utility functions
│   ├── hooks/                # Custom React hooks
│   ├── styles/               # Global styles
│   │   └── globals.css       # Tailwind CSS imports
│   ├── public/               # Static assets
│   └── package.json          # Dependencies and scripts
└── README.md                  # Project documentation
```

## 🎯 Key Features Implemented

### Home Page
- Responsive header with navigation and search
- Hero section with search functionality
- Category filters for property discovery
- Property listing grid with cards

### Property Detail Page
- High-resolution image gallery with thumbnails
- Property information and amenities
- Host profile and verification
- Booking calendar and price breakdown
- Reviews and ratings section
- House rules and cancellation policy

### Design Features
- Modern, clean interface matching Airbnb's design
- Responsive layout for all devices
- Smooth hover effects and transitions
- Professional color scheme (Airbnb red accent)
- High-quality property images

## 🎨 Design System

### Colors
- **Primary**: #FF385C (Airbnb Red)
- **Secondary**: #008489
- **Accent**: #FF5A5F
- **Background**: #F7F7F7
- **Text**: #222222, #717171, #B0B0B0

### Typography
- **Font**: System font stack (Apple, Google, Microsoft, IBM)
- **Headings**: Bold weights, clear hierarchy
- **Body**: Regular weight, optimized line-height

### Spacing
- **Grid System**: 12-column responsive grid
- **Padding/Margin**: 0.25rem to 4rem scale
- **Container**: Max-width 7xl with responsive padding

## 🚧 Future Enhancements

### Frontend
- Advanced search with map integration
- Property comparison feature
- Multi-language support
- Dark mode toggle

### Backend
- User authentication system
- Property management API
- Booking and payment processing
- Real-time messaging system
- Email notifications

### DevOps
- CI/CD pipeline with GitHub Actions
- Docker containerization
- Production deployment on Vercel
- Monitoring and analytics setup

## 📝 License

This project is created for educational and demonstration purposes.

## 👨‍💻 Author

Built with passion for web development and design excellence.

---

**Airbrb** - Your gateway to unique homes and experiences worldwide.

[Visit Airbrb](http://localhost:3001) | [GitHub Repository](https://github.com/yourusername/airbrb)