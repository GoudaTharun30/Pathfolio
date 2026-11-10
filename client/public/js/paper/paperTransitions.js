/**
 * Pathfolio Paper World — Signature Paper Crumple/Crunch Transition Engine
 * Coordinates page-to-page navigation, theme transformations, and localized component physics.
 */
const paperTransitions = {
  isTransitioning: false,

  init() {
    if (window.PaperCrunchEngine) {
      window.PaperCrunchEngine.init();
    }
  },

  /**
   * Generates a gentle tactile paper rustle sound via Web Audio API
   */
  playPaperRustle(stage = 'crumple') {
    if (window.PaperCrunchEngine) {
      window.PaperCrunchEngine.playPaperRustleAudio(stage);
    }
  },

  /**
   * Executes the signature 3D paper crunch ball transition between views
   *
   * @param {Function} updateViewCallback - Async function called at apex to render new view
   * @param {String} label - Handwritten badge text
   * @param {Object} options - Additional transition configuration
   */
  async transition(updateViewCallback, label = 'Turning Page...', options = {}) {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || this.isTransitioning) {
      if (typeof updateViewCallback === 'function') {
        await updateViewCallback();
      }
      if (window.paperDecorations && typeof paperDecorations.applyPageDecorations === 'function') {
        paperDecorations.applyPageDecorations();
      }
      return;
    }

    this.isTransitioning = true;

    try {
      if (window.PaperCrunchEngine) {
        await window.PaperCrunchEngine.executeTransition({
          type: options.type || 'page',
          label: label,
          fromTheme: options.fromTheme,
          toTheme: options.toTheme,
          onApex: async () => {
            if (typeof updateViewCallback === 'function') {
              await updateViewCallback();
            }
            if (window.paperDecorations && typeof paperDecorations.applyPageDecorations === 'function') {
              paperDecorations.applyPageDecorations();
            }
          }
        });
      } else {
        // Fallback if engine is loading
        if (typeof updateViewCallback === 'function') {
          await updateViewCallback();
        }
      }
    } catch (err) {
      console.error('Error during paper transition:', err);
      if (typeof updateViewCallback === 'function') {
        await updateViewCallback();
      }
    } finally {
      this.isTransitioning = false;
    }
  },

  /**
   * Special Feature: Professional Theme <-> Paper Theme Transformation
   * 
   * @param {Function} updateThemeCallback - Function to toggle theme variables & classes
   * @param {String} fromTheme - 'paper' | 'original'
   * @param {String} toTheme - 'paper' | 'original'
   */
  async transformTheme(updateThemeCallback, fromTheme, toTheme) {
    const isToPaper = toTheme === 'paper';
    const label = isToPaper ? 'Transforming to Paper World...' : 'Transforming to Professional Theme...';

    return this.transition(updateThemeCallback, label, {
      type: 'theme',
      fromTheme: fromTheme,
      toTheme: toTheme
    });
  },

  /**
   * Localized Component Paper Unfold (Modals, Panels, Topic Previews)
   */
  openComponent(modalEl) {
    if (!modalEl) return;
    this.playPaperRustle('unfold');
    modalEl.classList.remove('paper-modal-collapse');
    modalEl.classList.add('paper-modal-unfold');
  },

  /**
   * Localized Component Paper Collapse
   */
  closeComponent(modalEl, callback) {
    if (!modalEl) {
      if (typeof callback === 'function') callback();
      return;
    }
    this.playPaperRustle('crumple');
    modalEl.classList.remove('paper-modal-unfold');
    modalEl.classList.add('paper-modal-collapse');

    setTimeout(() => {
      modalEl.classList.remove('paper-modal-collapse');
      if (typeof callback === 'function') callback();
    }, 260);
  },

  /**
   * Returns reusable PaperLoader HTML
   */
  renderLoader(message = 'Sketching notes...') {
    return `
      <div class="paper-loader-container" style="min-height: 280px;">
        <div class="paper-folding-icon"></div>
        <div class="paper-loader-text">${message}</div>
      </div>
    `;
  }
};

window.paperTransitions = paperTransitions;
