import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  public pais!: Country;

  constructor(
    private route: ActivatedRoute,
    private _paisService: PaisService
  ) { }

  ngOnInit(): void {
    // El this.route.params es un observable al que nos podemos subscribir
    // Este observable recibe como primer argumento los parámetros de la url (params). 
    // Si queremos podemos desestructurarlo directamente para obtener el id del país
    // 
    // Esta es una forma de hacerlo y funciona, un observable dentro de otro observable donde uno depende del otro
    // 
    // this.route.params.subscribe(( { id } ) => {
    //   this._paisService.detallePais(id).subscribe( pais => {
    //     console.log(pais);
    //   });
    // });


    // Otra forma de hacer lo de arriba pero más simplificada es de la siguiente manera:
    // 
    // Con los observables podemos utilizar la función pipe() en la cual podemos usar diferentes operadores de rxjs.
    // 
    // En este caso, vamos a usar el switchMap() que recibe un parámetro y retorna un observable (concretamente el detallePais() de
    // de nuestro servicio)
    // 
    // Digamos que aquí lo que estamos haciendo es saltándonos el primer subscribe porque ya lo está haciendo implícitamente el
    // switchMap() y que al hacer el subscribe con la response ya nos está devolviendo la respuesta del segundo (el país del detallePais())
    // 
    // El tap() es otro operador de rxjs que me permite recibir el producto del observable y poder hacer con el lo que queramos (en este
    // caso imprimirlo en la consola del navegador)
    this.route.params
    .pipe(
      switchMap( ({ id }) => this._paisService.detallePais( id )),
      tap( response => console.log(response) )
    )
    .subscribe( pais => this.pais = pais );
  }

}
