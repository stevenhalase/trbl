import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' }
];

export const AppRoutingProviders: any[] = [
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);