import kaplay from "kaplay";
import {Player} from "./player";
import {SnowWall} from "./snowWall";
import {InputBox} from "./inputBox";
import {DisplayBox} from "./displayBox";

const k = kaplay({
  debug: true,
  debugKey: "/",
});

k.loadRoot("./");
k.setBackground(k.Color.fromHex("#D5FCFF"));

k.loadSprite('snowWallVertical', 'sprites/snow-border-vertical.png');
k.loadSprite('snowWallHorizontal', 'sprites/snow-border-horizontal.png');
k.loadSprite('reindeer', 'sprites/reindeer.png', {
  sliceX: 3,
  anims: {
    run: {
      from: 0,
      to: 2,
      speed: 5,
      loop: true,
    },
  }
});

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

// k.setCamScale(2);

const wallLength = 94;

const wallDimensions = 1530;
for (let wall = 0 ; wall < wallDimensions ; wall+=wallLength)
  new SnowWall(k, "vertical", {X: 0, Y: wall})
for (let wall = 0 ; wall < wallDimensions ; wall+=wallLength)
  new SnowWall(k, "vertical", {X: wallDimensions, Y: wall})

for (let wall = 60 ; wall < wallDimensions ; wall+=wallLength)
  new SnowWall(k, "horizontal", {X: wall, Y: -35})
for (let wall = 60 ; wall < wallDimensions ; wall+=wallLength)
  new SnowWall(k, "horizontal", {X: wall, Y: wallDimensions})

const reindeer = k.add([
  k.sprite("reindeer"),
  k.pos(30, 10),
  k.scale(2),
])
reindeer.play("run");

const player = new Player(k);

const queryParams = new URLSearchParams(window.location.search)

const displayBox = new DisplayBox(k)
displayBox.showDisplay("Merry Chsristmas")

// const inputBox = new InputBox(k)
// inputBox.askInput("Enter your name", (value) => {
// });

const getFromUrl = (key: string): string => {
  try {
    const rawName = queryParams.get(key)
    if (rawName) {
      return  atob(queryParams.get(key))
    }
  } catch (e) {
    return  ""
  }
  return ""
};

const setToUrl = (key: string, value: string) => {
  queryParams.set(key, btoa(value));
  window.history.replaceState({}, '', `${location.pathname}?${queryParams}`);
}

