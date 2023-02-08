<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import type { Content } from "../../../Models/Content";
  import { marked } from 'marked'
  let contentId: string | undefined = undefined;
  let content: Content | undefined = undefined;

  onMount(() => {
    contentId = $page.params.id;
    const contentJson = localStorage.getItem(contentId);
    if(contentJson === null) {
      return window.location.href = '/';
    }

    content = JSON.parse(contentJson) as Content;
  });
</script>

{#if content !== undefined}
  <div class="content-container">
    <img src={content.bannerImage} alt="some alt" />
    <h1>{content.title}</h1>
    <div class="rendered-markdown">
      {@html marked.parse(content.markdownContent)}
    </div>
  </div>
{:else}
  <div>loading...</div>
{/if}

<style>
  .content-container {
    display: flex;
    flex-direction: column;
  }
</style>
