<script setup>
import { computed } from "vue";

// 1 GW の送電線を、太さ何 px の線で表示するか
const WIDTH_PER_GW = 4;

const props = defineProps({
  name: String, // 送電線名
  voltage: Number,  // 電圧[kV]
  capacity: Number, // 運用容量[MW]
  points: Array, // 描画するときの点列
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
    fill="none"
    stroke="rgb(200,200,2200)"
    :points="points.map((p) => `${p.x},${p.y}`).join(' ')"
    :stroke-width="strokeWidth"
  />
</template>