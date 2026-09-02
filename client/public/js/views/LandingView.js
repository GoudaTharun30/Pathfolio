/**
 * Public Landing Page View
 */
const LandingView = {
  render() {
    return `
      <!-- Hero Section -->
      <section class="hero-section" id="home">
        <div class="container">
          <div class="hero-badge">
            <i class="fa-solid fa-sparkles"></i> Connected Career Ecosystem
          </div>
          <h1 class="hero-title">
            Build Your Career.<br><span>Build Your Path.</span>
          </h1>
          <p class="hero-subtitle">
            Create your resume and portfolio, discover the right career path, plan your learning, build meaningful projects, and get AI-powered career guidance — all in one place.
          </p>
          <div class="hero-ctas">
            <button class="btn btn-primary btn-lg" onclick="app.navigate('register')">
              <i class="fa-solid fa-rocket"></i> Get Started
            </button>
            <button class="btn btn-secondary btn-lg" onclick="app.scrollToSection('features')">
              <i class="fa-solid fa-compass"></i> Explore Pathfolio
            </button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section" id="features">
        <div class="container">
          <div class="section-header">
            <h2>Everything You Need for Career Growth</h2>
            <p class="section-subtitle">A unified platform replacing fragmented tools for resume building, roadmaps, project recommendations, and career planning.</p>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon"><i class="fa-solid fa-map-location-dot"></i></div>
              <h3>Career Roadmaps</h3>
              <p>Explore structured learning levels for Full Stack, Backend, Data, Cloud/DevOps, and Cybersecurity tailored to your skills and background.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon"><i class="fa-solid fa-list-check"></i></div>
              <h3>Learning Planner</h3>
              <p>Turn career roadmaps into actionable week-by-week todo tasks, set deadlines, track completion %, and prepare for interviews.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon"><i class="fa-solid fa-rocket"></i></div>
              <h3>Project Recommendations</h3>
              <p>Get skill-matched project specifications designed to expand your capabilities and automatically feature on your profile upon completion.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon"><i class="fa-solid fa-file-invoice"></i></div>
              <h3>Resume Builder</h3>
              <p>Generate clean, ATS-optimized software developer resumes powered by your profile data and customizable AI layout styles.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon"><i class="fa-solid fa-laptop-code"></i></div>
              <h3>Portfolio Builder</h3>
              <p>Select modern portfolio templates or describe your custom design in natural language for AI-driven safe configuration rendering.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon"><i class="fa-solid fa-robot"></i></div>
              <h3>AI Career Assistant</h3>
              <p>Chat with a floating AI mentor aware of your active roadmap, completed skills, and learning goals for personalized career advice.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="how-it-works-section" id="how-it-works">
        <div class="container">
          <div class="section-header">
            <h2>How Pathfolio Works</h2>
            <p class="section-subtitle">Your step-by-step path from learning basics to landing your dream tech role.</p>
          </div>
          <div class="steps-container">
            <div class="step-item">
              <div class="step-number">1</div>
              <h4>Create Profile</h4>
            </div>
            <div class="step-item">
              <div class="step-number">2</div>
              <h4>Choose Career Path</h4>
            </div>
            <div class="step-item">
              <div class="step-number">3</div>
              <h4>Follow Roadmap</h4>
            </div>
            <div class="step-item">
              <div class="step-number">4</div>
              <h4>Build Projects</h4>
            </div>
            <div class="step-item">
              <div class="step-number">5</div>
              <h4>Create Resume & Portfolio</h4>
            </div>
            <div class="step-item">
              <div class="step-number">6</div>
              <h4>Prepare for Interviews</h4>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section" id="faq">
        <div class="container">
          <div class="section-header">
            <h2>Frequently Asked Questions</h2>
            <p class="section-subtitle">Got questions? We've got answers.</p>
          </div>
          <div class="faq-accordion">
            <div class="faq-item active">
              <button class="faq-question" onclick="LandingView.toggleFaq(this)">
                <span>What is Pathfolio?</span>
                <i class="fa-solid fa-chevron-down faq-icon"></i>
              </button>
              <div class="faq-answer">
                Pathfolio is an all-in-one career platform for students and early-career software developers to plan learning, build projects, generate resumes, and construct portfolios.
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" onclick="LandingView.toggleFaq(this)">
                <span>Is Pathfolio free to use?</span>
                <i class="fa-solid fa-chevron-down faq-icon"></i>
              </button>
              <div class="faq-answer">
                Yes! Pathfolio provides core career roadmaps, learning planners, resume generators, and project recommendations free of charge.
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" onclick="LandingView.toggleFaq(this)">
                <span>How does the AI Assistant work?</span>
                <i class="fa-solid fa-chevron-down faq-icon"></i>
              </button>
              <div class="faq-answer">
                Our AI Assistant uses server-side provider abstraction (Gemini or OpenAI) and reads your profile skills and active roadmap context to give personalized guidance.
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" onclick="LandingView.toggleFaq(this)">
                <span>Can I download my resume and portfolio?</span>
                <i class="fa-solid fa-chevron-down faq-icon"></i>
              </button>
              <div class="faq-answer">
                Yes! Resumes can be printed or exported to PDF, and portfolios can be previewed or exported as standalone HTML/CSS files.
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="public-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <a href="#" class="logo" style="margin-bottom: 1rem; display: inline-flex;">
                <i class="fa-solid fa-compass"></i> Pathfolio<span>.</span>
              </a>
              <p style="font-size: 0.9rem; max-width: 320px;">Empowering students and early-career developers to build meaningful software engineering careers.</p>
            </div>
            <div class="footer-col">
              <h5>Platform</h5>
              <ul class="footer-links">
                <li><a href="#features" onclick="app.scrollToSection('features')">Features</a></li>
                <li><a href="#how-it-works" onclick="app.scrollToSection('how-it-works')">How It Works</a></li>
                <li><a href="#faq" onclick="app.scrollToSection('faq')">FAQ</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h5>Account</h5>
              <ul class="footer-links">
                <li><a href="#" onclick="app.navigate('login')">Login</a></li>
                <li><a href="#" onclick="app.navigate('register')">Sign Up</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h5>Legal</h5>
              <ul class="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; text-align: center; font-size: 0.85rem;">
            &copy; ${new Date().getFullYear()} Pathfolio. All rights reserved. Built for developers.
          </div>
        </div>
      </footer>
    `;
  },

  toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    item.classList.toggle('active');
  }
};
