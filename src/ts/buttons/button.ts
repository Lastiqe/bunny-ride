import * as PIXI from "pixi.js";

export class Button extends PIXI.AnimatedSprite {
    private onClickCallback: () => void
    constructor(buttonTexture: PIXI.Texture[], onClickCallback: () => void) {
        super(buttonTexture);
        this.buttonMode = true;
        this.interactive = true;
        this.onClickCallback = onClickCallback
        this.addListener("pointerdown", this.onPointerDown);
        this.addListener("pointerup", this.onClick);
        this.addListener("mouseover", this.onHover);
        this.addListener("mouseout", this.setDefaultState);
    }
    public setOffMode() {
        this.buttonMode = false;
    }

    public setOnMode() {
        this.buttonMode = true;
    }

    private getStateTexture(state: string) {
        return this.textures.find((el) => el.textureCacheIds[0].match(state))
            || this.texture;
    }

    private onHover() {
        this.texture = this.getStateTexture("hover");
    };

    private setDefaultState() {
        this.texture = this.getStateTexture("active");
    }

    private onPointerDown() {
        this.texture = this.getStateTexture("press");
    }

    private onClick() {
        this.setDefaultState();
        this.onClickCallback();
    }
   
}
