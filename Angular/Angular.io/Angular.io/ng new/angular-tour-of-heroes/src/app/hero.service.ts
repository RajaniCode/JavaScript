/*
import { Injectable } from '@angular/core';

// Observable is one of the key classes in the RxJS library
// Simulate getting data from the server with the RxJS of() function
import { Observable, of } from 'rxjs';

import { Hero } from './hero';

import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {

  // constructor() {}
  constructor(private messageService: MessageService) {}

  // getHeroes(): Hero[] { return HEROES; }

  // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes
  getHeroes(): Observable<Hero[]> {
    // https://angular.io/tutorial/toh-pt4
    // return heroes; // Error in documentation
    const heroes = of(HEROES);
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
*/

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// Observable is one of the key classes in the RxJS library
/** GET heroes from the server */
import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';

import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) {}

  // RxJS tap() operator, which looks at the observable values, does something with those values, and passes them along
  // The tap() call back doesn't touch the values themselves
  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  // getHero() constructs a request URL with the desired hero's id
  // The server should respond with a single hero rather than an array of heroes
  // getHero() returns an Observable<Hero> ("an observable of Hero objects") rather than an observable of hero arrays
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // The method returns immediately with an empty array if there is no search term
  // The rest of it closely resembles getHeroes(), the only significant difference being the URL, which includes a query string with the search term
  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  // addHero calls HttpClient.post() instead of put()
  // addHero expects the server to generate an id for the new hero, which it returns in the Observable<Hero> to the caller
  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // The HttpClient.put() method takes three parameters: the URL, the data to update (the modified hero in this case), options
  // The URL is unchanged
  // The heroes web API knows which hero to update by looking at the hero's id
  // The heroes web API expects a special header in HTTP save requests
  // That header is in the httpOptions constant defined in the HeroService
  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // deleteHero() calls HttpClient.delete()
  // The URL is the heroes resource URL plus the id of the hero to delete
  // Don't send data as you did with put() and post()
  // Still send the httpOptions
  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}