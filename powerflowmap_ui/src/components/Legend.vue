<script setup>
import Line from "./Line.vue";
import LineNoFlow from "./LineNoFlow.vue";
import Station from "./Station.vue";

const station = {
    "name": "変電所",
    "point": { "x": 89, "y": 1350 },
    "size": 40,
    "labelPosition": { "x": 30, "y": 0 }
};
const switchstation = {
    "name": "変電所",
    "isSwitch": true,
    "point": { "x": 89, "y": 1400 },
    "size": 40,
    "labelPosition": { "x": 30, "y": 0 }
};
const line = {
    "name": "送電線（500kV）",
    "voltage": 500,
    "capacity": 6582,
    "points": [{"x": 350, "y": 550}, {"x": 200, "y": 700}]
};

</script>

<template>
    <rect
        x="50"
        y="1250"
        width="700"
        height="240"
        fill="rgb(255,255,255)">
    </rect>

    <text x="60" y="1300" font-size="30">凡例</text>

    <Station
        key="変電所"
        name="変電所"
        :is-switch="false"
        :point="{ 'x': 89, 'y': 1340 }"
        :size="40"
        :label-position="{ 'x': 30, 'y': 0 }"
        :label-size="25"
    />

    <Station
        key="開閉所"
        name="開閉所"
        :is-switch="true"
        :point="{ 'x': 89, 'y': 1400 }"
        :size="40"
        :label-position="{ 'x': 30, 'y': 0 }"
        :label-size="25"
    />

    <Line
        key="送電線(500kV)(100kV設計)"
        name="送電線(500kV)(100kV設計)"
        voltage="1000"
        capacity="6000"
        flow="0"
        :points="[{'x': 300, 'y': 1340}, {'x':400, 'y': 1340}]"
        :animation-time-step="0"
    />
    <Line
        key="送電線(500kV)"
        name="送電線(500kV)"
        voltage="500"
        capacity="6000"
        flow="0"
        :points="[{'x': 300, 'y': 1400}, {'x':400, 'y': 1400}]"
        :animation-time-step="0"
    />
    <Line
        key="送電線(275kV)"
        name="送電線(275kV)"
        voltage="275"
        capacity="6000"
        flow="0"
        :points="[{'x': 300, 'y': 1460}, {'x':400, 'y': 1460}]"
        :animation-time-step="0"
    />
    <text x="410" y="1350" font-size="25">送電線 500kV ※1000kV設計</text>
    <text x="410" y="1410" font-size="25">送電線 500kV</text>
    <text x="410" y="1470" font-size="25">送電線 275kV</text>

</template>