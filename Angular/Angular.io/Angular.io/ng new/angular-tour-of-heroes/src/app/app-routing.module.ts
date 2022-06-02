import { NgModule } from '@angular/core';

// import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { HeroesComponent } from './heroes/heroes.component';

import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'heroes', component: HeroesComponent },

  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    // The following line adds the RouterModule to the AppRoutingModule imports array and configures it with the routes in one step by calling RouterModule.forRoot()
    RouterModule.forRoot(routes)
  ],  
  exports: [
    // AppRoutingModule exports RouterModule so it will be available throughout the app
    RouterModule 
  ]
})
export class AppRoutingModule { }

