import * as PIXI from "pixi.js";
import app from "../../bunny-app";
import { Button } from "../../buttons/button";
import { Popup } from "./popup";

const recordTextStyle = new PIXI.TextStyle({
    fontSize: 54,
    fill: "#00fd17",
    fontFamily: "Comic Sans MS",
    fontWeight: "bold"
});

const userNameTextStyle = new PIXI.TextStyle({
    fontSize: 54,
    fill: "#fff",
    fontFamily: "Comic Sans MS",
    fontWeight: "bold"
});


export class PersonalScorePopup extends Popup {
    private recordScoreText = new PIXI.Text("", recordTextStyle);
    private userNameText = new PIXI.Text("", userNameTextStyle);
    private recordField = new PIXI.Container();
    private buttonsContainer = new PIXI.Container();
    private userNameBar = PIXI.Sprite.from("user_name_bar.png");
    
    constructor() {
        super();
        
        this.setTitleText("Твои рекорды:");
        this.setRecord();
        this.initRecordField();
        this.initButtonsContainer();
        this.initUserNameBar();
        this.show();
    }

    public show() {
        this.visible = true;
        this.setRecord();
    }

    private setRecord() {
        console.log(localStorage);
        
        this.recordScoreText.text = localStorage.getItem("record") || "0";
    }

    private initRecordField() {
        const title = new PIXI.Text("Рекорд:", recordTextStyle);
        title.anchor.x = 0.5;
        
        this.recordScoreText.anchor.x = 0.5;
        this.recordField.addChild(title, this.recordScoreText);
        
        this.recordField.position.y = -(this.height - this.title.height * 2) * this.scale.y; 
        this.recordScoreText.text = "0";
        this.recordScoreText.position.y = title.height;

        this.addChild(this.recordField)
    }

    private initUserNameBar() {
        this.userNameText.text = "Guest";
        this.userNameText.anchor.y = 0.5;
        this.userNameText.position.x = -this.userNameBar.width / 2 + 40;
        this.userNameBar.addChild(this.userNameText)
        this.userNameBar.position.y = this.userNameBar.height * this.scale.y;
        this.userNameBar.anchor.set(0.5);
        this.addChild(this.userNameBar);
    }

    private initButtonsContainer() {
        const scoreBoardsButtonTextures = [
            PIXI.Texture.from("leadboard_button_active.png"),
            PIXI.Texture.from("leadboard_button_hover.png"),
            PIXI.Texture.from("leadboard_button_press.png"),
        ];
        const playButtonTextures = [
            PIXI.Texture.from("play_button_active.png"),
            PIXI.Texture.from("play_button_hover.png"),
            PIXI.Texture.from("play_button_press.png"),
            PIXI.Texture.from("play_button_off.png"),
        ];
        
        const scoreBoardButton = new Button(scoreBoardsButtonTextures, () => {
            this.onScoreButtonClick();
        });
        const playButton = new Button(playButtonTextures, () => {this.onPlayBtnClick()});
        
        playButton.position.x = -playButton.width;
        playButton.position.y = (this.height / 2) * this.scale.y;
        scoreBoardButton.position.y = (this.height / 2) * this.scale.y;
            
        this.addChild(scoreBoardButton, playButton);
        this.addChild(this.buttonsContainer);
    }

    private onPlayBtnClick() {
        this.hide();
        app.stage.emit("startgame")
    }

    private onScoreButtonClick() {
        this.hide();
        
        app.mainScene?.recordsPopup.show();
    }

}
