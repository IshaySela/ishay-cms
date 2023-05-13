<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import type { Content } from "../../../Models/Content";
  import { marked } from "marked";
  import DOMPurify from "dompurify";
  import TagsContainer from "../../../components/TagsContainer.svelte";
  import { NotificationService } from "../../../services/NotificationService";
  
  let contentId: string | undefined = undefined;
  let content: Content | undefined = undefined;

  onMount(() => {
    const contentId = $page.params.id;
    const contentJson = localStorage.getItem(contentId);
    if (contentJson === null) {
      console.error({contentId, contentJson})
      NotificationService.danger('Error on parsing json for <contentId>')
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
  <div>
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

