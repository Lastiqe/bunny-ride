import * as PIXI from "pixi.js";
import app from "../../../bunny-app";
import { Button } from "../../../buttons/button";
import { getScoreData, IScore } from "../../../service-api/service-api";
import { Popup } from "../popup";
import { TableRow } from "./table-row";

const recordTextStyle = new PIXI.TextStyle({
    fontSize: 60,
    fill: "#ff6801",
    fontFamily: "Comic Sans MS",
    fontWeight: "bold"
});

enum Sort{
    "Всё время",
    "Месяц",
    "Неделя"
}
export class RecordsPopup extends Popup {
    private _sortType = 0;
    private sortTypeText = new PIXI.Text(Sort[this.sortType], recordTextStyle);
    private buttonsContainer = new PIXI.Container();
    private tableContainer = new PIXI.Container();
    private scoreDataArr!: IScore[];
    private tableRowArr: TableRow[] = [];
    
    constructor() {
        super();
        
        this.setTitleText("Таблица рекордов:");
        this.sortButtonsInit();
        this.initScoresTable();
        this.okButtonInit();
    }
    public show() {
        this.visible = true;
        this.showScoreTable();
    }

    private get sortType() {
        return this._sortType;
    }

    private set sortType(value) {
        this._sortType = Math.abs(value % 3);
        this.changeScoresSortType();
    }
    
    private changeScoresSortType() {
        this.sortTypeText.text = Sort[this.sortType];
        this.showScoreTable();
    }

    private sortButtonsInit() {
        this.sortTypeText.anchor.x = 0.5;
        this.buttonsContainer.position.y = - 350;
        const rightArrowTextures = [
            PIXI.Texture.from("arrow_btn_active.png"),
            PIXI.Texture.from("arrow_btn_hover.png"),
            PIXI.Texture.from("arrow_btn_press.png"),
        ]
        const leftArrowTextures = [
            PIXI.Texture.from("arrow_btn_active_l.png"),
            PIXI.Texture.from("arrow_btn_hover_l.png"),
            PIXI.Texture.from("arrow_btn_press_l.png"),
        ]
        const rightArrowButton = new Button(rightArrowTextures, () => ++this.sortType);
        const leftArrowButton = new Button(leftArrowTextures, () => --this.sortType);

        rightArrowButton.position.set(this.sortTypeText.width - 40, 10);
        leftArrowButton.position.set(-this.sortTypeText.width + 40, 10);
        rightArrowButton.anchor.x = 0.5;
        leftArrowButton.anchor.x = 0.5;


        this.buttonsContainer.addChild(this.sortTypeText, leftArrowButton, rightArrowButton);
        
        this.addChild(this.buttonsContainer);
        
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
        okBtn.position.y = this.tableContainer.height / 2 + 15;
        this.addChild(okBtn)
    }

    private onOkButtonClick() {
        this.hide();
        app.mainScene.presonalScorePopup.show();
    }

    private initScoresTable() {
        let prevHeight = 0;
        for (let i = 1; i <= 10; i++){
            const row = new TableRow(i);
            i <= 3 ?
                row.position.y += prevHeight + i * 4
                : row.position.y += prevHeight + i * 5 - 20;

            prevHeight += row.height;
            this.tableContainer.addChild(row);
            this.tableRowArr.push(row);
        }

        this.tableContainer.position.x = -this.tableContainer.width / 2;
        this.tableContainer.position.y = -this.tableContainer.height / 2 + this.buttonsContainer.height - 25;

        this.addChild(this.tableContainer);
    }
    private async sortDataByDate() {
        this.scoreDataArr = (await getScoreData()).scoreArr;
        const initialDate = Date.now();
        const monthEqualMS = 2628000000;
        const weekEqualMS = 604799337;

        switch (this.sortType) {
            case Sort["Всё время"]: break;
            case Sort["Месяц"]: this.scoreDataArr = this.scoreDataArr.filter(el => {
                const diff = initialDate - Date.parse(el.date);
                return monthEqualMS >= diff;
            })
                break
            case Sort["Неделя"]: this.scoreDataArr = this.scoreDataArr.filter(el => {
                const diff = initialDate - Date.parse(el.date);
                return weekEqualMS >= diff;
            })
                break
        }
    }
    
    private async showScoreTable() {
        await this.sortDataByDate();
        this.scoreDataArr?.sort((a, b) => b.score - a.score);

        this.tableRowArr.forEach((el, index) => {
            let userName
            let userScore
            if (this.scoreDataArr[index]) {
                userName  = this.scoreDataArr[index].name;
                userScore = this.scoreDataArr[index].score; 
            } else {
                userName = "-";
                userScore = "-";
            }
            el.setUserData(userName, userScore);
            el.show();
        })
    }

}
