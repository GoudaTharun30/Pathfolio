/**
 * Pathfolio Playwright End-to-End Automated Testing Suite
 *
 * Verifies:
 * 1. Homepage & Public Landing elements
 * 2. Theme Switcher & Personalization Drawer
 * 3. All Navigational Routes (Public & Authenticated)
 * 4. Forms and Buttons (Login, Register, Profile, Learning tasks, AI chat, etc.)
 * 5. Console & Network error diagnostics
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TEST_URL || 'http://localhost:5000';
const SCREENSHOT_DIR = path.join(__dirname, '../test-results/screenshots');

async function runTestSuite() {
  console.log('====================================================');
  console.log('   Pathfolio Playwright End-to-End Test Suite');
  console.log('====================================================');
  console.log(`Target URL: ${BASE_URL}`);

  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    brokenItems: [],
    pageErrors: [],
    networkErrors: [],
    details: []
  };

  function record(testName, passed, errorMsg = null) {
    results.total++;
    if (passed) {
      results.passed++;
      console.log(`  ✅ PASS: ${testName}`);
      results.details.push({ testName, status: 'PASS' });
    } else {
      results.failed++;
      console.error(`  ❌ FAIL: ${testName} - ${errorMsg}`);
      results.brokenItems.push({ testName, error: errorMsg });
      results.details.push({ testName, status: 'FAIL', error: errorMsg });
    }
  }

  const browser = await chromium.launch({
    headless: true
  });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 }
  });
  const page = await context.newPage();

  // Monitor console errors and exceptions
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Filter out non-application network noise or expected analytics
      if (!text.includes('favicon.ico') && !text.includes('clerk.accounts.dev')) {
        results.pageErrors.push(text);
      }
    }
  });

  page.on('pageerror', err => {
    results.pageErrors.push(err.message);
  });

  page.on('requestfailed', req => {
    const url = req.url();
    if (!url.includes('favicon.ico') && !url.includes('clerk.accounts.dev')) {
      results.networkErrors.push({ url, failure: req.failure()?.errorText });
    }
  });

  try {
    // ----------------------------------------------------
    // TEST 1: Open Local Pathfolio Website & Test Homepage
    // ----------------------------------------------------
    console.log('\n[1/6] Testing Homepage & Public Landing Page...');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1000);

    const title = await page.title();
    record('Homepage Title contains Pathfolio', title.includes('Pathfolio'), `Title was "${title}"`);

    const heroText = await page.locator('.hero-title').innerText().catch(() => '');
    record('Hero Section rendered properly', heroText.includes('Build Your Career'), 'Hero title text missing');

    const navLinksCount = await page.locator('#public-nav-links li').count();
    record('Public Navbar links rendered', navLinksCount >= 5, `Found ${navLinksCount} nav items`);

    // Test section smooth scrolling
    await page.click('a[href="#features"]');
    await page.waitForTimeout(500);
    const featuresVisible = await page.locator('#features').isVisible();
    record('Features section navigable via anchor', featuresVisible, 'Features section not visible');

    await page.click('a[href="#how-it-works"]');
    await page.waitForTimeout(500);
    const howItWorksVisible = await page.locator('#how-it-works').isVisible();
    record('How-It-Works section navigable via anchor', howItWorksVisible, 'How it works section not visible');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_homepage.png'), fullPage: false });

    // ----------------------------------------------------
    // TEST 2: Theme Switcher & Customization Drawer
    // ----------------------------------------------------
    console.log('\n[2/6] Testing Theme Switcher & Personalization Drawer...');
    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    record('Initial Theme is dark', initialTheme === 'dark', `Initial theme was ${initialTheme}`);

    // Toggle theme to light
    const modeBtn = page.locator('#public-nav-links button:has-text("Mode")').first();
    await modeBtn.click();
    await page.waitForTimeout(300);
    const toggledTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    record('Theme Switcher toggles to light mode', toggledTheme === 'light', `Theme after click was ${toggledTheme}`);

    // Toggle theme back to dark
    await modeBtn.click();
    await page.waitForTimeout(300);
    const revertedTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    record('Theme Switcher reverts back to dark mode', revertedTheme === 'dark', `Theme after click was ${revertedTheme}`);

    // Open Theme Customizer Drawer
    const customizeBtn = page.locator('#public-nav-links button:has-text("Customize")').first();
    await customizeBtn.click();
    await page.waitForTimeout(500);

    const drawerVisible = await page.locator('#customize-theme-drawer.active').isVisible();
    record('Customize Theme Drawer opens on button click', drawerVisible, 'Drawer failed to open');

    // Test changing accent color with .color-swatch
    const purpleBtn = page.locator('.color-swatch[title="Purple"]');
    const purpleVisible = await purpleBtn.isVisible();
    if (purpleVisible) {
      await purpleBtn.click();
      await page.waitForTimeout(300);
      const accent = await page.evaluate(() => document.documentElement.style.getPropertyValue('--primary').trim());
      record('Accent Color updates dynamically', accent.toLowerCase() === '#8b5cf6', `Accent was "${accent}"`);
    } else {
      record('Accent Color swatches accessible', false, 'Purple swatch button not found');
    }

    // Close Theme Drawer
    await page.locator('.drawer-close-btn').click();
    await page.waitForTimeout(300);
    const drawerClosed = !(await page.locator('#customize-theme-drawer.active').isVisible());
    record('Customize Theme Drawer closes cleanly', drawerClosed, 'Drawer remained open');

    // ----------------------------------------------------
    // TEST 3: Forms & Authentication Flow
    // ----------------------------------------------------
    console.log('\n[3/6] Testing Authentication Forms & Session Creation...');
    await page.evaluate(() => app.navigate('login'));
    await page.waitForTimeout(800);

    const clerkMountVisible = await page.locator('#clerk-signin-mount').isVisible();
    const loginFormVisible = await page.locator('#login-email').isVisible();
    record('Login View renders authentication interface (Clerk Mount or Email/Password Form)', clerkMountVisible || loginFormVisible, 'Neither Clerk mount nor login form was visible');

    // Test User Registration & Login via API backend
    const testTimestamp = Date.now();
    const testEmail = `tester_${testTimestamp}@example.com`;
    const testPassword = 'Password123!';

    const regResult = await page.evaluate(async ({ email, password }) => {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Playwright Test User',
            email,
            password,
            confirmPassword: password
          })
        });
        const data = await res.json();
        if (res.ok && data.token) {
          API.setToken(data.token);
          app.currentUser = data.user;
          return { success: true, token: data.token, user: data.user };
        }
        return { success: false, error: data.error };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }, { email: testEmail, password: testPassword });

    record('User Registration & JWT Session Generation', regResult.success, regResult.error);

    // Refresh view state into authenticated dashboard
    await page.evaluate(() => app.navigate('dashboard'));
    await page.waitForTimeout(1000);

    const appShellVisible = await page.locator('#app-shell').isVisible();
    record('App Shell activates for authenticated session', appShellVisible, 'App shell not displayed');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_dashboard.png'), fullPage: false });

    // ----------------------------------------------------
    // TEST 4: Navigate Through All Available Pages
    // ----------------------------------------------------
    console.log('\n[4/6] Navigating Through All Available App Pages...');

    const pagesToTest = [
      { route: 'dashboard', titleExpected: 'Dashboard Overview', selector: '.dashboard-metrics, .quick-actions, .card' },
      { route: 'profile', titleExpected: 'User Profile', selector: '.profile-header, .profile-card, form' },
      { route: 'roadmaps', titleExpected: 'Career Roadmaps Explorer', selector: '#roadmaps-cards-grid .feature-card, #filter-branch' },
      { route: 'learning', titleExpected: 'Learning Planner', selector: '.learning-planner-container, .tasks-list, .btn' },
      { route: 'projects', titleExpected: 'Project Recommendations', selector: '#project-roadmap-selector, .card' },
      { route: 'resume', titleExpected: 'Resume Builder', selector: '.resume-builder-container, .resume-preview, form' },
      { route: 'portfolio', titleExpected: 'Portfolio Builder', selector: '.portfolio-builder-container, .portfolio-preview, form' }
    ];

    for (const p of pagesToTest) {
      await page.evaluate(r => app.navigate(r), p.route);
      await page.waitForTimeout(800);

      const headingText = await page.locator('#page-title-heading').innerText().catch(() => '');
      const contentHasContent = (await page.locator(p.selector).count()) > 0;

      record(`Page [${p.route}]: Route navigation & Header title`, headingText.includes(p.titleExpected.split(' ')[0]), `Expected header matching "${p.titleExpected}", got "${headingText}"`);
      record(`Page [${p.route}]: Content rendered`, contentHasContent, `Selector "${p.selector}" not found or empty`);

      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `page_${p.route}.png`), fullPage: false });
    }

    // Test Interactive Roadmap Detail Sub-page
    console.log('\nTesting Interactive Roadmap Detail Page...');
    await page.evaluate(() => app.navigate('roadmap-detail', { slug: 'frontend-developer' }));
    await page.waitForTimeout(1000);

    const roadmapTitle = await page.locator('#page-title-heading').innerText().catch(() => '');
    const roadmapMilestones = await page.locator('.level-block, .roadmap-level, .node-card, .level-container, .timeline-item').count();
    record('Roadmap Detail Page loads roadmap milestones', roadmapMilestones > 0 || roadmapTitle.includes('Learning Journey'), 'Roadmap milestones not found');

    // ----------------------------------------------------
    // TEST 5: Interactive Buttons & Form Actions
    // ----------------------------------------------------
    console.log('\n[5/6] Testing Interactive Controls & AI Mentor...');

    // Sidebar Hamburger toggle
    const hamburgerBtn = page.locator('.hamburger-btn');
    if (await hamburgerBtn.isVisible()) {
      await hamburgerBtn.click();
      await page.waitForTimeout(200);
      const sidebarActive = await page.locator('#app-sidebar.active').isVisible();
      record('Sidebar collapses / expands on hamburger click', sidebarActive, 'Sidebar active class missing');
      await hamburgerBtn.click(); // revert
    }

    // AI Career Assistant Chat Trigger
    const aiTriggerBtn = page.locator('.floating-ai-trigger');
    record('AI Career Assistant floating button visible', await aiTriggerBtn.isVisible(), 'Floating trigger not visible');

    await aiTriggerBtn.click();
    await page.waitForTimeout(500);
    const aiChatVisible = await page.locator('#ai-chat-window.active').isVisible();
    record('AI Assistant window opens on trigger click', aiChatVisible, 'AI window not open');

    // Test sending an AI chat message
    const aiInput = page.locator('#ai-chat-input');
    await aiInput.fill('What skills should I learn first as a web developer?');
    const sendBtn = page.locator('.ai-chat-input-area button');
    await sendBtn.click();
    await page.waitForTimeout(1500);

    const chatBubbles = await page.locator('.chat-bubble').count();
    record('AI Chat message posted to conversation container', chatBubbles >= 2, `Expected at least 2 chat bubbles, got ${chatBubbles}`);

    // Close AI chat window
    await page.locator('.ai-chat-header button').click();
    await page.waitForTimeout(300);

    // ----------------------------------------------------
    // TEST 6: Session Termination & Logout
    // ----------------------------------------------------
    console.log('\n[6/6] Testing Logout & Cleanup...');
    await page.evaluate(() => app.logout());
    await page.waitForTimeout(500);

    const returnedToLanding = await page.locator('.hero-section').isVisible();
    record('Logout returns cleanly to public landing view', returnedToLanding, 'Public hero section not visible after logout');

  } catch (globalErr) {
    record('Critical Playwright Execution Error', false, globalErr.message);
  } finally {
    await browser.close();
  }

  // Generate Report
  console.log('\n====================================================');
  console.log('            Playwright E2E Test Summary');
  console.log('====================================================');
  console.log(`Total Checks   : ${results.total}`);
  console.log(`Passed         : ${results.passed}`);
  console.log(`Failed         : ${results.failed}`);
  console.log(`Page Errors    : ${results.pageErrors.length}`);
  console.log(`Network Errors : ${results.networkErrors.length}`);

  if (results.brokenItems.length > 0) {
    console.log('\nBroken Items Detected:');
    results.brokenItems.forEach(item => {
      console.log(` - [${item.testName}]: ${item.error}`);
    });
  }

  const reportPath = path.join(__dirname, '../test-results/e2e-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nDetailed report saved to: ${reportPath}`);
  console.log(`Screenshots saved to    : ${SCREENSHOT_DIR}`);
  console.log('====================================================');

  return results;
}

if (require.main === module) {
  runTestSuite().then(res => {
    process.exit(res.failed > 0 ? 1 : 0);
  }).catch(err => {
    console.error('Fatal Test Runner Error:', err);
    process.exit(1);
  });
}

module.exports = { runTestSuite };
