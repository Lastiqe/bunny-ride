import { Popup } from "../popup";
export declare class RecordsPopup extends Popup {
    private _sortType;
    private sortTypeText;
    private buttonsContainer;
    private tableContainer;
    private scoreDataArr;
    private tableRowArr;
    constructor();
    show(): void;
    private get sortType();
    private set sortType(value);
    private changeScoresSortType;
    private sortButtonsInit;
    private okButtonInit;
    private onOkButtonClick;
    private initScoresTable;
    private sortDataByDate;
    private showScoreTable;
}
