<main>
  <h3>Konrad Fabian Hapke</h3>
  <div>
    <a href="mailto:hello@hapke.me"><img src="mail.svg" alt="email icon" /></a>
    <a target="_blank" href="https://github.com/hapqe"
      ><img src="github.svg" alt="github icon" /></a
    >
    <a target="_blank" href="https://instagram.com/kooler_konny"
      ><img src="insta.svg" alt="intagram icon" /></a
    >
  </div>
</main>

<style>
  h3 {
    font-weight: 500;
    opacity: 70%;
    margin: 0;
  }
  main {
    pointer-events: all;
    margin-top: 20rem;
    display: flex;
    justify-content: space-between;
    padding: 4rem;
    padding-bottom: 2rem;
    padding-top: 2.5rem;
    border-top: 3px dashed #000000a1;

    width: calc(100svw - 8rem);

    flex-wrap: wrap;
  }
  @media (max-width: 600px) {
    main {
      justify-content: space-around;
      gap: 2rem;
    }
  }

  img {
    width: 2rem;
    opacity: 0.7;
    transition: 0.3s;
  }
  img:hover {
    transform: scale(1.1);
    opacity: 1;
  }
  div {
    display: flex;
    gap: 2rem;
  }
</style>
