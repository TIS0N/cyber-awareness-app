# CyberAware – Educational Application for Safe Internet Use

CyberAware is an educational web application created as the practical part of a bachelor thesis titled **Educational Application for Safe Internet Use**.

The application is designed for everyday internet users without professional cybersecurity knowledge. Its purpose is to explain common online threats in a simple and practical way through learning modules, interactive scenarios, quizzes, feedback, progress tracking, and basic gamification elements.

## Live Application

The deployed application is available here:

https://cyber-awareness-app.vercel.app/

## Main Features

- Four cybersecurity learning modules:
  - Phishing and Fake Messages
  - Passwords and Account Protection
  - Malware and Ransomware
  - Online Scams and Fraud
- Short educational explanations
- Warning signs and prevention tips
- Realistic interactive scenarios
- Module-specific quizzes
- Immediate answer feedback
- User registration and login
- Password reset functionality
- Account-based progress saving
- Progress page with quiz results and completion status
- Badge system for completed learning progress
- Help page with PDF user manual
- Responsive design for desktop and mobile devices

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- lucide-react
- Supabase Authentication
- Supabase PostgreSQL Database
- Supabase Row Level Security
- Vercel deployment

## Project Structure

```text
src/
├── app/                 # Next.js routes and pages
├── components/          # Reusable React components
├── lib/supabase/        # Supabase client and server utilities
├── services/            # Data access and progress services
├── types/               # TypeScript type definitions
└── middleware.ts        # Route/session handling
```
