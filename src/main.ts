import kaplay from "kaplay";
import {Player} from "./player";
import {SnowWall} from "./snowWall";

const k = kaplay({
  debug: true,
  debugKey: "/",
});

k.loadRoot("./");
k.setBackground(k.Color.fromHex("#D5FCFF"));

k.loadSprite('snowWallVertical', 'sprites/snow-border-vertical.png');
k.loadSprite('snowWallHorizontal', 'sprites/snow-border-horizontal.png');

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

const player = new Player(k);

// k.setCamScale(2);

const wallLength = 94;

// Create vertical walls
const wallDimensions = 1530;
for (let wall = 0 ; wall < wallDimensions ; wall+=wallLength)
  new SnowWall(k, "vertical", {X: 0, Y: wall})
for (let wall = 0 ; wall < wallDimensions ; wall+=wallLength)
  new SnowWall(k, "vertical", {X: wallDimensions, Y: wall})

// Create horizontal walls
for (let wall = 60 ; wall < wallDimensions ; wall+=wallLength)
  new SnowWall(k, "horizontal", {X: wall, Y: -35})
for (let wall = 60 ; wall < wallDimensions ; wall+=wallLength)
  new SnowWall(k, "horizontal", {X: wall, Y: wallDimensions})
