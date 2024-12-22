import {GameObj, KAPLAYCtx} from "kaplay/dist/declaration/types";

export class DisplayBox {
  k: KAPLAYCtx<{}, never>;
  private displayBox: GameObj
  private displayTextObj: GameObj;
  private displayText: string;
  private callback: () => void;

  constructor(k: KAPLAYCtx<{}, never>) {
    this.k = k;

    onKeyPress("enter", () => {
      this.closeInput()
      if (this.callback) this.callback()
    });
  }

  private closeInput = () => {
    if (this.displayBox) {
      this.displayBox.destroy()
    }
    if (this.displayTextObj) {
      this.displayTextObj.destroy()
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
    this.displayText = text
    this.callback = callback
    this.newDisplayBox()
  }
}
