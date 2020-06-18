<template>
  <div>
    <viewGoal></viewGoal>
  </div>
</template>

<script>
// @ is an alias to /src
import viewGoal  from "@/components/ViewGoal.vue"

export default {
  name: "Base",
  components: { viewGoal }
};
</script>
