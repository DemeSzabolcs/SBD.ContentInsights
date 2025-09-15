import type { Author, DocumentsWithAuthors, UmbracoDocument, DocumentType } from "../api";
import { DocumentsByStatus } from "./types";
import { documentStatus } from "./constants";
import type { DocumentsTableState } from "./render/documents-table";

export const getTagColor = (status: number): 'positive' | 'warning' | 'danger' => {
    switch (status) {
        case documentStatus.Public:
            return 'positive';
        case documentStatus.Draft:
            return 'warning';
        case documentStatus.Trashed:
            return 'danger';
        default:
            return 'warning';
    }
};

export const getAuthorNameByKey = (authorKey: string, authors: Author[]): string =>
    authors.find(author => author.link === authorKey)?.name ?? '';

export function getAuthorLinkFromKey(authorKey: string): string {
    return `/umbraco/section/user-management/workspace/user/edit/${authorKey}`;
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

export const getDocumentAgeInDays = (document: UmbracoDocument): number =>
    Math.floor((Date.now() - new Date(document.updateDate).getTime()) / (1000 * 60 * 60 * 24));

export function groupDocumentsByStatus(documents: UmbracoDocument[]): DocumentsByStatus {
    return {
        public: documents.filter(document => document.status === documentStatus.Public),
        draft: documents.filter(document => document.status === documentStatus.Draft),
        trashed: documents.filter(document => document.status === documentStatus.Trashed),
    };
}

export function buildDocumentTypeSelectOptions(documentTypes: DocumentType[]) {
    return [
        { name: 'All Document Types', value: 'all', selected: true },
        ...documentTypes
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(type => ({ name: type.name, value: type.type })),
    ];
}

export const onItemsPerPageChange = (state: DocumentsTableState, event: Event): DocumentsTableState => ({
    ...state,
    itemsPerPage: Number((event.target as HTMLSelectElement).value),
});
