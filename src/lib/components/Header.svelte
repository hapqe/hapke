<script>
  import { inview } from "svelte-inview";
  import { scrollState } from "./App.svelte";
</script>

<h1
  use:inview
  on:inview_enter={(event) => {
    if ($scrollState !== 0) scrollState.set(0);
  }}
  class="header"
>
  <semitransparent> I'm </semitransparent>
  Konrad Hapke <br />
  <semitransparent> and I turn caffeine into code! </semitransparent>
</h1>

<style>
  .header {
    margin-left: 4rem;
    margin-right: 4rem;
    transform: translateY(50%);
    margin-bottom: 100vh;

    pointer-events: auto;
  }
</style>
