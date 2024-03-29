<script lang="ts">
  import Row from './Row.svelte'
  import Nav from './Nav.svelte'
  import Menu from './Menu.svelte'
  import Git from './Git.svelte'
  import fs from '../../fs'
  import path from '@jkearl/lightning-fs/src/path'
  /**
   * Find the root git directory
   *
   * Starting at `filepath`, walks upward until it finds a directory that contains a subdirectory called '.git'.
   */
  async function findRoot({
    fs,
    filepath
  }: {
    fs: any
    filepath: string
  }): Promise<string> {
    if (await fs.exists(path.join(filepath, '.git'))) {
      return filepath
    } else {
      const parent = path.dirname(filepath)
      if (parent === filepath) {
        throw new Error(`git root for ${filepath}`)
      }
      return findRoot({ fs, filepath: parent })
    }
  }
  export let startingdir: string = '/'
  let directory = startingdir
  let context: HTMLMenuElement
  let contextfile = ''

  $: files = fs.promises.readdir(directory)
  $: gitdir = findRoot({
    filepath: directory,
    fs
  })
</script>

<div class="root">
  <Nav bind:contextfile bind:directory>
    <button
      title="Refresh"
      aria-label="Refresh"
      on:click={() => (files = fs.promises.readdir(directory))}>↻</button
    >
  </Nav>
  <main>
    {#await gitdir}
      {''}
    {:then gitdir}
      <Git bind:dir={directory} gitdir={path.resolve(gitdir, '.git')} />
    {:catch}
      {''}
    {/await}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date modified</th>
          <th>Size</th>
        </tr>
      </thead>
      {#await files then files}
        {#each files as file}
          <Row {file} bind:directory bind:contextfile {context} />
        {:else}
          No files found!
        {/each}
      {/await}
    </table>
  </main>
  <Menu bind:context bind:contextfile bind:files />
</div>

<style lang="postcss">
  div:not(.root) {
    display: contents;
  }
  thead th {
    text-align: left;
    &:not(:last-of-type) {
      border-right: solid 1px gray;
    }
  }
  .root {
    background: black;
    color: white;
    min-height: calc(100% - 35px);
    min-width: 100%;
  }
  button {
    background: none;
    padding: 0;
    color: white;
    border: 0;
    margin: 0;
    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  @media (prefers-color-scheme: light) {
    button {
      color: black;

      &:hover,
      &:focus {
        background: rgba(0, 0, 0, 0.3);
      }
    }

    .root {
      background: rgb(255, 255, 255);
      color: black;
    }
  }
</style>
