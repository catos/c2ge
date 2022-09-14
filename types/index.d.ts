import EventEmitter from "eventemitter3"
import InputManager from "../src/ecs/InputManager"

declare global {
  interface Window {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    ee: EventEmitter
    input: InputManager
  }
}
