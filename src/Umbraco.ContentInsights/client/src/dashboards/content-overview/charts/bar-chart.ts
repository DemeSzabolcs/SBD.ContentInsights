import { Chart } from 'chart.js';
import { createGenericBarChart, resetChart } from '../../../shared/charts/bar-chart';
import type { ChartState } from '../../../shared/charts/bar-chart';

import type { DocumentType } from '../../../shared/types';

let documentTypeChartState: ChartState | null = null;

export function createDocumentTypeBarChart(
    barChartCtx: HTMLCanvasElement,
    documentTypes: DocumentType[]
): { barChart: Chart } {
    const labels = documentTypes.map(documentType => documentType.name);
    const data = documentTypes.map(documentType => documentType.count);

    documentTypeChartState = createGenericBarChart(barChartCtx, labels, data);

    return { barChart: documentTypeChartState.chart };
}

export function resetDocumentTypeBarChart(): void {
    if (!documentTypeChartState) return;
    resetChart(documentTypeChartState);
}
