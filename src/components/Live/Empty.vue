<template>
  <div class="empty">
    <img class="placeholder" />
    <div class="desc">{{ desc }}</div>
  </div>
</template>

<script>
import { defineComponent } from "vue-demi";
export default defineComponent({
  name: "EmptyComponent",
  props: {
    src: {
      type: [Object, String],
      required: true,
    },
    desc: {
      type: String,
      default: "",
    },
  },
  setup() {
    // const getImageUrl = () => {
    //   if (isVue3) {
    //     return new URL(`${props.src}`, import.meta.url).href;
    //   }
    // };

    return {
      // getImageUrl,
    };
  },
});
</script>

<style scoped lang="scss">
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #11161f;
  color: #999;
  text-align: center;
  .placeholder {
    width: 312px;
    height: 250px;
  }
  .desc {
    font-size: 16px;
    font-weight: bold;
    color: #3e425e;
  }
}
</style>
