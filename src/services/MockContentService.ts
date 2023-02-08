import { from, tap, type Observable } from "rxjs";
import type { Content } from "../Models/Content";
import type { QueryRequest } from "../Models/Requests";
import type { IContentService } from "./IContentService";


const ContentCollection: Record<string, Content> = {
    'doc_id01': {
        author: 'Ishay Sela',
        bannerImage: 'https://i.ytimg.com/vi/34U8vOHEd0c/maxresdefault.jpg',
        id: 'doc_id01',
        markdownContent: 'my blog',
        tags: ['hello', 'world'],
        title: 'Learning Svelte',
        description: 'A storytell about sveltkit'
    },
    "doc_id02": {
        author: 'Bill Gates',
        bannerImage: 'https://www.zenesys.com/Zenesys/media/Images/Blog/Microsoft-Azure-services.jpg?ext=.jpg',
        id: 'doc_id02',
        markdownContent: '# Welcome to my blog\nMicrosoft is a good company',
        tags: ['windows', 'azure'],
        title: 'Building web apps and deploying on azure',
        description: 'boring azure and .net core tutorial.'
    }
}



export class MockContentService implements IContentService {
    query(_: QueryRequest): Observable<string[]> {
        return from([Object.keys(ContentCollection)]);
    }
    getById(id: string): Observable<Content | null> {
        const exists = Object.hasOwn(ContentCollection, id);

        return from([exists ? ContentCollection[id as keyof typeof ContentCollection] : null]) // this is terrible and fun code. remove in prod.
    }

}
