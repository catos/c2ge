import { System, World } from "../../ecs"
import TransformComponent from "../components/TransformComponent"
import MovementComponent from "../components/MovementComponent"

export default class MovementSystem extends System {
  constructor(world: World) {
    super("movement", world)
  }

  execute(dt: number) {
    const { entities } = this.world
    const { canvas } = window

    entities
      .filter((p) => p.hasComponent("movement"))
      .forEach((entity) => {
        const { position } =
          entity.getComponent<TransformComponent>("transform")
        const { velocity } = entity.getComponent<MovementComponent>("movement")
        position.x += velocity.x
        position.y += velocity.y

        if (position.x > canvas.width) {
          position.x = 0
        }

        if (position.x < 0) {
          position.x = canvas.width
        }

        if (position.y > canvas.height) {
          position.y = 0
        }

        if (position.y < 0) {
          position.y = canvas.height
        }
      })
  }
}
