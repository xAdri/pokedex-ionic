export interface PokemonListItem {
    name: string;
    types: string[];
    url: string;
}

export interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

export interface PokemonDetailItem {
    id: number;
    name: string;
    types: string[];
    description: string;
    stats: PokemonStats;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}
