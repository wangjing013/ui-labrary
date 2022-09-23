<template>
  <Empty desc="直播结束啦，正在生成回放~" :src="LiveEnd"></Empty>
</template>

<script>
import { defineComponent } from "vue-demi";
import Empty from "./Empty.vue";
import LiveEnd from "./images/live-end.png";
export default defineComponent({
  name: "LiveEndEmpty",
  components: { Empty },
  data() {
    return {
      LiveEnd,
    };
  },
});
</script>
