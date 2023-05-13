<!--
    The TagsContainer component is responsible for displaying tags.
-->
<script lang="ts">
  import Chip, { Set, Text } from '@smui/chips'
  export let tags: string[];
</script>

  <Set chips={tags} let:chip nonInteractive>
    <Chip chip={chip}>
      <Text>{chip}</Text>
    </Chip>
  </Set>  
