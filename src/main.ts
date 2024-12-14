import kaplay from "kaplay";

const k = kaplay();

k.loadRoot("./");
k.loadSprite("player", "sprites/player.png", {
  sliceX: 6,
  sliceY: 10,
  anims: {
    idleDown: {
      from: 0,
      to: 5,
      speed: 10,
      loop: true,
    },
    idleRight: {
      from: 6,
      to: 11,
      speed: 10,
      loop: true,
    },
    idleUp: {
      from: 12,
      to: 17,
      speed: 10,
      loop: true,
    },
    walkDown: {
      from: 18,
      to: 23,
      speed: 10,
      loop: true,
    },
    walkRight: {
      from: 24,
      to: 29,
      speed: 10,
      loop: true,
    },
    walkUp: {
      from: 30,
      to: 35,
      speed: 10,
      loop: true,
    },
  },
});


const playerSpeed = 100;

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

const playerSprite = k.add([
  k.sprite("player"),
  k.pos(k.center()),
  k.scale(3),
]);

k.setBackground(k.Color.fromHex("#f0f0f0"));

playerSprite.play("idleDown");

k.onKeyPress("right", () => {
  playerSprite.play("walkRight");
});
k.onKeyDown("right", () => {
  playerMoving.right = true;
  playerSprite.flipX = false;
  playerSprite.move(playerSpeed, 0)
});
k.onKeyRelease("right", () => {
  playerMoving.right = false;
  playerSprite.flipX = false;
  if (!isPlayerMoving()) {
    playerSprite.play("idleRight");
  }
});

k.onKeyPress("left", () => {
  playerSprite.play("walkRight");
});
k.onKeyDown("left", () => {
  playerMoving.left = true;
  playerSprite.flipX = true;
  playerSprite.move(-playerSpeed, 0)
});
k.onKeyRelease("left", () => {
  playerMoving.left = false;
  playerSprite.flipX = true;
  playerMoving.left = false;
  if (!isPlayerMoving()) {
    playerSprite.play("idleRight");
  }
});

k.onKeyPress("up", () => {
  playerSprite.play("walkUp");
});
k.onKeyDown("up", () => {
  playerMoving.up = true;
  playerSprite.move(0, -playerSpeed)
});
k.onKeyRelease("up", () => {
  playerMoving.up = false;
  if (!isPlayerMoving()) {
    playerSprite.play("idleUp");
  }
});

k.onKeyPress("down", () => {
  playerSprite.play("walkDown");
});
k.onKeyDown("down", () => {
  playerMoving.down = true;
  playerSprite.move(0, playerSpeed)
});
k.onKeyRelease("down", () => {
  playerMoving.down = false;
  if (!isPlayerMoving()) {
    playerSprite.play("idleDown");
  }
});
