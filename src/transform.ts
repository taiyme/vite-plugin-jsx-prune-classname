import type { StringLiteral, TemplateElement } from '@babel/types';

import { DEFAULT_OPTIONS, type Options } from './options.js';
import { generate, parse, traverse } from './utils/babel.js';
import { pruneClassName } from './utils/pruneClassName.js';
import { toStringLiteral } from './utils/toStringLiteral.js';

export function transform(sourceCode: string, options?: Options) {
  const { attributes } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  if (attributes.length === 0) return;

  const ast = parse(sourceCode, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  traverse(ast, {
    JSXAttribute(path) {
      if (
        path.node.name.type === 'JSXIdentifier'
        && attributes.includes(path.node.name.name)
      ) {
        // className="..."
        if (path.node.value?.type === 'StringLiteral') {
          path.node.value = {
            ...path.node.value,
            value: pruneClassName(path.node.value.value),
          } satisfies StringLiteral;

          return;
        }

        // className={...}
        if (path.node.value?.type === 'JSXExpressionContainer') {
          const { expression: exprItem } = path.node.value;

          // className={"..."}
          if (exprItem.type === 'StringLiteral') {
            path.node.value = {
              ...exprItem,
              value: pruneClassName(exprItem.value),
            } satisfies StringLiteral;

            return;
          }

          // className={`...`}
          if (
            exprItem.type === 'TemplateLiteral'
            && exprItem.quasis.length === 1
          ) {
            const strItem = toStringLiteral(exprItem.quasis[0]);

            if (strItem?.type === 'StringLiteral') {
              path.node.value = {
                ...strItem,
                value: pruneClassName(strItem.value),
              } satisfies StringLiteral;

              return;
            }

            return;
          }

          // className={`${...}`}
          if (
            exprItem.type === 'TemplateLiteral'
            && exprItem.quasis.length > 1
          ) {
            exprItem.quasis = exprItem.quasis.map((quasiItem, index) => {
              const trimOption = {
                keepLeadingSpace: index !== 0,
                keepTrailingSpace: !quasiItem.tail,
                keepRawQuote: true,
              };

              return {
                ...quasiItem,
                value: {
                  raw: pruneClassName(quasiItem.value.raw, trimOption),
                  cooked: pruneClassName(quasiItem.value.cooked, trimOption),
                },
              } satisfies TemplateElement;
            });

            return;
          }
        }
      }
    },
  });

  const { code, map } = generate(ast);

  return { code, map } as const;
}
