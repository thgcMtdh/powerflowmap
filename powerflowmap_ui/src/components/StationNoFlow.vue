<script setup>

const props = defineProps({
  // 変電所・開閉所名
  name: String,
  // 中心の座標
  point: Object,
  // サイズ[px]
  size: Number,
  // ラベルの描画位置。
  // ラベルは上下中央揃え、左右は左揃えで、ラベルの原点は図の位置。
  //                  ------
  // ここが原点 -> + | TEXT |
  //                  ------
  labelPosition: Object,
  // ラベルのテキストサイズ
  labelSize: Number,
});

</script>

<template>
  <rect
    fill="rgb(220,220,220)"
    :x="point.x - size / 2"
    :y="point.y - size / 2"
    :width="size"
    :height="size"
  />

  <!-- 変電所名 -->
  <text
    v-if="labelPosition && labelSize > 0"
    :x="point.x + labelPosition.x"
    :y="point.y + labelPosition.y + labelSize / 2"
    :font-size="labelSize">{{ name }}</text>

</template>
