import { Chart } from 'chart.js';
import { createGenericBarChart } from '../../../shared/charts/bar-chart';
import type { ChartState } from '../../../shared/charts/bar-chart';

import type { UmbracoDocument } from '../../../shared/types';
import { convertDocumentStatusToNumberString } from '../../../shared/utils';

const AgeBuckets = [
    { label: "0–7 days", from: 0, to: 7 },
    { label: "8–30 days", from: 8, to: 30 },
    { label: "1–3 months", from: 31, to: 90 },
    { label: "3–6 months", from: 91, to: 180 },
    { label: "6–12 months", from: 181, to: 365 },
    { label: "1+ years", from: 366, to: Infinity },
];

let documentAgeDistributionChartState: ChartState | null = null;
let savedDocuments: UmbracoDocument[] | [];

function bucketDocumentsByAge(
    documents: UmbracoDocument[],
    typeFilter?: string
): number[] {
    const now = new Date();
    let filteredDocuments = typeFilter
        ? documents.filter(document => document.type === typeFilter)
        : documents;

    filteredDocuments = filteredDocuments
        .filter(document => convertDocumentStatusToNumberString(document.status) !== "2")

    return AgeBuckets.map(bucket => {
        return filteredDocuments.filter(document => {
            const updated = new Date(document.updateDate);
            const ageInDays = Math.floor(
                (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24)
            );
            return ageInDays >= bucket.from && ageInDays <= bucket.to;
        }).length;
    });
}

export function createDocumentAgeDistributionBarChart(
    barChartCtx: HTMLCanvasElement,
    documents: UmbracoDocument[]
): { barChart: Chart } {
    const labels = AgeBuckets.map(bucket => bucket.label);

    const data = bucketDocumentsByAge(documents);

    savedDocuments = [...documents];
    documentAgeDistributionChartState = createGenericBarChart(barChartCtx, labels, data, undefined, false);

    return { barChart: documentAgeDistributionChartState.chart };
}

export function updateDocumentAgeDistributionChart(selectedType: string): void {
    if (!documentAgeDistributionChartState || !savedDocuments) return;

    const data =
        selectedType === 'all'
            ? bucketDocumentsByAge(savedDocuments)
            : bucketDocumentsByAge(savedDocuments, selectedType);

    documentAgeDistributionChartState.chart.data.datasets[0].data = [...data];
    documentAgeDistributionChartState.chart.update();
}
