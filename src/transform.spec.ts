import type { Options } from './options.js';
import { transform as internalTransform } from './transform.js';

export function transform(input: string, options?: Options) {
  return internalTransform(input, options)?.code ?? '';
}

describe('文字列リテラル', () => {
  it('前後のスペースをトリムする', () => {
    const input = '<div className=" iroha " />;';
    const output = transform(input);
    expect(output).toBe('<div className="iroha" />;');
  });

  it('前後の改行をトリムする', () => {
    const input = '<div className="\niroha\n" />;';
    const output = transform(input);
    expect(output).toBe('<div className="iroha" />;');
  });

  it('前後にスペースが無ければ何もしない', () => {
    const input = '<div className="iroha" />;';
    const output = transform(input);
    expect(output).toBe(input);
  });

  it('連続するスペースを1つにまとめる', () => {
    const input = '<div className="iroha  mito" />;';
    const output = transform(input);
    expect(output).toBe('<div className="iroha mito" />;');
  });

  it('連続する改行をスペース1つにまとめる', () => {
    const input = '<div className="iroha\n\nmito" />;';
    const output = transform(input);
    expect(output).toBe('<div className="iroha mito" />;');
  });

  it('一重引用符はエスケープしない', () => {
    const input = '<div className="gekidan before:content-[\'denki\']" />;';
    const output = transform(input);
    expect(output).toBe('<div className="gekidan before:content-[\'denki\']" />;');
  });

  it('二重引用符をエスケープする', () => {
    const input = '<div className=\'gekidan before:content-["denki"]\' />;';
    const output = transform(input);
    expect(output).toBe('<div className="gekidan before:content-[&quot;denki&quot;]" />;');
  });
});

describe('JSX式', () => {
  describe('文字列リテラル', () => {
    it('前後のスペースをトリムして単純化する', () => {
      const input = '<div className={" iroha "} />;';
      const output = transform(input);
      expect(output).toBe('<div className="iroha" />;');
    });

    it('前後のスペースをトリムして単純化する', () => {
      const input = '<div className={" iroha "} />;';
      const output = transform(input);
      expect(output).toBe('<div className="iroha" />;');
    });

    it('前後にスペースが無ければそのまま単純化する', () => {
      const input = '<div className={"iroha"} />;';
      const output = transform(input);
      expect(output).toBe('<div className="iroha" />;');
    });

    it('連続するスペースを1つにまとめて単純化する', () => {
      const input = '<div className={"iroha  mito"} />;';
      const output = transform(input);
      expect(output).toBe('<div className="iroha mito" />;');
    });

    it('一重引用符はそのままで単純化する', () => {
      const input = '<div className={"gekidan before:content-[\'denki\']"} />;';
      const output = transform(input);
      expect(output).toBe('<div className="gekidan before:content-[\'denki\']" />;');
    });

    it('二重引用符をエスケープして単純化する', () => {
      const input = '<div className={\'gekidan before:content-["denki"]\'} />;';
      const output = transform(input);
      expect(output).toBe('<div className="gekidan before:content-[&quot;denki&quot;]" />;');
    });
  });

  describe('[式無し]テンプレートリテラル', () => {
    it('前後のスペースをトリムして単純化する', () => {
      const input = '<div className={` iroha `} />;';
      const output = transform(input);
      expect(output).toBe('<div className="iroha" />;');
    });

    it('前後の改行をトリムして単純化する', () => {
      const input = '<div className={`\niroha\n`} />;';
      const output = transform(input);
      expect(output).toBe('<div className="iroha" />;');
    });

    it('前後にスペースが無ければそのまま単純化する', () => {
      const input = '<div className={`iroha`} />;';
      const output = transform(input);
      expect(output).toBe('<div className="iroha" />;');
    });

    it('連続するスペースを1つにまとめて単純化する', () => {
      const input = '<div className={`iroha  mito`} />;';
      const output = transform(input);
      expect(output).toBe('<div className="iroha mito" />;');
    });

    it('連続する改行をスペース1つにまとめて単純化する', () => {
      const input = '<div className={`iroha\n\nmito`} />;';
      const output = transform(input);
      expect(output).toBe('<div className="iroha mito" />;');
    });

    it('一重引用符はそのままで単純化する', () => {
      const input = '<div className={`gekidan before:content-[\'denki\']`} />;';
      const output = transform(input);
      expect(output).toBe('<div className="gekidan before:content-[\'denki\']" />;');
    });

    it('二重引用符をエスケープして単純化する', () => {
      const input = '<div className={`gekidan before:content-["denki"]`} />;';
      const output = transform(input);
      expect(output).toBe('<div className="gekidan before:content-[&quot;denki&quot;]" />;');
    });
  });

  describe('[式有り]テンプレートリテラル', () => {
    it('前後のスペースをトリムする', () => {
      const input = '<div className={` ${"iroha"} `} />;';
      const output = transform(input);
      expect(output).toBe('<div className={`${"iroha"}`} />;');
    });

    it('前後の改行をトリムする', () => {
      const input = '<div className={`\n${"iroha"}\n`} />;';
      const output = transform(input);
      expect(output).toBe('<div className={`${"iroha"}`} />;');
    });

    it('前後にスペースが無ければ何もしない', () => {
      const input = '<div className={`${"iroha"}`} />;';
      const output = transform(input);
      expect(output).toBe('<div className={`${"iroha"}`} />;');
    });

    it('連続するスペースを1つにまとめる', () => {
      const input = '<div className={`${"iroha"}  ${"mito"}`} />;';
      const output = transform(input);
      expect(output).toBe('<div className={`${"iroha"} ${"mito"}`} />;');
    });

    it('連続する改行をスペース1つにまとめる', () => {
      const input = '<div className={`${"iroha"}\n\n${"mito"}`} />;';
      const output = transform(input);
      expect(output).toBe('<div className={`${"iroha"} ${"mito"}`} />;');
    });

    it('一重引用符はエスケープしない', () => {
      const input = '<div className={`${"gekidan"} before:content-[\'denki\']`} />;';
      const output = transform(input);
      expect(output).toBe('<div className={`${"gekidan"} before:content-[\'denki\']`} />;');
    });

    it('二重引用符はエスケープしない', () => {
      const input = '<div className={`${"gekidan"} before:content-["denki"]`} />;';
      const output = transform(input);
      expect(output).toBe('<div className={`${"gekidan"} before:content-["denki"]`} />;');
    });

    it('プレースホルダー内のスペースはトリムしない', () => {
      const input = '<div className={`${" iroha "}`} />;';
      const output = transform(input);
      expect(output).toBe('<div className={`${" iroha "}`} />;');
    });

    it('プレースホルダー内の改行はトリムしない', () => {
      const input = '<div className={`${`\niroha\n`}`} />;';
      const output = transform(input);
      expect(output).toBe('<div className={`${`\niroha\n`}`} />;');
    });
  });
});

describe('オプション', () => {
  it('任意の属性でトリムできる', () => {
    const input = '<div data-iromito="  iroha  mito  " />;';
    const output = transform(input, {
      attributes: ['data-iromito'],
    });
    expect(output).toBe('<div data-iromito="iroha mito" />;');
  });

  it('任意の属性を指定した場合、デフォルトの属性では何もしない', () => {
    const input = '<div className="  iroha  mito  " />;';
    const output = transform(input, {
      attributes: ['data-iromito'],
    });
    expect(output).toBe('<div className="  iroha  mito  " />;');
  });
});
