import gsap from "gsap";
import * as PIXI from "pixi.js";


export class Star extends PIXI.Sprite {
    private anim: gsap.core.Tween;
    constructor(direction: number) {
        super(PIXI.Texture.from("star.png"));
        this.alpha = 1;
        this.anchor.set(0.5);
        this.rotation = -10 * PIXI.DEG_TO_RAD * direction

        this.anim = gsap.to(this, {
            rotation: 10 * PIXI.DEG_TO_RAD * direction,
            duration: 1,
            repeat: -1,
            ease: "linear"
        }).pause();
    }

    public startAnim() {
        this.anim.play();
        this.anim.yoyo(true);
    }

    public stopAnim() {
        this.anim.pause();
    }
    
}
