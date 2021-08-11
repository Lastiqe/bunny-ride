import * as PIXI from "pixi.js";
export declare class Star extends PIXI.Sprite {
    private anim;
    constructor(direction: number);
    startAnim(): void;
    stopAnim(): void;
}
