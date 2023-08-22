// https://github.com/rollup/rollup/blob/ef820b637a8d6f8f51955a1d3163de81c7830249/src/utils/options/normalizeInputOptions.ts#L112
// https://github.com/rollup/rollup/blob/ef820b637a8d6f8f51955a1d3163de81c7830249/src/utils/ensureArray.ts#L1

import type { ExternalOption } from 'rollup';

function ensureArray<T>(items: T[] | T): T[] {
    if (Array.isArray(items)) return items.filter(Boolean) as T[];
    if (items) return [items];
    return [];
}

interface External {
    (source: string, importer: string | undefined, isResolved: boolean): boolean;
}

function getIdMatcher(option?: ExternalOption | boolean): External {
    if (!option) return () => false;
    if (option === true) return () => true;
    if (typeof option === 'function') return function (id) {
        return !id.startsWith('\0') && Reflect.apply(option, undefined, arguments);
    };
    const ids = new Set<string>();
    const matchers: RegExp[] = [];
    for (const value of ensureArray(option)) {
        if (value instanceof RegExp) matchers.push(value);
        else ids.add(value);
    }
    return (id: string) => ids.has(id) || matchers.some(matcher => matcher.test(id));
};

export type { External };
export default getIdMatcher;
