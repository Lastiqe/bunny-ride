import * as PIXI from "pixi.js";

const titleTextStyle = new PIXI.TextStyle({
    fill: "#024171",
    fontSize: 54,
    fontWeight: "bold",
    fontFamily: "Comic Sans MS",
})

export abstract class Popup extends PIXI.Container {
    private popup = PIXI.Sprite.from("info_plate_big.png")
    protected title = PIXI.Sprite.from("header_info_plate.png");
    protected titleText = new PIXI.Text("", titleTextStyle);

    constructor() {
        super();
        this.scale.set(0.65);
        this.popup.anchor.set(0.5);
        this.visible = false;
        this.initHeader();
        this.addChild(this.popup);
    }

    public show() {
        this.visible = true;
    }

    public hide() {
        this.visible = false;
    }

    protected setTitleText(titleText: string) {
        this.titleText.text = titleText;
    }

    private initHeader() {
        this.title.anchor.x = 0.5;
        this.title.position.y = (-this.popup.height / 2 + 4);

        this.titleText.anchor.x = 0.5;
        this.titleText.position.y = 2;
        this.title.addChild(this.titleText);

        this.popup.addChild(this.title);
    }
    
}
