import { expect, test } from '@playwright/test';
import { demoCardContent, expectNoPageErrors, gotoDemo, watchPageErrors } from './helpers';

test.describe('form demos', () => {
  test('basic submit, validation, and reset flows work', async ({ page }) => {
    const pageErrors = watchPageErrors(page);

    await gotoDemo(page, 'form');

    const basic = demoCardContent(page, 'Basic');
    await basic.getByLabel('Username').fill('skyroc');
    await basic.getByLabel('Email').fill('skyroc@example.com');
    await basic.getByRole('button', { name: 'Submit' }).click();

    const reset = demoCardContent(page, 'Reset');
    await reset.getByLabel('Username').fill('changed');
    await reset.getByLabel('Info&City').fill('Shanghai');
    await reset.getByRole('button', { name: 'Reset All' }).click();
    await expect(reset.getByLabel('Info&City')).toHaveValue('Beijing');
    await expect(reset.getByLabel('Username')).toHaveValue('');

    const validate = demoCardContent(page, 'Validate Fields');
    await validate.getByLabel('Username2').fill('admin');
    await validate.getByRole('button', { name: 'Validate Username2' }).click();
    await expect(validate.getByText('This username2 is not allowed')).toBeVisible();

    expectNoPageErrors(pageErrors);
  });

  test('computed, list, undo-redo, selectors, and resolvers update state', async ({ page }) => {
    const pageErrors = watchPageErrors(page);

    await gotoDemo(page, 'form');

    const computed = demoCardContent(page, 'Computed Field');
    await computed.getByLabel('Price').fill('12');
    await computed.getByLabel('Quantity').fill('3');
    await expect(computed.getByPlaceholder('auto compute total')).toHaveValue('36');

    const list = demoCardContent(page, 'Form List');
    const textboxCount = await list.getByRole('textbox').count();
    await list.getByRole('button').first().click();
    await expect(list.getByRole('textbox')).toHaveCount(textboxCount + 2);

    const undoRedo = demoCardContent(page, 'Undo/Redo');
    await undoRedo.getByRole('button', { name: 'Change Username' }).click();
    await expect(undoRedo.getByLabel('Username')).toHaveValue('new_user');
    await undoRedo.getByRole('button', { name: 'Undo' }).click();
    await expect(undoRedo.getByLabel('Username')).toHaveValue('ohh');

    const useWatch = demoCardContent(page, 'Use Watch');
    await useWatch.getByLabel('Username').fill('watched');
    await expect(useWatch.getByText(/Username:\s*watched/)).toBeVisible();

    const zod = demoCardContent(page, 'Zod Resolver');
    await zod.getByRole('button', { name: 'Submit' }).click();
    await expect(zod.getByText('username is not valid')).toBeVisible();

    const asyncValidator = demoCardContent(page, 'Async Validator Resolver');
    await asyncValidator.getByRole('button', { name: 'Submit' }).click();
    await expect(asyncValidator.getByText('Email is not valid')).toBeVisible();

    expectNoPageErrors(pageErrors);
  });
});
