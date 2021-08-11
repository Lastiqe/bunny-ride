import * as PIXI from "pixi.js";

export class TableRow extends PIXI.Container {
    private scoreTextStyle = new PIXI.TextStyle({
        fontSize: 34,
        fontFamily: "Comic Sans MS",
        fontWeight: "bold",
        fill: "0x000"
    })
    private placeTextStyle = new PIXI.TextStyle({
        fontSize: 30,
        fill: "#fff",
        fontFamily: "Comic Sans MS",
        fontWeight: "bold"
    })

    private userName = new PIXI.Text("", this.scoreTextStyle);
    private userScore = new PIXI.Text("", this.scoreTextStyle);
    private namePlate: PIXI.Sprite;
    private scorePlate: PIXI.Sprite;
    private place: number

    constructor(placeNum: number) {
        super();
        this.alpha = 0;
        this.place = placeNum;
        if (placeNum <= 3) {
            this.namePlate = PIXI.Sprite.from(`place_${placeNum}.png`);
            this.scorePlate = PIXI.Sprite.from("highleader_scores_plate.png");
            this.scorePlate.position.x = 15;
            this.userName.position.x = 90;
            this.userName.style.fill = this.getPrizeFontColor(placeNum);
            this.userScore.style.fill = this.getPrizeFontColor(placeNum);
        } else {
            const placeText = new PIXI.Text(`${placeNum}`, this.placeTextStyle);
            placeText.anchor.set(0.5);
            placeText.position.x = 40;
            this.namePlate = PIXI.Sprite.from("midleader_name_plate.png");
            this.scorePlate = PIXI.Sprite.from("midleader_scores_plate.png");
            this.namePlate.position.x = 72;
            this.scorePlate.position.x = 95;

            this.userScore.style.fontSize = 30;
            this.userName.style.fontSize = 30;

            this.userName.position.x = 26;
            this.addChild(placeText);
        }
        this.userName.anchor.y = 0.5;
        this.userScore.anchor.set(0.5);
        this.scorePlate.anchor.y = 0.5;
        this.namePlate.anchor.y = 0.5;

        this.userScore.position.x = this.scorePlate.width / 2
        this.scorePlate.x += this.namePlate.width

        this.namePlate.addChild(this.userName);
        this.scorePlate.addChild(this.userScore);
        this.addChild(this.namePlate, this.scorePlate);
    }

    public setUserData(name: string, score: number | string) {
        this.alpha = 0;
        this.userName.text = name;
        this.userScore.text = `${score}`;
    }
    
    public show() {
        setTimeout(()=>this.alpha = 1, (this.place) * 45)
    }

    private getPrizeFontColor(place: number) {
        switch (place) {
            case 0: return "#bb5b01";
            case 1: return "#205cb0";
            case 2: return "#8d1c00";
            default: return "0x000";
        }
    }

}
