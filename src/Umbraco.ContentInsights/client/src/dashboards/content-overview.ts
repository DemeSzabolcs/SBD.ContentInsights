import { css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Chart, registerables } from 'chart.js'
import { umbHttpClient } from '@umbraco-cms/backoffice/http-client';
import { tryExecute } from '@umbraco-cms/backoffice/resources';
//import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
//import { litFontawesome } from '@weavedev/lit-fontawesome';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

Chart.register(...registerables)

interface DocumentType {
    name: string;
    label: string;
    count: number;
}

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

let barChart: any | null = null;
let barChartDatasetData: any | null = null;
let barChartLabels: any | null = null;

const resetBarChart = (): void => {
    if (!barChart || !barChartLabels || !barChartDatasetData) return

    barChart.data.labels = [...barChartLabels];
    barChart.data.datasets[0].data = [...barChartDatasetData];
    barChart.update();
};

resetBarChart();

@customElement('content-overview')
export class ContentOverview extends UmbLitElement {
    render() {
        return html`
    <div class="dashboard">
        <div class="chart-section">
            <div class="chart-header">
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

        const response = await tryExecute(this, umbHttpClient.get<DocumentType[]>({
            url: '/umbraco/management/api/v1/content-insights/get-content-types',
        }));

        const contentTypes = (response as { data: DocumentType[] }).data;

        if (!contentTypes) return;

        const documentNames = contentTypes.map(documentType => documentType.name);
        const documentCounts = contentTypes.map(documentType => documentType.count);

        const ctx = this.renderRoot.querySelector('#contentByDocumentTypeChart') as HTMLCanvasElement;
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: documentNames,
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
                    const rect = chart.canvas.getBoundingClientRect();
                    const x = nativeEvent.clientX - rect.left;
                    let closestIndex = 0;
                    let minDistance = Infinity;

                    const xScale = chart.scales['x'];
                    if (!xScale) return;

                    const datasetIndex = 0;
                    const data = chart.data.datasets[datasetIndex].data;

                    data.forEach((_, i) => {
                        const dataPosition = xScale.getPixelForValue(i);

                        const distance = Math.abs(x - dataPosition);
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestIndex = i;
                        }
                    });

                    if (!barChartDatasetData) { 
                        barChartDatasetData = [...data];
                    }

                    data.splice(closestIndex, 1);

                    const chartDataLabels = chart.data.labels
                    
                    if (chartDataLabels) {
                        if (!barChartLabels) {
                            barChartLabels = [...chartDataLabels];
                        }

                        chartDataLabels.splice(closestIndex, 1);
                    }

                    chart.update();
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

        barChart = chart;
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
