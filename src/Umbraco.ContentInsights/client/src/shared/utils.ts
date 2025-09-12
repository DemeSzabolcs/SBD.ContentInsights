import { documentStatusOrder } from "./constants";
import type { DocumentsTableState } from "./render/documents-table";
import { DocumentStatus, Author, DocumentsByStatus } from "./types";
import type { UmbracoDocument, DocumentsWithAuthors, DocumentType } from "./types";

export const convertDocumentStatusToNumberString = (documentStatus: DocumentStatus): string => {
    switch (documentStatus as unknown as string) {
        case DocumentStatus[DocumentStatus.Public]:
            return documentStatusOrder.Public;
        case DocumentStatus[DocumentStatus.Draft]:
            return documentStatusOrder.Draft;
        case DocumentStatus[DocumentStatus.Trashed]:
            return documentStatusOrder.Trashed;
        default:
            return documentStatusOrder.Public;
    }
}

export const getTagColor = (status: DocumentStatus): 'positive' | 'warning' | 'danger' => {
    switch (status as unknown as string) {
        case DocumentStatus[DocumentStatus.Public]:
            return 'positive';
        case DocumentStatus[DocumentStatus.Draft]:
            return 'warning';
        case DocumentStatus[DocumentStatus.Trashed]:
            return 'danger';
        default:
            return 'warning';
    }
}

export function getAuthorNameByKey(
    authorKey: string,
    authors: Author[]
): string  {
    const author = authors.find(a => a.link === authorKey);
    return author ? author.name : '';
}

export function getAuthorLinkFromKey(authorKey: string): string {
    return `/umbraco/section/user-management/workspace/user/edit/${authorKey}`;
}

export function groupDocumentsByStatus(documents: UmbracoDocument[]): DocumentsByStatus {
    return {
        public: documents.filter(
            (document) => convertDocumentStatusToNumberString(document.status) === documentStatusOrder.Public
        ),
        draft: documents.filter(
            (document) => convertDocumentStatusToNumberString(document.status) === documentStatusOrder.Draft
        ),
        trashed: documents.filter(
            (document) => convertDocumentStatusToNumberString(document.status) === documentStatusOrder.Trashed
        ),
    };
}

export function getAuthorDocumentCounts(
    documentsWithAuthors: DocumentsWithAuthors,
    typeFilter: string | null = null
): number[] {
    return documentsWithAuthors.authors.map(author => {
        const authorDocs = documentsWithAuthors.documents.filter(
            document =>
                document.authorKey === author.link &&
                (typeFilter === null || document.type === typeFilter)
        );
        return authorDocs.length;
    });
}

export function buildDocumentTypeSelectOptions(documentTypes: DocumentType[]) {
    return [
        { name: 'All Document Types', value: 'all', selected: true },
        ...documentTypes
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((type) => ({ name: type.name, value: type.type })),
    ];
}

export function onItemsPerPageChange(
    state: DocumentsTableState,
    event: Event
): DocumentsTableState {
    const select = event.target as HTMLSelectElement;
    const selectValue = Number(select.value);

    return {
        ...state,
        itemsPerPage: selectValue,
    };
}

export function getDocumentAgeInDays(
    document: UmbracoDocument,
): number {
    const now = new Date();
    const updated = new Date(document.updateDate);
    return Math.floor(
        (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24)
    );
}
