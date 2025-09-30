import { css } from 'lit';

export const documentsTableStyles = css`
 .items-per-page {
    margin-left: auto;
    padding-right: 10px;
  }

  .document-table > table {
    width: 100%;
    padding-bottom: 40px;
  }

  .document-table-header {
    text-align: left;
  }

  .document-table-header > th {
    padding-bottom: 10px;
    white-space: nowrap;
  }

  .document-table-header > th:nth-child(1),
  .document-table-header > th:nth-child(4) {
    width: 13%;
  }

  .document-table-header > th:nth-child(2) {
    width: 40%;
  }

  .document-table-header > th:nth-child(3) {
    width: 34%;
  }

  .document-table-pagination {
    display: block;
    margin: auto;
    width: 50%;
  }
`;
