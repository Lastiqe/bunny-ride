import * as PIXI from "pixi.js";
export declare class Bunny extends PIXI.AnimatedSprite {
    private isJumping;
    private gravity;
    private direction;
    private power;
    private jumpAt;
    private time;
    constructor();
    addJumpListener(): void;
    removeJumpListener(): void;
    private onJumpEvent;
    private jump;
    private onTick;
}
