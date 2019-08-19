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
    flatten(cascades: Cascade[], labels?: string[], endLevel?: number): FlattenResult[];
    cascadesFill(cascades?: Cascade[], count?: number, startLevel?: number, endLevel?: number, geterateFunc?: (level: number, index: number) => Cascade): Cascade[];
    cascadesForEach(cascades: Cascade[], cb: (cascade: Cascade, currentlevel?: number, currentIndex?: number) => void, startLevel?: number, endLevel?: number): void;
    initValues(cascades: Cascade[], levels: number, index?: number): Values;
    getLevelCascades(cascades: Cascade[], values: Values, level: number): {
        cascades: Cascade[];
        path: string;
        parent: Cascade | null;
    };
}
export default CascadeHelper;
