<script context="module">
  import { writable } from "svelte/store";
  export const scrollState = writable(0);
</script>

<script>
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import Header from "./Header.svelte";
  import About from "./About.svelte";
</script>

<div id="canvas-frame">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<div id="content">
  <Header />
  <About />
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
