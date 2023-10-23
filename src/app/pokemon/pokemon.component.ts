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
    for (let i = 0; i < this.listaPokemons.length; i++) {

      this.apiService.getStats(this.listaPokemons[i]).subscribe(data => {
        this.statsPokemons.push(data);
      })
    }
    this.listaPokemonActualizada = this.statsPokemons;
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
