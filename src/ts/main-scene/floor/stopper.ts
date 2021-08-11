import * as PIXI from "pixi.js"
import app from "../../bunny-app";
import { hitTestRectangle } from "../../utils/utils";

export class Stopper extends PIXI.Sprite {
    constructor() {
        super(PIXI.Texture.from("stopper_idle.png"));
        this.anchor.x = 0.5;
        this.anchor.y = 0.9;
        this.scale.set(0.7);
    }

    public startAnim() {
        this.setPos();
        app.ticker.add(this.move, this);
    }

    public reinit() {
        app.ticker.remove(this.move, this);
    }

    public getPos() {
        return this.position.x;
    }

    public setPos() {
        this.position.x = 1200;
    }

    private move(delta: number) {
        this.position.x -= 20 * delta;
        if (hitTestRectangle(this, app.mainScene.bunny)) {
            app.stage.emit("endgame")
        }
    }
}
