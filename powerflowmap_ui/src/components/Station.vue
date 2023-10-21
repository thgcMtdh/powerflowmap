<script setup>

// 縦横幅[px]
const SIZE = 40;

const props = defineProps({
  name: String,     // 変電所・開閉所名
  point: Object,    // 中心の座標
  // capacity: Number, // 運用容量[MW]
  // flow: Number,     // 変電所の潮流[MW]。系統に供給する向きを正、需要を負とする
});

</script>

<template>
  <rect
    fill="rgb(255,255,255)"
    stroke="rgb(150,150,150)"
    stroke-width="3"
    :x="point.x - SIZE / 2"
    :y="point.y - SIZE / 2"
    :width="SIZE"
    :height="SIZE"
  />
</template>
