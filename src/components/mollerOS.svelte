<script lang="ts">
  import App from './Window.svelte'
  import Search from './Search.svelte'
  import Taskbar from './Taskbar.svelte'
  import Loading from './Loading.svelte'

  import { sessions, wallpaper } from '../stores'
  import { install as hotkey } from '@github/hotkey'

  let show_search = false
  $: {
    $sessions.forEach((session) => {
      if (typeof session.app.component == 'function') {
        session.app.component = session.app.component()
      }
    })
  }
</script>

<!--
@component
The mollerOS desktop.
-->
<body class={'molla ' + $wallpaper}>
  {#if show_search}
    <Search bind:shown={show_search} />
  {/if}
  <Taskbar>
    <button
      use:hotkey={'` `'}
      aria-label="Search"
      title="Search (Alt+A)"
      on:click={() => (show_search = !show_search)}
    >
      <img src="icon.svg" alt="mollerOS" height="30" />
    </button>
  </Taskbar>
  {#each $sessions as session (session.id)}
    <App {session}>
      {#await session.app.component}
        <article>
          <Loading />
        </article>
      {:then component}
        <svelte:component
          this={component.default}
          session={session.id}
          {...session.props}
        />
      {/await}
    </App>
  {/each}
</body>

<style>
  article {
    width: 100%;
    background: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
  }
  @media (prefers-color-scheme: light) {
    article {
      background: white;
      color: black;
    }
  }
  body {
    background-size: cover;
  }
  .bliss {
    background-image: url(../wallpapers/bliss.jpg);
  }
  .mollersuite {
    background-image: url(../wallpapers/mollersuite.png);
  }
  .upleft {
    background-image: url(https://5079.ml/branding/jack5079/pfp.jpg);
  }
  .v3 {
    background-image: url(../wallpapers/v3.png);
    background-position: center;
  }

  .vortex {
    background-image: url(../wallpapers/vortex.png);
    background-position: center;
  }
  button {
    background: none;
    border: none;
    /* height: 100%; */
    padding: 0 0.5em;
    margin: 0;
  }

  button:hover,
  button:focus {
    background: #3e3e3e;
  }
</style>
