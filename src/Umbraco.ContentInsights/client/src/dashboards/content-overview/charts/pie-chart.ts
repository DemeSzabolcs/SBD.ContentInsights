import { Chart } from 'chart.js';
import type { DocumentsByStatus } from '../../../shared/types';
import { DocumentStatus } from '../../../shared/types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export function createPieChart(
    pieChartCtx: HTMLCanvasElement,
    documentsByStatus: DocumentsByStatus,
    savedPieChartDatasetData: number[] | null): { pieChart: Chart; pieChartDatasetData: number[] | null;} {
    const pieChart = new Chart(pieChartCtx, {
        type: 'pie',
        data: {
            labels: [
                DocumentStatus[DocumentStatus.Public],
                DocumentStatus[DocumentStatus.Draft],
                DocumentStatus[DocumentStatus.Trashed],
            ],
            datasets: [
                {
                    data: [
                        documentsByStatus.publicCount,
                        documentsByStatus.draftCount,
                        documentsByStatus.trashedCount,
                    ],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        },
        plugins: [ChartDataLabels],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white',
                    },
                },
                datalabels: {
                    formatter: (value, context) => {
                        const data = context.chart.data.datasets[0].data as number[];
                        const total = data.reduce((acc, val) => acc + val, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${percentage}%`;
                    },
                    color: 'black',
                    font: {
                        size: 40,
                        weight: 'bold',
                    },

                },
                title: {
                    display: true,
                    text: 'Content Status Distribution',
                    color: 'white',
                    font: {
                        size: 16,
                    },
                },
            },
        },
    })


    if (!savedPieChartDatasetData) {
        savedPieChartDatasetData = [...pieChart.data.datasets[0].data];
    }

    const pieChartDatasetData = savedPieChartDatasetData;

    return { pieChart, pieChartDatasetData };
}
