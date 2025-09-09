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
import { createAuthorBarChart, resetAuthorBarChart, updateAuthorBarChart } from './charts/bar-chart';
import { renderDocumentsTable, onSort, onPageChange, filterDocumentTypes } from '../../shared/render/documents-table';
import type { DocumentsTableState } from '../../shared/render/documents-table';
import { renderDashboardError } from '../../shared/render/error';
import { buildDocumentTypeSelectOptions, onItemsPerPageChange } from '../../shared/utils';

// Styles.
import { generalStyles } from '../../styles/general.styles';

Chart.register(...registerables);

@customElement('user-contributions')
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

    private handleDocumentTypeSelectChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        const selectValue = select.value;
        filterDocumentTypes(selectValue, this.documentsTableState);
        updateAuthorBarChart(selectValue);
        this.documentsTableState.currentPage = 1;
        this.requestUpdate();
    }

    render() {
        if (this.hasError) {
            renderDashboardError();
        }

        return html`
    <uui-box class="dashboard">
        <div class="dashboard-flex">
            <div class="dashboard-section">
                <div class="section-header">
                    <uui-icon name="icon-users" class="uii-icon"></uui-icon>
                    <h2>Document count by Users</h2>
                </div>
                <div>
                    <p>
                    In case of public and trashed documents, the user is the person who last published the document.
                    </br>
                    In case of draft documents, the user is the person who last edited the document.
                    </p>
                </div>
                <div class="reset-button">
                    <p>Click on the bars to remove them, click on reset to reset the chart.</p>
                    <uui-button type="button" look="primary" color="danger" label="Reset" @click=${resetAuthorBarChart}></uui-button>
                </div>
                <div class="select-container">
                    <uui-select class="document-type-select" id="documentTypeSelect" label="documentTypeSelect" .options=${this.documentTypeSelectOptions} @change=${this.handleDocumentTypeSelectChange}></uui-select>
                </div>
                <uui-box class="chart-box bar-chart">
                    <canvas id="contentByDocumentTypeChart"></canvas>
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

        const getDocumentsWithAuthorsResponse = await tryExecute(this, umbHttpClient.get<DocumentsWithAuthors>({
            url: umbracoPath("/content-insights/get-all-documents-with-authors"),
        }));

        const documentsWithAuthorsData = getDocumentsWithAuthorsResponse.data;

        if (!documentsWithAuthorsData?.documents || !documentsWithAuthorsData?.authors) {
            this.hasError = true;
            return;
        }

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
        createAuthorBarChart(barChartCtx, documentsWithAuthorsData);

        this.documentsTableState = {
            ...this.documentsTableState,
            documentsWithAuthors: documentsWithAuthorsData
        };
    }

    static styles = generalStyles;
}

declare global {
    interface HTMLElementTagNameMap {
        'user-contributions': ContentOverview
    }
}
