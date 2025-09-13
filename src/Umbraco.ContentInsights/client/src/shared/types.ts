export type DocumentType = {
    name: string;
    type: string;
    count: number;
};

export type UserGroup = {
    name: string;
    key: string;
};

export class DocumentsByStatus {
    public: UmbracoDocument[] = [];
    draft: UmbracoDocument[] = [];
    trashed: UmbracoDocument[] = [];
}

export type UmbracoDocument = {
    status: number;
    name: string;
    link: string;
    type: string;
    typeName: string;
    authorKey: string;
    updateDate: Date;
}

export class Author {
    name: string = '';
    email: string = '';
    link: string = '';
    userGroups: UserGroup[] = [];
}

export class DocumentsWithAuthors {
    documents: UmbracoDocument[] = [];
    authors: Author[] = [];
}
