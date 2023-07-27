import { from, map, merge, mergeAll, switchMap, type Observable, iif, filter, type MonoTypeOperatorFunction, tap } from "rxjs";
import type { Content } from "../Models/Content";
import type { QueryRequest } from "../Models/Requests";
import type { IContentService } from "./IContentService";
import { ServerConfig } from "../ServerConfig";


export class ServerContentService implements IContentService {
    query(req: QueryRequest): Observable<string[]> {
        const prm = fetch(`${ServerConfig.url}/content/query`)

        return from(prm)
            .pipe(
                map(resp => from(resp.json() as Promise<string[]>)),
                mergeAll()
            )
    }
    getById(id: string): Observable<Content | null> {
        const prm = fetch(`${ServerConfig.url}/content/get/${id}`)

        const $source = from(prm)

        const $found = $source.pipe(
            filter(resp => resp.status === 200),
            map(resp => from(resp.json()) as Observable<Content>),
            mergeAll()
        )

        const $notFound = $source.pipe(
            filter(resp => resp.status === 404),
            map(resp => null)
        )

        return $source.pipe(
            switchMap(
                (resp) => resp.status === 200 ? $found : $notFound
            )
        )
    }

    /**
     * The function queryContent is a wrapper over query(...), that maps every resulted id to a content model.
     * @param req QueryRequest object.
     * @returns An observable that emits a sequence of content models.
     */
    queryContent(req: QueryRequest): Observable<Content> {
        // Convert the array of ids to array of observables.
        const mapToContentItemsSource = map<
            string[],
            ReturnType<IContentService["getById"]>[]
        >((ids) => ids.map((id) => this.getById(id)));
        
        let result = this
            .query(req)
            .pipe(
                mapToContentItemsSource,
                mergeAll(), // From Observable<Content>[] -> Observable<Content>
                mergeAll(), // From Observable<Content> -> Content
                filter((content) => content !== null)
            )
        
        // This is usually unsafe, but since the filter function removes every null object, 
        // it can be done safely here.
        return result as Observable<Content>
    }
}