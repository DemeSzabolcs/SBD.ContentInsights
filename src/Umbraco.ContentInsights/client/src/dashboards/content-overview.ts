import { css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Chart, registerables } from 'chart.js'
import { umbHttpClient } from '@umbraco-cms/backoffice/http-client';
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import { litFontawesome } from '@weavedev/lit-fontawesome';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

Chart.register(...registerables)
interface DocumentType {
    name: string;
    label: string;
    count: number;
}
@customElement('content-overview')
export class ContentOverview extends UmbLitElement {
    render() {
        return html`
        <button class="bg-blue-200 text-yellow-200 p-2 rounded-full text-2xl"">Hello world!</button>
      <div>
        <div class="mb-8">
            <div class="flex items-center mb-4">
                ${litFontawesome(faChartSimple, { className: 'icon-lg'})}
            <h2 class="text-xl font-semibold">Document count by Document Types</h2>
            </div>
            <div class="bg-[#2c2c30] p-4 rounded-md">
                <canvas id="contentByDocumentTypeChart" width="400" height="200"></canvas>
            </div>
          </div>
      </div>
    `
    }

    async firstUpdated() {

        const response = await tryExecute(this, umbHttpClient.get<DocumentType[]>({
            url: '/umbraco/management/api/v1/content-insights/get-content-types',
        }));

        const contentTypes = (response as { data: DocumentType[] }).data;

        if (!contentTypes) return;

        const documentNames = contentTypes.map((documentType: any) => documentType.name);
        const documentCounts = contentTypes.map((documentType: any) => documentType.count);

        const ctx = this.renderRoot.querySelector('#contentByDocumentTypeChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: documentNames,
                datasets: [
                    {
                        label: 'Number of Items',
                        data: documentCounts,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: 'rgba(54, 162, 235, 1)',
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
                    },
                    title: {
                        display: true,
                        text: 'Content Items by Document Type',
                        color: 'white',
                        font: {
                            size: 16,
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'white',
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
    }

    static styles = css`
    :host {
      display: block;
      max-width: 800px;
      margin: 0 auto;
    }
    canvas {
      max-width: 100%;
    }
  `
}

declare global {
    interface HTMLElementTagNameMap {
        'content-overview': ContentOverview
    }
}
