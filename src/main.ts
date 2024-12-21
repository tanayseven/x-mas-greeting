import kaplay from "kaplay";
import {Player} from "./player";
import {SnowWall} from "./snowWall";

const k = kaplay();

k.loadRoot("./");
k.setBackground(k.Color.fromHex("#D5FCFF"));

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

k.loadSprite('snowWall', 'sprites/winter_global_shadow.png', {
  sliceX: 36,
  sliceY: 33,
  anims: {
    vertical0: {
      from: 953,
      to: 953,
    },
    vertical1: {
      from: 917,
      to: 917,
    },
    horizontal0: {
      from: 1,
      to: 1,
    },
    horizontal1: {
      from: 1,
      to: 1,
    },
  }
});

const player = new Player(k);

k.camScale(2);

// place snowWalls in a loop
for (let wall = 0 ; wall < 1000 ; wall+=45)
  new SnowWall(k, "vertical", (wall/45)%2?0:1, {X: 0, Y: wall})
const width = window.screen.width-45;
for (let wall = 0 ; wall < 1000 ; wall+=45)
  new SnowWall(k, "vertical", (wall/45)%2?0:1, {X: width, Y: wall})
