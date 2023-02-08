{@debug contentId}
<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from 'svelte'
  let contentId: string | null = null;

  onMount(() => {
    page.subscribe((d) => {
      contentId = d.params.id
    });
  });
</script>

<p>
  Here you view the content
  <!--Display content id only after it was retrived from-->
  {#if contentId !== null}
    {contentId}
  {/if}
</p>
