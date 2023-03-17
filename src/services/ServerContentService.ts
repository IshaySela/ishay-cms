import { from, map, merge, mergeAll, switchMap, type Observable, iif, filter } from "rxjs";
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

}