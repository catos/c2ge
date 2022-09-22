import { System, World } from "."

interface IItem {
  key: string
  value: any
}

export default class DebugSystem extends System {
  display = true
  items: IItem[] = [
    { key: "entities", value: 0 }
  ]

  constructor(world: World) {
    super("debug", world)
    const { ee } = window

    // Toggle debug display
    ee.on("keyup", (e) => {
      if (e.code === "KeyK") {
        this.display = !this.display
      }
    })

    // Add items to debug
    ee.on("debug", ({ key, value }: IItem) => {
      const existingItem = this.items.find((p) => p.key === key)
      existingItem
        ? (existingItem.value = value)
        : this.items.push({ key, value })
    })
  }

  execute(dt: number) {
    if (!this.display) {
      return
    }

    const { context } = window
    

    context.fillStyle = "#000000"
    context.font = "bold 12px Courier New"

    this.items.forEach((item, index) => {
      context.fillText(`${item.key}: ${item.value}`, 10, 15 * index + 15)
    })
  }
}
