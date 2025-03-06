<script>
  import Project from "./Project.svelte";
  import { inview } from "svelte-inview";
  import { scrollState } from "../App.svelte";
  import Image from "./Image.svelte";
  import "photoswipe/style.css";
  import "photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css";
  import PhotoSwipeLightbox from "photoswipe/lightbox";
  import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
  import PhotoSwipeVideoPlugin from "../../lib/photoswipe-video-plugin";
  import play from "../assets/play.svg";
  import { onMount } from "svelte";

  export let kind;

  // Create an array with styles for each image: "big" (2x size), "wide" (2x width), or null (default size)
  // for later swap_images() { mv "$1.jpg" tmp1.jpg && mv "$1_t.jpg" tmp1_t.jpg && mv "$2.jpg" "$1.jpg" && mv "$2_t.jpg" "$1_t.jpg" && mv tmp1.jpg "$2.jpg" && mv tmp1_t.jpg "$2_t.jpg"; }

  let imagesProgramming = Array.from({ length: 1 }, (_, i) => `${i}_t.jpg`);

  let activeProject = -1;

  onMount(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#images",
      children: "a",
      zoom: false,
      arrowNextSVG:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chevron-right" viewBox="0 0 16 16">   <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/> </svg>',
      arrowPrevSVG:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chevron-left" viewBox="0 0 16 16">   <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/> </svg>',
      closeSVG:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-x"   viewBox="0 0 16 16">   <path     d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" /> </svg>',
      counter: false,
      pswpModule: () => import("photoswipe"),
    });

    const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
      type: "auto",
    });

    const videoPlugin = new PhotoSwipeVideoPlugin(lightbox, {});

    lightbox.init();
  });
</script>

<div
  id="projects"
  use:inview
  on:inview_enter={() => {
    scrollState.set(2);
  }}
>
  <h3>{kind.header}</h3>

  <div class="grid-container pswp-gallery" id="images">
    {#each kind.projects as project, i}
      <a
        target="_blank"
        href={"projects/" +
          kind.folder +
          "/" +
          i +
          (project.type == "video" ? "_v.mp4" : ".jpg")}
        data-pswp-type={project.type}
        data-pswp-video-src={project.type == "video"
          ? "projects/" + kind.folder + "/" + i + "_v.mp4"
          : ""}
        data-pswp-width={project.style == "wide" ? 2160 : 1080}
        data-pswp-height={1080}
        class="grid-item {project['style']}"
        style="view-transition-name: image-{i};"
        rel="noreferrer"
      >
        <Image
          c="project-img"
          src={`/projects/${kind.folder}/${i}.jpg`}
          alt={`3d render ${i}`}
        />
        <div class="title">
          <div class="desc-content">{project.title}</div>
        </div>
        <span class="pswp-caption-content">{project.desc}</span>
        <div class="play">
          <img src={play} alt="Play video" />
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  a[data-pswp-type="video"] {
    .play {
      height: 100%;
      position: static;
      transform: translateY(-100%);
      justify-content: center;
      display: flex;
      pointer-events: none;
      img {
        filter: drop-shadow(16px 16px 20px);
        width: 4rem;
      }
    }
  }
  .title {
    position: static;
    height: 0;
    width: 100%;
    * {
      text-align: right;
      font-size: 15px;
      padding: 5px;
      background: white;
      transition: 100ms;
      pointer-events: none;
      font-weight: 600;
    }
  }

  @media (pointer: fine) {
    .grid-item:hover .title * {
      transform: translateY(-100%);
    }
  }

  h3 {
    margin-top: 5rem;
    text-align: left;
    padding-left: 10svw;
  }

  .grid-container {
    display: grid;
    padding-left: 10svw;
    padding-right: 10svw;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .grid-item {
    all: unset;
    overflow: hidden;
    transition: 0.3s ease;
    aspect-ratio: 1;
  }

  .grid-item.big {
    grid-column: span 2;
    grid-row: span 2;
  }

  .grid-item.wide {
    grid-column: span 2;
    grid-row: span 1;
    aspect-ratio: 2.1;
  }

  @media (max-width: 768px) {
    .grid-item.big {
      aspect-ratio: 1;
      grid-column: span 1;
      grid-row: span 1;
      height: auto;
    }
  }
</style>
