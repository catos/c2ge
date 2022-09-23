import { Entity, System, Vector, World } from "../../engine"
import TransformComponent from "../components/TransformComponent"
import { getRandom, getRandomInt } from "../../engine/utils"
import MovementComponent from "../components/MovementComponent"

export default class SpawnerSystem extends System {
  constructor(world: World) {
    super("ball-spawner", world)

    const { ee } = window
    ee.on("keyup", (e) => {
      if (e.code === "KeyQ") {
        this.spawnBall()
      }
    })
  }

  spawnBall() {
    const { entities } = this.world
    const { canvas } = window

    const ballCount = entities.filter((p) => p.name.startsWith("ball-")).length
    if (ballCount >= 10) {
      return
    }

    const ball = new Entity(`B${entities.length}`)
    ball.addComponent(
      new TransformComponent(
        new Vector(getRandomInt(canvas.width), getRandomInt(canvas.height)),
        16
      )
    )

    ball.addComponent(
      new MovementComponent(new Vector(getRandom(1, -1), getRandom(5, -5)))
    )

    this.world.addEntity(ball)
  }
}
