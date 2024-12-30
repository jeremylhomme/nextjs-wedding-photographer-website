# Modern Wedding Photographer Portfolio Website

A modern, elegant, and responsive wedding photographer portfolio website built
with Next.js 14 and TypeScript. This project showcases a photographer's work
with a clean, professional design while incorporating modern web development
practices and features.

## Features

- **Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Internationalization**: Multi-language support using next-intl
- **Contact Form**:
  - Secure form handling with react-hook-form and zod validation
  - Google reCAPTCHA integration for spam protection
  - Email notifications via SendGrid
- **Image Gallery**:
  - Responsive image gallery with lazy loading
  - Optimized image loading and display
  - Carousel functionality using Embla Carousel
- **UI/UX**:
  - Clean and modern design
  - Responsive layout for all devices
  - Smooth animations with Framer Motion
- **Performance**:
  - Server-side rendering for optimal performance
  - Image optimization scripts
  - Loading states and transitions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**:
  - Tailwind CSS
  - Shadcn UI components
  - CSS Modules
- **State Management**: React Hooks
- **Form Handling**:
  - React Hook Form
  - Zod validation
- **APIs & Services**:
  - SendGrid for email
  - Google reCAPTCHA
- **UI Components**:
  - Radix UI primitives
  - Embla Carousel
  - Framer Motion
- **Development Tools**:
  - ESLint
  - Prettier
  - PostCSS

## Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy `.env.example` to `.env.local` and fill in your environment variables
4. Run the development server:
   ```bash
   pnpm dev
   ```

## Image Optimization

The project includes custom scripts for image optimization:

```bash
pnpm optimize-images
```

## Internationalization

The website supports multiple languages through next-intl. Translations are
managed in the `messages` directory.

## Environment Variables

See `.env.example` for required environment variables.

## License

This project is MIT licensed.
