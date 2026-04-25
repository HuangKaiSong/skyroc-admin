interface PropItem {
  /** 属性名 */
  name: string;
  /** 说明 */
  description: string;
  /** 类型 */
  type: string;
  /** 默认值 */
  default?: string;
  /** 是否必填 */
  required?: boolean;
}

interface PropsTableProps {
  /** 表格数据 */
  data: PropItem[];
}

const PropsTable = (props: PropsTableProps) => {
  const { data } = props;

  return (
    <div className="props-table-wrap my-6 overflow-x-auto">
      <table className="props-table w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-fd-border text-left">
            <th className="whitespace-nowrap py-3 pr-4 font-semibold text-fd-foreground">属性</th>
            <th className="py-3 pr-4 font-semibold text-fd-foreground">说明</th>
            <th className="py-3 pr-4 font-semibold text-fd-foreground">类型</th>
            <th className="whitespace-nowrap py-3 font-semibold text-fd-foreground">默认值</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.name}
              className="border-b border-fd-border transition-colors hover:bg-fd-accent/5"
            >
              <td className="whitespace-nowrap py-3 pr-4 align-top">
                <code className="props-table-name font-mono text-[13px] font-semibold text-fd-foreground">
                  {item.name}
                </code>
              </td>
              <td className="py-3 pr-4 align-top text-fd-muted-foreground">
                {item.description}
              </td>
              <td className="py-3 pr-4 align-top">
                <code className="props-table-type font-mono text-[12px] text-fd-primary">
                  {item.type}
                </code>
              </td>
              <td className="whitespace-nowrap py-3 align-top">
                {item.default ? (
                  <code className="props-table-default font-mono text-[12px] text-fd-muted-foreground">
                    {item.default}
                  </code>
                ) : (
                  <span className="text-fd-muted-foreground/40">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { PropsTable };
export type { PropItem, PropsTableProps };
