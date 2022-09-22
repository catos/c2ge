export default class Canvas {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  
  constructor() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    if (!canvas) {
      throw new Error("No canvas found!")
    }
    this.canvas = canvas

    const context = canvas.getContext("2d")
    if (!context) {
      throw new Error("No context found!")
    }
    this.context = context
  }
}
