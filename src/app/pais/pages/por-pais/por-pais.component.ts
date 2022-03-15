import { Component } from '@angular/core';

import { Country } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  public termino        : string    = '';
  public hayError       : boolean   = false;
  public paises         : Country[] = [];
  public paisesSugeridos: Country[] = [];
  public placeHolder    : string    = 'Buscar país...';

  constructor(private _paisService: PaisService) { }

  buscar(termino: string): void
  {
    this.hayError = false;
    this.termino  = termino;

    if (this.paisesSugeridos.length > 0) { this.paisesSugeridos.length = 0; }

    // El control de los errores al hacer la petición se puede hacer aquí cuando se hace el subscribe, ya que como vemos siempre se nos devuelve
    // la response en caso de éxito y el error en caso de fracaso, o en el sevicio cuando hacemos el get()/post()/etc...
    // 
    // En ese caso se puede mapear el error y que se devuelva una respuesta predeterminada en caso de que se produzca un error 
    // (ver el pais.service.ts para ver cómo se haría)
    // 
    // También añadir que en el caso de que el control de los errores lo hiciesemos en el servicio, entonces aquí ya la función de flecha
    // que recibe el error estaría de más ya que nunca pasará por ahí (al mapearse la respuesta en el servicio siempre pasa por la función que
    // recibe la response, no la que recibe el error)
    // 
    // Para esta aplicación usaremos el control de errores aquí y no en el servicio (nótese que lo que llamamos paises sería la response)
    this._paisService.buscarPais(this.termino).subscribe(paises => {
      this.paises = paises;
    }, error => {
      this.hayError = true;
      this.paises = [];
    });
  }

  sugerencias(termino: string): void
  {
    this.hayError = false;
    this.termino = termino;

    // Si borramos el texto del input (es decir, no hay término buscado), vaciamos el array y no hacemos la petición
    if (!this.termino) {
      this.paisesSugeridos.length = 0;  
      
      return;
    }

    // Vamos a mostrar los 5 primeros paises que me devuelva el API en función de lo que yo vaya escribiendo
    this._paisService.buscarPais(termino).subscribe(
      paises => this.paisesSugeridos = paises.splice(0,5),
      error => {
        this.hayError = true;
        this.paisesSugeridos.length = 0
      }
    );
  }
}
