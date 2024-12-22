import {GameObj, KAPLAYCtx} from "kaplay/dist/declaration/types";

export class InputBox {
  k: KAPLAYCtx<{}, never>;
  isShiftPressed = false
  inputPrompt = ""
  inputText = ""
  inputBox: GameObj
  inputTextObj: GameObj
  cursorShow = true
  getCursor = () => this.cursorShow ? "|" : " "
  private textEnteredCallback: (value: string) => void;
  constructor(k: KAPLAYCtx<{}, never>) {
    this.k = k;
    setInterval(() => {
      this.cursorShow = !this.cursorShow
      updateInputText()
    }, 500)

    onKeyDown("shift", () => {
      this.isShiftPressed = true
    })

    onKeyRelease("shift", () => {
      this.isShiftPressed = false
    })

    const updateInputText = () => {
      if (this.inputTextObj)
        this.inputTextObj.text = `${this.inputPrompt}: ${this.inputText} ${this.getCursor()}`
    };

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

    onKeyPress("enter", () => {
      if (this.textEnteredCallback)
        this.textEnteredCallback(this.inputText)
      this.closeInput()
    });
  }

  private newInputBox = () => {

    this.inputBox = this.k.add([
      rect(width() - 140, 140, { radius: 4 }),
      anchor("center"),
      pos(center().x, height() - 100),
      outline(4),
      this.k.fixed(),
    ]);

    this.inputTextObj = this.k.add([
      text(`${this.inputPrompt}: ${this.inputText} ${getCursor()}`, {
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

  askInput = (prompt: string, callback: (value: string) => void) => {
    this.inputPrompt = prompt
    this.inputText = ""
    this.textEnteredCallback = callback
    if (this.inputBox) {
      this.closeInput()
    }
    this.newInputBox()
  }

  private closeInput() {
    if (this.inputBox) {
      this.inputBox.destroy()
    }
    if (this.inputTextObj) {
      this.inputTextObj.destroy()
    }
  }
}