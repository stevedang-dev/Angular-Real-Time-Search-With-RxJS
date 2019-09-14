import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    baseUrl = 'https://api.cdnjs.com/libraries';
    queryUrl = '?search=';

    constructor(private http: HttpClient) {}

    search(terms: Observable<string>): any {
        console.log('%c SearchService', 'color: green; font-weight: bold');
        console.log(
            '%c search(terms: Observable<string>)',
            'color: red; font-weight: bold'
        );
        return terms.pipe(
            // debounceTime(400): waits until there’s no new data for the provided amount of time
            debounceTime(400),
            // distinctUntilChanged():
            //      will ensure that only distinct data passes through
            //      will only send the data once
            distinctUntilChanged(),
            // switchMap():
            //      combines multiple possible observables received from the searchEntries method into one,
            //      which ensures that we use the results from the latest request only.
            switchMap((term: string) => this.searchEntries(term))
        );
    }

    // searchEntries(term): makes a get request to our API endpoint with our search term, this gives us another observable
    searchEntries(term: string): Observable<object> {
        console.log(
            '%c searchEntries(terms: string)',
            'color: red; font-weight: bold'
        );
        console.log('=> term: ', term);
        if (term === '') {
            return of({});
        }
        // Create the request url with search term in the query params
        // Example: url = https://api.cdnjs.com/libraries?search=filter
        const url = `${this.baseUrl}${this.queryUrl}${term}`;
        console.log('=> url: ', url);
        return this.http.get(url);
    }
}
