<script setup>
import { computed, ref, watch } from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import './assets/main.css'
import Line from "./components/Line.vue";
import Station from "./components/Station.vue"
import lines from "./assets/lines.json"
import stations from "./assets/stations.json"

const areaOptions = [
  {key: "tokyo", name: "東京"}
];
const timeOptions = [
  "00:00", 
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30"
]

const area = ref("tokyo");
const date = ref(new Date(2022, 6 - 1, 2));
const timeIndex = ref(0);  // 0から47

const flowData = ref(null);
const animationTimeStep = ref(0);  // 0～100の数値。破線の進行を指定する

watch(date, (newDate) => {
  fetchFlowData();
})

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
}

function increaseTime() {
  if (timeIndex.value == 47) {
    timeIndex.value = 0;
    date.value = new Date(date.value.setDate(date.value.getDate() + 1));
  } else {
    timeIndex.value++;
  }
}

function decreaseTime() {
  if (timeIndex.value == 0) {
    timeIndex.value = 47
    date.value = new Date(date.value.setDate(date.value.getDate() - 1))
  } else {
    timeIndex.value--
  }
}

function increaseDate() {
  date.value = new Date(date.value.setDate(date.value.getDate() + 1));
}

function decreaseDate() {
  date.value = new Date(date.value.setDate(date.value.getDate() - 1))
}

function getCapacity(lineName) {
  // 設備データから、送電線名が一致するものを抜き出して、運用容量を返す
  const line = lines.find((element) => (element.name == lineName));
  if (line == undefined) {
    return 0;
  }
  return line.capacity;
}

function getFlow(lineName) {
  // 潮流データから、送電線名が一致するものを抜き出す
  const flow = flowData.value.find((element) => (element.name == lineName));
  if (flow == undefined) {  // そのような送電線名が無い場合 0 を返す
    return 0;
  }
  // timeIndex で指定された時刻の潮流値を返す
  const amount = flow.amounts[timeIndex.value];
  if (amount == undefined) {  // 指定された時刻のデータが無い場合 0 を返す
    return 0
  }
  return amount;
}

function fetchFlowData() {
  fetch(`/api/flow/${area.value}/${formatDate(date.value)}`)
    .then((response) => {
      console.log(response)
      if (!response.ok) {  // 指定日のデータが無いとき404
        flowData.value = null;
      }
      return response.json()
    })
    .then((data) => {
      flowData.value = data;
    });
}

function animate() {
  animationTimeStep.value += 25;
  if (animationTimeStep.value > 100) {
    animationTimeStep.value -= 100;
  }
}

fetchFlowData();

setInterval(animate, 100);

</script>

<template>
  <div class="title-bar">
    <h1>電気の流れを見てみよう！</h1>
    <h2>地内基幹送電線現在潮流可視化サイト beta</h2>
  </div>

  <div class="container" ref="containerDiv">

    <div class="text-box-introduction">
      <p>主要な送電線の、30分ごとの電気の流れを分かりやすく表示しています。表示しているデータは、電力広域的運営推進機関(OCCTO)が公開している「地内基幹送電線潮流実績」をもとにしています。</p>
    </div>

    <div class="text-box-warning">
      <h3>免責事項</h3>
      <ul>
        <li>本サイトで公開しているデータの正確性については保証いたしません。表示されているデータには、一部 OCCTO から直接取得できず推定した値が含まれますので、あくまでも「イメージ図」としてお考え下さい。</li>
        <li>特に、<span style="font-weight: bold;">本サイトの情報について、関係する事業者（OCCTO、発電事業者、送配電事業者など）に問い合わせを行うことは絶対におやめください。</span></li>
      </ul>
    </div>

    <div class="text-box-attention">
      <h3>注目ポイント！</h3>
      <ul>
        <li>朝・昼・夜で電気の流れはどう異なるだろう？</li>
        <li>夏と冬でどんな差があるかな？</li>
        <li>揚水発電所に着目してみよう！ いつ汲み上げて、いつ発電しているかな？</li>
      </ul>
    </div>

    <div class="form">
      <div class="form-item">
        <div class="form-item-label">エリア</div>
        <select v-model="area" class="dp__theme_light dp__input">
          <option v-for="item in areaOptions"
            :value="item.key"
            :key="item.key">
            {{ item.name }}
          </option>
        </select>
      </div>

      <div class="form-item">
        <div class="form-item-label">日付</div>
        <VueDatePicker
          v-model="date"
          :format="formatDate"
          :enable-time-picker="false"
          locale="ja-JP"
          year-first
        />
        <div class="button-align-area">
          <button @click="decreaseDate" class="button-basic"> 前日 </button>
          <button @click="increaseDate" class="button-basic"> 翌日 </button>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item-label">時刻</div>
        <select v-model="timeIndex" class="dp__theme_light dp__input">
          <option v-for="(item, index) in timeOptions"
            :value="index"
            :key="index">
            {{ item }}
          </option>
        </select>
        <div class="button-align-area">
          <button @click="decreaseTime" class="button-basic"> 30分前 </button>
          <button @click="increaseTime" class="button-basic"> 30分後 </button>
        </div>
      </div>
    </div>

    <!-- 潮流情報が取得できないとき -->
    <div v-if="!flowData">データ読み込み中...</div>

    <!-- 潮流情報が取得出来ていれば描画する -->
    <div v-if="flowData" class="svg-wrapper">

      <svg viewBox="0 0 1200 1500" xmlns="http://www.w3.org/2000/svg" version="1.1">

        <!-- 背景 -->
        <rect
          width="1200"
          height="1500"
          fill="rgb(255,245,219)">
        </rect>

        <Line
          v-for="item in lines"
          :key="item.name"
          :name="item.name"
          :capacity="getCapacity(item.name)"
          :flow="getFlow(item.name)"
          :points="item.points"
          :animation-time-step="animationTimeStep"
        />

        <Station
          v-for="item in stations"
          :key="item.name"
          :name="item.name"
          :point="item.point"
        />
      </svg>
    </div>
    <p><span style="font-size: 0.8em;">Source code can be found on <a href="https://github.com/thgcMtdh/powerflowmap">GitHub</a>.<br>ウェブ開発に不慣れなため特にリクエストの処理周りで不備が多いです。改善をお待ちしております</span></p>
  </div>
</template>
