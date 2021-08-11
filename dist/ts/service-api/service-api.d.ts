export interface IScore {
    name: string;
    score: number;
    date: string;
}
interface IScoreData {
    scoreArr: IScore[];
}
export declare function getScoreData(): Promise<IScoreData>;
export {};
