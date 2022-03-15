import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Input() placeHolder: string = '';

  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();


  // Este debouncer lo vamos a hacer para que a medida que vayamos escribiendo en el input, nos aparezcan sugerencias según lo que hayamos
  // escrito. 
  // 
  // Para hacer esto vamos a disparar búsquedas al API por cada letra que el usuario escriba (método teclaPresionada())
  // 
  // Este debouncer es de tipo Subject, que es un Observable especial (por lo cual se puede subscribir). Recordar que con los EventEmitter 
  // también pasa lo mismo
  public debouncer: Subject<string> = new Subject();

  public termino : string  = '';


  constructor() { }

  ngOnInit(): void {

    // Nos subscribimos al debouncer al inicializar el componente
    this.debouncer
    .pipe(
      // Esta pipe nos vale para especificar cuantas milésimas de segundo queremos que pasen antes de emitir el siguiente valor 
      debounceTime(300)
    )
    .subscribe(valor => {
      // Cada vez que se lance el next() y pase las 300 milésimas, emitimos el evento para que el padre lo recoja
      this.onDebounce.emit(valor);
    });
  }

  buscar(): void
  {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada()
  {
    // Si no tuviésemos la variable termino enlazada con el ngModel (que recoje lo que escribimos en la caja del input),
    // al llamar a este método tendríamos que pasarle el evento como parámetro y recoger el texto introducido con el evento.target.value

    // Este next() sería equivalente al emit() de los EventEmitter.
    // 
    // Cada vez que se ejecuta este método se dispara el next() y como estamos subscritos al Observable (en el ngOnInit), estamos atentos
    // a este next() para recoger el termino que lanza
    this.debouncer.next(this.termino);
    
  }

}
