import { Component, Vector } from "../../ecs"

export default class TransformComponent extends Component {
  position: Vector
  size: number

  constructor(position: Vector, size: number) {
    super("transform")
    this.position = position
    this.size = size
  }
}
