<script context="module">
  import { writable } from "svelte/store";

  /** @type {import('svelte/store').Writable<number | undefined>} */
  export const scrollState = writable(undefined);

  /** @type {import('svelte/store').Writable<{x: number, y: number}>} */
  export const mouseState = writable({ x: 0.5, y: 0.5 });
</script>

<script>
  import { Canvas } from "@threlte/core";
  import Scene from "./lib/Scene.svelte";
  import Header from "./lib/Header.svelte";
  import About from "./lib/About.svelte";
  import Projects from "./lib/Projects.svelte";
</script>

<div id="canvas-frame">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<div id="content">
  <Header />
  <About />
  <Projects />
</div>

<style>
  #canvas-frame {
    position: fixed;
    height: 100svh;
    width: 100svw;
    pointer-events: auto;
    z-index: 0;
  }

  #content {
    text-align: center;
    position: relative;

    pointer-events: none;
  }
</style>
