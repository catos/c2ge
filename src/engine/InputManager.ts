export default class InputManager {
  keysDown: Map<string, boolean> = new Map()
  mappedKeys: string[] = ["F1", "F2", "F3", "F4", "F5"]

  constructor() {
    this.listen()
  }

  listen() {
    const { ee } = window

    ;["keydown", "keyup"].forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        if (event instanceof KeyboardEvent) {
          const { code, type } = event

          // TODO: only handle configured keys ?
          // if (!this.keyMap.has(code)) {
          //   return
          // }

          // Prevent default behaviour on all configured keys
          if (this.mappedKeys.find((p) => p === code)) {
            event.preventDefault()
          }

          // Prevent multifire
          if (this.keysDown.has(code) && type === "keydown") {
            return
          }

          // Update keysdown
          if (type === "keydown") {
            this.keysDown.set(code, true)
          } else if (type === "keyup") {
            this.keysDown.delete(code)
          }
        }
      })
    })

    window.addEventListener("keyup", (event) => {
      ee.emit("keyup", event)
    })
  }
}
