import kaplay from "kaplay";
import {Player} from "./player";
import {SnowWall} from "./snowWall";
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
const sender = atob(queryParams.get("sender"))
const recipient = atob(queryParams.get("recipient"))
const receivedByRecipient = queryParams.get("recipient") && queryParams.get("sender")
if (receivedByRecipient) {
  displayBox.showDisplay(`Hi ${recipient},`, () => {
    displayBox.showDisplay(`Wishing you a Merry Christmas and a Happy New Year!`, () => {
      displayBox.showDisplay(`From ${sender}`, () => {
      })
    })
  })
}
if (!receivedByRecipient) {
  displayBox.showDisplay("Hi, I'm a game!", () => {
    displayBox.showDisplay("But I'm not just a game, I'm also an e-greeting card", () => {
      displayBox.showDisplay("Let's get the card ready for the recipient", () => {
        displayBox.askInput("Enter your name", (sender) => {
          displayBox.askInput("Enter the recipient name", (recipient) => {
            setToUrl("sender", sender)
            setToUrl("recipient", recipient)
            const deployedHostname = window.location.href.split("?")[0].includes("itch.io") ? "https://wishxmas.tanay.tech/" : window.location.href.split("?")[0]
            const recipientUrl = `${deployedHostname}?sender=${btoa(sender)}&recipient=${btoa(recipient)}`
            navigator.clipboard.writeText(recipientUrl)
            displayBox.showDisplay(`The URL to send as E-Greeting Card is copied to your clipboard`, () => {
              displayBox.showDisplay(`You can now paste the URL wherever and share it with the recipient`, () => {})
            })
          })
        })
      })
    })
  })
}

const setToUrl = (key: string, value: string) => {
  queryParams.set(key, btoa(value));
  window.history.replaceState({}, '', `${location.pathname}?${queryParams}`);
}

