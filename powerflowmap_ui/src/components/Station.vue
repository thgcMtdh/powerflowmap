<script setup>

// 縦横幅[px]
const SIZE = 40;

const props = defineProps({
  // 変電所・開閉所名
  name: String,
  // 中心の座標
  point: Object,
  // ラベルの描画位置。
  // ラベルは上下中央揃え、左右は左揃えで、ラベルの原点は図の位置。
  //                  ------
  // ここが原点 -> + | TEXT |
  //                  ------
  labelPosition: Object,
  // ラベルのテキストサイズ
  labelSize: Number,
  // 運用容量[MW]
  // capacity: Number,
  // 変電所の潮流[MW]。系統に供給する向きを正、需要を負とする
  // flow: Number,
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
  <text
    v-if="labelPosition && labelSize > 0"
    :x="point.x + labelPosition.x"
    :y="point.y + labelPosition.y + labelSize / 2"
    :font-size="labelSize">{{ name }}</text>

</template>
