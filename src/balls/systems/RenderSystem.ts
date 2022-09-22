import { Entity, System, World } from "../../engine"
import MovementComponent from "../components/MovementComponent"
import TransformComponent from "../components/TransformComponent"

export default class RenderSystem extends System {
  constructor(world: World) {
    super("render", world)
  }

  drawVelocity(context: CanvasRenderingContext2D, entity: Entity) {
    const { position } = entity.getComponent<TransformComponent>("transform")
    const movement = entity.getComponent<MovementComponent>("movement")

    if (!movement) {
      return
    }

    const { velocity } = movement
    if (velocity.x === 0 && velocity.y === 0) {
      return
    }

    const velocityText = `${velocity.x.toFixed(1)},${velocity.y.toFixed(1)}`

    context.fillStyle = "#0000ff"
    context.fillText(velocityText, position.x, position.y - 2)
    context.beginPath()
    context.moveTo(position.x, position.y)
    context.lineTo(position.x + velocity.x * 10, position.y + velocity.y * 10)
    context.stroke()
  }

  execute(dt: number) {
    const { entities } = this.world
    const { context, canvas } = window

  context.clearRect(0, 0, canvas.width, canvas.height)

    entities
      .filter((p) => p.hasComponent("transform"))
      .forEach((entity) => {
        const { position, size } =
          entity.getComponent<TransformComponent>("transform")

        if (entity.name === "player") {
          context.fillStyle = "#ffcccc"
          context.beginPath()
          context.arc(position.x, position.y, size, 0, Math.PI * 2, true)
          context.fill()
        } else {
          context.fillStyle = "#ffffff"
          context.beginPath()
          context.arc(position.x, position.y, size, 0, Math.PI * 2, true)
          context.fill()
        }

        this.drawVelocity(context, entity)
      })
  }
}
