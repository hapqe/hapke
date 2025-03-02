<script>
  import Project from "./Project.svelte";
  import { inview } from "svelte-inview";
  import { scrollState } from "../App.svelte";
  import projects from "../assets/projects.json";

  // Create an array with styles for each image: "big" (2x size), "wide" (2x width), or null (default size)
  // for later swap_images() { mv "$1.jpg" tmp1.jpg && mv "$1_t.jpg" tmp1_t.jpg && mv "$2.jpg" "$1.jpg" && mv "$2_t.jpg" "$1_t.jpg" && mv tmp1.jpg "$2.jpg" && mv tmp1_t.jpg "$2_t.jpg"; }

  let imagesProgramming = Array.from({ length: 1 }, (_, i) => `${i}_t.jpg`);
</script>

<div
  id="projects"
  use:inview
  on:inview_enter={() => {
    scrollState.set(2);
  }}
>
  <h2>Projects</h2>
  <h3>3d Renders</h3>

  <div class="grid-container">
    {#each projects["3d"] as project, i}
      <div class="grid-item {project['style']}">
        <img
          src={`/projects/3d/${i + (!(project["type"] === "video") && project["style"] === "big" ? "" : "_t") + ".jpg"}`}
          alt={`3d render ${i}`}
        />
      </div>
    {/each}
  </div>

  <h3>Programming</h3>

  <div class="grid-container">
    {#each imagesProgramming as image, i}
      <div class="grid-item">
        <img
          src={`/projects/programming/${image}`}
          alt={`Image of programming project ${image}`}
        />
      </div>
    {/each}
  </div>
</div>

<style>
  h3 {
    margin-top: 5rem;
    text-align: left;
    padding-left: 10svw;
  }
  #projects {
    pointer-events: auto;
    margin-top: 50vh;
  }

  .grid-container {
    display: grid;
    padding-left: 10svw;
    padding-right: 10svw;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .grid-item {
    width: 100%;
    overflow: hidden;
    transition: 0.3s ease;
  }

  .grid-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    transition: 0.3s ease;
  }

  .grid-item img:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  /* Big images: occupy twice the row and column space */
  .grid-item.big {
    grid-column: span 2;
    grid-row: span 2;
    height: auto; /* Allow full expansion */
  }

  /* Remove fixed height for wide images and calculate it dynamically */
  .grid-item.wide {
    grid-column: span 2;
    grid-row: span 1;
    aspect-ratio: 2 / 1; /* Wide images are now twice as wide as they are tall */
    height: auto; /* Let the aspect-ratio control the height */
  }

  @media (max-width: 768px) {
    .grid-item.big,
    .grid-item.wide {
      grid-column: span 1;
      grid-row: span 1;
      aspect-ratio: 1 / 1; /* Make wide images square on smaller screens */
      height: auto;
    }
  }
</style>
