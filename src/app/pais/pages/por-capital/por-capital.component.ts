import { Component } from '@angular/core';

import { Country } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  public termino    : string    = '';
  public hayError   : boolean   = false;
  public paises     : Country[] = [];
  public placeHolder: string    = 'Buscar capital...';

  constructor(private _paisService: PaisService) { }

  buscar(termino: string): void
  {
    this.hayError = false;
    this.termino  = termino;

    this._paisService.buscarCapital(this.termino).subscribe(paises => {
      this.paises = paises;
    }, error => {
      this.hayError = true;
      this.paises = [];
    });
  }
}
