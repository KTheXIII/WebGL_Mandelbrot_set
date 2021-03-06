import { Time } from './Time'
import { clamp } from 'Engine/Math'

type ContextMode = '2d' | 'webgl' | 'webgl2'

/**
 * Creates Display area for canvas to render in.
 */
export class Display {
  parent: HTMLDivElement
  canvas: HTMLCanvasElement

  private resolution: number = 1.0

  canResize: boolean = true

  /**
   * Create display area.
   *
   * Contains parent element with canvas element inside with width and height sets to 100%.
   *
   * @param parent Parent element canvas appends to
   */
  constructor(parent?: HTMLDivElement) {
    this.parent = parent ? parent : document.createElement('div')
    if (!parent) {
      this.parent.id = 'Display'
      document.body.appendChild(this.parent)
    }

    this.canvas = document.createElement('canvas')
    this.canvas.innerHTML = 'Your browser does not support HTML5.'
    this.canvas.id = 'DisplayRenderer'
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.parent.appendChild(this.canvas)

    this.setFill()
    this.resize()
  }

  update(time: Time): void {
    this.resize()
  }

  setFill() {
    this.setSize(100, 100, '%')
  }

  /**
   * Set the display size.
   * @param width Display width
   * @param height Display height
   * @param unit The display unit, default is `px`. Example: `%`, `pt`, etc.
   */
  setSize(width: number, height: number, unit: string = 'px') {
    this.parent.style.width = width + unit
    this.parent.style.height = (height ? height : width) + unit
  }

  resize(): void {
    const displayWidth = Math.round(
      this.canvas.clientWidth * devicePixelRatio * this.resolution
    )
    const displayHeight = Math.round(
      this.canvas.clientHeight * devicePixelRatio * this.resolution
    )

    if (this.width != displayWidth || this.height != displayHeight) {
      this.canvas.width = displayWidth
      this.canvas.height = displayHeight
    }
  }

  /**
   * Return window width
   */
  get windowWidth() {
    return window.innerWidth
  }

  /**
   * Return window height
   */
  get windowHeight() {
    return window.innerHeight
  }

  /**
   * Return display width
   */
  get displayWidth() {
    return this.parent.clientWidth
  }

  /**
   * Return display height
   */
  get displayHeight() {
    return this.parent.clientHeight
  }

  /**
   * Return display width times device pixel ratio
   */
  get displayWidthPixelRatio() {
    return this.parent.clientWidth * devicePixelRatio
  }

  /**
   * Return display height times device pixel ratio
   */
  get displayHeightPixelRatio() {
    return this.parent.clientHeight * devicePixelRatio
  }

  /**
   * Return canvas width
   */
  get width() {
    return this.canvas.width
  }

  /**
   * Return canvas height
   */
  get height() {
    return this.canvas.height
  }

  /**
   * Return canvas width and height ratio
   */
  get ratio() {
    return this.canvas.width / this.canvas.height
  }

  /**
   * Set resolution scale
   * @param scale Value from 0 to 1. The value clamp at 0.
   */
  setResolution(scale: number): void {
    this.resolution = clamp(scale, 0, scale)

    this.resize()
  }

  getContext(mode: ContextMode) {
    return this.canvas.getContext(mode)
  }

  getWebGLContext(): WebGLRenderingContext {
    const context = this.canvas.getContext('webgl')
    if (!context) throw new Error("Error can't get WebGL context")

    return context as WebGLRenderingContext
  }
}

export default Display
