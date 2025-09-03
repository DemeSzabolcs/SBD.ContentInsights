import { css } from 'lit';

export const userContributionsStyles = css`
  :host {
    display: block;
    margin: 0 auto;
  }

  .dashboard {
    padding: 24px;
    border-radius: 6px;
    margin-top: 40px;
    max-width: 85vw;
    margin: auto;
  }

  .dashboard-flex {
    display: block;
  }

  .dashboard-section-flex {
    max-width: 100%;
    margin-bottom: 32px;
  }

  @media (min-width: 768px) {
    .dashboard-flex {
      display: flex;
      justify-content: space-between;
    }

    .dashboard-section-flex {
      max-width: 50%;
      margin: 0 2%;
    }
  }

  .dashboard-section {
    margin-bottom: 32px;
  }

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .section-header > * {
    padding-right: 10px;
  }

  .section-header h2 {
    font-size: 20px;
    font-weight: 600;
  }

  .chart-box {
    background-color: #2c2c30;
    padding: 16px;
    border-radius: 6px;
  }

  canvas {
    max-width: 100%;
  }

  .pie-chart {
    margin: auto;
    width: 90%;
  }

  .reset-button {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }

  .select-container {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .items-per-page {
    margin-left: auto;
    padding-right: 10px;
  }

  .document-type-select {
    margin-left: auto;
  }

  .error-message {
    color: red;
    font-weight: bold;
    padding: 1rem;
    display: flex;
    align-items: center;
  }

  .error-message > * {
    padding-right: 10px;
  }

  .content-table > table {
    width: 100%;
    padding-bottom: 40px;
  }

  .content-table > table > thead {
    vertical-align: baseline;
  }

  .content-table-header {
    text-align: left;
  }

  .content-table-header > th {
    padding-bottom: 10px;
  }

  .content-table-header > th:nth-child(1),
  .content-table-header > th:nth-child(4) {
    width: 13%;
  }

  .content-table-header > th:nth-child(2) {
    width: 40%;
  }

  .content-table-header > th:nth-child(3) {
    width: 34%;
  }
`;
