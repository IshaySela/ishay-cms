<script>
  import NotificationManagerComponent from "../components/NotificationManagerComponent.svelte";
  import { NotificationService } from "../services/NotificationService";
</script>

<slot />

<NotificationManagerComponent />

<button on:click={() => {
  NotificationService.tip('Hello')
}}>Click MEEEEEEEE</button>