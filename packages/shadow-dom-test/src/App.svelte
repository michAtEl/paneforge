<svelte:options 
    customElement = {{
        tag: 'paneforge-test'
    }}
/>

<script lang="ts">
  import { Pane, PaneGroup, PaneResizer } from "paneforge";

  let container: HTMLDivElement;
</script>

<div>
  <p bind:this={container}>drag the grey bar</p>
  <PaneGroup direction="horizontal" getRoot={() => container.getRootNode()}>
    <Pane defaultSize={50} style="background-color: lightgreen;">
      left
    </Pane>
    <PaneResizer style="display: flex; justify-content: center; align-items: center; width: 0.5rem; z-index: 1000; background-color: #b3b3b3;">
    </PaneResizer>
    <Pane defaultSize={50} style="background-color: lightgreen;">
    right
    </Pane>
  </PaneGroup>
</div>