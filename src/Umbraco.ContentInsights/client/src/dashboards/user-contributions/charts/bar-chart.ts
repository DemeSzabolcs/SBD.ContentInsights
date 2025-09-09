import { DocumentsWithAuthors } from '../../../shared/types';
import { getAuthorDocumentCounts } from '../../../shared/utils';
import { createGenericBarChart, resetChart } from '../../../shared/charts/bar-chart';
import type { ChartState } from '../../../shared/charts/bar-chart';
import { Chart } from 'chart.js';

let originalDocumentsWithAuthors: DocumentsWithAuthors | null = null;
let savedDocumentsWithAuthors: DocumentsWithAuthors | null = null;
let authorChartState: ChartState | null = null;
let currentSelect: string;

export function createAuthorBarChart(
    barChartCtx: HTMLCanvasElement,
    documentsWithAuthors: DocumentsWithAuthors
): { barChart: Chart } {
    const labels = documentsWithAuthors.authors.map(author => author.name);
    const data = getAuthorDocumentCounts(documentsWithAuthors);

    originalDocumentsWithAuthors = new DocumentsWithAuthors();
    originalDocumentsWithAuthors.documents = [...documentsWithAuthors.documents];
    originalDocumentsWithAuthors.authors = [...documentsWithAuthors.authors];

    savedDocumentsWithAuthors = new DocumentsWithAuthors();
    savedDocumentsWithAuthors.documents = [...documentsWithAuthors.documents];
    savedDocumentsWithAuthors.authors = [...documentsWithAuthors.authors];


    authorChartState = createGenericBarChart(barChartCtx, labels, data, (_, index) => {
        if (!savedDocumentsWithAuthors) return;

        savedDocumentsWithAuthors.authors.splice(index, 1);
    });

    return { barChart: authorChartState.chart };
}

export function updateAuthorBarChart(selectedType: string): void {
    if (!authorChartState || !savedDocumentsWithAuthors) return;
    currentSelect = selectedType;
    const data =
        selectedType === 'all'
            ? getAuthorDocumentCounts(savedDocumentsWithAuthors)
            : getAuthorDocumentCounts(savedDocumentsWithAuthors, selectedType);

    authorChartState.chart.data.datasets[0].data = [...data];
    authorChartState.chart.update();
}

export function resetAuthorBarChart(): void {
    if (!authorChartState) return;
    resetChart(authorChartState);

    if (!savedDocumentsWithAuthors || !originalDocumentsWithAuthors ) return;
    savedDocumentsWithAuthors.authors = [...originalDocumentsWithAuthors.authors];
    savedDocumentsWithAuthors.documents = [...originalDocumentsWithAuthors.documents];
    updateAuthorBarChart(currentSelect);
}
