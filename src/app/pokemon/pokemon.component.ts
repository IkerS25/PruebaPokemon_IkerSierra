import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule]
})

export class PokemonComponent {

  // Contiene las URLS de todos los pokemons
  listaPokemons: any[] = [];
  // Contiene la lista de pokemons actualizada con los filtros de la busqueda
  listaPokemonActualizada: any = [];
  // Contiene la información de todos los pokemons
  statsPokemons: any[] = []
  // El campo de búsqueda vinculado con el input. 
  campoBusqueda: string = "";
  // Almacena la API en un JSON
  listaPokemonString: any = [];
  // Marca si existe la base de datos
  existeBD: boolean = true;
  // Todos los tipos de pokemon con su color asignado
  tiposPokemonColores: any = {
    'fire': '#F2953B',
    'fighting': '#CF5C35',
    'flying': '#BEA0C2',
    'poison': '#B96889',
    'ground': '#E6C163',
    'rock': '#C9AB40',
    'bug': '#BEBB30',
    'ghost': '#987984',
    'steel': '#CABBAC',
    'water': '#92A0C2',
    'grass': '#9DC652',
    'electric': '#F7CD3B',
    'psychic': '#F77979',
    'ice': '#B4D2B1',
    'dragon': '#A172BF',
    'dark': '#98794C',
    'fairy': '#F0A692',
    'normal': '#FBDDBE'
  };

  constructor(private apiService: ApiService, private http: HttpClientModule) {
  }

  // Carga los pokemons al cargar la página.
  ngOnInit(): void {
    this.getPokemons();

    if (localStorage.getItem("listaPokemon") == null) {
      localStorage.setItem("listaPokemon", this.listaPokemonString)
    }

  }
  // Carga las URLS de los pokemons de la API.
  getPokemons() {
    this.apiService.getInfo().subscribe(data => {
      data.results.forEach((pokemon: any) => {
        this.listaPokemons.push(pokemon.url)
      });
      this.getStats();
    })
  }

  // Carga la información de todos los pokemons en la lista.
  getStats() {
    // Abre la conexión a la base de datos
    let db: IDBDatabase;
    let request = indexedDB.open("pokemonDB", 1);
    request.onupgradeneeded = (event) => {
      db = (event.target as IDBOpenDBRequest).result;

      // Comprueba que la base de datos Pokemons este creada
      if (!db.objectStoreNames.contains('pokemons')) {
        this.existeBD = false;
        db.createObjectStore('pokemons', { keyPath: 'id' });

        request.onsuccess = (event) => {
          db = (event.target as IDBOpenDBRequest).result;

          // Luego, añade los datos a la base de datos
          for (let i = 0; i < this.listaPokemons.length; i++) {
            this.apiService.getStats(this.listaPokemons[i]).subscribe(data => {
              this.statsPokemons.push(data);

              // Añade los datos a la base de datos
              let transaction = db.transaction(['pokemons'], 'readwrite');
              let store = transaction.objectStore('pokemons');
              store.add(data);
            })
          }
          this.listaPokemonActualizada = this.statsPokemons;

        };
      }
    };
    // Comprueba si es la primera vez que se ejecuta la petición a la API, en caso de ser la primera vez carga los datos de la API y no de la Base de datos, en caso de tener guardados
    // los datos en la base de datos los carga de ahi.
    if (this.existeBD) {
      this.cargarDatos();
    }

  }

  //Carga los datos en la lista para visualizarlos en pantalla.
  cargarDatos() {
    // Abre la conexión a la base de datos
    let db: IDBDatabase;
    let request = indexedDB.open("pokemonDB", 1);

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;

      // Se leen los datos
      let transaction = db.transaction(['pokemons'], 'readonly');
      let store = transaction.objectStore('pokemons');

      // Creamos un cursor para recorrer los datos de la base de datos
      let cursorRequest = store.openCursor();

      cursorRequest.onsuccess = (event) => {
        let cursor = (event.target as IDBRequest).result;
        if (cursor) {
          // Añadimos el valor del cursor a la lista statsPokemons, la base de datos tiene una estructura de datos que solo contiene id  y value
          this.statsPokemons.push(cursor.value);

          // Avanza al siguiente objeto en el cursor
          cursor.continue();
        } else {
          // Cuando no haya más objetos que recorrer, asignamos los datos de la lista statsPokemon a la lista listaPokemonActualizada para visualizarlos.
          this.listaPokemonActualizada = this.statsPokemons;
        }
      };
    };
  }

  // Filtra por el campo de búsqueda la lista de pokemons.
  buscarPokemon() {
    this.listaPokemonActualizada = [];
    for (const pokemon of this.statsPokemons) {
      if (pokemon.name.startsWith(this.campoBusqueda)) {
        this.listaPokemonActualizada.push(pokemon);
      }
    }
  }
}
