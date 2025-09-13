export type UserGroup = {
    key: string;
    name: string;
};

export type DocumentType = {
    name: string;
    type: string;
    count: number;
};

export type UmbracoDocument = {
    status: number;
    name: string;
    type: string;
    typeName: string;
    link: string;
    authorKey: string;
    updateDate: Date;
};

export class Author {
    name: string = '';
    email: string = '';
    link: string = '';
    userGroups: UserGroup[] = [];
}

export class DocumentsByStatus {
    public: UmbracoDocument[] = [];
    draft: UmbracoDocument[] = [];
    trashed: UmbracoDocument[] = [];
}

export class DocumentsWithAuthors {
    documents: UmbracoDocument[] = [];
    authors: Author[] = [];
}
