import type { UmbracoDocument } from "../api";

export class DocumentsByStatus {
    public: UmbracoDocument[] = [];
    draft: UmbracoDocument[] = [];
    trashed: UmbracoDocument[] = [];
}

