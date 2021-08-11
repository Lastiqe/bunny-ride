import * as PIXI from "pixi.js";
export declare class TableRow extends PIXI.Container {
    private scoreTextStyle;
    private placeTextStyle;
    private userName;
    private userScore;
    private namePlate;
    private scorePlate;
    private place;
    constructor(placeNum: number);
    setUserData(name: string, score: number | string): void;
    show(): void;
    private getPrizeFontColor;
}
