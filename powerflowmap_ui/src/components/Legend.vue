<script setup>
import Line from "./Line.vue";
import LineNoFlow from "./LineNoFlow.vue";
import Station from "./Station.vue";

</script>

<template>
    <g transform="translate(25,1390)">
        <rect
            x="0"
            y="0"
            width="1000"
            height="80"
            fill="rgb(255,255,255)">
        </rect>

        <text x="10" y="50" font-size="20" font-weight="bold">開閉所</text>

        <Station
            key="開閉所"
            name="開閉所"
            :is-switch="true"
            :point="{ 'x': 100, 'y': 40 }"
            :size="40"
            :label-position="{ 'x': 30, 'y': 0 }"
        />

        <text x="160" y="50" font-size="20" font-weight="bold">変電所</text>

        <Station
            key="変電所"
            name="変電所"
            :is-switch="false"
            :point="{ 'x': 250, 'y': 40 }"
            :size="40"
            :label-position="{ 'x': 30, 'y': 0 }"
        />

        <text x="310" y="50" font-size="20" font-weight="bold">送電線</text>

        <Line
            key="送電線(500kV)"
            name="送電線(500kV)"
            :voltage="500"
            :capacity="4000"
            :flow="0"
            :points="[{'x': 400, 'y': 40}, {'x': 450, 'y': 40}]"
            :animation-time-step="0"
        />

        <text x="460" y="50" font-size="20">500kV</text>

        <Line
            key="送電線(275kV)"
            name="送電線(275kV)"
            :voltage="275"
            :capacity="4000"
            :flow="0"
            :points="[{'x': 550, 'y': 40}, {'x': 600, 'y': 40}]"
            :animation-time-step="0"
        />

        <text x="610" y="50" font-size="20">275kV</text>
    
        <LineNoFlow
            key="非公開"
            name="非公開"
            :voltage="500"
            :capacity="4000"
            :points="[{'x': 700, 'y': 40}, {'x': 750, 'y': 40}]"
        />

        <LineNoFlow
            key="非公開"
            name="非公開"
            :voltage="275"
            :capacity="4000"
            :points="[{'x': 760, 'y': 40}, {'x': 810, 'y': 40}]"
        />

        <text x="820" y="50" font-size="20">潮流情報が非公開</text>
    </g>
</template>