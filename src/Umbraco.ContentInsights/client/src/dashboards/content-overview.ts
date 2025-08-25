import { css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Chart, registerables } from 'chart.js'
import { umbHttpClient } from '@umbraco-cms/backoffice/http-client';
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import { litFontawesome } from '@weavedev/lit-fontawesome';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import type { DocumentType, DocumentsByStatus } from '../shared/types'

Chart.register(...registerables)

// Chart.js has a Colors plugin, but it only works on different datasets, here we only have one.
const barChartColors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(199, 199, 199, 0.7)',
];

let savedBarChart: any | null = null;
let savedBarChartDatasetData: any | null = null;
let savedBarChartLabels: any | null = null;

const resetBarChart = (): void => {
    if (!savedBarChart || !savedBarChartLabels || !savedBarChartDatasetData) return

    savedBarChart.data.labels = [...savedBarChartLabels];
    savedBarChart.data.datasets[0].data = [...savedBarChartDatasetData];
    savedBarChart.update();
};

resetBarChart();

@customElement('content-overview')
export class ContentOverview extends UmbLitElement {
    render() {
        return html`
    <div class="dashboard">
        <div class="chart-section">
            <div class="chart-header">
            <uui-icon-registry-essential>
            <uui-icon name="favorite">
    
            </uui-icon>
            </uui-icon-registry-essential>
                ${litFontawesome(faChartSimple)}
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
                <h2>Document count by Document Types</h2>
            </div>
            <uui-box class="chart-box">
                <canvas id="contentByDocumentStatusChart"></canvas>
            </uui-box>
        </div>
    </div>
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
            url: '/umbraco/management/api/v1/content-insights/get-content-types',
        }));

        let contentTypes = (getContentTypesResponse as { data: DocumentType[] }).data;

        if (!contentTypes) return;

        contentTypes = [...contentTypes].sort(
            (a, b) => b.count - a.count
        );

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
            url: '/umbraco/management/api/v1/content-insights/get-documents-by-status',
        }));

        let documentsByStatus = (getDocumentsByStatusResponse as { data: DocumentsByStatus }).data;

        console.log(documentsByStatus);

        //const pieChartCtx = this.renderRoot.querySelector('#contentByDocumentStatusChart') as HTMLCanvasElement;
        //const pieChart = 
    }

    static styles = css`
    :host {
      display: block;
      max-width: 1000px;
      margin: 0 auto;
    }

    .dashboard {
      background-color: #252529;
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
  `;
}

declare global {
    interface HTMLElementTagNameMap {
        'content-overview': ContentOverview
    }
}
