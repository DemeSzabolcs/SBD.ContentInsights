import { Chart } from 'chart.js';
import { barChartColors } from '../../../shared/constants';
import type { DocumentType } from '../../../shared/types';

export function createBarChart(
    barChartCtx: HTMLCanvasElement,
    documentTypes: DocumentType[],
    documentCounts: number[],
    savedBarChartDatasetData: number[] | null,
    savedBarChartLabels: string[] | null): { barChart: Chart; barChartDatasetData: number[] | null; labels: string[] | null} {
    const barChart = new Chart(barChartCtx, {
        type: 'bar',
        data: {
            labels: documentTypes.map(documentType => documentType.name),
            datasets: [
                {
                    label: 'Number of Items',
                    data: [...documentCounts],
                    backgroundColor: documentCounts.map((_, i) => barChartColors[i % barChartColors.length]),
                    borderColor: documentCounts.map((_, i) => barChartColors[i % barChartColors.length]),
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
                    labels: {
                        color: 'white',
                        boxWidth: 0,
                    },
                    onClick: () => { }
                },
                title: {
                    display: false,
                },
            },
            onClick: (event) => {
                if (!event.native) return;

                const nativeEvent = event.native as MouseEvent;
                const rect = barChart.canvas.getBoundingClientRect();
                const x = nativeEvent.clientX - rect.left;
                let closestIndex = 0;
                let minDistance = Infinity;

                const xScale = barChart.scales['x'];
                if (!xScale) return;

                const data = barChart.data.datasets[0].data;

                data.forEach((_, i) => {
                    const dataPosition = xScale.getPixelForValue(i);

                    const distance = Math.abs(x - dataPosition);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = i;
                    }
                });

                data.splice(closestIndex, 1);

                const chartDataLabels = barChart.data.labels

                if (chartDataLabels) {
                    if (!savedBarChartLabels) {
                        savedBarChartLabels = [...chartDataLabels];
                    }

                    chartDataLabels.splice(closestIndex, 1);
                }

                barChart.update();
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white',
                        precision: 0,
                        stepSize: 1,
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                    },
                },
                x: {
                    ticks: {
                        color: 'white',
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                    },
                },
            },
        },
    });

    if (!savedBarChartDatasetData) {
        savedBarChartDatasetData = [...barChart.data.datasets[0].data];
    }

    if (!savedBarChartLabels && barChart.data.labels) {
        savedBarChartLabels = [...barChart.data.labels];
    }

    const barChartDatasetData = savedBarChartDatasetData;
    const labels = savedBarChartLabels;

    return { barChart, barChartDatasetData, labels };
}
