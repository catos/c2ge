import Entity from "./Entity"
import System from "./System"

export interface IGameSettings {
  fps: number
  canvas: {
    width: number
    height: number
  }
}

export default class World {
  systems: System[] = []
  entities: Entity[] = []

  addSystem = (system: System) => {
    if (this.systems.find((p) => p.name === system.name)) {
      throw new Error(`System with name: ${system.name} already exist`)
    }
    this.systems.push(system)
  }

  addEntity = (entity: Entity) => {
    if (this.entities.find((p) => p.name === entity.name)) {
      throw new Error(`Entity with name: ${entity.name} already exist`)
    }
    this.entities.push(entity)

    window.ee.emit("debug", { key: "entities", value: this.entities.length })
  }

  removeEntity(entity: Entity) {
    this.entities = this.entities.filter((p) => p.name !== entity.name)
  }

  execute = (dt: number) => {
    this.systems.forEach((system) => system.execute(dt))
  }
}
