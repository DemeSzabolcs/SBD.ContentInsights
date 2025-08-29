// External libraries.
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Chart, registerables } from 'chart.js';

// Umbraco backoffice modules.
import { umbHttpClient } from '@umbraco-cms/backoffice/http-client';
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { umbracoPath } from '@umbraco-cms/backoffice/utils';

// Types.
import type { DocumentType, DocumentsByStatus } from '../../shared/types';

// Shared utilities, constants.
import { createBarChart } from './charts/bar-chart';
import { createPieChart } from './charts/pie-chart';
import { renderDocumentsTable, onSort, onPageChange } from './render-documents-table';
import type { DocumentsTableState } from './render-documents-table';

// Styles.
import { contentOverviewStyles } from '../../styles/content-overview.styles';

Chart.register(...registerables);

@customElement('content-overview')
export class ContentOverview extends UmbLitElement {
    @state() private documentsTableState: DocumentsTableState = {
        documents: [],
        currentPage: 1,
        itemsPerPage: 10,
        sortColumn: null,
        sortDescending: false,
    };
    private handleSort(column: 'status' | 'name' | 'type') {
        this.documentsTableState = onSort(this.documentsTableState, column);
    }

    private handlePageChange(event: CustomEvent) {
        this.documentsTableState = onPageChange(this.documentsTableState, event);
    }

    @state() private documentTypeSelectOptions: Option[] = [];
    @state() private hasError: boolean = false;

    private savedBarChart: Chart | null = null;
    private savedBarChartDatasetData: number[] | null = null;
    private savedBarChartLabels: string[] | null = null;

    private savedPieChart: Chart | null = null;
    private savedPieChartDatasetData: number[] | null = null;

    @state() private documentsByStatusGlobal: DocumentsByStatus | null = null;



    private updatePieChart(event: Event): void {
        const select = event.target as HTMLSelectElement;
        const selectValue = select.value;

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
                <uui-select id="contentTypeSelect" .options=${this.documentTypeSelectOptions} @change=${this.updatePieChart}></uui-select>
            </div>
            <uui-box class="chart-box pie-chart">
                <canvas id="contentByDocumentStatusChart"></canvas>
            </uui-box>
        </div>
      ${renderDocumentsTable(
          this.documentsTableState,
          (col) => this.handleSort(col),
          (e) => this.handlePageChange(e)
      )}
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

        this.documentsTableState.documents = [
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
