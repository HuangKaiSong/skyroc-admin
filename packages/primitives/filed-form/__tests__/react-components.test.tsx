import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ComputedField, Field, Form, List, useFieldError, useForm } from '../src/react';

interface LoginValues {
  /** 用户邮箱，用于验证错误展示和提交结果 */
  email: string;
}

const EmailError = () => {
  const errors = useFieldError<LoginValues, 'email'>('email');

  return <output aria-label="Email error">{errors.join(', ')}</output>;
};

interface VisibilityValues {
  /** 名称字段，用于隐藏分支 */
  name: string;
}

interface VisibilityExampleProps {
  /** 初始字段值 */
  initialName: string;
}

const VisibilityExample = (props: VisibilityExampleProps) => {
  const { initialName } = props;
  const [form] = useForm<VisibilityValues>();

  return (
    <Form form={form} initialValues={{ name: initialName }}>
      <Field name="name">
        <input aria-label="Visible name" />
      </Field>
      <button type="button" onClick={() => form.setHidden('name', true)}>
        Hide name
      </button>
    </Form>
  );
};

describe('Form and Field integration', () => {
  it('should render controlled fields from initial values and keep cleared values', async () => {
    render(
      <Form initialValues={{ name: 'Ada' }}>
        <Field name="name">
          <input aria-label="Name" />
        </Field>
      </Form>
    );

    const input = screen.getByLabelText('Name');

    expect(input).toHaveValue('Ada');

    fireEvent.change(input, { target: { value: 'Grace' } });

    await waitFor(() => {
      expect(input).toHaveValue('Grace');
    });

    fireEvent.change(input, { target: { value: '' } });

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('should submit valid values and render field errors when validation fails', async () => {
    const onFinish = vi.fn();
    const onFinishFailed = vi.fn();

    render(
      <Form initialValues={{ email: '' }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="email" rules={[{ debounceMs: 0, message: 'Email is required', required: true }]}>
          <input aria-label="Email" />
        </Field>
        <EmailError />
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByLabelText('Email error')).toHaveTextContent('Email is required');
    });
    expect(onFinishFailed).toHaveBeenCalledTimes(1);
    expect(onFinish).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });

    await waitFor(() => {
      expect(screen.getByLabelText('Email error')).toHaveTextContent('');
    });

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({ email: 'ada@example.com' });
    });
  });

  it('should render without a wrapper when component is false', () => {
    const { container } = render(
      <Form component={false} initialValues={{ name: 'Ada' }}>
        <Field name="name">
          <input aria-label="Headless name" />
        </Field>
      </Form>
    );

    expect(container.querySelector('form')).toBeNull();
    expect(screen.getByLabelText('Headless name')).toHaveValue('Ada');
  });

  it('should render a custom component wrapper', () => {
    render(
      <Form aria-label="Custom form shell" component="section" initialValues={{ name: 'Ada' }}>
        <Field name="name">
          <input aria-label="Custom name" />
        </Field>
      </Form>
    );

    expect(screen.getByRole('region', { name: 'Custom form shell' })).toBeInTheDocument();
    expect(screen.getByLabelText('Custom name')).toHaveValue('Ada');
  });

  it('should reset fields through native form reset events', async () => {
    const onReset = vi.fn();

    render(
      <Form initialValues={{ name: 'Ada' }} onReset={onReset}>
        <Field name="name">
          <input aria-label="Reset name" />
        </Field>
        <button type="reset">Reset</button>
      </Form>
    );

    const input = screen.getByLabelText('Reset name');

    fireEvent.change(input, { target: { value: 'Grace' } });

    await waitFor(() => {
      expect(input).toHaveValue('Grace');
    });

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

    await waitFor(() => {
      expect(input).toHaveValue('Ada');
    });
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('should support custom value extraction and normalization', async () => {
    const onValuesChange = vi.fn();

    render(
      <Form initialValues={{ phone: '' }} onValuesChange={onValuesChange}>
        <Field
          getValueFromEvent={event => event.target.value}
          name="phone"
          normalize={value => String(value).replace(/\D/g, '')}
        >
          <input aria-label="Phone" />
        </Field>
      </Form>
    );

    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: 'abc123' } });

    await waitFor(() => {
      expect(screen.getByLabelText('Phone')).toHaveValue('123');
    });
    expect(onValuesChange).toHaveBeenCalledWith({ phone: '123' }, { phone: '123' });
  });

  it('should support checked value props', async () => {
    render(
      <Form initialValues={{ enabled: true }}>
        <Field name="enabled" valuePropName="checked">
          <input aria-label="Enabled" type="checkbox" />
        </Field>
      </Form>
    );

    const checkbox = screen.getByLabelText('Enabled');

    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it('should hide fields when the form marks them hidden', async () => {
    render(<VisibilityExample initialName="Ada" />);

    expect(screen.getByLabelText('Visible name')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Hide name' }));

    await waitFor(() => {
      expect(screen.queryByLabelText('Visible name')).toBeNull();
    });
  });
});

describe('List component integration', () => {
  it('should render array fields and refresh names after insert and remove operations', async () => {
    render(
      <Form initialValues={{ items: [{ title: 'A' }, { title: 'B' }] }}>
        <List name="items">
          {(fields, ops) => (
            <>
              <ul aria-label="Items">
                {fields.map(field => (
                  <li key={field.key}>{field.name}</li>
                ))}
              </ul>
              <button type="button" onClick={() => ops.insert(fields.length, { title: 'C' })}>
                Add
              </button>
              <button type="button" onClick={() => ops.remove(0)}>
                Remove first
              </button>
            </>
          )}
        </List>
      </Form>
    );

    expect(screen.getAllByRole('listitem').map(item => item.textContent)).toEqual(['items.0', 'items.1']);

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(screen.getAllByRole('listitem').map(item => item.textContent)).toEqual([
        'items.0',
        'items.1',
        'items.2'
      ]);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Remove first' }));

    await waitFor(() => {
      expect(screen.getAllByRole('listitem').map(item => item.textContent)).toEqual(['items.0', 'items.1']);
    });
  });
});

describe('ComputedField integration', () => {
  it('should recompute read-only values when dependencies change', async () => {
    render(
      <Form initialValues={{ quantity: 2, total: 10, unitPrice: 5 }}>
        <Field name="quantity">
          <input aria-label="Quantity" type="number" />
        </Field>
        <Field name="unitPrice">
          <input aria-label="Unit price" type="number" />
        </Field>
        <ComputedField
          compute={get => Number(get('quantity') || 0) * Number(get('unitPrice') || 0)}
          deps={['quantity', 'unitPrice']}
          name="total"
        >
          <input aria-label="Total" />
        </ComputedField>
      </Form>
    );

    const total = screen.getByLabelText('Total');

    expect(total).toHaveValue('10');
    expect(total).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '3' } });

    await waitFor(() => {
      expect(total).toHaveValue('15');
    });
  });
});
