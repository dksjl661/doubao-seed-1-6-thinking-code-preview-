const { test, expect } = require('@playwright/test');

test('Page loads successfully and displays title', async ({ page }) => {
  // Start the local server
  // For testing, we'll assume the server is running on port 54609
  await page.goto('http://localhost:54609');

  // Check if the page title is correct
  await expect(page).toHaveTitle('SuperUn AI - Transform Your Business with Artificial Intelligence');
});

test('Navigation menu items are present and clickable', async ({ page }) => {
  await page.goto('http://localhost:54609');

  // Check navigation links
  const navLinks = ['Home', 'Features', 'Solutions', 'About', 'Contact'];

  for (const linkText of navLinks) {
    const link = page.locator(`.nav-menu a:has-text("${linkText}")`);
    await expect(link).toBeVisible();
    await expect(link).toBeEnabled();
  }

  // Check CTA button
  const ctaButton = page.locator('.nav-cta .btn-primary');
  await expect(ctaButton).toBeVisible();
  await expect(ctaButton).toHaveText('Get Started');
});

test('Hero section displays main content', async ({ page }) => {
  await page.goto('http://localhost:54609');

  // Check hero title
  const heroTitle = page.locator('.hero-title');
  await expect(heroTitle).toBeVisible();
  await expect(heroTitle).toContainText('Transform Your Business with AI');

  // Check hero buttons
  const startButton = page.locator('.hero-buttons .btn-primary');
  const demoButton = page.locator('.hero-buttons .btn-secondary');

  await expect(startButton).toBeVisible();
  await expect(startButton).toHaveText('Start Free Trial');

  await expect(demoButton).toBeVisible();
  await expect(demoButton).toHaveText('Watch Demo');

  // Check hero stats
  const stats = page.locator('.hero-stats .stat');
  await expect(stats).toHaveCount(3);
});

test('Features section displays all feature cards', async ({ page }) => {
  await page.goto('http://localhost:54609');

  // Scroll to features section using JavaScript
  await page.evaluate(() => {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView();
    }
  });

  // Check feature cards
  const featureCards = page.locator('.feature-card');
  await expect(featureCards).toHaveCount(6);

  // Check some feature titles
  const featureTitles = ['Smart Automation', 'Predictive Analytics', 'Real-time Processing'];
  for (const title of featureTitles) {
    await expect(page.locator(`.feature-card h3:has-text("${title}")`)).toBeVisible();
  }
});

test('Contact form works correctly', async ({ page }) => {
  await page.goto('http://localhost:54609');

  // Scroll to contact section using JavaScript
  await page.evaluate(() => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView();
    }
  });

  // Fill in the form
  await page.fill('.contact-form input[type="text"]', 'Test User');
  await page.fill('.contact-form input[type="email"]', 'test@example.com');
  await page.selectOption('.contact-form select', 'consultation');
  await page.fill('.contact-form textarea', 'This is a test message');

  // Mock the alert
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('Thank you for your message! We will contact you soon.');
    await dialog.accept();
  });

  // Submit the form
  await page.locator('.contact-form button[type="submit"]').click();

  // Check if form is reset
  await expect(page.locator('.contact-form input[type="text"]')).toHaveValue('');
  await expect(page.locator('.contact-form input[type="email"]')).toHaveValue('');
});