import * as PIXI from "pixi.js";
export declare class RecordLayer extends PIXI.Container {
    private stars;
    private rays;
    constructor();
    animStart(): void;
    animStop(): void;
    private initStars;
    private raysAnim;
}
