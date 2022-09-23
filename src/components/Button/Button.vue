<template>
  <button>{{ title }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
export default defineComponent({
  name: "MButton",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  setup() {},
});
</script>
