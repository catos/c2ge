import { Entity, System, World } from "../../ecs"
import MovementComponent from "../components/MovementComponent"

export default class InputSystem extends System {
  constructor(world: World) {
    super("player-input", world)
  }

  execute(dt: number) {
    const { input, ee } = window
    const { entities } = this.world
    const player = entities.find((p: Entity) => p.name === "player")

    if (!player) {
      return
    }
    
    const { velocity, acceleration, direction } =
      player.getComponent<MovementComponent>("movement")

    // TODO: fix sequence stuff - A -> D = D, but D -> A = D
    // const lastKeyDown = Array.from(input.keysDown.keys()).slice(-1)[0]
    // if (input.lastKeyDown === "KeyD") {
    //   velocity.x = speed
    // }

    // Read inputs and update direction
    if (input.keysDown.has("KeyD")) {
      direction.x = 1
    } else if (input.keysDown.has("KeyA")) {
      direction.x = -1
    } else {
      direction.x = 0
    }

    // const currentXVelocity = Math.abs(velocity.x)

    // Accelerate
    if (direction.x !== 0) {
      velocity.x = velocity.x + acceleration * dt * direction.x
    }
    // else if (velocity.x !== 0) {
    //   const decel = Math.min(currentXVelocity, acceleration * 0.5 * dt)
    //   velocity.x += velocity.x > 0 ? -decel : decel
    // }

    ee.emit("debug", {
      key: "direction",
      value: `x: ${direction.x}, y: ${direction.y}`,
    })
    ee.emit("debug", {
      key: "velocity",
      value: `x: ${velocity.x}, y: ${velocity.y}`,
    })
    ee.emit("debug", {
      key: "acceleration",
      value: acceleration,
    })
  }
}
