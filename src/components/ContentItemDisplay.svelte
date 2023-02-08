<!--
  The component ContentItemDisplay is used to display a short summary of the content.
  Note: bannerImg should be santized before it is passed to the component.
-->
<script lang="ts">
  import type { DisplayContent } from "../Models/Content";
  export let displayContent: DisplayContent;

  // Returns the bullet entity code, only if it is not the last tag.
  const getBullEntity = (index: number): string =>
    index !== displayContent.tags.length - 1 ? "&bull;" : "";
</script>

<div class="display-content-container">
  <img class="banner-image" src={displayContent.bannerImage} alt="some-alt" />
  <div class="display-content-text-info">
    <h1>{displayContent.title}</h1>
    <h2>{displayContent.author}</h2>
    <p>{displayContent.description}</p>
    <div class="display-tags">
      {#each displayContent.tags as tag, index}
        <p>{tag}</p>
        <p>{@html getBullEntity(index)}</p>
      {/each}
    </div>
  </div>
</div>

<style>
  .display-content-container {
    padding: 5px;
    display: flex;
    gap: 5px;
  }
  .display-content-container .banner-image {
    max-width: 300px;
    height: fit-content;
  }

  .display-content-container .display-content-text-info {
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  .display-content-text-info .display-tags {
    display: flex;
    gap: 2px;
  }
</style>
