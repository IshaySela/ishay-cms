<!--
    The component NotificationManagerComponent is the component that the
    notifications are injected into.
-->
<script lang="ts">
  import { notifications } from "../stores";
  import type { AppNotification } from "../Models/Notification";
  import { onDestroy } from "svelte";

  let consume: Map<string, AppNotification> = new Map<
    string,
    AppNotification
  >();

  const dismissAfterMs = (id: string, ms: number) => {
    setTimeout(() => {
      consume.delete(id);
      consume = consume; // Notify sveltkit
    }, ms);
  };

  const unsub = notifications.subscribe((newNotification) => {
    if (newNotification === undefined) return;

    consume.set(newNotification.id, newNotification);
    consume = consume; // Notify sveltkit

    if (newNotification.dismissTimeoutMs > 0) {
      dismissAfterMs(newNotification.id, newNotification.dismissTimeoutMs);
    }
  });

  onDestroy(unsub);
</script>

<div class="container">
  {#each [...consume] as [id, data] (id)}
    <div class="notification">
      {data.type}
      <br />
      {data.text}
    </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    padding: 10px;
    gap: 5px;
  }

  .container .notification {
    height: 50px;
    width: 100px;
    border-radius: 5px;
    background-color: aqua;
  }
</style>
