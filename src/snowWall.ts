import {KAPLAYCtx} from "kaplay/dist/declaration/types";

type Orientation = "horizontal" | "vertical"
type WallType = 0 | 1;

type Point = {X: number, Y: number}

export class SnowWall {
  constructor(k: KAPLAYCtx<{}, never & string>, orientation: Orientation, wallType: WallType = 0, position: Point = {X: 0, Y: 0}) {
    const wallSprite = k.add([
      k.sprite("snowWall"),
      k.pos(k.vec2(position.X, position.Y)),
      k.scale(3),
    ])
    wallSprite.play(`${orientation}${wallType}`);
  }
}