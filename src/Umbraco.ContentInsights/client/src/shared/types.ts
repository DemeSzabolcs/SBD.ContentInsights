export type DocumentType = {
    name: string;
    type: string;
    count: number;
};

export enum DocumentStatus {
    Public,
    Draft,
    Trashed,
}

export type UmbracoDocument = {
    status: DocumentStatus;
    name: string;
    link: string;
    type: string;
    typeName: string;
}

export class DocumentsByStatus {
    public: UmbracoDocument[] = [];
    draft: UmbracoDocument[] = [];
    trashed: UmbracoDocument[] = [];
    publicCount: number = 0;
    draftCount: number = 0;
    trashedCount: number = 0;
}
