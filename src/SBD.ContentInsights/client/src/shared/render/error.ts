import { html } from 'lit';

/**
 * Renders a standardized error message box for dashboards.
 * @param message Custom error message text.
 */

export function renderDashboardError(message = 'No documents were found. Try creating documents, then reload the page.') {
    return html`
    <uui-box class="dashboard">
      <div class="error-message">
        <uui-icon name="icon-application-error" class="uii-icon"></uui-icon>
        <h2>${message}</h2>
      </div>
    </uui-box>
  `;
}
