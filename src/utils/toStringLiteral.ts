import type { StringLiteral, TemplateElement } from '@babel/types';

export function toStringLiteral<T extends TemplateElement | undefined>(node: T) {
  if (node == null) return null;

  const {
    type: _type,
    tail: _tail,
    value,
    ...rest
  } = node;

  if (value.cooked == null) return null;

  return {
    ...rest,
    type: 'StringLiteral',
    value: value.cooked,
  } satisfies StringLiteral as StringLiteral;
}
