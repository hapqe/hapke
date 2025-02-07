<script>
    import {Vector2} from "three";

    export let src = "";
    export const width = "100px";
</script>

<div>
    <img style="
    width: {width}
" src="{src}" alt="">
    <slot />
</div>

<style>
    div {
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