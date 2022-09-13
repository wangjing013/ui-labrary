<template>
  <Promised :promise="usersPromise">
    <template #pending>
      <p style="color: #fff; font-size: 56px">Loading...</p>
    </template>
    <template #default>
      <div class="inner-warpper">
        <NotLiveEmpty v-if="isLiveNotStarted"></NotLiveEmpty>
        <Live
          v-else-if="isLiveStarting"
          ref="refLive"
          :roomid="roomid"
          :platform="platform"
          :viewername="viewername"
          :viewertoken="viewertoken"
          @login-success="handlerLoginSuccess"
          @live-end="handlerLiveEnd"
        ></Live>
        <template v-else-if="isLiveEnd">
          <Playback
            v-if="isPlayback"
            :file-id="fileId"
            :platform="platform"
          ></Playback>
          <LiveEndEmpty v-else>直播结束</LiveEndEmpty>
        </template>
      </div>
    </template>
    <template #rejected="error">
      <p>Error: {{ error.message }}</p>
    </template>
  </Promised>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from "vue-demi";
import { Promised } from "vue-promised";
import Live from "../Sence/LivePlayer.vue";
import Playback from "../Sence/Playback.vue";
import NotLiveEmpty from "./NotLiveEmpty.vue";
import LiveEndEmpty from "./LiveEndEmpty.vue";
import LiveStatus from "./constants/live-status";

const domains = {
  test: "https://gateway-test.mashibing.cn",
  beta: "https://gateway.mashibing.cn",
  prod: "https://gateway.mashibing.com",
};
export default defineComponent({
  name: "LiveComponent",
  components: {
    Promised,
    Live,
    Playback,
    NotLiveEmpty,
    LiveEndEmpty,
  },
  props: {
    env: {
      type: String,
      required: true,
    },
    liveId: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      default: "",
    },
    userno: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const refLive = ref(null);
    const roomid = ref(""); // 直播房间号
    const fileId = ref(""); // 回放文件ID
    const platform = ref(""); // 直播平台
    const viewername = ref(""); // 观看者昵称
    const viewertoken = ref(""); // 观看者编号
    const isPlayback = ref(false); // 回放
    const isLiveNotStarted = ref(false); // 未开始
    const isLiveStarting = ref(false); // 开始
    const isLiveEnd = ref(false); // 直播结束

    // 重置状态
    const resetLiveState = () => {
      isPlayback.value = false;
      isLiveNotStarted.value = false;
      isLiveStarting.value = false;
      isLiveEnd.value = false;
    };

    // 查看直播信息
    const liveInfo = ref(null);
    const query = () => {
      resetLiveState(); // 重置直播状态
      return fetch(
        `${domains[props.env]}/openCourse/client-live-room/${props.liveId}`
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.code === 200) {
            const { liveStatus } = res.data;
            liveInfo.value = res.data;
            if (liveStatus === LiveStatus.liveEnd) {
              doLiveEnd();
            }
            if (liveStatus === LiveStatus.liveNotStarted) {
              doLiveNotStarted();
            }
            if (liveStatus === LiveStatus.liveStarting) {
              doStarting();
            }
          }
          return res;
        });
    };

    // 未直播
    const doLiveNotStarted = () => {
      isLiveNotStarted.value = true;
      emit("live-not-started");
    };

    // 直播中
    const doStarting = () => {
      const { plateForm, roomId } = liveInfo.value;
      platform.value = plateForm;
      roomid.value = roomId;
      viewername.value = props.username;
      viewertoken.value = props.userno;
      isLiveStarting.value = true;
      emit("live-starting", { id: roomId });
    };

    // 直播结束
    const doLiveEnd = () => {
      const { playBack, fileId: vid, plateForm } = liveInfo.value;
      if (playBack && vid) {
        fileId.value = vid;
        platform.value = plateForm;
        isPlayback.value = true;
      }
      isLiveEnd.value = true;
      emit("live-end");
    };

    // 聊天登录成功
    const handlerLoginSuccess = () => {
      emit("login-success");
    };

    // 直播结束
    const handlerLiveEnd = () => {
      emit("live-end");
    };

    // 退出登录
    const loginOut = () => {
      refLive.value?.loginOut();
    };

    const usersPromise = ref(null);
    // 监听 liveId 变化
    watch(
      () => props.liveId,
      () => {
        resetLiveState();
        usersPromise.value = query();
      }
    );
    onMounted(() => {
      usersPromise.value = query();
    });

    return {
      refLive,
      roomid,
      fileId,
      viewername,
      viewertoken,
      platform,
      isPlayback,
      isLiveNotStarted,
      isLiveStarting,
      isLiveEnd,
      usersPromise,
      handlerLiveEnd,
      handlerLoginSuccess,
      query,
      loginOut,
    };
  },
});
</script>

<style lang="scss" scoped>
.live-warpper,
.inner-warpper {
  width: 100%;
  height: 100%;
}
</style>
