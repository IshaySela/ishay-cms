<!--
    The TagsContainer component is responsible for displaying tags.
-->
<script lang="ts">
  import Chip, { Set, Text } from '@smui/chips'
  export let tags: string[];

  // Returns the bullet entity code, only if it is not the last tag.
  const getBullEntity = (index: number): string =>
    index !== tags.length - 1 ? "&bull;" : "";
</script>

<Set chips={tags} let:chip nonInteractive>
  <Chip chip={chip}>
    <Text>{chip}</Text>
  </Chip>
</Set>
