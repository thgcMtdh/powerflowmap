<script setup>

const props = defineProps({
  // 変電所・開閉所名
  name: String,
  // 開閉所の場合true
  isSwitch: Boolean,
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
  // 変電所の潮流[MW]。系統に供給する向きを正、需要を負とする
  // flow: Number,
});

</script>

<template>
  <rect
    fill="rgb(255,255,255)"
    stroke="rgb(150,150,150)"
    stroke-width="2"
    :x="point.x - size / 2"
    :y="point.y - size / 2"
    :width="size"
    :height="size"
  />

  <!-- 開閉所を示すバツ印 -->
  <line
    v-if="isSwitch"
    stroke="rgb(150,150,150)"
    stroke-width="2"
    :x1="point.x - size / 2"
    :y1="point.y - size / 2"
    :x2="point.x + size / 2"
    :y2="point.y + size / 2"
  />
  <line
    v-if="isSwitch"
    stroke="rgb(150,150,150)"
    stroke-width="2"
    :x1="point.x + size / 2"
    :y1="point.y - size / 2"
    :x2="point.x - size / 2"
    :y2="point.y + size / 2"
  />

  <!-- 変電所名 -->
  <text
    v-if="labelPosition && labelSize > 0"
    :x="point.x + labelPosition.x"
    :y="point.y + labelPosition.y + labelSize / 2"
    :font-size="labelSize">{{ name }}</text>

</template>
