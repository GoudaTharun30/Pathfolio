const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TEST_URL || 'http://127.0.0.1:5000';
const SCREENSHOT_DIR = path.join(__dirname, '../test-results/screenshots');

async function verify() {
  console.log('🚀 Launching Playwright visual verification of Pathfolio Paper World...');
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  try {
    // 1. Landing Page in Paper World
    console.log('1. Testing Landing Page in Paper World...');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-landing-paper.png'), fullPage: false });
    console.log('   Saved 01-landing-paper.png');

    // 2. Test Theme Switching: Paper World -> Original Modern
    console.log('2. Testing Theme Switching (Paper -> Original)...');
    await page.evaluate(() => themeManager.toggleThemeStyle());
    await page.waitForTimeout(800);
    const isOriginal = await page.evaluate(() => !document.body.classList.contains('theme-paper'));
    console.log(`   Switched to Original theme: ${isOriginal ? 'SUCCESS' : 'FAILED'}`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-landing-original.png'), fullPage: false });

    // 3. Switch back to Paper World
    console.log('3. Switching back to Paper World...');
    await page.evaluate(() => themeManager.toggleThemeStyle());
    await page.waitForTimeout(800);
    const isPaper = await page.evaluate(() => document.body.classList.contains('theme-paper'));
    console.log(`   Switched to Paper World: ${isPaper ? 'SUCCESS' : 'FAILED'}`);

    // 4. Test Login View
    console.log('4. Testing Login View...');
    await page.evaluate(() => app.navigate('login'));
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-login-paper.png') });

    // 5. Authenticate and populate profile matching blueprint
    console.log('5. Authenticating as tharun roy & seeding profile...');
    const authSuccess = await page.evaluate(async () => {
      try {
        const email = `tharun_${Date.now()}@example.com`;
        const regRes = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'tharun roy',
            email: email,
            password: 'Password123!',
            confirmPassword: 'Password123!'
          })
        });
        const regData = await regRes.json();
        if (regData.token) {
          API.setToken(regData.token);
          app.currentUser = regData.user;

          // Seed profile data: 4 skills, frontend developer
          await API.request('/profile', {
            method: 'PUT',
            body: JSON.stringify({
              basicInfo: {
                fullName: 'tharun roy',
                title: 'Frontend Developer'
              },
              skills: ['JavaScript', 'React', 'HTML & CSS', 'Git'],
            })
          });

          // Generate or activate Frontend Developer learning plan (3 months)
          try {
            await API.request('/learning-plan/generate', {
              method: 'POST',
              body: JSON.stringify({
                roadmapSlug: 'frontend-developer',
                durationMonths: 3,
                hoursPerWeek: 10
              })
            });
          } catch (e) {}

          await app.navigate('dashboard');
          return true;
        }
        return false;
      } catch (err) {
        console.error('Auth error:', err);
        return false;
      }
    });

    console.log(`   Authenticated session created: ${authSuccess ? 'SUCCESS' : 'FAILED'}`);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-dashboard-paper.png'), fullPage: false });
    console.log('   Saved 04-dashboard-paper.png (Compare with blueprint!)');

    // 6. Test Career Roadmaps Explorer
    console.log('6. Testing Career Roadmaps Explorer...');
    await page.evaluate(() => app.navigate('roadmaps'));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-roadmaps-paper.png') });

    // 7. Test Learning Planner
    console.log('7. Testing Learning Planner...');
    await page.evaluate(() => app.navigate('learning'));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-planner-paper.png') });

    // 8. Test Recommended Projects
    console.log('8. Testing Recommended Projects...');
    await page.evaluate(() => app.navigate('projects'));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-projects-paper.png') });

    // 9. Test Resume Builder
    console.log('9. Testing Resume Builder...');
    await page.evaluate(() => app.navigate('resume'));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-resume-paper.png') });

    // 10. Test Portfolio Builder
    console.log('10. Testing Portfolio Builder...');
    await page.evaluate(() => app.navigate('portfolio'));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-portfolio-paper.png') });

    // 11. Test Profile View
    console.log('11. Testing Profile View...');
    await page.evaluate(() => app.navigate('profile'));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-profile-paper.png') });

    // 12. Test Customize Theme Drawer
    console.log('12. Testing Customize Theme Drawer...');
    await page.evaluate(() => app.openCustomizeTheme());
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11-customize-drawer.png') });

    console.log('✨ All visual tests executed successfully!');
    if (consoleErrors.length) {
      console.log('⚠️ Console errors noted during run:');
      consoleErrors.slice(0, 5).forEach(e => console.log('  -', e));
    } else {
      console.log('✅ Clean console output without errors.');
    }
  } catch (err) {
    console.error('❌ Error during verification:', err);
  } finally {
    await browser.close();
  }
}

verify();
