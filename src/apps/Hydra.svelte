<script lang="ts">
  import { onMount } from 'svelte'
  import { sessions } from '../stores'
  import { close, nanoid } from '../util'
  export let session: string
  const self = $sessions.find((sess) => sess.id === session)!.app
  onMount(() => () => {
    $sessions = [
      ...$sessions,
      {
        app: self,
        id: nanoid(),
        minimized: false,
      },
      {
        app: self,
        id: nanoid(),
        minimized: false,
      }
    ]
  })
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<main>
  <audio autoplay src="https://www.windows93.net/c/sys/sounds/CHORD.ogg" />
  <img src="https://windows93.net/c/sys/skins/w93/apps/hydra.png" alt="Hydra" />
  <article>
    Cut off a head, two more will take its place.<br />
    [ Hydra ViRuS BioCoded by Typhon/Echidna ]<br />
    <button on:click={() => close(session)}>OK</button>
  </article>
</main>

<style>
  main {
    background: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100%;
    text-align: center;
  }
  @media (prefers-color-scheme: light) {
    main {
      background: white;
      color: black;
    }
  }
</style>
