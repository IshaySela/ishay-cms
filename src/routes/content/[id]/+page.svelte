<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import type { Content } from "../../../Models/Content";
  import { marked } from "marked";
  import DOMPurify from "dompurify";
  import TagsContainer from "../../../components/TagsContainer.svelte";
  let contentId: string | undefined = undefined;
  let content: Content | undefined = undefined;

  onMount(() => {
    contentId = $page.params.id;
    const contentJson = localStorage.getItem(contentId);
    if (contentJson === null) {
      return (window.location.href = "/");
    }

    content = JSON.parse(contentJson) as Content;
  });

  const getSanitizedHtml = () => {
    if (content?.markdownContent === undefined) {
      console.error("Cant compile, content is undefined");
      return "";
    }

    return DOMPurify.sanitize(marked.parse(content.markdownContent));
  };
</script>

{#if content !== undefined}
  <div class="content-container">
    <img src={DOMPurify.sanitize(content.bannerImage)} alt={DOMPurify.sanitize(content.bannerImageAlt)} />

    <h1>{content.title}</h1>
    <h3>{content.author}</h3>

    <div class="rendered-markdown">
      {@html getSanitizedHtml()}
    </div>

    <div class="content-tags-container">
      <TagsContainer tags={content.tags} />
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
