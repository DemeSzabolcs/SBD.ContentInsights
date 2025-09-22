import { Chart } from 'chart.js';
import type { DocumentsByStatus } from '../../../shared/types';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { documentStatus, documentStatusNames } from '../../../shared/constants';

let savedPieChart: Chart | null = null;
let savedPieChartDatasetData: number[] | null = null;
let documentsByStatusGlobal: DocumentsByStatus | null = null;

export function createPieChart(
    pieChartCtx: HTMLCanvasElement,
    documentsByStatus: DocumentsByStatus
): void {
    const pieChart = new Chart(pieChartCtx, {
        type: 'pie',
        data: {
            labels: [
                documentStatusNames[documentStatus.Public],
                documentStatusNames[documentStatus.Draft],
                documentStatusNames[documentStatus.Trashed],
            ],
            datasets: [
                {
                    data: [
                        documentsByStatus.public.length,
                        documentsByStatus.draft.length,
                        documentsByStatus.trashed.length,
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
                    labels: { color: 'white' },
                },
                datalabels: {
                    formatter: (value, context) => {
                        const data = context.chart.data.datasets[0].data as number[];
                        const total = data.reduce((acc, val) => acc + val, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${percentage}%`;
                    },
                    color: 'black',
                    font: { size: 40, weight: 'bold' },
                },
                title: {
                    display: true,
                    text: 'Content Status Distribution',
                    color: 'white',
                    font: { size: 16 },
                },
            },
        },
    });

    if (!savedPieChartDatasetData) {
        savedPieChartDatasetData = [...pieChart.data.datasets[0].data];
    }

    savedPieChart = pieChart;
    documentsByStatusGlobal = documentsByStatus;
}

export function updatePieChart(selectValue: string): void {
    if (!savedPieChart || !savedPieChartDatasetData || !documentsByStatusGlobal) return;

    if (selectValue === "all") {
        savedPieChart.data.datasets[0].data = [...savedPieChartDatasetData];
    } else {
        const publicCountByType = documentsByStatusGlobal.public
            .filter(document => document.type === selectValue).length;
        const draftCountByType = documentsByStatusGlobal.draft
            .filter(document => document.type === selectValue).length;
        const trashedCountByType = documentsByStatusGlobal.trashed
            .filter(document => document.type === selectValue).length;

        savedPieChart.data.datasets[0].data = [
            publicCountByType,
            draftCountByType,
            trashedCountByType,
        ];
    }

    savedPieChart.update();
}
