<script>
  import "../app.postcss";
  import HeaderComponent from "../components/HeaderComponent.svelte";
import NotificationManagerComponent from "../components/NotificationManagerComponent.svelte";
</script>

<HeaderComponent />
<slot />
<NotificationManagerComponent />
