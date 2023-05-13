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

<div class="hover:shadow-2xl transition-shadow duration-300 prose prose-sm prose-stone bg-white shadow-md w-screen p-1">
  <div class="flex space-x-3">
    <img
      class="w-60 h-60 object-cover object-center"
      src={DOMPurify.sanitize(displayContent.bannerImage)}
      alt={DOMPurify.sanitize(displayContent.bannerImageAlt)}
    />

    <div class="flex flex-col space-y-0 pt-3">
      <h4>{displayContent.title}</h4>
      <p class="grow">{displayContent.description}</p>
      <h5 class="text-gray-300">{displayContent.author}</h5>
    </div>
  </div>

  <div>
    <TagsContainer tags={displayContent.tags} />
  </div>
</div>
