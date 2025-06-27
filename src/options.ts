export type Options = Readonly<{
  /**
   * classNameとして扱う属性名
   * @type {string[] | undefined}
   * @default ['class', 'className']
   */
  attributes?: string[];
}>;

export const DEFAULT_OPTIONS = {
  attributes: ['class', 'className'],
} as const satisfies Options;
