export type DocumentType = {
    name: string;
    label: string;
    count: number;
};

export enum DocumentStatus {
    Public,
    Draft,
    Trashed,
}

export type Document = {
    status: DocumentStatus;
    name: string;
    link: string;
    type: string;
}

export class DocumentsByStatus {
    public: Document[] = [];
    draft: Document[] = [];
    trashed: Document[] = [];
    publicCount: number = 0;
    draftCount: number = 0;
    trashedCount: number = 0;
}
