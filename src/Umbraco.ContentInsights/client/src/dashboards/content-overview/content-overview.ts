// External libraries.
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Chart, registerables } from 'chart.js';

// Umbraco backoffice modules.
import { umbHttpClient } from '@umbraco-cms/backoffice/http-client';
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { umbracoPath } from '@umbraco-cms/backoffice/utils';
import type { UUIPaginationElement } from '@umbraco-cms/backoffice/external/uui';

// Types.
import type { DocumentType, DocumentsByStatus, UmbracoDocument } from '../../shared/types';

// Shared utilities, constants.
import { convertDocumentStatusToNumberString, getTagColor } from '../../shared/utils';
import { createBarChart } from './charts/bar-chart';
import { createPieChart } from './charts/pie-chart';

// Styles.
import { contentOverviewStyles } from '../../styles/content-overview.styles';

Chart.register(...registerables);

@customElement('content-overview')
export class ContentOverview extends UmbLitElement {
    @state() private documentTypeSelectOptions: Option[] = [];
    @state() private hasError: boolean = false;

    private savedBarChart: Chart | null = null;
    private savedBarChartDatasetData: number[] | null = null;
    private savedBarChartLabels: string[] | null = null;

    private savedPieChart: Chart | null = null;
    private savedPieChartDatasetData: number[] | null = null;

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

    private resetBarChart(): void {
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
                <uui-button type="button" look="primary" color="danger" label="Reset" @click=${this.resetBarChart}></uui-button>
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
                <uui-select id="contentTypeSelect" .options=${this.documentTypeSelectOptions} @change=${this.onSelectChange}></uui-select>
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
                                    <uui-button label="Link" look="primary" type="button" href="${item.link}" target="_blank" label="Link"></uui-button>
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
        const getContentTypesResponse = await tryExecute(this, umbHttpClient.get<DocumentType[]>({
            url: umbracoPath("/content-insights/get-content-types"),
        }));

        let documentTypes = getContentTypesResponse.data;

        if (!documentTypes) {
            this.hasError = true;
            return;
        }

        this.documentTypeSelectOptions = [
            { name: 'All Document Types', value: 'all', selected: true },
            ...documentTypes.map(type => ({ name: type.name, value: type.type })),
        ];

        const documentCounts = documentTypes.map(documentType => documentType.count);

        const barChartCtx = this.renderRoot.querySelector('#contentByDocumentTypeChart') as HTMLCanvasElement;

        const { barChart, barChartDatasetData, labels } = createBarChart(barChartCtx, documentTypes, documentCounts, this.savedBarChartDatasetData, this.savedBarChartLabels);
        this.savedBarChart = barChart;
        this.savedBarChartDatasetData = barChartDatasetData;
        this.savedBarChartLabels = labels;

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
        const { pieChart, pieChartDatasetData } = createPieChart(pieChartCtx, documentsByStatus, this.savedPieChartDatasetData)
        this.savedPieChart = pieChart;
        this.savedPieChartDatasetData = pieChartDatasetData;
    }

    static styles = contentOverviewStyles;
}

declare global {
    interface HTMLElementTagNameMap {
        'content-overview': ContentOverview
    }
}
