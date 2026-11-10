/**
 * Extended 5-Project Recommendation Datasets for all specialized Pathfolio Career Roadmaps
 * Contains exactly 5 projects (2 Easy, 2 Medium, 1 Hard) for the remaining 14 roadmaps
 */

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

const createProjects = (roadmapSlug, p1, p2, p3, p4, p5) => [
  { ...p1, slug: `${roadmapSlug}-easy-1`, roadmapSlug, difficulty: 'easy', recommendedOrder: 1, resumeValue: 'High', portfolioValue: 'High', developmentSteps: defaultSteps },
  { ...p2, slug: `${roadmapSlug}-easy-2`, roadmapSlug, difficulty: 'easy', recommendedOrder: 2, resumeValue: 'High', portfolioValue: 'High', developmentSteps: defaultSteps },
  { ...p3, slug: `${roadmapSlug}-med-1`,  roadmapSlug, difficulty: 'medium', recommendedOrder: 3, resumeValue: 'High', portfolioValue: 'High', developmentSteps: defaultSteps },
  { ...p4, slug: `${roadmapSlug}-med-2`,  roadmapSlug, difficulty: 'medium', recommendedOrder: 4, resumeValue: 'High', portfolioValue: 'High', developmentSteps: defaultSteps },
  { ...p5, slug: `${roadmapSlug}-hard-1`, roadmapSlug, difficulty: 'hard', recommendedOrder: 5, resumeValue: 'High', portfolioValue: 'High', developmentSteps: defaultSteps }
];

const additionalProjects = [
  // 4. Software Engineer
  ...createProjects(
    'software-engineer',
    {
      title: 'Data Structures & Algorithms Visualizer CLI',
      description: 'Build an interactive terminal CLI tool that visualizes sorting (QuickSort, MergeSort) and pathfinding algorithms step-by-step with ASCII animations.',
      whyBuildIt: 'Solidifies core computer science algorithmic foundations, asymptotic time-space complexity, and terminal rendering.',
      estimatedTime: '3-5 days',
      technologies: ['Python / C++', 'Algorithms', 'CLI Architecture'],
      skillsLearned: ['Algorithm Analysis', 'Recursion & Sorting', 'CLI Formatting'],
      features: ['Interactive algorithm selection', 'Step-by-step execution mode', 'Array comparison and swap counter'],
      prerequisites: ['Basic programming', 'Data structures fundamentals']
    },
    {
      title: 'Multi-Threaded File Downloader & Hash Verifier',
      description: 'Develop a concurrent file download manager that splits files into byte chunks, downloads them in parallel threads, and computes SHA-256 checksums.',
      whyBuildIt: 'Teaches concurrency, thread pooling, HTTP range headers, mutex locks, and cryptographic hashing.',
      estimatedTime: '4-7 days',
      technologies: ['Java / Go / C++', 'Multi-Threading', 'HTTP Range'],
      skillsLearned: ['Concurrency & Thread Safety', 'Network I/O Streams', 'Data Integrity Hashing'],
      features: ['Multi-part chunk downloading', 'Download progress bars per thread', 'SHA-256 automated integrity check'],
      prerequisites: ['Basic OOP', 'Networking basics']
    },
    {
      title: 'Distributed Key-Value Store with In-Memory Caching & WAL',
      description: 'Build a high-performance in-memory key-value database featuring Write-Ahead Logging (WAL) for crash recovery and an LRU eviction policy.',
      whyBuildIt: 'A staple software engineering resume project demonstrating systems programming, memory management, and file persistence.',
      estimatedTime: '2-3 weeks',
      technologies: ['Go / C++ / Rust', 'Memory Management', 'File I/O'],
      skillsLearned: ['Storage Engine Architecture', 'Write-Ahead Logging', 'Concurrency Control'],
      features: ['SET, GET, DELETE operations with TTL', 'Disk persistence with WAL replay', 'LRU cache eviction policy'],
      prerequisites: ['Data structures', 'Concurrency basics']
    },
    {
      title: 'High-Throughput Microservice with gRPC & Protocol Buffers',
      description: 'Create an ultra-low latency backend microservice using gRPC and Protobuf for high-speed inter-service remote procedure calls.',
      whyBuildIt: 'Master modern distributed systems communication paradigms beyond traditional JSON REST APIs.',
      estimatedTime: '2-3 weeks',
      technologies: ['Go / Java', 'gRPC', 'Protocol Buffers', 'Docker'],
      skillsLearned: ['gRPC Streaming', 'Binary Serialization', 'API Contract Design'],
      features: ['Unary and bi-directional RPC streams', 'Strict type schemas with Protobuf', 'Docker containerized deployment'],
      prerequisites: ['Backend networking basics']
    },
    {
      title: 'Custom Bytecode Virtual Machine & Simple Compiler Engine',
      description: 'Design and implement a stack-based virtual machine with an instruction set, tokenizer, recursive descent parser, and bytecode compiler.',
      whyBuildIt: 'The ultimate computer engineering portfolio showcase proving deep mastery of execution engines, parsing, and compiler theory.',
      estimatedTime: '5-8 weeks',
      technologies: ['C++ / Rust', 'Compilers', 'Bytecode VM', 'AST Parsing'],
      skillsLearned: ['Lexical Analysis & ASTs', 'Stack Machine Architecture', 'Garbage Collection Fundamentals'],
      features: ['Custom arithmetic & control-flow syntax', 'Bytecode disassembler viewer', 'REPL interactive environment'],
      prerequisites: ['Advanced C++ / Rust', 'Data structures']
    }
  ),

  // 5. DevOps Engineer
  ...createProjects(
    'devops-engineer',
    {
      title: 'Automated Multi-Stage Dockerfile Builder & Security Linter',
      description: 'Create optimized, minimal-footprint container images using multi-stage Docker builds and integrate Hadolint and Trivy for container vulnerability scanning.',
      whyBuildIt: 'Learn container image optimization, layer caching, non-root user security, and vulnerability remediation.',
      estimatedTime: '2-4 days',
      technologies: ['Docker', 'Trivy', 'Bash / Shell', 'Linux'],
      skillsLearned: ['Container Optimization', 'Security Scanning', 'Shell Scripting'],
      features: ['Multi-stage build pipeline', 'Automated image size reduction (<50MB)', 'Vulnerability scan report generation'],
      prerequisites: ['Linux command line', 'Basic Docker']
    },
    {
      title: 'Nginx Reverse Proxy with Dynamic SSL & Load Balancing',
      description: 'Configure an enterprise-grade Nginx reverse proxy providing round-robin load balancing, rate limiting, and Let’s Encrypt Certbot SSL renewal.',
      whyBuildIt: 'Essential networking and web traffic routing skills required in every production cloud deployment.',
      estimatedTime: '3-5 days',
      technologies: ['Nginx', 'SSL / TLS', 'Certbot', 'Linux Networking'],
      skillsLearned: ['Reverse Proxying', 'SSL Termination', 'Rate Limiting & Caching'],
      features: ['Upstream health-checked load balancing', 'Automated TLS certificate renewal', 'DDoS rate-limiting rules'],
      prerequisites: ['HTTP basics', 'Linux server admin']
    },
    {
      title: 'Production CI/CD Pipeline with GitHub Actions & Automated Testing',
      description: 'Build an end-to-end continuous integration and deployment workflow that executes unit tests, linter checks, builds Docker images, and deploys to cloud staging.',
      whyBuildIt: 'Industry standard requirement for modern DevOps roles; showcases automation discipline and deployment confidence.',
      estimatedTime: '2-3 weeks',
      technologies: ['GitHub Actions', 'Docker Hub', 'YAML', 'Bash'],
      skillsLearned: ['Pipeline Automation', 'Artifact Publishing', 'Staging Deployments'],
      features: ['Automated PR pull request gate checks', 'Docker image tag versioning', 'Slack/Discord build notification webhooks'],
      prerequisites: ['Git & GitHub', 'Docker']
    },
    {
      title: 'Kubernetes GitOps Cluster Deployment with Helm & ArgoCD',
      description: 'Deploy a multi-tier microservice application to a Kubernetes cluster using declarative Helm charts and GitOps synchronization via ArgoCD.',
      whyBuildIt: 'Master cloud-native container orchestration, self-healing deployments, and Git-driven continuous delivery.',
      estimatedTime: '3-4 weeks',
      technologies: ['Kubernetes', 'Helm', 'ArgoCD', 'K3s / Minikube'],
      skillsLearned: ['Kubernetes Manifests & Services', 'Helm Templating', 'GitOps Synchronization'],
      features: ['Automated Git-to-cluster sync', 'Zero-downtime rolling updates', 'ConfigMap & Secret management'],
      prerequisites: ['Docker', 'Kubernetes architecture']
    },
    {
      title: 'Infrastructure as Code (Terraform) Multi-Tier Cloud with Observability',
      description: 'Provision a complete cloud infrastructure (VPC, subnets, EC2/EKS, RDS) using Terraform and set up full Prometheus & Grafana cluster monitoring.',
      whyBuildIt: 'The definitive DevOps portfolio project demonstrating automated cloud architecture, state locking, and production observability.',
      estimatedTime: '5-8 weeks',
      technologies: ['Terraform', 'AWS / Cloud', 'Prometheus', 'Grafana'],
      skillsLearned: ['Infrastructure as Code', 'Cloud Network Architecture', 'Telemetry & Alerting'],
      features: ['Modular Terraform cloud provisioning', 'Remote S3 state backend with DynamoDB locking', 'Live Grafana KPI dashboards & alert rules'],
      prerequisites: ['Kubernetes', 'Cloud fundamentals']
    }
  ),

  // 6. Data Analyst
  ...createProjects(
    'data-analyst',
    {
      title: 'Sales Performance & Customer Demographics SQL Analysis',
      description: 'Analyze an enterprise retail database using complex SQL queries (Window functions, Common Table Expressions, Subqueries) to identify revenue trends.',
      whyBuildIt: 'Demonstrates SQL fluency, relational joins, aggregations, and business metrics extraction.',
      estimatedTime: '3-5 days',
      technologies: ['SQL', 'PostgreSQL', 'Metabase'],
      skillsLearned: ['Window Functions', 'CTEs & Subqueries', 'Data Aggregations'],
      features: ['Top revenue product rankings', 'Month-over-month sales growth calculation', 'Customer lifetime value analysis'],
      prerequisites: ['Basic SQL queries']
    },
    {
      title: 'Automated CSV/Excel Data Cleaning & Normalization Pipeline',
      description: 'Develop a Python script using Pandas to clean messy real-world survey datasets, resolve missing values, handle datetime conversions, and output validated data.',
      whyBuildIt: 'Shows practical data wrangling competency, reducing manual spreadsheet cleaning time to automated seconds.',
      estimatedTime: '3-5 days',
      technologies: ['Python', 'Pandas', 'NumPy', 'Jupyter'],
      skillsLearned: ['Data Wrangling', 'Missing Value Imputation', 'Outlier Detection'],
      features: ['Automated missing data handling', 'Duplicate detection & removal', 'Export clean CSV and summary statistics'],
      prerequisites: ['Python basics', 'Excel familiarity']
    },
    {
      title: 'Interactive Business Intelligence Dashboard with Streamlit',
      description: 'Build a dynamic web-based analytics dashboard where stakeholders filter sales by region, inspect marketing funnels, and export custom charts.',
      whyBuildIt: 'Bridges data analysis with executive communication through interactive web visualization.',
      estimatedTime: '2-3 weeks',
      technologies: ['Python', 'Streamlit', 'Plotly', 'Pandas'],
      skillsLearned: ['Interactive Visualizations', 'Dashboard Storytelling', 'KPI Metrics'],
      features: ['Interactive date range & category filters', 'Dynamic heatmaps & line charts', 'Export filtered records to PDF/Excel'],
      prerequisites: ['Pandas', 'Python basics']
    },
    {
      title: 'E-Commerce Customer Churn & Cohort Retention Analysis',
      description: 'Perform behavioral cohort analysis on customer transaction history to track retention rates, identify churn indicators, and calculate RFM scores.',
      whyBuildIt: 'High-value commercial analytical project demonstrating direct impact on business retention and marketing strategy.',
      estimatedTime: '2-3 weeks',
      technologies: ['Python', 'Pandas', 'Seaborn', 'Matplotlib'],
      skillsLearned: ['Cohort Retention Analysis', 'RFM (Recency, Frequency, Monetary) Scoring', 'Statistical Visualization'],
      features: ['Monthly retention heatmap matrix', 'Customer segmentation scoring', 'Churn probability categorization'],
      prerequisites: ['Pandas dataframes', 'Basic statistics']
    },
    {
      title: 'End-to-End Enterprise Analytics Pipeline & Executive KPI System',
      description: 'Construct a complete data analytics warehouse: ingest real-time data from an API, transform with dbt/SQL, load into PostgreSQL, and render executive dashboards.',
      whyBuildIt: 'Comprehensive portfolio centerpiece proving full data analytics lifecycle skills from raw data to executive business intelligence.',
      estimatedTime: '4-6 weeks',
      technologies: ['PostgreSQL', 'Python', 'dbt', 'PowerBI / Tableau / Superset'],
      skillsLearned: ['Data Warehousing Star Schema', 'dbt Data Modeling', 'Executive KPI Design'],
      features: ['Automated daily data ingestion ETL', 'Star schema data warehouse models', 'Real-time executive performance dashboard'],
      prerequisites: ['SQL', 'Python Pandas']
    }
  ),

  // 7. Data Scientist
  ...createProjects(
    'data-scientist',
    {
      title: 'Exploratory Data Analysis & Real Estate Price Regression',
      description: 'Conduct thorough EDA, feature engineering, and train a regularized linear/ridge regression model to accurately predict residential property valuations.',
      whyBuildIt: 'Establishes fundamental machine learning workflow: data distribution analysis, multicollinearity checking, and regression metrics.',
      estimatedTime: '3-5 days',
      technologies: ['Python', 'Scikit-Learn', 'Pandas', 'Matplotlib'],
      skillsLearned: ['Feature Engineering', 'Linear Regression Modeling', 'RMSE & R2 Evaluation'],
      features: ['Feature correlation matrix', 'One-hot encoding of categorical variables', 'Cross-validated model prediction'],
      prerequisites: ['Python basics', 'Basic linear algebra & stats']
    },
    {
      title: 'Customer Sentiment Analysis Web App with NLP & TF-IDF',
      description: 'Build a natural language processing model that classifies customer product reviews into positive, neutral, or negative sentiment categories.',
      whyBuildIt: 'Hands-on introduction to text preprocessing, tokenization, TF-IDF vectorization, and text classification.',
      estimatedTime: '4-7 days',
      technologies: ['Python', 'NLTK / SpaCy', 'Scikit-Learn', 'Flask / Gradio'],
      skillsLearned: ['Text Preprocessing', 'TF-IDF Vectorization', 'Naive Bayes / Logistic Regression'],
      features: ['Real-time text input classification', 'Word cloud visualization of common terms', 'Confidence score indicator'],
      prerequisites: ['Python', 'Basic machine learning']
    },
    {
      title: 'Credit Risk & Loan Default Prediction with XGBoost',
      description: 'Develop an end-to-end binary classification model using XGBoost and LightGBM to assess credit applicant default risk with class-imbalance handling.',
      whyBuildIt: 'Industry-standard fintech machine learning project showcasing SMOTE resampling, ROC-AUC optimization, and SHAP explainability.',
      estimatedTime: '2-3 weeks',
      technologies: ['Python', 'XGBoost', 'Imbalanced-Learn (SMOTE)', 'SHAP'],
      skillsLearned: ['Gradient Boosting', 'Handling Imbalanced Datasets', 'Model Explainability (SHAP)'],
      features: ['SMOTE oversampling for rare default cases', 'Feature importance & SHAP summary plots', 'Precision-Recall tradeoff optimization'],
      prerequisites: ['Scikit-Learn', 'Data analysis']
    },
    {
      title: 'Computer Vision Medical/Object Classifier with PyTorch',
      description: 'Train a convolutional neural network (using transfer learning with ResNet) to classify medical imaging scans or object images with high accuracy.',
      whyBuildIt: 'Teaches deep learning foundations: CNN architectures, transfer learning, data augmentation, and GPU model training.',
      estimatedTime: '3-4 weeks',
      technologies: ['PyTorch', 'Torchvision', 'OpenCV', 'FastAPI'],
      skillsLearned: ['Convolutional Neural Networks', 'Transfer Learning (ResNet)', 'Image Augmentation Pipeline'],
      features: ['Data augmentation pipeline (flip, rotate, color jitter)', 'Training vs validation loss curves', 'FastAPI REST endpoint for image classification'],
      prerequisites: ['Python', 'Deep learning basics']
    },
    {
      title: 'Production End-to-End MLOps Platform with MLflow & Docker',
      description: 'Build a production machine learning deployment platform: experiment tracking with MLflow, automated hyperparameter tuning, model registry, and containerized API.',
      whyBuildIt: 'The ultimate data science portfolio project proving you can transition ML models from research notebooks to scalable production systems.',
      estimatedTime: '5-8 weeks',
      technologies: ['Python', 'PyTorch / XGBoost', 'MLflow', 'FastAPI', 'Docker'],
      skillsLearned: ['MLOps Lifecycle', 'Model Versioning & Tracking', 'Production API Serving'],
      features: ['Automated experiment tracking & metric logging', 'Model staging/production registry', 'Containerized inference API with Docker'],
      prerequisites: ['Machine learning', 'FastAPI / Docker basics']
    }
  ),

  // 8. Cybersecurity Analyst
  ...createProjects(
    'cybersecurity-analyst',
    {
      title: 'Python Port Scanner & Network Banner Grabber CLI',
      description: 'Develop a multi-threaded network reconnaissance tool that scans target IP ranges, identifies open TCP ports, and grabs service banner strings.',
      whyBuildIt: 'Foundational understanding of TCP handshakes, socket programming, network protocols, and ethical reconnaissance.',
      estimatedTime: '2-4 days',
      technologies: ['Python', 'Sockets', 'Threading', 'Network Protocols'],
      skillsLearned: ['Socket Programming', 'TCP/IP Handshake Mechanics', 'Port Scanning'],
      features: ['Fast multi-threaded port scanning', 'Service banner identification (HTTP, SSH, FTP)', 'Export scan results to JSON'],
      prerequisites: ['Python basics', 'Networking fundamentals']
    },
    {
      title: 'Server Log Intrusion & Brute-Force Attempt Detector',
      description: 'Build a log monitoring tool that parses Linux auth.log or web server logs, identifies SSH brute-force patterns, and generates automated IP blocklists.',
      whyBuildIt: 'Demonstrates blue-team incident detection, pattern recognition, regex parsing, and automated response scripting.',
      estimatedTime: '3-5 days',
      technologies: ['Python', 'Regex', 'Linux Logs', 'Fail2ban Concept'],
      skillsLearned: ['Log Parsing & Forensics', 'Brute-Force Pattern Recognition', 'Automated Defense Scripts'],
      features: ['Detect repeated failed password attempts', 'Geographic IP lookup for suspicious addresses', 'Generate iptables firewall rule suggestions'],
      prerequisites: ['Linux basics', 'Python']
    },
    {
      title: 'Automated OWASP Top 10 Web Vulnerability Scanner',
      description: 'Create a security scanning tool that tests web applications for common OWASP Top 10 vulnerabilities including SQL Injection, XSS, and missing security headers.',
      whyBuildIt: 'Directly applicable application security skill; essential for penetration testing and AppSec engineering roles.',
      estimatedTime: '2-3 weeks',
      technologies: ['Python', 'Requests', 'BeautifulSoup', 'OWASP Standards'],
      skillsLearned: ['Vulnerability Identification', 'HTTP Header Security', 'SQLi & XSS Detection Payloads'],
      features: ['Automated form injection payload testing', 'Missing security header audit (CSP, HSTS, X-Frame)', 'Formatted HTML vulnerability remediation report'],
      prerequisites: ['Web basics (HTML, HTTP)', 'Python']
    },
    {
      title: 'Security Information & Event Management (SIEM) Rule Engine',
      description: 'Build a lightweight SIEM alert engine that collects syslog streams, correlates multi-host events, and triggers alerts based on suspicious behavioral rules.',
      whyBuildIt: 'Master SOC analyst workflows: log normalization, event correlation, rule logic, and threat triaging.',
      estimatedTime: '3-4 weeks',
      technologies: ['Python / Go', 'Elasticsearch / SQLite', 'Syslog', 'Sigma Rules'],
      skillsLearned: ['SIEM Architecture', 'Event Correlation Logic', 'Incident Triaging'],
      features: ['Real-time syslog ingestion', 'Rule matching for privilege escalation & lateral movement', 'Alert severity ranking dashboard'],
      prerequisites: ['Cybersecurity fundamentals', 'Networking']
    },
    {
      title: 'Enterprise Honeypot & Threat Intelligence Dashboard',
      description: 'Deploy a multi-service decoy honeypot (emulating SSH, HTTP, and Telnet) to capture live attacker payloads, log attacker IPs, and visualize threats.',
      whyBuildIt: 'A standout portfolio project showcasing proactive threat intelligence collection, attacker profiling, and forensic analysis.',
      estimatedTime: '5-8 weeks',
      technologies: ['Python', 'Docker', 'FastAPI', 'Chart.js / Leaflet', 'Threat Intel APIs'],
      skillsLearned: ['Deception Technology (Honeypots)', 'Threat Intelligence Gathering', 'Forensic Artifact Analysis'],
      features: ['Decoy SSH & HTTP services with keystroke logging', 'Global attacker origin map on Leaflet', 'Automated Virustotal & AbuseIPDB reputation lookups'],
      prerequisites: ['Linux server admin', 'Cybersecurity fundamentals']
    }
  ),

  // 9. Embedded Systems Engineer
  ...createProjects(
    'embedded-systems-engineer',
    {
      title: 'GPIO Sensor Reader & Character LCD Display Driver in Embedded C',
      description: 'Write bare-metal Embedded C drivers for an STM32 or AVR microcontroller to read temperature sensors and display formatted readings on a 16x2 LCD.',
      whyBuildIt: 'Master bare-metal register manipulation, GPIO direction registers, delays, and 4-bit LCD protocol communication without high-level libraries.',
      estimatedTime: '3-5 days',
      technologies: ['Embedded C', 'STM32 / AVR', 'GPIO Registers', 'Datasheets'],
      skillsLearned: ['Register-Level Programming', 'Bitwise Manipulation', 'Hardware Protocol Timing'],
      features: ['Custom 4-bit LCD driver', 'ADC analog sensor reading', 'Display refresh without screen flickering'],
      prerequisites: ['C programming', 'Basic electronics']
    },
    {
      title: 'Digital Stopwatch with Hardware Timers & External Interrupts',
      description: 'Develop a high-precision digital stopwatch using hardware timer peripherals, prescalers, and external push-button hardware interrupts.',
      whyBuildIt: 'Teaches hardware timer calculations, interrupt service routines (ISR), debouncing, and low-latency response architecture.',
      estimatedTime: '4-7 days',
      technologies: ['Embedded C', 'Hardware Timers', 'Interrupt Service Routines (ISRs)'],
      skillsLearned: ['Timer Peripheral Configuration', 'Hardware Interrupt Handling', 'Button Debouncing Techniques'],
      features: ['Sub-millisecond hardware timer precision', 'Start/Stop/Lap button interrupts', '7-segment or OLED multiplexed display'],
      prerequisites: ['Embedded C basics']
    },
    {
      title: 'I2C/SPI Multi-Sensor Weather Station with EEPROM Data Logging',
      description: 'Build an embedded data logger that communicates with BMP280 (I2C) and external EEPROM (SPI) to record environmental trends at regular intervals.',
      whyBuildIt: 'Core embedded requirement: mastering synchronous serial protocols (I2C & SPI), bus arbitration, and non-volatile memory.',
      estimatedTime: '2-3 weeks',
      technologies: ['C / C++', 'I2C Protocol', 'SPI Protocol', 'EEPROM Memory'],
      skillsLearned: ['I2C Bus Communication', 'SPI Master/Slave Transfer', 'Circular Buffer Memory Management'],
      features: ['Accurate sensor reading over I2C', 'Periodic non-volatile EEPROM storage', 'UART serial dump mode to PC terminal'],
      prerequisites: ['Embedded C', 'Microcontroller timers']
    },
    {
      title: 'FreeRTOS Multi-Tasking Sensor Hub with Priority Scheduling',
      description: 'Design a real-time embedded system using FreeRTOS to manage multiple concurrent tasks (Sensor sampling, LCD display, Alarm monitoring) with queue passing.',
      whyBuildIt: 'Crucial stepping stone from bare-metal to commercial embedded software engineering: multitasking, queues, and mutexes.',
      estimatedTime: '3-4 weeks',
      technologies: ['FreeRTOS', 'Embedded C', 'STM32 / ESP32', 'Semaphores & Queues'],
      skillsLearned: ['Real-Time Operating Systems (RTOS)', 'Task Prioritization & Scheduling', 'Inter-Task Queue Communication'],
      features: ['3 concurrent preemptive tasks', 'FreeRTOS message queues for sensor data', 'Mutex locking for shared serial bus'],
      prerequisites: ['C programming', 'Microcontroller fundamentals']
    },
    {
      title: 'CAN Bus Automotive Telemetry Controller & Firmware Bootloader',
      description: 'Develop an automotive-grade embedded node that transmits vehicle sensor telemetry over a CAN bus and features a custom UART firmware bootloader.',
      whyBuildIt: 'The pinnacle embedded systems portfolio project proving automotive protocol mastery (CAN 2.0B) and custom bootloader memory flashing.',
      estimatedTime: '5-8 weeks',
      technologies: ['Embedded C', 'CAN Bus Protocol', 'Flash Memory Management', 'Bootloader Design'],
      skillsLearned: ['Automotive CAN Protocol', 'Custom In-System Bootloaders', 'Microcontroller Flash Reprogramming'],
      features: ['Standard & Extended CAN frame transmission', 'CRC error handling & bus off recovery', 'Custom PC flash updater utility over UART'],
      prerequisites: ['Embedded C', 'Microcontroller peripherals']
    }
  ),

  // 10. VLSI Design Engineer
  ...createProjects(
    'vlsi-design-engineer',
    {
      title: '4-Bit Arithmetic Logic Unit (ALU) in Verilog with Testbench',
      description: 'Design, synthesize, and verify a 4-bit ALU supporting addition, subtraction, AND, OR, XOR, and bit-shifting operations with comprehensive testbenches.',
      whyBuildIt: 'Solidifies HDL coding standards, combinational logic design, simulation waveforms, and edge-case verification.',
      estimatedTime: '3-5 days',
      technologies: ['Verilog HDL', 'ModelSim / Vivado', 'Digital Logic'],
      skillsLearned: ['HDL RTL Design', 'Testbench Automation', 'Simulation Waveform Analysis'],
      features: ['8 arithmetic & logical operations', 'Flag outputs (Zero, Carry, Overflow, Sign)', 'Self-checking testbench script'],
      prerequisites: ['Digital electronics basics']
    },
    {
      title: 'Synchronous FIFO Buffer with Full/Empty Logic in SystemVerilog',
      description: 'Design a parameterized synchronous First-In-First-Out (FIFO) queue with pointer tracking, write/read enable controls, and full/empty flag status.',
      whyBuildIt: 'Essential digital building block required in almost every VLSI and digital ASIC engineering interview.',
      estimatedTime: '4-7 days',
      technologies: ['SystemVerilog', 'Digital Design', 'Waveform Simulation'],
      skillsLearned: ['Sequential Logic Circuits', 'Pointer Synchronization', 'Parameterized Hardware Modules'],
      features: ['Configurable data width and depth', 'Accurate full, empty, and almost-full flags', 'Corner-case overflow/underflow protection'],
      prerequisites: ['Verilog HDL basics']
    },
    {
      title: 'Single-Cycle 32-Bit RISC-V Processor Core in Verilog',
      description: 'Implement an RTL microarchitecture for the RV32I base integer instruction set, including instruction decode, register file, ALU, and memory interfaces.',
      whyBuildIt: 'Comprehensive computer architecture demonstration proving deep understanding of CPU instruction execution lifecycles.',
      estimatedTime: '3-4 weeks',
      technologies: ['Verilog', 'RISC-V ISA', 'Vivado / Icarus Verilog', 'GTKWave'],
      skillsLearned: ['Processor Architecture', 'Instruction Set Architecture (ISA)', 'Control Unit State Machines'],
      features: ['Support for R, I, S, and B type instructions', '32x32 general purpose register file', 'Execute assembly programs compiled with GCC RISC-V toolchain'],
      prerequisites: ['Verilog HDL', 'Digital logic']
    },
    {
      title: 'DDR SDRAM Memory Controller with State Machine & Refresh Timing',
      description: 'Design an RTL memory controller interfacing high-speed synchronous dynamic RAM, handling initialization sequences, command encoding, and auto-refresh cycles.',
      whyBuildIt: 'Master complex FSM controllers, strict setup/hold timing constraints, and burst data transfers.',
      estimatedTime: '3-4 weeks',
      technologies: ['Verilog / SystemVerilog', 'FSM State Machines', 'Timing Constraints'],
      skillsLearned: ['High-Speed Memory Protocols', 'Complex Finite State Machines (FSM)', 'Setup & Hold Timing'],
      features: ['Row activation, precharge, and refresh commands', 'Burst read and write support', 'Configurable CAS latency'],
      prerequisites: ['Verilog', 'Sequential circuits']
    },
    {
      title: '5-Stage Pipelined RISC-V CPU Core with Hazard Unit & FPGA Demo',
      description: 'Construct a complete 5-stage pipelined CPU core (Fetch, Decode, Execute, Memory, Writeback) featuring forwarding, branch prediction, hazard detection, and FPGA synthesis.',
      whyBuildIt: 'The ultimate VLSI silicon engineering portfolio project demonstrating pipelining hazards, forwarding units, timing closure, and FPGA hardware demo.',
      estimatedTime: '6-8 weeks',
      technologies: ['SystemVerilog', 'RISC-V', 'Xilinx Vivado', 'FPGA (Basys3 / Zybo)'],
      skillsLearned: ['Pipeline Microarchitecture', 'Data Hazard Forwarding', 'FPGA Synthesis & Timing Closure'],
      features: ['5-stage pipelined datapath', 'Hardware forwarding unit eliminating data stalls', 'Branch prediction & flush logic', 'Synthesized and verified on FPGA hardware'],
      prerequisites: ['Single-cycle CPU design', 'Advanced Verilog']
    }
  ),

  // 11. IoT Engineer
  ...createProjects(
    'iot-engineer',
    {
      title: 'ESP32 Smart Thermostat with Wi-Fi & MQTT Telemetry',
      description: 'Develop an IoT sensor node that measures temperature and humidity, connects to local Wi-Fi, and publishes telemetry packets to an MQTT broker.',
      whyBuildIt: 'Fundamental IoT stack: embedded sensor reading, network Wi-Fi association, and lightweight publish-subscribe messaging.',
      estimatedTime: '3-5 days',
      technologies: ['ESP32', 'Arduino / C++', 'MQTT Protocol', 'Wi-Fi'],
      skillsLearned: ['MQTT Messaging Protocol', 'Wi-Fi Reconnection Logic', 'JSON Telemetry Payload Formatting'],
      features: ['Periodic temperature telemetry publishing', 'Automatic Wi-Fi reconnection handling', 'Over-the-air LED status indicator'],
      prerequisites: ['C++ basics', 'ESP32 board']
    },
    {
      title: 'Connected Plant Health Monitor with Soil Capacitance & OLED',
      description: 'Build an ultra-low-power plant monitor using soil moisture and ambient light sensors that sleeps between reads and wakes to broadcast alerts.',
      whyBuildIt: 'Teaches low-power deep sleep states, battery-operated IoT design, and analog capacitive sensing.',
      estimatedTime: '4-7 days',
      technologies: ['ESP32 / ESP8266', 'Deep Sleep Modes', 'I2C OLED Display'],
      skillsLearned: ['Microcontroller Deep Sleep Optimization', 'Capacitive Sensing', 'Battery Life Calculations'],
      features: ['ESP32 deep sleep consuming <20uA', 'OLED local health status screen', 'Push notification alerts when soil is dry'],
      prerequisites: ['Basic Arduino / C++']
    },
    {
      title: 'Smart Home Automation Gateway with Zigbee & Node-RED Dashboard',
      description: 'Create an edge IoT smart hub that interfaces with wireless smart switches and displays interactive room controls on an automated Node-RED dashboard.',
      whyBuildIt: 'Learn edge gateway architectures, protocol translation, and drag-and-drop automation rule engines.',
      estimatedTime: '2-3 weeks',
      technologies: ['Raspberry Pi', 'Node-RED', 'Zigbee / BLE', 'MQTT'],
      skillsLearned: ['Edge Gateway Architecture', 'Node-RED Automation Flows', 'Local Network Device Discovery'],
      features: ['Interactive browser control dashboard', 'Automated sunrise/sunset timer rules', 'Multi-protocol device bridge'],
      prerequisites: ['Linux basics', 'Networking']
    },
    {
      title: 'Industrial Vibration & Temperature Anomaly Detection Edge Gateway',
      description: 'Build an edge compute node that samples accelerometer vibrations on rotating machinery and runs local TinyML thresholding to detect early bearing failure.',
      whyBuildIt: 'High-demand industrial IoT (IIoT) skill: predictive maintenance, edge analytics, and real-time vibration spectral analysis.',
      estimatedTime: '3-4 weeks',
      technologies: ['ESP32 / Raspberry Pi', 'Accelerometers', 'TinyML', 'InfluxDB'],
      skillsLearned: ['Edge Computing & TinyML', 'Time-Series Sensor Databases', 'Predictive Maintenance Analytics'],
      features: ['High-frequency 3-axis vibration sampling', 'Edge anomaly detection algorithms', 'Real-time telemetry stream to InfluxDB time-series database'],
      prerequisites: ['C++ / Python', 'IoT basics']
    },
    {
      title: 'Cloud-Connected IoT Fleet Asset Tracking System with GPS & AWS IoT Core',
      description: 'Build an end-to-end commercial IoT tracking device featuring GPS positioning, cellular/Wi-Fi uplink, mutual TLS security, and AWS IoT Core cloud rules.',
      whyBuildIt: 'The definitive enterprise IoT portfolio project demonstrating secure provisioning (X.509 certificates), cloud telemetry pipelines, and map visualizations.',
      estimatedTime: '5-8 weeks',
      technologies: ['ESP32 / STM32', 'GPS Module', 'AWS IoT Core', 'X.509 Certificates', 'Web Dashboard'],
      skillsLearned: ['Mutual TLS (mTLS) IoT Security', 'AWS Cloud Rule Ingestion', 'Geofencing & Map Visualizations'],
      features: ['Real-time GPS coordinates and speed logging', 'Hardware security with X.509 certificate authentication', 'Live Google Maps fleet tracking web dashboard'],
      prerequisites: ['Embedded C++', 'Cloud basics']
    }
  ),

  // 12. Electrical Design Engineer
  ...createProjects(
    'electrical-design-engineer',
    {
      title: 'Dual-Rail Linear Regulated Power Supply Schematic & PCB Layout',
      description: 'Design a +/-12V and +5V low-noise linear power supply with transformer rectification, LM317/LM337 regulators, thermal heatsinking, and KiCad PCB layout.',
      whyBuildIt: 'Fundamental electrical engineering competency: schematic capture, component selection, grounding planes, and PCB manufacturing outputs.',
      estimatedTime: '3-5 days',
      technologies: ['KiCad / Altium', 'Power Electronics', 'PCB Layout'],
      skillsLearned: ['Schematic Capture', 'PCB Trace Width Calculation', 'Gerber File Generation'],
      features: ['Complete schematic with filter capacitors', 'Dual-layer PCB layout with ground planes', 'Bill of Materials (BOM) export with manufacturer part numbers'],
      prerequisites: ['Circuit theory', 'KiCad basics']
    },
    {
      title: '555 Timer PWM Motor Speed Controller Circuit Simulation',
      description: 'Simulate, breadboard, and measure a variable-duty-cycle PWM DC motor speed controller using an analog 555 timer and MOSFET switching stage in SPICE.',
      whyBuildIt: 'Teaches analog timing circuits, MOSFET gate drive dynamics, flyback diode protection, and SPICE circuit simulation.',
      estimatedTime: '4-7 days',
      technologies: ['LTspice', 'Analog Circuits', 'Power MOSFETs'],
      skillsLearned: ['SPICE Simulation Analysis', 'MOSFET Switching Transients', 'Inductive Kickback Protection'],
      features: ['0-100% duty cycle analog PWM generation', 'Flyback diode protection against inductive spikes', 'Simulation waveform verification in LTspice'],
      prerequisites: ['Basic electronics']
    },
    {
      title: '100W Synchronous Buck DC-DC Converter Design in KiCad',
      description: 'Design a high-efficiency 100W step-down switching regulator (24V to 5V @ 20A) featuring synchronous rectification, inductor design, and thermal analysis.',
      whyBuildIt: 'Switch-mode power supplies (SMPS) are foundational in consumer hardware, automotive, and server electrical design.',
      estimatedTime: '2-3 weeks',
      technologies: ['KiCad', 'SMPS Design', 'Inductor Sizing', 'Thermal Calculations'],
      skillsLearned: ['Switch-Mode Power Supply Design', 'High-Current PCB Layout Practices', 'EMI/EMC Reduction Techniques'],
      features: ['Calculated inductor saturation and capacitor ripple values', 'Compact 4-layer PCB layout with minimized switching loops', 'Overcurrent and overtemperature protection'],
      prerequisites: ['Circuit analysis', 'PCB design basics']
    },
    {
      title: 'Microcontroller-Based Smart Energy Meter with CT Sensor',
      description: 'Design an AC electrical power monitor that samples voltage and current transformers, calculates Real/Apparent power and Power Factor, and sends serial data.',
      whyBuildIt: 'Teaches AC high-voltage safety isolation, analog signal conditioning, op-amp biasing, and RMS calculations.',
      estimatedTime: '3-4 weeks',
      technologies: ['KiCad', 'Analog Signal Conditioning', 'Current Transformers (CT)', 'Microcontrollers'],
      skillsLearned: ['AC High-Voltage Galvanic Isolation', 'Op-Amp Signal Conditioning', 'Active & Reactive Power Calculations'],
      features: ['Safe isolated voltage and current sensing', 'True RMS voltage and current measurement', 'LCD power factor and kWh consumption display'],
      prerequisites: ['AC circuit theory', 'Embedded basics']
    },
    {
      title: '1kW Solar Inverter Power Stage Design with MPPT Control Simulation',
      description: 'Design a complete 1kW solar grid-tied/off-grid power inverter stage featuring DC-DC boost MPPT tracking, full-bridge H-bridge inverter, and thermal heatsink sizing.',
      whyBuildIt: 'The ultimate power electrical engineering portfolio project demonstrating high-power semiconductor design, gate drive isolation, and control loops.',
      estimatedTime: '6-8 weeks',
      technologies: ['Altium / KiCad', 'Power Electronics', 'MPPT Algorithms', 'MATLAB / Simulink'],
      skillsLearned: ['High-Power Inverter Topologies', 'Maximum Power Point Tracking (MPPT)', 'Gate Driver Isolation & Thermal Design'],
      features: ['Full-bridge pure sine wave inverter schematic', 'Isolated high-side/low-side gate driver circuits', 'Simulink control loop model demonstrating 96%+ efficiency'],
      prerequisites: ['Power electronics', 'Control systems']
    }
  ),

  // 13. PLC & SCADA Automation Engineer
  ...createProjects(
    'plc-scada-automation-engineer',
    {
      title: 'Industrial Conveyor Belt Sorting Logic in Ladder Diagram',
      description: 'Program PLC ladder logic (IEC 61131-3) controlling an automated package sorting conveyor using proximity sensors, pneumatic pushers, and safety stop buttons.',
      whyBuildIt: 'Establishes fundamental industrial automation logic: seal-in contacts, timers (TON/TOF), counters, and emergency stop interlocks.',
      estimatedTime: '3-5 days',
      technologies: ['Ladder Diagram (LD)', 'Siemens TIA Portal / CODESYS', 'Industrial Sensors'],
      skillsLearned: ['IEC 61131-3 Ladder Logic', 'Latching & Interlock Safety Circuits', 'Industrial Sensor Integration'],
      features: ['3-lane sorting based on package height sensors', 'Motor forward/reverse run status logic', 'Hardwired and programmed Emergency Stop circuit'],
      prerequisites: ['Basic electrical relay logic']
    },
    {
      title: 'Traffic Intersection Controller with Pedestrian Override in FBD',
      description: 'Implement a 4-way traffic light controller using Function Block Diagrams (FBD) featuring yellow clearance intervals, night flashing modes, and pedestrian button calls.',
      whyBuildIt: 'Teaches timing sequences, state machines, conflict prevention logic, and industrial safety compliance.',
      estimatedTime: '4-7 days',
      technologies: ['CODESYS / RSLogix', 'Function Block Diagram (FBD)', 'State Machines'],
      skillsLearned: ['Sequential Control Logic', 'Conflict Avoidance Interlocks', 'Timing Sequences'],
      features: ['Timed light cycles with yellow change protection', 'Pedestrian crosswalk override interrupt', 'Fail-safe flashing yellow backup state'],
      prerequisites: ['PLC programming basics']
    },
    {
      title: 'Automated Liquid Level & Temperature Tank Control with PID Loop',
      description: 'Develop a continuous industrial process control system in Structured Text (ST) implementing closed-loop PID control for heating and liquid level regulation.',
      whyBuildIt: 'Crucial transition from discrete on/off automation to continuous analog process control in oil/gas, chemical, and manufacturing industries.',
      estimatedTime: '2-3 weeks',
      technologies: ['Structured Text (ST)', 'PID Control', 'CODESYS / Siemens S7-1200'],
      skillsLearned: ['Closed-Loop PID Tuning', 'Analog Signal Scaling (4-20mA / 0-10V)', 'Structured Text Programming'],
      features: ['Analog sensor scaling for 4-20mA current loop', 'Self-tuning PID algorithm maintaining setpoint', 'High/Low alarm threshold interlocks'],
      prerequisites: ['PLC fundamentals', 'Control systems theory']
    },
    {
      title: 'Factory SCADA HMI Dashboard with Alarms & Modbus TCP Communication',
      description: 'Design a commercial SCADA interface using Ignition or FactoryTalk connected via Modbus TCP to read PLC telemetry, log production data, and display alarm banners.',
      whyBuildIt: 'Master human-machine interface (HMI) standards, ISA-101 high-performance graphics, alarm management, and industrial network communications.',
      estimatedTime: '3-4 weeks',
      technologies: ['Ignition SCADA / WinCC', 'Modbus TCP', 'HMI Design', 'SQL Logging'],
      skillsLearned: ['SCADA System Architecture', 'Industrial Modbus Protocol', 'ISA-101 HMI Best Practices'],
      features: ['Animated visual equipment status', 'Historical trend chart logging to SQL database', 'Priority-ranked alarm banner with acknowledgment logic'],
      prerequisites: ['PLC programming', 'Networking basics']
    },
    {
      title: 'Fully Automated Pharmaceutical Batch Cell with SIL-2 Safety Interlocks',
      description: 'Engineer a comprehensive batch processing cell adhering to ISA-88 standards: automated recipe execution, CIP cleaning cycles, and certified safety interlocks.',
      whyBuildIt: 'The ultimate industrial automation portfolio project proving mastery of batch standards, recipe management, and safety PLC programming.',
      estimatedTime: '6-8 weeks',
      technologies: ['Siemens TIA Portal / Rockwell Studio 5000', 'ISA-88 Batch Standards', 'Safety PLCs', 'SCADA'],
      skillsLearned: ['ISA-88 Batch Control Architecture', 'Safety Instrumented Systems (SIL-2)', 'Recipe State Machines & Historians'],
      features: ['Multi-phase recipe execution engine', 'Failsafe safety matrix with dual-channel emergency circuits', 'Electronic batch record auditing and reporting'],
      prerequisites: ['PLC Structured Text', 'SCADA design']
    }
  ),

  // 14. Mechanical Design Engineer
  ...createProjects(
    'mechanical-design-engineer',
    {
      title: 'Parametric 3D CAD Modeling of a Spur Gear & Transmission Housing',
      description: 'Create parametric 3D models and manufacturing assembly drawings for a spur gearbox with involute teeth equations, bearing fits, and GD&T in SolidWorks.',
      whyBuildIt: 'Demonstrates professional mechanical CAD mastery, involute tooth generation, parametric relations, and standard drafting conventions.',
      estimatedTime: '3-5 days',
      technologies: ['SolidWorks / Autodesk Fusion', 'GD&T', 'Mechanical Drafting'],
      skillsLearned: ['Parametric 3D Modeling', 'Gear Geometry & Involute Equations', 'Engineering Drawing Production (GD&T)'],
      features: ['Parametric gear tooth module relations', 'Bearing press-fit tolerance callouts', 'Exploded assembly view with Bill of Materials'],
      prerequisites: ['Basic 3D CAD modeling']
    },
    {
      title: 'Sheet Metal Enclosure with Bend Deductions & Manufacturing Flat Patterns',
      description: 'Design a precision electronic equipment chassis in sheet metal including ventilation louvers, PEM press-fit hardware, bend radius deductions, and DXF exports.',
      whyBuildIt: 'Crucial Design for Manufacturing (DFM) skill: understanding K-factors, bend allowances, stamping tooling, and cost optimization.',
      estimatedTime: '4-7 days',
      technologies: ['SolidWorks / Inventor', 'Sheet Metal DFM', 'K-Factor Analysis'],
      skillsLearned: ['Sheet Metal Feature Creation', 'K-Factor & Bend Allowance Calculations', 'DFM for CNC Turret Punch & Press Brake'],
      features: ['Optimized ventilation pattern with zero interference', 'Automated flat-pattern export with bend lines for CNC punch', 'Standard hardware insertion callouts'],
      prerequisites: ['Mechanical drawing basics']
    },
    {
      title: 'Finite Element Analysis (FEA) Structural Optimization of a Lifting Crane Hook',
      description: 'Perform static structural FEA on an industrial lifting hook, analyze von Mises stress concentrations, compute safety factors, and optimize material weight.',
      whyBuildIt: 'Teaches mechanical simulation validation: mesh convergence analysis, boundary conditions, stress singularities, and weight reduction.',
      estimatedTime: '2-3 weeks',
      technologies: ['ANSYS Mechanical / SolidWorks Simulation', 'FEA Analysis', 'Stress Optimization'],
      skillsLearned: ['FEA Mesh Convergence & Refinement', 'Von Mises Stress & Factor of Safety (FOS)', 'Topology Optimization'],
      features: ['Curved beam stress analytical comparison', 'Mesh convergence graph verifying accuracy', '20% mass reduction while maintaining FOS > 2.5'],
      prerequisites: ['Mechanics of materials', 'CAD modeling']
    },
    {
      title: 'Computational Fluid Dynamics (CFD) Simulation of an Electronics Heat Sink',
      description: 'Simulate conjugate heat transfer and airflow across an extruded aluminum heat sink in a chassis duct using ANSYS Fluent to optimize thermal dissipation.',
      whyBuildIt: 'High-demand thermal mechanical engineering skill for consumer electronics, automotive battery packs, and power equipment.',
      estimatedTime: '3-4 weeks',
      technologies: ['ANSYS Fluent / OpenFOAM', 'CFD Analysis', 'Heat Transfer'],
      skillsLearned: ['Conjugate Heat Transfer Simulation', 'Turbulence Modeling (k-epsilon / k-omega)', 'Thermal Resistance Optimization'],
      features: ['Pressure drop vs airflow rate curves', 'Thermal junction temperature prediction', 'Fin spacing optimization comparing natural vs forced convection'],
      prerequisites: ['Fluid mechanics', 'Heat transfer basics']
    },
    {
      title: 'Complete 4-Bar Automotive Suspension Mechanism with Kinematic Simulation',
      description: 'Design a double-wishbone independent suspension system: calculate roll centers and camber angles, run kinematic multibody motion, and complete DFM drawings.',
      whyBuildIt: 'The definitive automotive and mechanical engineering portfolio showcase combining mechanism synthesis, motion simulation, and structural integrity.',
      estimatedTime: '6-8 weeks',
      technologies: ['SolidWorks Motion / Adams', 'Kinematics & Dynamics', 'FEA', 'DFM'],
      skillsLearned: ['Mechanism Kinematic Synthesis', 'Multibody Dynamic Simulation', 'Suspension Geometry (Camber, Caster, Toe)'],
      features: ['Full 3D suspension assembly with ball joints and dampers', 'Camber and roll center curve simulation throughout suspension travel', 'Structural FEA validation of control arms under bump/cornering loads'],
      prerequisites: ['Dynamics of machinery', 'Mechanical CAD']
    }
  ),

  // 15. Robotics & Mechatronics Engineer
  ...createProjects(
    'robotics-mechatronics-engineer',
    {
      title: '2-Wheel Differential Drive Autonomous Robot (Arduino / C++)',
      description: 'Build a mobile robot that reads ultrasonic sensors, implements obstacle-avoidance state machines, and drives DC motors using H-bridge PWM controllers.',
      whyBuildIt: 'Fundamental robotics foundation: motor kinematics, sensor interpretation, PWM speed control, and autonomous decision loops.',
      estimatedTime: '3-5 days',
      technologies: ['Arduino', 'C++', 'H-Bridge Motor Driver', 'Ultrasonic Sensors'],
      skillsLearned: ['Differential Drive Kinematics', 'H-Bridge PWM Motor Control', 'Reactive Obstacle Avoidance'],
      features: ['Smooth proportional steering when approaching barriers', 'Encoder tick feedback for straight-line travel', 'Bluetooth manual override mode'],
      prerequisites: ['Basic Arduino / C++']
    },
    {
      title: 'Forward & Inverse Kinematics Calculator for 3-DOF Robot Arm',
      description: 'Develop a Python / MATLAB simulation tool that calculates end-effector spatial coordinates using Denavit-Hartenberg (DH) parameters and inverse kinematics.',
      whyBuildIt: 'Essential theoretical robotics mathematics required for robot arm manipulation, path planning, and industrial robotics.',
      estimatedTime: '4-7 days',
      technologies: ['Python / MATLAB', 'DH Parameters', 'NumPy', 'Matplotlib 3D'],
      skillsLearned: ['Denavit-Hartenberg (DH) Modeling', 'Analytical Inverse Kinematics', '3D Workspace Visualization'],
      features: ['Interactive end-effector target coordinate inputs', 'Animated 3D robot arm posture rendering', 'Singularity and joint limit alert indicators'],
      prerequisites: ['Matrix algebra', 'Python basics']
    },
    {
      title: 'ROS 2 (Robot Operating System) SLAM Navigation in Gazebo',
      description: 'Configure and simulate an autonomous mobile robot in ROS 2 and Gazebo, creating a 2D floorplan map with Cartographer/Slam-Toolbox and autonomous navigation.',
      whyBuildIt: 'The industry standard robotics software stack: ROS 2 nodes, topics, transforms (TF2), and costmaps.',
      estimatedTime: '3-4 weeks',
      technologies: ['ROS 2 (Humble/Iron)', 'Gazebo', 'Nav2 Stack', 'Linux Ubuntu'],
      skillsLearned: ['ROS 2 Nodes & Topics', 'Coordinate Transformations (TF2)', 'Simultaneous Localization & Mapping (SLAM)'],
      features: ['URDF robot kinematic definition with LiDAR sensor', 'Interactive 2D SLAM mapping in RViz2', 'Autonomous waypoint navigation with dynamic obstacle re-routing'],
      prerequisites: ['Linux', 'C++ / Python basics']
    },
    {
      title: 'Computer Vision Pick-and-Place Robot with OpenCV & ArUco Markers',
      description: 'Build an automated vision system that uses an overhead camera, detects target objects by color and ArUco fiducial markers, and guides a servo gripper.',
      whyBuildIt: 'Combines computer vision with physical robotic manipulation for factory sorting and automated warehousing.',
      estimatedTime: '3-4 weeks',
      technologies: ['Python', 'OpenCV', 'Camera Calibration', 'Servo Gripper'],
      skillsLearned: ['Camera Coordinate Calibration', 'ArUco Marker Pose Estimation', 'Visual Servoing Manipulation'],
      features: ['Real-time object position and orientation detection', 'Camera-to-robot coordinate frame transformation', 'Automated pick, rotate, and place sequence'],
      prerequisites: ['Python OpenCV', 'Robotics kinematics']
    },
    {
      title: 'Autonomous Mobile Robot (AMR) with LiDAR SLAM & ROS 2 Nav2 Stack',
      description: 'Design and build a physical autonomous mobile robot with wheel encoders, 2D LiDAR, ROS 2 embedded computer, and local obstacle avoidance.',
      whyBuildIt: 'The pinnacle robotics portfolio project demonstrating complete hardware-software integration of modern autonomous vehicles.',
      estimatedTime: '6-8 weeks',
      technologies: ['ROS 2', 'Raspberry Pi / Jetson', 'LiDAR', 'Odometry', 'Nav2'],
      skillsLearned: ['Hardware-in-the-Loop Robotics', 'Sensor Fusion (EKF with IMU + Odometry)', 'Production Nav2 Tuning'],
      features: ['Extended Kalman Filter (EKF) combining wheel odometry and IMU', 'Autonomous multi-room patrol schedule', 'Web telemetry dashboard displaying battery and location'],
      prerequisites: ['ROS 2', 'Embedded systems', 'Python/C++']
    }
  ),

  // 16. Structural Engineer
  ...createProjects(
    'structural-engineer',
    {
      title: 'Simply Supported Beam Shear Force & Bending Moment Calculator',
      description: 'Develop a Python engineering utility that calculates shear force and bending moment diagrams for complex beam configurations with point and distributed loads.',
      whyBuildIt: 'Solidifies core structural mechanics, equilibrium equations, singularity functions, and automated calculation reporting.',
      estimatedTime: '3-5 days',
      technologies: ['Python', 'NumPy', 'Matplotlib', 'Structural Mechanics'],
      skillsLearned: ['Shear & Bending Moment Equations', 'Equilibrium Static Analysis', 'Automated Calculation Plots'],
      features: ['Support for multiple point loads and UDL/VLD loads', 'Interactive SFD and BMD visual diagrams', 'Calculation of maximum deflection and location of zero shear'],
      prerequisites: ['Statics and mechanics of materials']
    },
    {
      title: '2D Truss Analysis Software Using Direct Stiffness Method',
      description: 'Build a structural matrix analysis program in Python or MATLAB that computes member axial forces, node displacements, and reactions for arbitrary 2D pin-jointed trusses.',
      whyBuildIt: 'Teaches matrix structural analysis: global stiffness matrix assembly, boundary condition application, and displacement vector solving.',
      estimatedTime: '4-7 days',
      technologies: ['Python / MATLAB', 'Direct Stiffness Method', 'Matrix Structural Analysis'],
      skillsLearned: ['Matrix Stiffness Formulation', 'Degrees of Freedom (DOF) Mapping', 'Tension/Compression Stress Verification'],
      features: ['Arbitrary node and member input definitions', 'Deformed shape graphic with displacement scaling', 'Color-coded tension vs compression member display'],
      prerequisites: ['Matrix algebra', 'Structural analysis']
    },
    {
      title: '3D Reinforced Concrete Multi-Story Frame Modeling & Seismic Analysis',
      description: 'Model a 5-story reinforced concrete building in ETABS/STAAD.Pro, apply gravity and lateral seismic equivalent static loads according to design codes, and design beams/columns.',
      whyBuildIt: 'Industry-standard commercial structural engineering design: 3D spatial modeling, load combinations, and building code compliance (ACI / IS codes).',
      estimatedTime: '2-3 weeks',
      technologies: ['ETABS / STAAD.Pro', 'Seismic Design', 'Reinforced Concrete Codes'],
      skillsLearned: ['3D Spatial Building Modeling', 'Seismic Base Shear Calculation', 'RC Member Design (Rebar Detailing)'],
      features: ['Dead, Live, and Wind/Earthquake load combinations', 'Story drift and lateral displacement check', 'Reinforced concrete schedule and cross-section drawings'],
      prerequisites: ['Structural concrete design', 'ETABS basics']
    },
    {
      title: 'Retaining Wall Stability Analysis & Reinforcement Detailing',
      description: 'Perform geotechnical and structural stability analysis for a cantilever retaining wall: check sliding, overturning, soil bearing pressure, and detail stem reinforcement.',
      whyBuildIt: 'Combines structural engineering with soil mechanics and foundation design: Rankine earth pressure theory and crack control.',
      estimatedTime: '3-4 weeks',
      technologies: ['AutoCAD / Mathcad', 'Geotechnical Calculations', 'Structural Concrete'],
      skillsLearned: ['Lateral Earth Pressure Calculation', 'Factor of Safety against Overturning & Sliding', 'Structural Reinforcement Detailing'],
      features: ['Rankine active and passive soil pressure diagrams', 'Stability safety factor verification table', 'Comprehensive CAD drawing showing rebar development lengths'],
      prerequisites: ['Soil mechanics', 'Concrete design']
    },
    {
      title: 'Performance-Based Non-Linear Dynamic Seismic Analysis of a High-Rise',
      description: 'Conduct dynamic time-history structural analysis of a high-rise structure under earthquake ground motions, evaluating plastic hinge formation and inter-story drift.',
      whyBuildIt: 'The pinnacle structural engineering portfolio showcase demonstrating advanced non-linear finite element analysis and earthquake resilience design.',
      estimatedTime: '6-8 weeks',
      technologies: ['ETABS / SAP2000 / OpenSees', 'Nonlinear Dynamic Analysis', 'Response Spectrum'],
      skillsLearned: ['Nonlinear Plastic Hinge Modeling', 'Time-History Earthquake Ground Motion Matching', 'Structural Ductility & Resilience Assessment'],
      features: ['Real earthquake accelerogram scaling and response analysis', 'Plastic hinge progression sequence under extreme seismic events', 'Comprehensive performance-based design report'],
      prerequisites: ['Advanced structural dynamics', 'ETABS/SAP2000']
    }
  ),

  // 17. Construction Project Manager
  ...createProjects(
    'construction-project-manager',
    {
      title: 'Residential Construction Work Breakdown Structure (WBS) & Schedule',
      description: 'Develop a comprehensive Work Breakdown Structure and Critical Path Method (CPM) Gantt chart for a multi-unit residential project in MS Project / Primavera P6.',
      whyBuildIt: 'Fundamental project management skill: scope decomposition, task dependencies, milestone planning, and critical path identification.',
      estimatedTime: '3-5 days',
      technologies: ['MS Project / Primavera P6', 'Critical Path Method (CPM)', 'WBS Principles'],
      skillsLearned: ['Work Breakdown Structure (WBS) Creation', 'Critical Path Logic & Float Calculation', 'Project Baseline Management'],
      features: ['Hierarchical phase decomposition (Substructure, Superstructure, Finishes)', 'Identified critical path tasks with zero float', 'Milestone summary report for project stakeholders'],
      prerequisites: ['Project management fundamentals']
    },
    {
      title: 'Bill of Quantities (BOQ) & Unit Rate Cost Estimation Spreadsheet',
      description: 'Create an automated civil construction cost estimation model calculating material take-offs, labor rates, plant equipment hire, and contractor overhead margins.',
      whyBuildIt: 'Commercial estimating competency: quantity surveying, unit rate build-ups, material wastage allowances, and bid tender preparation.',
      estimatedTime: '4-7 days',
      technologies: ['Excel / Google Sheets', 'Quantity Surveying', 'Cost Estimation'],
      skillsLearned: ['Quantity Take-Off (QTO) Methodologies', 'Labor and Material Unit Rate Analysis', 'Tender Bid Price Formulation'],
      features: ['Dynamic material quantity formulas with waste multipliers', 'Labor productivity rate assumptions', 'Summary executive estimate with profit & contingency allocations'],
      prerequisites: ['Civil drawings interpretation', 'Excel basics']
    },
    {
      title: 'Earned Value Management (EVM) Performance Dashboard',
      description: 'Build an EVM tracker to monitor construction progress against budget: calculate Schedule Variance (SV), Cost Variance (CV), CPI, SPI, and Estimate at Completion.',
      whyBuildIt: 'Industry-standard project control metric required by major engineering contractors and construction owners to prevent cost overruns.',
      estimatedTime: '2-3 weeks',
      technologies: ['PowerBI / Excel', 'Earned Value Management (EVM)', 'Project Controls'],
      skillsLearned: ['Earned Value Metric Formulations (PV, EV, AC)', 'Cost Performance Index (CPI) Analysis', 'Project Forecast Projections (EAC / ETC)'],
      features: ['Interactive monthly S-curve tracking Planned vs Actual expenditures', 'Automated CPI and SPI health indicators', 'Corrective action recommendation report for schedule delays'],
      prerequisites: ['Project scheduling', 'Basic accounting']
    },
    {
      title: 'Construction Site Safety Risk Assessment & Quality Assurance Plan',
      description: 'Author a site-specific safety management plan (Job Hazard Analysis, Risk Matrix) and Quality Assurance / Quality Control (QA/QC) inspection checklists.',
      whyBuildIt: 'Vital site operations requirement: OSHA / HSE safety compliance, risk mitigation, and zero-defect quality inspection management.',
      estimatedTime: '3-4 weeks',
      technologies: ['HSE Regulations', 'Risk Assessment Matrix', 'QA/QC Management'],
      skillsLearned: ['Hazard Identification & Risk Assessment (HIRA)', 'Method Statement Development', 'Inspection and Test Plan (ITP) Authoring'],
      features: ['5x5 probability vs severity risk matrix for high-risk work', 'Concrete pouring and steel erection inspection checklists', 'Site emergency evacuation procedure and hazard protocol'],
      prerequisites: ['Construction site safety knowledge']
    },
    {
      title: 'Comprehensive Construction Master Plan with 4D BIM Integration',
      description: 'Develop an integrated construction management master package: 4D BIM scheduling simulation, risk register, supply chain procurement plan, and contract strategy.',
      whyBuildIt: 'The ultimate construction project management portfolio showcase demonstrating modern 4D digital construction, risk hedging, and prime contractor leadership.',
      estimatedTime: '6-8 weeks',
      technologies: ['Autodesk Navisworks / Synchro', 'BIM 4D', 'FIDIC / NEC Contracts', 'Primavera P6'],
      skillsLearned: ['4D BIM Schedule Linking', 'Comprehensive Risk Register & Mitigation', 'Subcontractor Procurement & Contract Administration'],
      features: ['Visual 4D simulation of building construction sequence', 'Quantitative risk register with probabilistic contingency reserves', 'Contractor payment schedule and change-order management workflow'],
      prerequisites: ['Primavera P6', 'BIM basics', 'Project management']
    }
  )
];

module.exports = {
  additionalProjects,
  createProjects,
  defaultSteps
};

