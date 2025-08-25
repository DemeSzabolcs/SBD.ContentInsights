export type DocumentType = {
    name: string;
    label: string;
    count: number;
};

export enum DocumentStatus {
    Published,
    Draft,
    Trashed,
}

export class Document {
    status: DocumentStatus;
    name: string = '';
    link: string = '';
    constructor(status: DocumentStatus, name: string = '', link: string = '') {
        this.status = status;
        this.name = name;
        this.link = link;
    }
}

export class DocumentsByStatus {
    published: Document[] = [];
    draft: Document[] = [];
    trashed: Document[] = [];
}
