<!--
    @component
    Searchbar componen is a component that queries the database for content based on author, title, tags and general text.
    When the search button is clciked, the component send a query request to the backend, and emits the results as event.

    Events: 
        searchClicked - Dispatched when the button is clicked, before the query is sent to the server.
        queryResult - After the query result was retrived from the server.
-->
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Content } from "../Models/Content";
  import { ServerContentService } from "../services/ServerContentService";

  type SearchClickedEvent = {
    searchClicked: { text: string };
    queryResult: { results: Content[] };
  };

  const dispatch = createEventDispatcher<SearchClickedEvent>();
  const server = new ServerContentService()
  let inputText: string = "";

  const searchClicked = () => {
    dispatch("searchClicked", { text: inputText });
    let content: Content[] = []
    
    server.queryContent({ generalText: inputText }).subscribe({
      next: val => content.push(val),
      complete: () =>  dispatch('queryResult', { results: content })
    })

  };
</script>

<div>
  <h1>Searcbhar</h1>
  <input bind:value={inputText} alt="Enter keywords here" />
  <button on:click={(_) => searchClicked()}>Search</button>
</div>
