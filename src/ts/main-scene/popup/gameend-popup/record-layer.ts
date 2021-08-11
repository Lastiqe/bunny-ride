import * as PIXI from "pixi.js";
import app from "../../../bunny-app";
import { Star } from "./star";


export class RecordLayer extends PIXI.Container {
    private stars: Star[] = [];
    private rays = PIXI.Sprite.from("rays.png");
    
    constructor() {
        super();
        this.alpha = 1;
        this.rays.anchor.set(0.5)
        this.addChild(this.rays);
        this.initStars();
    }

    public animStart() {
        this.alpha = 1;
        app.ticker.add(this.raysAnim, this)
        this.stars.forEach(el => el.startAnim())
    }

    public animStop() {
        this.alpha = 0;
        app.ticker.remove(this.raysAnim, this)
        this.stars.forEach(el => el.stopAnim())
    }

    private initStars() {
        let direction = -1;
        let radius = 750;
        let counter = 4;
        for(let i = 1; i <= 16; i++) {
            if(counter < 5) {
                counter++;
                const sectorAngle = 360 / 16;
                const coordinatsH = (i * sectorAngle + (sectorAngle / 2)) / (-180 / Math.PI);
                const coordinats = [
                    (radius / 1.2 * Math.cos(coordinatsH)),
                    (radius / 1.2 * Math.sin(coordinatsH)),
                ]
                const star = new Star(direction);
                star.position.set(...coordinats);
                star.scale.set(Math.random() * (0.6 - 0.5 + 1) + 0.5);
                this.stars.push(star)
                this.addChild(star);
                direction *= -1
            } else if( (i+3) % 4 === 0) {
                counter = 1;
            }
            
        }
    }

    private raysAnim(delta: number) {
        this.rays.rotation += 0.1 * PIXI.DEG_TO_RAD * delta;
    }

}
