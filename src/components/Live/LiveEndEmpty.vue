<template>
  <Empty desc="直播结束啦，正在生成回放~" src="./images/live-end.png"></Empty>
</template>

<script>
import { defineComponent } from "vue-demi";
import Empty from "./Empty.vue";
export default defineComponent({
  name: "LiveEndEmpty",
  components: { Empty },
});
</script>
