import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'pokemon-list',
    loadComponent: () => import('./pages/pokemon-list/pokemon-list.page').then(m => m.PokemonListPage)
  },
  {
    path: 'minigame',
    loadComponent: () => import('./pages/minigame/minigame.page').then(m => m.MinigamePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];
