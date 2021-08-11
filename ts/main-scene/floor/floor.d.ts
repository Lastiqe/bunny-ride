import * as PIXI from "pixi.js";
export declare class Floor extends PIXI.TilingSprite {
    private stopper;
    private score;
    constructor();
    reinit(): void;
    animStart(): void;
    animStop(): void;
    private floorAnim;
}
