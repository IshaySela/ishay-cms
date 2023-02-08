<script lang="ts">
  import type { Content } from "../Models/Content";
  export let content: Content;
</script>

<div class="content-container">
  <p>{content.author}</p>
  <p>{content.bannerImage}</p>
  <p>
    {content.id}
  </p>
  <p>
    {content.markdownContent}
  </p>
  <p>
    {content.tags}
  </p>
  <p>
    {content.title}
  </p>
</div>

<style>
  .content-container {
    display: flex;
    flex-direction: column;
  }
</style>
