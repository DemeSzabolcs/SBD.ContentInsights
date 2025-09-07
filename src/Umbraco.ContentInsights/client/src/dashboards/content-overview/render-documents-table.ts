import { html } from 'lit';
import type { UmbracoDocument, DocumentsWithAuthors } from '../../shared/types';
import { convertDocumentStatusToNumberString, getTagColor, getAuthorNameByKey, getAuthorLinkFromKey } from '../../shared/utils';
import type { UUIPaginationElement } from '@umbraco-cms/backoffice/external/uui';

let savedDocuments: UmbracoDocument[] | null = null;

export type SortColumn = 'status' | 'name' | 'type' | 'author' | null;

export interface DocumentsTableState {
    documentsWithAuthors: DocumentsWithAuthors;
    currentPage: number;
    itemsPerPage: number;
    sortColumn: SortColumn;
    sortDescending: boolean;
}
export function filterDocumentTypes(selectValue: string, state: DocumentsTableState): void {
    if (!savedDocuments) {
        if (state.documentsWithAuthors.documents) {
            savedDocuments = [...state.documentsWithAuthors.documents];
        } else {
            return;
        }
    }

    if (selectValue === "all") {
        state.documentsWithAuthors.documents = [...savedDocuments];
    } else {
        state.documentsWithAuthors.documents = [...savedDocuments.filter(document => document.type === selectValue)];
    }
}

export function getTotalPages(state: DocumentsTableState): number {
    return Math.ceil(state.documentsWithAuthors.documents.length / state.itemsPerPage);
}

export function onPageChange(
    state: DocumentsTableState,
    event: CustomEvent
): DocumentsTableState {
    return {
        ...state,
        currentPage: (event.target as UUIPaginationElement).current,
    };
}

export function onSort(
    state: DocumentsTableState,
    column: 'status' | 'name' | 'type' | 'author'
): DocumentsTableState {
    if (state.sortColumn === column) {
        return { ...state, sortDescending: !state.sortDescending };
    }
    return { ...state, sortColumn: column, sortDescending: false };
}

export function getSortedDocuments(state: DocumentsTableState): UmbracoDocument[] {
    let docs = [...state.documentsWithAuthors.documents];
    if (!state.sortColumn) return docs;

    docs.sort((a, b) => {
        let aValue = '';
        let bValue = '';

        switch (state.sortColumn) {
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
            case 'author':
                aValue = getAuthorNameByKey(a.authorKey, state.documentsWithAuthors.authors);
                bValue = getAuthorNameByKey(b.authorKey, state.documentsWithAuthors.authors);
                break;
        }

        const result = aValue.localeCompare(bValue, undefined, { numeric: true });
        return state.sortDescending ? -result : result;
    });

    return docs;
}

export function getPaginatedItems(state: DocumentsTableState): UmbracoDocument[] {
    const sorted = getSortedDocuments(state);
    const start = (state.currentPage - 1) * state.itemsPerPage;
    return sorted.slice(start, start + state.itemsPerPage);
}

export function renderDocumentsTable(
    state: DocumentsTableState,
    onSortClick: (column: 'status' | 'name' | 'type' | 'author') => void,
    onPageChangeHandler: (event: CustomEvent) => void,
    onItemsPerPageChange: (event: Event) => void
) {
    const itemsPerPageOptions = [
        { name: "10", value: "10", selected: state.itemsPerPage === 10 },
        { name: "25", value: "25", selected: state.itemsPerPage === 25 },
        { name: "50", value: "50", selected: state.itemsPerPage === 50 },
        { name: "100", value: "100", selected: state.itemsPerPage === 100 }
    ];
    return html`
    <div class="dashboard-section">
      <div class="section-header">
        <uui-icon name="icon-bulleted-list" style="font-size: 30px;"></uui-icon>
        <h2>Documents</h2>
      </div>
      <div class="select-container">
        <p class="items-per-page">Items per page:</p>
        <uui-select id="itemPerPageSelect" label="itemPerPageSelect" .options=${itemsPerPageOptions} @change=${onItemsPerPageChange}></uui-select>
      </div>
      <div class="content-table">
        <table>
          <thead>
            <tr class="content-table-header">
              <th @click=${() => onSortClick('status')}>
                <uui-button type="button" look="outline" color="default" label="Status"></uui-button>
                <uui-symbol-sort
                  .active=${state.sortColumn === 'status'}
                  .descending=${state.sortDescending && state.sortColumn === 'status'}>
                </uui-symbol-sort>
              </th>
              <th @click=${() => onSortClick('name')}>
                <uui-button type="button" look="outline" color="default" label="Name"></uui-button>
                <uui-symbol-sort
                  .active=${state.sortColumn === 'name'}
                  .descending=${state.sortDescending && state.sortColumn === 'name'}>
                </uui-symbol-sort>
              </th>
              <th @click=${() => onSortClick('type')}>
                <uui-button type="button" look="outline" color="default" label="Type"></uui-button>
                <uui-symbol-sort
                  .active=${state.sortColumn === 'type'}
                  .descending=${state.sortDescending && state.sortColumn === 'type'}>
                </uui-symbol-sort>
              </th>
              <th @click=${() => onSortClick('author')}>
                <uui-button type="button" look="outline" color="default" label="Author"></uui-button>
                <uui-symbol-sort
                  .active=${state.sortColumn === 'author'}
                  .descending=${state.sortDescending && state.sortColumn === 'author'}>
                </uui-symbol-sort>
              </th>
            </tr>
          </thead>
          <tbody>
            ${getPaginatedItems(state).map(
        (item) => html`
                <tr>
                  <td>
                  <uui-tag color="${getTagColor(item.status)}">${item.status}</uui-tag>
                  </td>
                  <td>
                    <uui-button look="default" type="button" href="${item.link}" target="_blank" label="${item.name}">${item.name}<uui-icon name="icon-link"></uui-icon></uui-button>
                  </td>
                  <td>${item.typeName}</td>
                  <td>
                    <uui-button look="default" type="button" href="${getAuthorLinkFromKey(item.authorKey)}" target="_blank" label="${getAuthorNameByKey(item.authorKey, state.documentsWithAuthors.authors)}">${getAuthorNameByKey(item.authorKey, state.documentsWithAuthors.authors)} <uui-icon name="icon-link"></uui-icon> </uui-button>
                  </td>
                </tr>
              `
    )}
          </tbody>
        </table>
        <uui-pagination
          firstlabel="&lt;&lt;"
          previouslabel="&lt;"
          nextlabel="&gt;"
          lastlabel="&gt;&gt;"
          .current=${state.currentPage}
          .total=${getTotalPages(state)}
          @change=${onPageChangeHandler}>
        </uui-pagination>
      </div>
    </div>
  `;
}
