import * as PIXI from "pixi.js"
import app from "../bunny-app";

export class AssetLoader extends PIXI.Loader {
    private assetVersion = 1;
    constructor() {
        super();

        this.loadAssets();
    }

    private loadAssets() {
        this.baseUrl = "src/assets/";
        this.add(`bunny-ride-ui-0.json?${this.assetVersion}`);
        this.add(`bunny-ride-ui-1.json?${this.assetVersion}`);
        this.add(`bunny-ride-game.json?${this.assetVersion}`);
        this.add("bg_layer", `bg_layer.png?${this.assetVersion}`);

        this.onError.add((error, loader, resource) => {
            console.error(
                `Loaded with errors: ${loader.progress}% name: ${resource.name}, url: ${resource.url}`
            );
        });
        this.onProgress.add((loader) => {
            console.log(loader.progress);
        });

        this.load(() => {
            app.stage.emit("loaded");
        });
    }
}
