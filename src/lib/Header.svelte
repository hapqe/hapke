<script>
  import { inview } from "svelte-inview";
  import { scrollState } from "../App.svelte";
</script>

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

<style>
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
</style>
