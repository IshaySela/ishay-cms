<!--
  This page retrives the first 50 blog posts and displayes them to the user.
-->
<script lang="ts">
  import type { Subscription } from "rxjs";
  import { onDestroy, onMount } from "svelte";
  import type { Content } from "../Models/Content";
  import ContentItemPreview from "../components/ContentItemPreview.svelte";
  import { ServerContentService } from "../services/ServerContentService";
  import SearchbarComponenet from "../components/SearchbarComponenet.svelte";

  const contentService: ServerContentService = new ServerContentService();
  let blogs: Content[] = [];
  let querySubscription: Subscription | null = null;

  onMount(() => {
    contentService.queryContent({ title: "*" }).subscribe((content) => {
      blogs.push(content!);
      blogs = blogs; // Notify sveltkit reactive system.
    });
  });

  // A callback for when a content is clicked / pressed enter on.
  const onContentInteraction = (content: Content) => {
    localStorage.setItem(content.id, JSON.stringify(content)); // store the data for the content page
    window.location.href = `content/${content.id}`;
  };

  onDestroy(() => {
    if (querySubscription !== null) querySubscription.unsubscribe();
  });
</script>

<!--The full page container-->
<div class="w-full min-h-screen">
  <!--Searchbar container-->
  <div class="searchbar">
    <SearchbarComponenet on:queryResult={ev => blogs = ev.detail.results}/>
  </div>

  <!--The container of all posts. Itereate over the blogs and create preview out of them-->
  <div class="flex flex-col gap-2 pl-5 items-stretch">
    {#each blogs as blog (blog.id)}
      <div
        on:click={(_) => onContentInteraction(blog)}
        on:keypress={(e) => (e.key ? onContentInteraction(blog) : "")}
      >
        <ContentItemPreview displayContent={blog} />
      </div>
    {/each}
  </div>
</div>
