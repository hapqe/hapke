<script>
    import {T} from "@threlte/core";
    import Desk from "./Desk.svelte";
    import {mouseState} from "./App.svelte";

    window.addEventListener("pointermove", (e) => {
        let x = e.clientX;
        let y = e.clientY;

        mouseState.set({x, y});
    });

    window.addEventListener("scroll", () => {
        mouseState.set($mouseState);
    });
</script>

<T.Group scale={0.1}>
    <Desk/>
</T.Group>
