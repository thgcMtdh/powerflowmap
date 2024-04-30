<script setup>
import { ref, watch } from "vue";
import Slider from '@vueform/slider';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vueform/slider/themes/default.css';
import '@vuepic/vue-datepicker/dist/main.css'
import Legend from './components/Legend.vue';
import Line from "./components/Line.vue";
import LineNoFlow from "./components/LineNoFlow.vue";
import Station from "./components/Station.vue";
import lines from "./assets/lines.json";
import linesNoFlow from "./assets/linesNoFlow.json";
import stations from "./assets/stations.json";
import './assets/main.css';
import { calcFlowData } from './scripts/calcFlowData.js';

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
const date = ref(new Date());
const timeIndex = ref(0);  // 0から47
const timeAnimIntervId = ref(null);  // 時刻を進めるアニメーションのInterval ID
const isLoading = ref(false);  // データ取得中に true となるフラグ

const flowData = ref(null);
const animationTimeStep = ref(0);  // 0～100の数値。潮流を表す破線の進行を指定する

function setCurrentDateAndTime() {
  const now = new Date();
  // dateを現在時刻の30分前に設定
  date.value = new Date(date.value.setMinutes(now.getMinutes() - 30));
  // timeIndexを現在のコマ(0-47)に設定
  const hours = date.value.getHours();
  const minutes = date.value.getMinutes();
  timeIndex.value = 2 * hours + Math.floor(minutes / 30);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
}

function formatTime(timeindex) {
  return timeOptions[Math.round(timeindex)];
}

function increaseDate() {
  date.value = new Date(date.value.setDate(date.value.getDate() + 1));
}

function decreaseDate() {
  date.value = new Date(date.value.setDate(date.value.getDate() - 1));
}

function increaseTime() {
  if (timeIndex.value >= 47) {
    timeIndex.value = 0;
    increaseDate();
  } else {
    timeIndex.value++;
  }
}

function decreaseTime() {
  if (timeIndex.value <= 0) {
    timeIndex.value = 47;
    decreaseDate();
  } else {
    timeIndex.value--;
  }
}

// 時刻を進めるアニメーション

function startStopButton() {
  if (!timeAnimIntervId.value) {  // 開始
    timeAnimIntervId.value = setInterval(timeAnimate, 500);
  } else {  // 終了
    clearInterval(timeAnimIntervId.value);
    timeAnimIntervId.value = null;
  }
}

function timeAnimate() {
  if (timeIndex.value >= 47) {
    timeIndex.value = 0;
  } else {
    timeIndex.value++;
  }
}

function getFlow(lineName) {
  if (!flowData.value) {  // 潮流データが無い場合 undefined を返す
    return undefined;
  }
  // 潮流データから、送電線名が一致するものを抜き出す
  const amounts = flowData.value[lineName];
  if (amounts == undefined) {  // 指定された送電線が存在しない場合 undefined を返す
    return undefined;
  }
  // timeIndex で指定された時刻の潮流値を返す
  const amount = amounts[Math.round(timeIndex.value)];
  if (amount == undefined) {  // 指定された時刻のデータがない場合
    return 0;
  }
  return amount;
}

function fetchFlowData() {
  isLoading.value = true;
  const day = date.value.getDate();
  const month = date.value.getMonth() + 1;
  const year = date.value.getFullYear();
  const datestr = Number(year * 10000 + month * 100 + day);
  // example URI: ./data/tokyo/jisseki_tokyo_20230401.csv
  fetch(`./data/${area.value}/jisseki_${area.value}_${datestr}.csv`)
    .then((response) => {
      if (!response.ok) {  // 指定日のデータが無いとき404
        return null;
      }
      return response.text()
    })
    .then((csv) => {
      flowData.value = calcFlowData(area.value, csv);
      isLoading.value = false;
    });
}

function animate() {
  animationTimeStep.value += 12.5;
  if (animationTimeStep.value > 100) {
    animationTimeStep.value -= 100;
  }
}

watch(date, (newDate) => {
  fetchFlowData();
});

setCurrentDateAndTime();
setInterval(animate, 50);

</script>

<template>

  <div class="container" ref="containerDiv">
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
        <div class="form-item-wrapper">
          <VueDatePicker
            v-model="date"
            :format="formatDate"
            :enable-time-picker="false"
            :min-date="new Date(2023, 1, 1)"
            :max-date="new Date()"
            locale="ja-JP"
            week-start="0"
            year-first
          />
          <button @click="decreaseDate" class="button-basic"> 前日 </button>
          <button @click="increaseDate" class="button-basic"> 翌日 </button>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item-label">時刻</div>
        <div class="form-item-wrapper">
          <div class="slider-area">
            <Slider
              v-model="timeIndex"
              :min="0"
              :max="47"
              :lazy="false"
              :format="formatTime"
              class="slider-orange"
            />
          </div>
          <button @click="startStopButton" class="button-basic button-small">{{ timeAnimIntervId == null ? "▶" : "■" }}</button>
          <button @click="decreaseTime" class="button-basic">30分前</button>
          <button @click="increaseTime" class="button-basic">30分後</button>
        </div>
      </div>
    </div>
    
    <!-- プログレスバー -->
    <div v-bind:class="{ 'loading-bar-loading': isLoading, 'loading-bar': !isLoading }"></div>

    <div class="svg-wrapper">

      <svg viewBox="0 0 1200 1500" xmlns="http://www.w3.org/2000/svg" version="1.1">

        <!-- 背景 -->
        <rect
          width="1200"
          height="1500"
          fill="rgb(200,230,255)">
        </rect>

        <!-- 陸地 -->
        <polygon
          points="0,100 200,0 1175,0 1175,200 1100,500 1100,550 1250,950 1000,1300 900,1400 800,1400 850,1025 800,1025 575,1275 600,1350 550,1350 450,1250 250,1300 250,1350 300,1450 250,1600 100,1600 50,1600 100,1400 100,1350 0,1350"
          fill="rgb(255,245,219)"
        />

        <!-- デバッグ用 50px ごとのグリッド線 -->
        <!-- <line v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]"  
          :key="i" :x1="0" :y1="i * 50" :x2="1200" :y2="i * 50" fill="none" stroke="#888"
        />
        <line
          v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]"  
          :key="i" :x1="i * 50" :y1="0" :x2="i * 50" :y2="1200" fill="none" stroke="#888"
        /> -->

        <LineNoFlow
          v-for="item in linesNoFlow"
          :key="item.name"
          :name="item.name"
          :voltage="item.voltage"
          :capacity="item.capacity"
          :points="item.points"
        />

        <Line
          v-for="item in lines"
          :key="item.name"
          :name="item.name"
          :voltage="item.voltage"
          :capacity="item.capacity"
          :flow="getFlow(item.name)"
          :points="item.points"
          :animation-time-step="animationTimeStep"
        />

        <Station
          v-for="item in stations"
          :key="item.name"
          :name="item.name"
          :is-switch="item.isSwitch"
          :point="item.point"
          :size="item.size"
          :label-position="item.labelPosition"
          :label-size="20"
        />

        <!-- 凡例 -->
        <Legend />

        <!-- 時刻 -->
        <text x="1195" y="1495" font-size="20" text-anchor="end">{{ formatDate(date) + " " + formatTime(timeIndex)}}</text>
      </svg>
    </div>
  </div>
</template>
