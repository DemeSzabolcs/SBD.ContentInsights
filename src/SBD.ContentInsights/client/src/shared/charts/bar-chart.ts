import { Chart } from 'chart.js';
import { barChartColors } from '../constants';

export interface ChartState {
    chart: Chart;
    originalData: number[];
    originalLabels: string[];
}

export function createGenericBarChart(
    barChartCtx: HTMLCanvasElement,
    labels: string[],
    data: number[],
    onClickCallback?: (barChart: Chart, index: number) => void,
    removeOnClick: boolean = true,
): ChartState  {
    const barChart = new Chart(barChartCtx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Number of Items',
                    data,
                    backgroundColor: data.map((_, i) => barChartColors[i % barChartColors.length]),
                    borderColor: data.map((_, i) => barChartColors[i % barChartColors.length]),
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: { color: 'white', boxWidth: 0 },
                    onClick: () => { },
                },
                title: { display: false },
            },
            onClick: (event) => {
                if (!event.native || !removeOnClick) return;

                const nativeEvent = event.native as MouseEvent;
                const rect = barChart.canvas.getBoundingClientRect();
                const x = nativeEvent.clientX - rect.left;
                let closestIndex = 0;
                let minDistance = Infinity;

                const xScale = barChart.scales['x'];
                if (!xScale) return;

                barChart.data.datasets[0].data.forEach((_, i) => {
                    const dataPosition = xScale.getPixelForValue(i);
                    const distance = Math.abs(x - dataPosition);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = i;
                    }
                });

                barChart.data.datasets[0].data.splice(closestIndex, 1);
                const chartLabels = barChart.data.labels;
                if (chartLabels) chartLabels.splice(closestIndex, 1);

                if (onClickCallback) onClickCallback(barChart, closestIndex);

                barChart.update();
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: 'white', precision: 0, stepSize: 1 },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                },
                x: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                },
            },
        },
    });

    const state: ChartState = {
        chart: barChart,
        originalData: [...data],
        originalLabels: [...labels],
    };

    return state;
}

export function resetChart(state: ChartState): void {
    state.chart.data.labels = [...state.originalLabels];
    state.chart.data.datasets[0].data = [...state.originalData];
    state.chart.update();
}
