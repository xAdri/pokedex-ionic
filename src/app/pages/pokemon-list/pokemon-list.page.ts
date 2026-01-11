import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonContent, IonHeader, IonToolbar, IonList, IonItem, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonSearchbar, IonButton, IonText, IonButtons, IonModal, IonImg, IonProgressBar, IonSegment, IonSegmentButton, IonChip, IonIcon } from '@ionic/angular/standalone';

import { NavbarComponent } from '../../shared/navbar/navbar.component';

import { PokemonListItem, PokemonListResponse, PokemonDetailItem } from '../../core/interfaces/pokemon.interface';
import { Pokeapi } from 'src/app/services/pokeapi';

type PokemonListRow = PokemonListItem & {
  id: number;
};

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
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
    IonSearchbar,
    IonText,
    IonButton,
    IonButtons,
    IonModal,
    IonImg,
    IonProgressBar,
    IonSegment,
    IonSegmentButton,
    IonIcon
],
})
export class PokemonListPage implements OnInit {
  pokemons: PokemonListRow[] = [];

  private readonly pageSize = 25;
  private readonly maxItems = 1025;
  readonly maxStat = 255;

  private offset = 0;
  allLoaded = false;
  loading = false;

  private readonly TYPE_ICON_MAP: Record<string, string> = {
    normal: 'normal',
    fire: 'fire',
    water: 'water',
    electric: 'electric',
    grass: 'grass',
    ice: 'ice',
    fighting: 'fighting',
    poison: 'poison',
    ground: 'ground',
    flying: 'flying',
    psychic: 'psychic',
    bug: 'bug',
    rock: 'rock',
    ghost: 'ghost',
    dragon: 'dragon',
    dark: 'dark',
    steel: 'steel',
    fairy: 'fairy',
  };

  isDetailOpen = false;
  isDetailLoading = false;
  pokemonSelected: PokemonListRow | null = null;
  pokemonDetail: PokemonDetailItem | null = null;

  constructor(private pokeapi: Pokeapi) { }

  showDetail(isOpen: boolean, p?: PokemonListRow) {
    this.isDetailOpen = isOpen;
    this.pokemonSelected = p ?? null;

    if (!isOpen || !p) {
      this.pokemonDetail = null;
      this.isDetailLoading = false;
      return;
    }

    this.isDetailLoading = true;
    this.pokemonDetail = null;

    this.pokeapi.getPokemonDetailsById(p.id).subscribe({
      next: (details: any) => {
        const types: string[] = Array.isArray(details?.types)
          ? details.types.map((t: any) => t?.type?.name).filter((x: any) => typeof x === 'string')
          : [];

        const statsArr: any[] = Array.isArray(details?.stats) ? details.stats : [];
        const getStat = (name: string): number =>
          Number(statsArr.find((s: any) => s?.stat?.name === name)?.base_stat ?? 0);

        const speciesUrl: string | undefined = details?.species?.url;

        if (!speciesUrl) {
          this.finishDetail(details, types, getStat, '');
          return;
        }

        // Segunda llamada para la descripcion
        this.pokeapi.getByUrl(speciesUrl).subscribe({
          next: (species: any) => {
            const entries: any[] = Array.isArray(species?.flavor_text_entries)
              ? species.flavor_text_entries
              : [];

            const enEntry = entries.find((e) => e?.language?.name === 'en');
            const description = typeof enEntry?.flavor_text === 'string'
              ? enEntry.flavor_text.replace(/\f|\n/g, ' ')
              : '';

            this.finishDetail(details, types, getStat, description);
          },
          error: () => {
            this.finishDetail(details, types, getStat, '');
          }
        });
      },
      error: () => {
        this.pokemonDetail = null;
        this.isDetailLoading = false;
      }
    });
  }

  private finishDetail(
    details: any,
    types: string[],
    getStat: (name: string) => number,
    description: string
  ) {
    this.pokemonDetail = {
      id: Number(details?.id),
      name: String(details?.name),
      types,
      description,
      stats: {
        hp: getStat('hp'),
        attack: getStat('attack'),
        defense: getStat('defense'),
        specialAttack: getStat('special-attack'),
        specialDefense: getStat('special-defense'),
        speed: getStat('speed'),
      },
    };

    this.isDetailLoading = false;
  }

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
        const newOnes: PokemonListRow[] = res.results.map((r) => {
          const id = this.getPokemonIdFromUrl(r.url);
          return { ...r, id, types: Array.isArray(r.types) ? r.types : [] };
        });

        this.pokemons = [...this.pokemons, ...newOnes];
        this.offset += limit;

        this.loadTypesForBatch(newOnes);

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

  private loadTypesForBatch(batch: PokemonListRow[]) {
    for (const p of batch) {
      if (Array.isArray(p.types) && p.types.length > 0) {
        continue;
      }

      this.pokeapi.getPokemonDetailsById(p.id).subscribe({
        next: (details: any) => {
          const types = Array.isArray(details?.types)
            ? details.types
              .map((t: any) => t?.type?.name)
              .filter((x: any) => typeof x === 'string')
            : [];

          p.types = types;
        },
        error: () => {
          p.types = [];
        }
      });
    }
  }

  getPokemonIdFromUrl(url: string): number {
    const parts = url.split('/').filter(Boolean);
    const id = Number(parts[parts.length - 1]);
    return Number.isFinite(id) ? id : -1;
  }

  formatId3(id: number): string {
    return `#${id.toString().padStart(3, '0')}`;
  }

  getOfficialArtworkUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  getTypeIconUrl(typeName: string): string {
    const key = (typeName || '').toLowerCase();
    const file = this.TYPE_ICON_MAP[key] ?? 'unknown';
    return `assets/icon/pokemon-types/${file}.png`;
  }
}
