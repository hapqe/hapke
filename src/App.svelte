<script context="module">
  import { writable } from "svelte/store";

  /** @type {import('svelte/store').Writable<number | undefined>} */
  export const scrollState = writable(undefined);
  export const disableButton = writable(false);
  export const enable3d = writable(true);

  /** @type {import('svelte/store').Writable<{x: number, y: number}>} */
  export const mouseState = writable({ x: 0.5, y: 0.5 });
  export const scrollFactor = new Tween(0);
</script>

<script>
  import { Canvas } from "@threlte/core";
  import Scene from "./lib/Scene.svelte";
  import Header from "./lib/Header.svelte";
  import About from "./lib/About.svelte";
  import Projects from "./lib/Projects.svelte";
  import Contact from "./lib/Contact.svelte";
  import { fade } from "svelte/transition";
  import { Tween } from "svelte/motion";

  import projects from "./assets/projects.json";

  window.addEventListener("load", () => {
    $disableButton = window.scrollY < 10;
  });

  scrollState.subscribe((s) => {
    scrollFactor.set(s === 0 ? 1 : 0);
  });
</script>

{#if $enable3d}
  <div transition:fade id="canvas-frame">
    <Canvas>
      <Scene />
    </Canvas>
  </div>
{/if}

<div id="content">
  <Header />
  <About />
  <div id="projects">
    <h2>Projects</h2>
    {#each projects as kind}
      <Projects {kind} />
    {/each}
  </div>
  <Contact />
</div>

<style>
  #projects {
    pointer-events: auto;
    margin-top: 50vh;
  }
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
