# AI Assistant (Edu-Flex) - Educational AI Chat Application

A modern, full-stack AI chat application built for educational purposes. This project demonstrates how to integrate Google's Gemini AI into a web application using a modern tech stack.

## 🚀 Overview

This project provides a sleek, interactive chat interface where users can interact with an AI assistant powered by **Google Gemini**. It features a robust NestJS backend and a highly responsive Next.js frontend with smooth animations.

### Key Features
- **Real-time AI Chat**: Seamless interaction with Gemini AI.
- **Markdown Support**: AI responses are beautifully formatted with headers, lists, and code blocks.
- **Glassmorphism UI**: A premium dark-themed interface with modern design aesthetics.
- **Fluid Animations**: Powered by Framer Motion for a premium user experience.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Educational Oriented**: Well-structured code suitable for learning full-stack development.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: Tailwind CSS & Vanilla CSS
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown**: `react-markdown` & `remark-gfm`

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **AI Integration**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Configuration**: `@nestjs/config` for environment management

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- A Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-app
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   - Create a `.env` file in the `server` directory:
     ```env
     GEMINI_API_KEY=your_api_key_here
     PORT=3000
     ```
   - Start the backend:
     ```bash
     npm run start:dev
     ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

## 📚 Project Structure

```text
ai-app/
├── client/          # Next.js frontend
│   ├── src/app/     # Main pages and layouts
│   └── src/api/     # API integration services
└── server/          # NestJS backend
    ├── src/ai/      # AI module, service, and controller
    └── src/main.ts  # Application entry point
```

## 🎓 Educational Purpose

This project is designed as a learning resource to show:
1. Connecting a React/Next.js frontend to a NestJS backend.
2. Managing environment variables securely in the backend.
3. Implementing streaming-like AI logic (using Gemini Flash).
4. Designing professional UIs using Tailwind and Framer Motion.

---
*Note: This project is for educational purposes only.*