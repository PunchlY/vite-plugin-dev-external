# Vite插件: 外部化依赖项

开发过程中排除特定依赖项. 可以和`build.rollupOptions.external`很好的配合使用.

ps: 这只是一个补丁. 本插件破坏了插件的加载顺序.

该项目灵感来源于: [MilanKovacic/vite-plugin-externalize-dependencies](https://github.com/MilanKovacic/vite-plugin-externalize-dependencies)

## Installation

```sh
npm i -D vite-plugin-dev-external
```

## Usage

安装插件后，导入它，并将其添加到 Vite 配置中：

例如你使用了`socket.io`并开启了`socket.io`的`serveClient`选项:

```js
import { defineConfig } from 'vite';
import externalize from 'vite-plugin-dev-external';

export default defineConfig({
    build: {
        rollupOptions: {
            external: ['/socket.io/socket.io.esm.min.js'],
        },
    },
    plugins: [externalize()],
});
```

或者你只需要在开发中使用它:

```js
import { defineConfig } from 'vite';
import externalize from 'vite-plugin-dev-external';

export default defineConfig({
    plugins: [externalize({
        external: [
            'externalized-dependency',
            '/absolute/path/externalized-dependency',
        ],
    })],
});
```

本插件也能和`resolve.alias`选项很好配合:

```js
import { defineConfig } from 'vite';
import externalize from 'vite-plugin-dev-external';

export default defineConfig({
    build: {
        rollupOptions: {
            external: ['/socket.io/socket.io.esm.min.js'],
        },
    },
    resolve: {
        alias: {
            'socket.io': '/socket.io/socket.io.esm.min.js',
        },
    },
    plugins: [externalize()],
});
```

## Requirements

The plugin is intended to be consumed by Vite.

## License

This project is licensed under the MIT License.
