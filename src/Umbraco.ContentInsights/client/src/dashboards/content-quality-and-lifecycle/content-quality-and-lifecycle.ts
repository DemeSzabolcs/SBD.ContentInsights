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
import { createDocumentAgeDistributionBarChart, updateDocumentAgeDistributionChart } from './charts/bar-chart';
import { renderDocumentsTable, onSort, onPageChange, filterDocumentTypes } from '../../shared/render/documents-table';
import type { DocumentsTableState } from '../../shared/render/documents-table';
import { renderDashboardError } from '../../shared/render/error';
import { buildDocumentTypeSelectOptions, onItemsPerPageChange } from '../../shared/utils';

// Styles.
import { generalStyles } from '../../styles/general.styles';

Chart.register(...registerables);

@customElement('content-quality-and-lifecycle')
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
    @state() private draftDocumentCountInTimeRange: number = 0;
    @state() private draftsOlderThanDays: number = 30;
    @state() private warningMessage: HTMLParagraphElement | null = null;
    @state() private draftSlider: HTMLInputElement | null = null;
    @state() private draftInput: HTMLInputElement | null = null;


    private handleDocumentTypeSelectChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        const selectValue = select.value;
        filterDocumentTypes(selectValue, this.documentsTableState);
        updateDocumentAgeDistributionChart(selectValue);
        this.documentsTableState.currentPage = 1;
        this.requestUpdate();
    }

    private handleDraftsOldarThanInputChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = Number(input.value);

        if (!this.warningMessage) {
            this.warningMessage = this.renderRoot.querySelector<HTMLParagraphElement>('#draftsOlderThanWarning');
        }

        if (this.warningMessage) {
            if (value < 1 || value > 365) {
                this.warningMessage.style.visibility = 'visible';
            } else {
                this.warningMessage.style.visibility = 'hidden';
                this.draftsOlderThanDays = value;

                if (this.draftSlider) {
                    this.draftSlider.value = String(value);
                }
            }
        }
    }

    private handleDraftsOldarThanSliderChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = Number(input.value);
        this.draftsOlderThanDays = value

        if (this.warningMessage) {
            this.warningMessage.style.visibility = 'hidden';
        }

        if (this.draftInput) {
            this.draftInput.value = String(value);
        }
    }

    render() {
        if (this.hasError) {
            renderDashboardError();
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
                    <h2>Drafts Requiring Attention</h2>
                </div>
                <div>
                    <p id="draftsOlderThanWarning" class="warning-message">Value must be between 1 and 365!</p>
                </div>
                 <div class="drafts-requiring-attention-container">
                    <p class="drafts-older-than-days-days">
                        Drafts older than ${this.draftsOlderThanDays} days:
                    </p>
                    <h3 class="warning drafts-older-than-days-count">${this.draftDocumentCountInTimeRange}</h3>
                    <uui-slider id="draftsOlderThanSlider" min="1" max="365" step="1" label="Slider label" value="1" @input=${this.handleDraftsOldarThanSliderChange}></uui-slider>
                    <uui-input id="draftsOlderThanInput" label="Label" placeholder="30" type="number" inputmode="numeric" min="1" max="365" value="30" @change=${this.handleDraftsOldarThanInputChange}></uui-input>
                </div>
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

        this.draftSlider = this.renderRoot.querySelector<HTMLInputElement>('#draftsOlderThanSlider');
        this.draftInput = this.renderRoot.querySelector<HTMLInputElement>('#draftsOlderThanInput');

        this.documentTypeSelectOptions = buildDocumentTypeSelectOptions(documentTypes);

        const barChartCtx = this.renderRoot.querySelector('#documentAgeDistributionChart') as HTMLCanvasElement;
        createDocumentAgeDistributionBarChart(barChartCtx, documentsWithAuthorsData.documents);

        this.documentsTableState = {
            ...this.documentsTableState,
            documentsWithAuthors: documentsWithAuthorsData
        };
    }

    static styles = generalStyles;
}

declare global {
    interface HTMLElementTagNameMap {
        'content-quality-and-lifecycle': ContentOverview
    }
}
