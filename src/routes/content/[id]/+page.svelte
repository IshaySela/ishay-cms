<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import type { Content } from "../../../Models/Content";
  import { marked } from "marked";
  import DOMPurify from "dompurify";
  import TagsContainer from "../../../components/TagsContainer.svelte";
  import { NotificationService } from "../../../services/NotificationService";

  let content: Content | undefined = undefined;

  onMount(() => {
    const contentId = $page.params.id;
    const contentJson = localStorage.getItem(contentId);
    if (contentJson === null) {
      console.error({ contentId, contentJson });
      NotificationService.danger("Error on parsing json for <contentId>");
      return (window.location.href = "/");
    }

    content = JSON.parse(contentJson) as Content;
  });

  const getSanitizedHtml = () => {
    if (content?.markdownContent === undefined) {
      console.error("Cant compile, content is undefined");
      return "";
    }

    const renderedHtml = marked.parse(content.markdownContent, {
      sanitizer(html) {
        return DOMPurify.sanitize(html);
      },
    });

    return renderedHtml;
  };
</script>

{#if content !== undefined}
  <div class="h-full w-full shadow-sm mb-4">
    <img
      class="h-full w-11/12 mx-auto"
      src={DOMPurify.sanitize(content.bannerImage)}
      alt={DOMPurify.sanitize(content.bannerImageAlt)}
    />
  </div>
  <article class="mx-auto prose lg:prose-xl bg-white shadow-sm">
    <div class="ml-5">
      <h1 class="self-center text-4xl text-center mt-10">{content.title}</h1>
      <h4 class="self-center text-lg text-grey-200 text-stone-600">{content.author}</h4>

      <article class="prose">
        {@html getSanitizedHtml()}
      </article>

      <div>
        <TagsContainer tags={content.tags} />
      </div>
    </div>
  </article>
{:else}
  <div>loading...</div>
{/if}
