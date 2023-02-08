import type { Observable } from "rxjs";
import type { QueryRequest } from "../Models/Requests";
import type { Content } from "../Models/Content";



export interface IContentService {
    /**
     * Query the database for content items.
     * @param req The query info.
     * @returns An array of IDs.
     */
    query(req: QueryRequest): Observable<string[]>;
    
    /**
     * Get a specific content by id.
     * @param id The id of the content.
     * @returns The content, or null if the content was not found
     */
    getById(id: string): Observable<Content | null>;
}