import * as PIXI from "pixi.js";
import { AssetLoader } from "./asset-loader/asset-loader";
import { MainScene } from "./main-scene/main-scene";
declare class BunnyApp extends PIXI.Application {
    mainScene: MainScene;
    loader: AssetLoader;
    isNewRecord: boolean;
    private _score;
    private ratio;
    constructor();
    startGame(): void;
    pauseGame(): void;
    endGame(): void;
    set score(score: number);
    get score(): number;
    checkAndSaveRecord(newRecord: number): void;
    private initGameScene;
    private appResize;
}
declare const app: BunnyApp;
export default app;
