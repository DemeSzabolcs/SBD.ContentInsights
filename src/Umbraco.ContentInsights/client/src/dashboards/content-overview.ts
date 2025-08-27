import { css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { umbHttpClient } from '@umbraco-cms/backoffice/http-client';
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import type { DocumentType, DocumentsByStatus } from '../shared/types'
import { DocumentStatus } from '../shared/types'
import { umbracoPath } from '@umbraco-cms/backoffice/utils';

Chart.register(...registerables);

// Chart.js has a Colors plugin, but it only works on different datasets, here we only have one.
const barChartColors = [
    'rgba(54, 162, 235, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(0, 128, 0, 0.7)',
    'rgba(0, 255, 255, 0.7)',
    'rgba(255, 0, 255, 0.7)',
];

let savedBarChart: any | null = null;
let savedBarChartDatasetData: any | null = null;
let savedBarChartLabels: any | null = null;

let savedPieChart: any | null = null;
let savedPieChartDatasetData: any | null = null;

let documentsByStatusGlobal: DocumentsByStatus;

const updatePieChart = (selectValue: string): void => {
    if (!savedPieChart || !savedPieChartDatasetData || !documentsByStatusGlobal) return

    if (selectValue == "all") {
        savedPieChart.data.datasets[0].data = [...savedPieChartDatasetData];
    }
    else {
        const publicCountByType = documentsByStatusGlobal.public
            .filter(document => document.type == selectValue).length;

        const draftCountByType = documentsByStatusGlobal.draft
            .filter(document => document.type == selectValue).length;

        const trashedCountByType = documentsByStatusGlobal.trashed
            .filter(document => document.type == selectValue).length;

        savedPieChart.data.datasets[0].data = [
            publicCountByType,
            draftCountByType,
            trashedCountByType,
        ];
    }

    savedPieChart.update();
};

const resetBarChart = (): void => {
    if (!savedBarChart || !savedBarChartLabels || !savedBarChartDatasetData) return

    savedBarChart.data.labels = [...savedBarChartLabels];
    savedBarChart.data.datasets[0].data = [...savedBarChartDatasetData];
    savedBarChart.update();
};

@customElement('content-overview')
export class ContentOverview extends UmbLitElement {
    @state()
    private _contentTypeAliases: Option[] = [];

    private _onSelectChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        const selectValue = select.value;
        updatePieChart(selectValue);
    }

    render() {
        return html`
    <uui-box class="dashboard">
        <div class="chart-section">
            <div class="chart-header">
                <uui-icon name="icon-bar-chart" style="font-size: 30px;"></uui-icon>
                <h2>Document count by Document Types</h2>
            </div>
            <div class="reset-button">
                <p>Click on the bars to remove them, click on reset to reset the chart.</p>
                <uui-button id="resetButton" type="button" look="primary" color="danger" label="Reset"></uui-button>
            </div>
            <uui-box class="chart-box">
                <canvas id="contentByDocumentTypeChart"></canvas>
            </uui-box>
        </div>
        <div class="chart-section">
            <div class="chart-header">
                <uui-icon name="icon-pie-chart" style="font-size: 30px;"></uui-icon>
                <h2>Document count by Document Status</h2>
            </div>
            <div class="content-type-select-container">
                <uui-select id="contentTypeSelect" .options="${this._contentTypeAliases}" @change="${this._onSelectChange}"></uui-select>
            </div>
            <uui-box class="chart-box pie-chart">
                <canvas id="contentByDocumentStatusChart"></canvas>
            </uui-box>
        </div>
    </uui-box>
    `
    }

    async firstUpdated() {
        const resetBtn = this.renderRoot.querySelector('#resetButton') as HTMLElement;
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                resetBarChart();
            });
        }

        const getContentTypesResponse = await tryExecute(this, umbHttpClient.get<DocumentType[]>({
            url: umbracoPath("/content-insights/get-content-types"),
        }));

        let contentTypes = getContentTypesResponse.data;

        if (!contentTypes) return; // TO-DO add error.

        contentTypes = [...contentTypes].sort(
            (a, b) => b.count - a.count
        );

        this._contentTypeAliases = [
            { name: 'All Document Types', value: 'all', selected: true },
            ...contentTypes.map(type => ({ name: type.name, value: type.type })),
        ];

        const documentNames = contentTypes.map(documentType => documentType.name);
        const documentCounts = contentTypes.map(documentType => documentType.count);

        const barChartCtx = this.renderRoot.querySelector('#contentByDocumentTypeChart') as HTMLCanvasElement;
        const barChart = new Chart(barChartCtx, {
            type: 'bar',
            data: {
                labels: [...documentNames],
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

                    const datasetIndex = 0;
                    const data = barChart.data.datasets[datasetIndex].data;

                    data.forEach((_, i) => {
                        const dataPosition = xScale.getPixelForValue(i);

                        const distance = Math.abs(x - dataPosition);
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestIndex = i;
                        }
                    });

                    if (!savedBarChartDatasetData) {
                        savedBarChartDatasetData = [...data];
                    }

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
        })
        savedBarChart = barChart;

        const getDocumentsByStatusResponse = await tryExecute(this, umbHttpClient.get<DocumentsByStatus>({
            url: umbracoPath("/content-insights/get-documents-by-status"),
        }));

        const documentsByStatus = getDocumentsByStatusResponse.data;

        if (!documentsByStatus) return; // TO-DO add error

        documentsByStatusGlobal = documentsByStatus;

        const pieChartCtx = this.renderRoot.querySelector('#contentByDocumentStatusChart') as HTMLCanvasElement;
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
        savedPieChart = pieChart;
        savedPieChartDatasetData = [...pieChart.data.datasets[0].data];
    }

    static styles = css`
    :host {
      display: block;
      max-width: 1000px;
      margin: 0 auto;
    }

    .dashboard {
      padding: 24px;
      border-radius: 6px;
      margin-top: 40px;
    }

    .chart-section {
      margin-bottom: 32px;
    }

    .chart-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .chart-header > * {
      padding-right: 10px;
    }

    .chart-header h2 {
      font-size: 20px;
      font-weight: 600;
    }

    .chart-box {
      background-color: #2c2c30;
      padding: 16px;
      border-radius: 6px;
    }

    canvas {
      max-width: 100%;
    }

    .reset-button {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
    }

    .pie-chart {
        margin: auto;
        width: 70%;
    }

    .content-type-select-container {
        text-align: right;
        padding-bottom: 20px;
    }
  `;
}

declare global {
    interface HTMLElementTagNameMap {
        'content-overview': ContentOverview
    }
}
