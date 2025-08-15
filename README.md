# 🎬 Urban Hustle Films (UH Films) – Bold Stories. Real People. Urban Spirit.

Urban Hustle Films (UH Films) is a next-gen film production company and digital platform that brings "Urban Tales" to life through "Cinematic Trails." We bridge the gap between traditional cinematic storytelling and the dynamic, fast-paced world of digital media, offering an ecosystem for creators, learners, and audiences alike.

## 💡 Inspiration

The inspiration behind UH Films emerged from the desire to merge high-end cinematic storytelling with digital-first creativity. We envisioned a platform that goes beyond being just a production house—a vibrant hub where creativity, innovation, and practical skill-building meet. Fueled by the urban hustle spirit of modern content creators, UH Films serves aspiring filmmakers, artists, and industry professionals by offering storytelling, education, and community.

## 🚀 What It Does

The Urban Hustle Films website is a feature-rich, interactive digital platform designed to:

- 🎥 **Showcase Cinematic Work**: Host short films, web series, ads, and music videos with rich metadata, team credits, and embedded video players. Confidential pitch decks are shared via a secure download system.

- 🎭 **Attract and Nurture Talent**: A robust Careers section with job listings and applications. "Get Casted" allows actors and artists to submit portfolios for future projects.

- 🎓 **Educate and Empower**: Online courses covering filmmaking disciplines—cinematography, editing, production—with structured paths. Our blog features insights, tutorials, and behind-the-scenes stories.

- 🌐 **Engage the Community**: FAQs, contact forms, social media integrations, and collaboration inquiries. The platform encourages constant interaction and networking.

- ✨ **Deliver a Premium UX**: Stunning visuals, animations, and features like dark mode, custom cursors, and smooth transitions elevate the user experience.

## 🛠️ How We Built It

The project was developed using a modern web development stack, ensuring performance, scalability, and user engagement:

### Core Technologies
- **React 18.3.1**: Latest React version with improved rendering and concurrent features
- **TypeScript 5.5.3**: For type-safe code and better developer experience
- **Vite 5.4.2**: Lightning-fast build tool with HMR for rapid development
- **Tailwind CSS 3.4.1**: Utility-first CSS framework for responsive design

### UI/UX & Animation
- **Framer Motion 11.18.2**: Advanced animation library for fluid transitions and gestures
- **Anime.js 3.2.2**: JavaScript animation engine for complex animations
- **Swiper 11.0.6**: Modern touch slider for carousels and sliders
- **Lucide React 0.344.0**: Lightweight icon library with consistent design
- **@lottiefiles/dotlottie-react 0.13.4**: Lightweight animations for loading states
- **@emotion/styled 11.14.0**: CSS-in-JS library for component-based styling

### State Management & Routing
- **React Router DOM 6.22.2**: Client-side routing with dynamic parameters
- **Context API**: Custom contexts for global state management (LoadingContext)

### Media & Interaction
- **React Player 2.15.1**: Video playback component with custom controls
- **Canvas Confetti 1.9.3**: Special effects for celebratory moments
- **React Responsive 10.0.1**: Media query hooks for responsive behavior
- **React Select 5.10.1**: Enhanced select inputs for forms
- **React Icons 5.5.0**: Comprehensive icon library for social media and UI elements

### Backend & Services
- **@supabase/supabase-js 2.49.8**: PostgreSQL database with authentication and storage
- **Supabase Edge Functions**: Serverless functions for backend logic
- **EmailJS 4.4.1**: Email service integration for form submissions
- **Razorpay**: Payment gateway integration for course purchases
- **JSPDF 3.0.1**: PDF generation for certificates and documents

### Performance & Analytics
- **@vercel/analytics & @vercel/speed-insights**: Performance monitoring
- **React Helmet Async 2.0.5**: SEO optimization with dynamic head management
- **Code Splitting**: Dynamic imports for route-based code splitting
- **Lazy Loading**: Component and image lazy loading with Suspense
- **Sitemap Generation**: Automated sitemap creation for SEO

## 🚧 Challenges We Faced

- **Performance vs. Visual Complexity**: Balancing smooth animations and rich media without degrading speed, especially on mobile devices. We implemented code splitting, lazy loading, and optimized animations to maintain performance.

- **Complex State Management**: Managing forms, interactive elements, and filters across components required careful state design and context usage.

- **Secure API Integrations**: Handling third-party tools like Razorpay and EmailJS without a full backend required creative solutions using Supabase Edge Functions.

- **Responsive UI Design**: Creating a consistent experience across devices while maintaining visual richness was challenging. We used a mobile-first approach with Tailwind's responsive utilities.

- **Custom Video Player**: Building a feature-rich video player with keyboard shortcuts, picture-in-picture, and custom controls required extensive testing across browsers.

- **Custom Cursor UX**: Creating a custom interactive cursor that enhances UI/UX without performance issues or bugs required careful implementation.

- **Password-Protected Content**: Implementing secure access to confidential pitch decks without a traditional backend authentication system.

- **Cross-Browser Compatibility**: Ensuring consistent behavior across different browsers, especially for advanced CSS features and animations.

## 🏆 Accomplishments We're Proud Of

- **Glass Morphism UI**: Implemented modern UI with backdrop blur effects, transparent overlays, and subtle gradients for a premium feel.

- **Micro-interactions**: Added subtle animations on hover, click, and scroll events to enhance user engagement.

- **Integrated Content Showcases**: Successfully integrated diverse media formats (videos, images, articles) in a cohesive structure.

- **Talent Engagement Pipeline**: Built streamlined tools for casting, hiring, and connecting creatives.

- **Password-Protected Downloads**: Secure system for sharing confidential pitch decks with proper authentication.

- **Optimized Performance**: Achieved fast load times and responsive animations, even on lower-end devices.

- **Immersive Storytelling**: Created narrative-driven UI that reflects the cinematic nature of the brand.

- **Adaptive Layout System**: Developed a layout system that adapts to different content types and screen sizes.

## 📚 What We Learned

- **Animation Performance Tuning**: Deep understanding of Framer Motion and Anime.js improved our ability to create smooth animations without performance hits.

- **TypeScript Best Practices**: Leveraging TypeScript's type system for more robust code and better developer experience.

- **Supabase Edge Functions**: Using serverless functions for backend logic without managing a traditional server.

- **Responsive Design Patterns**: Creating flexible, responsive layouts that work across all device sizes.

- **Content Structure**: Clear content separation and modularity helped with site maintenance and growth.

- **SEO for SPAs**: Implementing proper SEO practices for single-page applications using React Helmet Async.

- **Optimized Asset Loading**: Strategies for loading and caching assets efficiently to improve performance.

- **Form Handling Without Backend**: Creating secure, functional forms using third-party services and client-side validation.

## 🔮 What's Next for UH Films

- **Enhanced User Profiles**: Talent can manage portfolios, track casting calls, and receive personalized alerts.

- **Advanced LMS Features**: Quiz modules, progress tracking, and instructor interactions for courses.

- **Community Forums & Networking**: Foster a filmmaker community with discussion boards and DMs.

- **Live Events**: Online workshops, premieres, and AMA sessions with creators.

- **Smart Recommendations**: AI-based content suggestions for articles, jobs, or courses.

- **Advanced Search & Filters**: Find projects, courses, or blog posts by category, director, or skill.

- **E-commerce Integration**: Launch official merchandise or premium digital downloads.

- **Multilingual Support**: Scale globally with translations and international outreach.

- **Virtual Production Showcase**: Interactive 3D environments showcasing virtual production capabilities.

- **Blockchain Integration**: NFT certificates for course completion and digital asset ownership.

## 🧰 Technical Architecture

### Project Structure
```
uh-films-website/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── courses/      # Course-related components
│   │   ├── FormCast.tsx  # Casting form component
│   │   └── ...           # Other components
│   ├── CourseDetail/     # Course detail page components
│   ├── data/             # Data files (articles, team, courses)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   ├── types/            # TypeScript type definitions
│   ├── utills/           # Helper functions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── supabase/
│   ├── functions/        # Supabase Edge Functions
│   │   ├── decrypt-data/ # Data decryption function
│   │   ├── encrypt-data/ # Data encryption function
│   │   ├── log-entry/    # Logging function
│   │   └── ...           # Other functions
│   └── migrations/       # Database migration files
├── scripts/              # Build and utility scripts
│   ├── ErrorBoundary.tsx # Error handling component
│   └── generate-sitemap.js # SEO sitemap generator
└── package.json          # Project dependencies and scripts
```

### Key Components
- **ErrorBoundary**: Graceful error handling throughout the application
- **LoadingContext**: Global loading state management with TopLoadingBar integration
- **VideoPlayer**: Custom video player with advanced features like keyboard shortcuts, PiP
- **PasswordModal**: Secure access to protected content with password verification
- **QRModal**: QR code generation and sharing for social media promotion
- **CourseForm**: Course purchase and enrollment system with Razorpay integration
- **ArticleSlider**: Interactive article carousel with auto-scroll and touch support
- **HeroCarousel**: Dynamic hero section with parallax effects and pagination
- **Preloader**: Animated loading screen with brand elements
- **GetCastedPage**: Talent submission system with form validation
- **ProjectDetail**: Detailed project showcase with secure pitch deck downloads

### Feature Implementations

#### Custom Cursor System
The website implements a custom cursor system that enhances user interaction:
- Dual-layer cursor with main pointer and follower element
- Interactive states for clickable elements
- Smooth transitions and animations
- Automatic fallback to standard cursor on mobile devices

#### Video Player
A fully custom video player with:
- Keyboard shortcuts (space, arrows, m, f, p)
- Picture-in-Picture support
- Playback speed control
- Custom progress bar and volume controls
- Mobile-optimized touch controls
- Fullscreen support with orientation lock on mobile

#### Password Protection System
Secure content sharing with:
- Password verification for pitch decks
- Attempt limiting to prevent brute force
- Secure download links after verification
- Contact form integration for access requests

#### Course Platform
Comprehensive learning management features:
- Course catalog with filtering
- Detailed curriculum display
- Secure payment processing via Razorpay
- PDF material downloads with password protection
- Certificate request and verification system

#### Talent Acquisition
Multi-faceted recruitment system:
- Job listings with detailed requirements
- Application forms with file uploads
- Casting calls for actors and artists
- Success stories showcase
- Team member profiles and achievements

### Performance Optimizations
- **Code Splitting**: Route-based code splitting with React.lazy and Suspense
- **Image Optimization**: Responsive images with proper sizing and formats
- **Memoization**: React.memo and useMemo for performance-critical components
- **Debouncing**: Input handlers debounced for search and filter operations
- **Intersection Observer**: Lazy loading components when they enter viewport
- **Animation Optimization**: Hardware-accelerated animations with will-change
- **Font Loading Strategy**: Optimized font loading with preconnect and swap
- **Asset Preloading**: Critical assets preloaded for faster initial render
- **Bundle Size Management**: Careful dependency selection and tree-shaking

### Security Features
- **Content Security Policy**: Protection against XSS attacks
- **Password Protection**: Secure access to sensitive content
- **Data Encryption**: Encrypted storage of sensitive information
- **Input Validation**: Form validation to prevent injection attacks
- **Supabase RLS**: Row-level security for data protection
- **Secure Payment Processing**: PCI-compliant payment integration
- **CORS Policies**: Proper cross-origin resource sharing configuration
- **Environment Variable Protection**: Sensitive keys stored securely

### Accessibility
- **Semantic HTML**: Proper HTML structure for screen readers
- **ARIA Attributes**: Enhanced accessibility for interactive elements
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Focus Management**: Proper focus handling for modals and dialogs
- **Color Contrast**: WCAG-compliant color contrast ratios
- **Screen Reader Announcements**: Dynamic content changes announced to screen readers
- **Reduced Motion Support**: Respects user preferences for reduced motion

## 🧑‍💻 Development & Deployment

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/uh-films-website.git

# Navigate to project directory
cd uh-films-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
The following environment variables are required:
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key
- `VITE_RAZORPAY_KEY_ID`: Razorpay API key
- `VITE_RAZORPAY_THEME_COLOR`: Razorpay theme color (optional)

### Build & Deployment
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The website is deployed on Vercel with continuous integration from the main branch.

## 👥 Team & Ownership

- **Owner**: Urban Hustle Films™
- **Founder**: Bishanpreet Singh
- **Development**: Built with Bolt.new
- **Design**: Urban Hustle Films™ Design Team

## 📄 License

All rights reserved. This website and its content are proprietary to Urban Hustle Films.
