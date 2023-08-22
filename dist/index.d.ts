import type { ExternalOption } from 'rollup';
import type { Plugin as Plugin_2 } from 'vite';

declare function externalize(options?: PluginOptions): Plugin_2;
export default externalize;

export declare interface PluginOptions {
    external?: ExternalOption;
}

export { }
