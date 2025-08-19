import { css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Chart, registerables } from 'chart.js'
import { umbHttpClient } from '@umbraco-cms/backoffice/http-client';
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

Chart.register(...registerables)
interface ContentType {
    name: string;
    label: string;
}
@customElement('content-insights')
export class ContentInsights extends UmbLitElement{
    @property()
    docsHint = 'Click on the Vite and Lit logos to learn more'

    @property({ type: Number })
    count = 0

    render() {
        return html`
      <div>
        <canvas id="myChart" width="400" height="200"></canvas>
      </div>
      <div class="card">
        <button @click=${this._onClick}>count is ${this.count}</button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
    `
    }

    async firstUpdated() {

        const response = await tryExecute(this, umbHttpClient.get<ContentType[]>({
            url: '/umbraco/management/api/v1/content-insights/get-content-types',
        }));

        const contentTypes = (response as { data: ContentType[] }).data;

        if (!contentTypes) return;

        const labels = contentTypes.map((ct: any) => ct.name);
        const values = contentTypes.map((_: any, i: number) => i + 1);

        const ctx = this.renderRoot.querySelector('#myChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Content Types',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    private _onClick() {
        this.count++
    }

    static styles = css`
    :host {
      display: block;
      max-width: 800px;
      margin: 0 auto;
    }
    canvas {
      max-width: 100%;
    }
  `
}

declare global {
    interface HTMLElementTagNameMap {
        'content-insights': ContentInsights
    }
}
