import { tag } from './constant.js';
import getIdMatcher from './rollup.utils.js';
import modulePrefixTransform from './moduleprefixtransform.js';
import type { ExternalOption } from 'rollup';
import type { Plugin } from 'vite';
import type { External } from './rollup.utils.js';

interface PluginOptions {
    external?: ExternalOption | boolean;
}

function externalize(options?: PluginOptions): Plugin {
    let external: External;

    return {
        name: 'vite-plugin-externalize',
        apply: 'serve',
        enforce: 'pre',
        configResolved({ plugins, build: { rollupOptions } }) {
            external = getIdMatcher(options?.external ?? rollupOptions.external);
            Array.prototype.push.call(plugins, modulePrefixTransform);
        },
        resolveId(source, importer) {
            if (external(source, importer, false))
                return `${tag}${source}`;
        },
        load(id) {
            if (id.startsWith(tag)) return 'export{}';
        },
    };
}

export type { PluginOptions };
export default externalize;
