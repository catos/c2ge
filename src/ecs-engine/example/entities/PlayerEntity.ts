import { Entity, Vector } from "../../engine"
import MovementComponent from "../components/MovementComponent"
import TransformComponent from "../components/TransformComponent"

export default class Player extends Entity {
  constructor() {
    super("player")

    this.addComponent(new TransformComponent(new Vector(100, 100), 16))
    this.addComponent(new MovementComponent())
  }
}
