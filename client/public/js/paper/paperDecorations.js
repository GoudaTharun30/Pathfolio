/**
 * Pathfolio Paper World — Doodles, SVG Filters & Notebook Annotations Engine
 */
const paperDecorations = {
  init() {
    this.injectSvgFilters();
    this.applyPageDecorations();
  },

  /**
   * Injects organic wobbly hand-drawn SVG filters into the DOM once
   */
  injectSvgFilters() {
    if (document.getElementById('paper-svg-filters')) return;

    const svgNs = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNs, 'svg');
    svg.id = 'paper-svg-filters';
    svg.style.position = 'absolute';
    svg.style.width = '0';
    svg.style.height = '0';
    svg.style.pointerEvents = 'none';

    svg.innerHTML = `
      <defs>
        <!-- Wobbly Hand-Drawn Sketch Filter -->
        <filter id="paper-wobble" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        
        <!-- Subtle Paper Ink Bleed -->
        <filter id="paper-ink-bleed" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="turbulence" baseFrequency="0.08" numOctaves="2" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1.2" />
        </filter>
      </defs>
    `;

    document.body.appendChild(svg);
  },

  /**
   * Enhances page elements with notebook annotations when Paper Theme is active
   */
  applyPageDecorations() {
    if (!document.body.classList.contains('theme-paper')) return;

    // 1. Decorate Active Sidebar Item with Hand-Drawn Oval Loop if not already decorated
    const activeNav = document.querySelector('.sidebar-item.active a');
    if (activeNav && !activeNav.querySelector('.sketch-oval-loop')) {
      const loop = document.createElement('span');
      loop.className = 'sketch-oval-loop';
      loop.setAttribute('aria-hidden', 'true');
      activeNav.appendChild(loop);
    }

    // 2. Decorate Welcome Banner Arrows pointing to "Continue Learning"
    const welcomeCta = document.querySelector('.welcome-banner .btn');
    if (welcomeCta && !welcomeCta.parentElement.classList.contains('welcome-cta-group')) {
      const parent = welcomeCta.parentElement;
      parent.classList.add('welcome-cta-group');

      const arrowLeft = document.createElement('div');
      arrowLeft.className = 'sketch-arrow-left';
      arrowLeft.innerHTML = `
        <svg width="48" height="42" viewBox="0 0 48 42" fill="none" style="position: absolute; right: calc(100% + 8px); top: -6px; pointer-events: none;">
          <!-- Top Arrow pointing down-right -->
          <path d="M 4 8 Q 20 6 36 16" stroke="#171717" stroke-width="2.5" stroke-linecap="round" fill="none" />
          <path d="M 28 12 L 37 16 L 33 22" stroke="#171717" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <!-- Bottom Arrow pointing up-right -->
          <path d="M 6 36 Q 22 34 38 24" stroke="#171717" stroke-width="2.5" stroke-linecap="round" fill="none" />
          <path d="M 33 18 L 39 23 L 30 28" stroke="#171717" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </svg>
      `;
      parent.prepend(arrowLeft);
    }

    // 3. Decorate Metric Cards with subtle corner stamps or sketch doodle icons
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, idx) => {
      card.classList.add('paper-fold');
    });

    // 4. Decorate "Recommended Next Steps" with hand-drawn blue marker stroke and exclamation
    const nextStepsHeader = document.querySelector('.next-steps-list')?.previousElementSibling;
    if (nextStepsHeader && !nextStepsHeader.classList.contains('decorated-paper-header')) {
      nextStepsHeader.classList.add('decorated-paper-header');
      const text = nextStepsHeader.textContent.trim();
      nextStepsHeader.innerHTML = `
        <span class="next-steps-title"><i class="fa-solid fa-compass" style="margin-right: 0.4rem;"></i> ${text}</span>
        <span class="next-steps-exclamation">!</span>
      `;
    }
  }
};

