import { Chart } from 'chart.js';
import { barChartColors } from '../../../shared/constants';
import { DocumentsWithAuthors } from '../../../shared/types';
import { getAuthorDocumentCounts } from '../../../shared/utils';


let savedBarChart: Chart | null = null;
let savedBarChartDatasetData: number[] | null = null;
let savedBarChartLabels: string[] | null = null;
let savedDocumentsWithAuthors: DocumentsWithAuthors | null = null;

export function createBarChart(
    barChartCtx: HTMLCanvasElement,
    documentsWithAuthors: DocumentsWithAuthors,
): { barChart: Chart } {
    const authors = documentsWithAuthors.authors;

    savedDocumentsWithAuthors = new DocumentsWithAuthors();
    savedDocumentsWithAuthors.documents = [...documentsWithAuthors.documents];
    savedDocumentsWithAuthors.authors = [...documentsWithAuthors.authors];

    const authorDocumentCounts = getAuthorDocumentCounts(documentsWithAuthors);
    const barChart = new Chart(barChartCtx, {
        type: 'bar',
        data: {
            labels: authors.map((author) => author.name),
            datasets: [
                {
                    label: 'Number of Items',
                    data: authorDocumentCounts,
                    backgroundColor: authorDocumentCounts.map(
                        (_, i) => barChartColors[i % barChartColors.length],
                    ),
                    borderColor: authorDocumentCounts.map(
                        (_, i) => barChartColors[i % barChartColors.length],
                    ),
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
                    onClick: () => { },
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

                const chartDataLabels = barChart.data.labels;

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

    savedBarChart = barChart;

    return { barChart };
}

export function resetBarChart(): void {
    if (!savedBarChart || !savedBarChartLabels || !savedBarChartDatasetData) return;

    savedBarChart.data.labels = [...savedBarChartLabels];
    savedBarChart.data.datasets[0].data = [...savedBarChartDatasetData];
    savedBarChart.update();
}

export function updateBarChart(selectedType: string): void {
    if (!savedBarChart || !savedBarChartDatasetData || !savedDocumentsWithAuthors) return;

    const authorDocumentCounts = selectedType === 'all'
        ? getAuthorDocumentCounts(savedDocumentsWithAuthors)
        : getAuthorDocumentCounts(savedDocumentsWithAuthors, selectedType)

    savedBarChart.data.datasets[0].data = [...authorDocumentCounts];
    savedBarChart.update();
}
