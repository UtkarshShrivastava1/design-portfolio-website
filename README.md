# Modern Portfolio Website

A sophisticated, dynamic portfolio website built with Next.js 14 and TypeScript, featuring a modern design aesthetic and comprehensive content management capabilities.

## Features

### Client-Side
- 🎨 Dynamic Gallery with Swiper.js integration
- 📹 Video showcase section
- 💼 Interactive Projects portfolio
- 👥 Client testimonials carousel
- 📱 Responsive design across all devices
- ✨ Smooth animations using Framer Motion
- 🌙 Custom UI components and styling

### Admin Dashboard
- 🔐 Secure admin authentication
- 📝 Blog post management
- 🖼️ Gallery content management
- ⭐ Testimonial management
- 📊 Client project management

### Technical Features
- 🔄 Server-side rendering with Next.js 14
- 📦 MongoDB database integration
- ☁️ Cloudinary for media storage
- 🎨 TailwindCSS for styling
- 🔍 TypeScript for type safety
- 🎭 Motion animations
- 📱 Mobile-first responsive design

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Styling**: TailwindCSS
- **Animation**: Framer Motion
- **Media Storage**: Cloudinary
- **State Management**: React Hooks
- **UI Components**: Custom components with Lucide icons
- **Carousel**: Swiper.js

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]

```bash
npm install


MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASS=your_admin_password

```bash
npm run dev


Project Structure

src/
├── app/
│   ├── (admin)/        # Admin dashboard routes
│   ├── api/            # API routes
│   ├── components/     # Reusable components
│   ├── models/         # MongoDB models
│   ├── lib/           # Utility functions
│   └── dbConfig/      # Database configuration
public/                # Static assets



Deployment
The project is configured for deployment on Vercel. Simply connect your repository to Vercel and deploy.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
MIT


This README provides a comprehensive overview of your portfolio project, highlighting its key features, technical stack, and setup instructions. The structure is clean and professional, making it easy for other developers to understand and contribute to the project.This README provides a comprehensive overview of your portfolio project, highlighting its key features, technical stack, and setup instructions. The structure is clean and professional, making it easy for other developers to understand and contribute