import { Component, Vector } from "../../ecs"

export default class MovementComponent extends Component {
  direction: Vector
  velocity: Vector
  acceleration: number

  constructor(velocity = Vector.ZERO, acceleration = 1) {
    super("movement")
    this.direction = Vector.ZERO
    this.velocity = velocity
    this.acceleration = acceleration
  }
}