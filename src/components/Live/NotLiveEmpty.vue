<template>
  <Empty desc="直播还未开始，请稍等哦~" src="./images/not-live.png"></Empty>
</template>

<script>
import { defineComponent } from "vue-demi";
import Empty from "./Empty.vue";
export default defineComponent({
  name: "NotLiveEmpty",
  components: { Empty },
});
</script>
