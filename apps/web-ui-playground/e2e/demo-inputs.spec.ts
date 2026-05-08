import { expect, test } from '@playwright/test';
import { demoCardContent, expectNoPageErrors, expectTextVisible, gotoDemo, watchPageErrors } from './helpers';

test.describe('input demos', () => {
  test('text, password, otp, number, and textarea inputs update visible values', async ({ page }) => {
    const pageErrors = watchPageErrors(page);

    await gotoDemo(page, 'input');
    const clearableInput = demoCardContent(page, 'Clearable').getByRole('textbox').first();
    await expect(clearableInput).toHaveValue('default value');
    await clearableInput.fill('changed value');
    await expect(clearableInput).toHaveValue('changed value');

    await gotoDemo(page, 'password');
    const passwordInput = demoCardContent(page, 'Base').getByPlaceholder('Please input password');
    await passwordInput.fill('new-secret');
    await expectTextVisible(demoCardContent(page, 'Base'), 'Value: new-secret');

    await gotoDemo(page, 'input-otp');
    const otpCard = demoCardContent(page, 'Default');
    const otpSlots = otpCard.locator('[data-slot="input-otp-slot"]');
    await otpCard.getByRole('textbox').first().fill('1');
    await page.keyboard.type('23456');
    await expect(otpSlots.nth(0)).toHaveText('1');
    await expect(otpSlots.nth(5)).toHaveText('6');

    await gotoDemo(page, 'number-input');
    const numberInput = demoCardContent(page, 'Base').getByRole('spinbutton').first();
    await numberInput.fill('42');
    await expect(numberInput).toHaveValue('42');

    await gotoDemo(page, 'textarea');
    const textarea = demoCardContent(page, 'word count').getByRole('textbox');
    await textarea.fill('hello');
    await expectTextVisible(demoCardContent(page, 'word count'), '5');

    expectNoPageErrors(pageErrors);
  });

  test('checkbox, radio, switch, segment, toggle, and toggle-group update selection state', async ({ page }) => {
    const pageErrors = watchPageErrors(page);

    await gotoDemo(page, 'checkbox');
    const checkAll = demoCardContent(page, 'Group').getByRole('checkbox', { name: 'Check All' });
    await checkAll.click();
    await expect(checkAll).toBeChecked();

    await gotoDemo(page, 'radio');
    const orange = demoCardContent(page, 'Basic').getByRole('radio', { name: 'Orange' });
    await orange.click();
    await expect(orange).toBeChecked();

    await gotoDemo(page, 'switch');
    await demoCardContent(page, 'Controlled').getByRole('switch', { name: 'Sync account' }).click();
    await expectTextVisible(demoCardContent(page, 'Controlled'), 'Sync enabled');

    await gotoDemo(page, 'segment');
    const friday = demoCardContent(page, 'Basic').getByRole('tab', { name: 'Friday' });
    await friday.click();
    await expect(friday).toHaveAttribute('aria-selected', 'true');

    await gotoDemo(page, 'toggle');
    await demoCardContent(page, 'Controlled').getByRole('button', { name: 'Toggle bold' }).click();
    await expectTextVisible(demoCardContent(page, 'Controlled'), 'Pressed');

    await gotoDemo(page, 'toggle-group');
    const italic = demoCardContent(page, 'Multi').getByRole('button', { name: 'Italic' });
    await italic.click();
    await expect(italic).toHaveAttribute('aria-pressed', 'true');

    expectNoPageErrors(pageErrors);
  });
});
