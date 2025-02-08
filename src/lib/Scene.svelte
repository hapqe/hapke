<script>
  import { T } from "@threlte/core";
  import Desk from "./Desk.svelte";
  import { disableButton, mouseState } from "../App.svelte";
  import Robot from "./Robot.svelte";

  window.addEventListener("pointermove", (e) => {
    let x = e.clientX;
    let y = e.clientY;

    mouseState.set({ x, y });
  });

  window.addEventListener("scroll", () => {
    mouseState.set($mouseState);
    $disableButton = window.scrollY < 10;
  });
</script>

<T.Group scale={0.1}>
  <Desk />
  <Robot />
</T.Group>
