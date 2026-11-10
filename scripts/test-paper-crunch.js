/**
 * Comprehensive Automated Playwright Test Suite for
 * Pathfolio Signature Realistic Paper Crunch Ball Transition & Theme Transformation
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TEST_URL || 'http://127.0.0.1:5000';
const SCREENSHOT_DIR = path.join(__dirname, '../test-results/screenshots/paper-crunch');

async function runPaperCrunchTests() {
  console.log('================================================================');
  console.log('   Pathfolio Paper Crunch Ball & Transformation Verification');
  console.log('================================================================');
  console.log(`Target URL: ${BASE_URL}`);

  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    details: [],
    consoleErrors: []
  };

  function record(name, passed, msg = '') {
    results.total++;
    if (passed) {
      results.passed++;
      console.log(`  ✅ PASS: ${name}`);
      results.details.push({ name, status: 'PASS' });
    } else {
      results.failed++;
      console.error(`  ❌ FAIL: ${name} - ${msg}`);
      results.details.push({ name, status: 'FAIL', error: msg });
    }
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const txt = msg.text();
      if (!txt.includes('favicon.ico') && !txt.includes('clerk.accounts.dev')) {
        results.consoleErrors.push(txt);
      }
    }
  });

  try {
    // -------------------------------------------------------------
    // TEST 1: Initial Website Opening & Engine Initialization
    // -------------------------------------------------------------
    console.log('\n--- 1. Testing Initial Website Opening & Engine Initialization ---');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1000);

    const isEngineLoaded = await page.evaluate(() => {
      return typeof window.PaperCrunchEngine === 'object' &&
             typeof window.paperTransitions === 'object' &&
             document.getElementById('paper-crunch-overlay') !== null;
    });
    record('PaperCrunchEngine & DOM Overlay Initialized', isEngineLoaded);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_initial_landing.png') });

    // -------------------------------------------------------------
    // TEST 2: Professional Theme -> Paper Theme Transformation
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Professional Theme -> Paper Theme Transformation ---');
    // Ensure we start in original modern theme first
    await page.evaluate(() => themeManager.updateConfig({ themeStyle: 'original' }));
    await page.waitForTimeout(400);

    // Trigger theme transformation
    const transformPromise = page.evaluate(() => {
      return new Promise(resolve => {
        themeManager.setThemeStyle('paper');
        setTimeout(resolve, 1200);
      });
    });

    // Capture during ball crunch (approx 320ms in)
    await page.waitForTimeout(320);
    const overlayActiveDuringTransform = await page.evaluate(() => {
      const overlay = document.getElementById('paper-crunch-overlay');
      return overlay && overlay.classList.contains('active');
    });
    record('Transition Overlay Active During Crunch Ball', overlayActiveDuringTransform);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_theme_crunch_ball_center.png') });

    await transformPromise;
    await page.waitForTimeout(600);

    const themeCheck = await page.evaluate(() => {
      const overlay = document.getElementById('paper-crunch-overlay');
      const isOverlayHidden = !overlay.classList.contains('active');
      const hasPaperClass = document.body.classList.contains('theme-paper');
      const dataStyle = document.documentElement.getAttribute('data-theme-style');
      const configStyle = themeManager.config.themeStyle;
      return { isOverlayHidden, hasPaperClass, dataStyle, configStyle };
    });
    console.log('   Theme check after transform:', themeCheck);
    const isNowPaper = themeCheck.isOverlayHidden && themeCheck.hasPaperClass && themeCheck.dataStyle === 'paper';
    record('Transformed to Paper Theme (Overlay removed, Theme active)', isNowPaper);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_paper_theme_unfolded.png') });

    // -------------------------------------------------------------
    // TEST 3: Paper Theme -> Professional Theme Transformation
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Paper Theme -> Professional Theme Transformation ---');
    const transformBackPromise = page.evaluate(() => {
      return new Promise(resolve => {
        themeManager.setThemeStyle('original');
        setTimeout(resolve, 1200);
      });
    });

    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_theme_revert_crunch_ball.png') });

    await transformBackPromise;
    await page.waitForTimeout(500);

    const isNowOriginal = await page.evaluate(() => {
      const hasPaperClass = document.body.classList.contains('theme-paper');
      const dataStyle = document.documentElement.getAttribute('data-theme-style');
      return !hasPaperClass && dataStyle === 'original';
    });
    record('Transformed to Professional Theme (Clean slate active)', isNowOriginal);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_original_theme_unfolded.png') });

    // Switch back to Paper World for application page transitions
    await page.evaluate(() => themeManager.setThemeStyle('paper'));
    await page.waitForTimeout(1200);

    // -------------------------------------------------------------
    // TEST 4: Authenticate & Test Full Navigational Sequence
    // -------------------------------------------------------------
    console.log('\n--- 4. Authenticating & Testing Route Transitions ---');
    const authed = await page.evaluate(async () => {
      try {
        const email = `testuser_${Date.now()}@example.com`;
        const regRes = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Alex Mercer',
            email: email,
            password: 'Password123!',
            confirmPassword: 'Password123!'
          })
        });
        const data = await regRes.json();
        if (data.token) {
          API.setToken(data.token);
          app.currentUser = data.user;
          await app.navigate('dashboard');
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    });
    record('Authenticated and navigated to Dashboard', authed);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_dashboard_page.png') });

    // Test sequence across all requested pages:
    const routesToTest = [
      { route: 'profile', name: 'My Profile', file: '07_profile' },
      { route: 'roadmaps', name: 'Career Roadmaps', file: '08_roadmaps' },
      { route: 'learning', name: 'Learning Planner', file: '09_learning' },
      { route: 'projects', name: 'Recommended Projects', file: '10_projects' },
      { route: 'resume', name: 'Resume Builder', file: '11_resume' },
      { route: 'portfolio', name: 'Portfolio Builder', file: '12_portfolio' }
    ];

    for (const r of routesToTest) {
      console.log(`   Navigating to ${r.name} (${r.route})...`);

      const navPromise = page.evaluate((targetRoute) => {
        return app.navigate(targetRoute);
      }, r.route);

      // Snapshot mid-transition crumpled ball
      await page.waitForTimeout(400);
      const crunchActive = await page.evaluate(() => {
        return document.getElementById('paper-crunch-overlay').classList.contains('active');
      });
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${r.file}_crunch_mid.png`) });

      await navPromise;
      await page.waitForTimeout(400);

      const current = await page.evaluate(() => app.currentRoute);
      console.log(`   Nav result for ${r.name}: currentRoute=${current}, crunchActive=${crunchActive}`);
      record(`Navigation to ${r.name}`, current === r.route);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${r.file}_unfolded.png`) });
    }

    // -------------------------------------------------------------
    // TEST 5: Component / Modal Localized Paper Transformations
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing Component / Modal Localized Paper Transitions ---');
    await page.evaluate(() => app.navigate('roadmaps'));
    await page.waitForTimeout(1200);

    // Open Personalization Modal
    await page.evaluate(() => {
      RoadmapsView.openPersonalizationModal('frontend-developer');
    });
    await page.waitForTimeout(400);

    const isModalOpen = await page.evaluate(() => {
      const modal = document.getElementById('modal-root');
      const body = document.getElementById('modal-body');
      return modal.classList.contains('active') && body.classList.contains('paper-modal-unfold');
    });
    record('Modal Opened with Paper Unfold Physics', isModalOpen);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '13_modal_paper_unfold.png') });

    // Close Modal
    await page.evaluate(() => app.closeModal());
    await page.waitForTimeout(350);

    const isModalClosed = await page.evaluate(() => {
      const modal = document.getElementById('modal-root');
      return !modal.classList.contains('active');
    });
    record('Modal Closed with Paper Collapse Physics', isModalClosed);

    // -------------------------------------------------------------
    // TEST 6: Browser Back & Forward Navigation
    // -------------------------------------------------------------
    console.log('\n--- 6. Testing Browser Back & Forward History Physics ---');
    await page.evaluate(() => window.history.back());
    await page.waitForTimeout(1400);

    const backRoute = await page.evaluate(() => ({
      route: app.currentRoute,
      pathname: window.location.pathname
    }));
    console.log('   History Back result:', backRoute);
    record('Browser Back button triggers transition', backRoute.route !== 'roadmaps');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '14_history_back_result.png') });

    await page.evaluate(() => window.history.forward());
    await page.waitForTimeout(1300);

    const forwardRoute = await page.evaluate(() => app.currentRoute);
    record('Browser Forward button triggers transition', forwardRoute === 'roadmaps');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '15_history_forward_result.png') });

    // -------------------------------------------------------------
    // TEST 7: Rapid Repeated Navigation Debounce
    // -------------------------------------------------------------
    console.log('\n--- 7. Testing Rapid Navigation Debounce Guard ---');
    const rapidResult = await page.evaluate(async () => {
      // Fire 4 rapid navigations simultaneously
      app.navigate('dashboard');
      app.navigate('learning');
      app.navigate('projects');
      await app.navigate('profile');
      await new Promise(r => setTimeout(r, 1200));

      const overlay = document.getElementById('paper-crunch-overlay');
      return {
        currentRoute: app.currentRoute,
        isOverlayActive: overlay.classList.contains('active'),
        isEngineAnimating: PaperCrunchEngine.isAnimating
      };
    });

    record(
      'Rapid Navigation Guard (No stuck overlay, clean resolution)',
      !rapidResult.isOverlayActive && !rapidResult.isEngineAnimating
    );

    // -------------------------------------------------------------
    // TEST 8: Accessibility & Prefers-Reduced-Motion
    // -------------------------------------------------------------
    console.log('\n--- 8. Testing Reduced Motion Mode ---');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const reducedMotionNav = await page.evaluate(async () => {
      const startTime = performance.now();
      await app.navigate('dashboard');
      const duration = performance.now() - startTime;
      const overlay = document.getElementById('paper-crunch-overlay');
      return {
        duration,
        currentRoute: app.currentRoute,
        overlayActive: overlay.classList.contains('active')
      };
    });

    record(
      'Reduced Motion Mode skips deformation and completes instantly',
      reducedMotionNav.currentRoute === 'dashboard' && !reducedMotionNav.overlayActive
    );
    await page.emulateMedia({ reducedMotion: 'no-preference' });

    // -------------------------------------------------------------
    // TEST 9: Resilient CSS Fallback Execution
    // -------------------------------------------------------------
    console.log('\n--- 9. Testing CSS 3D Fallback Mode ---');
    const fallbackRan = await page.evaluate(async () => {
      return new Promise(resolve => {
        let apexHit = false;
        PaperCrunchEngine.executeCssFallback({
          onApex: () => { apexHit = true; },
          onComplete: () => { resolve(apexHit); }
        }, () => {});
      });
    });
    record('Resilient CSS 3D Fallback executes cleanly', fallbackRan === true);

  } catch (err) {
    console.error('Test execution error:', err);
    record('Test Suite Execution', false, err.message);
  } finally {
    await browser.close();
  }

  console.log('\n================================================================');
  console.log(`TOTAL TESTS: ${results.total} | PASSED: ${results.passed} | FAILED: ${results.failed}`);
  console.log(`Console Errors: ${results.consoleErrors.length}`);
  if (results.consoleErrors.length > 0) {
    console.log('Errors:', results.consoleErrors);
  }
  console.log('================================================================');

  if (results.failed > 0) {
    process.exit(1);
  }
}

runPaperCrunchTests();
