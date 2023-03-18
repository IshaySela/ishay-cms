<!--
  This page retrives the first 50 blog posts and displayes them to the user.
-->
<script lang="ts">
  import { filter, map, mergeAll, Subscription } from "rxjs";
  import { onDestroy, onMount } from "svelte";
  import type { Content } from "../Models/Content";
  import type { IContentService } from "../services/IContentService";
  import { MockContentService } from "../services/MockContentService";
  import ContentItemDisplay from "../components/ContentItemDisplay.svelte";
  import { ServerContentService } from "../services/ServerContentService";

  const contentService: ServerContentService = new ServerContentService();
  let blogs: Content[] = [];
  let querySubscription: Subscription | null = null;

  onMount(() => {
    // Convert the array of ids to array of observables.
    const mapToContentItemsSource = map<
      string[],
      ReturnType<IContentService["getById"]>[]
    >((ids) => ids.map((id) => contentService.getById(id)));

    querySubscription = contentService
      .query({ title: "*" })
      .pipe(
        mapToContentItemsSource,
        mergeAll(), // From Observable<Content>[] -> Observable<Content>
        mergeAll(), // From Observable<Content> -> Content
        filter((content) => content !== null)
      )
      .subscribe((content) => {
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

<div class="page">
  <div class="searchbar">Searchbar goes here</div>
  <div class="items-list-container">
    {#each blogs as blog (blog.id)}
      <div
        class="items-list-item"
        on:click={(_) => onContentInteraction(blog)}
        on:keypress={(e) => (e.key ? onContentInteraction(blog) : "")}
      >
        <ContentItemDisplay displayContent={blog} />
      </div>
    {/each}
  </div>
</div>

<style>
  .page {
    display: grid;

    grid-template-areas:
      "search search search"
      "items  items  items ";

    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 1fr;
  }
  .page .items-list-container {
    grid-area: items;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .items-list-container .items-list-item {
    width: 100%;
    border-style: outset;
  }

  .page .searchbar {
    grid-area: search;
  }
</style>
