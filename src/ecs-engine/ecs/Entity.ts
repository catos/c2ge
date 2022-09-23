import Component from "./Component"

export default class Entity {
  name: string
  components: Component[] = []

  constructor(name: string) {
    this.name = name
  }

  hasComponent(name: string) {
    return this.components.some((p) => p.name === name)
  }

  getComponent<T extends Component>(name: string): T {
    return this.components.find((p) => p.name === name) as T
  }

  addComponent(component: Component) {
    if (this.components.find((p) => p.name === component.name)) {
      throw new Error(`Component with name: ${component.name} already exist`)
    }
    this.components.push(component)
  }
}
