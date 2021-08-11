import * as PIXI from "pixi.js";
export declare class Stopper extends PIXI.Sprite {
    constructor();
    startAnim(): void;
    reinit(): void;
    getPos(): number;
    setPos(): void;
    private move;
}
