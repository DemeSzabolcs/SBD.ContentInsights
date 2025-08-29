import { css } from 'lit';

export const contentOverviewStyles = css`
  :host {
    display: block;
    max-width: 1000px;
    margin: 0 auto;
  }

  .dashboard {
    padding: 24px;
    border-radius: 6px;
    margin-top: 40px;
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
    width: 70%;
  }

  .reset-button {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }

  .content-type-select-container {
    text-align: right;
    padding-bottom: 20px;
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
    width: 42%;
  }

  .content-table-header > th:nth-child(3) {
    width: 35%;
  }
`;
