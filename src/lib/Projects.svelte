<script>
  import Project from "./Project.svelte";
  import { inview } from "svelte-inview";
  import { scrollState } from "../App.svelte";
</script>

<div
  id="projects"
  use:inview
  on:inview_enter={() => {
    scrollState.set(2);
  }}
>
  <h2>Projects</h2>
  <h3 style="opacity: .6;">This site is work in progress!</h3>

  <!-- <div id="wrapper"> -->
  <!--   <Project src="ferris.jpg" width="200px">Dystopic Ferris Wheel</Project> -->
  <!--   <Project src="ferris.jpg" width="200px">Dystopic Ferris Wheel</Project> -->
  <!--   <Project src="ferris.jpg" width="200px">Dystopic Ferris Wheel</Project> -->
  <!--   <Project src="ferris.jpg" width="200px">Dystopic Ferris Wheel</Project> -->
  <!-- </div> -->
</div>

<style>
  #projects {
    pointer-events: auto;
    margin-top: 50vh;
  }

  #wrapper {
    perspective: 300px;

    pointer-events: auto;
    display: grid;
    justify-content: center;
    align-items: center;
    gap: 5rem;

    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    flex-wrap: wrap;

    padding: 3rem;
  }
</style>
