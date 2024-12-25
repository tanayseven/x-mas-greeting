import kaplay from "kaplay";
import {Player} from "./player";
import {SnowWall} from "./snowWall";
import {DisplayBox} from "./displayBox";
import {GameObj} from "kaplay/dist/declaration/types";

const k = kaplay({
  debug: true,
  debugKey: "/",
});

k.loadRoot("./");
k.setBackground(k.Color.fromHex("#D5FCFF"));

k.loadSprite('snowWallVertical', 'sprites/snow-border-vertical.png');
k.loadSprite('snowWallHorizontal', 'sprites/snow-border-horizontal.png');
k.loadSprite('reindeer', 'sprites/reindeer.png', {
  sliceX: 4,
  anims: {
    noLights: {
      from: 0,
      to: 0,
      speed: 5,
      loop: true,
    },
    lights: {
      from: 1,
      to: 3,
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

k.loadSprite("light", "sprites/light.png", {
  sliceX: 2,
  anims: {
    flicker: {
      from: 0,
      to: 1,
      speed: 10,
      loop: true,
    },
  },
})

const lightPositions = Array.from({length: 20}, (_, i) => ({X: Math.random() * k.width(), Y: Math.random() * k.height()}))

const lightObjs = lightPositions.map((position) => {
  const light = k.add([
    k.sprite("light"),
    k.pos(position.X, position.Y),
    k.scale(3),
    k.area(),
    "light",
  ])
  light.play("flicker")
  return light
});

k.setCamScale(2);

let lights = 0;

const lightsText = k.add([
  k.text("Lights: 0", {
    font: "monospace",
    size: 24,
  }),
  k.fixed(),
  k.pos(10, 10),
  k.color(0, 0, 0),
])

const displayBox = new DisplayBox(k)

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
  k.pos(70, 70),
  k.scale(5),
  k.area(),
  "reindeer",
])
reindeer.play("noLights")

const player = new Player(k);

player.onCollide("light", (light: GameObj) => {
  light.destroy()
  lights++;
  lightsText.text = `Lights: ${lights}`
})

player.onCollide("reindeer", (reindeer: GameObj) => {
  if (lights >= 5) {
    lights -= 5;
    lightsText.text = `Lights: ${lights}`
    reindeer.play("lights")
  } else {
    displayBox.showDisplay("You need at least 5 lights to light up the reindeer", () => {})
  }
})

const queryParams = new URLSearchParams(window.location.search)

const sender = atob(queryParams.get("sender"))
const recipient = atob(queryParams.get("recipient"))
const receivedByRecipient = queryParams.get("recipient") && queryParams.get("sender")
if (receivedByRecipient) {
  displayBox.showDisplay(`Hi ${recipient},`, () => {
    displayBox.showDisplay(`Wishing you a Merry Christmas 🎄🎅🎁 and a Happy New Year 🎉🎊`, () => {
      displayBox.showDisplay(`From ${sender}`, () => {
        displayBox.showDisplay(`Feel free to roam around and explore the festive area`, () => {})
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

