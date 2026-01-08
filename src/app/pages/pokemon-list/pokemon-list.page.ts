import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonNote,
  IonIcon
} from '@ionic/angular/standalone';

import { NavbarComponent } from '../../shared/navbar/navbar.component';

// 👇 Servicio + interfaces
import { PokemonListItem, PokemonListResponse } from '../../core/interfaces/pokemon.interface';
import { Pokeapi } from 'src/app/services/pokeapi';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CommonModule,
    FormsModule,
    NavbarComponent,
    IonNote,
    IonIcon
  ],
})
export class PokemonListPage implements OnInit {
  pokemons: PokemonListItem[] = [];

  private readonly pageSize = 25;
  private readonly maxItems = 151;

  private offset = 0;
  allLoaded = false;
  loading = false;

  constructor(private pokeapi: Pokeapi) { }

  ngOnInit() {
    this.loadMore();
  }

  async onIonInfinite(event: any) {
    await this.loadMore(event);
  }

  private async loadMore(event?: any) {
    if (this.loading || this.allLoaded) {
      if (event) event.target.complete();
      return;
    }

    // Ajusta el limit para no pasarte de 151
    const remaining = this.maxItems - this.pokemons.length;
    if (remaining <= 0) {
      this.allLoaded = true;
      if (event) {
        event.target.disabled = true;
        event.target.complete();
      }
      return;
    }

    const limit = Math.min(this.pageSize, remaining);

    this.loading = true;

    this.pokeapi.getPokemonList(limit, this.offset).subscribe({
      next: (res: PokemonListResponse) => {
        this.pokemons = [...this.pokemons, ...res.results];
        this.offset += limit;

        if (this.pokemons.length >= this.maxItems) {
          this.allLoaded = true;
          if (event) event.target.disabled = true;
        }

        if (event) event.target.complete();
        this.loading = false;
      },
      error: (err) => {
        console.error('PokeAPI error:', err);
        if (event) event.target.complete();
        this.loading = false;
      }
    });
  }

  // "#001" desde la url
  getPokemonIdFromUrl(url: string): number {
    const parts = url.split('/').filter(Boolean);
    const id = Number(parts[parts.length - 1]);
    return Number.isFinite(id) ? id : -1;
  }

  formatId3(id: number): string {
    return `#${id.toString().padStart(3, '0')}`;
  }

  getSpriteUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`.replace('{id}', id.toString());
  }
}
