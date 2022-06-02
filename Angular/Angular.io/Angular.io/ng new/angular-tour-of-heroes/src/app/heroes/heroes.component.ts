/*
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  hero = 'Windstorm';
  constructor() {}

  // ngOnInit(): void {}
  ngOnInit() {}

}
*/

/*
// Requires restart on changing path // tsconfig.json // "compilerOptions" // "resolveJsonModule": true
// import * as data from '../example/example.json';

// import { VERSION } from '@angular/core';

import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';

// import { HEROES } from '../mock-heroes'; //
// Import the HeroService instead the HEROES import
import { HeroService } from '../hero.service';

import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})


export class HeroesComponent implements OnInit {

  // hero: Hero = { id: 1, name: 'Windstorm' };

  // heroes = HEROES; //
  heroes: Hero[];

  // selectedHero?: Hero; // selectedHero: Hero;

  // name: string;

  // constructor() {}
  // When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService.
  // constructor(private heroService: HeroService) {}
  // constructor(private heroService: HeroService, private messageService: MessageService) {}
  // constructor(private heroService: HeroService, private messageService: MessageService) { alert(`Hola!`); }
  constructor(private heroService: HeroService, private messageService: MessageService) { 
    // this.name = data.userName;
    // alert(this.name);
    // alert(JSON.stringify(VERSION));
    // alert(VERSION.full);
  }

  // ngOnInit(): void {}
  // ngOnInit() {}
  ngOnInit() { this.getHeroes(); }

  onSelect(hero: Hero): void {
    // this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
    // window.alert('Selected hero is ' +  hero.name);
    // window.alert('Selected hero is ' +  `${hero.name}`);
    // window.alert(`Selected hero is ${hero.name}`);
    // alert(`Selected hero is ${hero.name}`);
  }

  // getHeroes(): void { this.heroes = this.heroService.getHeroes(); }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
*/


import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[];

  // When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService.
  constructor(private heroService: HeroService) {}

  ngOnInit() { this.getHeroes(); }

  getHeroes(): void { this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes); }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(hero => { this.heroes.push(hero); });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}