import type { DocumentsTableState } from "./render/documents-table";
import { DocumentStatus, Author, DocumentsByStatus } from "./types";
import type { UmbracoDocument, DocumentsWithAuthors, DocumentType } from "./types";

export const convertDocumentStatusToNumberString = (documentStatus: DocumentStatus): string => {
    switch (documentStatus as unknown as string) {
        case DocumentStatus[DocumentStatus.Public]:
            return "0";
        case DocumentStatus[DocumentStatus.Draft]:
            return "1";
        case DocumentStatus[DocumentStatus.Trashed]:
            return "2";
        default:
            return "0";
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
            (document) => convertDocumentStatusToNumberString(document.status) === "0"
        ),
        draft: documents.filter(
            (document) => convertDocumentStatusToNumberString(document.status) === "1"
        ),
        trashed: documents.filter(
            (document) => convertDocumentStatusToNumberString(document.status) === "2"
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
