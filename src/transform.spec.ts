import type { Options } from '@/options.js';
import { transform as internalTransform } from '@/transform.js';

export function transform(input: string, options?: Options) {
  return internalTransform(input, options)?.code ?? '';
}

type CharCase = {
  char_name: string;
  char_value: string;
};

const whitespace_cases: CharCase[] = [
  { char_name: '半角スペース', char_value: ' ' },
  { char_name: '全角スペース', char_value: '　' },
  { char_name: 'タブ', char_value: '\t' },
  { char_name: '混在したスペース', char_value: ' 　\t' },
];

const newline_cases: CharCase[] = [
  { char_name: '改行', char_value: '\n' },
];

describe('transform関数', () => {
  describe('classNameが文字列リテラルの場合', () => {
    it('2回実行しても結果が変わらない', () => {
      const input = '<div className=" iroha " />;';
      const once = transform(input);
      const twice = transform(once);
      expect(twice).toBe(once);
    });

    it('前後に何もなければそのまま', () => {
      const input = '<div className="iroha" />;';
      const output = transform(input);
      expect(output).toBe(input);
    });

    it.each([
      ...whitespace_cases,
      ...newline_cases,
    ])('前後の $char_name を削除する', ({ char_value }) => {
      const input = `<div className="${char_value}iroha${char_value}" />;`;
      const output = transform(input);
      expect(output).toBe('<div className="iroha" />;');
    });

    it.each([
      ...whitespace_cases,
      ...newline_cases,
    ])('連続する $char_name をスペース1つに変換する', ({ char_value }) => {
      const input = `<div className="iroha${char_value}${char_value}mito" />;`;
      const output = transform(input);
      expect(output).toBe('<div className="iroha mito" />;');
    });

    it.each([
      ...whitespace_cases,
      ...newline_cases,
    ])('$char_name のみの場合は空文字に変換する', ({ char_value }) => {
      const input = `<div className="${char_value}${char_value}" />;`;
      const output = transform(input);
      expect(output).toBe('<div className="" />;');
    });

    it('一重引用符はそのまま', () => {
      const input = '<div className="gekidan before:content-[\'denki\']" />;';
      const output = transform(input);
      expect(output).toBe(input);
    });

    it('二重引用符をエスケープする', () => {
      const input = '<div className=\'gekidan before:content-["denki"]\' />;';
      const output = transform(input);
      expect(output).toBe('<div className="gekidan before:content-[&quot;denki&quot;]" />;');
    });
  });

  describe('classNameがJSX式 (文字列リテラル) の場合', () => {
    it('2回実行しても結果が変わらない', () => {
      const input = '<div className={" iroha "} />;';
      const once = transform(input);
      const twice = transform(once);
      expect(twice).toBe(once);
    });

    it('前後に何もなければ文字列リテラルに変換する', () => {
      const input = '<div className={"iroha"} />;';
      const output = transform(input);
      expect(output).toBe('<div className="iroha" />;');
    });

    it.each([
      ...whitespace_cases,
    ])('前後の $char_name を削除して、文字列リテラルに変換する', ({ char_value }) => {
      const input = `<div className={"${char_value}iroha${char_value}"} />;`;
      const output = transform(input);
      expect(output).toBe('<div className="iroha" />;');
    });

    it.each([
      ...whitespace_cases,
    ])('連続する $char_name をスペース1つに変換して、文字列リテラルに変換する', ({ char_value }) => {
      const input = `<div className={"iroha${char_value}${char_value}mito"} />;`;
      const output = transform(input);
      expect(output).toBe('<div className="iroha mito" />;');
    });

    it.each([
      ...whitespace_cases,
    ])('$char_name のみの場合は空文字に変換して、文字列リテラルに変換する', ({ char_value }) => {
      const input = `<div className={"${char_value}${char_value}"} />;`;
      const output = transform(input);
      expect(output).toBe('<div className="" />;');
    });

    it('一重引用符はそのままで、文字列リテラルに変換する', () => {
      const input = '<div className={"gekidan before:content-[\'denki\']"} />;';
      const output = transform(input);
      expect(output).toBe('<div className="gekidan before:content-[\'denki\']" />;');
    });

    it('二重引用符をエスケープして、文字列リテラルに変換する', () => {
      const input = '<div className={\'gekidan before:content-["denki"]\'} />;';
      const output = transform(input);
      expect(output).toBe('<div className="gekidan before:content-[&quot;denki&quot;]" />;');
    });
  });

  describe('classNameがJSX式 (プレースホルダー無しのテンプレートリテラル) の場合', () => {
    it('2回実行しても結果が変わらない', () => {
      const input = '<div className={` iroha `} />;';
      const once = transform(input);
      const twice = transform(once);
      expect(twice).toBe(once);
    });

    it('前後に何もなければ文字列リテラルに変換する', () => {
      const input = '<div className={`iroha`} />;';
      const output = transform(input);
      expect(output).toBe('<div className="iroha" />;');
    });

    it.each([
      ...whitespace_cases,
      ...newline_cases,
    ])('前後の $char_name を削除して、文字列リテラルに変換する', ({ char_value }) => {
      const input = `<div className={\`${char_value}iroha${char_value}\`} />;`;
      const output = transform(input);
      expect(output).toBe('<div className="iroha" />;');
    });

    it.each([
      ...whitespace_cases,
      ...newline_cases,
    ])('連続する $char_name をスペース1つに変換して、文字列リテラルに変換する', ({ char_value }) => {
      const input = `<div className={\`iroha${char_value}${char_value}mito\`} />;`;
      const output = transform(input);
      expect(output).toBe('<div className="iroha mito" />;');
    });

    it.each([
      ...whitespace_cases,
    ])('$char_name のみの場合は空文字に変換して、文字列リテラルに変換する', ({ char_value }) => {
      const input = `<div className={\`${char_value}${char_value}\`} />;`;
      const output = transform(input);
      expect(output).toBe('<div className="" />;');
    });

    it('一重引用符はそのままで、文字列リテラルに変換する', () => {
      const input = '<div className={`gekidan before:content-[\'denki\']`} />;';
      const output = transform(input);
      expect(output).toBe('<div className="gekidan before:content-[\'denki\']" />;');
    });

    it('二重引用符をエスケープして、文字列リテラルに変換する', () => {
      const input = '<div className={`gekidan before:content-["denki"]`} />;';
      const output = transform(input);
      expect(output).toBe('<div className="gekidan before:content-[&quot;denki&quot;]" />;');
    });
  });

  describe('classNameがJSX式 (プレースホルダー付きテンプレートリテラル) の場合', () => {
    it('2回実行しても結果が変わらない', () => {
      const input = '<div className={` ${"iroha"} `} />;';
      const once = transform(input);
      const twice = transform(once);
      expect(twice).toBe(once);
    });

    it('前後に何もなければそのまま', () => {
      const input = '<div className={`${"iroha"}`} />;';
      const output = transform(input);
      expect(output).toBe(input);
    });

    it.each([
      ...whitespace_cases,
      ...newline_cases,
    ])('前後の $char_name を削除する', ({ char_value }) => {
      const input = `<div className={\`${char_value}\${"iroha"}${char_value}\`} />;`;
      const output = transform(input);
      expect(output).toBe('<div className={`${"iroha"}`} />;');
    });

    it.each([
      ...whitespace_cases,
      ...newline_cases,
    ])('連続する $char_name をスペース1つに変換する', ({ char_value }) => {
      const input = `<div className={\`\${"iroha"}${char_value}${char_value}\${"mito"}\`} />;`;
      const output = transform(input);
      expect(output).toBe('<div className={`${"iroha"} ${"mito"}`} />;');
    });

    it('一重引用符はそのまま', () => {
      const input = '<div className={`${"gekidan"} before:content-[\'denki\']`} />;';
      const output = transform(input);
      expect(output).toBe(input);
    });

    it('二重引用符はそのまま', () => {
      const input = '<div className={`${"gekidan"} before:content-["denki"]`} />;';
      const output = transform(input);
      expect(output).toBe(input);
    });

    it.each([
      ...whitespace_cases,
    ])('プレースホルダー・文字列リテラル内の $char_name はそのまま', ({ char_value }) => {
      const input = `<div className={\`\${"${char_value}iroha${char_value}"}\`} />;`;
      const output = transform(input);
      expect(output).toBe(input);
    });

    it.each([
      ...whitespace_cases,
    ])('プレースホルダー・入れ子テンプレートリテラル内の $char_name はそのまま', ({ char_value }) => {
      const input = `<div className={\`\${\`${char_value}iroha${char_value}\`}\`} />;`;
      const output = transform(input);
      expect(output).toBe(input);
    });
  });

  describe('attributes を設定した場合', () => {
    it('設定した属性で変換する', () => {
      const input = '<div data-iromito="  iroha  mito  " />;';
      const output = transform(input, {
        attributes: ['data-iromito'],
      });
      expect(output).toBe('<div data-iromito="iroha mito" />;');
    });

    it('設定した属性以外はそのまま', () => {
      const input = '<div className="  iroha  mito  " />;';
      const output = transform(input, {
        attributes: ['data-iromito'],
      });
      expect(output).toBe(input);
    });
  });
});
