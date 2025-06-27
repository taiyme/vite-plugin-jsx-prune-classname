export function pruneClassName<T extends string | undefined>(
  str: T,
  opt?: {
    keepLeadingSpace?: boolean;
    keepTrailingSpace?: boolean;
    keepRawQuote?: boolean;
  },
) {
  if (str == null || str === '') return str;

  let result = str.replace(/\s+/g, ' ');

  if (!opt?.keepRawQuote) {
    result = result.replace(/"/g, '&quot;');
  }

  if (!opt?.keepLeadingSpace && result.startsWith(' ')) {
    result = result.trimStart();
  }

  if (!opt?.keepTrailingSpace && result.endsWith(' ')) {
    result = result.trimEnd();
  }

  return result;
}
