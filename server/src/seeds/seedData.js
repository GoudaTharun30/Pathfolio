/**
 * Comprehensive Career Roadmaps & 5-Project Recommendation Seed Data for Pathfolio
 * Learning paths structured according to roadmap.sh engineering standards.
 */

// Helper to generate seed roadmaps from rich definition
const roadmaps = [
  // 1. Frontend Developer
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'Software Development',
    branches: ['CSE', 'IT', 'ECE'],
    description: 'Build responsive, accessible, high-performance web applications and user interfaces using HTML, CSS, JavaScript, React, TypeScript, and modern tooling.',
    requiredSkills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'TypeScript', 'TailwindCSS', 'Git', 'REST APIs'],
    levels: [
      {
        level: 1,
        title: 'Internet & Web Fundamentals',
        description: 'How the web works, networking basics, HTTP/HTTPS, DNS, and browser rendering engines',
        topics: [
          { id: 'fe-internet', title: 'How the Internet Works & HTTP/HTTPS', importance: 'essential', difficulty: 'beginner', estimatedHours: 6 },
          { id: 'fe-browsers', title: 'Browsers, DOM & Rendering Engine', importance: 'essential', difficulty: 'beginner', estimatedHours: 6 }
        ]
      },
      {
        level: 2,
        title: 'HTML5 & Accessible Web Semantics',
        description: 'Semantic markup, forms, validations, SEO, and WCAG/ARIA accessibility standards',
        topics: [
          { id: 'fe-html-semantics', title: 'Semantic HTML5 & Document Structure', importance: 'essential', difficulty: 'beginner', estimatedHours: 8 },
          { id: 'fe-html-forms', title: 'Forms, Validations & Web Accessibility (WCAG / ARIA)', importance: 'essential', difficulty: 'beginner', estimatedHours: 8 }
        ]
      },
      {
        level: 3,
        title: 'CSS3, Modern Layouts & Responsive Design',
        description: 'Box model, CSS variables, Flexbox, CSS Grid, animations, and mobile-first media queries',
        topics: [
          { id: 'fe-css-box-model', title: 'CSS Box Model, Specificity & Custom Properties', importance: 'essential', difficulty: 'beginner', estimatedHours: 10 },
          { id: 'fe-css-flexbox-grid', title: 'Flexbox & CSS Grid Modern Layouts', importance: 'essential', difficulty: 'beginner', estimatedHours: 12 },
          { id: 'fe-css-responsive', title: 'Responsive Design & Mobile-First Media Queries', importance: 'essential', difficulty: 'beginner', estimatedHours: 10 }
        ]
      },
      {
        level: 4,
        title: 'JavaScript Core & Asynchronous Programming',
        description: 'ES6+ syntax, DOM manipulation, event bubbling, closures, Promises, and async/await',
        topics: [
          { id: 'fe-js-basics', title: 'JavaScript Fundamentals & ES6+ Syntax', importance: 'essential', difficulty: 'beginner', estimatedHours: 14 },
          { id: 'fe-js-dom', title: 'DOM Manipulation, Events & Event Bubbling', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 },
          { id: 'fe-js-async', title: 'Asynchronous JavaScript: Promises & Async/Await', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      },
      {
        level: 5,
        title: 'Version Control, Package Managers & Build Tools',
        description: 'Git workflows, GitHub collaboration, npm package ecosystem, and Vite bundling',
        topics: [
          { id: 'fe-git-github', title: 'Git Version Control & GitHub Workflows', importance: 'essential', difficulty: 'beginner', estimatedHours: 8 },
          { id: 'fe-npm-vite', title: 'npm Package Ecosystem & Vite Build Tool', importance: 'essential', difficulty: 'beginner', estimatedHours: 6 }
        ]
      },
      {
        level: 6,
        title: 'React.js Component Architecture & Hooks',
        description: 'JSX, functional components, state hooks, lifecycle side-effects, and React Router',
        topics: [
          { id: 'fe-react-fundamentals', title: 'React Fundamentals: JSX, Components & Props', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 },
          { id: 'fe-react-hooks', title: 'React State Hooks (useState, useEffect, useMemo, useCallback)', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 },
          { id: 'fe-react-router', title: 'React Router & Global Context API', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 }
        ]
      },
      {
        level: 7,
        title: 'TypeScript & State Architecture',
        description: 'Type annotations, TailwindCSS styling, and server-state caching with TanStack Query',
        topics: [
          { id: 'fe-typescript', title: 'TypeScript Fundamentals for React', importance: 'important', difficulty: 'intermediate', estimatedHours: 14 },
          { id: 'fe-tailwindcss', title: 'Utility-First Styling with TailwindCSS', importance: 'important', difficulty: 'intermediate', estimatedHours: 10 },
          { id: 'fe-server-state', title: 'Server State Management (TanStack Query / Axios)', importance: 'important', difficulty: 'advanced', estimatedHours: 12 }
        ]
      },
      {
        level: 8,
        title: 'Testing, Performance & Modern Frontend',
        description: 'Unit testing with Jest & React Testing Library, Core Web Vitals, and Next.js SSR',
        topics: [
          { id: 'fe-testing', title: 'Frontend Testing (Jest & React Testing Library)', importance: 'important', difficulty: 'advanced', estimatedHours: 12 },
          { id: 'fe-performance', title: 'Web Performance Optimization & Core Web Vitals', importance: 'important', difficulty: 'advanced', estimatedHours: 10 },
          { id: 'fe-nextjs-ssr', title: 'Full-Stack React Framework: Next.js (SSR / SSG)', importance: 'advanced', difficulty: 'advanced', estimatedHours: 14 }
        ]
      }
    ],
    projects: [
      { title: 'Personal Developer Portfolio & Showcase', difficulty: 'Easy', description: 'Build a responsive personal portfolio with dark mode, smooth scrolling, and project gallery.' },
      { title: 'Interactive E-Commerce Product Filter & Cart', difficulty: 'Easy', description: 'Create an e-commerce catalog with real-time keyword search, category checkboxes, and cart storage.' },
      { title: 'Job & Internship Application Tracker Dashboard', difficulty: 'Medium', description: 'Build a React dashboard to track job applications, status tags, notes, and application statistics.' },
      { title: 'Live Weather Intelligence & Air Quality Dashboard', difficulty: 'Medium', description: 'Fetch multi-city 5-day weather forecasts, UV index, air quality metrics from OpenWeather API.' },
      { title: 'Collaborative Real-Time Canvas & Workspace Tool', difficulty: 'Hard', description: 'Construct an advanced web app with interactive HTML5 canvas, drag-and-drop workspace nodes, and export.' }
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

  // 2. Backend Developer
  {
    slug: 'backend-developer',
    title: 'Backend Developer',
    category: 'Software Development',
    branches: ['CSE', 'IT', 'ECE', 'EEE'],
    description: 'Design robust server-side architectures, RESTful APIs, database schemas, authentication systems, caching with Redis, microservices, and Docker containerization.',
    requiredSkills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST API', 'Redis', 'Docker', 'JWT', 'Git'],
    levels: [
      {
        level: 1,
        title: 'Backend Core & OS Fundamentals',
        description: 'Linux command line, networking protocols (TCP/UDP/HTTP), and server basics',
        topics: [
          { id: 'be-linux-terminal', title: 'Linux CLI, Bash Scripting & File Systems', importance: 'essential', difficulty: 'beginner', estimatedHours: 8 },
          { id: 'be-networking-http', title: 'Networking Protocols: TCP/IP, UDP, DNS & HTTP/HTTPS', importance: 'essential', difficulty: 'beginner', estimatedHours: 8 }
        ]
      },
      {
        level: 2,
        title: 'Node.js Runtime & Asynchronous Architecture',
        description: 'Single-threaded event loop, Libuv thread pool, file system, buffers, and streams',
        topics: [
          { id: 'be-node-runtime', title: 'Node.js Architecture, Event Loop & Libuv', importance: 'essential', difficulty: 'beginner', estimatedHours: 12 },
          { id: 'be-node-streams', title: 'Node.js File System, Buffers & Streams API', importance: 'essential', difficulty: 'intermediate', estimatedHours: 10 }
        ]
      },
      {
        level: 3,
        title: 'Web Servers & RESTful API Architecture with Express.js',
        description: 'Routing, middleware chains, MVC structure, and REST API design standards',
        topics: [
          { id: 'be-express-routing', title: 'Express.js Routing, Controllers & Middleware Chain', importance: 'essential', difficulty: 'beginner', estimatedHours: 12 },
          { id: 'be-rest-design', title: 'RESTful API Design Standards & HTTP Status Codes', importance: 'essential', difficulty: 'beginner', estimatedHours: 10 }
        ]
      },
      {
        level: 4,
        title: 'Databases: Relational (SQL) & Document (NoSQL)',
        description: 'PostgreSQL schemas, joins, transactions, and MongoDB Mongoose document modeling',
        topics: [
          { id: 'be-sql-postgres', title: 'Relational Databases: PostgreSQL & SQL Queries', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 },
          { id: 'be-nosql-mongodb', title: 'NoSQL Databases: MongoDB & Mongoose ODM', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 },
          { id: 'be-orms', title: 'Database ORMs & Query Builders (Prisma / Mongoose)', importance: 'important', difficulty: 'intermediate', estimatedHours: 10 }
        ]
      },
      {
        level: 5,
        title: 'Authentication, Authorization & Security',
        description: 'Bcrypt password hashing, JWT access/refresh tokens, and RBAC security middleware',
        topics: [
          { id: 'be-auth-jwt', title: 'Password Hashing (Bcrypt) & JWT Token Authentication', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 },
          { id: 'be-rbac-security', title: 'Role-Based Access Control (RBAC) & API Security', importance: 'essential', difficulty: 'intermediate', estimatedHours: 10 }
        ]
      },
      {
        level: 6,
        title: 'Caching, Performance & Background Message Queues',
        description: 'In-memory Redis caching, cache-aside pattern, and BullMQ background workers',
        topics: [
          { id: 'be-redis-caching', title: 'In-Memory Caching with Redis', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 },
          { id: 'be-message-queues', title: 'Background Job Processing (BullMQ / RabbitMQ)', importance: 'important', difficulty: 'advanced', estimatedHours: 12 }
        ]
      },
      {
        level: 7,
        title: 'Testing, Docker, CI/CD & Cloud Deployment',
        description: 'API testing with Supertest, Docker containerization, GitHub Actions, and Nginx deployment',
        topics: [
          { id: 'be-testing-supertest', title: 'Automated API Testing (Jest & Supertest)', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 },
          { id: 'be-docker-containers', title: 'Docker Containerization & Docker Compose', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 },
          { id: 'be-deployment-cicd', title: 'CI/CD Pipelines & Cloud Deployment (AWS / Render / Nginx)', importance: 'important', difficulty: 'advanced', estimatedHours: 14 }
        ]
      }
    ],
    projects: [
      { title: 'Log File Analyzer & Statistics CLI Tool', difficulty: 'Easy', description: 'Build a Node.js CLI tool using streams and regex to parse server access logs.' },
      { title: 'High-Performance URL Shortener Microservice', difficulty: 'Easy', description: 'Create a URL shortener with unique hash generation and HTTP 302 redirects.' },
      { title: 'Production Auth & RBAC Security Microservice', difficulty: 'Medium', description: 'Build a complete authentication server with bcrypt, JWT rotation, and role-based permissions.' },
      { title: 'E-Commerce Order Management & Payment Webhooks', difficulty: 'Medium', description: 'Develop backend inventory management with PostgreSQL transactions and webhooks.' },
      { title: 'Real-Time Distributed Chat & Event Engine', difficulty: 'Hard', description: 'Build a scalable WebSocket communication platform with Redis Pub/Sub and Docker.' }
    ],
    interviewPreparation: [
      'Explain the Node.js Event Loop phases: Timers, Pending Callbacks, Poll, Check, and Close.',
      'What are the ACID properties in relational databases? How does PostgreSQL enforce them?',
      'How does JWT authentication work? What are the pros and cons compared to server-side session cookies?',
      'Explain how Redis can be used as a cache-aside layer and how cache invalidation strategies work.',
      'What is the difference between SQL and NoSQL databases? When should you choose each?'
    ],
    recommendedResources: [
      { title: 'Node.js Official Documentation & Guides', type: 'Documentation', url: 'https://nodejs.org' },
      { title: 'PostgreSQL Tutorial & Documentation', type: 'Documentation', url: 'https://www.postgresql.org' }
    ]
  },

  // 3. Full Stack Developer
  {
    slug: 'fullstack-developer',
    title: 'Full Stack Developer',
    category: 'Software Development',
    branches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil'],
    description: 'Master both frontend user interfaces and backend server infrastructure to build complete end-to-end web platforms using the MERN stack.',
    requiredSkills: ['HTML5/CSS3', 'JavaScript ES6+', 'React', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Git'],
    levels: [
      {
        level: 1,
        title: 'Web & Programming Foundation',
        description: 'HTML5, modern responsive CSS layouts, and core JavaScript programming',
        topics: [
          { id: 'fs-web-basics', title: 'HTML5 Semantic Markup & CSS Flexbox/Grid', importance: 'essential', difficulty: 'beginner', estimatedHours: 12 },
          { id: 'fs-js-core', title: 'JavaScript (ES6+) Syntax, DOM & Async/Await', importance: 'essential', difficulty: 'beginner', estimatedHours: 16 }
        ]
      },
      {
        level: 2,
        title: 'Frontend Mastery with React',
        description: 'Component architecture, state hooks, effect lifecycles, and React Router',
        topics: [
          { id: 'fs-react-components', title: 'React Components, Props & State Management', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 },
          { id: 'fs-react-effects-router', title: 'React Hooks (useEffect) & React Router Navigation', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      },
      {
        level: 3,
        title: 'Backend API Engineering with Node & Express',
        description: 'REST API endpoints, controllers, middleware pipeline, and error handling',
        topics: [
          { id: 'fs-node-express-core', title: 'Node.js & Express.js REST API Server', importance: 'essential', difficulty: 'beginner', estimatedHours: 14 },
          { id: 'fs-error-handling', title: 'API Error Handling, Validation & Status Codes', importance: 'essential', difficulty: 'beginner', estimatedHours: 8 }
        ]
      },
      {
        level: 4,
        title: 'Database Persistence with MongoDB & Mongoose',
        description: 'Document collections, schema validation, and full-stack CRUD operations',
        topics: [
          { id: 'fs-mongodb-mongoose', title: 'MongoDB Collections & Mongoose Schemas', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 },
          { id: 'fs-crud-operations', title: 'Full-Stack CRUD Database Operations', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 }
        ]
      },
      {
        level: 5,
        title: 'Authentication, Security & Protected Routes',
        description: 'JWT token generation, bcrypt password hashing, and React protected route guards',
        topics: [
          { id: 'fs-auth-system', title: 'User Authentication with JWT & Bcrypt', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 },
          { id: 'fs-protected-routes', title: 'Frontend Protected Routes & Auth State Sync', importance: 'essential', difficulty: 'intermediate', estimatedHours: 10 }
        ]
      },
      {
        level: 6,
        title: 'Full-Stack Integration, Deployment & Production',
        description: 'API client integration, loading states, Vite production builds, and cloud deployment',
        topics: [
          { id: 'fs-api-integration', title: 'Full-Stack API Integration & State Synchronization', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 },
          { id: 'fs-cloud-deployment', title: 'Production Build, Environment Variables & Cloud Deployment', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 }
        ]
      }
    ],
    projects: [
      { title: 'Personal Knowledge Notes Manager', difficulty: 'Easy', description: 'Build a full-stack note-taking app with search, edit, delete, and tag categorization.' },
      { title: 'Student Academic GPA & Grade Calculator', difficulty: 'Easy', description: 'Develop an academic transcript logger calculating semester CGPA and credit breakdowns.' },
      { title: 'Full-Stack Job & Internship Application Portal', difficulty: 'Medium', description: 'Construct a multi-role job board portal where students apply and recruiters manage applicants.' },
      { title: 'Personal Finance & Expense Analytics Dashboard', difficulty: 'Medium', description: 'Build a full-stack finance manager to log expenses, categorize budgets, and chart income.' },
      { title: 'Enterprise Resource & Inventory Management Platform', difficulty: 'Hard', description: 'Create an enterprise-grade platform with inventory alerts, supplier workflows, and live analytics.' }
    ],
    interviewPreparation: [
      'Explain the full request-response lifecycle from a React button click to MongoDB query and back.',
      'How does JWT authentication work across a separate React frontend and Express backend?',
      'What are the advantages of using the MERN stack compared to traditional server-rendered architectures?'
    ],
    recommendedResources: [
      { title: 'Full Stack Open — University of Helsinki', type: 'Course', url: 'https://fullstackopen.com' },
      { title: 'Mongoose Documentation', type: 'Documentation', url: 'https://mongoosejs.com' }
    ]
  },

  // 4. Software Engineer
  {
    slug: 'software-engineer',
    title: 'Software Engineer',
    category: 'Software Development',
    branches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical'],
    description: 'Design software architecture, apply object-oriented design patterns, solve algorithmic problems, and build reliable enterprise codebases.',
    requiredSkills: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms', 'OOP', 'System Design', 'SQL', 'Git'],
    levels: [
      {
        level: 1,
        title: 'Core Programming & Memory Model',
        description: 'Language syntax, memory models, pointers/references, and asymptotic Big-O analysis',
        topics: [
          { id: 'se-programming-lang', title: 'Core Language Syntax, Memory Model & Pointers', importance: 'essential', difficulty: 'beginner', estimatedHours: 16 },
          { id: 'se-complexity-analysis', title: 'Asymptotic Analysis: Big-O, Big-Omega & Big-Theta', importance: 'essential', difficulty: 'beginner', estimatedHours: 10 }
        ]
      },
      {
        level: 2,
        title: 'Fundamental Data Structures',
        description: 'Arrays, Strings, Linked Lists, Stacks, Queues, and Two Pointers technique',
        topics: [
          { id: 'se-arrays-strings', title: 'Arrays, Strings, Two Pointers & Sliding Window', importance: 'essential', difficulty: 'beginner', estimatedHours: 16 },
          { id: 'se-linked-lists', title: 'Linked Lists (Singly, Doubly, Circular)', importance: 'essential', difficulty: 'beginner', estimatedHours: 12 },
          { id: 'se-stacks-queues', title: 'Stacks, Queues & Monotonic Data Structures', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      },
      {
        level: 3,
        title: 'Non-Linear Data Structures & Trees',
        description: 'Binary trees, BST, heaps, priority queues, and hash table collision resolution',
        topics: [
          { id: 'se-binary-trees', title: 'Binary Trees & Binary Search Trees (BST)', importance: 'essential', difficulty: 'intermediate', estimatedHours: 18 },
          { id: 'se-heaps-priority-queues', title: 'Heaps, Priority Queues & Hash Maps', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      },
      {
        level: 4,
        title: 'Advanced Algorithms & Problem Solving',
        description: 'Graph theory, BFS/DFS, shortest path (Dijkstra), and Dynamic Programming',
        topics: [
          { id: 'se-graphs', title: 'Graph Theory, BFS, DFS & Shortest Path (Dijkstra)', importance: 'essential', difficulty: 'advanced', estimatedHours: 20 },
          { id: 'se-dynamic-programming', title: 'Dynamic Programming (Memoization & Tabulation)', importance: 'essential', difficulty: 'advanced', estimatedHours: 24 }
        ]
      },
      {
        level: 5,
        title: 'Object-Oriented Design & SOLID Principles',
        description: '4 pillars of OOP, SOLID design principles, and GoF software design patterns',
        topics: [
          { id: 'se-oop-core', title: 'Four Pillars of OOP & SOLID Design Principles', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 },
          { id: 'se-design-patterns', title: 'Software Design Patterns (GoF)', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      },
      {
        level: 6,
        title: 'System Design & Scalable Architecture',
        description: 'Horizontal scaling, load balancers, caching layers, and distributed systems',
        topics: [
          { id: 'se-system-design-basics', title: 'System Design Fundamentals & Scalability', importance: 'important', difficulty: 'advanced', estimatedHours: 18 },
          { id: 'se-distributed-systems', title: 'Distributed Systems, Rate Limiting & Message Brokers', importance: 'important', difficulty: 'advanced', estimatedHours: 16 }
        ]
      }
    ],
    projects: [
      { title: 'Custom In-Memory Key-Value Store (Redis Clone)', difficulty: 'Easy', description: 'Build a thread-safe key-value store supporting GET, SET, and EXPIRE with sockets.' },
      { title: 'Expression Evaluator & Scientific Calculator Engine', difficulty: 'Easy', description: 'Develop a math expression evaluator parsing equations with Shunting-Yard AST.' },
      { title: 'High-Performance Thread Pool & Task Scheduler', difficulty: 'Medium', description: 'Implement a work-stealing multi-threaded thread pool with mutex locking.' },
      { title: 'Full-Featured Git Version Control System CLI Clone', difficulty: 'Medium', description: 'Construct a command-line tool implementing commit-tree and checkout using SHA-1 blobs.' },
      { title: 'Distributed Scalable URL Shortener & Analytics System', difficulty: 'Hard', description: 'Design and build a scalable URL shortener with distributed Snowflake IDs and Redis.' }
    ],
    interviewPreparation: [
      'Explain how to detect and remove a cycle in a Singly Linked List with Floyd\'s algorithm.',
      'Explain the difference between Dijkstra\'s and Bellman-Ford shortest path algorithms.',
      'Explain the SOLID design principles with concrete code examples for each letter.'
    ],
    recommendedResources: [
      { title: 'LeetCode Problem Sets', type: 'Practice', url: 'https://leetcode.com' },
      { title: 'System Design Primer', type: 'Guide', url: 'https://github.com/donnemartin/system-design-primer' }
    ]
  },

  // 5. DevOps Engineer
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Cloud & DevOps',
    branches: ['CSE', 'IT', 'ECE'],
    description: 'Bridge software development and IT operations through continuous integration, container orchestration, and cloud infrastructure as code.',
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD (GitHub Actions)', 'Prometheus', 'Git'],
    levels: [
      {
        level: 1,
        title: 'Linux Administration & Bash Automation',
        description: 'Linux operating system mastery, shell scripting, networking, and system diagnostics',
        topics: [
          { id: 'do-linux-core', title: 'Linux OS Architecture, File Systems & Permissions', importance: 'essential', difficulty: 'beginner', estimatedHours: 12 },
          { id: 'do-bash-scripting', title: 'Bash Shell Scripting & Automated Cron Jobs', importance: 'essential', difficulty: 'beginner', estimatedHours: 12 }
        ]
      },
      {
        level: 2,
        title: 'Networking & Security Protocols',
        description: 'DNS, TCP/UDP, SSH key authentication, firewalls, and Nginx reverse proxies',
        topics: [
          { id: 'do-networking-protocols', title: 'DNS, TCP/UDP, SSH & Reverse Proxies (Nginx)', importance: 'essential', difficulty: 'beginner', estimatedHours: 12 }
        ]
      },
      {
        level: 3,
        title: 'Containers with Docker',
        description: 'Multi-stage Dockerfiles, image layer caching, volumes, and Docker Compose',
        topics: [
          { id: 'do-docker-fundamentals', title: 'Docker Architecture, Images & Multi-Stage Dockerfiles', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 },
          { id: 'do-docker-compose-networking', title: 'Docker Networking, Volumes & Docker Compose', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 }
        ]
      },
      {
        level: 4,
        title: 'CI/CD Pipelines & Automation',
        description: 'Automated GitHub Actions workflows, tests, and Blue-Green release strategies',
        topics: [
          { id: 'do-github-actions', title: 'Continuous Integration with GitHub Actions', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 },
          { id: 'do-cd-deployment-pipelines', title: 'Continuous Deployment (CD) & Release Strategies', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 }
        ]
      },
      {
        level: 5,
        title: 'Infrastructure as Code (IaC) with Terraform',
        description: 'HCL syntax, cloud providers, and remote state management with S3',
        topics: [
          { id: 'do-terraform-iac', title: 'Terraform HCL, Providers & State Management', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 }
        ]
      },
      {
        level: 6,
        title: 'Container Orchestration with Kubernetes (K8s)',
        description: 'Pods, Deployments, Services, Ingress controllers, and Helm package manager',
        topics: [
          { id: 'do-kubernetes-core', title: 'Kubernetes Architecture, Pods, Deployments & Services', importance: 'essential', difficulty: 'advanced', estimatedHours: 20 },
          { id: 'do-kubernetes-ingress-helm', title: 'Ingress Controllers, ConfigMaps, Secrets & Helm Charts', importance: 'important', difficulty: 'advanced', estimatedHours: 16 }
        ]
      },
      {
        level: 7,
        title: 'Observability, Monitoring & DevSecOps',
        description: 'Prometheus metric scraping, Grafana dashboards, Alertmanager, and Vault secrets',
        topics: [
          { id: 'do-prometheus-grafana', title: 'Prometheus Metrics & Grafana Dashboards', importance: 'essential', difficulty: 'advanced', estimatedHours: 14 },
          { id: 'do-devsecops', title: 'DevSecOps: Secrets Management (Vault) & Security Auditing', importance: 'important', difficulty: 'advanced', estimatedHours: 12 }
        ]
      }
    ],
    projects: [
      { title: 'Automated Multi-Service Linux Server Setup Script', difficulty: 'Easy', description: 'Write a Bash automation script to install Nginx, Node.js, and SSL certificates.' },
      { title: 'Multi-Stage Dockerized MERN Stack Application', difficulty: 'Easy', description: 'Containerize a full-stack React + Express + MongoDB app with Docker Compose.' },
      { title: 'Automated CI/CD Pipeline with GitHub Actions', difficulty: 'Medium', description: 'Build a GitHub Actions workflow that runs tests, builds images, and deploys.' },
      { title: 'Terraform AWS Cloud Infrastructure as Code', difficulty: 'Medium', description: 'Provision an AWS VPC, EC2 instances, S3 bucket, and RDS with Terraform.' },
      { title: 'Production Kubernetes Cluster with Prometheus & Grafana', difficulty: 'Hard', description: 'Deploy a microservices application on Kubernetes with auto-scaling and monitoring.' }
    ],
    interviewPreparation: [
      'Explain the difference between a Container and a Virtual Machine.',
      'How does a Kubernetes Deployment ensure zero-downtime during a rolling update?',
      'What is Terraform Remote State? Why is state locking necessary?'
    ],
    recommendedResources: [
      { title: 'Docker Documentation', type: 'Documentation', url: 'https://docs.docker.com' },
      { title: 'Kubernetes Documentation', type: 'Documentation', url: 'https://kubernetes.io' }
    ]
  },

  // 6. Data Analyst
  {
    slug: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & AI',
    branches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil'],
    description: 'Transform raw data into actionable business intelligence using Advanced SQL, Excel, Python (Pandas/NumPy), Tableau, Power BI, and statistical analysis.',
    requiredSkills: ['SQL', 'Excel', 'Python (Pandas, NumPy)', 'Power BI', 'Tableau', 'Statistics', 'Data Cleaning'],
    levels: [
      {
        level: 1,
        title: 'Spreadsheets & Business Analytics Fundamentals',
        description: 'Advanced Excel formulas, XLOOKUP, pivot tables, and dynamic slicers',
        topics: [
          { id: 'da-excel-advanced', title: 'Advanced Excel: Formulas, XLOOKUP & Pivot Tables', importance: 'essential', difficulty: 'beginner', estimatedHours: 12 }
        ]
      },
      {
        level: 2,
        title: 'Database Querying with Advanced SQL',
        description: 'Joins, aggregations, Window Functions (RANK/LEAD/LAG), and CTEs',
        topics: [
          { id: 'da-sql-fundamentals', title: 'SQL Fundamentals: Joins, Aggregations & Grouping', importance: 'essential', difficulty: 'beginner', estimatedHours: 14 },
          { id: 'da-sql-advanced', title: 'Advanced SQL: Window Functions & CTEs', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 }
        ]
      },
      {
        level: 3,
        title: 'Python for Data Analysis (Pandas & NumPy)',
        description: 'DataFrame operations, data cleaning, handling missing values, and reshaping',
        topics: [
          { id: 'da-python-pandas', title: 'Data Cleaning & Manipulation with Pandas & NumPy', importance: 'essential', difficulty: 'intermediate', estimatedHours: 18 }
        ]
      },
      {
        level: 4,
        title: 'Exploratory Data Analysis & Visualization',
        description: 'Visual exploratory analysis with Matplotlib, Seaborn, and statistical plots',
        topics: [
          { id: 'da-data-viz-python', title: 'Data Visualization with Matplotlib & Seaborn', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 }
        ]
      },
      {
        level: 5,
        title: 'Business Intelligence Dashboards (Power BI / Tableau)',
        description: 'Star Schema data modeling, DAX measures, and interactive executive reports',
        topics: [
          { id: 'da-powerbi-tableau', title: 'Power BI / Tableau Dashboards & DAX Measures', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 }
        ]
      },
      {
        level: 6,
        title: 'Applied Statistics & A/B Testing',
        description: 'Hypothesis testing, p-values, t-tests, confidence intervals, and A/B experiments',
        topics: [
          { id: 'da-statistics-ab-testing', title: 'Business Statistics, Hypothesis Testing & A/B Experiments', importance: 'important', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      }
    ],
    projects: [
      { title: 'Retail Store Sales Performance Excel Dashboard', difficulty: 'Easy', description: 'Build an interactive Excel dashboard with Pivot Tables, XLOOKUP, and KPI cards.' },
      { title: 'E-Commerce SQL Customer Cohort & Retention Analysis', difficulty: 'Easy', description: 'Write complex SQL queries with Window Functions to analyze retention rates.' },
      { title: 'Exploratory Data Analysis on Global Tech Salaries', difficulty: 'Medium', description: 'Clean and analyze tech salary data using Python, Pandas, and Seaborn.' },
      { title: 'Executive Power BI Supply Chain & Inventory Dashboard', difficulty: 'Medium', description: 'Design a multi-page Power BI dashboard with DAX measures and turnover metrics.' },
      { title: 'End-to-End A/B Testing Analysis & Recommendation Report', difficulty: 'Hard', description: 'Conduct a complete statistical A/B test analysis in Python on conversion rates.' }
    ],
    interviewPreparation: [
      'What is the difference between RANK, DENSE_RANK, and ROW_NUMBER in SQL?',
      'Explain the difference between Star Schema and Snowflake Schema in data warehousing?'
    ],
    recommendedResources: [
      { title: 'Mode Analytics SQL Tutorial', type: 'Tutorial', url: 'https://mode.com/sql-tutorial' }
    ]
  },

  // 7. Data Scientist
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & AI',
    branches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical'],
    description: 'Build predictive statistical models, machine learning pipelines, deep learning neural networks, and deploy ML models into production.',
    requiredSkills: ['Python', 'Machine Learning', 'Scikit-Learn', 'Deep Learning (PyTorch)', 'Statistics', 'Pandas', 'SQL', 'FastAPI'],
    levels: [
      {
        level: 1,
        title: 'Mathematics & Statistical Foundations',
        description: 'Linear algebra, matrix operations, multivariate calculus, and probability theory',
        topics: [
          { id: 'ds-math-stats', title: 'Linear Algebra, Calculus & Probability Theory', importance: 'essential', difficulty: 'beginner', estimatedHours: 16 }
        ]
      },
      {
        level: 2,
        title: 'Data Preprocessing & Feature Engineering',
        description: 'Feature encoding, scaling, SMOTE class imbalance, and PCA dimensionality reduction',
        topics: [
          { id: 'ds-feature-engineering', title: 'Feature Encoding, Scaling & Dimensionality Reduction', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      },
      {
        level: 3,
        title: 'Supervised & Unsupervised Machine Learning',
        description: 'Regression, Decision Trees, Random Forests, XGBoost, and model evaluation metrics',
        topics: [
          { id: 'ds-supervised-ml', title: 'Regression, Classification & Ensemble Methods', importance: 'essential', difficulty: 'intermediate', estimatedHours: 20 },
          { id: 'ds-model-evaluation', title: 'Model Evaluation Metrics & Bias-Variance Tradeoff', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 }
        ]
      },
      {
        level: 4,
        title: 'Deep Learning & Neural Networks',
        description: 'Feedforward neural networks, backpropagation, and CNNs with PyTorch',
        topics: [
          { id: 'ds-deep-learning-pytorch', title: 'Deep Learning with PyTorch & Neural Networks', importance: 'essential', difficulty: 'advanced', estimatedHours: 22 }
        ]
      },
      {
        level: 5,
        title: 'Natural Language Processing & Transformers',
        description: 'Embeddings, self-attention mechanisms, and HuggingFace Transformers (BERT)',
        topics: [
          { id: 'ds-nlp-transformers', title: 'NLP, Word Embeddings & HuggingFace Transformers', importance: 'important', difficulty: 'advanced', estimatedHours: 18 }
        ]
      },
      {
        level: 6,
        title: 'MLOps & Model Deployment',
        description: 'FastAPI inference endpoints, Dockerizing ML microservices, and MLflow tracking',
        topics: [
          { id: 'ds-mlops-deployment', title: 'FastAPI Model Serving & MLOps Lifecycle', importance: 'important', difficulty: 'advanced', estimatedHours: 14 }
        ]
      }
    ],
    projects: [
      { title: 'House Price Prediction with Linear Regression', difficulty: 'Easy', description: 'Clean housing dataset and train a regularized Ridge/Lasso regression model.' },
      { title: 'Customer Churn Classification with Random Forest', difficulty: 'Easy', description: 'Predict customer churn using Random Forest with SMOTE handling class imbalance.' },
      { title: 'Credit Card Fraud Detection Pipeline', difficulty: 'Medium', description: 'Build an anomaly detection model using XGBoost on skewed transaction data.' },
      { title: 'Medical Image Classification with PyTorch CNN', difficulty: 'Medium', description: 'Train a Convolutional Neural Network (CNN) in PyTorch to classify chest X-ray scans.' },
      { title: 'Production NLP Sentiment Analysis API Service', difficulty: 'Hard', description: 'Fine-tune a Transformer model, package with FastAPI, and deploy in Docker.' }
    ],
    interviewPreparation: [
      'Explain the Bias-Variance Tradeoff in machine learning.',
      'How does Gradient Descent optimize neural network weights?'
    ],
    recommendedResources: [
      { title: 'Scikit-Learn User Guide', type: 'Documentation', url: 'https://scikit-learn.org' }
    ]
  },

  // 8. Cybersecurity Analyst
  {
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Cybersecurity',
    branches: ['CSE', 'IT', 'ECE'],
    description: 'Monitor network infrastructure, analyze threat logs, conduct vulnerability assessments, and safeguard computing systems against cyber attacks.',
    requiredSkills: ['Networking (TCP/IP)', 'Linux Security', 'Wireshark', 'Nmap', 'SIEM (Splunk)', 'OWASP Top 10', 'Cryptography'],
    levels: [
      {
        level: 1,
        title: 'Network Security Fundamentals & Packet Analysis',
        description: 'TCP/IP layers, packet inspection with Wireshark, and firewall architectures',
        topics: [
          { id: 'cs-networking-packets', title: 'TCP/IP Protocols & Packet Analysis with Wireshark', importance: 'essential', difficulty: 'beginner', estimatedHours: 14 }
        ]
      },
      {
        level: 2,
        title: 'Linux & Windows System Security',
        description: 'Linux hardening, SSH authentication, and Windows Active Directory domain security',
        topics: [
          { id: 'cs-system-hardening', title: 'Linux Hardening, File Permissions & Active Directory', importance: 'essential', difficulty: 'beginner', estimatedHours: 14 }
        ]
      },
      {
        level: 3,
        title: 'Security Operations & SIEM Threat Monitoring',
        description: 'SIEM log ingestion (Splunk/Elastic), detection rules, and incident response',
        topics: [
          { id: 'cs-siem-splunk', title: 'SIEM Log Analysis (Splunk / Elastic) & Incident Response', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 }
        ]
      },
      {
        level: 4,
        title: 'Vulnerability Assessment & Web Security (OWASP)',
        description: 'OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF) and Burp Suite proxy interception',
        topics: [
          { id: 'cs-owasp-top-10', title: 'OWASP Top 10 Web Vulnerabilities & Exploits', importance: 'essential', difficulty: 'intermediate', estimatedHours: 18 }
        ]
      },
      {
        level: 5,
        title: 'Cryptography & Public Key Infrastructure (PKI)',
        description: 'AES encryption, RSA public-key crypto, SHA-256 hashing, and SSL/TLS certificates',
        topics: [
          { id: 'cs-cryptography-pki', title: 'Symmetric/Asymmetric Encryption, Hashing & SSL/TLS', importance: 'essential', difficulty: 'intermediate', estimatedHours: 12 }
        ]
      },
      {
        level: 6,
        title: 'Ethical Hacking & Penetration Testing',
        description: 'OSINT reconnaissance, Nmap network scanning, and Metasploit exploitation',
        topics: [
          { id: 'cs-ethical-hacking', title: 'Reconnaissance, Nmap Scanning & Metasploit Basics', importance: 'important', difficulty: 'advanced', estimatedHours: 16 }
        ]
      }
    ],
    projects: [
      { title: 'Automated Port Scanner & Service Identifier CLI', difficulty: 'Easy', description: 'Build a Python socket script that scans IP ranges for open ports.' },
      { title: 'Packet Sniffer & HTTP Credential Warning Tool', difficulty: 'Easy', description: 'Create a Python packet sniffer alerting when passwords travel over HTTP.' },
      { title: 'SIEM Incident Detection & Log Analysis Rule Set', difficulty: 'Medium', description: 'Configure Splunk to detect brute-force SSH logins and trigger alert emails.' },
      { title: 'OWASP Top 10 Vulnerable Web App & Remediation Lab', difficulty: 'Medium', description: 'Execute SQLi and XSS payloads in a vulnerable web app and patch security flaws.' },
      { title: 'Automated Vulnerability Scanner & Security Audit Pipeline', difficulty: 'Hard', description: 'Build an automated vulnerability scanner with Nmap and OWASP ZAP.' }
    ],
    interviewPreparation: [
      'Explain the CIA Triad (Confidentiality, Integrity, Availability).',
      'How does an SSL/TLS Handshake work step-by-step?'
    ],
    recommendedResources: [
      { title: 'OWASP Top 10 Project', type: 'Guide', url: 'https://owasp.org' }
    ]
  },

  // 9. Embedded Systems Engineer
  {
    slug: 'embedded-systems-engineer',
    title: 'Embedded Systems Engineer',
    category: 'Embedded Systems',
    branches: ['ECE', 'EEE', 'CSE'],
    description: 'Develop low-level firmware in Embedded C/C++, program ARM Cortex-M/STM32 microcontrollers, master communication protocols (UART, SPI, I2C), and FreeRTOS.',
    requiredSkills: ['Embedded C', 'C++', 'STM32', 'ARM Cortex-M', 'FreeRTOS', 'UART/SPI/I2C', 'GPIO/Timers', 'Git'],
    levels: [
      {
        level: 1,
        title: 'Embedded C & Bitwise Memory Operations',
        description: 'Bit masking, shifting, memory-mapped I/O registers, and volatile keyword',
        topics: [
          { id: 'emb-c-bitwise', title: 'Embedded C Bitwise Operators, Pointers & Volatile Keyword', importance: 'essential', difficulty: 'beginner', estimatedHours: 14 }
        ]
      },
      {
        level: 2,
        title: 'Microcontroller Architecture & Peripherals',
        description: 'ARM Cortex-M core, NVIC interrupts, GPIO, Timers, and PWM motor control',
        topics: [
          { id: 'emb-mcu-peripherals', title: 'ARM Cortex-M Architecture, GPIO & Interrupts (NVIC)', importance: 'essential', difficulty: 'beginner', estimatedHours: 16 },
          { id: 'emb-timers-pwm', title: 'Hardware Timers, PWM & Analog-to-Digital Conversion (ADC)', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      },
      {
        level: 3,
        title: 'Hardware Communication Protocols',
        description: 'Serial protocols: UART asynchronous, I2C master-slave, SPI, and automotive CAN bus',
        topics: [
          { id: 'emb-comm-protocols', title: 'Serial Protocols: UART, I2C, SPI & CAN Bus', importance: 'essential', difficulty: 'intermediate', estimatedHours: 18 }
        ]
      },
      {
        level: 4,
        title: 'Real-Time Operating Systems (FreeRTOS)',
        description: 'Preemptive task scheduling, mutexes, semaphores, queues, and priority inversion',
        topics: [
          { id: 'emb-freertos', title: 'FreeRTOS Task Management, Semaphores & Queues', importance: 'essential', difficulty: 'advanced', estimatedHours: 20 }
        ]
      }
    ],
    projects: [
      { title: 'Bare-Metal STM32 GPIO LED Sequencer & Button Debouncer', difficulty: 'Easy', description: 'Program register-level GPIO toggling with timer interrupt debouncing.' },
      { title: 'UART Command-Line Shell Interface for Microcontroller', difficulty: 'Easy', description: 'Build an interactive serial CLI over UART to query sensor readings.' },
      { title: 'I2C Digital Temperature & OLED Display Driver', difficulty: 'Medium', description: 'Write custom I2C drivers to read temperature and render telemetry on OLED.' },
      { title: 'Multi-Tasking FreeRTOS Telemetry & Motor Controller', difficulty: 'Medium', description: 'Implement FreeRTOS tasks for sensor sampling, PID motor control, and logging.' },
      { title: 'Automotive CAN Bus Electronic Control Unit (ECU) Simulator', difficulty: 'Hard', description: 'Develop a two-node CAN network broadcasting vehicle telemetry with fault tolerance.' }
    ],
    interviewPreparation: [
      'What does the volatile keyword do in Embedded C?',
      'Compare I2C and SPI protocols in terms of speed, pin count, and complexity.'
    ],
    recommendedResources: [
      { title: 'FreeRTOS Official Documentation', type: 'Documentation', url: 'https://www.freertos.org' }
    ]
  },

  // 10. VLSI Design Engineer
  {
    slug: 'vlsi-design-engineer',
    title: 'VLSI Design Engineer',
    category: 'VLSI & Semiconductor',
    branches: ['ECE'],
    description: 'Design digital integrated circuits, microchips, and semiconductor hardware using Verilog/SystemVerilog RTL synthesis and Static Timing Analysis.',
    requiredSkills: ['Verilog HDL', 'SystemVerilog', 'Digital Logic', 'RTL Design', 'Static Timing Analysis (STA)', 'FPGA'],
    levels: [
      {
        level: 1,
        title: 'Digital Electronics & Logic Design Core',
        description: 'Combinational logic, sequential circuits, K-Maps, and Mealy/Moore FSMs',
        topics: [
          { id: 'vlsi-digital-logic', title: 'Combinational & Sequential Circuits, K-Maps & FSMs', importance: 'essential', difficulty: 'beginner', estimatedHours: 16 }
        ]
      },
      {
        level: 2,
        title: 'Hardware Description Languages: Verilog & SystemVerilog',
        description: 'Synthesizable RTL, blocking vs non-blocking assignments, and testbench verification',
        topics: [
          { id: 'vlsi-verilog-rtl', title: 'Verilog RTL Modeling, Blocking vs Non-Blocking Assignments', importance: 'essential', difficulty: 'intermediate', estimatedHours: 18 },
          { id: 'vlsi-testbenches', title: 'SystemVerilog Testbenches & Verification', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      },
      {
        level: 3,
        title: 'Static Timing Analysis (STA) & ASIC Design Flow',
        description: 'Setup/hold timing constraints, clock skew, slack calculation, and metastability',
        topics: [
          { id: 'vlsi-sta-timing', title: 'Static Timing Analysis (STA): Setup & Hold Time Violations', importance: 'essential', difficulty: 'advanced', estimatedHours: 16 }
        ]
      }
    ],
    projects: [
      { title: '8-Bit Arithmetic Logic Unit (ALU) in Verilog', difficulty: 'Easy', description: 'Design and simulate an 8-bit ALU supporting math and comparison flags.' },
      { title: 'Configurable Synchronous FIFO Buffer with Flags', difficulty: 'Easy', description: 'Implement a circular pointer FIFO buffer with full and empty flags.' },
      { title: 'Mealy/Moore Traffic Light Controller FSM', difficulty: 'Medium', description: 'Design a finite state machine managing 4-way traffic signals with pedestrian triggers.' },
      { title: 'SPI Master/Slave Controller in SystemVerilog', difficulty: 'Medium', description: 'Construct a full-duplex SPI communication core with configurable clock polarity.' },
      { title: 'Single-Cycle 32-Bit RISC-V Processor Core', difficulty: 'Hard', description: 'Design a 32-bit RISC-V CPU core executing RV32I base instructions.' }
    ],
    interviewPreparation: [
      'Explain Blocking (=) vs Non-Blocking (<=) assignments in Verilog.',
      'Define Setup Time and Hold Time in digital circuits.'
    ],
    recommendedResources: [
      { title: 'ASIC World Verilog Tutorials', type: 'Tutorial', url: 'http://www.asic-world.com' }
    ]
  },

  // 11. IoT Systems Engineer
  {
    slug: 'iot-engineer',
    title: 'IoT Systems Engineer',
    category: 'Embedded Systems',
    branches: ['ECE', 'EEE', 'CSE', 'IT'],
    description: 'Connect smart edge hardware to the cloud using ESP32 microcontrollers, wireless protocols (MQTT, BLE, Wi-Fi), AWS IoT Core, and IoT telemetry dashboards.',
    requiredSkills: ['ESP32', 'Arduino / C++', 'MQTT', 'HTTP/REST', 'AWS IoT Core', 'Wi-Fi / BLE', 'Node-RED', 'Sensors'],
    levels: [
      {
        level: 1,
        title: 'Edge Microcontrollers & Sensor Interfacing',
        description: 'ESP32 architecture, analog/digital sensors, and deep sleep power management',
        topics: [
          { id: 'iot-esp32-sensors', title: 'ESP32 Dual-Core Architecture & Sensor Data Acquisition', importance: 'essential', difficulty: 'beginner', estimatedHours: 12 }
        ]
      },
      {
        level: 2,
        title: 'IoT Wireless Protocols & MQTT Messaging',
        description: 'MQTT publish/subscribe, QoS levels (0, 1, 2), and Wi-Fi client management',
        topics: [
          { id: 'iot-mqtt-wireless', title: 'MQTT Publish/Subscribe Protocol & Wi-Fi Client', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      },
      {
        level: 3,
        title: 'Cloud IoT Platforms & Dashboards',
        description: 'AWS IoT Core, X.509 device certificates, device shadows, and Node-RED dashboards',
        topics: [
          { id: 'iot-cloud-dashboards', title: 'Cloud IoT (AWS IoT Core / ThingsBoard) & Real-Time Dashboards', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 }
        ]
      }
    ],
    projects: [
      { title: 'ESP32 Local Smart Weather Station & Web Server', difficulty: 'Easy', description: 'Read sensor telemetry and serve an HTML dashboard directly from ESP32.' },
      { title: 'BLE Smart Beacon & Mobile Scanner App', difficulty: 'Easy', description: 'Configure ESP32 as a BLE peripheral broadcasting environmental data.' },
      { title: 'MQTT-Based Smart Home Relay & Lighting Automation', difficulty: 'Medium', description: 'Control AC home appliances via relays using an MQTT broker and smartphone.' },
      { title: 'AWS IoT Core Telemetry Pipeline & Alert Rule System', difficulty: 'Medium', description: 'Publish encrypted sensor data to AWS IoT Core and trigger alerts.' },
      { title: 'Industrial IoT Edge Node with Over-The-Air (OTA) Updates', difficulty: 'Hard', description: 'Build an industrial sensor node with Wi-Fi provisioning and firmware OTA updating.' }
    ],
    interviewPreparation: [
      'Compare MQTT and HTTP protocols for IoT applications.',
      'Explain the three MQTT Quality of Service (QoS) levels.'
    ],
    recommendedResources: [
      { title: 'Random Nerd Tutorials ESP32 Guides', type: 'Tutorial', url: 'https://randomnerdtutorials.com' }
    ]
  },

  // 12. Electrical Design Engineer
  {
    slug: 'electrical-design-engineer',
    title: 'Electrical Design Engineer',
    category: 'Electrical & Power',
    branches: ['EEE'],
    description: 'Design electrical power distribution systems, single-line diagrams (SLD), substation layouts, transformer calculations, and industrial power protection.',
    requiredSkills: ['AutoCAD Electrical', 'ETAP', 'Power Systems', 'Protection Relays', 'Circuit Breakers', 'Transformers'],
    levels: [
      {
        level: 1,
        title: 'Power Systems & Circuit Theory Core',
        description: 'Three-phase AC power, power factor correction, and transformer sizing',
        topics: [
          { id: 'ee-power-circuits', title: 'Three-Phase AC Power, Power Factor & Transformer Calculations', importance: 'essential', difficulty: 'beginner', estimatedHours: 14 }
        ]
      },
      {
        level: 2,
        title: 'Electrical Drafting & Single Line Diagrams (SLD)',
        description: 'AutoCAD Electrical SLD drawings, motor control centers (MCC), and cable schedules',
        topics: [
          { id: 'ee-autocad-electrical', title: 'AutoCAD Electrical: Single Line Diagrams (SLD) & Panel Layouts', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 }
        ]
      },
      {
        level: 3,
        title: 'Power Distribution, Cable Sizing & Protection Relays',
        description: 'Cable ampacity, voltage drop calculations, breaker sizing, and relay protection',
        topics: [
          { id: 'ee-cable-sizing-protection', title: 'Cable Sizing Calculations, Switchgear & Protection Relays', importance: 'essential', difficulty: 'advanced', estimatedHours: 18 }
        ]
      }
    ],
    projects: [
      { title: 'Industrial Plant Power Factor Correction Sizing Calculation', difficulty: 'Easy', description: 'Calculate capacitor bank capacity to improve power factor from 0.75 to 0.98 lag.' },
      { title: 'Commercial Building Single Line Diagram (SLD) in AutoCAD', difficulty: 'Easy', description: 'Draft a complete SLD including main switchboard and distribution boards.' },
      { title: 'Substation Transformer & Cable Sizing Engineering Sheet', difficulty: 'Medium', description: 'Design cable sizing and breaker selection for a 1000 kVA substation.' },
      { title: 'Motor Control Center (MCC) Protection & Starter Panel', difficulty: 'Medium', description: 'Design DOL and Star-Delta starter schematics with overload relays.' },
      { title: 'Industrial Substation Short-Circuit & Relay Coordination Analysis', difficulty: 'Hard', description: 'Perform fault analysis and protective relay TCC curves in ETAP.' }
    ],
    interviewPreparation: [
      'Explain how Power Factor correction works in industrial power plants.',
      'How do you calculate cable size considering continuous current and voltage drop?'
    ],
    recommendedResources: [
      { title: 'IEEE Standards for Electrical Safety', type: 'Documentation', url: 'https://standards.ieee.org' }
    ]
  },

  // 13. PLC / SCADA Automation Engineer
  {
    slug: 'plc-scada-automation-engineer',
    title: 'PLC / SCADA Automation Engineer',
    category: 'Automation & Robotics',
    branches: ['EEE', 'ECE', 'Mechanical'],
    description: 'Program industrial Programmable Logic Controllers (PLCs), design SCADA and HMI dashboards, configure Variable Frequency Drives (VFDs), and automate factory assembly lines.',
    requiredSkills: ['PLC Programming', 'Ladder Logic (LD)', 'Siemens TIA Portal', 'SCADA (Ignition / WinCC)', 'HMI', 'VFDs', 'Modbus / Profinet'],
    levels: [
      {
        level: 1,
        title: 'Industrial Control Fundamentals & Relay Logic',
        description: 'Sensors (NPN/PNP), contactors, control relays, and hardwired safety interlocks',
        topics: [
          { id: 'plc-industrial-basics', title: 'Industrial Sensors, Actuators & Relay Interlocking', importance: 'essential', difficulty: 'beginner', estimatedHours: 12 }
        ]
      },
      {
        level: 2,
        title: 'PLC Programming (IEC 61131-3 Standards)',
        description: 'Ladder Logic (LD), timers (TON/TOF), counters, and Structured Text (ST)',
        topics: [
          { id: 'plc-ladder-logic', title: 'PLC Ladder Logic (LD), Timers, Counters & Memory Bits', importance: 'essential', difficulty: 'beginner', estimatedHours: 16 },
          { id: 'plc-advanced-structured-text', title: 'Structured Text (ST) & Function Block Diagrams (FBD)', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      },
      {
        level: 3,
        title: 'HMI, SCADA & Industrial Communication Networks',
        description: 'Operator touchscreen design, SCADA alarming, Modbus RTU, and Profinet buses',
        topics: [
          { id: 'plc-scada-hmi', title: 'HMI Screen Design, SCADA Systems & Alarming', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 },
          { id: 'plc-industrial-networks', title: 'Industrial Communication Protocols (Modbus & Profinet)', importance: 'important', difficulty: 'advanced', estimatedHours: 14 }
        ]
      }
    ],
    projects: [
      { title: 'Automated Dual-Conveyor Sorting System in Ladder Logic', difficulty: 'Easy', description: 'Program a PLC logic routine to sort packages onto a reject conveyor.' },
      { title: 'Water Treatment Plant Tank Level & Pump Sequence Controller', difficulty: 'Easy', description: 'Design a pump alternating control sequence with float switch interlocks.' },
      { title: 'Interactive Siemens HMI Operator Dashboard', difficulty: 'Medium', description: 'Create an HMI interface with start/stop controls and real-time level animations.' },
      { title: 'Variable Frequency Drive (VFD) Speed Control over Modbus RTU', difficulty: 'Medium', description: 'Control AC motor speed from a PLC over an RS-485 Modbus RTU serial bus.' },
      { title: 'Full-Scale Factory Automation SCADA System in Ignition', difficulty: 'Hard', description: 'Build an enterprise SCADA supervisory system with batch recipe management.' }
    ],
    interviewPreparation: [
      'Explain the PLC Scan Cycle (Input Scan, Program Execution, Output Write).',
      'What is the difference between Sinking (NPN) and Sourcing (PNP) PLC inputs?'
    ],
    recommendedResources: [
      { title: 'Siemens TIA Portal Support Guides', type: 'Documentation', url: 'https://support.industry.siemens.com' }
    ]
  },

  // 14. Mechanical Design Engineer
  {
    slug: 'mechanical-design-engineer',
    title: 'Mechanical Design Engineer',
    category: 'Design & CAD',
    branches: ['Mechanical'],
    description: 'Create 3D parametric CAD models, mechanical assemblies, GD&T drawings, Finite Element Analysis (FEA) stress simulations, and Design for Manufacturing (DFM).',
    requiredSkills: ['SolidWorks', 'CATIA', 'ANSYS (FEA)', 'GD&T (ASME Y14.5)', 'DFM / DFA', 'Engineering Materials', 'Sheet Metal'],
    levels: [
      {
        level: 1,
        title: 'Engineering Mechanics & Strength of Materials',
        description: 'Stress-strain analysis, Von Mises failure theory, and factor of safety calculations',
        topics: [
          { id: 'mech-strength-materials', title: 'Stress-Strain Curves, Factor of Safety & Failure Theories', importance: 'essential', difficulty: 'beginner', estimatedHours: 14 }
        ]
      },
      {
        level: 2,
        title: '3D Parametric CAD Modeling with SolidWorks',
        description: 'Part modeling, mechanical assembly mates, sheet metal, and plastic DFM design',
        topics: [
          { id: 'mech-solidworks-parts', title: 'Parametric 3D Part & Assembly Modeling (SolidWorks / CATIA)', importance: 'essential', difficulty: 'intermediate', estimatedHours: 18 },
          { id: 'mech-sheet-metal-surfacing', title: 'Sheet Metal Design & Plastic Injection Mold Part Design', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      },
      {
        level: 3,
        title: 'Engineering Drawings & GD&T (ASME Y14.5)',
        description: 'Geometric dimensioning, datums, true position, and tolerance stack-up analysis',
        topics: [
          { id: 'mech-gdt-drawings', title: 'Geometric Dimensioning and Tolerancing (GD&T ASME Y14.5)', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 }
        ]
      },
      {
        level: 4,
        title: 'Finite Element Analysis (FEA) Simulation',
        description: 'ANSYS static structural FEA, mesh convergence, and stress/deflection plots',
        topics: [
          { id: 'mech-ansys-fea', title: 'ANSYS FEA: Static Structural Stress & Deflection Simulation', importance: 'essential', difficulty: 'advanced', estimatedHours: 18 }
        ]
      }
    ],
    projects: [
      { title: 'Parametric CAD Model of Single-Cylinder Engine Piston', difficulty: 'Easy', description: 'Model a detailed engine piston with wrist pin bosses and ring grooves in SolidWorks.' },
      { title: 'Industrial Sheet Metal Enclosure with Louvers & Fasteners', difficulty: 'Easy', description: 'Design a sheet metal control box enclosure with ventilation louvers.' },
      { title: 'Two-Stage Epicyclic Planetary Gearbox Assembly', difficulty: 'Medium', description: 'Design a planetary reduction gearbox with sun, planet, and ring gears in CAD.' },
      { title: 'Production 2D Manufacturing Drawing with GD&T Tolerances', difficulty: 'Medium', description: 'Create a complete ASME Y14.5 manufacturing drawing with datum callouts.' },
      { title: 'Automotive Suspension Control Arm FEA Stress Optimization', difficulty: 'Hard', description: 'Perform structural FEA in ANSYS on a wishbone control arm and optimize weight.' }
    ],
    interviewPreparation: [
      'Explain the Von Mises Failure Criterion and why it is used for ductile materials.',
      'What is True Position in GD&T and what does the MMC modifier mean?'
    ],
    recommendedResources: [
      { title: 'SolidWorks Certification Guides', type: 'Guide', url: 'https://my.solidworks.com' }
    ]
  },

  // 15. Robotics & Mechatronics Engineer
  {
    slug: 'robotics-mechatronics-engineer',
    title: 'Robotics & Mechatronics Engineer',
    category: 'Automation & Robotics',
    branches: ['Mechanical', 'ECE', 'EEE', 'CSE'],
    description: 'Integrate mechanical kinematics, electric motor actuators, Robot Operating System (ROS 2), LiDAR SLAM navigation, computer vision, and embedded control systems.',
    requiredSkills: ['ROS / ROS 2', 'Python', 'C++', 'Robot Kinematics', 'OpenCV', 'LiDAR SLAM', 'PID Control', 'Actuators'],
    levels: [
      {
        level: 1,
        title: 'Spatial Mathematics & Robot Kinematics',
        description: 'Homogeneous transformation matrices, quaternions, DH parameters, and inverse kinematics',
        topics: [
          { id: 'rob-kinematics', title: 'Forward & Inverse Kinematics (DH Parameters & Jacobians)', importance: 'essential', difficulty: 'beginner', estimatedHours: 16 }
        ]
      },
      {
        level: 2,
        title: 'Robot Operating System (ROS 2 Core)',
        description: 'Publish/subscribe topics, services, actions, URDF modeling, and Gazebo physics simulation',
        topics: [
          { id: 'rob-ros2-core', title: 'ROS 2 Architecture: Nodes, Topics, Services & Actions', importance: 'essential', difficulty: 'intermediate', estimatedHours: 18 },
          { id: 'rob-urdf-gazebo', title: 'Robot Modeling with URDF & Physics Simulation in Gazebo', importance: 'essential', difficulty: 'intermediate', estimatedHours: 14 }
        ]
      },
      {
        level: 3,
        title: 'Autonomous Navigation (SLAM & Nav2)',
        description: 'LiDAR mapping with Cartographer, costmaps, and Nav2 autonomous path planning',
        topics: [
          { id: 'rob-slam-nav2', title: 'LiDAR SLAM Mapping & Nav2 Autonomous Path Planning', importance: 'essential', difficulty: 'advanced', estimatedHours: 20 }
        ]
      },
      {
        level: 4,
        title: 'Computer Vision & Motor Control',
        description: 'OpenCV contour tracking, AprilTag detection, encoder feedback, and PID motor loops',
        topics: [
          { id: 'rob-vision-control', title: 'OpenCV Computer Vision & Closed-Loop PID Motor Control', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 }
        ]
      }
    ],
    projects: [
      { title: '2-DOF Robotic Arm Kinematics Simulator in Python', difficulty: 'Easy', description: 'Build a Python simulation computing Forward and Inverse Kinematics for a 2-joint arm.' },
      { title: 'Closed-Loop PID DC Motor Position Controller on Microcontroller', difficulty: 'Easy', description: 'Program a microcontroller PID control loop using encoder feedback.' },
      { title: 'Autonomous Line-Following & Obstacle-Avoiding Robot in ROS 2', difficulty: 'Medium', description: 'Build a mobile robot in ROS 2 Gazebo with camera tracking and ultrasonic sensors.' },
      { title: 'AprilTag Visual Servoing Robotic Arm Object Sorter', difficulty: 'Medium', description: 'Use OpenCV to detect AprilTag markers and command pick-and-place trajectories.' },
      { title: 'Autonomous Mobile Robot (AMR) with LiDAR SLAM & Nav2', difficulty: 'Hard', description: 'Construct an autonomous warehouse robot in Gazebo that maps unknown environments.' }
    ],
    interviewPreparation: [
      'Explain Forward Kinematics vs Inverse Kinematics in robotics.',
      'How does the ROS 2 computation graph work (Topics, Services, Actions)?'
    ],
    recommendedResources: [
      { title: 'ROS 2 Official Documentation', type: 'Documentation', url: 'https://docs.ros.org' }
    ]
  },

  // 16. Structural Engineer
  {
    slug: 'structural-engineer',
    title: 'Structural Engineer',
    category: 'Civil & Construction',
    branches: ['Civil'],
    description: 'Design building load-bearing structures, reinforced concrete (RCC) frames, structural steel trusses, seismic earthquake safety calculations, and STAAD.Pro / ETABS modeling.',
    requiredSkills: ['STAAD.Pro', 'ETABS', 'AutoCAD', 'RCC Design (IS 456 / ACI 318)', 'Structural Steel Design', 'Seismic Analysis'],
    levels: [
      {
        level: 1,
        title: 'Structural Mechanics & Analysis Core',
        description: 'Equilibrium equations, Shear Force & Bending Moment Diagrams (SFD & BMD)',
        topics: [
          { id: 'civ-structural-mechanics', title: 'Shear Force & Bending Moment Diagrams (SFD & BMD)', importance: 'essential', difficulty: 'beginner', estimatedHours: 14 }
        ]
      },
      {
        level: 2,
        title: 'Reinforced Concrete Design (RCC)',
        description: 'Limit state design of concrete beams, one-way/two-way slabs, columns, and footings',
        topics: [
          { id: 'civ-rcc-design', title: 'Limit State Design of RCC Beams, Slabs, Columns & Footings', importance: 'essential', difficulty: 'intermediate', estimatedHours: 18 }
        ]
      },
      {
        level: 3,
        title: 'Structural Steel Design & Connections',
        description: 'Design of steel tension/compression members, trusses, and bolted/welded joints',
        topics: [
          { id: 'civ-steel-design', title: 'Structural Steel Design: Trusses, Columns & Connections', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 }
        ]
      },
      {
        level: 4,
        title: '3D Building Analysis with STAAD.Pro / ETABS',
        description: '3D frame modeling, dead/live/wind loads, and seismic base shear calculations',
        topics: [
          { id: 'civ-etabs-staad', title: 'ETABS / STAAD.Pro 3D Frame Modeling & Seismic Analysis', importance: 'essential', difficulty: 'advanced', estimatedHours: 18 }
        ]
      }
    ],
    projects: [
      { title: 'Manual Design Sheet for Singly Reinforced Concrete Beam', difficulty: 'Easy', description: 'Calculate bending moment and tensile steel rebar area for a residential beam.' },
      { title: 'One-Way & Two-Way Slab Rebar Detailing Drawing in AutoCAD', difficulty: 'Easy', description: 'Draft structural detailing plans with main bars and bar bending schedules (BBS).' },
      { title: 'Industrial Roof Truss Design & Bolted Connection Calculation', difficulty: 'Medium', description: 'Design an industrial Pratt roof truss with gusset plate bolted connection verification.' },
      { title: 'Isolated RCC Column Footing Design & Soil Bearing Check', difficulty: 'Medium', description: 'Calculate footing base dimensions and punching shear for axial column loads.' },
      { title: 'G+5 Multi-Story Building Structural Analysis in ETABS', difficulty: 'Hard', description: 'Complete 3D structural analysis of a G+5 residential building with seismic verification.' }
    ],
    interviewPreparation: [
      'Explain Limit State of Collapse vs Limit State of Serviceability.',
      'What is the difference between a One-Way Slab and a Two-Way Slab?'
    ],
    recommendedResources: [
      { title: 'IS 456 / ACI 318 Concrete Design Codes', type: 'Documentation', url: 'https://www.concrete.org' }
    ]
  },

  // 17. Construction Project Manager / BIM Engineer
  {
    slug: 'construction-project-manager',
    title: 'Construction Project Manager / BIM Engineer',
    category: 'Civil & Construction',
    branches: ['Civil'],
    description: 'Manage building construction schedules, Primavera P6 / MS Project critical path planning, Autodesk Revit 3D BIM modeling, quantity surveying (BOQ), and site safety.',
    requiredSkills: ['Autodesk Revit (BIM)', 'Primavera P6', 'MS Project', 'Quantity Surveying (BOQ)', 'Cost Estimation', 'AutoCAD', 'Earned Value Management'],
    levels: [
      {
        level: 1,
        title: 'Project Planning & CPM Scheduling (Primavera P6)',
        description: 'Work Breakdown Structure (WBS), Gantt charts, and Critical Path Method calculations',
        topics: [
          { id: 'con-primavera-p6', title: 'Critical Path Method (CPM), WBS & Scheduling in Primavera P6', importance: 'essential', difficulty: 'beginner', estimatedHours: 16 }
        ]
      },
      {
        level: 2,
        title: 'Building Information Modeling (Autodesk Revit BIM)',
        description: '3D parametric BIM architectural modeling and Navisworks spatial clash detection',
        topics: [
          { id: 'con-revit-bim', title: 'Autodesk Revit 3D BIM Modeling & Navisworks Clash Detection', importance: 'essential', difficulty: 'intermediate', estimatedHours: 18 }
        ]
      },
      {
        level: 3,
        title: 'Quantity Surveying, Cost Estimation & BOQ',
        description: 'Material quantity takeoffs, labor rate analysis, and Bill of Quantities (BOQ)',
        topics: [
          { id: 'con-quantity-boq', title: 'Quantity Takeoffs, Rate Analysis & Bill of Quantities (BOQ)', importance: 'essential', difficulty: 'intermediate', estimatedHours: 16 }
        ]
      },
      {
        level: 4,
        title: 'Construction Cost Control & Earned Value Management',
        description: 'Planned Value (PV), Earned Value (EV), Actual Cost (AC), and CPI/SPI metrics',
        topics: [
          { id: 'con-evm-contracts', title: 'Earned Value Management (EVM) & Construction Contracts', importance: 'essential', difficulty: 'advanced', estimatedHours: 14 }
        ]
      }
    ],
    projects: [
      { title: 'Residential Villa Quantity Takeoff & Detailed BOQ Sheet', difficulty: 'Easy', description: 'Extract concrete, steel, and masonry quantities from architectural drawings.' },
      { title: 'Commercial Construction Project Schedule in MS Project', difficulty: 'Easy', description: 'Build a 12-month construction schedule with WBS, milestones, and Gantt charts.' },
      { title: 'Autodesk Revit 3D BIM Architectural & Structural Villa Model', difficulty: 'Medium', description: 'Model a 3D residential villa in Revit with automated quantity schedules.' },
      { title: 'Multi-Story Navisworks Clash Detection & Coordination Report', difficulty: 'Medium', description: 'Import Revit models into Navisworks to resolve clashes between HVAC and beams.' },
      { title: 'Earned Value Management (EVM) Project Health Monitoring Dashboard', difficulty: 'Hard', description: 'Construct an EVM tracking system in Excel/Power BI calculating CPI and SPI.' }
    ],
    interviewPreparation: [
      'Explain the Critical Path Method (CPM). What is Total Float vs Free Float?',
      'How does Earned Value Management (EVM) calculate CPI and SPI metrics?'
    ],
    recommendedResources: [
      { title: 'PMI PMBOK Guide', type: 'Guide', url: 'https://www.pmi.org' }
    ]
  }
];

// Standard Helper Generator for Project Steps
const defaultSteps = [
  'Define project scope and requirement architecture',
  'Design data schemas, component models, or hardware pinouts',
  'Build foundation core logic and basic user interface/controller',
  'Implement authentication, data processing, or signal conversion',
  'Integrate APIs, hardware buses, or database storage layer',
  'Implement search, filtering, telemetry visualization, or alerts',
  'Conduct thorough unit testing, error handling, and debugging',
  'Deploy application to cloud/hosting platform or upload firmware',
  'Document technical architecture, write README, and showcase on GitHub'
];

// Helper function to create standardized 5-project tuples for any roadmap
const createRoadmapProjects = (roadmapSlug, p1, p2, p3, p4, p5) => [
  { ...p1, slug: `${roadmapSlug}-easy-1`, roadmapSlug, difficulty: 'easy', recommendedOrder: 1, resumeValue: 'High', portfolioValue: 'High', developmentSteps: defaultSteps },
  { ...p2, slug: `${roadmapSlug}-easy-2`, roadmapSlug, difficulty: 'easy', recommendedOrder: 2, resumeValue: 'High', portfolioValue: 'High', developmentSteps: defaultSteps },
  { ...p3, slug: `${roadmapSlug}-med-1`,  roadmapSlug, difficulty: 'medium', recommendedOrder: 3, resumeValue: 'High', portfolioValue: 'High', developmentSteps: defaultSteps },
  { ...p4, slug: `${roadmapSlug}-med-2`,  roadmapSlug, difficulty: 'medium', recommendedOrder: 4, resumeValue: 'High', portfolioValue: 'High', developmentSteps: defaultSteps },
  { ...p5, slug: `${roadmapSlug}-hard-1`, roadmapSlug, difficulty: 'hard', recommendedOrder: 5, resumeValue: 'High', portfolioValue: 'High', developmentSteps: defaultSteps }
];

const projects = [
  // 1. Frontend Developer Projects
  ...createRoadmapProjects(
    'frontend-developer',
    {
      title: 'Responsive Developer Portfolio Landing Page',
      description: 'Build a modern personal portfolio website featuring dark mode toggle, smooth scrolling, interactive skills grid, and contact form validation.',
      whyBuildIt: 'Establishes basic CSS Flexbox/Grid layouts, DOM manipulation, responsive breakpoints, and provides a permanent personal home for your projects.',
      estimatedTime: '1-3 days',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git'],
      skillsLearned: ['Flexbox & Grid', 'DOM Events', 'Form Validation', 'Responsive Layouts'],
      features: ['Dark/Light theme toggle', 'Filterable project showcase', 'Responsive mobile navigation drawer', 'Contact form validation'],
      prerequisites: ['HTML5 basics', 'CSS selector rules', 'Basic JS DOM methods']
    },
    {
      title: 'Interactive Product Filter & Search Interface',
      description: 'Create an e-commerce product catalog page with instant client-side text searching, category checkboxes, price range sliders, and sorting controls.',
      whyBuildIt: 'Teaches data filtering algorithms, state synchronization, dynamic array manipulation, and responsive UI card rendering.',
      estimatedTime: '2-4 days',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'JSON'],
      skillsLearned: ['Array Methods (filter, sort, map)', 'Debounced Input Search', 'Dynamic DOM Manipulation'],
      features: ['Real-time search bar', 'Multi-category filter checkboxes', 'Price range slider', 'Sort by price & popularity'],
      prerequisites: ['JavaScript ES6 arrays & objects']
    },
    {
      title: 'Smart Job Application Tracker Dashboard',
      description: 'Develop a single-page dashboard application that allows students to track job/internship applications, interview dates, status tags, and notes.',
      whyBuildIt: 'Combines component state, local storage persistence, modal dialogs, and status metrics into a genuine resume-building tool.',
      estimatedTime: '2-3 weeks',
      technologies: ['React', 'JavaScript', 'TailwindCSS', 'REST API'],
      skillsLearned: ['React Component Architecture', 'useState & useEffect Hooks', 'Local Storage Persistence', 'Dashboard UI'],
      features: ['Add/Edit/Delete job applications', 'Status tags (Applied, Interviewing, Offer, Rejected)', 'Filter by status & date', 'Application statistics charts'],
      prerequisites: ['React fundamentals', 'JavaScript ES6+']
    },
    {
      title: 'Real-Time Weather & Air Quality Dashboard',
      description: 'Build a multi-city weather intelligence application that fetches live weather forecasts, UV index, wind speed, and air quality metrics from OpenWeather API.',
      whyBuildIt: 'Demonstrates asynchronous API integration, loading states, error boundaries, geolocation API, and dynamic metric visualizations.',
      estimatedTime: '2-3 weeks',
      technologies: ['React', 'Async JavaScript', 'Fetch API', 'Chart.js'],
      skillsLearned: ['Asynchronous API Consumption', 'Geolocation Browser API', 'Data Visualization Charts', 'Error Handling'],
      features: ['City search with autocomplete', '5-day forecast breakdown', 'Air Quality Index indicator', 'Interactive temperature unit toggle (C/F)'],
      prerequisites: ['React Hooks', 'Async/Await & Promises']
    },
    {
      title: 'Collaborative Web Canvas & Workspace Platform',
      description: 'Construct an advanced web application featuring an interactive drawing canvas, rich-text note blocks, drag-and-drop workspace nodes, and real-time state synchronization.',
      whyBuildIt: 'A top-tier portfolio centerpiece demonstrating advanced DOM manipulation, HTML5 Canvas API, state management, and production-grade performance optimization.',
      estimatedTime: '4-6 weeks',
      technologies: ['React', 'TypeScript', 'HTML5 Canvas', 'Redux Toolkit', 'WebSockets'],
      skillsLearned: ['HTML5 Canvas Rendering', 'Complex State Management', 'TypeScript Interfaces', 'Performance Optimization'],
      features: ['Interactive multi-tool canvas (Pen, Shapes, Text)', 'Drag-and-drop node placement', 'Undo/Redo history stack', 'Export canvas to PNG/SVG', 'Local & cloud workspace saving'],
      prerequisites: ['React Hooks', 'TypeScript basics', 'Advanced JavaScript']
    }
  ),

  // 2. Backend Developer Projects
  ...createRoadmapProjects(
    'backend-developer',
    {
      title: 'Command Line Log & File Analyzer CLI Tool',
      description: 'Build a Node.js command-line utility that parses server log files, extracts IP addresses, counts error status codes, and outputs summary JSON reports.',
      whyBuildIt: 'Teaches file system streams, regex pattern matching, CLI argument parsing, and command line tool distribution.',
      estimatedTime: '2-3 days',
      technologies: ['Node.js', 'File System API', 'JavaScript'],
      skillsLearned: ['Stream Processing', 'Regex Expressions', 'CLI Argument Parsing'],
      features: ['Parse log files line-by-line', 'Error rate percentage calculation', 'Export analysis to JSON/CSV'],
      prerequisites: ['Node.js basics']
    },
    {
      title: 'Simple URL Shortener REST API',
      description: 'Create a micro-service API that converts long destination URLs into compact shortened aliases and tracks link redirect analytics.',
      whyBuildIt: 'Master Express routing, database unique indexes, URL validation, and HTTP 302 redirect responses.',
      estimatedTime: '3-5 days',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
      skillsLearned: ['RESTful Endpoint Design', 'MongoDB Schema Indexing', 'HTTP Redirects'],
      features: ['Short URL generation', 'Original URL redirect endpoint', 'Link click analytics counter'],
      prerequisites: ['Express basics', 'MongoDB basics']
    },
    {
      title: 'Secure Authentication & RBAC Service',
      description: 'Build a production-grade authentication micro-service featuring user registration, bcrypt password hashing, JWT access/refresh token rotation, and Role-Based Access Control (RBAC).',
      whyBuildIt: 'Essential backend security foundation required by every tech company and engineering interview.',
      estimatedTime: '2-3 weeks',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Bcrypt'],
      skillsLearned: ['Bcrypt Hashing', 'JWT Session Management', 'Middleware Guards', 'RBAC Authorization'],
      features: ['User login & signup routes', 'Bcrypt password hashing', 'JWT token expiration & refresh', 'Admin vs User route protection'],
      prerequisites: ['Express routing', 'MongoDB Mongoose']
    },
    {
      title: 'E-Commerce Order Processing & Payment Gateway API',
      description: 'Develop a scalable backend service managing product inventory, shopping carts, order creation transactions, and mock payment gateway webhooks.',
      whyBuildIt: 'Provides practical experience with database transactions, relational schemas, rate limiting, and webhooks.',
      estimatedTime: '2-3 weeks',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Prisma / Sequelize', 'Redis'],
      skillsLearned: ['Relational Database Transactions', 'SQL Joins & Indexes', 'Rate Limiting', 'Webhook Security'],
      features: ['Product inventory management', 'Shopping cart API endpoints', 'Order checkout transaction', 'Stripe mock payment webhook handler'],
      prerequisites: ['Node.js Express', 'SQL / PostgreSQL']
    },
    {
      title: 'Multi-Tenant Real-Time Messaging & Microservices Engine',
      description: 'Build a high-performance backend ecosystem using distributed microservices, Redis pub/sub messaging queue, WebSockets real-time communication, and Docker containerization.',
      whyBuildIt: 'A standout portfolio project demonstrating microservices separation, distributed caching, WebSocket concurrency, and containerized deployment.',
      estimatedTime: '4-6 weeks',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Redis', 'WebSockets', 'Docker'],
      skillsLearned: ['Microservices Architecture', 'Redis Pub/Sub Message Queues', 'WebSocket Server Management', 'Docker Orchestration'],
      features: ['Real-time channel messaging', 'Distributed Redis event pub/sub', 'User presence status tracking', 'Docker Compose deployment'],
      prerequisites: ['Express REST API', 'MongoDB & Redis basics']
    }
  ),

  // 3. Full Stack Developer Projects
  ...createRoadmapProjects(
    'fullstack-developer',
    {
      title: 'Personal Knowledge Notes Manager',
      description: 'Build a full-stack note-taking app allowing users to create, tag, search, edit, and categorize rich markdown notes.',
      whyBuildIt: 'Establishes full-stack integration connecting a frontend interface with Express API routes and MongoDB database.',
      estimatedTime: '3-5 days',
      technologies: ['HTML/CSS', 'Vanilla JS', 'Node.js', 'Express', 'MongoDB'],
      skillsLearned: ['Full Stack Integration', 'CRUD Operations', 'API Fetch Request Handler'],
      features: ['Create, Edit, Delete Notes', 'Search notes by keyword', 'Category tags'],
      prerequisites: ['Basic HTML/JS', 'Express & MongoDB basics']
    },
    {
      title: 'Student Marks & GPA Calculator App',
      description: 'Develop a full-stack academic performance tracker where students input semester subject grades to calculate semester CGPA and credit point breakdowns.',
      whyBuildIt: 'Teaches numerical calculations, data persistence, form handling, and full-stack API validation.',
      estimatedTime: '3-5 days',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      skillsLearned: ['State Calculations', 'REST API Routes', 'Form Handling'],
      features: ['Add course subject grades', 'Automatic GPA & CGPA calculation', 'Save semester transcript'],
      prerequisites: ['React basics', 'Node.js basics']
    },
    {
      title: 'Full-Stack Job & Internship Application Portal',
      description: 'Construct a multi-role job board application where students apply for internships, track application status, and recruiters manage job listings.',
      whyBuildIt: 'Combines user authentication, role-based access control, file upload handling, and relational dashboard interfaces.',
      estimatedTime: '2-3 weeks',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      skillsLearned: ['Role-Based Access Control', 'Full Stack State Sync', 'Dashboard Analytics', 'File Uploads'],
      features: ['Student & Recruiter login roles', 'Post & Search job listings', 'One-click application submitting', 'Recruiter candidate status management'],
      prerequisites: ['React Hooks', 'Express REST API & Auth']
    },
    {
      title: 'Personal Finance & Expense Analytics Dashboard',
      description: 'Build a full-stack financial management platform to log monthly expenses, categorize budgets, generate visual income charts, and export reports.',
      whyBuildIt: 'Teaches data aggregation queries, interactive charts integration, date filtering, and secure user data isolation.',
      estimatedTime: '2-3 weeks',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
      skillsLearned: ['Database Aggregations', 'Chart Visualizations', 'Date Filter Queries', 'Financial Analytics'],
      features: ['Income vs Expense logging', 'Category pie chart breakdown', 'Monthly budget alerts', 'Export expense report to CSV'],
      prerequisites: ['Full Stack basics', 'React state']
    },
    {
      title: 'End-to-End Enterprise Resource & Inventory Management Platform',
      description: 'Create an enterprise-grade full-stack platform featuring inventory tracking, supplier management, role-based workflow approvals, and live analytics dashboards.',
      whyBuildIt: 'The ultimate full-stack portfolio showcase demonstrating enterprise application architecture, complex DB relationships, and production deployment.',
      estimatedTime: '5-8 weeks',
      technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Docker'],
      skillsLearned: ['Enterprise Architecture', 'Relational Schemas & Prisma', 'TypeScript Full Stack', 'Docker Cloud Deployment'],
      features: ['Inventory stock alerts', 'Supplier order workflows', 'Role permissions (Admin, Manager, Staff)', 'Audit logs & analytics', 'Dockerized deployment'],
      prerequisites: ['Full Stack React & Node', 'TypeScript', 'SQL basics']
    }
  )
];

module.exports = {
  roadmaps,
  projects
};
