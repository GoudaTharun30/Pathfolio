/**
 * Comprehensive Career Roadmaps Data for Pathfolio
 * Reference & Learning Progression aligned with roadmap.sh technical standards.
 * Covers 17 Technical Career Paths across Software, Data/AI, Cloud, Cybersecurity,
 * Hardware, Embedded, VLSI, Electrical, Mechanical, and Civil Engineering.
 */

export const roadmapsData = [
  // 1. FRONTEND DEVELOPER
  {
    id: 'frontend-developer',
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'Software Development',
    branches: ['CSE', 'IT', 'ECE'],
    icon: 'fa-solid fa-code',
    description: 'Learn the complete modern frontend journey from web fundamentals to advanced React, state architecture, performance tuning, and building production-ready user interfaces.',
    requiredSkills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'TypeScript', 'TailwindCSS', 'Git', 'REST APIs'],
    estimatedMonths: '4–6 Months',
    stages: [
      {
        level: 1,
        title: 'Internet & Web Fundamentals',
        description: 'Understand how the web works, networking basics, client-server communication, and browser architecture.',
        topics: [
          {
            id: 'fe-internet',
            title: 'How the Internet Works & HTTP/HTTPS',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 6,
            description: 'Learn DNS resolution, IP addressing, TCP/IP, HTTP request/response lifecycles, status codes (200, 404, 500), and HTTPS SSL/TLS encryption.',
            whyItMatters: 'Understanding web protocols helps you debug network issues, API responses, and security vulnerabilities.',
            concepts: ['DNS & IP Routing', 'HTTP Verbs & Headers', 'Status Codes & Cookies', 'SSL/TLS & HTTPS']
          },
          {
            id: 'fe-browsers',
            title: 'Browsers, DOM & Rendering Engine',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 6,
            description: 'Learn how browsers parse HTML/CSS into DOM & CSSOM trees, construct the Render Tree, execute layout and painting, and manage the Critical Rendering Path.',
            whyItMatters: 'Crucial for understanding browser performance, repaints, reflows, and script execution timing.',
            concepts: ['DOM & CSSOM Tree', 'Render Tree & Painting', 'Critical Rendering Path', 'Browser DevTools']
          }
        ]
      },
      {
        level: 2,
        title: 'HTML5 & Accessible Web Semantics',
        description: 'Master structure, forms, SEO fundamentals, and web accessibility standards.',
        topics: [
          {
            id: 'fe-html-semantics',
            title: 'Semantic HTML5 & Document Structure',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 8,
            description: 'Use semantic elements (<header>, <nav>, <main>, <article>, <section>, <footer>) instead of generic div wrappers.',
            whyItMatters: 'Semantic HTML is the backbone of accessible web pages and directly boosts search engine indexing (SEO).',
            concepts: ['Semantic Elements', 'Metadata & OpenGraph Tags', 'Media & Responsive Images', 'Audio/Video Tags']
          },
          {
            id: 'fe-html-forms',
            title: 'Forms, Validations & Web Accessibility (WCAG / ARIA)',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 8,
            description: 'Build user inputs, validation attributes, custom constraints, ARIA roles/labels, keyboard navigation, and color contrast compliance.',
            whyItMatters: 'Ensures everyone, including users with disabilities, can navigate and interact with your applications smoothly.',
            concepts: ['Form Input Types & Validation', 'ARIA Landmarks & Labels', 'Keyboard Tab Navigation', 'Screen Reader Support']
          }
        ]
      },
      {
        level: 3,
        title: 'CSS3, Modern Layouts & Responsive Design',
        description: 'Master styling systems, modern layout algorithms, animations, and responsive breakpoints.',
        topics: [
          {
            id: 'fe-css-box-model',
            title: 'CSS Box Model, Specificity & Custom Properties',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 10,
            description: 'Master content, padding, border, margin, box-sizing: border-box, CSS cascade hierarchy, specificity calculation, and CSS variables.',
            whyItMatters: 'Prevents unwanted layout shifts, styling bugs, and simplifies theme management.',
            concepts: ['Box Model & Sizing', 'Specificity Calculation', 'CSS Variables & Theming', 'Inheritance & Cascade']
          },
          {
            id: 'fe-css-flexbox-grid',
            title: 'Flexbox & CSS Grid Modern Layouts',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 12,
            description: 'Design 1D layouts with Flexbox (justify-content, align-items, flex-grow) and 2D grid systems (grid-template-columns, auto-fit, minmax).',
            whyItMatters: 'Modern layout engines allow you to build any responsive layout cleanly without floats or positioning hacks.',
            concepts: ['Flexbox Alignment & Directions', 'CSS Grid Areas & Tracks', 'minmax() & auto-fit', 'Subgrid Basics']
          },
          {
            id: 'fe-css-responsive',
            title: 'Responsive Design & Mobile-First Media Queries',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 10,
            description: 'Implement mobile-first breakpoints, fluid typography (clamp()), viewport meta settings, and CSS transitions/keyframes.',
            whyItMatters: 'Ensures your website renders seamlessly on phones, tablets, laptops, and ultra-wide desktop monitors.',
            concepts: ['Mobile-First Media Queries', 'Fluid Typography with clamp()', 'CSS Transitions & Keyframes', 'Container Queries']
          }
        ]
      },
      {
        level: 4,
        title: 'JavaScript Core & Asynchronous Programming',
        description: 'Master the programming language of the web: ES6+ syntax, DOM manipulation, closures, and async workflows.',
        topics: [
          {
            id: 'fe-js-basics',
            title: 'JavaScript Fundamentals & ES6+ Syntax',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 14,
            description: 'Master let/const, arrow functions, destructuring, spread/rest operators, template literals, array methods (map, filter, reduce, find), and modules.',
            whyItMatters: 'JavaScript drives all dynamic behavior and logic on the modern web.',
            concepts: ['ES6+ Syntax & Scoping', 'Array & Object Methods', 'Template Literals & Destructuring', 'ES Modules (import/export)']
          },
          {
            id: 'fe-js-dom',
            title: 'DOM Manipulation, Events & Event Bubbling',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'Interact with DOM nodes, event listeners, event delegation, bubbling & capturing phases, preventDefault, and localStorage/sessionStorage APIs.',
            whyItMatters: 'Teaches how code directly reacts to user inputs, clicks, keyboard events, and persists local data.',
            concepts: ['DOM Querying & Mutation', 'Event Listeners & Delegation', 'Event Bubbling & Capturing', 'Storage APIs (localStorage, sessionStorage)']
          },
          {
            id: 'fe-js-async',
            title: 'Asynchronous JavaScript: Promises & Async/Await',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Understand the Event Loop, Call Stack, Microtask queue, Callback Hell resolution, Promises chaining, and async/await error handling with try/catch.',
            whyItMatters: 'Essential for consuming backend REST APIs and handling delayed network requests.',
            concepts: ['JavaScript Event Loop & Microtasks', 'Promises & Error Handling', 'Async/Await Syntax', 'Fetch API & JSON Parsing']
          }
        ]
      },
      {
        level: 5,
        title: 'Version Control, Package Managers & Build Tools',
        description: 'Professional developer toolchain: Git workflows, npm packages, and Vite bundling.',
        topics: [
          {
            id: 'fe-git-github',
            title: 'Git Version Control & GitHub Workflows',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 8,
            description: 'Learn git init, commit, branch, merge, rebase, pull requests, resolving merge conflicts, and GitHub collaboration.',
            whyItMatters: 'Every software engineering team tracks and coordinates codebase changes using Git.',
            concepts: ['Git Commits & Branching', 'Merge Conflicts Resolution', 'Pull Requests & Code Reviews', 'Git Stash & Rebase']
          },
          {
            id: 'fe-npm-vite',
            title: 'npm Package Ecosystem & Vite Build Tool',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 6,
            description: 'Manage package.json dependencies, devDependencies, semantic versioning, npm scripts, and use Vite for fast Hot Module Replacement (HMR).',
            whyItMatters: 'Vite provides instantaneous development feedback and builds optimized production bundles.',
            concepts: ['package.json & lockfiles', 'npm vs pnpm / yarn', 'Vite Dev Server & HMR', 'Production Bundling']
          }
        ]
      },
      {
        level: 6,
        title: 'React.js Component Architecture & Hooks',
        description: 'Build modern declarative Single Page Applications (SPAs) with React.',
        topics: [
          {
            id: 'fe-react-fundamentals',
            title: 'React Fundamentals: JSX, Components & Props',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Understand declarative UI, JSX syntax, functional components, component composition, prop drilling, and conditional rendering.',
            whyItMatters: 'React is the world\'s most in-demand frontend library for building reusable web user interfaces.',
            concepts: ['JSX Syntax Rules', 'Component Composition', 'Props & PropTypes', 'Conditional & List Rendering']
          },
          {
            id: 'fe-react-hooks',
            title: 'React State Hooks (useState, useEffect, useMemo, useCallback)',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Master state management with useState, lifecycle side-effects and API fetching with useEffect, and performance optimization with useMemo/useCallback.',
            whyItMatters: 'Hooks are the primary way React manages component state, memory caching, and asynchronous lifecycle operations.',
            concepts: ['useState & Immutability', 'useEffect Dependency Arrays', 'useRef for DOM Access', 'useMemo & useCallback Memoization']
          },
          {
            id: 'fe-react-router',
            title: 'React Router & Global Context API',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'Create multi-page SPAs using React Router (BrowserRouter, Routes, Route, Link, useNavigate, useParams) and manage global state with createContext/useContext.',
            whyItMatters: 'Enables client-side routing without browser page reloads and avoids prop drilling for user authentication.',
            concepts: ['Client-Side Routing', 'Dynamic URL Parameters (:id)', 'Protected Route Wrappers', 'React Context API']
          }
        ]
      },
      {
        level: 7,
        title: 'TypeScript & State Architecture',
        description: 'Type safety, large-scale state management, and modern styling frameworks.',
        topics: [
          {
            id: 'fe-typescript',
            title: 'TypeScript Fundamentals for React',
            importance: 'important',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Type annotations, interfaces, type aliases, union/intersection types, generics, and typing React component props, state, and event handlers.',
            whyItMatters: 'Catches runtime errors during compilation and vastly improves developer productivity and codebase maintainability.',
            concepts: ['Types vs Interfaces', 'Generics & Utility Types', 'React Props & Event Typing', 'TypeScript Compiler Config (tsconfig)']
          },
          {
            id: 'fe-tailwindcss',
            title: 'Utility-First Styling with TailwindCSS',
            importance: 'important',
            difficulty: 'intermediate',
            estimatedHours: 10,
            description: 'Build beautiful responsive interfaces rapidly with Tailwind utility classes, custom theme tokens, dark mode variants, and responsive prefixes.',
            whyItMatters: 'Tailwind eliminates the need to switch between CSS and JSX files while maintaining design consistency.',
            concepts: ['Utility-First Philosophy', 'Responsive Prefixes (md:, lg:)', 'Custom Tailwind Configuration', 'Dark Mode Theming']
          },
          {
            id: 'fe-server-state',
            title: 'Server State Management (TanStack Query / Axios)',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 12,
            description: 'Cache server data, handle loading/error states, refetch on window focus, optimistic updates, and API request interceptors.',
            whyItMatters: 'Replaces messy custom fetching useEffect logic with automated caching and background synchronization.',
            concepts: ['Query Keys & Caching', 'Mutations & Invalidation', 'Optimistic UI Updates', 'Axios Interceptors']
          }
        ]
      },
      {
        level: 8,
        title: 'Testing, Performance & Modern Frontend',
        description: 'Unit testing, Core Web Vitals optimization, and Next.js / Full-Stack React.',
        topics: [
          {
            id: 'fe-testing',
            title: 'Frontend Testing (Jest & React Testing Library)',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 12,
            description: 'Write unit and integration tests for React components, mock API calls, simulate user clicks, and verify DOM assertions.',
            whyItMatters: 'Automated testing ensures refactors don\'t break existing features in production.',
            concepts: ['Unit vs Integration Tests', 'React Testing Library Queries', 'Mocking API Requests', 'Code Coverage Metrics']
          },
          {
            id: 'fe-performance',
            title: 'Web Performance Optimization & Core Web Vitals',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 10,
            description: 'Optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), code splitting with React.lazy, asset compression, and Lighthouse audits.',
            whyItMatters: 'Fast web apps retain users, improve conversions, and rank significantly higher on Google Search.',
            concepts: ['Core Web Vitals (LCP, INP, CLS)', 'Code Splitting & Lazy Loading', 'Image Optimization & WebP', 'Lighthouse Audits']
          },
          {
            id: 'fe-nextjs-ssr',
            title: 'Full-Stack React Framework: Next.js (SSR / SSG)',
            importance: 'advanced',
            difficulty: 'advanced',
            estimatedHours: 14,
            description: 'Understand Server-Side Rendering (SSR), Static Site Generation (SSG), App Router, Server Components, and Server Actions.',
            whyItMatters: 'Next.js is the leading production standard for high-performance, SEO-optimized React applications.',
            concepts: ['App Router & Layouts', 'Server vs Client Components', 'SSR & Static Generation', 'API Routes & Server Actions']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Personal Developer Portfolio & Showcase',
        difficulty: 'Easy',
        description: 'Build a responsive personal portfolio with dark mode, smooth scrolling, interactive skills grid, and project gallery.',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design']
      },
      {
        title: 'Interactive E-Commerce Product Filter & Cart',
        difficulty: 'Easy',
        description: 'Create an e-commerce catalog with real-time keyword search, category checkboxes, price range slider, and cart storage.',
        skills: ['JavaScript ES6+', 'DOM Events', 'LocalStorage', 'Flexbox']
      },
      {
        title: 'Job & Internship Application Tracker Dashboard',
        difficulty: 'Medium',
        description: 'Build a React dashboard to track job applications, status tags (Applied, Interview, Offer), notes, and application statistics.',
        skills: ['React', 'Hooks', 'TailwindCSS', 'React Router']
      },
      {
        title: 'Live Weather Intelligence & Air Quality Dashboard',
        difficulty: 'Medium',
        description: 'Fetch multi-city 5-day weather forecasts, UV index, air quality metrics from OpenWeather API with interactive charts.',
        skills: ['React', 'Fetch API / Axios', 'Chart.js', 'Async JavaScript']
      },
      {
        title: 'Collaborative Real-Time Canvas & Workspace Tool',
        difficulty: 'Hard',
        description: 'Construct an advanced web app with interactive HTML5 canvas, drag-and-drop workspace nodes, undo/redo history, and export to PNG/SVG.',
        skills: ['React', 'TypeScript', 'HTML5 Canvas', 'State Management']
      }
    ],
    interviewPreparation: [
      'Explain the CSS Box Model, Specificity hierarchy, and Flexbox vs Grid trade-offs.',
      'How does the JavaScript Event Loop work? Explain Call Stack, Web APIs, and Microtask Queue.',
      'What are Closures, Scope Chains, and Hoisting in JavaScript with code examples?',
      'Explain Virtual DOM in React, Reconciliation algorithm, and how React handles state batching.',
      'What is the difference between useEffect, useMemo, and useCallback? When would you use each?',
      'How do you optimize a slow React application? Discuss Code Splitting, Memoization, and Core Web Vitals.'
    ],
    recommendedResources: [
      { title: 'MDN Web Docs — Web Developer Guide', type: 'Documentation', url: 'https://developer.mozilla.org' },
      { title: 'React Official Documentation (react.dev)', type: 'Documentation', url: 'https://react.dev' },
      { title: 'JavaScript.info — The Modern JavaScript Tutorial', type: 'Tutorial', url: 'https://javascript.info' }
    ]
  },

  // 2. BACKEND DEVELOPER
  {
    id: 'backend-developer',
    slug: 'backend-developer',
    title: 'Backend Developer',
    category: 'Software Development',
    branches: ['CSE', 'IT', 'ECE', 'EEE'],
    icon: 'fa-solid fa-server',
    description: 'Master server-side architectures, REST & GraphQL APIs, relational & NoSQL databases, authentication, caching with Redis, microservices, and secure deployments.',
    requiredSkills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST API', 'Redis', 'Docker', 'JWT', 'Git'],
    estimatedMonths: '4–6 Months',
    stages: [
      {
        level: 1,
        title: 'Backend Core & OS Fundamentals',
        description: 'Operating systems concepts, Linux command line, networking protocols, and terminal workflows.',
        topics: [
          {
            id: 'be-linux-terminal',
            title: 'Linux CLI, Bash Scripting & File Systems',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 8,
            description: 'Navigate Linux terminal, manage file permissions (chmod, chown), processes (ps, kill, top), environment variables, and write shell automation scripts.',
            whyItMatters: 'Almost all production backend servers run on Linux distributions.',
            concepts: ['Linux Commands & Permissions', 'Process Management', 'Environment Variables (.env)', 'SSH & Remote Server Access']
          },
          {
            id: 'be-networking-http',
            title: 'Networking Protocols: TCP/IP, UDP, DNS & HTTP/HTTPS',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 8,
            description: 'Understand TCP handshakes, UDP streaming, DNS lookups, ports & sockets, HTTP methods, headers, MIME types, and CORS origins.',
            whyItMatters: 'Server-side development revolves around receiving, routing, and answering network packets efficiently.',
            concepts: ['OSI Model Layers', 'TCP vs UDP Protocols', 'HTTP 1.1 vs HTTP/2 vs HTTP/3', 'CORS & Preflight Requests']
          }
        ]
      },
      {
        level: 2,
        title: 'Node.js Runtime & Asynchronous Architecture',
        description: 'Master the Node.js event-driven non-blocking I/O engine.',
        topics: [
          {
            id: 'be-node-runtime',
            title: 'Node.js Architecture, Event Loop & Libuv',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 12,
            description: 'Deep dive into single-threaded concurrency, Libuv thread pool, Timers, I/O polling, check phase (setImmediate), and process.nextTick.',
            whyItMatters: 'Knowing how Node handles asynchronous I/O enables you to build high-concurrency servers without blocking the main thread.',
            concepts: ['Node.js Event Loop Phases', 'Libuv Thread Pool', 'process.nextTick & setImmediate', 'CommonJS vs ES Modules']
          },
          {
            id: 'be-node-streams',
            title: 'Node.js File System, Buffers & Streams API',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 10,
            description: 'Process large files using Readable, Writable, Transform streams, buffer encoding, piping streams, and memory optimization.',
            whyItMatters: 'Streams allow processing gigabytes of log or media data with minimal RAM overhead.',
            concepts: ['fs / fs.promises Module', 'Buffers & Binary Data', 'Readable & Writable Streams', 'Pipeline & Backpressure']
          }
        ]
      },
      {
        level: 3,
        title: 'Web Servers & RESTful API Architecture with Express.js',
        description: 'Build structured, scalable REST APIs using Express.js.',
        topics: [
          {
            id: 'be-express-routing',
            title: 'Express.js Routing, Controllers & Middleware Chain',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 12,
            description: 'Structure modular Express routers, custom middleware (logging, auth, error handlers), request validation, and clean MVC separation.',
            whyItMatters: 'Express is the de-facto industry standard lightweight web framework for Node.js.',
            concepts: ['Route Handlers & Params', 'Middleware Execution Order', 'Global Error Handling Middleware', 'MVC Folder Architecture']
          },
          {
            id: 'be-rest-design',
            title: 'RESTful API Design Standards & HTTP Status Codes',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 10,
            description: 'Design idempotent REST endpoints, URI naming conventions, query parameters (pagination, filtering, sorting), and standard JSON payloads.',
            whyItMatters: 'Consistent REST APIs make integration straightforward for frontend developers and external clients.',
            concepts: ['REST Resource Naming', 'HTTP Verbs (GET, POST, PUT, PATCH, DELETE)', 'Pagination, Filtering & Sorting', 'Idempotency in APIs']
          }
        ]
      },
      {
        level: 4,
        title: 'Databases: Relational (SQL) & Document (NoSQL)',
        description: 'Design schemas, write queries, optimize indexes, and handle transactions in PostgreSQL & MongoDB.',
        topics: [
          {
            id: 'be-sql-postgres',
            title: 'Relational Databases: PostgreSQL & SQL Queries',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Table schemas, primary & foreign keys, SQL joins (INNER, LEFT, RIGHT), GROUP BY, aggregations, ACID transactions, and indexes.',
            whyItMatters: 'Relational databases are the bedrock of enterprise data consistency and financial transactions.',
            concepts: ['Table Normalization (1NF, 2NF, 3NF)', 'SQL Joins & Subqueries', 'ACID Transactions & Locks', 'B-Tree Indexing & EXPLAIN ANALYZE']
          },
          {
            id: 'be-nosql-mongodb',
            title: 'NoSQL Databases: MongoDB & Mongoose ODM',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Document data model, embedded vs referenced collections, Mongoose schemas, hooks/middleware, indexing, and Aggregation Pipeline.',
            whyItMatters: 'MongoDB offers flexible schemas perfect for rapid prototyping and hierarchical JSON document storage.',
            concepts: ['Document Modeling', 'Mongoose Schema Validation', 'Aggregation Pipeline ($match, $group, $project)', 'Compound Indexes']
          },
          {
            id: 'be-orms',
            title: 'Database ORMs & Query Builders (Prisma / Mongoose)',
            importance: 'important',
            difficulty: 'intermediate',
            estimatedHours: 10,
            description: 'Type-safe database interactions with Prisma ORM, migrations, seed scripts, schema definitions, and relationship queries.',
            whyItMatters: 'ORMs provide type safety, autocomplete, and automated database migration tracking.',
            concepts: ['Schema Migrations', 'Type-Safe Queries with Prisma', 'Relations (1-1, 1-N, N-N)', 'Connection Pooling']
          }
        ]
      },
      {
        level: 5,
        title: 'Authentication, Authorization & Security',
        description: 'Protect user credentials, secure API endpoints, and implement role-based access.',
        topics: [
          {
            id: 'be-auth-jwt',
            title: 'Password Hashing (Bcrypt) & JWT Token Authentication',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'Salt and hash passwords with bcrypt, generate and verify JSON Web Tokens (JWT), access vs refresh token rotation, and HTTP-only cookies.',
            whyItMatters: 'Stateless JWT auth scales across server instances and secures user sessions.',
            concepts: ['Bcrypt Salting & Hashing', 'JWT Structure (Header, Payload, Signature)', 'Access & Refresh Tokens', 'HTTP-Only Secure Cookies']
          },
          {
            id: 'be-rbac-security',
            title: 'Role-Based Access Control (RBAC) & API Security',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 10,
            description: 'Implement role middleware (Admin, User, Manager), rate limiting, Helmet HTTP security headers, input sanitization, and SQL/NoSQL injection prevention.',
            whyItMatters: 'Prevents unauthorized access and protects against the OWASP Top 10 web vulnerabilities.',
            concepts: ['RBAC Guard Middleware', 'Rate Limiting (express-rate-limit)', 'Helmet Security Headers', 'SQL/NoSQL Injection & XSS Defense']
          }
        ]
      },
      {
        level: 6,
        title: 'Caching, Performance & Background Message Queues',
        description: 'Supercharge backend speed with Redis caching and asynchronous background task workers.',
        topics: [
          {
            id: 'be-redis-caching',
            title: 'In-Memory Caching with Redis',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'Redis data structures (strings, hashes, lists, sets), cache-aside pattern, Time-To-Live (TTL) expiration, and cache invalidation strategies.',
            whyItMatters: 'Redis reduces database query load by 90% and provides sub-millisecond response times.',
            concepts: ['Cache-Aside Strategy', 'TTL Expiration & Eviction', 'Session Storage in Redis', 'Cache Invalidation Patterns']
          },
          {
            id: 'be-message-queues',
            title: 'Background Job Processing (BullMQ / RabbitMQ)',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 12,
            description: 'Offload long-running tasks (email sending, image resizing, report generation) to background worker queues with BullMQ/Redis.',
            whyItMatters: 'Keeps API response times instant while heavy jobs execute reliably in the background.',
            concepts: ['Producer-Consumer Pattern', 'Job Retries & Dead Letter Queues', 'Scheduled / Cron Jobs', 'Worker Concurrency']
          }
        ]
      },
      {
        level: 7,
        title: 'Testing, Docker, CI/CD & Cloud Deployment',
        description: 'Unit testing, containerization, automated pipelines, and cloud server hosting.',
        topics: [
          {
            id: 'be-testing-supertest',
            title: 'Automated API Testing (Jest & Supertest)',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'Write integration tests for REST endpoints, mock database connections, test auth flows, and measure code coverage.',
            whyItMatters: 'Guarantees that new features and bug fixes do not cause regression in API contracts.',
            concepts: ['Supertest HTTP Assertions', 'Database Test Fixtures', 'Mocking External APIs', 'Code Coverage Reports']
          },
          {
            id: 'be-docker-containers',
            title: 'Docker Containerization & Docker Compose',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'Write optimized multi-stage Dockerfiles, build container images, manage environment variables, and orchestrate app + DB + Redis with Docker Compose.',
            whyItMatters: 'Eliminates "it works on my machine" bugs and ensures identical dev and prod environments.',
            concepts: ['Dockerfiles & Image Layers', 'Multi-Stage Builds', 'Docker Compose Services & Volumes', 'Container Networking']
          },
          {
            id: 'be-deployment-cicd',
            title: 'CI/CD Pipelines & Cloud Deployment (AWS / Render / Nginx)',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 14,
            description: 'Set up GitHub Actions CI/CD workflows, reverse proxy configuration with Nginx, PM2 process manager, SSL certificates via Certbot, and cloud deployment.',
            whyItMatters: 'Enables automatic testing and zero-downtime deployment on code commits.',
            concepts: ['GitHub Actions Workflows', 'Nginx Reverse Proxy & Load Balancing', 'PM2 Cluster Mode', 'Cloud Hosting (AWS EC2 / Render)']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Log File Analyzer & Statistics CLI Tool',
        difficulty: 'Easy',
        description: 'Build a Node.js CLI tool using streams and regex to parse server access logs and output error rate summaries.',
        skills: ['Node.js', 'Streams API', 'Regex', 'CLI']
      },
      {
        title: 'High-Performance URL Shortener Microservice',
        difficulty: 'Easy',
        description: 'Create a URL shortener with unique hash generation, HTTP 302 redirects, and link click analytics.',
        skills: ['Node.js', 'Express', 'MongoDB', 'REST API']
      },
      {
        title: 'Production Auth & RBAC Security Microservice',
        difficulty: 'Medium',
        description: 'Build a complete authentication server with bcrypt, JWT rotation, email verification, and role-based permissions.',
        skills: ['Express', 'JWT', 'Bcrypt', 'Security Middleware']
      },
      {
        title: 'E-Commerce Order Management & Payment Webhooks',
        difficulty: 'Medium',
        description: 'Develop backend inventory management with PostgreSQL transactions, cart endpoints, and mock payment webhooks.',
        skills: ['PostgreSQL', 'Prisma', 'Transactions', 'Webhooks']
      },
      {
        title: 'Real-Time Distributed Chat & Event Engine',
        difficulty: 'Hard',
        description: 'Build a scalable WebSocket communication platform with Redis Pub/Sub, message persistence, and Docker Compose.',
        skills: ['WebSockets', 'Redis Pub/Sub', 'Docker', 'Microservices']
      }
    ],
    interviewPreparation: [
      'Explain the Node.js Event Loop phases: Timers, Pending Callbacks, Poll, Check, and Close.',
      'What are the ACID properties in relational databases? How does PostgreSQL enforce them?',
      'How does JWT authentication work? What are the pros and cons compared to server-side session cookies?',
      'Explain how Redis can be used as a cache-aside layer and how cache invalidation strategies work.',
      'What is the difference between SQL and NoSQL databases? When should you choose each?',
      'How do you prevent SQL Injection and NoSQL Query Injection in backend APIs?'
    ],
    recommendedResources: [
      { title: 'Node.js Official Documentation & Guides', type: 'Documentation', url: 'https://nodejs.org' },
      { title: 'PostgreSQL Tutorial & Documentation', type: 'Documentation', url: 'https://www.postgresql.org' },
      { title: 'Express.js Guide & Best Practices', type: 'Documentation', url: 'https://expressjs.com' }
    ]
  },

  // 3. FULL STACK DEVELOPER
  {
    id: 'fullstack-developer',
    slug: 'fullstack-developer',
    title: 'Full Stack Developer',
    category: 'Software Development',
    branches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil'],
    icon: 'fa-solid fa-layer-group',
    description: 'Master the end-to-end MERN stack: React frontend, Node.js + Express backend, MongoDB database, full-stack state synchronization, authentication, and deployment.',
    requiredSkills: ['HTML5/CSS3', 'JavaScript ES6+', 'React', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Git'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Web & Programming Foundation',
        description: 'HTML5, modern responsive CSS layouts, and core JavaScript programming.',
        topics: [
          {
            id: 'fs-web-basics',
            title: 'HTML5 Semantic Markup & CSS Flexbox/Grid',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 12,
            description: 'Build semantic web pages with accessible structure, responsive Flexbox and Grid layouts, and custom CSS variables.',
            whyItMatters: 'Every web application starts with solid, responsive frontend structure and styling.',
            concepts: ['Semantic HTML5 Elements', 'CSS Box Model & Specificity', 'Flexbox & CSS Grid', 'Mobile Breakpoints']
          },
          {
            id: 'fs-js-core',
            title: 'JavaScript (ES6+) Syntax, DOM & Async/Await',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 16,
            description: 'Variables, arrow functions, destructuring, array methods (map, filter, reduce), DOM event listeners, Promises, and async/await with fetch.',
            whyItMatters: 'JavaScript powers both client-side interactivity and server-side logic in the MERN stack.',
            concepts: ['ES6+ Syntax & Scope', 'Array & Object Methods', 'DOM Event Handling', 'Promises & Async/Await']
          }
        ]
      },
      {
        level: 2,
        title: 'Frontend Mastery with React',
        description: 'Build interactive, dynamic single-page frontend applications.',
        topics: [
          {
            id: 'fs-react-components',
            title: 'React Components, Props & State Management',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Functional component architecture, JSX, props passing, useState hook, conditional rendering, and form input binding.',
            whyItMatters: 'React enables building reusable, modular UI components that update efficiently when data changes.',
            concepts: ['JSX & Component Hierarchy', 'Props & State Updates', 'Form Binding & Events', 'List Rendering with Keys']
          },
          {
            id: 'fs-react-effects-router',
            title: 'React Hooks (useEffect) & React Router Navigation',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Data fetching with useEffect, cleanup functions, multi-page client-side navigation with React Router, and dynamic parameters.',
            whyItMatters: 'Connects frontend components to API endpoints and provides seamless page transitions without full browser reloads.',
            concepts: ['useEffect Lifecycle & Fetching', 'React Router (Routes, Route, Link)', 'URL Parameters (useParams)', 'Programmatic Navigation (useNavigate)']
          }
        ]
      },
      {
        level: 3,
        title: 'Backend API Engineering with Node & Express',
        description: 'Create server-side REST APIs, middleware, and business logic.',
        topics: [
          {
            id: 'fs-node-express-core',
            title: 'Node.js & Express.js REST API Server',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 14,
            description: 'Express server setup, route definition, request body parsing (JSON/URL-encoded), modular controllers, and custom middleware.',
            whyItMatters: 'Express handles incoming HTTP requests from the React frontend and executes server logic.',
            concepts: ['Express Server Configuration', 'REST Endpoints (GET, POST, PUT, DELETE)', 'Request & Response Objects', 'Middleware Pipeline']
          },
          {
            id: 'fs-error-handling',
            title: 'API Error Handling, Validation & Status Codes',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 8,
            description: 'Centralized error handling middleware, input validation, and proper HTTP status code communication (200, 201, 400, 401, 404, 500).',
            whyItMatters: 'Prevents backend crashes and gives the frontend clear feedback when operations succeed or fail.',
            concepts: ['Global Error Middleware', 'Input Validation', 'HTTP Status Code Conventions', 'Custom Error Classes']
          }
        ]
      },
      {
        level: 4,
        title: 'Database Persistence with MongoDB & Mongoose',
        description: 'Design schemas, write CRUD operations, and manage database connections.',
        topics: [
          {
            id: 'fs-mongodb-mongoose',
            title: 'MongoDB Collections & Mongoose Schemas',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Mongoose schema definitions, field types, required validations, default values, timestamps, and connecting Express to MongoDB.',
            whyItMatters: 'Mongoose provides structured schema modeling on top of flexible MongoDB document storage.',
            concepts: ['Mongoose Models & Schemas', 'Database Connection & URI', 'Schema Validators', 'Timestamps & Virtuals']
          },
          {
            id: 'fs-crud-operations',
            title: 'Full-Stack CRUD Database Operations',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'Perform Create, Read, Update, and Delete operations using Mongoose methods (find, findById, create, findByIdAndUpdate, deleteOne).',
            whyItMatters: 'CRUD operations are the core functionality of almost every data-driven web application.',
            concepts: ['Async Mongoose Queries', 'Sorting & Pagination', 'Populate & Relations', 'Update Operators ($set, $push)']
          }
        ]
      },
      {
        level: 5,
        title: 'Authentication, Security & Protected Routes',
        description: 'Secure full-stack user registration, login sessions, and private routes.',
        topics: [
          {
            id: 'fs-auth-system',
            title: 'User Authentication with JWT & Bcrypt',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'User registration with password hashing (bcrypt), login endpoint generating JWT tokens, auth middleware protecting API routes, and localStorage token storage.',
            whyItMatters: 'Ensures only authenticated users can access private dashboards, portfolios, and account data.',
            concepts: ['Bcrypt Password Hashing', 'JWT Token Generation & Verification', 'Auth Middleware Token Guard', 'AuthContext in React']
          },
          {
            id: 'fs-protected-routes',
            title: 'Frontend Protected Routes & Auth State Sync',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 10,
            description: 'Create React Protected Route wrapper components, automatically redirect unauthenticated visitors to login, and maintain persistent user state.',
            whyItMatters: 'Provides a clean user experience by safeguarding authenticated pages like Dashboard, Profile, and Resume Builder.',
            concepts: ['Protected Route Wrappers', 'Automatic Redirects', 'Persistent Auth State', 'Logout & Token Cleanup']
          }
        ]
      },
      {
        level: 6,
        title: 'Full-Stack Integration, Deployment & Production',
        description: 'Connect React frontend with Express backend, build tools, and deploy to the cloud.',
        topics: [
          {
            id: 'fs-api-integration',
            title: 'Full-Stack API Integration & State Synchronization',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Build unified API services, manage loading spinners, handle error toasts, synchronize frontend form state with backend endpoints, and handle optimistic updates.',
            whyItMatters: 'Bridges the gap between independent frontend and backend codebases into a unified product.',
            concepts: ['Unified API Service Client', 'Loading & Error States', 'Form State Sync', 'Toast Notifications']
          },
          {
            id: 'fs-cloud-deployment',
            title: 'Production Build, Environment Variables & Cloud Deployment',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'Configure Vite production builds, serve static client files from Express in production, manage environment variables (.env), and deploy to Render/Vercel.',
            whyItMatters: 'Takes your project from localhost to a live URL that recruiters, professors, and peers can test.',
            concepts: ['Vite Production Build', 'Express Static File Serving', 'Environment Configuration', 'Live Cloud Hosting']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Personal Knowledge Notes Manager',
        difficulty: 'Easy',
        description: 'Build a full-stack note-taking app with create, search, edit, delete, and tag categorization features.',
        skills: ['React', 'Node.js', 'Express', 'MongoDB']
      },
      {
        title: 'Student Academic GPA & Grade Calculator',
        difficulty: 'Easy',
        description: 'Develop an academic transcript logger where students calculate semester CGPA and view credit breakdowns.',
        skills: ['React', 'Node.js', 'Express', 'MongoDB']
      },
      {
        title: 'Full-Stack Job & Internship Application Portal',
        difficulty: 'Medium',
        description: 'Construct a multi-role job portal where students apply for internships and recruiters manage candidate applications.',
        skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT']
      },
      {
        title: 'Personal Finance & Expense Analytics Dashboard',
        difficulty: 'Medium',
        description: 'Build a full-stack finance manager to log expenses, categorize budgets, generate visual income charts, and export reports.',
        skills: ['React', 'Chart.js', 'Node.js', 'MongoDB Aggregation']
      },
      {
        title: 'Enterprise Resource & Inventory Management Platform',
        difficulty: 'Hard',
        description: 'Create an enterprise-grade platform with inventory alerts, supplier workflows, role permissions, and live analytics.',
        skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker']
      }
    ],
    interviewPreparation: [
      'Explain the full request-response lifecycle from a React button click to MongoDB query and back.',
      'How does JWT authentication work across a separate React frontend and Express backend?',
      'What are the advantages of using the MERN stack compared to traditional server-rendered architectures?',
      'How do you manage global state (e.g. current user, theme) in a React application without third-party libraries?',
      'How do you deploy a MERN application? How are static assets served alongside API routes?'
    ],
    recommendedResources: [
      { title: 'Full Stack Open — University of Helsinki', type: 'Course', url: 'https://fullstackopen.com' },
      { title: 'Mongoose Documentation', type: 'Documentation', url: 'https://mongoosejs.com' },
      { title: 'React Documentation', type: 'Documentation', url: 'https://react.dev' }
    ]
  },

  // 4. SOFTWARE ENGINEER
  {
    id: 'software-engineer',
    slug: 'software-engineer',
    title: 'Software Engineer',
    category: 'Software Development',
    branches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical'],
    icon: 'fa-solid fa-laptop-code',
    description: 'Master Data Structures & Algorithms, Object-Oriented Design, System Design, databases, clean architecture, and technical interview problem solving.',
    requiredSkills: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms', 'OOP', 'System Design', 'SQL', 'Git'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Core Programming & Memory Model',
        description: 'Master C++ / Java / Python syntax, memory allocation, pointers/references, and time complexity.',
        topics: [
          {
            id: 'se-programming-lang',
            title: 'Core Language Syntax, Memory Model & Pointers',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 16,
            description: 'Master C++ / Java language features, stack vs heap memory allocation, pointers, references, value vs reference passing, and garbage collection.',
            whyItMatters: 'Deep programming language mastery is required for writing memory-safe, performant code.',
            concepts: ['Stack vs Heap Memory', 'Pointers & References', 'Pass by Value vs Reference', 'Memory Leaks & Smart Pointers']
          },
          {
            id: 'se-complexity-analysis',
            title: 'Asymptotic Analysis: Big-O, Big-Omega & Big-Theta',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 10,
            description: 'Analyze time complexity, space complexity, recursion tree recurrence relations (Master Theorem), and identify best, average, and worst cases.',
            whyItMatters: 'Enables you to mathematically prove algorithm scalability before writing code.',
            concepts: ['Big-O Notation', 'Time vs Space Complexity', 'Master Theorem for Recurrences', 'Auxiliary Space Analysis']
          }
        ]
      },
      {
        level: 2,
        title: 'Fundamental Data Structures',
        description: 'Implement and master linear and associative data structures.',
        topics: [
          {
            id: 'se-arrays-strings',
            title: 'Arrays, Strings, Two Pointers & Sliding Window',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 16,
            description: 'Array manipulation, string parsing, Two Pointers technique, Sliding Window patterns, prefix sums, and binary search.',
            whyItMatters: 'Forms the basis of over 50% of software engineering technical interview problems.',
            concepts: ['Two Pointers Technique', 'Sliding Window Pattern', 'Prefix Sums & Kadane\'s Algorithm', 'Binary Search Variations']
          },
          {
            id: 'se-linked-lists',
            title: 'Linked Lists (Singly, Doubly, Circular)',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 12,
            description: 'Implement node pointers, list reversal, cycle detection (Floyd\'s Tortoise and Hare algorithm), merge two sorted lists, and LRU cache basics.',
            whyItMatters: 'Teaches explicit pointer manipulation and dynamic memory allocation.',
            concepts: ['Pointer Node Manipulation', 'Cycle Detection Algorithm', 'Fast & Slow Pointers', 'List Reversal in O(1) Space']
          },
          {
            id: 'se-stacks-queues',
            title: 'Stacks, Queues & Monotonic Data Structures',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'LIFO stack operations, FIFO queues, circular queues, deques, and monotonic stack patterns (Next Greater Element).',
            whyItMatters: 'Used extensively in expression evaluation, undo history, recursion simulation, and task scheduling.',
            concepts: ['Stack LIFO & Queue FIFO', 'Monotonic Stack Pattern', 'Expression Parsing (Infix to Postfix)', 'Deque / Double-Ended Queue']
          }
        ]
      },
      {
        level: 3,
        title: 'Non-Linear Data Structures & Trees',
        description: 'Master hierarchical trees, heaps, and balanced search structures.',
        topics: [
          {
            id: 'se-binary-trees',
            title: 'Binary Trees & Binary Search Trees (BST)',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 18,
            description: 'Tree traversals (Inorder, Preorder, Postorder, Level-Order BFS), height/depth calculations, Lowest Common Ancestor (LCA), and BST search/insertion.',
            whyItMatters: 'Hierarchical trees represent file systems, DOM trees, and efficient database indexing structures.',
            concepts: ['Tree DFS Traversals (In/Pre/Post)', 'Level-Order BFS Traversal', 'BST Invariant & Validation', 'Lowest Common Ancestor']
          },
          {
            id: 'se-heaps-priority-queues',
            title: 'Heaps, Priority Queues & Hash Maps',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Min-Heap and Max-Heap implementation, heapify algorithm in O(N), top-K elements problem, hash collision resolution (chaining, open addressing).',
            whyItMatters: 'Priority queues drive Dijkstra\'s shortest path algorithm, OS task schedulers, and O(1) lookup hash tables.',
            concepts: ['Binary Heap Array Representation', 'Heapify Algorithm & PriorityQueue', 'Top-K Elements Pattern', 'Hash Functions & Collision Chaining']
          }
        ]
      },
      {
        level: 4,
        title: 'Advanced Algorithms & Problem Solving',
        description: 'Master graphs, dynamic programming, and greedy algorithms.',
        topics: [
          {
            id: 'se-graphs',
            title: 'Graph Theory, BFS, DFS & Shortest Path (Dijkstra)',
            importance: 'essential',
            difficulty: 'advanced',
            estimatedHours: 20,
            description: 'Adjacency list representations, Breadth-First Search (BFS), Depth-First Search (DFS), topological sort, connected components, cycle detection, and Dijkstra\'s algorithm.',
            whyItMatters: 'Graphs model computer networks, social connections, GPS road mapping, and dependency trees.',
            concepts: ['Graph Representation (Matrix vs List)', 'BFS & DFS Traversals', 'Topological Sort (Kahn\'s Algorithm)', 'Dijkstra\'s Shortest Path Algorithm']
          },
          {
            id: 'se-dynamic-programming',
            title: 'Dynamic Programming (Memoization & Tabulation)',
            importance: 'essential',
            difficulty: 'advanced',
            estimatedHours: 24,
            description: 'Identify overlapping subproblems, optimal substructure, top-down memoization, bottom-up tabulation, 0/1 Knapsack, Longest Common Subsequence (LCS), and grid paths.',
            whyItMatters: 'DP transforms exponential time problems O(2^N) into polynomial time O(N^2) or O(N).',
            concepts: ['Memoization vs Tabulation', '0/1 Knapsack Problem Pattern', 'Longest Common Subsequence (LCS)', 'State Space Reduction']
          }
        ]
      },
      {
        level: 5,
        title: 'Object-Oriented Design & SOLID Principles',
        description: 'Write maintainable, modular, and extensible enterprise software.',
        topics: [
          {
            id: 'se-oop-core',
            title: 'Four Pillars of OOP & SOLID Design Principles',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Encapsulation, Inheritance, Polymorphism, Abstraction, and the SOLID principles (Single Responsibility, Open-Closed, Liskov, Interface Segregation, Dependency Inversion).',
            whyItMatters: 'SOLID principles prevent fragile, tightly-coupled codebases that break during feature expansion.',
            concepts: ['4 Pillars (Encapsulation, Inheritance, Polymorphism, Abstraction)', 'Single Responsibility & Open-Closed', 'Liskov Substitution Principle', 'Dependency Injection']
          },
          {
            id: 'se-design-patterns',
            title: 'Software Design Patterns (GoF)',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Creational patterns (Factory, Singleton, Builder), Structural patterns (Adapter, Decorator, Facade), Behavioral patterns (Observer, Strategy, Command).',
            whyItMatters: 'Design patterns provide battle-tested solutions to recurring software engineering design problems.',
            concepts: ['Factory & Singleton Patterns', 'Observer & Pub/Sub Pattern', 'Strategy & Command Patterns', 'Adapter & Decorator Patterns']
          }
        ]
      },
      {
        level: 6,
        title: 'System Design & Scalable Architecture',
        description: 'Design distributed, scalable, fault-tolerant backend systems.',
        topics: [
          {
            id: 'se-system-design-basics',
            title: 'System Design Fundamentals & Scalability',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 18,
            description: 'Horizontal vs vertical scaling, load balancers (Round Robin, Least Connections), CDN caching, database sharding/replication, and CAP theorem.',
            whyItMatters: 'Essential for senior engineering roles and understanding how systems scale to millions of users.',
            concepts: ['Load Balancing Algorithms', 'Caching Layers (Redis / CDN)', 'Database Replication & Sharding', 'CAP Theorem & PACELC']
          },
          {
            id: 'se-distributed-systems',
            title: 'Distributed Systems, Rate Limiting & Message Brokers',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 16,
            description: 'Design real-world systems: TinyURL, Rate Limiter (Token Bucket algorithm), News Feed system, and asynchronous messaging with Kafka.',
            whyItMatters: 'Demonstrates end-to-end architectural maturity in engineering interviews.',
            concepts: ['Rate Limiting (Token Bucket / Leaky Bucket)', 'Consistent Hashing Algorithm', 'Message Queues (Kafka / RabbitMQ)', 'Microservices Communication']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Custom In-Memory Key-Value Store (Redis Clone)',
        difficulty: 'Easy',
        description: 'Build a thread-safe in-memory key-value database supporting GET, SET, EXPIRE, and TTL with TCP socket server.',
        skills: ['C++ / Java', 'Sockets', 'Hash Maps', 'Concurrency']
      },
      {
        title: 'Expression Evaluator & Scientific Calculator Engine',
        difficulty: 'Easy',
        description: 'Develop a mathematical expression evaluator parsing complex equations using the Shunting-Yard algorithm and AST.',
        skills: ['Data Structures', 'Stacks', 'AST Trees', 'Parsing']
      },
      {
        title: 'High-Performance Thread Pool & Task Scheduler',
        difficulty: 'Medium',
        description: 'Implement a work-stealing multi-threaded thread pool with mutex locking, condition variables, and task queues.',
        skills: ['Multi-threading', 'Mutexes', 'Condition Variables', 'Concurrency']
      },
      {
        title: 'Full-Featured Git Version Control System CLI Clone',
        difficulty: 'Medium',
        description: 'Construct a command-line tool implementing git init, hash-object, write-tree, commit-tree, and checkout using SHA-1 blobs.',
        skills: ['C++ / Python', 'File Systems', 'Cryptography', 'Graph DAGs']
      },
      {
        title: 'Distributed Scalable URL Shortener & Analytics System',
        difficulty: 'Hard',
        description: 'Design and build a scalable URL shortener with distributed ID generation (Snowflake), Redis caching, and rate limiting.',
        skills: ['System Design', 'Distributed Systems', 'Redis', 'PostgreSQL']
      }
    ],
    interviewPreparation: [
      'Explain how to detect and remove a cycle in a Singly Linked List with mathematical proof of Floyd\'s algorithm.',
      'Explain the difference between Dijkstra\'s, Bellman-Ford, and Floyd-Warshall shortest path algorithms.',
      'How does a Hash Map handle collisions under the hood? Explain Chaining vs Open Addressing with load factors.',
      'Explain the SOLID design principles with concrete code examples for each letter.',
      'How would you design a distributed rate limiter for an API receiving 100,000 requests per second?'
    ],
    recommendedResources: [
      { title: 'LeetCode Problem Sets', type: 'Practice', url: 'https://leetcode.com' },
      { title: 'System Design Primer (GitHub)', type: 'Guide', url: 'https://github.com/donnemartin/system-design-primer' },
      { title: 'GeeksforGeeks Data Structures & Algorithms', type: 'Tutorial', url: 'https://www.geeksforgeeks.org' }
    ]
  },

  // 5. DEVOPS ENGINEER
  {
    id: 'devops-engineer',
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Cloud & DevOps',
    branches: ['CSE', 'IT', 'ECE'],
    icon: 'fa-solid fa-infinity',
    description: 'Bridge software development and IT operations through Linux administration, Docker containers, Kubernetes orchestration, CI/CD pipelines, Terraform IaC, and cloud platforms.',
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD (GitHub Actions)', 'Prometheus', 'Git'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Linux Administration & Bash Automation',
        description: 'Linux operating system mastery, shell scripting, networking, and system diagnostics.',
        topics: [
          {
            id: 'do-linux-core',
            title: 'Linux OS Architecture, File Systems & Permissions',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 12,
            description: 'Navigate Linux directory hierarchy (/etc, /var, /proc), manage user accounts, chmod/chown permissions, and inspect processes with top, htop, and systemctl.',
            whyItMatters: 'Linux runs nearly all cloud servers, containers, and Kubernetes nodes.',
            concepts: ['Linux Directory Tree', 'User & Group Permissions', 'systemd Services & Daemons', 'Process Inspection & Signals']
          },
          {
            id: 'do-bash-scripting',
            title: 'Bash Shell Scripting & Automated Cron Jobs',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 12,
            description: 'Write automated bash scripts with variables, conditionals, loops, functions, exit codes, sed/awk text filtering, and schedule cron jobs.',
            whyItMatters: 'Bash scripting automates daily server maintenance, backup creation, and deployment triggers.',
            concepts: ['Bash Syntax & Functions', 'sed, awk & grep Text Processing', 'Exit Codes & Error Trapping', 'Crontab Scheduling']
          }
        ]
      },
      {
        level: 2,
        title: 'Networking & Security Protocols',
        description: 'Master computer networking, firewalls, and secure communications.',
        topics: [
          {
            id: 'do-networking-protocols',
            title: 'DNS, TCP/UDP, SSH & Reverse Proxies (Nginx)',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 12,
            description: 'DNS records (A, CNAME, MX), port forwarding, SSH key authentication, iptables/UFW firewalls, and Nginx reverse proxy configuration with SSL.',
            whyItMatters: 'DevOps engineers manage web traffic routing, domain mappings, and server security perimeters.',
            concepts: ['DNS Resolution & Records', 'SSH Key Authentication & Hardening', 'Nginx Virtual Hosts & Upstreams', 'SSL/TLS & Let\'s Encrypt Certbot']
          }
        ]
      },
      {
        level: 3,
        title: 'Containers with Docker',
        description: 'Package applications into lightweight, portable, isolated container images.',
        topics: [
          {
            id: 'do-docker-fundamentals',
            title: 'Docker Architecture, Images & Multi-Stage Dockerfiles',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Docker daemon, client, registry, writing optimized multi-stage Dockerfiles, managing image layer cache, and minimizing image size with Alpine base images.',
            whyItMatters: 'Docker guarantees that applications run identically in development, staging, and production.',
            concepts: ['Container vs Virtual Machine', 'Multi-Stage Dockerfiles', 'Image Layer Optimization', 'Docker Hub & Registries']
          },
          {
            id: 'do-docker-compose-networking',
            title: 'Docker Networking, Volumes & Docker Compose',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'Container bridge networks, port mapping, named persistent volumes, bind mounts, and multi-container orchestration with Docker Compose.',
            whyItMatters: 'Allows running complete full-stack applications (App + DB + Redis) with a single command.',
            concepts: ['Docker Bridge & Overlay Networks', 'Persistent Data Volumes', 'Docker Compose YAML Syntax', 'Environment File Integration']
          }
        ]
      },
      {
        level: 4,
        title: 'CI/CD Pipelines & Automation',
        description: 'Automate software building, testing, linting, and continuous deployment.',
        topics: [
          {
            id: 'do-github-actions',
            title: 'Continuous Integration with GitHub Actions',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Workflow YAML definitions, triggers (push, pull_request), runner environments, matrix builds, automated test execution, and secrets management.',
            whyItMatters: 'CI prevents broken code from being merged into main branches.',
            concepts: ['Workflow Triggers & Jobs', 'Steps, Actions & Runners', 'Secrets & Environment Variables', 'Artifacts & Build Caching']
          },
          {
            id: 'do-cd-deployment-pipelines',
            title: 'Continuous Deployment (CD) & Release Strategies',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'Automated Docker image publishing, Blue-Green deployments, Rolling updates, Canary releases, and zero-downtime server deployments.',
            whyItMatters: 'Enables rapid, risk-free deployment of software updates to end users.',
            concepts: ['Blue-Green Deployment', 'Canary Releases', 'Automated Image Publishing', 'Rollback Strategies']
          }
        ]
      },
      {
        level: 5,
        title: 'Infrastructure as Code (IaC) with Terraform',
        description: 'Provision cloud infrastructure programmatically using code.',
        topics: [
          {
            id: 'do-terraform-iac',
            title: 'Terraform HCL, Providers & State Management',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'HashiCorp Configuration Language (HCL), provider configuration (AWS/GCP), resources, variables, outputs, and remote state locking with S3 & DynamoDB.',
            whyItMatters: 'IaC allows entire cloud architectures to be version-controlled, audited, and reproduced in minutes.',
            concepts: ['HCL Syntax & Providers', 'terraform init, plan, apply, destroy', 'Remote State & S3 Backend', 'Terraform Reusable Modules']
          }
        ]
      },
      {
        level: 6,
        title: 'Container Orchestration with Kubernetes (K8s)',
        description: 'Manage containerized applications at enterprise scale.',
        topics: [
          {
            id: 'do-kubernetes-core',
            title: 'Kubernetes Architecture, Pods, Deployments & Services',
            importance: 'essential',
            difficulty: 'advanced',
            estimatedHours: 20,
            description: 'Master plane (API Server, etcd, Scheduler, Controller Manager), Worker nodes (Kubelet, Kube-Proxy), Pod lifecycle, Deployments, ReplicaSets, and ClusterIP/NodePort Services.',
            whyItMatters: 'Kubernetes is the global standard for container scaling, self-healing, and zero-downtime deployment.',
            concepts: ['K8s Control Plane & Nodes', 'Pods & ReplicaSets', 'Deployments & Rolling Updates', 'ClusterIP & NodePort Services']
          },
          {
            id: 'do-kubernetes-ingress-helm',
            title: 'Ingress Controllers, ConfigMaps, Secrets & Helm Charts',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 16,
            description: 'Nginx Ingress routing, SSL termination, ConfigMaps for environment injection, Secret encryption, and package management with Helm.',
            whyItMatters: 'Provides production-grade routing, configuration management, and templated application deployment in Kubernetes.',
            concepts: ['Ingress Controllers & Rules', 'ConfigMaps & K8s Secrets', 'PersistentVolumeClaims (PVC)', 'Helm Charts & Values']
          }
        ]
      },
      {
        level: 7,
        title: 'Observability, Monitoring & DevSecOps',
        description: 'Monitor cluster metrics, aggregate logs, set alerts, and secure infrastructure.',
        topics: [
          {
            id: 'do-prometheus-grafana',
            title: 'Prometheus Metrics & Grafana Dashboards',
            importance: 'essential',
            difficulty: 'advanced',
            estimatedHours: 14,
            description: 'Scrape application metrics with Prometheus, write PromQL queries, create interactive Grafana visualization dashboards, and configure Alertmanager notifications.',
            whyItMatters: 'Alerts teams instantly when CPU spikes, memory leaks occur, or error rates increase.',
            concepts: ['Prometheus Metric Types (Counter, Gauge, Histogram)', 'PromQL Query Language', 'Grafana Dashboard Visualizations', 'Alertmanager Email/Slack Alerts']
          },
          {
            id: 'do-devsecops',
            title: 'DevSecOps: Secrets Management (Vault) & Security Auditing',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 12,
            description: 'Container vulnerability scanning with Trivy, static code analysis (SonarQube), secrets management with HashiCorp Vault, and IAM least privilege.',
            whyItMatters: 'Embeds security testing into every stage of the development lifecycle.',
            concepts: ['Vulnerability Scanning (Trivy)', 'Secrets Management (Vault)', 'IAM Least Privilege Security', 'Audit Logging & Compliance']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Automated Multi-Service Linux Server Setup Script',
        difficulty: 'Easy',
        description: 'Write a Bash automation script to install Nginx, Node.js, firewall rules, and SSL certificates on a fresh Ubuntu server.',
        skills: ['Linux', 'Bash', 'Nginx', 'UFW']
      },
      {
        title: 'Multi-Stage Dockerized MERN Stack Application',
        difficulty: 'Easy',
        description: 'Containerize a full-stack React + Express + MongoDB application with multi-stage Dockerfiles and Docker Compose.',
        skills: ['Docker', 'Docker Compose', 'Multi-Stage Builds']
      },
      {
        title: 'Automated CI/CD Pipeline with GitHub Actions',
        difficulty: 'Medium',
        description: 'Build a GitHub Actions workflow that runs automated tests, builds Docker images, and deploys to a cloud server.',
        skills: ['GitHub Actions', 'CI/CD', 'Docker', 'SSH']
      },
      {
        title: 'Terraform AWS Cloud Infrastructure as Code',
        difficulty: 'Medium',
        description: 'Provision an AWS VPC, EC2 instances, S3 bucket, and RDS PostgreSQL database using modular Terraform scripts.',
        skills: ['Terraform', 'AWS', 'IaC', 'VPC Networking']
      },
      {
        title: 'Production Kubernetes Cluster with Prometheus & Grafana',
        difficulty: 'Hard',
        description: 'Deploy a microservices application on Kubernetes with Ingress routing, auto-scaling (HPA), Prometheus metrics, and Grafana dashboards.',
        skills: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana']
      }
    ],
    interviewPreparation: [
      'Explain the difference between a Container and a Virtual Machine. How do Linux Namespaces and Cgroups work?',
      'How does a Kubernetes Deployment ensure zero-downtime during a rolling update?',
      'Explain the difference between Blue-Green Deployment and Canary Deployment. When would you use each?',
      'What is Terraform Remote State? Why is state locking with DynamoDB necessary in team environments?',
      'How do Prometheus Pull mechanisms differ from traditional Push-based monitoring systems?'
    ],
    recommendedResources: [
      { title: 'Docker Official Documentation & Labs', type: 'Documentation', url: 'https://docs.docker.com' },
      { title: 'Kubernetes Official Documentation (kubernetes.io)', type: 'Documentation', url: 'https://kubernetes.io' },
      { title: 'Terraform by HashiCorp Tutorials', type: 'Documentation', url: 'https://developer.hashicorp.com/terraform' }
    ]
  },

  // 6. DATA ANALYST
  {
    id: 'data-analyst',
    slug: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & AI',
    branches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil'],
    icon: 'fa-solid fa-chart-pie',
    description: 'Transform raw data into business intelligence using Advanced SQL, Excel, Python (Pandas/NumPy), Tableau, Power BI, and statistical analysis.',
    requiredSkills: ['SQL', 'Excel', 'Python (Pandas, NumPy)', 'Power BI', 'Tableau', 'Statistics', 'Data Cleaning'],
    estimatedMonths: '4–5 Months',
    stages: [
      {
        level: 1,
        title: 'Spreadsheets & Business Analytics Fundamentals',
        description: 'Master advanced Excel / Google Sheets, pivot tables, lookup formulas, and financial modeling.',
        topics: [
          {
            id: 'da-excel-advanced',
            title: 'Advanced Excel: Formulas, XLOOKUP & Pivot Tables',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 12,
            description: 'Master XLOOKUP, INDEX/MATCH, nested IF/AND/OR logic, dynamic Pivot Tables, Slicers, and data formatting for executive reporting.',
            whyItMatters: 'Excel remains the most widely used business analytics tool across all corporate industries.',
            concepts: ['XLOOKUP & INDEX/MATCH', 'Pivot Tables & Slicers', 'Conditional Formatting', 'Data Validation Rules']
          }
        ]
      },
      {
        level: 2,
        title: 'Database Querying with Advanced SQL',
        description: 'Master relational data extraction, aggregation, window functions, and CTEs.',
        topics: [
          {
            id: 'da-sql-fundamentals',
            title: 'SQL Fundamentals: Joins, Aggregations & Grouping',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 14,
            description: 'Write SELECT queries with WHERE filters, multi-table JOINs (INNER, LEFT, RIGHT, FULL), GROUP BY, HAVING, and aggregate functions (COUNT, SUM, AVG).',
            whyItMatters: 'SQL is the universal language for querying enterprise data warehouses.',
            concepts: ['SQL Joins & Relationships', 'Aggregate Functions', 'GROUP BY & HAVING Clauses', 'Filtering & Sorting']
          },
          {
            id: 'da-sql-advanced',
            title: 'Advanced SQL: Window Functions & CTEs',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Master Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, NTILE), Common Table Expressions (WITH CTE), and subqueries.',
            whyItMatters: 'Crucial for running cohort analysis, cumulative running totals, and ranking calculations.',
            concepts: ['Window Functions & PARTITION BY', 'LEAD / LAG Time Shifts', 'Common Table Expressions (CTEs)', 'Complex Subqueries']
          }
        ]
      },
      {
        level: 3,
        title: 'Python for Data Analysis (Pandas & NumPy)',
        description: 'Clean, transform, and analyze tabular datasets with Python.',
        topics: [
          {
            id: 'da-python-pandas',
            title: 'Data Cleaning & Manipulation with Pandas & NumPy',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 18,
            description: 'Pandas DataFrames, handling missing data (dropna, fillna), filtering, groupby aggregations, merging/joining datasets, and reshaping with melt/pivot_table.',
            whyItMatters: 'Pandas automates complex multi-step data cleaning workflows on millions of rows.',
            concepts: ['DataFrame Indexing & Slicing', 'Handling Missing Values & Outliers', 'GroupBy & Aggregation Methods', 'Merge & Concatenation']
          }
        ]
      },
      {
        level: 4,
        title: 'Exploratory Data Analysis & Visualization',
        description: 'Uncover patterns, anomalies, and insights using data visualization libraries.',
        topics: [
          {
            id: 'da-data-viz-python',
            title: 'Data Visualization with Matplotlib & Seaborn',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'Create histograms, scatter plots, heatmaps, box plots, and bar charts to explore correlations, distributions, and outliers.',
            whyItMatters: 'Visual storytelling helps non-technical stakeholders understand complex analytical insights.',
            concepts: ['Distribution & Box Plots', 'Correlation Heatmaps', 'Scatter Plots & Trendlines', 'Visual Storytelling']
          }
        ]
      },
      {
        level: 5,
        title: 'Business Intelligence Dashboards (Power BI / Tableau)',
        description: 'Build executive BI dashboards with interactive filters and DAX measures.',
        topics: [
          {
            id: 'da-powerbi-tableau',
            title: 'Power BI / Tableau Dashboards & DAX Measures',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Connect to SQL/Excel data sources, build Star Schema data models, write DAX calculated measures (CALCULATE, SUMX, DATESYTD), and design interactive reports.',
            whyItMatters: 'BI dashboards provide real-time business visibility to leadership teams.',
            concepts: ['Star Schema Data Modeling', 'DAX Measures & Time Intelligence', 'Interactive Cross-Filtering', 'Executive KPI Cards']
          }
        ]
      },
      {
        level: 6,
        title: 'Applied Statistics & A/B Testing',
        description: 'Validate business hypotheses with statistical rigor.',
        topics: [
          {
            id: 'da-statistics-ab-testing',
            title: 'Business Statistics, Hypothesis Testing & A/B Experiments',
            importance: 'important',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Descriptive vs inferential statistics, normal distribution, z-scores, p-values, t-tests, chi-square tests, confidence intervals, and A/B test design.',
            whyItMatters: 'Prevents making expensive business decisions based on random noise or false correlations.',
            concepts: ['P-Values & Significance Level', 'T-Tests & ANOVA', 'A/B Testing Framework', 'Confidence Intervals']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Retail Store Sales Performance Excel Dashboard',
        difficulty: 'Easy',
        description: 'Build an interactive Excel dashboard with Pivot Tables, XLOOKUP, and KPI cards analyzing regional store sales.',
        skills: ['Excel', 'Pivot Tables', 'XLOOKUP', 'KPIs']
      },
      {
        title: 'E-Commerce SQL Customer Cohort & Retention Analysis',
        difficulty: 'Easy',
        description: 'Write complex SQL queries with Window Functions and CTEs to analyze monthly customer retention rates.',
        skills: ['SQL', 'Window Functions', 'CTEs', 'PostgreSQL']
      },
      {
        title: 'Exploratory Data Analysis on Global Tech Salaries',
        difficulty: 'Medium',
        description: 'Clean and analyze tech salary data using Python, Pandas, and Seaborn to identify compensation trends across countries.',
        skills: ['Python', 'Pandas', 'Seaborn', 'EDA']
      },
      {
        title: 'Executive Power BI Supply Chain & Inventory Dashboard',
        difficulty: 'Medium',
        description: 'Design a multi-page Power BI dashboard with DAX measures, inventory turnover metrics, and supplier performance tracking.',
        skills: ['Power BI', 'DAX', 'Data Modeling', 'Star Schema']
      },
      {
        title: 'End-to-End A/B Testing Analysis & Recommendation Report',
        difficulty: 'Hard',
        description: 'Conduct a complete statistical A/B test analysis in Python to evaluate landing page conversion rates and present findings.',
        skills: ['Python', 'Hypothesis Testing', 'A/B Testing', 'Statistics']
      }
    ],
    interviewPreparation: [
      'What is the difference between RANK, DENSE_RANK, and ROW_NUMBER in SQL?',
      'Explain the difference between INNER JOIN, LEFT JOIN, and CROSS JOIN with visual examples.',
      'How do you handle missing values or outliers in a large dataset using Pandas?',
      'Explain P-value and Confidence Interval in the context of an A/B test result.',
      'What is the difference between Star Schema and Snowflake Schema in data warehousing?'
    ],
    recommendedResources: [
      { title: 'Mode Analytics SQL Tutorial', type: 'Tutorial', url: 'https://mode.com/sql-tutorial' },
      { title: 'Kaggle Datasets & Learn Tracks', type: 'Practice', url: 'https://www.kaggle.com' },
      { title: 'Microsoft Power BI Documentation', type: 'Documentation', url: 'https://learn.microsoft.com/power-bi' }
    ]
  },

  // 7. DATA SCIENTIST
  {
    id: 'data-scientist',
    slug: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & AI',
    branches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical'],
    icon: 'fa-solid fa-brain',
    description: 'Build predictive machine learning models, statistical inference pipelines, deep learning neural networks, and deploy ML models into production.',
    requiredSkills: ['Python', 'Machine Learning', 'Scikit-Learn', 'Deep Learning (PyTorch)', 'Statistics', 'Pandas', 'SQL', 'FastAPI'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Mathematics & Statistical Foundations',
        description: 'Linear algebra, multivariate calculus, probability, and statistical theory for machine learning.',
        topics: [
          {
            id: 'ds-math-stats',
            title: 'Linear Algebra, Calculus & Probability Theory',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 16,
            description: 'Matrix operations, eigenvalues/eigenvectors, partial derivatives, gradient descent optimization, Bayes theorem, and probability distributions.',
            whyItMatters: 'Math is the underlying engine behind all machine learning optimization algorithms.',
            concepts: ['Matrix Multiplication & Eigenvectors', 'Partial Derivatives & Gradients', 'Probability Distributions', 'Bayes Theorem']
          }
        ]
      },
      {
        level: 2,
        title: 'Data Preprocessing & Feature Engineering',
        description: 'Transform raw data into optimal features for machine learning algorithms.',
        topics: [
          {
            id: 'ds-feature-engineering',
            title: 'Feature Encoding, Scaling & Dimensionality Reduction',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'One-hot encoding, target encoding, standard scaling, min-max scaling, handling class imbalance (SMOTE), and Principal Component Analysis (PCA).',
            whyItMatters: 'Feature quality determines the upper ceiling of machine learning model performance.',
            concepts: ['One-Hot & Ordinal Encoding', 'Standard vs MinMax Scaling', 'Imbalance Handling with SMOTE', 'Principal Component Analysis (PCA)']
          }
        ]
      },
      {
        level: 3,
        title: 'Supervised & Unsupervised Machine Learning',
        description: 'Train, evaluate, and tune classical machine learning algorithms.',
        topics: [
          {
            id: 'ds-supervised-ml',
            title: 'Regression, Classification & Ensemble Methods',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 20,
            description: 'Linear & Logistic Regression, Decision Trees, Random Forests, Gradient Boosting (XGBoost, LightGBM), and hyperparameter tuning with GridSearchCV.',
            whyItMatters: 'Ensemble trees win the majority of structured data competitions and real-world predictive modeling tasks.',
            concepts: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'XGBoost & Gradient Boosting', 'Hyperparameter Cross-Validation']
          },
          {
            id: 'ds-model-evaluation',
            title: 'Model Evaluation Metrics & Bias-Variance Tradeoff',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'Precision, Recall, F1-score, ROC-AUC curve, Confusion Matrix, Mean Squared Error (MSE), R-squared, and preventing overfitting.',
            whyItMatters: 'Ensures models generalize accurately on unseen real-world test data.',
            concepts: ['Confusion Matrix & F1-Score', 'ROC Curve & AUC Score', 'Bias-Variance Tradeoff', 'K-Fold Cross-Validation']
          }
        ]
      },
      {
        level: 4,
        title: 'Deep Learning & Neural Networks',
        description: 'Build neural networks for computer vision and NLP with PyTorch.',
        topics: [
          {
            id: 'ds-deep-learning-pytorch',
            title: 'Deep Learning with PyTorch & Neural Networks',
            importance: 'essential',
            difficulty: 'advanced',
            estimatedHours: 22,
            description: 'Feedforward Neural Networks, Backpropagation, Activation Functions (ReLU, Softmax), Optimizers (Adam), Loss Functions, and CNNs for image classification.',
            whyItMatters: 'Deep learning powers state-of-the-art AI, computer vision, and speech recognition.',
            concepts: ['Tensors & Autograd in PyTorch', 'Backpropagation & Loss Functions', 'Activation Functions & Optimizers', 'Convolutional Neural Networks (CNNs)']
          }
        ]
      },
      {
        level: 5,
        title: 'Natural Language Processing & Transformers',
        description: 'Text preprocessing, embeddings, and modern Transformer architectures.',
        topics: [
          {
            id: 'ds-nlp-transformers',
            title: 'NLP, Word Embeddings & HuggingFace Transformers',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 18,
            description: 'Tokenization, TF-IDF, Word2Vec, Attention Mechanism, BERT, and fine-tuning Transformer models using HuggingFace.',
            whyItMatters: 'Transformers are the foundation of modern Large Language Models (LLMs) and text intelligence.',
            concepts: ['Tokenization & Embeddings', 'Self-Attention Mechanism', 'BERT & Transformer Architecture', 'HuggingFace Pipelines']
          }
        ]
      },
      {
        level: 6,
        title: 'MLOps & Model Deployment',
        description: 'Deploy machine learning models as production REST APIs with FastAPI and Docker.',
        topics: [
          {
            id: 'ds-mlops-deployment',
            title: 'FastAPI Model Serving & MLOps Lifecycle',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 14,
            description: 'Model serialization with joblib/pickle, building high-speed inference APIs with FastAPI, Dockerizing ML services, and experiment tracking with MLflow.',
            whyItMatters: 'A machine learning model only creates business value when deployed into a live production system.',
            concepts: ['Model Serialization (Pickle/ONNX)', 'FastAPI Inference Endpoints', 'Dockerizing ML Microservices', 'Experiment Tracking (MLflow)']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'House Price Prediction with Linear Regression',
        difficulty: 'Easy',
        description: 'Clean housing dataset, engineer square footage features, and train a regularized Ridge/Lasso regression model.',
        skills: ['Python', 'Scikit-Learn', 'Pandas', 'Regression']
      },
      {
        title: 'Customer Churn Classification with Random Forest',
        difficulty: 'Easy',
        description: 'Predict telecom customer churn using Decision Trees and Random Forest with SMOTE handling class imbalance.',
        skills: ['Scikit-Learn', 'Classification', 'SMOTE', 'ROC-AUC']
      },
      {
        title: 'Credit Card Fraud Detection Pipeline',
        difficulty: 'Medium',
        description: 'Build an anomaly detection model using XGBoost and evaluate with Precision-Recall curves on skewed transaction data.',
        skills: ['XGBoost', 'Feature Engineering', 'Imbalanced Data']
      },
      {
        title: 'Medical Image Classification with PyTorch CNN',
        difficulty: 'Medium',
        description: 'Train a Convolutional Neural Network (CNN) in PyTorch to classify chest X-ray scans with data augmentation.',
        skills: ['PyTorch', 'CNN', 'Computer Vision', 'Deep Learning']
      },
      {
        title: 'Production NLP Sentiment Analysis API Service',
        difficulty: 'Hard',
        description: 'Fine-tune a HuggingFace Transformer model, package with FastAPI, and deploy in a Docker container for live inference.',
        skills: ['Transformers', 'HuggingFace', 'FastAPI', 'Docker']
      }
    ],
    interviewPreparation: [
      'Explain the Bias-Variance Tradeoff. How do Bagging and Boosting handle bias and variance differently?',
      'How does Gradient Descent work? Explain the difference between Batch, Mini-Batch, and Stochastic Gradient Descent.',
      'Explain the difference between L1 (Lasso) and L2 (Ridge) regularization. Why does L1 result in sparse coefficients?',
      'What is the Self-Attention mechanism in Transformers? How does it differ from Recurrent Neural Networks (RNNs)?',
      'How do you handle severe class imbalance (e.g. 99.9% negative, 0.1% positive) in a classification problem?'
    ],
    recommendedResources: [
      { title: 'Scikit-Learn Official User Guide', type: 'Documentation', url: 'https://scikit-learn.org' },
      { title: 'PyTorch Deep Learning Tutorials', type: 'Tutorial', url: 'https://pytorch.org/tutorials' },
      { title: 'HuggingFace NLP Course', type: 'Course', url: 'https://huggingface.co/learn/nlp-course' }
    ]
  },

  // 8. CYBERSECURITY ANALYST
  {
    id: 'cybersecurity-analyst',
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Cybersecurity',
    branches: ['CSE', 'IT', 'ECE'],
    icon: 'fa-solid fa-shield-halved',
    description: 'Protect enterprise infrastructure, monitor threat logs, conduct vulnerability scans, master network security, SIEM analysis, and ethical hacking.',
    requiredSkills: ['Networking (TCP/IP)', 'Linux Security', 'Wireshark', 'Nmap', 'SIEM (Splunk)', 'OWASP Top 10', 'Cryptography'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Network Security Fundamentals & Packet Analysis',
        description: 'TCP/IP layers, packet inspection, firewalls, and traffic analysis.',
        topics: [
          {
            id: 'cs-networking-packets',
            title: 'TCP/IP Protocols & Packet Analysis with Wireshark',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 14,
            description: 'Deep packet inspection with Wireshark, analyzing TCP 3-way handshakes, DNS queries, HTTP payloads, ARP spoofing, and ICMP scans.',
            whyItMatters: 'Packet analysis is fundamental to diagnosing malicious traffic and intrusion attempts.',
            concepts: ['OSI Model & TCP 3-Way Handshake', 'Wireshark Packet Filters', 'ARP & DNS Spoofing Detection', 'Port Scanning Fundamentals']
          }
        ]
      },
      {
        level: 2,
        title: 'Linux & Windows System Security',
        description: 'Harden operating systems, audit permissions, and inspect system logs.',
        topics: [
          {
            id: 'cs-system-hardening',
            title: 'Linux Hardening, File Permissions & Active Directory',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 14,
            description: 'SSH key hardening, sudo privilege auditing, Linux auditd logs, Windows Active Directory domain security, and Kerberos authentication.',
            whyItMatters: 'Attackers target misconfigured server permissions to achieve privilege escalation.',
            concepts: ['Linux File Permissions & SUID', 'SSH Hardening & Fail2Ban', 'Windows Active Directory Basics', 'Kerberos Authentication']
          }
        ]
      },
      {
        level: 3,
        title: 'Security Operations & SIEM Threat Monitoring',
        description: 'Collect, correlate, and analyze security event logs.',
        topics: [
          {
            id: 'cs-siem-splunk',
            title: 'SIEM Log Analysis (Splunk / Elastic) & Incident Response',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Ingest firewall, web server, and auth logs into SIEM, write detection queries, configure alert rules, and follow the NIST Incident Response lifecycle.',
            whyItMatters: 'SIEM platforms allow SOC analysts to detect active breaches across enterprise networks.',
            concepts: ['Log Aggregation & Correlation', 'Splunk Search Processing Language (SPL)', 'NIST Incident Response Steps', 'MITRE ATT&CK Framework']
          }
        ]
      },
      {
        level: 4,
        title: 'Vulnerability Assessment & Web Security (OWASP)',
        description: 'Scan networks for vulnerabilities and defend against web attacks.',
        topics: [
          {
            id: 'cs-owasp-top-10',
            title: 'OWASP Top 10 Web Vulnerabilities & Exploits',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 18,
            description: 'Understand and remediate SQL Injection (SQLi), Cross-Site Scripting (XSS), CSRF, Broken Access Control, and SSRF vulnerabilities with Burp Suite.',
            whyItMatters: 'Web applications are the primary attack surface targeted by external hackers.',
            concepts: ['SQL Injection & Parameterized Queries', 'Reflected & Stored XSS Defense', 'Cross-Site Request Forgery (CSRF)', 'Burp Suite Proxy Interception']
          }
        ]
      },
      {
        level: 5,
        title: 'Cryptography & Public Key Infrastructure (PKI)',
        description: 'Symmetric/asymmetric encryption, hashing, and digital certificates.',
        topics: [
          {
            id: 'cs-cryptography-pki',
            title: 'Symmetric/Asymmetric Encryption, Hashing & SSL/TLS',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 12,
            description: 'AES encryption, RSA public-key crypto, SHA-256 hashing, digital signatures, SSL/TLS handshake, and Certificate Authorities (CAs).',
            whyItMatters: 'Cryptography safeguards data confidentiality, integrity, and non-repudiation.',
            concepts: ['AES-256 Symmetric Encryption', 'RSA Public/Private Key Pairs', 'SHA-256 Hashing vs Encryption', 'SSL/TLS Handshake & Certificates']
          }
        ]
      },
      {
        level: 6,
        title: 'Ethical Hacking & Penetration Testing',
        description: 'Reconnaissance, vulnerability scanning, and ethical exploitation.',
        topics: [
          {
            id: 'cs-ethical-hacking',
            title: 'Reconnaissance, Nmap Scanning & Metasploit Basics',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 16,
            description: 'OSINT reconnaissance, Nmap network scanning flags (-sS, -sV, -O), Nessus vulnerability scanning, and safe exploit verification with Metasploit in lab environments.',
            whyItMatters: 'Understanding offensive tactics is required to build airtight defensive controls.',
            concepts: ['Nmap Port Scanning Flags', 'Vulnerability Assessment with Nessus', 'Metasploit Framework Modules', 'Ethical Disclosure Guidelines']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Automated Port Scanner & Service Identifier CLI',
        difficulty: 'Easy',
        description: 'Build a Python socket script that scans IP ranges for open ports and identifies banner services.',
        skills: ['Python', 'Sockets', 'Networking', 'CLI']
      },
      {
        title: 'Packet Sniffer & HTTP Credential Warning Tool',
        difficulty: 'Easy',
        description: 'Create a Python packet sniffer using Scapy that alerts when unencrypted passwords travel over HTTP.',
        skills: ['Scapy', 'Python', 'Wireshark', 'Packet Analysis']
      },
      {
        title: 'SIEM Incident Detection & Log Analysis Rule Set',
        difficulty: 'Medium',
        description: 'Configure Splunk to detect brute-force SSH logins, SQL injection attempts, and trigger alert emails.',
        skills: ['Splunk', 'SIEM', 'Log Analysis', 'Incident Response']
      },
      {
        title: 'OWASP Top 10 Vulnerable Web App & Remediation Lab',
        difficulty: 'Medium',
        description: 'Set up an intentionally vulnerable web application, execute SQLi and XSS payloads, and write security patches.',
        skills: ['OWASP Top 10', 'Burp Suite', 'Web Security', 'Patching']
      },
      {
        title: 'Automated Vulnerability Scanner & Security Audit Pipeline',
        difficulty: 'Hard',
        description: 'Build an automated vulnerability scanner orchestrating Nmap, OWASP ZAP, and generating PDF compliance reports.',
        skills: ['Python', 'Nmap', 'OWASP ZAP', 'Reporting']
      }
    ],
    interviewPreparation: [
      'Explain the CIA Triad (Confidentiality, Integrity, Availability) with examples of security controls for each.',
      'How does an SSL/TLS Handshake work step-by-step between a client browser and server?',
      'What is the difference between Symmetric and Asymmetric encryption? Give practical use cases for both.',
      'Explain how a SQL Injection attack works. How do Parameterized Queries (Prepared Statements) prevent it?',
      'Describe the 6 phases of the NIST Incident Response lifecycle.'
    ],
    recommendedResources: [
      { title: 'OWASP Official Top 10 Project', type: 'Guide', url: 'https://owasp.org/www-project-top-ten' },
      { title: 'TryHackMe Cybersecurity Learning Paths', type: 'Practice', url: 'https://tryhackme.com' },
      { title: 'Wireshark User Guide', type: 'Documentation', url: 'https://www.wireshark.org/docs' }
    ]
  },

  // 9. EMBEDDED SYSTEMS ENGINEER
  {
    id: 'embedded-systems-engineer',
    slug: 'embedded-systems-engineer',
    title: 'Embedded Systems Engineer',
    category: 'Embedded Systems',
    branches: ['ECE', 'EEE', 'CSE'],
    icon: 'fa-solid fa-microchip',
    description: 'Develop low-level firmware in Embedded C/C++, program ARM Cortex-M/STM32 microcontrollers, master communication protocols (UART, SPI, I2C), and FreeRTOS.',
    requiredSkills: ['Embedded C', 'C++', 'STM32', 'ARM Cortex-M', 'FreeRTOS', 'UART/SPI/I2C', 'GPIO/Timers', 'Git'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Embedded C & Bitwise Memory Operations',
        description: 'Bit manipulation, pointers, structs, and register-level programming.',
        topics: [
          {
            id: 'emb-c-bitwise',
            title: 'Embedded C Bitwise Operators, Pointers & Volatile Keyword',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 14,
            description: 'Bit masking, bit shifting (&, |, ^, ~), setting/clearing register bits, memory-mapped I/O, function pointers, and the critical volatile keyword.',
            whyItMatters: 'Firmware engineers interact directly with hardware registers using bitwise C operations.',
            concepts: ['Bit Masking & Shifting', 'Memory-Mapped I/O Registers', 'Volatile Keyword & Compiler Optimization', 'Struct Packing & Alignment']
          }
        ]
      },
      {
        level: 2,
        title: 'Microcontroller Architecture & Peripherals',
        description: 'ARM Cortex-M, GPIO, Timers, ADC, and Interrupt handling.',
        topics: [
          {
            id: 'emb-mcu-peripherals',
            title: 'ARM Cortex-M Architecture, GPIO & Interrupts (NVIC)',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 16,
            description: 'ARM Cortex-M core registers, Nested Vectored Interrupt Controller (NVIC), Interrupt Service Routines (ISRs), GPIO configuration, and hardware debouncing.',
            whyItMatters: 'Interrupts allow microcontrollers to react instantaneously to real-world sensor events without blocking.',
            concepts: ['ARM Cortex-M Core Registers', 'NVIC Interrupt Priority & Preemption', 'Interrupt Service Routines (ISRs)', 'GPIO Push-Pull vs Open-Drain']
          },
          {
            id: 'emb-timers-pwm',
            title: 'Hardware Timers, PWM & Analog-to-Digital Conversion (ADC)',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Prescalers, auto-reload registers, generating PWM signals for motor control, and ADC sampling with DMA transfers.',
            whyItMatters: 'Timers and ADCs bridge digital firmware with analog physical sensors and motor actuators.',
            concepts: ['Timer Prescalers & Counting Modes', 'PWM Frequency & Duty Cycle', 'ADC Resolution & Sampling Rates', 'Direct Memory Access (DMA)']
          }
        ]
      },
      {
        level: 3,
        title: 'Hardware Communication Protocols',
        description: 'Master serial protocols: UART, SPI, I2C, and CAN bus.',
        topics: [
          {
            id: 'emb-comm-protocols',
            title: 'Serial Protocols: UART, I2C, SPI & CAN Bus',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 18,
            description: 'Baud rates, UART framing, I2C master-slave addressing with pull-up resistors, high-speed SPI synchronous transfers, and automotive CAN bus arbitration.',
            whyItMatters: 'Microcontrollers use serial protocols to communicate with sensors, displays, and external chips.',
            concepts: ['UART Asynchronous Framing', 'I2C Start/Stop & ACK/NACK Conditions', 'SPI Clock Polarity & Phase (CPOL/CPHA)', 'CAN Bus Differential Signaling']
          }
        ]
      },
      {
        level: 4,
        title: 'Real-Time Operating Systems (FreeRTOS)',
        description: 'Multi-tasking, synchronization primitives, and deterministic scheduling.',
        topics: [
          {
            id: 'emb-freertos',
            title: 'FreeRTOS Task Management, Semaphores & Queues',
            importance: 'essential',
            difficulty: 'advanced',
            estimatedHours: 20,
            description: 'Preemptive priority scheduling, task states, mutexes, counting/binary semaphores, message queues, and preventing Priority Inversion.',
            whyItMatters: 'FreeRTOS allows complex firmware to execute multiple tasks concurrently with deterministic real-time deadlines.',
            concepts: ['Preemptive Task Scheduling', 'Mutexes vs Binary Semaphores', 'Inter-Task Message Queues', 'Priority Inversion & Mutex Inheritance']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Bare-Metal STM32 GPIO LED Sequencer & Button Debouncer',
        difficulty: 'Easy',
        description: 'Program register-level GPIO toggling with software and timer interrupt debouncing in Embedded C.',
        skills: ['Embedded C', 'STM32', 'GPIO', 'Registers']
      },
      {
        title: 'UART Command-Line Shell Interface for Microcontroller',
        difficulty: 'Easy',
        description: 'Build an interactive serial CLI over UART to query sensor readings and trigger hardware pins.',
        skills: ['UART', 'Embedded C', 'CLI', 'Buffers']
      },
      {
        title: 'I2C Digital Temperature & OLED Display Driver',
        difficulty: 'Medium',
        description: 'Write custom I2C drivers to read data from a temperature sensor and render telemetry on an SSD1306 OLED screen.',
        skills: ['I2C', 'Device Drivers', 'OLED', 'Sensors']
      },
      {
        title: 'Multi-Tasking FreeRTOS Telemetry & Motor Controller',
        difficulty: 'Medium',
        description: 'Implement a FreeRTOS application with separate tasks for sensor sampling, PID motor control, and serial logging.',
        skills: ['FreeRTOS', 'Queues', 'Mutexes', 'PWM']
      },
      {
        title: 'Automotive CAN Bus Electronic Control Unit (ECU) Simulator',
        difficulty: 'Hard',
        description: 'Develop a two-node CAN network broadcasting vehicle speed, engine RPM, and temperature with fault tolerance.',
        skills: ['CAN Bus', 'Embedded C', 'Automotive', 'Hardware']
      }
    ],
    interviewPreparation: [
      'What does the volatile keyword do in Embedded C? Why is it essential for memory-mapped hardware registers?',
      'Compare I2C and SPI protocols in terms of speed, pin count, master-slave addressing, and hardware complexity.',
      'Explain how the Nested Vectored Interrupt Controller (NVIC) handles priority and preemption in ARM Cortex-M.',
      'What is Priority Inversion in an RTOS? How does Priority Inheritance resolve this issue?',
      'What is the difference between Polling and Direct Memory Access (DMA) for data transfer?'
    ],
    recommendedResources: [
      { title: 'FreeRTOS Official Documentation & Tutorials', type: 'Documentation', url: 'https://www.freertos.org' },
      { title: 'STMicroelectronics STM32 Reference Manuals', type: 'Documentation', url: 'https://www.st.com' }
    ]
  },

  // 10. VLSI DESIGN ENGINEER
  {
    id: 'vlsi-design-engineer',
    slug: 'vlsi-design-engineer',
    title: 'VLSI Design Engineer',
    category: 'VLSI & Semiconductor',
    branches: ['ECE'],
    icon: 'fa-solid fa-microchip',
    description: 'Design digital integrated circuits, microchips, and semiconductor hardware using Verilog/SystemVerilog RTL synthesis and Static Timing Analysis.',
    requiredSkills: ['Verilog HDL', 'SystemVerilog', 'Digital Logic', 'RTL Design', 'Static Timing Analysis (STA)', 'FPGA'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Digital Electronics & Logic Design Core',
        description: 'Combinational logic, sequential circuits, finite state machines, and Boolean minimization.',
        topics: [
          {
            id: 'vlsi-digital-logic',
            title: 'Combinational & Sequential Circuits, K-Maps & FSMs',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 16,
            description: 'K-Maps Boolean minimization, Adders, Multiplexers, Decoders, D Flip-Flops, Counters, Shift Registers, and Mealy/Moore Finite State Machines.',
            whyItMatters: 'Digital logic gates are the foundational building blocks of all microprocessors and ASICs.',
            concepts: ['Karnaugh Maps Minimization', 'Multiplexers & Decoders', 'Flip-Flops & Latches', 'Mealy vs Moore State Machines']
          }
        ]
      },
      {
        level: 2,
        title: 'Hardware Description Languages: Verilog & SystemVerilog',
        description: 'Write synthesizable Register-Transfer Level (RTL) code and testbenches.',
        topics: [
          {
            id: 'vlsi-verilog-rtl',
            title: 'Verilog RTL Modeling, Blocking vs Non-Blocking Assignments',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 18,
            description: 'Continuous assign statements, always blocks, blocking (=) vs non-blocking (<=) assignments, parameters, generate blocks, and synthesizable RTL.',
            whyItMatters: 'Verilog is the primary language used to describe hardware chips before fabrication.',
            concepts: ['Continuous assign vs always @(*)', 'Blocking vs Non-Blocking Assignments', 'Synthesizable vs Non-Synthesizable Verilog', 'Module Hierarchy & Instantiation']
          },
          {
            id: 'vlsi-testbenches',
            title: 'SystemVerilog Testbenches & Verification',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Writing behavioral testbenches, clock generation, stimulus driving, assertions, tasks, functions, and automated waveform verification with GTKWave.',
            whyItMatters: 'Verification engineers ensure that RTL designs function flawlessly before spending millions on silicon fabrication.',
            concepts: ['Testbench Clock Generation', 'Initial Blocks & $finish', 'Tasks, Functions & Assertions', 'Waveform Dumping (VCD/GTKWave)']
          }
        ]
      },
      {
        level: 3,
        title: 'Static Timing Analysis (STA) & ASIC Design Flow',
        description: 'Analyze setup/hold timing constraints, clock domains, and synthesis.',
        topics: [
          {
            id: 'vlsi-sta-timing',
            title: 'Static Timing Analysis (STA): Setup & Hold Time Violations',
            importance: 'essential',
            difficulty: 'advanced',
            estimatedHours: 16,
            description: 'Setup time, hold time, clock-to-Q delay, clock skew, jitter, slack calculation, fixing timing violations, and metastability.',
            whyItMatters: 'Timing closure ensures that chip circuits run reliably at high gigahertz clock frequencies.',
            concepts: ['Setup Time & Hold Time Constraints', 'Clock Skew & Jitter Analysis', 'Slack Calculation (Positive vs Negative Slack)', 'Metastability & Synchronizers']
          }
        ]
      }
    ],
    projects: [
      {
        title: '8-Bit Arithmetic Logic Unit (ALU) in Verilog',
        difficulty: 'Easy',
        description: 'Design and simulate an 8-bit ALU supporting addition, subtraction, AND, OR, XOR, and comparison flags.',
        skills: ['Verilog', 'Digital Logic', 'Simulation', 'ALU']
      },
      {
        title: 'Configurable Synchronous FIFO Buffer with Flags',
        difficulty: 'Easy',
        description: 'Implement a circular pointer FIFO buffer with full, empty, and threshold status flags.',
        skills: ['Verilog', 'Memory', 'Pointers', 'RTL']
      },
      {
        title: 'Mealy/Moore Traffic Light Controller FSM',
        difficulty: 'Medium',
        description: 'Design a finite state machine managing 4-way traffic signals with pedestrian crossing triggers in synthesizable Verilog.',
        skills: ['FSM', 'Verilog', 'State Diagrams', 'Testbenches']
      },
      {
        title: 'SPI Master/Slave Controller in SystemVerilog',
        difficulty: 'Medium',
        description: 'Construct a full-duplex SPI communication core with configurable clock polarity (CPOL) and phase (CPHA).',
        skills: ['SystemVerilog', 'SPI', 'Serial Protocols', 'Verification']
      },
      {
        title: 'Single-Cycle 32-Bit RISC-V Processor Core',
        difficulty: 'Hard',
        description: 'Design a 32-bit RISC-V CPU core executing RV32I base instructions (R-type, I-type, S-type, B-type) with testbench verification.',
        skills: ['RISC-V', 'Computer Architecture', 'Verilog', 'Processor Design']
      }
    ],
    interviewPreparation: [
      'Explain the difference between Blocking (=) and Non-Blocking (<=) assignments in Verilog. When should each be used?',
      'Define Setup Time and Hold Time. How do you resolve a Setup violation vs a Hold violation?',
      'What is Metastability in digital flip-flops? How do dual-flop synchronizers prevent it in clock domain crossing?',
      'Explain the difference between Mealy and Moore state machines in terms of output timing and glitch vulnerability.',
      'How does an Asynchronous FIFO handle pointer synchronization between two different clock domains?'
    ],
    recommendedResources: [
      { title: 'ASIC World Verilog Tutorials', type: 'Tutorial', url: 'http://www.asic-world.com' },
      { title: 'EDA Playground Online HDL Simulator', type: 'Practice', url: 'https://www.edaplayground.com' }
    ]
  },

  // 11. IOT SYSTEMS ENGINEER
  {
    id: 'iot-engineer',
    slug: 'iot-engineer',
    title: 'IoT Systems Engineer',
    category: 'Embedded Systems',
    branches: ['ECE', 'EEE', 'CSE', 'IT'],
    icon: 'fa-solid fa-tower-broadcast',
    description: 'Connect smart edge hardware to the cloud using ESP32 microcontrollers, wireless protocols (MQTT, BLE, Wi-Fi), AWS IoT Core, and IoT telemetry dashboards.',
    requiredSkills: ['ESP32', 'Arduino / C++', 'MQTT', 'HTTP/REST', 'AWS IoT Core', 'Wi-Fi / BLE', 'Node-RED', 'Sensors'],
    estimatedMonths: '4–5 Months',
    stages: [
      {
        level: 1,
        title: 'Edge Microcontrollers & Sensor Interfacing',
        description: 'ESP32 architecture, analog/digital sensor reading, and C++ programming.',
        topics: [
          {
            id: 'iot-esp32-sensors',
            title: 'ESP32 Dual-Core Architecture & Sensor Data Acquisition',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 12,
            description: 'ESP32 pinouts, reading analog temperature/humidity/light sensors, GPIO control, and deep sleep power saving modes.',
            whyItMatters: 'ESP32 is the premier affordable IoT hardware platform with built-in Wi-Fi and Bluetooth.',
            concepts: ['ESP32 GPIO & ADC Channels', 'Sensor Interfacing (DHT22, LDR, Ultrasonic)', 'Deep Sleep & Power Management', 'Arduino C++ Framework']
          }
        ]
      },
      {
        level: 2,
        title: 'IoT Wireless Protocols & MQTT Messaging',
        description: 'Master lightweight publish-subscribe messaging over MQTT, Wi-Fi, and BLE.',
        topics: [
          {
            id: 'iot-mqtt-wireless',
            title: 'MQTT Publish/Subscribe Protocol & Wi-Fi Client',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'MQTT broker architecture (Mosquitto), Topics, Quality of Service (QoS 0, 1, 2), Keep-Alive, Last Will and Testament, and Wi-Fi reconnection logic.',
            whyItMatters: 'MQTT uses minimal bandwidth and battery power, making it ideal for distributed IoT devices.',
            concepts: ['MQTT Pub/Sub Architecture', 'QoS Levels (0, 1, 2)', 'Topic Wildcards (+, #)', 'Wi-Fi Reconnect Handling']
          }
        ]
      },
      {
        level: 3,
        title: 'Cloud IoT Platforms & Dashboards',
        description: 'Connect devices to AWS IoT Core, Node-RED, and real-time visualization dashboards.',
        topics: [
          {
            id: 'iot-cloud-dashboards',
            title: 'Cloud IoT (AWS IoT Core / ThingsBoard) & Real-Time Dashboards',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Device certificates & TLS security, AWS IoT Device Shadows, Rules Engine, and building live dashboards with Node-RED / Grafana.',
            whyItMatters: 'Cloud platforms aggregate telemetry from thousands of edge sensors and trigger alerts.',
            concepts: ['X.509 Device Certificates & TLS', 'Device Shadows & Digital Twins', 'Node-RED Visual Workflows', 'Telemetry Visualization']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'ESP32 Local Smart Weather Station & Web Server',
        difficulty: 'Easy',
        description: 'Read temperature and humidity from a DHT22 sensor and serve an HTML dashboard directly from the ESP32.',
        skills: ['ESP32', 'C++', 'Web Server', 'Sensors']
      },
      {
        title: 'BLE Smart Beacon & Mobile Scanner App',
        difficulty: 'Easy',
        description: 'Configure ESP32 as a Bluetooth Low Energy (BLE) peripheral transmitting environmental telemetry.',
        skills: ['BLE', 'ESP32', 'Wireless', 'Sensors']
      },
      {
        title: 'MQTT-Based Smart Home Relay & Lighting Automation',
        difficulty: 'Medium',
        description: 'Control AC home appliances via relays using an MQTT broker (Mosquitto) and smartphone commands.',
        skills: ['MQTT', 'Relays', 'Home Automation', 'Wi-Fi']
      },
      {
        title: 'AWS IoT Core Telemetry Pipeline & Alert Rule System',
        difficulty: 'Medium',
        description: 'Securely publish encrypted sensor telemetry to AWS IoT Core, store in DynamoDB, and trigger email alerts.',
        skills: ['AWS IoT Core', 'DynamoDB', 'Certificates', 'Cloud']
      },
      {
        title: 'Industrial IoT Edge Node with Over-The-Air (OTA) Updates',
        difficulty: 'Hard',
        description: 'Build a production IoT sensor node featuring secure Wi-Fi provisioning, deep sleep battery optimization, and firmware OTA updating.',
        skills: ['OTA Updates', 'ESP32', 'Security', 'Edge Computing']
      }
    ],
    interviewPreparation: [
      'Compare MQTT and HTTP protocols for IoT applications in terms of overhead, latency, and power consumption.',
      'Explain the three MQTT Quality of Service (QoS) levels (QoS 0, QoS 1, QoS 2) and their message delivery guarantees.',
      'How do you secure IoT devices connecting over public networks? Explain X.509 TLS certificate mutual authentication.',
      'Explain how ESP32 Deep Sleep modes operate to preserve battery life in remote field deployments.',
      'What is an IoT Device Shadow (Digital Twin) and how does it handle offline state synchronization?'
    ],
    recommendedResources: [
      { title: 'Random Nerd Tutorials — ESP32 & IoT Guides', type: 'Tutorial', url: 'https://randomnerdtutorials.com' },
      { title: 'AWS IoT Core Documentation', type: 'Documentation', url: 'https://docs.aws.amazon.com/iot' }
    ]
  },

  // 12. ELECTRICAL DESIGN ENGINEER
  {
    id: 'electrical-design-engineer',
    slug: 'electrical-design-engineer',
    title: 'Electrical Design Engineer',
    category: 'Electrical & Power',
    branches: ['EEE'],
    icon: 'fa-solid fa-bolt',
    description: 'Design electrical power distribution systems, single-line diagrams (SLD), substation layouts, transformer calculations, and industrial power protection.',
    requiredSkills: ['AutoCAD Electrical', 'ETAP', 'Power Systems', 'Protection Relays', 'Circuit Breakers', 'Transformers'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Power Systems & Circuit Theory Core',
        description: 'Three-phase AC circuits, power factor correction, and transformer fundamentals.',
        topics: [
          {
            id: 'ee-power-circuits',
            title: 'Three-Phase AC Power, Power Factor & Transformer Calculations',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 14,
            description: 'Active, reactive, and apparent power (kW, kVAR, kVA), power triangle, capacitor bank power factor correction, and transformer sizing calculations.',
            whyItMatters: 'Fundamental to sizing all industrial power equipment and minimizing grid transmission losses.',
            concepts: ['Three-Phase Balanced/Unbalanced Loads', 'Power Factor & Capacitor Banks', 'Transformer Losses & Sizing', 'Per-Unit System']
          }
        ]
      },
      {
        level: 2,
        title: 'Electrical Drafting & Single Line Diagrams (SLD)',
        description: 'Create industrial electrical schematics and panel drawings with AutoCAD Electrical.',
        topics: [
          {
            id: 'ee-autocad-electrical',
            title: 'AutoCAD Electrical: Single Line Diagrams (SLD) & Panel Layouts',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Draw industrial Single Line Diagrams (SLD), motor control center (MCC) schematics, cable schedules, and control wiring diagrams.',
            whyItMatters: 'SLDs are the primary blueprints used by electrical contractors for building power substations.',
            concepts: ['Single Line Diagram Drafting', 'Motor Control Center (MCC) Schematics', 'Cable Schedule Tables', 'IEC / IEEE Drafting Standards']
          }
        ]
      },
      {
        level: 3,
        title: 'Power Distribution, Cable Sizing & Protection Relays',
        description: 'Cable voltage drop sizing, switchgear, circuit breakers, and fault protection.',
        topics: [
          {
            id: 'ee-cable-sizing-protection',
            title: 'Cable Sizing Calculations, Switchgear & Protection Relays',
            importance: 'essential',
            difficulty: 'advanced',
            estimatedHours: 18,
            description: 'Calculate cable ampacity, short-circuit derating factors, voltage drop compliance, circuit breaker sizing (MCB, MCCB, ACB), and overcurrent relay coordination.',
            whyItMatters: 'Ensures electrical systems operate safely without overheating cables or causing fires.',
            concepts: ['Cable Voltage Drop & Ampacity', 'Circuit Breakers (MCB, MCCB, ACB)', 'Overcurrent & Earth Fault Relays', 'Earthing / Grounding Grid Design']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Industrial Plant Power Factor Correction Sizing Calculation',
        difficulty: 'Easy',
        description: 'Calculate required kVAR capacitor bank capacity to improve a factory power factor from 0.75 to 0.98 lag.',
        skills: ['Power Systems', 'Calculations', 'Capacitors', 'Power Factor']
      },
      {
        title: 'Commercial Building Single Line Diagram (SLD) in AutoCAD',
        difficulty: 'Easy',
        description: 'Draft a complete SLD in AutoCAD Electrical including main switchboard, distribution boards, and sub-circuits.',
        skills: ['AutoCAD Electrical', 'SLD', 'Drafting', 'Schematics']
      },
      {
        title: 'Substation Transformer & Cable Sizing Engineering Sheet',
        difficulty: 'Medium',
        description: 'Design cable sizing, voltage drop verification, and breaker selection for a 1000 kVA step-down substation.',
        skills: ['Transformers', 'Cable Sizing', 'Voltage Drop', 'Calculations']
      },
      {
        title: 'Motor Control Center (MCC) Protection & Starter Panel',
        difficulty: 'Medium',
        description: 'Design DOL and Star-Delta starter schematics with overload relays, contactors, and control interlocks.',
        skills: ['Motor Controls', 'Star-Delta', 'Contactors', 'Relays']
      },
      {
        title: 'Industrial Substation Short-Circuit & Relay Coordination Analysis',
        difficulty: 'Hard',
        description: 'Perform fault analysis and protective relay time-current characteristic (TCC) coordination curves in ETAP.',
        skills: ['ETAP', 'Short-Circuit Analysis', 'Relay Coordination', 'Protection']
      }
    ],
    interviewPreparation: [
      'Explain how Power Factor correction works and why electrical utilities penalize low power factor industrial customers.',
      'How do you calculate cable size considering continuous current rating, derating factors, and voltage drop limits?',
      'What is the difference between MCB, MCCB, and ACB circuit breakers in terms of current ratings and applications?',
      'Explain the working principle of a Differential Protection Relay for large power transformers.',
      'What are the different types of earthing systems (TT, TN-S, TN-C, IT) and their respective safety advantages?'
    ],
    recommendedResources: [
      { title: 'IEEE Standards for Electrical Safety & Design', type: 'Documentation', url: 'https://standards.ieee.org' },
      { title: 'ETAP Power System Enterprise Tutorials', type: 'Tutorial', url: 'https://etap.com' }
    ]
  },

  // 13. PLC / SCADA AUTOMATION ENGINEER
  {
    id: 'plc-scada-automation-engineer',
    slug: 'plc-scada-automation-engineer',
    title: 'PLC / SCADA Automation Engineer',
    category: 'Automation & Robotics',
    branches: ['EEE', 'ECE', 'Mechanical'],
    icon: 'fa-solid fa-industry',
    description: 'Program industrial Programmable Logic Controllers (PLCs), design SCADA and HMI dashboards, configure Variable Frequency Drives (VFDs), and automate factory assembly lines.',
    requiredSkills: ['PLC Programming', 'Ladder Logic (LD)', 'Siemens TIA Portal', 'SCADA (Ignition / WinCC)', 'HMI', 'VFDs', 'Modbus / Profinet'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Industrial Control Fundamentals & Relay Logic',
        description: 'Sensors, actuators, contactors, interlocks, and industrial safety.',
        topics: [
          {
            id: 'plc-industrial-basics',
            title: 'Industrial Sensors, Actuators & Relay Interlocking',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 12,
            description: 'Proximity sensors (Inductive, Capacitive, Optical), 4-20mA analog transmitters, control relays, pushbuttons, and emergency stop hardwired safety circuits.',
            whyItMatters: 'Forms the physical input/output layer that interfaces with PLC controllers.',
            concepts: ['Digital & Analog Sensors (0-10V, 4-20mA)', 'Sinking vs Sourcing (NPN vs PNP)', 'Relay Interlocks & NO/NC Contacts', 'Emergency Stop Safety Category Circuits']
          }
        ]
      },
      {
        level: 2,
        title: 'PLC Programming (IEC 61131-3 Standards)',
        description: 'Program Siemens / Allen-Bradley PLCs using Ladder Logic and Function Block Diagrams.',
        topics: [
          {
            id: 'plc-ladder-logic',
            title: 'PLC Ladder Logic (LD), Timers, Counters & Memory Bits',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 16,
            description: 'PLC scan cycle, input/output memory mapping, ON/OFF delay timers (TON/TOF), up/down counters (CTU/CTD), latching circuits, and math instructions in Siemens TIA Portal.',
            whyItMatters: 'Ladder Logic is the most universally used programming language in factory automation.',
            concepts: ['PLC Scan Cycle (Input Scan, Logic, Output Update)', 'TON, TOF, TP Timers', 'Up/Down Counters (CTU, CTD)', 'Siemens TIA Portal / RSLogix Environment']
          },
          {
            id: 'plc-advanced-structured-text',
            title: 'Structured Text (ST) & Function Block Diagrams (FBD)',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Write complex algorithms in Structured Text (Pascal-like language), create custom Function Blocks (FBs), and implement state machine logic.',
            whyItMatters: 'Structured Text is preferred for mathematical calculations, data logging, and recipe handling.',
            concepts: ['Structured Text (IF/CASE/FOR/WHILE)', 'Function Blocks (FB) vs Functions (FC)', 'Data Blocks (DB) & Global Variables', 'Sequential Function Charts (SFC)']
          }
        ]
      },
      {
        level: 3,
        title: 'HMI, SCADA & Industrial Communication Networks',
        description: 'Design operator touchscreens, SCADA supervisory dashboards, and industrial bus networks.',
        topics: [
          {
            id: 'plc-scada-hmi',
            title: 'HMI Screen Design, SCADA Systems & Alarming',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Design HMI operator screens, configure tag bindings, alarm management (critical, warning), trend logging, and SCADA architectures (Ignition / WinCC).',
            whyItMatters: 'Allows plant operators to supervise, control, and troubleshoot factory operations in real-time.',
            concepts: ['HMI Button & Graphic Animation', 'SCADA Tag Database Management', 'Alarm Priorities & Acknowledgement', 'Historical Data Trend Logging']
          },
          {
            id: 'plc-industrial-networks',
            title: 'Industrial Communication Protocols (Modbus & Profinet)',
            importance: 'important',
            difficulty: 'advanced',
            estimatedHours: 14,
            description: 'Configure Modbus RTU (RS-485), Modbus TCP/IP, Profinet, Profibus, Ethernet/IP, and communicate between PLCs, VFDs, and sensors.',
            whyItMatters: 'Industrial protocols replace thousands of individual wires with a single high-speed digital communication cable.',
            concepts: ['Modbus Registers (Holding, Input, Coil)', 'Profinet Industrial Ethernet', 'Variable Frequency Drive (VFD) Integration', 'OPC-UA Industry 4.0 Standard']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Automated Dual-Conveyor Sorting System in Ladder Logic',
        difficulty: 'Easy',
        description: 'Program a PLC logic routine with timers and photoelectric sensors to sort defective packages onto a reject conveyor.',
        skills: ['PLC', 'Ladder Logic', 'Timers', 'Sensors']
      },
      {
        title: 'Water Treatment Plant Tank Level & Pump Sequence Controller',
        difficulty: 'Easy',
        description: 'Design a pump alternating control sequence with low/high float switch safety interlocks and run-hour balancing.',
        skills: ['PLC', 'Interlocking', 'Pumps', 'Ladder Logic']
      },
      {
        title: 'Interactive Siemens HMI Operator Dashboard',
        difficulty: 'Medium',
        description: 'Create an HMI touchscreen interface with start/stop controls, real-time tank level animations, and alarm logging.',
        skills: ['HMI', 'Siemens WinCC', 'Animations', 'Alarms']
      },
      {
        title: 'Variable Frequency Drive (VFD) Speed Control over Modbus RTU',
        difficulty: 'Medium',
        description: 'Control AC motor speed and direction from a PLC by writing speed references over an RS-485 Modbus RTU serial bus.',
        skills: ['Modbus RTU', 'VFDs', 'Motor Control', 'RS-485']
      },
      {
        title: 'Full-Scale Factory Automation SCADA System in Ignition',
        difficulty: 'Hard',
        description: 'Build an enterprise SCADA supervisory system with batch recipe management, database logging, and mobile alerts.',
        skills: ['SCADA', 'Ignition', 'OPC-UA', 'Databases']
      }
    ],
    interviewPreparation: [
      'Explain the PLC Scan Cycle (Input Scan, Program Execution, Output Write) and how it affects timer accuracy.',
      'What is the difference between Sinking (NPN) and Sourcing (PNP) inputs in industrial PLC wiring?',
      'Explain the difference between a Function (FC) and a Function Block (FB) in Siemens TIA Portal.',
      'How does Modbus RTU communication work? What are Holding Registers, Input Registers, and Coils?',
      'Explain the working principle of a Variable Frequency Drive (VFD) and how V/f control regulates AC motor speed.'
    ],
    recommendedResources: [
      { title: 'Siemens Industry Online Support — TIA Portal Guides', type: 'Documentation', url: 'https://support.industry.siemens.com' },
      { title: 'Inductive Automation Ignition University', type: 'Course', url: 'https://inductiveuniversity.com' }
    ]
  },

  // 14. MECHANICAL DESIGN ENGINEER
  {
    id: 'mechanical-design-engineer',
    slug: 'mechanical-design-engineer',
    title: 'Mechanical Design Engineer',
    category: 'Design & CAD',
    branches: ['Mechanical'],
    icon: 'fa-solid fa-gears',
    description: 'Create 3D parametric CAD models, mechanical assemblies, GD&T drawings, Finite Element Analysis (FEA) stress simulations, and Design for Manufacturing (DFM).',
    requiredSkills: ['SolidWorks', 'CATIA', 'ANSYS (FEA)', 'GD&T (ASME Y14.5)', 'DFM / DFA', 'Engineering Materials', 'Sheet Metal'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Engineering Mechanics & Strength of Materials',
        description: 'Stress-strain analysis, shear force, bending moments, and material selection.',
        topics: [
          {
            id: 'mech-strength-materials',
            title: 'Stress-Strain Curves, Factor of Safety & Failure Theories',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 14,
            description: 'Tensile/compressive/shear stress, Young\'s modulus, Von Mises failure criterion, Tresca criterion, fatigue endurance limits, and factor of safety calculation.',
            whyItMatters: 'Ensures mechanical components withstand operating loads without yielding or catastrophic fracture.',
            concepts: ['Stress-Strain Diagram & Yield Strength', 'Von Mises Failure Theory', 'Factor of Safety (FoS)', 'Fatigue & S-N Curves']
          }
        ]
      },
      {
        level: 2,
        title: '3D Parametric CAD Modeling with SolidWorks',
        description: 'Part modeling, complex assemblies, sheet metal, and surface design.',
        topics: [
          {
            id: 'mech-solidworks-parts',
            title: 'Parametric 3D Part & Assembly Modeling (SolidWorks / CATIA)',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 18,
            description: 'Fully defined 2D sketches, extruded boss/cuts, revolved cuts, sweep, loft, mechanical mates (concentric, coincident, gear), and interference detection.',
            whyItMatters: 'CAD is the standard tool used by mechanical engineers to design physical products.',
            concepts: ['Fully Defined Sketching Constraints', 'Advanced Features (Loft, Sweep, Rib)', 'Assembly Mates & Motion Simulation', 'Interference & Collision Detection']
          },
          {
            id: 'mech-sheet-metal-surfacing',
            title: 'Sheet Metal Design & Plastic Injection Mold Part Design',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'K-factor, bend allowance, sheet metal relief cuts, draft angles for plastic injection molding, rib design, and uniform wall thickness rules.',
            whyItMatters: 'Ensures parts can actually be manufactured cheaply and reliably in real factories.',
            concepts: ['Sheet Metal Bend Allowance & K-Factor', 'Injection Molding Draft Angles', 'Rib & Boss Design Standards', 'Design for Manufacturing (DFM)']
          }
        ]
      },
      {
        level: 3,
        title: 'Engineering Drawings & GD&T (ASME Y14.5)',
        description: 'Create production manufacturing drawings with geometric tolerances.',
        topics: [
          {
            id: 'mech-gdt-drawings',
            title: 'Geometric Dimensioning and Tolerancing (GD&T ASME Y14.5)',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Datums (A, B, C), Feature Control Frames, True Position, Flatness, Cylindricity, Perpendicularity, Concentricity, and Maximum Material Condition (MMC).',
            whyItMatters: 'GD&T provides unambiguous manufacturing tolerances that guarantee parts fit together on assembly lines.',
            concepts: ['Datums & Feature Control Frames', 'True Position & MMC / LMC', 'Form & Orientation Tolerances', 'Tolerance Stack-Up Analysis']
          }
        ]
      },
      {
        level: 4,
        title: 'Finite Element Analysis (FEA) Simulation',
        description: 'Static structural analysis, modal analysis, and thermal simulation in ANSYS.',
        topics: [
          {
            id: 'mech-ansys-fea',
            title: 'ANSYS FEA: Static Structural Stress & Deflection Simulation',
            importance: 'essential',
            difficulty: 'advanced',
            estimatedHours: 18,
            description: 'Mesh generation, element types (tetrahedral vs hexahedral), mesh convergence studies, applying boundary conditions and loads, and interpreting Von Mises stress plots.',
            whyItMatters: 'FEA allows engineers to virtually test and optimize parts for weight reduction before cutting metal.',
            concepts: ['Mesh Generation & Convergence', 'Fixed Supports & Applied Forces/Pressures', 'Von Mises Stress & Deflection Results', 'Topology & Weight Optimization']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Parametric CAD Model of Single-Cylinder Engine Piston',
        difficulty: 'Easy',
        description: 'Model a detailed engine piston with wrist pin bosses, piston ring grooves, and weight-reducing cutouts in SolidWorks.',
        skills: ['SolidWorks', 'Part Modeling', 'Revolve', 'Fillets']
      },
      {
        title: 'Industrial Sheet Metal Enclosure with Louvers & Fasteners',
        difficulty: 'Easy',
        description: 'Design a sheet metal control box enclosure with ventilation louvers, PEM nuts, and flat pattern DXF export.',
        skills: ['Sheet Metal', 'SolidWorks', 'Bend Allowance', 'DFM']
      },
      {
        title: 'Two-Stage Epicyclic Planetary Gearbox Assembly',
        difficulty: 'Medium',
        description: 'Design a planetary reduction gearbox with sun, planet, and ring gears including mechanical mates and exploded views.',
        skills: ['Assemblies', 'Gear Calculations', 'Mates', 'SolidWorks']
      },
      {
        title: 'Production 2D Manufacturing Drawing with GD&T Tolerances',
        difficulty: 'Medium',
        description: 'Create a complete ASME Y14.5 manufacturing drawing with datum references, true position callouts, and bill of materials (BOM).',
        skills: ['GD&T', 'ASME Y14.5', 'Drafting', 'Tolerances']
      },
      {
        title: 'Automotive Suspension Control Arm FEA Stress Optimization',
        difficulty: 'Hard',
        description: 'Perform static structural FEA in ANSYS on a wishbone control arm under cornering loads and reduce weight by 20% via topology optimization.',
        skills: ['ANSYS', 'FEA', 'Topology Optimization', 'Stress Analysis']
      }
    ],
    interviewPreparation: [
      'Explain the Von Mises Failure Criterion and why it is used for ductile materials over brittle theories.',
      'What is True Position in GD&T? How does the Maximum Material Condition (MMC) modifier provide bonus tolerance?',
      'Explain the primary Design for Manufacturing (DFM) rules for plastic injection molded parts.',
      'What is Mesh Convergence in Finite Element Analysis (FEA) and why is it necessary before trusting stress results?',
      'How does Bend Allowance and K-Factor affect flat pattern calculations in sheet metal design?'
    ],
    recommendedResources: [
      { title: 'SolidWorks Official Certification Guides (CSWA / CSWP)', type: 'Guide', url: 'https://my.solidworks.com' },
      { title: 'ANSYS Innovation Space Free Courses', type: 'Course', url: 'https://innovationspace.ansys.com' }
    ]
  },

  // 15. ROBOTICS & MECHATRONICS ENGINEER
  {
    id: 'robotics-mechatronics-engineer',
    slug: 'robotics-mechatronics-engineer',
    title: 'Robotics & Mechatronics Engineer',
    category: 'Automation & Robotics',
    branches: ['Mechanical', 'ECE', 'EEE', 'CSE'],
    icon: 'fa-solid fa-robot',
    description: 'Integrate mechanical kinematics, electric motor actuators, Robot Operating System (ROS 2), LiDAR SLAM navigation, computer vision, and embedded control systems.',
    requiredSkills: ['ROS / ROS 2', 'Python', 'C++', 'Robot Kinematics', 'OpenCV', 'LiDAR SLAM', 'PID Control', 'Actuators'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Spatial Mathematics & Robot Kinematics',
        description: 'Rotation matrices, quaternions, forward/inverse kinematics, and DH parameters.',
        topics: [
          {
            id: 'rob-kinematics',
            title: 'Forward & Inverse Kinematics (DH Parameters & Jacobians)',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 16,
            description: '3D homogeneous transformation matrices, Euler angles vs Quaternions, Denavit-Hartenberg (DH) parameters, Forward Kinematics, and Inverse Kinematics for multi-joint arms.',
            whyItMatters: 'Allows calculating robot end-effector positions in 3D space from joint motor angles.',
            concepts: ['Homogeneous Transformation Matrices', 'Quaternions & Spatial Rotations', 'Denavit-Hartenberg (DH) Convention', 'Inverse Kinematics Trigonometric Solutions']
          }
        ]
      },
      {
        level: 2,
        title: 'Robot Operating System (ROS 2 Core)',
        description: 'Publish-subscribe nodes, topics, services, actions, and URDF modeling.',
        topics: [
          {
            id: 'rob-ros2-core',
            title: 'ROS 2 Architecture: Nodes, Topics, Services & Actions',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 18,
            description: 'ROS 2 publisher/subscriber nodes in C++/Python, custom message definitions, client-server services, non-blocking actions, launch files, and RViz visualization.',
            whyItMatters: 'ROS 2 is the universal middleware used by autonomous mobile robots, drones, and robotic arms worldwide.',
            concepts: ['ROS 2 DDS Middleware', 'Topics (Publish/Subscribe)', 'Services (Request/Response)', 'Actions (Goal/Feedback/Result)', 'RViz 3D Visualizer']
          },
          {
            id: 'rob-urdf-gazebo',
            title: 'Robot Modeling with URDF & Physics Simulation in Gazebo',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 14,
            description: 'Write Unified Robot Description Format (URDF/Xacro) models with links, joints, collision geometries, and simulate robot dynamics in Gazebo physics simulator.',
            whyItMatters: 'Enables testing robot algorithms in realistic virtual environments without risking physical hardware damage.',
            concepts: ['URDF / Xacro XML Robot Models', 'Inertial & Collision Meshes', 'Gazebo Physics Engine & Plugins', 'TF2 Coordinate Frame Transformations']
          }
        ]
      },
      {
        level: 3,
        title: 'Autonomous Navigation (SLAM & Nav2)',
        description: 'Map building, LiDAR sensor integration, and path planning.',
        topics: [
          {
            id: 'rob-slam-nav2',
            title: 'LiDAR SLAM Mapping & Nav2 Autonomous Path Planning',
            importance: 'essential',
            difficulty: 'advanced',
            estimatedHours: 20,
            description: 'Simultaneous Localization and Mapping (SLAM with Cartographer/SlamToolbox), 2D Costmaps, global path planning (A*, Dijkstra), and local trajectory planning with Nav2.',
            whyItMatters: 'Enables autonomous mobile robots (AMRs) to navigate indoor warehouses safely around obstacles.',
            concepts: ['LiDAR Point Cloud Processing', 'Occupancy Grid 2D Mapping (SLAM)', 'Nav2 Costmaps & Planners', 'Adaptive Monte Carlo Localization (AMCL)']
          }
        ]
      },
      {
        level: 4,
        title: 'Computer Vision & Motor Control',
        description: 'OpenCV image processing, object detection, and closed-loop PID motor control.',
        topics: [
          {
            id: 'rob-vision-control',
            title: 'OpenCV Computer Vision & Closed-Loop PID Motor Control',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Color thresholding, contour detection, AprilTag fiducial tracking, encoder feedback, and tuning Proportional-Integral-Derivative (PID) speed/position loops.',
            whyItMatters: 'Allows robots to see targets with cameras and position motor joints with millimeter accuracy.',
            concepts: ['OpenCV Color Thresholding & Contours', 'AprilTag / ArUco Marker Tracking', 'Encoder Velocity Calculation', 'PID Tuning (P, I, D Parameters)']
          }
        ]
      }
    ],
    projects: [
      {
        title: '2-DOF Robotic Arm Kinematics Simulator in Python',
        difficulty: 'Easy',
        description: 'Build a Python simulation computing Forward and Inverse Kinematics for a 2-joint planar robotic arm.',
        skills: ['Python', 'Kinematics', 'Trigonometry', 'Matplotlib']
      },
      {
        title: 'Closed-Loop PID DC Motor Position Controller on Microcontroller',
        difficulty: 'Easy',
        description: 'Program a microcontroller PID control loop using optical encoder feedback to hold motor shaft positions under load.',
        skills: ['PID Control', 'Embedded C', 'Encoders', 'PWM']
      },
      {
        title: 'Autonomous Line-Following & Obstacle-Avoiding Robot in ROS 2',
        difficulty: 'Medium',
        description: 'Build a differential drive mobile robot in ROS 2 Gazebo with camera visual tracking and ultrasonic sensors.',
        skills: ['ROS 2', 'Gazebo', 'OpenCV', 'Python']
      },
      {
        title: 'AprilTag Visual Servoing Robotic Arm Object Sorter',
        difficulty: 'Medium',
        description: 'Use an OpenCV camera feed to detect AprilTag markers on objects and command robotic arm pick-and-place trajectories.',
        skills: ['OpenCV', 'Computer Vision', 'Robotics', 'Kinematics']
      },
      {
        title: 'Autonomous Mobile Robot (AMR) with LiDAR SLAM & Nav2',
        difficulty: 'Hard',
        description: 'Construct an autonomous warehouse robot in Gazebo that maps unknown environments using LiDAR and navigates dynamically.',
        skills: ['ROS 2', 'Nav2', 'SLAM', 'LiDAR']
      }
    ],
    interviewPreparation: [
      'Explain Forward Kinematics vs Inverse Kinematics. Why is Inverse Kinematics computationally more complex?',
      'How does the ROS 2 computation graph work? Explain the difference between Topics, Services, and Actions.',
      'What is SLAM (Simultaneous Localization and Mapping) and how does a robot solve the "chicken-and-egg" problem of mapping?',
      'Explain how a PID controller works. What is the effect of increasing the Proportional, Integral, and Derivative gains?',
      'What is the TF2 library in ROS 2 and why is coordinate frame transformation essential in robotics?'
    ],
    recommendedResources: [
      { title: 'ROS 2 Official Documentation (docs.ros.org)', type: 'Documentation', url: 'https://docs.ros.org' },
      { title: 'Modern Robotics Course by Northwestern University', type: 'Course', url: 'http://modernrobotics.org' }
    ]
  },

  // 16. STRUCTURAL ENGINEER
  {
    id: 'structural-engineer',
    slug: 'structural-engineer',
    title: 'Structural Engineer',
    category: 'Civil & Construction',
    branches: ['Civil'],
    icon: 'fa-solid fa-building',
    description: 'Design building load-bearing structures, reinforced concrete (RCC) frames, structural steel trusses, seismic earthquake safety calculations, and STAAD.Pro / ETABS modeling.',
    requiredSkills: ['STAAD.Pro', 'ETABS', 'AutoCAD', 'RCC Design (IS 456 / ACI 318)', 'Structural Steel Design', 'Seismic Analysis'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Structural Mechanics & Analysis Core',
        description: 'Bending moment diagrams, shear force, deflection, and truss analysis.',
        topics: [
          {
            id: 'civ-structural-mechanics',
            title: 'Shear Force & Bending Moment Diagrams (SFD & BMD)',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 14,
            description: 'Equilibrium equations, point loads, uniformly distributed loads (UDL), simply supported and cantilever beams, SFD/BMD drafting, and point of contraflexure.',
            whyItMatters: 'BMD and SFD determine the exact cross-sectional dimensions and steel rebar required in building beams.',
            concepts: ['Beam Support Reactions', 'Shear Force & Bending Moment Diagrams', 'Uniformly Distributed Loads (UDL)', 'Point of Contraflexure']
          }
        ]
      },
      {
        level: 2,
        title: 'Reinforced Concrete Design (RCC)',
        description: 'Design concrete beams, slabs, columns, and foundations according to building codes.',
        topics: [
          {
            id: 'civ-rcc-design',
            title: 'Limit State Design of RCC Beams, Slabs, Columns & Footings',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 18,
            description: 'Limit State Method (IS 456 / ACI 318), singly and doubly reinforced beams, one-way and two-way slabs, short/slender columns, isolated footings, and rebar detailing.',
            whyItMatters: 'RCC is the primary material used for modern residential and commercial building construction.',
            concepts: ['Limit State of Collapse vs Serviceability', 'Singly & Doubly Reinforced Beams', 'One-Way vs Two-Way Slabs', 'Column Interaction Diagrams']
          }
        ]
      },
      {
        level: 3,
        title: 'Structural Steel Design & Connections',
        description: 'Design steel tension/compression members, trusses, and bolted/welded joints.',
        topics: [
          {
            id: 'civ-steel-design',
            title: 'Structural Steel Design: Trusses, Columns & Connections',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Design of tension members, compression column buckling (Euler formula), steel roof trusses, high-strength bolted connections, and fillet welds.',
            whyItMatters: 'Steel enables rapid construction of long-span industrial sheds and skyscrapers.',
            concepts: ['Tension & Compression Members', 'Column Slenderness Ratio & Buckling', 'Bolted & Welded Joint Design', 'Roof Truss Analysis']
          }
        ]
      },
      {
        level: 4,
        title: '3D Building Analysis with STAAD.Pro / ETABS',
        description: 'Model high-rise buildings, apply dead/live loads, and run seismic earthquake analysis.',
        topics: [
          {
            id: 'civ-etabs-staad',
            title: 'ETABS / STAAD.Pro 3D Frame Modeling & Seismic Analysis',
            importance: 'essential',
            difficulty: 'advanced',
            estimatedHours: 18,
            description: '3D building frame modeling, assigning dead loads, live loads, wind load calculation, seismic Equivalent Static Method (IS 1893), and member design optimization.',
            whyItMatters: 'Ensures multi-story structures withstand severe windstorms and earthquake ground motions.',
            concepts: ['3D Space Frame Modeling', 'Dead & Live Load Combinations', 'Wind Load Analysis', 'Seismic Base Shear & Response Spectrum']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Manual Design Sheet for Singly Reinforced Concrete Beam',
        difficulty: 'Easy',
        description: 'Calculate bending moment, depth, and tensile steel rebar area (Ast) for a residential building beam according to IS 456.',
        skills: ['RCC Design', 'IS 456', 'Concrete', 'Calculations']
      },
      {
        title: 'One-Way & Two-Way Slab Rebar Detailing Drawing in AutoCAD',
        difficulty: 'Easy',
        description: 'Draft structural detailing plans with main bars, distribution bars, and bar bending schedule (BBS) tables.',
        skills: ['AutoCAD', 'Rebar Detailing', 'Bar Bending Schedule', 'Drafting']
      },
      {
        title: 'Industrial Roof Truss Design & Bolted Connection Calculation',
        difficulty: 'Medium',
        description: 'Design an industrial Pratt roof truss under dead and wind loads with gusset plate bolted connection verification.',
        skills: ['Steel Design', 'Roof Truss', 'Connections', 'Calculations']
      },
      {
        title: 'Isolated RCC Column Footing Design & Soil Bearing Check',
        difficulty: 'Medium',
        description: 'Calculate footing base dimensions, one-way shear, two-way punching shear, and reinforcement for axial column loads.',
        skills: ['Foundation', 'Footings', 'Punching Shear', 'RCC']
      },
      {
        title: 'G+5 Multi-Story Building Structural Analysis in ETABS',
        difficulty: 'Hard',
        description: 'Complete 3D structural analysis of a G+5 residential building in ETABS with seismic base shear and wind load verification.',
        skills: ['ETABS', 'STAAD.Pro', 'Seismic Analysis', 'High-Rise']
      }
    ],
    interviewPreparation: [
      'Explain the difference between Limit State of Collapse and Limit State of Serviceability in concrete design.',
      'What is the difference between a One-Way Slab and a Two-Way Slab in terms of aspect ratio and load distribution?',
      'Explain Punching Shear (Two-Way Shear) in column footings and how it is mitigated.',
      'How does the Slenderness Ratio affect the load-carrying capacity of a structural steel column?',
      'Explain how Seismic Base Shear is calculated according to earthquake building codes.'
    ],
    recommendedResources: [
      { title: 'IS 456 / ACI 318 Structural Concrete Codes', type: 'Documentation', url: 'https://www.concrete.org' },
      { title: 'Computers & Structures, Inc. (CSI) ETABS Tutorials', type: 'Tutorial', url: 'https://www.csiamerica.com' }
    ]
  },

  // 17. CONSTRUCTION PROJECT MANAGER / BIM ENGINEER
  {
    id: 'construction-project-manager',
    slug: 'construction-project-manager',
    title: 'Construction Project Manager / BIM Engineer',
    category: 'Civil & Construction',
    branches: ['Civil'],
    icon: 'fa-solid fa-helmet-safety',
    description: 'Manage building construction schedules, Primavera P6 / MS Project critical path planning, Autodesk Revit 3D BIM modeling, quantity surveying (BOQ), and site safety.',
    requiredSkills: ['Autodesk Revit (BIM)', 'Primavera P6', 'MS Project', 'Quantity Surveying (BOQ)', 'Cost Estimation', 'AutoCAD', 'Earned Value Management'],
    estimatedMonths: '5–6 Months',
    stages: [
      {
        level: 1,
        title: 'Project Planning & CPM Scheduling (Primavera P6)',
        description: 'Work Breakdown Structure (WBS), Gantt charts, Critical Path Method, and project baselines.',
        topics: [
          {
            id: 'con-primavera-p6',
            title: 'Critical Path Method (CPM), WBS & Scheduling in Primavera P6',
            importance: 'essential',
            difficulty: 'beginner',
            estimatedHours: 16,
            description: 'Create Work Breakdown Structures (WBS), define activity dependencies (FS, SS, FF), calculate Early/Late Start/Finish, Total Float, Free Float, and project baselines.',
            whyItMatters: 'The Critical Path determines the exact minimum duration required to complete a multi-million dollar construction project.',
            concepts: ['Work Breakdown Structure (WBS)', 'Critical Path Method (CPM) Forward/Backward Pass', 'Total Float & Free Float Calculation', 'Project Baseline Tracking']
          }
        ]
      },
      {
        level: 2,
        title: 'Building Information Modeling (Autodesk Revit BIM)',
        description: 'Create 3D parametric BIM architectural/structural models and clash detection.',
        topics: [
          {
            id: 'con-revit-bim',
            title: 'Autodesk Revit 3D BIM Modeling & Navisworks Clash Detection',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 18,
            description: 'Model walls, slabs, columns, doors, windows, and MEP ductwork in Autodesk Revit, and perform clash detection in Navisworks.',
            whyItMatters: 'BIM catches design conflicts between structural beams and HVAC pipes before workers break ground on site.',
            concepts: ['Revit Parametric BIM Families', 'Levels & Grids Modeling', 'Navisworks Clash Detection Reports', 'BIM LOD (Level of Development 100-400)']
          }
        ]
      },
      {
        level: 3,
        title: 'Quantity Surveying, Cost Estimation & BOQ',
        description: 'Material takeoffs, rate analysis, and Bill of Quantities preparation.',
        topics: [
          {
            id: 'con-quantity-boq',
            title: 'Quantity Takeoffs, Rate Analysis & Bill of Quantities (BOQ)',
            importance: 'essential',
            difficulty: 'intermediate',
            estimatedHours: 16,
            description: 'Estimate concrete volume, excavation, brickwork, rebar steel weight, calculate labor/material rate analysis, and prepare standard BOQ tender documents.',
            whyItMatters: 'Accurate cost estimation prevents massive project budget overruns and contract disputes.',
            concepts: ['Material Quantity Takeoffs from Drawings', 'Bar Bending Rebar Weight Calculation', 'Labor & Material Rate Analysis', 'Tender Bill of Quantities (BOQ)']
          }
        ]
      },
      {
        level: 4,
        title: 'Construction Cost Control & Earned Value Management',
        description: 'Track budget vs actual progress with EVM metrics (CPI, SPI).',
        topics: [
          {
            id: 'con-evm-contracts',
            title: 'Earned Value Management (EVM) & Construction Contracts',
            importance: 'essential',
            difficulty: 'advanced',
            estimatedHours: 14,
            description: 'Calculate Planned Value (PV), Earned Value (EV), Actual Cost (AC), Cost Variance (CV), Schedule Variance (SV), Cost Performance Index (CPI), and standard FIDIC contract management.',
            whyItMatters: 'EVM gives project managers instant mathematical visibility into whether a project is ahead or behind budget/schedule.',
            concepts: ['Earned Value Metrics (PV, EV, AC)', 'Cost & Schedule Variance (CV, SV)', 'Performance Indexes (CPI, SPI)', 'FIDIC Construction Contract Basics']
          }
        ]
      }
    ],
    projects: [
      {
        title: 'Residential Villa Quantity Takeoff & Detailed BOQ Sheet',
        difficulty: 'Easy',
        description: 'Extract concrete, steel, and masonry quantities from architectural drawings to create a comprehensive Bill of Quantities (BOQ).',
        skills: ['Quantity Surveying', 'BOQ', 'Estimation', 'Excel']
      },
      {
        title: 'Commercial Construction Project Schedule in MS Project',
        difficulty: 'Easy',
        description: 'Build a 12-month commercial building construction schedule with WBS, milestones, resource assignments, and Gantt charts.',
        skills: ['MS Project', 'Gantt Chart', 'WBS', 'Scheduling']
      },
      {
        title: 'Autodesk Revit 3D BIM Architectural & Structural Villa Model',
        difficulty: 'Medium',
        description: 'Model a full 3D residential villa in Revit with parametric doors, windows, structural columns, and automated quantity schedules.',
        skills: ['Autodesk Revit', 'BIM', '3D Modeling', 'Schedules']
      },
      {
        title: 'Multi-Story Navisworks Clash Detection & Coordination Report',
        difficulty: 'Medium',
        description: 'Import Revit structural and MEP models into Navisworks to identify and resolve spatial clashes between HVAC ducts and concrete beams.',
        skills: ['Navisworks', 'Clash Detection', 'BIM Coordination']
      },
      {
        title: 'Earned Value Management (EVM) Project Health Monitoring Dashboard',
        difficulty: 'Hard',
        description: 'Construct an EVM tracking system in Excel/Power BI calculating CPI, SPI, and Estimate at Completion (EAC) for a live construction site.',
        skills: ['EVM', 'Cost Control', 'CPI / SPI', 'Project Management']
      }
    ],
    interviewPreparation: [
      'Explain the Critical Path Method (CPM). What is the difference between Total Float and Free Float?',
      'How does Earned Value Management (EVM) measure project performance? Define CPI and SPI.',
      'What are the different Levels of Development (LOD 100, 200, 300, 350, 400) in BIM modeling?',
      'How do you calculate the weight of steel rebar in kilograms per meter given its diameter (d^2 / 162)?',
      'Explain the purpose of Clash Detection in Navisworks and how it prevents costly on-site rework.'
    ],
    recommendedResources: [
      { title: 'Project Management Institute (PMI) PMBOK Guide', type: 'Guide', url: 'https://www.pmi.org' },
      { title: 'Autodesk Revit Official BIM Learning Path', type: 'Documentation', url: 'https://www.autodesk.com' }
    ]
  }
];

export default roadmapsData;
