import * as React from 'react';
import * as Lucide from 'lucide-react';
import * as WebUI from '@skyroc/web-ui';

/**
 * react-live 通过 `new Function(...scopeKeys, code)` 执行 demo，
 * scope 的 key 会被当作函数参数名，所以必须过滤掉 JS 保留字与非法标识符，
 * 否则会得到 `SyntaxError: Unexpected token 'default'`（ESM interop 的 `default` 键就是凶手）。
 */
const RESERVED = new Set([
  'default',
  'arguments',
  'eval',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'interface',
  'let',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield'
]);

const IDENT_RE = /^[$A-Z_a-z][\w$]*$/;

function safeAssign(target: Record<string, unknown>, source: Record<string, unknown>): void {
  for (const key of Object.keys(source)) {
    if (RESERVED.has(key)) continue;
    if (!IDENT_RE.test(key)) continue;
    target[key] = source[key];
  }
}

const scope: Record<string, unknown> = { React };

safeAssign(scope, React as unknown as Record<string, unknown>);
safeAssign(scope, WebUI as unknown as Record<string, unknown>);
safeAssign(scope, Lucide as unknown as Record<string, unknown>);

export const demoScope = scope;

export const scopeKeys: ReadonlySet<string> = new Set(Object.keys(demoScope));
