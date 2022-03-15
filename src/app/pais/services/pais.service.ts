import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from "rxjs/operators";
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.eu/rest/v2';
  

  constructor(private http: HttpClient) { }


  // Para que la respuesta de la API no nos envíe tanta información que no vamos a necesitar, podemos especificarle directamente qué campos
  // queremos que nos devuelva (esto aumentará la velocidad de respuesta y consumirá menos datos al pesar menos la respuesta)
  get filters() {
    return new HttpParams().set('fields', 'name;capital;alpha2Code;flag;population');
  }

  buscarPais( pais: string ): Observable<Country[]>
  {
    const url = `${this.apiUrl}/name/${pais}`;

    // Ejemplo de cómo se haría un control de los errores al hacer la petición desde aquí y no desde el componente al subscribirse 
    // al observable que devuelve esta función.
    // 
    // El of que usamos es una función que genera Observables y en el que le podemos definir la respuesta mapeada que queremos que se devuelva
    // un string con un mensaje, un array vacío [], etc...
    // 
    // En esta aplicación vamos a hacer el control de los errores en el componente, no aquí
    // 
    // return this.http.get(url).pipe(
    //   catchError(error => of([]))
    // );

    return this.http.get<Country[]>(url, {'params' : this.filters});
  }

  buscarCapital( capital: string ): Observable<Country[]>
  {
    const url = `${this.apiUrl}/capital/${capital}`;

    return this.http.get<Country[]>(url, {'params' : this.filters});
  }

  buscarRegion( region: string ): Observable<Country[]>
  {
    const url = `${this.apiUrl}/region/${region}`;

    return this.http.get<Country[]>(url, {'params' : this.filters});
  }

  detallePais( paisID: string ): Observable<Country>
  {
    const url = `${this.apiUrl}/alpha/${paisID}`;

    return this.http.get<Country>(url);
  }
}
