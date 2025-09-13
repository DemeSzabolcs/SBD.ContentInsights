import { css } from 'lit';
import { documentsTableStyles } from './documents-table.styles';

export const generalStyles = [
    documentsTableStyles,
    css`
    :host {
      display: block;
      margin: 0 auto;
    }

    .dashboard {
      width: 85vw;
      max-width: 1300px;
      margin: 40px auto 0;
      padding: 24px;
      border-radius: 6px;
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

    .drafts-requiring-attention-container {
      display: block;
    }

    @media (min-width: 768px) {
      .drafts-requiring-attention-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }

    #draftsOlderThanSlider {
      width: 33%;
      margin: 25px 20px 0;
    }

    .drafts-older-than-days-days {
      width: 240px;
    }

    .drafts-older-than-days-count {
      width: 30px;
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
      padding: 16px;
      border-radius: 6px;
      background-color: #2c2c30;
    }

    canvas {
      max-width: 100%;
    }

    .pie-chart {
      width: 90%;
      margin: auto;
    }

    .reset-button {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
    }

    .select-container {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .items-per-page {
      margin-left: auto;
      padding-right: 10px;
    }

    .document-type-select {
      margin-left: auto;
    }

    .error-message {
      display: flex;
      align-items: center;
      padding: 1rem;
      font-weight: bold;
      color: red;
    }

    .error-message > * {
      padding-right: 10px;
    }

    .uii-icon {
      font-size: 30px;
    }

    .uii-icon-warning {
      font-size: 30px;
      color: #f59e0b;
    }

    .warning {
      color: #f59e0b;
    }

    .warning-message {
      display: flex;
      justify-content: flex-end;
      visibility: hidden;
      color: #f59e0b;
    }

    .document-count {
      padding-right: 10px;
    }
  `,
];
