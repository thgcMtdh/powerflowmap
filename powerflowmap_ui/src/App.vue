<script setup>
import { ref } from "vue";
import axios from 'axios';
import Line from "./components/Line.vue";
import Station from "./components/Station.vue"
import lineCoordinates from "./assets/lineCoordinates.json";
import stationCoordinates from "./assets/stationCoordinates.json"


// ======
// 送電線データの作成
// ======
const lineSpecs = ref(null);

fetch("/line")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    lineSpecs.value = data
  });

// ======
// 潮流アニメーション
// ======

// 0～100の数値。破線の進行を指定する
const animationTimeStep = ref(0);

setInterval(animate, 100);

function animate() {
  animationTimeStep.value += 25;
  if (animationTimeStep.value > 100) {
    animationTimeStep.value -= 100;
  }
}
</script>

<template>
  <h2>基幹系統潮流モニタ</h2>

  <!-- 送電線情報が取得できないときは読み込み中を表示 -->

  <div v-if="!lineSpecs">Loading...</div>

  <!-- 送電線情報が取得出来ていればSVGを描画する -->

  <div v-if="lineSpecs">
    <svg width="1200" height="1500">

      <!-- 背景 -->
      <rect
        width="1200"
        height="1500"
        fill="rgb(255,245,219)">
      </rect>

      <Line
        v-for="item in lineSpecs"
        :key="item.name"
        :name="item.name"
        :capacity="item.capacity"
        :flow="2000"
        :points="lineCoordinates.find((element) => (element.name == item.name)).points"
        :animation-time-step="animationTimeStep"
      />

      <Station
        v-for="item in stationCoordinates"
        :key="item.name"
        :name="item.name"
        :point="item.point"
      />
    </svg>
  </div>
</template>
