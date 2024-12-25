import {GameObj, KAPLAYCtx} from "kaplay/dist/declaration/types";

const playerSpeed = 500;

type PlayerMoving = {
  right: boolean;
  left: boolean;
  up: boolean;
  down: boolean;
};

let playerMoving: PlayerMoving = {
  right: false,
  left: false,
  up: false,
  down: false,
};

const isPlayerMoving = () => {
  return playerMoving.right || playerMoving.left || playerMoving.up || playerMoving.down;
}

export class Player {
    k:  KAPLAYCtx<{}, never>;
    playerSprite: GameObj;
    constructor(k:  KAPLAYCtx<{}, never>) {
      this.k = k;
      const playerSprite = this.k.add([
        this.k.sprite("player"),
        this.k.pos(1300, 20),
        this.k.scale(3),
        this.k.area({ shape: new Polygon([vec2(-5, -10), vec2(-5, 7), vec2(5, 7), vec2(5, -10)]) }),
        this.k.body(),
        this.k.anchor("center")
      ]);

      playerSprite.play("idleDown");

      this.k.onKeyPress("right", () => {
        playerSprite.play("walkRight");
      });
      this.k.onKeyDown("right", () => {
        playerMoving.right = true;
        playerSprite.flipX = false;
        playerSprite.move(playerSpeed, 0)
      });
      this.k.onKeyRelease("right", () => {
        playerMoving.right = false;
        playerSprite.flipX = false;
        if (!isPlayerMoving()) {
          playerSprite.play("idleRight");
        }
      });

      this.k.onKeyPress("left", () => {
        playerSprite.play("walkRight");
      });
      this.k.onKeyDown("left", () => {
        playerMoving.left = true;
        playerSprite.flipX = true;
        playerSprite.move(-playerSpeed, 0)
      });
      this.k.onKeyRelease("left", () => {
        playerMoving.left = false;
        playerSprite.flipX = true;
        playerMoving.left = false;
        if (!isPlayerMoving()) {
          playerSprite.play("idleRight");
        }
      });
      this.k.onKeyPress("up", () => {
        playerSprite.play("walkUp");
      });
      this.k.onKeyDown("up", () => {
        playerMoving.up = true;
        playerSprite.move(0, -playerSpeed)
      });
      this.k.onKeyRelease("up", () => {
        playerMoving.up = false;
        if (!isPlayerMoving()) {
          playerSprite.play("idleUp");
        }
      });
      this.k.onKeyPress("down", () => {
        playerSprite.play("walkDown");
      });
      this.k.onKeyDown("down", () => {
        playerMoving.down = true;
        playerSprite.move(0, playerSpeed)
      });
      this.k.onKeyRelease("down", () => {
        playerMoving.down = false;
        if (!isPlayerMoving()) {
          playerSprite.play("idleDown");
        }
      });
      playerSprite.onUpdate(() => {
        k.setCamPos(playerSprite.worldPos());
      });
      this.playerSprite = playerSprite
    }

  onCollide(objName: string, callback: (obj) => void) {
    this.playerSprite.onCollide(objName, (obj) => {
      console.log(`Player collided with ${objName}`);
      callback(obj);
    });
  }
}