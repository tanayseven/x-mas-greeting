import {GameObj, KAPLAYCtx} from "kaplay/dist/declaration/types";

export class DisplayBox {
  k: KAPLAYCtx<{}, never>;
  private displayBox: GameObj
  private displayTextObj: GameObj;
  private displayText: string;
  private displayCallback: () => void;
  private inputText: string;
  private promptCallback: (value: string) => void;
  private inputBox: GameObj;
  private cursorShow = true
  private getCursor = () => this.cursorShow ? "▌" : " "
  private inputTextObj: GameObj;
  private isDisplayDialog = false
  private isShiftPressed: boolean = false

  constructor(k: KAPLAYCtx<{}, never>) {
    this.k = k;

    onKeyPress("enter", () => {
      this.closeDisplayInput()
      if (this.displayCallback) this.displayCallback()
      if (this.promptCallback) this.promptCallback(this.inputText)
    });

    onKeyPressRepeat("backspace", () => {
      this.inputText = this.inputText.substring(0, this.inputText.length - 1);
      updateInputText()
    });

    onCharInput((ch: string) => {
      ch = this.isShiftPressed ? ch.toUpperCase() : ch.toLowerCase()
      this.inputText += ch;
      updateInputText()
    });

    onKeyDown("shift", () => {
      this.isShiftPressed = true
    })

    onKeyRelease("shift", () => {
      this.isShiftPressed = false
    })

    const updateInputText = () => {
      const displayText = this.isDisplayDialog ? `${this.displayText} (Press 'Enter')` : `${this.displayText}: ${this.inputText} ${this.getCursor()}`
      if (this.displayTextObj)
        this.displayTextObj.text = displayText
    };

    setInterval(() => {
      this.cursorShow = !this.cursorShow
      updateInputText()
    }, 400)
  }

  private closeDisplayInput = () => {
    if (this.displayBox) {
      this.displayBox.destroy()
    }
    if (this.displayTextObj) {
      this.displayTextObj.destroy()
    }
    if (this.inputBox) {
      this.inputBox.destroy()
    }
    if (this.inputTextObj) {
      this.inputTextObj.destroy()
    }
  }

  private newDisplayBox = () => {
    this.displayBox = add([
      rect(width() - 140, 140, {radius: 4}),
      anchor("center"),
      pos(center().x, height() - 100),
      outline(4),
      this.k.fixed(),
    ]);

    this.displayTextObj = this.k.add([
      text(`${this.displayText}`, {
        font: "monospace",
        size: 24,
        width: this.displayBox.width,
        align: "center",
      }),
      this.k.anchor("center"),
      this.k.pos(this.displayBox.pos),
      this.k.color(0, 0, 0),
      this.k.fixed(),
    ]);
  }

  showDisplay = (text: string, callback: ()=>void) => {
    this.isDisplayDialog = true
    this.displayText = text
    this.displayCallback = callback
    this.promptCallback = null
    this.newDisplayBox()
  }

  askInput = (prompt: string, callback: (value: string) => void) => {
    this.isDisplayDialog = false
    this.displayText = prompt
    this.inputText = ""
    this.displayCallback = null
    this.promptCallback = callback
    this.newInputBox()
  }

  private newInputBox() {
    this.inputBox = this.k.add([
      rect(width() - 140, 140, { radius: 4 }),
      anchor("center"),
      pos(center().x, height() - 100),
      outline(4),
      this.k.fixed(),
    ]);

    this.displayTextObj = this.k.add([
      text(`${this.displayText}: ${this.inputText} ${this.getCursor()}`, {
        font: "monospace",
        size: 24,
        width: this.inputBox.width,
        align: "center",
      }),
      this.k.anchor("center"),
      this.k.pos(this.inputBox.pos),
      this.k.color(0, 0, 0),
      this.k.fixed(),
    ]);
  }
}
