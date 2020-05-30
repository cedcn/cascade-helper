export interface Cascade {
    [key: string]: any;
}
interface Strs {
    [key: string]: string;
}
interface Values {
    [key: string]: any;
}
interface FlattenResult {
    strs: Strs;
    cascade: Cascade;
    path: string;
}
declare type DeepForEachCallback = (cascade: Cascade, currentLevel: number, currentIndex: number) => void;
declare type DeepMapCallback = (cascade: Cascade, currentLevel: number, currentIndex: number, path: string, parent?: Cascade) => void;
export declare const generateRandomString: (level?: number, index?: number) => string;
declare class CascadeHelper {
    subKey: string;
    valueKey: string;
    constructor(subKey?: string, valueKey?: string);
    deepFlatten(cascades: Cascade[], options?: {
        labels?: string[];
        itemSeparator?: string;
        endLevel?: number;
    }): FlattenResult[];
    deepFill(cascades?: Cascade[], options?: {
        count?: number;
        generateFunc?: (level: number, index: number) => Cascade;
        startLevel?: number;
        endLevel?: number;
    }): Cascade[];
    deepForEach(cascades: Cascade[], cb: DeepForEachCallback, options?: {
        startLevel?: number;
        endLevel?: number;
    }): void;
    deepMap(cascades: Cascade[], cb: DeepMapCallback, options?: {
        startLevel?: number;
    }): any[];
    initValues(cascades: Cascade[], levelCount: number, index?: number): Values;
    getLevelCascades(cascades: Cascade[], values: Values, level: number): {
        cascades: Cascade[];
        path: string;
        parent: Cascade | null;
    };
    parse(str: string, cb: (key: string, valueKey: string, level: number, index: number) => Cascade, options?: {
        itemSeparator?: string;
        levelSeparator?: string;
    }): Cascade[];
    stringify(cascades: Cascade[], label: string, options?: {
        itemSeparator?: string;
        levelSeparator?: string;
        endLevel?: number;
    }): string;
}
export default CascadeHelper;
