import * as PIXI from "pixi.js";
import { Background } from "./back/background";
import { Bunny } from "./bunny/bunny";
import { Floor } from "./floor/floor";
import { GameEndPopup } from "./popup/gameend-popup/gameend-popup";
import { PersonalScorePopup } from "./popup/personal-score-popup";
import { RecordsPopup } from "./popup/records-popup/records-popup";
import { UiLayer } from "./ui-layer/ui-layer";
export declare class MainScene extends PIXI.Container {
    recordsPopup: RecordsPopup;
    presonalScorePopup: PersonalScorePopup;
    gameEndPopup: GameEndPopup;
    uiLayer: UiLayer;
    floor: Floor;
    bunny: Bunny;
    background: Background;
    score: number;
    private isPause;
    constructor();
    init(): void;
    start(): void;
    endGame(): void;
    pauseToggle(): void;
    private initUi;
    private initFloor;
    private initBunny;
    private initPopup;
    private initBackground;
}
