<script>
    import {Vector2} from "three";

    export let src = "";
    /** @type {'normal' | 'big' | 'small'} */
    export const width = "normal";

    import {mouseState} from './App.svelte'

    const widths = {
        normal: "350px",
        big: "500px",
        small: "200px"
    };

    /** @type {HTMLDivElement} */
    let element;

    mouseState.subscribe(({x, y}) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();

        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const offset = new Vector2(x - centerX, y - centerY);
        const normalized = offset.clone().normalize();

        rotateStr = `rotate3d(${-normalized.y}, ${normalized.x}, 0, ${normalized.length() * 2}deg)`;
    });

    let rotateStr = ``
</script>

<div bind:this={element} style="transform: {rotateStr}" >
    <img style="

    width: {widths[width]}
" src="{src}" alt="">
    <slot />
</div>

<style>
    div {
        /*transform-origin: center center -100px;*/
        transition: 0.1s;

        width: fit-content;
        height: fit-content;
        padding: 1rem;
        border: 1px solid #5f5f5f;

        display: flex;
        flex-direction: column;

        gap: 1rem;

        cursor: pointer;
    }

    div:hover {
        transform: scale(1.02) !important;
    }

</style>