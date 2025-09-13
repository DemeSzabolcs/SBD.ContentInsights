// External libraries.
import { html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
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
import { createDocumentAgeDistributionBarChart, updateDocumentAgeDistributionChart } from './charts/bar-chart';
import { renderDocumentsTable, onSort, onPageChange, filterDocumentTypes } from '../../shared/render/documents-table';
import type { DocumentsTableState } from '../../shared/render/documents-table';
import { renderDashboardError } from '../../shared/render/error';
import { buildDocumentTypeSelectOptions, onItemsPerPageChange } from '../../shared/utils';

// Styles.
import { generalStyles } from '../../styles/general.styles';

Chart.register(...registerables);

@customElement('content-quality-and-lifecycle')
export class ContentQualityAndLifecycle extends UmbLitElement {
    @state() private documentsTableState: DocumentsTableState = {
        documentsWithAuthors: new DocumentsWithAuthors(),
        filteredDocumentCount: 0,
        currentPage: 1,
        itemsPerPage: 10,
        sortColumn: null,
        sortDescending: false,
    };

    @query('#draftsOlderThanSlider') private draftSlider!: HTMLInputElement;
    @query('#draftsOlderThanInput') private draftInput!: HTMLInputElement;
    @query('#draftsOlderThanWarning') private warningMessage!: HTMLParagraphElement;
    @state() private documentTypeSelectOptions: Option[] = [];
    @state() private hasError: boolean = false;
    @state() private draftDocumentCountInTimeRange: number = 0;
    @state() private draftsOlderThanDays: number = 30;
    @state() private selectValue: string = "all";
    @state() private selectName: string = "All Document Types";
    @state() private draftOnly: boolean = true;

    private get draftsLabel() {
        return this.draftOnly ? 'Drafts' : 'All Documents';
    }

    private handleAnyInputChange() {
        filterDocumentTypes(this.selectValue, this.documentsTableState, this.draftOnly, this.draftsOlderThanDays);
        this.draftDocumentCountInTimeRange = this.documentsTableState.filteredDocumentCount;
    }

    private handleDocumentTypeSelectChange(event: Event) {
        this.selectValue = (event.target as HTMLSelectElement).value
        this.selectName = this.documentTypeSelectOptions.find(option => option.value === this.selectValue)?.name
            ?? "All Document Types";

        this.handleAnyInputChange();
        updateDocumentAgeDistributionChart(this.selectValue);
        this.documentsTableState.currentPage = 1;
        this.requestUpdate();
    }

    private handleDraftsOlderThanAnyInput(event: Event) {
        const value = Number((event.target as HTMLInputElement).value);

        if (value < 1 || value > 365) {
            this.warningMessage.style.visibility = 'visible';
            return;
        }

        this.warningMessage.style.visibility = 'hidden';
        this.draftsOlderThanDays = value;

        this.draftInput.value = String(value);
        this.draftSlider.value = String(value);

        this.handleAnyInputChange();
    }

    private handleListAllDocumentsChange(event: Event) {
        const value = Boolean((event.target as HTMLInputElement).checked);
        this.draftOnly = !value;

        this.handleAnyInputChange();

        this.requestUpdate();
    }

    render() {
        if (this.hasError) {
            return renderDashboardError();
        }

        return html`
    <uui-box class="dashboard">
        <div>
            <div class="dashboard-section">
                <div class="section-header">
                    <uui-icon name="icon-time" class="uii-icon"></uui-icon>
                    <h2>Document Age Distribution</h2>
                </div>
                 <div>
                    <p>
                        Trashed documents (documents in the recyclebin) are not counted.
                    </p>
                </div>
                <div class="select-container">
                    <uui-select class="document-type-select" id="documentTypeSelect" label="documentTypeSelect" .options=${this.documentTypeSelectOptions} @change=${this.handleDocumentTypeSelectChange}></uui-select>
                </div>
                <uui-box class="chart-box bar-chart">
                    <canvas id="documentAgeDistributionChart"></canvas>
                </uui-box>
            </div>
        <div>
            <div class="dashboard-section">
                <div class="section-header">
                    <uui-icon name="icon-alert" class="uii-icon-warning"></uui-icon>
                    <h2>${this.draftsLabel} Requiring Attention</h2>
                </div>
                <div>
                    <p id="draftsOlderThanWarning" class="warning-message">Value must be between 1 and 365!</p>
                </div>
                 <div class="drafts-requiring-attention-container">
                    <p class="drafts-older-than-days-days">
                        ${this.draftsLabel} older than ${this.draftsOlderThanDays} days:
                    </p>
                    <h3 class="warning drafts-older-than-days-count">${this.draftDocumentCountInTimeRange}</h3>
                    <uui-slider id="draftsOlderThanSlider" min="1" max="365" step="1" label="Slider label" value="30" @input=${this.handleDraftsOlderThanAnyInput}></uui-slider>
                    <uui-input id="draftsOlderThanInput" label="Label" placeholder="30" type="number" inputmode="numeric" min="1" max="365" value="30" @change=${this.handleDraftsOlderThanAnyInput}></uui-input>
                </div>
                  <uui-toggle label="List all documents anyway" @change=${this.handleListAllDocumentsChange}></uui-toggle>
                  <p> Filtering for: ${this.selectName}
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

        const barChartCtx = this.renderRoot.querySelector('#documentAgeDistributionChart') as HTMLCanvasElement;
        createDocumentAgeDistributionBarChart(barChartCtx, documentsWithAuthorsData.documents);

        this.documentsTableState = {
            ...this.documentsTableState,
            documentsWithAuthors: documentsWithAuthorsData
        };

        filterDocumentTypes(this.selectValue, this.documentsTableState, this.draftOnly, this.draftsOlderThanDays);
        this.draftDocumentCountInTimeRange = this.documentsTableState.filteredDocumentCount;

        this.requestUpdate();
    }

    static styles = generalStyles;
}

declare global {
    interface HTMLElementTagNameMap {
        'content-quality-and-lifecycle': ContentQualityAndLifecycle
    }
}
