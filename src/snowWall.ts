import {KAPLAYCtx} from "kaplay/dist/declaration/types";

type Orientation = "horizontal" | "vertical"

type Point = {X: number, Y: number}

export class SnowWall {
  constructor(k: KAPLAYCtx<{}, never & string>, orientation: Orientation, position: Point = {X: 0, Y: 0}) {
    const wallSprite = k.add([
      k.sprite(orientation === "vertical" ? "snowWallVertical" : "snowWallHorizontal"),
      k.pos(k.vec2(position.X, position.Y)),
      k.scale(3),
      orientation == "vertical" ? k.area({ shape: new Polygon([k.vec2(-5, -15), k.vec2(-5, 15), k.vec2(5, 15), k.vec2(5, -15)]) }) :
      k.area({ shape: new Polygon([k.vec2(-15, -5), k.vec2(-15, 5), k.vec2(15, 5), k.vec2(15, -5)]) }),
      k.anchor("center"),
      k.body({ isStatic: true }),
    ])
  }
}