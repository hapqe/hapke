<script>
  import { inview } from "svelte-inview";
  import { disableButton, scrollState, enable3d } from "../App.svelte";
  import { fade } from "svelte/transition";
</script>

{#if $disableButton}
  <div transition:fade id="disable">
    <h3>Disable 3d</h3>
    <label for="toggle">
      <input
        bind:checked={$enable3d}
        class="input"
        type="checkbox"
        id="toggle"
      />
      <div class="toggle-wrapper"><span class="selector"></span></div>
    </label>
  </div>
{/if}
<main class={$enable3d ? "" : "middle"}>
  <h1
    use:inview
    on:inview_enter={() => {
      if ($scrollState !== 0) scrollState.set(0);
    }}
    class="header"
  >
    <semitransparent> I'm </semitransparent>
    Konrad Hapke <br />
    <semitransparent> informatics student at </semitransparent>
    <a target="_blank" href="https://tuwien.ac.at"
      ><semitransparent>TU Wien</semitransparent></a
    >
  </h1>
</main>

<style>
  #disable {
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 2rem;
    display: flex;
    gap: 0.6rem;
    h3 {
      margin: 0;
    }
    opacity: 0.5;
  }
  .header {
    margin-left: 4rem;
    margin-right: 4rem;
    transform: translateY(50%);
    margin-bottom: 100vh;

    pointer-events: auto;
  }

  a {
    all: unset;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-thickness: 3px;
  }
  a:hover * {
    transform: scale(1.1);
    opacity: 1 !important;
  }

  label {
    pointer-events: none;
  }
  label .input {
    display: none;
  }
  label .input:checked + .toggle-wrapper > .selector {
    left: calc(100% - 45px);
    background-color: var(--background-color);
  }
  label .toggle-wrapper {
    position: relative;
    width: 50px;
    height: 25px;
    background-color: black;
    border-radius: 999px;
    margin: auto;
    cursor: pointer;
    pointer-events: all;
  }
  label .toggle-wrapper .selector {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
    background-color: var(--background-color);
    transition: left 0.25s ease;
    border-radius: 50%;
  }
</style>
