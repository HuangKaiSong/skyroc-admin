import { describe, expect, it, vi } from 'vitest';
import FormStore from '../src/form-core/createStore';
import { ChangeTag } from '../src/form-core/event';

function createHarness(initialValues: Record<string, any> = {}) {
  const store = new FormStore();
  const form = store.getForm() as any;
  const hooks = form.getInternalHooks();

  hooks.setInitialValues(initialValues);

  return { form, hooks };
}

function registerField(hooks: any, name: string, initialValue?: any) {
  const changeValue = vi.fn();
  const unregister = hooks.registerField({
    changeValue,
    initialValue,
    name,
    preserve: true
  });

  return { changeValue, unregister };
}

async function flushNotify() {
  await Promise.resolve();
  await Promise.resolve();
}

describe('FormStore values and metadata', () => {
  it('should update field values and dirty/touched state', () => {
    const onValuesChange = vi.fn();
    const { form, hooks } = createHarness({ profile: { name: 'Ada' } });

    hooks.setCallbacks({ onValuesChange });
    registerField(hooks, 'profile.name');

    form.setFieldValue('profile.name', 'Grace');

    expect(form.getFieldValue('profile.name')).toBe('Grace');
    expect(form.getFieldTouched('profile.name')).toBe(true);
    expect(form.getFormState().dirtyFields).toEqual({ 'profile.name': true });
    expect(onValuesChange).toHaveBeenCalledWith({ profile: { name: 'Grace' } }, { profile: { name: 'Grace' } });
  });

  it('should reset selected fields without dropping unrelated values', () => {
    const { form, hooks } = createHarness({ first: 'Ada', last: 'Lovelace' });

    registerField(hooks, 'first');
    registerField(hooks, 'last');

    form.setFieldValue('first', 'Grace');
    form.setFieldValue('last', 'Hopper');
    form.resetFields(['first']);

    expect(form.getFieldsValue()).toEqual({
      first: 'Ada',
      last: 'Hopper'
    });
    expect(form.getFieldTouched('first')).toBe(false);
    expect(form.getFieldTouched('last')).toBe(true);
  });

  it('should notify prefix subscribers when child fields change', async () => {
    const { form, hooks } = createHarness({ profile: { name: 'Ada' } });
    const listener = vi.fn();

    registerField(hooks, 'profile.name');
    hooks.subscribeField('profile', listener, {
      includeChildren: true,
      mask: ChangeTag.Value
    });

    form.setFieldValue('profile.name', 'Grace');
    await flushNotify();

    expect(listener).toHaveBeenCalledWith(
      { name: 'Grace' },
      'profile',
      { profile: { name: 'Grace' } },
      expect.any(Number)
    );
  });
});

describe('FormStore validation and submit', () => {
  it('should expose validation results through the public form API', async () => {
    const { form, hooks } = createHarness({ email: '' });

    registerField(hooks, 'email');
    hooks.setFieldRules('email', [{ debounceMs: 0, message: 'Email is required', required: true }]);

    await expect(form.validateField('email')).resolves.toBe(false);
    expect(form.getFieldError('email')).toEqual(['Email is required']);

    form.setFieldValue('email', 'ada@example.com');

    await expect(form.validateFields(['email'])).resolves.toBe(true);
    expect(form.getFieldError('email')).toEqual([]);
  });

  it('should omit disabled and hidden fields from submitted values', async () => {
    const onFinish = vi.fn();
    const onFinishFailed = vi.fn();
    const { form, hooks } = createHarness({
      name: 'Ada',
      profile: { age: 36 },
      secret: 'token'
    });

    hooks.setCallbacks({ onFinish, onFinishFailed });
    registerField(hooks, 'name');
    registerField(hooks, 'profile.age');
    registerField(hooks, 'secret');

    form.setDisabled('secret', true);
    form.setHidden('profile.age', true);

    await form.submit();

    expect(onFinish).toHaveBeenCalledWith({
      name: 'Ada',
      profile: {}
    });
    expect(onFinishFailed).not.toHaveBeenCalled();
  });
});

describe('FormStore array operations', () => {
  it('should update array fields with stable operation helpers', () => {
    const { form, hooks } = createHarness({
      items: [{ name: 'A' }, { name: 'B' }]
    });

    registerField(hooks, 'items');

    const items = form.arrayOp('items');

    items.insert(1, { name: 'X' });
    expect(form.getFieldValue('items')).toEqual([{ name: 'A' }, { name: 'X' }, { name: 'B' }]);

    items.move(2, 0);
    expect(form.getFieldValue('items')).toEqual([{ name: 'B' }, { name: 'A' }, { name: 'X' }]);

    items.swap(0, 2);
    expect(form.getFieldValue('items')).toEqual([{ name: 'X' }, { name: 'A' }, { name: 'B' }]);

    items.replace(1, { name: 'Y' });
    expect(form.getFieldValue('items')).toEqual([{ name: 'X' }, { name: 'Y' }, { name: 'B' }]);

    items.remove(2);
    expect(form.getFieldValue('items')).toEqual([{ name: 'X' }, { name: 'Y' }]);
  });
});
