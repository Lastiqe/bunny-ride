import * as PIXI from "pixi.js";
export declare class Button extends PIXI.AnimatedSprite {
    private onClickCallback;
    constructor(buttonTexture: PIXI.Texture[], onClickCallback: () => void);
    setOffMode(): void;
    setOnMode(): void;
    private getStateTexture;
    private onHover;
    private setDefaultState;
    private onPointerDown;
    private onClick;
}
