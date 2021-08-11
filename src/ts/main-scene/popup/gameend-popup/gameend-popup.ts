import gsap from "gsap";
import * as PIXI from "pixi.js";
import app from "../../../bunny-app";
import { Button } from "../../../buttons/button";
import { Popup } from "../popup";
import { RecordLayer } from "./record-layer";


export class GameEndPopup extends Popup {
    private scoreTextStyle = new PIXI.TextStyle({
        fontSize: 120,
        fill: "#00fd17",
        fontFamily: "Comic Sans MS",
        fontWeight: "bold"
    })
    private recordLayer!: RecordLayer;
    private scoreText = new PIXI.Text("0", this.scoreTextStyle);

    constructor() {
        super();
        this.recordLayerInit();
        this.setTitleText("Твои очки:");
        this.initUserScore();
        this.okButtonInit();
        this.y = -500;
    }
    public recordAnimStart(){
        this.recordLayer.animStart();
    }

    public hide (){
        this.recordLayer.animStop();
        this.visible = false;
        this.y = -500;
    }

    public show() {
        gsap.to(this, {
            duration: 0.1,
            y: 0,
        })
        this.visible = true;
        this.scoreText.text = `${app.score}`;
        console.log(app.isNewRecord);
        
        if(app.isNewRecord) {
            this.recordAnimStart();
        }
    }
    private recordLayerInit() {
        this.recordLayer = new RecordLayer();
        this.addChildAt(this.recordLayer, 0);
        this.recordLayer.alpha = 0;
    }
    private initUserScore() {
        this.scoreText.anchor.set(0.5);
        this.scoreText.position.y = -100;
        this.addChild(this.scoreText);
    }

    private okButtonInit() {
        const okBtnTexture = [
            PIXI.Texture.from("ok_button_active.png"),
            PIXI.Texture.from("ok_button_hover.png"),
            PIXI.Texture.from("ok_button_press.png"),
        ];
        const okBtn = new Button(okBtnTexture, () => {
            this.onOkButtonClick();
        });
        okBtn.anchor.x = 0.5;
        okBtn.position.y = 285;
        this.addChild(okBtn)
    }

    private onOkButtonClick() {
        this.hide();
        app.mainScene?.recordsPopup.show();
    }
}
