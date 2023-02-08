<!--
    The TagsContainer component is responsible for displaying tags.
-->
<script lang="ts">
  export let tags: string[];

  // Returns the bullet entity code, only if it is not the last tag.
  const getBullEntity = (index: number): string =>
    index !== tags.length - 1 ? "&bull;" : "";
</script>

<div class="tags-container">
  {#each tags as tag, index}
    <p>{tag}</p>
    <p>{@html getBullEntity(index)}</p>
  {/each}
</div>

<style>
  .tags-container {
    display: flex;
    gap: 2px;
  }
</style>
