// External libraries.
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Chart, registerables } from 'chart.js';

// Umbraco backoffice modules.
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

// Types, API.
import { getUmbracoManagementApiV1ContentInsightsGetAllDocumentsWithAuthors, getUmbracoManagementApiV1ContentInsightsGetDocumentTypes, } from '../../api';
import type { DocumentsWithAuthors } from '../../api';

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
export class UserContributions extends UmbLitElement {
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
            return renderDashboardError();
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
                    <canvas id="documentsByUsersChart"></canvas>
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

        const { data: documentsWithAuthorsData, error: documentsWithAuthorsError } = await getUmbracoManagementApiV1ContentInsightsGetAllDocumentsWithAuthors();

        if (documentsWithAuthorsError || !documentsWithAuthorsData?.documents || !documentsWithAuthorsData?.authors) {
            this.hasError = true;
            console.error(documentsWithAuthorsError);
            return;
        }

        const { data: documentTypes, error: documentTypesError } = await getUmbracoManagementApiV1ContentInsightsGetDocumentTypes();

        if (documentTypesError || !documentTypes) {
            this.hasError = true;
            console.error(documentTypesError);
            return;
        }

        this.documentTypeSelectOptions = buildDocumentTypeSelectOptions(documentTypes);

        const barChartCtx = this.renderRoot.querySelector('#documentsByUsersChart') as HTMLCanvasElement;
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
        'user-contributions': UserContributions
    }
}
