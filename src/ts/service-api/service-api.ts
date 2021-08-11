const scoreData = require("../fake-data/fake-data.json");

export interface IScore {
    name: string,
    score: number,
    date: string
}

 interface IScoreData {
    scoreArr: IScore[]
}

export function getScoreData() {
    return new Promise <IScoreData>((resolve, reject) => {
        if (scoreData) {
            resolve(scoreData)
        } 
        if (!scoreData) {
            reject()
        }
    })
}