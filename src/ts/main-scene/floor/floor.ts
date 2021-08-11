import * as PIXI from "pixi.js"
import app from "../../bunny-app";
import { Stopper } from "./stopper";

export class Floor extends PIXI.TilingSprite {
    private stopper: Stopper;
    private score!: number
    constructor() {
        super(PIXI.Texture.from("floor.png"), 1300, 414);
        this.anchor.x = 0.5;
        this.stopper = new Stopper();
        this.addChild(this.stopper);
    }

    public reinit() {
        app.score = this.score;
        this.animStop();
        this.stopper.reinit();
    }
    
    public animStart() {
        this.tilePosition.x = 0;
        this.stopper.setPos();
        this.stopper.startAnim();
        app.ticker.add(this.floorAnim, this);
    }
    
    public animStop() {
        app.ticker.remove(this.floorAnim, this);
    }

    private floorAnim(delta: number) {
        this.tilePosition.x -= delta * 20;
        this.score = Math.floor(this.tilePosition.x / -100)

        if (this.stopper.getPos() < -1200) {
            this.stopper.setPos();
        }
    
    }
    
}
