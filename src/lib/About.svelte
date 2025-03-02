<script>
  import { inview } from "svelte-inview";
  import Cv from "./Cv.svelte";
  import { scrollState } from "../App.svelte";
  // import { Image } from "svelte-responsive-images";
</script>

<div id="about">
  <div id="right">
    <h2
      use:inview
      on:inview_enter={() => {
        scrollState.set(1);
      }}
    >
      About Me <br />
    </h2>
    <p>
      <semitransparent>
        I’m a hobby programmer, web developer, and 3D artist who loves bringing
        creative ideas to life. I went to a game dev school, which got me hooked
        on coding and making cool stuff. Now I’m studying informatics and always
        looking for new things to learn and build.
      </semitransparent>
    </p>

    <div id="downloads">
      <Cv />
      <p>
        <semitransparent> or download the</semitransparent>
        <a target="_blank" href="cv/Konrad_Hapke_CV.pdf">german version</a>
      </p>
    </div>
  </div>

  <img src="me.webp" alt="Konrad Hapke" />
</div>

<style>
  a {
    color: black;
    font-weight: bold;

    transition: 0.3s;
    opacity: 0.6;
  }

  a:hover {
    opacity: 1;
  }

  img {
    z-index: 10;
    width: 350px;
  }

  @media (max-width: 400px) {
    img {
      display: none;
    }

    #right {
      width: 100% !important;
    }

    #about {
      margin: 1rem;
    }

    p {
      margin-bottom: 3rem;
    }
  }

  #about {
    pointer-events: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    flex-wrap: wrap;
    gap: 6rem;

    margin: 4rem;
  }

  #right {
    width: 50%;
    display: flex;
    flex-direction: column;
    /* gap: 5rem; */
  }

  p {
    font-size: 1.2rem;
  }

  #downloads {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
