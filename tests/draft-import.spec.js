import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE = path.join(__dirname, 'fixtures', 'draft-log.json');

test.beforeEach(async ({ page }) => {
  await page.goto('/fab-draft-visualizer/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('shows upload view before any file is loaded', async ({ page }) => {
  await expect(page.locator('#view-upload')).toBeVisible();
  await expect(page.locator('#view-draft')).toBeHidden();
  await expect(page.locator('.upload-title')).toContainText('Draft Visualizer');
  await expect(page.locator('#saved-drafts-section')).toBeHidden();
});

test('imports draft log and transitions to draft view', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);

  await expect(page.locator('#view-draft')).toBeVisible();
  await expect(page.locator('#view-upload')).toBeHidden();
});

test('player list shows all players with correct names', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);

  const players = page.locator('.player-btn');
  await expect(players).toHaveCount(2);
  await expect(players.nth(0)).toContainText('BirdOfHermes11');
  await expect(players.nth(1)).toContainText('OmniBot_1');
  await expect(players.nth(1).locator('.bot-tag')).toBeVisible();
});

test('pack tabs P1 P2 P3 are rendered', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);

  const tabs = page.locator('.pack-tab');
  await expect(tabs).toHaveCount(3);
  await expect(tabs.nth(0)).toContainText('P1');
  await expect(tabs.nth(1)).toContainText('P2');
  await expect(tabs.nth(2)).toContainText('P3');
  await expect(tabs.nth(0)).toHaveClass(/active/);
});

test('booster grid shows cards with one highlighted as picked', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);

  const cards = page.locator('#booster-grid .card-item');
  await expect(cards).not.toHaveCount(0);
  await expect(page.locator('#booster-grid .is-picked')).toHaveCount(1);
  await expect(page.locator('.pick-badge')).toContainText('Picked');
});

test('pick navigation increments and decrements the pick counter', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);

  await expect(page.locator('#pick-info-span')).toContainText('1 /');

  await page.locator('#pick-next-btn').click();
  await expect(page.locator('#pick-info-span')).toContainText('2 /');

  await page.locator('#pick-prev-btn').click();
  await expect(page.locator('#pick-info-span')).toContainText('1 /');
});

test('prev button is disabled on first pick', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);

  await expect(page.locator('#pick-prev-btn')).toBeDisabled();
  await page.locator('#pick-next-btn').click();
  await expect(page.locator('#pick-prev-btn')).not.toBeDisabled();
});

test('switching pack resets pick counter to 1', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);

  await page.locator('#pick-next-btn').click();
  await expect(page.locator('#pick-info-span')).toContainText('2 /');

  await page.locator('.pack-tab').nth(1).click();
  await expect(page.locator('#pick-info-span')).toContainText('1 /');
  await expect(page.locator('.pack-tab').nth(1)).toHaveClass(/active/);
});

test('can switch between Booster, Deck and Pod tabs', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);

  await expect(page.locator('#tab-booster')).toBeVisible();
  await expect(page.locator('#tab-deck')).toBeHidden();
  await expect(page.locator('#tab-pod')).toBeHidden();

  await page.locator('.main-tab').filter({ hasText: 'Deck' }).click();
  await expect(page.locator('#tab-deck')).toBeVisible();
  await expect(page.locator('#tab-booster')).toBeHidden();
  await expect(page.locator('#deck-title')).toContainText('BirdOfHermes11');

  await page.locator('.main-tab').filter({ hasText: 'Pod' }).click();
  await expect(page.locator('#tab-pod')).toBeVisible();
  await expect(page.locator('#tab-deck')).toBeHidden();
  await expect(page.locator('#stats-title')).toContainText('Entire Pod');
});

test('draft pool toggle shows and hides the pool grid', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);

  await expect(page.locator('#pool-grid')).toBeHidden();

  await page.locator('#pool-toggle').click();
  await expect(page.locator('#pool-grid')).toBeVisible();

  await page.locator('#pool-toggle').click();
  await expect(page.locator('#pool-grid')).toBeHidden();
});

test('reset button returns to upload view', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);
  await expect(page.locator('#view-draft')).toBeVisible();

  await page.locator('#reset-btn').click();

  await expect(page.locator('#view-upload')).toBeVisible();
  await expect(page.locator('#view-draft')).toBeHidden();
});

test('imported draft is saved and shown in saved drafts list', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);
  await page.locator('#reset-btn').click();

  await expect(page.locator('#saved-drafts-section')).toBeVisible();
  await expect(page.locator('.saved-draft-item')).toHaveCount(1);
  await expect(page.locator('.saved-draft-name')).toContainText('draft-log');
});

test('saved draft can be reloaded from the list', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);
  await page.locator('#reset-btn').click();

  await page.locator('.saved-draft-load-btn').click();

  await expect(page.locator('#view-draft')).toBeVisible();
  await expect(page.locator('.player-btn').nth(0)).toContainText('BirdOfHermes11');
});

test('saved draft can be deleted from the list', async ({ page }) => {
  await page.locator('#file-input').setInputFiles(FIXTURE);
  await page.locator('#reset-btn').click();

  await page.locator('.saved-draft-del-btn').click();

  await expect(page.locator('#saved-drafts-section')).toBeHidden();
  await expect(page.locator('.saved-draft-item')).toHaveCount(0);
});
