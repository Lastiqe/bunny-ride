import * as PIXI from "pixi.js";
export declare abstract class Popup extends PIXI.Container {
    private popup;
    protected title: PIXI.Sprite;
    protected titleText: PIXI.Text;
    constructor();
    show(): void;
    hide(): void;
    protected setTitleText(titleText: string): void;
    private initHeader;
}
