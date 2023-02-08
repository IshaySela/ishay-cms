import type { Observable } from 'rxjs'
import type { LoginRequest } from '../Models/Requests'

export interface IAuthentication {
    login(req: LoginRequest): Observable<any>;
    logout(): Observable<any>;
}