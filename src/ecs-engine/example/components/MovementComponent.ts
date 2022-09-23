import { Component, Vector } from "../../engine"

export default class MovementComponent extends Component {
  direction: Vector
  velocity: Vector
  acceleration: number

  constructor(velocity = Vector.ZERO, acceleration = 500) {
    super("movement")
    this.direction = Vector.ZERO
    this.velocity = velocity
    this.acceleration = acceleration
  }
}