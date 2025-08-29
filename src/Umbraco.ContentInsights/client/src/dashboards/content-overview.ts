// External libraries.
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Umbraco backoffice modules.
import { umbHttpClient } from '@umbraco-cms/backoffice/http-client';
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { umbracoPath } from '@umbraco-cms/backoffice/utils';
import type { UUIPaginationElement } from '@umbraco-cms/backoffice/external/uui';

// Types.
import type { DocumentType, DocumentsByStatus, UmbracoDocument } from '../shared/types';
import { DocumentStatus } from '../shared/types';

// Shared utilities, constants.
import { convertDocumentStatusToNumberString, getTagColor } from '../shared/utils';
import { barChartColors } from '../shared/constants';

// Styles.
import { contentOverviewStyles } from '../styles/content-overview.styles';

Chart.register(...registerables);

    @customElement('content-overview')
    export class ContentOverview extends UmbLitElement {
        @state() private contentTypeAliases: Option[] = [];
        @state() private hasError: boolean = false;

        @state() private savedBarChart: Chart | null = null;
        @state() private savedBarChartDatasetData: number[] | null = null;
        @state() private savedBarChartLabels: string[] | null = null;

        @state() private savedPieChart: Chart | null = null;
        @state() private savedPieChartDatasetData: number[] | null = null;

        @state() private documentsByStatusGlobal: DocumentsByStatus | null = null;

        // Document Statuses and Types table, sorting and pagination.
        @state() private documents: UmbracoDocument[] = [];
        @state() private currentPage = 1;
        @state() private itemsPerPage = 10;
        @state() private sortColumn: 'status' | 'name' | 'type' | null = null;
        @state() private sortDescending: boolean = false;

        private updatePieChart(selectValue: string): void {
            if (!this.savedPieChart || !this.savedPieChartDatasetData || !this.documentsByStatusGlobal) return

            if (selectValue == "all") {
                this.savedPieChart.data.datasets[0].data = [...this.savedPieChartDatasetData];
            }
            else {
                const publicCountByType = this.documentsByStatusGlobal.public
                    .filter(document => document.type == selectValue).length;

                const draftCountByType = this.documentsByStatusGlobal.draft
                    .filter(document => document.type == selectValue).length;

                const trashedCountByType = this.documentsByStatusGlobal.trashed
                    .filter(document => document.type == selectValue).length;

                this.savedPieChart.data.datasets[0].data = [
                    publicCountByType,
                    draftCountByType,
                    trashedCountByType,
                ];
            }

            this.savedPieChart.update();
        };

        private resetBarChart (): void {
            if (!this.savedBarChart || !this.savedBarChartLabels || !this.savedBarChartDatasetData) return

            this.savedBarChart.data.labels = [...this.savedBarChartLabels];
            this.savedBarChart.data.datasets[0].data = [...this.savedBarChartDatasetData];
            this.savedBarChart.update();
        };

        // Document Statuses and Types table and pagination.
        private get totalPages(): number {
            return Math.ceil(this.documents.length / this.itemsPerPage);
        }

        private onPageChange(event: CustomEvent) {
            this.currentPage = (event.target as UUIPaginationElement).current;
        }

        private getPaginatedItems(): UmbracoDocument[] {
            const sorted = this.getSortedDocuments();
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return sorted.slice(start, start + this.itemsPerPage);
        }

        private onSort(column: 'status' | 'name' | 'type') {
            if (this.sortColumn === column) {
                this.sortDescending = !this.sortDescending;
            } else {
                this.sortColumn = column;
                this.sortDescending = false;
            }
            this.requestUpdate();
        }

        private getSortedDocuments(): UmbracoDocument[] {
            let docs = [...this.documents];
            if (!this.sortColumn) return docs;

            docs.sort((a, b) => {
                let aValue: string = '';
                let bValue: string = '';

                switch (this.sortColumn) {
                    case 'status':
                        aValue = convertDocumentStatusToNumberString(a.status);
                        bValue = convertDocumentStatusToNumberString(b.status);
                        break;
                    case 'name':
                        aValue = a.name;
                        bValue = b.name;
                        break;
                    case 'type':
                        aValue = a.typeName;
                        bValue = b.typeName;
                        break;
                }

                const result = aValue.localeCompare(bValue, undefined, { numeric: true });
                return this.sortDescending ? -result : result;
            });

            return docs;
        }

        private onSelectChange(event: Event) {
            const select = event.target as HTMLSelectElement;
            const selectValue = select.value;
            this.updatePieChart(selectValue);
        }

        render() {
            if (this.hasError) {
                return html`
            <uui-box class="dashboard">
                <div class="error-message">
                    <uui-icon name="icon-application-error" style="font-size: 30px;"></uui-icon>
                    <h2>No documents were found. Try creating documents, then reload the page.</h2>
                </div>
            </uui-box>
        `;
            }

            return html`
    <uui-box class="dashboard">
        <div class="dashboard-section">
            <div class="section-header">
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
        <div class="dashboard-section">
            <div class="section-header">
                <uui-icon name="icon-pie-chart" style="font-size: 30px;"></uui-icon>
                <h2>Document count by Document Status</h2>
            </div>
            <div class="content-type-select-container">
                <uui-select id="contentTypeSelect" .options="${this.contentTypeAliases}" @change="${this.onSelectChange}"></uui-select>
            </div>
            <uui-box class="chart-box pie-chart">
                <canvas id="contentByDocumentStatusChart"></canvas>
            </uui-box>
        </div>
        <div class="dashboard-section">
            <div class="section-header">
                <uui-icon name="icon-bulleted-list" style="font-size: 30px;"></uui-icon>
                <h2>Documents</h2>
            </div>
            <div class="content-table">
                <table>
                    <thead>
                      <tr class="content-table-header">
                        <th @click=${() => this.onSort('status')}>
                          <uui-button type="button" look="outline" color="default" label="Status"></uui-button>
                          <uui-symbol-sort 
                            .active=${this.sortColumn === 'status'}
                            .descending=${this.sortDescending && this.sortColumn === 'status'}>
                          </uui-symbol-sort>
                        </th>
                        <th @click=${() => this.onSort('name')}>
                          <uui-button type="button" look="outline" color="default" label="Name"></uui-button>
                          <uui-symbol-sort 
                            .active=${this.sortColumn === 'name'}
                            .descending=${this.sortDescending && this.sortColumn === 'name'}>
                          </uui-symbol-sort>
                        </th>
                        <th @click=${() => this.onSort('type')}>
                          <uui-button type="button" look="outline" color="default" label="Type"></uui-button>
                          <uui-symbol-sort 
                            .active=${this.sortColumn === 'type'}
                            .descending=${this.sortDescending && this.sortColumn === 'type'}>
                          </uui-symbol-sort>
                        </th>
                        <th>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                        ${this.getPaginatedItems().map(item => html`
                            <tr>
                                <td>
                                  <uui-tag color="${getTagColor(item.status)}">
                                    ${item.status}
                                  </uui-tag>
                                </td>
                                <td>${item.name}</td>
                                <td>${item.typeName}</td>
                                <td>
                                    <uui-button
                                        label="Link"
                                        look="primary"
                                        type="button"
                                        href="${item.link}"
                                        target="_blank">
                                            Link
                                    </uui-button>
                                </td>
                            </tr>
                        `)}
                    </tbody>
                </table>
                <uui-pagination
                    firstlabel="&lt;&lt;"
                    previouslabel="&lt;"
                    nextlabel="&gt;"
                    lastlabel="&gt;&gt;"
                    .current=${this.currentPage}
                    .total=${this.totalPages}
                    @change="${this.onPageChange}">
                </uui-pagination>
            </div>
        </div>
    </uui-box>
    `
        }

        async firstUpdated() {
            const resetBtn = this.renderRoot.querySelector('#resetButton') as HTMLElement;
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    this.resetBarChart();
                });
            }

            const getContentTypesResponse = await tryExecute(this, umbHttpClient.get<DocumentType[]>({
                url: umbracoPath("/content-insights/get-content-types"),
            }));

            let contentTypes = getContentTypesResponse.data;

            if (!contentTypes) {
                this.hasError = true;
                return;
            }

            contentTypes = [...contentTypes].sort(
                (a, b) => b.count - a.count
            );

            this.contentTypeAliases = [
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

                        if (!this.savedBarChartDatasetData) {
                            this.savedBarChartDatasetData = [...data];
                        }

                        data.splice(closestIndex, 1);

                        const chartDataLabels = barChart.data.labels

                        if (chartDataLabels) {
                            if (!this.savedBarChartLabels) {
                                this.savedBarChartLabels = [...chartDataLabels];
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
            this.savedBarChart = barChart;

            const getDocumentsByStatusResponse = await tryExecute(this, umbHttpClient.get<DocumentsByStatus>({
                url: umbracoPath("/content-insights/get-documents-by-status"),
            }));

            const documentsByStatus = getDocumentsByStatusResponse.data;

            if (!documentsByStatus) {
                this.hasError = true;
                return;
            }

            this.documents = [
                ...documentsByStatus.public,
                ...documentsByStatus.draft,
                ...documentsByStatus.trashed,
            ];

            this.documentsByStatusGlobal = documentsByStatus;

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
            this.savedPieChart = pieChart;
            this.savedPieChartDatasetData = [...pieChart.data.datasets[0].data];
        }

        static styles = contentOverviewStyles;
    }

    declare global {
        interface HTMLElementTagNameMap {
            'content-overview': ContentOverview
        }
    }
