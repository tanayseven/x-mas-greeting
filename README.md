# Folder structure

- `src` - source code for your kaplay project
- `dist` - distribution folder, contains your index.html, built js bundle and static assets


## Development

```sh
$ npm run dev
```

will start a dev server at http://localhost:8000

## Distribution

```sh
$ npm run build
```

will build your js files into `dist/`

```sh
$ npm run zip
```

will build your game and package into a .zip file, you can upload to your server or itch.io / newground etc.

## TODO

- [X] Create a player character that moves
- [X] Add a continuous deployment system to the project 
- [X] Add a camera on the player
- [X] Add collision to the snow borders
- [X] Cut apart all the sprites that might be needed, using GIMP
- [ ] Christmas Greeting Card that will have the following activities
  - [ ] Edit the sprites in the necessary way 
  - [ ] Put a Christmas tree which can be decorated
  - [ ] Put streetlights without Wreath and then add a way to add the Wreath
  - [ ] Try removing decoration from the existing buildings
  - [ ] Try to have a house decoration system in place
  - [ ] Add a destroyed snowman and make a way to build it
  - [ ] Create a UI for inputting the sender's name and the recipient's name
