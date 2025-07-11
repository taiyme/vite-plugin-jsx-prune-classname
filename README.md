# @taiyme/vite-plugin-jsx-prune-classname

[![Version](https://img.shields.io/npm/v/%40taiyme%2Fvite-plugin-jsx-prune-classname?style=flat)](https://www.npmjs.com/package/@taiyme/vite-plugin-jsx-prune-classname)
[![License](https://img.shields.io/npm/l/%40taiyme%2Fvite-plugin-jsx-prune-classname?style=flat)](./LICENSE)
[![Donate](https://img.shields.io/badge/donate-%3C3-f96854?style=flat)](https://taiy.me/to/donate)

classNameの余分なスペースを除去する[Vite](https://vite.dev/)プラグインです。

もともと[taiyのサイトのリポジトリ](https://github.com/taiyme/taiy.me)で自前実装していたものを、配布可能な形式にしました。

## インストール

※ pnpmではない場合は各自で読み替えてください。

次のパッケージをインストールします。

- `vite`
- `@taiyme/vite-plugin-jsx-prune-classname`

```sh
pnpm add -D vite @taiyme/vite-plugin-jsx-prune-classname
```

## セットアップ

### `vite.config.ts` の設定

`vite.config.ts` を作成し、次のように構成します。

```ts
import jsxPruneClassName from '@taiyme/vite-plugin-jsx-prune-classname';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    jsxPruneClassName(),
    // ...
  ],
});
```

### オプションの設定

オプションは、プラグイン関数の第一引数に指定します。

```ts
jsxPruneClassName({
  // ...
});
```

オプション一覧はソースコードを参照してください: [options.ts](./src/options.ts)

## 仕様

テストコードを参照してください: [transform.spec.ts](./src/transform.spec.ts)

## ライセンス

[MIT License](./LICENSE)
