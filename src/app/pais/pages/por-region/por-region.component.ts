import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px; 
      }
    `
  ]
})
export class PorRegionComponent {

  public regiones    : string[]  = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  public regionActiva: string    = '';
  public paises      : Country[] = [];

  constructor(private _paisService: PaisService) { }

  getClaseCss( region: string): string
  {
    return (region === this.regionActiva) ? 'btn btn-outline-primary active' : 'btn btn-outline-primary';
  }

  activarRegion( region: string ): void
  {
    // Si la región elegida es la misma que en la que ya nos encontramos nos ahorramos tener que hacer la petición
    if (this.regionActiva === region) { return; }

    this.regionActiva = region;

    // Limpio y lleno, limpio y lleno, limpio y lleno...
    this.paises = [];

    this._paisService.buscarRegion(this.regionActiva).subscribe(paises => this.paises = paises);
  }

}
