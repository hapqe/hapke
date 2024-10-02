<script>
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
</script>

<div id="canvas-frame">
  <Canvas>
    <Scene />
  </Canvas>
</div>
<div id="content">
  <h1>Konrad Hapke</h1>
</div>

<style>
  #canvas-frame {
    position: fixed;
    height: 100svh;
    width: 100svw;
  }
  h1 {
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;

    color: white;
  }
  #content {
    width: 100%;
    margin-left: 2rem;
  }
</style>
