import * as PIXI from "pixi.js"
import app from "../../bunny-app";

export class Bunny extends PIXI.AnimatedSprite {
    private isJumping = false;
    private gravity = 0.8;
    private direction = -1; //to Top
    private power = 20;
    private jumpAt!: number;
    private time = 0;
    constructor() {
        super([
            PIXI.Texture.from("bunny_glide.png"),
            PIXI.Texture.from("bunny_jump.png")
        ])
        this.rotation = 5 * PIXI.DEG_TO_RAD;
        this.scale.set(0.6);
        this.jumpAt = this.position["y"];
    }
    
    public addJumpListener(){
        window.addEventListener("keydown", this.onJumpEvent);
        window.addEventListener("touchstart", this.onJumpEvent);
    }

    public removeJumpListener() {
        window.removeEventListener("keydown", this.onJumpEvent);
        window.removeEventListener("touchstart", this.onJumpEvent);
        app.ticker.remove(this.onTick, this);
        this.texture = this.textures[0];
        this.isJumping = false;
        this.position.y = 20;
    }

    private onJumpEvent = (e: any) => {
        if (e.code === "Space" || e.type === "touchstart") this.jump();
    }

    private jump() {
        if (this.isJumping) return;
        this.isJumping = true;
        this.texture = this.textures[1];

        app.ticker.add(this.onTick, this);
    }

    private onTick(deltaMs: number) {
        const jumpHeight = (-this.gravity / 2) * Math.pow(this.time, 2) + this.power * this.time;

        if (jumpHeight < 0) {
            this.isJumping = false;
            app.ticker.remove(this.onTick, this);
            this.position["y"] = 20;
            this.texture = this.textures[0];
            this.time = 0;
            return;
        }

        this.position["y"] = this.jumpAt + (jumpHeight * this.direction);
        this.time += deltaMs;
    }

}
