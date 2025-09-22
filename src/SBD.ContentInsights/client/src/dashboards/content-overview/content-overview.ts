// External libraries.
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Chart, registerables } from 'chart.js';

// Umbraco backoffice modules.
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

// Types, API.
import { getUmbracoManagementApiV1ContentInsightsGetAllDocumentsWithAuthors, getUmbracoManagementApiV1ContentInsightsGetDocumentTypes, } from '../../api';
import type { DocumentsWithAuthors } from '../../api';

// Shared utilities, constants, api.
import { createDocumentTypeBarChart, resetDocumentTypeBarChart } from './charts/bar-chart';
import { createPieChart, updatePieChart } from './charts/pie-chart';
import { renderDocumentsTable, onSort, onPageChange, filterDocumentTypes } from '../../shared/render/documents-table';
import type { DocumentsTableState } from '../../shared/render/documents-table';
import { renderDashboardError } from '../../shared/render/error';
import { buildDocumentTypeSelectOptions, groupDocumentsByStatus, onItemsPerPageChange } from '../../shared/utils';

// Styles.
import { generalStyles } from '../../styles/general.styles';


Chart.register(...registerables);

@customElement('content-overview')
export class ContentOverview extends UmbLitElement {
    @state() private documentsTableState: DocumentsTableState = {
        documentsWithAuthors: { documents: [], authors: [] } as DocumentsWithAuthors,
        filteredDocumentCount: 0,
        currentPage: 1,
        itemsPerPage: 10,
        sortColumn: null,
        sortDescending: false,
    };

    @state() private documentTypeSelectOptions: Option[] = [];
    @state() private hasError: boolean = false;
    @state() private documentCount: number = 0;

    private handleDocumentTypeSelectChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        const selectValue = select.value;
        updatePieChart(selectValue);
        filterDocumentTypes(selectValue, this.documentsTableState);
        this.documentsTableState.currentPage = 1;
        this.documentCount = this.documentsTableState.filteredDocumentCount;

        this.requestUpdate();
    }

    render() {
        if (this.hasError) {
            return renderDashboardError();
        }

        return html`
    <uui-box class="dashboard">
        <div class="dashboard-flex">
            <div class="dashboard-section-flex">
                <div class="section-header">
                    <uui-icon name="icon-bar-chart" class="uii-icon"></uui-icon>
                    <h2>Document count by Document Types</h2>
                </div>
                <div class="reset-button">
                    <p>Click on the bars to remove them, click on reset to reset the chart.</p>
                    <uui-button type="button" look="primary" color="danger" label="Reset" @click=${resetDocumentTypeBarChart}></uui-button>
                </div>
                <uui-box class="chart-box bar-chart">
                    <canvas id="documentsByDocumentTypeChart"></canvas>
                </uui-box>
            </div>
            <div class="dashboard-section-flex">
                <div class="section-header">
                    <uui-icon name="icon-pie-chart" class="uii-icon"></uui-icon>
                    <h2>Document count by Document Status</h2>
                </div>
                <div class="select-container">
                     <uui-icon name="icon-calculator" class="uii-icon"></uui-icon>
                     <h3 class="document-count">Document count: </h3>
                     <uui-tag class="uii-icon">${this.documentCount}</uui-tag>
                    <uui-select class="document-type-select" id="documentTypeSelect" label="documentTypeSelect" .options=${this.documentTypeSelectOptions} @change=${this.handleDocumentTypeSelectChange}></uui-select>
                </div>
                <uui-box class="chart-box pie-chart">
                    <canvas id="documentsByDocumentStatusChart"></canvas>
                </uui-box>
            </div>
        </div>
      ${renderDocumentsTable(
            this.documentsTableState,
            (column) => this.documentsTableState = onSort(this.documentsTableState, column),
            (event) => this.documentsTableState = onPageChange(this.documentsTableState, event),
            (event) => this.documentsTableState = onItemsPerPageChange(this.documentsTableState, event)
        )}
    </uui-box>
    `
    }

    async firstUpdated() {

        const { data: documentTypes, error: documentTypesError } = await getUmbracoManagementApiV1ContentInsightsGetDocumentTypes();

        if (documentTypesError || !documentTypes) {
            this.hasError = true;
            console.error(documentTypesError);
            return;
        }

        this.documentTypeSelectOptions = buildDocumentTypeSelectOptions(documentTypes);

        const barChartCtx = this.renderRoot.querySelector('#documentsByDocumentTypeChart') as HTMLCanvasElement;
        createDocumentTypeBarChart(barChartCtx, documentTypes);


        const { data: documentsWithAuthorsData, error: documentsWithAuthorsError } = await getUmbracoManagementApiV1ContentInsightsGetAllDocumentsWithAuthors();

        if (documentsWithAuthorsError || !documentsWithAuthorsData?.documents || !documentsWithAuthorsData?.authors ) {
            this.hasError = true;
            console.error(documentsWithAuthorsError);
            return;
        }

        this.documentsTableState = {
            ...this.documentsTableState,
            documentsWithAuthors: documentsWithAuthorsData
        };

        this.documentCount = documentsWithAuthorsData.documents.length;

        const documentsByStatus = groupDocumentsByStatus(documentsWithAuthorsData.documents);

        const pieChartCtx = this.renderRoot.querySelector('#documentsByDocumentStatusChart') as HTMLCanvasElement;
        createPieChart(pieChartCtx, documentsByStatus);
    }

    static styles = generalStyles;
}

declare global {
    interface HTMLElementTagNameMap {
        'content-overview': ContentOverview
    }
}
