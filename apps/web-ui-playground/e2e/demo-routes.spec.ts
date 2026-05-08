import { expect, test } from '@playwright/test';
import { expectNoPageErrors, getDemoEntries, gotoDemo, watchPageErrors } from './helpers';

const demoEntries = getDemoEntries();

test.describe('demo routes', () => {
  for (const demo of demoEntries) {
    test(`${demo.name} renders without runtime errors`, async ({ page }) => {
      const pageErrors = watchPageErrors(page);

      await gotoDemo(page, demo.name);
      await expect(page.getByRole('heading', { name: `${demo.label} Demo` })).toBeVisible();
      expectNoPageErrors(pageErrors);
    });
  }
});
