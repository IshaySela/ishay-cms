<!--
  The component ContentItemPreview is used to display a short summary of the content.
  Note: bannerImg should be santized before it is passed to the component.
-->
<script lang="ts">
  import DOMPurify from "dompurify";
  import type { DisplayContent } from "../Models/Content";
  import TagsContainer from "./TagsContainer.svelte";

  export let displayContent: DisplayContent;
</script>

<div class="prose prose-sm prose-stone bg-white shadow-md w-screen">
  <div class="flex space-x-3">
    <img
      class="w-60 h-60 object-cover object-center"
      src={DOMPurify.sanitize(displayContent.bannerImage)}
      alt={DOMPurify.sanitize(displayContent.bannerImageAlt)}
    />

    <div class="flex flex-col space-y-0 pt-3">
      <h4>{displayContent.title}</h4>
      <p>{displayContent.description}</p>
    </div>
  </div>

  <div>
    <TagsContainer tags={displayContent.tags} />
  </div>
</div>
