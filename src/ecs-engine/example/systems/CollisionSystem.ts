import { Circle, System as Physics } from "detect-collisions"
import { System, World } from "../../engine"
import MovementComponent from "../components/MovementComponent"
import TransformComponent from "../components/TransformComponent"

export default class CollisionSystem extends System {
  physics: Physics

  constructor(world: World) {
    super("collision", world)

    this.physics = new Physics()
  }

  execute(dt: number) {
    const { entities } = this.world

    const _entities = entities.filter((p) => p.hasComponent("transform"))

    _entities.forEach((current) => {
      const currentTransform =
        current.getComponent<TransformComponent>("transform")

      const others = _entities.filter((p) => p.name !== current.name)
      others.forEach((target) => {
        const targetTransform =
          target.getComponent<TransformComponent>("transform")
        // const targetMov =
        //   target.getComponent<MovementComponent>("movement")

        if (
          this.physics.checkCollision(
            new Circle(currentTransform.position, currentTransform.size),
            new Circle(targetTransform.position, targetTransform.size)
          )
        ) {
          // console.log(
          //   `${current.name} is colliding with ${target.name}!`,
          //   this.physics.response
          // )

          const currentMovement =
            current.getComponent<MovementComponent>("movement")
          if (currentMovement) {
            currentMovement.velocity.x =
              currentMovement.velocity.x + this.physics.response.overlapV.x * -1
            currentMovement.velocity.y =
              currentMovement.velocity.y + this.physics.response.overlapV.y * -1
          }
        }
      })
    })
  }
}