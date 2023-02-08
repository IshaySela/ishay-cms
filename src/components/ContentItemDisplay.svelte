<!--
  The component ContentItemDisplay is used to display a short summary of the content.
  Note: bannerImg should be santized before it is passed to the component.
-->
<script lang="ts">
  import type { DisplayContent } from "../Models/Content";
  import TagsContainer from "./TagsContainer.svelte";
  export let displayContent: DisplayContent;

</script>

<div class="display-content-container">
  <img class="banner-image" src={displayContent.bannerImage} alt="some-alt" />
  <div class="display-content-text-info">
    <h1>{displayContent.title}</h1>
    <h2>{displayContent.author}</h2>
    <p>{displayContent.description}</p>
    <div class="display-tags">
      <TagsContainer tags={displayContent.tags}/>
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
</style>
