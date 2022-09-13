<template>
  <div id="player-container" style="width: 100%; height: 100%"></div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, watch } from "vue-demi";
import Player from "@msbfe/player-sdk";
export default defineComponent({
  name: "PlaybackPlayer",
  props: {
    userid: {
      type: String,
      required: true,
    },
    fileId: {
      type: [Number, String],
      required: true,
    },
    platform: {
      type: [Number, String],
      required: true,
    },
  },
  setup(props) {
    console.log(props);
    let player = null;
    const createPlayer = () => {
      const { fileId: vid, platform, userid } = props;

      player = Player.init({
        vid,
        platform,
        userid,
        el: "#player-container",
      });
    };

    watch(
      () => props.fileId,
      () => {
        createPlayer();
      }
    );

    onMounted(() => {
      createPlayer();
    });

    onBeforeUnmount(() => {
      player && player.destroy();
    });
  },
});
</script>

<style lang="scss" scoped>
#playbackPlayer {
  width: 100%;
  height: 100%;
}
</style>
