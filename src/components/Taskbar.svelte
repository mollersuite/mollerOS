<script lang="ts">
  import Tray from './Tray.svelte'

  import { fly, slide } from 'svelte/transition'
  import { sessions } from '../stores'
  import { flip } from 'svelte/animate'
  let height: number
</script>

<nav
  class="taskbar"
  transition:fly={{ duration: 300, y: height, opacity: 1 }}
  bind:offsetHeight={height}
>
  <slot />
  {#each $sessions as session (session.id)}
    <button
      transition:slide={{ duration: 300 }}
      animate:flip={{ duration: 300 }}
      class:open={!session.minimized}
      title={session.app.name}
      on:click={() => {
        session.minimized = false
        $sessions = [...$sessions.filter((sess) => session !== sess), session]
      }}
    >
      <img src={session.app.icon} alt={session.app.name} height="30" />
    </button>
  {/each}
  <Tray />
</nav>

<style>
  .open {
    border-bottom: 2px solid #86e8ff;
  }
  .taskbar {
    z-index: 1000;
    background: rgba(50, 50, 60, 0.7);
    backdrop-filter: blur(10px);
    width: 100%;
    left: 0;
    max-height: 75vh;
    min-height: 36px;
    overflow-y: auto;
    bottom: 0;
    position: fixed;
  }

  @media (prefers-color-scheme: light) {
    .taskbar {
      background: rgba(150, 150, 230, 0.7);
    }
  }

  button {
    height: 100%;
    background: none;
    border: none;
    padding: 0 0.5em;
    margin: 0;
    transition: border-bottom 300ms;
  }
  button:hover,
  button:focus {
    background: #3e3e3e;
  }
  @media (max-width: 375px) {
    .taskbar {
      display: flex;
      justify-content: center;
      align-items: center;
      position: static;
    }
    .taskbar > :global(*:not(:first-child)) {
      display: none;
    }
  }
</style>
