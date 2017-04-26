import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

export const AppRoutingProviders: any[] = [
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);