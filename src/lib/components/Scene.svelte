<script>
  import { T, useFrame } from "@threlte/core";
  import Desk from "./Desk.svelte";

  let rotation = 0;
  useFrame(() => {
    rotation += 0.001;
  });
</script>

<T.Group rotation.y={rotation}>
  <Desk />
</T.Group>
