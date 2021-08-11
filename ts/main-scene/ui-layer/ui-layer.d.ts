import * as PIXI from "pixi.js";
export declare class UiLayer extends PIXI.Container {
    private scoreTextStyle;
    private scorePlate;
    private scoreText;
    private fullScreenBtn;
    private pauseBtn;
    private soundModeBtn;
    private soundOnBtnTextures;
    private soundOffBtnTextures;
    private isSoundOn?;
    constructor();
    private initButtons;
    private toggleSoundMode;
}
