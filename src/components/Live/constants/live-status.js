class LiveStatus {
  static liveNotStarted = 0; // 未直播
  static liveStarting = 1; // 直播中
  static liveEnd = 2; // 直播已经结束
}
export const liveStatusMap = {
  [LiveStatus.liveNotStarted]: "未开始",
  [LiveStatus.liveStarting]: "直播中",
  [LiveStatus.liveEnd]: "已结束",
};

export const noPlaybackGenerated = 0; // 没生成回放
export const playbackGenerated = 1; // 已生成回放

export default LiveStatus;
