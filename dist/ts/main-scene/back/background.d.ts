import * as PIXI from "pixi.js";
export declare class Background extends PIXI.TilingSprite {
    constructor();
    animStart(): void;
    reinit(): void;
    animStop(): void;
    private bgAnim;
}
