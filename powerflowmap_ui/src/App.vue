<script setup>
import { ref, watch } from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Legend from './components/Legend.vue';
import Line from "./components/Line.vue";
import LineNoFlow from "./components/LineNoFlow.vue";
import Station from "./components/Station.vue";
import StationNoFlow from "./components/StationNoFlow.vue";
import lines from "./assets/lines.json";
import linesNoFlow from "./assets/linesNoFlow.json";
import stations from "./assets/stations.json";
import stationsNoFlow from "./assets/stationsNoFlow.json";
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
const date = ref(new Date(2023, 4 - 1, 1));
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

function getFlow(lineName) {
  if (!flowData.value) {  // 潮流データが無い場合 0 を返す
    return 0;
  }
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
  // example URI: /data/tokyo/jisseki_tokyo_20230401.csv
  const day = date.value.getDate();
  const month = date.value.getMonth() + 1;
  const year = date.value.getFullYear();
  const datestr = Number(year * 10000 + month * 100 + day);
  fetch(`/data/${area.value}/jisseki_${area.value}_${datestr}.csv`)
    .then((response) => {
      if (!response.ok) {  // 指定日のデータが無いとき404
        return null;
      }
      return response.text()
    })
    .then((csv) => {
      flowData.value = calcFlowData(area.value, csv);
    });
}

function animate() {
  animationTimeStep.value += 12.5;
  if (animationTimeStep.value > 100) {
    animationTimeStep.value -= 100;
  }
}

fetchFlowData();

setInterval(animate, 50);

</script>

<template>
  <div class="title-bar">
    <h1>基幹送電線潮流実績可視化サイト beta</h1>
    <h2>～電気の流れを見てみよう～</h2>
  </div>

  <div class="container" ref="containerDiv">

    <div class="text-box-introduction">
      <p>主要な送電線の30分ごとの電力潮流（電力の流れ）を表示しています。</p>
    </div>

    <div class="text-box-warning">
      <h3>免責事項</h3>
      <ul>
        <li>電力広域的運営推進機関(OCCTO)が公開している「地内基幹送電線潮流実績」を用いていますが、データの正確性については保証いたしません。あくまでもイメージとしてお考え下さい。</li>
        <li>特に、<span style="font-weight: bold;">本サイトの情報について、関係する事業者に問い合わせを行うことはご遠慮ください。</span></li>
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
          points="0,100 200,0 1175,0 1175,200 1100,500 1100,550 1250,950 1000,1300 900,1400 800,1400 850,1000 750,1000 650,1200 650,1300 600,1300 550,1250 250,1300 250,1350 300,1450 250,1600 100,1600 50,1600 100,1400 100,1350 0,1350"
          fill="rgb(255,245,219)"
        />

        <!-- デバッグ用 50px ごとのグリッド線 -->
        <line v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]"  
          :key="i" :x1="0" :y1="i * 50" :x2="1200" :y2="i * 50" fill="none" stroke="#888"
        />
        <line
          v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]"  
          :key="i" :x1="i * 50" :y1="0" :x2="i * 50" :y2="1200" fill="none" stroke="#888"
        />

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

        <StationNoFlow
          v-for="item in stationsNoFlow"
          :key="item.name"
          :name="item.name"
          :point="item.point"
          :size="item.size"
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

      </svg>
    </div>
    <p>
      備考
      <ul>
        <li>潮流実績が非公開の送電線及び変電所は灰色で示した</li>
        <li>外輪系統の主要部のみを表示している。都市部の系統図は現在作成中</li>

      </ul>
    </p>
    <p><span style="font-size: 0.8em;">Source code can be found on <a href="https://github.com/thgcMtdh/powerflowmap">GitHub</a>.</span></p>
  </div>
</template>
