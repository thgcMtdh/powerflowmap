<script setup>
import { ref } from 'vue'
import Line from './components/Line.vue'

const points = ref([
  {x:0, y:100},
  {x:200, y:100},
])

// ======
// 潮流アニメーション
// ======

// 0～100の数値。破線の進行を指定する
const animationTimeStep = ref(0);

setInterval(animate, 100);

function animate() {
  animationTimeStep.value += 20;
  if (animationTimeStep.value > 100) {
    animationTimeStep.value -= 100;
  }
}

</script>

<template>
  <h2>基幹系統潮流モニタ</h2>
  <svg width="1200" height="900">
    <Line
      name="テスト"
      :capacity="6800"
      :flow="1700"
      :points="points"
      :animation-time-step="animationTimeStep"/>
  </svg>
</template>
