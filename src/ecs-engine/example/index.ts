import { EventEmitter } from "eventemitter3"
import { DebugSystem, InputManager, World } from "../engine"
import GameLoopManager from "../engine/GameLoopManager"
import Player from "./entities/PlayerEntity"
import CollisionSystem from "./systems/CollisionSystem"
import MovementSystem from "./systems/MovementSystem"
import PlayerInputSystem from "./systems/PlayerInputSystem"
import RenderSystem from "./systems/RenderSystem"
import SpawnerSystem from "./systems/SpawnerSystem"

// --- Canvas

const canvas = document.getElementById("canvas") as HTMLCanvasElement
if (!canvas) {
  throw new Error("No canvas found!")
}
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.canvas = canvas

const context = canvas.getContext("2d")
if (!context) {
  throw new Error("No context found!")
}
window.context = context

// --- Events

const ee = new EventEmitter()
window.ee = ee

// --- Input

const input = new InputManager()
window.input = input

// --- ECS

const world = new World() // ECS

// --- Systems

world.addSystem(new RenderSystem(world))
world.addSystem(new CollisionSystem(world))
world.addSystem(new SpawnerSystem(world))
world.addSystem(new MovementSystem(world))
world.addSystem(new PlayerInputSystem(world))
world.addSystem(new DebugSystem(world)) // "internal" system

// --- Entities

const player = new Player()
world.addEntity(player)

// --- Loop

const gameLoopManager = new GameLoopManager((dt: number) => {
  world.execute(dt)
})

gameLoopManager.start()
// var lastTime = performance.now()
// function update() {
//   var time = performance.now()
//   var delta = time - lastTime
//   lastTime = time

//   // TODO: move to renderer
//   window.context.clearRect(0, 0, canvasWidth, canvasHeight)

//   world.execute(delta)

//   requestAnimationFrame(update)
// }

// update()
