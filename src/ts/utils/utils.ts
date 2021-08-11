export function hitTestRectangle(r1: PIXI.Sprite, r2: PIXI.Sprite) {
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    hit = false;

    const r1centerX = r1["x"] + r1["width"] / 2;
    const r1centerY = r1["y"] + r1["height"] / 2;
    const r2centerX = r2["x"] + r2["width"] / 2;
    const r2centerY = r2["y"] + r2["height"] / 2;

    const r1halfWidth = r1["width"] / 2;
    const r1halfHeight = r1["height"] / 2;
    const r2halfWidth = r2["width"] / 2;
    const r2halfHeight = r2["height"] / 2;

    vx = r1centerX - r2centerX;
    vy = r1centerY - r2centerY;

    combinedHalfWidths = r1halfWidth + r2halfWidth;
    combinedHalfHeights = r1halfHeight + r2halfHeight;

    if (Math.abs(vx) < combinedHalfWidths) {
        if (Math.abs(vy) < combinedHalfHeights) {
            hit = true;
        } else {
            hit = false;
        }
    } else {
        hit = false;
    }
    return hit;
};