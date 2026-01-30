# 💬 Chatify - Real-Time Chat Application

A modern full-stack chat application with real-time messaging, authentication, and beautiful UI.

## 🌐 **Live Demo**
**🚀 Try it now:** [https://chat-app-eight-amber.vercel.app](https://chat-app-eight-amber.vercel.app)

![Demo App](/frontend/public/screenshot-for-readme.png)

## ✨ Features

- 🔐 **JWT Authentication** - Secure signup/login system
- ⚡ **Real-Time Messaging** - Instant chat via Socket.io
- 🟢 **Online/Offline Status** - See who's available
- 🔔 **Sound Notifications** - Message and typing sounds (toggleable)
- 📨 **Welcome Emails** - Automatic emails on signup (Resend)
- 🗂️ **Image Uploads** - Profile pictures via Cloudinary
- 🧰 **REST API** - Node.js & Express backend
- 🗄️ **MongoDB** - NoSQL database for data persistence
- 🚦 **Rate Limiting** - API protection with Arcjet
- 🎨 **Modern UI** - React, Tailwind CSS & DaisyUI
- 🧠 **State Management** - Zustand for efficient state handling
- 📱 **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **DaisyUI** - Component library
- **Zustand** - State management
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.io** - Real-time server
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Resend** - Email service
- **Cloudinary** - Image storage
- **Arcjet** - Rate limiting & security

## 🚀 Quick Start

### 🌐 **Try Live Demo First**
**🚀 [Live Application](https://chat-app-eight-amber.vercel.app)** - No installation required!

### Prerequisites
- Node.js 20+
- MongoDB database
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Shivprasadpravindongapure/chat-app.git
cd chat-app
```

2. **Install dependencies**
```bash
npm run build
```

3. **Environment Setup**
```bash
# Copy the example environment file
cp backend/.env.example backend/.env

# Edit with your configuration
nano backend/.env
```

4. **Required Environment Variables**
```env
# Server Configuration
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/chatify_db

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Email Service (Resend)
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM="onboarding@resend.dev"
EMAIL_FROM_NAME="your-email@gmail.com"

# Image Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Security (Arcjet)
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

5. **Start the application**
```bash
# Start backend server
npm start

# Or for development
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── lib/            # Utilities and configurations
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Server entry point
│   ├── .env.example        # Environment variables template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilities
│   │   ├── pages/          # Page components
│   │   ├── store/          # State management
│   │   └── main.jsx        # App entry point
│   ├── public/             # Static assets
│   └── package.json
├── .gitignore
├── package.json            # Root package.json
└── README.md
```

## 🔧 Development

### Available Scripts

```bash
# Install all dependencies
npm run build

# Start development servers
npm run dev

# Start production server
npm start

# Build for production
cd frontend && npm run build
```

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

#### Messages
- `GET /api/messages/users` - Get all users
- `GET /api/messages/:id` - Get messages with user

## 🚀 Deployment

### Railway (Recommended)
1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Connect your GitHub repository
4. Add environment variables
5. Deploy! 🎉

### Manual Deployment
1. Build frontend: `cd frontend && npm run build`
2. Set `NODE_ENV=production`
3. Update `CLIENT_URL` to your domain
4. Start server: `npm start`

### Environment Variables for Production
```env
NODE_ENV=production
CLIENT_URL=https://yourdomain.com
# ... other variables
```

## 🔑 Getting API Keys

### MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create free cluster
3. Get connection string

### Resend (Email)
1. Go to [Resend](https://resend.com)
2. Create account
3. Get API key

### Cloudinary (Images)
1. Go to [Cloudinary](https://cloudinary.com)
2. Create account
3. Get credentials

### Arcjet (Security)
1. Go to [Arcjet](https://arcjet.com)
2. Create account
3. Get API key

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [Socket.io](https://socket.io/) for real-time communication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [DaisyUI](https://daisyui.com/) for components
- [Resend](https://resend.com/) for email services
- [Cloudinary](https://cloudinary.com/) for image storage

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me at: prasaddongapure7660@gmail.com

---

**⭐ Give this repo a star if it helped you!**

## 🌐 **Live Demo**
**🚀 Try the live application:** [https://chat-app-eight-amber.vercel.app](https://chat-app-eight-amber.vercel.app)

*Note: Backend deployed on Railway, Frontend on Vercel*
