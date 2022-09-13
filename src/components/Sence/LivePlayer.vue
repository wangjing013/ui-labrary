<template>
  <div class="liveContainer">
    <div id="player-container"></div>
    <div v-if="showReload" class="reload">
      <div class="text">直播断开,请尝试刷新重链</div>
      <div class="reload-btn" @click="reload">
        <u-icon name="reload" color="#fff" size="42"></u-icon>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
} from "vue-demi";
import LiveSDK from "@msbfe/live-sdk";

export default defineComponent({
  name: "LivePlayer",
  props: {
    userid: {
      type: String,
      required: true,
    },
    roomid: {
      type: String,
      required: true,
    },
    platform: {
      type: [Number, String],
      required: true,
    },
    viewername: {
      type: String,
      default: "",
    },
    viewertoken: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    let live = null;
    const showReload = ref(false);
    const initLiveSDK = () => {
      const {
        viewername = "",
        viewertoken = "",
        roomid,
        platform,
        userid,
      } = props;
      live = LiveSDK.init({
        el: "#player-container",
        userid,
        platform,
        roomid,
        viewertoken,
        viewername,
      });
      live.on(LiveSDK.EVENTS.LOGIN_SUCCESS, () => {
        emit("login-success");
      });
      live.on(LiveSDK.EVENTS.LIVE_END, () => {
        emit("live-end");
      });
    };

    // 观察 roomid 变化
    watch(
      () => props.roomid,
      () => {
        live?.logout().then(() => {
          initLiveSDK();
        });
      }
    );

    // 退出登录回调
    const loginOut = () => {
      live?.logout();
    };

    onMounted(() => {
      initLiveSDK();
    });

    onBeforeUnmount(() => {
      live?.logout();
    });

    return {
      showReload,
      loginOut,
    };
  },
});
</script>

<style scoped lang="scss">
.liveContainer {
  width: 100%;
  height: 100%;
}
#player-container {
  width: 100%;
  height: 100%;
}
.reload {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #333;
  .text {
    color: #fff;
  }
  &-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 31px;
    margin-top: 5px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>
