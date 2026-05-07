import { toTypeAnchorId, typeToReactNode } from './type-anchor';

interface TypeFieldDef {
  /** 说明 */
  description?: string;
  /** 字段名 */
  name: string;
  /** 是否必填 */
  required?: boolean;
  /** 类型 */
  type: string;
}

interface TypeDataDef {
  /** 说明 */
  description?: string;
  /** 字段列表 */
  fields: TypeFieldDef[];
  /** 类型名 */
  name: string;
}

interface TypeTableProps {
  /** 类型定义数据 */
  data: TypeDataDef[];
}

const TypeData = (props: TypeDataDef) => {
  const { description, fields, name } = props;

  const anchorId = toTypeAnchorId(name);

  return (
    <div className="not-prose mb-8">
      <h4 id={anchorId} className="text-lg font-semibold my-3 scroll-mt-24">
        {name}
      </h4>
      {description ? (
        <p className="text-sm text-fd-muted-foreground mb-3">{description}</p>
      ) : null}
      <table className="w-full table-fixed border-collapse text-[14px] leading-[1.7]">
        <colgroup>
          <col className="w-[20%]" />
          <col className="w-[40%]" />
          <col className="w-[40%]" />
        </colgroup>
        <thead>
          <tr className="border-b-2 border-fd-border">
            <th className="py-3 pr-4 text-left font-semibold text-fd-foreground">字段</th>
            <th className="py-3 pr-4 text-left font-semibold text-fd-foreground">类型</th>
            <th className="py-3 text-left font-semibold text-fd-foreground">说明</th>
          </tr>
        </thead>
        <tbody className="text-fd-foreground/90">
          {fields.map((field) => (
            <tr
              key={field.name}
              className="border-b border-fd-border/50 transition-colors duration-150 hover:bg-fd-accent/5"
            >
              <td className="break-all pl-3 py-3 pr-4 border-r align-top font-mono text-[13px] text-fd-primary">
                {field.name}
                {field.required ? (
                  <span className="ml-1 text-[11px] text-red-500" aria-label="必填" title="必填">
                    *
                  </span>
                ) : null}
              </td>
              <td className="break-all pl-3 py-3 pr-4 border-r align-top font-mono text-[13px] text-fd-foreground/65">
                {typeToReactNode(field.type)}
              </td>
              <td className="py-3 pl-3 align-top text-fd-foreground/75">
                {field.description || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TypeTable = (props: TypeTableProps) => {
  const { data } = props;

  return (
    <div>
      {data.map((item) => (
        <TypeData key={item.name} {...item} />
      ))}
    </div>
  );
};

interface UnionTypeProps {
  /** 说明 */
  description?: string;
  /** 类型名 */
  name: string;
  /** 联合类型字符串 */
  type: string;
}

const UnionType = (props: UnionTypeProps) => {
  const { description, name, type } = props;

  const anchorId = toTypeAnchorId(name);

  return (
    <div className="not-prose mb-6">
      <h4 id={anchorId} className="text-lg font-semibold my-3 scroll-mt-24">
        {name}
      </h4>
      {description ? (
        <p className="text-sm text-fd-muted-foreground mb-2">{description}</p>
      ) : null}
      <div className="pt-1 pb-3">
        <span className="inline font-mono text-[13px] px-2 py-1 text-fd-accent-foreground border border-fd-accent-foreground/15 rounded-md">
          {typeToReactNode(type)}
        </span>
      </div>
    </div>
  );
};

export { TypeTable, UnionType };
export type { TypeDataDef, TypeFieldDef, TypeTableProps, UnionTypeProps };
