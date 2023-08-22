import MagicString from 'magic-string';
import { walk } from 'estree-walker';
import { prefix } from './constant.js';
import type { Node } from 'estree';
import type { Plugin } from 'vite';

export default {
    name: 'module-prefix-transform',
    transform(code, id) {
        if (!code.includes(prefix)) return;
        const ast = this.parse(code) as Node;
        let ms: MagicString | undefined;
        walk(ast, {
            enter(node) {
                if (!('source' in node)) return;
                const { source } = node;
                if (!source) return;
                if (source.type !== 'Literal') return;
                const { value } = source;
                if (typeof value !== 'string') return;
                if (!value.startsWith(prefix)) return;
                // @ts-ignore
                const start = source.start + 1;
                ms ??= new MagicString(code);
                ms.overwrite(start, start + prefix.length, '');
            },
        });
        if (!ms) return;
        return {
            code: ms.toString(),
            map: ms.generateMap({
                file: id,
                includeContent: true,
                hires: true
            }),
        };
    },
} as Plugin;
