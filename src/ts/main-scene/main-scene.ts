import * as PIXI from "pixi.js"
import app from "../bunny-app";
import { Background } from "./back/background";
import { Bunny } from "./bunny/bunny";
import { Floor } from "./floor/floor";
import { GameEndPopup } from "./popup/gameend-popup/gameend-popup";
import { PersonalScorePopup } from "./popup/personal-score-popup";
import { RecordsPopup } from "./popup/records-popup/records-popup";
import { UiLayer } from "./ui-layer/ui-layer";

export class MainScene extends PIXI.Container {
    public recordsPopup!: RecordsPopup;
    public presonalScorePopup!: PersonalScorePopup;
    public gameEndPopup!: GameEndPopup;
    public uiLayer!: UiLayer;
    public floor!: Floor;
    public bunny!: Bunny;
    public background!: Background;
    public score = 0;
    private isPause = false;
    constructor() {
        super()
        this.position.set(this.width / 2, this.height / 2);
    }
    public init() {
        this.initBackground();
        this.initFloor();
        this.initBunny();
        this.initPopup();
        this.initUi();
        app.stage.addChild(this);
    }
    public start(){
        this.bunny.addJumpListener();
        this.floor.animStart();
        this.background.animStart();
    }
    public endGame() {
        this.floor.reinit();
        this.gameEndPopup.show();
        this.bunny.removeJumpListener();
        this.background.reinit();
    }
    public pauseToggle() {
        if (this.isPause) {
            app.ticker.start();
        } else {
            app.ticker.stop();
        }
        this.isPause = !this.isPause;
    }
    private initUi()
    {
        this.uiLayer = new UiLayer;
        this.addChild(this.uiLayer);
    }
    private initFloor() {
        this.floor = new Floor();
        this.floor.position.y = 210;
        this.floor.rotation = 5 * PIXI.DEG_TO_RAD;
        this.addChild(this.floor);
    }
    private initBunny() {
        this.bunny = new Bunny();
        this.bunny.position.x = -this.floor.width / 2 + 100; 
        this.bunny.position.y = 20; 
        this.addChild(this.bunny);
    }
    
    private initPopup() {
        this.recordsPopup = new RecordsPopup();
        this.presonalScorePopup = new PersonalScorePopup();
        this.gameEndPopup = new GameEndPopup();
        this.addChild(this.recordsPopup, this.presonalScorePopup, this.gameEndPopup);
    }
    
    private initBackground() {
        this.background = new Background();
        this.addChild(this.background)
    }

    
    
}
