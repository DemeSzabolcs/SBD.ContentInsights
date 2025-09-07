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
import { createBarChart, resetBarChart } from './charts/bar-chart';
import { createPieChart, updatePieChart } from './charts/pie-chart';
import { renderDocumentsTable, onSort, onPageChange, filterDocumentTypes } from './render-documents-table';
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

    @state() private documentTypeSelectOptions: Option[] = [];
    @state() private hasError: boolean = false;

    private handleSort(column: 'status' | 'name' | 'type') {
        this.documentsTableState = onSort(this.documentsTableState, column);
    }

    private handlePageChange(event: CustomEvent) {
        this.documentsTableState = onPageChange(this.documentsTableState, event);
    }

    private handleDocumentTypeSelectChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        const selectValue = select.value;
        updatePieChart(selectValue);
        filterDocumentTypes(selectValue, this.documentsTableState);
        this.documentsTableState.currentPage = 1;
        this.requestUpdate();
    }

    private handleItemsPerPageChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        const selectValue = Number(select.value);

        this.documentsTableState = {
            ...this.documentsTableState,
            itemsPerPage: selectValue,
        };
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
        <div class="dashboard-flex">
            <div class="dashboard-section-flex">
                <div class="section-header">
                    <uui-icon name="icon-bar-chart" style="font-size: 30px;"></uui-icon>
                    <h2>Document count by Document Types</h2>
                </div>
                <div class="reset-button">
                    <p>Click on the bars to remove them, click on reset to reset the chart.</p>
                    <uui-button type="button" look="primary" color="danger" label="Reset" @click=${resetBarChart}></uui-button>
                </div>
                <uui-box class="chart-box bar-chart">
                    <canvas id="contentByDocumentTypeChart"></canvas>
                </uui-box>
            </div>
            <div class="dashboard-section-flex">
                <div class="section-header">
                    <uui-icon name="icon-pie-chart" style="font-size: 30px;"></uui-icon>
                    <h2>Document count by Document Status</h2>
                </div>
                <div class="select-container">
                    <uui-select class="document-type-select" id="documentTypeSelect" label="documentTypeSelect" .options=${this.documentTypeSelectOptions} @change=${this.handleDocumentTypeSelectChange}></uui-select>
                </div>
                <uui-box class="chart-box pie-chart">
                    <canvas id="contentByDocumentStatusChart"></canvas>
                </uui-box>
            </div>
        </div>
      ${renderDocumentsTable(
            this.documentsTableState,
            (column) => this.handleSort(column),
            (event) => this.handlePageChange(event),
            (event) => this.handleItemsPerPageChange(event)
        )}
    </uui-box>
    `
    }

    async firstUpdated() {
        const getContentTypesResponse = await tryExecute(this, umbHttpClient.get<DocumentType[]>({
            url: umbracoPath("/content-insights/get-document-types"),
        }));

        let documentTypes = getContentTypesResponse.data;

        if (!documentTypes) {
            this.hasError = true;
            return;
        }

        this.documentTypeSelectOptions = [
            { name: 'All Document Types', value: 'all', selected: true },
            ...documentTypes
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(type => ({ name: type.name, value: type.type })),
        ];

        const barChartCtx = this.renderRoot.querySelector('#contentByDocumentTypeChart') as HTMLCanvasElement;
        createBarChart(barChartCtx, documentTypes);

        const getDocumentsByStatusResponse = await tryExecute(this, umbHttpClient.get<DocumentsByStatus>({
            url: umbracoPath("/content-insights/get-documents-by-status"),
        }));

        const documentsByStatus = getDocumentsByStatusResponse.data;

        if (!documentsByStatus) {
            this.hasError = true;
            return;
        }

        this.documentsTableState = {
            ...this.documentsTableState,
            documents: [
                ...documentsByStatus.public,
                ...documentsByStatus.draft,
                ...documentsByStatus.trashed,
            ],
        };

        const pieChartCtx = this.renderRoot.querySelector('#contentByDocumentStatusChart') as HTMLCanvasElement;
        createPieChart(pieChartCtx, documentsByStatus);
    }

    static styles = contentOverviewStyles;
}

declare global {
    interface HTMLElementTagNameMap {
        'content-overview': ContentOverview
    }
}
