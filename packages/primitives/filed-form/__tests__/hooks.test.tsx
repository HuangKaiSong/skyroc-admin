import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FormStore from '../src/form-core/createStore';
import type { FormInstance } from '../src/react';
import { Field, Form, List, useArrayField, useEffectField, useForm, useSelector, useUndoRedo, useWatch } from '../src/react';

interface HookValues {
  /** 用户邮箱，用于多字段 watch */
  email: string;
  /** 动态列表，用于数组字段 hook */
  items: { title: string }[];
  /** 用户名，用于 watch 和 effect 订阅 */
  name: string;
  /** 数量，用于 selector 派生计算 */
  quantity: number;
  /** 单价，用于 selector 派生计算 */
  unitPrice: number;
}

interface WatchSelectorEffectPanelProps {
  /** 接收 useEffectField 被触发时读取到的用户名 */
  onEffect: (value: string) => void;
}

const WatchSelectorEffectPanel = (props: WatchSelectorEffectPanelProps) => {
  const { onEffect } = props;
  const name = useWatch<HookValues, 'name'>('name', {} as any);
  const selected = useWatch<HookValues, 'email' | 'name'>(['name', 'email'], {} as any) as Pick<
    HookValues,
    'email' | 'name'
  >;
  const values = useWatch<HookValues>() as HookValues;
  const total = useSelector<HookValues, number>(
    get => Number(get('quantity') || 0) * Number(get('unitPrice') || 0),
    { deps: ['quantity', 'unitPrice'] }
  );

  useEffectField<HookValues>(['name'], get => {
    onEffect(String(get('name')));
  });

  return (
    <>
      <output aria-label="Single name">{name}</output>
      <output aria-label="Selected email">{selected.email}</output>
      <output aria-label="All values">{JSON.stringify(values)}</output>
      <output aria-label="Total">{total}</output>
    </>
  );
};

interface ArrayFieldPanelProps {
  /** 新增列表项标题 */
  title: string;
}

const ArrayFieldPanel = (props: ArrayFieldPanelProps) => {
  const { title } = props;
  const items = useWatch<HookValues, 'items'>('items', {} as any);
  const ops = useArrayField<HookValues>('items');

  return (
    <>
      <output aria-label="Item count">{items.length}</output>
      <button type="button" onClick={() => ops.insert(items.length, { title })}>
        Add item
      </button>
      <button type="button" onClick={() => ops.remove(0)}>
        Remove first
      </button>
    </>
  );
};

interface UndoControlsProps {
  /** 当前表单实例，用于注册 undo/redo 中间件 */
  form: FormInstance<UndoValues>;
}

interface UndoValues {
  /** 动态列表，用于覆盖数组操作撤销 */
  items: { title: string }[];
  /** 标题字段，用于覆盖字段值撤销 */
  title: string;
}

const UndoControls = (props: UndoControlsProps) => {
  const { form } = props;
  const { canRedo, canUndo, redo, undo } = useUndoRedo(form);

  return (
    <>
      <button disabled={!canUndo} type="button" onClick={undo}>
        Undo
      </button>
      <button disabled={!canRedo} type="button" onClick={redo}>
        Redo
      </button>
    </>
  );
};

interface UndoExampleProps {
  /** 标题初始值 */
  initialTitle: string;
}

const UndoExample = (props: UndoExampleProps) => {
  const { initialTitle } = props;
  const [form] = useForm<UndoValues>();

  return (
    <Form form={form} initialValues={{ items: [{ title: 'A' }], title: initialTitle }}>
      <Field name="title">
        <input aria-label="Title" />
      </Field>
      <List name="items">
        {(fields, ops) => (
          <>
            <output aria-label="Undo item count">{fields.length}</output>
            <button type="button" onClick={() => ops.insert(fields.length, { title: 'B' })}>
              Add undo item
            </button>
          </>
        )}
      </List>
      <UndoControls form={form} />
    </Form>
  );
};

describe('form hooks', () => {
  it('should reuse an externally provided form instance', () => {
    const external = new FormStore().getForm() as FormInstance<HookValues>;
    const replacement = new FormStore().getForm() as FormInstance<HookValues>;
    const { rerender, result } = renderHook(
      (props: { form: FormInstance<HookValues> }) => useForm<HookValues>(props.form),
      { initialProps: { form: external } }
    );

    expect(result.current[0]).toBe(external);

    rerender({ form: replacement });

    expect(result.current[0]).toBe(external);
  });

  it('should watch fields, derive selector values, and run field effects', async () => {
    const onEffect = vi.fn();

    render(
      <Form
        initialValues={{
          email: 'ada@example.com',
          items: [],
          name: 'Ada',
          quantity: 2,
          unitPrice: 5
        }}
      >
        <Field name="name">
          <input aria-label="Name" />
        </Field>
        <Field name="quantity">
          <input aria-label="Quantity" type="number" />
        </Field>
        <WatchSelectorEffectPanel onEffect={onEffect} />
      </Form>
    );

    expect(screen.getByLabelText('Single name')).toHaveTextContent('Ada');
    expect(screen.getByLabelText('Selected email')).toHaveTextContent('ada@example.com');
    expect(screen.getByLabelText('All values')).toHaveTextContent('"quantity":2');
    expect(screen.getByLabelText('Total')).toHaveTextContent('10');

    fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '3' } });

    await waitFor(() => {
      expect(screen.getByLabelText('Total')).toHaveTextContent('15');
    });

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Grace' } });

    await waitFor(() => {
      expect(screen.getByLabelText('Single name')).toHaveTextContent('Grace');
      expect(onEffect).toHaveBeenCalledWith('Grace');
    });
  });

  it('should expose array operations through useArrayField', async () => {
    render(
      <Form
        initialValues={{
          email: 'ada@example.com',
          items: [{ title: 'A' }],
          name: 'Ada',
          quantity: 1,
          unitPrice: 1
        }}
      >
        <List name="items">
          {fields => (
            <ul aria-label="Array fields">
              {fields.map(field => (
                <li key={field.key}>{field.name}</li>
              ))}
            </ul>
          )}
        </List>
        <ArrayFieldPanel title="B" />
      </Form>
    );

    expect(screen.getByLabelText('Item count')).toHaveTextContent('1');

    fireEvent.click(screen.getByRole('button', { name: 'Add item' }));

    await waitFor(() => {
      expect(screen.getByLabelText('Item count')).toHaveTextContent('2');
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Remove first' }));

    await waitFor(() => {
      expect(screen.getByLabelText('Item count')).toHaveTextContent('1');
    });
  });

  it('should throw when useArrayField is used without a form context', () => {
    expect(() => renderHook(() => useArrayField<HookValues>('items'))).toThrow(
      'Can not find FormContext. Please make sure you wrap Field under Form or provide a form instance.'
    );
  });

  it('should undo and redo field and array operations', async () => {
    render(<UndoExample initialTitle="Draft" />);

    const title = screen.getByLabelText('Title');
    const undo = screen.getByRole('button', { name: 'Undo' });
    const redo = screen.getByRole('button', { name: 'Redo' });

    expect(undo).toBeDisabled();
    expect(redo).toBeDisabled();

    fireEvent.change(title, { target: { value: 'Published' } });

    await waitFor(() => {
      expect(undo).toBeEnabled();
      expect(title).toHaveValue('Published');
    });

    fireEvent.click(undo);

    await waitFor(() => {
      expect(title).toHaveValue('Draft');
      expect(redo).toBeEnabled();
    });

    fireEvent.click(redo);

    await waitFor(() => {
      expect(title).toHaveValue('Published');
    });

    fireEvent.click(screen.getByRole('button', { name: 'Add undo item' }));

    await waitFor(() => {
      expect(screen.getByLabelText('Undo item count')).toHaveTextContent('2');
    });

    fireEvent.click(undo);

    await waitFor(() => {
      expect(screen.getByLabelText('Undo item count')).toHaveTextContent('1');
    });
  });
});
