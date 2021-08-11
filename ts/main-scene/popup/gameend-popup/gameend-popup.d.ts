import { Popup } from "../popup";
export declare class GameEndPopup extends Popup {
    private scoreTextStyle;
    private recordLayer;
    private scoreText;
    constructor();
    recordAnimStart(): void;
    hide(): void;
    show(): void;
    private recordLayerInit;
    private initUserScore;
    private okButtonInit;
    private onOkButtonClick;
}
