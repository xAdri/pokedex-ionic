import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  PokemonListResponse
} from '../core/interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})

export class Pokeapi {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemonList(
    limit: number,
    offset: number
  ): Observable<PokemonListResponse> {
    const url = `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`;
    return this.http.get<PokemonListResponse>(url);
  }

  getPokemonDetailsById(id: number): Observable<any> {
    const url = `${this.baseUrl}/pokemon/${id}`;
    return this.http.get<any>(url);
  }

  getByUrl(url: string) {
    return this.http.get(url);
  }

}
