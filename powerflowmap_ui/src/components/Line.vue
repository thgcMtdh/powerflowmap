<script setup>
import { computed } from "vue";

// 1 GW の送電線を、太さ何 px の線で表示するか
const WIDTH_PER_GW = 4;

// 潮流を表す破線の、1サイクルの長さ[px]
const DASH_LEN = 20;

const props = defineProps({
  name: String, // 送電線名
  voltage: Number,  // 電圧[kV]
  capacity: Number, // 運用容量[MW]
  flow: Number, // 現在潮流[MW]。points の始点から終点に流れる向きを正とする
  points: Array, // 描画するときの点列
  animationTimeStep: Number, // 0～100の数値。親から渡す。アニメーションを制御する
});

const strokeEdgeWidth = computed(() => {
  if (props.voltage == 1000) return 6;
  if (props.voltage == 500) return 6;
  if (props.voltage == 275) return 3;
  return 6;
})

const strokeWidth = computed(() => {
  return (props.capacity / 1000) * WIDTH_PER_GW;
})

const usedRate = computed(() => {
  return Math.abs(props.flow / props.capacity);  // 送電線の使用率を算出
})

function calcDasharray() {
  // 使用率を破線の密度で表現する
  // 1を超える場合は破線の密度を減らし、背景の赤色が見えるようにする
  if (usedRate.value < 1) {
    return `${DASH_LEN * usedRate.value},${DASH_LEN * (1 - usedRate.value)}`;
  }
  if (usedRate.value < 2) {
    return `${DASH_LEN * (2 - usedRate.value)},${DASH_LEN * (usedRate.value - 1)}`;
  }
  return '0,1';
}

function calcDashoffset() {
  // dash-offsetは、始点に引っ張るほうが正
  // →始点から出ていく正の潮流のとき、dash-offset には負を指定する

  if (props.flow >= 0) {
    return -DASH_LEN * (props.animationTimeStep / 100);
  } else {
    return DASH_LEN * (props.animationTimeStep / 100);
  }
}
</script>

<template>
  <!-- 外枠のグレーの部分 -->
  <polyline
    fill="none"
    stroke="rgb(150,150,150)"
    :points="points.map((p) => `${p.x},${p.y}`).join(' ')"
    :stroke-width="strokeWidth + strokeEdgeWidth"
  />

  <!-- 塗りつぶしの白い部分 -->
  <polyline
    v-if="flow !== undefined"
    fill="none"
    :stroke="(usedRate < 1) ? 'rgb(255,255,255)' : 'rgb(200,0,0)'"
    :points="points.map((p) => `${p.x},${p.y}`).join(' ')"
    :stroke-width="strokeWidth"
  />

  <!-- 潮流が undefined の場合はグレーで塗りつぶす -->
  <polyline
    v-if="flow === undefined"
    fill="none"
    stroke="rgb(200,200,200)"
    :points="points.map((p) => `${p.x},${p.y}`).join(' ')"
    :stroke-width="strokeWidth"
  />

  <!-- 上を動いているオレンジの潮流 -->
  <polyline
    v-if="flow !== undefined"
    fill="none"
    stroke="rgb(248,100,0)"
    :points="points.map((p) => `${p.x},${p.y}`).join(' ')"
    :stroke-width="strokeWidth"
    :stroke-dasharray="calcDasharray()"
    :stroke-dashoffset="calcDashoffset()"
  />
</template>