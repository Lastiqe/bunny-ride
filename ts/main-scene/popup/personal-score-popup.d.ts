import { Popup } from "./popup";
export declare class PersonalScorePopup extends Popup {
    private recordScoreText;
    private userNameText;
    private recordField;
    private buttonsContainer;
    private userNameBar;
    constructor();
    show(): void;
    private setRecord;
    private initRecordField;
    private initUserNameBar;
    private initButtonsContainer;
    private onPlayBtnClick;
    private onScoreButtonClick;
}
