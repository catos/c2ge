import World from "./World"

export default class System {
  name: string
  world: World

  constructor(name: string, world: World) {
    this.name = name
    this.world = world
  }

  execute(dt: number) {}
}