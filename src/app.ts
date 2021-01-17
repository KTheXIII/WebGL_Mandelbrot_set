import { Application } from 'Engine/Engine'
import { Sandbox } from 'Sandbox/Sandbox'

import UISvelte from './UI.svelte'

async function main() {
  const parent = document.querySelector('#app') as HTMLDivElement
  const uiParent = document.querySelector('#ui') as HTMLDivElement

  const app: Application = new Sandbox(parent)
  app.start()

  const ui = new UISvelte({
    target: uiParent,
  })
}

window.onload = async () => {
  main().catch(console.error)
}
