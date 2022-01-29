import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';// import de métodos http
import { catchError, EMPTY, map, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ProductService {

    baseUrl = "http://localhost:3001/product";
    
     constructor(
         private http: HttpClient
     ){
    }

    read(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl).pipe(
          map(obj => obj),
          catchError(e => this.errorHandler(e))
        )
      }
    
     create(product: any[]): Observable<any[]> {
        //req via post passando o modelo de Product com url  e o product
        return this.http.post<any[]>(this.baseUrl, product).pipe(
          map(obj => obj),
          catchError(e => this.errorHandler(e))
        )
      }
      errorHandler(e: any): Observable<any> {
        //showMessage(msg, isError = true) se tiver algum durante a req
        // vai mostra essa msg
        console.log('Ocorreu um erro !', e)
        return EMPTY
      }
}