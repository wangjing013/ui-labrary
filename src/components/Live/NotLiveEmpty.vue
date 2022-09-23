<template>
  <Empty desc="直播还未开始，请稍等哦~" :src="NotLive"></Empty>
</template>

<script>
import { defineComponent } from "vue-demi";
import Empty from "./Empty.vue";
import NotLive from "./images/not-live.png";
export default defineComponent({
  name: "NotLiveEmpty",
  components: { Empty },
  data() {
    return {
      NotLive,
    };
  },
});
</script>
