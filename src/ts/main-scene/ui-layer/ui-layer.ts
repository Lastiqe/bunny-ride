import * as PIXI from "pixi.js"
import app from "../../bunny-app";
import { Button } from "../../buttons/button";

export class UiLayer extends PIXI.Container {
    private scoreTextStyle = new PIXI.TextStyle({
        fill: "0xffffff",
        fontFamily: "Comic Sans MS",
        fontWeight: "bold",
        fontSize: 36
    })
    private scorePlate = new PIXI.Container();
    private scoreText = new PIXI.Text("0", this.scoreTextStyle);
    private fullScreenBtn!: Button;
    private pauseBtn!: Button;
    private soundModeBtn!: Button;
    private soundOnBtnTextures!: PIXI.Texture[];;
    private soundOffBtnTextures!: PIXI.Texture[];
    private isSoundOn? = true;

    constructor() {
        super()
        this.scale.set(0.7)
        const coin = PIXI.Sprite.from("collect_coin_icon.png");
        const scorePlate = PIXI.Sprite.from("coin_score_plate.png");
        scorePlate.anchor.y = 0.5;
        scorePlate.position.y = coin.height / 2;
        scorePlate.position.x = coin.width - coin.width / 4;
        this.scoreText.x = scorePlate.width / 2; 
        this.scoreText.anchor.set(0.5);
        scorePlate.addChild(this.scoreText);
        this.scorePlate.addChild(scorePlate, coin);
        const padding = 15;
        this.scorePlate.position.x = (-app.view.width / 2 + padding) / this.scale.y;
        this.scorePlate.position.y = (-app.view.height / 2 + padding) / this.scale.y;

        this.initButtons();
        this.addChild(this.scorePlate);
    }
    private initButtons() {
        const buttonContainer = new PIXI.Container();

        this.soundOffBtnTextures = [
            PIXI.Texture.from("btn_sound_0_active.png"),
            PIXI.Texture.from("btn_sound_0_hover.png"),
            PIXI.Texture.from("btn_sound_0_off.png"),
            PIXI.Texture.from("btn_sound_0_press.png"),
        ]
        this.soundOnBtnTextures = [
            PIXI.Texture.from("btn_sound_1_active.png"),
            PIXI.Texture.from("btn_sound_1_hover.png"),
            PIXI.Texture.from("btn_sound_1_off.png"),
            PIXI.Texture.from("btn_sound_1_press.png"),
        ]
        const fullScreenBtnTextures = [
            PIXI.Texture.from("btn_fullscreen_active.png"),
            PIXI.Texture.from("btn_fullscreen_hover.png"),
            PIXI.Texture.from("btn_fullscreen_off.png"),
            PIXI.Texture.from("btn_fullscreen_press.png")
        ]
        const pauseBtnTextures = [
            PIXI.Texture.from("btn_pause_active.png"),
            PIXI.Texture.from("btn_pause_hover.png"),
            PIXI.Texture.from("btn_pause_off.png"),
            PIXI.Texture.from("btn_pause_press.png"),
        ]

        this.fullScreenBtn = new Button(fullScreenBtnTextures, ()=>{
            console.log("FULL SCREEN");
        })
        this.pauseBtn = new Button(pauseBtnTextures, ()=>{
            app.stage.emit("pausegame");
        })
        this.soundModeBtn = new Button(this.soundOnBtnTextures, () => {
            this.toggleSoundMode()
        });
        
        const margin = 10;
        this.fullScreenBtn.position.x = -(this.soundModeBtn.width + margin);
        this.pauseBtn.position.x = this.soundModeBtn.width + margin;

        buttonContainer.addChild(this.fullScreenBtn, this.pauseBtn, this.soundModeBtn);
        buttonContainer.position.y = (-app.view.height / 2) / this.scale.y;
        buttonContainer.position.x = ((app.view.width / 2) - buttonContainer.width / 2) / this.scale.x;
        this.addChild(buttonContainer)
    }
    private toggleSoundMode() {
        this.isSoundOn = !this.isSoundOn;
        this.isSoundOn 
            ? this.soundModeBtn.textures = this.soundOnBtnTextures 
            : this.soundModeBtn.textures = this.soundOffBtnTextures;
    }
    
}
