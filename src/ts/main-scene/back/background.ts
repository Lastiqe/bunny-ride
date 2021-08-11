import * as PIXI from "pixi.js"
import app from "../../bunny-app";

export class Background extends PIXI.TilingSprite {
    constructor() {
        super(PIXI.Texture.from("bg_layer"), 2560, 770)
        this.scale.set(0.5);
        this.anchor.x = 0.5;
    }

    public animStart() {
        app.ticker.add(this.bgAnim, this);
    }

    public reinit() {
        this.animStop();
        this.tilePosition.x = 0;
    }
    
    public animStop() {
        app.ticker.remove(this.bgAnim, this);
    }

    private bgAnim(delta: number) {
        this.tilePosition.x -= delta * 0.2;
    }
}
