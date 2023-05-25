<template>
  <div>
    <canvas :ref="chartRef"></canvas>
  </div>

</template>

<script setup lang="ts">
import Choice from "@/api/records/Choice";
import { ref, onMounted, defineComponent } from "vue";
import { Chart, ChartConfiguration, LineController, PointElement, LineElement, LinearScale, CategoryScale, Filler, Tooltip, Legend } from "chart.js";
import { ChartData, ChartOptions } from "chart.js";

Chart.register(LineController, PointElement, LineElement, LinearScale, CategoryScale, Filler, Tooltip, Legend);

interface Props {
  choices: Choice[];
}

const props = defineProps<Props>();

const chart = ref<HTMLCanvasElement | null>(null);

const chartRef = (el: HTMLCanvasElement) => {
  chart.value = el;
};

// get a list of all choices string
const labels = props.choices.map((choice) => choice.choice);

// get a list of all choices scores
const scores = props.choices.map((choice) => choice.score);


const data = {
  labels: labels,
  datasets: [
    {
      label: "Data",
      backgroundColor: "#09d990",
      data: scores,
      borderColor: 'rgb(8,164,112)',
      tension: 0.1,
      pointRadius: 5
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      displayColors: false,
      callbacks: {
        beforeLabel: (context) => {
          const index = context.dataIndex;
          const choice = props.choices[index];
          return `Scenario: ${choice.scenario}`;
        },
        label: (context) => {
          const index = context.dataIndex;
          const choice = props.choices[index];
          return `Score: ${choice.score}`;
        },
      },
    },
  },
};

onMounted(() => {
  if (chart.value) {
    console.log("has ref value")

    // @ts-ignore
    const config: ChartConfiguration = {
      type: "line",
      data: data,
      options: options,
    };

    // @ts-ignore
    const chartInstance = new Chart(chart.value, config);
  }
})
</script>

<style scoped>

</style>
