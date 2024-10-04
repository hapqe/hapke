<script>
    import {inview} from "svelte-inview";
    import Cv from "./Cv.svelte";
    import {scrollState} from "./App.svelte";
</script>

<div
        id="about"
        use:inview
        on:inview_enter={() => {
    scrollState.set(1);
  }}
>
    <div id="right">
        <h2>
            About Me <br/>
        </h2>
        <p>
            <semitransparent>
                I crafting interfaces that not only perform but leave a lasting
                impression. With a deep fluency in a wide range of programming languages
                and a flair for 3D artistry, my projects span from sleek, interactive
                designs to immersive visual worlds. My journey through over 160 Blender
                renders is a testament to my passion for transforming pixels into
                stories. Let’s bring your vision to life, one line of code at a time.
            </semitransparent>
        </p>

        <div id="downloads">
            <Cv/>
            <p>
                <semitransparent> or download the</semitransparent>
                <a href="">german version</a>
            </p>
        </div>
    </div>

    <img src="me.jpg" alt="Konrad Hapke"/>
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
