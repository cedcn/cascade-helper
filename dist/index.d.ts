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
export declare const generateRandomString: (level?: number, index?: number) => string;
declare class CascadeHelper {
    subKey: string;
    valueKey: string;
    constructor(subKey?: string, valueKey?: string);
    flatten(cascades: Cascade[], labels?: string[], itemSeparator?: string, endLevel?: number): FlattenResult[];
    cascadesFill(cascades?: Cascade[], count?: number, geterateFunc?: (level: number, index: number) => Cascade, startLevel?: number, endLevel?: number): Cascade[];
    cascadesForEach(cascades: Cascade[], cb: (cascade: Cascade, currentlevel?: number, currentIndex?: number) => void, startLevel?: number, endLevel?: number): void;
    initValues(cascades: Cascade[], levelCount: number, index?: number): Values;
    getLevelCascades(cascades: Cascade[], values: Values, level: number): {
        cascades: Cascade[];
        path: string;
        parent: Cascade | null;
    };
    parse(str: string, cb: (key: string, valueKey: string, level: number, index: number) => Cascade, itemSeparator?: string, levelSeparator?: string): Cascade[];
    stringify(cascades: Cascade[], label: string, itemSeparator?: string, levelSeparator?: string, endLevel?: number): string;
}
export default CascadeHelper;
