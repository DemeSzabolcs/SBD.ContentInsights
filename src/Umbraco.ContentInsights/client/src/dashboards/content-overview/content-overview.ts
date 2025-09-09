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
import type { DocumentType } from '../../shared/types';
import { DocumentsWithAuthors } from '../../shared/types';

// Shared utilities, constants.
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
        documentsWithAuthors: new DocumentsWithAuthors(),
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

        if (selectValue === "all") {
            this.documentCount = this.documentsTableState.documentsWithAuthors.documents.length;
        } else {
            this.documentCount = this.documentsTableState.documentsWithAuthors.documents
                .filter(document => document.type === selectValue)
                .length;
        }

        this.requestUpdate();
    }

    render() {
        if (this.hasError) {
            if (this.hasError) {
                renderDashboardError();
            }
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
                    <canvas id="contentByDocumentTypeChart"></canvas>
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
                    <canvas id="contentByDocumentStatusChart"></canvas>
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
        const getContentTypesResponse = await tryExecute(this, umbHttpClient.get<DocumentType[]>({
            url: umbracoPath("/content-insights/get-document-types"),
        }));

        let documentTypes = getContentTypesResponse.data;

        if (!documentTypes) {
            this.hasError = true;
            return;
        }

        this.documentTypeSelectOptions = buildDocumentTypeSelectOptions(documentTypes);

        const barChartCtx = this.renderRoot.querySelector('#contentByDocumentTypeChart') as HTMLCanvasElement;
        createDocumentTypeBarChart(barChartCtx, documentTypes);

        const getDocumentsWithAuthorsResponse = await tryExecute(this, umbHttpClient.get<DocumentsWithAuthors>({
            url: umbracoPath("/content-insights/get-all-documents-with-authors"),
        }));

        const documentsWithAuthorsData = getDocumentsWithAuthorsResponse.data;

        if (!documentsWithAuthorsData?.documents || !documentsWithAuthorsData?.authors) {
            this.hasError = true;
            return;
        }

        this.documentsTableState = {
            ...this.documentsTableState,
            documentsWithAuthors: documentsWithAuthorsData
        };

        this.documentCount = documentsWithAuthorsData.documents.length;

        const documentsByStatus = groupDocumentsByStatus(documentsWithAuthorsData.documents);

        const pieChartCtx = this.renderRoot.querySelector('#contentByDocumentStatusChart') as HTMLCanvasElement;
        createPieChart(pieChartCtx, documentsByStatus);
    }

    static styles = generalStyles;
}

declare global {
    interface HTMLElementTagNameMap {
        'content-overview': ContentOverview
    }
}
