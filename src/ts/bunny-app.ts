global.PIXI = PIXI;
import * as PIXI from "pixi.js";
import { AssetLoader } from "./asset-loader/asset-loader";
import { MainScene } from "./main-scene/main-scene";


class BunnyApp extends PIXI.Application {
    public mainScene!: MainScene;
    public loader!: AssetLoader;
    public isNewRecord = false;
    private _score!: number;
    private ratio: number

    constructor() {
        super({
            width: 1280,
            height: 640,
            backgroundColor: 0x89c1fc,
        })
        this.ratio = this.view.width / this.view.height;
        this.loader = new AssetLoader();
        this.stage.on("loaded", this.initGameScene, this);
        this.stage.on("startgame", this.startGame, this);
        this.stage.on("pausegame", this.pauseGame, this);
        this.stage.on("endgame", this.endGame, this);
        
        window.onresize = this.appResize.bind(this);
        window.onload = this.appResize.bind(this);
        
    }

    public startGame() {
        this.isNewRecord = false;
        this.mainScene.start();
    }

    public pauseGame() {
        this.mainScene.pauseToggle();
    }

    public endGame() {
        this.mainScene.endGame();
    }

    public set score(score: number) {
        this._score = score;
        this.checkAndSaveRecord(score);
    }

    public get score() {
        return this._score;
    }

    public checkAndSaveRecord(newRecord: number) {
        const record = localStorage.getItem("record") || -1;
        console.log("RECORD",record);
        
        if (record && newRecord > +record) {
            this.isNewRecord = true;
            console.log(this.isNewRecord);
            
            localStorage.setItem("record", `${newRecord}`);
        }
    }

    private initGameScene() {
        this.mainScene = new MainScene();
        this.mainScene.init();
        this.mainScene.position.set( this.view.width / 2, this.view.height / 2);
        this.stage.addChild(this.mainScene);
    }

    private appResize(){
        if(window.innerWidth <= this.view.width || window.innerHeight <= this.view.height) {
            if (window.innerWidth / window.innerHeight >= this.ratio ) {
                var w = window.innerHeight * this.ratio;
                var h = window.innerHeight;
            } else {
                var w = window.innerWidth;
                var h = window.innerWidth / this.ratio;
            }
            this.view.style.width = w + "px";
            this.view.style.height = h + "px";
        }
    }
}

const app = new BunnyApp();
const appDiv = document.querySelector(".app");

if(appDiv){
    appDiv.appendChild(app.view);
}
export default app;
